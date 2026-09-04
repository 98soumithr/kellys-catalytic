import { SiteShell } from '@/components/layout/SiteShell';
import { SHELL } from '@/data/wrappers';
import { KnowledgeBaseView } from './KnowledgeBaseView';

export default function KnowledgeBasePage() {
  return (
    <SiteShell wrapperClassName={SHELL.column.wrapper} mainClassName={SHELL.column.main}>
      <KnowledgeBaseView />
    </SiteShell>
  );
}
