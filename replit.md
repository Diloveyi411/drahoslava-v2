# Drahoslava Forgacova - Psychologist & Artist Portfolio

## Overview
This project is a portfolio website for Drahoslava Forgacova, integrating her professional work as a psychologist with her artistic endeavors. The site aims to showcase her textured floral paintings and promote services such as painting meditations, 1-on-1 sessions, and workshops under the brand essence "Art as Medicine"—a fusion of psychology, creativity, and wellness. The platform supports dynamic service detail pages and a comprehensive newsletter/blog system with Notion CMS integration.

## User Preferences
- Soft iridescent/pearl aesthetic - gender-neutral, calm, technological-organic
- Glass morphism effects with backdrop blur
- Holographic light reflections creating sense of depth
- Minimal design with focus on artwork
- Professional yet artistic aesthetic
- Feels like "white light reflecting on smooth fabric"
- Accessible and responsive across all devices
- No sharp contrasts or saturated colors

## System Architecture

### UI/UX Decisions
The design centers on an "Iridescent Pearl Aesthetic" with a soft, gender-neutral palette. Key elements include:
- **Holographic Background Overlay**: An animated iridescent gradient (pink, blue, lilac tones) on `body::before` creates subtle light shifts.
- **Glass Morphism**: All cards and interactive elements utilize `backdrop-filter: blur(20px)` with semi-transparent backgrounds and soft white borders.
- **Color Palette**: Dominated by #F8F7F7 (pearl base), #2B303B (soft dark text), #C9A9A6 (dusty rose primary accent), and #DDE2DF (light sage-gray secondary).
- **Typography**: Cormorant Garamond is used for all main text for an elegant, unified aesthetic, with Fira Mono for monospace content.
- **Image Treatment**: All images feature a 20% milky white overlay to reduce saturation and maintain the pearl aesthetic.
- **Button Enhancements**: All buttons across the site use the `btn-lift` class for consistent, elegant hover animations creating a subtle elevation effect.
- **Shadow System**: Softer, multi-layered shadows complement the glass effects without harshness.
- **Footer Design**: Centered single-column layout with brand info and social icons. Email icon (first in row) triggers clipboard copy with toast notification. Social links: Instagram (@drahoslavacom), Facebook (Drahoslavaa), TikTok (@baidee.art), YouTube (@drahoslava.forgacova).

### Technical Implementations
- **Dynamic Service Detail Pages**: Each service (`/services/:slug`) has a dedicated page with a hero section, full description, glass card content sections, and navigation. Content is sourced from `client/src/data/services.json`. The first content section of the inner-work service features a split layout with an image (Dadi-art-94_1761189715147.jpg) on the left and text on the right (desktop), stacking on mobile with text above image. The image has a square aspect ratio with a 20% milky overlay consistent with the gallery aesthetic.
- **Blog System** (previously Newsletter):
    - **Notion Integration**: Articles are fetched from a Notion database via a custom backend API using native fetch. Slugs are auto-generated if not provided in Notion.
    - **Markdown Support**: Article detail pages (`/blog/:slug`) render rich-text Notion content using `react-markdown` with `remark-gfm`, styled to match the iridescent pearl aesthetic.
    - **EmailJS Integration**: Newsletter signup forms (homepage and `/blog` page) send welcome emails via EmailJS upon successful subscription, with backend storage for subscribers.
    - **Category Filtering**: The main blog page includes a category-based filtering system for articles.
    - **Blog Preview on Homepage**: A "Recent Thoughts" section displays the 3 most recent articles from Notion in a glass card grid layout below the Gallery section, with hover effects and navigation to article details.
- **Gallery Section**: Features a grid layout of framed artworks with titles and a lightbox modal for detailed viewing, both maintaining the glass morphism and milky overlay effects.
- **Contact Form**: Integrated with Resend email service for delivery to info@drahoslava.com. Includes client and server-side validation, HTML sanitization, and header injection protection. Emails are formatted with both HTML and plain-text versions.
- **Smooth Navigation**: Sticky header with anchor links and dynamic routing. Logo appears in header only when scrolling (opaque state), hidden when translucent.
- **SEO Implementation**: Comprehensive SEO setup with dynamic meta tags, Open Graph, and Twitter Cards:
    - **SEO Component**: Custom React component managing document.title, meta tags, canonical URLs, and Open Graph/Twitter Card tags using useEffect
    - **Dynamic Meta Tags**: Each page (Home, Blog, Artwork, Services, Articles) has unique title and description
    - **Article Meta Tags**: Blog articles include article-specific tags (article:published_time, article:author, article:tag) that are automatically cleaned up when navigating away
    - **JSON-LD Structured Data**: Person, WebSite, and Article schemas following schema.org spec for enhanced search results
    - **Sitemap.xml**: Static sitemap listing all main pages (homepage, blog, artwork, three service pages)
    - **Robots.txt**: Configured to allow all crawlers and reference sitemap location
    - **Social Media Preview**: Custom Open Graph image (1200x675px) with pearl iridescent aesthetic, rose logo, and brand text ensuring proper preview on WhatsApp, Facebook, LinkedIn, and other platforms

### Feature Specifications
- **Services**: Three primary services (Soul, Body, Mind) with dedicated detail pages and clear CTAs.
- **Gallery**: Four textured floral artworks displayed in a framed, square aspect ratio grid, with a framed lightbox for detailed viewing.
- **Blog Preview**: Homepage section showing 3 most recent articles in glass card layout with images, categories, titles, and descriptions. Includes "View All Articles" CTA.
- **Blog**: A comprehensive blog at `/blog` with articles categorized, rich text support, and an integrated subscription system.
- **About Section**: Prominent portrait photo and bio aligned with the artistic practice.
- **Forms**: Contact and Newsletter forms with robust validation and success/error handling.

### System Design Choices
- **Frontend**: React, TypeScript, Vite, TanStack Query for data fetching, Wouter for routing, React Hook Form with Zod for form management, and Tailwind CSS with shadcn/ui for styling.
- **Backend**: Express.js with TypeScript, providing API endpoints for contact submissions and newsletter subscriptions.
- **Data Storage**: In-memory storage (`MemStorage`) for contact messages and newsletter subscriptions.
- **Shared Schemas**: `shared/schema.ts` defines shared data models and validation schemas.
- **Image Optimization**: 
    - **Gallery Images**: All images converted to WebP format using Sharp, achieving 55.7% size reduction (from 38.28 MB to 16.95 MB) while maintaining quality at 85%.
    - **Hero Background Optimization**: Responsive hero image variants created for optimal performance:
        - Mobile (≤767px): 800x533px, 48KB (97% size reduction from original 1.9MB)
        - Tablet (768-1199px): 1200x800px, 110KB (94% size reduction)
        - Desktop (≥1200px): 1920x1280px, 310KB (84% size reduction)
    - **Performance Features**: Hero uses `<picture>` element with `fetchPriority="high"` and `loading="eager"` for optimized LCP (Largest Contentful Paint). Proper width/height attributes prevent layout shift.

## External Dependencies
- **Notion API**: Used for content management of newsletter articles. Requires `NOTION_API_KEY` and `NOTION_DATABASE_ID`.
- **EmailJS**: Integrated for sending welcome emails to newsletter subscribers. Requires `VITE_EMAILJS_SERVICE_ID`, `VITE_EMAILJS_PUBLIC_KEY`, and `VITE_EMAILJS_TEMPLATE_SIGNUP`.
- **TanStack Query**: Frontend library for data fetching, caching, and state management.
- **Zod**: Schema declaration and validation library used with React Hook Form.
- **shadcn/ui**: Component library providing pre-built UI components.