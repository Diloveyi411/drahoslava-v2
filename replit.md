# Drahoslava Forgacova - Psychologist & Artist Portfolio

## Overview
This is a portfolio website for Drahoslava Forgacova, combining her work as a psychologist with her artistic practice. The site showcases her textured floral paintings and offers various services including painting meditations, 1-on-1 sessions, and workshops.

**Brand Essence:** "Art as Medicine" - A fusion of psychology, creativity, and wellness.

## Recent Changes (October 27, 2025)

### Newsletter Page with Notion Integration ✅ FULLY WORKING
Complete Newsletter/Blog functionality with Notion CMS integration and EmailJS welcome emails:

- **Newsletter Signup with EmailJS** (`/` homepage and `/newsletter` page):
  - ✅ **Email Confirmation Working**: Subscribers receive welcome emails via EmailJS
  - Database saves subscription (POST /api/newsletter)
  - EmailJS sends welcome email after successful save
  - Environment variables required:
    - VITE_EMAILJS_SERVICE_ID: `service_tiu5zp8`
    - VITE_EMAILJS_PUBLIC_KEY: Your EmailJS public key
    - VITE_EMAILJS_TEMPLATE_SIGNUP: `template_casfyh5` (Newsletter signup template)
  - Template configuration in EmailJS dashboard:
    - "To Email" field set to: `{{user_email}}`
    - Template receives: `to_email` and `user_email` parameters
  - Graceful error handling: subscription success shown even if email fails
  - Form resets and shows success message after submission

- **Newsletter Page** (`/newsletter`):
  - Email signup form (same EmailJS integration as homepage)
  - Category filtering system (All, INNER BLOOM, CREATIVE CONSCIOUSNESS, TECH & SPIRIT, WORKSHOPS & EXPERIENCES, THE SOUL'S NOTE)
  - Responsive article grid (1 column mobile, 2 tablet, 3 desktop)
  - Glass card styling with 20% milky overlay on images
  - Articles fetched from Notion database via backend API

- **Article Detail Page** (`/newsletter/:slug`):
  - **Markdown Support**: Full rich-text formatting using react-markdown with remark-gfm
    - Supports headings (H1-H6), bold, italic, lists, blockquotes, code blocks, links, tables
    - Custom prose styling matching iridescent pearl aesthetic
    - Lightweight font (300), elegant typography with Cormorant Garamond
    - Dusty rose primary color for links and blockquote borders
  - Full article content display with featured image
  - Publication date and category metadata
  - Related articles section (same category)
  - "Back to Blog" navigation button
  - Glass morphism styling consistent with site design

- **Backend Integration** (server/lib/notion.ts):
  - **Uses native fetch API** to call Notion REST API directly (bypassed SDK v5.3.0 compatibility issues)
  - API routes: 
    - GET /api/newsletter/articles - Fetch all published articles
    - GET /api/newsletter/articles/:slug - Fetch single article by slug
  - **Automatic slug generation**: If Notion "Slug" field is empty, auto-generates from title
  - Environment variables: 
    - NOTION_API_KEY (ntn_ prefix format) - Backend only
    - NOTION_DATABASE_ID (UUID format with dashes) - Backend only
    - VITE_EMAILJS_PUBLIC_KEY, VITE_EMAILJS_SERVICE_ID, VITE_EMAILJS_TEMPLATE_SIGNUP - Frontend

- **Notion Database Requirements**:
  - Database must be shared with "Drahoslava Newsletter" integration via "Add connections"
  - Required fields: Title (title), Slug (rich_text), Category (select), Description (rich_text), Content (rich_text), Featured Image (files), Published (checkbox), Date (date)
  - Only articles with Published=true are displayed

- **Navigation Updates**:
  - Added "Blog" link in main navigation that routes to /newsletter
  - Dynamic navigation handling for both scroll anchors and route changes

### Previous Changes (October 24, 2025)

### Iridescent Pearl Aesthetic Transformation
Complete visual redesign to a soft, gender-neutral iridescent/pearl aesthetic inspired by holographic light reflections on smooth fabric:

- **Color Palette Updated** (Light Mode):
  - Background: #F8F7F7 (0 4% 97%) - Pearl base
  - Text: #2B303B (225 15% 20%) - Soft dark
  - Primary Accent: #C9A9A6 (9 21% 72%) - Dusty rose
  - Secondary: #DDE2DF (150 11% 87%) - Light sage-gray
  - Borders: rgba(255,255,255,0.4) - Soft, translucent

- **Holographic Background Overlay**:
  - Animated iridescent gradient using body::before
  - Multi-layered radial gradients with pink, blue, and lilac tones
  - Subtle 20s animation creating gentle light shifts
  - Iridescent colors: rgba(255,182,193,0.15), rgba(176,224,230,0.12), rgba(230,220,255,0.15)
  - Effect feels like white light reflecting on pearl fabric

- **Glass Morphism Effects**:
  - All cards use .glass-card class: backdrop-filter: blur(20px)
  - Semi-transparent backgrounds (rgba(248,247,247,0.7))
  - Soft white borders (rgba(255,255,255,0.4))
  - Applied to: Service cards, Gallery cards, Contact/Newsletter success messages, Lightbox modal
  - Maintains readability while adding depth

- **Image Filters**:
  - All images now have 20% milky white overlay (bg-white/20)
  - Reduces saturation for cohesive pearl aesthetic
  - Applied to: Gallery artworks, About profile photo, Lightbox images

- **Button Enhancements**:
  - Dusty rose primary color (#C9A9A6) with white text
  - .btn-lift class for smooth hover animations
  - translateY(-2px) on hover with enhanced shadow
  - Rounded 8px (--radius: 0.5rem)

- **Shadow System**:
  - Softer, more subtle shadows using rgba(43,48,59,0.03-0.10)
  - Reduced opacity for glass effect compatibility
  - Multi-layered shadows for depth without harshness

- **Typography** (unchanged):
  - Cormorant Garamond for all text
  - Fira Mono for monospace

### Previous Design Updates (October 23, 2025)
- **About Section**: Swapped layout - photo now on LEFT, text on RIGHT (50/50 split on desktop)
  - Photo made more prominent with portrait orientation (3:4 aspect ratio)
  - Updated text content to better reflect artistic practice
  - Removed highlight cards section (Inner Work, Creative Practice, Digital Space)
- **Gallery Section**: Redesigned for gallery wall aesthetic with framed artwork
  - Grid layout: Mobile (1 column), Tablet/Desktop (2 columns) - grid-cols-1 sm:grid-cols-2 md:grid-cols-2
  - Images now square (aspect-square) - 1:1 aspect ratio
  - Each artwork in a Card frame with padding (p-4 sm:p-6) to create traditional gallery frame effect
  - Card frames have rounded corners (rounded-md), images have sharp edges
  - Subtle shadow for depth (shadow-md)
  - Gap spacing: gap-6 lg:gap-8 between artworks
  - Artwork titles displayed below each image inside the frame
  - 4 artworks displayed in 2x2 grid on larger screens
  - **Lightbox Modal**: Also framed with soft milky background
    - Custom DialogOverlay with 50% milky transparent background (bg-background/50 with backdrop-blur-md)
    - Image displayed in Card frame with padding (p-6 sm:p-8) and solid background
    - X button positioned at top-right corner (top-4 right-4) with high visibility styling
    - Navigation buttons (Previous/Next) positioned inline with the frame
    - Title and medium info displayed below image inside frame
    - Full-width milky overlay creates aesthetic gallery viewing experience
- **Services Section**: Simplified card design
  - Removed bullet point feature lists
  - Clean layout: circular icon background → title → description → Learn More button
  - Icons displayed in circular bg-primary/10 backgrounds
  - Changed to bg-card for improved text contrast (11.9 ratio - exceeds WCAG AAA)
- **Hero Section**: Enhanced background image prominence
  - Replaced generic background with personal photo (paintbrushes and artwork)
  - Background image set to 60% transparency (opacity-40) for subtle backdrop
  - Subtle gradient overlay (from-black/20 via-black/15 to-black/20) for depth
  - Added text shadows for readability against photo background
  - Added scale-105 effect for more impactful display
  - Swapped button order: "View Gallery" is now primary CTA
  - Updated subtitle to better describe services
- **Typography**: Changed to Cormorant Garamond throughout
  - Replaced Inter/Playfair Display with Cormorant Garamond for unified, elegant aesthetic
  - Fira Mono for monospace/technical content

### Previous Updates
- Implemented backend API routes for contact form and newsletter subscription
- Added data persistence using in-memory storage
- Connected frontend forms to backend APIs using TanStack Query mutations
- Added comprehensive validation for both client and server:
  - Contact form: name (min 2 chars), valid email, required subject, message (min 10 chars)
  - Newsletter: valid email format with duplicate prevention (409 error)
- Fixed accessibility warning in Gallery lightbox by adding visually hidden DialogTitle
- All forms fully tested with end-to-end validation and error handling

## Tech Stack
- **Frontend:** React, TypeScript, Vite, TanStack Query
- **Backend:** Express.js, TypeScript
- **Styling:** Tailwind CSS, shadcn/ui components
- **Routing:** Wouter
- **Forms:** React Hook Form with Zod validation
- **Storage:** In-memory storage (MemStorage)

## Project Architecture

### Frontend (`client/src/`)
- **pages/Home.tsx** - Main landing page that orchestrates all sections
- **components/** - Reusable UI components:
  - Navigation.tsx - Sticky header with smooth scroll anchors
  - Hero.tsx - Full viewport hero with background image
  - About.tsx - Bio section with credentials
  - Gallery.tsx - Artwork showcase with lightbox modal
  - Services.tsx - Service offerings in card layout
  - ContactForm.tsx - Contact form with backend integration
  - Newsletter.tsx - Newsletter subscription with backend integration
  - Footer.tsx - Site footer with links and info
- **components/ui/** - shadcn/ui component library

### Backend (`server/`)
- **routes.ts** - API endpoints:
  - POST /api/contact - Submit contact form
  - POST /api/newsletter - Subscribe to newsletter
- **storage.ts** - In-memory storage implementation for messages and subscriptions

### Shared (`shared/`)
- **schema.ts** - Shared data models and validation schemas:
  - contactMessages - Contact form submissions
  - newsletterSubscriptions - Newsletter email subscriptions

## Design System

### Colors (Light Mode) - Iridescent Pearl Aesthetic
- **Background:** #F8F7F7 (0 4% 97%) - Pearl base with holographic overlay
- **Foreground Text:** #2B303B (225 15% 20%) - Soft dark
- **Primary Accent:** #C9A9A6 (9 21% 72%) - Dusty rose
- **Secondary:** #DDE2DF (150 11% 87%) - Light sage-gray
- **Muted Text:** (225 10% 50%) - Medium gray
- **Card Background:** (0 5% 96%) - Slightly elevated from base
- **Borders:** rgba(255,255,255,0.4) - Soft translucent white
- **Iridescent Overlays:** 
  - Pink: rgba(255,182,193,0.15)
  - Blue: rgba(176,224,230,0.12)
  - Lilac: rgba(230,220,255,0.15)

### Typography
- **Primary Font:** Cormorant Garamond (serif) - Elegant, refined typography throughout
- **Monospace:** Fira Mono - Clean, professional for code/technical content
- All text uses Cormorant Garamond for a cohesive, artistic aesthetic

### Key Features
1. **Iridescent Background** - Animated holographic gradient overlay creating soft light reflections (20s animation loop)
2. **Glass Morphism** - All cards use backdrop-filter: blur(20px) with semi-transparent backgrounds
3. **Services** - Three service cards (Soul/Body/Mind) with Eye/Hand/Monitor icons, glass effect
4. **Gallery** - 4 textured floral artworks in 2-column grid with glass frames, 20% milky overlay, lightbox modal
5. **Contact Form** - Subject selection with glass morphism effects on success state
6. **Newsletter** - Email subscription with glass effect success message
7. **Smooth Navigation** - Sticky header with anchor links to sections
8. **About Section** - Portrait photo (20% milky overlay) on left, bio text on right

### Page Order
1. Hero
2. About
3. Services (moved above Gallery for better flow)
4. Gallery
5. Contact Form
6. Newsletter

## Data Models

### Contact Messages
- id, name, email, subject, message, createdAt

### Newsletter Subscriptions  
- id, email (unique), subscribedAt

## Running the Project
- Development server runs on port 5000
- Command: `npm run dev`
- Frontend and backend served from same port via Vite integration

## User Preferences
- Soft iridescent/pearl aesthetic - gender-neutral, calm, technological-organic
- Glass morphism effects with backdrop blur
- Holographic light reflections creating sense of depth
- Minimal design with focus on artwork
- Professional yet artistic aesthetic
- Feels like "white light reflecting on smooth fabric"
- Accessible and responsive across all devices
- No sharp contrasts or saturated colors
