const form = document.querySelector('#sessionForm');
const output = document.querySelector('#output');
const copyBtn = document.querySelector('#copyBtn');
const pitchDiagram = document.querySelector('#pitchDiagram');
const techNote = document.querySelector('#techNote');

const ageGuidance = {
  'sub-9': 'lenguaje simple, mucha demostración, reglas cortas y foco lúdico',
  'sub-10': 'consignas breves, correcciones positivas y tareas con oposición progresiva',
  'sub-15': 'explicar el porqué táctico, exigir hábitos y sostener intensidad con pausas claras',
  'mayores': 'mayor autonomía, detalle táctico y exigencia competitiva'
};

const branchGuidance = {
  masculino: 'mantener referencias generales y ajustar por edad, nivel y contexto competitivo',
  femenino: 'evitar copiar supuestos del fútbol masculino; ajustar cargas, comunicación, referencias y ejemplos al contexto del equipo femenino',
  mixto: 'cuidar inclusión, diferencias madurativas y consignas que funcionen para grupos diversos'
};

const levelGuidance = {
  amateur: 'priorizar claridad, participación alta y ejercicios fáciles de montar',
  universitario: 'sumar toma de decisiones, ritmo competitivo y responsabilidades por rol',
  profesional: 'aumentar especificidad, métricas, intensidad y relación directa con el modelo de juego'
};

function splitDuration(total) {
  const warmup = Math.round(total * 0.18);
  const main = Math.round(total * 0.42);
  const game = Math.round(total * 0.30);
  const close = total - warmup - main - game;
  return { warmup, main, game, close };
}

function techniqueForObjective(objective) {
  if (objective.includes('conducción')) {
    return 'Conducción: usar toques cortos con interior/exterior para orientar la pelota; empeine si quiere acelerar; planta para frenar, pisar y cambiar de dirección.';
  }
  if (objective.includes('pase')) {
    return 'Pase: usar principalmente el interior del pie para precisión; perfilar el cuerpo antes de recibir y orientar el primer control.';
  }
  if (objective.includes('finalización')) {
    return 'Finalización: empeine para potencia, interior para colocar, y control orientado antes del remate si hay presión.';
  }
  return 'Técnica: ajustar superficie de contacto según la acción: interior para precisión, exterior para orientar, empeine para potencia/aceleración y planta para pausa/cambio.';
}

const tacticalExercise = {
  name: 'Presión tras pérdida en carril central: 5v5 + 2 comodines',
  problem: 'Nos parten por dentro después de perder la pelota.',
  objective: 'Recuperar en 5 segundos o impedir que el rival progrese por carril central.',
  attackers: 'Azul conserva/progresa con 5 jugadores + 2 comodines; tras pérdida activa contrapresión.',
  defenders: 'Rojo defiende, roba y busca salir hacia zona objetivo antes de que azul reorganice.',
  setup: '32 x 26 m, tres carriles longitudinales, dos zonas objetivo en extremos y comodines laterales.',
  rules: [
    'Azul suma si conecta 6 pases o entra conduciendo en zona objetivo.',
    'Si azul pierde, tiene 5 segundos para recuperar o forzar pase lateral/atrás.',
    'Rojo suma doble si supera la primera presión y entra en zona objetivo.',
    'Comodines juegan con el poseedor a máximo 2 toques.'
  ],
  transitionRules: [
    'Tras pérdida azul: el más cercano presiona balón; dos compañeros cierran pase vertical y apoyo cercano.',
    'Tras recuperación azul: primer pase seguro al comodín libre antes de volver a progresar.',
    'Tras recuperación roja: primer control hacia delante y pase diagonal para salir de la jaula.'
  ],
  resetProtocol: [
    'Cada repetición dura máximo 30 segundos: 7s de ataque azul, 3s de robo rojo, 5s de contrapresión y cierre con recuperación o salida rival.',
    'Reiniciar desde el comodín izquierdo si azul recupera y asegura pase; reiniciar desde zona objetivo si rojo supera la presión.',
    'Puntuar en voz alta: +1 azul por 6 pases, +1 extra por recuperar en 5s, +2 rojo por salir controlado hacia zona objetivo.',
    'Si hay falta, choque o despeje sin control, no puntúa nadie y se repite desde la pérdida para mantener el foco táctico.'
  ],
  roleResponsibilities: [
    'Azul poseedor: conservar/progresar con apoyo de comodines; si pierde, cambia inmediatamente a presión tras pérdida.',
    'Azul más cercano a la pérdida: presiona al nuevo poseedor sin lanzarse al suelo ni ser superado fácil.',
    'Azules cercanos 2 y 3: cierran pase vertical y apoyo interior; no duplican todos sobre la pelota.',
    'Azules lejanos: achican hacia el centro y preparan reorganización si rojo supera la primera presión.',
    'Rojo que recupera: primer control hacia delante si hay ventaja; si no, protege y busca pase diagonal.',
    'Rojos de apoyo: uno ofrece salida corta y otro amenaza zona objetivo para castigar la presión.'
  ],
  successCriteria: [
    'Primer defensor llega en menos de 2 segundos sin quedar vendido.',
    'El pase vertical queda cerrado durante la ventana de 5 segundos.',
    'El equipo que recupera asegura el primer pase y evita una segunda pérdida inmediata.',
    'Rojo solo puntúa doble si el primer pase tras robo rompe hacia delante y no es un despeje sin control.',
    'La animación permite identificar claramente poseedor, presionante, coberturas y zona objetivo.'
  ],
  observableScorecard: [
    '0-7s ataque azul: mínimo 3 apoyos visibles alrededor del poseedor y un intento claro de pase interior.',
    '7-10s defensa roja: la recuperación debe verse como intercepción/robo, no como pelota suelta sin intención.',
    '10-16s transición azul tras pérdida: 1 presiona balón, 2 cierran línea vertical/apoyo y 2 equilibran hacia dentro.',
    '16-21s recuperación azul: la acción cuenta como éxito solo si termina con pase seguro controlado al comodín.',
    '21-30s salida roja: si rojo supera presión, azul temporiza protegiendo carril central antes de perseguir.'
  ],
  decisionGates: [
    'Al perder: si el poseedor rojo está de espaldas o mal perfilado, azul busca robo inmediato; si está de cara, azul cierra centro y temporiza.',
    'Primer azul: llega con carrera curva para tapar el pase vertical, no en línea recta que permita giro interior.',
    'Segundo y tercer azul: priorizan sombra sobre receptor interior y apoyo cercano; solo saltan si el balón queda mal controlado.',
    'Tras recuperar: si hay compañero libre de cara, pase seguro; si el robo deja ventaja clara, conducción corta y pase antes del segundo toque defensivo.',
    'Si rojo supera: azul abandona la persecución individual y protege carril central hasta reorganizar 2+3 detrás del balón.'
  ],
  stopRules: [
    'Parar solo si el primer azul presiona sin ángulo y permite giro hacia carril central.',
    'Parar si dos azules van al mismo rival y dejan libre el pase vertical.',
    'No parar por un pase lateral rojo: el objetivo azul también es orientar fuera y reorganizar.',
    'Repetir inmediatamente si la recuperación azul termina en pérdida por no asegurar el primer pase.'
  ],
  transitionValidationRules: [
    'La recuperación roja solo es válida si el primer control queda orientado hacia zona objetivo o hacia un apoyo visible.',
    'La contrapresión azul solo cuenta como éxito si combina presión al balón con cierre del pase vertical; robar por rebote sin estructura no suma punto extra.',
    'La recuperación azul debe terminar con pase seguro a comodín o compañero de cara; si vuelve a perder antes de 2 segundos, se registra como fallo de transición.',
    'La salida roja solo vale doble si supera la primera línea de presión con pase o conducción controlada, no con despeje largo sin destinatario.',
    'Si el rival juega lateral o atrás durante la ventana de 5 segundos, azul obtiene éxito defensivo parcial aunque no recupere.'
  ],
  coachInterventions: [
    'Congelar en 10s: señalar quién presiona, quién tapa pase vertical y quién equilibra.',
    'Congelar en 15s: preguntar si conviene robar, temporizar o hacer falta táctica no lesiva según distancia.',
    'Congelar en 18s: revisar primer pase tras recuperar; debe ir a apoyo libre, no al tráfico.',
    'Congelar en 24s: si rojo salió, pedir repliegue protegiendo centro antes que persecución individual.'
  ],
  coachCommands: [
    '0-7s: “Azul, atrae y juega con apoyo; rojo, tapa el pase interior sin partirte.”',
    '7-10s: “Robo rojo: primer control orientado, no despeje.”',
    '10-16s: “Cinco segundos: uno aprieta balón, dos cierran dentro, los otros equilibran.”',
    '16-21s: “Si azul recupera, primer pase seguro al comodín; no jugar otra vez al tráfico.”',
    '21-30s: “Si rojo sale, azul protege el centro y temporiza antes de perseguir.”'
  ],
  animationChecklist: [
    '0-7s: azul ataca/conserva; rojo ajusta distancias sin desordenarse.',
    '7-10s: rojo defiende y roba; se ve claramente quién recupera.',
    '10-16s: transición tras pérdida azul: uno presiona, dos cierran carril central, dos equilibran.',
    '16-21s: si azul recupera, primer pase seguro al comodín antes de volver a acelerar.',
    '21-30s: si rojo supera la presión, ataca zona objetivo y azul temporiza/reorganiza.'
  ],
  coachingPoints: [
    'No todos van al balón: presionar, tapar avance y proteger centro son roles distintos.',
    'Cuerpo orientado para robar o forzar pase malo, no solo correr fuerte.',
    'Si no se roba, temporizar y reorganizar antes de quedar partido.',
    'Después de recuperar, respirar con un pase seguro si no hay ventaja clara.'
  ],
  scene: { width: 760, height: 520, durationSec: 30 },
  players: [
    { id: 'b4', team: 'blue', n: 4, x: 205, y: 185 },
    { id: 'b6', team: 'blue', n: 6, x: 265, y: 260 },
    { id: 'b8', team: 'blue', n: 8, x: 350, y: 155 },
    { id: 'b10', team: 'blue', n: 10, x: 420, y: 260 },
    { id: 'b11', team: 'blue', n: 11, x: 350, y: 365 },
    { id: 'r5', team: 'red', n: 5, x: 500, y: 170 },
    { id: 'r6', team: 'red', n: 6, x: 535, y: 260 },
    { id: 'r8', team: 'red', n: 8, x: 500, y: 350 },
    { id: 'r9', team: 'red', n: 9, x: 610, y: 220 },
    { id: 'r10', team: 'red', n: 10, x: 610, y: 300 },
    { id: 'n1', team: 'neutral', n: 'C', x: 150, y: 260 },
    { id: 'n2', team: 'neutral', n: 'C', x: 640, y: 260 }
  ],
  phases: [
    {
      from: 0,
      to: 7,
      label: '0-7s · Azul conserva con comodines y busca pase interior',
      cue: 'Objetivo azul: atraer por fuera y encontrar al 10 entre líneas.',
      outcome: 'Éxito: azul atrae a rojo y encuentra receptor interior perfilado. Fallo: pase forzado sin apoyos.'
    },
    {
      from: 7,
      to: 10,
      label: '7-10s · Rojo intercepta: pérdida azul en carril central',
      cue: 'Disparador: rojo roba y azul debe reaccionar sin ir todos al balón.',
      outcome: 'Éxito rojo: robo orientado con primer control hacia salida. Fallo rojo: despeje o robo sin apoyo.'
    },
    {
      from: 10,
      to: 16,
      label: '10-16s · Azul activa 5s: presiona balón y cierra pase vertical',
      cue: 'Regla clave: el cercano presiona, los demás tapan centro y apoyo.',
      outcome: 'Éxito azul: recuperar o encerrar fuera. Fallo azul: dos saltan al balón y queda pase vertical libre.'
    },
    {
      from: 16,
      to: 21,
      label: '16-21s · Azul recupera y asegura primer pase al comodín',
      cue: 'Tras recuperar: primer pase seguro antes de volver a progresar.',
      outcome: 'Éxito: primer pase limpio al comodín. Fallo: recuperar y volver a perder por jugar al tráfico.'
    },
    {
      from: 21,
      to: 30,
      label: '21-30s · Variante: rojo supera presión y entra en zona objetivo',
      cue: 'Si rojo sale: azul temporiza y reorganiza para no quedar partido.',
      outcome: 'Éxito rojo: sale controlado a zona objetivo. Éxito azul alternativo: temporiza protegiendo carril central.'
    }
  ],
  possessions: [
    { from: 0, to: 2.7, player: 'n1', label: 'Comodín izquierdo', offset: { x: 22, y: 8 } },
    { from: 3.3, to: 5.6, player: 'b6', label: 'Azul 6', offset: { x: 22, y: 10 } },
    { from: 6.2, to: 7.4, player: 'b10', label: 'Azul 10', offset: { x: 22, y: 8 } },
    { from: 8.4, to: 10.8, player: 'r5', label: 'Rojo 5 intercepta', offset: { x: -22, y: 10 } },
    { from: 12.8, to: 15.8, player: 'b10', label: 'Azul 10 recupera', offset: { x: -22, y: 10 } },
    { from: 17.2, to: 20.6, player: 'n2', label: 'Comodín derecho', offset: { x: -22, y: 8 } },
    { from: 21.2, to: 23.8, player: 'b10', label: 'Azul 10 reinicia', offset: { x: 22, y: 8 } },
    { from: 24.3, to: 30, player: 'r10', label: 'Rojo 10 sale de presión', offset: { x: 22, y: 8 } }
  ],
  roleCues: [
    { from: 0, to: 7, player: 'n1', text: 'apoyo' },
    { from: 0, to: 7, player: 'b10', text: 'recibir' },
    { from: 7, to: 10, player: 'r5', text: 'roba' },
    { from: 7, to: 10, player: 'b10', text: 'pierde' },
    { from: 10, to: 16, player: 'b10', text: 'presiona' },
    { from: 10, to: 16, player: 'b6', text: 'tapa vertical' },
    { from: 10, to: 16, player: 'b11', text: 'cubre apoyo' },
    { from: 16, to: 21, player: 'b10', text: 'asegura' },
    { from: 16, to: 21, player: 'n2', text: 'pase seguro' },
    { from: 21, to: 30, player: 'r10', text: 'salida' },
    { from: 21, to: 30, player: 'b6', text: 'temporiza' }
  ],
  tracks: {
    b4: [[0,205,185],[7,235,195],[10,310,215],[16,390,230],[21,235,195],[30,205,185]],
    b6: [[0,265,260],[7,305,260],[10,365,260],[16,420,260],[21,280,260],[30,265,260]],
    b8: [[0,350,155],[7,365,165],[10,410,195],[16,455,215],[21,360,155],[30,350,155]],
    b10:[[0,420,260],[7,445,260],[10,500,260],[16,470,270],[21,430,260],[30,420,260]],
    b11:[[0,350,365],[7,365,350],[10,420,315],[16,455,300],[21,360,365],[30,350,365]],
    r5: [[0,500,170],[7,455,195],[10,390,235],[16,430,235],[21,500,175],[30,500,170]],
    r6: [[0,535,260],[7,500,260],[10,430,260],[16,410,260],[21,530,260],[30,535,260]],
    r8: [[0,500,350],[7,465,325],[10,420,290],[16,435,290],[21,500,345],[30,500,350]],
    r9: [[0,610,220],[7,575,230],[10,520,245],[16,520,245],[21,565,235],[24,620,230],[30,650,230]],
    r10:[[0,610,300],[7,575,295],[10,525,285],[16,525,285],[21,565,300],[24,620,310],[30,650,310]],
    n1: [[0,150,260],[30,150,260]],
    n2: [[0,640,260],[30,640,260]],
    ball:[[0,150,260],[3,265,260],[6,420,260],[8,430,260],[10,390,235],[13,415,255],[16,470,270],[19,640,260],[21,430,260],[24,565,300],[27,650,310],[30,650,310]]
  }
};

function renderPitchDiagram(data) {
  const objective = data.objective;
  const duration = tacticalExercise.scene.durationSec;

  if (techNote) {
    techNote.innerHTML = `<strong>Demo animada ${duration}s:</strong> ${tacticalExercise.name}. Azul ataca/conserva con comodines; rojo defiende, roba y busca zona objetivo. Usá los controles para pausar, revisar segundo a segundo o reiniciar la escena.`;
  }

  const playerSvg = tacticalExercise.players.map((p) => `
    <g id="${p.id}" class="player ${p.team}" transform="translate(${p.x} ${p.y})">
      <circle class="holder-ring" r="28"></circle>
      <circle r="22"></circle>
      <text>${p.n}</text>
    </g>`).join('');
  const possessionRail = tacticalExercise.possessions.map((segment, index) => {
    const player = tacticalExercise.players.find(({ id }) => id === segment.player);
    const team = player?.team || 'loose';
    const durationSec = Math.max(segment.to - segment.from, 0.1);
    return `<span class="possession-segment ${team}" data-possession-index="${index}" style="flex-grow:${durationSec}" title="${segment.from}-${segment.to}s · ${segment.label}">${segment.label}</span>`;
  }).join('');

  pitchDiagram.innerHTML = `
    <svg class="pitch" viewBox="0 0 760 520" role="img" aria-label="Animación táctica de 30 segundos: presión tras pérdida, recuperación y transición rival">
      <rect x="20" y="20" width="720" height="480" rx="18" fill="#157b42" stroke="#ffffff" stroke-width="4" />
      <line x1="380" y1="20" x2="380" y2="500" stroke="#fff" stroke-width="3" opacity=".85" />
      <circle cx="380" cy="260" r="68" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <circle cx="380" cy="260" r="5" fill="#fff" />
      <rect x="20" y="150" width="105" height="220" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="635" y="150" width="105" height="220" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="20" y="210" width="42" height="100" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="698" y="210" width="42" height="100" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />

      <rect x="145" y="110" width="500" height="300" rx="16" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.55)" stroke-dasharray="10 9" />
      <line x1="312" y1="110" x2="312" y2="410" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="7 7" />
      <line x1="478" y1="110" x2="478" y2="410" stroke="rgba(255,255,255,.45)" stroke-width="2" stroke-dasharray="7 7" />
      <rect x="120" y="218" width="24" height="84" rx="5" fill="rgba(255,255,255,.85)" />
      <rect x="646" y="218" width="24" height="84" rx="5" fill="rgba(255,255,255,.85)" />
      <text id="phaseLabel" class="phase-label" x="42" y="52">0-7s · Azul conserva con comodines</text>
      <text id="possessionLabel" class="possession-label" x="42" y="78">Poseedor: comodín izquierdo</text>
      <text id="phaseCue" class="phase-cue" x="42" y="103">Objetivo azul: atraer por fuera y encontrar al 10 entre líneas.</text>
      <text id="phaseTimer" class="phase-timer" x="42" y="130">Ventana de decisión: circular y perfilar antes del pase interior.</text>
      <text id="phaseOutcome" class="phase-outcome" x="42" y="456">Éxito: azul atrae a rojo y encuentra receptor interior perfilado. Fallo: pase forzado sin apoyos.</text>
      <text class="phase-help" x="42" y="482">Regla: si azul pierde, tiene 5s para recuperar o cerrar el pase vertical. Si rojo sale, ataca zona objetivo.</text>

      ${playerSvg}
      <g id="roleCueLayer" aria-hidden="true">
        <text class="role-cue" data-cue-index="0"></text>
        <text class="role-cue" data-cue-index="1"></text>
        <text class="role-cue" data-cue-index="2"></text>
      </g>
      <circle id="footContact" class="foot-contact" cx="227" cy="267" r="5" />
      <circle id="ball" class="ball" cx="227" cy="267" r="10" />
      <text id="footContactLabel" class="contact-label" x="242" y="252">al pie</text>
    </svg>
    <div class="animation-controls" aria-label="Controles de la animación táctica">
      <button id="playPauseBtn" type="button">Pausar</button>
      <button id="restartAnimationBtn" class="secondary" type="button">Reiniciar</button>
      <label class="timeline-control">
        <span id="timeReadout">0.0s / ${duration}s</span>
        <input id="animationTimeline" type="range" min="0" max="${duration}" value="0" step="0.1" />
      </label>
      <span id="possessionStatus" class="possession-status neutral">Posesión: comodín</span>
      <span id="phaseProgress" class="phase-progress">Fase 1/5 · 0.0s de 7s</span>
      <div class="possession-rail" aria-label="Línea de posesión: quién tiene la pelota en cada momento">
        ${possessionRail}
      </div>
      <div class="phase-jump-list" aria-label="Saltar a una fase de la animación">
        ${tacticalExercise.phases.map((phase, index) => `
          <button class="phase-jump" type="button" data-phase-index="${index}">${phase.label}</button>`).join('')}
      </div>
    </div>`;

  startTacticalAnimation(pitchDiagram.querySelector('svg'), pitchDiagram, tacticalExercise);
}

function startTacticalAnimation(svg, root, exercise) {
  if (!svg) return;
  if (window.tacticalAnimationTimer) clearInterval(window.tacticalAnimationTimer);
  const duration = exercise.scene.durationSec;
  const playPauseBtn = root.querySelector('#playPauseBtn');
  const restartBtn = root.querySelector('#restartAnimationBtn');
  const timeline = root.querySelector('#animationTimeline');
  const timeReadout = root.querySelector('#timeReadout');
  const possessionStatus = root.querySelector('#possessionStatus');
  const phaseProgress = root.querySelector('#phaseProgress');
  const possessionSegments = Array.from(root.querySelectorAll('.possession-segment'));
  const phaseJumpButtons = Array.from(root.querySelectorAll('.phase-jump'));
  let currentTime = 0;
  let isPlaying = true;
  let lastTick = performance.now();

  const lerp = (a, b, t) => a + (b - a) * t;
  function pointAt(points, t) {
    for (let i = 0; i < points.length - 1; i++) {
      const [t0, x0, y0] = points[i];
      const [t1, x1, y1] = points[i + 1];
      if (t >= t0 && t <= t1) {
        const k = (t - t0) / (t1 - t0 || 1);
        return [lerp(x0, x1, k), lerp(y0, y1, k)];
      }
    }
    return points[points.length - 1].slice(1);
  }

  function instructionForTime(t, holder) {
    if (t >= 10 && t < 15) {
      return `Cuenta atrás contrapresión: ${Math.ceil(15 - t)}s para recuperar o cerrar pase vertical.`;
    }
    if (t >= 15 && t < 16) {
      return 'Fin de ventana: si no hay robo, azul debe temporizar y reorganizar.';
    }
    if (t >= 7 && t < 10) {
      return 'Robo rojo: identificá quién pierde, quién recupera y primer pase posible.';
    }
    if (t >= 16 && t < 21) {
      return 'Recuperación azul: primer pase seguro al comodín antes de acelerar.';
    }
    if (t >= 21) {
      return 'Variante rival: rojo supera presión; azul protege centro y retrocede ordenado.';
    }
    return holder ? `Pelota al pie/lado de ${holder.label}: mirar apoyos cercanos y pase interior.` : 'Pelota en viaje: seguir receptor y presión más cercana.';
  }

  function teamLabelForHolder(holder) {
    if (!holder) return { className: 'loose', text: 'Pelota en viaje / disputa' };
    const player = exercise.players.find(({ id }) => id === holder.player);
    const labels = { blue: 'Azul', red: 'Rojo', neutral: 'Comodín' };
    return {
      className: player ? player.team : 'loose',
      text: `Posesión: ${labels[player?.team] || 'equipo'} · ${holder.label}`
    };
  }

  function renderAt(t) {
    const playerPositions = {};
    exercise.players.forEach(({ id }) => {
      const [x, y] = pointAt(exercise.tracks[id], t);
      playerPositions[id] = { x, y };
      const el = svg.querySelector(`#${id}`);
      if (el) el.setAttribute('transform', `translate(${x} ${y})`);
    });

    svg.querySelectorAll('.holder-ring').forEach((ring) => ring.classList.remove('active'));
    const activePossessionIndex = exercise.possessions.findIndex(({ from, to }) => t >= from && t < to);
    const holder = activePossessionIndex === -1 ? null : exercise.possessions[activePossessionIndex];
    possessionSegments.forEach((segment, index) => segment.classList.toggle('active', index === activePossessionIndex));
    const holderPosition = holder ? playerPositions[holder.player] : null;
    const [pathBallX, pathBallY] = pointAt(exercise.tracks.ball, t);
    const ballX = holderPosition ? holderPosition.x + holder.offset.x : pathBallX;
    const ballY = holderPosition ? holderPosition.y + holder.offset.y : pathBallY;
    const ball = svg.querySelector('#ball');
    if (ball) {
      ball.setAttribute('cx', ballX);
      ball.setAttribute('cy', ballY);
    }
    const footContact = svg.querySelector('#footContact');
    const footContactLabel = svg.querySelector('#footContactLabel');
    if (footContact && footContactLabel) {
      if (holderPosition) {
        const footX = holderPosition.x + holder.offset.x * 0.72;
        const footY = holderPosition.y + holder.offset.y * 0.72;
        const side = holder.offset.x >= 0 ? 'pie derecho' : 'pie izquierdo';
        footContact.setAttribute('cx', footX);
        footContact.setAttribute('cy', footY);
        footContact.removeAttribute('hidden');
        footContactLabel.setAttribute('x', ballX + (holder.offset.x >= 0 ? 15 : -72));
        footContactLabel.setAttribute('y', ballY - 16);
        footContactLabel.textContent = `al ${side}`;
        footContactLabel.removeAttribute('hidden');
      } else {
        footContact.setAttribute('hidden', 'true');
        footContactLabel.setAttribute('hidden', 'true');
      }
    }
    const holderRing = holder ? svg.querySelector(`#${holder.player} .holder-ring`) : null;
    if (holderRing) holderRing.classList.add('active');
    if (possessionStatus) {
      const status = teamLabelForHolder(holder);
      possessionStatus.className = `possession-status ${status.className}`;
      possessionStatus.textContent = status.text;
    }

    const activeRoleCues = (exercise.roleCues || []).filter(({ from, to }) => t >= from && t < to).slice(0, 3);
    svg.querySelectorAll('.role-cue').forEach((cueEl, index) => {
      const cue = activeRoleCues[index];
      const position = cue ? playerPositions[cue.player] : null;
      if (!cue || !position) {
        cueEl.textContent = '';
        cueEl.classList.remove('visible');
        return;
      }
      cueEl.textContent = cue.text;
      cueEl.setAttribute('x', position.x);
      cueEl.setAttribute('y', position.y - 33);
      cueEl.classList.add('visible');
    });

    const phaseIndex = exercise.phases.findIndex(({ from, to }) => t >= from && t < to);
    const activePhaseIndex = phaseIndex === -1 ? 0 : phaseIndex;
    const phase = exercise.phases[activePhaseIndex] || exercise.phases[0];
    const phaseElapsed = Math.max(0, t - phase.from);
    const phaseDuration = Math.max(0.1, phase.to - phase.from);
    phaseJumpButtons.forEach((button, index) => button.classList.toggle('active', index === activePhaseIndex));
    if (phaseProgress) {
      phaseProgress.textContent = `Fase ${activePhaseIndex + 1}/${exercise.phases.length} · ${phaseElapsed.toFixed(1)}s de ${phaseDuration.toFixed(0)}s`;
      phaseProgress.style.setProperty('--phase-progress', `${Math.min(100, (phaseElapsed / phaseDuration) * 100)}%`);
    }
    const label = svg.querySelector('#phaseLabel');
    if (label) label.textContent = phase.label;
    const possessionLabel = svg.querySelector('#possessionLabel');
    if (possessionLabel) {
      const side = holder?.offset?.x >= 0 ? 'derecho' : 'izquierdo';
      possessionLabel.textContent = holder ? `Poseedor: ${holder.label} · pelota al pie ${side}` : 'Pelota en viaje: pase / disputa';
    }
    const phaseCue = svg.querySelector('#phaseCue');
    if (phaseCue) phaseCue.textContent = phase.cue;
    const phaseTimer = svg.querySelector('#phaseTimer');
    if (phaseTimer) phaseTimer.textContent = instructionForTime(t, holder);
    const phaseOutcome = svg.querySelector('#phaseOutcome');
    if (phaseOutcome) phaseOutcome.textContent = phase.outcome || '';
    if (timeline) timeline.value = t.toFixed(1);
    if (timeReadout) timeReadout.textContent = `${t.toFixed(1)}s / ${duration}s`;
  }

  function tick(now) {
    const delta = (now - lastTick) / 1000;
    lastTick = now;
    if (isPlaying) {
      currentTime = (currentTime + delta) % duration;
      renderAt(currentTime);
    }
  }

  function setPlaying(value) {
    isPlaying = value;
    lastTick = performance.now();
    if (playPauseBtn) playPauseBtn.textContent = isPlaying ? 'Pausar' : 'Reproducir';
  }

  if (playPauseBtn) {
    playPauseBtn.addEventListener('click', () => setPlaying(!isPlaying));
  }

  if (restartBtn) {
    restartBtn.addEventListener('click', () => {
      currentTime = 0;
      setPlaying(true);
      renderAt(currentTime);
    });
  }

  if (timeline) {
    timeline.addEventListener('input', () => {
      currentTime = Number(timeline.value);
      setPlaying(false);
      renderAt(currentTime);
    });
  }

  phaseJumpButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const phase = exercise.phases[Number(button.dataset.phaseIndex)];
      if (!phase) return;
      currentTime = phase.from;
      setPlaying(false);
      renderAt(currentTime);
    });
  });

  renderAt(currentTime);
  window.tacticalAnimationTimer = setInterval(() => tick(performance.now()), 80);
}

function generateSession(data) {
  const d = splitDuration(Number(data.duration));
  return `PLAN DE ENTRENAMIENTO

Categoría: ${data.category}
Rama/contexto: ${data.branch}
Nivel: ${data.level}
Objetivo: ${data.objective}
Duración: ${data.duration} minutos
Jugadores: ${data.players}
Espacio: ${data.space}
Material: ${data.equipment}

1) OBJETIVO DE LA SESIÓN
Mejorar ${data.objective} con tareas progresivas, pasando de una situación simple a una aplicación cercana al juego real.

2) CALENTAMIENTO - ${d.warmup} min
- Activación con pelota en grupos reducidos.
- Movilidad dinámica y coordinación.
- Primera consigna técnica relacionada con ${data.objective}.

Clave del entrenador: corregir poco pero bien. Una idea principal por repetición.

3) PARTE PRINCIPAL - ${d.main} min
Ejercicio base:
- Organización: dividir ${data.players} jugadores en grupos equilibrados.
- Espacio: adaptar a ${data.space}.
- Desarrollo: tarea específica de ${data.objective} con oposición progresiva.
- Progresión: empezar con ventaja para el equipo que aprende y luego equilibrar.

Preguntas guía:
- ¿Cuándo conviene acelerar?
- ¿Qué perfil corporal ayuda más?
- ¿Dónde está el compañero libre o el espacio útil?

4) JUEGO APLICADO - ${d.game} min
Partido condicionado:
- Puntuar doble cuando aparece una acción correcta de ${data.objective}.
- Limitar o liberar toques según el nivel de dificultad.
- Pausas breves para reforzar una corrección táctica.

5) CIERRE - ${d.close} min
- Vuelta a la calma.
- Preguntar a los jugadores qué decisión les ayudó más.
- Resumir 2 ideas clave para llevar al próximo entrenamiento.

ADAPTACIÓN POR EDAD
Para ${data.category}: ${ageGuidance[data.category]}.

ADAPTACIÓN POR RAMA / CONTEXTO
Para ${data.branch}: ${branchGuidance[data.branch]}.

ADAPTACIÓN POR NIVEL
Para nivel ${data.level}: ${levelGuidance[data.level]}.

TÉCNICA CON PELOTA
${techniqueForObjective(data.objective)}

EJERCICIO ANIMADO DEL MVP — ${tacticalExercise.name}
Problema táctico: ${tacticalExercise.problem}
Objetivo observable: ${tacticalExercise.objective}
Organización: ${tacticalExercise.setup}
Quién ataca: ${tacticalExercise.attackers}
Quién defiende: ${tacticalExercise.defenders}

Reglas clave:
${tacticalExercise.rules.map((rule) => `- ${rule}`).join('\n')}

Transiciones:
${tacticalExercise.transitionRules.map((rule) => `- ${rule}`).join('\n')}

Protocolo de repetición y puntuación:
${tacticalExercise.resetProtocol.map((rule) => `- ${rule}`).join('\n')}

Mapa de roles por momento:
${tacticalExercise.roleResponsibilities.map((role) => `- ${role}`).join('\n')}

Criterios de éxito:
${tacticalExercise.successCriteria.map((criterion) => `- ${criterion}`).join('\n')}

Marcador observable de la animación:
${tacticalExercise.observableScorecard.map((item) => `- ${item}`).join('\n')}

Reglas de decisión para entrenar la transición:
${tacticalExercise.decisionGates.map((gate) => `- ${gate}`).join('\n')}

Cuándo parar y corregir:
${tacticalExercise.stopRules.map((rule) => `- ${rule}`).join('\n')}

Reglas de validez para puntuar la transición:
${tacticalExercise.transitionValidationRules.map((rule) => `- ${rule}`).join('\n')}

Intervenciones del entrenador durante la animación:
${tacticalExercise.coachInterventions.map((intervention) => `- ${intervention}`).join('\n')}

Guion verbal de 30 segundos:
${tacticalExercise.coachCommands.map((command) => `- ${command}`).join('\n')}

Checklist para animación de 30 segundos:
${tacticalExercise.animationChecklist.map((item) => `- ${item}`).join('\n')}

Marcadores de éxito/fallo por fase:
${tacticalExercise.phases.map((phase) => `- ${phase.label}: ${phase.outcome}`).join('\n')}

Coaching points:
${tacticalExercise.coachingPoints.map((point) => `- ${point}`).join('\n')}

LECTURA DE LA ANIMACIÓN
- Círculos grandes: jugadores.
- Círculo pequeño: pelota, siempre al pie/lado del poseedor.
- La secuencia dura 30 segundos: azul conserva, pierde, presiona 5 segundos, recupera o concede salida rival.
- Cada bloque temporal tiene una intención única: ataque, robo, reacción tras pérdida, primer pase tras recuperación y reorganización si el rival sale.
- La barra de posesión debajo de los controles resume quién tiene la pelota en cada tramo y se ilumina al avanzar la animación.
- La píldora de fase muestra cuántos segundos van dentro del bloque activo para revisar timing de robo, contrapresión y pase seguro.
- La tercera línea superior cambia por fase y explica qué debe mirar el entrenador: objetivo, disparador, regla o consecuencia.
- La cuarta línea da una instrucción contextual: poseedor, robo, cuenta atrás de contrapresión, primer pase seguro o reorganización defensiva.
- Las etiquetas cortas sobre jugadores marcan el rol activo de la fase: apoyo, roba, presiona, tapa vertical, cubre apoyo, asegura o temporiza.
- Roles: azul ataca y hace contrapresión; rojo defiende, recupera y busca zona objetivo; comodines apoyan al poseedor.
- En animación no usamos flechas: el movimiento debe explicar la acción.

VARIANTE SI FALTA MATERIAL O JUGADORES
- Si faltan conos: marcar zonas con líneas del campo o referencias naturales.
- Si hay menos jugadores: reducir espacios y jugar 3v3, 4v4 o rondos.
- Si hay más jugadores: crear estaciones y rotar cada 6-8 minutos.

CONSEJO DE COMUNICACIÓN
Explicar primero la intención, luego mostrar un ejemplo, y finalmente corregir durante la acción. Evitar discursos largos.`;
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = {
    category: document.querySelector('#category').value,
    branch: document.querySelector('#branch').value,
    level: document.querySelector('#level').value,
    objective: document.querySelector('#objective').value,
    duration: document.querySelector('#duration').value,
    players: document.querySelector('#players').value,
    equipment: document.querySelector('#equipment').value || 'material básico',
    space: document.querySelector('#space').value || 'espacio reducido'
  };
  output.classList.remove('empty');
  output.textContent = generateSession(data);
  renderPitchDiagram(data);
});

renderPitchDiagram({ objective: 'conducción y pase' });

copyBtn.addEventListener('click', async () => {
  const text = output.textContent.trim();
  if (!text || output.classList.contains('empty')) return;
  await navigator.clipboard.writeText(text);
  copyBtn.textContent = 'Copiado';
  setTimeout(() => copyBtn.textContent = 'Copiar', 1200);
});
