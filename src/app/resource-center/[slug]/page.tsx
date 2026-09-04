import { notFound } from 'next/navigation';
import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ARTICLES, ARTICLE_SLUGS } from '@/content/articles';

/**
 * /resource-center/<slug> aliases. The reference navigation and homepage cards
 * link here, while its sitemap lists the top-level paths; both render the same
 * article, so both are generated from one component.
 */
export function generateStaticParams() {
  return ARTICLE_SLUGS.map((slug) => ({ slug }));
}

export default async function ResourceArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = ARTICLES[slug];
  if (!article) notFound();
  return <ArticleLayout article={article} />;
}
