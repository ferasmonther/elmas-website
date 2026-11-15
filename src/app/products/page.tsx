import { Intro, ProductCards, CTA } from '@/components/Shared';
import { Media } from '@/components/Media';
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
      <section className="wrap catalog-photo" aria-label="BSFL production at Elma’s">
        <Media image="larvae" priority fit="contain" sizes="(max-width: 1440px) 100vw, 1320px" />
      </section>
      <section className="wrap catalog" aria-labelledby="catalog-packages-heading">
        <div className="eyebrow">OUR PRODUCTS</div>
        <h2 id="catalog-packages-heading">Product packages.</h2>
        <ProductCards showPhotos={false} />
      </section>
      <CTA />
    </>
  );
}
