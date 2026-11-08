# Elma’s website

English product and inquiry website for Elma’s, Lebanon. Next.js App Router, TypeScript, React and plain responsive CSS. No database, account system, payments or paid-service requirement. SMTP delivery supports an existing business email provider.

To review this website on your computer before hosting, follow [LOCAL_PREVIEW.md](LOCAL_PREVIEW.md). No email credentials are needed. See [the search and photo review](docs/SEO_AND_PHOTO_REVIEW.md) for the latest layout screenshots and remaining photo requirements.

## Development

Requires Node.js 22.9+ (validated on Node 24) and npm.

```sh
npm ci --cache /tmp/elmas-npm-cache
cp .env.example .env.local
npm run dev
```

Local development uses port 3000. Run `npm run lint`, `npm run typecheck`, `npm test` and `npm run build`. Run production locally with `npm start` after building. Browser smoke tests: use the system Chromium (`/usr/bin/chromium`, or set `CHROMIUM_PATH`); `npx playwright test` starts a production server automatically. Browser tests expect SMTP delivery to be unconfigured, SITE_URL=https://elmasbio.com and the confirmed public contacts to be active. Use an isolated test environment.

## Company assets

The official supplied SVG is preserved byte-for-byte in `assets/originals` and `public/assets/logo`. All ten photographs from `websitepix.zip` are preserved in `assets/originals`, visually reviewed and optimized to WebP. Selected authentic outdoor and production photos appear throughout the site. See `ASSET_USAGE.md` for exact placement and truthful caption limits. No stock or generated photographs are used.

## Owner editing

- Product names, descriptions, audiences, uses, buyer questions, FAQ answers and cautious application notes: `src/content/site.ts`. Add products using its typed model; detail routes and product selects derive from this list. Never add unverified performance, composition, formats or approvals.
- Page-specific company copy: `src/app/page.tsx`, `about/page.tsx`, `sustainability/page.tsx`. English content is separated from reusable components, ready to extract into locale files later.
- Photo mapping, factual alt text and captions: `images` in `src/content/site.ts`. Preserve originals in `assets/originals` and generate web variants using `node scripts/optimize-images.mjs original.png field` (or another documented image key). Review every photo before assigning a product identity. Material photographs are not proof of composition or results.
- Verified specifications: edit each product’s `specifications` in `src/content/site.ts`; `null` and empty values are intentionally hidden. Never enter estimates as confirmed specifications.
- Formatting: use `npm run format` to apply consistent indentation, or `npm run format:check` to check it.
- Logo: supplied SVG, do not modify its geometry or color. Light backgrounds preserve contrast.
- Contact details: confirmed business email and WhatsApp defaults are in `src/content/contact.ts`; override them with `CONTACT_EMAIL` and `WHATSAPP_NUMBER` (an explicit empty value hides that option). Rebuild after changes to update static pages. Social links are omitted until verified links are available; add verified links to the footer when supplied.
- Future commerce: products have stable slugs and typed data; no speculative inventory, pricing or checkout is implemented.

## Email and WhatsApp

See `.env.example`. Configure server-only `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASSWORD`, `MAIL_FROM`, `MAIL_TO` through your hosting secret manager. TLS is mandatory (465 implicit TLS or 587 STARTTLS). `CONTACT_EMAIL` is a public business contact, and `WHATSAPP_NUMBER` uses international digits. Never put credentials in browser-prefixed variables or commit `.env.local`.

Missing SMTP configuration disables submission and clearly states nothing was sent. The endpoint independently returns 503 rather than reporting success. Only SMTP acceptance produces a success state; inbox delivery still requires an actual delivery check. Confirmed public contacts are configured: ferasmonther@elmasbio.com and WhatsApp +961 70 988 141. These are links only; mailbox ownership, WhatsApp availability and email delivery have not been tested by sending messages. No email has been sent during development.

The server validates field lengths, email, consent, product and positive quantities, rejects cross-origin submissions, caps request bodies, uses a honeypot and rate limits requests. It sends plain text only, to a configured fixed recipient, using a fixed sender with the visitor as reply-to. It does not log submission contents. The in-memory limiter is suitable for a single process; it resets on restart. Before scaling to multiple replicas or serverless, use a shared limiter or hosting edge rate limits. Configure `TRUSTED_CLIENT_IP_HEADER` only when the hosting proxy overwrites that exact header; otherwise the app conservatively shares one five-attempt/15-minute bucket across all clients. Do not blindly trust client-supplied forwarded headers.

## Deployment preparation

Use a Node-capable Next.js host (not a static export; forms require a server). No deployment has been performed. The confirmed HTTPS origin is `https://elmasbio.com` (`SITE_URL` in `.env.example`). Set it in the hosting environment and rebuild to enable canonical URLs, sitemap entries and indexing; without it the site intentionally uses noindex and robots disallow. Public content and asset presence are evaluated during build, so rebuild after changing content or adding photographs. SMTP/contact pages evaluate runtime configuration on each request. Configure outbound SMTP access and credentials at the chosen host, validate the real mailbox, and complete `LAUNCH_CHECKLIST.md` before publishing. Do not change live DNS without approval.
