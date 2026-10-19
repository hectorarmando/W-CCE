#!/usr/bin/env python3
"""Genera vista-previa.html: todo el sitio compilado (dist/) en un único archivo navegable,
con selector de página y de dispositivo. Útil para revisión institucional sin servidor.
Uso: npm run build && python3 scripts/vista-previa.py
"""
import base64, json, pathlib, re

RAIZ = pathlib.Path(__file__).resolve().parent.parent
DIST = RAIZ / "dist"
PAGINAS = {
    "/": "index.html", "/programas": "programas.html",
    "/programas/academia-de-importadores": "programas/academia-de-importadores.html",
    "/programas/inteligencia-artificial-aplicada": "programas/inteligencia-artificial-aplicada.html",
    "/programas/power-bi": "programas/power-bi.html", "/programas/excel-completo": "programas/excel-completo.html",
    "/programas/analista-excel-ia": "programas/analista-excel-ia.html",
    "/empresas": "empresas.html", "/nosotros": "nosotros.html", "/contacto": "contacto.html", "/404": "404.html",
}
recursos = {}

def recurso(ruta: str) -> str:
    """Registra un archivo de dist/ y devuelve su marcador; el navegador lo convierte en blob: URL."""
    ruta = ruta.lstrip("/")
    if ruta not in recursos:
        datos = (DIST / ruta).read_bytes()
        mime = {"svg": "image/svg+xml", "woff2": "font/woff2", "png": "image/png"}[ruta.rsplit(".", 1)[1]]
        recursos[ruta] = {"mime": mime, "b64": base64.b64encode(datos).decode()}
    return f"__R:{ruta}__"

def css(ruta: str) -> str:
    texto = (DIST / ruta.lstrip("/")).read_text(encoding="utf-8")
    # Solo alfabetos latinos (el sitio está en español): se omiten cirílico y vietnamita
    texto = re.sub(r"@font-face\{[^}]*(cyrillic|vietnamese)[^}]*\}", "", texto)
    return re.sub(r"url\((/_astro/[^)]+\.woff2)\)", lambda m: f"url({recurso(m.group(1))})", texto)

paginas = {}
for ruta, archivo in PAGINAS.items():
    html = (DIST / archivo).read_text(encoding="utf-8")
    html = re.sub(r'<link rel="(icon|apple-touch-icon|sitemap|manifest|canonical)"[^>]*>', "", html)
    html = re.sub(r'<link rel="stylesheet" href="([^"]+)"[^>]*>', lambda m: f"<style>{css(m.group(1))}</style>", html)
    html = re.sub(r'src="(/brand/[^"]+)"', lambda m: f'src="{recurso(m.group(1))}"', html)
    paginas[ruta] = html

plantilla = r"""<!doctype html>
<html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Vista previa · Web Cámara de Comercio Exterior</title>
<style>
  :root { --bg:#ececec; --barra:#000; --txt:#fff; --acento:#ffc300; }
  * { box-sizing: border-box; }
  html, body { margin: 0; height: 100%; background: var(--bg); font: 14px/1.4 system-ui, -apple-system, "Segoe UI", sans-serif; }
  .barra { position: sticky; top: 0; z-index: 2; display: flex; flex-wrap: wrap; gap: 8px 16px; align-items: center; padding: 10px 16px; background: var(--barra); color: var(--txt); }
  .barra b { font-weight: 700; margin-right: auto; }
  .barra b span { color: var(--acento); }
  select, button { font: inherit; border-radius: 999px; border: 1px solid #444; background: #111; color: #fff; padding: 6px 12px; cursor: pointer; }
  select:focus-visible, button:focus-visible { outline: 2px solid var(--acento); outline-offset: 2px; }
  .disp { display: inline-flex; gap: 4px; }
  .disp button[aria-pressed="true"] { background: var(--acento); color: #000; border-color: var(--acento); font-weight: 700; }
  .escena { display: grid; justify-items: center; padding: 16px; }
  iframe { width: 100%; max-width: var(--ancho, 100%); height: calc(100vh - 90px); border: 0; background: #fff; box-shadow: 0 10px 40px -20px rgba(0,0,0,.35); border-radius: 6px; transition: max-width .3s ease; }
</style></head>
<body>
  <div class="barra">
    <b>Vista previa <span>·</span> Cámara de Comercio Exterior</b>
    <label>Página <select id="pagina"></select></label>
    <div class="disp" role="group" aria-label="Dispositivo">
      <button type="button" data-ancho="100%" aria-pressed="true">Escritorio</button>
      <button type="button" data-ancho="820px" aria-pressed="false">Tablet</button>
      <button type="button" data-ancho="390px" aria-pressed="false">Móvil</button>
    </div>
  </div>
  <div class="escena"><iframe id="marco" title="Página del sitio"></iframe></div>
<script>
const PAGINAS = __PAGINAS__;
const RECURSOS = __RECURSOS__;
const NOMBRES = {"/":"Inicio","/programas":"Programas y cursos","/programas/academia-de-importadores":"Ficha · Academia de Importadores","/programas/inteligencia-artificial-aplicada":"Ficha · IA Aplicada","/programas/power-bi":"Ficha · Power BI","/programas/excel-completo":"Ficha · Excel","/programas/analista-excel-ia":"Ficha · Analista Excel + IA","/empresas":"Empresas","/nosotros":"Nosotros","/contacto":"Contacto","/404":"Página 404"};
const urls = {};
for (const [ruta, r] of Object.entries(RECURSOS)) {
  // Las fuentes van como data: (un blob de otro origen no pasa la política CORS de @font-face)
  if (r.mime.startsWith("font/")) { urls[ruta] = `data:${r.mime};base64,${r.b64}`; continue; }
  const bytes = Uint8Array.from(atob(r.b64), c => c.charCodeAt(0));
  urls[ruta] = URL.createObjectURL(new Blob([bytes], { type: r.mime }));
}
const resolver = html => html.replace(/__R:([A-Za-z0-9_.\/-]+?\.(?:svg|woff2|png))__/g, (_, r) => urls[r] || "");
const marco = document.getElementById("marco");
const selector = document.getElementById("pagina");
for (const ruta of Object.keys(PAGINAS)) selector.add(new Option(NOMBRES[ruta] || ruta, ruta));

function ir(destino) {
  const url = new URL(destino, "https://vista.local");
  let ruta = url.pathname.replace(/\.html$/, "");
  if (!PAGINAS[ruta]) ruta = "/404";
  selector.value = ruta;
  marco.onload = () => {
    const doc = marco.contentDocument;
    // Reproduce los parámetros de la URL que usan las páginas (?area= y ?programa=)
    const area = url.searchParams.get("area");
    if (area) doc.querySelector(`[data-filtros] button[data-area="${area}"]`)?.click();
    const prog = url.searchParams.get("programa");
    if (prog) { const o = doc.querySelector(`option[data-slug="${prog}"]`); if (o) o.selected = true; }
    if (url.hash) doc.querySelector(url.hash)?.scrollIntoView();
    // Navegación interna entre páginas de la vista previa
    doc.addEventListener("click", e => {
      const a = e.target.closest("a[href]");
      if (!a) return;
      const href = a.getAttribute("href");
      if (href.startsWith("/")) { e.preventDefault(); ir(href); }
      else if (href.startsWith("#") && href.length > 1) { e.preventDefault(); doc.querySelector(href)?.scrollIntoView({ behavior: "smooth" }); }
    });
  };
  marco.srcdoc = resolver(PAGINAS[ruta]);
}
selector.addEventListener("change", () => ir(selector.value));
document.querySelectorAll(".disp button").forEach(b => b.addEventListener("click", () => {
  document.querySelectorAll(".disp button").forEach(x => x.setAttribute("aria-pressed", String(x === b)));
  marco.style.setProperty("--ancho", b.dataset.ancho);
}));
ir("/");
</script>
</body></html>"""

salida = plantilla.replace("__PAGINAS__", json.dumps(paginas, ensure_ascii=False).replace("</", "<\\/")) \
                  .replace("__RECURSOS__", json.dumps(recursos))
destino = RAIZ / "vista-previa.html"
destino.write_text(salida, encoding="utf-8")
print(f"OK {destino} ({destino.stat().st_size // 1024} KB, {len(paginas)} páginas, {len(recursos)} recursos)")
