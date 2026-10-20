// Países donde vende la CE (selector oficial de ubicación) y cómo se muestra el precio en cada uno.
// «OT» (otros países) usa dólares estadounidenses.

export type CodigoPais = "PE" | "EC" | "CR" | "CO" | "MX" | "PA" | "AR" | "OT";

export interface Pais {
  codigo: CodigoPais;
  nombre: string;
  /** Código ISO 4217 de la moneda en que se publica el precio. */
  moneda: string;
  /** Prefijo que se muestra antes del monto. */
  simbolo: string;
  /** Sufijo para monedas que comparten el signo «$» y podrían confundirse. */
  sufijo?: string;
  /** Formato de miles y decimales. */
  locale: string;
  decimales: number;
  /** Zonas horarias del navegador que identifican al país (detección sin servicios externos). */
  zonas: string[];
}

export const paises: Pais[] = [
  { codigo: "PE", nombre: "Perú", moneda: "PEN", simbolo: "S/", locale: "es-PE", decimales: 0, zonas: ["America/Lima"] },
  { codigo: "EC", nombre: "Ecuador", moneda: "USD", simbolo: "US$", locale: "es-EC", decimales: 0, zonas: ["America/Guayaquil", "Pacific/Galapagos"] },
  { codigo: "CR", nombre: "Costa Rica", moneda: "CRC", simbolo: "₡", locale: "es-CR", decimales: 0, zonas: ["America/Costa_Rica"] },
  { codigo: "CO", nombre: "Colombia", moneda: "COP", simbolo: "$", sufijo: "COP", locale: "es-CO", decimales: 0, zonas: ["America/Bogota"] },
  {
    codigo: "MX", nombre: "México", moneda: "MXN", simbolo: "$", sufijo: "MXN", locale: "es-MX", decimales: 0,
    zonas: ["America/Mexico_City", "America/Cancun", "America/Merida", "America/Monterrey", "America/Matamoros", "America/Chihuahua",
      "America/Ciudad_Juarez", "America/Ojinaga", "America/Mazatlan", "America/Bahia_Banderas", "America/Hermosillo", "America/Tijuana"],
  },
  { codigo: "PA", nombre: "Panamá", moneda: "USD", simbolo: "US$", locale: "es-PA", decimales: 0, zonas: ["America/Panama"] },
  { codigo: "AR", nombre: "Argentina", moneda: "ARS", simbolo: "$", sufijo: "ARS", locale: "es-AR", decimales: 0, zonas: ["America/Argentina/", "America/Buenos_Aires", "America/Cordoba"] },
  { codigo: "OT", nombre: "Otro país", moneda: "USD", simbolo: "US$", locale: "es", decimales: 0, zonas: [] },
];

export const paisPorCodigo = Object.fromEntries(paises.map((p) => [p.codigo, p])) as Record<CodigoPais, Pais>;
