import Link from 'next/link';
import { Media } from '@/components/Media';
import { ProductCards } from '@/components/Shared';
import { seo } from '@/lib/seo';

export const metadata = seo(
  'BSFL Protein & Organic Fertilizers in Lebanon',
  'Sustainable insect protein and organic fertilizers made in Lebanon. Discover BSFL protein, frass and vermicompost from Elma’s.',
  '/',
);

export default function Home() {
  return (
    <div className="homepage">
      <section className="hero">
        <Media image="application" priority className="hero-media" sizes="100vw" fit="cover" />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="eyebrow">ROOTED IN LEBANON. MADE FOR AGRICULTURE.</div>
          <h1>
            Turning Waste
            <br />
            Into <em>Value.</em>
          </h1>
          <p>
            BSFL protein, frass and vermicompost, made in Lebanon.
            <br />
            Practical inputs for feed formulation and soil management.
          </p>
          <div className="actions">
            <Link className="button light" href="/products">
              Explore Products <span aria-hidden>→</span>
            </Link>
            <Link className="button outline" href="/request-quote">
              Request a Quote
            </Link>
          </div>
        </div>
      </section>

      <section className="home-products wrap">
        <div className="section-heading">
          <div>
            <div className="eyebrow">OUR PRODUCTS</div>
            <h2>Three products. One purpose.</h2>
          </div>
          <Link className="text-link" href="/products">
            View all products <span aria-hidden>→</span>
          </Link>
        </div>
        <ProductCards compact />
      </section>

      <section className="home-about">
        <div className="wrap home-about-inner">
          <div>
            <div className="eyebrow">MEET ELMA’S</div>
            <h2>Rooted in Lebanon.</h2>
            <p>
              We turn suitable organic resources into insect protein and organic soil inputs, with a
              hands-on focus on agriculture.
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
