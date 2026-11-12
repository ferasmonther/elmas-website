# GitHub Pages deployment

The owner authorized deployment to GitHub Pages. The source remains on `elmas-website-review`; `main` is unchanged. Generated public files are published from `gh-pages` at:

https://ferasmonther.github.io/elmas-website/

## Static host behavior

GitHub Pages serves files, not a Node.js server. Product pages, approved package mockups, navigation, pack selection, email links and WhatsApp inquiry links work in the browser. Online email submission remains disabled; no SMTP credentials or API endpoint are included in this export. The original server endpoint remains in the source for a future Node-capable host.

This GitHub address is separate from `elmasbio.com`; no DNS or custom domain changes are made. The static build intentionally clears SITE_URL, which keeps noindex/robots disallow and avoids claiming that the official domain has launched. It does not publish an empty sitemap as if the official domain were live. Changing the canonical/indexing policy and mapping the official domain should be a deliberate launch step.

Next.js custom HTTP security headers cannot be applied by a static export; GitHub Pages controls response headers. The Node-capable source retains its header configuration.

## Rebuild and verify

From the repository folder after `npm ci`:

```sh
node scripts/build-github-pages.mjs
```

The script copies application files into ignored `work/github-pages-build`, removes the API only from that temporary copy, forces contact/quote pages to static rendering, sets `/elmas-website` as the base path, turns off image optimization and exports `work/github-pages-build/out`. It excludes local environment files and disables SMTP even if the shell contains mail configuration. Quote query selection is handled in the browser; changing the selected product still clears an incompatible pack.

To test locally on Linux:

```sh
mkdir -p work/pages-serve
ln -sfn ../github-pages-build/out work/pages-serve/elmas-website
python -m http.server 3100 --bind 127.0.0.1 --directory work/pages-serve
```

In another terminal:

```sh
node scripts/check-github-pages.mjs
```

The browser check visits all ten pages at 320/390/768/1440px, decodes photos, checks overflow and axe accessibility, tests pack-specific navigation and WhatsApp messages, and verifies that submission stays disabled. It never sends external messages.

Publish the contents of `out` (including `.nojekyll`) to the existing `gh-pages` branch, then verify GitHub Pages build status and the actual HTTPS site. A push to the review source branch alone does not update the deployed files. Keep all source, dependencies, local settings and secrets out of the deployment branch.

The export sets `DEPLOYMENT_URL` to the actual GitHub Pages address for correct social-preview URLs and photos. `SITE_URL` remains empty in that export to preserve noindex until the official-domain launch step. This separates sharing metadata from the decision to index the site.
