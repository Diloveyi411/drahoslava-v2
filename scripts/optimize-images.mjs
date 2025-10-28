import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const ASSETS_DIR = path.join(__dirname, '..', 'attached_assets');
const OUTPUT_DIR = path.join(__dirname, '..', 'attached_assets', 'optimized');

// List of images actually used in the application
const imagesToOptimize = [
  'Dadi-art-11_1761189784462.jpg',
  'Dadi-art-32_1761189756239.jpg',
  '13b_1761189596670.jpg',
  'Obraz 2_1761189596670.jpg',
  'Screenshot 2025-10-23 at 00.04.50_1761189596671.png',
  'Screenshot 2025-10-08 at 20.18.59_1761189596671.png',
  'Dadi-art-94_1761189715147.jpg',
  'Dadi-art-192_1761579069938.jpg',
  'Dadi-art-162_1761580803599.jpg',
  'Dadi-art-156 (1)_1761580882796.jpg',
  'Dadi-art-175_1761189720828.jpg',
  'Gemini_Generated_Image_8hd08w8hd08w8hd0_1761628501248.png',
];

// Create output directory if it doesn't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

console.log('🎨 Starting image optimization...\n');

let totalOriginalSize = 0;
let totalOptimizedSize = 0;

for (const imageName of imagesToOptimize) {
  const inputPath = path.join(ASSETS_DIR, imageName);
  const outputName = imageName.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  const outputPath = path.join(OUTPUT_DIR, outputName);

  if (!fs.existsSync(inputPath)) {
    console.log(`⚠️  Skipping ${imageName} - file not found`);
    continue;
  }

  try {
    const originalStats = fs.statSync(inputPath);
    totalOriginalSize += originalStats.size;

    await sharp(inputPath)
      .webp({ quality: 85, effort: 6 })
      .toFile(outputPath);

    const optimizedStats = fs.statSync(outputPath);
    totalOptimizedSize += optimizedStats.size;

    const savedBytes = originalStats.size - optimizedStats.size;
    const savedPercent = ((savedBytes / originalStats.size) * 100).toFixed(1);

    console.log(`✅ ${imageName}`);
    console.log(`   Original: ${(originalStats.size / 1024).toFixed(0)} KB`);
    console.log(`   Optimized: ${(optimizedStats.size / 1024).toFixed(0)} KB`);
    console.log(`   Saved: ${savedPercent}% (${(savedBytes / 1024).toFixed(0)} KB)\n`);
  } catch (error) {
    console.error(`❌ Error processing ${imageName}:`, error.message);
  }
}

const totalSaved = totalOriginalSize - totalOptimizedSize;
const totalSavedPercent = ((totalSaved / totalOriginalSize) * 100).toFixed(1);

console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log('📊 SUMMARY');
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
console.log(`Total Original Size: ${(totalOriginalSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total Optimized Size: ${(totalOptimizedSize / 1024 / 1024).toFixed(2)} MB`);
console.log(`Total Saved: ${(totalSaved / 1024 / 1024).toFixed(2)} MB (${totalSavedPercent}%)`);
console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');
console.log('✨ Optimization complete!');
