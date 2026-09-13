# Self-hosted fonts by role

Approved request: `design/references/typography-role-brief-2026-09-13.md`.

- Spectral400 /500 /400italic: static official Google Fonts TTFs, subset with fontTools4.61.1 to Cyrillic and basic Latin.
- Golos Text: official variable wght400–900 TTF, same two subsets. One variable file per script supplies400/500/600 without synthesis.
- IBM Plex Mono400: unchanged official Google Fonts v20 Cyrillic/Latin WOFF2 subsets, preserving the OFL reserved font name. Latin also contains three combining marks outside the CSS range; they are harmless and not requested. All digits have equal600-unit advance widths.

All ten fonts total179140 bytes. Cyrillic first-screen preloads Spectral400 and Golos Text total36360 bytes. No runtime Google Fonts requests. OFL licenses are adjacent (`SPECTRAL-OFL.txt`, `GOLOS-TEXT-OFL.txt`, `IBM-PLEX-MONO-OFL.txt`).

`role-fonts-manifest.json` records source URLs, pinned commits, SHA256, coverage, actual style/weight, variable axes and output hashes. Source font paths in that manifest refer to the reproduction output, not public URLs.

Reproduce with `scripts/build-role-fonts.py` in a separate temporary directory; see its arguments. Python dependencies: fonttools4.61.1, brotli1.2.0, zopfli0.4.3. Preserve the downloaded IBM files byte-for-byte. Spectral/Golos retain kern/ligatures, tabular/lining figures and Cyrillic combining-mark shaping.

Caveat is optional and unused. Historical approved mockups remain for reference; Bellota is removed from active CSS/app fonts/public fonts.
