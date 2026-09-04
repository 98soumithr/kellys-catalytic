/**
 * Shared capture engine used by capture-reference.mjs and capture-local.mjs so
 * both sides are photographed by identical code: same viewport, same scroll-and-
 * settle routine, same animation freeze. Any divergence here would show up as a
 * false diff, so there is deliberately only one implementation.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { ROUTES, VIEWPORTS, settlePage } from './config.mjs';

export async function captureAll({ origin, outDir, label, only = null, viewports = null }) {
  await fs.mkdir(outDir, { recursive: true });
  const browser = await chromium.launch();
  const routes = only ? ROUTES.filter((r) => only.includes(r.slug)) : ROUTES;
  const vps = viewports ? VIEWPORTS.filter((v) => viewports.includes(v.name)) : VIEWPORTS;
  const results = [];

  for (const route of routes) {
    for (const vp of vps) {
      const ctx = await browser.newContext({
        viewport: { width: vp.width, height: vp.height },
        deviceScaleFactor: 1,
        reducedMotion: 'no-preference',
      });
      const page = await ctx.newPage();
      const errors = [];
      page.on('console', (m) => m.type() === 'error' && errors.push(m.text().slice(0, 200)));
      page.on('pageerror', (e) => errors.push(String(e).slice(0, 200)));

      const url = origin + route.path;
      await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      await settlePage(page);

      const file = path.join(outDir, `${route.slug}--${vp.name}.png`);
      await page.screenshot({ path: file, fullPage: true });
      const height = await page.evaluate(() => document.body.scrollHeight);
      const overflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );

      results.push({ slug: route.slug, viewport: vp.name, height, overflow, errors });
      console.log(
        `${label} ${route.slug.padEnd(30)} ${vp.name.padEnd(18)} h=${String(height).padStart(5)}${overflow ? '  ⚠ X-OVERFLOW' : ''}${errors.length ? `  ⚠ ${errors.length} console errors` : ''}`,
      );
      await ctx.close();
    }
  }
  await browser.close();
  return results;
}
