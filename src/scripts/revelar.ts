// Aparición sutil de bloques marcados con [data-revelar] al entrar en pantalla (una sola vez).
// Con prefers-reduced-motion el CSS no oculta nada, así que este script no tiene efecto visible.
const elementos = document.querySelectorAll<HTMLElement>("[data-revelar]");

if ("IntersectionObserver" in window && elementos.length) {
  const observador = new IntersectionObserver(
    (entradas) => {
      for (const entrada of entradas) {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("visible");
          observador.unobserve(entrada.target);
        }
      }
    },
    { rootMargin: "0px 0px -10% 0px", threshold: 0.1 },
  );
  elementos.forEach((el) => observador.observe(el));
} else {
  elementos.forEach((el) => el.classList.add("visible"));
}
