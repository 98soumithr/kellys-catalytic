---
name: release-verification
description: Run the full build, type, lint, test, link, accessibility and visual suite before declaring the replica done.
---

# Release verification

## What it does
Runs everything that must pass before the project can be called complete, and
collects the evidence.

## When to invoke
At the final checkpoint, and after any change that touches shared code.

## Workflow
```
npm run build
npx tsc --noEmit
npm run lint
npm run test:e2e
node scripts/validate-links.mjs
node scripts/capture-local.mjs && node scripts/compare-screenshots.mjs
grep -r horizons-cdn out/ || echo "no reference hotlinks"
```
Then review console output per route, confirm the asset manifest matches
`public/`, and update every doc status.

## Outputs
`docs/TEST_REPORT.md`, `docs/VISUAL_QA.md`, `docs/PROGRESS.md`, `docs/HANDOFF.md`

## Verification
Build, types, lint and tests pass; every route resolves; no broken images; no
unexpected console errors; no horizontal overflow; visual thresholds met.

## Failure and recovery
- Report what actually failed, with the output. Never suppress a test, relax a
  threshold, or assert a pass from an exit code you did not read.
- Do not claim "pixel perfect" unless the captured numbers support it. Quote the
  measured percentages instead.

## May modify
`docs/*.md`

## Must not modify
`src/**`, `tests/**` (fix those under their own skills, then re-run this one)
