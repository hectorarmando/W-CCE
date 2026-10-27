// Contornos de los países atendidos (Natural Earth 1:110m, paquete world-atlas, dominio público), en longitud y
// latitud con 2 decimales. Viajan al navegador para ubicar a la persona con su geolocalización sin servicios externos.
import { feature } from "topojson-client";
import type { Topology, GeometryCollection } from "topojson-specification";
import mundo from "world-atlas/countries-110m.json";

/** Código numérico ISO 3166-1 de cada país atendido. */
export const ISO_PAISES: Record<string, string> = { PE: "604", EC: "218", CR: "188", CO: "170", MX: "484", PA: "591", AR: "032" };

const topo = mundo as unknown as Topology<{ countries: GeometryCollection<{ name: string }> }>;
const todos = feature(topo, topo.objects.countries).features;

/** Anillos exteriores de cada país: { PE: [[[lon, lat], …]], … } */
export const contornos: Record<string, [number, number][][]> = Object.fromEntries(
  Object.entries(ISO_PAISES).map(([codigo, iso]) => {
    const g = todos.find((f) => String(f.id) === iso)!.geometry as GeoJSON.Polygon | GeoJSON.MultiPolygon;
    const poligonos = g.type === "Polygon" ? [g.coordinates] : g.coordinates;
    return [codigo, poligonos.map((p) => p[0].map(([lon, lat]) => [+lon.toFixed(2), +lat.toFixed(2)] as [number, number]))];
  }),
);
