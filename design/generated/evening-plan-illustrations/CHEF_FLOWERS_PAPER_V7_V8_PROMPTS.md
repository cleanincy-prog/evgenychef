# Approved conversation illustration V7 → V8

Method: built-in `image_gen`, one call for the scene correction and one later user-requested background edit. Output: `public/media/evening-plan/conversation-evgen-paper-flowers-v8.png`, 1536×1024. User approved each displayed result and then authorized publication. The meeting is an illustrative scene, not a documentary photograph.

V7 inputs: user photo `design/references/chef-2026-09-11/user-chef-photo-112114.png` and previous `public/media/evening-plan/conversation-evgen-light-pencil-v6.png` for the woman/composition only. V7 output: `/Users/dmitro/.codex/generated_images/01a08f92-d2a6-73f3-b64e-26816185d1cd/exec-55bafbd1-085c-4ddc-9721-545c0717c355.png`.

## Exact V7 prompt

```text
Use case: identity-preserve.
Asset type: website editorial pencil illustration; one edited output, landscape 1536 × 1024.

INPUT ROLES:
Image 1 is the AUTHORITATIVE IDENTITY AND HEAD-ORIENTATION REFERENCE: the new user photo of the actual chef looking down almost frontally.
Image 2 is the EDIT TARGET and the authoritative reference for the entire composition, the woman's exact appearance and pose, paper, and delicate hand-drawn graphite technique.

Edit Image 2. Rebuild ONLY the chef's head/face to accurately capture the real chef in Image 1 and add the specified tabletop props. Preserve the woman exactly, her face, hair, clothing, arms and pose; preserve the chef's white jacket, pinstriped apron, natural medium build, writing pose, both hands, open notebook, table, wide airy framing, cream ivory paper, fine graphite contours and light open hatching. The chef's RIGHT hand writes in the open notebook; his LEFT hand steadies it.

CHEF LIKENESS:
Use the near-frontal downward head orientation ALREADY VISIBLE in Image 1, with eyes looking DOWN into his notebook, head centered upright without the sideways tilt of Image 2. Accurately draw the rounded bald scalp, actual cheek and nose proportions, jaw width, ears, short compact grey beard and moustache from Image 1. Give him only a tiny gentle CLOSED-MOUTH smile through a very slight lift at the corners; no visible teeth, no big grin, no laughing expression. Preserve his real facial structure while adapting it entirely into drawn contours. Do not transplant photographic pixels. He must look like the person in Image 1 rendered by the same pencil artist who drew the woman.

TABLETOP ADDITIONS:
Add a SMALL unobtrusive low ceramic bud vase with only 2–3 delicate flower stems, situated in the middle of the table. Keep the arrangement low and sparse, not a large bouquet. Add EXACTLY TWO ordinary clear SHORT water tumblers, visibly partly filled with water, one for each person. Space the two glasses and vase clearly apart from each other, both hands and notebook. Make only the slight tabletop spacing adjustment required to accommodate these three props. No wine glasses, no bottles, no cups, no third glass, no additional decoration. Draw all added props with the same light graphite outlines and sparse hatching.

STYLE AND INVARIANTS:
This must be a real delicate pencil DRAWING, as light and airy as the woman in Image 2, with visible fine graphite contour work, selective loose hatching and generous unmarked cream paper. No grayscale photo appearance, no photographic facial tones, no skin pores, no photo grain, no dense tonal modelling or dark painted areas. Maintain the landscape composition and existing paper/background. Remove all kitchen cabinets, knives, wall and phone/screenshot UI from the photographic reference; none belongs in the illustration. No text, watermark, extra people or extra objects.
```

## Exact V8 background edit prompt

Input: the approved V7 above. Generated output: `/Users/dmitro/.codex/generated_images/01a08c36-a030-78c3-b891-ca716bb9056a/exec-28ff4e26-9ace-4dfd-ae49-96f3c0a11155.png`. This output was copied unchanged into the project; the existing CSS supplies the final page-paper blending.

```text
Use case: precise-object-edit. Asset type: preview of an approved pencil illustration for a website. Edit the supplied image only by replacing the light paper/background color with the exact website paper color #F4EFE5 (sRGB 244,239,229). Make all empty background and paper areas a uniform flat #F4EFE5 all the way to every canvas edge, so it blends seamlessly onto a webpage of that color. Remove the previous off-white background variation and grain in empty areas. Preserve the approved graphite drawing EXACTLY: the real chef's face, head, subtle closed-mouth smile, downward gaze into the notebook, all facial proportions, the woman's face/hair/pose, both bodies and clothing, every hand and pencil, notebook, table contours, small flower vase and exactly two water glasses. Preserve the original delicate pencil contours and hatching, with no redrawing or creative changes, no sharpening, no darker graphite, no change in composition, crop, scale or 1536x1024 landscape dimensions. Treat unmarked interiors of the drawn figures, clothes, notebook, vase and table as the same #F4EFE5 paper, while retaining existing pencil marks. No white rectangle, border, vignette, gradient, shadow around the image, new text, new objects or watermark. Change the paper/background color only; the approved illustration must remain visually identical.
```
