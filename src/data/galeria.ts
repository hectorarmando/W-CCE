// Galería de la comunidad CE: fotos propias entregadas por la CE (src/assets/fotos, ver docs/pendientes.md).
// El título aparece junto a la foto activa y es su texto alternativo: corto (≤ 18 caracteres) para no montarse sobre la foto.
import type { ImageMetadata } from "astro";
import auditorio from "../assets/fotos/evento-auditorio.jpg";
import charla from "../assets/fotos/evento-charla-ia-generativa.jpg";
import registro from "../assets/fotos/evento-registro.jpg";
import kits from "../assets/fotos/evento-entrega-kits.jpg";
import tren from "../assets/fotos/equipo-tren-ce.jpg";
import cinta from "../assets/fotos/evento-corte-de-cinta.jpg";
import batucadaBanner from "../assets/fotos/evento-batucada-banner.jpg";
import presentacion from "../assets/fotos/evento-presentacion-educacion-continua.jpg";
import marca from "../assets/fotos/marca-el-exito-lo-logramos-juntos.jpg";
import batucada from "../assets/fotos/evento-batucada.jpg";

export interface FotoGaleria { titulo: string; foto: ImageMetadata; }

export const galeria: FotoGaleria[] = [
  { titulo: "Auditorio lleno", foto: auditorio },
  { titulo: "Charla de IA", foto: charla },
  { titulo: "Registro", foto: registro },
  { titulo: "Entrega de kits", foto: kits },
  { titulo: "Tren CE", foto: tren },
  { titulo: "Corte de cinta", foto: cinta },
  { titulo: "Banner y batucada", foto: batucadaBanner },
  { titulo: "Educación continua", foto: presentacion },
  { titulo: "El éxito, juntos", foto: marca },
  { titulo: "Batucada", foto: batucada },
];
