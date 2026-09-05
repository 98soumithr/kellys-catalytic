# Progress

_Compact resumable state. A fresh session should be able to continue from this file alone._

## Status: complete — all 10 checkpoints met

| # | Checkpoint | State |
|---|---|---|
| 1 | Repository bootstrapped | ✅ |
| 2 | Reference audit complete | ✅ 13 routes crawled and measured |
| 3 | Assets complete | ✅ 39 images + favicon + 4 font files, deterministic naming |
| 4 | Shared components complete | ✅ SiteShell, Header, Footer, Reveal, Accordion, article renderer |
| 5 | Homepage complete | ✅ 8 sections, Δ0 |
| 6 | Internal pages complete | ✅ 23 generated routes |
| 7 | Responsive pass complete | ✅ 7 viewports, 0 height mismatches |
| 8 | Functional pass complete | ✅ 144 passed / 0 failed |
| 9 | Visual thresholds achieved | ✅ 91/91, worst 1.12%, median 0.24% |
| 10 | Release verification complete | ✅ build, types, lint, tests, links, visual |

## Verified numbers
- **Geometry:** every route Δ0 vs the reference at 1440px (doc height and per-section top/height).
- **Visual:** 91/91 comparisons pass (13 routes × 7 viewports). Worst 1.12%
  (resource-center @768), median 0.239%, best 0.065%. Zero height mismatches.
- **Tests:** 144 passed, 0 failed, 38 intentional project-scoped skips.
- **Links:** 25 pages, 925 links, 382 asset refs, 0 problems, 0 CDN hotlinks.
- **Lighthouse:** Performance 90-98, Accessibility 94-96, Best Practices 100, SEO 100
  across five representative routes.

## Known deviations (all deliberate, all in DECISIONS.md)
1. One shared title/description across all routes — replicating the reference SPA (D-004).
2. Unknown paths render homepage pixels but return **404** rather than 200 (D-005).
3. `/automotive-catalytic-converter` overflows slightly at 375/390px — **the
   reference does too**; reproduced, not corrected.
4. Images capped at 1600px and re-encoded to WebP (D-010, D-017); the reference
   uses a resizing CDN in front of the originals.
5. Resource card backgrounds render as lazily-loaded `<img>` rather than the
   reference's CSS `background-image` (D-018) — pixel-identical, but deferrable.
6. Accessibility tops out at 94-96 because of inherited contrast and heading order
   (D-019).

## If you pick this up again
The loop that works:
```bash
npm run build && node scripts/compare-geometry.mjs <route> 1440   # drive Δ to 0 first
node scripts/capture-local.mjs --only <slug> && node scripts/compare-screenshots.mjs
node scripts/diff-bands.mjs <slug> <viewport>                     # localise
node scripts/crop.mjs <slug> <viewport> <y> <h> out.png           # then look at it
```
A static server must be running for local captures: `npx serve out -l 3000`.

## Traps already paid for
- Don't override `fontFamily.sans` (D-006). · Keep `min-h-screen` in `SiteShell` (D-007).
- Don't pipe generator scripts into `head` — SIGPIPE truncates their output file.
- Reference and local captures must share `settlePage`, which waits out
  framer-motion's inline-style animations (D-013).
- Content under `src/content/` is generated. Edit the extractors.
