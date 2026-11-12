import Link from 'next/link';
import { Media } from '@/components/Media';
import { ProductCards } from '@/components/Shared';
import { seo } from '@/lib/seo';

export const metadata = seo(
  'BSFL Larvae for Chicken & Fish Feed in Lebanon',
  'Live BSFL larvae for chicken and fish feed applications in Lebanon, with BSFL frass and vermicompost as complementary soil inputs.',
  '/',
);

export default function Home() {
  return (
    <div className="homepage">
      <section className="hero">
        <Media image="larvae" priority className="hero-media" sizes="100vw" fit="cover" />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="eyebrow">TURNING WASTE INTO VALUE · LEBANON</div>
          <h1>
            BSFL larvae
            <br />
            for <em>chickens &amp; fish.</em>
          </h1>
          <p>
            Live Black Soldier Fly larvae, produced in Lebanon for poultry and aquaculture feed
            applications.
          </p>
          <div className="actions">
            <Link className="button light" href="/products/bsfl-protein">
              Explore BSFL Larvae <span aria-hidden>→</span>
            </Link>
            <Link
              className="button outline"
              href="/request-quote?product=bsfl-protein&pack=live-10kg"
            >
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="home-products wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OUR PRODUCTS</div>
            <h2>Larvae at the heart of what we do.</h2>
          </div>
          <Link className="text-link" href="/products">
            View all products <span aria-hidden>→</span>
          </Link>
        </div>
        <ProductCards compact focusPrimary />
      </section>

      <section className="home-about">
        <div className="wrap home-about-inner">
          <div>
            <div className="eyebrow">MEET ELMA’S</div>
            <h2>Rooted in Lebanon.</h2>
            <p>
              Our focus is BSFL larvae for chicken and fish feed. Frass and vermicompost are
              complementary soil inputs within our circular approach.
            </p>
            <div className="home-about-links">
              <Link className="text-link" href="/about">
                About Elma’s <span aria-hidden>→</span>
              </Link>
              <Link className="text-link" href="/sustainability">
                Our circular approach <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <Link href="/request-quote" className="button">
            Request a Quote <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
