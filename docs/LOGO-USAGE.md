# MSS Digital Solutions — logo usage

The logo is the owner-supplied artwork (`uploads/IMG_8349.jpeg`, master file kept
outside the repo). It is **not** redrawn, recoloured, stretched, cropped or
re-lettered anywhere in this codebase. Everything below is exported from that one
file.

## Files

| File | Size | Use |
| --- | --- | --- |
| `public/brand/logo-full.png` | 1083 × 408 | lockup on light backgrounds (navbar) |
| `public/brand/logo-full-on-dark.png` | 1083 × 408 | lockup on storm/near-black backgrounds (footer, 404 bar, admin login) |
| `public/brand/logo-mark.png` | 354 × 408 | emblem only, on light backgrounds |
| `public/brand/logo-mark-on-dark.png` | 354 × 408 | emblem only, on dark backgrounds |
| `public/brand/icon-64.png` | 64 × 64 | small square icon |
| `src/app/icon.png` | 512 × 512 | Next file-convention app icon |
| `src/app/apple-icon.png` | 180 × 180 | iOS home-screen icon |
| `src/app/favicon.ico` | 16/32/48/64 | browser tab |

Native aspect ratios: lockup **2.654 : 1**, emblem **0.868 : 1**. Always size by
one dimension and let the other follow.

## Component

```tsx
import { Logo, LogoMark } from "@/components/brand/Logo"

<Logo priority className="h-[38px] sm:h-[42px] lg:h-[48px] w-auto" />          // light
<Logo tone="dark" className="h-[44px] sm:h-[48px] w-auto" />                   // on dark
<LogoMark size={26} className="h-[26px] w-auto" />
```

`height` / `size` are a fallback only. Pass a `className` with a height utility
whenever the size must respond to a breakpoint — inline styles win over utility
classes, so setting both makes the responsive class a no-op.

## Placement

| Surface | Height |
| --- | --- |
| Public navbar | 38px / 42px / 48px (sm / md / lg) |
| Public footer | 44px / 48px |
| 404 page bar | 34px / 38px |
| Admin login | 44px |
| Admin sidebar + drawer | 26px emblem in a white tile |
| Preloader | emblem at 64% of an 84px tile (radius 22) |

## Colour

Light variants keep the original inks: burgundy ≈ `#731F32`, storm grey ≈
`#494D50`. The dark variants are the one permitted reversal — storm grey → white,
burgundy → `#C4708E`. The site accent `#E8A0B8` was tested first and washed the
mark out against the storm footer; do not switch back.

## Rules

- Do not put the lockup on a background it was not exported for; use the tone
  variant instead of recolouring with CSS filters.
- Do not recreate the identity as text, a CSS badge or an inline SVG letter-mark.
  If a surface needs the brand, it imports `Logo`/`LogoMark`.
- `.gitignore` must keep the `!public/brand/*.png`, `!public/images/**/*.png`,
  `!src/app/icon.png` and `!src/app/apple-icon.png` negations. A blanket `*.png`
  rule previously existed and would have deployed the site with no logo at all.
