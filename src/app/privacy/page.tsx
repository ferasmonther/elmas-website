import { Intro } from '@/components/Shared';
import { seo } from '@/lib/seo';
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
        <h2>Information you provide</h2>
        <p>
          Contact forms collect your name, email address and message. Quote requests also collect
          your company, phone number, product selection, quantity and delivery location. If you
          choose “Use my current location” and grant browser permission, your coordinates fill the
          delivery location field and are sent with your quote request when you submit it. You can
          enter an address instead. Your location is not tracked in the background.
        </p>
        <h2>Why we use it</h2>
        <p>
          When you send an inquiry, Elma’s uses the information you provide to respond and prepare a
          quotation where requested. Sending an inquiry does not subscribe you to marketing.
        </p>
        <h2>Delivery and access</h2>
        <p>
          Submitted inquiries are emailed to Elma’s. This website does not maintain an inquiry
          database. WhatsApp links open a third-party service when you choose to use them. Hosting
          and communication providers process technical information and messages to provide these
          services.
        </p>
        <h2>Security and retention</h2>
        <p>
          Elma’s still needs to confirm its mailbox retention and deletion arrangements. Avoid
          including confidential material in your inquiry. Contact us with questions about your
          submitted information.
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
          using the contact page. Business review of the final privacy arrangements remains
          outstanding.
        </p>
      </article>
    </>
  );
}
