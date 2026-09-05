# Design system

Every value below was **measured** from the reference stylesheet or from computed
styles on the live site. Nothing here is estimated.

## Typography
| | |
|---|---|
| Family (body) | `Poppins, sans-serif` via the `body` rule — weights 400/600/700/800, latin subset, self-hosted in `public/fonts` |
| Family (`font-sans` utility) | **Tailwind's stock `ui-sans-serif, system-ui, …`** — *not* Poppins |
| Base size / line-height | 16px / 24px |
| Text colour | `#111827` |

> The distinction in the second row is load-bearing. The reference never overrides
> `fontFamily.sans`, so `/about` and every resource article — which wrap content in
> `font-sans` — render in the **system** font while the homepage renders in Poppins.
> Pointing `sans` at Poppins re-wraps those pages. See D-006.

## Colour tokens (`:root`)
| Token | Value | | Token | Value |
|---|---|---|---|---|
| `--primary` | `160 84% 39%` | | `--bg-start` | `#f8fafc` |
| `--accent` | `160 84% 39%` | | `--bg-end` | `#f0fdf4` |
| `--ring` | `160 84% 39%` | | `--primary-green` | `#10b981` |
| `--foreground` | `222 47% 11%` | | `--dark-green` | `#059669` |
| `--muted-foreground` | `215 16% 47%` | | `--text-main` | `#111827` |
| `--border` / `--input` | `214 32% 91%` | | `--text-muted` | `#4b5563` |
| `--destructive` | `0 84% 60%` | | `--emerald-500/600/700` | `#10b981` / `#059669` / `#047857` |
| `--radius` | `0.5rem` | | `--transition-smooth` | `0.3s ease-in-out` |

## Page background
`linear-gradient(135deg, #f8fafc 0%, #f0fdf4 100%)`, `background-attachment: fixed`,
`overflow-x: hidden`.

## Layout
| | |
|---|---|
| Container | `width:100%`, `padding: 0 2rem`, `max-width: 1400px`, centred |
| Section rhythm | `py-20 px-4` almost everywhere |
| Header height | 72px at top, 74px when scrolled (the `glass` border adds 2px) |
| Article container | `max-w-5xl`; Resource Center grid `max-w-7xl` |

The `max-w-7xl` cap on the Resource Center grid matters: without it the cards get
wider, and `aspect-[4/5]` makes them 75px taller.

## Glass surfaces
| Class | Background | Blur | Border | Shadow |
|---|---|---|---|---|
| `.glass` | `rgba(255,255,255,.7)` | 12px | `1px rgba(255,255,255,.6)` | `0 8px 32px rgba(31,38,135,.1)` |
| `.glass-strong` | `rgba(255,255,255,.85)` | 16px | `1px rgba(255,255,255,.8)` | `0 8px 32px rgba(31,38,135,.15)` |
| `.glass-dropdown` | `rgba(255,255,255,.85)` | 12px | `1px rgba(255,255,255,.4)`, radius 12px | `0 4px 12px rgba(0,0,0,.08), 0 2px 4px rgba(0,0,0,.04)` |

## Inert classes
`.gradient-text`, `.image-overlay`, `.btn-hover-glow` appear throughout the
reference markup but **have no rule in its stylesheet**. `.gradient-text` computes
to the same `rgb(17,24,39)` as body text. They are defined here with no visual
declarations so the replica matches. See D-003.

## Motion
| | |
|---|---|
| Keyframes | `fadeIn`, `fadeInDown` (0.3s), `fadeInUp` (0.8s), `scaleIn` (0.6s), `pulse`, `accordion-up/down` (0.2s) |
| Scroll reveals | framer-motion `whileInView`, fade + ~20px translate, played once |
| Header transition | `transition-all duration-300` |
| Hover | `duration-300` on nav/cards; card images `duration-500`–`700`, `scale-105`–`110` |

`prefers-reduced-motion: reduce` collapses all of it.

## Breakpoints
Tailwind defaults: `sm:640 md:768 lg:1024 xl:1280 2xl:1536`. The header switches to
the mobile menu at `md`, and the "Get Quote" button appears at `lg`.
