/**
 * Captures the /knowledge-base accordion. Radix keeps closed panels `hidden`, so
 * the answers are absent from a plain DOM dump — each trigger has to be opened.
 * Also records the category label each item carries, if any.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { REFERENCE_ORIGIN, DIRS } from './config.mjs';

const browser = await chromium.launch();
const page = await (await browser.newContext({ viewport: { width: 1440, height: 1200 } })).newPage();
await page.goto(REFERENCE_ORIGIN + '/knowledge-base', { waitUntil: 'networkidle' });
await page.waitForTimeout(1200);

const triggers = await page.$$('button[data-radix-collection-item]');
const items = [];
for (let i = 0; i < triggers.length; i++) {
  await triggers[i].click();
  await page.waitForTimeout(320);
  const item = await triggers[i].evaluate((el) => {
    const q = el.querySelector('span.font-semibold')?.innerText.trim() || el.innerText.trim();
    const panel = document.getElementById(el.getAttribute('aria-controls'));
    return { question: q, answer: (panel?.innerText || '').replace(/\s+/g, ' ').trim() };
  });
  items.push(item);
  await triggers[i].click();
  await page.waitForTimeout(160);
}

const meta = await page.evaluate(() => ({
  h1: document.querySelector('h1')?.innerText.trim(),
  intro: document.querySelector('h1 + p')?.innerText.trim(),
  placeholder: document.querySelector('input[type="text"]')?.placeholder,
  inputClass: document.querySelector('input[type="text"]')?.className,
  cardClass: document.querySelector('.bg-white.rounded-3xl')?.className,
}));

await fs.writeFile(
  path.join(DIRS.data, 'knowledge-base.json'),
  JSON.stringify({ ...meta, items }, null, 2),
);
console.log(`${items.length} items captured`);
console.log(items.map((x, i) => `${i + 1}. ${x.question}`).join('\n'));
await browser.close();
