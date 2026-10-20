# Precios por país

La web detecta el país del visitante y muestra cada precio en la moneda de ese país. Los países son los del selector oficial de la CE: Perú, Ecuador, Costa Rica, Colombia, México, Panamá y Argentina. Para cualquier otro país se usan dólares estadounidenses.

## Estado actual

El sistema está listo, pero **la tabla de precios está vacía** (`src/data/precios.ts`). Mientras un curso no tenga precio para un país, la web muestra «Consulta con un asesor», igual que antes.

## Cómo se detecta el país

En este orden:

1. **La elección guardada.** Si la persona eligió un país en el selector de la cabecera, se recuerda en su navegador.
2. **El país que indique el servidor** (`<html data-pais-servidor="PE">`). Se activa al publicar el sitio; ver «Detección en el servidor».
3. **La zona horaria del navegador.** Por ejemplo, `America/Lima` corresponde a Perú y `America/Bogota` a Colombia. No consulta servicios externos ni guarda datos personales.
4. **La región del idioma del navegador** (`es-MX`, `es-AR`…).
5. **Otro país:** precios en US$.

La persona puede cambiar el país en cualquier momento con el botón de bandera de la cabecera.

## Monedas y formato

| País | Moneda | Ejemplo de formato |
|---|---|---|
| Perú | Soles (PEN) | S/ 449 |
| Ecuador | Dólares (USD) | US$ 149 |
| Costa Rica | Colones (CRC) | ₡ 75 000 |
| Colombia | Pesos colombianos (COP) | $ 450.000 COP |
| México | Pesos mexicanos (MXN) | $ 1,999 MXN |
| Panamá | Dólares (USD) | US$ 149 |
| Argentina | Pesos argentinos (ARS) | $ 150.000 ARS |
| Otros países | Dólares (USD) | US$ 149 |

Los montos de la tabla son **solo ejemplos de formato**, no precios.

Los países que usan el signo «$» llevan el código de moneda al final para que no se confundan.

## Cómo cargar los precios

1. Llena `docs/plantilla-precios.csv`. Tiene una fila por programa o curso y dos columnas por país:
   - `XX_precio`: el precio final que paga la persona, en la moneda del país y con impuestos incluidos.
   - `XX_antes` (opcional): el precio regular. Se muestra tachado cuando hay promoción.

   Las celdas vacías significan «sin precio publicado»: se mantiene «Consulta con un asesor».
2. Envía el archivo. Se pasa a `src/data/precios.ts` con este formato:

   ```ts
   "power-bi": { PE: { precio: 449, antes: 599 }, EC: { precio: 149 }, OT: { precio: 149 } },
   ```

3. Se verifica (`astro check`, `build`, `tests/e2e.cjs`) y se publica.

**Dónde aparecen los precios:**

- en la tarjeta de cada curso del catálogo;
- en la fila «Inversión» de la ficha de cada programa;
- en los carruseles del inicio.

## WhatsApp

Al elegir o detectar un país, todos los enlaces a WhatsApp añaden al mensaje «(Escribo desde Ecuador.)». Así el asesor sabe qué tarifa vio la persona. Para «Otro país» no se añade nada.

## Detección en el servidor (opcional, al publicar)

Si el sitio se publica en un servicio con geolocalización, el servidor puede escribir el país en `<html data-pais-servidor="XX">`. La web lo usará antes que la zona horaria:

- **Cloudflare:** un Worker o Pages Function que lea `request.cf.country` y lo inserte con `HTMLRewriter`.
- **Netlify:** una Edge Function que lea `context.geo.country.code`.
- **Vercel:** un Middleware que lea la cabecera `x-vercel-ip-country`.

Se configura cuando se defina el hosting (ver `pendientes.md`).

## Consideraciones legales

En Perú, el Código de Protección y Defensa del Consumidor exige mostrar el precio total en soles, con impuestos incluidos. Conviene que el área legal confirme las condiciones de los demás países: impuestos, moneda de cobro y medios de pago.
