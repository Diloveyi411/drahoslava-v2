import sharp from 'sharp';
import { existsSync, mkdirSync } from 'fs';

async function optimizeHeroImage() {
  const inputPath = 'attached_assets/Dadi-art-32_1761189756239.webp';
  const outputDir = 'client/public/optimized';

  // Create output directory if it doesn't exist
  if (!existsSync(outputDir)) {
    mkdirSync(outputDir, { recursive: true });
  }

  const sizes = [
    { width: 800, name: 'hero-mobile.webp', quality: 80 },
    { width: 1200, name: 'hero-tablet.webp', quality: 82 },
    { width: 1920, name: 'hero-desktop.webp', quality: 85 }
  ];

  console.log('🖼️  Optimizing hero image...\n');

  for (const size of sizes) {
    const outputPath = `${outputDir}/${size.name}`;
    
    const result = await sharp(inputPath)
      .resize(size.width, null, {
        fit: 'cover',
        withoutEnlargement: true
      })
      .webp({ quality: size.quality })
      .toFile(outputPath);

    const fileSizeKB = Math.round(result.size / 1024);
    console.log(`✅ ${size.name}`);
    console.log(`   Size: ${fileSizeKB}KB`);
    console.log(`   Dimensions: ${result.width}x${result.height}\n`);
  }

  console.log('✨ Hero image optimization complete!');
}

optimizeHeroImage().catch(console.error);
