import { test, expect } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
const paths = [
  '/',
  '/products',
  '/products/bsfl-protein',
  '/products/bsfl-frass',
  '/products/vermicompost',
  '/about',
  '/sustainability',
  '/contact',
  '/request-quote',
  '/privacy',
];
for (const width of [320, 390, 768, 1440]) {
  test(`pages, navigation, overflow and accessibility at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    for (const path of paths) {
      const res = await page.goto(path);
      expect(res?.status()).toBe(200);
      await expect(page.locator('h1')).toHaveCount(1);
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
      await expect(page.locator('body')).not.toContainText(
        /ferasmonther@elmasbio\.com|info@elmasbio\.com/,
      );
      await expect(page.getByText('Image file awaiting import')).toHaveCount(0);
      await page.locator('img').evaluateAll(async (images) => {
        await Promise.all(
          images.map(async (img) => {
            if (!(img instanceof HTMLImageElement)) throw new Error('Expected image element');
            img.loading = 'eager';
            await img.decode();
          }),
        );
      });
      if (path === '/')
        await page.screenshot({ path: `test-results/home-${width}.png`, fullPage: true });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
      ).toBe(true);
      const result = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21aa'])
        .analyze();
      expect(result.violations).toEqual([]);
    }
    await page.goto('/');
    if (width <= 760) {
      await page.getByRole('button', { name: 'Menu' }).click();
      await expect(page.getByRole('navigation')).toBeVisible();
    }
    await page.getByRole('navigation').getByRole('link', { name: 'Our products' }).click();
    await expect(page).toHaveURL('/products');
  });
}
test('product-specific quote and honest disabled delivery state', async ({ page }) => {
  await page.goto('/products/bsfl-frass');
  await page.getByRole('main').getByRole('link', { name: 'Request a Quote' }).first().click();
  await expect(page.locator('#product')).toHaveValue('bsfl-frass');
  await expect(page.getByRole('button', { name: 'Send quote request' })).toBeDisabled();
  await expect(
    page.getByText('Online form submission is not available yet.', { exact: false }),
  ).toBeVisible();
});
test('server validates, protects origins and never fakes email delivery', async ({
  request,
  baseURL,
}) => {
  const headers = { origin: new URL(baseURL!).origin };
  const valid = {
    kind: 'contact',
    name: 'Test Person',
    email: 'person@example.com',
    message: 'Please share information.',
    consent: true,
  };
  const invalid = await request.post('/api/inquiries', {
    headers,
    data: { ...valid, consent: false },
  });
  expect(invalid.status()).toBe(400);
  const cross = await request.post('/api/inquiries', {
    headers: { origin: 'https://other.example' },
    data: valid,
  });
  expect(cross.status()).toBe(403);
  const unavailable = await request.post('/api/inquiries', { headers, data: valid });
  expect(unavailable.status()).toBe(503);
  expect((await unavailable.json()).message).toContain('has not been sent');
  const bot = await request.post('/api/inquiries', { headers, data: { ...valid, website: 'bot' } });
  expect(bot.status()).toBe(400);
  const huge = await request.post('/api/inquiries', {
    headers,
    data: { ...valid, message: 'x'.repeat(21000) },
  });
  expect(huge.status()).toBe(413);
});
test('unknown product returns 404 and confirmed domain appears in SEO', async ({
  page,
  request,
}) => {
  expect((await page.goto('/products/unknown'))?.status()).toBe(404);
  const robots = await request.get('/robots.txt');
  expect(await robots.text()).toContain('Sitemap: https://www.elmasbio.com/sitemap.xml');
  await page.goto('/products/bsfl-frass');
  await expect(page.locator('link[rel=canonical]')).toHaveAttribute(
    'href',
    'https://www.elmasbio.com/products/bsfl-frass',
  );
  const sitemap = await request.get('/sitemap.xml');
  expect(await sitemap.text()).toContain('https://www.elmasbio.com/products/bsfl-frass');
});

test('confirmed business contacts and product-specific WhatsApp links', async ({ page }) => {
  await page.goto('/contact');
  await expect(page.getByLabel('Name', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Email', { exact: true })).toBeVisible();
  await expect(page.getByLabel('Message', { exact: true })).toBeVisible();
  await expect(page.locator('#company, #phone, #product, #quantity, #unit, #location')).toHaveCount(
    0,
  );
  await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
  await expect(page.locator('body')).not.toContainText('ferasmonther@elmasbio.com');
  const general = page.getByRole('main').getByRole('link', { name: 'Chat on WhatsApp' });
  expect(new URL((await general.getAttribute('href'))!).pathname).toBe('/96170988141');
  await page.goto('/products/bsfl-frass');
  const specific = page
    .getByRole('main')
    .getByRole('link', { name: 'Ask on WhatsApp →', exact: true });
  const url = new URL((await specific.getAttribute('href'))!);
  expect(url.hostname).toBe('wa.me');
  expect(url.pathname).toBe('/96170988141');
  expect(url.searchParams.get('text')).toContain('BioGold Frass');
  await expect(page.getByRole('link', { name: 'WhatsApp', exact: false }).last()).toHaveAttribute(
    'target',
    '_blank',
  );
});

test('homepage introduces the company and keeps product details on product pages', async ({
  page,
}) => {
  await page.goto('/');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('Turning waste');
  await expect(page.getByRole('heading', { level: 1 })).toContainText('into value.');
  await expect(page.locator('main')).toContainText('Lebanon-based agritech company');
  await expect(page.locator('main')).toContainText('OUR MISSION & APPROACH');
  await expect(page.locator('main')).not.toContainText(/BSFL|larvae|frass|US\$|\$\d/i);
  await expect(page.locator('.product-card, .pack-option')).toHaveCount(0);
  await expect(page.locator('.hero img')).toHaveAttribute('alt', /sculptural green ribbon/);
  await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
    'content',
    /renewal.webp/,
  );
  await page.locator('.hero').getByRole('link', { name: 'Meet Elma’s' }).click();
  await expect(page).toHaveURL('/about');
  await page.goto('/');
  await page.locator('.hero').getByRole('link', { name: 'Explore our products' }).click();
  await expect(page).toHaveURL('/products');
});

test('confirmed packs prepare accurate inquiries and preserve selection', async ({ page }) => {
  for (const [slug, image, packs] of [
    ['bsfl-protein', 'larvae.webp', [['live-10kg', 10, 10, 'Live BSFL Larvae']]],
    ['vermicompost', 'vermicompost.webp', [['vermicompost-10kg', 10, 9, 'TerraRich Vermicompost']]],
    [
      'bsfl-frass',
      'application.webp',
      [
        ['frass-5kg', 5, 5, 'BioGold Frass'],
        ['frass-10kg', 10, 9, 'BioGold Frass'],
      ],
    ],
  ] as const) {
    await page.goto(`/products/${slug}`);
    const data = await page.locator('script[type="application/ld+json"]').allTextContents();
    const product = data
      .map((text) => JSON.parse(text))
      .find((item) => item['@type'] === 'Product');
    expect(product.image).toBe(`https://www.elmasbio.com/assets/photos/${image}`);
    const offers = page.locator('.pack-offers .pack-option');
    await expect(offers).toHaveCount(packs.length);
    for (let i = 0; i < packs.length; i++) {
      const [id, weight, price, name] = packs[i];
      const label = `${name}, ${weight}kg — $${price} USD`;
      await expect(offers.nth(i).locator('strong')).toHaveText(`${weight}kg — $${price}`);
      const url = new URL(
        (await offers
          .nth(i)
          .getByRole('link', { name: 'Ask on WhatsApp about', exact: false })
          .getAttribute('href'))!,
      );
      expect(url.hostname).toBe('wa.me');
      expect(url.pathname).toBe('/96170988141');
      expect(url.searchParams.get('text')).toContain(label);
      expect(product.offers[i].price).toBe(price);
      expect(product.offers[i].priceCurrency).toBe('USD');
      await offers.nth(i).getByRole('link', { name: 'Inquire about this pack' }).click();
      await expect(page.locator('#product')).toHaveValue(slug);
      await expect(page.locator('#pack')).toHaveValue(id);
      const direct = page.locator('.direct-contact a').filter({ hasText: 'WhatsApp' });
      expect(new URL((await direct.getAttribute('href'))!).searchParams.get('text')).toContain(
        label,
      );
      await expect(page.locator('a[href^="mailto:"]')).toHaveCount(0);
      await page
        .locator('#product')
        .selectOption(slug === 'vermicompost' ? 'bsfl-frass' : 'vermicompost');
      await expect(page.locator('#pack')).toHaveValue('');
      expect(new URL((await direct.getAttribute('href'))!).searchParams.get('text')).toContain(
        slug === 'vermicompost' ? 'BioGold Frass' : 'TerraRich Vermicompost',
      );
      expect(new URL((await direct.getAttribute('href'))!).searchParams.get('text')).not.toContain(
        'US$',
      );
      await page.goto(`/products/${slug}`);
    }
  }
  await page.goto('/products/vermicompost');
  await expect(page.locator('.product-detail')).not.toContainText('Inquiry-only');
  await expect(page.locator('.product-detail')).not.toContainText('US$');
  await page.goto('/request-quote?product=bsfl-frass&pack=live-10kg');
  await expect(page.locator('#pack')).toHaveValue('');
});

test('keyboard navigation exposes focus and mobile menu', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/');
  await expect(page.locator('.whatsapp')).toHaveCSS('position', 'static');
  await page.keyboard.press('Tab');
  await expect(page.getByRole('link', { name: 'Skip to content' })).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL('/#main');
  await page.getByRole('button', { name: 'Menu' }).focus();
  await page.keyboard.press('Enter');
  await expect(page.getByRole('navigation')).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(
    page.getByRole('navigation').getByRole('link', { name: 'Our products' }),
  ).toBeFocused();
});

test('BSFL production photo leads the page before package offers', async ({ page }) => {
  await page.goto('/products/bsfl-protein');
  await expect(page.locator('.product-detail img')).toHaveAttribute('src', /larvae/);
  await expect(page.locator('.product-detail .package-mockup')).toHaveCount(0);
  await expect(page.locator('.product-packaging .package-mockup')).toHaveCount(1);
  const photo = await page.locator('.product-detail .media').boundingBox();
  const packages = await page.locator('.product-packaging').boundingBox();
  expect(packages!.y).toBeGreaterThanOrEqual(photo!.y + photo!.height);
});

test('approved package mockups have their correct price beneath them', async ({
  page,
  request,
}) => {
  expect((await request.get('/assets/packaging/branded-packaging-concepts.png')).status()).toBe(
    200,
  );
  await page.goto('/products');
  await expect(page.locator('.package-mockup')).toHaveCount(4);
  for (const [slug, labels] of [
    ['bsfl-protein', ['10kg — $10']],
    ['bsfl-frass', ['5kg — $5', '10kg — $9']],
    ['vermicompost', ['10kg — $9']],
  ] as const) {
    await page.goto(`/products/${slug}`);
    const options = page.locator('.pack-offers .pack-option');
    for (let i = 0; i < labels.length; i++) {
      const option = options.nth(i);
      await expect(option.locator('strong')).toHaveText(labels[i]);
      await expect(option.locator('svg[role="img"]')).toBeVisible();
      await expect(option.locator('figcaption')).toHaveCount(0);
      const art = await option.locator('figure').boundingBox();
      const price = await option.locator('strong').boundingBox();
      expect(price!.y).toBeGreaterThanOrEqual(art!.y + art!.height);
    }
  }
  await page.goto('/products/vermicompost');
  await expect(
    page.getByRole('img', {
      name: 'Packaging illustration: TerraRich Vermicompost, 10 kg',
      exact: true,
    }),
  ).toBeVisible();
  await expect(page.locator('.pack-offers .pack-option')).toHaveCount(1);
  await expect(page.locator('.product-detail')).not.toContainText('Inquiry-only');
  await page.goto('/');
  await expect(page.locator('.hero img')).toHaveAttribute('alt', /sculptural green ribbon/);
  await expect(page.locator('.package-mockup')).toHaveCount(0);
  await expect(page.locator('main')).not.toContainText(/US\$|\$\d/);
  await expect(page.locator('main')).not.toContainText(/packaging mockup/i);
});

test('production indexing, canonical sitemap and headers agree on every public page', async ({
  page,
  request,
}) => {
  const origin = 'https://www.elmasbio.com';
  const expected = paths.map((path) => origin + path);
  for (const path of paths) {
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    expect(response?.headers()['x-robots-tag'] || '').not.toMatch(/noindex|nofollow|none/i);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute('content', 'index, follow');
    await expect
      .poll(async () => {
        const href = await page.locator('link[rel="canonical"]').getAttribute('href');
        return href ? new URL(href).href : '';
      })
      .toBe(new URL(origin + path).href);
  }
  const robots = await request.get('/robots.txt');
  const rules = await robots.text();
  expect(rules).toContain('Allow: /');
  expect(rules).not.toMatch(/^Disallow: \/\s*$/m);
  expect(rules).toContain(`Sitemap: ${origin}/sitemap.xml`);
  const sitemap = await request.get('/sitemap.xml');
  const urls = [...(await sitemap.text()).matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
  expect(urls.sort()).toEqual(expected.sort());
  expect(new Set(urls).size).toBe(urls.length);
  expect((await page.goto('/products/not-a-product'))?.status()).toBe(404);
  expect(
    await page
      .locator('meta[name="robots"]')
      .evaluateAll((tags) => tags.map((tag) => tag.getAttribute('content')).join(',')),
  ).toContain('noindex');
});

test('main Products page leads with BSFL photo then product packages', async ({ page }) => {
  await page.goto('/products');
  await expect(page.locator('.catalog-photo img')).toHaveAttribute('alt', /handling larvae/);
  await expect(page.locator('.catalog .product-card img')).toHaveCount(0);
  await expect(page.locator('.catalog .package-mockup')).toHaveCount(4);
  const photo = await page.locator('.catalog-photo').boundingBox();
  const packages = await page.locator('.catalog').boundingBox();
  expect(packages!.y).toBeGreaterThanOrEqual(photo!.y + photo!.height);
});

test('quote delivery location fills automatically after browser permission', async ({
  page,
  context,
}) => {
  await context.grantPermissions(['geolocation']);
  await context.setGeolocation({ latitude: 33.8547, longitude: 35.8623 });
  await page.goto('/request-quote');
  await expect(page.locator('#location')).toHaveValue('');
  await page.getByRole('button', { name: 'Use my current location' }).click();
  await expect(page.locator('#location')).toHaveValue('33.854700, 35.862300');
  await page.locator('#location').fill('A different delivery address');
  await expect(page.locator('#location')).toHaveValue('A different delivery address');
});

test('denied location access preserves the entered delivery address', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(navigator, 'geolocation', {
      value: {
        getCurrentPosition: (_success: unknown, failure: (error: { code: number }) => void) =>
          failure({ code: 1 }),
      },
    });
  });
  await page.goto('/request-quote');
  await page.locator('#location').fill('Existing delivery address');
  await page.getByRole('button', { name: 'Use my current location' }).click();
  await expect(
    page.getByText('Location permission was not granted.', { exact: false }),
  ).toBeVisible();
  await expect(page.locator('#location')).toHaveValue('Existing delivery address');
  await expect(page.getByRole('button', { name: 'Use my current location' })).toBeEnabled();
});
