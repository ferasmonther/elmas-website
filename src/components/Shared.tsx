import Link from 'next/link';
import { deliveryNote, products } from '@/content/site';
import { Media } from './Media';
import { PackOffers } from './PackOffers';
export function ProductCards({
  compact = false,
  focusPrimary = false,
}: { compact?: boolean; focusPrimary?: boolean } = {}) {
  return (
    <>
      <div className={`product-grid${focusPrimary ? ' product-grid--primary' : ''}`}>
        {products.map((p, i) => (
          <article
            className={`product-card${p.primary ? ' product-card--primary' : ''}`}
            key={p.slug}
          >
            {(!compact || p.primary) && (
              <Link href={`/products/${p.slug}`} aria-label={`Explore ${p.name}`}>
                <Media
                  image={p.image}
                  fit="contain"
                  caption={!compact}
                  sizes={
                    compact
                      ? '(max-width: 760px) 124px, (max-width: 1440px) 30vw, 416px'
                      : '(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) 30vw, 416px'
                  }
                />
              </Link>
            )}
            <div className="card-copy">
              <div className="eyebrow">
                {p.primary ? 'OUR MAIN PRODUCT' : `0${i + 1} / ${p.category}`}
              </div>
              <h3>
                <Link href={`/products/${p.slug}`}>{p.name}</Link>
              </h3>
              <p>{p.summary}</p>
              {!compact && <PackOffers product={p} compact showPackaging={!compact} />}
              {compact && !focusPrimary && p.slug !== 'bsfl-protein' && (
                <small className="photo-context">Agricultural context photo</small>
              )}
              <div className="card-actions">
                <Link className="text-link" href={`/products/${p.slug}`}>
                  Explore product <span aria-hidden>→</span>
                </Link>
                {(!compact || (focusPrimary && p.primary)) && (
                  <Link className="quote-link" href={`/request-quote?product=${p.slug}`}>
                    Request a Quote
                  </Link>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
      {!compact && <p className="note offer-terms">{deliveryNote}</p>}
    </>
  );
}
export function Process() {
  return (
    <ol className="process">
      {[
        ['Organic resources', 'Suitable organic materials enter a purposeful cycle.'],
        ['Biological conversion', 'Larvae and earthworm processes create distinct resources.'],
        ['Valuable outputs', 'BSFL larvae, BioGold Frass and TerraRich Vermicompost.'],
        ['Farm applications', 'Feed formulation and considered soil management.'],
      ].map(([title, text], i) => (
        <li key={title}>
          <span className="step">0{i + 1}</span>
          <h3>{title}</h3>
          <p>{text}</p>
          <span className="flow-arrow" aria-hidden>
            →
          </span>
        </li>
      ))}
    </ol>
  );
}
export function CTA() {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <div className="eyebrow">LET’S TALK AGRICULTURE</div>
          <h2>
            Discuss the right product
            <br />
            for your next step.
          </h2>
          <p>
            Tell us about your chickens, fish, crops or soil. We’ll discuss suitability and your
            requirements.
          </p>
        </div>
        <Link href="/request-quote" className="button light">
          Request a Quote <span aria-hidden>→</span>
        </Link>
      </div>
    </section>
  );
}
export function Intro({
  tag,
  title,
  children,
}: {
  tag: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="intro wrap">
      <div className="eyebrow">{tag}</div>
      <h1>{title}</h1>
      <p className="lead">{children}</p>
    </section>
  );
}
