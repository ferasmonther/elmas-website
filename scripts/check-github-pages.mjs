import { chromium, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
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
    await page.locator('img').evaluateAll(async (imgs) => {
      for (const img of imgs) {
        img.loading = 'eager';
        await img.decode();
      }
    });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBe(
      true,
    );
    expect(
      (await new AxeBuilder({ page }).withTags(['wcag2a', 'wcag2aa', 'wcag21aa']).analyze())
        .violations,
    ).toEqual([]);
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
  'BSFL Frass — 5 kg — US$5',
);
await expect(page.getByRole('button', { name: 'Send quote request' })).toBeDisabled();
await page.goto(origin + '/request-quote/?product=bsfl-protein&pack=live-10kg');
await expect(page.locator('#product')).toHaveValue('bsfl-protein');
await expect(page.locator('#pack')).toHaveValue('live-10kg');
expect(new URL(await wa.getAttribute('href')).searchParams.get('text')).toContain(
  'Live BSFL Larvae — 10 kg — US$10',
);
expect(errors).toEqual([]);
console.log(
  'Static quote navigation, preserved pack details, disabled delivery and browser console passed.',
);
await page.screenshot({ path: 'work/github-pages-quote.png', fullPage: true });
await browser.close();
