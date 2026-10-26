// TESTIMONIOS — solo reales y con autorización escrita de la persona (ver docs/pendientes.md).
// Mientras la lista esté vacía, la sección de testimonios no se muestra en el inicio.
//
// Formato de cada testimonio:
//   { nombre: "Nombre Apellido", programa: "Power BI 8 en 1", pais: "PE", texto: "…", foto?: import de src/assets/testimonios/… }
import type { ImageMetadata } from "astro";
import type { CodigoPais } from "./paises";

export interface Testimonio {
  nombre: string;
  programa: string;
  pais?: CodigoPais;
  texto: string;
  /** Cargo o empresa, si la persona lo autoriza. */
  detalle?: string;
  foto?: ImageMetadata;
}

export const testimonios: Testimonio[] = [];
