// Avatar v2 — figura chibi con 4 direcciones, paso animado y peinados.
// API: avatarParts(opts) -> [[capa, estilo], ...]  ·  renderAvatar(wrap, opts)
// Compatibilidad: avatarParts(color, body, vr) sigue funcionando (body -> piel + pelo).

export const SKIN    = ['#F6D5BC', '#E8B48E', '#C98A5E', '#8D5A3B', '#5E3A24'];
export const HAIRS   = ['#3F3F3E', '#6B4428', '#B07A45', '#E2C08A', '#C9CED8'];
export const PALETTE = ['#479DFD', '#7B6AE2', '#12B76A', '#F3A257', '#D86761', '#2960C3'];
export const HAIR_STYLES = ['Corto', 'Melena', 'Moño', 'Rapado'];
export const LAYERS = ['shadow', 'hairBack', 'bun', 'legL', 'legR', 'armL', 'armR', 'torso', 'collar',
  'head', 'eyeL', 'eyeR', 'hairFront', 'strap', 'visor', 'glint'];
export const FIG_W = 36, FIG_H = 52; // caja de la figura; los pies están en (18, 48)

const INK = '#2B3674';
const px = (v) => v + 'px';
const P = (l, t, w, h, bg, r, x = {}) => ({ position: 'absolute', left: px(l), top: px(t), width: px(w), height: px(h),
  background: bg, borderRadius: typeof r === 'number' ? px(r) : r, ...x });
const HIDE = { display: 'none' };

// Ángulo de movimiento (rad, atan2) -> 'down' | 'left' | 'up' | 'right'
export const dirFromAngle = (a) => {
  const d = ((a * 180) / Math.PI + 360) % 360;
  return d >= 45 && d < 135 ? 'down' : d >= 135 && d < 225 ? 'left' : d >= 225 && d < 315 ? 'up' : 'right';
};

export function avatarParts(o = {}, legacyBody, legacyVr) {
  if (typeof o === 'number') o = { color: o, skin: legacyBody, hair: legacyBody, vr: legacyVr };
  const { color = 0, skin = 0, hair = 0, hairStyle = 0, vr = false, dir = 'down', phase = 0 } = o;
  const c = PALETTE[color % PALETTE.length], sk = SKIN[skin % SKIN.length], hr = HAIRS[hair % HAIRS.length];
  const hs = hairStyle % HAIR_STYLES.length;
  const side = dir === 'left' ? -1 : dir === 'right' ? 1 : 0, up = dir === 'up';
  const sw = Math.sin(phase), step = sw * 2.2, b = -Math.abs(sw) * 1.5; // b = balanceo del torso
  const L = {};

  L.shadow = P(6, 45, 24, 7, 'rgba(43,54,116,0.16)', 999);
  if (side) {
    L.legL = P(15 + step, 38, 6, 9, INK, 3);
    L.legR = P(15 - step, 38, 6, 9, INK, 3);
    L.armR = P(15, 25 + b, 6, 12, c, 3, { transformOrigin: '50% 2px', transform: `rotate(${-side * step * 12}deg)`, filter: 'brightness(0.92)' });
  } else {
    L.legL = P(11, 38 - Math.max(0, step), 6, 9, INK, 3);
    L.legR = P(19, 38 - Math.max(0, -step), 6, 9, INK, 3);
    L.armL = P(5, 25 + b, 6, 12, c, 3, { transformOrigin: '50% 2px', transform: `rotate(${step * 6}deg)`, filter: 'brightness(0.92)' });
    L.armR = P(25, 25 + b, 6, 12, c, 3, { transformOrigin: '50% 2px', transform: `rotate(${-step * 6}deg)`, filter: 'brightness(0.92)' });
  }
  L.torso = P(9, 23 + b, 18, 17, c, '9px 9px 6px 6px');
  if (!up) L.collar = P(side ? 13 + side * 4 : 14, 23 + b, 8, 4, 'rgba(255,255,255,0.45)', '0 0 4px 4px');
  if (hs === 1) L.hairBack = P(4 + side * 2, 2 + b, 28, 24, hr, '14px 14px 9px 9px');
  L.head = P(6, 2 + b, 24, 23, sk, 999);

  if (!vr && !up) {
    if (side) L[side < 0 ? 'eyeL' : 'eyeR'] = P(side < 0 ? 10 : 23, 13 + b, 3, 4, INK, 2);
    else { L.eyeL = P(12, 13 + b, 3, 4, INK, 2); L.eyeR = P(21, 13 + b, 3, 4, INK, 2); }
  }

  if (up) {
    L.hairFront = P(6, 1 + b, 24, hs === 3 ? 15 : 21, hr, '12px 12px 11px 11px');
  } else {
    const front = [[5, 0, 26, 12, 5], [6, 0, 24, 10, 4], [5, 0, 26, 11, 5], [7, 1, 22, 7, 3]][hs];
    const [l, t, w, h, rb] = front;
    const r = side ? (side < 0 ? `12px 13px ${rb + 6}px ${rb}px` : `13px 12px ${rb}px ${rb + 6}px`) : `13px 13px ${rb}px ${rb}px`;
    L.hairFront = P(l - side * 2, t + b, w, h, hr, r);
  }
  if (hs === 2) L.bun = P(13 - side * 6, -6 + b, 10, 10, hr, 999);

  if (vr) {
    L.strap = P(up ? 6 : 5, (up ? 12 : 11) + b, up ? 24 : 26, 3, INK, 2);
    if (!up) {
      L.visor = side ? P(side < 0 ? 4 : 14, 9 + b, 18, 9, INK, 5) : P(8, 9 + b, 20, 9, INK, 5);
      L.glint = side ? P(side < 0 ? 7 : 21, 11 + b, 7, 2, c, 1) : P(11, 11 + b, 7, 2, c, 1);
    }
  }
  return LAYERS.map((n) => [n, L[n] || HIDE]);
}

// Pintor DOM: crea las capas una vez y solo reescribe las que cambian.
export function renderAvatar(wrap, opts = {}) {
  const s = opts.scale ?? 1;
  if (!wrap.__layers) {
    const fig = document.createElement('div');
    fig.style.cssText = `position:absolute;left:50%;top:0;width:${FIG_W}px;height:${FIG_H}px;margin-left:-${FIG_W / 2}px;transform-origin:50% 92%;`;
    wrap.appendChild(fig);
    wrap.__fig = fig; wrap.__layers = {}; wrap.__prev = {};
    for (const n of LAYERS) {
      const d = document.createElement('div');
      d.dataset.layer = n; fig.appendChild(d); wrap.__layers[n] = d;
    }
  }
  wrap.__fig.style.transform = `scale(${s})`;
  for (const [n, st] of avatarParts(opts)) {
    const key = JSON.stringify(st);
    if (wrap.__prev[n] === key) continue;
    wrap.__prev[n] = key;
    const el = wrap.__layers[n];
    el.style.cssText = '';
    Object.assign(el.style, st);
  }
}
