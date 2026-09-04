import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ARTICLES, ARTICLE_SLUGS } from '@/content/articles';

/**
 * Canonical resource-article routes, matching the paths published in the
 * reference sitemap (e.g. /oxygen-sensor). The same articles are also reachable
 * under /resource-center/<slug>, which is where the live navigation links.
 */
export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();
  return <ArticleLayout article={article} />;
}
