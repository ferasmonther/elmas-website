import { Intro, ProductCards, CTA } from '@/components/Shared';
import { seo } from '@/lib/seo';
export const metadata = seo(
  'Our products',
  'Explore BSFL protein for feed formulation, BSFL frass for soil management and vermicompost for horticulture. Request availability and specifications.',
  '/products',
);
export default function Products() {
  return (
    <>
      <Intro tag="OUR PRODUCTS" title="Useful inputs. Thoughtfully produced.">
        Explore three distinct ways to bring organic resources back into agriculture. Tell us your
        application and we’ll help you explore a suitable product.
      </Intro>
      <section className="wrap catalog">
        <ProductCards />
        <p className="note">
          Availability, formats and technical specifications are available on request. We provide
          quotations based on your requirements.
        </p>
      </section>
      <CTA />
    </>
  );
}
