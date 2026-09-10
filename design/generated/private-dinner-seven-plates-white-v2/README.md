# Seven-course illustration: white exterior, 2026-09-10

Input: `public/media/event-formats/private-dinner-seven-plates-v1.jpg` (existing illustrative scene).
Output: `public/media/event-formats/private-dinner-seven-plates-white-v2.png`, 1536 × 1024 RGB.
Tool: built-in ImageGen, referenced-image edit. The earlier alpha attempt was rejected because it baked a checkerboard into RGB pixels. This second edit uses opaque white and CSS multiply; it is not represented as a transparent PNG. Background samples are 253–255, with local contact shadows. Source-fitting CSS apertures and a soft edge mask keep complete plate rims and exclude neighbouring shadows. Documentary photographs were not generated or retouched.

## Exact successful prompt

```text
Use case: precise-object-edit.
Input image 1 is the original EDIT TARGET. Change only its exterior linen background.
Replace ALL linen visible around and between the seven plates with a perfectly flat PURE WHITE #FFFFFF background. This is an opaque white background edit; do NOT render transparency and do NOT render any checkerboard. No cream, paper, grey, gradient, texture, tablecloth or surface grain in the empty background.
Preserve exactly the original SEVEN dishes, four complete plates in the top row and three complete plates centered in the bottom row. Keep original plate locations, relative sizes, camera angle, source framing, all plate and glass-bowl rims, food ingredients, quantities, arrangement, natural source colors and photographic texture. Preserve feta with olive; citrus salad; grilled halloumi with figs; fish with sauce; lemon granita in its glass bowl; lamb chops; yogurt and pistachios. Do not redesign, restyle or replace any dish. Do not crop or overlap plates. Keep the source's subtle local contact shadows only immediately beside the plates, fading completely to pure white; no new or broad shadows.
Output one clean photographic seven-dish composition on uniform solid opaque #FFFFFF exterior. No new objects, text, labels, numbers, logos or decorations. Only change the linen background to flat pure white; preserve the subjects.
```

The generation retains the original dish identities and arrangement but is not a pixel-identical food extraction. It remains a representative illustration rather than a promised fixed menu.
