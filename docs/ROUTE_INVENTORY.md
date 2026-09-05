# Route inventory

13 canonical routes (from the reference `sitemap.xml`) plus 10
`/resource-center/<slug>` aliases that the live navigation and homepage cards link
to — **23 generated pages**. Both forms render the same component.

Every route carries the *same* title and description, because the reference SPA
never updates `document.title`. That is replicated deliberately (D-004):

- Title: `Catalit | Top Catalytic Converter Buyer in India`
- Description: `Catalit offers top cash payouts for catalytic converters. Serving Kerala, Tamilnadu, KA & all over India. Get an instant valuation and spot cash today!`

Columns: *Sections/Images/Links* are counts measured on the reference at 1440px.
*Geometry* is the per-section top/height comparison from
`scripts/compare-geometry.mjs`. *Worst diff* is the highest changed-pixel ratio
across all seven viewports.

| Route | Purpose | Alias | Sections | Images | Links | Height | Viewports passing | Worst diff | Geometry |
|---|---|---|---:|---:|---:|---:|---|---:|---|
| `/` | Landing: hero, proof, categories, process, conversion, resources, FAQ | — | 8 | 7 | 34 | 9611px | 7/7 | 0.63% | Δ0 |
| `/about` | Company story, capabilities, partner network, CTA | — | 7 | 1 | 23 | 4370px | 7/7 | 0.15% | Δ0 |
| `/resource-center` | Index of all 10 resource pages as image cards | — | 0 | 1 | 31 | 2091px | 7/7 | 0.26% | Δ0 |
| `/knowledge-base` | 20-item searchable FAQ accordion | `/resource-center/knowledge-base` | 0 | 1 | 22 | 2903px | 7/7 | 0.27% | Δ0 |
| `/pgm-price-tracker` | Live TradingView PGM quotes | `/resource-center/pgm-price-tracker` | 0 | 1 | 22 | 1827px | 7/7 | 0.63% | Δ0 |
| `/service-areas` | Coverage and remote-seller programme | `/resource-center/service-areas` | 2 | 1 | 23 | 1533px | 7/7 | 0.41% | Δ0 |
| `/automotive-catalytic-converter` | Resource article | `/resource-center/automotive-catalytic-converter` | 3 | 5 | 23 | 1890px | 7/7 | 0.28% | Δ0 |
| `/ceramic-monolith` | Resource article | `/resource-center/ceramic-monolith` | 3 | 5 | 23 | 1844px | 7/7 | 0.26% | Δ0 |
| `/oxygen-sensor` | Resource article | `/resource-center/oxygen-sensor` | 2 | 5 | 23 | 1636px | 7/7 | 0.43% | Δ0 |
| `/e-waste-management` | Resource article | `/resource-center/e-waste-management` | 2 | 5 | 23 | 1664px | 7/7 | 0.42% | Δ0 |
| `/converter-recycling-process` | Resource article | `/resource-center/converter-recycling-process` | 1 | 5 | 23 | 1785px | 7/7 | 0.26% | Δ0 |
| `/material-recovery-pgm-prices` | Resource article | `/resource-center/material-recovery-pgm-prices` | 1 | 2 | 23 | 1875px | 7/7 | 0.72% | Δ0 |
| `/anti-theft-compliance` | Resource article | `/resource-center/anti-theft-compliance` | 1 | 1 | 23 | 1521px | 7/7 | 0.46% | Δ0 |

## Shared across every route
`Header` (fixed; transparent → `glass shadow-sm bg-white/90 backdrop-blur-md` on
scroll; Resource Center dropdown; mobile menu), `Footer` (brand, quick links,
service areas, contact, legal), and the `SiteShell` wrapper whose classes vary per
route — see `src/data/wrappers.ts`.

## Conversion actions
`tel:+919895397781` · `https://wa.me/919895397781` · Google review · Facebook ·
Instagram. Verified by `scripts/validate-links.mjs` and an e2e test.

## Unknown paths
Render the homepage, matching the reference SPA router's fallback (D-005).
