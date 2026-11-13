import type { MetadataRoute } from 'next';
import { isIndexableDeployment, siteUrl } from '@/lib/config';
export default function robots(): MetadataRoute.Robots {
  const base = isIndexableDeployment() ? siteUrl() : undefined;
  return {
    rules: { userAgent: '*', ...(base ? { allow: '/', disallow: '/api/' } : { disallow: '/' }) },
    ...(base ? { sitemap: base + '/sitemap.xml' } : {}),
  };
}
