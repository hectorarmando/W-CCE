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
  components/            Header (menú desplegable y móvil), Footer, Arco, Flecha, FormularioContacto, LluviaDatos
  components/ui/         Componentes React con estructura shadcn (works-wheel, data-rain); se usan como islas
  lib/utils.ts           cn(): une clases de Tailwind (utilidad estándar de shadcn)
  pages/                 index, programas (catálogo con filtro), programas/[slug], empresas, nosotros, contacto, 404
  scripts/               formulario.ts (validación y envío) y efectos.ts (movimiento)
  styles/global.css      Tokens del manual de marca y componentes base
  styles/tailwind.css    Tailwind 4 para las islas React (sin preflight) y tokens de los componentes ui
public/
  brand/                 Logos oficiales extraídos del manual (SVG optimizados)
  og/                    Imagen para redes (1200×630)
  _headers, .htaccess    Seguridad y caché (Netlify/Cloudflare o Apache)
server/contacto.php      Receptor opcional del formulario
tests/e2e.cjs            Pruebas end-to-end
docs/                    Contenido oficial, plan de diseño, formularios y pendientes
```

## Componentes React (islas, estructura shadcn)

El sitio es Astro estático y usa React solo donde hace falta interacción compleja. La configuración ya está lista:
`@astrojs/react`, Tailwind 4 vía `@tailwindcss/vite`, el alias `@/*` → `src/*` (tsconfig) y `components.json`.

- **Dónde van:** `src/components/ui/`. Es la carpeta que espera la CLI de shadcn (`aliases.ui`). Así,
  `npx shadcn@latest add <componente>` instala ahí y los imports `@/components/ui/...` de cualquier componente
  de la comunidad funcionan sin cambios. Además separa las piezas genéricas de React de los componentes
  `.astro` propios del sitio.
- **Estilos:** `src/styles/tailwind.css` carga solo las capas `theme` y `utilities` (sin preflight), para no alterar
  el reset de `global.css`. Los tokens de shadcn (`background`, `foreground`, `muted`…) apuntan a los colores
  de la marca. Se importa únicamente en las páginas o componentes que usan islas.
- **Cómo usarlos en una página:** `<WorksWheel client:only="react" items={...} />`. Con `client:only` el
  componente no se renderiza en el servidor (útil si mide su tamaño al montarse) y con `client:visible`
  se hidrata al entrar en pantalla.
- **En uso:**
  - `WorksWheel` está en `/comunidad`, con las fotos propias optimizadas con `getImage`.
  - `DataRain` (a través de `LluviaDatos`) es el fondo de la portada de `/empresas`. Solo se activa con mouse
    o trackpad en pantallas de 900 px o más, y únicamente mientras está a la vista.

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

Las reglas vienen del *Manual de Identidad de Marca* (skill `brand-guidelines`, incluido en `.claude/skills/` junto con `frontend-design` y `web-artifacts-builder`):
- **Logos:** los archivos oficiales, sin redibujar, en la versión adecuada para cada fondo.
- **Tamaño del logo:** respeta el mínimo digital (≥ 100×65 px).
- **Colores:** amarillo `#ffc300`, negro y blanco.
- **Tipografía:** Montserrat, alojada en el propio sitio.
- **Sigla:** «CE».

El plan de diseño está en `docs/plan-diseno.md`.
