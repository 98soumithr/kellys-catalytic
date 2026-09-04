/**
 * Turns each cached resource-article DOM into a typed block model
 * (docs/data/articles.json) so the pages can be rendered by one shared layout
 * instead of seven hand-transcribed components.
 *
 * Uses a real DOM (Playwright over the cached file) rather than regex, so nesting
 * and text extraction are reliable. Reads .reference-cache/dom/*.html only.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { DIRS, ROOT } from './config.mjs';

const SLUGS = [
  'automotive-catalytic-converter',
  'ceramic-monolith',
  'oxygen-sensor',
  'e-waste-management',
  'converter-recycling-process',
  'material-recovery-pgm-prices',
  'anti-theft-compliance',
];

const extract = () => {
  const t = (el) => (el?.textContent || '').replace(/\s+/g, ' ').trim();
  const root = document.querySelector('main > div');
  const h1 = t(root.querySelector('h1'));
  const blocks = [];

  const parseContainer = (container) => {
    for (const node of container.children) {
      const cls = node.className || '';
      if (node.tagName === 'H2') {
        blocks.push({ type: 'heading', text: t(node) });
      } else if (node.tagName === 'P') {
        blocks.push({ type: 'paragraph', text: t(node) });
      } else if (node.tagName === 'UL') {
        blocks.push({
          type: 'list',
          ordered: cls.includes('list-disc') ? 'disc' : 'check',
          items: [...node.querySelectorAll(':scope > li')].map((li) => {
            const lead = li.querySelector('span.font-bold, span.font-semibold');
            const leadText = lead ? t(lead) : null;
            const full = t(li);
            return { lead: leadText, text: leadText ? full.slice(leadText.length).trim() : full };
          }),
        });
      } else if (node.querySelector(':scope > div > img, :scope img') && cls.includes('grid')) {
        blocks.push({
          type: 'imageGrid',
          cols: cls,
          images: [...node.querySelectorAll('img')].map((im) => ({
            src: im.getAttribute('src'), alt: im.alt,
          })),
        });
      } else if (cls.includes('grid') || /space-y-\d/.test(cls)) {
        blocks.push({
          type: 'cards',
          containerClass: cls,
          cardClass: node.firstElementChild?.className || '',
          cards: [...node.children].map((c) => ({
            title: t(c.querySelector('h3')),
            titleClass: c.querySelector('h3')?.className || '',
            paragraphClass: c.querySelector(':scope > p')?.className || '',
            listClass: c.querySelector(':scope > ul')?.className || '',
            paragraphs: [...c.querySelectorAll(':scope > p')].map(t),
            items: [...c.querySelectorAll('ul > li')].map((li) => {
              const lead = li.querySelector('span');
              const leadText = lead ? t(lead) : null;
              const full = t(li);
              return { lead: leadText, text: leadText ? full.slice(leadText.length).trim() : full };
            }),
          })),
        });
      } else if (node.tagName === 'SECTION') {
        blocks.push({ type: 'sectionStart', className: cls });
        parseContainer(node);
        blocks.push({ type: 'sectionEnd' });
      } else if (node.tagName === 'DIV' && node.children.length) {
        parseContainer(node);
      }
    }
  };

  // skip breadcrumb nav, back link and h1
  const body = [...root.children].filter(
    (el) => !['NAV', 'H1'].includes(el.tagName) && el.tagName !== 'A',
  );
  parseContainer({ children: body });
  return { h1, blocks };
};

const browser = await chromium.launch();
const out = {};
for (const slug of SLUGS) {
  const page = await (await browser.newContext()).newPage();
  await page.route('**/*', (r) =>
    ['image', 'font', 'stylesheet', 'script'].includes(r.request().resourceType())
      ? r.abort()
      : r.continue(),
  );
  await page.goto('file://' + path.join(DIRS.cache, 'dom', `${slug}.html`));
  out[slug] = await page.evaluate(extract);
  const kinds = out[slug].blocks.map((b) => b.type).join(',');
  console.log(`${slug.padEnd(32)} h1="${out[slug].h1.slice(0, 34)}"  ${out[slug].blocks.length} blocks`);
  console.log(`   ${kinds}`);
  await page.context().close();
}
await browser.close();
await fs.writeFile(path.join(ROOT, 'docs/data/articles.json'), JSON.stringify(out, null, 2));
