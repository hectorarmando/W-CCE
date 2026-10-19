---
name: web-artifacts-builder
description: Construye aplicaciones web interactivas complejas (React + TypeScript + Tailwind, con estado, varias vistas, gráficos, componentes UI) y las empaqueta en un único archivo HTML autocontenido para publicar como artifact o compartir. Usa este skill cuando el pedido necesite más que una página estática — calculadoras, simuladores, cotizadores, dashboards con filtros, cuestionarios/quizzes, herramientas con pestañas o pasos, mini-juegos, CRUD con estado — o cuando el usuario mencione React, shadcn, componentes, "app", "herramienta" o "artifact interactivo". Para una landing o pieza simple de un solo archivo basta frontend-design.
---

# Web Artifacts Builder

Para apps interactivas con varios componentes, escribir todo en un solo `.html` a mano se vuelve frágil: CSS gigante, estado enredado, sin tipos. Este skill da un proyecto real (Vite + React 18 + TypeScript + Tailwind v4) y un empaquetador que lo convierte en **un solo archivo HTML** con todo embebido, listo para publicar como artifact, enviar por correo o abrir sin servidor.

**Cuándo NO usarlo:** landing pages, banners, emails o piezas estáticas sencillas → escríbelas directo en HTML (skill `frontend-design`). El paso de build agrega ~1 minuto; solo vale la pena si hay lógica e interactividad reales.

## Flujo

### 1. Inicializar

```bash
bash <ruta-del-skill>/scripts/init-artifact.sh <nombre-proyecto> <directorio-padre>
```

Usa el scratchpad (o el directorio que indique el usuario) como directorio padre. Crea el proyecto e instala dependencias (~30–60 s). Incluye:

- React 18, TypeScript, Tailwind v4 (configurado vía `@theme` en `src/index.css`), alias `@/` → `src/`
- Componentes base estilo shadcn en `src/components/ui/`: `button` (variantes default/accent/outline/ghost/link), `card`, `input`, `label`, `badge`; utilidad `cn()` en `src/lib/utils.ts`
- Librerías: `lucide-react` (íconos), `recharts` (gráficos), `motion` (animaciones, `import { motion } from "motion/react"`), `class-variance-authority`, `clsx`, `tailwind-merge`

Si necesitas otro componente (tabs, dialog, select, slider, accordion, toast…), escríbelo tú en `src/components/ui/` siguiendo el mismo patrón (`cn`, variantes con `cva`, tokens del tema). No dependas de `npx shadcn add`: el registro remoto puede no estar accesible. Para otras librerías npm, `npm install <paquete>@<versión>` dentro del proyecto funciona normalmente.

### 2. Diseñar los tokens

Antes de escribir componentes, define la dirección estética y edita el bloque `@theme` de `src/index.css`: fuentes (añade un `@import url("https://fonts.googleapis.com/css2?...")` al inicio del archivo, **antes** de `@import "tailwindcss"`), paleta y radio. Los nombres `--color-primary`, `--color-accent`, etc. generan clases (`bg-primary`, `text-accent`, `border-border`…) que ya usan los componentes base, así que cambiar los tokens restyla todo de una vez.

Si la app es para la Cámara de Comercio Exterior (CE) o sus cursos, carga el skill `brand-guidelines` y usa sus colores, tipografía y logo (copia el SVG del logo en `src/` e impórtalo). Aplica los mismos principios de diseño que en frontend-design: tipografía con carácter (no Inter/Roboto por defecto), paleta con una dominante y un acento fuerte, composición con intención, un detalle memorable. Los componentes base son un punto de partida neutro, no el diseño final: personalízalos para que el artifact no parezca una plantilla shadcn genérica.

### 3. Construir

- `src/App.tsx` es la raíz. Divide en componentes por responsabilidad (`src/components/…`), con la lógica pura (cálculos, validaciones, datos de ejemplo) en `src/lib/` para mantener los componentes legibles.
- Estado con hooks (`useState`, `useReducer` para flujos de varios pasos, `useMemo` para cálculos derivados). Nada de backend: si hay que "guardar", usa estado en memoria; `localStorage` solo envuelto en `try/catch` y como comodidad, porque puede no estar disponible.
- Imágenes: importa archivos locales (`import logo from "./logo.svg"`) y se embeben automáticamente; prefiere SVG inline. No enlaces a imágenes externas sin fallback.
- Responsive desde 360 px, accesible (labels, foco visible, botones reales, `aria-*` en controles personalizados), y textos realistas en el idioma del pedido.

### 4. Empaquetar

```bash
bash <ruta-del-skill>/scripts/bundle-artifact.sh <directorio-proyecto> <ruta-salida.html>
```

Ejecuta el chequeo de tipos (`tsc`) y `vite build` con `vite-plugin-singlefile`. Si falla, corrige los errores de TypeScript que reporta y vuelve a correrlo; no desactives el chequeo. El resultado es un HTML autocontenido (típicamente 150–600 KB).

### 5. Verificar y entregar

- **Mira la app funcionando.** En este entorno hay Chromium (no intentes descargarlo):
  ```bash
  node <ruta-del-skill>/scripts/render.cjs <salida>.html movil.png --width 375 --height 800 --scale 1 --full
  node <ruta-del-skill>/scripts/render.cjs <salida>.html escritorio.png --width 1366 --height 900 --scale 1 --full
  ```
  Si el script no encuentra Playwright, antepón `NODE_PATH=$(npm root -g)`. El script avisa si hay errores de JavaScript o scroll horizontal. Abre los PNG y revisa la composición. Para probar los clics y el flujo (responder un quiz, calcular), escribe un script corto con Playwright (`require(require("child_process").execSync("npm root -g").toString().trim() + "/playwright")`, con `executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome"`), y verifica también los cálculos con un caso conocido.
- Entrega el archivo `.html` empaquetado (publícalo como artifact si la herramienta está disponible y corresponde). El proyecto fuente queda en el directorio para iteraciones posteriores: para cambios, edita el código y vuelve a empaquetar, no edites el bundle.
- Resume en 2–4 líneas qué hace la app y la dirección visual elegida.
