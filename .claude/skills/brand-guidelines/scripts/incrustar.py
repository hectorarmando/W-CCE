#!/usr/bin/env python3
"""Convierte una pieza HTML en un solo archivo autocontenido.

Incrusta las hojas de estilo locales (<link rel="stylesheet" href="...">) y las imágenes
locales (<img src="...svg|png|jpg">) como data URI, para que la pieza se pueda compartir,
publicar como artifact o capturar sin depender de carpetas.

Uso: python3 incrustar.py pieza.html salida.html
"""
import base64, mimetypes, pathlib, re, sys

src, out = map(pathlib.Path, sys.argv[1:3])
base = src.parent
html = src.read_text(encoding="utf-8")

def css(m):
    href = m.group(1)
    if href.startswith(("http:", "https:", "data:")):
        return m.group(0)
    return "<style>\n" + (base / href).read_text(encoding="utf-8") + "\n</style>"

def img(m):
    attr, url = m.group(1), m.group(2)
    if url.startswith(("http:", "https:", "data:")):
        return m.group(0)
    f = base / url
    mime = mimetypes.guess_type(f.name)[0] or "application/octet-stream"
    return f'{attr}="data:{mime};base64,{base64.b64encode(f.read_bytes()).decode()}"'

html = re.sub(r'<link[^>]+rel="stylesheet"[^>]+href="([^"]+)"[^>]*>', css, html)
html = re.sub(r'(src)="([^"]+\.(?:svg|png|jpe?g|webp))"', img, html)
out.write_text(html, encoding="utf-8")
print(f"OK {out} ({out.stat().st_size // 1024} KB)")
