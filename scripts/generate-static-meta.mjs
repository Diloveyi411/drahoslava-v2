/**
 * Post-build script: generates per-route static HTML with injected server-side meta tags.
 * Each route gets its own index.html so crawlers see the correct title/description/og tags
 * without needing to execute JS.
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist/public');

const routes = [
  {
    slug: 'design',
    title: 'UX Design - Drahoslava',
    description: 'UX audits, conversion design, interaction design. Find what breaks and fix what matters.',
    url: 'https://drahoslava.com/design',
  },
  {
    slug: 'branding',
    title: 'Branding - Drahoslava',
    description: 'Brand identity, visual direction, and brand kits that make a business recognizable and consistent.',
    url: 'https://drahoslava.com/branding',
  },
  {
    slug: 'social',
    title: 'Social Media - Drahoslava',
    description: 'Content strategy, social media design, and video editing. Systems that make posting consistent and on-brand.',
    url: 'https://drahoslava.com/social',
  },
  {
    slug: 'art',
    title: 'Art - Drahoslava',
    description: 'Original artwork and creative practice. Paintings, illustrations, and visual explorations.',
    url: 'https://drahoslava.com/art',
  },
  {
    slug: 'psychology',
    title: 'Psychology - Drahoslava',
    description: 'Self-discovery, inner work, and the psychology behind design decisions.',
    url: 'https://drahoslava.com/psychology',
  },
];

const template = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

for (const route of routes) {
  let html = template
    .replace(/<title>[^<]*<\/title>/, `<title>${route.title}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/,  `$1${route.description}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/,  `$1${route.title}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/,  `$1${route.description}$2`)
    .replace(/(<meta property="og:url" content=")[^"]*(")/,  `$1${route.url}$2`)
    .replace(/(<meta property="og:image:alt" content=")[^"]*(")/,  `$1${route.title}$2`)
    .replace(/(<meta name="twitter:title" content=")[^"]*(")/,  `$1${route.title}$2`)
    .replace(/(<meta name="twitter:description" content=")[^"]*(")/,  `$1${route.description}$2`)
    // inject canonical
    .replace(
      '</head>',
      `  <link rel="canonical" href="${route.url}" />\n  </head>`
    );

  const outDir = path.join(distDir, route.slug);
  fs.mkdirSync(outDir, { recursive: true });
  fs.writeFileSync(path.join(outDir, 'index.html'), html);
  console.log(`Generated: /${route.slug}/index.html`);
}

console.log('Static meta injection complete.');
