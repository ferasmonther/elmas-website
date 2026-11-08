import Image from 'next/image';
import { existsSync } from 'node:fs';
import { join } from 'node:path';
import { images, type ImageKey } from '@/content/site';

type MediaProps = {
  image: ImageKey;
  className?: string;
  priority?: boolean;
  caption?: boolean;
  fit?: 'cover' | 'contain';
  sizes?: string;
};

export function Media({
  image,
  className = '',
  priority = false,
  caption = false,
  fit = 'contain',
  sizes = '(max-width: 760px) calc(100vw - 40px), (max-width: 1440px) 50vw, 648px',
}: MediaProps) {
  const item = images[image];
  const present = existsSync(join(process.cwd(), 'public/assets/photos', item.file));

  return (
    <figure className={`media ${className}`}>
      <div className="media-frame">
        {present ? (
          <Image
            src={`/assets/photos/${item.file}`}
            alt={item.alt}
            fill
            sizes={sizes}
            loading={priority ? 'eager' : 'lazy'}
            fetchPriority={priority ? 'high' : undefined}
            style={{ objectFit: fit, objectPosition: item.position }}
          />
        ) : (
          <div className="awaiting">
            <span>ELMA’S · LEBANON</span>
            <p>Company photography</p>
            <small>Image file awaiting import</small>
          </div>
        )}
      </div>
      {caption && present && <figcaption>{item.caption}</figcaption>}
    </figure>
  );
}
