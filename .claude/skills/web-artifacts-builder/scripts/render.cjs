#!/usr/bin/env node
// Renderiza un HTML a PNG o PDF con Chromium (Playwright).
// Uso: node render.cjs <entrada.html | http://url> <salida.png|salida.pdf> --width 1080 --height 1350 [--scale 2] [--wait 800] [--full]
// --full: captura la página completa (landings); sin él, captura exactamente el lienzo WxH (posts, banners).
// El tamaño debe coincidir con el lienzo declarado en el HTML. Para PDF, width/height se usan como tamaño de página en px.
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");

function loadPlaywright() {
  try { return require("playwright"); } catch {}
  const root = execSync("npm root -g").toString().trim();
  return require(path.join(root, "playwright"));
}

const args = process.argv.slice(2);
const opt = (k, d) => { const i = args.indexOf("--" + k); return i >= 0 ? args[i + 1] : d; };
const flags = ["--full"];
const [input, output] = args.filter((a, i) => !a.startsWith("--") && !((args[i - 1] || "").startsWith("--") && !flags.includes(args[i - 1])));
if (!input || !output) {
  console.error("Uso: node render.cjs <entrada.html> <salida.png|.pdf> --width W --height H [--scale 2] [--wait ms]");
  process.exit(1);
}
const width = +opt("width", 1080), height = +opt("height", 1080);
const scale = +opt("scale", 2), wait = +opt("wait", 800), full = args.includes("--full");

(async () => {
  const { chromium } = loadPlaywright();
  const exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
  const browser = await chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  const page = await browser.newPage({ viewport: { width, height }, deviceScaleFactor: scale });
  const errors = [];
  page.on("pageerror", e => errors.push(e.message));
  const [file, query] = input.split("?");
  const destino = /^https?:\/\//.test(input) ? input : "file://" + path.resolve(file) + (query ? "?" + query : "");
  await page.goto(destino, { waitUntil: "networkidle", timeout: 60000 });
  await page.evaluate(() => document.fonts && document.fonts.ready);
  if (full) {
    // Recorre la página para disparar imágenes con loading="lazy" y animaciones al hacer scroll
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
      window.scrollTo(0, 0);
    });
  }
  await page.waitForTimeout(wait);
  const overflow = await page.evaluate(([w, h, full]) => {
    const d = document.documentElement;
    if (full) return d.scrollWidth > w + 1 ? `${d.scrollWidth}px de ancho (scroll horizontal)` : null;
    return d.scrollWidth > w + 1 || d.scrollHeight > h + 1 ? `${d.scrollWidth}x${d.scrollHeight}` : null;
  }, [width, height, full]);
  if (output.toLowerCase().endsWith(".pdf")) {
    await page.pdf({ path: output, width: width + "px", height: height + "px", printBackground: true, pageRanges: "1" });
  } else {
    await page.screenshot(full ? { path: output, fullPage: true } : { path: output, clip: { x: 0, y: 0, width, height } });
  }
  await browser.close();
  if (overflow) console.warn(full ? `Aviso: ${overflow} a ${width}px; revisa elementos que se salen.` : `Aviso: el contenido mide ${overflow}, más que el lienzo ${width}x${height}; algo queda recortado.`);
  if (errors.length) console.warn("Errores JS:", errors.join(" | "));
  console.log(`OK ${output} (${width}x${height} @${scale}x)`);
})().catch(e => { console.error(e.message); process.exit(1); });
