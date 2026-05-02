const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const dir = './public/images/vsoe/';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.png'));

console.log(`Found ${files.length} PNG files in ${dir}`);

files.forEach(file => {
  const input = path.join(dir, file);
  const output = path.join(dir, file.replace('.png', '.jpg'));
  sharp(input).jpeg({ quality: 85 }).toFile(output, (err) => {
    if (err) console.error(err);
    else console.log(`Converted: ${file} → ${file.replace('.png', '.jpg')}`);
  });
});
