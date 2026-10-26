---
name: estilo-web
description: Sistema de diseño de la web de la CE (DESIGN.md en la raíz del repositorio). Usar siempre que se pida una web, una landing, una sección, un componente o un rediseño en W-CCE.
---

Antes de diseñar o escribir código de interfaz, lee completo `DESIGN.md` (en la raíz del repositorio) y síguelo al pie de la letra:
- Usa solo los colores, tipografías, tamaños, radios y espaciados que define. No inventes valores nuevos; en código, usa los tokens de `src/styles/global.css`.
- Respeta cómo se ven los componentes (botones, tarjetas, placas, formularios, bordes y sombras).
- Si algo de lo pedido no está cubierto, decide en el mismo espíritu del estilo y avisa qué elegiste.
- Los textos y las imágenes son de la CE: no copies contenido de sitios de referencia.
- El skill `brand-guidelines` manda sobre este archivo si hubiera diferencias.
- Si en medio del trabajo te desvías, vuelve a leer `DESIGN.md` y corrige lo que no lo respete.
- Si cambias tokens en `global.css`, actualiza `DESIGN.md` y valida con `npx @google/design.md lint DESIGN.md`.

Origen: guía «El archivo DESIGN.md» (juanbertorello.com, oct-2026) y especificación abierta de Google (github.com/google-labs-code/design.md). En este proyecto el DESIGN.md se escribió a partir del manual de marca, no se bajó de Refero Styles.
