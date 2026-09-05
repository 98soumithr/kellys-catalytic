import { test, expect } from '@playwright/test';

const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 1200 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'small-laptop-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 812 },
];

const ROUTES = ['/', '/about', '/resource-center', '/knowledge-base', '/service-areas'];

test.describe('no horizontal overflow', () => {
  test.skip(({ isMobile }) => !!isMobile, 'viewport is set explicitly here');

  for (const vp of VIEWPORTS) {
    for (const route of ROUTES) {
      test(`${route} @ ${vp.name}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.width, height: vp.height });
        await page.goto(route);
        await page.evaluate(async () => {
          for (let y = 0; y < document.body.scrollHeight; y += 700) {
            window.scrollTo(0, y);
            await new Promise((r) => setTimeout(r, 40));
          }
        });
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth - window.innerWidth,
        );
        expect(overflow, `${route} overflows by ${overflow}px at ${vp.name}`).toBeLessThanOrEqual(1);
      });
    }
  }
});
