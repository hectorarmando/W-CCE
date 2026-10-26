// Banners de campaña del inicio (skill banner-design). Solo campañas que figuran en el material oficial
// (docs/contenido-oficial.md §2.3 y anexo de fotos). Sin fechas, precios ni cifras: el asesor confirma condiciones.
import type { ImageMetadata } from "astro";
import { enlaceWhatsapp } from "./sitio";
import fotoCinta from "../assets/fotos/evento-corte-de-cinta.jpg";
import fotoCharla from "../assets/fotos/evento-charla-ia-generativa.jpg";
import imgExcel from "../assets/cursos/excel-profesional.jpg";

/** Dirección de arte del banner: foto a sangre, tipografía grande, geométrico oscuro o degradado del curso. */
export type EstiloBanner = "foto" | "tipografica" | "geometrica" | "degradado";

export interface Campana {
  id: string;
  estilo: EstiloBanner;
  etiqueta: string;
  titulo: string;
  texto: string;
  cta: { texto: string; href: string; externo?: boolean };
  imagen?: ImageMetadata;
  alt?: string;
}

export const campanas: Campana[] = [
  {
    id: "educacion-continua",
    estilo: "foto",
    etiqueta: "Campaña Educación continua",
    titulo: "Aprende, certifícate y avanza.",
    texto: "Programas en vivo con proyecto aplicado y certificado digital verificable.",
    cta: { texto: "Ver programas", href: "/programas" },
    imagen: fotoCinta,
    alt: "Corte de cinta de la campaña «Educación continua» de la Cámara de Comercio Exterior",
  },
  {
    id: "empresas",
    estilo: "tipografica",
    etiqueta: "Para empresas",
    titulo: "Capacita a tu equipo con precio corporativo.",
    texto: "Programas del catálogo para grupos de colaboradores.",
    cta: { texto: "Solicitar propuesta", href: "/empresas" },
  },
  {
    id: "workshops-ia",
    estilo: "geometrica",
    etiqueta: "Talleres presenciales",
    titulo: "Workshops de IA generativa.",
    texto: "Charlas y workshops presenciales para usar la IA con criterio.",
    cta: { texto: "Consultar próximas fechas", href: enlaceWhatsapp("Hola, quiero información sobre el próximo workshop presencial de IA."), externo: true },
    imagen: fotoCharla,
    alt: "Ponente explicando qué son las IA generativas en un workshop de la CE",
  },
  {
    id: "promocion-universitarios",
    estilo: "degradado",
    etiqueta: "Estudiantes universitarios",
    titulo: "Promoción universitaria en Excel.",
    texto: "¿Tienes carnet universitario? Un asesor te confirma las condiciones vigentes.",
    cta: { texto: "Consultar promoción", href: enlaceWhatsapp("Hola, tengo mi carnet universitario y deseo la promoción del curso de Excel."), externo: true },
    imagen: imgExcel,
    alt: "Portada del curso Excel Profesional de la Cámara de Comercio Exterior",
  },
];
