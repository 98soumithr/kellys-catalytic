import { Header } from './Header';
import { Footer } from './Footer';

/**
 * Page chrome. The reference wraps header + main + footer together in a
 * per-page `min-h-screen …` div, so the viewport floor applies to the WHOLE
 * page rather than to the content area alone — wrapping only the content makes
 * short pages (several resource articles) taller than the reference by the
 * height of the footer. Both class strings are measured per route; see
 * docs/data/wrappers.json.
 */
export function SiteShell({
  wrapperClassName,
  mainClassName,
  children,
}: {
  wrapperClassName: string;
  mainClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={wrapperClassName}>
      <Header />
      <main className={mainClassName}>{children}</main>
      <Footer />
    </div>
  );
}
