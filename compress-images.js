// compress-images.js
// Compresses large VSOE images using sharp
// Target: quality 80, max width 1920px, progressive JPEG, < 1MB each

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const IMAGE_DIR = path.join(__dirname, 'public', 'images', 'vsoe');

const TARGETS = [
  'vsoe-bar-car.jpg',
  'vsoe-dining-car.jpg',
  'vsoe-grand-suite.jpg',
  'vsoe-historic-cabin.jpg',
  'vsoe-paris-departure.jpg',
];

async function compress(filename) {
  const inputPath = path.join(IMAGE_DIR, filename);
  const tmpPath = inputPath + '.tmp';

  const before = fs.statSync(inputPath).size;

  await sharp(inputPath)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 80, progressive: true, mozjpeg: true })
    .toFile(tmpPath);

  const after = fs.statSync(tmpPath).size;

  // Replace original
  fs.renameSync(tmpPath, inputPath);

  const saved = ((before - after) / before * 100).toFixed(1);
  console.log(
    `✓ ${filename}: ${(before / 1024 / 1024).toFixed(2)} MB → ${(after / 1024 / 1024).toFixed(2)} MB  (saved ${saved}%)`
  );

  return { filename, before, after };
}

(async () => {
  console.log('Compressing images...\n');
  const results = [];

  for (const file of TARGETS) {
    try {
      results.push(await compress(file));
    } catch (err) {
      console.error(`✗ ${file}: ${err.message}`);
    }
  }

  const totalBefore = results.reduce((s, r) => s + r.before, 0);
  const totalAfter  = results.reduce((s, r) => s + r.after,  0);

  console.log(`\nDone. Total: ${(totalBefore/1024/1024).toFixed(1)} MB → ${(totalAfter/1024/1024).toFixed(1)} MB`);

  const overLimit = results.filter(r => r.after > 1024 * 1024);
  if (overLimit.length) {
    console.warn('\n⚠ Still over 1 MB:', overLimit.map(r => r.filename).join(', '));
    process.exit(1);
  } else {
    console.log('✔ All images are under 1 MB.');
  }
})();
