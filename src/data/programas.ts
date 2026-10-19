// Oferta formativa. Fuente: docs/contenido-oficial.md (Fx = archivo de Drive).
// Regla: no se publican precios, fechas ni docentes hasta que el área comercial los confirme (docs/pendientes.md).

export type AreaId = "comercio" | "datos" | "ia" | "marketing" | "ingenieria" | "gestion";

export interface Area {
  id: AreaId;
  nombre: string;
  /** Color de identificación: paleta del curso principal del área (Manual 2.3) o gris de marca si el manual no asigna uno. */
  color: string;
  descripcion: string;
}

export const areas: Area[] = [
  { id: "comercio", nombre: "Comercio exterior", color: "#ffc300", descripcion: "Importación, logística, costos y negociación internacional." },
  { id: "datos", nombre: "Datos y productividad", color: "#2daf73", descripcion: "Excel, Power BI, SQL, Python y ofimática para decidir con información." },
  { id: "ia", nombre: "Inteligencia artificial", color: "#072b4f", descripcion: "IA aplicada al trabajo, al contenido y a la automatización." },
  { id: "marketing", nombre: "Marketing y diseño", color: "#8100c2", descripcion: "Marketing digital, publicidad, diseño gráfico y experiencia de usuario." },
  { id: "ingenieria", nombre: "Ingeniería y construcción", color: "#404040", descripcion: "AutoCAD, Revit con gestión BIM y modelado 3D." },
  { id: "gestion", nombre: "Gestión e idiomas", color: "#808080", descripcion: "Gestión ágil, liderazgo, inglés y portugués." },
];

export interface Bloque { titulo: string; detalle?: string; }

export interface Programa {
  slug: string;
  nombre: string;
  area: AreaId;
  /** Color propio del curso cuando el manual lo define. */
  color?: string;
  resumen: string;
  datos: { etiqueta: string; valor: string }[];
  temarioTitulo: string;
  temario: Bloque[];
  incluye: string[];
  certificacion: string;
  publico?: string;
  fuente: string;
}

// Programas con brochure o sílabo 2026: tienen página propia.
export const programas: Programa[] = [
  {
    slug: "academia-de-importadores",
    nombre: "Academia de Importadores",
    area: "comercio",
    resumen: "Aprende a importar desde China y EE. UU.: compra internacional, logística, costos y estrategia comercial, con un proyecto de importación como cierre.",
    datos: [
      { etiqueta: "Duración", valor: "4 semanas" },
      { etiqueta: "Modalidad", valor: "Online, con clases de refuerzo en vivo los viernes" },
      { etiqueta: "Cierre", valor: "Workshop de proyecto de importación" },
    ],
    temarioTitulo: "Temario por semana",
    temario: [
      { titulo: "Gestión de compra internacional" },
      { titulo: "Gestión logística y proceso de importación" },
      { titulo: "Estructura del costo de importación y cálculo de derechos e impuestos" },
      { titulo: "Estrategias comerciales" },
      { titulo: "Workshop: presentación de importación de proyecto" },
    ],
    incluye: [
      "Aprovechar los TLC entre Perú y China",
      "Búsqueda avanzada de proveedores y productos",
      "Habilidades de negociación",
      "Marcos legales y regulaciones aduaneras",
      "Métodos de pago internacionales",
    ],
    certificacion: "Certificado de comercio exterior de la Cámara, con código QR para validar su autenticidad.",
    fuente: "Brochure Academia de Importadores 2026 (F7)",
  },
  {
    slug: "inteligencia-artificial-aplicada",
    nombre: "Programa Profesional de Inteligencia Artificial Aplicada",
    area: "ia",
    color: "#072b4f",
    resumen: "Convierte ideas, información y tareas en soluciones aplicables a tu trabajo, carrera o negocio, con ChatGPT, Gemini y Claude.",
    datos: [
      { etiqueta: "Duración", valor: "24 horas académicas" },
      { etiqueta: "Estructura", valor: "3 niveles · 12 sesiones de 2 horas" },
      { etiqueta: "Modalidad", valor: "Clases en vivo" },
    ],
    temarioTitulo: "Las 12 sesiones",
    temario: [
      { titulo: "Fundamentos de IA y prompt engineering", detalle: "Nivel básico" },
      { titulo: "IA estratégica e investigación de mercado", detalle: "Nivel básico" },
      { titulo: "Creación de contenido: imagen y diseño avanzado", detalle: "Nivel básico" },
      { titulo: "Estratega de contenido digital", detalle: "Nivel básico" },
      { titulo: "Creación de contenido audiovisual con IA", detalle: "Nivel intermedio" },
      { titulo: "Análisis de datos y reportes de negocio", detalle: "Nivel intermedio" },
      { titulo: "Crea y publica tu primera app o web con IA", detalle: "Nivel intermedio" },
      { titulo: "Presentaciones y storytelling con IA", detalle: "Nivel intermedio" },
      { titulo: "Automatización y eficiencia operativa", detalle: "Nivel avanzado" },
      { titulo: "Conectores y MCP: conecta tus IAs con otras aplicaciones", detalle: "Nivel avanzado" },
      { titulo: "Gestión del conocimiento con Gemini Notebook y Claude Projects", detalle: "Nivel avanzado" },
      { titulo: "Proyecto integrador: un sistema de IA aplicado a un caso real", detalle: "Nivel avanzado" },
    ],
    incluye: [
      "Clases en vivo con expertos",
      "Proyectos con IA y laboratorio",
      "Biblioteca de recursos: clases grabadas, prompts y plantillas",
      "Reto IA y comunidad",
      "Acompañamiento especializado",
    ],
    certificacion: "Certificación de la Cámara de Comercio Exterior en Inteligencia Artificial Aplicada, con QR verificable.",
    fuente: "Brochure IA Perú 2026 (F6) y Sílabo IA Aplicada 24 h (F8)",
  },
  {
    slug: "power-bi",
    nombre: "Power BI 8 en 1",
    area: "datos",
    color: "#f5d755",
    resumen: "De los datos al dashboard: niveles básico, intermedio y avanzado con IA integrada, laboratorios en vivo y un proyecto final.",
    datos: [
      { etiqueta: "Duración", valor: "34 horas" },
      { etiqueta: "Modalidad", valor: "Online síncrono" },
      { etiqueta: "Niveles", valor: "Básico, intermedio y avanzado" },
    ],
    temarioTitulo: "Estructura",
    temario: [
      { titulo: "Nivel básico", detalle: "6 h" },
      { titulo: "Live Lab 1", detalle: "2 h" },
      { titulo: "Nivel intermedio", detalle: "8 h" },
      { titulo: "Live Lab 2", detalle: "2 h" },
      { titulo: "Nivel avanzado con IA integrada", detalle: "10 h" },
      { titulo: "Live Lab 3", detalle: "2 h" },
      { titulo: "Live Lab 4: project clinic y mentoría", detalle: "2 h" },
      { titulo: "Capstone project", detalle: "2 h" },
    ],
    incluye: [
      "Cursos grabados de regalo: Excel, tablas y gráficos dinámicos, Power Pivot, dashboard en Excel, macros y Visual Basic",
      "Clases en vivo para resolver dudas con el docente",
    ],
    certificacion: "Certificado digital de la Cámara de Comercio Exterior y microcredencial opcional en Business Intelligence. Requiere aprobar el proyecto con 80 % o más y asistir a todos los Live Labs.",
    publico: "Profesionales de administración, finanzas, contabilidad, comercial, marketing, recursos humanos, logística y operaciones que trabajan con datos e indicadores; también estudiantes y egresados.",
    fuente: "Sílabo Power BI en vivo (F10)",
  },
  {
    slug: "excel-completo",
    nombre: "Programa Completo de Excel",
    area: "datos",
    color: "#2daf73",
    resumen: "Desde lo básico hasta la automatización: Power Query, macros, Visual Basic, dashboards y Copilot en Excel.",
    datos: [
      { etiqueta: "Modalidad", valor: "Online" },
      { etiqueta: "Refuerzo", valor: "Clases en vivo de lunes a viernes" },
    ],
    temarioTitulo: "Módulos",
    temario: [
      { titulo: "Excel básico con módulo de IA aplicada" },
      { titulo: "Power Query" },
      { titulo: "Macros" },
      { titulo: "Visual Basic" },
      { titulo: "Creación de un dashboard en Excel" },
      { titulo: "IA: Copilot en Excel" },
    ],
    incluye: ["Clases de refuerzo en vivo de lunes a viernes"],
    certificacion: "Certificado de la Cámara de Comercio Exterior con código QR para validar su autenticidad desde cualquier parte del mundo.",
    fuente: "Sílabo Excel 7 en 1 (F11). El sílabo dice «7 en 1» y «12 en 1»: confirmar el nombre comercial.",
  },
  {
    slug: "analista-excel-ia",
    nombre: "Analista de Excel Intelligence + IA",
    area: "datos",
    color: "#2daf73",
    resumen: "Excel desde cero hasta el análisis con Copilot y la visualización de datos, a tu ritmo y con refuerzo en vivo.",
    datos: [
      { etiqueta: "Duración", valor: "4 meses" },
      { etiqueta: "Modalidad", valor: "100 % virtual, síncrono y asíncrono" },
      { etiqueta: "Carga", valor: "3 bloques · 64 horas" },
    ],
    temarioTitulo: "Bloques",
    temario: [
      { titulo: "Excel desde cero", detalle: "20 h" },
      { titulo: "Gestión de datos con Excel", detalle: "20 h" },
      { titulo: "Análisis con Copilot y visualización en Excel", detalle: "24 h" },
    ],
    incluye: ["Clases de refuerzo en vivo", "Plataforma disponible 24/7", "Soporte académico", "Aprende a tu ritmo"],
    certificacion: "Certificado digital emitido por la CE, compartible en LinkedIn, e insignia digital. Nota mínima de aprobación: 70 %.",
    publico: "Profesionales, estudiantes y egresados que quieren fortalecer su dominio de Excel.",
    fuente: "Brochure Analista Excel + IA (F12). La co-certificación con terceros no se publica hasta confirmar la autorización de marca.",
  },
];

export interface Curso { nombre: string; area: AreaId; color?: string; resumen: string; }

// Catálogo general: los nombres provienen del catálogo de cursos (F1) y de las paletas por curso del Manual de Identidad.
// Los resúmenes son redacción propia, breve y descriptiva: validar con el área académica.
export const cursos: Curso[] = [
  { nombre: "Python", area: "datos", color: "#009cfe", resumen: "Automatización y análisis de datos, de básico a avanzado." },
  { nombre: "SQL", area: "datos", color: "#7dba00", resumen: "Consultas y gestión de bases de datos para el negocio." },
  { nombre: "Ofimática", area: "datos", color: "#f16621", resumen: "Herramientas esenciales de productividad en la oficina." },
  { nombre: "Marketing digital", area: "marketing", color: "#8100c2", resumen: "Estrategias para atraer clientes y vender en canales digitales." },
  { nombre: "Publicidad digital", area: "marketing", color: "#8100c2", resumen: "Campañas en Facebook, TikTok y Google, con talleres en vivo." },
  { nombre: "Diseño gráfico", area: "marketing", color: "#df245a", resumen: "Piezas visuales profesionales para comunicar mejor." },
  { nombre: "Diseño UX/UI", area: "marketing", resumen: "Experiencias digitales centradas en el usuario." },
  { nombre: "AutoCAD", area: "ingenieria", resumen: "Planos y diseño técnico para ingeniería y arquitectura." },
  { nombre: "Revit y gestión BIM", area: "ingenieria", resumen: "Modelado y gestión colaborativa de proyectos de construcción." },
  { nombre: "Modelado y visualización 3D", area: "ingenieria", resumen: "Representaciones tridimensionales para diseño y arquitectura." },
  { nombre: "Gestión ágil de proyectos", area: "gestion", resumen: "Metodologías para entregar proyectos con más velocidad." },
  { nombre: "Habilidades esenciales para liderazgo", area: "gestion", resumen: "Competencias para dirigir equipos y gestionar el cambio." },
  { nombre: "Inglés americano", area: "gestion", color: "#d80027", resumen: "Comunicación en inglés para el trabajo y los negocios." },
  { nombre: "Portugués", area: "gestion", resumen: "Comunicación para mercados de habla portuguesa." },
];

export const areaPorId = Object.fromEntries(areas.map((a) => [a.id, a])) as Record<AreaId, Area>;
