// Orquestador: pantalla de onboarding (avatar) y oficina (mundo + vídeo real).

import { World } from './world.js';
import { RTC } from './rtc.js';
import { renderAvatar, PALETTE } from './avatar.js';

const PHRASES = ['Hola', 'Voy por café', 'Me apunto', 'Ahora vuelvo'];

// Punto al que sales (en el pasillo) al pulsar "Salir de la sala".
const EXITS = { cafe: { x: 470, y: 215 }, games: { x: 470, y: 505 }, meet: { x: 724, y: 185 } };
// Área DENTRO de cada sala donde caes (aleatorio) al iniciar la llamada,
// para no quedarte en la puerta ni amontonaros en un punto fijo.
const ROOM_AREAS = {
  cafe:  { x: [70, 400], y: [215, 320] },
  meet:  { x: [800, 1120], y: [255, 325] },
  games: { x: [70, 400], y: [590, 655] },
};
function randomSpot(zone) {
  const a = ROOM_AREAS[zone];
  if (!a) return null;
  return { x: a.x[0] + Math.random() * (a.x[1] - a.x[0]), y: a.y[0] + Math.random() * (a.y[1] - a.y[0]) };
}

// Estado del onboarding.
const sel = { name: '', body: 0, color: 0, vr: true };

let socket, world, rtc, localStream;
let micOn = true, camOn = true;

// Estado del vídeo/proximidad.
let me = null;                       // { id, name, ... }
let myZone = 'plaza';                // sala en la que estás físicamente
let roomMates = [];                  // ids de otros en tu misma sala
let callZone = null;                 // sala cuya videollamada tienes abierta (o null)
const connectedPeers = new Set();    // ids con conexión WebRTC por proximidad
const streamById = new Map();        // id -> MediaStream remoto
const peerVideoEls = new Map();      // id -> <video> persistente (no se recrea)
let selfCallVideo = null;            // <video> propio para el modal

// ---------- refs ----------
const $ = (id) => document.getElementById(id);
const nameInput = $('name-input');
const bodyChoices = $('body-choices');
const colorChoices = $('color-choices');
const vrSwitch = $('vr-switch');
const previewAvatar = $('preview-avatar');
const previewName = $('preview-name');
const enterBtn = $('enter-btn');

// ══════════ ONBOARDING ══════════
function buildBodyChoices() {
  bodyChoices.innerHTML = '';
  for (let i = 0; i < 4; i++) {
    const btn = document.createElement('button');
    btn.className = 'body-btn' + (sel.body === i ? ' on' : '');
    btn.onclick = () => { sel.body = i; refreshOnboarding(); };
    const inner = document.createElement('div');
    inner.style.cssText = 'position:absolute;left:50%;top:12px;transform:translateX(-50%);width:30px;height:52px;';
    renderAvatar(inner, { color: sel.color, body: i, vr: false, scale: 1.1 });
    btn.appendChild(inner);
    bodyChoices.appendChild(btn);
  }
}

function buildColorChoices() {
  colorChoices.innerHTML = '';
  PALETTE.forEach((c, i) => {
    const btn = document.createElement('button');
    btn.className = 'color-btn' + (sel.color === i ? ' on' : '');
    btn.style.background = c;
    btn.onclick = () => { sel.color = i; refreshOnboarding(); };
    colorChoices.appendChild(btn);
  });
}

function refreshOnboarding() {
  buildBodyChoices();
  buildColorChoices();
  renderAvatar(previewAvatar, { color: sel.color, body: sel.body, vr: sel.vr, scale: 3 });
  previewName.textContent = (nameInput.value.trim() || 'Invitado');
}

nameInput.addEventListener('input', () => { previewName.textContent = nameInput.value.trim() || 'Invitado'; });
nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') enter(); });
vrSwitch.addEventListener('click', () => {
  sel.vr = !sel.vr;
  vrSwitch.classList.toggle('on', sel.vr);
  renderAvatar(previewAvatar, { color: sel.color, body: sel.body, vr: sel.vr, scale: 3 });
});
enterBtn.addEventListener('click', enter);
refreshOnboarding();
nameInput.focus();

// ══════════ ENTRAR ══════════
async function enter() {
  sel.name = nameInput.value.trim() || 'Invitado';
  enterBtn.disabled = true;
  enterBtn.textContent = 'Pidiendo cámara…';

  try {
    localStream = await navigator.mediaDevices.getUserMedia({
      video: { width: 320, height: 240 },
      audio: { echoCancellation: true, noiseSuppression: true },
    });
    camOn = true;
  } catch (err) {
    console.warn('Sin cámara/micro:', err);
    localStream = new MediaStream();
    camOn = false;
  }

  socket = io();
  socket.on('connect', () => socket.emit('join', { name: sel.name, body: sel.body, color: sel.color, vr: sel.vr }));
  socket.on('welcome', ({ you, players }) => startOffice(you, players));
}

// ══════════ OFICINA ══════════
async function startOffice(you, players) {
  $('onboarding').classList.add('hidden');
  $('office').classList.remove('hidden');

  me = you;
  world = new World($('stage-wrap'), $('stage'));
  rtc = new RTC(socket, you.id);
  rtc.setLocalStream(localStream);

  // Servidores ICE (STUN + TURN) desde el servidor, antes de conectar con nadie.
  try {
    const r = await fetch('/ice');
    const d = await r.json();
    rtc.setIceServers(d.iceServers);
  } catch (e) {
    console.warn('No pude obtener /ice; uso solo STUN (misma red).', e);
  }

  world.setMe(you);
  world.setPlayers(players);

  // self-cam del panel lateral
  $('self-video').srcObject = localStream;
  $('self-label').textContent = you.name + ' (tú)';
  updateCamUI();

  buildPhrases();

  // red -> mundo
  socket.on('player-joined', (p) => world.addPlayer(p));
  socket.on('player-left', (id) => world.removePlayer(id));
  socket.on('player-moved', ({ id, x, y }) => world.updatePlayer(id, x, y));
  socket.on('player-av-state', ({ id, muted, camOff }) => { world.updateAvState(id, muted, camOff); refreshVideoUI(); });
  socket.on('player-zone', ({ id, zone }) => { world.setPlayerZone(id, zone); refreshVideoUI(); });
  socket.on('player-said', ({ id, text }) => world.showBubble(id, text));

  // mundo -> red
  world.onMove = (x, y) => socket.emit('move', { x, y });

  // proximidad -> conexiones WebRTC
  world.onProximityEnter = (id) => { rtc.connect(id); connectedPeers.add(id); refreshVideoUI(); };
  world.onProximityLeave = (id) => {
    rtc.disconnect(id); connectedPeers.delete(id); streamById.delete(id);
    peerVideoEls.get(id)?.remove(); peerVideoEls.delete(id);
    refreshVideoUI();
  };
  world.onVolumes = (vols) => { for (const [id, v] of vols) rtc.setVolume(id, v); };
  world.onZoneChange = (zone) => { myZone = zone; updateRoomHeader(zone); socket.emit('zone', zone); evaluateCall(); };
  // Cambia quién está en tu sala -> decide si abrir/cerrar la llamada
  world.onRoomRoster = (ids) => { roomMates = ids; evaluateCall(); };

  // vídeo remoto -> guardamos el stream y refrescamos
  rtc.onRemoteStream = (id, stream) => {
    streamById.set(id, stream);
    const v = peerVideoEls.get(id);
    if (v) v.srcObject = stream;
    refreshVideoUI();
  };
  rtc.onPeerClosed = () => {};

  // controles (panel + modal)
  $('cam-btn').addEventListener('click', toggleCam);
  $('mic-btn').addEventListener('click', toggleMic);
  $('call-cam').addEventListener('click', toggleCam);
  $('call-mic').addEventListener('click', toggleMic);
  $('call-leave').addEventListener('click', exitRoom);
  window.addEventListener('keydown', (e) => {
    if (e.target === nameInput) return;
    if (e.key.toLowerCase() === 'm') toggleMic();
  });

  world.start();
}

// ---------- frases ----------
function buildPhrases() {
  const box = $('phrases');
  box.innerHTML = '';
  for (const t of PHRASES) {
    const b = document.createElement('button');
    b.className = 'phrase';
    b.textContent = t;
    b.onclick = () => socket.emit('say', t);
    box.appendChild(b);
  }
}

// ---------- cabecera de sala ----------
const ROOM_META = {
  cafe: ['ESTÁS EN SALA', 'Cafetería', 'Máquina de café, mesa alta y dos taburetes. Se oye a todos los que están dentro.'],
  meet: ['ESTÁS EN SALA', 'Sala de reuniones', 'Mesa grande para cuando la pausa se alarga y alguien saca el portátil.'],
  games: ['ESTÁS EN SALA', 'Sala de juegos', 'Dos recreativas y la mesa de quiz. (Los minijuegos llegan en la fase 2.)'],
  plaza: ['ZONA ABIERTA', 'Plaza central', 'Espacio común. Acércate a alguien y se abre el vídeo entre vosotros.'],
};
function updateRoomHeader(zone) {
  const [eb, name, hint] = ROOM_META[zone] || ROOM_META.plaza;
  $('room-eyebrow').textContent = eb;
  $('room-name').textContent = name;
  $('room-hint').textContent = hint;
}

// ---------- vídeo: enrutado plaza (panel) / sala (modal) ----------
function initials(name) { return name.split(' ').map((p) => p[0]).join('').slice(0, 2).toUpperCase(); }

// <video> persistente por peer (no se recrea al re-renderizar, para no cortar el stream).
function getPeerVideo(id) {
  let v = peerVideoEls.get(id);
  if (!v) {
    v = document.createElement('video');
    v.autoplay = true; v.playsInline = true; v.muted = true;
    peerVideoEls.set(id, v);
  }
  const s = streamById.get(id);
  if (s && v.srcObject !== s) v.srcObject = s;
  return v;
}

function muteIcon() {
  const m = document.createElement('div');
  m.className = 'call-mutei';
  m.textContent = '🔇';
  return m;
}

function refreshVideoUI() {
  if (callZone) renderCall();
  else renderPlaza();
}

// Decide si la videollamada debe estar abierta: solo si estás en una sala
// Y hay al menos otra persona dentro (2+). Estando solo te mueves libre.
function evaluateCall() {
  const shouldCall = myZone !== 'plaza' && roomMates.length >= 1;
  if (shouldCall && !callZone) openCall(myZone);
  else if (!shouldCall && callZone) closeCall();
  else if (shouldCall && callZone) renderCall();
  else refreshVideoUI(); // plaza o solo en una sala -> panel lateral
}

function openCall(zone) {
  callZone = zone;
  world.setInputEnabled(false);
  // Colócate en un punto ALEATORIO dentro de la sala (nunca en la puerta).
  const spot = randomSpot(zone);
  if (spot) world.teleport(spot.x, spot.y);
  $('call-modal').classList.remove('hidden');
  updateCallControls();
  renderCall();
}

function closeCall() {
  callZone = null;
  world.setInputEnabled(true);   // recuperas el control (sigues en la sala)
  $('call-modal').classList.add('hidden');
  refreshVideoUI();
}

function exitRoom() {
  const ex = EXITS[callZone];
  if (ex) world.teleport(ex.x, ex.y); // salir al pasillo cierra la llamada
}

// --- Plaza: tiles en el panel lateral (proximidad) ---
function renderPlaza() {
  const grid = $('near-grid');
  grid.innerHTML = '';
  const ids = [...connectedPeers];
  for (const id of ids) {
    const p = world.players.get(id);
    if (!p) continue;
    const c = PALETTE[p.color % 6];
    const tile = document.createElement('div');
    tile.className = 'near-tile';
    const top = document.createElement('div');
    top.className = 'tile-top';
    top.style.background = `linear-gradient(160deg, ${c} 0%, #2B3674 100%)`;
    if (streamById.has(id)) top.appendChild(getPeerVideo(id));
    else { const f = document.createElement('div'); f.className = 'face'; f.textContent = initials(p.name); top.appendChild(f); }
    const info = document.createElement('div');
    info.className = 'tile-info';
    info.innerHTML = `<div class="tile-name">${p.name}</div><div class="tile-state">${streamById.has(id) ? 'en directo' : 'conectando…'}</div>`;
    tile.append(top, info);
    grid.appendChild(tile);
  }
  $('near-empty').style.display = ids.length ? 'none' : '';
  updateNearCount(ids.length);
}

// --- Sala: rejilla de videollamada en el modal ---
function renderCall() {
  const grid = $('call-grid');
  grid.innerHTML = '';
  const mates = [...connectedPeers].filter((id) => {
    const p = world.players.get(id);
    return p && p.zone === callZone;
  });
  grid.appendChild(selfTile());
  for (const id of mates) grid.appendChild(peerTile(id));

  const meta = ROOM_META[callZone];
  $('call-title').textContent = meta ? meta[1] : 'Sala';
  const n = mates.length + 1;
  $('call-count').textContent = n === 1 ? 'Solo tú por ahora' : `${n} dentro`;
}

function selfTile() {
  const tile = document.createElement('div');
  tile.className = 'call-tile me';
  if (!selfCallVideo) {
    selfCallVideo = document.createElement('video');
    selfCallVideo.autoplay = true; selfCallVideo.playsInline = true; selfCallVideo.muted = true;
  }
  selfCallVideo.srcObject = localStream;
  if (camOn && localStream.getVideoTracks().length) tile.appendChild(selfCallVideo);
  else { const f = document.createElement('div'); f.className = 'call-face'; f.style.background = 'linear-gradient(160deg,#2F76F7,#2B3674)'; f.textContent = initials(me.name); tile.appendChild(f); }
  const name = document.createElement('div'); name.className = 'call-name'; name.textContent = me.name + ' (tú)';
  tile.appendChild(name);
  if (!micOn) tile.appendChild(muteIcon());
  return tile;
}

function peerTile(id) {
  const p = world.players.get(id);
  const tile = document.createElement('div');
  tile.className = 'call-tile';
  if (streamById.has(id)) tile.appendChild(getPeerVideo(id));
  else { const c = PALETTE[p.color % 6]; const f = document.createElement('div'); f.className = 'call-face'; f.style.background = `linear-gradient(160deg, ${c}, #2B3674)`; f.textContent = initials(p.name); tile.appendChild(f); }
  const name = document.createElement('div'); name.className = 'call-name'; name.textContent = p.name;
  tile.appendChild(name);
  if (p.muted) tile.appendChild(muteIcon());
  return tile;
}

function updateNearCount(n) {
  const chip = $('near-count');
  chip.textContent = n;
  chip.classList.toggle('active', n > 0);
}

function updateCallControls() {
  $('call-mic').classList.toggle('off', !micOn);
  $('call-mic').textContent = micOn ? '🎤' : '🔇';
  $('call-cam').classList.toggle('off', !camOn);
  $('call-cam').textContent = camOn ? '📷' : '🚫';
}

// ---------- cámara / micro ----------
function updateCamUI() {
  $('cam-overlay').style.display = camOn ? 'none' : 'flex';
  $('cam-btn').textContent = camOn ? 'Apagar cámara' : 'Activar mi cámara';
  $('cam-btn').classList.toggle('small', true);
}

async function toggleCam() {
  const tracks = localStream.getVideoTracks();
  if (tracks.length === 0) {
    // no teníamos vídeo: intentar pedirlo ahora
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { width: 320, height: 240 } });
      const track = s.getVideoTracks()[0];
      localStream.addTrack(track);
      rtc.addTrack(track, localStream);
      $('self-video').srcObject = localStream;
      camOn = true;
    } catch (err) {
      $('cam-msg').textContent = 'No hay permiso de cámara. Actívalo en el navegador y vuelve a intentarlo.';
      return;
    }
  } else {
    camOn = !camOn;
    for (const t of tracks) t.enabled = camOn;
  }
  updateCamUI();
  updateCallControls();
  refreshVideoUI();
  socket.emit('av-state', { camOff: !camOn });
}

function toggleMic() {
  micOn = !micOn;
  for (const t of localStream.getAudioTracks()) t.enabled = micOn;
  const b = $('mic-btn');
  b.classList.toggle('off', !micOn);
  b.textContent = micOn ? '🎤 Micro' : '🔇 Silencio';
  updateCallControls();
  refreshVideoUI();
  socket.emit('av-state', { muted: !micOn });
}
