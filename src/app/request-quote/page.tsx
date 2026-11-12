import { Intro } from '@/components/Shared';
import { InquiryForm } from '@/components/InquiryForm';
import { deliveryNote, packLabel, products } from '@/content/site';
import { emailReady, whatsappUrl, publicEmail } from '@/lib/config';
import { seo } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export const metadata = seo(
  'Request a Quote',
  'Request a tailored quotation for live BSFL larvae for chickens and fish, priced BSFL frass packs or inquiry-only vermicompost. Tell Elma’s about your requirements.',
  '/request-quote',
);
export default async function Quote({
  searchParams,
}: {
  searchParams: Promise<{ product?: string; pack?: string }>;
}) {
  const query = await searchParams;
  const p = products.find((p) => p.slug === query.product);
  const pack = p?.packs.find((pack) => pack.id === query.pack);
  const selection = p && pack ? packLabel(p, pack) : p?.name;
  const wa = whatsappUrl(selection);
  const email = publicEmail();
  return (
    <>
      <Intro tag="REQUEST A QUOTE" title="What do your animals or crops need?">
        Share your requirements. We’ll discuss availability, specifications and a quotation for your
        application.
      </Intro>
      <section className="wrap form-layout section">
        <aside>
          <h2>
            A little detail.
            <br />A better conversation.
          </h2>
          <p>
            Include your intended use, approximate quantity and delivery location so we can
            understand your needs.
          </p>
          <p className="note">
            This is an inquiry, not an order. Availability and product suitability will be discussed
            with you.
          </p>
          <p className="note">{deliveryNote}</p>
        </aside>
        <InquiryForm
          kind="quote"
          product={p?.slug}
          pack={pack?.id}
          ready={emailReady()}
          emailHref={
            email
              ? `mailto:${email}?subject=${encodeURIComponent(`Quote request: ${selection || 'Elma’s products'}`)}`
              : undefined
          }
          whatsappHref={wa}
        />
      </section>
    </>
  );
}
