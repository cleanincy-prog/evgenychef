"""Export the existing ЕГ monogram using the site's actual Oranienbaum glyphs.

Requires fonttools 4.61.1 and brotli 1.2.0; these are build-only tools.
"""
from pathlib import Path
from fontTools.ttLib import TTFont
from fontTools.pens.svgPathPen import SVGPathPen
from fontTools.pens.boundsPen import BoundsPen

root = Path(__file__).resolve().parents[1]
font = TTFont(root / "public/fonts/oranienbaum-cyrillic.woff2")
glyphs = font.getGlyphSet()
cmap = font.getBestCmap()
parts, boxes, advance = [], [], 0
for letter in "ЕГ":
    name = cmap[ord(letter)]
    pen = SVGPathPen(glyphs)
    bounds = BoundsPen(glyphs)
    glyphs[name].draw(pen)
    glyphs[name].draw(bounds)
    x0, y0, x1, y1 = bounds.bounds
    boxes.append((x0 + advance, y0, x1 + advance, y1))
    parts.append(f'<path transform="translate({advance} 0)" d="{pen.getCommands()}"/>')
    advance += font["hmtx"][name][0]
x0, y0 = min(b[0] for b in boxes), min(b[1] for b in boxes)
x1, y1 = max(b[2] for b in boxes), max(b[3] for b in boxes)
scale = min(48 / (x1 - x0), 40 / (y1 - y0))
tx, ty = 32 - (x0 + x1) * scale / 2, 32 + (y0 + y1) * scale / 2
svg = (f'<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64" role="img" aria-label="Евгений Гребеник">\n'
       '<rect width="64" height="64" fill="#f4efe5"/>\n'
       f'<g fill="#0a0a0a" transform="translate({tx:.6f} {ty:.6f}) scale({scale:.6f} {-scale:.6f})">'
       + "".join(parts) + '</g>\n</svg>\n')
(root / "public/favicon-grebenik-2026-09-18.svg").write_text(svg)
