---
name: asset-capture
description: Collect, name, optimize and document a reference site's assets, with honest per-host authorization status.
---

# Asset capture

## What it does
Downloads every asset a reference site actually renders, stores it locally under
a meaningful name, and records provenance and authorization.

## When to invoke
After the reference audit, or whenever an asset is missing, oversized, or still
hotlinked.

## Inputs
`docs/data/reference-*.json` and `.reference-cache/dom/*.html` (both from the audit)

## Workflow
1. `node scripts/capture-assets.mjs`
   Collects `<img>` sources **and CSS `background-image` URLs** — an `<img>`-only
   scan will miss card backgrounds entirely.
2. `node scripts/optimize-images.mjs` — caps stored width at the widest slot the
   layout actually uses.
3. Cross-check the JS bundle's asset list against what rendered. Anything
   referenced but never displayed gets recorded as unused, not deleted quietly.

## Outputs
`public/images/**`, `public/icons/**`, `docs/data/asset-manifest.json`,
`docs/ASSET_MANIFEST.md`, `docs/ASSET_LICENSES.md`

## Verification
- Every manifest row has a local path, real dimensions and a checksum.
- `grep -r horizons-cdn out/` returns nothing.
- Every rendered image loads (see the e2e broken-image test).

## Failure and recovery
- **Filename ends up containing a URL path** → the source URL has no file
  extension (Unsplash). Derive the extension from `content-type`.
- **An asset is not first-party** → say so. Record the real host and licence in
  `ASSET_LICENSES.md`. Never relabel it to make the table uniform.
- **Fetch fails** → record the failure in the manifest; do not drop the row.

## May modify
`public/images/**`, `public/icons/**`, `public/fonts/**`, the two asset docs

## Must not modify
`src/**`, `tests/**`
