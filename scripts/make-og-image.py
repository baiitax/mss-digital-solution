#!/usr/bin/env python3
"""Render public/brand/og-image.png (1200x630) — the link-share card.

Every element is either the owner's logo artwork or a fact already published on
the site (services, Kano, RC 7341058). No stock imagery, no invented metrics.

Requires: Pillow, the Manrope variable font (OFL) and the brand PNGs in
public/brand/. Manrope is fetched from google/fonts at build time by next/font
too; here we download it once:

  curl -sL -o Manrope.ttf \
    "https://raw.githubusercontent.com/google/fonts/main/ofl/manrope/Manrope%5Bwght%5D.ttf"

  python3 scripts/make-og-image.py Manrope.ttf
"""
import sys
from PIL import Image, ImageDraw, ImageFont

FONT = sys.argv[1] if len(sys.argv) > 1 else "Manrope.ttf"

W, H = 1200, 630
PAPER = (250, 249, 247)
STORM = (52, 61, 70)
BURGUNDY = (112, 31, 61)
GREY = (89, 99, 109)
LINE = (226, 222, 218)


def manrope(size, weight):
    f = ImageFont.truetype(FONT, size)
    try:
        f.set_variation_by_name(weight)
    except Exception:
        pass
    return f


def tracked(draw, xy, text, font, fill, tracking=0):
    x, y = xy
    for ch in text:
        draw.text((x, y), ch, font=font, fill=fill)
        x += draw.textlength(ch, font=font) + tracking


HEADLINE = (
    ("Digital health systems,", STORM),
    ("geospatial intelligence", BURGUNDY),
    ("& data analytics.", STORM),
)
BODY = (
    "MSS Digital Solutions builds the systems, maps and analytics that help "
    "governments, development partners and healthcare institutions reach the "
    "communities services have not yet reached."
)

canvas = Image.new("RGB", (W, H), PAPER)

# Right-hand panel first, on its own layer so the rings cannot bleed onto the
# paper side of the card, then the emblem reversed for a dark surface.
PANEL_X = 812
panel = Image.new("RGB", (W - PANEL_X, H), STORM)
pd = ImageDraw.Draw(panel)
cx, cy = (W - PANEL_X) // 2, H // 2
for i, r in enumerate((420, 330, 240)):
    pd.ellipse([cx - r, cy - r, cx + r, cy + r], outline=(255, 255, 255, 9 + i * 5), width=1)
canvas.paste(panel, (PANEL_X, 0))

mark = Image.open("public/brand/logo-mark-on-dark.png").convert("RGBA")
mh = 236
mark = mark.resize((round(mh * mark.width / mark.height), mh), Image.LANCZOS)
canvas.paste(mark, (PANEL_X + (W - PANEL_X - mark.width) // 2, (H - mark.height) // 2), mark)

d = ImageDraw.Draw(canvas)

# Burgundy rule down the panel seam.
d.rectangle([PANEL_X - 6, 0, PANEL_X - 1, H], fill=BURGUNDY)

# Lockup, top-left.
lock = Image.open("public/brand/logo-full.png").convert("RGBA")
lh = 54
lock = lock.resize((round(lh * lock.width / lock.height), lh), Image.LANCZOS)
canvas.paste(lock, (72, 62), lock)

d.rectangle([72, 166, 130, 170], fill=BURGUNDY)

f_head = manrope(50, "ExtraBold")
f_body = manrope(21, "Medium")
f_small = manrope(16, "SemiBold")
f_tiny = manrope(15, "Medium")

y = 204
for line, colour in HEADLINE:
    d.text((72, y), line, font=f_head, fill=colour)
    y += 59

# Divider and the company paragraph, wrapped to the paper column.
COL_W = PANEL_X - 72 - 52
d.line([72, y + 16, PANEL_X - 52, y + 16], fill=LINE, width=2)
y += 44

def wrap(text, font, width):
    words, lines, cur = text.split(), [], ""
    for w in words:
        probe = f"{cur} {w}".strip()
        if d.textlength(probe, font=font) <= width:
            cur = probe
        else:
            lines.append(cur)
            cur = w
    if cur:
        lines.append(cur)
    return lines

for line in wrap(BODY, f_body, COL_W):
    d.text((72, y), line, font=f_body, fill=GREY)
    y += 30

tracked(d, (72, H - 64), "KANO, NIGERIA   ·   RC 7341058", f_small, STORM, 1.6)
d.text((72, H - 38), "Implementation partner, not vendor", font=f_tiny, fill=GREY)

canvas.save("public/brand/og-image.png", optimize=True)
print("wrote public/brand/og-image.png", canvas.size)
