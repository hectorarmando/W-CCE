// Validación y envío de formularios de contacto.
// - Con data-endpoint: POST JSON al endpoint configurado (PUBLIC_FORM_ENDPOINT), con estados de carga, éxito y error.
// - Sin endpoint: compone el mensaje y lo abre en el WhatsApp oficial (canal publicado en material de la CE).

type Errores = Record<string, string>;

const CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const TELEFONO = /^\+?[\d\s()-]{7,20}$/;

function validar(datos: FormData, modo: string): Errores {
  const e: Errores = {};
  const txt = (k: string) => String(datos.get(k) ?? "").trim();
  if (txt("nombre").length < 3) e.nombre = "Escribe tu nombre y apellido.";
  if (!CORREO.test(txt("correo"))) e.correo = "Escribe un correo válido, por ejemplo nombre@empresa.com.";
  const digitos = txt("telefono").replace(/\D/g, "");
  if (!TELEFONO.test(txt("telefono")) || digitos.length < 7) e.telefono = "Escribe un número de celular válido.";
  if (modo === "empresa") {
    if (txt("empresa").length < 2) e.empresa = "Escribe el nombre de la empresa.";
    if (!txt("colaboradores")) e.colaboradores = "Indica cuántas personas quieres capacitar.";
  } else if (!txt("interes")) {
    e.interes = "Elige un programa o la opción de orientación.";
  }
  if (!datos.get("acepto")) e.acepto = "Necesitamos tu autorización para responderte.";
  return e;
}

function mostrarErrores(form: HTMLFormElement, errores: Errores) {
  form.querySelectorAll<HTMLElement>(".campo__error").forEach((p) => { p.hidden = true; p.textContent = ""; });
  form.querySelectorAll("[aria-invalid]").forEach((c) => c.removeAttribute("aria-invalid"));
  let primero: HTMLElement | null = null;
  for (const [nombre, mensaje] of Object.entries(errores)) {
    const campo = form.elements.namedItem(nombre) as HTMLElement | null;
    if (!campo) continue;
    const error = form.querySelector<HTMLElement>(`#${campo.id}-error`);
    campo.setAttribute("aria-invalid", "true");
    if (error) {
      error.textContent = mensaje;
      error.hidden = false;
      campo.setAttribute("aria-describedby", error.id);
    }
    primero ??= campo;
  }
  primero?.focus();
}

function mensajeWhatsapp(datos: FormData, modo: string): string {
  const v = (k: string) => String(datos.get(k) ?? "").trim();
  const lineas = [
    modo === "empresa" ? "Hola, quiero información sobre capacitación para empresas." : `Hola, quiero información sobre: ${v("interes")}.`,
    `Nombre: ${v("nombre")}`,
    `Correo: ${v("correo")}`,
    `Celular: ${v("telefono")}`,
    `País: ${v("pais")}`,
  ];
  if (modo === "empresa") lineas.push(`Empresa: ${v("empresa")}`, `Personas a capacitar: ${v("colaboradores")}`);
  if (v("mensaje")) lineas.push(`Mensaje: ${v("mensaje")}`);
  return lineas.join("\n");
}

function estado(form: HTMLFormElement, tipo: "ok" | "error", html: string) {
  const caja = form.querySelector<HTMLElement>("[data-estado]");
  if (!caja) return;
  caja.dataset.tipo = tipo;
  caja.innerHTML = html;
  caja.hidden = false;
  caja.focus();
}

function ocupado(form: HTMLFormElement, si: boolean) {
  const boton = form.querySelector<HTMLButtonElement>("[data-enviar]");
  const texto = boton?.querySelector<HTMLElement>("[data-texto]");
  if (!boton || !texto) return;
  boton.disabled = si;
  boton.setAttribute("aria-busy", String(si));
  texto.dataset.original ??= texto.textContent ?? "";
  texto.textContent = si ? "Enviando…" : texto.dataset.original;
}

async function enviar(form: HTMLFormElement) {
  const modo = form.dataset.modo ?? "persona";
  const datos = new FormData(form);
  if (String(datos.get("web") ?? "").trim()) return; // bot: se ignora en silencio

  const errores = validar(datos, modo);
  if (Object.keys(errores).length) { mostrarErrores(form, errores); return; }
  mostrarErrores(form, {});

  const enlaceWa = `https://wa.me/${form.dataset.whatsapp}?text=${encodeURIComponent(mensajeWhatsapp(datos, modo))}`;
  const endpoint = form.dataset.endpoint;

  if (!endpoint) {
    // enlaceWa solo contiene texto codificado con encodeURIComponent, seguro dentro del atributo href
    const ventana = window.open(enlaceWa, "_blank");
    if (ventana) ventana.opener = null;
    estado(form, "ok", "Abrimos WhatsApp con tu mensaje listo para enviar. Si no se abrió, <a href=\"" + enlaceWa + "\" target=\"_blank\" rel=\"noopener\">toca aquí para abrirlo</a>.");
    return;
  }

  ocupado(form, true);
  const control = new AbortController();
  const limite = setTimeout(() => control.abort(), 12000);
  try {
    const cuerpo = Object.fromEntries([...datos.entries()].filter(([k]) => k !== "web").map(([k, v]) => [k, String(v)]));
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({ ...cuerpo, origen: location.pathname, modo }),
      signal: control.signal,
    });
    if (!r.ok) throw new Error(`HTTP ${r.status}`);
    form.reset();
    estado(form, "ok", "Recibimos tu consulta. Un asesor te escribirá pronto por correo o WhatsApp.");
  } catch {
    estado(form, "error", "No pudimos enviar el formulario. Revisa tu conexión e inténtalo de nuevo, o <a href=\"" + enlaceWa + "\" target=\"_blank\" rel=\"noopener\">envía tu consulta por WhatsApp</a>.");
  } finally {
    clearTimeout(limite);
    ocupado(form, false);
  }
}

export function iniciarFormularios() {
  document.querySelectorAll<HTMLFormElement>("form[data-formulario]").forEach((form) => {
    if (form.dataset.listo) return;
    form.dataset.listo = "1";
    form.addEventListener("submit", (ev) => { ev.preventDefault(); void enviar(form); });
    // Limpia el error de un campo apenas se corrige
    form.addEventListener("input", (ev) => {
      const c = ev.target as HTMLElement;
      if (c.getAttribute("aria-invalid") === "true") {
        c.removeAttribute("aria-invalid");
        const err = form.querySelector<HTMLElement>(`#${c.id}-error`);
        if (err) err.hidden = true;
      }
    });
  });
}
