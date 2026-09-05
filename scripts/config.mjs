// Shared configuration for all reference-audit, capture and comparison scripts.
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

export const REFERENCE_ORIGIN = process.env.REFERENCE_ORIGIN || 'https://catalit.in';
export const LOCAL_ORIGIN = process.env.LOCAL_ORIGIN || 'http://localhost:3000';

/**
 * Canonical routes, as published in the reference sitemap.xml.
 * `alias` marks the /resource-center/<slug> path the live navigation actually links to;
 * both render the same component on the reference site.
 */
export const ROUTES = [
  { path: '/', slug: 'home', alias: null },
  { path: '/about', slug: 'about', alias: '/resource-center/about' },
  { path: '/resource-center', slug: 'resource-center', alias: null },
  { path: '/knowledge-base', slug: 'knowledge-base', alias: '/resource-center/knowledge-base' },
  { path: '/pgm-price-tracker', slug: 'pgm-price-tracker', alias: '/resource-center/pgm-price-tracker' },
  { path: '/service-areas', slug: 'service-areas', alias: '/resource-center/service-areas' },
  { path: '/automotive-catalytic-converter', slug: 'automotive-catalytic-converter', alias: '/resource-center/automotive-catalytic-converter' },
  { path: '/ceramic-monolith', slug: 'ceramic-monolith', alias: '/resource-center/ceramic-monolith' },
  { path: '/oxygen-sensor', slug: 'oxygen-sensor', alias: '/resource-center/oxygen-sensor' },
  { path: '/e-waste-management', slug: 'e-waste-management', alias: '/resource-center/e-waste-management' },
  { path: '/converter-recycling-process', slug: 'converter-recycling-process', alias: '/resource-center/converter-recycling-process' },
  { path: '/material-recovery-pgm-prices', slug: 'material-recovery-pgm-prices', alias: '/resource-center/material-recovery-pgm-prices' },
  { path: '/anti-theft-compliance', slug: 'anti-theft-compliance', alias: '/resource-center/anti-theft-compliance' },
];

export const VIEWPORTS = [
  { name: 'desktop-1440', width: 1440, height: 1200 },
  { name: 'laptop-1366', width: 1366, height: 768 },
  { name: 'small-laptop-1024', width: 1024, height: 768 },
  { name: 'tablet-768', width: 768, height: 1024 },
  { name: 'mobile-430', width: 430, height: 932 },
  { name: 'mobile-390', width: 390, height: 844 },
  { name: 'mobile-375', width: 375, height: 812 },
];

// Full-page diffs may not exceed this changed-pixel ratio; major sections use SECTION_THRESHOLD.
export const PAGE_THRESHOLD = 0.03;
export const SECTION_THRESHOLD = 0.02;
// pixelmatch per-pixel colour tolerance, absorbing font anti-aliasing noise.
export const PIXELMATCH_THRESHOLD = 0.1;

export const DIRS = {
  cache: path.join(ROOT, '.reference-cache'),
  data: path.join(ROOT, 'docs', 'data'),
  reference: path.join(ROOT, 'public', 'screenshots', 'reference'),
  local: path.join(ROOT, 'public', 'screenshots', 'local'),
  diff: path.join(ROOT, 'public', 'screenshots', 'diff'),
  images: path.join(ROOT, 'public', 'images'),
  fonts: path.join(ROOT, 'public', 'fonts'),
};

/**
 * Scrolls a page top-to-bottom in steps so every scroll-triggered reveal animation
 * settles, then returns to the top. Reference and local captures MUST use this same
 * routine or animated sections will diff against their own hidden initial state.
 */
export async function settlePage(page, { backToTop = true } = {}) {
  await page.waitForLoadState('networkidle').catch(() => {});
  await page.evaluate(async () => {
    const step = Math.round(window.innerHeight * 0.6);
    for (let y = 0; y < document.body.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 130));
    }
    window.scrollTo(0, document.body.scrollHeight);
    await new Promise((r) => setTimeout(r, 900));
  });
  if (backToTop) {
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.waitForTimeout(500);
  }

  /*
   * Reveal animations are driven by framer-motion through INLINE styles, so the
   * CSS animation freeze below cannot finish them. Wait until nothing on the page
   * is still partially transparent from a reveal before shooting, or the two
   * sides get photographed at different points in their animations.
   */
  await page
    .waitForFunction(
      () =>
        ![...document.querySelectorAll('[style*="opacity"]')].some((el) => {
          const o = Number(getComputedStyle(el).opacity);
          return o > 0.01 && o < 0.99;
        }),
      null,
      { timeout: 8000 },
    )
    .catch(() => {});
  // Freeze any residual transitions so captures are deterministic.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation-duration:0s!important;animation-delay:0s!important;transition-duration:0s!important;transition-delay:0s!important;caret-color:transparent!important}`,
  });
  await page.waitForTimeout(200);
}
