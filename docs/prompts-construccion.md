# Construir el sitio de la CE con Claude, por etapas

Secuencia de prompts para construir, o reconstruir, el sitio de la Cámara de Comercio Exterior sin escribir código a mano. Cada prompt se pega tal cual en Claude Code dentro de este repositorio.

Las etapas van en orden: no se pasa a la siguiente hasta que la anterior esté verificada y subida.

**Por qué funciona.** Cada prompt obliga a Claude a:

- leer lo que ya existe antes de tocarlo;
- cambiar solo lo pedido;
- probar con las herramientas del repositorio;
- corregir lo que falle;
- dejar constancia en un commit.

Así nada que ya funciona se rompe en silencio.

---

## Regla fija para todas las etapas

Pega este bloque al comienzo de cada prompt, o déjalo en `CLAUDE.md` (ya está ahí, en «Forma de trabajo»):

```text
Antes de cambiar nada:
1. Haz git pull, npm ci y lee CLAUDE.md, README.md y los archivos que vas a tocar.
2. Resume en 3–5 líneas qué existe hoy y qué vas a cambiar. No reescribas lo que funciona.
Al terminar:
3. Corre npx astro check, npm run build, npm run preview y node tests/e2e.cjs. Todo debe pasar.
4. Revisa capturas en escritorio (1440 px) y en móvil (390 px). Corrige lo que se vea mal y vuelve a probar.
5. Si una prueba falla, arréglala sin borrar la prueba ni la función. Si no puedes, detente y explícame por qué.
6. Commit en español con mensaje descriptivo y dime qué cambió, qué verificaste y qué quedó pendiente.
No inventes precios, fechas, cifras, testimonios, docentes ni enlaces: usa docs/contenido-oficial.md y anota lo que falte en docs/pendientes.md.
```

---

## Etapa 1 — Arquitectura

```text
Crea un sitio estático con Astro y TypeScript para la Cámara de Comercio Exterior (sigla CE, nunca CCE).
- Estructura: src/data (contenido tipado), src/components, src/layouts/Base.astro, src/pages, src/styles/global.css, src/scripts.
- Páginas: inicio, /programas, /programas/[slug] generadas desde datos, /empresas, /nosotros, /contacto, 404.
- Todo el contenido sale de src/data (sitio.ts y programas.ts), nunca escrito a mano en las páginas.
- Sitemap, robots.txt y URL canónica. Sin secretos en el repositorio: .env en .gitignore y .env.example documentado.
- Crea tests/e2e.cjs con Playwright: cada página responde 200, tiene un solo h1, no tiene enlaces rotos internos ni scroll horizontal en 390 px.
Muéstrame el árbol de archivos y el resultado de las pruebas.
```

## Etapa 2 — Sistema de diseño

```text
Lee .claude/skills/brand-guidelines y docs/direccion-creativa.md. Convierte la dirección en tokens dentro de src/styles/global.css:
colores (Señal #ffc300, Tinta #000, Papel #fff, Grafito #404040, Bruma #f2f2f2), tipografías autoalojadas (Montserrat para titulares y botones, Inter Tight para texto, con precarga del woff2 latino para evitar saltos), escala tipográfica, espaciado, radios por jerarquía y tokens de movimiento.
Crea los componentes base: pastilla (.btn y variantes con el círculo y la flecha del manual), placa, enlace y contenedor.
Usa siempre los logos oficiales de public/brand; no los redibujes.
Haz una página temporal /muestrario con todos los componentes en claro y oscuro, revísala con capturas y bórrala al final.
```

## Etapa 3 — Cabecera, pie y navegación

```text
Inspecciona Header.astro, Footer.astro y Base.astro antes de tocarlos.
Cabecera: logo, menú con desplegable de programas (accesible: aria-expanded, Escape y cierre al perder el foco), indicador de página actual, CTA a WhatsApp y menú móvil a partir de 1000 px.
Pie: llamada final a WhatsApp, navegación, programas, atención, legal y «Volver arriba».
Agrega «Saltar al contenido». Prueba la navegación completa solo con el teclado y descríbeme el recorrido.
```

## Etapa 4 — Portada

```text
Lee docs/experiencia-ux.md y construye la portada sección por sección, en este orden y una por commit:
portada «El abrazo», tablero de programas, comunidad (fotos de src/assets/fotos con <Picture> AVIF/WebP y textos alternativos), directorio de áreas, tres pasos, banda de empresas y preguntas frecuentes (<details name> con respuestas tomadas de docs/contenido-oficial.md).
Después de cada sección: capturas en escritorio y móvil, y node tests/e2e.cjs. No avances si algo falla.
```

## Etapa 5 — Páginas internas y catálogo

```text
Revisa src/data/programas.ts. Genera la ficha de cada programa: datos clave, estructura, qué incluye, certificación, para quién es, y CTAs de WhatsApp con mensaje prellenado y formulario.
En /programas agrega filtros por área que funcionen sin recargar, que se puedan compartir por URL (?area=) y que sigan funcionando sin JavaScript (se muestran todos).
Verifica que cada ficha tenga un título y una descripción únicos.
```

## Etapa 6 — Formularios

```text
Inspecciona FormularioContacto.astro y src/scripts/formulario.ts si existen; si no, créalos.
Requisitos: etiquetas visibles, validación accesible (aria-invalid, aria-describedby y foco en el primer error), campo trampa antispam, estados de enviando, enviado y error, y límite de tiempo de 12 s.
Si PUBLIC_FORM_ENDPOINT está vacío, abre WhatsApp con el mensaje armado. Nunca pongas claves en el frontend.
Agrega pruebas e2e: envío vacío, correo inválido y envío correcto.
```

## Etapa 7 — Movimiento e interacciones

```text
Lee docs/sistema-movimiento.md e impleméntalo sin librerías:
- carga orquestada de la portada (foto, arco, título palabra por palabra, texto, botones y placas);
- interacción del cursor en la portada (capas con variables CSS y la C que se orienta al puntero; solo con pointer: fine);
- el arco que gira y el abrazo que se hunde con el scroll (animation-timeline dentro de @supports);
- filas del tablero que giran al entrar y fotos que se abren desde un marco;
- parallax solo en la foto principal de la comunidad;
- transiciones de página con @view-transition y la cabecera fija;
- micro-interacciones: «+» de preguntas, menú, envío del formulario y pastilla flotante.
Anima solo transform, opacity y clip-path. Con prefers-reduced-motion todo debe verse quieto y completo: pruébalo emulándolo en Playwright.
Scroll suave: usa el nativo (scroll-behavior: smooth) solo para anclajes; no agregues librerías de scroll suave.
```

## Etapa 8 — SEO

```text
Audita el SEO de todas las páginas:
- títulos y descripciones únicos;
- canonical, Open Graph con imagen de 1200×630 y JSON-LD (EducationalOrganization en el inicio y Course en cada ficha);
- sitemap y robots.txt;
- jerarquía de títulos y textos alternativos.
Corrige lo que falte y muéstrame una tabla de página → título → descripción.
```

## Etapa 9 — Accesibilidad

```text
Corre Lighthouse (accesibilidad) en todas las páginas, en móvil y escritorio, y recorre el sitio solo con el teclado.
Corrige los contrastes por debajo de AA, los nombres accesibles que falten y el orden del foco. Nada de amarillo como texto sobre blanco.
Repite hasta llegar a 100 y lista lo que corregiste.
```

## Etapa 10 — Rendimiento

```text
Mide con Lighthouse (móvil y escritorio): LCP, CLS y TBT por página.
- Imagen de la portada con loading="eager" y fetchpriority="high"; el resto, diferidas.
- Fuentes precargadas y sin saltos (CLS 0).
- Sin JavaScript que no se use; revisa el tamaño del bundle en dist.
No des por logrado un puntaje que no hayas medido. Entrégame la tabla de resultados antes y después.
```

## Etapa 11 — Revisión final y publicación

```text
Haz una pasada completa:
- npx astro check, build, e2e y Lighthouse en todas las páginas;
- capturas de todas las páginas en 1440 y 390 px;
- búsqueda de «CCE», «sello oficial», «certificado oficial» y «validez oficial»;
- verificación de que el único WhatsApp publicado sea +51 902 148 893;
- revisión de que docs/pendientes.md esté al día.
Genera la vista previa (python3 scripts/vista-previa.py) y un video del recorrido.
Sube a la rama de trabajo y pregúntame antes de fusionar con main.
```

---

## Prompts de mantenimiento

**Cambio puntual**

```text
Quiero [cambio]. Primero muéstrame qué archivos tocarías y cómo se ve hoy (captura). Haz el cambio mínimo, prueba con e2e y capturas, y no toques nada más.
```

**Error reportado**

```text
En [página/dispositivo] pasa [síntoma]. Reprodúcelo con Playwright antes de corregirlo, encuentra la causa, corrígela, agrega una prueba que lo detecte y confirma que el resto de pruebas siguen pasando.
```

**Contenido nuevo**

```text
Agrega [programa/foto/dato] desde [fuente]. Actualiza src/data y docs/contenido-oficial.md; si falta algún dato, déjalo fuera y anótalo en docs/pendientes.md.
```
