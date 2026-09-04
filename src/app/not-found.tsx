import HomePage from './page';

/**
 * The reference is a client-rendered SPA whose router falls through to the
 * homepage for any unrecognised path (it never renders a 404 view), so the
 * replica shows the same page. Under a static export this is served with a 404
 * status where the reference returns 200 — an unavoidable difference between
 * static hosting and a client-side router. See docs/DECISIONS.md (D-005).
 */
export default function NotFound() {
  return <HomePage />;
}
