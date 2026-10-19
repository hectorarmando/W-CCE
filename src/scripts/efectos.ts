// Efectos de movimiento del sitio. Todo se apaga con prefers-reduced-motion:
// sin la clase .efectos en <html>, el CSS muestra el contenido estático y completo.
const animar = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

const TITULOS = ".hero__titulo, .titulo-pagina, .titulo-seccion, .campana__titulo, .destacado__nombre";
const IMAGENES = ".comunidad__foto, .campana__foto, .portada, .sigla__foto, .forma__foto, .no-encontrada .foto";

/** Envuelve cada palabra en una máscara para que entre deslizándose; respeta etiquetas internas (p. ej. .resalte). */
function dividirPalabras(el: HTMLElement) {
  let i = 0;
  const recorrer = (nodo: Node) => {
    for (const hijo of [...nodo.childNodes]) {
      if (hijo.nodeType === Node.TEXT_NODE) {
        const partes = (hijo.textContent ?? "").split(/(\s+)/);
        const frag = document.createDocumentFragment();
        for (const parte of partes) {
          if (!parte) continue;
          if (/^\s+$/.test(parte)) { frag.append(parte); continue; }
          const mascara = document.createElement("span");
          mascara.className = "palabra";
          const interior = document.createElement("span");
          interior.className = "palabra__in";
          interior.style.setProperty("--i", String(i++));
          interior.textContent = parte;
          mascara.append(interior);
          frag.append(mascara);
        }
        hijo.replaceWith(frag);
      } else if (hijo.nodeType === Node.ELEMENT_NODE && !(hijo as Element).matches("br")) {
        recorrer(hijo);
      }
    }
  };
  recorrer(el);
}

function iniciar() {
  if (!animar) {
    document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => el.classList.add("visible"));
    return;
  }
  document.documentElement.classList.add("efectos");

  const titulos = document.querySelectorAll<HTMLElement>(TITULOS);
  titulos.forEach((t) => { dividirPalabras(t); t.classList.add("revelable"); });
  document.querySelectorAll<HTMLElement>(IMAGENES).forEach((f) => f.classList.add("revelable", "revelable--imagen"));

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("visible");
        observador.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  document.querySelectorAll(".revelable, [data-revelar]").forEach((el) => observador.observe(el));

  // Cabecera: se oculta al bajar y reaparece al subir (nunca con un menú abierto)
  const cabecera = document.querySelector<HTMLElement>("[data-cabecera]");
  let ultimoY = window.scrollY;
  let pendiente = false;
  window.addEventListener("scroll", () => {
    if (pendiente || !cabecera) return;
    pendiente = true;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      const menuAbierto = !!cabecera.querySelector('[aria-expanded="true"]');
      cabecera.classList.toggle("oculta", !menuAbierto && y > 240 && y > ultimoY);
      ultimoY = y;
      pendiente = false;
    });
  }, { passive: true });
  // Si un elemento de la cabecera recibe foco con el teclado, se muestra
  cabecera?.addEventListener("focusin", () => cabecera.classList.remove("oculta"));
}

iniciar();
