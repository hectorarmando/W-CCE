// Pruebas end-to-end de la web (Playwright + Chromium). Uso: node tests/e2e.cjs [baseUrl]
// Requiere el sitio servido (npm run build && npm run preview).
const path = require("path");
const { execSync } = require("child_process");
const fs = require("fs");
let pw;
try { pw = require("playwright"); } catch { pw = require(path.join(execSync("npm root -g").toString().trim(), "playwright")); }

const BASE = process.argv[2] || "http://127.0.0.1:4321";
const OUT = process.env.CAPTURAS || path.join(__dirname, "capturas");
fs.mkdirSync(OUT, { recursive: true });
const PAGINAS = ["/", "/programas", "/programas/academia-de-importadores", "/programas/inteligencia-artificial-aplicada",
  "/programas/power-bi", "/programas/excel-completo", "/programas/analista-excel-ia", "/empresas", "/nosotros", "/comunidad", "/contacto"];
const VISTAS = [{ n: "escritorio", w: 1440, h: 900 }, { n: "tablet", w: 820, h: 1180 }, { n: "movil", w: 375, h: 812 }];

const resultados = [];
const ok = (nombre, cond, detalle = "") => { resultados.push({ nombre, ok: !!cond, detalle }); };

(async () => {
  const exe = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";
  const browser = await pw.chromium.launch(fs.existsSync(exe) ? { executablePath: exe } : {});
  const enlaces = new Set();

  for (const v of VISTAS) {
    const ctx = await browser.newContext({ viewport: { width: v.w, height: v.h } });
    for (const ruta of PAGINAS) {
      const page = await ctx.newPage();
      const errores = [];
      page.on("pageerror", (e) => errores.push(e.message));
      page.on("console", (m) => m.type() === "error" && errores.push(m.text()));
      const r = await page.goto(BASE + ruta, { waitUntil: "networkidle" });
      await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 500) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 40)); } scrollTo(0, 0); });
      await page.waitForTimeout(1600); // deja terminar la animación de entrada del hero
      const info = await page.evaluate(() => ({
        sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth,
        h1: document.querySelectorAll("h1").length,
        titulo: document.title, desc: document.querySelector('meta[name="description"]')?.content || "",
        canonical: document.querySelector('link[rel="canonical"]')?.href || "",
        og: document.querySelector('meta[property="og:image"]')?.content || "",
        imgsRotas: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
        sinAlt: [...document.images].filter((i) => !i.hasAttribute("alt")).length,
        enlaces: [...document.querySelectorAll("a[href]")].map((a) => a.getAttribute("href")),
        vacios: [...document.querySelectorAll("a[href]")].filter((a) => ["#", "", "javascript:void(0)"].includes(a.getAttribute("href"))).length,
        botonesSinNombre: [...document.querySelectorAll("button, a")].filter((b) => !(b.textContent.trim() || b.getAttribute("aria-label") || b.querySelector("img[alt]:not([alt=''])"))).length,
        inputsSinLabel: [...document.querySelectorAll("input:not([type=hidden]), select, textarea")].filter((i) => !(i.id && document.querySelector(`label[for="${i.id}"]`)) && !i.closest(".trampa")).length,
        cajasDesbordadas: [...document.querySelectorAll("main *")].filter((e) => { const b = e.getBoundingClientRect(); return b.width > 0 && b.right > document.documentElement.clientWidth + 1 && getComputedStyle(e).position !== "absolute" && !e.closest("[aria-hidden=true]") && !e.closest("svg"); }).slice(0, 3).map((e) => e.tagName + "." + e.className),
      }));
      const id = `${v.n} ${ruta}`;
      ok(`${id}: HTTP 200`, r.status() === 200, r.status());
      ok(`${id}: sin errores JS`, errores.length === 0, errores.join(" | "));
      ok(`${id}: sin scroll horizontal`, info.sw <= info.cw, `${info.sw}>${info.cw} ${info.cajasDesbordadas.join(",")}`);
      ok(`${id}: un solo h1`, info.h1 === 1, info.h1);
      ok(`${id}: imágenes cargan`, info.imgsRotas.length === 0, info.imgsRotas.join(","));
      ok(`${id}: imágenes con alt`, info.sinAlt === 0, info.sinAlt);
      ok(`${id}: sin enlaces vacíos`, info.vacios === 0, info.vacios);
      ok(`${id}: botones/enlaces con nombre accesible`, info.botonesSinNombre === 0, info.botonesSinNombre);
      ok(`${id}: campos con label`, info.inputsSinLabel === 0, info.inputsSinLabel);
      if (v.n === "escritorio") {
        ok(`${ruta}: title y description`, info.titulo.length > 10 && info.desc.length >= 70 && info.desc.length <= 170, `${info.titulo} | ${info.desc.length} car.`);
        ok(`${ruta}: canonical y og:image`, info.canonical.startsWith("https://www.camaracomercioexterior.org") && /\.(png|jpe?g)$/.test(info.og), info.canonical);
      }
      info.enlaces.forEach((h) => enlaces.add(h));
      await page.screenshot({ path: path.join(OUT, `${v.n}${ruta === "/" ? "_inicio" : ruta.replace(/\//g, "_")}.png`), fullPage: true });
      await page.close();
    }
    await ctx.close();
  }

  // Enlaces internos y externos
  const ctxL = await browser.newContext();
  for (const h of [...enlaces]) {
    if (h.startsWith("/") ) {
      const url = BASE + h.split("#")[0];
      const r = await ctxL.request.get(url);
      ok(`enlace interno ${h}`, r.status() === 200, r.status());
    } else if (h.startsWith("#")) {
      // anclas: se validan en la página que las contiene
    } else {
      ok(`enlace externo permitido ${h.slice(0, 60)}`, /^https:\/\/wa\.me\/51902148893\?text=/.test(h), "solo se permite el WhatsApp oficial");
    }
  }

  // Interacciones
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  let page = await ctx.newPage();
  await page.goto(BASE + "/");
  await page.click("[data-desplegable]");
  ok("desplegable Programas abre", await page.isVisible("#menu-programas"));
  await page.keyboard.press("Escape");
  ok("desplegable cierra con Escape", !(await page.isVisible("#menu-programas")));

  await page.goto(BASE + "/programas?area=ia");
  const visiblesIA = await page.$$eval("[data-lista] > li", (l) => l.filter((x) => !x.hidden).length);
  ok("filtro por URL (?area=ia)", visiblesIA === 3, visiblesIA);
  await page.click('[data-filtros] button[data-area="datos"]');
  const visiblesDatos = await page.$$eval("[data-lista] > li", (l) => l.filter((x) => !x.hidden).map((x) => x.dataset.area));
  ok("filtro por botón (datos)", visiblesDatos.length > 0 && visiblesDatos.every((a) => a === "datos"), visiblesDatos.length);
  ok("filtro actualiza la URL", page.url().includes("area=datos"), page.url());
  await page.click('[data-filtros] button[data-area="todas"]');
  ok("filtro Todas restablece", (await page.$$eval("[data-lista] > li", (l) => l.filter((x) => !x.hidden).length)) === 23);

  // Formulario: validación
  await page.goto(BASE + "/contacto?programa=power-bi");
  ok("preselección desde ficha (?programa=)", (await page.$eval('select[name="interes"]', (s) => s.value)) === "Power BI 8 en 1");
  await page.click("[data-enviar]");
  const errs = await page.$$eval(".campo__error:not([hidden])", (e) => e.length);
  ok("validación muestra errores", errs >= 4, errs);
  ok("foco va al primer error", (await page.evaluate(() => document.activeElement?.getAttribute("name"))) === "nombre");

  // Formulario: envío por WhatsApp (sin endpoint)
  await page.addInitScript(() => {});
  await page.evaluate(() => { window.__abiertas = []; window.open = (u) => { window.__abiertas.push(u); return null; }; });
  await page.fill('input[name="nombre"]', "Ana Pérez");
  await page.fill('input[name="correo"]', "ana@empresa.com");
  await page.fill('input[name="telefono"]', "+51 987 654 321");
  await page.check('input[name="acepto"]');
  await page.click("[data-enviar]");
  const abierta = await page.evaluate(() => window.__abiertas[0] || "");
  ok("envío abre WhatsApp oficial con el mensaje", abierta.startsWith("https://wa.me/51902148893?text=") && decodeURIComponent(abierta).includes("Ana Pérez") && decodeURIComponent(abierta).includes("Power BI"), abierta.slice(0, 80));
  ok("muestra estado de éxito", await page.isVisible('[data-estado][data-tipo="ok"]'));

  // Formulario: campo trampa (bot) no envía
  await page.reload();
  await page.evaluate(() => { window.__abiertas = []; window.open = (u) => { window.__abiertas.push(u); return null; }; });
  await page.fill('input[name="nombre"]', "Bot");
  await page.fill('input[name="correo"]', "bot@x.com");
  await page.fill('input[name="telefono"]', "999999999");
  await page.selectOption('select[name="interes"]', { index: 1 });
  await page.check('input[name="acepto"]');
  await page.evaluate(() => { document.querySelector('input[name="web"]').value = "spam"; });
  await page.click("[data-enviar]");
  ok("honeypot bloquea bots", (await page.evaluate(() => window.__abiertas.length)) === 0);

  // Formulario de empresa
  await page.goto(BASE + "/empresas");
  await page.click("[data-enviar]");
  ok("empresa: valida empresa y personas", (await page.$$eval(".campo__error:not([hidden])", (e) => e.map((x) => x.id))).some((i) => i.includes("empresa")));

  // Menú móvil
  const movil = await browser.newContext({ viewport: { width: 375, height: 812 } });
  page = await movil.newPage();
  await page.goto(BASE + "/");
  ok("menú móvil oculto al inicio", !(await page.isVisible("#menu-movil")));
  await page.click("[data-menu-movil]");
  ok("menú móvil abre", await page.isVisible("#menu-movil"));
  ok("menú móvil aria-expanded", (await page.getAttribute("[data-menu-movil]", "aria-expanded")) === "true");
  await page.click('#menu-movil a[href="/nosotros"]');
  await page.waitForURL("**/nosotros");
  ok("menú móvil navega", page.url().endsWith("/nosotros"));

  // Rueda de la comunidad (isla React): se hidrata, gira con el teclado y no atrapa la página
  page = await ctx.newPage();
  await page.goto(BASE + "/comunidad");
  const rueda = page.locator('.rueda [role="listbox"]');
  await rueda.scrollIntoViewIfNeeded();
  await page.waitForFunction(() => document.querySelectorAll('.rueda [role="option"] img').length > 0, null, { timeout: 8000 }).catch(() => {});
  ok("rueda: muestra las 10 fotos", (await page.locator('.rueda [role="option"]').count()) === 10);
  const imgsOk = await page.$$eval('.rueda [role="option"] img', (l) => l.every((i) => i.complete && i.naturalWidth > 0));
  ok("rueda: las fotos cargan", imgsOk);
  await rueda.focus();
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.waitForTimeout(900);
  const activa = await page.getAttribute('.rueda [role="listbox"]', "aria-activedescendant");
  ok("rueda: las flechas cambian la foto activa", activa === "works-wheel-1", activa);
  await page.click('ol button:has-text("Entrega de kits")');
  await page.waitForTimeout(1200);
  ok("rueda: el índice lleva a la foto", (await page.getAttribute('.rueda [role="listbox"]', "aria-activedescendant")) === "works-wheel-3");

  // Lluvia de datos en Empresas: se monta en pantalla y se desmonta al salir (no consume CPU fuera de vista)
  page = await ctx.newPage();
  await page.goto(BASE + "/empresas");
  await page.waitForSelector(".empresas-hero canvas.dr-main", { timeout: 8000 }).catch(() => {});
  ok("lluvia: lienzo montado en la banda", (await page.locator(".empresas-hero canvas").count()) === 2);
  await page.evaluate(() => scrollTo(0, document.body.scrollHeight));
  await page.waitForTimeout(600);
  ok("lluvia: se desmonta fuera de vista", (await page.locator(".empresas-hero canvas").count()) === 0);

  // Buscador de la cabecera: resultados al escribir, flechas y Enter llevan a la ficha
  page = await ctx.newPage();
  await page.goto(BASE + "/");
  await page.fill("#buscar-cabecera", "power");
  const resultadosBusqueda = await page.$$eval("#buscar-cabecera-lista li", (l) => l.map((x) => x.textContent));
  ok("buscador: encuentra Power BI", resultadosBusqueda.some((t) => t.includes("Power BI")), resultadosBusqueda.join(" | "));
  ok("buscador: aria-expanded", (await page.getAttribute("#buscar-cabecera", "aria-expanded")) === "true");
  await page.keyboard.press("ArrowDown");
  await Promise.all([page.waitForURL(/power-bi/), page.keyboard.press("Enter")]);
  ok("buscador: Enter abre la ficha", page.url().includes("/programas/power-bi"), page.url());
  await page.goto(BASE + "/");
  await page.fill("#buscar-cabecera", "xyzxyz");
  ok("buscador: sin resultados ofrece asesor", (await page.textContent("#buscar-cabecera-lista")).includes("asesor"));
  await page.keyboard.press("Escape");
  ok("buscador: Escape cierra", (await page.getAttribute("#buscar-cabecera", "aria-expanded")) === "false");
  // Pestañas de cursos
  await page.click('[data-pestanas] button[data-area="ingenieria"]');
  const visiblesCursos = await page.$$eval('[data-carrusel="cursos"] > li', (l) => l.filter((x) => !x.hidden).map((x) => x.dataset.area));
  ok("pestañas: filtran cursos por área", visiblesCursos.length > 0 && visiblesCursos.every((a) => a === "ingenieria"), visiblesCursos.length);

  // Precios por país: detección por zona horaria, selector, mensaje de WhatsApp y formato de moneda
  const ctxCo = await browser.newContext({ viewport: { width: 1440, height: 900 }, timezoneId: "America/Bogota", locale: "es-CO" });
  page = await ctxCo.newPage();
  await page.goto(BASE + "/");
  ok("país: detecta Colombia por zona horaria", (await page.getAttribute("html", "data-pais")) === "CO");
  ok("país: el botón muestra COP", (await page.textContent("[data-pais-moneda]")) === "COP");
  await page.click("[data-pais-boton]");
  ok("país: el panel se abre", await page.isVisible("[data-pais-panel]"));
  await page.click('[data-pais-panel] [data-pais="MX"]');
  ok("país: el panel se cierra al elegir", !(await page.isVisible("[data-pais-panel]")));
  ok("país: cambia a México", (await page.getAttribute("html", "data-pais")) === "MX");
  const wa = await page.getAttribute(".senal-fija", "href");
  ok("país: WhatsApp indica el país", decodeURIComponent(wa).includes("Escribo desde México"), wa);
  await page.reload();
  ok("país: la elección se recuerda", (await page.getAttribute("html", "data-pais")) === "MX");
  ok("país: sin precios cargados se mantiene el respaldo", (await page.goto(BASE + "/programas/power-bi"), (await page.textContent(".datos__inversion [data-precio]")).includes("asesor")));
  // Formato con precios de EJEMPLO inyectados solo en la prueba (no existen en el sitio)
  await page.route("**/programas/power-bi*", async (route) => {
    const r = await route.fetch();
    const html = (await r.text()).replace(/("precios":)\{\}/, '$1{"power-bi":{"MX":{"precio":1999,"antes":2999},"PE":{"precio":449}}}');
    await route.fulfill({ response: r, body: html });
  });
  await page.goto(BASE + "/programas/power-bi");
  const precioMx = (await page.textContent(".datos__inversion [data-precio]")).trim();
  ok("precio: formato México ($ 1,999 MXN y tachado)", precioMx.startsWith("$ 1,999 MXN") && precioMx.includes("2,999"), precioMx);
  await page.evaluate(() => localStorage.setItem("ce-pais", "PE"));
  await page.reload();
  ok("precio: formato Perú (S/ 449)", (await page.textContent(".datos__inversion [data-precio]")).trim() === "S/ 449");
  await ctxCo.close();

  // Teclado: enlace para saltar al contenido
  page = await ctx.newPage();
  await page.goto(BASE + "/");
  await page.keyboard.press("Tab");
  ok("primer Tab enfoca 'Saltar al contenido'", (await page.evaluate(() => document.activeElement?.textContent?.trim())) === "Saltar al contenido");

  await browser.close();
  const fallas = resultados.filter((r) => !r.ok);
  fs.writeFileSync(path.join(OUT, "resultados.json"), JSON.stringify(resultados, null, 2));
  console.log(`${resultados.length - fallas.length}/${resultados.length} verificaciones OK`);
  fallas.forEach((f) => console.log("FALLA:", f.nombre, "→", f.detalle));
  process.exit(fallas.length ? 1 : 0);
})();
