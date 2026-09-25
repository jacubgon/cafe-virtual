// Motor del mundo: escenario DOM (W×H) escalado. Dibuja las salas (escenario.js),
// mueve tu avatar chibi (avatar.js, con dirección y paso animado), interpola a los
// demás y calcula la proximidad (radio O misma sala).

import { W, H, RADIUS, AR, zoneOf, blocked, buildRooms } from './escenario.js';
import { renderAvatar, dirFromAngle } from './avatar.js';
import { findPath } from './pathfind.js';

const SPEED = 230;        // px por segundo
const NET_INTERVAL = 80;  // ms entre envíos de posición
const PHASE_SPEED = 9;    // velocidad del ciclo de paso

export class World {
  constructor(wrapEl, stageEl) {
    this.wrapEl = wrapEl;
    this.stageEl = stageEl;
    this.scale = 1;

    this.me = null;
    this.players = new Map();
    this.keys = {};
    this.path = null;
    this.myZone = 'plaza';
    this.inputEnabled = true;
    this.lastNetSend = 0;

    this.onMove = () => {};
    this.onProximityEnter = () => {};
    this.onProximityLeave = () => {};
    this.onVolumes = () => {};
    this.onZoneChange = () => {};
    this.onRoomRoster = () => {};

    this.nearby = new Set();
    this._rosterKey = '';

    buildRooms(this.stageEl);
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
      this.path = null;
      e.preventDefault();
    }
  }

  setInputEnabled(on) {
    this.inputEnabled = on;
    if (!on) { this.keys = {}; this.path = null; }
  }

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

  _buildHalo() {
    const halo = document.createElement('div');
    halo.style.cssText = `position:absolute;width:${RADIUS * 2}px;height:${RADIUS * 2}px;border-radius:999px;` +
      `border:2px dashed rgba(71,157,253,0.5);background:radial-gradient(circle, rgba(71,157,253,0.14) 0%, rgba(71,157,253,0) 70%);` +
      `pointer-events:none;transform:translate(-50%,-50%);left:-9999px;top:-9999px;z-index:1;`;
    this.stageEl.appendChild(halo);
    this.haloEl = halo;
  }

  // ---------- jugadores ----------
  _makePlayerEl(p, isMe) {
    const s = isMe ? 1.15 : 1;
    // wrap = ancla en los PIES del avatar (bottom-center en x,y del mundo).
    const wrap = document.createElement('div');
    wrap.className = 'avatar';
    wrap.style.cssText = 'position:absolute;width:36px;height:48px;transform:translate(-50%,-100%);will-change:left,top;';

    const ring = document.createElement('div');
    ring.className = 'talk-ring'; ring.style.top = '16px';
    const speakRing = document.createElement('div');
    speakRing.className = 'speak-ring'; speakRing.style.top = '16px';

    const tag = document.createElement('div');
    tag.textContent = p.name;
    tag.style.cssText = isMe
      ? 'position:absolute;left:50%;top:-26px;transform:translateX(-50%);font-size:11px;font-weight:700;color:#fff;background:#2F76F7;padding:2px 7px;border-radius:4px;white-space:nowrap;z-index:2;'
      : 'position:absolute;left:50%;top:-22px;transform:translateX(-50%);font-size:10px;font-weight:500;color:#2B3674;background:rgba(255,255,255,0.85);padding:1px 5px;border-radius:4px;white-space:nowrap;z-index:2;';

    const bubble = document.createElement('div');
    bubble.style.cssText = `position:absolute;left:50%;top:${isMe ? -50 : -44}px;transform:translateX(-50%);font-size:11px;color:#2B3674;background:#fff;border:1px solid #E4E6E8;padding:4px 8px;border-radius:8px;white-space:nowrap;opacity:0;transition:opacity 120ms ease;box-shadow:0 1.7px 10px 0 rgba(112,144,176,0.12);z-index:3;`;

    const mute = document.createElement('div');
    mute.className = 'mute-badge';
    mute.textContent = '🔇';
    mute.style.top = '-4px';

    // contenedor de la figura chibi (avatar.js pinta las capas dentro)
    const inner = document.createElement('div');
    inner.className = 'avatar-inner';
    inner.style.cssText = 'position:absolute;inset:0;';

    wrap.append(speakRing, ring, tag, bubble, inner, mute);
    this.stageEl.appendChild(wrap);
    p.el = wrap; p.innerEl = inner; p.tagEl = tag; p.bubbleEl = bubble; p.s = s;
    p.speakRing = speakRing; p.dir = 'down'; p.phase = 0;
    this._renderAv(p);
  }

  _renderAv(p) {
    renderAvatar(p.innerEl, {
      color: p.color, skin: p.skin, hair: p.hair, hairStyle: p.hairStyle, vr: p.vr,
      dir: p.dir, phase: p.phase, scale: p.s,
    });
  }

  setSpeaking(id, on) {
    const p = this.players.get(id);
    if (p && p.speakRing) p.speakRing.style.opacity = on ? '1' : '0';
  }

  showEmote(id, emote) {
    const p = this.players.get(id);
    if (!p || !p.el) return;
    const e = document.createElement('div');
    e.className = 'float-emote';
    e.textContent = emote;
    e.style.top = '-34px';
    p.el.appendChild(e);
    setTimeout(() => e.remove(), 1600);
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
    p.el?.classList.add('talking');
  }

  // ---------- bucle ----------
  start() {
    this.last = performance.now();
    const loop = (now) => { this._update(now); this.raf = requestAnimationFrame(loop); };
    this.raf = requestAnimationFrame(loop);
  }

  _update(now) {
    const dt = Math.min(0.05, (now - this.last) / 1000);
    this.last = now;
    const me = this.players.get(this.me);
    if (!me) return;

    // movimiento propio (bloqueado durante la videollamada)
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
      vx = (dx / n) * SPEED * dt; vy = (dy / n) * SPEED * dt;
    } else if (this.path && this.path.length) {
      const wp = this.path[0];
      const ddx = wp.x - me.x, ddy = wp.y - me.y, d = Math.hypot(ddx, ddy);
      if (d < 8) { this.path.shift(); if (!this.path.length) this.path = null; }
      else { vx = (ddx / d) * SPEED * dt; vy = (ddy / d) * SPEED * dt; }
    }

    let moved = false;
    if (vx || vy) {
      const nx = me.x + vx;
      if (!blocked(nx, me.y)) { me.x = nx; moved = true; }
      const ny = me.y + vy;
      if (!blocked(me.x, ny)) { me.y = ny; moved = true; }
      if (this.path && !moved) this.path = null;
    }
    me.x = Math.max(AR, Math.min(W - AR, me.x));
    me.y = Math.max(AR, Math.min(H - AR, me.y));
    me.rx = me.x; me.ry = me.y;
    if (moved) { me.dir = dirFromAngle(Math.atan2(vy, vx)); me.phase += dt * PHASE_SPEED; }
    else me.phase = 0;

    if (moved && now - this.lastNetSend > NET_INTERVAL) {
      this.lastNetSend = now;
      this.onMove(Math.round(me.x), Math.round(me.y));
    }

    // interpolar a los demás + animación + temporizadores de bocadillo
    for (const p of this.players.values()) {
      if (p.id !== this.me) {
        const ddx = p.x - p.rx, ddy = p.y - p.ry;
        const moving = Math.hypot(ddx, ddy) > 0.4;
        p.rx += ddx * 0.22; p.ry += ddy * 0.22;
        if (moving) { p.dir = dirFromAngle(Math.atan2(ddy, ddx)); p.phase += dt * PHASE_SPEED; }
        else p.phase = 0;
      }
      this._renderAv(p);
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
    if (key !== this._rosterKey) { this._rosterKey = key; this.onRoomRoster(ids); }
  }

  _draw(me) {
    for (const p of this.players.values()) {
      const el = p.el;
      if (!el) continue;
      el.style.left = p.rx + 'px';
      el.style.top = p.ry + 'px';
      el.style.zIndex = Math.round(p.ry) + 10;
    }
    this.haloEl.style.left = me.rx + 'px';
    this.haloEl.style.top = me.ry + 'px';
  }

  _computeProximity(me) {
    const myZone = zoneOf(me.x, me.y).id;
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
    const z = zoneOf(me.x, me.y).id;
    if (z !== this.myZone) {
      this.myZone = z;
      me.zone = z;
      this.onZoneChange(z);
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
