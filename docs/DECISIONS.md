# Decisions

Append-only. Each entry records a choice that a future reader would otherwise
have to re-derive — or would "fix" and thereby break.

---

### D-001 — Reimplement, never copy
**Context.** The reference ships a 503KB minified Vite/React bundle.
**Decision.** Structure is reconstructed from the *rendered DOM* (whose Tailwind
classes are observable public markup) and reimplemented as clean components. No
minified source is copied.

---

### D-002 — Tailwind v3, pinned
**Context.** The reference is built with Tailwind v3.
**Decision.** Pin v3. Tailwind v4 changes default border and ring semantics, which
would silently shift rendering away from the reference.

---

### D-003 — `.gradient-text`, `.image-overlay`, `.btn-hover-glow` are inert
**Context.** These classes appear throughout the reference markup and read as if
they add gradients and glows.
**Evidence.** No rule exists for them in the reference stylesheet, and computed
styles on the live site resolve `.gradient-text` to plain `rgb(17,24,39)` — the
same colour as body text.
**Decision.** Keep the class names as structural hooks, defined but with no visual
declarations. Implementing them "properly" would make the replica differ from the
reference.

---

### D-004 — Replicate the reference's SEO defects
**Context.** The reference is a client-rendered SPA that never updates
`document.title`. All 13 routes serve one identical title and description.
**Decision.** Confirmed with the project owner: replicate exactly. A single
`metadata` export in the root layout, never overridden per route.
**Cost.** The brief's "metadata for every indexable page" criterion (in the sense
of *distinct* metadata per page) cannot be met.

**Correction, measured after the fact:** this was expected to cap the Lighthouse
SEO score. It does not — SEO scores **100** on every route tested. Lighthouse
checks that a title, description, canonical-ish crawlability and valid robots
exist, not that titles differ between pages. The predicted cost did not
materialise; the decision stands on fidelity grounds alone.

---

### D-005 — Unknown paths render the homepage
**Context.** The reference's client router falls through to the homepage for any
unrecognised path and returns HTTP 200.
**Decision.** `src/app/not-found.tsx` renders the homepage component, so the pixels
match.
**Deviation.** Under static export this is served with a **404 status** where the
reference returns **200**. Unavoidable without a server; recorded rather than hidden.

---

### D-006 — Do not override `fontFamily.sans`
**Context.** `/about` rendered ~32px taller than the reference in five separate
sections.
**Cause.** The reference never overrides Tailwind's `fontFamily.sans`; it applies
Poppins only through the `body` rule. Pages that wrap content in `font-sans`
(`/about` and every article) therefore render in the **system UI stack**. Our
config had pointed `sans` at Poppins, widening that text and wrapping an extra line.
**Decision.** Leave `fontFamily.sans` at Tailwind's default. Poppins comes from
`body` alone, exactly as upstream.

---

### D-007 — Page chrome lives in `SiteShell`
**Context.** Four short articles rendered exactly one footer taller than the reference.
**Cause.** The reference wraps header + main + footer together in a per-route
`min-h-screen …` div, so the viewport floor applies to the whole page. Wrapping
only the content makes `min-h-screen` floor the content area and then adds the
footer on top.
**Decision.** `SiteShell` renders the wrapper around all three. Root layout carries
no chrome.

---

### D-008 — Capture class strings per element
**Context.** `/anti-theft-compliance` was 12px tall with an otherwise correct
shared renderer.
**Cause.** That page uses `mb-3` on card titles where its siblings use `mb-4`. The
reference is not internally consistent.
**Decision.** The extractor records class strings per element and the renderer uses
them, rather than assuming one style per page family.

---

### D-009 — Assets are authorized per host, not per project
**Context.** The owner authorized reuse of the site's assets, but five of the
images are Unsplash stock and one is a texture from transparenttextures.com.
**Decision.** Only `horizons-cdn.hostinger.com` files are recorded as first-party.
Third-party files are self-hosted (their licences permit it) and labelled honestly
in `docs/ASSET_LICENSES.md`. Nothing is relabelled to make a table look uniform.

---

### D-010 — Images downscaled to a 1600px cap
**Context.** Originals totalled 25MB, including a 6000×4000 photo used in a ~400px card.
**Decision.** Cap stored width at 1600px (the widest slot any layout uses) and
re-encode: 25MB → 8.4MB with no visible change. The reference serves full-size
files through a resizing CDN; a static export cannot.

---

### D-011 — The site does have one form
**Context.** An early audit reported "no forms anywhere", and the plan was written
on that basis.
**Correction.** `/knowledge-base` has a live search input that filters its 20
accordion items. The initial scan truncated its per-page output and missed it. The
filter is implemented and covered by tests.

---

### D-012 — TradingView is embedded, not reproduced
**Context.** `/pgm-price-tracker` shows live Platinum/Palladium/Rhodium quotes.
**Decision.** This is a third-party live-data service, not a site asset. It is
embedded through TradingView's official widget script with the same three symbols,
rather than copied or faked.

---

### D-013 — Capture must wait out framer-motion, not just CSS
**Context.** `/resource-center` reported ~6% changed pixels on mobile with zero
height difference. The crop showed the *reference* mid-fade.
**Cause.** Reveal animations are driven by framer-motion through inline styles, so
freezing CSS animation durations cannot finish them. The two sides were being
photographed at different points in their animations.
**Decision.** `settlePage` now waits until nothing on the page is partially
transparent before shooting. This was a measurement bug, not an implementation bug
— worth remembering before "fixing" CSS that is already correct.

---

### D-014 — Heading outline is inherited, not corrected
**Context.** An accessibility test flagged an `h1 → h3` jump on `/` and `/knowledge-base`.
**Evidence.** Probing the live reference shows the identical outline: its homepage
feature cards are `h3` with no intervening `h2`, and Radix renders `h3` accordion
headers on the knowledge base.
**Decision.** The jump is inherited, minor, and invisible. Preserve the reference's
outline and assert *that* in the test, rather than applying a stricter rule the
reference itself would fail. Every page still has exactly one `h1`, all images have
alt text, and all controls have accessible names.

---

### D-015 — Deterministic asset naming
**Context.** A one-off rename of hash-named background images left ten orphaned
duplicates on disk and a manifest pointing at files the code no longer used.
**Decision.** Naming moved into `scripts/capture-assets.mjs`: background images
take their name from the card they back, resolved from the extracted content JSON.
Re-running the pipeline now reproduces exactly the filenames the components import,
and `scripts/generate-content.mjs` regenerates content modules from the manifest so
paths can never drift again.

---

### D-016 — Behavioural tests run on Chromium at a mobile viewport
**Context.** The `mobile` Playwright project defaulted to the WebKit iPhone profile.
**Decision.** Use Chromium with the iPhone 13 viewport instead, so behavioural tests
and the visual captures in `scripts/capture.mjs` share one engine. Cross-engine
testing would be worth adding, but it should not silently diverge from the captures
that define this project's acceptance criteria.


---

### D-017 — Photographic assets re-encoded as WebP
**Context.** A static export ships raw bytes where the reference has a resizing
CDN in front of it. The homepage eagerly loaded ~3MB of card imagery, and
Lighthouse performance sat at 74.
**Decision.** Re-encode photographic PNG/JPEG assets as WebP q82 (`scripts/convert-webp.mjs`),
keeping the logo, favicon, WhatsApp QR and texture tile in their original formats
where crisp edges or tiny size make conversion pointless. 8.4MB → 4.9MB.
**Verification.** The screenshot suite was re-run: 91/91 still pass, worst-case
diff unchanged at 0.72%, median unchanged at 0.231%. No visible degradation.

---

### D-018 — Resource card backgrounds are `<img>`, not CSS backgrounds
**Context.** The reference paints its resource cards with a CSS
`background-image`. Those eight cards are below the fold, and a CSS background
cannot be lazy-loaded, so ~400KB loaded eagerly on the homepage.
**Decision.** Render the same image as a lazily-loaded `<img>` with
`object-cover object-center`, which is pixel-identical to `bg-cover bg-center`.
This is a deliberate markup deviation, taken because the rendered result is
provably unchanged.
**Verification.** 91/91 comparisons still pass with an unchanged median diff.
Performance on `/` went 85 → 92 and `/resource-center` to 90.

---

### D-019 — Accessibility tops out at 94-96, by choice
**Context.** Lighthouse accessibility scores 94-96 against a 95+ target.
**Cause.** Two audits fail, both inherited: `color-contrast` on the reference's
own `bg-emerald-600` CTAs and `text-gray-400` footer meta text, and `heading-order`
(see D-014).
**Decision.** Both would require changing the reference's palette or its DOM.
Neither is a serious barrier — contrast is close, not illegible, and the affected
text is supplementary. Fidelity wins here, per the brief's explicit trade-off
clause. Everything actionable *was* fixed: `aria-prohibited-attr` on the /about
hero (a real defect) took that page from 91 to 96.

---

### D-020 — Rebranded to Kelly's Catalytic
**Context.** The project was built as a faithful replica of catalit.in, which is
branded "Catalit". The owner confirmed the site should carry the **Kelly's
Catalytic** brand instead.

**Decision.** The rename lives in the *content pipeline* (`scripts/brand.mjs`),
not in the generated files. `src/content/**` is regenerated from the reference, so
a find-and-replace there would be silently undone the next time anyone re-runs the
extractors — the same class of bug as D-015.

Assets are still resolved by their **original** alt text, because the manifest
predates the rebrand; only rendered strings are substituted.

**Consequence for the visual suite.** The screenshot comparison measures this
build against catalit.in. Now that the brand differs, that comparison is no longer
a pass/fail gate for brand-bearing regions:

| | Before rebrand | After |
|---|---|---|
| Comparisons passing | 91/91 | 81/91 |
| Median diff | 0.231% | 0.439% |
| Height mismatches | 0 | 11 |

The divergence was verified to be brand-driven rather than a layout regression:
`compare-geometry` at 390px shows **one** section changing height (+29px — the
longer name wraps an extra line in the sustainability paragraph), with every
section below offset by exactly that amount and every other section still Δ0.

The reference comparison remains useful for catching *unintended* layout drift,
but its absolute thresholds no longer apply. To make it a regression gate again,
re-baseline `public/screenshots/reference/` from the current local captures.

---

### D-021 — The logo is a placeholder
**Context.** The reference logo is a raster PNG with "Catalit" baked into the
pixels; it cannot be renamed by editing text.
**Decision.** `public/images/brand-logo.png` is a **generated placeholder
wordmark** (480×96, emerald `#059669` to match the footer brand colour), recorded
in the asset manifest as *original — created for this project* rather than
first-party reference art. Replace it with real brand artwork at the same
dimensions; nothing else needs to change.
