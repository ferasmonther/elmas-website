import Link from 'next/link';
import { Media } from '@/components/Media';
import { seo } from '@/lib/seo';

const title = 'Elma’s | Lebanese Agritech Company';
const homeMetadata = seo(
  title,
  'Elma’s is a Lebanese agritech company that recovers value from organic materials and supports local agriculture through a circular approach.',
  '/',
  'renewal',
);

export const metadata = {
  ...homeMetadata,
  title: { absolute: title },
  openGraph: { ...homeMetadata.openGraph, title },
  twitter: { ...homeMetadata.twitter, title },
};

export default function Home() {
  return (
    <div className="homepage">
      <section className="hero">
        <Media image="renewal" priority className="hero-media" sizes="100vw" fit="cover" />
        <div className="hero-shade" />
        <div className="wrap hero-content">
          <div className="eyebrow">ELMA’S · ROOTED IN LEBANON</div>
          <h1>
            Turning waste
            <br />
            into <em>value.</em>
          </h1>
          <p>
            Elma’s is a Lebanese agritech company working to keep organic resources in use and
            support local agriculture.
          </p>
          <div className="actions">
            <Link className="button light" href="/about">
              Meet Elma’s <span aria-hidden>→</span>
            </Link>
            <Link className="button outline" href="/products">
              Explore our products <span aria-hidden>→</span>
            </Link>
          </div>
        </div>
      </section>

      <section className="home-about">
        <div className="wrap home-about-inner">
          <div>
            <div className="eyebrow">OUR MISSION &amp; APPROACH</div>
            <h2>A useful future for organic resources.</h2>
            <p>
              Our mission is to recover value from organic materials and create useful agricultural
              inputs. We combine biological processes, careful production and hands-on learning to
              keep resources in use, close to home.
            </p>
            <div className="home-about-links">
              <Link className="text-link" href="/sustainability">
                Our circular approach <span aria-hidden>→</span>
              </Link>
            </div>
          </div>
          <Link href="/contact" className="button">
            Get in touch <span aria-hidden>→</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
