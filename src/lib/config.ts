import { contact } from '../content/contact';

export const productionSiteUrl = 'https://www.elmasbio.com';

// Next.js preview builds also use NODE_ENV=production. Require an explicit
// deployment target, with Vercel's target taking precedence over local settings.
export function isIndexableDeployment() {
  const target = process.env.VERCEL_ENV || process.env.SITE_ENV;
  return process.env.NODE_ENV === 'production' && target === 'production';
}

export function siteUrl() {
  if (isIndexableDeployment()) return productionSiteUrl;
  const value = process.env.SITE_URL;
  if (!value) return undefined;
  try {
    const u = new URL(value);
    return u.protocol === 'https:' ? u.origin : undefined;
  } catch {
    return undefined;
  }
}
export function whatsappUrl(product?: string) {
  const n = (process.env.WHATSAPP_NUMBER ?? contact.whatsappNumber)
    .replace(/[ +()-]/g, '')
    .replace(/^00/, '');
  if (!n || !/^[1-9]\d{7,14}$/.test(n)) return undefined;
  return `https://wa.me/${n}?text=${encodeURIComponent(`Hello Elma’s, I would like to inquire about ${product || 'your products'}.`)}`;
}
export function emailReady() {
  return ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASSWORD', 'MAIL_FROM', 'MAIL_TO'].every((k) =>
    Boolean(process.env[k]),
  );
}
export function publicEmail() {
  const email = process.env.CONTACT_EMAIL ?? contact.email;
  return email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? email : undefined;
}
