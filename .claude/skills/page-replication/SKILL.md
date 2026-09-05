---
name: page-replication
description: Turn an audited page into production components, driving measured geometry to zero difference.
---

# Page replication

## What it does
Converts an audited reference page into clean components that match it
structurally and dimensionally.

## When to invoke
Implementing a new route, or correcting one that fails visual comparison.

## Inputs
`.reference-cache/dom/<slug>.html`, `docs/data/reference-<slug>.json`,
`docs/data/wrappers.json`

## Workflow
1. Read the observed structure (`scripts/outline.py`). Reimplement it in clean
   components — never copy minified source.
2. Extract text and per-element class strings programmatically into
   `src/content/`. Do not retype prose.
3. Build, then measure:
   `npm run build && node scripts/compare-geometry.mjs <route> 1440`
4. Drive every section's Δtop and Δheight to 0. Only then look at pixel ratios.
5. Repeat at the narrow viewports.

## Outputs
Components under `src/`, content under `src/content/`

## Verification
`compare-geometry` reports Δ=0 for every section and for the document height;
`npm run build`, `npx tsc --noEmit` and `npm run lint` all pass.

## Failure and recovery
- **A constant offset cascades down the page** → one early box is the wrong
  height. Fix that box; do not compensate downstream.
- **Text wraps one line more than the reference** → suspect the font stack
  before the width. Compare `getComputedStyle(...).fontFamily` on both sides.
- **A short page is too tall by roughly the footer** → the `min-h-screen`
  wrapper is around the content instead of around header+main+footer.
- **One page in a family is off by a few px** → the reference is inconsistent.
  Capture that element's class string instead of assuming the family's.

## May modify
`src/**`

## Must not modify
`public/images/**`, `docs/ASSET_*`
