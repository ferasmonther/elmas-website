import Link from 'next/link';
import { notFound } from 'next/navigation';
import { products } from '@/content/site';
import { Media } from '@/components/Media';
import { CTA } from '@/components/Shared';
import { StructuredData } from '@/components/StructuredData';
import { siteUrl, whatsappUrl } from '@/lib/config';
import { seo } from '@/lib/seo';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return product
    ? seo(`${product.name} in Lebanon`, product.seoDescription, `/products/${slug}`)
    : {};
}

export default async function Product({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const wa = whatsappUrl(p.name);
  const origin = siteUrl();
  const specifications = p.specifications.filter(
    (spec) => spec.value !== null && spec.value.trim() !== '',
  );

  return (
    <>
      {origin && (
        <StructuredData
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              { '@type': 'ListItem', position: 1, name: 'Home', item: origin },
              { '@type': 'ListItem', position: 2, name: 'Products', item: `${origin}/products` },
              {
                '@type': 'ListItem',
                position: 3,
                name: p.name,
                item: `${origin}/products/${slug}`,
              },
            ],
          }}
        />
      )}
      <section className="wrap product-detail section">
        <div>
          <nav className="breadcrumbs" aria-label="Breadcrumb">
            <Link href="/">Home</Link>
            <span aria-hidden>/</span>
            <Link href="/products">Products</Link>
            <span aria-hidden>/</span>
            <span aria-current="page">{p.name}</span>
          </nav>
          <div className="eyebrow">{p.category}</div>
          <h1>{p.name}</h1>
          <p className="lead">{p.summary}</p>
          <p>{p.description}</p>
          <div className="actions">
            <Link className="button" href={`/request-quote?product=${p.slug}`}>
              Request a Quote →
            </Link>
            {wa && (
              <a className="text-link" href={wa} target="_blank" rel="noopener noreferrer">
                Ask on WhatsApp →
              </a>
            )}
          </div>
        </div>
        <Media image={p.image} priority caption fit="contain" />
      </section>
      <section className="section tinted">
        <div className="wrap detail-grid">
          <div>
            <div className="eyebrow">POTENTIAL APPLICATIONS</div>
            <h2>
              {p.slug === 'bsfl-protein'
                ? 'For your next formulation.'
                : 'For your soil management plan.'}
            </h2>
            <ul className="checks">
              {p.applications.map((a) => (
                <li key={a}>{a}</li>
              ))}
            </ul>
          </div>
          <div className="spec-box">
            <h3>Who it’s for</h3>
            <ul>
              {p.buyers.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <hr />
            <h3>Technical specifications</h3>
            {specifications.length > 0 && (
              <dl className="specifications">
                {specifications.map((spec) => (
                  <div key={spec.label}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <p>
              Technical specifications available on request. Ask about current formats, packaging,
              availability and guidance for your intended use.
            </p>
            <p className="note">{p.note}</p>
          </div>
        </div>
      </section>
      <section className="wrap section product-questions">
        <div>
          <div className="eyebrow">BEFORE YOU REQUEST A QUOTE</div>
          <h2>
            Help us understand
            <br />
            your application.
          </h2>
          <ul className="checks">
            {p.inquiryDetails.map((detail) => (
              <li key={detail}>{detail}</li>
            ))}
          </ul>
          <Link className="text-link" href={`/request-quote?product=${p.slug}`}>
            Discuss {p.name} <span aria-hidden>→</span>
          </Link>
        </div>
        <div className="faq">
          <h2>Common questions</h2>
          {p.faq.map((item) => (
            <details key={item.question}>
              <summary>{item.question}</summary>
              <p>{item.answer}</p>
            </details>
          ))}
        </div>
      </section>
      <CTA />
    </>
  );
}
