# Plan de diseño — Web Cámara de Comercio Exterior (CE)

Skills aplicados: `brand-guidelines` (reglas obligatorias del manual) y `frontend-design` (proceso: plan → revisión contra el brief → construcción → crítica con capturas).

## 1. Sujeto, público y trabajo principal

- **Sujeto**: centro de capacitación profesional con oferta en comercio exterior y en herramientas digitales para empresas (Excel, Power BI, Python, IA, etc.). Visión del manual: "Centro de Capacitación Profesional Internacional", "desafiando el sistema educativo".
- **Públicos**: profesionales y dueños de pymes que quieren capacitarse; empresas que buscan capacitar a sus equipos; estudiantes y egresados.
- **Trabajo principal de la web**: que la persona encuentre su programa y deje sus datos o escriba por un canal oficial. Además, que transmita prestigio institucional.

## 2. Referencia Melius: qué se pudo verificar

`melius.com` **no se pudo inspeccionar**: el entorno bloquea la conexión (proxy 403 y DNS sin resolver desde las herramientas web). La búsqueda web solo confirma que Melius es un producto creativo con IA y que su sitio lo hizo el estudio View Source. No se verificó ninguna característica visual concreta de esa web, así que **no se replica nada específico**.

En su lugar, se toman como referencia los criterios generales del pedido, que están descritos en el propio brief: composición editorial, espacio en blanco generoso, tipografía protagonista, movimiento escaso y deliberado, y acabado cuidado en los componentes. **Pendiente**: revisar Melius en un navegador con acceso y ajustar la dirección si el equipo lo considera necesario.

## 3. Tokens

**Color.** Todo viene del manual; no hay colores ajenos a la marca.

| Nombre | Hex | Uso |
|---|---|---|
| Amarillo CE | `#ffc300` | Acento único: el arco, los resaltados y el botón secundario |
| Negro | `#000000` | Texto, superficies de contraste y CTA principal |
| Blanco | `#ffffff` | Fondo base |
| Amarillo 30 | `#fff0bf` | Fondos suaves de sección y foco |
| Gris oscuro | `#404040` | Texto secundario |
| Gris claro | `#bfbfbf` | Filetes y bordes |

Las paletas por curso del manual se usan como **código de área** en el catálogo: Excel en verde, Python en azul, etc. Es un recurso oficial que además ayuda a orientarse.

**Tipografía.** Montserrat variable, alojada en el propio sitio. Es la sustituta digital que prevé el manual; Coolvetica y Gotham requieren licencia. Para que el texto se lea como editorial y no como plantilla:
- titulares en peso 800–900, con tracking negativo y tamaños grandes (clamp hasta ~6.5rem);
- cuerpo en peso 400, a 1.0625rem y con interlineado de 1.6;
- el estilo de encabezado espaciado del manual se usa solo en la navegación del pie y en los datos de programa, no encima de cada sección.

**Layout.** Retícula de 12 columnas, margen lateral de 16–40px y contenedor de 1280px. Texto alineado a la izquierda (lectura y aspecto institucional), salvo en el bloque de cierre.

## 4. El elemento memorable: la "C" envolvente

El isologo es una "C" que "simboliza protección, conexión y unidad" (manual 1.5), y las piezas oficiales la convierten en el **arco amarillo**. En la web ese arco es el único gesto audaz:

- **Hero:** un arco amarillo de trazo grueso, recortado por el borde derecho, envuelve el titular. Al cargar la página se dibuja una sola vez (animación de trazo de ~1,2 s) y luego queda quieto. Con `prefers-reduced-motion` aparece ya dibujado.
- **Resto de la web:** el arco reaparece una sola vez más, en el bloque de cierre, como eco. No se usa como adorno repetido.
- **Todo lo demás es sobrio:** blanco, negro, mucho aire y sin degradados ni sombras genéricas.

```
┌──────────────────────────────────────────────────────────────┐
│ [logo]          Programas  Empresas  Nosotros  Contacto  [CTA]│
│                                                         ╭────│
│  Titular grande en negro,                             ╭─╯    │
│  dos o tres líneas                                   │  arco  │
│  Subtítulo de propuesta de valor (≤ 2 líneas)        │ amarillo
│  [Ver programas ●]  [Hablar con un asesor]           ╰─╮    │
│                                                         ╰────│
│  Áreas: Comercio exterior · Datos · Programación · …         │
└──────────────────────────────────────────────────────────────┘
```

## 5. Arquitectura de información

La versión final se ajusta al contenido real que se encuentre (`docs/contenido-oficial.md`):

- `/` Inicio: hero, áreas de formación, cómo se estudia (modalidad), programas destacados, empresas, cierre con contacto.
- `/programas` Catálogo con filtro por área. Solo programas documentados.
- `/empresas` Capacitación para equipos, solo si la oferta está documentada.
- `/nosotros` Misión, visión y valores (del manual) y uso de la sigla CE.
- `/contacto` Formulario y canales oficiales verificados.
- 404, `sitemap.xml`, `robots.txt`.

## 6. Revisión del plan contra el brief y los defaults

- *Fondo crema con serif y acento terracota*: descartado. La marca es blanco, negro y amarillo.
- *Fondo casi negro con un acento neón*: descartado como base. Se usa negro puro solo en el bloque "Empresas" para dar contraste de ritmo, con el amarillo de marca y no con verde ácido.
- *Kit de tarjetas SaaS*: el catálogo usa una **lista editorial**, con filas, filete y un punto de color de área, en lugar de tarjetas idénticas con sombra. Solo los programas destacados del inicio llevan un tratamiento de bloque, con jerarquía distinta.
- *Eyebrows en mayúsculas sobre cada título y "→" en los botones*: se evitan. La pastilla negra con círculo amarillo y flecha del manual se usa solo en el CTA principal, porque es un patrón oficial de marca.
- *Numeración 01/02/03*: solo donde hay una secuencia real (pasos para inscribirse).

**Cambio respecto a la primera idea:** el plan inicial era un hero oscuro con el logo dorado brillando. Se cambió a un hero blanco porque la idea original caía en el default nº 2 y porque las piezas oficiales del manual son mayoritariamente blancas con arco amarillo.
