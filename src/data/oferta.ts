// Oferta completa en una sola lista (programas con ficha + cursos del catálogo), para el buscador,
// el inicio y el catálogo. Los programas enlazan a su ficha; los cursos, a WhatsApp con mensaje precargado.
import type { ImageMetadata } from "astro";
import { programas, cursos, areaPorId, type AreaId } from "./programas";
import { enlaceWhatsapp } from "./sitio";

export interface ItemOferta {
  nombre: string;
  area: AreaId;
  color: string;
  resumen: string;
  imagen?: ImageMetadata;
  /** Datos breves (duración / modalidad) o la invitación a consultar. */
  meta: string;
  href: string;
  externo: boolean;
  accion: string;
  /** true si tiene ficha con temario completo. */
  programa: boolean;
}

export const oferta: ItemOferta[] = [
  ...programas.map((p) => ({
    nombre: p.nombre, area: p.area, color: p.color ?? areaPorId[p.area].color, resumen: p.resumen, imagen: p.imagen,
    meta: p.datos.slice(0, 2).map((d) => d.valor).join(" / "),
    href: `/programas/${p.slug}`, externo: false, accion: "Ver temario", programa: true,
  })),
  ...cursos.map((c) => ({
    nombre: c.nombre, area: c.area, color: c.color ?? areaPorId[c.area].color, resumen: c.resumen, imagen: c.imagen,
    meta: "Consulta temario, horarios e inversión",
    href: enlaceWhatsapp(`Hola, quiero información del curso de ${c.nombre}.`), externo: true, accion: "Consultar", programa: false,
  })),
];

/** Datos mínimos que viajan al navegador para el buscador (sin imágenes). */
export const indiceBusqueda = oferta.map((o) => ({
  n: o.nombre, a: areaPorId[o.area].nombre, h: o.href, e: o.externo, p: o.programa,
}));
