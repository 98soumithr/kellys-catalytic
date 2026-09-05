# Handoff

## What this is
A production-ready static replica of **https://catalit.in/** — a catalytic
converter and e-waste buying business in South India. All 13 public routes are
reproduced, plus the 10 `/resource-center/<slug>` aliases the live navigation uses:
23 generated pages.

Built under explicit owner authorization to reuse the site's assets, copy and
contact details. Structure was reconstructed from the reference's *rendered DOM*
and reimplemented as clean components; no minified source was copied.

## Framework and architecture
- **Next.js 15** (App Router) with **static export** — output is plain files in `out/`.
- **TypeScript**, **React 19**, **Tailwind CSS v3** (pinned; v4 changes defaults
  that would shift rendering), Radix accordion, framer-motion, lucide icons.
- Page chrome comes from `SiteShell`, whose per-route wrapper encloses header,
  main and footer — matching the reference and avoiding a `min-h-screen` bug that
  made short pages a footer too tall.
- Page copy lives in **generated** modules under `src/content/`, extracted from the
  reference DOM and resolved against the asset manifest.
- Resource articles share one block-model renderer rather than seven bespoke pages,
  but capture class strings per element because the reference is inconsistent.

## Commands
```bash
npm install && npx playwright install chromium

npm run dev                       # http://localhost:3000
npm run build                     # static export to out/
npx serve out -l 3000             # serve it (needed for local captures)

npx tsc --noEmit
npm run lint
npm run test:e2e                  # 182 tests
node scripts/validate-links.mjs
npm run visual-qa                 # capture both sides, diff, report

node scripts/compare-geometry.mjs /about 1440   # the highest-signal debug tool
```

## Routes
Canonical (from the reference sitemap): `/` · `/about` · `/resource-center` ·
`/knowledge-base` · `/pgm-price-tracker` · `/service-areas` ·
`/automotive-catalytic-converter` · `/ceramic-monolith` · `/oxygen-sensor` ·
`/e-waste-management` · `/converter-recycling-process` ·
`/material-recovery-pgm-prices` · `/anti-theft-compliance`

Aliases: the last seven plus `knowledge-base`, `pgm-price-tracker` and
`service-areas`, all under `/resource-center/`.

## Assets
39 images + favicon, stored locally, none hotlinked (enforced by a test and by the
link validator). 34 are first-party; 6 are third-party (5 Unsplash, 1 texture) and
are labelled as such in `docs/ASSET_LICENSES.md` rather than presented as original.
Poppins 400/600/700/800 is self-hosted, so the build makes no runtime font request.
Originals were capped at 1600px wide: 25 MB → 8.4 MB with no visible change.

## Visual QA summary
91/91 comparisons pass (13 routes × 7 viewports, 1440/1366/1024/768/430/390/375).
Worst 1.12%, median 0.239%, against a 3% threshold. **Zero height mismatches** —
every route matches the reference's document height exactly at every viewport, and
every section matches on both top offset and height at 1440px.

Evidence: `public/screenshots/{reference,local,diff}/` and `docs/VISUAL_QA.md`.

## Test summary
144 passed, 0 failed, 38 intentional project-scoped skips. Build, typecheck, lint
and link validation all clean.

**Lighthouse** (static export, five representative routes):

| Route | Perf | A11y | Best practices | SEO |
|---|---:|---:|---:|---:|
| `/` | 91 | 94 | 100 | 100 |
| `/about` | 91 | 96 | 100 | 100 |
| `/resource-center` | 90 | 96 | 100 | 100 |
| `/knowledge-base` | 98 | 94 | 100 | 100 |
| `/oxygen-sensor` | 97 | 96 | 100 | 100 |

Details in `docs/TEST_REPORT.md`.

## Known deviations
1. **One title/description on every route.** The reference SPA never updates
   `document.title`; replicating that was an explicit decision (D-004). It was
   expected to cost SEO score — it did not; SEO is 100.
2. **Unknown paths return 404, not 200.** They render the homepage exactly as the
   reference does, but a static host cannot return 200 for an unknown path (D-005).
3. **`/automotive-catalytic-converter` overflows a little at 375/390px.** The
   reference overflows identically; reproduced rather than corrected.
4. **Images are re-encoded and resized** (D-010, D-017). The reference serves
   originals through a resizing CDN; a static export ships raw bytes. Verified to
   cause no visible change.
5. **Resource card backgrounds are lazily-loaded `<img>` elements** rather than the
   reference's CSS `background-image` (D-018). Pixel-identical, but deferrable —
   worth ~400KB on first load.
6. **Accessibility is 94-96, not 95+ everywhere.** The two failing audits are the
   reference's own colour contrast and heading order (D-019). Correcting them means
   changing its palette or DOM.

## Deployment
The build is a static export — any static host works.

```bash
npm run build     # produces out/
```
Upload `out/` to Netlify, Vercel, Cloudflare Pages, S3 + CloudFront, or Hostinger.

Two host settings matter:
- Serve `404.html` for unknown paths, so they show the homepage as the reference does.
- `trailingSlash: true` is enabled; keep the host's redirect behaviour consistent
  with it or internal links will double-redirect.

Set `NEXT_PUBLIC_SITE_URL` to the deployed origin so `sitemap.xml` and `robots.txt`
emit correct absolute URLs. Contact details can be overridden per environment —
see `.env.example`. No secrets are required.

## Maintenance
- **Content changes:** edit the extractors and regenerate. Files in `src/content/`
  are generated and will be overwritten.
- **Asset changes:** drop the file in `public/images` and re-run
  `node scripts/generate-content.mjs`. Layout follows the manifest's recorded
  dimensions, so a same-ratio replacement changes nothing else.
- **If the reference changes:** re-run `scripts/crawl-reference.mjs`, then
  `compare-geometry.mjs` per route to see what moved.
- **Before shipping any change:** `npm run build && npm run test:e2e && npm run visual-qa`.

`docs/DECISIONS.md` explains why several counter-intuitive things are the way they
are. Read D-003, D-006 and D-007 before "fixing" anything that looks wrong.
