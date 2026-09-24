// Pathfinding A* sobre una rejilla de transitabilidad derivada de los muros.
// Permite que el "clic para caminar" calcule la ruta y cruce las puertas solo,
// en vez de ir en línea recta y chocar.

import { W, H, blocked } from './avatar.js';

const CELL = 20;
const COLS = Math.ceil(W / CELL);
const ROWS = Math.ceil(H / CELL);
const MARGIN = 11; // radio con el que evaluamos muros (avatar ~9 + colchón)

const cx = (c) => c * CELL + CELL / 2;
const cy = (r) => r * CELL + CELL / 2;

// Rejilla: true = transitable. Se calcula una sola vez.
const walk = [];
for (let r = 0; r < ROWS; r++) {
  walk[r] = [];
  for (let c = 0; c < COLS; c++) walk[r][c] = !blocked(cx(c), cy(r), MARGIN);
}

const inside = (c, r) => c >= 0 && c < COLS && r >= 0 && r < ROWS;
const walkable = (c, r) => inside(c, r) && walk[r][c];

// Celda transitable más cercana a un punto (búsqueda en anillos).
function nearestCell(px, py) {
  let c0 = Math.floor(px / CELL), r0 = Math.floor(py / CELL);
  if (walkable(c0, r0)) return [c0, r0];
  for (let rad = 1; rad < Math.max(COLS, ROWS); rad++) {
    for (let dr = -rad; dr <= rad; dr++) {
      for (let dc = -rad; dc <= rad; dc++) {
        if (Math.abs(dr) !== rad && Math.abs(dc) !== rad) continue;
        if (walkable(c0 + dc, r0 + dr)) return [c0 + dc, r0 + dr];
      }
    }
  }
  return null;
}

// ¿Hay línea recta libre entre dos puntos del mundo?
function lineClear(x0, y0, x1, y1) {
  const d = Math.hypot(x1 - x0, y1 - y0);
  const steps = Math.max(1, Math.ceil(d / 8));
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    if (blocked(x0 + (x1 - x0) * t, y0 + (y1 - y0) * t, MARGIN)) return false;
  }
  return true;
}

const NEI = [
  [1, 0, 1], [-1, 0, 1], [0, 1, 1], [0, -1, 1],
  [1, 1, 1.41421], [1, -1, 1.41421], [-1, 1, 1.41421], [-1, -1, 1.41421],
];

// Devuelve una lista de puntos {x,y} a recorrer (sin el origen), o [] si nada.
export function findPath(sx, sy, tx, ty) {
  // Atajo: si se ve en línea recta, un único punto.
  if (lineClear(sx, sy, tx, ty)) return [{ x: tx, y: ty }];

  const start = nearestCell(sx, sy);
  const goal = nearestCell(tx, ty);
  if (!start || !goal) return [];
  const [sc, sr] = start, [gc, gr] = goal;

  const key = (c, r) => r * COLS + c;
  const open = new Map();       // key -> f
  const came = new Map();
  const g = new Map();
  const startK = key(sc, sr);
  g.set(startK, 0);
  open.set(startK, 0);

  const h = (c, r) => Math.hypot(c - gc, r - gr);

  while (open.size) {
    // nodo con menor f
    let curK = null, best = Infinity;
    for (const [k, f] of open) if (f < best) { best = f; curK = k; }
    open.delete(curK);
    const cc = curK % COLS, cr = Math.floor(curK / COLS);

    if (cc === gc && cr === gr) break;

    for (const [dc, dr, cost] of NEI) {
      const nc = cc + dc, nr = cr + dr;
      if (!walkable(nc, nr)) continue;
      // no cortar esquinas entre dos muros en diagonal
      if (dc && dr && (!walkable(cc + dc, cr) || !walkable(cc, cr + dr))) continue;
      const nk = key(nc, nr);
      const ng = g.get(curK) + cost;
      if (ng < (g.get(nk) ?? Infinity)) {
        came.set(nk, curK);
        g.set(nk, ng);
        open.set(nk, ng + h(nc, nr));
      }
    }
  }

  const goalK = key(gc, gr);
  if (!came.has(goalK) && startK !== goalK) return [];

  // reconstruir en celdas
  const cells = [];
  let k = goalK;
  while (k !== startK) { cells.unshift(k); k = came.get(k); if (k === undefined) break; }

  // pasar a puntos del mundo y suavizar por línea de visión
  const pts = cells.map((kk) => ({ x: cx(kk % COLS), y: cy(Math.floor(kk / COLS)) }));
  pts.push({ x: tx, y: ty });

  const smooth = [];
  let ax = sx, ay = sy;
  for (let i = 0; i < pts.length; i++) {
    const next = pts[i + 1];
    if (next && lineClear(ax, ay, next.x, next.y)) continue; // podemos saltarnos pts[i]
    smooth.push(pts[i]);
    ax = pts[i].x; ay = pts[i].y;
  }
  return smooth;
}
