# Reference audit — catalit.in

## What the reference is
A **client-rendered Vite + React SPA** built with Hostinger Horizons.

| | |
|---|---|
| Shell HTML | 6.7 KB, identical for every route, contains no content |
| Bundle | `/assets/index-464ed452.js` (503 KB, minified) |
| Stylesheet | `/assets/index-3a22d52f.css` (95 KB) |
| Stack signature | Tailwind v3 (utility classes visible in the DOM), Radix UI / shadcn, framer-motion scroll reveals, React Router |
| Hosting | Hostinger CDN; `x-powered-by: Hostinger Horizons` |

**Consequence for auditing:** `curl` tells you nothing. Every route returns the
same shell and HTTP 200 — including paths that do not exist. All structure must be
read from a rendered DOM.

## Discovery
- `robots.txt` → `sitemap.xml` → 13 canonical routes.
- The live navigation and homepage cards link to 10 of them under a
  `/resource-center/<slug>` prefix. Both forms render the same component.
- Unknown paths fall through to the homepage; there is no 404 view.

## What had to be probed, not dumped
| Content | Why a DOM dump misses it |
|---|---|
| Homepage FAQ answers | Only the open item is rendered |
| Knowledge-base answers | Radix marks closed panels `hidden` |
| Resource Center dropdown | Hover-only (`group-hover`) |
| Mobile menu | Rendered only when open |
| Header scrolled state | Class list changes past ~50px scroll |
| Resource card imagery | CSS `background-image`, never an `<img>` |

## Findings that changed the implementation
1. **`.gradient-text`, `.image-overlay`, `.btn-hover-glow` have no CSS rule.**
   Computed styles resolve `.gradient-text` to the same `rgb(17,24,39)` as body
   text. They read like they add gradients; they do nothing.
2. **`font-sans` is not Poppins.** The reference never overrides Tailwind's
   `fontFamily.sans`. Poppins comes only from the `body` rule, so `/about` and
   every article render in the system UI stack.
3. **`min-h-screen` wraps header + main + footer**, not just content.
4. **The reference is internally inconsistent** — `/anti-theft-compliance` uses
   `mb-3` on card titles where its siblings use `mb-4`.
5. **There is one form**: a live search filter on `/knowledge-base`. An earlier
   pass reported "no forms" because its per-page output was truncated.
6. **6 bundle assets are never rendered** on any audited route; recorded as unused.
7. **`#why-us` is a dead anchor** — the nav links to it but no such element exists.
   Replicated as-is.

## Metadata
One title and description for all 13 routes; the SPA never updates
`document.title`. `theme-color: #ffffff`. Favicon is a CDN PNG. No Open Graph,
Twitter card, canonical or structured data on any route.

## Tooling
`scripts/crawl-reference.mjs` (render + measure) · `scripts/outline.py` (readable
structure) · `scripts/extract-articles.mjs` and `extract-knowledge-base.mjs`
(interaction-gated content) · `scripts/compare-geometry.mjs` (per-section
reference-vs-local geometry).
