import { assetUrl } from '@/lib/assets';
import type { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import Script from 'next/script';
import { Header } from '@/components/Header';
import { StructuredData } from '@/components/StructuredData';
import { isIndexableDeployment, siteUrl, whatsappUrl } from '@/lib/config';
import './globals.css';

const gtmId = 'GTM-5JR9WG7B';
export const metadata: Metadata = {
  title: { default: 'Elma’s | Turning Waste Into Value', template: '%s | Elma’s' },
  description:
    'Elma’s is a Lebanon-based agritech company turning organic resources into value through circular agriculture.',
  ...(siteUrl() || process.env.DEPLOYMENT_URL
    ? { metadataBase: new URL(siteUrl() || process.env.DEPLOYMENT_URL!) }
    : {}),
  robots: isIndexableDeployment() ? { index: true, follow: true } : { index: false, follow: false },
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  const wa = whatsappUrl();
  return (
    <html lang="en">
      <body>
        <Script id="google-tag-manager" strategy="beforeInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
          new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
          j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
          'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
          })(window,document,'script','dataLayer','${gtmId}');`}
        </Script>
        <noscript>
          <iframe
            src={`https://www.googletagmanager.com/ns.html?id=${gtmId}`}
            title="Google Tag Manager"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
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
                Organic resources. Circular agriculture.
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
