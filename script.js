const form = document.querySelector('#sessionForm');
const output = document.querySelector('#output');
const copyBtn = document.querySelector('#copyBtn');
const pitchDiagram = document.querySelector('#pitchDiagram');

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

function renderPitchDiagram(data) {
  const objective = data.objective;
  const isBuildUp = objective.includes('salida');
  const isFinish = objective.includes('finalización');

  const players = isBuildUp
    ? [
        ['blue', 1, 145, 255], ['blue', 2, 250, 170], ['blue', 3, 250, 340], ['blue', 4, 390, 255],
        ['red', 7, 520, 180], ['red', 9, 560, 255], ['red', 11, 520, 330]
      ]
    : isFinish
      ? [
          ['blue', 8, 250, 255], ['blue', 10, 370, 180], ['blue', 9, 510, 255], ['blue', 11, 370, 330],
          ['red', 4, 575, 215], ['red', 5, 575, 295], ['red', 1, 650, 255]
        ]
      : [
          ['blue', 6, 210, 210], ['blue', 8, 330, 160], ['blue', 10, 450, 250], ['blue', 7, 330, 350],
          ['red', 5, 520, 175], ['red', 6, 585, 255], ['red', 8, 520, 335]
        ];

  const playerSvg = players.map(([team, n, x, y]) => `
    <g class="player ${team}">
      <circle cx="${x}" cy="${y}" r="22"></circle>
      <text x="${x}" y="${y}">${n}</text>
    </g>`).join('');

  pitchDiagram.innerHTML = `
    <svg class="pitch" viewBox="0 0 760 520" role="img" aria-label="Cancha con jugadores, pelota y movimientos">
      <defs>
        <marker id="arrowHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#fff" />
        </marker>
        <marker id="runHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#ffe45c" />
        </marker>
        <marker id="dribbleHead" markerWidth="10" markerHeight="10" refX="8" refY="3" orient="auto" markerUnits="strokeWidth">
          <path d="M0,0 L0,6 L9,3 z" fill="#37e0ff" />
        </marker>
      </defs>

      <rect x="20" y="20" width="720" height="480" rx="18" fill="#157b42" stroke="#ffffff" stroke-width="4" />
      <line x1="380" y1="20" x2="380" y2="500" stroke="#fff" stroke-width="3" opacity=".85" />
      <circle cx="380" cy="260" r="68" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <circle cx="380" cy="260" r="5" fill="#fff" />
      <rect x="20" y="150" width="105" height="220" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="635" y="150" width="105" height="220" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="20" y="210" width="42" height="100" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />
      <rect x="698" y="210" width="42" height="100" fill="none" stroke="#fff" stroke-width="3" opacity=".85" />

      <path class="arrow-pass" d="M250 170 L390 255" />
      <path class="arrow-pass" d="M390 255 L520 180" />
      <path class="arrow-run" d="M330 350 C390 380 470 365 535 315" />
      <path class="arrow-dribble" d="M210 210 C250 250 285 190 325 230 S390 285 450 250" />
      <circle class="ball" cx="250" cy="170" r="10" />

      ${playerSvg}
    </svg>`;
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
