# Progress

_Compact resumable state. Update at every phase boundary._

## Status: homepage complete and verified; 12 inner routes remain

### Done
- **Bootstrap** — Next.js 15 + TS + Tailwind v3 (v3 pinned deliberately), ESLint, Prettier, Playwright.
- **Reference audit** — `scripts/crawl-reference.mjs` renders all 13 routes, dumps DOM to
  `.reference-cache/dom/` and measurements to `docs/data/reference-*.json`.
- **Design system** — tokens, `glass`/`glass-strong`/`glass-dropdown`, keyframes and the
  1400px/2rem container all copied from *measured* values, not guessed.
- **Assets** — 38 images + favicon downloaded to `public/`, background-images included,
  resized to a 1600px cap (25MB → 8.4MB). Poppins 400/600/700/800 self-hosted.
- **Layout** — Header (scroll state, dropdown, mobile menu), Footer, `Reveal` primitive.
- **Homepage** — all 8 sections built and verified.

### Verified numbers (homepage)
| Viewport | Δ doc height | Changed px | Ratio | Status |
|---|---:|---:|---:|---|
| desktop-1440 | 0 | 22,706 | 0.16% | PASS |
| mobile-390 | 0 | 7,412 | 0.10% | PASS |

Every homepage section matches the reference on both top offset and height (Δ=0).

### Remaining
12 routes: `/about`, `/resource-center`, `/knowledge-base`, `/pgm-price-tracker`,
`/service-areas`, and 7 resource articles. Plus their `/resource-center/<slug>` aliases.

### Next action
Build `/about` using the established loop, then the rest.

### The loop that works
1. `python3 scripts/outline.py .reference-cache/dom/<slug>.html - 8` — read observed structure.
2. Author the component.
3. `npm run build && node scripts/compare-geometry.mjs /<route> 1440` — drives Δ to 0 per section.
   This is the highest-signal tool: it names the box that is the wrong size.
4. `node scripts/capture-local.mjs --only <slug>` + `node scripts/compare-screenshots.mjs`.
5. `node scripts/diff-bands.mjs <slug> <viewport>` then `scripts/crop.mjs` to eyeball a region.

### Known issues
- Local console 404s for `*/index.txt?_rsc=` are Next prefetching routes not yet built.
  They should disappear once all routes exist — re-check at the end.

### Environment
Static server for captures: `npx serve out -l 3000` (must be running for `capture-local`).
