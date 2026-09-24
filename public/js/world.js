// Motor del mundo: un "escenario" DOM de tamaño fijo (W×H) escalado para caber
// en su contenedor (como el diseño). Dibuja las salas, mueve tu avatar,
// interpola a los demás y calcula la proximidad (radio O misma sala).

import { W, H, RADIUS, ROOMS, WALLS, DOORS, zoneOf, blocked, renderAvatar } from './avatar.js';
import { findPath } from './pathfind.js';

const SPEED = 230;        // px por segundo
const NET_INTERVAL = 80;  // ms entre envíos de posición

export class World {
  constructor(wrapEl, stageEl) {
    this.wrapEl = wrapEl;
    this.stageEl = stageEl;
    this.scale = 1;

    this.me = null;
    this.players = new Map();  // id -> estado + refs DOM
    this.keys = {};
    this.path = null;          // ruta A* pendiente (lista de puntos)
    this.myZone = 'plaza';
    this.inputEnabled = true;  // se desactiva mientras estás en una videcollamada
    this.lastNetSend = 0;

    // callbacks (los rellena main.js)
    this.onMove = () => {};
    this.onProximityEnter = () => {};
    this.onProximityLeave = () => {};
    this.onVolumes = () => {};
    this.onZoneChange = () => {};
    this.onRoomRoster = () => {}; // (ids) cuando cambia quién está en tu sala

    this.nearby = new Set();
    this._rosterKey = '';      // firma de "quién está en mi sala" (para avisar de cambios)

    this._buildRooms();
    this._buildHalo();

    this.onKey = this.onKey.bind(this);
    window.addEventListener('keydown', this.onKey);
    window.addEventListener('keyup', this.onKey);

    stageEl.addEventListener('click', (e) => this._onStageClick(e));

    this.ro = new ResizeObserver(() => this._fit());
    this.ro.observe(wrapEl);
    this._fit();
  }

  onKey(e) {
    if (!this.inputEnabled) return;
    const k = e.key.toLowerCase();
    if (['w', 'a', 's', 'd', 'arrowup', 'arrowdown', 'arrowleft', 'arrowright'].includes(k)) {
      this.keys[k] = e.type === 'keydown';
      this.path = null; // mover con teclas cancela la ruta por clic
      e.preventDefault();
    }
  }

  // Activa/desactiva el control (para congelar el avatar durante la llamada).
  setInputEnabled(on) {
    this.inputEnabled = on;
    if (!on) { this.keys = {}; this.path = null; }
  }

  // Coloca al jugador en un punto (al salir de una sala) y avisa a la red.
  teleport(x, y) {
    const me = this.players.get(this.me);
    if (!me) return;
    me.x = x; me.y = y; me.rx = x; me.ry = y;
    this.path = null;
    this.onMove(Math.round(x), Math.round(y));
  }

  _fit() {
    const s = Math.min(1, this.wrapEl.clientWidth / W);
    this.scale = s;
    this.stageEl.style.transform = `scale(${s})`;
    this.wrapEl.style.height = H * s + 'px';
  }

  _onStageClick(e) {
    const me = this.players.get(this.me);
    if (!me) return;
    const r = this.stageEl.getBoundingClientRect();
    const tx = (e.clientX - r.left) / this.scale;
    const ty = (e.clientY - r.top) / this.scale;
    const path = findPath(me.x, me.y, tx, ty);
    this.path = path.length ? path : null;
  }

  // ---------- construcción del decorado (minimalista claro) ----------
  _buildRooms() {
    // Helpers de formas suaves.
    const soft = (x, y, w, h, color, r = 16, extra = '') =>
      `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;background:${color};box-shadow:0 6px 16px rgba(43,54,116,0.07);${extra}"></div>`;
    const flat = (x, y, w, h, color, r = 999) =>
      `<div style="position:absolute;left:${x}px;top:${y}px;width:${w}px;height:${h}px;border-radius:${r}px;background:${color};"></div>`;
    const label = (x, y, txt) =>
      `<div style="position:absolute;left:${x}px;top:${y}px;font-size:12px;font-weight:600;letter-spacing:0.14em;text-transform:uppercase;color:#8A92AE;">${txt}</div>`;

    const walls = WALLS.map((w) =>
      `<div style="position:absolute;left:${w.x}px;top:${w.y}px;width:${w.w}px;height:${w.h}px;background:#E0E6F3;border-radius:7px;box-shadow:0 1px 2px rgba(43,54,116,0.05);"></div>`
    ).join('');
    const doors = DOORS.map((d) =>
      `<div style="position:absolute;left:${d.x - 7}px;top:${d.y}px;width:${d.w + 14}px;height:${d.h}px;background:#F5E9D2;border-radius:7px;"></div>`
    ).join('');

    const html = `
      <!-- Suelo -->
      ${soft(20, 20, 1140, 660, 'linear-gradient(160deg,#F7F9FD,#EEF2FA)', 28, 'box-shadow:inset 0 0 60px rgba(112,144,176,0.06);')}

      <!-- Zonas (tintes suaves) -->
      ${soft(34, 34, 384, 302, '#E9F2FE', 22)}
      ${soft(768, 34, 378, 302, '#ECEFFB', 22)}
      ${soft(34, 364, 384, 302, '#F1ECFC', 22)}

      <!-- ══ Cafetería ══ -->
      ${label(56, 54, 'Cafetería')}
      ${flat(70, 208, 150, 96, '#DCEAFB', 60)}            <!-- mesa redonda (subida, sin tocar la pared) -->
      ${soft(70, 110, 190, 44, '#CFE0FA', 14)}            <!-- barra -->
      ${soft(96, 96, 52, 34, '#B9CDF0', 12)}              <!-- cafetera -->
      ${flat(200, 116, 16, 16, '#EAF1FD')} ${flat(224, 116, 16, 16, '#EAF1FD')}
      ${flat(104, 210, 30, 30, '#C6D7F4')} ${flat(150, 218, 30, 30, '#C6D7F4')}  <!-- taburetes -->


      <!-- ══ Reuniones ══ -->
      ${label(792, 54, 'Reuniones')}
      ${soft(854, 150, 190, 92, '#DCE3F6', 46)}           <!-- mesa (más a la izquierda) -->
      ${flat(872, 128, 24, 18, '#C6D1EE', 8)} ${flat(930, 124, 24, 18, '#C6D1EE', 8)} ${flat(988, 128, 24, 18, '#C6D1EE', 8)}
      ${flat(872, 250, 24, 18, '#C6D1EE', 8)} ${flat(930, 254, 24, 18, '#C6D1EE', 8)} ${flat(988, 250, 24, 18, '#C6D1EE', 8)}
      ${soft(1006, 52, 110, 52, '#CBD6F2', 10)}           <!-- cartelito (más arriba y a la derecha) -->
      ${flat(1020, 68, 60, 8, '#AFC0EC', 4)} ${flat(1020, 82, 44, 8, '#AFC0EC', 4)}

      <!-- ══ Juegos ══ -->
      ${label(56, 384, 'Juegos')}
      ${flat(60, 596, 200, 50, '#E4DAF7', 40)}            <!-- alfombra -->
      ${soft(70, 448, 62, 104, '#DAD0F5', 14)}            <!-- recreativa 1 -->
      ${flat(82, 462, 38, 34, '#C8BAF0', 8)}
      ${soft(150, 448, 62, 104, '#ECD8EE', 14)}           <!-- recreativa 2 -->
      ${flat(162, 462, 38, 34, '#E2C0E6', 8)}
      ${soft(258, 470, 120, 78, '#E0D6F7', 16)}           <!-- mesa juego -->

      <!-- ══ Plaza / pasillo ══ -->
      ${flat(486, 300, 220, 150, '#E9F3EE', 80)}          <!-- alfombra -->
      ${flat(548, 336, 96, 78, '#DCEBE7')}                <!-- fuente base -->
      <div class="water" style="position:absolute;left:570px;top:352px;width:52px;height:46px;border-radius:999px;background:radial-gradient(circle,#CDE9EE,#A9D6E0);"></div>
      ${label(524, 250, 'Plaza')}
      ${soft(470, 470, 96, 26, '#D9E0F4', 13)}            <!-- banco -->
      ${soft(852, 544, 236, 76, '#FFFFFF', 16)}           <!-- cartel limpio -->
      ${label(872, 566, 'Café · 10:45')}

      ${doors}
      ${walls}
    `;
    const bg = document.createElement('div');
    bg.style.cssText = 'position:absolute;inset:0;';
    bg.innerHTML = html;
    this.stageEl.appendChild(bg);
  }

  _buildHalo() {
    const halo = document.createElement('div');
    halo.style.cssText = `position:absolute;width:${RADIUS * 2}px;height:${RADIUS * 2}px;border-radius:999px;` +
      `border:2px dashed rgba(71,157,253,0.5);background:radial-gradient(circle, rgba(71,157,253,0.14) 0%, rgba(71,157,253,0) 70%);` +
      `pointer-events:none;transform:translate(-50%,-50%);left:-9999px;top:-9999px;`;
    this.stageEl.appendChild(halo);
    this.haloEl = halo;
  }

  // ---------- jugadores ----------
  _makePlayerEl(p, isMe) {
    const s = isMe ? 1.15 : 1;
    const wrap = document.createElement('div');
    wrap.className = 'avatar';
    wrap.style.cssText = `position:absolute;width:${44 * s}px;height:${44 * s}px;transform:translate(-50%,-100%);will-change:left,top;`;

    // aro verde de "hablando"
    const ring = document.createElement('div');
    ring.className = 'talk-ring';
    // sombra bajo los pies
    const shadow = document.createElement('div');
    shadow.className = 'avatar-shadow';

    const tag = document.createElement('div');
    tag.textContent = p.name;
    tag.style.cssText = isMe
      ? 'position:absolute;left:50%;top:-18px;transform:translateX(-50%);font-size:11px;font-weight:700;color:#fff;background:#2F76F7;padding:2px 7px;border-radius:4px;white-space:nowrap;z-index:2;'
      : 'position:absolute;left:50%;top:-16px;transform:translateX(-50%);font-size:10px;font-weight:500;color:#2B3674;background:rgba(255,255,255,0.85);padding:1px 5px;border-radius:4px;white-space:nowrap;z-index:2;';

    const bubble = document.createElement('div');
    bubble.style.cssText = 'position:absolute;left:50%;top:-44px;transform:translateX(-50%);font-size:11px;color:#2B3674;background:#fff;border:1px solid #E4E6E8;padding:4px 8px;border-radius:8px;white-space:nowrap;opacity:0;transition:opacity 120ms ease;box-shadow:0 1.7px 10px 0 rgba(112,144,176,0.12);z-index:3;';

    const mute = document.createElement('div');
    mute.className = 'mute-badge';
    mute.textContent = '🔇';

    // contenedor interno que "vive" (respira / anda) sin mover la posición
    const inner = document.createElement('div');
    inner.className = 'avatar-inner';
    inner.style.cssText = 'position:absolute;inset:0;';
    renderAvatar(inner, { color: p.color, body: p.body, vr: p.vr, scale: s });

    wrap.append(ring, shadow, tag, bubble, inner, mute);
    this.stageEl.appendChild(wrap);
    p.el = wrap; p.innerEl = inner; p.tagEl = tag; p.bubbleEl = bubble; p.s = s;
  }

  setMe(info) {
    this.me = info.id;
    const p = { ...info, rx: info.x, ry: info.y, bubble: '', bubbleTimer: 0 };
    this.players.set(info.id, p);
    this._makePlayerEl(p, true);
  }

  setPlayers(list) {
    for (const info of list) {
      if (info.id === this.me) continue;
      this.addPlayer(info);
    }
  }

  addPlayer(info) {
    if (this.players.has(info.id)) return;
    const p = { ...info, rx: info.x, ry: info.y, bubble: '', bubbleTimer: 0 };
    this.players.set(info.id, p);
    this._makePlayerEl(p, false);
  }

  removePlayer(id) {
    const p = this.players.get(id);
    if (!p) return;
    p.el?.remove();
    this.players.delete(id);
    if (this.nearby.delete(id)) this.onProximityLeave(id);
  }

  updatePlayer(id, x, y) {
    const p = this.players.get(id);
    if (!p) return;
    p.x = x; p.y = y;
  }

  updateAvState(id, muted, camOff) {
    const p = this.players.get(id);
    if (!p) return;
    if (typeof muted === 'boolean') {
      p.muted = muted;
      p.el?.classList.toggle('muted', muted);
    }
    if (typeof camOff === 'boolean') p.camOff = camOff;
  }

  showBubble(id, text) {
    const p = this.players.get(id);
    if (!p) return;
    p.bubble = text;
    p.bubbleTimer = 3.2;
    if (p.bubbleEl) { p.bubbleEl.textContent = text; p.bubbleEl.style.opacity = '1'; }
    p.el?.classList.add('talking'); // aro verde mientras "habla"
  }

  // ---------- bucle ----------
  start() {
    this.last = performance.now();
    const loop = (now) => {
      this._update(now);
      this.raf = requestAnimationFrame(loop);
    };
    this.raf = requestAnimationFrame(loop);
  }

  _update(now) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const me = this.players.get(this.me);
    if (!me) return;

    // movimiento propio (bloqueado mientras estás en una videollamada)
    let dx = 0, dy = 0;
    if (this.inputEnabled) {
      const k = this.keys;
      if (k.a || k.arrowleft) dx -= 1;
      if (k.d || k.arrowright) dx += 1;
      if (k.w || k.arrowup) dy -= 1;
      if (k.s || k.arrowdown) dy += 1;
    }

    let vx = 0, vy = 0;
    if (dx || dy) {
      const n = Math.hypot(dx, dy);
      vx = (dx / n) * SPEED * dt;
      vy = (dy / n) * SPEED * dt;
    } else if (this.path && this.path.length) {
      // Seguir la ruta A*: avanzar hacia el waypoint actual.
      const wp = this.path[0];
      const ddx = wp.x - me.x, ddy = wp.y - me.y, d = Math.hypot(ddx, ddy);
      if (d < 8) { this.path.shift(); if (!this.path.length) this.path = null; }
      else { vx = (ddx / d) * SPEED * dt; vy = (ddy / d) * SPEED * dt; }
    }

    let moved = false;
    if (vx || vy) {
      // Deslizamiento: probamos cada eje por separado contra los muros,
      // así al chocar te resbalas por la pared en vez de quedarte pegado.
      const nx = me.x + vx;
      if (!blocked(nx, me.y)) { me.x = nx; moved = true; }
      const ny = me.y + vy;
      if (!blocked(me.x, ny)) { me.y = ny; moved = true; }
      // Si seguíamos una ruta y nos quedamos totalmente atascados, la soltamos.
      if (this.path && !moved) this.path = null;
    }
    me.x = Math.max(20, Math.min(W - 20, me.x));
    me.y = Math.max(30, Math.min(H - 16, me.y));
    me.rx = me.x; me.ry = me.y;
    if (me.innerEl) me.innerEl.classList.toggle('walking', moved);

    if (moved && now - this.lastNetSend > NET_INTERVAL) {
      this.lastNetSend = now;
      this.onMove(Math.round(me.x), Math.round(me.y));
    }

    // interpolar a los demás + temporizadores de bocadillo
    for (const p of this.players.values()) {
      if (p.id !== this.me) {
        const moving = Math.hypot(p.x - p.rx, p.y - p.ry) > 0.4;
        p.rx += (p.x - p.rx) * 0.22;
        p.ry += (p.y - p.ry) * 0.22;
        if (p.innerEl) p.innerEl.classList.toggle('walking', moving);
      }
      if (p.bubbleTimer > 0) {
        p.bubbleTimer -= dt;
        if (p.bubbleTimer <= 0) {
          if (p.bubbleEl) p.bubbleEl.style.opacity = '0';
          p.el?.classList.remove('talking');
        }
      }
    }

    this._draw(me);
    this._computeProximity(me);
    this._checkZone(me);
    this._checkRoster();
  }

  // Detecta cambios en "quién está en mi sala" (aunque ya estuvieran conectados
  // desde la plaza) para poder refrescar el modal de videollamada.
  _checkRoster() {
    const ids = [];
    if (this.myZone !== 'plaza') {
      for (const p of this.players.values()) {
        if (p.id === this.me) continue;
        if (p.zone === this.myZone) ids.push(p.id);
      }
      ids.sort();
    }
    const key = ids.join(',');
    if (key !== this._rosterKey) {
      this._rosterKey = key;
      this.onRoomRoster(ids);
    }
  }

  _draw(me) {
    for (const p of this.players.values()) {
      const el = p.el;
      if (!el) continue;
      el.style.left = p.rx + 'px';
      el.style.top = p.ry + 'px';
      el.style.zIndex = Math.round(p.ry);
    }
    this.haloEl.style.left = me.rx + 'px';
    this.haloEl.style.top = me.ry + 'px';
    this.haloEl.style.zIndex = 1;
  }

  _computeProximity(me) {
    const myZone = zoneOf(me.x, me.y);
    const volumes = new Map();
    for (const p of this.players.values()) {
      if (p.id === this.me) continue;
      const dist = Math.hypot(p.x - me.x, p.y - me.y);
      const sameRoom = myZone !== 'plaza' && p.zone === myZone;
      const wasNear = this.nearby.has(p.id);
      const threshold = wasNear ? RADIUS + 30 : RADIUS;
      const isNear = sameRoom || dist < threshold;

      if (isNear && !wasNear) { this.nearby.add(p.id); this.onProximityEnter(p.id); }
      else if (!isNear && wasNear) { this.nearby.delete(p.id); this.onProximityLeave(p.id); }

      if (this.nearby.has(p.id)) {
        let vol = 1;
        if (!sameRoom && dist > 70) vol = 1 - (dist - 70) / (RADIUS + 30 - 70);
        volumes.set(p.id, Math.max(0, Math.min(1, vol)));
      }
    }
    this.onVolumes(volumes);
  }

  _checkZone(me) {
    const z = zoneOf(me.x, me.y);
    if (z !== this.myZone) {
      this.myZone = z;
      me.zone = z;
      this.onZoneChange(z); // main lo anuncia a la red (socket 'zone')
    }
  }

  setPlayerZone(id, zone) {
    const p = this.players.get(id);
    if (p) p.zone = zone;
  }

  destroy() {
    cancelAnimationFrame(this.raf);
    window.removeEventListener('keydown', this.onKey);
    window.removeEventListener('keyup', this.onKey);
    this.ro?.disconnect();
  }
}
