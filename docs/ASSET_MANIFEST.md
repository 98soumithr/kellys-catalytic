# Asset manifest

Every image the reference site actually renders, stored locally. Generated from
`docs/data/asset-manifest.json`; regenerate the underlying data with:

```bash
node scripts/capture-assets.mjs && node scripts/optimize-images.mjs && node scripts/convert-webp.mjs
node scripts/generate-content.mjs && node scripts/generate-article-content.mjs
```

**40 assets · 4.7 MB total.** The finished build contains no reference-CDN
hotlinks — enforced by `scripts/validate-links.mjs` and an e2e test.

Assets are collected from both `<img>` elements **and CSS `background-image`
declarations**; the Resource Center cards use the latter on the reference, and an
`<img>`-only scan misses six first-party files entirely.

## Optimization
Originals totalled 25 MB, including a 6000×4000 photo used in a ~400px card. Three
passes were applied, each verified against the screenshot suite:

1. **Downscale** to a 1600px width cap — the widest slot any layout uses (25 → 8.4 MB).
2. **WebP q82** for photographic assets (8.4 → 4.9 MB). The logo, favicon, WhatsApp
   QR and texture tile keep their original formats.
3. **Targeted**: the logo went 1600×320 PNG (59 KB) → 480×96 (3.5 KB), since it
   renders at 24–32px tall; the /about hero background dropped to q55 because it
   renders at 20% opacity behind a gradient.

After all three, 91/91 screenshot comparisons still pass with an unchanged median
diff of 0.231%. The reference serves full-size files through a resizing CDN, which
a static export cannot do.

## First-party — owner authorized (34)

Served from the reference project's own CDN bucket
(`horizons-cdn.hostinger.com/333c4379-…`).

| ID | Local path | Type | Dimensions | Size | SHA-256 (16) | Usage | Used on | Alt text |
|---|---|---|---|---:|---|---|---|---|
| A01 | `/images/catalit-logo.png` | png | 480x96 | 3KB | 998a8959eae165fc | img element | /about, /anti-theft-compliance, /automotive-catalytic-converter, /ceramic-monolith, /converter-recycling-process, /e-waste-management, /, /knowledge-base, /material-recovery-pgm-prices, /oxygen-sensor, /pgm-price-tracker, /resource-center, /service-areas | Catalit Logo |
| A02 | `/images/catalytic-converter-with-part-number-and-serial.webp` | webp | 1280x960 | 165KB | fd5b25d0c5564347 | img element | /automotive-catalytic-converter | Catalytic converter with part number and serial marking |
| A03 | `/images/catalytic-converter-showing-metallic-finish.webp` | webp | 800x495 | 47KB | ce5165141ad1f866 | img element | /automotive-catalytic-converter | Catalytic converter showing metallic finish |
| A04 | `/images/multiple-catalytic-converters-mounted-on-manifold.webp` | webp | 1200x800 | 92KB | e0e2ad2e79aa2a18 | img element | /automotive-catalytic-converter | Multiple catalytic converters mounted on manifold |
| A05 | `/images/catalytic-converter-in-industrial-facility.webp` | webp | 1376x768 | 66KB | e0f08d1e25df5800 | img element | /automotive-catalytic-converter | Catalytic converter in industrial facility |
| A06 | `/images/ceramic-monolith-honeycomb-structure-close-up.webp` | webp | 1020x576 | 178KB | 24202d057a970de9 | img element | /ceramic-monolith | Ceramic monolith honeycomb structure close-up |
| A07 | `/images/catalytic-converter-with-ceramic-monolith-and-recovered.webp` | webp | 1200x594 | 74KB | 7344d2f6457654d2 | img element | /ceramic-monolith | Catalytic converter with ceramic monolith and recovered materials |
| A08 | `/images/catalytic-converter-disassembly-showing-ceramic-components.webp` | webp | 756x432 | 45KB | 010def8dcf03ed4c | img element | /ceramic-monolith | Catalytic converter disassembly showing ceramic components |
| A09 | `/images/recovered-ceramic-monolith-pieces-in-recycling-process.webp` | webp | 1000x667 | 173KB | 98c76a8925a103b1 | img element | /ceramic-monolith | Recovered ceramic monolith pieces in recycling process |
| A10 | `/images/warehouse-storage-facility-with-catalytic-converters-on.webp` | webp | 1344x768 | 166KB | 0cd6180c53d45c33 | img element | /converter-recycling-process | Warehouse storage facility with catalytic converters on shelves |
| A11 | `/images/industrial-recycling-facility-with-catalytic-converters-and.webp` | webp | 1600x893 | 247KB | a2b73353c37355b0 | img element | /converter-recycling-process | Industrial recycling facility with catalytic converters and processing equipment |
| A12 | `/images/catalytic-converters-collected-in-industrial-facility.webp` | webp | 1600x893 | 222KB | 3104ec957bbc5c88 | img element | /converter-recycling-process | Catalytic converters collected in industrial facility |
| A13 | `/images/recycling-and-storage-center-with-organized-catalytic.webp` | webp | 1600x893 | 234KB | 9f28a76ca9988852 | img element | /converter-recycling-process | Recycling and storage center with organized catalytic converters |
| A14 | `/images/collection-of-computer-ram-memory-modules.webp` | webp | 807x533 | 61KB | d48e6365d4a2b8c7 | img element | /e-waste-management | Collection of computer RAM memory modules |
| A15 | `/images/organized-ddr2-memory-modules-with-labels.webp` | webp | 1200x743 | 95KB | f0e333c7b412f824 | img element | /e-waste-management | Organized DDR2 memory modules with labels |
| A16 | `/images/collection-of-computer-processors-and-chips.jpg` | jpg | 1024x683 | 248KB | 4ed5456ef9ee7468 | img element | /e-waste-management | Collection of computer processors and chips |
| A17 | `/images/blue-bin-with-sorted-e-waste-materials.webp` | webp | 1600x1067 | 306KB | 9836017b7bc78bec | img element | /e-waste-management | Blue bin with sorted e-waste materials |
| A18 | `/images/catalytic-converter-ready-for-recycling-and-cash.webp` | webp | 1600x893 | 123KB | 431d871d6f798ea9 | img element | / | Catalytic converter ready for recycling and cash conversion |
| A19 | `/images/catalytic-converter-recycling-at-catalit-facility.webp` | webp | 1600x900 | 223KB | c8fadbe4ca7f7c32 | img element | / | Catalytic converter recycling at Catalit facility |
| A20 | `/images/autocatalyst-ceramic-scrap-for-recycling.webp` | webp | 1600x900 | 251KB | c4aa26df68f22afd | img element | / | Autocatalyst ceramic scrap for recycling |
| A21 | `/images/oxygen-sensors-for-recycling-and-cash-conversion.webp` | webp | 1024x683 | 72KB | 420209aaf3faef46 | img element | / | Oxygen sensors for recycling and cash conversion |
| A22 | `/images/e-waste-and-electronic-scrap-for-recycling.webp` | webp | 1160x600 | 221KB | 7f8c585084e6403e | img element | / | E-waste and electronic scrap for recycling |
| A23 | `/images/connect-with-catalit-on-whatsapp.png` | png | 1147x1147 | 66KB | f109004cb2688c89 | img element | / | Connect with Catalit on WhatsApp |
| A25 | `/images/collection-of-oxygen-sensors-showing-various-types.webp` | webp | 768x576 | 126KB | 5daa85fcdadfce7c | img element | /oxygen-sensor | Collection of oxygen sensors showing various types |
| A26 | `/images/oxygen-sensor-with-wire-and-internal-components.jpg` | jpg | 700x486 | 47KB | bf9d83f41ea0d9fd | img element | /oxygen-sensor | Oxygen sensor with wire and internal components on blue background |
| A27 | `/images/oxygen-sensor-installed-in-engine-with-blue.webp` | webp | 1002x631 | 90KB | 6091e3e31c847197 | img element | /oxygen-sensor | Oxygen sensor installed in engine with blue wire |
| A28 | `/images/oxygen-sensor-held-in-hand-showing-wear.webp` | webp | 819x541 | 38KB | fb0333eac261432a | img element | /oxygen-sensor | Oxygen sensor held in hand showing wear and deposits |
| A29 | `/images/about-hero-background.webp` | webp | 1600x873 | 205KB | d20eebbc6c83b48e | css background-image | /about | — |
| A30 | `/images/card-the-automotive-catalytic-converter.webp` | webp | 1376x768 | 66KB | e0f08d1e25df5800 | css background-image | /, /resource-center | — |
| A31 | `/images/card-ceramic-monolith-recovery.webp` | webp | 756x432 | 45KB | 010def8dcf03ed4c | css background-image | /, /resource-center | — |
| A32 | `/images/card-oxygen-lambda-sensors.webp` | webp | 819x541 | 38KB | fb0333eac261432a | css background-image | /, /resource-center | — |
| A33 | `/images/card-e-waste-management.jpg` | jpg | 1024x683 | 248KB | 4ed5456ef9ee7468 | css background-image | /, /resource-center | — |
| A34 | `/images/card-the-converter-recycling-process.webp` | webp | 1600x893 | 222KB | 3104ec957bbc5c88 | css background-image | /, /resource-center | — |
| A40 | `/icons/favicon.png` | png | 192x192 | 3KB | ec76095bc5acc457 | img element | (favicon) | catalit favicon |

## Third-party (6)

Not owned by the project; licences permit reuse. See `docs/ASSET_LICENSES.md`.

| ID | Local path | Type | Dimensions | Size | SHA-256 (16) | Usage | Used on | Alt text |
|---|---|---|---|---:|---|---|---|---|
| A24 | `/images/financial-market-data-and-pgm-price-trends.webp` | webp | 1600x1067 | 49KB | 2796ee89a7a42cfd | css background-image | /material-recovery-pgm-prices, /resource-center | Financial market data and PGM price trends |
| A35 | `/images/card-material-recovery-pgm-prices.webp` | webp | 1600x1067 | 96KB | ea3941d84f948997 | css background-image | /, /resource-center | — |
| A36 | `/images/card-anti-theft-law-compliance.webp` | webp | 1600x901 | 48KB | 2cf05901138b1b9b | css background-image | /, /resource-center | — |
| A37 | `/images/card-our-service-areas-nationwide-coverage.webp` | webp | 1600x1067 | 89KB | 2f279f55bb05e31c | css background-image | /, /resource-center | — |
| A38 | `/images/card-common-industry-questions-insights.webp` | webp | 1600x1067 | 69KB | c1111dc3e442a8b9 | css background-image | /resource-center | — |
| A39 | `/images/texture-cubes.png` | png | 67x100 | 1KB | 369e2fea2fdb00eb | css background-image | /about | texture cubes |

## Not shipped
Six further CDN URLs appear in the reference JS bundle but are never rendered on any
audited route. They are recorded as unused rather than shipped.
