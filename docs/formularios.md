# Formularios de contacto

Hay dos formularios (`/contacto` para personas y `/empresas` para empresas) y ambos usan el componente `src/components/FormularioContacto.astro` y el script `src/scripts/formulario.ts`.

## Validación en el navegador

- Nombre (≥ 3 caracteres), correo válido, celular (7–20 caracteres, con al menos 7 dígitos) y autorización de datos obligatoria.
- Personas: programa de interés. Empresas: nombre de la empresa y número de personas.
- Los errores se muestran junto a cada campo (`aria-invalid` y `aria-describedby`) y el foco va al primer campo con error.
- Campo trampa `web`, oculto para las personas: si llega con contenido, el envío se descarta.

## Modos de envío

### 1. Sin endpoint (modo actual)

`PUBLIC_FORM_ENDPOINT` está vacío. Al enviar, se abre WhatsApp (`wa.me/51902148893`, el número publicado en el brochure oficial) con un mensaje que incluye los datos del formulario. El botón dice «Enviar por WhatsApp» para que la persona sepa qué va a pasar.

### 2. Con endpoint

1. Crear `.env` (a partir de `.env.example`) con `PUBLIC_FORM_ENDPOINT=https://…`.
2. Ejecutar `npm run build`.

El formulario hace `POST` con un cuerpo JSON como este:

```json
{ "nombre": "…", "correo": "…", "telefono": "…", "pais": "…", "interes": "…",
  "empresa": "…", "colaboradores": "…", "mensaje": "…", "acepto": "on",
  "origen": "/contacto", "modo": "persona|empresa" }
```

- Cualquier respuesta `2xx` se toma como éxito: se limpia el formulario y aparece un mensaje de confirmación.
- Un error o un tiempo de espera de 12 s muestran un mensaje de error con la alternativa de enviar por WhatsApp.
- Durante el envío, el botón queda deshabilitado (`aria-busy`).

Sirve cualquier servicio que acepte JSON: un CRM, un webhook de automatización o el receptor PHP incluido.

## Receptor PHP incluido (`server/contacto.php`)

Es opcional y sirve para hostings con PHP 8.1 o superior.

1. Subir el archivo a una ruta como `/api/contacto.php`.
2. Configurar las variables de entorno en el hosting (nunca en el repositorio):
   - `CE_CONTACTO_EMAIL`: correo que recibe las consultas.
   - `CE_ORIGENES`: `https://www.camaracomercioexterior.org`.
   - Opcional: `CE_CONTACTO_MODO=archivo` y `CE_CONTACTO_ARCHIVO=/ruta/fuera/de/public/consultas.jsonl`.
3. Compilar el sitio con `PUBLIC_FORM_ENDPOINT=https://www.camaracomercioexterior.org/api/contacto.php`.

Protecciones del receptor:
- solo acepta `POST`;
- CORS restringido a los orígenes configurados;
- cuerpo de 16 KB como máximo;
- 5 envíos cada 10 minutos por IP;
- campo trampa;
- validación en el servidor, con limpieza de caracteres de control;
- el correo del remitente se valida antes de usarse en `Reply-To`, lo que evita inyección de cabeceras.

Pruebas que se ejecutaron con `php -S` en modo archivo:

| Caso | Respuesta |
|---|---|
| GET | 405 |
| Origen ajeno | 403 |
| JSON inválido | 400 |
| Campos inválidos | 422 con el detalle por campo |
| Envío válido | 200 y registro guardado |
| Bot | 200, descartado |
| Sexto envío | 429 |

El envío por `mail()` no se probó porque el entorno no tiene servidor de correo. Pruébalo en el hosting antes de activarlo.
