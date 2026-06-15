
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
