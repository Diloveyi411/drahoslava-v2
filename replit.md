# Drahoslava Forgacova - Psychologist & Artist Portfolio

## Overview
This is a portfolio website for Drahoslava Forgacova, combining her work as a psychologist with her artistic practice. The site showcases her textured floral paintings and offers various services including painting meditations, 1-on-1 sessions, and workshops.

**Brand Essence:** "Art as Medicine" - A fusion of psychology, creativity, and wellness.

## Recent Changes (October 23, 2025)
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
1. **Gallery** - Displays 4 textured floral artworks with lightbox modal for detailed viewing
2. **Contact Form** - Collects visitor inquiries with subject selection (Painting Meditations, 1-on-1 Session, Workshop, Commission, Other)
3. **Newsletter** - Email subscription with duplicate prevention
4. **Services** - Four service offerings displayed in card grid
5. **Smooth Navigation** - Sticky header with anchor links to sections

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
