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

  // ---------- construcción del decorado ----------
  _buildRooms() {
    // Un ÚNICO plano de oficina: suelo continuo, tintes por sala, mobiliario,
    // y muros (generados desde WALLS) con huecos de puerta.
    const walls = WALLS.map((w) =>
      `<div style="position:absolute;left:${w.x}px;top:${w.y}px;width:${w.w}px;height:${w.h}px;background:#B4BFDA;border-radius:5px;box-shadow:0 1px 2px rgba(43,54,116,0.12);"></div>`
    ).join('');

    const doors = DOORS.map((d) =>
      `<div style="position:absolute;left:${d.x - 8}px;top:${d.y}px;width:${d.w + 16}px;height:${d.h}px;background:#F3E4C6;border-radius:4px;box-shadow:inset 0 0 0 2px #E7D3AC;"></div>`
    ).join('');

    // Helpers de mobiliario animado.
    const plant = (x, y, s = 1, slow = false) => `
      <div style="position:absolute;left:${x}px;top:${y}px;width:${28 * s}px;height:${44 * s}px;">
        <div class="plant${slow ? ' slow' : ''}" style="position:absolute;left:50%;bottom:${16 * s}px;transform:translateX(-50%);width:${26 * s}px;height:${32 * s}px;background:radial-gradient(circle at 50% 65%, #59C083, #2E8B57);border-radius:52% 52% 44% 44%;box-shadow:inset -3px -4px 6px rgba(0,0,0,0.15);"></div>
        <div style="position:absolute;left:50%;bottom:0;transform:translateX(-50%);width:${20 * s}px;height:${18 * s}px;background:linear-gradient(180deg,#D89A6A,#B9764A);border-radius:3px 3px 6px 6px;"></div>
      </div>`;
    const steam = (x, y) => `
      <div class="steam" style="left:${x}px;top:${y}px;animation-delay:0s;"></div>
      <div class="steam" style="left:${x + 6}px;top:${y - 3}px;animation-delay:.9s;"></div>
      <div class="steam" style="left:${x - 5}px;top:${y - 1}px;animation-delay:1.7s;"></div>`;
    const window_ = (x) => `
      <div style="position:absolute;left:${x}px;top:21px;width:92px;height:11px;border-radius:3px;background:linear-gradient(90deg,#CDEBFF,#A9D8FF);box-shadow:inset 0 0 0 2px #fff, 0 0 8px rgba(143,204,255,0.6);"></div>`;

    const html = `
      <!-- Suelo único del edificio -->
      <div style="position:absolute;left:20px;top:20px;width:1140px;height:660px;border-radius:20px;background:#E7ECF7;box-shadow:inset 0 0 40px rgba(112,144,176,0.12);"></div>
      <!-- Textura sutil de baldosa -->
      <div style="position:absolute;left:20px;top:20px;width:1140px;height:660px;border-radius:20px;opacity:.5;background-image:linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px);background-size:40px 40px;"></div>

      <!-- Tintes por sala -->
      <div style="position:absolute;left:32px;top:32px;width:388px;height:306px;border-radius:14px;background:#E6F6FF;"></div>
      <div style="position:absolute;left:766px;top:32px;width:382px;height:306px;border-radius:14px;background:#E9EDFF;"></div>
      <div style="position:absolute;left:32px;top:362px;width:388px;height:306px;border-radius:14px;background:#F1EEFE;"></div>

      <!-- Ventanas en la pared superior -->
      ${window_(140)} ${window_(300)} ${window_(880)} ${window_(1020)}

      <!-- ══ Pasillo / plaza central ══ -->
      <div style="position:absolute;left:470px;top:300px;width:250px;height:150px;border-radius:999px;background:#E5F6E9;"></div>
      <!-- fuente -->
      <div style="position:absolute;left:545px;top:335px;width:100px;height:80px;border-radius:999px;background:#BFE3E0;box-shadow:inset 0 0 0 5px #A6D3CF;"></div>
      <div class="water" style="position:absolute;left:565px;top:348px;width:60px;height:52px;border-radius:999px;background:radial-gradient(circle,#8FD4E8,#5FB8D6);"></div>
      <div style="position:absolute;left:512px;top:250px;font-size:12px;font-weight:500;letter-spacing:0.12em;text-transform:uppercase;color:#8A93AE;">PLAZA</div>
      <!-- sofás -->
      <div style="position:absolute;left:470px;top:470px;width:90px;height:30px;border-radius:10px;background:#9FB0E6;box-shadow:inset 0 4px 0 #B4C2EE;"></div>
      <div style="position:absolute;left:640px;top:250px;width:30px;height:80px;border-radius:10px;background:#9FB0E6;box-shadow:inset 4px 0 0 #B4C2EE;"></div>
      ${plant(474, 250, 1)} ${plant(700, 470, 1.1, true)}
      <!-- tablón zona abierta -->
      <div style="position:absolute;left:800px;top:520px;width:300px;height:110px;border-radius:12px;background:#fff;border:2px solid #DDE3F3;box-shadow:0 2px 8px rgba(112,144,176,0.14);"></div>
      <div style="position:absolute;left:820px;top:536px;font-size:12px;font-weight:700;color:#2B3674;">📌 Tablón</div>
      <div style="position:absolute;left:820px;top:560px;width:80px;height:44px;border-radius:4px;background:#FFF3D6;transform:rotate(-3deg);box-shadow:0 1px 3px rgba(0,0,0,.12);"></div>
      <div style="position:absolute;left:910px;top:562px;width:80px;height:44px;border-radius:4px;background:#DDF0FF;transform:rotate(2deg);box-shadow:0 1px 3px rgba(0,0,0,.12);"></div>
      <div style="position:absolute;left:1000px;top:558px;width:80px;height:44px;border-radius:4px;background:#E6F7E9;transform:rotate(-1deg);box-shadow:0 1px 3px rgba(0,0,0,.12);"></div>
      <div style="position:absolute;left:826px;top:566px;font-size:9px;color:#7A6A3A;">Café 11:00</div>

      <!-- ══ Cafetería ══ -->
      <div style="position:absolute;left:48px;top:48px;font-size:15px;font-weight:700;color:#2B3674;">☕ Cafetería</div>
      <!-- barra -->
      <div style="position:absolute;left:56px;top:150px;width:230px;height:56px;border-radius:8px;background:linear-gradient(180deg,#A9805C,#8B6544);"></div>
      <div style="position:absolute;left:52px;top:146px;width:238px;height:12px;border-radius:6px;background:#C8A784;"></div>
      <!-- máquina de café -->
      <div style="position:absolute;left:96px;top:96px;width:74px;height:58px;border-radius:8px;background:linear-gradient(180deg,#4A4A48,#2E2E2C);box-shadow:inset 0 3px 0 #6a6a68;"></div>
      <div style="position:absolute;left:104px;top:104px;width:58px;height:18px;border-radius:4px;background:#D3F2FF;opacity:.9;"></div>
      <div style="position:absolute;left:116px;top:140px;width:8px;height:12px;background:#6a6a68;"></div>
      <div style="position:absolute;left:142px;top:140px;width:8px;height:12px;background:#6a6a68;"></div>
      ${steam(120, 88)} ${steam(146, 88)}
      <!-- tazas en la barra -->
      <div style="position:absolute;left:196px;top:158px;width:16px;height:14px;border-radius:0 0 6px 6px;background:#fff;box-shadow:0 0 0 2px #CFE2E2;"></div>
      <div style="position:absolute;left:224px;top:158px;width:16px;height:14px;border-radius:0 0 6px 6px;background:#fff;box-shadow:0 0 0 2px #CFE2E2;"></div>
      <!-- vitrina de bollería -->
      <div style="position:absolute;left:250px;top:96px;width:120px;height:50px;border-radius:8px;background:rgba(211,242,255,0.5);border:2px solid #B9D9E8;"></div>
      <div style="position:absolute;left:262px;top:118px;width:20px;height:18px;border-radius:50% 50% 40% 40%;background:#E7B769;"></div>
      <div style="position:absolute;left:292px;top:120px;width:22px;height:16px;border-radius:6px;background:#D98C5A;"></div>
      <div style="position:absolute;left:326px;top:118px;width:20px;height:18px;border-radius:50% 50% 40% 40%;background:#E7B769;"></div>
      <!-- taburetes -->
      <div style="position:absolute;left:96px;top:236px;width:34px;height:34px;border-radius:999px;background:#F4F7FE;box-shadow:0 3px 6px rgba(0,0,0,.12),inset 0 0 0 3px #479DFD;"></div>
      <div style="position:absolute;left:170px;top:236px;width:34px;height:34px;border-radius:999px;background:#F4F7FE;box-shadow:0 3px 6px rgba(0,0,0,.12),inset 0 0 0 3px #479DFD;"></div>
      ${plant(360, 250, 1.1)}
      <!-- lámpara colgante -->
      <div style="position:absolute;left:150px;top:60px;width:2px;height:24px;background:#8A93AE;"></div>
      <div class="hang" style="position:absolute;left:138px;top:82px;width:26px;height:16px;border-radius:0 0 40% 40%;background:linear-gradient(180deg,#FDE9B8,#F3C969);box-shadow:0 0 14px rgba(243,201,105,0.7);"></div>

      <!-- ══ Sala de reuniones ══ -->
      <div style="position:absolute;left:786px;top:48px;font-size:15px;font-weight:700;color:#2B3674;">🖥️ Sala de reuniones</div>
      <!-- mesa -->
      <div style="position:absolute;left:872px;top:150px;width:200px;height:96px;border-radius:44px;background:linear-gradient(180deg,#E4ECFB,#CBD9F3);box-shadow:inset 0 0 0 3px #B9CBEE;"></div>
      <!-- sillas -->
      <div style="position:absolute;left:892px;top:126px;width:26px;height:18px;border-radius:6px;background:#8FA6DE;"></div>
      <div style="position:absolute;left:952px;top:122px;width:26px;height:18px;border-radius:6px;background:#8FA6DE;"></div>
      <div style="position:absolute;left:1012px;top:126px;width:26px;height:18px;border-radius:6px;background:#8FA6DE;"></div>
      <div style="position:absolute;left:892px;top:250px;width:26px;height:18px;border-radius:6px;background:#8FA6DE;"></div>
      <div style="position:absolute;left:952px;top:254px;width:26px;height:18px;border-radius:6px;background:#8FA6DE;"></div>
      <div style="position:absolute;left:1012px;top:250px;width:26px;height:18px;border-radius:6px;background:#8FA6DE;"></div>
      <!-- pantalla en pared con "slide" -->
      <div style="position:absolute;left:966px;top:60px;width:132px;height:68px;border-radius:8px;background:#22305C;box-shadow:0 4px 12px rgba(41,96,195,0.35),inset 0 0 0 3px #3B4A7A;padding:8px;">
        <div style="width:60%;height:8px;border-radius:2px;background:#5FA8FF;margin:4px 0;"></div>
        <div style="display:flex;gap:4px;align-items:flex-end;height:30px;margin-top:6px;">
          <div style="width:10px;height:16px;background:#4D75B5;border-radius:2px;"></div>
          <div style="width:10px;height:26px;background:#28B5E1;border-radius:2px;"></div>
          <div style="width:10px;height:12px;background:#94DAF0;border-radius:2px;"></div>
          <div style="width:10px;height:22px;background:#5FA8FF;border-radius:2px;"></div>
        </div>
      </div>
      <!-- pizarra -->
      <div style="position:absolute;left:790px;top:120px;width:64px;height:80px;border-radius:6px;background:#fff;border:2px solid #C9D6F5;"></div>
      <div style="position:absolute;left:800px;top:134px;width:40px;height:4px;border-radius:2px;background:#D86761;"></div>
      <div style="position:absolute;left:800px;top:146px;width:30px;height:4px;border-radius:2px;background:#2960C3;"></div>
      <div style="position:absolute;left:800px;top:170px;width:44px;height:4px;border-radius:2px;background:#12B76A;"></div>
      ${plant(1096, 270, 1.1, true)}

      <!-- ══ Sala de juegos ══ -->
      <div style="position:absolute;left:48px;top:376px;font-size:15px;font-weight:700;color:#2B3674;">🎮 Sala de juegos</div>
      <div class="neon" style="position:absolute;left:250px;top:378px;font-size:16px;font-weight:800;color:#F3A257;">ARCADE</div>
      <!-- recreativas -->
      <div style="position:absolute;left:62px;top:440px;width:72px;height:120px;border-radius:12px 12px 6px 6px;background:linear-gradient(180deg,#5B4BC4,#3C2F8E);"></div>
      <div class="arcade-screen" style="position:absolute;left:74px;top:456px;width:48px;height:38px;border-radius:4px;background:linear-gradient(135deg,#7DE3FF,#7B6AE2);"></div>
      <div style="position:absolute;left:80px;top:506px;width:36px;height:6px;border-radius:3px;background:#2B2270;"></div>
      <div style="position:absolute;left:84px;top:516px;width:12px;height:12px;border-radius:999px;background:#F3A257;"></div>
      <div style="position:absolute;left:104px;top:518px;width:8px;height:8px;border-radius:999px;background:#D86761;"></div>
      <div style="position:absolute;left:150px;top:440px;width:72px;height:120px;border-radius:12px 12px 6px 6px;background:linear-gradient(180deg,#C86BA6,#8E3F73);"></div>
      <div class="arcade-screen" style="position:absolute;left:162px;top:456px;width:48px;height:38px;border-radius:4px;background:linear-gradient(135deg,#FFD27D,#F37EA2);animation-delay:.6s;"></div>
      <div style="position:absolute;left:168px;top:506px;width:36px;height:6px;border-radius:3px;background:#5A2247;"></div>
      <div style="position:absolute;left:172px;top:516px;width:12px;height:12px;border-radius:999px;background:#FABC1E;"></div>
      <!-- futbolín -->
      <div style="position:absolute;left:250px;top:470px;width:130px;height:80px;border-radius:10px;background:linear-gradient(180deg,#2E8B57,#256F46);box-shadow:inset 0 0 0 4px #5B4030;"></div>
      <div style="position:absolute;left:250px;top:506px;width:130px;height:4px;background:rgba(255,255,255,.5);"></div>
      <div style="position:absolute;left:312px;top:470px;width:4px;height:80px;background:rgba(255,255,255,.4);"></div>
      <div style="position:absolute;left:300px;top:490px;width:8px;height:40px;background:#C7C7C7;"></div>
      <div style="position:absolute;left:340px;top:490px;width:8px;height:40px;background:#C7C7C7;"></div>
      <!-- diana -->
      <div style="position:absolute;left:352px;top:410px;width:40px;height:40px;border-radius:999px;background:radial-gradient(circle,#D86761 0 22%,#fff 22% 45%,#12B76A 45% 70%,#fff 70% 100%);box-shadow:0 2px 6px rgba(0,0,0,.15);"></div>
      <!-- puf -->
      <div style="position:absolute;left:70px;top:590px;width:60px;height:44px;border-radius:50% 50% 45% 45%;background:#B9A9F0;box-shadow:inset -4px -6px 10px rgba(0,0,0,.12);"></div>
      ${plant(360, 590, 1)}

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

    // "cabeza-cámara": círculo con el vídeo de la persona (si está conectada).
    const headWrap = document.createElement('div');
    headWrap.className = 'avatar-head-video';
    headWrap.style.cssText = `position:absolute;left:50%;top:${-3 * s}px;transform:translateX(-50%);width:${28 * s}px;height:${28 * s}px;border-radius:50%;overflow:hidden;display:none;border:2px solid #fff;box-shadow:0 2px 6px rgba(43,54,116,0.3);`;
    const headVideo = document.createElement('video');
    headVideo.autoplay = true; headVideo.playsInline = true; headVideo.muted = true;
    headVideo.style.cssText = `width:100%;height:100%;object-fit:cover;${isMe ? 'transform:scaleX(-1);' : ''}`;
    headWrap.appendChild(headVideo);
    inner.appendChild(headWrap);

    wrap.append(ring, shadow, tag, bubble, inner, mute);
    this.stageEl.appendChild(wrap);
    p.el = wrap; p.innerEl = inner; p.tagEl = tag; p.bubbleEl = bubble; p.s = s;
    p.headWrap = headWrap; p.headVideo = headVideo;
  }

  // Muestra el vídeo de la persona como su cabeza (o vuelve al muñeco si null).
  setPlayerStream(id, stream) {
    const p = this.players.get(id);
    if (!p || !p.headWrap) return;
    const layers = p.innerEl && p.innerEl.__layers;
    if (stream) {
      if (p.headVideo.srcObject !== stream) p.headVideo.srcObject = stream;
      p.headWrap.style.display = 'block';
      if (layers) { layers.hair.style.display = 'none'; layers.head.style.display = 'none'; layers.goggles.style.display = 'none'; }
    } else {
      p.headWrap.style.display = 'none';
      if (layers) { layers.hair.style.display = ''; layers.head.style.display = ''; layers.goggles.style.display = ''; }
    }
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
