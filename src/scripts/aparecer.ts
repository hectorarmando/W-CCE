// Animaciones con Motion (skill motion): aparición suave al hacer scroll y elevación al pasar el mouse.
// Solo transform y opacity; nada se mueve con «reducir movimiento» y sin JavaScript todo está visible.
import { animate, hover, inView, stagger } from "motion";

const ENTRADA = [0.16, 1, 0.3, 1] as const;

function iniciarAparecer() {
  if (!window.matchMedia("(prefers-reduced-motion: no-preference)").matches) return;

  // Bloques sueltos: suben 12 px y aparecen
  document.querySelectorAll<HTMLElement>("[data-aparecer]").forEach((el) => {
    el.classList.add("por-aparecer");
    inView(el, () => {
      animate(el, { opacity: [0, 1], transform: ["translateY(12px)", "translateY(0px)"] }, { duration: 0.45, ease: ENTRADA })
        .finished.then(() => { el.classList.remove("por-aparecer"); el.style.transform = ""; });
    }, { amount: 0.2 });
  });

  // Grupos (tarjetas, razones): los hijos entran escalonados
  document.querySelectorAll<HTMLElement>("[data-aparecer-grupo]").forEach((grupo) => {
    const hijos = [...grupo.children] as HTMLElement[];
    hijos.forEach((h) => h.classList.add("por-aparecer"));
    inView(grupo, () => {
      animate(hijos, { opacity: [0, 1], transform: ["translateY(12px)", "translateY(0px)"] }, { duration: 0.45, ease: ENTRADA, delay: stagger(0.06) })
        .finished.then(() => hijos.forEach((h) => { h.classList.remove("por-aparecer"); h.style.transform = ""; }));
    }, { amount: 0.15 });
  });

  // Elevación al pasar el mouse (solo con puntero; Motion ignora el toque)
  hover("[data-elevar]", (el) => {
    animate(el, { y: -4 }, { type: "spring", bounce: 0, visualDuration: 0.25 });
    return () => animate(el, { y: 0 }, { type: "spring", bounce: 0, visualDuration: 0.3 });
  });
}

iniciarAparecer();
export {};
