# Asset licences

Authorization is recorded **per host**, not per project. Nothing here is labelled
first-party to make the table look uniform.

## First-party — 34 files

Served from the reference project's own CDN bucket
`horizons-cdn.hostinger.com/333c4379-891e-4db0-91bd-117b6cdf76dd/`, including the
Catalit logo and favicon. The project owner confirmed they own or are authorized to
reuse these, so they are stored in `public/images` and `public/icons` and used as-is.

## Third-party — 6 files

These are **not** first-party. They were already in use on the reference site and
their licences permit self-hosting, so they are stored locally rather than hotlinked.

| Local path | Source host | Used on |
|---|---|---|
| `/images/financial-market-data-and-pgm-price-trends.jpg` | images.unsplash.com | /material-recovery-pgm-prices, /resource-center |
| `/images/card-material-recovery-pgm-prices.jpg` | images.unsplash.com | /, /resource-center |
| `/images/card-anti-theft-law-compliance.jpg` | images.unsplash.com | /, /resource-center |
| `/images/card-our-service-areas-nationwide-coverage.jpg` | images.unsplash.com | /, /resource-center |
| `/images/card-common-industry-questions-insights.jpg` | images.unsplash.com | /resource-center |
| `/images/texture-cubes.png` | www.transparenttextures.com | /about |

- **images.unsplash.com** — Unsplash License: free to use, including commercially,
  without permission or attribution. Self-hosting is permitted; attribution is not
  required but is appreciated by the photographers.
- **www.transparenttextures.com** — free tiling texture, used as a low-opacity
  overlay on the /about call-to-action.

If any of these need replacing, swap the file in `public/images` and re-run
`node scripts/generate-content.mjs`. Layout is driven by the manifest's recorded
dimensions, so a same-ratio replacement changes nothing else.

## Fonts

**Poppins** (400/600/700/800, latin subset) — SIL Open Font License 1.1. Downloaded
from Google Fonts and self-hosted in `public/fonts`, so the build makes no
third-party font request at runtime.

## Third-party services

**TradingView** market-quotes widget on /pgm-price-tracker — embedded through
TradingView's official script under their widget terms, which require the
attribution link the widget renders. No market data is copied or cached.
