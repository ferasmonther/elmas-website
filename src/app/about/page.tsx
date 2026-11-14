import { Intro, CTA } from '@/components/Shared';
import { Media } from '@/components/Media';
import { seo } from '@/lib/seo';
export const metadata = seo(
  'About Elma’s',
  'Meet Elma’s, a Lebanon-based agritech company producing BSFL larvae for chickens and fish alongside complementary soil inputs with a focus on circular agriculture.',
  '/about',
);
export default function About() {
  return (
    <>
      <Intro tag="ABOUT ELMA’S" title="Rooted here. Looking ahead.">
        We’re a Lebanon-based agritech company focused on Black Soldier Fly larvae for chicken and
        fish feed applications, alongside complementary organic soil inputs.
      </Intro>
      <section className="wrap about-split section">
        <Media image="facility" priority caption />
        <div>
          <div className="eyebrow">OUR MISSION</div>
          <h2>
            A useful future
            <br />
            for organic resources.
          </h2>
          <p>
            Our mission is to produce Black Soldier Fly larvae for chicken and fish feeding
            applications while supporting organic resource recovery.
          </p>
          <p>
            Alongside our core BSFL larvae product, we offer distinct soil input product lines:
            BioGold Frass and TerraRich Vermicompost. Each has its own production process and
            potential applications.
          </p>
        </div>
      </section>
      <section className="section why">
        <div className="wrap detail-grid">
          <div>
            <div className="eyebrow">OUR VISION</div>
            <h2>Growing with purpose.</h2>
            <p>
              We aspire to become a leading Black Soldier Fly farming business in Lebanon. Our aim
              is to scale responsibly, recover more organic material and support farmers with
              locally produced agricultural inputs.
            </p>
          </div>
          <div>
            <h3>Practical value, close to home.</h3>
            <p>
              We bring together biological conversion and hands-on agricultural work. Our focus is
              on developing useful products and understanding what customers need, from feed
              formulation to soil care.
            </p>
            <p>
              Through careful production and continued learning, we aim to contribute to food
              security, circular agriculture and a more resourceful local economy.
            </p>
          </div>
        </div>
      </section>
      <section className="wrap section">
        <Media image="field" className="wide-image" caption />
      </section>
      <CTA />
    </>
  );
}
