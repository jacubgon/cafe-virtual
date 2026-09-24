// Gestor de conexiones WebRTC en malla.
// Cuando dos avatares se acercan, se abre una conexión directa entre sus
// navegadores. El servidor solo hace de "cartero" para la señalización.
//
// Para evitar el problema del "glare" (ambos ofertan a la vez), el par con
// el id más pequeño es siempre quien inicia la oferta.

const ICE_SERVERS = [
  { urls: 'stun:stun.l.google.com:19302' },
  { urls: 'stun:stun1.l.google.com:19302' },
  // Si hay gente fuera de la oficina, aquí se añadiría un servidor TURN.
];

export class RTC {
  constructor(socket, myId) {
    this.socket = socket;
    this.myId = myId;
    this.localStream = null;
    this.peers = new Map(); // peerId -> { pc, audioEl, videoEl, gain? }

    // callbacks para main.js
    this.onRemoteStream = () => {}; // (peerId, stream)
    this.onPeerClosed = () => {};   // (peerId)

    socket.on('signal', ({ from, data }) => this._onSignal(from, data));
  }

  setLocalStream(stream) {
    this.localStream = stream;
  }

  // Nos hemos acercado a alguien -> abrir conexión.
  connect(peerId) {
    if (this.peers.has(peerId)) return;
    const initiator = this.myId < peerId; // determinista y simétrico
    const pc = this._createPeer(peerId);
    if (initiator) this._makeOffer(peerId, pc);
  }

  // Nos hemos alejado -> cerrar conexión.
  disconnect(peerId) {
    const peer = this.peers.get(peerId);
    if (!peer) return;
    try { peer.pc.close(); } catch {}
    if (peer.audioEl) peer.audioEl.remove();
    this.peers.delete(peerId);
    this.onPeerClosed(peerId);
  }

  _createPeer(peerId) {
    const pc = new RTCPeerConnection({ iceServers: ICE_SERVERS });

    // añadimos nuestras pistas (cam + micro)
    if (this.localStream) {
      for (const track of this.localStream.getTracks()) {
        pc.addTrack(track, this.localStream);
      }
    }

    pc.onicecandidate = (e) => {
      if (e.candidate) {
        this.socket.emit('signal', { to: peerId, data: { candidate: e.candidate } });
      }
    };

    pc.ontrack = (e) => {
      const stream = e.streams[0];
      const peer = this.peers.get(peerId);
      if (peer) peer.stream = stream;
      // audio: lo reproducimos con un elemento oculto para controlar el volumen
      this._ensureAudio(peerId, stream);
      this.onRemoteStream(peerId, stream);
    };

    pc.onconnectionstatechange = () => {
      if (['failed', 'closed', 'disconnected'].includes(pc.connectionState)) {
        // si sigue cerca, intentaremos reconectar en el próximo enter;
        // por ahora limpiamos si ha fallado de verdad
        if (pc.connectionState === 'failed') this.disconnect(peerId);
      }
    };

    const peer = { pc, audioEl: null, stream: null, initiator: this.myId < peerId };
    this.peers.set(peerId, peer);
    return pc;
  }

  // Añade una pista nueva (p. ej. la cámara activada más tarde) a todas las
  // conexiones abiertas y renegocia desde el lado iniciador.
  addTrack(track, stream) {
    for (const [peerId, peer] of this.peers) {
      peer.pc.addTrack(track, stream);
      if (peer.initiator) this._makeOffer(peerId, peer.pc);
    }
  }

  async _makeOffer(peerId, pc) {
    try {
      const offer = await pc.createOffer();
      await pc.setLocalDescription(offer);
      this.socket.emit('signal', { to: peerId, data: { sdp: pc.localDescription } });
    } catch (err) {
      console.error('Error creando oferta', err);
    }
  }

  async _onSignal(from, data) {
    let peer = this.peers.get(from);
    // Si nos llega señal y aún no teníamos par (el otro inició), lo creamos.
    if (!peer) {
      this._createPeer(from);
      peer = this.peers.get(from);
    }
    const pc = peer.pc;

    try {
      if (data.sdp) {
        await pc.setRemoteDescription(new RTCSessionDescription(data.sdp));
        if (data.sdp.type === 'offer') {
          const answer = await pc.createAnswer();
          await pc.setLocalDescription(answer);
          this.socket.emit('signal', { to: from, data: { sdp: pc.localDescription } });
        }
      } else if (data.candidate) {
        try {
          await pc.addIceCandidate(new RTCIceCandidate(data.candidate));
        } catch (err) {
          // candidatos que llegan antes de la descripción remota: se ignoran
        }
      }
    } catch (err) {
      console.error('Error procesando señal', err);
    }
  }

  _ensureAudio(peerId, stream) {
    const peer = this.peers.get(peerId);
    if (!peer) return;
    if (!peer.audioEl) {
      const el = document.createElement('audio');
      el.autoplay = true;
      el.playsInline = true;
      document.body.appendChild(el);
      peer.audioEl = el;
    }
    peer.audioEl.srcObject = stream;
  }

  // Ajusta el volumen (0..1) según la distancia en el mundo.
  setVolume(peerId, vol) {
    const peer = this.peers.get(peerId);
    if (peer && peer.audioEl) peer.audioEl.volume = vol;
  }
}
