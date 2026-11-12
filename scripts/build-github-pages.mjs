import { cp, mkdir, rm, readFile, writeFile } from 'node:fs/promises';
import { spawnSync } from 'node:child_process';
import { resolve } from 'node:path';

const root = process.cwd();
const stage = resolve(root, 'work/github-pages-build');
await rm(stage, { recursive: true, force: true });
await mkdir(stage, { recursive: true });
for (const path of [
  'src',
  'public',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'next-env.d.ts',
  'next.config.ts',
]) {
  await cp(resolve(root, path), resolve(stage, path), { recursive: true });
}
// GitHub Pages serves files only; preserve the server API in the source checkout.
await rm(resolve(stage, 'src/app/api'), { recursive: true });
for (const route of ['contact/page.tsx', 'request-quote/page.tsx']) {
  const path = resolve(stage, 'src/app', route);
  await writeFile(
    path,
    (await readFile(path, 'utf8')).replace(
      "export const dynamic = 'force-dynamic';",
      route === 'contact/page.tsx' ? "export const dynamic = 'force-static';" : '',
    ),
  );
}
for (const route of ['robots.ts', 'sitemap.ts']) {
  const path = resolve(stage, 'src/app', route);
  await writeFile(
    path,
    "export const dynamic = 'force-static';\n" + (await readFile(path, 'utf8')),
  );
}
const env = {
  ...process.env,
  GITHUB_PAGES: 'true',
  NEXT_PUBLIC_BASE_PATH: '/elmas-website',
  SITE_URL: '',
};
// Email configuration is intentionally deferred and cannot run on this static host.
for (const key of ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD', 'MAIL_FROM', 'MAIL_TO'])
  delete env[key];
const result = spawnSync(
  process.execPath,
  [resolve(root, 'node_modules/next/dist/bin/next'), 'build', '--webpack'],
  { cwd: stage, env, stdio: 'inherit' },
);
if (result.status !== 0) process.exit(result.status || 1);
await writeFile(resolve(stage, 'out/.nojekyll'), '');
console.log(`GitHub Pages output: ${resolve(stage, 'out')}`);
