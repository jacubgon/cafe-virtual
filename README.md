# ☕ Oficina Virtual · Dynamics VR

Un espacio virtual tipo **Gather** para el café de la empresa, con la identidad
visual de **Dynamics VR** (design system incluido). Cada persona elige su avatar
y se mueve por un mapa 2D con salas; cuando te acercas a alguien —o entráis en la
misma sala— se abre la videollamada automáticamente (**proximidad**), y el
volumen baja según te alejas.

Implementa el diseño de Claude Design (`Oficina Virtual.dc.html`) sobre un motor
**real** de tiempo real + WebRTC (el mockup original tenía compañeros simulados y
vídeo de mentira; esto es multijugador y vídeo de verdad).

## Cómo arrancarlo

```bash
npm install
npm start
```

Abre **http://localhost:3000**. Para probar la proximidad tú solo, abre dos
pestañas con nombres distintos y junta los avatares.

> La cámara/micro solo funciona en `localhost` o por **HTTPS**. En el navegador
> integrado del editor la cámara está bloqueada; ábrelo en tu Chrome/Edge normal.

## Despliegue en la nube (URL fija) — Render

Para tener una URL estable (HTTPS) que no dependa de ningún equipo:

1. Sube el proyecto a un repositorio de **GitHub** (ver más abajo).
2. Entra en **https://render.com** y regístrate (gratis, con tu cuenta de GitHub).
3. **New +** → **Blueprint** → elige este repo. Render lee `render.yaml` y crea el
   servicio solo (build `npm install`, arranque `npm start`, Node 20). Pulsa
   **Apply**.
4. En un par de minutos tendrás una URL tipo `https://cafe-virtual.onrender.com`.

Notas:
- **WebSockets** (Socket.IO) funcionan en los *web services* de Render.
- El **plan free** duerme el servicio tras ~15 min sin visitas: la primera
  persona que entra espera ~30-60 s a que despierte. Para uso diario sin esperas,
  el plan de pago más barato lo mantiene siempre activo.
- Sigue siendo **misma red = sin TURN**. Para redes distintas (casa/móvil) hace
  falta un servidor TURN (ver más abajo).

Subir a GitHub por primera vez (ya está `git init` hecho y el primer commit):

```bash
# crea un repo vacío en github.com y luego:
git remote add origin https://github.com/<tu-usuario>/cafe-virtual.git
git branch -M main
git push -u origin main
```

## Cómo se usa

- **Moverse:** WASD / flechas, o **clic en el mapa**: calcula la ruta (A*) y
  cruza las puertas solo hasta el destino.
- **Proximidad:** acércate a alguien (o entra en su misma sala) → se abre el
  vídeo/audio. Al alejarte se corta y el volumen baja con la distancia.
- **M:** silenciar/activar micro. Botón **Activar/Apagar cámara** en el panel.
- **Frases rápidas:** botones de la barra superior → bocadillo sobre tu avatar
  (lo ven todos).

## El plano tiene vida

Un único edificio con mobiliario detallado y **animaciones ambientales**: vapor
saliendo de la cafetera, pantallas de recreativa que brillan, plantas que se
mecen, la fuente de la plaza, ventanas con luz. Los avatares tienen **sombra**,
**respiran** en reposo, **se balancean al andar** y muestran un **aro verde**
cuando hablan (además del bocadillo).

## Salas (zonas de audio) y modo videollamada

- **Cafetería**, **Sala de reuniones**, **Sala de juegos** y **Plaza central**.
- En la **plaza**: vídeos flotantes en el panel lateral por **cercanía**.
- Al **entrar en una sala** se abre un **modal de videollamada** con la rejilla
  de cámaras de quien esté dentro (como una reunión). El movimiento se congela
  mientras estás en la llamada; se sale con **"Salir de la sala"**, que te
  devuelve al pasillo.

## Arquitectura

- `server/index.js` — Express + Socket.IO. Sirve la web, sincroniza posiciones y
  avatares, retransmite frases y hace de **servidor de señalización WebRTC**.
- `public/js/avatar.js` — constantes del mundo/salas + avatares "muñeco".
- `public/js/world.js` — escenario DOM escalado, movimiento, colisión con
  muros y cálculo de proximidad (radio **o** misma sala).
- `public/js/pathfind.js` — pathfinding A* sobre rejilla (clic-para-caminar
  que cruza las puertas). La rejilla sale de los mismos `WALLS`.
- `public/js/rtc.js` — conexiones **WebRTC en malla** (cada par conecta directo).
- `public/js/main.js` — onboarding (avatar) + oficina + panel de vídeos.
- `public/_ds/dvr/` — design system Dynamics VR (fuente DM Sans + tokens).

## Pendiente / siguientes pasos

- **Minijuegos (Fase 2):** el diseño trae 5 (quiz, dos verdades y una mentira,
  adivina quién, pictionary, ruleta). Hacerlos **multijugador reales** (turnos
  sincronizados entre personas) es el grueso de la fase 2.
- **Gente remota:** añadir un servidor **TURN** (coturn) en `ICE_SERVERS`
  (`public/js/rtc.js`) para quien no esté en la red de la oficina.
- **Despliegue con HTTPS** para que lo use el equipo por su cuenta.
- **Escala:** ahora es malla (ideal <15). Para grupos grandes juntos, un SFU
  (mediasoup / LiveKit).
