# Event-format blueprint concepts — 2026-09-09

Three approved event-specific decision aids. They keep the current 1774 × 887 underlay size and use the
real project copy and photographs in separate review composites. As of 2026-09-09, the private-event and
masterclass concepts remain active. The private-dinner concept is retained as provenance but is superseded
in format `01` by `design/generated/private-dinner-seven-plates-v1/` after the user requested realistic
food imagery in two rows with no labels.

## Scoped audit and plan

- `EventFormats` in `app/page.tsx` provides three distinct stories and foreground directions.
- Private dinner is copy-left / portrait-photo-right and promises a personal seven-course route.
- Private event is copy-left / landscape-photo-right and shows outdoor live cooking for a fluid social
  format built around small bites.
- Masterclass is landscape-photo-left / copy-right and shows a chef demonstration around a workbench.
- The user's supplied screenshot confirms the paper, line quality, restrained colour and the requirement
  that drawing, copy and documentary photo read as one field.
- Existing typography, wording, photograph crops, square edges and 2:1 canvas remain fixed. Only the
  event-specific drawing topology changes.

## Concept distinction

1. **Private dinner (superseded in the live block):** ingredients and mise en place converge into seven
   courses and an intimate table.
2. **Private event:** live griddle production branches into bite assembly, tray circulation and refill.
3. **Masterclass:** demonstration branches into two practice stations, a correction loop and a shared
   workbench with three outcomes.

No card system, UI kit or generic flowchart is used. The user approved all three directions on
2026-09-09, then explicitly replaced the private-dinner drawing later that day. The remaining two active
concepts keep the copy/photo pair readable above a complete drawing.

## Verification result

- `npm test` passes: the Vinext production build completes and all eight Node regression tests pass.
- Browser checks passed at 1440 × 1000, 1280 × 900, 1024 × 900, 768 × 1000, 430 × 900,
  390 × 844 and 375 × 812. Measured horizontal overflow is zero at every width.
- Every active drawing reports its complete 1774 × 887 natural size and opacity `1`; no drawing is
  hidden on tablet or phone.
- At 821 px and above, each sheet remains the background of its established live copy/photo field.
  At 820 px and below, the live copy/photo pair remains first and the complete 2:1 sheet resolves the
  same row directly beneath it. At 375 px the measured drawing gaps are 26.1 px, 11.0 px and 17.2 px,
  with no overlap or row overflow.
- The inspected 375 px browser console has zero warnings or errors. The change introduces no new
  interaction, loading state, form state, UI library or animation.

## Final anti-template audit

- The former repeated underlay logic made different services feel interchangeable. It is replaced by
  three content-specific process topologies: course choreography, circulating-tray service and a
  demonstration/practice/feedback learning loop.
- Exact live Russian copy and existing documentary photographs remain unchanged and separate from the
  text-free generated sheets.
- Unjustified cards, equal-radius surfaces, shadows, gradients, glass, glows, stock icons, new CTA,
  decorative animation and UI-library themes remain absent.
