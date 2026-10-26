---
version: alpha
name: CE — Señal y abrazo, en negro y dorado
description: Sistema visual de la web de la Cámara de Comercio Exterior (CE). Estructura, tipografías y componentes de los skills (estilo Platzi); paleta negro y dorado del prototipo HTML del usuario (oct-2026). Los valores salen de src/styles/global.css; si cambian allí, se actualizan aquí.
colors:
  primary: "#0A0A0A"
  on-primary: "#F4EFE3"
  accent: "#C9A24B"
  on-accent: "#0A0A0A"
  accent-hover: "#E8CF8F"
  primary-hover: "#262626"
  surface: "#0A0A0A"
  surface-soft: "#121212"
  surface-card: "#161616"
  line: "#2C2518"
  text-secondary: "#A79F8C"
  text-on-dark-secondary: "#D9D9D9"
  accent-60: "#E8CF8F"
  accent-30: "#2A2110"
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
    textColor: "{colors.on-primary}"
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
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-soft:
    backgroundColor: "{colors.surface-card}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.lg}"
    padding: 24px
  card-text-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.text-secondary}"
  section-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.on-primary}"
  section-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
  section-dark-secondary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.text-on-dark-secondary}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.sm}"
    height: 50px
  divider:
    backgroundColor: "{colors.line}"
  highlight:
    backgroundColor: "{colors.accent-30}"
    textColor: "{colors.on-primary}"
  highlight-strong:
    backgroundColor: "{colors.accent-60}"
    textColor: "{colors.on-accent}"
---

# CE — Señal y abrazo

Este archivo traduce el Manual de Identidad de Marca de la CE (skill `brand-guidelines`) y los tokens de `src/styles/global.css` al formato DESIGN.md, para que cualquier agente diseñe con el mismo sistema. **Si algo de aquí choca con el manual de marca, manda el manual.** La dirección creativa completa está en `docs/direccion-creativa.md` y el movimiento, en `docs/sistema-movimiento.md`.

## Overview

**Paleta vigente (oct-2026, decisión del usuario):** negro y dorado del prototipo HTML («todo oscuro»). Se mantienen la estructura, las tipografías (Montserrat e Inter Tight), los componentes y los efectos hechos con los skills; solo cambian los colores. En `global.css` los tokens conservan sus nombres: `--amarillo` es el dorado, `--negro` el fondo y `--blanco` el marfil del texto.

Educación continua con aire de institución seria y moderna: negro de alto contraste, con el dorado como **señal**, es decir, como el color que indica dónde actuar. Mucho aire, titulares grandes y compactos en Montserrat y texto corrido sobrio en Inter Tight. El gesto propio de la marca es **el abrazo**: el arco de la «C» del isologo, que aparece dibujado en la portada y orienta la mirada. La interfaz no imita a otras marcas; se parece a una señalética clara, no a una plantilla.

**Estructura elegida: plataforma de cursos al estilo Platzi** (oct-2026; se probó la dirección «Apple» y se descartó). Cabecera oscura con «Explorar», buscador, selector de país y botón de asesor. El inicio sigue este orden: portada centrada con portadas de cursos flotando, banners de campaña, historias de la comunidad, «Aprende haciendo», áreas, programas con temario completo, cursos con pestañas por área, «Por eso te guardamos un lugar», «Elige cómo empezar» y preguntas frecuentes. Se diseña primero para celular.

## Colors

- **Primary — Fondo (#0A0A0A):** fondo de todas las páginas, cabecera, portada y pie.
- **On-primary — Marfil (#F4EFE3):** titulares y texto principal.
- **Accent — Dorado (#C9A24B):** el botón principal de cada vista, la placa de rótulo, el resaltado de una idea clave, el arco del abrazo y los filetes activos. Siempre con texto negro encima.
- **Accent-60 — Dorado claro (#E8CF8F):** estado al pasar el cursor, foco del teclado, precios y enlaces activos.
- **Surface-soft (#121212)** para las secciones alternas y **surface-card (#161616)** para tarjetas, campos y botones secundarios.
- **Line (#2C2518):** filetes y bordes de tarjetas.
- **Text-secondary (#A79F8C):** textos de apoyo.
- Los colores por área y por curso (portadas, ilustraciones de áreas) se mantienen.

Prohibido: volver al amarillo #FFC300 o a fondos blancos; texto dorado sobre dorado; texto apagado sobre tarjeta sin revisar el contraste.

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
