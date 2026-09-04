/**
 * Renders every reference route in Chromium, waits for scroll-reveal animations to
 * settle, then writes (a) the rendered DOM and (b) a computed-style measurement pass
 * used to build docs/DESIGN_SYSTEM.md and docs/ROUTE_INVENTORY.md.
 *
 * Writes: .reference-cache/dom/*.html, docs/data/reference-*.json
 * Never touches src/ or any doc other than through the operator.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { chromium } from '@playwright/test';
import { ROUTES, REFERENCE_ORIGIN, DIRS, settlePage } from './config.mjs';

const domDir = path.join(DIRS.cache, 'dom');

/** Runs in the page: harvests structure + measured styles without copying source code. */
function measure() {
  const px = (v) => (v && v !== 'none' ? v : null);
  const styleOf = (el) => {
    const s = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    return {
      tag: el.tagName.toLowerCase(),
      cls: el.className && typeof el.className === 'string' ? el.className : '',
      text: (el.textContent || '').trim().slice(0, 160),
      w: Math.round(r.width),
      h: Math.round(r.height),
      font: s.fontFamily,
      size: s.fontSize,
      weight: s.fontWeight,
      lh: s.lineHeight,
      ls: s.letterSpacing,
      color: s.color,
      bg: s.backgroundColor,
      bgImage: px(s.backgroundImage),
      pad: `${s.paddingTop} ${s.paddingRight} ${s.paddingBottom} ${s.paddingLeft}`,
      mar: `${s.marginTop} ${s.marginRight} ${s.marginBottom} ${s.marginLeft}`,
      radius: s.borderRadius,
      border: s.border,
      shadow: px(s.boxShadow),
      display: s.display,
      gap: s.gap,
      transition: px(s.transitionDuration),
    };
  };

  const sections = [...document.querySelectorAll('main > section, main > div > section, section')].map(
    (el, i) => ({ index: i, id: el.id || null, ...styleOf(el) }),
  );

  const headings = [...document.querySelectorAll('h1,h2,h3,h4')].map(styleOf);

  const images = [...document.querySelectorAll('img')].map((el) => ({
    src: el.currentSrc || el.src,
    alt: el.alt,
    natural: `${el.naturalWidth}x${el.naturalHeight}`,
    rendered: `${Math.round(el.getBoundingClientRect().width)}x${Math.round(el.getBoundingClientRect().height)}`,
    cls: el.className,
    fit: getComputedStyle(el).objectFit,
    position: getComputedStyle(el).objectPosition,
  }));

  const links = [...document.querySelectorAll('a[href]')].map((el) => ({
    href: el.getAttribute('href'),
    text: (el.textContent || '').trim().slice(0, 80),
    target: el.getAttribute('target'),
    rel: el.getAttribute('rel'),
  }));

  const buttons = [...document.querySelectorAll('button')].map((el) => ({
    text: (el.textContent || '').trim().slice(0, 80),
    cls: el.className,
    aria: el.getAttribute('aria-label'),
    controls: el.getAttribute('aria-controls'),
    state: el.getAttribute('data-state'),
  }));

  const header = document.querySelector('header');
  const footer = document.querySelector('footer');
  const container = document.querySelector('.container');

  return {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.content || null,
    bodyFont: getComputedStyle(document.body).fontFamily,
    bodySize: getComputedStyle(document.body).fontSize,
    bodyBg: getComputedStyle(document.body).backgroundColor,
    docHeight: document.body.scrollHeight,
    headerHeight: header ? Math.round(header.getBoundingClientRect().height) : null,
    headerClass: header?.className || null,
    containerWidth: container ? Math.round(container.getBoundingClientRect().width) : null,
    containerPad: container ? getComputedStyle(container).paddingLeft : null,
    footerClass: footer?.className || null,
    sections,
    headings,
    images,
    links,
    buttons,
  };
}

async function main() {
  await fs.mkdir(domDir, { recursive: true });
  await fs.mkdir(DIRS.data, { recursive: true });

  const browser = await chromium.launch();
  const summary = [];

  for (const route of ROUTES) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 1200 }, deviceScaleFactor: 1 });
    const page = await ctx.newPage();
    const consoleErrors = [];
    page.on('console', (m) => m.type() === 'error' && consoleErrors.push(m.text().slice(0, 200)));

    const url = REFERENCE_ORIGIN + route.path;
    await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await settlePage(page);

    const data = await page.evaluate(measure);
    data.route = route.path;
    data.slug = route.slug;
    data.url = url;
    data.consoleErrors = consoleErrors;

    await fs.writeFile(path.join(domDir, `${route.slug}.html`), await page.content(), 'utf8');
    await fs.writeFile(
      path.join(DIRS.data, `reference-${route.slug}.json`),
      JSON.stringify(data, null, 2),
      'utf8',
    );

    summary.push({
      route: route.path,
      slug: route.slug,
      title: data.title,
      sections: data.sections.length,
      headings: data.headings.length,
      images: data.images.length,
      links: data.links.length,
      docHeight: data.docHeight,
      headerHeight: data.headerHeight,
      containerWidth: data.containerWidth,
      consoleErrors: consoleErrors.length,
    });
    console.log(
      `✓ ${route.path.padEnd(34)} sections=${String(data.sections.length).padStart(2)} imgs=${String(data.images.length).padStart(2)} h=${data.docHeight}`,
    );
    await ctx.close();
  }

  await browser.close();
  await fs.writeFile(
    path.join(DIRS.data, 'reference-summary.json'),
    JSON.stringify(summary, null, 2),
    'utf8',
  );
  console.log(`\nCrawled ${summary.length} routes → docs/data/`);
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
