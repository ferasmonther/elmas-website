# Full website consistency review

Reviewed all ten public pages, shared navigation/footer/CTAs, product data, inquiry links, metadata, company photos and approved package illustrations.

| Page | Review and correction |
| --- | --- |
| Home | No prices in visible copy, offer cards or homepage description. Actual larvae production photo leads; larvae remain the main product and quote default. |
| Products | Removed the repeated price paragraph. Each of the three package illustrations has only its weight and price below it. |
| Live larvae | Removed duplicate FAQ pricing. The single offer is `10kg — $10`; surrounding copy identifies live larvae and chicken/fish applications. Suitability caveats remain. |
| Frass | Distinct `5kg — $5` and `10kg — $9` offers, each with its own matching inquiry links. Outdoor photograph remains agricultural context, not a verified frass close-up. |
| Vermicompost | Remains a distinct inquiry-only soil product with no price. Context image is not described as a verified vermicompost close-up. |
| About | Kept the larvae/feed priority and complementary soil inputs; removed unsupported quality wording from the mission paragraph. Facility photograph remains authentic. |
| Our approach | Reviewed separate larvae/vermicomposting processes, cautious impact copy and actual context imagery. The dark/soft adult-fly image remains supporting imagery only. |
| Contact | Corrected wording that directed people toward unavailable online submission; points to product/pack selection and direct email/WhatsApp. |
| Request a Quote | Describes the actual selection/direct-contact flow. Verified all three pack inquiries and that changing to vermicompost clears the previous pack and price. |
| Privacy | Replaced server-only operational descriptions with the actual GitHub Pages behavior and kept outstanding business/privacy review explicit. |

## Shared consistency

- Visible prices derive from the typed pack records through `packPrice`: `5kg — $5`, `10kg — $9`, `10kg — $10`. There are no repeated prices in prose or FAQ answers.
- Prepared inquiries retain product, live format where applicable, weight and USD currency. The weight/price formatting agrees with the displayed option.
- Removed visible packaging-mockup captions and explanatory text as requested. Accessibility descriptions still identify package artwork as an illustration.
- Pack WhatsApp buttons use the same visible wording. All email/WhatsApp destinations match the confirmed business contacts.
- Moved the desktop WhatsApp shortcut into normal page flow, matching the phone behavior, so it cannot cover text or photos.
- Added the actual GitHub deployment origin for social-preview URLs/photos while preserving the existing noindex policy for this GitHub address. The official domain and DNS remain unchanged.
- Product structured data uses a real product photo only for larvae; unverified soil-context photos are no longer presented as verified product imagery there.

## Photos and layout

Visually inspected all ten optimized company photos and the refreshed desktop/phone screenshots for every public page. The official SVG remains byte-for-byte equal to the original. No company photo or approved package-image pixels were changed. Landscape photographs preserve their proportions; the homepage hero retains its deliberate larvae-focused crop. Package viewports show the correct individual package without neighboring packages, with matching prices below.

Verified at 320, 390, 768 and 1440px: all public pages load, photos decode, single H1, no horizontal overflow, no axe WCAG A/AA violations, no legacy price/product labels, no prices outside offer captions or pack options, correct social-preview URLs/images, and no floating shortcut overlay. Keyboard skip navigation and mobile-menu navigation were checked. All 16 internal navigation/quote links returned 200. Direct email and WhatsApp contacts were inspected without sending messages.

The full static browser audit passed with no runtime errors. Static production export, zero-warning lint, formatting, TypeScript and seven unit tests passed. No new Lighthouse score or legal/composition/certification claim is made.
