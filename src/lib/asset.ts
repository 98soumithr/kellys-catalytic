/**
 * Prefixes a public-folder path with the deployment base path.
 *
 * Next's `basePath` rewrites next/link hrefs and next/image sources, but NOT the
 * `src` of a plain <img> or a CSS `url()` in an inline style. This site uses both
 * (the reference's markup does), so those paths have to be prefixed explicitly or
 * every image 404s when the site is served from a subpath — which is exactly how
 * GitHub Pages serves a project site.
 *
 * Empty at the root, so local dev and root deployments are unaffected.
 */
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';

export function asset(path: string): string {
  if (!path.startsWith('/')) return path;
  return `${BASE_PATH}${path}`;
}
