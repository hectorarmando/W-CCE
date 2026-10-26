// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";

// Dominio de producción: el material público 2026 usa www.camaracomercioexterior.org (brochure IA, campañas).
// Dominio confirmado: esta web reemplazará a la actual en www.camaracomercioexterior.org (ver docs/pendientes.md).
export default defineConfig({
  site: "https://www.camaracomercioexterior.org",
  trailingSlash: "never",
  build: { format: "file", inlineStylesheets: "auto" },
  // React solo para islas interactivas (src/components/ui, estructura shadcn); el resto del sitio es Astro sin JS.
  integrations: [sitemap(), react()],
  vite: { plugins: [tailwindcss()] },
});
