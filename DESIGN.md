---
version: alpha
name: CE — Señal y abrazo (dirección Apple)
description: Sistema visual de la web de la Cámara de Comercio Exterior (CE), dentro del Manual de Identidad de Marca, con la diagramación de apple.com como dirección (bloques de ancho completo que alternan claro y oscuro). Los valores salen de src/styles/global.css; si cambian allí, se actualizan aquí.
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
  tile-light:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.h2}"
    padding: 112px
  tile-soft:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    typography: "{typography.h2}"
    padding: 112px
  tile-dark:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.h2}"
    padding: 112px
  mosaic:
    backgroundColor: "{colors.surface-soft}"
    textColor: "{colors.primary}"
    rounded: "{rounded.lg}"
    padding: 48px 24px 0
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

**Dirección elegida (oct-2026): Apple.** Se toma de apple.com la manera de distribuir el espacio y de armar los componentes, según el análisis «Apple-design-analysis» de la colección VoltAgent/awesome-design-md (licencia MIT). **No** se toman sus colores (azul), sus tipografías (SF Pro) ni nada de su marca: colores, letras, logo y pastillas son los de la CE. Hay un solo estilo por proyecto; no se mezcla con otro DESIGN.md.

Este archivo traduce el Manual de Identidad de Marca de la CE (skill `brand-guidelines`) y los tokens de `src/styles/global.css` al formato DESIGN.md, para que cualquier agente diseñe con el mismo sistema. **Si algo de aquí choca con el manual de marca, manda el manual.** La dirección creativa completa está en `docs/direccion-creativa.md` y el movimiento, en `docs/sistema-movimiento.md`.

## Overview

Educación continua con aire de institución seria y moderna: blanco y negro de alto contraste, con el amarillo de la CE como **señal**, es decir, como el color que indica dónde actuar. Mucho aire, titulares grandes y compactos en Montserrat y texto corrido sobrio en Inter Tight. El gesto propio de la marca es **el abrazo**: el arco de la «C» del isologo, que aparece dibujado en la portada y orienta la mirada. La interfaz no imita a otras marcas; se parece a una señalética clara, no a una plantilla.

Como en apple.com, cada página es una pila de **bloques de ancho completo** que alternan blanco, bruma (`surface-soft`) y negro. El cambio de color es el separador: no hay líneas ni sombras entre secciones. Cada bloque se abre con un **titular centrado**, un lema de una línea y, como máximo, dos acciones (una pastilla y un enlace «más ›»). El producto, es decir, las portadas oficiales de los cursos y las fotos, es lo que se luce; la interfaz se retira. Se diseña primero para celular.

Ritmo del inicio: portada negra con escaparate de portadas → servicios en blanco (mosaicos) → programas destacados en bruma (vitrinas) → razones en negro → preguntas en blanco → contacto en bruma → pie negro con el arco.

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
- Bloques con un relleno vertical de 64 a 112 px y sin espacio entre ellos (`.bloque`, `.bloque--bruma`, `.bloque--oscuro`).
- Cabecera de bloque centrada (`.bloque__cabecera`), de 46 rem como máximo; las columnas de lectura (preguntas frecuentes) miden 980 px como máximo.
- Escala de espaciado de 4 a 112 px (tokens `--s-1` a `--s-9`). No se inventan valores intermedios.
- Una sola acción principal por vista; lo secundario va como enlace de texto o como botón oscuro.
- Las filas horizontales de tarjetas usan `scroll-snap` y no deben provocar desplazamiento horizontal de la página.

## Elevation & Depth

Plano, como en Apple. La profundidad sale del cambio de color entre bloques, no de sombras.
- Los mosaicos no llevan borde: son bruma sobre blanco.
- Las tarjetas blancas sobre bruma llevan un filete de 1 px `rgba(0,0,0,.08)`.
- **Hay una sola sombra en todo el sistema**, `3px 5px 30px rgba(0,0,0,.22)`, y solo la llevan las portadas de cursos del escaparate (el «producto»). Nunca va en tarjetas, botones ni textos.
- Al pasar el cursor, la imagen de un mosaico o vitrina se acerca un 3 %. Al presionar, los botones se encogen (`scale(0.97)`).
- Nada de neumorfismo ni de vidrio esmerilado.

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
- **Enlace «más ›»:** la acción secundaria, sin caja ni subrayado. Va en Montserrat 700 con un « › » que avanza 3 px; al pasar el cursor aparece un subrayado amarillo. Ocupa 44 px de alto como mínimo.
- **Portada (bloque oscuro):** rótulo «Educación continua», titular centrado, lema, un botón amarillo y un enlace «más ›». Debajo va el escaparate: tres portadas en escritorio y una en celular, con la sombra del sistema. El arco del abrazo va detrás.
- **Mosaico de servicio:** fondo bruma y radio lg, con titular centrado, lema, enlace «más ›» y, abajo, la imagen apoyada en el borde inferior.
- **Vitrina de programa:** tarjeta blanca con filete, portada 16:9, nombre, dato, precio por país y «Ver programa ›». En celular forman una fila con desplazamiento lateral; en escritorio caben las cinco.
- **Razones (bloque oscuro):** sin cajas. Llevan ícono en círculo amarillo, título blanco y texto #D9D9D9, centrados.
- **Placa:** rótulo amarillo en minúsculas de frase, que orienta pero no se pone sobre cada título.
- **Íconos:** de trazo SVG, nunca emojis.
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
- **Sí:** alternar bloques claro, bruma y oscuro antes de agregar adornos; cuando dudes, cambia el fondo del bloque.
- **No:** usar el azul, las tipografías SF Pro ni los textos de Apple; de Apple solo se toma la diagramación.
- **No:** poner sombras en tarjetas o botones; la única sombra es la de las portadas.
- **Sí:** contraste AA (4.5:1) en todo texto; foco visible negro sobre claro y amarillo sobre oscuro.
- **Sí:** usar el logo oficial de `public/brand/` tal cual.
- **No:** redibujar, recolorear ni generar el logo de la CE.
- **No:** copiar logos, textos ni imágenes de los sitios que sirvan de referencia (por ejemplo, estilos de Refero o getdesign.md); se usan solo como dirección visual.
- **No:** mezclar este sistema con otro DESIGN.md. Hay un estilo por proyecto.
- **No:** inventar precios, cifras, testimonios ni docentes para «rellenar» un diseño (ver `docs/pendientes.md`).
- **No:** escribir «CCE»; la sigla es «CE».
