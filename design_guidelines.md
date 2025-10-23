# Design Guidelines: Drahoslava Forgacova - Psychologist & Artist Portfolio

## Design Approach
**Reference-Based Approach** drawing inspiration from creative portfolio sites like Behance, combined with wellness/therapy platforms like Headspace for a unique blend of artistic expression and professional psychology services.

**Brand Essence:** "Art as Medicine"
- Psychology + Creativity + Wellness fusion
- Professional yet deeply artistic
- Healing, introspective, and accessible

## Color Palette

### Light Mode
- **Primary:** 175 35% 45% (Teal - calming, professional)
- **Secondary:** 340 60% 70% (Soft rose - warm, creative)
- **Accent:** 30 45% 60% (Earth tone - grounding)
- **Background:** 40 20% 97% (Warm off-white)
- **Text Primary:** 220 15% 20% (Soft black)
- **Text Secondary:** 220 10% 50% (Muted gray)

### Dark Mode (optional future implementation)
- **Background:** 220 20% 12%
- **Text Primary:** 40 15% 95%

## Typography

**Font Families:**
- **Headings:** 'Playfair Display' or 'Cormorant' (elegant serif for artistic feel)
- **Body:** 'Inter' or 'DM Sans' (clean, professional sans-serif)
- **Accents:** 'Crimson Text' (for quotes, testimonials)

**Scale:**
- Hero Headline: text-5xl lg:text-7xl, font-light, tracking-tight
- Section Headers: text-3xl lg:text-5xl, font-light
- Subsections: text-xl lg:text-2xl, font-normal
- Body: text-base lg:text-lg, font-normal, leading-relaxed
- Small text: text-sm, text-secondary

## Layout System

**Spacing Units:** Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Section padding: py-16 md:py-24 lg:py-32
- Component margins: mb-8, mb-12, mb-16
- Grid gaps: gap-6, gap-8, gap-12

**Container Strategy:**
- Max-width: max-w-7xl for full sections
- Content: max-w-4xl for text-heavy content
- Centered: mx-auto px-6 lg:px-8

## Core Components

### Hero Section
- Full viewport height (min-h-screen) with textured floral artwork background
- Large, elegant headline: "Art, Psychology & Vibes" 
- Subtitle describing unique approach
- Dual CTA buttons: "Book a Session" (primary) + "View Gallery" (outline with backdrop-blur-sm)
- Soft gradient overlay for text readability

### Navigation
- Sticky header with backdrop-blur-md
- Logo/name on left
- Navigation links with smooth scroll anchors
- "Contact" CTA button highlighted
- Mobile: hamburger menu with slide-in drawer

### About/Bio Section
- Two-column layout: Portrait photo (left) + Bio text (right)
- Professional photo with artistic border or subtle shadow
- Credentials and certifications in elegant list format
- Personal story blending psychology and art journey
- Background: Subtle textured pattern or soft gradient

### Gallery
- Masonry or grid layout (2-3 columns on desktop)
- Textured floral paintings as primary showcase
- Lightbox modal on click with prev/next navigation
- Image captions with title, medium, year
- Lazy loading for performance

### Services
- 4-card grid (2x2 on desktop, stack on mobile)
- Each card: Icon/illustration, title, description, "Learn More" link
- Hover: subtle lift effect (translate-y-1)
- Cards: Painting Meditations, 1-on-1 Sessions, Comics & Illustrations, Workshops & Events

### Contact Form
- Clean form fields: Name, Email, Subject (dropdown), Message
- Validation states with helpful error messages
- Submit button with loading state
- Confirmation message after submission
- Background: Soft colored section distinct from other areas

### Newsletter
- Centered section with compelling headline
- Email input with inline "Subscribe" button
- Micro-copy about privacy and frequency
- Success state with thank you message

### Footer
- Three-column layout: About snippet, Quick links, Contact info
- Social media icons (if applicable)
- Copyright and legal links
- Background: Slightly darker than main background

## Visual Elements

### Images
- **Hero Background:** Large textured floral painting, subtle overlay for text contrast
- **About Photo:** Professional headshot of Drahoslava in warm, natural lighting
- **Gallery:** 6-8 high-quality images of textured floral paintings
- **Service Icons:** Custom illustrations or abstract shapes representing each service
- **Optional:** Behind-the-scenes photos of workshops/sessions (if available)

### Cards & Containers
- Soft shadows: shadow-md on cards
- Rounded corners: rounded-2xl for cards, rounded-lg for smaller elements
- Subtle borders: border border-neutral-200 for definition
- Hover states: scale-105 transition-transform

### Buttons
- Primary: Filled with primary color, white text, rounded-full, px-8 py-3
- Secondary: Outline variant with backdrop-blur-sm when on images
- Hover: Slight scale increase, no custom hover states needed

## Animations & Interactions
**Minimal and purposeful:**
- Smooth scroll behavior for navigation
- Fade-in on scroll for sections (intersection observer)
- Gallery lightbox: smooth modal transitions
- Form inputs: focus states with border color change
- NO autoplay animations, NO excessive parallax

## Accessibility
- High contrast text-to-background ratios (WCAG AA minimum)
- Focus indicators on all interactive elements
- Semantic HTML structure
- Alt text for all images
- Form labels and aria-labels
- Keyboard navigation support

## Responsive Breakpoints
- Mobile: Default (< 768px) - single column, stacked layout
- Tablet: md (768px+) - 2 columns where appropriate
- Desktop: lg (1024px+) - full multi-column layouts
- Large: xl (1280px+) - max-width constraints for readability

This design creates a warm, professional, and artistic experience that honors both Drahoslava's psychological expertise and creative artistry, establishing trust while celebrating the therapeutic power of art.