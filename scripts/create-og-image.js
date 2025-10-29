import sharp from 'sharp';
import { readFileSync } from 'fs';

async function createOGImage() {
  const targetWidth = 1200;
  const targetHeight = 675;

  // Load and prepare background
  const background = await sharp('attached_assets/cfbb6cd9f6a1cfce3c81c411a4c761d0_1761725910852.jpg')
    .resize(targetWidth, targetHeight, { fit: 'cover', position: 'center' })
    .toBuffer();

  // Load logo and resize it
  const logo = await sharp('attached_assets/LOGO_1761725967909.png')
    .resize(200, 200, { fit: 'contain' })
    .toBuffer();

  // Create SVG text overlay
  const textSvg = `
    <svg width="${targetWidth}" height="${targetHeight}">
      <defs>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600&amp;display=swap');
          .name { 
            font-family: 'Cormorant Garamond', serif; 
            font-size: 48px; 
            font-weight: 400;
            fill: #2B303B;
            letter-spacing: 1px;
          }
          .tagline { 
            font-family: 'Cormorant Garamond', serif; 
            font-size: 36px; 
            font-weight: 300;
            fill: #2B303B;
            letter-spacing: 0.5px;
          }
        </style>
      </defs>
      
      <!-- Name -->
      <text x="${targetWidth / 2}" y="${targetHeight - 120}" text-anchor="middle" class="name">
        Drahoslava Forgacova
      </text>
      
      <!-- Tagline -->
      <text x="${targetWidth / 2}" y="${targetHeight - 60}" text-anchor="middle" class="tagline">
        Art. Psychology. Awareness
      </text>
    </svg>
  `;

  // Composite all layers
  const finalImage = await sharp(background)
    .composite([
      {
        input: logo,
        top: Math.floor((targetHeight - 400) / 2),
        left: Math.floor((targetWidth - 200) / 2)
      },
      {
        input: Buffer.from(textSvg),
        top: 0,
        left: 0
      }
    ])
    .png()
    .toFile('client/public/og-image.png');

  console.log('✅ OG image created successfully!');
  console.log(`   Size: ${Math.round(finalImage.size / 1024)}KB`);
  console.log(`   Dimensions: ${finalImage.width}x${finalImage.height}`);
}

createOGImage().catch(console.error);
