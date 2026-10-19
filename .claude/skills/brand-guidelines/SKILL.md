---
name: brand-guidelines
description: Aplica la identidad visual oficial de la Cámara de Comercio Exterior (CE) — logo (isologo e imagotipo dorados), colores institucionales amarillo #ffc300 / negro / blanco, paletas por curso, tipografías, pastillas, diagramación de posts y ads — a cualquier pieza: posts e historias de Instagram, ads de Facebook, banners web, landings, mailings, presentaciones, documentos, certificados, papelería o miniaturas de cursos. Úsalo siempre que el usuario pida algo "con nuestra marca", "con el logo", "institucional", "para la Cámara/CE", para redes de la Cámara o para un curso (Excel, Python, Power BI, IA, Marketing, etc.), aunque no mencione el manual; combínalo con frontend-design, canvas-design o pptx/docx cuando se trate de esas piezas.
---

# Identidad de marca — Cámara de Comercio Exterior (CE)

Fuente: *Manual de Identidad de Marca (actualizado)*. Su objetivo es que todo lo que salga a nombre de la institución se vea **claro, profesional, coherente y confiable**. Visión de la marca: ser reconocida como un **"Centro de Capacitación Profesional Internacional"**. Valores: transparencia, respeto y honestidad.

Este skill fija las reglas de marca. El oficio de diseño (composición, jerarquía, revisión visual) viene de `frontend-design` / `canvas-design`. La creatividad va **dentro** de estas reglas, no contra ellas.

## Nombre y sigla

- Nombre: **Cámara de Comercio Exterior**. Sigla oficial: **CE**. Nunca "CCE" (uso informal antiguo que el manual pide erradicar).

## Logo

Hay dos versiones oficiales, y ambas son un solo elemento indivisible:
- **Isologo**: la "C" envolvente dorada con "CE" dentro.
- **Imagotipo**: isologo + "CÁMARA DE / COMERCIO / EXTERIOR". El símbolo y el texto nunca se separan.

Archivos listos en `assets/logos/` (SVG vectorial y PNG transparente de 1200 px):

| Archivo | Cuándo |
|---|---|
| `imagotipo-negro` | Dorado + texto negro, sobre blanco o claro (versión principal en fondos claros) |
| `imagotipo-blanco` | Dorado + texto blanco, sobre negro, gris oscuro #404040 o fotos oscuras |
| `isologo-color` | Solo el símbolo dorado, sobre negro, blanco o gris (perfiles, sellos, espacios pequeños) |
| `imagotipo-mono-negro` / `isologo-mono-negro` | Todo negro: sobre amarillo #ffc300, o impresión a 1 tinta |
| `imagotipo-mono-blanco` / `isologo-mono-blanco` | Todo blanco: sobre fondos oscuros o de color de curso donde el dorado no contrasta |

Reglas (manual 1.6–1.7, 4.1–4.3):
- **Usa siempre los archivos**. Nunca redibujes el logo con texto o CSS, ni lo recrees con IA.
- **Área de protección**: deja libre alrededor un margen ≥ 35% de la altura de la "C" envolvente.
- **Tamaño mínimo**: imagotipo 100×65 px en digital (cómodo: 152×100 o 184×120) y 30×20 mm en impresión.
- **Prohibido**: estirar o deformar, rotar, cambiar los colores del logo (p. ej. verde lima), taparlo u ocultarlo parcialmente, y ponerlo sobre fondos de color no corporativos (p. ej. azul petróleo) sin usar la versión mono blanca.
- Fondos permitidos: negro, blanco, gris y amarillo (este último con la versión negra).

## Color

Los tokens están en `assets/marca.css`.

- **Institucionales**: amarillo `#ffc300`, negro `#000000`, blanco `#ffffff`. El amarillo es el acento de marca; negro y blanco son la base.
- **Secundarios claros**: `#ffd240`, `#ffe180`, `#fff0bf`. **Secundarios oscuros**: `#404040`, `#808080`, `#bfbfbf`.
- **Dorado del logo** (solo de referencia, para detalles finos como filetes o íconos): `#ac581c` → `#c89a31` → `#d8c362`. No reemplaza al amarillo institucional.
- **Paletas por curso** (Python azul, Excel verde, IA azul marino, Marketing morado, Ofimática naranja, SQL verde lima, Diseño rosa, Inglés rojo, Power BI amarillo): están en `references/paletas-cursos.md`. Léelo cuando la pieza sea de un curso concreto.

## Tipografía

| Rol | Oficial (manual) | En piezas digitales / HTML |
|---|---|---|
| Títulos | Coolvetica Regular, o Gotham (Bold/Black) como complementaria o reemplazo | **Montserrat 800–900**: es la que usan las piezas reales del manual |
| Subtítulos y cuerpo | Helvetica Regular | Helvetica Neue / Helvetica; en web, Montserrat 400 |
| Videos y comunicación interna/externa | Montserrat Light, Regular, Bold, Black | Montserrat |

Coolvetica y Gotham son fuentes con licencia comercial y no están en Google Fonts. Si el usuario tiene los archivos (.otf/.ttf), úsalos con `@font-face` o instálalos. Si no, Montserrat es la sustituta correcta y ya está prevista en `marca.css`. En PowerPoint o Word, usa Montserrat para títulos y Helvetica o Arial para texto.

## Sistema gráfico de las piezas (manual 5–7)

Mira `references/ejemplos/` para ver el estilo real antes de diseñar una pieza de redes. Elementos del sistema (clases listas en `marca.css`):

- **Encabezado** (`.ce-encabezado`): mayúsculas, Light, muy espaciado, con palabras clave en negrita. Ej.: "CURSO ACCESIBLE **24/7**", "**100% VIRTUAL** Y SIN HORARIOS".
- **Título** (`.ce-titulo`): Montserrat Black, en 1 o 2 líneas, interlineado apretado. Variante editorial (`.ce-titulo-ligero`): ligero con la palabra clave en negrita ("Creemos en las **personas**").
- **Resaltado amarillo** (`.ce-resalte`) detrás de palabras clave: "**Construimos el futuro** desde hoy".
- **Texto de apoyo** (`.ce-apoyo`): 1–2 líneas.
- **Pastillas** (`.ce-pastilla`):
  - 1 negra con texto blanco, que es el CTA principal ("Inscríbete hoy", "Conoce más");
  - 2 amarilla con texto negro;
  - 3 solo texto o con contorno.
  - En el feed, la pastilla negra puede llevar al final un círculo amarillo con flecha (`.ce-flecha`).
- **Franja** (`.ce-franja`): banda amarilla con texto espaciado ("Desde cualquier lugar. Aprende a tu ritmo").
- **Pie** (`.ce-pie`): barra negra inferior con texto blanco espaciado (opcional).
- **Arco amarillo**: semicírculo de trazo grueso que entra desde abajo y abraza el contenido. Es el recurso distintivo de las piezas institucionales (SVG en la plantilla).
- **Fotografía**: personas reales (alumnos y docentes) recortadas sobre fondo blanco o claro, con actitud positiva. En las piezas de curso se usan renders o íconos de la herramienta. No uses logos de terceros que no aporte el usuario.

**Diagramación de ads y posts**: encabezado arriba, título centrado (o alineado a la izquierda en la variante de 2 columnas), apoyo, pastilla en el tercio inferior, logo abajo (a la izquierda o derecha, con un separador vertical y un texto corto como "posición de curso"), pie opcional. Fondo blanco por defecto. En las piezas de curso, el fondo puede ser una foto o el color del curso. Parte de `assets/plantilla-post.html` (1080×1080, ya diagramada) y adáptala.

**Formatos** (manual 7):
- feed: 1080×1080 o 1080×1350;
- historias: 1080×1920;
- banner web: 1920×1080;
- miniatura de curso: 309×174 px;
- entrega web en JPG o PNG optimizado.

Para otras medidas, el manual remite al área de Diseño y Marca.

**Buenas prácticas** (manual 8): evitar la saturación visual, CTAs claros y visibles, coherencia entre formatos y pensar primero en móvil.

## Flujo de trabajo

1. Identifica el tipo de pieza y si es institucional o de un curso (y de cuál, para la paleta).
2. Copia `assets/marca.css` y los logos que necesites junto a tu archivo, o parte de `assets/plantilla-post.html`.
3. Diseña con el skill de la pieza (frontend-design, canvas-design, pptx…) respetando lo de arriba.
4. Para entregar un solo archivo HTML, incrusta CSS y logos con `python3 <ruta-del-skill>/scripts/incrustar.py pieza.html final.html`.
5. **Renderiza y revisa** la pieza (p. ej. con el `render.cjs` de canvas-design). Lista de control:
   - el logo es un archivo oficial, sin deformar, con área de protección y en la versión correcta para el fondo;
   - los colores son institucionales o del curso;
   - dice "CE" y no "CCE";
   - el texto se lee en un celular;
   - hay un solo CTA claro.
6. Si inventaste datos (fechas, precios, docentes, web), señálalos al entregar para que el usuario los confirme.
