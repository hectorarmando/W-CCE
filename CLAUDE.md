# W-CCE — Web de la Cámara de Comercio Exterior (CE)

Este repositorio es la **única fuente de verdad** de la web. Todo cambio (diseño, contenido, recursos, código) se hace aquí y se sube a GitHub; no se trabaja en copias fuera del repositorio.

## Forma de trabajo

1. Antes de empezar: `git pull origin main` y `npm ci`.
2. Haz el cambio en este repositorio, siguiendo los skills de `.claude/skills/`:
   - `brand-guidelines`: reglas del Manual de Identidad de Marca. Son obligatorias en cualquier pieza.
   - `frontend-design`: proceso de diseño y revisión visual con capturas.
   - `web-artifacts-builder`: herramientas interactivas complejas (calculadoras, quizzes).
   - `ui-ux-pro-max`: base de datos local de UX (accesibilidad, interacción, tipografía, color, pautas por stack, incluida Astro). Buscador: `python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<consulta>" --domain ux`. Sus sugerencias de estilo y paleta no reemplazan al manual de marca.
   - Del mismo paquete de UI/UX Pro Max (`.claude/skills/*/ORIGEN.md`): `banner-design` (banners y piezas para redes), `slides` (presentaciones HTML), `design-system` (tokens y componentes), `brand`, `design` y `ui-styling`. **Prioridad:** `brand-guidelines` y estas reglas mandan sobre ellas. No se usan para generar ni redibujar el logo de la CE. Las que llaman servicios de IA externos (`design`: logos e íconos) necesitan claves de API que nunca se versionan.
   - `motion` (Motion AI Kit): buenas prácticas de animación en CSS y JS, springs en CSS y revisión de rendimiento (agente `motion-reviewer`). Su servidor MCP gratuito está en `.mcp.json` (`https://mcp.motion.dev`); para usarlo, el entorno debe permitir ese dominio.
3. Verifica antes de subir:
   - `npx astro check` y `npm run build`, sin errores;
   - `npm run preview` y luego `node tests/e2e.cjs`: todas las verificaciones deben pasar;
   - revisión visual con capturas en escritorio y en móvil (`.claude/skills/frontend-design/scripts/render.cjs`).
4. Commit en español, con mensaje descriptivo, y `git push origin main`. Así lo pidió el usuario: las actualizaciones van directo a `main` una vez verificadas.
5. Si cambian páginas, regenera la vista previa (`python3 scripts/vista-previa.py`) y entrégala al usuario. El archivo no se versiona.

## Reglas de contenido

- **Datos institucionales:** no se inventan precios, fechas, cifras, testimonios, docentes, alianzas ni enlaces. Las fuentes están en `docs/contenido-oficial.md` y lo que falta, en `docs/pendientes.md`. Actualiza ese archivo cuando se resuelva algo.
- **Canal de contacto:** el WhatsApp oficial publicado es +51 902 148 893 (`src/data/sitio.ts`). No se publican números internos de campañas.
- **Sigla y textos legales:** la sigla es «CE», nunca «CCE». Evita «sello oficial», «certificado oficial» y «validez oficial» mientras la opinión legal siga pendiente.
- **Secretos:** nunca se versionan. `.env` está en `.gitignore`; usa `.env.example`.

## Recursos propios

- **Fotos:** `src/assets/fotos/`. Se optimizan al compilar con `<Image>` de `astro:assets`.
- **Videos cortos:** `public/video/`. Los largos van en YouTube o Vimeo.
- **PDF:** `public/documentos/`.
- **Logos oficiales:** `public/brand/`. No se redibujan.

## Stack

Astro 7, sitio estático. Datos en `src/data/`, páginas en `src/pages/`, componentes en `src/components/`, tokens en `src/styles/global.css`. El detalle está en `README.md`.
