// Precios por país: detecta la ubicación, la deja cambiar con el selector y muestra cada precio en su moneda.
// Orden de detección: elección guardada → país indicado por el servidor (<html data-pais-servidor>, si el hosting
// lo agrega) → zona horaria del navegador → región del idioma → «Otro país» (US$). No usa servicios externos.
type Codigo = "PE" | "EC" | "CR" | "CO" | "MX" | "PA" | "AR" | "OT";
interface Pais { codigo: Codigo; nombre: string; moneda: string; simbolo: string; sufijo?: string; locale: string; decimales: number; zonas: string[] }
interface PrecioPais { precio: number; antes?: number }

const CLAVE = "ce-pais";
const datos = JSON.parse(document.getElementById("datos-precios")?.textContent ?? '{"paises":[],"precios":{}}') as {
  paises: Pais[]; precios: Record<string, Partial<Record<Codigo, PrecioPais>>>;
};
const porCodigo = new Map(datos.paises.map((p) => [p.codigo, p]));

const leerGuardado = (): Codigo | null => {
  try { const v = localStorage.getItem(CLAVE) as Codigo | null; return v && porCodigo.has(v) ? v : null; } catch { return null; }
};
const guardar = (c: Codigo) => { try { localStorage.setItem(CLAVE, c); } catch { /* navegación privada */ } };

function detectar(): Codigo {
  const servidor = document.documentElement.dataset.paisServidor as Codigo | undefined;
  if (servidor && porCodigo.has(servidor)) return servidor;
  const zona = Intl.DateTimeFormat().resolvedOptions().timeZone ?? "";
  const porZona = datos.paises.find((p) => p.zonas.some((z) => (z.endsWith("/") ? zona.startsWith(z) : zona === z)));
  if (porZona) return porZona.codigo;
  for (const idioma of navigator.languages ?? [navigator.language]) {
    const region = idioma.split("-")[1]?.toUpperCase() as Codigo | undefined;
    if (region && porCodigo.has(region) && region !== "OT") return region;
  }
  return "OT";
}

/** «S/ 1,290», «US$ 199», «$ 450.000 COP» */
function formatear(monto: number, p: Pais): string {
  const numero = new Intl.NumberFormat(p.locale, { minimumFractionDigits: p.decimales, maximumFractionDigits: p.decimales }).format(monto);
  return `${p.simbolo} ${numero}${p.sufijo ? ` ${p.sufijo}` : ""}`;
}

function aplicar(codigo: Codigo) {
  const pais = porCodigo.get(codigo) ?? porCodigo.get("OT")!;
  document.documentElement.dataset.pais = pais.codigo;

  // Botón de la cabecera y panel
  document.querySelectorAll<SVGUseElement>("[data-pais-bandera]").forEach((u) => u.setAttribute("href", `#bandera-${pais.codigo}`));
  document.querySelectorAll<HTMLElement>("[data-pais-moneda]").forEach((m) => { m.textContent = pais.moneda; });
  document.querySelectorAll<HTMLElement>("[data-pais-boton]").forEach((b) => b.setAttribute("aria-label", `${pais.moneda}, ${pais.nombre}: cambiar país de tu ubicación`));
  document.querySelectorAll<HTMLElement>("[data-pais-panel] [data-pais]").forEach((b) => b.setAttribute("aria-pressed", String(b.dataset.pais === pais.codigo)));

  // Precios
  document.querySelectorAll<HTMLElement>("[data-precio]").forEach((el) => {
    const p = datos.precios[el.dataset.precio ?? ""]?.[pais.codigo];
    el.classList.toggle("precio--con", !!p);
    if (!p) { el.textContent = el.dataset.respaldo ?? ""; return; }
    el.replaceChildren();
    const actual = document.createElement("strong");
    actual.textContent = formatear(p.precio, pais);
    el.append(actual);
    if (p.antes && p.antes > p.precio) {
      const antes = document.createElement("s");
      antes.textContent = formatear(p.antes, pais);
      antes.setAttribute("aria-label", `Antes ${formatear(p.antes, pais)}`);
      el.append(" ", antes);
    }
  });

  // Mensajes de WhatsApp: el asesor sabe desde qué país escribe la persona
  document.querySelectorAll<HTMLAnchorElement>('a[href^="https://wa.me/"]').forEach((a) => {
    const url = new URL(a.href);
    const base = a.dataset.mensajeBase ?? url.searchParams.get("text") ?? "";
    a.dataset.mensajeBase = base;
    const texto = pais.codigo === "OT" ? base : `${base} (Escribo desde ${pais.nombre}.)`;
    // encodeURIComponent (espacios como %20, igual que enlaceWhatsapp) en lugar de «+»
    a.href = `${url.origin}${url.pathname}?text=${encodeURIComponent(texto)}`;
  });

  document.dispatchEvent(new CustomEvent("ce:pais", { detail: pais }));
}

function iniciarPrecios() {
  aplicar(leerGuardado() ?? detectar());
  const panel = document.querySelector<HTMLDialogElement>("[data-pais-panel]");
  document.querySelectorAll<HTMLElement>("[data-pais-boton]").forEach((b) => b.addEventListener("click", () => panel?.showModal()));
  panel?.querySelectorAll<HTMLButtonElement>("[data-pais]").forEach((b) => b.addEventListener("click", () => {
    const c = b.dataset.pais as Codigo;
    guardar(c);
    aplicar(c);
    panel.close();
  }));
  // Clic en el fondo cierra el panel
  panel?.addEventListener("click", (e) => { if (e.target === panel) panel.close(); });
}

iniciarPrecios();
export {};
