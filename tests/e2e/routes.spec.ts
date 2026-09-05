import { test, expect } from '@playwright/test';

/** Every path the reference exposes, canonical and alias. */
const CANONICAL = [
  '/', '/about', '/resource-center', '/knowledge-base', '/pgm-price-tracker',
  '/service-areas', '/automotive-catalytic-converter', '/ceramic-monolith',
  '/oxygen-sensor', '/e-waste-management', '/converter-recycling-process',
  '/material-recovery-pgm-prices', '/anti-theft-compliance',
];

const ALIASES = [
  '/resource-center/knowledge-base', '/resource-center/pgm-price-tracker',
  '/resource-center/service-areas', '/resource-center/automotive-catalytic-converter',
  '/resource-center/ceramic-monolith', '/resource-center/oxygen-sensor',
  '/resource-center/e-waste-management', '/resource-center/converter-recycling-process',
  '/resource-center/material-recovery-pgm-prices', '/resource-center/anti-theft-compliance',
];

test.describe('routes resolve with real content', () => {
  for (const path of [...CANONICAL, ...ALIASES]) {
    test(`${path} renders a heading and chrome`, async ({ page }) => {
      const response = await page.goto(path);
      expect(response?.status(), `${path} should not error`).toBeLessThan(400);
      await expect(page.locator('h1').first()).toBeVisible();
      await expect(page.locator('header')).toBeVisible();
      await expect(page.locator('footer')).toBeVisible();
    });
  }
});

test('unknown paths render the homepage, matching the reference SPA fallback', async ({ page }) => {
  await page.goto('/definitely-not-a-real-page');
  await expect(page.locator('h1')).toContainText('Turn your spent');
});

test('no local image is broken', async ({ page }) => {
  for (const path of ['/', '/about', '/resource-center', '/oxygen-sensor']) {
    await page.goto(path);
    await page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise((r) => setTimeout(r, 60));
      }
    });
    const broken = await page.evaluate(() =>
      [...document.images].filter((i) => i.complete && i.naturalWidth === 0).map((i) => i.src),
    );
    expect(broken, `broken images on ${path}`).toEqual([]);
  }
});

test('no reference CDN hotlinks remain', async ({ page }) => {
  for (const path of ['/', '/about', '/resource-center']) {
    await page.goto(path);
    const html = await page.content();
    expect(html, `${path} must not hotlink the reference CDN`).not.toContain('horizons-cdn');
  }
});
