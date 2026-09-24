// Servidor del café virtual (Oficina Virtual Dynamics VR).
// Hace tres cosas: sirve la web estática, sincroniza el estado del mundo
// (jugadores + posiciones + avatar) por WebSocket, y relega la señalización
// WebRTC entre pares para que abran vídeo/audio directo entre ellos.

import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { fileURLToPath } from 'url';
import path from 'path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3000;

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, '..', 'public')));

// Servidores ICE (STUN + TURN) para WebRTC. El STUN público basta en la misma
// red; el TURN (necesario entre redes distintas) se configura por variables de
// entorno, así la clave del proveedor nunca va en el código del cliente.
const STUN = [
  { urls: ['stun:stun.l.google.com:19302', 'stun:stun1.l.google.com:19302'] },
];
let iceCache = null;
let iceCacheAt = 0;

app.get('/ice', async (req, res) => {
  try {
    // Opción A: Metered.ca con credenciales efímeras (recomendado, seguro).
    if (process.env.METERED_DOMAIN && process.env.METERED_API_KEY) {
      const now = Date.now();
      if (!iceCache || now - iceCacheAt > 5 * 60 * 1000) {
        const url = `https://${process.env.METERED_DOMAIN}/api/v1/turn/credentials?apiKey=${process.env.METERED_API_KEY}`;
        const r = await fetch(url);
        if (r.ok) { iceCache = await r.json(); iceCacheAt = now; }
      }
      if (iceCache) return res.json({ iceServers: iceCache });
    }
    // Opción B: TURN estático por env (cualquier proveedor / coturn propio).
    if (process.env.TURN_URLS) {
      const turn = {
        urls: process.env.TURN_URLS.split(',').map((s) => s.trim()),
        username: process.env.TURN_USERNAME || '',
        credential: process.env.TURN_CREDENTIAL || '',
      };
      return res.json({ iceServers: [...STUN, turn] });
    }
  } catch (e) {
    console.error('ICE /ice error:', e);
  }
  // Sin TURN configurado: solo STUN (funciona en la misma red).
  res.json({ iceServers: STUN });
});

// Estado del mundo en memoria. Para <15 personas sobra de largo.
// id -> { id, name, body, color, vr, x, y, muted, camOff }
const players = new Map();

// Punto de aparición: la plaza central del mapa (coincide con world.js).
const SPAWN = { x: 590, y: 380 };

function sanitize(p = {}) {
  return {
    name: String(p.name || 'Invitado').slice(0, 24).trim() || 'Invitado',
    body: Number.isInteger(p.body) ? Math.max(0, Math.min(3, p.body)) : 0,
    color: Number.isInteger(p.color) ? Math.max(0, Math.min(5, p.color)) : 0,
    vr: !!p.vr,
  };
}

io.on('connection', (socket) => {
  // El cliente manda su nombre + avatar elegido para entrar al mundo.
  socket.on('join', (info) => {
    const base = sanitize(info);
    const player = {
      id: socket.id,
      ...base,
      x: SPAWN.x + (Math.random() * 120 - 60),
      y: SPAWN.y + (Math.random() * 80 - 40),
      zone: 'plaza',
      muted: false,
      camOff: false,
    };
    players.set(socket.id, player);

    socket.emit('welcome', { you: player, players: [...players.values()] });
    socket.broadcast.emit('player-joined', player);
  });

  // Movimiento (posición en el mundo).
  socket.on('move', ({ x, y }) => {
    const p = players.get(socket.id);
    if (!p) return;
    p.x = x;
    p.y = y;
    socket.broadcast.emit('player-moved', { id: socket.id, x, y });
  });

  // Estado de micro/cámara para pintar iconos en el avatar.
  socket.on('av-state', ({ muted, camOff }) => {
    const p = players.get(socket.id);
    if (!p) return;
    if (typeof muted === 'boolean') p.muted = muted;
    if (typeof camOff === 'boolean') p.camOff = camOff;
    socket.broadcast.emit('player-av-state', { id: socket.id, muted: p.muted, camOff: p.camOff });
  });

  // Sala en la que está el jugador (la anuncia el cliente, no se adivina).
  socket.on('zone', (zone) => {
    const p = players.get(socket.id);
    if (!p) return;
    const z = ['cafe', 'meet', 'games', 'plaza'].includes(zone) ? zone : 'plaza';
    p.zone = z;
    socket.broadcast.emit('player-zone', { id: socket.id, zone: z });
  });

  // Frase rápida -> bocadillo sobre el avatar (visible para todos).
  socket.on('say', (text) => {
    const p = players.get(socket.id);
    if (!p) return;
    const clean = String(text || '').slice(0, 80);
    if (!clean) return;
    io.emit('player-said', { id: socket.id, text: clean });
  });

  // Señalización WebRTC: reenviamos el mensaje al par destino tal cual.
  socket.on('signal', ({ to, data }) => {
    if (!players.has(to)) return;
    io.to(to).emit('signal', { from: socket.id, data });
  });

  socket.on('disconnect', () => {
    if (players.delete(socket.id)) {
      io.emit('player-left', socket.id);
    }
  });
});

server.listen(PORT, () => {
  console.log(`☕  Café virtual (Dynamics VR) escuchando en http://localhost:${PORT}`);
});
