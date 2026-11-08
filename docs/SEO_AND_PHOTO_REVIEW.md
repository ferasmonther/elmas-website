# Search, layout and photography review

## Improvements implemented

- Search-focused homepage title: BSFL Protein & Organic Fertilizers in Lebanon. Product titles and descriptions identify the product, Lebanon and the actual inquiry purpose.
- Canonical URLs, sitemap and robots configuration remain tied to SITE_URL. Open Graph and Twitter now include an authentic supplied photo. Company JSON-LD includes the confirmed email; product pages have visible breadcrumbs and matching BreadcrumbList JSON-LD. No fabricated reviews, certifications, prices or availability are added.
- Product pages explain what information buyers should provide and answer suitability/application questions. Product-specific specification fields live in src/content/site.ts with null values; null/empty values stay unpublished. Only replace those with verified information.
- The homepage stays short. Card spacing, catalog caption heights, heading sizes, footer contact links, image frames, input sizing and phone widths are adjusted. Photo captions sit below the image rather than covering the subject. Source code now uses consistent two-space indentation; npm run format:check verifies it.
- Contact and quotation pages provide direct business email and product-specific WhatsApp links alongside the disabled online form. Automated delivery is deliberately deferred until SMTP is configured. No test message has been sent.
- The browser icon uses the entire official SVG padded into a square. Its geometry, proportions and green color are preserved. A separately approved compact mark would be more legible at very small sizes, but no replacement logo was invented.

## Photo suitability

| Supplied original | Current role | Fit and remaining limitation |
|---|---|---|
| picture (4).png | Home hero; frass agricultural context | Good daylight landscape. Mobile hero framing is deliberately focused toward the scoop/hand; a background hero cannot show the entire wide photo in a narrow phone frame. The full original is shown in product images. The exact material identity is unconfirmed. |
| picture (5).png | Vermicompost agricultural context; About and Sustainability | Good landscape framing, with the whole scoop visible. This does not establish that the material is vermicompost. A clearly identified finished vermicompost close-up is still needed. |
| picture (11).png | BSFL protein | Suitable larvae production photo. Landscape frames show the gloved hand and trays; mobile thumbnails now preserve the complete image rather than slicing it into a portrait strip. |
| picture (12).png | About / facility | Suitable hands-on facility photo. Preserved at its landscape ratio with the caption outside the image. Blue lighting is authentic and has not been recolored. |
| picture (16).png | Sustainability lifecycle context | Useful supporting context, but dark, blue-lit and soft. It is not suitable as a main product photo or hero; a sharper, naturally lit adult-fly image would improve this section. |

No supplied photo is stretched. Product and supporting-photo frames use contain with the original landscape proportions. Only the atmospheric hero uses a deliberate crop. All ten originals remain unchanged in assets/originals.

The two important missing product assets are clearly identified close-ups of **BSFL frass** and **finished vermicompost**. Their absence cannot be repaired by relabeling an unverified material photo. Confirm the identity of the current outdoor material, or supply separately labeled product photos.

## Review screenshots

- [Desktop homepage](screenshots/home-desktop.png)
- [Phone homepage](screenshots/home-mobile.png)
- [Desktop product page](screenshots/frass-desktop.png)
- [Phone product page](screenshots/frass-mobile.png)
- [Phone About page](screenshots/about-mobile.png)
- [Phone Contact page](screenshots/contact-mobile.png)

## What still needs business input or a live site

- Verified formats, packaging, availability, technical analyses and application guidance. Nothing is invented to fill these gaps.
- SMTP configuration and authorized mailbox delivery verification, intentionally deferred by the owner.
- Business/legal review of privacy arrangements, actual service providers and retention. A code change cannot establish legal adequacy.
- Hosting, HTTPS and redirects, followed by Google Search Console ownership verification, sitemap submission and indexing checks. No website publication or DNS changes have been performed.
- Local Lighthouse results are laboratory checks, not live field Core Web Vitals or a guarantee of rankings. Retest after hosting and review actual field data when enough traffic exists.

## Local audit results

A single Lighthouse 13.6.0 mobile lab run against the local production build measured: performance **95**, accessibility **100**, best practices **100**, SEO **100**. Largest Contentful Paint was approximately 2.5 seconds, Total Blocking Time 180 ms and Cumulative Layout Shift 0, with no browser console errors. These are local lab observations, not real-user field data or a guarantee of search visibility. See [lighthouse-summary.json](lighthouse-summary.json).

The existing automated suite passed six unit tests and eight browser checks, covering all ten public pages at 320, 390, 768 and 1440px. After the final catalog-caption alignment adjustment, the complete-page checks at 320 and 1440px were rerun and passed. Additional direct measurements confirmed equal catalog heading positions, 16:9 product image frames, captions below images and a successful favicon response. Lint, formatting and TypeScript checks passed; the production build succeeded.
