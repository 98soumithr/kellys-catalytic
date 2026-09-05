# Responsive matrix

All 13 routes were captured and diffed at all seven required viewports — 91 pairs.
Reference and replica use the identical capture routine (`scripts/capture.mjs`), so
neither side is photographed in a different animation state.

| Viewport | Dimensions | Routes passing | Mean diff | Worst diff | Height mismatches |
|---|---|---|---:|---:|---:|
| desktop-1440 | 1440×1200 | 13/13 | 0.154% | 0.20% (anti-theft-compliance) | 0 |
| laptop-1366 | 1366×768 | 13/13 | 0.197% | 0.32% (oxygen-sensor) | 0 |
| small-laptop-1024 | 1024×768 | 13/13 | 0.357% | 0.91% (about) | 0 |
| tablet-768 | 768×1024 | 13/13 | 0.316% | 1.12% (resource-center) | 0 |
| mobile-430 | 430×932 | 13/13 | 0.296% | 0.70% (material-recovery-pgm-prices) | 0 |
| mobile-390 | 390×844 | 13/13 | 0.344% | 0.72% (material-recovery-pgm-prices) | 0 |
| mobile-375 | 375×812 | 13/13 | 0.288% | 0.46% (anti-theft-compliance) | 0 |

**Every route matches the reference's document height exactly at every viewport.**

## Layout transformations verified
| Breakpoint | Change |
|---|---|
| `md` (768) | Desktop nav ⇄ hamburger; feature cards 1 ⇄ 2 columns; resource grid 1 ⇄ 2 |
| `lg` (1024) | "Get Quote" appears; hero and product rows go side-by-side (alternating); process steps switch from stacked cards to a 4-column row; resource grid → 4 |
| `sm` (640) | Hero buttons stack ⇄ inline |

The "How to Sell" section renders **two separate markups** — a 4-column desktop
grid and a stacked mobile list — exactly as the reference does, rather than one
grid that reflows.

## Horizontal overflow
Zero unintended overflow across all seven viewports, asserted per route/viewport in
`tests/e2e/responsive.spec.ts`.

One exception is **inherited, not introduced**: `/automotive-catalytic-converter`
overflows slightly at 390px and 375px. The reference overflows identically at those
widths (confirmed in both capture logs), so it is reproduced rather than corrected.

## Touch targets
Mobile nav links are full-width with `py-2` inside `p-6`; CTA buttons are `py-3`–`py-5`.
The mobile toggle is a 24px icon in a focusable button — matching the reference,
which is on the small side of the 44px guideline but not changed here, since
enlarging it would alter header geometry.
