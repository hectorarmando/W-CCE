#!/usr/bin/env bash
# Compila el proyecto y deja un único archivo HTML autocontenido (JS, CSS y assets embebidos).
# Uso: bash bundle-artifact.sh <directorio-proyecto> [ruta-salida.html]
set -euo pipefail

DIR="${1:?Uso: bundle-artifact.sh <directorio-proyecto> [ruta-salida.html]}"
OUT="${2:-$DIR/bundle.html}"

cd "$DIR"
npx tsc --noEmit
npx vite build --logLevel warn
cd - > /dev/null
cp "$DIR/dist/index.html" "$OUT"

if grep -qE '<script[^>]+src="[^"h]' "$OUT" || grep -qE '<link[^>]+href="/(assets|src)' "$OUT"; then
  echo "Aviso: el HTML aún referencia archivos locales; revisa imports de assets." >&2
fi
echo "Bundle: $OUT ($(du -h "$OUT" | cut -f1))"
