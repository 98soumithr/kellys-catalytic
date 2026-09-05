# Catalit replica

Authorized, high-fidelity replica of **https://catalit.in/** on Next.js.
Visual and behavioural fidelity to the reference outranks every other concern.

## Commands
```bash
npm run dev                # localhost:3000
npm run build              # static export to out/
npx serve out -l 3000      # serve the export (required for local captures)
npx tsc --noEmit           # types
npm run lint
npm run test:e2e           # Playwright: routes, interactions, responsive, a11y

node scripts/crawl-reference.mjs              # re-audit the reference
node scripts/compare-geometry.mjs <route> 1440 # ← the tool that finds real bugs
npm run visual-qa                              # capture both sides, diff, report
node scripts/validate-links.mjs
```

## Architecture
- Next.js App Router, **static export** (`output: 'export'`), TypeScript, **Tailwind v3**.
- `src/app/**` routes · `src/components/{layout,sections,ui,article}` ·
  `src/content/**` extracted copy · `src/data/**` config · `src/styles/globals.css` tokens.
- Page chrome comes from `SiteShell`, never the root layout.
- Article routes render a shared block model, not per-page markup.

## How to work on this
**Measure, don't guess.** The reference is a client-rendered SPA: fetching a URL
returns an empty shell, so use the crawler and the browser, never curl.

Fix geometry before pixels. `compare-geometry.mjs` reports per-section top and
height for both sides and names the box that is wrong; a page-level diff
percentage does not. Drive every Δ to 0, then check pixel ratios.

## Rules that came from real bugs
- **Never override `fontFamily.sans` in Tailwind.** The reference keeps the stock
  stack and applies Poppins only via `body`; pages wrapped in `font-sans` render
  in the system font.
- `.gradient-text`, `.image-overlay`, `.btn-hover-glow` are **dead classes** on the
  reference. Keep them inert or the replica stops matching.
- Match icon `width`/`height` to the reference exactly — inside a flex button a
  4px icon difference changes text wrapping.
- Collect CSS `background-image` assets, not just `<img>`.
- Never pipe a generator script into `head`; SIGPIPE truncates its output file.
- Never hotlink `horizons-cdn`. Enforced by a test and by `validate-links.mjs`.

## Deliberate deviations
Recorded in `docs/DECISIONS.md`. The big one: the reference serves one identical
title/description on all 13 routes and falls through to the homepage for unknown
paths. **This is replicated on purpose** and caps the Lighthouse SEO score. Do not
"fix" it.

## Definition of done
Build, types, lint and tests pass · every route resolves · no broken images · no
horizontal overflow at any of the 7 viewports · no full-page diff >3% and no major
section >2% · header/hero/CTA/footer reviewed by eye.

## Reference docs
`docs/PROGRESS.md` (resumable state) · `docs/DECISIONS.md` (append-only) ·
`docs/DESIGN_SYSTEM.md` · `docs/ROUTE_INVENTORY.md` · `docs/ASSET_MANIFEST.md` ·
`docs/VISUAL_QA.md` · `docs/HANDOFF.md`
