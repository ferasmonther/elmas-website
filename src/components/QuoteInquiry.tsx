'use client';
import { useSearchParams } from 'next/navigation';
import { products } from '@/content/site';
import { InquiryForm } from './InquiryForm';

export function QuoteInquiry({
  ready,
  email,
  whatsappHref,
}: {
  ready: boolean;
  email?: string;
  whatsappHref?: string;
}) {
  const query = useSearchParams();
  const product = products.find((p) => p.slug === query.get('product'));
  const pack = product?.packs.find((p) => p.id === query.get('pack'));
  return (
    <InquiryForm
      key={`${product?.slug}/${pack?.id}`}
      kind="quote"
      product={product?.slug}
      pack={pack?.id}
      ready={ready}
      emailHref={email ? `mailto:${email}` : undefined}
      whatsappHref={whatsappHref}
    />
  );
}
