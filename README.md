# Web — Cámara de Comercio Exterior (CE)

Sitio institucional y comercial de la Cámara de Comercio Exterior. Está construido con [Astro](https://astro.build): genera HTML estático, con muy poco JavaScript, metadatos SEO por página y sitemap automático.

## Requisitos

Node.js 20 o superior y npm.

## Comandos

```bash
npm install          # instalar dependencias
npm run dev          # desarrollo en http://localhost:4321
npm run build        # compilar a dist/
npm run preview      # servir dist/ localmente
npx astro check      # verificación de tipos
node tests/e2e.cjs   # pruebas end-to-end (con el sitio servido por npm run preview)
```

Las pruebas usan Playwright con Chromium. Si no está instalado: `npm i -D playwright && npx playwright install chromium`.

## Estructura

```
src/
  data/sitio.ts          Datos institucionales y canal de WhatsApp (con fuente de cada dato)
  data/programas.ts      Áreas, programas con ficha y catálogo general
  layouts/Base.astro     <head> SEO, Open Graph, JSON-LD, cabecera y pie
  components/            Header (menú desplegable y móvil), Footer, Arco, Flecha, FormularioContacto
  pages/                 index, programas (catálogo con filtro), programas/[slug], empresas, nosotros, contacto, 404
  scripts/               formulario.ts (validación y envío) y revelar.ts
  styles/global.css      Tokens del manual de marca y componentes base
public/
  brand/                 Logos oficiales extraídos del manual (SVG optimizados)
  og/                    Imagen para redes (1200×630)
  _headers, .htaccess    Seguridad y caché (Netlify/Cloudflare o Apache)
server/contacto.php      Receptor opcional del formulario
tests/e2e.cjs            Pruebas end-to-end
docs/                    Contenido oficial, plan de diseño, formularios y pendientes
```

## Editar contenido

- **Programas:** `src/data/programas.ts`. Cada programa con ficha genera su página `/programas/<slug>`. El catálogo general solo lleva nombre, área y resumen.
- **WhatsApp, dominio, visión y valores:** `src/data/sitio.ts`.
- **Navegación:** `navegacion` en `src/data/sitio.ts`.

## Despliegue

Es un sitio estático: sirve `dist/` en cualquier hosting.

- **Netlify / Cloudflare Pages:** comando `npm run build`, carpeta `dist`. Las cabeceras de `public/_headers` se aplican solas.
- **Apache / cPanel:** subir el contenido de `dist/`. El `.htaccess` incluido aplica cabeceras de seguridad, compresión, caché, URLs limpias y la página 404.
- **Nginx:** replicar las cabeceras de `public/_headers` y usar `try_files $uri $uri.html $uri/ =404;`.

Antes de publicar, revisa `docs/pendientes.md`: dominio, Libro de Reclamaciones, política de privacidad y validaciones legales.

## Marca

Las reglas vienen del *Manual de Identidad de Marca* (skill `brand-guidelines`):
- **Logos:** los archivos oficiales, sin redibujar, en la versión adecuada para cada fondo.
- **Tamaño del logo:** respeta el mínimo digital (≥ 100×65 px).
- **Colores:** amarillo `#ffc300`, negro y blanco.
- **Tipografía:** Montserrat, alojada en el propio sitio.
- **Sigla:** «CE».

El plan de diseño está en `docs/plan-diseno.md`.
