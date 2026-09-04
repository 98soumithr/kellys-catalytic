import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ARTICLES } from '@/content/articles';

/** Alias for /service-areas — the homepage resource cards link here. */
export default function ResourceServiceAreasPage() {
  return <ArticleLayout article={ARTICLES['service-areas']} />;
}
