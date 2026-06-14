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
  scene: { width: 760, height: 520, durationSec: 30 },
  players: [
    { id: 'b6', team: 'blue', n: 6, x: 205, y: 255 },
    { id: 'b8', team: 'blue', n: 8, x: 320, y: 160 },
    { id: 'b10', team: 'blue', n: 10, x: 455, y: 255 },
    { id: 'b7', team: 'blue', n: 7, x: 320, y: 350 },
    { id: 'r5', team: 'red', n: 5, x: 545, y: 175 },
    { id: 'r6', team: 'red', n: 6, x: 585, y: 255 },
    { id: 'r8', team: 'red', n: 8, x: 545, y: 335 }
  ],
  phases: [
    { from: 0, to: 6, label: '0-6s · Azul circula para atraer la presión' },
    { from: 6, to: 12, label: '6-12s · Cambio de lado: rojo salta a presionar' },
    { from: 12, to: 18, label: '12-18s · Rojo roba: transición inmediata' },
    { from: 18, to: 24, label: '18-24s · Rojo contraataca hacia mini-arco' },
    { from: 24, to: 30, label: '24-30s · Azul recupera y reinicia la tarea' }
  ],
  tracks: {
    b6: [[0,205,255],[6,225,255],[12,245,270],[18,315,285],[24,300,270],[30,205,255]],
    b8: [[0,320,160],[6,335,150],[12,355,170],[18,365,205],[24,330,165],[30,320,160]],
    b10:[[0,455,255],[6,470,245],[12,430,270],[18,395,260],[24,450,255],[30,455,255]],
    b7: [[0,320,350],[6,335,365],[12,370,340],[18,415,330],[24,335,350],[30,320,350]],
    r5: [[0,545,175],[6,500,205],[12,430,240],[18,455,260],[24,540,185],[30,545,175]],
    r6: [[0,585,255],[6,535,255],[12,455,265],[18,520,260],[24,600,255],[30,585,255]],
    r8: [[0,545,335],[6,500,320],[12,455,300],[18,535,310],[24,548,335],[30,545,335]],
    ball:[[0,227,267],[3,340,172],[6,477,267],[9,340,362],[12,247,282],[15,455,265],[18,542,260],[21,650,265],[24,322,282],[30,227,267]]
  }
};

function renderPitchDiagram(data) {
  const objective = data.objective;
  const duration = tacticalExercise.scene.durationSec;

  if (techNote) {
    techNote.innerHTML = `<strong>Demo animada ${duration}s:</strong> juego 4v3 de ${objective}. Azul conserva y progresa; rojo presiona, roba y ataca mini-arco. Usá los controles para pausar, revisar segundo a segundo o reiniciar la escena.`;
  }

  const playerSvg = tacticalExercise.players.map((p) => `
    <g id="${p.id}" class="player ${p.team}" transform="translate(${p.x} ${p.y})">
      <circle r="22"></circle>
      <text>${p.n}</text>
    </g>`).join('');

  pitchDiagram.innerHTML = `
    <svg class="pitch" viewBox="0 0 760 520" role="img" aria-label="Animación táctica de 30 segundos: azul conserva, rojo roba y contraataca">
      <rect x="20" y="20" width="720" height="480" rx="18" fill="#157b42" stroke="#ffffff" stroke-width="4" />
      <line x1="380" y1="20" x2="380" y2="500" stroke="#fff" stroke-width="3" opacity=".85" />
      <circle cx="380" cy="260" r="68" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <circle cx="380" cy="260" r="5" fill="#fff" />
      <rect x="20" y="150" width="105" height="220" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="635" y="150" width="105" height="220" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="20" y="210" width="42" height="100" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="698" y="210" width="42" height="100" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />

      <rect x="145" y="110" width="500" height="300" rx="16" fill="rgba(255,255,255,.06)" stroke="rgba(255,255,255,.55)" stroke-dasharray="10 9" />
      <rect x="642" y="230" width="16" height="70" rx="4" fill="rgba(255,255,255,.9)" />
      <text id="phaseLabel" class="phase-label" x="42" y="52">0-6s · Azul inicia y atrae presión</text>
      <text class="phase-help" x="42" y="482">Regla: si rojo roba, tiene 6s para finalizar. Si azul recupera, reinicia conservación.</text>

      ${playerSvg}
      <circle id="ball" class="ball" cx="227" cy="267" r="10" />
    </svg>
    <div class="animation-controls" aria-label="Controles de la animación táctica">
      <button id="playPauseBtn" type="button">Pausar</button>
      <button id="restartAnimationBtn" class="secondary" type="button">Reiniciar</button>
      <label class="timeline-control">
        <span id="timeReadout">0.0s / ${duration}s</span>
        <input id="animationTimeline" type="range" min="0" max="${duration}" value="0" step="0.1" />
      </label>
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

  function renderAt(t) {
    exercise.players.forEach(({ id }) => {
      const [x, y] = pointAt(exercise.tracks[id], t);
      const el = svg.querySelector(`#${id}`);
      if (el) el.setAttribute('transform', `translate(${x} ${y})`);
    });
    const [bx, by] = pointAt(exercise.tracks.ball, t);
    const ball = svg.querySelector('#ball');
    if (ball) {
      ball.setAttribute('cx', bx);
      ball.setAttribute('cy', by);
    }
    const phase = exercise.phases.find(({ from, to }) => t >= from && t < to) || exercise.phases[0];
    const label = svg.querySelector('#phaseLabel');
    if (label) label.textContent = phase.label;
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

LECTURA DE LA ANIMACIÓN
- Círculos grandes: jugadores.
- Círculo pequeño: pelota, siempre al pie/lado del poseedor.
- La secuencia dura 30 segundos: azul conserva, rojo presiona, rojo roba, contraataca y azul reinicia.
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
