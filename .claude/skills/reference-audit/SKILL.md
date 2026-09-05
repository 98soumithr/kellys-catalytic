---
name: reference-audit
description: Crawl and measure a client-rendered reference site, capturing rendered DOM, computed styles and hidden interaction states.
---

# Reference audit

## What it does
Renders every route of a reference site in Chromium, waits for scroll-triggered
animations, and records the rendered DOM plus a computed-style measurement pass.

## When to invoke
Starting a replication project, or whenever the reference may have changed and a
route's structure must be re-verified.

## Inputs
- `REFERENCE_ORIGIN` (default `https://catalit.in`)
- The route list in `scripts/config.mjs`

## Workflow
1. `node scripts/crawl-reference.mjs`
2. Inspect structure: `python3 scripts/outline.py .reference-cache/dom/<slug>.html - 8`
3. For content that is hidden until interacted with — Radix accordion panels are
   `hidden` when closed, dropdowns are hover-only — write a small Playwright probe
   that opens each item and reads it. A plain DOM dump will silently omit it.
4. Extract text with a parser, not by retyping. Transcription errors surface later
   as inexplicable one-line wrapping differences.

## Outputs
`.reference-cache/dom/*.html`, `docs/data/reference-*.json`,
`docs/data/reference-summary.json`

## Verification
Every route in the list has a JSON file; `docHeight` is non-trivial for each;
section and image counts are plausible for the page.

## Failure and recovery
- **Every route returns identical HTML** → the reference is an SPA. Render it;
  do not fetch it.
- **A generator writes a truncated file** → you piped it into `head`. SIGPIPE
  kills the process mid-write. Redirect to a log instead.
- **Content missing that you can see in a browser** → it is behind an
  interaction state. Probe it.

## May modify
`.reference-cache/**`, `docs/data/reference-*.json`

## Must not modify
`src/**`, `public/**`, any `docs/*.md`
