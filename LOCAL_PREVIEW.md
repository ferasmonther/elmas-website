# Review Elma’s on your computer

No hosting subscription or domain changes are needed.

1. Install Node.js 24 LTS from https://nodejs.org (includes npm).
2. Extract the website ZIP to a folder on your computer.
3. Open a terminal in the extracted project folder (the one containing `package.json`). On Windows, open that folder in File Explorer, type `cmd` in its address bar and press Enter.
4. Run:

```sh
npm ci
npm run dev
```

5. Keep the terminal open. In your browser, type `http://localhost:3000`.
6. Browse Home, Products, each product, About, Our approach, Contact and Request a Quote. Resize the browser to review the mobile layout. Email forms remain disabled until email delivery is configured.
7. To stop, press Ctrl+C in the terminal. To start again later, run `npm run dev` from the same folder.

The first `npm ci` needs internet to install dependencies. After installation, the website pages and local photos can be reviewed without internet. Email and WhatsApp links require the appropriate external app/service and connectivity. This is a Next.js app: double-clicking an HTML file will not run it. The source ZIP intentionally excludes machine-specific node_modules, generated build output and private environment files.

For a production-style local check, run `npm run build` followed by `npm start` instead of `npm run dev`. Leave SITE_URL empty for an isolated preview; production hosting will use the confirmed https://elmasbio.com domain. No email credentials are required for visual review.

## Updated offers review

Download `elmas-website-review` through GitHub → Code → Download ZIP, then extract it. Runtime dependencies are unchanged. For an existing installed copy, replacing `src` and restarting `npm run dev` applies the website changes; download the full branch to receive updated tests, documentation and screenshots too.

Check live larvae (10 kg / US$10), both frass packs (5 kg / US$5 and 10 kg / US$9), and inquiry-only vermicompost. Pack-specific quote links preserve the selected product and pack; the form’s direct-contact links update when either selection changes. Inspect WhatsApp’s prepared message without sending it. Delivery arrangements and additional charges must be confirmed before committing to an order.

## GitHub Pages version

The published static version and rebuild instructions are in [docs/GITHUB_PAGES.md](docs/GITHUB_PAGES.md). For local source review on Windows, continue using `npm ci` and `npm run dev` as above.
