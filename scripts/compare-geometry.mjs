/**
 * Compares the vertical geometry of reference vs local for one route: the top
 * offset and height of every section and heading. Pixel diffs tell you a page is
 * wrong; this tells you which box is the wrong size, which is what you can fix.
 * Usage: node scripts/compare-geometry.mjs <route> [width]
 */
import { chromium } from '@playwright/test';
import { REFERENCE_ORIGIN, LOCAL_ORIGIN, settlePage } from './config.mjs';

const route = process.argv[2] || '/';
const width = Number(process.argv[3]) || 1440;

const probe = () => {
  const abs = (el) => Math.round(el.getBoundingClientRect().top + window.scrollY);
  const sections = [...document.querySelectorAll('section')].map((el, i) => ({
    kind: 'section', i, id: el.id || '', top: abs(el), h: Math.round(el.getBoundingClientRect().height),
    label: (el.querySelector('h1,h2,h3')?.textContent || '').trim().slice(0, 34),
  }));
  const heads = [...document.querySelectorAll('h1,h2,h3')].map((el, i) => ({
    kind: 'h', i, top: abs(el), h: Math.round(el.getBoundingClientRect().height),
    label: (el.textContent || '').trim().slice(0, 34),
    size: getComputedStyle(el).fontSize, lh: getComputedStyle(el).lineHeight,
  }));
  return { sections, heads, docH: document.body.scrollHeight };
};

const browser = await chromium.launch();
const get = async (origin) => {
  const ctx = await browser.newContext({ viewport: { width, height: 1200 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  await page.goto(origin + route, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await settlePage(page);
  const r = await page.evaluate(probe);
  await ctx.close();
  return r;
};
const ref = await get(REFERENCE_ORIGIN);
const loc = await get(LOCAL_ORIGIN);
await browser.close();

console.log(`${route} @${width}px   ref doc=${ref.docH}  local doc=${loc.docH}  Δ=${loc.docH - ref.docH}\n`);
const row = (kind, a, b) => {
  const dT = b ? b.top - a.top : null;
  const dH = b ? b.h - a.h : null;
  const flag = b ? (Math.abs(dT) > 4 || Math.abs(dH) > 4 ? '  <<<' : '') : '  MISSING LOCAL';
  console.log(
    `${kind} ${String(a.i).padStart(2)} ${(a.label || a.id).padEnd(36)} top ${String(a.top).padStart(5)} ${b ? String(b.top).padStart(5) : '  -- '} Δ${String(dT ?? '').padStart(5)}   h ${String(a.h).padStart(5)} ${b ? String(b.h).padStart(5) : '  -- '} Δ${String(dH ?? '').padStart(5)}${flag}`,
  );
};
console.log('                                             top:  ref local     Δ    h:  ref local     Δ');
ref.sections.forEach((s, i) => row('S', s, loc.sections[i]));
console.log('');
ref.heads.forEach((s, i) => row('H', s, loc.heads[i]));
