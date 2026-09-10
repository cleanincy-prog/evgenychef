# Masterclasses — six techniques on linen

Source: the user’s screenshot `Снимок экрана 2026-09-10 в 12.41.47.png` and explicit six-stage implementation brief, 2026-09-10.

The built-in image_gen tool generated this original, text-free illustrative scene once. The production file is `public/media/event-formats/masterclasses-six-stages-flatlay.webp`, 2071 × 759 pixels, 422836 bytes. It is a format-only WebP conversion (quality 88) of the generated PNG; no objects were cropped, retouched, recoloured or stretched. The exact generation prompt is retained in PROMPT.md.

The scene depicts chopping vegetables, kneading dough, shaping ravioli, making sauce, searing a scallop and finishing a plated dish. It is an illustrative technique sequence, not documentary evidence of a completed class or a fixed promised menu. The six Russian captions are live HTML in app/masterclasses-section.tsx; there are no baked labels.

The documentary upper image remains the user-provided public/media/event-formats/masterclass.jpg (1144 × 770). No substitute chef portrait or screenshot crop is used. No placeholder assets remain.


## Same-paper revision requested by the user

Active production asset: `public/media/event-formats/masterclasses-six-stages-paper-v2.webp`, 2071 × 759, lossless WebP with a real alpha channel. The original linen version remains as history and is no longer referenced by the component.

Built-in image_gen performed the background edit. Two direct transparency attempts returned RGB checkerboards and were rejected outside the project. The final edit removed the textile, returning a nearly uniform #f2ece2 backing rather than exact #f4efe5. See PAPER_EDIT_PROMPT.md for the exact accepted edit prompt. For production preparation, the connected exterior backing was converted to alpha with the installed Sharp library, retaining the generated foreground RGB values and partial local contact shadows. The clear bottom reserve and all empty exterior now show the section's exact --paper colour. 914079 pixels (58.15%) are fully transparent; dimensions and composition were retained. The preparation metrics are in alpha-preparation.json. This is an edited generated illustration, not a documentary photo.
