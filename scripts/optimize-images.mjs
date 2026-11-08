// Next.js includes sharp. Retain input originals separately; never overwrite them.
import sharp from 'sharp';
import { mkdir, access } from 'node:fs/promises';
const [input, name] = process.argv.slice(2);
if (!input || !['larvae', 'application', 'field', 'material', 'breeding'].includes(name)) {
  console.error(
    'Usage: node scripts/optimize-images.mjs INPUT_FILE larvae|application|field|material|breeding',
  );
  process.exit(1);
}
await mkdir('public/assets/photos', { recursive: true });
const dest = `public/assets/photos/${name}.webp`;
try {
  await access(dest);
  throw new Error(`Refusing to overwrite ${dest}; remove it intentionally first.`);
} catch (e) {
  if (e.code !== 'ENOENT') throw e;
}
await sharp(input)
  .rotate()
  .resize({ width: 1920, withoutEnlargement: true })
  .webp({ quality: 85 })
  .toFile(dest);
console.log(`Created ${dest}. Review crop and caption before publication.`);
