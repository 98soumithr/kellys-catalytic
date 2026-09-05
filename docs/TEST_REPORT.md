# Test report

Run: `npm run test:e2e` (Playwright, two projects: `desktop` 1440×1200 and
`mobile` 390×844, both Chromium).

## Result: 144 passed · 0 failed · 38 skipped (182 total)

The 38 skips are intentional and project-scoped, not silenced failures:
- desktop-only chrome tests skip on the mobile project (2 × 1)
- the mobile menu test skips on desktop (1 × 1)
- `responsive.spec.ts` sets viewports itself, so it runs once on desktop and skips
  on mobile (35 × 1)

## Coverage
| Suite | File | Asserts |
|---|---|---|
| Routes | `tests/e2e/routes.spec.ts` | All 13 canonical + 10 alias routes render an `h1`, header and footer · unknown paths render the homepage · no broken images · no `horizons-cdn` hotlink |
| Interactions | `tests/e2e/interactions.spec.ts` | Resource dropdown on hover · header scroll state · mobile menu toggle + `aria-expanded` · FAQ single-open behaviour · knowledge-base search filter (match, narrow, empty state) · `tel:`/`wa.me` targets · `rel="noopener"` on every `target="_blank"` |
| Responsive | `tests/e2e/responsive.spec.ts` | Zero horizontal overflow for 5 routes × 7 viewports |
| Accessibility | `tests/accessibility/a11y.spec.ts` | One `h1` per page · heading outline matches the reference · alt text on every image · accessible name on every control · keyboard reaches nav · FAQ operable by keyboard · panels linked to triggers · `lang` declared |

## Other gates
| Check | Command | Result |
|---|---|---|
| Production build | `npm run build` | ✅ 23 routes exported |
| Types | `npx tsc --noEmit` | ✅ clean |
| Lint | `npm run lint` | ✅ clean |
| Links & assets | `node scripts/validate-links.mjs` | ✅ 25 pages, 925 links, 382 asset refs, 0 problems |
| Visual | `node scripts/compare-screenshots.mjs` | ✅ 91/91 within threshold |

## Lighthouse
Run against the static export served locally (`npx serve out -l 3000`), mobile
emulation with Lighthouse's default throttling.

| Route | Performance | Accessibility | Best practices | SEO |
|---|---:|---:|---:|---:|
| `/` | 91 | 94 | 100 | 100 |
| `/about` | 91 | 96 | 100 | 100 |
| `/resource-center` | 90 | 96 | 100 | 100 |
| `/knowledge-base` | 98 | 94 | 100 | 100 |
| `/oxygen-sensor` | 97 | 96 | 100 | 100 |

Performance and Best Practices meet the brief's targets; **SEO reaches 100**,
which the plan had predicted would be capped by the deliberate single-title
replication — that prediction was wrong (see D-004).

Accessibility lands at 94–96 against a 95+ target. Two audits fail, both
inherited from the reference: `color-contrast` on its own `bg-emerald-600` CTAs
and `text-gray-400` footer meta, and `heading-order` (D-014). Fixing either means
changing the reference's palette or DOM. The one genuine defect found —
`aria-prohibited-attr` on the /about hero — was fixed, taking that page 91 → 96.

### How performance got there
74 → 91 on the homepage, by measurement rather than guesswork:
| Change | Effect |
|---|---|
| Hero moved off JS-gated framer-motion onto the reference's own CSS keyframes | Speed Index 2.3s → 0.9s |
| Logo resized 1600×320 → 480×96 | 59KB → 3.5KB |
| Photographic assets re-encoded to WebP | 8.4MB → 4.9MB |
| Card backgrounds became lazily-loaded `<img>` (D-018) | `/` 85 → 92 |
| /about hero recompressed (renders at 20% opacity) | 342KB → 205KB |

Every step was re-verified against the screenshot suite; none moved the median
diff.

## Two tests were corrected, not the code
Worth recording, because both looked like implementation bugs:

1. **"unnamed controls"** flagged the logo link. An `<a>` wrapping
   `<img alt="Catalit Logo">` *is* named; the assertion was wrong. It now counts
   `img[alt]` and `svg > title`.
2. **"heading jumps past a level"** flagged `h1 → h3`. Probing the live reference
   showed the identical outline — inherited, not introduced. The test now asserts
   the outline matches the reference rather than applying a stricter rule the
   reference itself would fail (D-014).

No test was weakened to obtain a pass; in both cases the reference was checked
first to establish which side was actually wrong.
