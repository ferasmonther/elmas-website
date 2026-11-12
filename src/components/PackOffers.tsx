import { assetUrl } from '@/lib/assets';
import Link from 'next/link';
import { deliveryNote, packLabel, packPrice, quoteHref, type Product } from '@/content/site';
import { whatsappUrl } from '@/lib/config';

export function PackOffers({
  product,
  compact = false,
  showPackaging = true,
}: {
  product: Product;
  compact?: boolean;
  showPackaging?: boolean;
}) {
  if (!product.packs.length) return <p className="note">Inquiry-only · Ask about vermicompost.</p>;
  return (
    <div className={`pack-offers${compact ? ' pack-offers--compact' : ''}`}>
      <div className="pack-options">
        {product.packs.map((pack) => {
          const label = packLabel(product, pack);
          const wa = whatsappUrl(label);
          const [x, y, width, height] = pack.mockupViewBox.split(' ');
          const clipId = `pack-art-${pack.id}`;
          return (
            <div className="pack-option" key={pack.id}>
              {showPackaging && (
                <figure className="package-mockup">
                  <svg
                    viewBox={pack.mockupViewBox}
                    role="img"
                    aria-label={`Packaging illustration: ${pack.format ? pack.format + ' ' : ''}${product.name}, ${pack.weightKg} kg`}
                  >
                    <defs>
                      <clipPath id={clipId}>
                        <rect x={x} y={y} width={width} height={height} />
                      </clipPath>
                    </defs>
                    <image
                      clipPath={`url(#${clipId})`}
                      href={assetUrl('/assets/packaging/approved-packaging-concepts.png')}
                      width="1752"
                      height="897"
                    />
                  </svg>
                </figure>
              )}
              <strong>{packPrice(pack)}</strong>
              <div className="actions">
                {wa && (
                  <a
                    className="text-link"
                    href={wa}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Ask on WhatsApp about ${product.name}, ${packPrice(pack)}`}
                  >
                    Ask on WhatsApp →
                  </a>
                )}
                {!compact && (
                  <Link className="quote-link" href={quoteHref(product, pack)}>
                    Inquire about this pack →
                  </Link>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {!compact && <p className="note">{deliveryNote}</p>}
    </div>
  );
}
