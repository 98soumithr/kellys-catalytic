/**
 * Turns docs/data/articles.json into src/content/articles.ts, rewriting every
 * reference CDN image URL to its locally stored copy. Fails loudly if any image
 * has no local counterpart — a silently missing asset is exactly the failure
 * this project must not ship.
 */
import fs from 'node:fs/promises';
import path from 'node:path';
import { DIRS, ROOT } from './config.mjs';

const articles = JSON.parse(await fs.readFile(path.join(DIRS.data, 'articles.json'), 'utf8'));
const manifest = JSON.parse(await fs.readFile(path.join(DIRS.data, 'asset-manifest.json'), 'utf8'));

const localByUrl = Object.fromEntries(
  manifest.filter((a) => a.localPath).map((a) => [a.url.split('?')[0], a.localPath]),
);
const dimsByLocal = Object.fromEntries(
  manifest.filter((a) => a.localPath).map((a) => [a.localPath, a.dimensions]),
);

const missing = [];
for (const [slug, article] of Object.entries(articles)) {
  for (const block of article.blocks) {
    if (block.type !== 'imageGrid') continue;
    for (const image of block.images) {
      const local = localByUrl[(image.src || '').split('?')[0]];
      if (!local) {
        missing.push(`${slug}: ${image.src}`);
        continue;
      }
      const [w, h] = dimsByLocal[local].split('x');
      image.src = local;
      image.width = Number(w);
      image.height = Number(h);
    }
  }
}
if (missing.length) {
  console.error('No local copy for these assets:\n  ' + missing.join('\n  '));
  process.exit(1);
}

const header = `/**
 * Resource-article content, extracted from the reference DOM as a typed block
 * model (see scripts/extract-articles.mjs) and rendered by one shared layout.
 *
 * Class strings are captured per element rather than assumed: the reference
 * articles are not internally consistent (one uses mb-3 on card titles where the
 * others use mb-4; /service-areas uses an emerald heading variant), and assuming
 * a single style silently shifts those pages.
 *
 * Regenerate: node scripts/extract-articles.mjs && node scripts/generate-article-content.mjs
 */
export interface ListItem {
  lead: string | null;
  text: string;
}

export interface ArticleCard {
  title: string;
  titleClass: string;
  paragraphClass: string;
  listClass: string;
  paragraphs: string[];
  items: ListItem[];
}

export type Block =
  | { type: 'sectionStart'; className: string }
  | { type: 'sectionEnd' }
  | { type: 'heading'; text: string; className: string }
  | { type: 'paragraph'; text: string; className: string }
  | { type: 'list'; className: string; ordered: string; items: ListItem[] }
  | { type: 'cards'; containerClass: string; cardClass: string; cards: ArticleCard[] }
  | {
      type: 'imageGrid';
      cols: string;
      images: { src: string; alt: string; width: number; height: number }[];
    };

export interface Article {
  h1: string;
  blocks: Block[];
}

export const ARTICLES: Record<string, Article> = `;

await fs.writeFile(
  path.join(ROOT, 'src/content/articles.ts'),
  header + JSON.stringify(articles, null, 2) + ';\n\nexport const ARTICLE_SLUGS = Object.keys(ARTICLES);\n',
);
console.log(`src/content/articles.ts written (${Object.keys(articles).length} articles)`);
