#!/usr/bin/env bash
# Crea un proyecto React + TypeScript + Tailwind v4 listo para empaquetarse en un solo HTML.
# Uso: bash init-artifact.sh <nombre-proyecto> [directorio-padre]
set -euo pipefail

SKILL_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"

NAME="${1:?Uso: init-artifact.sh <nombre-proyecto> [directorio-padre]}"
PARENT="${2:-.}"
DIR="$PARENT/$NAME"

if [ -e "$DIR" ]; then
  echo "Error: $DIR ya existe" >&2
  exit 1
fi

mkdir -p "$DIR/src/components/ui" "$DIR/src/lib"
cd "$DIR"

cat > package.json <<JSON
{
  "name": "$NAME",
  "private": true,
  "version": "0.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc --noEmit && vite build",
    "typecheck": "tsc --noEmit"
  }
}
JSON

cat > vite.config.ts <<'TS'
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteSingleFile } from "vite-plugin-singlefile";
import path from "node:path";

export default defineConfig({
  plugins: [react(), tailwindcss(), viteSingleFile()],
  resolve: { alias: { "@": path.resolve(__dirname, "src") } },
  build: { assetsInlineLimit: 100_000_000, cssCodeSplit: false },
});
TS

cat > tsconfig.json <<'JSON'
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "bundler",
    "jsx": "react-jsx",
    "strict": true,
    "noUnusedLocals": false,
    "skipLibCheck": true,
    "isolatedModules": true,
    "resolveJsonModule": true,
    "types": ["vite/client", "node"],
    "baseUrl": ".",
    "paths": { "@/*": ["src/*"] }
  },
  "include": ["src", "vite.config.ts"]
}
JSON

cat > components.json <<'JSON'
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "new-york",
  "rsc": false,
  "tsx": true,
  "tailwind": { "config": "", "css": "src/index.css", "baseColor": "neutral", "cssVariables": true },
  "aliases": { "components": "@/components", "utils": "@/lib/utils", "ui": "@/components/ui", "lib": "@/lib", "hooks": "@/hooks" },
  "iconLibrary": "lucide"
}
JSON

cat > index.html <<HTML
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>$NAME</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
HTML

cat > src/main.tsx <<'TSX'
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
TSX

cat > src/index.css <<'CSS'
@import "tailwindcss";

/* Tokens de diseño: cámbialos según la dirección estética del artifact. */
@theme {
  --font-display: "Georgia", serif;
  --font-sans: system-ui, sans-serif;
  --color-background: #fafaf9;
  --color-foreground: #1c1917;
  --color-muted: #e7e5e4;
  --color-muted-foreground: #57534e;
  --color-primary: #1c1917;
  --color-primary-foreground: #fafaf9;
  --color-accent: #ea580c;
  --color-border: #d6d3d1;
  --color-ring: #ea580c;
  --radius-lg: 0.75rem;
}

body {
  background: var(--color-background);
  color: var(--color-foreground);
  font-family: var(--font-sans);
}
CSS

cat > src/lib/utils.ts <<'TS'
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
TS

cat > src/App.tsx <<'TSX'
export default function App() {
  return (
    <main className="min-h-screen grid place-items-center p-8">
      <h1 className="font-display text-5xl">Artifact listo</h1>
    </main>
  );
}
TSX

cp "$SKILL_DIR"/assets/ui/*.tsx src/components/ui/

npm install --silent --no-audit --no-fund \
  react@18.3.1 react-dom@18.3.1 \
  lucide-react@0.511.0 clsx@2.1.1 tailwind-merge@3.3.0 class-variance-authority@0.7.1 \
  recharts@2.15.3 motion@12.15.0
npm install --silent --no-audit --no-fund -D \
  vite@6.3.5 @vitejs/plugin-react@4.5.0 vite-plugin-singlefile@2.2.0 \
  tailwindcss@4.1.8 @tailwindcss/vite@4.1.8 \
  typescript@5.8.3 @types/react@18.3.23 @types/react-dom@18.3.7 @types/node@22.15.29

echo "Proyecto creado en $DIR"
echo "Edita src/App.tsx y src/index.css; luego empaqueta con bundle-artifact.sh"
