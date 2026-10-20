# Experiencia del sitio — mapa UX

Cómo se recorre el sitio de la Cámara de Comercio Exterior (CE) y por qué cada parte está donde está. Complementa:

- `direccion-creativa.md`: la identidad;
- `sistema-movimiento.md`: el movimiento.

## Estructura vigente del inicio (oct-2026)

A pedido de la CE, el inicio sigue la estructura de la página de Platzi, con los colores y el logo de la marca y sin precios, testimonios ni cifras que no estén confirmados:

1. Cabecera oscura: logo, «Explorar» (áreas y programas), buscador «¿Qué quieres aprender?», enlaces y «Hablar con un asesor».
2. Portada centrada: lema «Aprende, certifícate y avanza.» con la palabra clave en amarillo, dos botones y portadas de cursos flotando en las esquinas.
3. «Creamos momentos que impulsan carreras»: carrusel de momentos reales de eventos. Ocupa el lugar de los testimonios hasta que haya testimonios autorizados.
4. «Aprende haciendo»: placas de color, una ventana de clase en vivo y el texto.
5. «Elige qué aprender hoy»: carrusel de áreas con ilustraciones geométricas de color.
6. Programas con temario completo y cursos con pestañas por área, en carruseles con portadas.
7. «Por eso te guardamos un lugar»: tarjetas inclinadas con fotos y metas flotantes.
8. «Elige cómo empezar»: para ti o para tu empresa. Reemplaza la tabla de planes, porque la inversión la confirma un asesor.
9. Preguntas frecuentes y pie.

Las secciones de abajo describen el diseño anterior y siguen siendo válidas para las páginas internas.

## Para quién y para qué

- **Visitante principal:** profesionales y estudiantes de Perú y Latinoamérica que quieren mejorar su perfil en comercio exterior, datos o IA. Llegan casi siempre desde el celular, por anuncios o redes, con una pregunta concreta: ¿qué aprendo, cómo es y cuánto cuesta?
- **Visitante secundario:** responsables de empresas que buscan capacitar a un equipo.
- **Objetivo del sitio:** que la persona elija un programa y hable con un asesor (WhatsApp o formulario). Los precios y las fechas los da el asesor, así que la conversación es la conversión.

## Navegación

| Elemento | Decisión |
|---|---|
| Cabecera | Logo a la izquierda. A la derecha van Programas (con desplegable de los 5 programas con temario), Empresas, Nosotros, Contacto y la pastilla negra «Hablar con un asesor». La página actual se marca con una placa amarilla bajo el texto. |
| Al desplazarse | La cabecera toma un fondo blanco translúcido. Se oculta al bajar y vuelve al subir, para no restar pantalla al contenido. Nunca se oculta con un menú abierto ni al recibir foco con el teclado. |
| Móvil (≤ 1000 px) | Botón circular de menú. Abre un panel con enlaces grandes en Montserrat 800, la lista de programas y el CTA a WhatsApp. Se cierra con Escape y bloquea el desplazamiento de fondo. |
| Señal fija | Pastilla «Hablar con un asesor» abajo a la derecha. Aparece al pasar el 70 % de la primera pantalla y se oculta cuando el pie está a la vista, porque el pie ya tiene su propia llamada. |
| Pie | Llamada final, enlaces de navegación y programas, canal de atención, legal y «Volver arriba». |

## Recorrido de la portada

Cada sección responde una pregunta y deja la siguiente planteada.

### 1. Portada — «El abrazo»

- **Propósito:** decir en tres segundos qué es la CE y qué gana la persona.
- **Jerarquía:**
  1. el lema oficial «Aprende, certifícate y avanza.»;
  2. la foto de la comunidad abrazada por la C;
  3. el subtítulo con qué se aprende (comercio exterior, datos e IA) y cómo (en vivo, con proyecto y certificado);
  4. dos CTAs;
  5. cuatro placas de beneficios.
- **Composición:** dos columnas en escritorio, con el texto a la izquierda (lectura primero) y el abrazo a la derecha. En móvil el texto va arriba para que el CTA quede en la primera pantalla, y el abrazo debajo.
- **Interacciones:** con mouse, las capas se mueven con el cursor (luz, foto y arco a distinta velocidad) y la abertura de la C se orienta hacia el puntero. Al pasar sobre la foto, la imagen se acerca un poco.
- **Transición:** al bajar, el arco gira como un dial y el abrazo se hunde mientras el tablero negro, de esquinas suaves, sube encima como un capítulo nuevo.

### 2. Programas — el tablero

- **Propósito:** responder «¿qué puedo estudiar?» y llevar al temario.
- **Jerarquía:** título («Elige tu próximo destino profesional.»), entradilla y luego el tablero con Programa, Área, Duración y Modalidad. El nombre del programa domina; los datos van en gris claro.
- **Composición:** un capítulo negro a todo el ancho. En móvil, cada fila se vuelve una ficha con rótulos visibles.
- **Interacciones:** las filas entran girando como paletas de un panel de salidas. Al pasar el cursor o el foco, la fila elegida se enciende en amarillo y la flecha avanza. Toda la fila es un enlace.
- **Transición:** el pie del tablero ofrece el catálogo completo (19 programas y cursos) para quien no encontró su destino. El fondo vuelve a blanco y aparece la comunidad.

### 3. Comunidad — prueba social

- **Propósito:** demostrar que detrás hay personas reales e institución: eventos, auditorios llenos, alianzas en campus y campañas en la calle.
- **Jerarquía:** frase institucional «Conectamos talento, impulsamos desarrollo.» y un mosaico de seis fotos propias.
- **Interacciones:** las fotos se abren desde un marco más estrecho al llegar a ellas, la principal tiene un parallax leve dentro de su marco y al pasar el cursor cada foto se acerca.
- **Pendiente** (`pendientes.md`):
  - testimonios reales con autorización;
  - cifras verificadas de egresados;
  - logos de empresas aliadas con permiso.

  Cuando existan, van aquí como una fila de citas bajo el mosaico. No se inventan.
- **Transición:** el fondo pasa a bruma (gris muy claro), lo que marca un cambio de tono hacia la orientación práctica.

### 4. Áreas — el directorio

- **Propósito:** dar una puerta de entrada a quien piensa por tema («quiero algo de datos»).
- **Composición:** el título a la izquierda y, a la derecha, seis filas tipo letrero de terminal, con un punto de color del área, el nombre, la cantidad de programas y la flecha.
- **Interacciones:** la fila se enciende en amarillo y lleva al catálogo ya filtrado (`/programas?area=…`).
- **Transición:** vuelve el blanco para explicar el proceso.

### 5. Inscripción — tres pasos

- **Propósito:** quitar la incertidumbre de «¿y ahora qué hago?».
- **Composición:** tres columnas numeradas (es una secuencia real), con el número en un círculo amarillo, un filete negro arriba y texto breve.
- **Transición:** el último paso habla de matricularse, así que lo siguiente es la banda para empresas o las dudas.

### 6. Empresas — banda amarilla

- **Propósito:** capturar al segundo público sin desviar al primero.
- **Composición:** un capítulo amarillo con esquinas suaves. Lleva el título a la izquierda y, a la derecha, el texto, la pastilla negra a `/empresas` y la secundaria a WhatsApp.

### 7. Preguntas frecuentes

- **Propósito:** resolver las objeciones que frenan la inscripción: clases en vivo, certificado, cómo inscribirse, precios, estudiar desde el extranjero y empresas.
- **Composición:** el título a la izquierda y el acordeón a la derecha. Solo hay una pregunta abierta a la vez (`<details name>`).
- **Interacciones:** el «+» gira y se vuelve amarillo, y la respuesta se despliega con altura animada donde el navegador lo permite.
- **Transición:** al terminar las dudas, el pie negro hace la última invitación.

### 8. Pie — la llamada final

- **Propósito:** cerrar con una sola acción: «Tu siguiente paso empieza con una conversación.» y la pastilla amarilla a WhatsApp, abrazada por el arco que entra desde la derecha.
- **Resto:** navegación, programas, atención, legal y volver arriba.

## Páginas internas

| Página | Propósito | CTA principal |
|---|---|---|
| `/programas` | Catálogo filtrable por área (19 programas y cursos) | «Ver temario» o «Consultar» por fila |
| `/programas/[slug]` | Ficha completa: datos clave, estructura, qué incluye, certificación y para quién es | «Consultar horarios e inversión» (WhatsApp) y «Dejar mis datos» (formulario) |
| `/empresas` | Capacitación corporativa | Formulario de empresa |
| `/nosotros` | Visión, valores y significado de la C | Ver programas |
| `/contacto` | Formulario y WhatsApp directo | Enviar el formulario |

## Formularios

- **Campos mínimos:** nombre, correo, celular, país e interés. El mensaje es opcional.
- Cada campo tiene su etiqueta visible siempre (no se usa el placeholder como etiqueta) y la ayuda va bajo el campo.
- **Validación:** al enviar y al corregir. El error se muestra junto al campo, se describe con `aria-describedby` y el foco va al primer error.
- **Estados:** enviando (el círculo de la pastilla late y el botón queda ocupado); enviado (mensaje amarillo que dice qué pasará después); error (mensaje con alternativa por WhatsApp).
- **Antispam:** campo trampa invisible. Sin servicio de envío configurado, el formulario abre WhatsApp con el mensaje armado (`.env.example`).

## Experiencia móvil

- Primero móvil: el CTA de la portada queda en la primera pantalla de un teléfono de 390 × 844.
- Objetivos táctiles de 44 px o más; las pastillas ocupan el ancho completo en pantallas pequeñas.
- El tablero se vuelve fichas, y el mosaico pasa a dos columnas con las fotos principales a ancho completo.
- La señal fija es compacta para no tapar contenido.
- El arco del pie se convierte en una «C» pequeña sobre la frase.
- Sin desplazamiento horizontal: se verifica en cada página con `tests/e2e.cjs` y en las capturas.

## Accesibilidad

- Un `h1` por página y títulos en orden.
- Enlace «Saltar al contenido» y foco visible (negro, o amarillo sobre oscuro).
- Contrastes AA. El amarillo se usa como fondo con texto negro y nunca como texto sobre blanco.
- Todo el movimiento se apaga con «reducir movimiento».
- Las fotos tienen textos alternativos descriptivos; los adornos llevan `aria-hidden`.
