/**
 * Regenerates src/content/home.ts and src/content/resource-center.ts from the
 * extracted JSON, resolving every reference CDN URL to its local copy via the
 * asset manifest. Run after the asset pipeline so content always follows the
 * manifest rather than hand-edited paths.
 *
 *   node scripts/capture-assets.mjs && node scripts/optimize-images.mjs
 *   node scripts/generate-content.mjs && node scripts/generate-article-content.mjs
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { DIRS, ROOT } from './config.mjs';
import { rebrandDeep } from './brand.mjs';

/** The reference logo has its wordmark baked in, so this project ships its own. */
const LOGO_OVERRIDE = '/images/brand-logo.png';

const read = async (f) => JSON.parse(await fs.readFile(path.join(DIRS.data, f), 'utf8'));
const manifest = await read('asset-manifest.json');
const localByUrl = Object.fromEntries(
  manifest.filter((a) => a.localPath).map((a) => [a.url.split('?')[0], a.localPath]),
);
const localByAlt = Object.fromEntries(
  manifest.filter((a) => a.localPath && a.alt).map((a) => [a.alt, a.localPath]),
);
const dims = Object.fromEntries(
  manifest.filter((a) => a.localPath).map((a) => [a.localPath, a.dimensions]),
);

const missing = [];
const byUrl = (url, label) => {
  const local = localByUrl[(url || '').split('?')[0]];
  if (!local) missing.push(`${label}: ${url}`);
  return local;
};
const byAlt = (alt, label) => {
  const local = localByAlt[alt];
  if (!local) missing.push(`${label}: alt="${alt}"`);
  return local;
};
const wh = (p) => {
  const [w, h] = (dims[p] || '0x0').split('x');
  return { w: Number(w), h: Number(h) };
};
const q = (s) => JSON.stringify(s);

// ---------------------------------------------------------------- home.ts
const homeRaw = await read('home-content.json');
const home = rebrandDeep(homeRaw);

const features = home.features
  .map((f) => `  { title: ${q(f.title)}, description: ${q(f.description)} },`)
  .join('\n');

const whatWeBuy = home.whatWeBuy
  .map((item, i) => {
    // Look the asset up by its ORIGINAL alt — the manifest predates the rebrand.
    const src = byAlt(homeRaw.whatWeBuy[i].alt, 'home.whatWeBuy');
    const d = wh(src);
    return `  {
    title: ${q(item.title)},
    body:
      ${q(item.body)},
    image: { src: ${q(src)}, alt: ${q(item.alt)}, width: ${d.w}, height: ${d.h} },
  },`;
  })
  .join('\n');

const steps = home.steps
  .map((s) => `  {\n    title: ${q(s.title)},\n    body:\n      ${q(s.body)},\n  },`)
  .join('\n');

const resourceCards = home.resources
  .map((c) => {
    const src = byUrl(c.image, 'home.resources');
    const d = wh(src);
    return `  {
    title: ${q(c.title)},
    description: ${q(c.description)},
    href: ${q(c.href)},
    image: { src: ${q(src)}, width: ${d.w}, height: ${d.h} },
  },`;
  })
  .join('\n');

const heroImage = byAlt('Catalytic converter ready for recycling and cash conversion', 'home.hero');
const qrImage = byAlt('Connect with Catalit on WhatsApp', 'home.qr');
const logo = LOGO_OVERRIDE ?? byAlt('Catalit Logo', 'header.logo');

const homeTs = `/**
 * Homepage content, transcribed from the reference site's rendered DOM.
 * Image paths resolve through docs/data/asset-manifest.json.
 * Regenerate: node scripts/generate-content.mjs
 */
export interface ImageRef {
  src: string;
  alt?: string;
  width: number;
  height: number;
}

export const LOGO = ${q(logo)};
export const HERO_IMAGE = ${q(heroImage)};
export const WHATSAPP_QR_IMAGE = ${q(qrImage)};

export const HOME_FEATURES = [
${features}
] as const;

export interface BuyCategory {
  title: string;
  body: string;
  image: ImageRef & { alt: string };
}

export const WHAT_WE_BUY: BuyCategory[] = [
${whatWeBuy}
];

export interface SellStep {
  title: string;
  body: string;
}

export const SELL_STEPS: SellStep[] = [
${steps}
];

export interface ResourceCard {
  title: string;
  description: string;
  href: string;
  image: ImageRef;
}

export const RESOURCE_CARDS: ResourceCard[] = [
${resourceCards}
];
`;

// ------------------------------------------------------- resource-center.ts
const rc = rebrandDeep(await read('resource-center.json'));
for (const card of rc.cards) card.image = byUrl(card.image, `resourceCenter.${card.title}`);

const rcTs = `/**
 * /resource-center content, extracted from the reference DOM.
 * Regenerate: node scripts/generate-content.mjs
 */
export interface ResourceCenterCard {
  href: string;
  srLabel: string;
  image: string;
  title: string;
  description: string;
  cta: string;
}

export const RESOURCE_CENTER = {
  h1: ${q(rc.h1)},
  intro:
    ${q(rc.intro)},
};

export const RESOURCE_CENTER_CARDS: ResourceCenterCard[] = ${JSON.stringify(rc.cards, null, 2)};
`;

// ---------------------------------------------------------------- about.ts
const about = rebrandDeep(await read('about-content.json'));
const titledBlocks = (key) =>
  about[key].map((x) => `  {\n    title: ${q(x.title)},\n    body:\n      ${q(x.body)},\n  },`).join('\n');

const aboutTs = `/** /about content, transcribed from the reference DOM. Regenerate: node scripts/generate-content.mjs */
export interface TitledBlock {
  title: string;
  body: string;
}

export const ABOUT_HERO_SUBTITLE = ${q(about.heroSub)};

export const ABOUT_STORY = {
  badge: ${q(about.storyBadge)},
  title: ${q(about.storyTitle)},
  body:
    ${q(about.story)},
};

export const WHAT_WE_DO_HEADING = {
  title: ${q(about.whatWeDoTitle)},
  subtitle: ${q(about.whatWeDoSub)},
};

export const WHAT_WE_DO: TitledBlock[] = [
${titledBlocks('whatWeDo')}
];

export const WHY_PARTNER_HEADING = {
  title: ${q(about.whyTitle)},
  intro:
    ${q(about.whyIntro)},
};

export const WHY_PARTNER: TitledBlock[] = [
${titledBlocks('whyPartner')}
];

export const VISION = {
  title: ${q(about.visionTitle)},
  body:
    ${q(about.vision)},
};

export const NETWORK = {
  title: ${q(about.networkTitle)},
  intro:
    ${q(about.networkIntro)},
  quote: ${q(about.networkQuote)},
  contact: ${q(about.networkContact)},
};

export const NETWORK_CARDS: TitledBlock[] = [
${titledBlocks('network')}
];

export const ABOUT_CTA = {
  title: ${q(about.ctaTitle)},
  body: ${q(about.ctaBody)},
  button: ${q(about.ctaButton)},
};
`;

// ------------------------------------------------------------------ faq.ts
const faq = rebrandDeep(await read('home-faq.json'));
const faqTs = `/**
 * Homepage FAQ content, captured from the reference accordion (only the open item
 * is rendered, so each was expanded to read it).
 * Regenerate: node scripts/generate-content.mjs
 */
export interface FaqItem {
  question: string;
  answer: string;
}

export const HOME_FAQ: FaqItem[] = [
${faq.map((f) => `  {\n    question: ${q(f.q)},\n    answer:\n      ${q(f.a)},\n  },`).join('\n')}
];
`;

// ------------------------------------------------------- knowledge-base.ts
const kb = rebrandDeep(await read('knowledge-base.json'));
const kbTs = `/**
 * /knowledge-base content. Radix keeps closed accordion panels hidden, so these
 * answers were captured by expanding each item.
 * Regenerate: node scripts/generate-content.mjs
 */
import type { FaqItem } from './faq';

export const KNOWLEDGE_BASE = {
  h1: ${q(kb.h1)},
  intro:
    ${q(kb.intro)},
  searchPlaceholder: ${q(kb.placeholder)},
};

export const KNOWLEDGE_BASE_ITEMS: FaqItem[] = [
${kb.items.map((i) => `  {\n    question: ${q(i.question)},\n    answer:\n      ${q(i.answer)},\n  },`).join('\n')}
];
`;

if (missing.length) {
  console.error('No local copy for:\n  ' + missing.join('\n  '));
  process.exit(1);
}

await fs.writeFile(path.join(ROOT, 'src/content/home.ts'), homeTs);
await fs.writeFile(path.join(ROOT, 'src/content/resource-center.ts'), rcTs);
await fs.writeFile(path.join(ROOT, 'src/content/about.ts'), aboutTs);
await fs.writeFile(path.join(ROOT, 'src/content/faq.ts'), faqTs);
await fs.writeFile(path.join(ROOT, 'src/content/knowledge-base.ts'), kbTs);
console.log('regenerated: home.ts, resource-center.ts, about.ts, faq.ts, knowledge-base.ts');
