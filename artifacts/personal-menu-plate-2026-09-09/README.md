# Personal-menu plate visual verification

The approved real plate introduction was checked against the project's complete viewport matrix:

- 1440 × 1000
- 1280 × 900
- 1024 × 900
- 768 × 1024
- 430 × 932
- 390 × 844
- 375 × 812

Each `personal-menu-*.png` file is an element-level capture of the complete personal-menu introduction.
`metrics.json` records viewport geometry, load status, label sizes, leader counts and runtime messages.

Results: the 1800 × 1665 alpha WebP loaded completely at all seven widths; document `scrollWidth` matched
the viewport; all three callout labels remained inside the figure without mutual overlap; three leader
paths and three endpoint dots remained rendered; and no browser warning, page error or runtime exception
was captured. The desktop composition stays copy-left/plate-right through 1024 px. At 768 px and below,
the plate receives its own full-width field. Phone labels remain 14.25–15 px, and the sauce leader was
corrected to land on the lower sauce arc rather than the garnish.

The source plate was also inspected on the section's paper colour and on a dark contrast surface before
integration. The outer field is genuinely transparent; no checkerboard or marble pixels remain around the
rim, and no synthetic shadow, retouching or generated food is used in the production asset.
