# Drahoslava Forgacova - Psychologist & Artist Portfolio

## Overview
This is a portfolio website for Drahoslava Forgacova, combining her work as a psychologist with her artistic practice. The site showcases her textured floral paintings and offers various services including painting meditations, 1-on-1 sessions, and workshops.

**Brand Essence:** "Art as Medicine" - A fusion of psychology, creativity, and wellness.

## Recent Changes (October 23, 2025)

### Design Updates (V0 Prototype Implementation)
- **About Section**: Swapped layout - photo now on LEFT, text on RIGHT (50/50 split on desktop)
  - Photo made more prominent with portrait orientation (3:4 aspect ratio)
  - Updated text content to better reflect artistic practice
- **Gallery Section**: Redesigned for gallery wall aesthetic
  - Changed from 4 columns to 2 columns on desktop
  - Images now square (1:1 aspect ratio) instead of portrait (3:4)
  - Minimal rounded corners (rounded-sm) for cleaner gallery look
  - Added subtle shadow for depth
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
- **Headings:** Playfair Display (serif) - Elegant, artistic
- **Body:** Inter/DM Sans (sans-serif) - Clean, professional
- **Accents:** Crimson Text (for quotes)

### Key Features
1. **Gallery** - 4 textured floral artworks in 2-column grid with square aspect ratio, lightbox modal for detailed viewing
2. **Contact Form** - Collects visitor inquiries with subject selection (Painting Meditations, 1-on-1 Session, Workshop, Commission, Other)
3. **Newsletter** - Email subscription with duplicate prevention
4. **Services** - Four simplified service cards (2x2 grid) with icons, descriptions, and CTAs (no bullet lists)
5. **Smooth Navigation** - Sticky header with anchor links to sections
6. **About Section** - Portrait photo on left, bio text on right, with expertise highlight cards below

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
