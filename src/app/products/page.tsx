import { Intro, ProductCards, CTA } from '@/components/Shared';
import { seo } from '@/lib/seo';
export const metadata = seo(
  'Our products',
  'Our main product is BSFL larvae for chicken and fish feed applications in Lebanon. Also explore BSFL frass and vermicompost for soil management.',
  '/products',
);
export default function Products() {
  return (
    <>
      <Intro tag="OUR PRODUCTS" title="BSFL larvae first. Circular value throughout.">
        BSFL larvae for poultry and aquaculture are our core product. BSFL frass and vermicompost
        complement our feed offering with distinct soil inputs.
      </Intro>
      <section className="wrap catalog">
        <ProductCards focusPrimary />
        <p className="note">
          Availability, formats and technical specifications are available on request. We provide
          quotations based on your requirements.
        </p>
      </section>
      <CTA />
    </>
  );
}
