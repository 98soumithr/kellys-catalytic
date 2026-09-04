import type { MetadataRoute } from 'next';
import { SITE_URL, SITEMAP_ROUTES } from '@/data/site';

export const dynamic = 'force-static';

/** Mirrors the reference sitemap: the 13 canonical paths, daily, priority 1. */
export default function sitemap(): MetadataRoute.Sitemap {
  return SITEMAP_ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified: new Date('2026-05-04'),
    changeFrequency: 'daily' as const,
    priority: 1,
  }));
}
