// Datos institucionales del sitio. Fuente de cada dato: docs/contenido-oficial.md (Fx = archivo de Drive).
// Solo se incluyen canales publicados en material público. Lo pendiente está en docs/pendientes.md.

const whatsappNumero = "51902148893"; // «CONTÁCTANOS +51 902148893» — Brochure IA Perú 2026 (F6)

export const sitio = {
  nombre: "Cámara de Comercio Exterior",
  sigla: "CE", // Manual de Identidad: la forma correcta es «CE», nunca «CCE»
  dominio: "www.camaracomercioexterior.org", // «VISÍTANOS www.camaracomercioexterior.org» (F6)
  descripcion:
    "Capacitación profesional en comercio exterior, análisis de datos e inteligencia artificial, con clases en vivo y certificado digital verificable.",
  // Manual de Identidad de Marca 2026, sección 1.3–1.4
  vision:
    "Ser un Centro de Capacitación Profesional Internacional, reconocido por el prestigio de la propia marca, desafiando el sistema educativo.",
  valores: ["Transparencia", "Respeto", "Honestidad"],
  whatsapp: {
    numero: whatsappNumero,
    visible: "+51 902 148 893",
  },
} as const;

/** Enlace a WhatsApp con mensaje precargado (patrón usado en las campañas oficiales, F3). */
export function enlaceWhatsapp(mensaje: string): string {
  return `https://wa.me/${sitio.whatsapp.numero}?text=${encodeURIComponent(mensaje)}`;
}

export const navegacion = [
  { href: "/programas", texto: "Programas" },
  { href: "/empresas", texto: "Empresas" },
  { href: "/nosotros", texto: "Nosotros" },
  { href: "/contacto", texto: "Contacto" },
] as const;
