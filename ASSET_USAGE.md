# Asset inventory and usage

Approved generated packaging artwork is documented below; it is separate from the authentic company-photo inventory.

The official `Elmas_master_clean.svg` is preserved byte-for-byte in `assets/originals` and used in the header and footer as `public/assets/logo/elmas-logo.svg`. Its geometry and green color are unchanged. The PNG fallback supplied in websitepix.zip is preserved, but the site uses SVG.

All ten photographs in `websitepix.zip` were inspected visually. All originals remain in `assets/originals`; all have optimized 1920px WebP variants in `public/assets/photos`. Twelve images were initially visible in chat; this downloadable ZIP contains ten. Only the accessible original files are used. No stock or generated imagery is used.

| Original | Web variant | Placement / status |
|---|---|---|
| picture (4).png | application.webp | Frass card/detail. Outdoor material application; exact composition is unverified. |
| picture (5).png | field.webp | Vermicompost card/detail, About wide image, Sustainability wide image. A scoop above vegetation, used as agricultural context, not a confirmed vermicompost product image. |
| picture (9).png | trays.webp | Optimized reserve: production tray overview. |
| picture (10).png | handling.webp | Optimized reserve: gloved worker tending larvae trays. |
| picture (11).png | larvae.webp | Home hero, featured BSFL larvae card and larvae detail page. Gloved hand handling larvae. |
| picture (12).png | facility.webp | About main image. Worker tending facility trays. |
| picture (13).png | tray-work.webp | Optimized reserve: worker carrying a production tray. |
| picture (14).png | substrate.webp | Optimized reserve: overhead larvae/substrate handling; exact substrate not verified. |
| picture (15).png | enclosure.webp | Optimized reserve: adult fly enclosure overview. |
| picture (16).png | breeding.webp | Sustainability biological-process section. Adult flies on wooden slats. |

No composition, efficacy, certification or trial outcome is inferred from these photos. Outdoor images show agricultural context; they are not evidence that a particular material is frass or vermicompost. Descriptive alt text and cautious captions are in `src/content/site.ts`. Used images retain factual content; only web resizing, compression and CSS framing are applied.

To update a selected image, preserve its original and run `node scripts/optimize-images.mjs INPUT KEY`. The helper refuses overwrites; intentionally remove a previous optimized variant before replacement. Rebuild after photo changes and check desktop/mobile crops. Add new image keys and verified alt text in the content file for other reserved images. Do not modify logo geometry or color.

## Framing review

Product images and small mobile thumbnails now preserve landscape proportions instead of portrait crops. Captions are placed below the image, outside the photographic content. The hero retains a deliberate responsive crop focused on larvae production. Full fit notes, missing product close-ups and current screenshots are in [SEO_AND_PHOTO_REVIEW.md](docs/SEO_AND_PHOTO_REVIEW.md). Browser icons use a padded square rendering of the full official logo; its shape and color are unchanged.

## Confirmed-offer review — 12 November 2026

All ten optimized photographs were visually inspected again. Existing images and original files are unchanged. The larvae photograph still leads the homepage; the primary mobile card now uses one column to keep the photo and offer readable. Outdoor frass/vermicompost images remain explicitly captioned as agricultural context. The soft, dark adult-fly photograph remains supporting imagery only. Updated desktop/mobile screenshots cover all ten public pages in `docs/screenshots`; no generated product photographs were added.

## Owner-approved packaging mockups

The owner approved the generated packaging concepts in this conversation: BSFL frass 5 kg, BSFL frass 10 kg, and live BSFL larvae 10 kg. The exact approved image is preserved at `public/assets/packaging/approved-packaging-concepts.png`. It is a concept illustration, not a company/product photograph and not confirmation of final packaging. The displayed container type is illustrative.

Catalogue and product-detail offer cards show individual portions of that unchanged image through SVG viewports configured by `mockupViewBox` in the typed pack data. Each package has its correct editable text price underneath, its own WhatsApp inquiry action and a visible mockup caption. No image pixels, originals or official header/footer logo assets were altered. Authentic larvae photography still leads the homepage; packaging art is omitted there to retain its compact layout.

## Owner-requested display cleanup

The owner requested removal of the visible packaging-mockup captions and explanatory note. Those labels are removed from the catalogue and detail pages; the same approved illustration pixels remain unchanged. Accessibility descriptions identify the artwork as a packaging illustration. Offer text beneath each package is now only weight and price (`5kg — $5`, `10kg — $9`, `10kg — $10`). The homepage has no pricing or offer cards; it retains authentic larvae photography and links to product details.
