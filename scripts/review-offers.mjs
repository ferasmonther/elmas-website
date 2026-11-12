import { chromium } from '@playwright/test';
const browser = await chromium.launch({
  executablePath: process.env.CHROMIUM_PATH || '/usr/bin/chromium',
  args: ['--no-sandbox'],
});
const page = await browser.newPage();
for (const [width, label] of [
  [1440, 'desktop'],
  [390, 'mobile'],
]) {
  await page.setViewportSize({ width, height: 900 });
  for (const [name, path] of Object.entries({
    home: '/',
    products: '/products',
    larvae: '/products/bsfl-protein',
    frass: '/products/bsfl-frass',
    vermicompost: '/products/vermicompost',
    about: '/about',
    sustainability: '/sustainability',
    contact: '/contact',
    quote: '/request-quote?product=bsfl-frass&pack=frass-10kg',
    privacy: '/privacy',
  })) {
    await page.goto((process.env.REVIEW_URL || 'http://localhost:3000') + path);
    await page.locator('img').evaluateAll(async (imgs) => {
      for (const img of imgs) {
        img.loading = 'eager';
        await img.decode();
      }
    });
    await page.screenshot({ path: `docs/screenshots/${name}-${label}.png`, fullPage: true });
    if (name === 'home')
      console.log(
        label,
        'homepage height',
        await page.evaluate(() => document.documentElement.scrollHeight),
      );
  }
}
await browser.close();
