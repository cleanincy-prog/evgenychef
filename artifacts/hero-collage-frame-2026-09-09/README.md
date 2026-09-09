# Hero collage-frame verification — 2026-09-09

These captures verify the user-selected `04 · Коллаж-рамка` implementation against the
project's mandatory viewport matrix.

| Capture | Viewport | Composition checked |
|---|---:|---|
| `hero-1440.png` | 1440 × 1000 | Full archive frame; 56/44 central editorial spread |
| `hero-1280.png` | 1280 × 900 | Narrower desktop crop and title measure |
| `hero-1024.png` | 1024 × 900 | Compact 12 × 10 archive and central spread |
| `hero-768.png` | 768 × 1024 | Tablet spread; portrait aperture clears source bands |
| `hero-430.png` | 430 × 932 | Purpose-built vertical copy/portrait centre |
| `hero-390.png` | 390 × 844 | Phone title wrapping and four-sided archive rails |
| `hero-375.png` | 375 × 812 | Narrow-phone fit, caption and header targets |

Automated browser measurements at every width found 94 Hero collage tiles, zero hidden tiles, zero broken
or incomplete Hero images, and zero document-level horizontal overflow. Runtime exception count was zero.
Both header links measured at least 44 px high. Every one of the five controlled title lines stayed inside
the copy field, and the portrait stayed inside the central spread.

Visual inspection confirms that the collage reads as a continuous frame on all four sides, the copy and
portrait read as one central editorial object, the phone composition is not a stacked desktop shell, and
the embedded black phone bands in `chef-hero-apron.jpg` do not enter any visible aperture. The transition
to the following paper section remains clean. Production build, ESLint, eight focused regression tests and
`git diff --check` pass.
