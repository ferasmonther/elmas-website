import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const internalLinks = new Set();
const origin = process.env.PAGES_TEST_URL || 'http://127.0.0.1:3100/elmas-website';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const context = await browser.newContext();
const page = await context.newPage();
const errors = [];
page.on('pageerror', (error) => errors.push(error.message));
const paths = [
  '/',
  '/products/',
  '/products/bsfl-protein/',
  '/products/bsfl-frass/',
  '/products/vermicompost/',
  '/about/',
  '/sustainability/',
  '/contact/',
  '/request-quote/',
  '/privacy/',
];
for (const width of [320, 390, 768, 1440]) {
  await page.setViewportSize({ width, height: 900 });
  for (const path of paths) {
    const response = await page.goto(origin + path);
    expect(response.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.whatsapp')).toHaveCSS('position', 'static');
    await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
      'content',
      'https://ferasmonther.github.io/elmas-website' + path,
    );
    await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
      'content',
      /https:\/\/ferasmonther\.github\.io\/elmas-website\/assets\/photos\//,
    );

    await page.locator('img').evaluateAll(async (imgs) => {
      for (const img of imgs) {
        img.loading = 'eager';
        await img.decode();
      }
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    await expect(page.locator('main')).not.toContainText(
      /US\$|BSFL Protein|Elma[’']s Bio|packaging mockup/i,
    );
    const strayPrices = await page.locator('main').evaluate((main) => {
      const walker = document.createTreeWalker(main, NodeFilter.SHOW_TEXT);
      const stray = [];
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        if (
          /\$\s*\d/.test(node.textContent) &&
          !node.parentElement?.closest('.pack-option strong, #pack option')
        )
          stray.push(node.textContent.trim());
      }
      return stray;
    });
    expect(strayPrices).toEqual([]);
    for (const href of await page
      .locator('a[href]')
      .evaluateAll((links) => links.map((a) => a.href))) {
      if (href.startsWith(origin)) internalLinks.add(href.split('#')[0]);
      if (href.startsWith('https://wa.me/')) expect(new URL(href).pathname).toBe('/96170988141');
      if (href.startsWith('mailto:'))
        expect(href.split('?')[0]).toBe('mailto:ferasmonther@elmasbio.com');
    }
    if (width === 390 || width === 1440) {
      const names = {
        '/': 'home',
        '/products/': 'products',
        '/products/bsfl-protein/': 'larvae',
        '/products/bsfl-frass/': 'frass',
        '/products/vermicompost/': 'vermicompost',
        '/about/': 'about',
        '/sustainability/': 'sustainability',
        '/contact/': 'contact',
        '/request-quote/': 'quote',
        '/privacy/': 'privacy',
      };
      await page.screenshot({
        path: `docs/screenshots/${names[path]}-${width === 390 ? 'mobile' : 'desktop'}.png`,
        fullPage: true,
      });
    }

    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
  }
  await page.goto(origin + '/');
  await expect(page.locator('main')).not.toContainText(/US\$|\$\d/);
  await page.goto(origin + '/products/bsfl-frass/');
  await expect(page.locator('.product-detail .pack-option strong')).toHaveText([
    '5kg — $5',
    '10kg — $9',
  ]);
  await expect(page.locator('main')).not.toContainText(/packaging mockup/i);
  if (width <= 760) {
    await page.goto(origin + '/');
    await page.keyboard.press('Tab');
    await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
    await page.getByRole('button', { name: 'Menu' }).click();
    await page
      .getByRole('navigation', { name: 'Main navigation' })
      .getByRole('link', { name: 'Contact', exact: true })
      .click();
    await expect(page).toHaveURL(origin + '/contact/');
  }
  console.log(`Static Pages: all ten pages passed at ${width}px`);
}
await page.goto(origin + '/products/bsfl-frass/');
await page
  .locator('.product-detail .pack-option')
  .first()
  .getByRole('link', { name: 'Inquire about this pack' })
  .click();
await expect(page.locator('#product')).toHaveValue('bsfl-frass');
await expect(page.locator('#pack')).toHaveValue('frass-5kg');
const wa = page.locator('.direct-contact a').filter({ hasText: 'WhatsApp' });
expect(new URL(await wa.getAttribute('href')).searchParams.get('text')).toContain(
  'BSFL Frass, 5kg — $5 USD',
);
await expect(page.getByRole('button', { name: 'Send quote request' })).toBeDisabled();
await page.goto(origin + '/request-quote/?product=bsfl-protein&pack=live-10kg');
await expect(page.locator('#product')).toHaveValue('bsfl-protein');
await expect(page.locator('#pack')).toHaveValue('live-10kg');
expect(new URL(await wa.getAttribute('href')).searchParams.get('text')).toContain(
  'Live BSFL Larvae, 10kg — $10 USD',
);
for (const href of internalLinks) expect((await page.request.get(href)).status()).toBe(200);
console.log(
  `Verified ${internalLinks.size} internal navigation/quote links and all contact destinations.`,
);
expect(errors).toEqual([]);
console.log(
  'Static quote navigation, preserved pack details, disabled delivery and browser console passed.',
);
await page.screenshot({ path: 'work/github-pages-quote.png', fullPage: true });
await browser.close();
