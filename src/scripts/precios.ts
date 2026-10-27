// Precios por país: detecta la ubicación, la deja cambiar con el selector y muestra cada precio en su moneda.
// Orden de detección: elección guardada → país indicado por el servidor (<html data-pais-servidor>, si el hosting
// lo agrega) → zona horaria del navegador → región del idioma → «Otro país» (US$). No usa servicios externos.
type Codigo = "PE" | "EC" | "CR" | "CO" | "MX" | "PA" | "AR" | "OT";
interface Pais { codigo: Codigo; nombre: string; moneda: string; simbolo: string; sufijo?: string; locale: string; decimales: number; zonas: string[] }
interface PrecioPais { precio: number; antes?: number }

const CLAVE = "ce-pais";
const datos = JSON.parse(document.getElementById("datos-precios")?.textContent ?? '{"paises":[],"precios":{},"contornos":{}}') as {
  paises: Pais[]; precios: Record<string, Partial<Record<Codigo, PrecioPais>>>; contornos: Record<string, [number, number][][]>;
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
  // Mapa de América (MapaPaises): país elegido resaltado
  document.querySelectorAll<Element>("[data-elegir-pais]").forEach((b) => {
    const elegido = b.getAttribute("data-elegir-pais") === pais.codigo;
    b.setAttribute("aria-pressed", String(elegido));
    b.classList.toggle("elegido", elegido);
  });
  document.querySelectorAll<HTMLElement>("[data-pais-nombre]").forEach((n) => { n.textContent = pais.codigo === "OT" ? "fuera de estos países (precios en US$)" : `${pais.nombre} (${pais.moneda})`; });

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

/** ¿El punto [lon, lat] cae dentro del anillo? (cruce de rayos) */
function dentro([x, y]: [number, number], anillo: [number, number][]): boolean {
  let adentro = false;
  for (let i = 0, j = anillo.length - 1; i < anillo.length; j = i++) {
    const [xi, yi] = anillo[i], [xj, yj] = anillo[j];
    if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) adentro = !adentro;
  }
  return adentro;
}
/** País atendido que contiene el punto; si cae en el mar cerca de la costa, el más cercano a menos de ~150 km. */
function paisEnPunto(lon: number, lat: number): Codigo {
  for (const [codigo, anillos] of Object.entries(datos.contornos)) {
    if (anillos.some((a) => dentro([lon, lat], a))) return codigo as Codigo;
  }
  let mejor: Codigo = "OT", dist = 1.4;
  for (const [codigo, anillos] of Object.entries(datos.contornos)) {
    for (const a of anillos) for (const [x, y] of a) {
      const d = Math.hypot(x - lon, y - lat);
      if (d < dist) { dist = d; mejor = codigo as Codigo; }
    }
  }
  return mejor;
}

const elegir = (c: Codigo) => { guardar(c); aplicar(c); };

/** Pide la ubicación al navegador y elige el país. La ubicación no se envía a ningún servidor. */
function ubicar(boton: HTMLElement) {
  const estados = document.querySelectorAll<HTMLElement>("[data-ubicacion-estado]");
  const decir = (t: string) => estados.forEach((e) => { e.textContent = t; });
  if (!("geolocation" in navigator)) { decir("Tu navegador no permite usar la ubicación. Elige tu país en la lista."); return; }
  boton.setAttribute("aria-busy", "true");
  decir("Buscando tu ubicación…");
  // Si el permiso queda sin respuesta (la persona ignora el aviso del navegador), no dejamos el mensaje colgado
  const espera = window.setTimeout(() => {
    boton.removeAttribute("aria-busy");
    decir("Si no ves el aviso para compartir tu ubicación, elige tu país en la lista.");
  }, 12000);
  navigator.geolocation.getCurrentPosition(
    (pos) => {
      window.clearTimeout(espera);
      boton.removeAttribute("aria-busy");
      const c = paisEnPunto(pos.coords.longitude, pos.coords.latitude);
      elegir(c);
      decir(c === "OT" ? "Estás fuera de los 7 países que atendemos: te mostramos precios en US$." : `Te ubicamos en ${porCodigo.get(c)!.nombre}.`);
    },
    (err) => {
      window.clearTimeout(espera);
      boton.removeAttribute("aria-busy");
      decir(err.code === err.PERMISSION_DENIED ? "No diste permiso para usar tu ubicación. Elige tu país en la lista." : "No pudimos obtener tu ubicación. Elige tu país en la lista.");
    },
    { enableHighAccuracy: false, timeout: 10000, maximumAge: 600000 },
  );
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
  // Mapa y botones de ubicación (en cualquier parte de la página)
  document.addEventListener("click", (e) => {
    const destino = e.target as Element;
    const pais = destino.closest?.("[data-elegir-pais]");
    if (pais) { elegir(pais.getAttribute("data-elegir-pais") as Codigo); return; }
    const ubic = destino.closest?.<HTMLElement>("[data-ubicacion]");
    if (ubic) ubicar(ubic);
  });
  // Teclado en los países del mapa (SVG con role="button")
  document.addEventListener("keydown", (e) => {
    const pais = (e.target as Element).closest?.("svg [data-elegir-pais]");
    if (pais && (e.key === "Enter" || e.key === " ")) { e.preventDefault(); elegir(pais.getAttribute("data-elegir-pais") as Codigo); }
  });
  // Clic en el fondo cierra el panel
  panel?.addEventListener("click", (e) => { if (e.target === panel) panel.close(); });
}

iniciarPrecios();
export {};
