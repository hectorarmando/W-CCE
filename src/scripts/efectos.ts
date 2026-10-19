// Efectos de movimiento del sitio. Todo se apaga con prefers-reduced-motion:
// sin la clase .efectos en <html>, el CSS muestra el contenido estático y completo.
const animar = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

const TITULOS = ".hero__titulo, .titulo-pagina, .campana__titulo, .destacado__nombre";
const DESCIFRAR = ".titulo-seccion";
const TEXTOS = ".hero__sub, .intro, .etiqueta, .faq__item, .formas__lista li, .fila";
const SIMBOLOS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#%&*+=/<>";
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

/** Título que se «descifra»: los caracteres pasan por símbolos al azar y se fijan de izquierda a derecha. */
function descifrar(el: HTMLElement, duracion = 900) {
  const nodos: Text[] = [];
  const caminar = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  while (caminar.nextNode()) nodos.push(caminar.currentNode as Text);
  const originales = nodos.map((n) => n.data);
  const total = originales.reduce((a, t) => a + t.length, 0);
  // Se fija el alto mientras dura el efecto para no mover el contenido de abajo
  el.style.minHeight = `${el.getBoundingClientRect().height}px`;
  el.setAttribute("aria-label", el.textContent ?? "");
  const inicio = performance.now();
  const paso = (ahora: number) => {
    const p = Math.min(1, (ahora - inicio) / duracion);
    const fijos = Math.floor(p * total);
    let i = 0;
    nodos.forEach((n, k) => {
      n.data = [...originales[k]].map((c) => {
        const idx = i++;
        if (idx < fijos || /\s/.test(c)) return c;
        return SIMBOLOS[(Math.random() * SIMBOLOS.length) | 0];
      }).join("");
    });
    el.classList.toggle("descifrando", p < 1);
    if (p < 1) requestAnimationFrame(paso);
    else { el.style.minHeight = ""; el.removeAttribute("aria-label"); }
  };
  requestAnimationFrame(paso);
}

function iniciar() {
  if (!animar) {
    document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => el.classList.add("visible"));
    return;
  }
  document.documentElement.classList.add("efectos");

  const titulos = document.querySelectorAll<HTMLElement>(TITULOS);
  titulos.forEach((t) => { dividirPalabras(t); t.classList.add("revelable"); });
  document.querySelectorAll<HTMLElement>(DESCIFRAR).forEach((t) => t.classList.add("por-descifrar"));
  document.querySelectorAll<HTMLElement>(TEXTOS).forEach((t) => {
    t.classList.add("revelable-texto");
    // Elementos hermanos en lista entran escalonados
    if (t.parentElement?.children.length && t.parentElement.children.length > 1) {
      t.style.setProperty("--retraso", `${[...t.parentElement.children].indexOf(t) * 70}ms`);
    }
  });
  document.querySelectorAll<HTMLElement>(IMAGENES).forEach((f) => f.classList.add("revelable", "revelable--imagen"));

  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("visible");
        if (e.target.classList.contains("por-descifrar")) descifrar(e.target as HTMLElement);
        observador.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
  );
  document.querySelectorAll(".revelable, .revelable-texto, .por-descifrar, [data-revelar]").forEach((el) => observador.observe(el));

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
