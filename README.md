# Catalit replica

An authorized, high-fidelity replica of **https://catalit.in/**, rebuilt on
Next.js as a static site. All 13 routes match the reference's measured geometry
exactly, and 91/91 screenshot comparisons across seven viewports pass.

## Quick start
```bash
npm install
npx playwright install chromium
npm run dev            # http://localhost:3000
```

## Build and serve
```bash
npm run build          # static export to out/
npx serve out -l 3000  # required before local screenshot captures
```

## Verify
```bash
npx tsc --noEmit
npm run lint
npm run test:e2e                    # 182 Playwright tests
node scripts/validate-links.mjs     # links, assets, contact protocols
npm run visual-qa                   # capture both sides, diff, report
```

## Re-audit the reference
```bash
node scripts/crawl-reference.mjs                                   # render + measure
node scripts/capture-assets.mjs && node scripts/optimize-images.mjs
node scripts/generate-content.mjs && node scripts/generate-article-content.mjs
```
Content modules under `src/content/` are **generated**. Edit the extractors, not
the output.

## The tool to reach for first
```bash
node scripts/compare-geometry.mjs /about 1440
```
It prints the top offset and height of every section on both the reference and the
replica. A pixel percentage tells you a page is wrong; this tells you which box.

## Docs
`CLAUDE.md` — working rules · `docs/HANDOFF.md` — start here ·
`docs/DECISIONS.md` — why things are the way they are ·
`docs/DESIGN_SYSTEM.md` · `docs/ROUTE_INVENTORY.md` · `docs/ASSET_MANIFEST.md` ·
`docs/VISUAL_QA.md` · `docs/TEST_REPORT.md`
