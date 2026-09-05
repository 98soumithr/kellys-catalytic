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
const home = await read('home-content.json');

const features = home.features
  .map((f) => `  { title: ${q(f.title)}, description: ${q(f.description)} },`)
  .join('\n');

const whatWeBuy = home.whatWeBuy
  .map((item) => {
    const src = byAlt(item.alt, 'home.whatWeBuy');
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
const logo = byAlt('Catalit Logo', 'header.logo');

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
const rc = await read('resource-center.json');
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

if (missing.length) {
  console.error('No local copy for:\n  ' + missing.join('\n  '));
  process.exit(1);
}

await fs.writeFile(path.join(ROOT, 'src/content/home.ts'), homeTs);
await fs.writeFile(path.join(ROOT, 'src/content/resource-center.ts'), rcTs);
console.log('src/content/home.ts and src/content/resource-center.ts regenerated');
