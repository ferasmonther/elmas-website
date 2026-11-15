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
  if (!product.packs.length)
    return (
      <div>
        {showPackaging && product.packagingViewBox && (
          <PackagingMockup
            viewBox={product.packagingViewBox}
            id={product.slug}
            label={product.name}
          />
        )}
        <p className="note">Inquiry-only · Ask about {product.name}.</p>
      </div>
    );
  return (
    <div className={`pack-offers${compact ? ' pack-offers--compact' : ''}`}>
      <div className="pack-options">
        {product.packs.map((pack) => {
          const label = packLabel(product, pack);
          const wa = whatsappUrl(label);
          return (
            <div className="pack-option" key={pack.id}>
              {showPackaging && (
                <PackagingMockup
                  viewBox={pack.mockupViewBox}
                  id={pack.id}
                  label={`${pack.format ? pack.format + ' ' : ''}${product.name}, ${pack.weightKg} kg`}
                />
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

function PackagingMockup({ viewBox, id, label }: { viewBox: string; id: string; label: string }) {
  const [x, y, width, height] = viewBox.split(' ');
  const clipId = `pack-art-${id}`;
  return (
    <figure className="package-mockup">
      <svg viewBox={viewBox} role="img" aria-label={`Packaging illustration: ${label}`}>
        <defs>
          <clipPath id={clipId}>
            <rect x={x} y={y} width={width} height={height} />
          </clipPath>
        </defs>
        <image
          clipPath={`url(#${clipId})`}
          href={assetUrl('/assets/packaging/branded-packaging-concepts.png')}
          width="1920"
          height="819"
        />
      </svg>
    </figure>
  );
}
