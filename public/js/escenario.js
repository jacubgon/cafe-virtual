// Escenario v2 — mundo, colisiones, zonas de audio y dibujo.
// Uso:
//   import { buildRooms, blocked, zoneOf, canHear } from './escenario.js';
//   buildRooms(this.stageEl);               // dibuja suelo, muebles y muros
//   if (!blocked(nx, ny)) { x = nx; y = ny } // colisión (radio del avatar = AR)
//   avatarEl.style.zIndex = Math.round(y) + 10; // orden de profundidad con muebles altos

export const W = 1180, H = 700, RADIUS = 150, AR = 14;

// Salas (audio/proximidad). Fuera de ellas = 'plaza' (audio por distancia).
export const ROOMS = [
  { id: 'cafe',  name: 'Cafetería',      x: 20,  y: 20,  w: 400, h: 330 },
  { id: 'meet',  name: 'Reuniones',      x: 760, y: 20,  w: 400, h: 330 },
  { id: 'games', name: 'Juegos',         x: 20,  y: 350, w: 400, h: 330 },
  { id: 'quiet', name: 'Sala tranquila', x: 760, y: 350, w: 400, h: 330 },
];

// Muros. v:1 = muro vertical interior (sus huecos se convierten en puertas).
export const WALLS = [
  { x: 20, y: 20, w: 1140, h: 12 }, { x: 20, y: 668, w: 1140, h: 12 },
  { x: 20, y: 20, w: 12, h: 660 }, { x: 1148, y: 20, w: 12, h: 660 },
  { x: 408, y: 20, w: 12, h: 120, v: 1 }, { x: 408, y: 210, w: 12, h: 280, v: 1 }, { x: 408, y: 560, w: 12, h: 120, v: 1 },
  { x: 760, y: 20, w: 12, h: 120, v: 1 }, { x: 760, y: 210, w: 12, h: 280, v: 1 }, { x: 760, y: 560, w: 12, h: 120, v: 1 },
  { x: 20, y: 344, w: 400, h: 12 }, { x: 760, y: 344, w: 400, h: 12 },
];

// Puertas calculadas a partir de los huecos: si mueves un muro, la puerta se mueve sola.
export const DOORS = (() => {
  const g = {};
  WALLS.filter((w) => w.v).forEach((w) => (g[w.x] = g[w.x] || []).push(w));
  const out = [];
  Object.values(g).forEach((list) => {
    list.sort((a, b) => a.y - b.y);
    for (let i = 1; i < list.length; i++) {
      const a = list[i - 1], b = list[i];
      if (b.y > a.y + a.h) out.push({ x: a.x, y: a.y + a.h, w: a.w, h: b.y - a.y - a.h });
    }
  });
  return out;
})();

// ── Helpers de estilo ──
const SOFT = '0 1.7px 10px 0 rgba(112,144,176,0.12)';
const box = (x, y, w, h, bg, r = 12, extra = {}) =>
  ({ position: 'absolute', left: x, top: y, width: w, height: h, borderRadius: r, background: bg, ...extra });
const circ = (cx, cy, d, bg, extra = {}) => box(cx - d / 2, cy - d / 2, d, d, bg, 999, extra);
const labelStyle = { position: 'absolute', fontSize: 11, fontWeight: 600, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#2B3674', fontFamily: "'DM Sans', system-ui, sans-serif" };

// ── Definición del mundo (dibujo + colisión en un solo sitio) ──
function defineWorld() {
  const floor = [], tall = [], rects = [], circles = [];
  // it = { s: estilo, kids?: [estilos hijos], text?: string, solidCircle?: {cx,cy,r} }
  const add = (it, { solid, round, isTall } = {}) => {
    const s = it.s;
    if (solid) {
      if (round) circles.push(it.solidCircle || { cx: s.left + s.width / 2, cy: s.top + s.height / 2, r: s.width / 2 });
      else rects.push({ x: s.left, y: s.top, w: s.width, h: s.height });
    } else if (it.solidCircle) circles.push(it.solidCircle);
    (isTall ? tall : floor).push(it);
  };
  const plant = (cx, cy, d) => ({ s: circ(cx, cy, d, '#D1FADF'), kids: [circ(d / 2, d / 2, d * 0.45, '#5CC89B')], solidCircle: { cx, cy, r: d / 2 } });
  const label = (x, y, text, extra = {}) => ({ s: { ...labelStyle, left: x, top: y, ...extra }, text });

  // Suelo y zonas
  add({ s: box(20, 20, 1140, 660, 'linear-gradient(160deg,#F7F9FD,#EEF2FA)', 28) });
  add({ s: box(32, 32, 376, 312, '#E9F2FE', 20) });
  add({ s: box(772, 32, 376, 312, '#ECEFFB', 20) });
  add({ s: box(32, 356, 376, 312, '#F1ECFC', 20) });
  add({ s: box(772, 356, 376, 312, '#EAF9FF', 20) });

  // Plaza: dos pasillos + anillo alrededor de la fuente
  add({ s: box(420, 150, 340, 50, '#E9EDFF', 0) });
  add({ s: box(420, 500, 340, 50, '#E9EDFF', 0) });
  add({ s: circ(590, 350, 326, 'transparent', { border: '26px solid #E9EDFF', boxSizing: 'border-box' }) });
  add({ s: circ(590, 350, 150, '#EAF9FF') });

  // Fuente = símbolo de marca (anillo abierto + puntos que crecen)
  const dots = [[322, 6], [342, 8], [2, 10]].map(([a, d]) => {
    const t = (a * Math.PI) / 180;
    return circ(60 + 49 * Math.sin(t), 60 - 49 * Math.cos(t), d, '#479DFD');
  });
  const mask = 'radial-gradient(circle,transparent 38px,#000 39px)';
  add({ s: circ(590, 350, 120, 'transparent'), kids: [
    box(0, 0, 120, 120, 'conic-gradient(from 20deg,#CDE9EE 0deg,#A9D6E0 290deg,transparent 290deg)', 999, { WebkitMaskImage: mask, maskImage: mask }),
    ...dots,
  ], solidCircle: { cx: 590, cy: 350, r: 62 } });

  // Escenario
  add({ s: box(470, 36, 240, 70, '#E9EDFF', 16), kids: [box(50, 6, 140, 8, '#3B67B7', 4)] });
  add(label(470, 72, 'Escenario', { width: 240, textAlign: 'center' }));
  [510, 550, 590, 630, 670].forEach((x) => add({ s: circ(x, 128, 16, '#DCE3F6') }));

  // Plaza abajo
  add(plant(462, 622, 42)); add(plant(718, 622, 42));
  add({ s: box(540, 612, 100, 22, '#D9E0F4', 11, { boxShadow: SOFT }) }, { solid: true });

  // Cafetería
  add(label(52, 48, 'Cafetería'));
  add({ s: box(60, 78, 200, 40, '#CFE0FA', 14, { boxShadow: SOFT }),
    kids: [box(14, -12, 44, 30, '#B9CDF0', 10), circ(150, 20, 14, '#EAF1FD'), circ(174, 20, 14, '#EAF1FD')] },
    { solid: true, isTall: true });
  [[120, 230], [290, 262]].forEach(([cx, cy]) => {
    [[-46, 0], [46, 0], [0, -46], [0, 46]].forEach(([dx, dy]) => add({ s: circ(cx + dx, cy + dy, 22, '#C6D7F4') }));
    add({ s: circ(cx, cy, 62, '#DCEAFB', { boxShadow: SOFT }), kids: [circ(31, 31, 12, '#FFFFFF')] }, { solid: true, round: true });
  });
  add(plant(372, 70, 40), { solid: true, round: true });

  // Reuniones
  add(label(804, 48, 'Reuniones'));
  add({ s: box(900, 38, 140, 8, '#3B67B7', 4) });
  [880, 953, 1026].forEach((x) => { add({ s: box(x, 116, 24, 18, '#C6D1EE', 8) }); add({ s: box(x, 236, 24, 18, '#C6D1EE', 8) }); });
  add({ s: box(840, 140, 250, 90, '#DCE3F6', 45, { boxShadow: SOFT }) }, { solid: true });
  add(plant(1114, 310, 36), { solid: true, round: true });

  // Juegos
  add(label(52, 380, 'Juegos'));
  add({ s: box(60, 580, 220, 60, '#E4DAF7', 30) });
  [100, 170, 240].forEach((x) => add({ s: circ(x, 610, 34, '#C8BAF0') }));
  add({ s: box(60, 410, 60, 100, '#DAD0F5', 14, { boxShadow: SOFT }), kids: [box(11, 14, 38, 32, '#7B6AE2', 8)] }, { solid: true, isTall: true });
  add({ s: box(136, 410, 60, 100, '#ECD8EE', 14, { boxShadow: SOFT }), kids: [box(11, 14, 38, 32, '#E2C0E6', 8)] }, { solid: true, isTall: true });
  add({ s: box(210, 432, 130, 80, '#E0D6F7', 12, { boxShadow: SOFT }), kids: [box(64, 0, 2, 80, '#FFFFFF', 0), circ(40, 30, 8, '#FFFFFF')] }, { solid: true });

  // Sala tranquila
  add(label(804, 380, 'Sala tranquila'));
  add({ s: circ(1010, 400, 180, 'radial-gradient(circle,rgba(250,188,30,0.14),rgba(250,188,30,0))') });
  add({ s: circ(940, 520, 180, '#D3F2FF') });
  for (let i = 0; i < 6; i++) {
    const t = (i * Math.PI) / 3;
    add({ s: circ(940 + 66 * Math.cos(t), 520 + 66 * Math.sin(t), 32, '#A9D6E0') });
  }
  add({ s: circ(940, 520, 48, '#FFFFFF', { boxShadow: SOFT }) }, { solid: true, round: true });
  add({ s: box(1104, 392, 32, 220, '#CBD6F2', 8, { boxShadow: SOFT }),
    kids: [0, 1, 2, 3].map((i) => box(6, 14 + i * 52, 20, 36, i % 2 ? '#AFC0EC' : '#E9EDFF', 4)) },
    { solid: true, isTall: true });
  add(plant(806, 636, 36), { solid: true, round: true });

  // Puertas y muros
  DOORS.forEach((d) => add({ s: box(d.x - 6, d.y, d.w + 12, d.h, '#E9EDFF', 6) }));
  WALLS.forEach((w) => { add({ s: box(w.x, w.y, w.w, w.h, '#CBD6F2', 6) }); rects.push(w); });

  return { floor, tall, rects, circles };
}
export const WORLD = defineWorld();

// ── Lógica ──
export const zoneOf = (x, y) =>
  ROOMS.find((r) => x >= r.x && x < r.x + r.w && y >= r.y && y < r.y + r.h) || { id: 'plaza', name: 'Plaza' };

// ¿Choca un avatar de radio r en (x,y)? Muros + muebles sólidos (rects y círculos).
export function blocked(x, y, r = AR) {
  if (x < r || y < r || x > W - r || y > H - r) return true;
  for (const s of WORLD.rects) {
    const cx = Math.max(s.x, Math.min(x, s.x + s.w)), cy = Math.max(s.y, Math.min(y, s.y + s.h));
    if ((x - cx) ** 2 + (y - cy) ** 2 < r * r) return true;
  }
  for (const c of WORLD.circles) if ((x - c.cx) ** 2 + (y - c.cy) ** 2 < (r + c.r) ** 2) return true;
  return false;
}

// Movimiento con deslizamiento por paredes (prueba X y luego Y). Devuelve true si se movió.
export function moveBy(a, dx, dy) {
  let moved = false;
  if (!blocked(a.x + dx, a.y)) { a.x += dx; moved = true; }
  if (!blocked(a.x, a.y + dy)) { a.y += dy; moved = true; }
  return moved;
}

// Audio: misma sala = se oyen; plaza = por distancia; salas distintas = no.
export function canHear(a, b) {
  const za = zoneOf(a.x, a.y).id, zb = zoneOf(b.x, b.y).id;
  if (za !== zb) return false;
  return za !== 'plaza' || Math.hypot(a.x - b.x, a.y - b.y) < RADIUS;
}

// ── Dibujo DOM ──
const toCss = (s) => {
  const el = document.createElement('div');
  for (const [k, v] of Object.entries(s)) el.style[k] = typeof v === 'number' && k !== 'zIndex' && k !== 'opacity' && k !== 'fontWeight' ? v + 'px' : v;
  return el;
};
const makeEl = (it) => {
  const el = toCss(it.s);
  (it.kids || []).forEach((k) => el.appendChild(toCss(k)));
  if (it.text) el.appendChild(document.createTextNode(it.text));
  return el;
};

// Dibuja el escenario en stageEl. Los muebles altos se añaden sueltos con zIndex = su base,
// para que los avatares (zIndex = y + 10) queden delante o detrás según su posición.
export function buildRooms(stageEl) {
  const bg = document.createElement('div');
  bg.style.cssText = 'position:absolute;inset:0;z-index:0;pointer-events:none;';
  WORLD.floor.forEach((it) => bg.appendChild(makeEl(it)));
  stageEl.appendChild(bg);
  WORLD.tall.forEach((it) => {
    const el = makeEl(it);
    el.style.zIndex = String(it.s.top + it.s.height);
    el.style.pointerEvents = 'none';
    stageEl.appendChild(el);
  });
  return bg;
}
