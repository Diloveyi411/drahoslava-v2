# Drahoslava Forgacova - Psychologist & Artist Portfolio

## Overview
This is a portfolio website for Drahoslava Forgacova, combining her work as a psychologist with her artistic practice. The site showcases her textured floral paintings and offers various services including painting meditations, 1-on-1 sessions, and workshops.

**Brand Essence:** "Art as Medicine" - A fusion of psychology, creativity, and wellness.

## Recent Changes (October 24, 2025)

### Pearlescent/Iridescent Holographic Design System
- **Global Overlay**: Implemented animated iridescent overlay with subtle rainbow reflections
  - Multi-layered radial gradients (pink, blue, lilac) creating holographic effect
  - Smooth 25-second animation cycle with `iridescent-flow` keyframe
  - Fixed position overlay using `body::before` with `mix-blend-mode: screen`
  - Soft backdrop blur for enhanced depth
- **Color Palette**: New pearlescent brand variables in `:root`
  - `--bg-pearl`: #F8F7F7 (pearl white background)
  - `--bg-muted-pearl`: #EDEAE8 (warm grey haze)
  - `--accent-dusty-rose`: #C9A9A6 (dusty rose for CTAs)
  - `--accent-pressed`: #B6938F (pressed state)
  - `--accent-sage`: #BFD0C5 (cool balance accent)
  - Iridescent light alphas: pink (0.15), blue (0.12), lilac (0.15), gold (0.10)
- **Glass Cards**: Applied glassmorphism to all card components
  - `--card-bg-glass`: rgba(255,255,255,0.55) with 20px backdrop blur
  - `--card-border-glass`: rgba(255,255,255,0.40) for subtle borders
  - Soft shadow: 0 4px 20px rgba(0,0,0,0.03)
- **CTA Buttons**: Unified dusty rose style for primary actions
  - Background: dusty rose (#C9A9A6) with subtle lift on hover
  - Box shadow: 0 2px 10px rgba(201,169,166,0.20)
  - Hover state: transforms translateY(-1px) with enhanced shadow
  - 0.35s ease transitions
- **Forms & Inputs**: Glass effect with enhanced focus states
  - Background: rgba(255,255,255,0.7) with 10px backdrop blur
  - Focus ring: dusty rose with 3px rgba(201,169,166,0.25) shadow
  - Smooth border transitions
- **Navigation**: Glass header with backdrop blur
  - Transparent background with glassmorphism effect
  - Milky border-bottom for subtle separation
- **Image Filters**: Increased milky overlay to 20% opacity (bg-white/20)
  - Applied consistently across Gallery, About, and Lightbox modal
  - Creates cohesive aesthetic with pearlescent theme
- **Typography**: Enhanced line heights for readability
  - Body text: 1.7 line-height
  - Headings: 1.15 line-height
- **Implementation**: Pure CSS in `client/src/index.css` with no external libraries
  - All variables defined in `:root` for easy customization
  - Webkit prefixes for Safari/iOS compatibility
  - Layered z-index structure for proper stacking

### Design Updates (October 23, 2025)
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

### Colors (Light Mode)
- **Primary:** Teal (175 35% 45%) - Calming, professional
- **Secondary:** Soft rose (340 60% 70%) - Warm, creative (used in charts)
- **Accent:** Earth tone (30 45% 60%) - Grounding
- **Background:** Warm off-white (40 20% 97%)
- **Text Primary:** Soft black (220 15% 20%)
- **Text Secondary:** Muted gray (220 10% 50%)

### Typography
- **Primary Font:** Cormorant Garamond (serif) - Elegant, refined typography throughout
- **Monospace:** Fira Mono - Clean, professional for code/technical content
- All text uses Cormorant Garamond for a cohesive, artistic aesthetic

### Key Features
1. **Services** - Four simplified service cards (2x2 grid) with icons, descriptions, and CTAs (no bullet lists) - positioned before Gallery
2. **Gallery** - 4 textured floral artworks in 2-column grid with square aspect ratio, lightbox modal for detailed viewing
3. **Contact Form** - Collects visitor inquiries with subject selection (Painting Meditations, 1-on-1 Session, Workshop, Commission, Other)
4. **Newsletter** - Email subscription with duplicate prevention
5. **Smooth Navigation** - Sticky header with anchor links to sections
6. **About Section** - Portrait photo on left, bio text on right with philosophical content about self-awareness through art

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
- Clean, minimal design with focus on artwork
- Professional yet artistic aesthetic
- Warm color palette reflecting healing/wellness theme
- Accessible and responsive across all devices
