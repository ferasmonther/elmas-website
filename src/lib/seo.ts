import type { Metadata } from 'next';
import { siteUrl } from './config';
import { images, type ImageKey } from '@/content/site';

export function seo(
  title: string,
  description: string,
  path: string,
  image: ImageKey = 'larvae',
): Metadata {
  const origin = siteUrl();
  const socialImage = origin
    ? [
        {
          url: `${origin}/assets/photos/${images[image].file}`,
          width: 1920,
          height: 1080,
          alt: images[image].alt,
        },
      ]
    : undefined;

  return {
    title,
    description,
    alternates: origin ? { canonical: origin + path } : undefined,
    openGraph: {
      title: `${title} | Elma’s`,
      description,
      type: 'website',
      siteName: 'Elma’s',
      locale: 'en_US',
      ...(origin ? { url: origin + path, images: socialImage } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | Elma’s`,
      description,
      ...(origin ? { images: socialImage } : {}),
    },
  };
}
