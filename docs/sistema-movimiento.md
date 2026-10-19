# Sistema de movimiento — «Precisión suave»

El movimiento del sitio de la CE cuenta una sola historia: **la C acompaña a la persona**. Se mueve para orientar, responder o marcar un momento, nunca para decorar. El código vive en:

- `src/styles/global.css` (tokens y efectos comunes);
- `src/scripts/efectos.ts` (lo que necesita JavaScript);
- los `<style>` de cada página.

## Principios

1. **Un momento por pantalla.** Cada página tiene una sola entrada orquestada. El resto aparece quieto o responde a la persona.
2. **Responder antes que adornar.** Hover, foco, abrir y enviar siempre tienen respuesta. Las entradas al hacer scroll se reservan para dos piezas: las filas del tablero y las fotos de la comunidad.
3. **Solo `transform`, `opacity` y `clip-path`.** No se animan medidas ni posiciones, así todo corre en el compositor sin reflujos.
4. **CSS primero.** El parallax y el giro con el scroll usan `animation-timeline`. JavaScript solo escribe clases o variables (`.visible`, `--px`, `--giro`).
5. **Respeto total.** Con `prefers-reduced-motion: reduce` no se añade la clase `.efectos` y el contenido aparece completo y quieto, sin transiciones de página ni parallax. Sin JavaScript, todo se ve.

## Tokens

| Token | Valor | Uso |
|---|---|---|
| `--ease` | `cubic-bezier(.16, 1, .3, 1)` | La curva de todo lo que entra o responde: arranca decidida y se posa con suavidad |
| `--ease-salida` | `cubic-bezier(.7, 0, .84, 0)` | Solo para lo que se va (página anterior) |
| `--t-accion` | 240 ms | Hover, foco, colores, giro del «+» |
| `--t-entrada` | 700 ms | Entradas: título de página, filas, mensajes |
| `--t-momento` | 1400 ms | El arco que se dibuja en la portada |
| Escalonado | 40 ms por palabra, 80 ms por elemento hermano | Ritmo constante en todo el sitio |

## Coreografía de carga (portada)

| t | Qué pasa |
|---|---|
| 0 ms | La foto aparece escalando de 0,92 a 1 (1,1 s) |
| 250 ms | El arco amarillo se dibuja alrededor de la foto (1,4 s) |
| ~100 ms | El título sube palabra por palabra desde una máscara (40 ms entre palabras) |
| 550 ms | Subtítulo |
| 600 ms | El halo de luz se enciende detrás de la foto |
| 700 ms | Botones |
| 900 ms y más | Las cuatro placas, cada 80 ms |

En las páginas internas, el momento de carga es solo el título, que sube palabra por palabra.

## Scroll

- **Primer desplazamiento:** el arco gira −32° como un dial y el abrazo se hunde (12 % hacia abajo, escala 0,92) mientras el tablero sube encima.
- **Tablero:** cada fila entra girando desde −80° en el eje X, como una paleta de un panel de salidas, con 80 ms entre filas.
- **Fotos:** se abren desde un marco 7 % más estrecho mientras la imagen pasa de escala 1,1 a 1.
- **Parallax:** solo la foto principal de la comunidad se desplaza un 10 % dentro de su marco. No hay parallax en el texto.
- **Cabecera:** se oculta al bajar después de 240 px y reaparece al subir (350 ms).
- **Señal fija:** sube desde abajo al dejar la portada y baja al llegar al pie.

## Texto

- Solo el `h1` de cada página se anima, con palabras que suben desde una máscara.
- Los títulos de sección no se animan: su tamaño y peso ya cuentan.
- Nada de descifrado, máquina de escribir ni desenfoques.

## Hover y foco (un solo vocabulario)

| Elemento | Respuesta |
|---|---|
| Pastilla | La flecha avanza 3 px dentro de su círculo; el fondo se aclara (negro → grafito, amarillo → amarillo claro) |
| Fila del tablero o del directorio | Se enciende en amarillo y la flecha avanza 4 px |
| Foto | La imagen se acerca un 3 % (5 % en la portada) en 1,2 s |
| Enlace de texto | El subrayado amarillo pasa a negro |
| Pregunta frecuente | El «+» se vuelve amarillo; al abrir gira 180° y pasa a «−» |
| Campo de formulario | Borde negro y anillo amarillo claro |

Todo lo que reacciona al hover reacciona igual al foco del teclado.

## Cursor

Hay un solo efecto, en la portada y solo con mouse o trackpad (`hover: hover` y `pointer: fine`):

- las capas se desplazan con el cursor a distinta velocidad: luz al 22 %, foto 10 px en sentido contrario y arco 16 px;
- la abertura de la C gira hasta un 14 % del ángulo hacia el puntero;
- al salir de la portada, todo vuelve al centro en 1 s.

No hay cursor personalizado.

## Transiciones de página

Se usa la View Transitions API entre documentos (`@view-transition { navigation: auto }`):

- la cabecera y la señal fija tienen nombre propio y se quedan quietas;
- la página anterior se va en 200 ms (sube 10 px y se desvanece);
- la nueva entra en 560 ms (sube 18 px).

Los navegadores sin soporte navegan de forma normal.

## Micro-interacciones

- **Menú móvil:** las dos líneas se cruzan en una X (240 ms).
- **Desplegable de programas:** la flecha gira 180°.
- **Envío del formulario:** el círculo de la pastilla late mientras se envía y el mensaje de estado entra subiendo.
- **Preguntas:** apertura con altura animada (`interpolate-size`) donde existe; en el resto se abren al instante.

## Rendimiento

- Sin librerías de animación ni de scroll suave. El scroll suave nativo (`scroll-behavior: smooth`) solo se usa para los anclajes.
- Un solo `requestAnimationFrame` por evento de scroll o cursor, con oyentes `passive`.
- `IntersectionObserver` deja de observar cada elemento después de revelarlo.
- **Verificado:**
  - Lighthouse 99–100 en rendimiento;
  - CLS 0 en las páginas medidas (inicio, Programas, Empresas, Nosotros y Contacto).
