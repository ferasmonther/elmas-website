import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/config';
export default function robots(): MetadataRoute.Robots {
  const base = siteUrl();
  return {
    rules: { userAgent: '*', ...(base ? { allow: '/', disallow: '/api/' } : { disallow: '/' }) },
    ...(base ? { sitemap: base + '/sitemap.xml' } : {}),
  };
}
