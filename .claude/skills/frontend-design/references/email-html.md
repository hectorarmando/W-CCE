# Emails HTML: reglas técnicas

Los clientes de correo (Gmail, Outlook, Apple Mail, móviles) renderizan HTML de forma muy limitada y distinta entre sí. Un correo diseñado como página web se verá roto en Outlook o Gmail. Aplica la dirección estética del skill, pero dentro de estas reglas.

## Estructura

- Layout con `<table role="presentation">` anidadas, no con flexbox ni grid (Outlook de escritorio usa el motor de Word).
- Ancho del contenedor principal: 600px (máx. 640px), centrado, con `width="100%"` en la tabla exterior.
- `<!DOCTYPE html>`, `<meta charset="utf-8">`, `<meta name="viewport" content="width=device-width, initial-scale=1">`.
- Incluye un **preheader** oculto (texto de vista previa) al inicio del body.

## Estilos

- **Estilos inline** en cada elemento (Gmail elimina parte de los `<style>`). Un bloque `<style>` en el `<head>` solo para media queries responsive y extras progresivos.
- Sin JavaScript, sin formularios, sin `position`, sin variables CSS, sin animaciones críticas (los GIF sí funcionan).
- Colores en hex completo (`#1a1a1a`). Define `bgcolor` en tablas además del `background-color` para Outlook.
- Fuentes web solo como mejora progresiva (`<link>` a Google Fonts funciona en Apple Mail/iOS); siempre con stack de respaldo seguro: `font-family: 'Fraunces', Georgia, 'Times New Roman', serif;`. La personalidad debe sobrevivir con la fuente de respaldo: apóyate en tamaños, pesos, color y composición.

## Imágenes y botones

- Imágenes con `width` explícito, `style="display:block;border:0;"` y `alt` descriptivo (muchos clientes bloquean imágenes por defecto: el correo debe entenderse sin ellas).
- Nunca pongas el texto importante solo dentro de una imagen.
- Botones "a prueba de balas": `<a>` con padding, fondo y borde dentro de una celda de tabla con `bgcolor`, no imágenes de botón.

## Responsive y modo oscuro

- Media query `@media (max-width:600px)` para apilar columnas (clases en `<td>` con `display:block !important; width:100% !important;`).
- Considera el modo oscuro: evita logos negros sobre transparente; añade `<meta name="color-scheme" content="light dark">` si diseñas para ambos.

## Contenido obligatorio

- Un CTA principal claro (uno, no cinco).
- Pie con datos del remitente, enlace para darse de baja (marcador `{{unsubscribe_url}}` si no se conoce la plataforma) y "ver en el navegador".
- Peso total del HTML por debajo de ~100 KB (Gmail recorta mensajes más grandes).
