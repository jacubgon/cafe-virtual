// Constantes del mundo + construcción de avatares "muñeco", portado del diseño
// de Claude Design (Oficina Virtual) para mantener la fidelidad visual.

export const W = 1180;
export const H = 700;
export const RADIUS = 150; // radio de proximidad (px del mundo)

// Salas del mapa, ahora como habitaciones de un ÚNICO plano de oficina.
// "nearby" = dentro del radio O en la misma sala (no plaza/pasillo).
// Cada sala comparte muros con el pasillo central y conecta por una puerta.
export const ROOMS = [
  { id: 'cafe', name: 'Cafetería', x: 20, y: 20, w: 410, h: 330,
    hint: 'Máquina de café, mesa alta y dos taburetes. Se oye a todos los que están dentro.' },
  { id: 'meet', name: 'Sala de reuniones', x: 760, y: 20, w: 400, h: 330,
    hint: 'Mesa grande para cuando la pausa se alarga y alguien saca el portátil.' },
  { id: 'games', name: 'Sala de juegos', x: 20, y: 350, w: 410, h: 330,
    hint: 'Dos recreativas y la mesa de quiz. (Los minijuegos llegan en la fase 2.)' },
];

// Muros sólidos (segmentos). Los huecos entre segmentos son las PUERTAS.
// Se usan tanto para dibujar como para la colisión, así siempre coinciden.
export const WALLS = [
  // Contorno del edificio (rectángulo único)
  { x: 20, y: 20, w: 1140, h: 12 },   // arriba
  { x: 20, y: 668, w: 1140, h: 12 },  // abajo
  { x: 20, y: 20, w: 12, h: 660 },    // izquierda
  { x: 1148, y: 20, w: 12, h: 660 },  // derecha
  // Muro vertical x≈430 (izquierda | pasillo). Puertas: y180-250 y y470-540
  { x: 424, y: 20, w: 12, h: 160 },
  { x: 424, y: 250, w: 12, h: 220 },
  { x: 424, y: 540, w: 12, h: 140 },
  // Muro vertical x≈760 (pasillo | reuniones), solo arriba. Puerta: y150-220
  { x: 754, y: 20, w: 12, h: 130 },
  { x: 754, y: 220, w: 12, h: 130 },
  // Muro horizontal y≈350 izquierda (cafetería | sala de juegos)
  { x: 20, y: 344, w: 416, h: 12 },
  // Muro horizontal y≈350 derecha (reuniones | plaza inferior)
  { x: 754, y: 344, w: 406, h: 12 },
];

// Puertas (solo decorativas: felpudo/umbral en cada hueco de muro).
export const DOORS = [
  { x: 424, y: 185, w: 12, h: 60 },   // cafetería ↔ pasillo
  { x: 424, y: 475, w: 12, h: 60 },   // sala de juegos ↔ pasillo
  { x: 754, y: 155, w: 12, h: 60 },   // reuniones ↔ pasillo
];

// ¿Está el punto (x,y) con radio r dentro de algún muro?
export function blocked(x, y, r = 9) {
  for (const w of WALLS) {
    if (x > w.x - r && x < w.x + w.w + r && y > w.y - r && y < w.y + w.h + r) return true;
  }
  return false;
}

export const SKIN = ['#F2C9A8', '#E0A87C', '#C98A5E', '#8D5A3B'];
export const HAIRS = ['#2B3674', '#3F3F3E', '#8B5E34', '#D8A657'];
export const PALETTE = ['#479DFD', '#7B6AE2', '#12B76A', '#F3A257', '#D86761', '#2960C3'];

export function zoneOf(x, y) {
  for (const r of ROOMS) if (x > r.x && x < r.x + r.w && y > r.y && y < r.y + r.h) return r.id;
  return 'plaza';
}

// Devuelve los estilos de las 5 capas del avatar a una escala `s`.
export function avatarParts(color, body, vr, s = 1) {
  const c = PALETTE[color % 6], sk = SKIN[body % 4], hr = HAIRS[body % 4];
  const w = 22 * s;
  return {
    hair: { position: 'absolute', left: '50%', top: '0px', transform: 'translateX(-50%)',
      width: w + 'px', height: 5 * s + 'px', background: hr, borderRadius: `${2 * s}px ${2 * s}px 0 0` },
    head: { position: 'absolute', left: '50%', top: 4 * s + 'px', transform: 'translateX(-50%)',
      width: 18 * s + 'px', height: 14 * s + 'px', background: sk, borderRadius: 3 * s + 'px' },
    goggles: { position: 'absolute', left: '50%', top: 9 * s + 'px', transform: 'translateX(-50%)',
      width: 22 * s + 'px', height: 7 * s + 'px', background: '#2B3674', borderRadius: 2 * s + 'px',
      borderTop: Math.max(1, s) + 'px solid ' + c, opacity: vr ? 1 : 0 },
    body: { position: 'absolute', left: '50%', top: 18 * s + 'px', transform: 'translateX(-50%)',
      width: 24 * s + 'px', height: 18 * s + 'px', background: c, borderRadius: 3 * s + 'px' },
    legs: { position: 'absolute', left: '50%', top: 36 * s + 'px', transform: 'translateX(-50%)',
      width: 18 * s + 'px', height: 8 * s + 'px', background: '#2B3674',
      borderRadius: `0 0 ${2 * s}px ${2 * s}px` },
  };
}

function applyStyle(el, styles) {
  el.style.cssText = '';
  for (const [k, v] of Object.entries(styles)) el.style[k] = v;
}

// Crea (o actualiza) las 5 capas del muñeco dentro de `wrap`.
export function renderAvatar(wrap, { color, body, vr, scale = 1 }) {
  const parts = avatarParts(color, body, vr, scale);
  const order = ['hair', 'head', 'goggles', 'body', 'legs'];
  let layers = wrap.__layers;
  if (!layers) {
    layers = {};
    for (const name of order) {
      const d = document.createElement('div');
      d.dataset.layer = name;
      wrap.appendChild(d);
      layers[name] = d;
    }
    wrap.__layers = layers;
  }
  for (const name of order) applyStyle(layers[name], parts[name]);
}
