import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  buildInquiryEmail,
  deliveryMapLink,
  inquirySchema,
  isSameOriginRequest,
  RateLimiter,
} from '../src/lib/inquiries';
import { whatsappUrl, siteUrl, inquiryEmail } from '../src/lib/config';
const valid = {
  kind: 'quote',
  name: 'Test Farmer',
  company: 'Test Farm',
  email: 'farmer@example.com',
  phone: '+961000000',
  product: 'bsfl-frass',
  quantity: '250',
  unit: 'kg',
  location: 'Lebanon',
  message: 'Please discuss suitability for my crops.',
  consent: true,
};
test('valid quote preserves product and customer requirements', () => {
  const r = inquirySchema.parse(valid);
  assert.equal(r.product, 'bsfl-frass');
  assert.equal(r.quantity, '250');
});
test('rejects missing consent, malformed email, unknown product and invalid quantity', () => {
  for (const change of [
    { consent: false },
    { email: 'bad' },
    { product: 'invented' },
    { quantity: '-1' },
    { quantity: 'Infinity' },
    { location: '' },
  ])
    assert.equal(inquirySchema.safeParse({ ...valid, ...change }).success, false);
});
test('contact does not require quote-only fields', () =>
  assert.equal(
    inquirySchema.safeParse({
      kind: 'contact',
      name: 'Test Person',
      email: 'person@example.com',
      message: 'Please share more information.',
      consent: true,
    }).success,
    true,
  ));
test('bounds message size and rejects missing required message', () => {
  assert.equal(inquirySchema.safeParse({ ...valid, message: 'x'.repeat(4001) }).success, false);
  assert.equal(inquirySchema.safeParse({ ...valid, message: '' }).success, false);
});
test('rate limiter blocks excess attempts and expires', () => {
  const limiter = new RateLimiter(2, 100);
  assert.equal(limiter.take('a', 0), true);
  assert.equal(limiter.take('a', 1), true);
  assert.equal(limiter.take('a', 2), false);
  assert.equal(limiter.take('b', 2), true);
  assert.equal(limiter.take('a', 100), true);
});
test('contact and canonical URLs require valid configuration', () => {
  const original = { ...process.env };
  try {
    process.env.WHATSAPP_NUMBER = '';
    delete process.env.SITE_URL;
    assert.equal(whatsappUrl(), undefined);
    assert.equal(siteUrl(), undefined);
    process.env.WHATSAPP_NUMBER = '96112345678';
    assert.match(whatsappUrl('BioGold Frass')!, /BioGold%20Frass/);
    process.env.SITE_URL = 'javascript:bad';
    assert.equal(siteUrl(), undefined);
    process.env.SITE_URL = 'https://example.com/test';
    assert.equal(siteUrl(), 'https://example.com');
  } finally {
    for (const k of ['WHATSAPP_NUMBER', 'SITE_URL']) {
      if (original[k] === undefined) delete process.env[k];
      else process.env[k] = original[k];
    }
  }
});

test('confirmed offers and pack validation stay consistent', () => {
  assert.equal(
    inquirySchema.parse({ ...valid, product: 'vermicompost', pack: 'vermicompost-10kg' }).pack,
    'vermicompost-10kg',
  );
  assert.equal(inquirySchema.parse({ ...valid, pack: 'frass-5kg' }).pack, 'frass-5kg');
  for (const pack of ['live-10kg', 'invented']) {
    assert.equal(inquirySchema.safeParse({ ...valid, pack }).success, false);
  }
  assert.equal(
    inquirySchema.safeParse({ ...valid, product: 'vermicompost', pack: 'frass-5kg' }).success,
    false,
  );
});

test('default inquiry destination uses the confirmed mailbox', () => {
  const original = { CONTACT_EMAIL: process.env.CONTACT_EMAIL, MAIL_TO: process.env.MAIL_TO };
  try {
    delete process.env.CONTACT_EMAIL;
    delete process.env.MAIL_TO;
    assert.equal(inquiryEmail(), 'ferasmonther@elmasbio.com');
    process.env.MAIL_TO = 'invalid';
    assert.equal(inquiryEmail(), undefined);
  } finally {
    for (const key of ['CONTACT_EMAIL', 'MAIL_TO'] as const) {
      if (original[key] === undefined) delete process.env[key];
      else process.env[key] = original[key];
    }
  }
});

test('inquiries accept the actual page origin on custom domains, preview aliases and localhost', () => {
  for (const origin of [
    'https://www.elmasbio.com',
    'https://elmasbio.com',
    'https://elmas-website-rf6l-git-elmas-website-review-elmas4.vercel.app',
    'http://localhost:3000',
  ]) {
    assert.equal(isSameOriginRequest(origin, `${origin}/api/inquiries`), true);
  }
});

test('inquiries reject cross-site origins, lookalike hosts and missing or malformed origins', () => {
  const target = 'https://www.elmasbio.com/api/inquiries';
  for (const origin of [
    null,
    'null',
    '',
    'https://other.example',
    'https://www.elmasbio.com.attacker.example',
    'http://www.elmasbio.com',
    'https://www.elmasbio.com:444',
    'https://www.elmasbio.com/contact',
  ]) {
    assert.equal(isSameOriginRequest(origin, target), false);
  }
  assert.equal(
    isSameOriginRequest('https://www.elmasbio.com', 'https://preview.vercel.app/api/inquiries'),
    false,
  );
  assert.equal(isSameOriginRequest('https://www.elmasbio.com', 'invalid'), false);
});

test('contact emails include only filled contact fields, without quote fields or internal data', () => {
  const email = buildInquiryEmail(
    inquirySchema.parse({
      kind: 'contact',
      name: 'Test Farmer',
      email: 'farmer@example.com',
      message: 'Please contact me about your company.',
      consent: true,
      product: 'bsfl-frass',
      quantity: '10',
      unit: 'kg',
    }),
  );
  assert.equal(email.subject, 'Elma’s contact inquiry');
  assert.equal(
    email.text,
    'Full name: Test Farmer\n\nEmail: farmer@example.com\n\nMessage: Please contact me about your company.',
  );
  assert.doesNotMatch(
    email.text,
    /Product:|Pack:|Quantity:|Delivery location:|Company|Phone:|kind:|consent:|website:/,
  );
});

test('quote emails use readable product names and preserve selected packs and quantities', () => {
  const email = buildInquiryEmail(inquirySchema.parse({ ...valid, pack: 'frass-5kg' }));
  assert.equal(email.subject, 'Elma’s quotation request — BioGold Frass');
  assert.match(email.text, /Product: BioGold Frass/);
  assert.match(email.text, /Pack: BioGold Frass, 5kg — \$5 USD/);
  assert.match(email.text, /Quantity: 250 kg/);
  assert.match(email.text, /Delivery location: Lebanon/);
  assert.doesNotMatch(email.text, /bsfl-frass|kind:|website:|consent:/);
});

test('quote delivery addresses open Google Maps directions and shared pins are preserved', () => {
  const url = new URL(deliveryMapLink('Farm Road, Zahle, Lebanon'));
  assert.equal(url.origin, 'https://www.google.com');
  assert.equal(url.pathname, '/maps/dir/');
  assert.equal(url.searchParams.get('destination'), 'Farm Road, Zahle, Lebanon');
  const pin = 'https://maps.app.goo.gl/examplePin';
  const email = buildInquiryEmail(inquirySchema.parse({ ...valid, location: pin }));
  assert.ok(email.text.includes(`Google Maps: ${pin}`));
  assert.equal(deliveryMapLink(pin), pin);
  assert.equal(deliveryMapLink(''), '');
  assert.equal(
    new URL(deliveryMapLink('https://unrelated.example')).origin,
    'https://www.google.com',
  );
});
