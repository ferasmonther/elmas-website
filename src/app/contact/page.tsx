import Link from 'next/link';
import { Intro } from '@/components/Shared';
import { InquiryForm } from '@/components/InquiryForm';
import { emailReady, whatsappUrl } from '@/lib/config';
import { seo } from '@/lib/seo';
export const dynamic = 'force-dynamic';
export const metadata = seo(
  'Contact',
  'Contact Elma’s in Lebanon about live BSFL larvae for chickens and fish, BioGold Frass or TerraRich Vermicompost. Send your inquiry through the form or WhatsApp.',
  '/contact',
);
export default function Contact() {
  const wa = whatsappUrl();
  return (
    <>
      <Intro tag="CONTACT" title="Good things start with a conversation.">
        Questions about our products, availability or an agricultural application? Tell us what you
        have in mind.
      </Intro>
      <section className="wrap form-layout section">
        <aside>
          <div className="eyebrow">FIND US</div>
          <h2>Rooted in Lebanon.</h2>
          <p>
            For a product inquiry, select your product and pack on the quote page, then contact us
            through the form or WhatsApp.
          </p>
          <Link className="text-link" href="/request-quote">
            Request a Quote →
          </Link>
          <hr />

          {wa && (
            <p>
              <a className="text-link" href={wa} target="_blank" rel="noopener noreferrer">
                Chat on WhatsApp →
              </a>
            </p>
          )}
          {!wa && <p>Direct contact details will be added here when confirmed.</p>}
        </aside>
        <InquiryForm kind="contact" ready={emailReady()} whatsappHref={wa} />
      </section>
    </>
  );
}
