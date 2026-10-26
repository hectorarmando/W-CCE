---
version: alpha
name: CE — Negro y dorado
description: Sistema visual de la web de la Cámara de Comercio Exterior (CE) desde oct-2026, tomado del prototipo HTML del usuario («Educación continua…»). Fondo negro, dorado como acento, títulos con serifa. Los valores salen de src/styles/global.css (bloque «TEMA NEGRO Y DORADO»).
colors:
  primary: "#C9A24B"
  on-primary: "#0A0A0A"
  primary-light: "#E8CF8F"
  background: "#0A0A0A"
  surface: "#121212"
  card: "#161616"
  line: "#2C2518"
  ink: "#F4EFE3"
  muted: "#A79F8C"
typography:
  display:
    fontFamily: Cormorant Garamond
    fontSize: 5.2rem
    fontWeight: 600
    lineHeight: 1.1
  h1:
    fontFamily: Cormorant Garamond
    fontSize: 4rem
    fontWeight: 600
    lineHeight: 1.1
  h2:
    fontFamily: Cormorant Garamond
    fontSize: 3rem
    fontWeight: 600
    lineHeight: 1.1
  h3:
    fontFamily: Cormorant Garamond
    fontSize: 1.5rem
    fontWeight: 600
    lineHeight: 1.15
  body-md:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: 300
    lineHeight: 1.7
  eyebrow:
    fontFamily: Inter
    fontSize: 0.72rem
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: 0.28em
  label:
    fontFamily: Inter
    fontSize: 0.78rem
    fontWeight: 500
    lineHeight: 1
    letterSpacing: 0.16em
rounded:
  none: 0px
spacing:
  "1": 4px
  "2": 8px
  "3": 14px
  "4": 18px
  "5": 22px
  "6": 28px
  "7": 46px
  "8": 70px
  "9": 90px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 48px
    padding: 0 30px
  button-outline:
    backgroundColor: "{colors.background}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    rounded: "{rounded.none}"
    height: 48px
  card:
    backgroundColor: "{colors.card}"
    textColor: "{colors.ink}"
    rounded: "{rounded.none}"
    padding: 28px 24px
  card-muted:
    backgroundColor: "{colors.card}"
    textColor: "{colors.muted}"
  section-alt:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
  eyebrow:
    backgroundColor: "{colors.background}"
    textColor: "{colors.primary}"
    typography: "{typography.eyebrow}"
  stat-value:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary-light}"
  divider:
    backgroundColor: "{colors.line}"
---

# CE — Negro y dorado

**Decisión del usuario (oct-2026):** la web toma la estructura **y el estilo** de su prototipo HTML («Educación continua con certificación internacional»). Esto reemplaza a la dirección anterior (amarillo #FFC300 y Montserrat). El dorado pasa a ser color de interfaz, aunque el Manual de Identidad lo reservaba para el logo; el usuario lo eligió a sabiendas. Siguen vigentes: el **logo oficial** de `public/brand/` (no se redibuja ni se reemplaza por un monograma), la sigla **«CE»** (el prototipo decía «CCE»), el WhatsApp oficial y las reglas de contenido de `CLAUDE.md`.

## Overview

Institución educativa sobria y premium: fondo casi negro, acentos dorados, títulos con serifa clásica y texto liviano. Mucho aire, filetes finos dorados y esquinas rectas. Una palabra clave del titular en degradado dorado (`.dorado`). Cada sección abre con un **eyebrow** en mayúsculas espaciadas, un titular con serifa y una regla dorada corta.

**Estructura del sitio (del prototipo):**
- **Cabecera:** logo, Inicio · Programas · Nosotros · Blog, selector de país y botón «Matrícula». En celular, menú desplegable.
- **Inicio:** portada con eyebrow, titular, dos botones y una franja de **cifras**; **áreas** numeradas (01–06); bloque **Nosotros** con marco para video; **notas del blog**; **llamada final** al asesor.
- **Nosotros:** encabezado con migas, misión y visión, historia (hitos), países atendidos, valores, liderazgo, aliados y «Somos CE».
- **Programas:** encabezado con buscador y filtro por área, y rejilla de tarjetas.
- **Ficha de programa:** contenido en bloques (qué incluye, a quién va dirigido, temario desplegable, docente, certificación, inversión, preguntas) y **columna lateral fija** con la ficha, la inversión y las acciones.
- **Blog:** nota destacada, filtros por categoría y rejilla de notas.
- **Pie:** una línea con la institución y los 7 países, más los enlaces de servicio.

**Datos sin fuente oficial:** se muestran con la etiqueta `.pendiente` («Dato por confirmar», «En preparación», «Logo pendiente»). Nunca se inventan cifras, nombres, fechas ni premios para rellenar (`docs/pendientes.md`).

## Colors

- **Dorado (#C9A24B):** acentos, filetes activos, eyebrows, botón principal (en degradado #B38A35 → #E8CF8F → #B38A35).
- **Dorado claro (#E8CF8F):** cifras, nombres destacados y enlaces activos.
- **Fondo (#0A0A0A), superficie (#121212) y tarjeta (#161616).** Las secciones alternas usan la superficie con filetes arriba y abajo.
- **Filete (#2C2518):** bordes de tarjetas, separadores y campos.
- **Tinta (#F4EFE3)** para el texto principal y **apagado (#A79F8C)** para el texto de apoyo.

## Typography

- **Cormorant Garamond 600** para titulares, nombres de tarjetas, cifras y preguntas.
- **Inter 300** para el texto corrido (16 px, interlineado 1.7). Inter 500 en mayúsculas espaciadas para eyebrows, botones y etiquetas.
- Las dos fuentes se sirven desde el propio sitio (`@fontsource`), no desde Google Fonts.

## Layout

- Contenedor de 1120 px con márgenes de 22 px. Celular primero; cortes en 820 y 900 px.
- Secciones con 70–90 px de relleno vertical.
- Rejillas automáticas (`auto-fit` / `auto-fill`) con mínimos de 220–290 px y separación de 18–22 px.

## Elevation & Depth

Plano. Profundidad con resplandores radiales dorados muy suaves en portadas y encabezados, y con el borde que se vuelve dorado al pasar el cursor (la tarjeta sube 3 px).

## Shapes

Esquinas **rectas** en todo: botones, tarjetas, campos y marcos. Los únicos círculos son los anillos decorativos de la portada.

## Components

- **Botón:** rectángulo con borde dorado y texto en mayúsculas espaciadas; la variante llena lleva el degradado dorado y texto negro.
- **Eyebrow + regla:** etiqueta dorada en mayúsculas y una línea de 56 px que se desvanece.
- **Tarjeta:** fondo #161616 y filete #2C2518; al pasar el cursor, el borde se vuelve dorado.
- **Cifras:** franja de celdas separadas por filetes, con el valor con serifa en dorado claro.
- **Marco:** caja 4:5 con borde dorado y un filete interior, para video o foto institucional.
- **Columna lateral de la ficha:** fija al desplazarse, con borde dorado.
- **Pendiente:** etiqueta con borde punteado dorado para lo que falta confirmar.

## Do's and Don'ts

- **Sí:** usar los tokens de este archivo; si falta algo, decidir en el mismo espíritu y avisar.
- **Sí:** marcar con `.pendiente` lo que no tiene fuente oficial.
- **Sí:** contraste AA en todo texto y foco visible (dorado claro).
- **No:** reemplazar el logo oficial por un monograma ni escribir «CCE».
- **No:** inventar cifras («+80 mil»), premios, líderes, aliados o notas.
- **No:** usar «sello oficial», «certificado oficial», «validez oficial» ni «certificación internacional» mientras la opinión legal siga pendiente.
