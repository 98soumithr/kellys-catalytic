import { ArticleLayout } from '@/components/article/ArticleLayout';
import { ARTICLES } from '@/content/articles';

export default function ServiceAreasPage() {
  return <ArticleLayout article={ARTICLES['service-areas']} />;
}
