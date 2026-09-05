# Interaction inventory

| Interaction | Where | Behaviour | Covered by |
|---|---|---|---|
| Header scroll state | all routes | `bg-transparent` → `glass shadow-sm bg-white/90 backdrop-blur-md` past 50px, `duration-300`. Height 72 → 74px. | e2e |
| Resource Center dropdown | desktop header | CSS `group-hover` reveal, `animate-fade-in-down`, chevron rotates 180°. `focus-within` added so keyboard users reach it. | e2e |
| Mobile menu | < `md` | Toggle swaps Menu/X icon, `aria-expanded` tracked, panel lists nav + both resource links + Get Quote. | e2e |
| Homepage FAQ | `/` | Custom single-open accordion; opening one closes the other. `aria-expanded` + `aria-controls`, panel is a labelled `region`. | e2e + a11y |
| Knowledge-base accordion | `/knowledge-base` | Radix single-open, collapsible, animated via `accordion-up/down`. | e2e |
| **Knowledge-base search** | `/knowledge-base` | Live filter over question **and** answer text; empty result shows a message. The site's only form control. | e2e |
| Card hover | resource cards | Background scales `1.10` over 700ms; overlay darkens. | visual |
| Image hover | product/article images | `scale-105`, 500ms. | visual |
| Button hover | all CTAs | Background/shadow shift, `transition-colors`/`transition-all`. | visual |
| Keyboard focus | all | Native focus rings preserved; mobile toggle has an explicit `focus-visible` ring. | a11y |
| Scroll reveals | most sections | framer-motion fade + ~20px translate, once. | visual |
| Reduced motion | all | `prefers-reduced-motion: reduce` collapses animation and transition durations. | globals.css |
| TradingView widget | `/pgm-price-tracker` | Third-party live-quote embed, loaded client-side. | e2e (route renders) |

## Not present on the reference
No contact form, newsletter signup, modal, carousel, tabs, or toast anywhere on the
site. Conversion is entirely `tel:` / WhatsApp. Nothing of that kind was invented.

## States captured for visual comparison
Default nav · dropdown open · header scrolled · mobile menu open/closed · FAQ
open/closed · search filtered/empty. Hover and focus states are exercised by the
e2e suite rather than screenshot-diffed, since the reference's hover styling is
plain Tailwind colour/shadow transitions.
