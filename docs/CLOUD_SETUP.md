# Cloud setup instructions

The environment draft read failed and the save tool returned `INVALID_ARGUMENT` / “saving the draft could not be confirmed”. These instructions are retained in the repository; automatic configuration persistence is unconfirmed.

## Install script

```bash
#!/usr/bin/env bash
set -euo pipefail
cd /workspace/elmas-website
npm ci --cache /tmp/elmas-npm-cache --no-fund
npm run lint
npm run typecheck
npm test
npm run build
```

## Startup instructions

Use the existing isolated checkout at `/workspace/elmas-website`; do not create a Git worktree unless explicitly requested. Read README.md, ASSET_USAGE.md and LAUNCH_CHECKLIST.md. Node 24 and npm are available. If dependencies are missing, run `npm ci --cache /tmp/elmas-npm-cache`. Start development with `npm run dev` from this directory. Check local GET `/` and `/products/bsfl-frass` return 200 and expected content. For production verification, `npm run build` followed by `npx playwright test` automatically starts and stops the production server and uses system Chromium at `/usr/bin/chromium` (or `CHROMIUM_PATH`). Restart processes after environment restore.

Do not invent credentials, contact details or specifications. SMTP delivery settings and production hosting are still needed before launch. The confirmed SITE_URL is https://elmasbio.com, configured locally and in .env.example; enter it in the eventual hosting environment. Confirmed public contact defaults are stored in src/content/contact.ts. Photo originals from websitepix.zip are now imported. Do not deploy or change DNS without explicit authorization. No publication is claimed.
