import { Intro } from '@/components/Shared';
import { Suspense } from 'react';
import { QuoteInquiry } from '@/components/QuoteInquiry';
import { deliveryNote } from '@/content/site';
import { emailReady, whatsappUrl, publicEmail } from '@/lib/config';
import { seo } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export const metadata = seo(
  'Request a Quote',
  'Request a tailored quotation for live BSFL larvae for chickens and fish, priced BSFL frass packs or inquiry-only vermicompost. Tell Elma’s about your requirements.',
  '/request-quote',
);
export default function Quote() {
  const email = publicEmail();
  return (
    <>
      <Intro tag="REQUEST A QUOTE" title="What do your animals or crops need?">
        Choose a product and pack, then send your inquiry by WhatsApp or email. We’ll discuss
        suitability, availability and delivery with you.
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
        <Suspense fallback={<p>Loading product selection…</p>}>
          <QuoteInquiry ready={emailReady()} email={email} whatsappHref={whatsappUrl()} />
        </Suspense>
      </section>
    </>
  );
}
