---
version: alpha
name: CE — Señal y abrazo
description: Sistema visual de la web de la Cámara de Comercio Exterior (CE), dentro del Manual de Identidad de Marca. Los valores salen de src/styles/global.css; si cambian allí, se actualizan aquí.
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  accent: "#FFC300"
  on-accent: "#000000"
  accent-hover: "#FFD240"
  primary-hover: "#262626"
  surface: "#FFFFFF"
  surface-soft: "#F2F2F2"
  surface-card: "#FAFAFA"
  line: "#E6E6E6"
  text-secondary: "#404040"
  text-on-dark-secondary: "#D9D9D9"
  accent-60: "#FFE180"
  accent-30: "#FFF0BF"
typography:
  display:
    fontFamily: Montserrat
    fontSize: 6.2rem
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: -0.05em
  h1:
    fontFamily: Montserrat
    fontSize: 5.5rem
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: -0.045em
  h2:
    fontFamily: Montserrat
    fontSize: 4.25rem
    fontWeight: 800
    lineHeight: 1.02
    letterSpacing: -0.04em
  h3:
    fontFamily: Montserrat
    fontSize: 1.25rem
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -0.025em
  body-lg:
    fontFamily: Inter Tight
    fontSize: 1.25rem
    fontWeight: 400
    lineHeight: 1.5
  body-md:
    fontFamily: Inter Tight
    fontSize: 1.0625rem
    fontWeight: 400
    lineHeight: 1.55
  body-sm:
    fontFamily: Inter Tight
    fontSize: 0.9375rem
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: Montserrat
    fontSize: 0.9375rem
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: -0.01em
  caption:
    fontFamily: Inter Tight
    fontSize: 0.8125rem
    fontWeight: 500
    lineHeight: 1.4
rounded:
  sm: 6px
  lg: 24px
  full: 999px
spacing:
  "1": 4px
  "2": 8px
  "3": 12px
  "4": 16px
  "5": 24px
  "6": 32px
  "7": 48px
  "8": 72px
  "9": 112px
components:
  button-primary:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 0 24px
  button-primary-hover:
    backgroundColor: "{colors.accent-hover}"
    textColor: "{colors.on-accent}"
  button-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.label}"
    rounded: "{rounded.full}"
    height: 52px
    padding: 0 24px
  button-dark-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.on-primary}"
  button-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.full}"
    height: 52px
  label-plate:
    backgroundColor: "{colors.accent}"
    textColor: "{colors.on-accent}"
    typography: "{typography.caption}"
    rounded: "{rounded.sm}"
    padding: 5px 10px
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-soft:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-text-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
  section-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
  section-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  section-dark-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-dark-secondary}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    rounded: "{rounded.sm}"
    height: 50px
  divider:
    backgroundColor: "{colors.line}"
  highlight:
    backgroundColor: "{colors.accent-30}"
    textColor: "{colors.primary}"
  highlight-strong:
    backgroundColor: "{colors.accent-60}"
    textColor: "{colors.primary}"
---

# CE — Señal y abrazo

Este archivo traduce el Manual de Identidad de Marca de la CE (skill `brand-guidelines`) y los tokens de `src/styles/global.css` al formato DESIGN.md, para que cualquier agente diseñe con el mismo sistema. **Si algo de aquí choca con el manual de marca, manda el manual.** La dirección creativa completa está en `docs/direccion-creativa.md` y el movimiento, en `docs/sistema-movimiento.md`.

## Overview

Educación continua con aire de institución seria y moderna: blanco y negro de alto contraste, con el amarillo de la CE como **señal**, es decir, como el color que indica dónde actuar. Mucho aire, titulares grandes y compactos en Montserrat y texto corrido sobrio en Inter Tight. El gesto propio de la marca es **el abrazo**: el arco de la «C» del isologo, que aparece dibujado en la portada y orienta la mirada. La interfaz no imita a otras marcas; se parece a una señalética clara, no a una plantilla.

**Estructura elegida: plataforma de cursos al estilo Platzi** (oct-2026; se probó la dirección «Apple» y se descartó). Cabecera oscura con «Explorar», buscador, selector de país y botón de asesor. El inicio sigue este orden: portada centrada con portadas de cursos flotando, banners de campaña, historias de la comunidad, «Aprende haciendo», áreas, programas con temario completo, cursos con pestañas por área, «Por eso te guardamos un lugar», «Elige cómo empezar» y preguntas frecuentes. Se diseña primero para celular.

## Colors

- **Primary — Tinta (#000000):** titulares, texto principal, botones oscuros, portada y pie.
- **Accent — Señal (#FFC300):** el botón principal de cada vista, la placa de rótulo, el resaltado de una idea clave y el foco sobre fondo oscuro. Siempre con texto negro encima, nunca blanco.
- **Surface — Papel (#FFFFFF)** y **surface-soft — Bruma (#F2F2F2):** fondos de sección. **surface-card (#FAFAFA):** tarjetas que se separan de un fondo blanco.
- **Line (#E6E6E6):** bordes de tarjetas, como anillo de 1 px (`box-shadow: 0 0 0 1px`), no como borde grueso.
- **Text-secondary — Grafito (#404040):** textos de apoyo sobre blanco. Sobre negro, #D9D9D9.
- **Accent-60 y accent-30:** amarillos secundarios del manual, solo para fondos de resalte.
- **Dorado del isologo (#AC581C, #C89A31, #D8C362):** existe solo en el logo oficial. **No es color de interfaz.**

Prohibido: azules, morados o degradados de moda que no estén en el manual; texto gris sobre gris; amarillo para texto sobre blanco (no alcanza contraste).

## Typography

- **Montserrat (variable), 800**, para titulares: interletrado negativo (−0.04 a −0.05 em), interlineado cerrado (0.95–1.02) y `text-wrap: balance`. 700 para subtítulos, botones y rótulos.
- **Inter Tight (variable)**, en el rol de Helvetica del manual, para todo el texto corrido: 17 px de base y 1.55 de interlineado, con `text-wrap: pretty`.
- Los tamaños grandes son fluidos con `clamp()`. Los valores del encabezado YAML son los máximos en escritorio; en celular, `display` baja a 2.6 rem y `h2` a 2.2 rem.
- Máximo dos familias. Nada de cursivas decorativas, todo en mayúsculas ni tipografías de sistema como Arial a la vista.

## Layout

- **Celular primero:** el CSS base es el de 390 px; los cortes son `min-width: 640px` y `1000px`.
- Contenedor de 86 rem como máximo, con márgenes laterales fluidos (16–40 px).
- Secciones con un ritmo vertical de 64 a 120 px (`.seccion`).
- Escala de espaciado de 4 a 112 px (tokens `--s-1` a `--s-9`). No se inventan valores intermedios.
- Una sola acción principal por vista; lo secundario va como enlace de texto o como botón oscuro.
- Las filas horizontales de tarjetas usan `scroll-snap` y no deben provocar desplazamiento horizontal de la página.

## Elevation & Depth

Casi plano. Las tarjetas se separan con un anillo de 1 px en `line`. Al pasar el cursor ganan una sombra suave y difusa (`0 18px 36px -18px rgba(0,0,0,.25)`) y suben 4 px con un resorte de Motion. Solo la portada oscura admite sombras profundas, en las portadas de cursos que flotan. Nada de neumorfismo ni de vidrio esmerilado.

## Shapes

Tres radios según la jerarquía:
- **sm, 6 px:** placas, campos de formulario y elementos pequeños.
- **lg, 24 px:** tarjetas, fotos, paneles y banners.
- **full:** pastillas y botones.

El arco del abrazo es la única forma orgánica, y sale del isologo.

## Components

- **Botón (pastilla del manual 6.1):** cápsula de 52 px de alto en Montserrat 700. La variante con flecha lleva a la derecha un círculo de contraste con una flecha que avanza 3 px al pasar el cursor. Variantes:
  - amarillo: acción principal;
  - negro: acción secundaria fuerte;
  - contorno;
  - bruma.

  El área táctil mínima es de 44 px.
- **Placa:** rótulo amarillo en minúsculas de frase, que orienta pero no se pone sobre cada título.
- **Tarjeta de servicio:** imagen 16:9 arriba, título en Montserrat 800 y texto en grafito. La llamada a la acción lleva un círculo con flecha.
- **Tarjeta de razón:** ícono de trazo SVG (nunca emojis), título y texto, sobre blanco con anillo.
- **Preguntas frecuentes:** `<details>` nativos con un signo + que gira. Se abre una a la vez.
- **Formulario:** etiquetas visibles, error junto al campo, campos de 50 px con borde gris claro de 1.5 px; al enfocar, el borde pasa a negro con un halo amarillo de 3 px (`accent-60`).
- **Precio:** lo pinta `[data-precio]` según el país. Si no hay precio, invita a consultar por WhatsApp; nunca muestra una cifra inventada.
- **Movimiento:** una curva (`cubic-bezier(0.16, 1, 0.3, 1)`) y tres tiempos:
  - 240 ms para acciones;
  - 500 ms para entradas;
  - 1400 ms para momentos.

  No hay animaciones infinitas. Todo respeta `prefers-reduced-motion`.

## Do's and Don'ts

- **Sí:** usar solo los colores, tipografías, radios y espacios de este archivo; si falta algo, decidir en su espíritu y avisar qué se eligió.
- **Sí:** una idea resaltada en amarillo por página, como máximo.
- **Sí:** contraste AA (4.5:1) en todo texto; foco visible negro sobre claro y amarillo sobre oscuro.
- **Sí:** usar el logo oficial de `public/brand/` tal cual.
- **No:** redibujar, recolorear ni generar el logo de la CE.
- **No:** copiar logos, textos ni imágenes de los sitios que sirvan de referencia (por ejemplo, estilos de Refero o getdesign.md); se usan solo como dirección visual.
- **No:** mezclar este sistema con otro DESIGN.md. Hay un estilo por proyecto.
- **No:** inventar precios, cifras, testimonios ni docentes para «rellenar» un diseño (ver `docs/pendientes.md`).
- **No:** escribir «CCE»; la sigla es «CE».
