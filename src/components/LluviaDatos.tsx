// Fondo «lluvia de datos» para bandas oscuras.
// - Solo con mouse o trackpad y pantallas de 900 px o más: el efecto existe para reaccionar al cursor, y en
//   celulares la simulación ocupa el hilo principal sin aportar nada. Ahí la banda queda negra, como antes.
// - Se monta mientras la banda está en pantalla; al salir se desmonta y su bucle de animación se detiene.
import { useEffect, useRef, useState } from "react";
import DataRain, { type DataRainProps } from "@/components/ui/data-rain";

const CAPAZ = "(hover: hover) and (pointer: fine) and (min-width: 900px)";

export default function LluviaDatos(props: Omit<DataRainProps, "fullscreen">) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [capaz, setCapaz] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consulta = window.matchMedia(CAPAZ);
    const leer = () => setCapaz(consulta.matches);
    leer();
    consulta.addEventListener("change", leer);
    return () => consulta.removeEventListener("change", leer);
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el || !capaz) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { rootMargin: "120px 0px" });
    io.observe(el);
    return () => io.disconnect();
  }, [capaz]);

  return (
    <div ref={ref} style={{ position: "absolute", inset: 0 }} aria-hidden="true">
      {capaz && visible && <DataRain {...props} fullscreen={false} />}
    </div>
  );
}
