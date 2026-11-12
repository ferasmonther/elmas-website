import Link from 'next/link';
import { deliveryNote, packLabel, quoteHref, type Product } from '@/content/site';
import { whatsappUrl } from '@/lib/config';

export function PackOffers({ product, compact = false }: { product: Product; compact?: boolean }) {
  if (!product.packs.length) return <p className="note">Inquiry-only · Ask about vermicompost.</p>;
  return (
    <div className={`pack-offers${compact ? ' pack-offers--compact' : ''}`}>
      {product.packs.map((pack) => {
        const label = packLabel(product, pack);
        const wa = whatsappUrl(label);
        return (
          <div className="pack-option" key={pack.id}>
            <strong>{label}</strong>
            <div className="actions">
              {wa && (
                <a
                  className="text-link"
                  href={wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Inquire on WhatsApp: ${label}`}
                >
                  Inquire on WhatsApp →
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
      {!compact && <p className="note">{deliveryNote}</p>}
    </div>
  );
}
