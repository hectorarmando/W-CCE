// PRECIOS POR PAÍS — los define el área comercial de la CE (ver docs/precios-por-pais.md).
// Regla del proyecto: aquí no se escribe ningún precio que no esté confirmado.
//
// Clave: el id del programa o curso (el slug de la ficha, p. ej. "power-bi", o el id del curso del catálogo,
// p. ej. "python"; la lista completa de ids está en docs/plantilla-precios.csv).
// Por país: { precio, antes? }. «precio» es el monto final en la moneda del país, con impuestos incluidos;
// «antes» es opcional y muestra el precio regular tachado cuando hay promoción.
// Si un curso no tiene precio para un país, la web muestra «Consulta con un asesor», como hasta ahora.
//
// Ejemplo (NO son precios reales):
//   "power-bi": { PE: { precio: 0, antes: 0 }, EC: { precio: 0 }, OT: { precio: 0 } },

import type { CodigoPais } from "./paises";

export interface PrecioPais { precio: number; antes?: number; }

export const precios: Record<string, Partial<Record<CodigoPais, PrecioPais>>> = {
};
