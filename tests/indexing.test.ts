import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isIndexableDeployment, productionSiteUrl, siteUrl } from '../src/lib/config';
import robots from '../src/app/robots';
import sitemap from '../src/app/sitemap';
import { seo } from '../src/lib/seo';

const env = process.env as Record<string, string | undefined>;
const keys = ['NODE_ENV', 'VERCEL_ENV', 'SITE_ENV', 'SITE_URL', 'DEPLOYMENT_URL'] as const;
function configured(values: Partial<Record<(typeof keys)[number], string>>, check: () => void) {
  const before = Object.fromEntries(keys.map((key) => [key, env[key]]));
  try {
    for (const key of keys) {
      if (values[key] === undefined) delete env[key];
      else env[key] = values[key];
    }
    check();
  } finally {
    for (const key of keys) {
      if (before[key] === undefined) delete env[key];
      else env[key] = before[key];
    }
  }
}

test('Vercel production is indexable without SITE_URL and uses the confirmed www canonical', () => {
  for (const SITE_URL of [undefined, 'https://elmasbio.com', 'https://wrong.example']) {
    configured({ NODE_ENV: 'production', VERCEL_ENV: 'production', SITE_URL }, () => {
      assert.equal(isIndexableDeployment(), true);
      assert.equal(siteUrl(), productionSiteUrl);
      assert.deepEqual(robots().rules, { userAgent: '*', allow: '/', disallow: '/api/' });
      assert.equal(robots().sitemap, 'https://www.elmasbio.com/sitemap.xml');
      const entries = sitemap();
      assert.equal(entries.length, 10);
      assert.equal(new Set(entries.map((entry) => entry.url)).size, entries.length);
      for (const entry of entries) {
        assert.equal(new URL(entry.url).origin, productionSiteUrl);
        assert.equal(new URL(entry.url).search, '');
        assert.ok(!entry.url.includes('/api/'));
        const path = new URL(entry.url).pathname;
        assert.equal(seo('Title', 'Description', path).alternates?.canonical, entry.url);
      }
    });
  }
});

test('preview and development stay blocked even with production URL or conflicting settings', () => {
  for (const values of [
    { NODE_ENV: 'production', VERCEL_ENV: 'preview', SITE_ENV: 'production' },
    { NODE_ENV: 'production', VERCEL_ENV: 'development', SITE_ENV: 'production' },
    { NODE_ENV: 'development', VERCEL_ENV: 'production' },
    { NODE_ENV: 'production', SITE_ENV: 'preview' },
    { NODE_ENV: 'production' },
    { NODE_ENV: 'test', SITE_ENV: 'production' },
  ]) {
    configured({ ...values, SITE_URL: productionSiteUrl }, () => {
      assert.equal(isIndexableDeployment(), false);
      assert.deepEqual(robots().rules, { userAgent: '*', disallow: '/' });
      assert.equal(robots().sitemap, undefined);
      assert.deepEqual(sitemap(), []);
    });
  }
});

test('non-Vercel production requires an explicit production target', () => {
  configured({ NODE_ENV: 'production', SITE_ENV: 'production' }, () => {
    assert.equal(isIndexableDeployment(), true);
    assert.equal(siteUrl(), productionSiteUrl);
  });
});
