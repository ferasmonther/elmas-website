import { Intro, ProductCards, CTA } from '@/components/Shared';
import { seo } from '@/lib/seo';
export const metadata = seo(
  'Our products',
  'Our main product is BSFL larvae for chicken and fish feed applications in Lebanon. Also explore BioGold Frass and TerraRich Vermicompost for soil management.',
  '/products',
);
export default function Products() {
  return (
    <>
      <Intro tag="OUR PRODUCTS" title="BSFL larvae first. Circular value throughout.">
        BSFL larvae for poultry and aquaculture are our core product. BioGold Frass and TerraRich
        Vermicompost complement our feed offering with distinct soil inputs.
      </Intro>
      <section className="wrap catalog">
        <ProductCards focusPrimary />
      </section>
      <CTA />
    </>
  );
}
