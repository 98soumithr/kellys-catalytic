# Component map

## Chrome
| Component | File | Notes |
|---|---|---|
| `SiteShell` | `src/components/layout/SiteShell.tsx` | Per-route `min-h-screen` wrapper around header + main + footer. Classes in `src/data/wrappers.ts`. |
| `Header` | `src/components/layout/Header.tsx` | Fixed; transparent → `glass shadow-sm bg-white/90 backdrop-blur-md` past 50px. Desktop nav, hover dropdown, mobile menu. |
| `Footer` | `src/components/layout/Footer.tsx` | Brand, quick links, service areas, contact, legal. |

## Primitives
| Component | File | Notes |
|---|---|---|
| `Reveal` | `src/components/ui/Reveal.tsx` | framer-motion `whileInView` fade + translate, once. Collapses under `prefers-reduced-motion`. |
| `Accordion` | `src/components/ui/Accordion.tsx` | Radix wrapper matching the reference's shadcn markup. Used by `/knowledge-base`. |
| `cn` | `src/lib/utils.ts` | clsx + tailwind-merge. |

## Homepage sections
`src/components/sections/` — `Hero`, `Features`, `Sustainability`, `WhatWeBuy`,
`HowToSell`, `WhatsAppCta`, `ResourceCards`, `Faq`. Composed by `src/app/page.tsx`.

`Faq` is a custom single-open accordion (the homepage does not use Radix);
`/knowledge-base` does.

## Articles
| Component | File | Notes |
|---|---|---|
| `ArticleLayout` | `src/components/article/ArticleLayout.tsx` | Breadcrumb, back link, `h1`, body. |
| `ArticleBlocks` | `src/components/article/ArticleBlocks.tsx` | Renders the extracted block model; folds flat `sectionStart`/`sectionEnd` markers back into `<section>`. |

Eight pages (7 articles + `/service-areas`) share this. Class strings come from the
content model per element, because the reference is not internally consistent.

## Content and data
| File | Contents |
|---|---|
| `src/content/home.ts` | Features, categories, steps, resource cards, image constants — generated |
| `src/content/faq.ts` | 12 homepage FAQ items — generated |
| `src/content/knowledge-base.ts` | 20 Q&A items + search placeholder — generated |
| `src/content/articles.ts` | 8 articles as typed block models — generated |
| `src/content/resource-center.ts` | 10 cards — generated |
| `src/data/site.ts` | Contact endpoints, nav, sitemap routes |
| `src/data/wrappers.ts` | Per-route shell classes |

Everything marked *generated* is rebuilt by
`node scripts/generate-content.mjs && node scripts/generate-article-content.mjs`,
which resolve image paths through the asset manifest. Do not hand-edit them.
