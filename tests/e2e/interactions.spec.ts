import { test, expect } from '@playwright/test';

test.describe('desktop navigation', () => {
  test.skip(({ isMobile }) => !!isMobile, 'desktop-only chrome');

  test('resource dropdown reveals its links on hover', async ({ page }) => {
    await page.goto('/');
    const trigger = page.getByRole('button', { name: 'Resource Center' });
    const link = page.getByRole('link', { name: /Knowledge Base/ }).first();
    await expect(link).toBeHidden();
    await trigger.hover();
    await expect(link).toBeVisible();
  });

  test('header gains its scrolled treatment', async ({ page }) => {
    await page.goto('/');
    const header = page.locator('header');
    await expect(header).toHaveClass(/bg-transparent/);
    await page.evaluate(() => window.scrollTo(0, 800));
    await expect(header).toHaveClass(/glass/);
  });
});

test.describe('mobile navigation', () => {
  test.skip(({ isMobile }) => !isMobile, 'mobile-only chrome');

  test('menu toggles open and closed', async ({ page }) => {
    await page.goto('/');
    const toggle = page.getByRole('button', { name: 'Toggle mobile menu' });
    const item = page.getByRole('link', { name: 'How to Sell' });
    await expect(item).toBeHidden();
    await toggle.click();
    await expect(item).toBeVisible();
    await expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await toggle.click();
    await expect(item).toBeHidden();
  });
});

test('homepage FAQ accordion opens one item at a time', async ({ page }) => {
  await page.goto('/');
  const first = page.getByRole('button', { name: /What are catalytic converters/ });
  const second = page.getByRole('button', { name: /Are you a legit/ });
  await first.scrollIntoViewIfNeeded();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await first.click();
  await expect(first).toHaveAttribute('aria-expanded', 'true');
  await second.click();
  await expect(first).toHaveAttribute('aria-expanded', 'false');
  await expect(second).toHaveAttribute('aria-expanded', 'true');
});

test('knowledge base search filters the accordion', async ({ page }) => {
  await page.goto('/knowledge-base');
  const items = page.locator('[data-radix-collection-item]');
  await expect(items).toHaveCount(20);
  await page.getByLabel('Search FAQs').fill('rhodium');
  const filtered = await items.count();
  expect(filtered).toBeGreaterThan(0);
  expect(filtered).toBeLessThan(20);
  await page.getByLabel('Search FAQs').fill('zzzzznotathing');
  await expect(page.getByText('No results found.')).toBeVisible();
});

test('contact actions use the right protocols', async ({ page }) => {
  await page.goto('/');
  const tel = page.locator('a[href^="tel:"]').first();
  await expect(tel).toHaveAttribute('href', 'tel:+919895397781');
  const wa = page.locator('a[href*="wa.me"]').first();
  await expect(wa).toHaveAttribute('href', 'https://wa.me/919895397781');
  for (const link of await page.locator('a[target="_blank"]').all()) {
    await expect(link).toHaveAttribute('rel', /noopener/);
  }
});
