import sharp from 'sharp';

const transparent = { r: 0, g: 0, b: 0, alpha: 0 };

async function icon(size, file) {
  await sharp('src/assets/logo/mb_hexagon.png')
    .resize(size, size, { fit: 'contain', background: transparent })
    .png()
    .toFile(`public/${file}`);
}

await icon(32, 'favicon-32.png');
await icon(180, 'apple-touch-icon.png');
await icon(512, 'icon-512.png');

const wordmark = await sharp('src/assets/logo/mbw_wordmark.png')
  .resize({ width: 900 })
  .png()
  .toBuffer();

await sharp({ create: { width: 1200, height: 630, channels: 4, background: '#0b1020' } })
  .composite([{ input: wordmark, gravity: 'center' }])
  .png()
  .toFile('public/og-image.png');

console.log('icons + og-image written to public/');
