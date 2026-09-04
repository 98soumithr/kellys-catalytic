import Link from 'next/link';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { ArticleBlocks } from './ArticleBlocks';
import { SiteShell } from '@/components/layout/SiteShell';
import { SHELL } from '@/data/wrappers';
import type { Article } from '@/content/articles';

/** Shell shared by every resource article: breadcrumb, back link, title, body. */
export function ArticleLayout({ article }: { article: Article }) {
  return (
    <SiteShell wrapperClassName={SHELL.article.wrapper} mainClassName={SHELL.article.main}>
      <div className="container mx-auto px-4 max-w-5xl">
        <nav className="flex items-center text-sm text-gray-500 mb-8" aria-label="Breadcrumb">
          <Link className="hover:text-emerald-600 transition-colors" href="/resource-center">
            Resource Center
          </Link>
          <ChevronRight className="w-4 h-4 mx-2" aria-hidden="true" />
          <span className="text-gray-900 font-medium">{article.h1}</span>
        </nav>
        <Link
          className="inline-flex items-center text-emerald-600 font-medium hover:text-emerald-700 mb-10 transition-colors"
          href="/resource-center"
        >
          <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" /> Back to Resource Center
        </Link>
        <h1 className="text-4xl md:text-5xl font-bold mb-12 tracking-tight">{article.h1}</h1>
        <ArticleBlocks blocks={article.blocks} />
      </div>
    </SiteShell>
  );
}
