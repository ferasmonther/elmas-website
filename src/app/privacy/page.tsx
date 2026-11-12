import { Intro } from '@/components/Shared';
import { seo } from '@/lib/seo';
import { publicEmail } from '@/lib/config';
export const metadata = seo(
  'Privacy policy',
  'How inquiry information is used on the Elma’s website.',
  '/privacy',
);
export default function Privacy() {
  return (
    <>
      <Intro tag="PRIVACY" title="Your inquiry. Your information.">
        This policy describes the intended handling of contact and quotation requests on the Elma’s
        website.
      </Intro>
      <article className="wrap prose">
        <p className="notice">
          Draft for business review before publication. Elma’s must confirm its privacy contact,
          service providers and retention period before enabling forms.
        </p>
        <h2>Information you provide</h2>
        <p>
          Forms collect your name, email, company or farm, phone number, message and consent. Quote
          requests also collect the product, selected pack when provided, quantity, unit and
          delivery location. Please avoid including sensitive personal information.
        </p>
        <h2>Why we use it</h2>
        <p>
          Elma’s uses this information to assess and respond to your inquiry and prepare a quotation
          where requested. Submitting an inquiry does not subscribe you to marketing.
        </p>
        <h2>Delivery and access</h2>
        <p>
          When configured, form inquiries are delivered through Elma’s email service to its business
          mailbox. The website does not maintain an inquiry database. Hosting and email providers
          may process technical information and messages to provide their services. Direct email
          links open your own email application; you choose whether to send the message.
        </p>
        <h2>Security and retention</h2>
        <p>
          Submission endpoints validate and limit requests. Temporary rate-limit identifiers are
          hashed and expire after 15 minutes within the running server. Business mailbox retention,
          access controls and a deletion schedule must be confirmed by Elma’s before launch. Do not
          send confidential material through these forms.
        </p>
        <h2>External services and cookies</h2>
        <p>
          WhatsApp links open a third-party service whose own terms and privacy policy apply. No
          analytics, advertising or tracking cookies are added by this application. The hosting
          provider may process request logs.
        </p>
        <h2>Your questions and choices</h2>
        <p>
          For questions about access, correction or deletion of inquiry information, contact Elma’s{' '}
          {publicEmail() ? (
            <a href={`mailto:${publicEmail()}`}>at {publicEmail()}</a>
          ) : (
            'using the contact page'
          )}
          . Business review of the final privacy arrangements remains required before launch.
        </p>
      </article>
    </>
  );
}
