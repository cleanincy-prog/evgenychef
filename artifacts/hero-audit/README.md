# Hero audit: collage readability

Audit date: 2026-08-30  
Scope: read-only inspection of the current hero, internal design documents and external references. No UI or project docs were changed.

## Current screenshots

- Desktop 1440 × 1000: [`hero-desktop-1440x1000.png`](./hero-desktop-1440x1000.png)
- Mobile 390 × 844: [`hero-mobile-390x844.png`](./hero-mobile-390x844.png)

## What is not working

1. **The overlay removes the photographic evidence.** On desktop `.hero-wash` combines a horizontal veil of 92% at the left, 82% around 42% width and 78% on the right with a second vertical veil of up to 60% at the top and 76% at the bottom. The composite leaves only about:
   - 3.2% of the source image at the top-left;
   - 8% at the left-middle;
   - 22% at the right-middle;
   - 5.3% at the bottom-right.
   Faces, dishes and events therefore merge into one brown-black texture instead of reading as a collage.
2. **Two cells escape the veil and look detached.** `.tile-dessert` and `.tile-chef-video` are promoted to `z-index: 2`, above the `z-index: 1` wash. Together they occupy roughly 12.3% of the 1440 × 1000 viewport, while the other 59 images remain below the veil. The eye reads a portrait and a film-card over a dark background, not sixty related documentary frames.
3. **The density has no visible hierarchy.** Fifteen focal cells plus forty-five supporting cells are technically present, but most supporting crops are too small and too uniformly dark to communicate their different roles. The collage lacks a clear sequence of portrait → event → process → dish.
4. **The mobile composition is no longer a collage.** Below 560 px all hero tiles are hidden except one portrait and one 16:9 video; the supporting sheet is `display: none`. The overlay is fully opaque through 60% of the hero and the screenshot does not reveal media until about y=583, or 69% of the 844 px viewport. The result is a text screen followed by a two-frame diptych.
5. **The text stack consumes the entire visual opening on mobile.** Eyebrow, three-line headline, paragraph, primary action, internal route and motion control all precede the media. The collage idea arrives after the decision layer instead of establishing the service immediately.

## External references and usable principles

These are principle references, not layouts to copy.

| Reference | Useful principle | Exclusion |
|---|---|---|
| [Marrow Private Chefs](https://marrowprivatechefs.com/) | Closest direct dark-collage reference: individual people and event scenes stay recognizable behind restrained tonal unification; the headline has one dominant reading axis. | Do not copy its regular grid, brand, copy or exact hero geometry. |
| [Studio Feixen](https://www.studiofeixen.ch/) | A dark photographic field can retain distinct objects and saturated anchor colors when darkness is concentrated locally and the header is visually separated. | Do not copy its agency identity, icons or print-work imagery. |
| [Eugénie Colleville](https://www.eugeniecollevilleparis.com/) | Text contrast can come from selecting calm negative space inside photography rather than placing a uniform black veil over the whole image. | Single-photo composition is only a contrast/cropping reference, not a replacement layout. |
| [MOLD case study by House of 207](https://houseof207.com/mold-magazine/) | Grid modules change size according to content type; mobile preserves editorial intent through a clear vertical reading sequence rather than scaling the desktop grid. | Do not copy MOLD's identity, colors, module shapes or publication structure. |
| [The Modern House Journal](https://themodernhouse.com/journal/) | One establishing image can carry the opening while labels and navigation remain structurally separate; not every image needs text placed over it. | Do not copy the masthead, property/editorial taxonomy or exact layout. |

Reference screenshots:

- [`reference-marrow-desktop.png`](./reference-marrow-desktop.png)
- [`reference-studio-feixen-desktop.png`](./reference-studio-feixen-desktop.png)
- [`reference-eugenie-colleville-desktop.png`](./reference-eugenie-colleville-desktop.png)
- [`reference-mold-case-study-desktop.png`](./reference-mold-case-study-desktop.png)
- [`reference-modern-house-journal-desktop.png`](./reference-modern-house-journal-desktop.png)

## Recommended direction: selective veil + documentary sequence

Keep the project-specific mosaic, but stop treating every cell as one background.

- Limit the readability treatment to a left text corridor roughly 46–52% of the desktop width. Use a local solid-to-transparent field or a maximum 55–65% veil behind copy; the right 48–54% should have no global black overlay.
- Remove the foreground/background split between the portrait/video and the other frames. All key media should belong to the same plane. Use crop, scale and a restrained per-image tonal adjustment to protect text, not `z-index` exceptions.
- Reduce the visible first-screen set to about 18–24 frames and create 5–7 deliberate anchors: chef portrait, team/event, cooking process, plated result, environment and film. More frames can continue below or remain in the source archive.
- Keep full color in the anchors. Supporting frames may use a mild shared treatment, for example slightly reduced saturation and approximately 78–90% brightness, but never a full-page black veil.
- On mobile, separate reading and evidence: a compact dark copy block followed by a purpose-built 3–4-frame montage (portrait + wide event/process + detail + optional 16:9 film). This makes the collage legible without putting body copy over faces or flames.
- Preserve the current square edges, project fonts, first-person promise, real local photography and reduced-motion behavior.

This is the best balance because it keeps the approved documentary concept while fixing the exact failure the user identified: the images become evidence again, not texture.

## Alternative 1: local contrast corridor

Smallest structural change. Keep most of the current grid, but replace the full-screen two-axis wash with a narrow left-side contrast corridor that fades out before the promoted portrait. Reduce the number of tiny cells only where they are illegible. This is faster to implement, but the first screen may still feel visually busy and the mobile hero still needs a separate montage.

## Alternative 2: gallery first, copy on a dark band

Let the collage occupy the full upper field at normal exposure and place the promise/actions in an opaque dark band at the lower-left or bottom. On desktop the band may overlap the grid edge without covering key faces; on mobile the band comes first and the collage follows. This gives the strongest image clarity and simplest contrast model, but changes the approved hero hierarchy more substantially.

## Implementation guardrails

- Do not introduce blur, glass, glow, rounded cards, generic bento geometry or a stock hero template.
- Do not brighten every image uniformly; crop and exposure need to follow the semantic role of each frame.
- Do not restore sixty tiny mobile tiles.
- Verify the chosen direction at 1440, 1280, 1024, 768, 430, 390 and 375 px, including headline wraps, CTA targets, image focal points, video crop and reduced motion.
