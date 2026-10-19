# Pendientes y validaciones institucionales

Esta lista recoge lo que debe confirmar la institución antes de publicar. Nada de esto se inventó en el sitio: donde faltaba un dato, se omitió o se usó la opción más prudente. Las fuentes de cada dato están en `docs/contenido-oficial.md`.

## Bloqueantes para el lanzamiento

| # | Tema | Situación actual en el sitio | Qué se necesita |
|---|---|---|---|
| 1 | **Dominio oficial** | Configurado `www.camaracomercioexterior.org`, que es el que usa el material público 2026. `.edu.pe` solo aparece en correos internos. | Confirmar el dominio. Si cambia, editar `site` en `astro.config.mjs`, `dominio` en `src/data/sitio.ts` y `public/robots.txt`. |
| 2 | **Uso del nombre «Cámara»** | Se usa el nombre de marca del manual. Se evitó «sello oficial», «certificado oficial», «validez oficial» y «respaldo institucional». | Esperar la opinión legal solicitada (Drive: *Solicitud_Opinion_Legal_Programa_Asociados_CE*) y ajustar textos si corresponde. |
| 3 | **Libro de Reclamaciones** | No existe enlace: no hay URL oficial y no se creó un enlace ficticio. | Es obligatorio en Perú para servicios al consumidor. Facilitar la URL o el proveedor. |
| 4 | **Política de privacidad / Términos** | El formulario pide autorización conforme a la Ley N.° 29733, pero no enlaza a una política porque no existe. | Redactar la política (con legal) y agregar el enlace en el formulario y en el pie. |
| 5 | **Razón social** | No se muestra. | Definir cuál va en el pie: «Cámara de Comercio Exterior S.A.C.» o «Centro de Negocios-Cámara de Comercio Exterior S.A.C.» (RUC 20615130762). Las fuentes se contradicen. |
| 6 | **Receptor del formulario** | Sin endpoint, el formulario abre WhatsApp con el mensaje listo (funciona). | Opcional: activar el receptor PHP o un servicio externo (ver `docs/formularios.md`). |

## Contenido a validar

- **Misión.** El manual de marca dice «Construir reputación de marca». Parece un objetivo interno, por eso no se publicó. Se publican la **visión** y los **valores** del manual.
- **Programas con ficha:**
  - Nombre comercial del programa de Excel: el sílabo dice «7 en 1» y «12 en 1». Se publicó como «Programa Completo de Excel».
  - Nombre de la Academia de Importadores: hay tres variantes en las fuentes. Se usó «Academia de Importadores», como en el brochure 2026.
  - Analista Excel + IA: no se menciona la co-certificación con Microsoft/Coursera hasta confirmar la autorización de uso de esas marcas.
- **Resúmenes del catálogo general** (Python, SQL, AutoCAD, etc.). Son descripciones breves de redacción propia, porque la fuente es un documento interno. El área académica debe validarlas.
- **Colores por área.** Comercio exterior, Ingeniería y Gestión no tienen color en el manual: se usaron amarillo institucional y grises de marca. Confirmar con Diseño y Marca.
- **Textos de proceso.** Los pasos «Cómo inscribirte» y «Cómo coordinamos» describen el flujo habitual por asesor: consulta, propuesta y matrícula. Confirmar que coincide con la operación real.

## Información que no se encontró (y no se publicó)

- Precios, fechas de inicio y horarios vigentes. Las fichas dirigen al asesor.
- Docentes con foto y biografía autorizadas.
- Cifras (alumnos, países, años), testimonios, alianzas y logos de terceros.
- Dirección física, horario de atención, correo público y URLs de redes sociales.
- URL del aula virtual. Por eso no hay botón «Aula virtual» en la navegación.
- Fotografía institucional. El diseño se apoya en tipografía y en el arco de marca; ver «Fotografía» abajo.

Cuando estén disponibles se agregan así:
- redes sociales y correo: en `src/data/sitio.ts` y `src/components/Footer.astro`;
- aula virtual: como ítem en `navegacion` (`src/data/sitio.ts`);
- docentes, precios y fechas: en `src/data/programas.ts`.

## Fotografía

**Fotos incorporadas** (entregadas por la CE, en `src/assets/fotos/`):

| Archivo | Dónde se usa |
|---|---|
| `evento-auditorio.jpg` | Inicio («Conectamos talento, impulsamos desarrollo») y portada de Nosotros |
| `evento-charla-ia-generativa.jpg` | Inicio |
| `evento-registro.jpg` | Inicio |
| `evento-entrega-kits.jpg` | Inicio |
| `marca-el-exito-lo-logramos-juntos.jpg` | Nosotros («Somos CE») |
| `equipo-tren-ce.jpg` | Inicio, franja «Educación continua · Aprende, certifícate y avanza» |
| `evento-corte-de-cinta.jpg` | Inicio, galería |
| `evento-batucada-banner.jpg` | Inicio, galería |
| `evento-presentacion-educacion-continua.jpg` | Nosotros («Cómo formamos») |
| `evento-batucada.jpg` | Página 404 |

**Portadas de cursos** (entregadas por la CE, `src/assets/cursos/`, 1920×1080 con título y logo integrados). Se usan en el catálogo (tarjetas), en el tablero del inicio y en la ficha de cada programa (también como imagen para redes):

| Archivo | Curso |
|---|---|
| `academia-de-importadores.jpg` | Academia de Importadores («Aprende a importar de China») |
| `inteligencia-artificial-aplicada.jpg` | Programa Profesional de IA Aplicada |
| `power-bi.jpg` | Power BI 8 en 1 («Power BI + Business Intelligence») |
| `excel-profesional.jpg` | Programa Completo de Excel («Excel Profesional») |
| `python.jpg`, `sql.jpg`, `ofimatica.jpg` | Python, SQL, Ofimática |
| `marketing-publicidad-digital.jpg` | Marketing digital («Marketing y Publicidad Digital») |
| `diseno-grafico.jpg`, `diseno-ux-ui.jpg` | Diseño gráfico, Diseño UX/UI |
| `autocad.jpg`, `revit-bim.jpg`, `modelado-3d.jpg` | AutoCAD, Revit y gestión BIM, Modelado y visualización 3D |
| `gestion-agil.jpg` | Gestión ágil de proyectos |
| `presentaciones-ia.jpg`, `ia-adultos-mayores.jpg`, `contabilidad.jpg`, `roblox.jpg` | Cursos agregados al catálogo con estas portadas |

**Faltan portadas** (se muestran con un bloque negro con el color del área): Analista de Excel Intelligence + IA, Publicidad digital, Habilidades esenciales para liderazgo, Inglés americano y Portugués.

**Por validar de los cursos agregados** (Presentaciones de alto impacto con IA, IA para adultos mayores, Contabilidad rápida y eficaz, Crea tu videojuego en Roblox; nombres tomados de sus portadas y de `contenido-oficial.md` §2.3):
- los resúmenes son redacción propia y breve;
- el área de Roblox («Marketing y diseño») y la de Contabilidad («Gestión e idiomas») son provisionales.

**Por validar:**

- **Autorización de imagen.** Confirmar el consentimiento de las personas que aparecen, sobre todo estudiantes, para su uso en la web.
- **Marcas de terceros.** En las fotos se ven marcas e instalaciones de terceros (UTP e Interbank en el fondo; un tren y una estación de transporte con la marca de la CE). Los textos del sitio **no** mencionan alianzas, convenios ni a la empresa operadora. Confirmar si se pueden publicar o si conviene recortar o desenfocar esas marcas.
- **Frases del material gráfico.** Se usan «Conectamos talento, impulsamos desarrollo» (banner), «El éxito lo logramos juntos.» (bolsas) y «Educación continua · Aprende, certifícate y avanza» (banner y cinta de la campaña). Confirmar que siguen vigentes como mensajes institucionales.
- **Redes sociales.** El banner de la campaña muestra Instagram, TikTok, YouTube, Facebook y LinkedIn. Faltan las URLs de cada perfil para agregarlas al pie del sitio.

**Pendientes de fotografía:**

1. Hero del inicio: una persona recortada dentro del arco, como pide el manual.
2. Fichas de programa: foto del docente o render de la herramienta.
3. Página Empresas: equipo en capacitación corporativa.

Formato recomendado: WebP o AVIF de 1600 px de ancho como máximo, con `alt` descriptivo y `loading="lazy"` fuera del primer pantallazo.

## Referencia visual Melius

`melius.com` no se pudo inspeccionar desde el entorno de desarrollo: el proxy rechazó la conexión y las herramientas web no resolvieron el dominio. No se copió ni se replicó ningún rasgo concreto de esa web. Se recomienda que el equipo la revise en un navegador y comente si quiere acercar algún aspecto (ritmo, transiciones, composición).
