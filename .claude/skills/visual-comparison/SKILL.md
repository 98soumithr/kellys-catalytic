---
name: visual-comparison
description: Capture matched screenshots, diff them, localise the cause, and iterate to threshold.
---

# Visual comparison

## What it does
Photographs reference and replica identically, diffs them, and points at the
region responsible.

## When to invoke
After a route is built, and before any release claim about fidelity.

## Inputs
A running local server (`npx serve out -l 3000`) and network access to the reference.

## Workflow
```
node scripts/capture-reference.mjs --only <slug> --viewports <names>
node scripts/capture-local.mjs     --only <slug> --viewports <names>
node scripts/compare-screenshots.mjs
node scripts/diff-bands.mjs <slug> <viewport> 500     # which 500px band is red
node scripts/crop.mjs <slug> <viewport> <y> <h> out.png
# then actually Read out.png
```
If the numbers are bad, run `compare-geometry.mjs` before touching CSS — it is
far more specific than a percentage.

## Outputs
`public/screenshots/{reference,local,diff}/**`, `docs/data/visual-report.json`,
`docs/VISUAL_QA.md`

## Verification
Full page ≤3% changed pixels, major section ≤2%, and two consecutive passes with
no regression. Look at the diffs yourself.

## Failure and recovery
- **Whole page reads as changed** → a height difference is shifting everything.
  Check `Δheight` first.
- **Animated sections diff against blank space** → the two captures did not use
  the same scroll-and-settle routine. Both sides must use `settlePage`.
- **Stuck after 12 passes** → record measured residuals and causes, make one
  architecture-level change, run three more passes, then report a blocker.

Never substitute a screenshot of the reference for real markup.

## May modify
`public/screenshots/**`, `docs/VISUAL_QA.md`, focused `src/**` corrections

## Must not modify
`tests/**`, `docs/ASSET_*`
