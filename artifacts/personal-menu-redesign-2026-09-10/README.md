# Personal-menu responsive verification — 2026-09-10

The final implementation contains four live callouts: `Утиная грудка`, `Печёные овощи`,
`Нежное пюре` and `Соус из красных ягод`. The later user instruction removes the
`Свежая зелень` callout and its leader from every responsive SVG group.

## Final captures

- `personal-menu-1440-opening-final.png`, `personal-menu-1440-plate-final.png`,
  `personal-menu-1440-closing-final.png`
- `personal-menu-1280-visual-check.png`
- `personal-menu-1024-visual-check.png`
- `personal-menu-768-opening-final.png`, `personal-menu-768-plate-final.png`
- `personal-menu-430-visual-check.png`
- `personal-menu-390-final.png`
- `personal-menu-375-visual-check.png`
- `personal-menu-360-visual-check.png`

`responsive-metrics-final.json` records the final browser measurements. At every tested
width the document width equals the viewport width, all four notes stay inside the plate
stage without note-to-note overlap, the active SVG group exposes four paths and four endpoint
dots, the 1800 px source image loads, and the CTA remains at least 58 px tall with `#contact`
as its destination.

The 390 px capture uses a deliberately tall viewport so the complete authored phone section
can be reviewed in one image; it is not a separate CSS breakpoint.
