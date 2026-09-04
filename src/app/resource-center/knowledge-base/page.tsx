import { SiteShell } from '@/components/layout/SiteShell';
import { SHELL } from '@/data/wrappers';
import { KnowledgeBaseView } from '@/app/knowledge-base/KnowledgeBaseView';

/** Alias for /knowledge-base — the Resource Center dropdown links here. */
export default function ResourceKnowledgeBasePage() {
  return (
    <SiteShell wrapperClassName={SHELL.column.wrapper} mainClassName={SHELL.column.main}>
      <KnowledgeBaseView />
    </SiteShell>
  );
}
