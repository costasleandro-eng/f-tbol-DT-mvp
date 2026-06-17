
## 2026-06-14 20:01 UTC — exercise worker
- Mejora elegida: alinear la demo animada con el ejercicio prioritario “Presión tras pérdida en carril central: 5v5 + 2 comodines”.
- Actualicé `script.js` para que la animación de 30s muestre roles claros: azul conserva/ataca con comodines, rojo defiende/intercepta, azul activa 5s de presión tras pérdida y la variante roja progresa a zona objetivo.
- Añadí carriles visuales, zonas objetivo y comodines para que el entrenador entienda quién ataca, quién defiende, transición tras pérdida/recuperación y criterio de éxito observable.
- Actualicé `styles.css` con color propio para comodines.
- Verificación: `node --check script.js` OK.

## 2026-06-14 20:03 UTC — animation worker
- Mejora elegida: posesión explícita en la animación, sin sumar dependencias.
- Añadí `possessions` al objeto `tacticalExercise` para indicar quién tiene la pelota por tramo y con qué offset al pie/lado.
- La pelota ahora se pega al costado del poseedor durante las posesiones y vuelve al track libre cuando está en viaje/disputa.
- Agregué aro amarillo sobre el poseedor y texto `Poseedor: ...` para explicar mejor el juego mientras corre el timeline.
- Verificación: `node --check script.js` OK.

## 2026-06-15 — exercise-worker
- Mejora pequeña: enriquecí `script.js` con una ficha estructurada del ejercicio demo “Presión tras pérdida en carril central: 5v5 + 2 comodines”.
- Ahora el plan generado explicita problema táctico, objetivo observable, quién ataca, quién defiende, reglas, transiciones, criterios de éxito y coaching points.
- Prioridad cubierta: hacer más claro qué debe verse en una animación de 30 segundos y cómo evaluar la tarea en campo.

## 2026-06-15 00:30 UTC — animation worker
- Mejora elegida: agregar una línea de lectura por fase dentro de la pizarra animada.
- Actualicé `tacticalExercise.phases` con `cue` para explicar qué debe mirar el entrenador en cada tramo: objetivo, disparador, regla o consecuencia.
- Añadí el texto SVG `phaseCue` bajo fase y poseedor, para que la animación no solo muestre movimientos sino también la intención táctica del momento.
- Ajusté `styles.css` con `.phase-cue` para diferenciar esa consigna sin sumar dependencias.
- Verificación: `node --check script.js` OK.

## 2026-06-15 06:01 UTC — exercise worker
- Mejora pequeña: añadí `animationChecklist` al ejercicio animado del MVP para que la escena de 30s tenga bloques observables por segundo: ataque, robo, transición tras pérdida, primer pase tras recuperación y reorganización.
- Ajusté criterios de éxito: el rojo solo puntúa doble si el primer pase tras robo rompe hacia delante con control, no con despeje.
- Actualicé la lectura generada de la animación en `script.js` para hacer explícitas las fases y roles.

## 2026-06-15 06:30 UTC — animation worker
- Mejora elegida: añadir una cuarta línea de instrucción contextual dentro de la pizarra animada.
- Actualicé `script.js` con `instructionForTime(t, holder)` para explicar, según el segundo, qué mirar: poseedor, robo rojo, cuenta atrás de contrapresión, primer pase seguro o reorganización.
- Durante 10-15s la escena muestra una cuenta atrás explícita de los 5s de presión tras pérdida, reforzando la regla central del ejercicio.
- Ajusté `styles.css` con `.phase-timer` en amarillo para separar esta guía de fase/poseedor sin sumar dependencias.
- Verificación: `node --check script.js` OK.

## 2026-06-15 12:01 UTC — exercise worker
- Mejora pequeña: agregué un “mapa de roles por momento” para el ejercicio demo de presión tras pérdida.
- Actualicé `script.js` para que el plan generado explique responsabilidades de azul, rojo y comodines durante ataque, pérdida, recuperación y salida rival.
- Actualicé `subagent-exercise-designer.md` con la misma ficha animable para que futuras animaciones de 30s tengan roles claros y observables.
- Verificación: `node --check script.js` OK.

## 2026-06-15 12:30 UTC — animation worker
- Mejora elegida: controles de salto por fase para que la animación se pueda revisar como pizarra didáctica, no solo como reproducción lineal.
- Actualicé `script.js` para generar botones desde `tacticalExercise.phases`; cada botón salta al inicio de la fase, pausa la escena y mantiene sincronizados timeline, textos, poseedor y pelota al pie/lado.
- Actualicé `styles.css` con una fila de botones de fase, estado activo amarillo y adaptación simple en mobile.
- Verificación: `node --check script.js` OK.

## 2026-06-15 18:01 UTC — exercise-worker
- Mejora pequeña: añadidas reglas de “cuándo parar y corregir” para el ejercicio demo de presión tras pérdida.
- Actualicé `subagent-exercise-designer.md` con intervenciones concretas para congelar la animación en 10s/15s/18s/24s.
- Actualicé `script.js` para que el plan generado muestre esas reglas e intervenciones junto a criterios de éxito.
- Validación: `node --check script.js` correcto.

## 2026-06-15 18:30 UTC — animation worker
- Mejora elegida: etiquetas breves de rol activo sobre jugadores clave durante cada fase de la pizarra animada.
- Añadí `roleCues` en `tacticalExercise` para mostrar, según el segundo: apoyo/recibir, roba/pierde, presiona/tapa vertical/cubre apoyo, asegura/pase seguro y salida/temporiza.
- Actualicé el render SVG para posicionar hasta 3 etiquetas sobre los jugadores mientras se mueven, sin flechas ni dependencias, manteniendo la pelota al pie/lado del poseedor.
- Ajusté `styles.css` con `.role-cue` para que las etiquetas sean legibles sobre la cancha.
- Verificación: `node --check script.js` OK.

## 2026-06-16 00:01 UTC — exercise worker
- Mejora pequeña aplicada: agregué un “Marcador observable de la animación” para el ejercicio demo de presión tras pérdida 5v5 + 2 comodines.
- Cambios: `script.js` ahora incluye esos criterios en el plan generado; `subagent-exercise-designer.md` documenta el mismo marcador para mantener alineados producto y contenido.
- Valor para MVP: deja más claro en 30 segundos quién ataca, quién defiende, qué ocurre tras pérdida/recuperación y cuándo una escena cuenta como éxito observable.
- Verificación: `node --check script.js` OK.

## 2026-06-16 00:30 UTC — animation worker
- Mejora pequeña aplicada: corregí el aro de posesión para que sea solo un contorno amarillo y no otro círculo relleno encima/debajo del jugador.
- Cambios: `styles.css` ahora aplica color de equipo solo a los círculos del jugador, excluyendo `.holder-ring`, y fuerza el aro activo con `fill: none`.
- Valor para MVP: la posesión se lee más clara durante la animación; pelota al pie/lado + aro limpio señalan al poseedor sin tapar número, color ni rol.
- Verificación: `node --check script.js` OK.

## 2026-06-16 06:01 UTC — exercise worker
- Mejora pequeña aplicada: añadí “Reglas de decisión para entrenar la transición” al ejercicio demo de presión tras pérdida.
- Cambios: `script.js` ahora incluye `decisionGates` en el plan generado; `subagent-exercise-designer.md` documenta las mismas decisiones por rol/momento.
- Valor para MVP: la animación de 30s no solo muestra movimientos, también aclara cuándo robar, cuándo temporizar, cómo cerrar el pase vertical, qué hacer tras recuperar y cómo reorganizar si rojo supera la presión.

## 2026-06-16 06:30 UTC — animation worker
- Mejora pequeña aplicada: añadí una píldora de estado de posesión junto a los controles de la animación.
- Cambios: `script.js` calcula el equipo del poseedor actual y actualiza `#possessionStatus` en cada frame; `styles.css` colorea el estado por azul, rojo, comodín o pelota en viaje/disputa.
- Valor para MVP: además del aro y la pelota al pie/lado, el entrenador puede leer de un vistazo quién tiene la pelota mientras salta fases o revisa el timeline.
- Verificación: `node --check script.js` OK.

## 2026-06-16 12:01 UTC — exercise worker
- Mejora pequeña aplicada: añadí un protocolo de repetición y puntuación para el ejercicio demo “Presión tras pérdida en carril central”.
- En `subagent-exercise-designer.md` ahora queda claro cómo encajar la repetición en 30s, cuándo reiniciar, cómo puntuar y cuándo repetir sin punto.
- En `script.js` el plan generado incluye el mismo protocolo, reforzando quién ataca/defiende, transición tras pérdida/recuperación y criterios observables.
- Verificación: `node --check script.js` OK.

## 2026-06-16 12:30 UTC — animation worker
- Mejora pequeña aplicada: añadí un marcador visual de contacto pie-pelota para que la posesión no dependa solo del aro o la píldora de estado.
- Cambios: `script.js` ahora dibuja un punto de contacto entre el jugador poseedor y la pelota, etiqueta “al pie derecho/izquierdo” según el offset y oculta ese indicador cuando la pelota está en viaje/disputa.
- Valor para MVP: refuerza la prioridad actual de pelota al pie/lado del poseedor y permite explicar mejor quién controla la jugada al pausar o saltar fases.
- Verificación: `node --check script.js` OK.

## 2026-06-16 18:01 UTC — exercise worker
- Mejora pequeña aplicada: añadí marcadores de éxito/fallo por fase para la animación demo “Presión tras pérdida en carril central”.
- Cambios: `script.js` incorpora `outcome` en cada fase, lo muestra dentro de la pizarra y lo incluye en el plan generado; `styles.css` agrega estilo para esa línea; `subagent-exercise-designer.md` documenta los mismos marcadores.
- Valor para MVP: el entrenador puede distinguir en 30s cuándo una acción cuenta como éxito o fallo para azul/rojo, especialmente en pérdida, recuperación, primer pase y salida rival.
- Verificación: `node --check script.js` y `git diff --check` OK.

## 2026-06-16 18:30 UTC — animation worker

- Revisé `script.js`, `styles.css`, `index.html` y `subagent-animation-engineer.md`.
- Mejora pequeña implementada: agregué una **barra de posesión** debajo de los controles de la animación. Cada tramo muestra quién tiene la pelota y se ilumina en tiempo real junto con el timeline, reforzando la lectura de fases, poseedor y pelota al pie/lado.
- Archivos modificados: `script.js`, `styles.css`.
- Verificación: `node --check script.js` OK.
- Sin push externo.

## 2026-06-17 00:01 UTC — exercise worker
- Mejora pequeña: agregué reglas de validez para puntuar transiciones en el ejercicio MVP de presión tras pérdida.
- Archivos: `subagent-exercise-designer.md` documenta los criterios y `script.js` los incluye en el plan generado.
- Foco: distinguir robos/salidas controladas de rebotes o despejes, y clarificar cuándo la contrapresión cuenta como éxito en una animación de 30s.
- Verificación: `node --check script.js` OK.
