// Movimiento del sitio — «precisión suave» (docs/direccion-creativa.md).
// Todo se apaga con prefers-reduced-motion: sin la clase .efectos en <html>, el CSS muestra el contenido quieto y completo.
const animar = window.matchMedia("(prefers-reduced-motion: no-preference)").matches;

const TITULOS = ".hero__titulo, .titulo-pagina";

/** Envuelve cada palabra en una máscara para que suba al cargar; respeta etiquetas internas (p. ej. .resalte). */
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
  const senal = document.querySelector<HTMLElement>("[data-senal-fija]");
  if (!animar) {
    document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => el.classList.add("visible"));
    return;
  }
  document.documentElement.classList.add("efectos");

  document.querySelectorAll<HTMLElement>(TITULOS).forEach((t) => {
    dividirPalabras(t);
    t.classList.add("revelable");
    // El título es el momento de entrada de la página: sube en cuanto pinta
    requestAnimationFrame(() => requestAnimationFrame(() => t.classList.add("visible")));
  });

  // Elementos que entran al llegar a ellos (filas del tablero); los hermanos lo hacen escalonados
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const e of entradas) {
        if (!e.isIntersecting) continue;
        e.target.classList.add("visible");
        observador.unobserve(e.target);
      }
    },
    { rootMargin: "0px 0px -6% 0px", threshold: 0.1 },
  );
  document.querySelectorAll<HTMLElement>("[data-revelar]").forEach((el) => {
    const hermanos = el.parentElement?.querySelectorAll(":scope > [data-revelar]");
    if (hermanos && hermanos.length > 1) el.style.setProperty("--retraso", `${[...hermanos].indexOf(el) * 80}ms`);
    observador.observe(el);
  });

  // Cabecera: se oculta al bajar y reaparece al subir (nunca con un menú abierto).
  // Señal fija: visible fuera de la parte superior y oculta cuando el pie (que tiene su propia llamada) está a la vista.
  const cabecera = document.querySelector<HTMLElement>("[data-cabecera]");
  const pie = document.querySelector<HTMLElement>(".pie");
  let pieVisible = false;
  if (pie) new IntersectionObserver(([e]) => { pieVisible = e.isIntersecting; actualizar(); }).observe(pie);
  let ultimoY = window.scrollY;
  let pendiente = false;
  function actualizar() {
    const y = window.scrollY;
    if (cabecera) {
      const menuAbierto = !!cabecera.querySelector('[aria-expanded="true"]');
      cabecera.classList.toggle("oculta", !menuAbierto && y > 240 && y > ultimoY);
    }
    senal?.classList.toggle("activa", y > window.innerHeight * 0.7 && !pieVisible);
    ultimoY = y;
    pendiente = false;
  }
  window.addEventListener("scroll", () => {
    if (pendiente) return;
    pendiente = true;
    requestAnimationFrame(actualizar);
  }, { passive: true });
  actualizar();
  // Si un elemento de la cabecera recibe foco con el teclado, se muestra
  cabecera?.addEventListener("focusin", () => cabecera.classList.remove("oculta"));
}

iniciar();
