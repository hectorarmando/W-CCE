// Blog: temas propuestos en el prototipo HTML del usuario (oct-2026). Todavía no hay notas escritas ni autores:
// cada entrada se muestra como «En preparación» hasta que se cargue el texto real (docs/pendientes.md).
export type CategoriaBlog = "Tecnología e IA" | "Negocios" | "Egresados" | "Eventos" | "Tendencias";

export interface NotaBlog {
  titulo: string;
  categoria: CategoriaBlog;
  /** Texto de la nota. Vacío = en preparación. */
  resumen?: string;
  autor?: string;
  minutos?: number;
  destacada?: boolean;
}

export const notas: NotaBlog[] = [
  { titulo: "Por qué la educación continua define la carrera moderna", categoria: "Tendencias", destacada: true },
  { titulo: "Cómo la IA está cambiando los perfiles profesionales", categoria: "Tecnología e IA" },
  { titulo: "Habilidades de gestión que piden las empresas hoy", categoria: "Negocios" },
  { titulo: "De la capacitación al cargo: historias de nuestros egresados", categoria: "Egresados" },
  { titulo: "Lo que dejó nuestro Workshop de Inteligencia Artificial", categoria: "Eventos" },
  { titulo: "Comercio exterior: oportunidades para profesionales", categoria: "Negocios" },
  { titulo: "Datos para decidir: por dónde empezar", categoria: "Tecnología e IA" },
];

export const categoriasBlog: CategoriaBlog[] = ["Tecnología e IA", "Negocios", "Egresados", "Eventos"];
