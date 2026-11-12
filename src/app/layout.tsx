import { assetUrl } from '@/lib/assets';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { StructuredData } from '@/components/StructuredData';
import { siteUrl, whatsappUrl, publicEmail } from '@/lib/config';
import './globals.css';
export const metadata: Metadata = {
  title: { default: 'Elma’s | Turning Waste Into Value', template: '%s | Elma’s' },
  description:
    'Black Soldier Fly larvae for chicken and fish feed applications, produced in Lebanon. Discover Elma’s core larvae offering and complementary soil inputs.',
  ...(siteUrl() || process.env.DEPLOYMENT_URL
    ? { metadataBase: new URL(siteUrl() || process.env.DEPLOYMENT_URL!) }
    : {}),
  robots: siteUrl() ? { index: true, follow: true } : { index: false, follow: false },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const wa = whatsappUrl(),
    email = publicEmail();
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <Header />
        {siteUrl() && (
          <StructuredData
            data={{
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Elma’s',
              slogan: 'Turning Waste Into Value',
              url: siteUrl(),
              logo: siteUrl() + '/assets/logo/elmas-logo.svg',
              ...(email ? { email } : {}),
              address: { '@type': 'PostalAddress', addressCountry: 'LB' },
            }}
          />
        )}
        <main id="main">{children}</main>
        <footer>
          <div className="wrap footer-grid">
            <div>
              <Image
                src={assetUrl('/assets/logo/elmas-logo.svg')}
                alt="Elma’s"
                width={168}
                height={46}
              />
              <p>Turning Waste Into Value</p>
              <small>
                BSFL larvae. Poultry & aquaculture.
                <br />
                Rooted in Lebanon.
              </small>
            </div>
            <div>
              <h2>Explore</h2>
              <Link href="/products">Our products</Link>
              <Link href="/about">About Elma’s</Link>
              <Link href="/sustainability">Our approach</Link>
            </div>
            <div>
              <h2>Let’s connect</h2>
              <Link href="/request-quote">Request a Quote →</Link>
              <Link href="/contact">Contact us</Link>
              {email && (
                <a href={`mailto:${email}`} aria-label={`Email Elma’s at ${email}`}>
                  Email us →
                </a>
              )}
              <span>Lebanon</span>
            </div>
          </div>
          <div className="wrap footer-bottom">
            <span>© {new Date().getFullYear()} Elma’s</span>
            <Link href="/privacy">Privacy policy</Link>
            <span>Made for a more circular agriculture.</span>
          </div>
        </footer>
        {wa ? (
          <a className="whatsapp" href={wa} target="_blank" rel="noopener noreferrer">
            WhatsApp <span aria-hidden>→</span>
          </a>
        ) : (
          <Link className="whatsapp" href="/contact">
            Contact Elma’s <span aria-hidden>→</span>
          </Link>
        )}
      </body>
    </html>
  );
}
