# Dirección creativa — «Señal y abrazo»

Documento de referencia para el sitio de la Cámara de Comercio Exterior (CE). Complementa el Manual de Identidad de Marca: el manual manda y esta dirección trabaja dentro de él.

## Idea central

La CE forma a personas que van a operar en el mundo: importar, analizar datos y trabajar con IA para competir en un mercado global. Dos imágenes sostienen el sitio:

- **La señal.** La señalética de los aeropuertos y puertos internacionales es amarilla y negra, como la marca. Su trabajo es el mismo que el del sitio: que cualquiera sepa, en un vistazo, a dónde ir. De ahí salen las placas amarillas, las flechas en círculo (la pastilla del manual, 6.1), el tablero de programas y la jerarquía clara.
- **El abrazo.** La «C» envolvente del isologo simboliza protección, conexión y unidad. En el sitio, el arco amarillo abraza a personas reales y al contenido que importa. Es el recurso que distingue a la CE de cualquier otra escuela.

## Estado de ánimo

Luminoso, preciso y cercano. Se parece a llegar a un aeropuerto bien señalizado a primera hora: hay luz blanca, tipografía negra y nítida, y el amarillo marca el camino. Es seguro de sí mismo sin ser frío, y las personas siempre están presentes.

## Paleta

| Nombre | Hex | Uso |
|---|---|---|
| Señal | `#ffc300` | Acción y orientación: el círculo de la flecha, las placas, la fila elegida en el tablero, el arco y la banda de empresas |
| Tinta | `#000000` | Texto, pastilla principal, tablero de programas y pie |
| Papel | `#ffffff` | Fondo base: es el blanco del manual, sin cremas |
| Grafito | `#404040` | Texto secundario (contraste AA sobre blanco) |
| Bruma | `#f2f2f2` | Superficies neutras: placas secundarias y campos |
| Oro | `#c89a31` | Solo dentro del logo; no es un color de interfaz |

Regla: el amarillo nunca decora, siempre indica algo (dónde hacer clic, qué está seleccionado, qué abraza el arco).

## Tipografía

- **Montserrat** (tipografía de marca), entre 700 y 800, con interletra cerrada (−0,04 em), para titulares y pastillas. Los titulares se escriben en minúsculas de frase, como en la señalética.
- **Inter Tight** cumple el papel que el manual le da a Helvetica: cuerpo, datos y tablero. Es neutra, compacta y se lee bien en pantallas pequeñas.
- **Escala** (cuarta justa, 1,333):
  - 0,8125 rem: notas;
  - 1,0625 rem: texto;
  - 1,25 rem: entradilla;
  - 2 rem: subtítulo;
  - 3,2 a 4,25 rem: sección;
  - hasta 7,5 rem: portada.
- **Sin etiquetas en mayúsculas** sobre cada título. Cuando hace falta orientar, se usa una placa amarilla con texto en minúsculas de frase.

## Sistema de diseño

- **Pastilla**: es el CTA del manual. Va con negro y un círculo amarillo con flecha (principal), en amarillo con un círculo negro (sobre negro), o con contorno (secundaria). Hay un CTA principal por bloque.
- **Placa**: un rectángulo amarillo con esquinas de 0,375 rem y texto negro. Marca beneficios y áreas, como un letrero.
- **Tablero**: una tabla negra de programas con las columnas Programa, Área, Duración y Modalidad. La fila elegida se ilumina en amarillo.
- **Arco**: el semicírculo amarillo de trazo grueso del manual. Aparece en la portada, que es su momento principal, y en el pie, entrando desde abajo.
- **Radios por jerarquía**: 999 px en pastillas, 1,5 rem en fotos y paneles grandes, 0,375 rem en placas y campos.
- **Retícula**: 12 columnas, máximo 86 rem y contenido alineado a la izquierda. El aire es generoso: el lujo está en el espacio, no en el adorno.

## Imágenes

Dos familias, sin mezclar: fotos reales de la comunidad CE (eventos, aulas, equipo y estudiantes) y las portadas oficiales de cada curso (`src/assets/cursos/`), que ya traen su título y el logo. No se usan bancos de imágenes externos. Se recortan en círculo dentro del arco (portada) o en rectángulos amplios de esquinas suaves. Faltan retratos de docentes y estudiantes recortados sobre fondo claro, que es el estilo de las piezas del manual (ver `pendientes.md`).

## Interacciones distintivas

1. **El abrazo** (portada). Al cargar, el arco amarillo se dibuja alrededor de la foto de la comunidad. Después gira apenas con el desplazamiento, como un dial.
2. **El tablero de programas.** Los programas se presentan como un panel de salidas. Al entrar en pantalla, las filas giran una a una como paletas de un tablero, y al pasar el cursor o el foco, la fila elegida se enciende en amarillo.
3. **La señal fija.** Al dejar la portada aparece una pastilla flotante «Hablar con un asesor» (WhatsApp), siempre a un toque y sin tapar contenido.

## Lenguaje de movimiento

El detalle completo (coreografías, scroll, cursor, transiciones de página y micro-interacciones) está en `sistema-movimiento.md`. El mapa de la experiencia sección por sección está en `experiencia-ux.md`.

**Precisión suave**: una sola curva (`cubic-bezier(.16, 1, .3, 1)`) y tres duraciones.

| Tiempo | Uso |
|---|---|
| 240 ms | Respuesta a una acción: hover, foco, abrir una pregunta |
| 700 ms | Entradas: filas del tablero, título de página |
| 1400 ms | El momento de la portada: el arco que se dibuja |

- El movimiento responde a la persona o marca un momento; nada se mueve porque sí.
- No hay entradas con desvanecido en cada sección.
- Con `prefers-reduced-motion` todo aparece quieto y completo.

## Conversión

Cada pantalla tiene un camino claro:

- ver programas (tablero);
- hablar con un asesor (pastilla flotante y pie);
- en el caso de empresas, la banda amarilla.

Las preguntas frecuentes resuelven las dudas que frenan la inscripción, con respuestas tomadas del material oficial.
