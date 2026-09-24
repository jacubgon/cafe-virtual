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
  const debug = req.query.debug === '1';
  const diag = { source: 'stun' };
  try {
    // Opción A: Metered.ca con credenciales efímeras (recomendado, seguro).
    const domainRaw = (process.env.METERED_DOMAIN || '').trim();
    const domain = domainRaw.replace(/^https?:\/\//, '').replace(/\/+$/, '');
    const key = (process.env.METERED_API_KEY || '').trim();
    diag.hasDomain = !!domain; diag.domain = domain;
    diag.hasKey = !!key; diag.keyLen = key.length;

    if (domain && key) {
      const now = Date.now();
      if (!iceCache || now - iceCacheAt > 5 * 60 * 1000) {
        const url = `https://${domain}/api/v1/turn/credentials?apiKey=${key}`;
        const r = await fetch(url);
        diag.fetchStatus = r.status;
        const body = await r.text();
        if (r.ok) {
          try { iceCache = JSON.parse(body); iceCacheAt = now; }
          catch { diag.parseError = true; }
        } else {
          diag.fetchBody = body.slice(0, 200);
          console.error('ICE Metered fetch no-ok:', r.status, diag.fetchBody);
        }
      }
      if (iceCache) {
        diag.source = 'metered';
        diag.turnCount = iceCache.filter((s) => {
          const u = Array.isArray(s.urls) ? s.urls : [s.urls];
          return u.some((x) => x && x.startsWith('turn'));
        }).length;
        if (debug) return res.json({ diag });
        return res.json({ iceServers: iceCache });
      }
    }
    // Opción B: TURN estático por env (cualquier proveedor / coturn propio).
    if (process.env.TURN_URLS) {
      diag.source = 'static';
      const turn = {
        urls: process.env.TURN_URLS.split(',').map((s) => s.trim()),
        username: process.env.TURN_USERNAME || '',
        credential: process.env.TURN_CREDENTIAL || '',
      };
      if (debug) return res.json({ diag });
      return res.json({ iceServers: [...STUN, turn] });
    }
  } catch (e) {
    diag.error = String(e);
    console.error('ICE /ice error:', e);
  }
  // Sin TURN (o fallo): solo STUN (funciona en la misma red).
  if (debug) return res.json({ diag });
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

// ══════════ Minijuego: Quiz de la Sala de juegos ══════════
// Estado compartido y autoritativo en el servidor: todos los de la sala 'games'
// ven la misma pregunta, responden, se revela y se llevan la cuenta de puntos.
const QUIZ = [
  ['¿Cuál es el río más largo de Europa?', ['Volga', 'Danubio', 'Rin', 'Sena'], 0],
  ['¿Quién pintó Las Meninas?', ['Goya', 'Velázquez', 'El Greco', 'Sorolla'], 1],
  ['¿Cuál es la capital de Nueva Zelanda?', ['Auckland', 'Wellington', 'Christchurch', 'Hamilton'], 1],
  ['¿Cuántos huesos tiene el cuerpo humano adulto?', ['186', '206', '224', '198'], 1],
  ['¿Qué planeta tiene más lunas conocidas?', ['Júpiter', 'Saturno', 'Urano', 'Neptuno'], 1],
  ['¿En qué año pisó el primer humano la Luna?', ['1965', '1969', '1972', '1961'], 1],
  ['¿Qué metal es líquido a temperatura ambiente?', ['Mercurio', 'Plomo', 'Galio', 'Sodio'], 0],
  ['¿En qué país está Machu Picchu?', ['Chile', 'Perú', 'Bolivia', 'Ecuador'], 1],
];
const QUIZ_ROUND = 6;      // preguntas por partida
const QUIZ_TIMEOUT = 25000; // ms para responder antes de revelar solo

let game = null;   // { order:[idx], qi, phase:'question'|'reveal'|'done', answers:{id:choice}, scores:{id:n} }
let qTimer = null;

const gamesRoom = () => [...players.values()].filter((p) => p.zone === 'games').map((p) => p.id);
const roster = () => [...players.values()].filter((p) => p.zone === 'games').map((p) => ({ id: p.id, name: p.name, color: p.color }));
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

function gameView() {
  if (!game) return { phase: 'idle', roster: roster() };
  const q = QUIZ[game.order[game.qi]];
  const reveal = game.phase === 'reveal' || game.phase === 'done';
  return {
    phase: game.phase,
    qi: game.qi, total: game.order.length,
    question: q ? q[0] : '', options: q ? q[1] : [],
    answered: Object.keys(game.answers),
    correct: reveal && q ? q[2] : null,
    picks: game.phase === 'reveal' ? game.answers : null,
    scores: game.scores,
    roster: roster(),
  };
}
function broadcastGame() { const v = gameView(); for (const id of gamesRoom()) io.to(id).emit('game:state', v); }
function clearQTimer() { if (qTimer) { clearTimeout(qTimer); qTimer = null; } }
function armQTimer() { clearQTimer(); qTimer = setTimeout(() => { if (game && game.phase === 'question') doReveal(); }, QUIZ_TIMEOUT); }
function startGame() {
  const order = shuffle([...QUIZ.keys()]).slice(0, Math.min(QUIZ_ROUND, QUIZ.length));
  game = { order, qi: 0, phase: 'question', answers: {}, scores: {} };
  armQTimer(); broadcastGame();
}
function doReveal() {
  if (!game) return;
  clearQTimer();
  const q = QUIZ[game.order[game.qi]];
  for (const [id, choice] of Object.entries(game.answers)) if (choice === q[2]) game.scores[id] = (game.scores[id] || 0) + 1;
  game.phase = 'reveal'; broadcastGame();
}
function checkAllAnswered() {
  if (!game || game.phase !== 'question') return;
  const room = gamesRoom();
  if (room.length > 0 && room.every((id) => id in game.answers)) doReveal();
}
function nextQuestion() {
  if (!game) return;
  if (game.qi + 1 >= game.order.length) { game.phase = 'done'; clearQTimer(); broadcastGame(); return; }
  game.qi++; game.answers = {}; game.phase = 'question'; armQTimer(); broadcastGame();
}
function resetGame() { clearQTimer(); game = null; }

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
    const prev = p.zone;
    p.zone = z;
    socket.broadcast.emit('player-zone', { id: socket.id, zone: z });
    // Sincronizar el minijuego al entrar/salir de la Sala de juegos.
    if (z === 'games') {
      io.to(socket.id).emit('game:state', gameView());
      broadcastGame();
    } else if (prev === 'games') {
      if (game) delete game.answers[socket.id];
      if (gamesRoom().length === 0) resetGame();
      else { broadcastGame(); checkAllAnswered(); }
    }
  });

  // ----- Minijuego (solo válido en la Sala de juegos) -----
  socket.on('game:start', () => {
    const p = players.get(socket.id);
    if (!p || p.zone !== 'games') return;
    if (!game || game.phase === 'done') startGame();
  });
  socket.on('game:answer', (choice) => {
    const p = players.get(socket.id);
    if (!p || p.zone !== 'games' || !game || game.phase !== 'question') return;
    if (!(socket.id in game.answers) && Number.isInteger(choice)) {
      game.answers[socket.id] = choice;
      broadcastGame();
      checkAllAnswered();
    }
  });
  socket.on('game:next', () => {
    const p = players.get(socket.id);
    if (!p || p.zone !== 'games' || !game) return;
    if (game.phase === 'reveal') nextQuestion();
    else if (game.phase === 'done') startGame();
  });

  // Emote / reacción -> emoji flotante sobre el avatar (visible para todos).
  socket.on('emote', (e) => {
    const p = players.get(socket.id);
    if (!p) return;
    const ALLOWED = ['👋', '❤️', '😂', '👍', '🎉', '☕'];
    if (!ALLOWED.includes(e)) return;
    io.emit('player-emote', { id: socket.id, emote: e });
  });

  // Estado de "hablando" (lo detecta cada cliente con su propio micro).
  socket.on('speaking', (b) => {
    const p = players.get(socket.id);
    if (!p) return;
    p.speaking = !!b;
    socket.broadcast.emit('player-speaking', { id: socket.id, speaking: !!b });
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
    const wasGames = players.get(socket.id)?.zone === 'games';
    if (players.delete(socket.id)) {
      io.emit('player-left', socket.id);
      if (wasGames && game) {
        delete game.answers[socket.id];
        if (gamesRoom().length === 0) resetGame();
        else { broadcastGame(); checkAllAnswered(); }
      }
    }
  });
});

server.listen(PORT, () => {
  console.log(`☕  Café virtual (Dynamics VR) escuchando en http://localhost:${PORT}`);
});
