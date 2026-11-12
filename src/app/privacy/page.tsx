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
          Business review is pending. Online submission remains disabled while Elma’s confirms its
          privacy contact, service providers and retention arrangements.
        </p>
        <h2>Information you provide</h2>
        <p>
          Online forms are currently disabled. Information entered in these fields is not sent to
          Elma’s by this website. Product and pack selections are used to prepare direct email and
          WhatsApp inquiry links. You choose whether to send the message through those services.
          Please avoid including sensitive personal information.
        </p>
        <h2>Why we use it</h2>
        <p>
          When you send an inquiry, Elma’s uses the information you provide to respond and prepare a
          quotation where requested. Sending an inquiry does not subscribe you to marketing.
        </p>
        <h2>Delivery and access</h2>
        <p>
          Direct email links open your email application, and WhatsApp links open WhatsApp. Messages
          you send are handled by those services and Elma’s business contacts. This website does not
          maintain an inquiry database. Hosting and communication providers may process technical
          information and messages to provide their services.
        </p>
        <h2>Security and retention</h2>
        <p>
          The GitHub Pages version does not run an online submission service. Elma’s still needs to
          confirm business mailbox retention, access controls and deletion arrangements. Do not
          include confidential material in an inquiry. Privacy arrangements must be reviewed before
          any future online submission service is enabled.
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
          . Business review of the final privacy arrangements remains outstanding.
        </p>
      </article>
    </>
  );
}
