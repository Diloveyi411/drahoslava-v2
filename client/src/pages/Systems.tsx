import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';
import QuickContactForm from '@/components/QuickContactForm';

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.25, 0.1, 0.25, 1] } },
};

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const SERVICES = [
  {
    num: '01',
    title: 'UX\ndesign',
    body: 'Flows, structure, and interaction design that turn products into clear, usable systems.',
  },
  {
    num: '02',
    title: 'Product\nthinking',
    body: 'Turning complex products into clear decisions.',
  },
  {
    num: '03',
    title: 'Conversion\n& clarity',
    body: 'Making key actions visible where decisions happen.',
  },
];

const WORK = [
  {
    title: 'Polystate',
    tags: 'UX Design · Information Architecture · Product Thinking',
    context: 'UX redesign of the app interior for a global mobility platform that helps digital nomads set up residency, companies, and bank accounts across jurisdictions.',
    problem: 'Flat navigation mixed paid services with free tools at the same level. Users couldn\'t tell what costs money and what doesn\'t.\nNo onboarding. First-time users landed on a dashboard with no context for what to do.\nServices pages listed products without explaining why someone would need them.\nKey features (AI assistant, legal digest, news feed) buried under generic labels.',
    intervention: 'Restructured the full information architecture into 4 clear groups: Services, Intelligence, Tools, Community.\nDesigned a homepage with personal journey tracking, contextual widgets, and service cards with pricing.\nAdded a dashboard customization panel where users toggle widgets on and off to control their own layout.\nAdded a "why" layer to services - benefit cards before product listings.\nCreated a 3-step onboarding flow that captures user intent and personalizes the experience from the first visit.',
    outcome: 'Founder approved the redesign on first presentation and moved directly to implementation.\nNavigation hierarchy now separates paid from free, reducing cognitive load.\nServices lead with user motivation instead of product specs.\nOnboarding enables personalized recommendations from day one.',
    gallery: [
      { src: '/portfolio/polystate-ux/before.png', title: 'Before', caption: 'Flat sidebar mixing paid services with free tools, no grouping or hierarchy', contain: true },
      { src: '/portfolio/polystate-ux/homepage.png', title: 'Redesigned homepage', caption: 'Journey bar, contextual widgets, service cards with pricing', contain: true },
      { src: '/portfolio/polystate-ux/customize.png', title: 'Customize Dashboard', caption: 'Toggle widgets on/off via side panel', contain: true },
      { src: '/portfolio/polystate-ux/navigation.png', title: 'Information Architecture', caption: '4-group nav: Services, Intelligence, Tools, Community', contain: true },
      { src: '/portfolio/polystate-ux/services-hub.png', title: 'Services Hub', caption: '"Why" layer before product cards', contain: true },
      { src: '/portfolio/polystate-ux/onboarding.png', title: 'Onboarding Flow', caption: '3-step wizard for first-time users', contain: true },
    ],
  },
  {
    title: 'WebTrigo',
    tags: 'UX Audit · Conversion Design · Interaction Design',
    context: 'Redesign of a conversion-critical flow in a cold-email-driven product.',
    problem: '35% email CTR collapsed to 1.5% purchase conversion.\nKey decision elements (pricing, trust, social proof) were hidden in a bottom-right widget - a known UI blind spot.\nMost users never saw a single conversion element.',
    intervention: 'Re-architected the layout to surface trust signals and decision elements on initial load.\nRemoved dependency on widget interaction.\nDesigned a flow aligned with user attention and decision points.\nWorked within an existing layout and could not remove the widget entirely - redefined its role instead.',
    outcome: 'Made all key actions visible without interaction.\nAligned the flow with user attention instead of UI constraints.\nCreated a structure ready for testing and measurable improvement.',
    gallery: [
      { src: '/portfolio/webtrigo/before-raw.png', title: 'Original Layout', caption: 'Conversion elements hidden behind widget interaction', contain: true },
      { src: '/portfolio/webtrigo/after-raw.png', title: 'Redesigned Layout', caption: 'Trust signals visible on initial load. No interaction required.', contain: true },
      { src: '/portfolio/webtrigo/mobile-raw.png', title: 'Mobile Version', caption: 'Same psychological sequence adapted for mobile', contain: true },
    ],
  },
  {
    title: 'IS Justice',
    tags: 'UX Audit · Web Design · Frontend Development',
    context: 'IS Justice Servis s.r.o. — economic and legal consulting firm operating since 2008. Services range from accounting and taxes to mediation, crypto consulting, and real estate.',
    problem: 'Existing website had no clear positioning — 9 services with no ICP.\nHero was empty: beige background, generic headline, zero visual impact.\nCTA buttons were navigational, not conversion-oriented.\nNo social proof, no numbers, no faces. 18 years of experience completely invisible.\nJustified text in bio, hash routing with no SEO value.',
    intervention: 'Started with a 10-point UX audit before touching any design.\nRedefined positioning around one clear message: "Firmy strácajú kontrolu nad financiami. My ju vraciame naspäť."\nBuilt the full site in React + Vite: hero with BW before/after photography, dark comparison section, bento grid services, pricing, team portraits with founder quotes, conversion lead form.\nAdded warm gradient CTA buttons with shimmer hover effect.\nOptimized for performance: single font request, lazy loading, resized images, mobile-first.',
    outcome: 'Complete single-page website with clear positioning and conversion flow.\nDramatic visual transformation: from generic beige to professional black/white/orange system.\nDelivered to two GitHub repositories — client and site administrator.',
    gallery: [
      { src: '/portfolio/is-justice/after-hero.png', title: 'Hero — After', caption: 'BW before/after photography, gradient CTA, clear headline', contain: true },
      { src: '/portfolio/is-justice/before-hero.png', title: 'Hero — Before', caption: 'Beige background, generic headline, no visual impact', contain: true },
      { src: '/portfolio/is-justice/after-comparison.png', title: 'Comparison Section', caption: 'Dark section: traditional approach vs. IS Justice', contain: true },
      { src: '/portfolio/is-justice/after-sluzby.png', title: 'Services — Bento Grid', caption: '7 services in asymmetric bento layout', contain: true },
      { src: '/portfolio/is-justice/before-sluzby.png', title: 'Services — Before', caption: 'Orange cards with heavy icons, no hierarchy', contain: true },
      { src: '/portfolio/is-justice/after-cennik.png', title: 'Pricing', caption: 'Transparent pricing: 3 tiers + addons', contain: true },
      { src: '/portfolio/is-justice/after-podnikatelia.png', title: 'PathSelector', caption: 'Emotional copy: client pain before solution', contain: true },
      { src: '/portfolio/is-justice/after-footer.png', title: 'Footer', caption: 'Dark, structured, complete contact info', contain: true },
      { src: '/portfolio/is-justice/before-kontakt.png', title: 'Contact — Before', caption: 'Map + scattered info, no visual system', contain: true },
    ],
  },
  {
    title: 'Amagi Labs',
    tags: 'Web Redesign · Positioning · Trust Design',
    context: 'Amagi Labs is a Web3 strategy and consulting firm working with startups, funds, and institutions. Clients include Ernst & Young, the National Bank of Slovakia, and Aaro Capital. The site needed to match the credibility of the work behind it.',
    problem: 'The original site read as a generic crypto project, not a serious advisory firm.\nFloating decorative icons (Bitcoin, dollar signs, arrows) cluttered every section with no informational value.\nThe hero had no visual anchor - just gradient rainbow text on a dark background.\nThe headline "Web 3 Mobility" was vague and said nothing about what the firm actually does.\nClient logos were shown without context, missing the opportunity to communicate real credibility.\nThe red-orange color scheme placed the brand in the same visual category as retail crypto products.',
    intervention: 'Replaced the cluttered hero with a strong editorial visual - a helmeted figure in blue light - paired with a direct, action-oriented headline: "Make the right moves in Web3."\nRemoved all decorative floating elements. Every element now carries meaning.\nRestructured the services section with clear audience segmentation: startups, funds, institutions.\nUpgraded the client section from a logo strip to a carousel with named partnerships and descriptions - EY, National Bank of Slovakia, Aaro Capital.\nAdded a dedicated section for David Stancel, Managing Partner, to humanize the firm and surface his 10+ years of credibility.\nShifted the visual language from "crypto product" to "strategic consultancy": cleaner typography, restrained palette, editorial imagery.',
    outcome: 'The redesign repositions Amagi Labs from a generic Web3 service provider to a credible institutional advisory firm.\nClient partnerships now communicate weight, not just presence.\nThe human layer (David) creates trust that a logo grid cannot.\nVisual noise eliminated. Hierarchy established. Positioning clarified.',
    gallery: [
      { src: '/portfolio/amagi-labs/before-hero.png', title: 'Hero: Before', caption: 'Rainbow gradient text, no visual anchor, vague headline "Web 3 Mobility"', contain: true },
      { src: '/portfolio/amagi-labs/after-hero.png', title: 'Hero: After', caption: 'Editorial visual, direct headline, clear subheadline', contain: true },
      { src: '/portfolio/amagi-labs/before-services.png', title: 'Services: Before', caption: 'Dark red cards with decorative icons and checkmarks, cluttered background', contain: true },
      { src: '/portfolio/amagi-labs/after-services-intro.png', title: 'Services: After', caption: 'Audience segmentation: startups, funds, institutions', contain: true },
      { src: '/portfolio/amagi-labs/after-services-grid.png', title: 'Services Grid', caption: 'Clean 4-card layout, no decorative noise', contain: true },
      { src: '/portfolio/amagi-labs/before-clients.png', title: 'Clients: Before', caption: 'Logo strip with no context or weight', contain: true },
      { src: '/portfolio/amagi-labs/after-clients.png', title: 'Clients: After', caption: 'Carousel with named partnerships and descriptions', contain: true },
      { src: '/portfolio/amagi-labs/after-about.png', title: 'Managing Partner', caption: 'Human layer: David Stancel, 10+ years in crypto', contain: true },
    ],
  },
  {
    title: 'Gentle Touch by Lubka',
    tags: 'Web Design · Development · Deployment',
    context: 'Somatic practitioner whose work lives between therapy and massage. Embodied, personal, human. Her name says it: Dotyk od Ľubky. Touch by Lubka.',
    problem: 'No online presence. No way for potential clients to find, understand, or contact her.\nExisting references were too clinical: massage menus, price lists, procedure lists.\nHer practice is also a conversation. That needed to show.',
    intervention: 'Designed and built the full website from scratch: structure, copy layout, visual direction, and deployment.\nVisual direction built around soft colors, natural elements, and rounded shapes. No hard edges.\nBalanced image and text at 50/50 so neither dominates.\nPractitioner presence made central — her face, her words, her approach.\nConnected custom domain laskavydotyk.com via Vercel.',
    outcome: 'Live and fully functional from day one.\nClients can find her, understand her offer, and reach out. Without friction.',
    gallery: [
      { src: '/portfolio/lubka/home.png', title: 'Homepage', caption: '"Vráťte sa späť k sebe"', contain: true },
      { src: '/portfolio/lubka/about.png', title: 'About', caption: 'Warm, personal, clear', contain: true },
      { src: '/portfolio/lubka/services.png', title: 'Brand Voice', caption: 'Quote section', contain: true },
      { src: '/portfolio/lubka/contact.png', title: 'Services 1/2', caption: 'Structured for clarity and action', contain: true },
      { src: '/portfolio/lubka/mobile.png', title: 'Services 2/2', caption: 'Responsive layout', contain: true },
      { src: '/portfolio/lubka/detail.png', title: 'Footer', caption: 'Services and footer', contain: true },
      { src: '/portfolio/lubka/inspiration.jpg', title: 'Client Inspiration', caption: 'Soft colors, 50/50 balance, rounded shapes, nature elements', contain: true },
    ],
  },
];

function PrismaticLine({ width = 280 }: { width?: number }) {
  return (
    <div
      style={{
        width,
        height: 2,
        background: 'linear-gradient(90deg, #7CF0EA 0%, #B8C0FF 33%, #FF9ECD 66%, #FFE680 100%)',
        flexShrink: 0,
      }}
    />
  );
}


function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

type GalleryItem = { src?: string; video?: string; caption: string; title?: string; contain?: boolean };

function Lightbox({ src, caption, onClose, onPrev, onNext, hasPrev, hasNext }: {
  src: string; caption: string; onClose: () => void;
  onPrev: () => void; onNext: () => void; hasPrev: boolean; hasNext: boolean;
}) {
  const [zoom, setZoom] = useState(1);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [dragging, setDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  const resetZoom = useCallback(() => { setZoom(1); setPos({ x: 0, y: 0 }); }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) { resetZoom(); onPrev(); }
      if (e.key === 'ArrowRight' && hasNext) { resetZoom(); onNext(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext, resetZoom]);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    setZoom(z => Math.min(4, Math.max(1, z - e.deltaY * 0.001)));
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setDragging(true);
    setDragStart({ x: e.clientX - pos.x, y: e.clientY - pos.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!dragging) return;
    setPos({ x: e.clientX - dragStart.x, y: e.clientY - dragStart.y });
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(7,7,13,0.97)',
        backdropFilter: 'blur(12px)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Close */}
      <button onClick={onClose} style={{
        position: 'absolute', top: 24, right: 24, background: 'none',
        border: '1px solid rgba(237,237,234,0.15)', color: 'rgba(237,237,234,0.6)',
        width: 40, height: 40, cursor: 'pointer', fontSize: 18,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>✕</button>

      {/* Prev */}
      {hasPrev && (
        <button onClick={() => { resetZoom(); onPrev(); }} style={{
          position: 'absolute', left: 24, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: '1px solid rgba(237,237,234,0.15)',
          color: 'rgba(237,237,234,0.6)', width: 44, height: 44,
          cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>←</button>
      )}

      {/* Next */}
      {hasNext && (
        <button onClick={() => { resetZoom(); onNext(); }} style={{
          position: 'absolute', right: 24, top: '50%', transform: 'translateY(-50%)',
          background: 'none', border: '1px solid rgba(237,237,234,0.15)',
          color: 'rgba(237,237,234,0.6)', width: 44, height: 44,
          cursor: 'pointer', fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>→</button>
      )}

      {/* Image */}
      <div
        style={{ overflow: 'hidden', maxWidth: '90vw', maxHeight: '80vh', cursor: zoom > 1 ? 'grab' : 'zoom-in' }}
        onWheel={handleWheel}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={() => setDragging(false)}
        onMouseLeave={() => setDragging(false)}
        onDoubleClick={() => zoom > 1 ? resetZoom() : setZoom(2.5)}
      >
        <img
          src={src}
          alt={caption}
          draggable={false}
          style={{
            maxWidth: '90vw', maxHeight: '80vh',
            objectFit: 'contain', display: 'block',
            transform: `scale(${zoom}) translate(${pos.x / zoom}px, ${pos.y / zoom}px)`,
            transformOrigin: 'center',
            transition: dragging ? 'none' : 'transform 0.15s ease',
            userSelect: 'none',
          }}
        />
      </div>

      {/* Caption + zoom hint */}
      <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.4)' }}>{caption}</p>
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, color: 'rgba(237,237,234,0.2)', letterSpacing: 1 }}>
          scroll to zoom · double-click to reset · drag to pan
        </p>
      </div>
    </motion.div>
  );
}

function GallerySlider({ gallery, projectTitle, accent }: { gallery: GalleryItem[]; projectTitle?: string; accent?: string }) {
  const [index, setIndex] = useState(0);
  if (gallery.length === 0) return <div style={{ width: '100%', height: '100%', background: '#0A0A12' }} />;
  const [dir, setDir] = useState(1);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  const mSlider = useIsMobile();
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: mSlider ? 280 : 560, background: '#0A0A12', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Image/Video area */}
      <div style={{ flex: 1, position: 'relative', overflow: 'hidden' }}>
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={index}
            custom={dir}
            initial={{ opacity: 0, x: dir * 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: dir * -40 }}
            transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
            style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          >
            {gallery[index].video ? (
              <iframe
                src={gallery[index].video}
                style={{ width: '100%', height: '100%', border: 'none' }}
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={gallery[index].caption}
              />
            ) : (
              <img
                src={gallery[index].src}
                alt={gallery[index].caption}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'contain', background: '#0A0A12', cursor: 'zoom-in' }}
                onClick={() => setLightbox(index)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Gradient overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 10,
          background: 'linear-gradient(180deg, rgba(7,7,13,0.88) 0%, rgba(7,7,13,0.25) 38%, rgba(7,7,13,0.04) 62%, rgba(7,7,13,0.75) 100%)',
        }} />

        {/* Top: label + accent line + title */}
        {(projectTitle || gallery[index].title) && (
          <div style={{ position: 'absolute', top: 0, left: 0, padding: '24px 28px', pointerEvents: 'none', zIndex: 11 }}>
            {projectTitle && (
              <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 10, letterSpacing: 4, color: `${accent ?? '#7CF0EA'}90`, textTransform: 'uppercase', margin: '0 0 8px' }}>
                {projectTitle}
              </p>
            )}
            <div style={{ width: 120, height: 2, background: `linear-gradient(90deg, ${accent ?? '#7CF0EA'} 0%, rgba(237,237,234,0.15) 100%)`, marginBottom: 12 }} />
            {gallery[index].title && (
              <p style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 20, letterSpacing: '-0.5px', color: '#EDEDEA', margin: 0, lineHeight: 1.1 }}>
                {gallery[index].title}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Bottom bar — caption + controls */}
      <div style={{
        background: 'rgba(7,7,13,0.92)',
        borderTop: '1px solid rgba(237,237,234,0.07)',
        padding: '14px 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        flexShrink: 0,
      }}>
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: 'rgba(237,237,234,0.45)', flex: 1 }}>
          {gallery[index].caption}
        </p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
          {/* Dots */}
          {gallery.length > 1 && (
            <div style={{ display: 'flex', gap: 5 }}>
              {gallery.map((_, i) => (
                <button
                  key={i}
                  onClick={() => go(i)}
                  style={{
                    width: i === index ? 16 : 6,
                    height: 6,
                    borderRadius: 3,
                    background: i === index
                      ? 'linear-gradient(90deg, #7CF0EA, #B8C0FF)'
                      : 'rgba(237,237,234,0.2)',
                    border: 'none',
                    cursor: 'pointer',
                    padding: 0,
                    transition: 'all 0.2s',
                  }}
                />
              ))}
            </div>
          )}

          {/* Arrows */}
          {gallery.length > 1 && (
            <div style={{ display: 'flex', gap: 4 }}>
              <button
                onClick={() => go((index - 1 + gallery.length) % gallery.length)}
                style={{ background: 'none', border: '1px solid rgba(237,237,234,0.15)', color: 'rgba(237,237,234,0.5)', width: 28, height: 28, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >←</button>
              <button
                onClick={() => go((index + 1) % gallery.length)}
                style={{ background: 'none', border: '1px solid rgba(237,237,234,0.15)', color: 'rgba(237,237,234,0.5)', width: 28, height: 28, cursor: 'pointer', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              >→</button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence>
        {lightbox !== null && gallery[lightbox].src && (
          <Lightbox
            src={gallery[lightbox].src!}
            caption={gallery[lightbox].caption}
            onClose={() => setLightbox(null)}
            onPrev={() => {
              const prev = gallery.slice(0, lightbox).map((_, i) => i).filter(i => gallery[i].src).pop();
              if (prev !== undefined) setLightbox(prev);
            }}
            onNext={() => {
              const next = gallery.slice(lightbox + 1).findIndex(i => i.src);
              if (next !== -1) setLightbox(lightbox + 1 + next);
            }}
            hasPrev={gallery.slice(0, lightbox).some(i => i.src)}
            hasNext={gallery.slice(lightbox + 1).some(i => i.src)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}


export default function Systems() {
  const m = useIsMobile();
  const px = m ? '20px' : '80px';
  const sectionPad = m ? '56px 20px' : '96px 80px';
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <SEO
        title="UX Design - Drahoslava"
        description="UX audits, conversion design, interaction design. See how I find what breaks and fix what matters."
        url="/design"
      />
    <div style={{ background: '#07070D', minHeight: '100vh', color: '#EDEDEA' }}>

      {/* ─── NAV ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          padding: `0 ${px}`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: 'rgba(7,7,13,0.9)',
          backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(237,237,234,0.07)',
        }}
      >
        <a
          href="/"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
        >
          <span style={{
            fontFamily: 'Unbounded, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '-0.5px',
            color: '#EDEDEA',
          }}>
            DRAHOSLAVA
          </span>
        </a>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {!m && ['Work', 'Approach', 'About'].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: 'Urbanist, sans-serif',
                fontWeight: 500,
                fontSize: 14,
                color: 'rgba(237,237,234,0.4)',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EDEDEA')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,237,234,0.4)')}
            >
              {item}
            </a>
          ))}
          {!m && (
            <a href="#contact" className="btn-prismatic" style={{ marginLeft: 8 }}>
              Get in touch
            </a>
          )}
          {m && (
            <button
              onClick={() => setMenuOpen(o => !o)}
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                display: 'flex', flexDirection: 'column', gap: 5,
                padding: 8,
              }}
              aria-label="Menu"
            >
              <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'rgba(237,237,234,0.6)' : '#EDEDEA', transition: 'transform 0.2s, opacity 0.2s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
              <span style={{ display: 'block', width: 22, height: 2, background: '#EDEDEA', transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
              <span style={{ display: 'block', width: 22, height: 2, background: menuOpen ? 'rgba(237,237,234,0.6)' : '#EDEDEA', transition: 'transform 0.2s, opacity 0.2s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
            </button>
          )}
        </div>

        {/* Mobile dropdown */}
        <AnimatePresence>
          {m && menuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute', top: 72, left: 0, right: 0,
                background: 'rgba(7,7,13,0.97)',
                backdropFilter: 'blur(12px)',
                borderBottom: '1px solid rgba(237,237,234,0.07)',
                display: 'flex', flexDirection: 'column',
                padding: '8px 0 16px',
              }}
            >
              {['Work', 'Approach', 'About'].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  onClick={() => setMenuOpen(false)}
                  style={{
                    fontFamily: 'Urbanist, sans-serif', fontWeight: 400,
                    fontSize: 16, color: 'rgba(237,237,234,0.6)',
                    textDecoration: 'none', padding: '14px 20px',
                    borderBottom: '1px solid rgba(237,237,234,0.05)',
                  }}
                >
                  {item}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: 'Urbanist, sans-serif', fontWeight: 500,
                  fontSize: 16, color: '#EDEDEA',
                  textDecoration: 'none', padding: '14px 20px',
                }}
              >
                Contact
              </a>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        style={{
          height: m ? 'calc(100svh - 72px)' : '100vh',
          minHeight: m ? 480 : 700,
          position: 'relative',
          marginTop: 72,
          overflow: 'hidden',
        }}
      >
        {/* Full-bleed photo — desktop only */}
        {!m && (
          <img
            src="/hub-previews/wuah1.png"
            alt="Drahoslava"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: '50% 24%',
            }}
          />
        )}

        {/* Dark gradient overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: m
            ? 'linear-gradient(180deg, rgba(7,7,13,0.7) 0%, rgba(7,7,13,0.85) 100%)'
            : 'linear-gradient(90deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.6) 50%, rgba(7,7,13,0.1) 100%)',
        }} />

        {/* Text content */}
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          style={{
            position: 'relative',
            zIndex: 2,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: m ? 'flex-end' : 'center',
            padding: m ? '0 20px 48px' : '0 80px',
            maxWidth: m ? '100%' : 720,
          }}
        >
          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 400,
              fontSize: 11,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'rgba(237,237,234,0.45)',
              marginBottom: 28,
            }}
          >
            UX DESIGNER · PRODUCT CLARITY
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(40px, 4.5vw, 72px)',
              letterSpacing: '-2px',
              lineHeight: 1.0,
              color: '#EDEDEA',
              marginBottom: 24,
            }}
          >
            I design products people understand - and use.
          </motion.h1>

          <motion.div variants={fadeUp}>
            <PrismaticLine width={200} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 18,
              lineHeight: 1.65,
              color: 'rgba(237,237,234,0.65)',
              marginTop: 20,
              maxWidth: 460,
            }}
          >
            UX designer for clarity, structure, and decision-making.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: 16, marginTop: 40, flexWrap: 'wrap' }}
          >
            <a href="#work" className="btn-primary">View case studies</a>
            <a href="#approach" className="btn-outline">See how I think</a>
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: 2,
              color: 'rgba(237,237,234,0.25)',
              marginTop: 20,
            }}
          >
            Focus: onboarding, conversion flows, product clarity
          </motion.p>
        </motion.div>
      </section>

      {/* ─── SERVICES ─── */}
      <section
        id="services"
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          padding: sectionPad,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              flexDirection: m ? 'column' : 'row',
              justifyContent: 'space-between',
              alignItems: m ? 'flex-start' : 'flex-end',
              gap: m ? 8 : 0,
              marginBottom: 48,
            }}
          >
            <span className="section-label">What I do</span>
            {!m && <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 15, color: 'rgba(237,237,234,0.35)' }}>
              Every product is a system of decisions.
            </span>}
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                style={{
                  background: i % 2 === 0 ? '#0C0C14' : '#07070D',
                  padding: m ? '32px 24px' : '48px 40px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 20,
                }}
              >
                <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 3, color: 'rgba(237,237,234,0.2)' }}>
                  {s.num}
                </span>
                <h3
                  style={{
                    fontFamily: 'Unbounded, sans-serif',
                    fontWeight: 600,
                    fontSize: 22,
                    letterSpacing: '-0.5px',
                    lineHeight: 1.15,
                    color: '#EDEDEA',
                    whiteSpace: 'pre-line',
                  }}
                >
                  {s.title}
                </h3>
                <PrismaticLine width={40} />
                <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 15, lineHeight: 1.65, color: 'rgba(237,237,234,0.45)', maxWidth: 260 }}>
                  {s.body}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── WORK ─── */}
      <section
        id="work"
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          padding: sectionPad,
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.div
            variants={fadeUp}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              marginBottom: 40,
            }}
          >
            <span className="section-label">Selected systems</span>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {WORK.map((w, i) => (
              <motion.div
                key={w.title}
                variants={fadeUp}
                style={{ borderTop: '1px solid rgba(237,237,234,0.07)', paddingTop: m ? 40 : 56, paddingBottom: m ? 56 : 80 }}
              >
                {/* Header */}
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
                  <div>
                    <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 10, letterSpacing: 3, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 10 }}>
                      0{i + 1}
                    </p>
                    <h3 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: m ? 28 : 42, letterSpacing: '-1.5px', lineHeight: 1, margin: 0, color: '#EDEDEA' }}>
                      {w.title}
                    </h3>
                  </div>
                  <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 2, color: '#7CF0EA', textTransform: 'uppercase', marginTop: m ? 0 : 10 }}>
                    {w.tags}
                  </p>
                </div>

                {/* Full-width gallery */}
                {w.gallery.length > 0 && (
                  <div style={{ marginBottom: 40, height: m ? 280 : 560 }}>
                    <GallerySlider gallery={w.gallery} projectTitle={w.title} accent="#7CF0EA" />
                  </div>
                )}

                {/* 3-col text */}
                <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: m ? 28 : 48 }}>
                  {[
                    { label: 'Problem', val: w.problem },
                    { label: 'Intervention', val: w.intervention },
                    { label: 'Outcome', val: w.outcome },
                  ].map((row) => (
                    <div key={row.label}>
                      <p style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: '#7CF0EA', marginBottom: 12 }}>
                        {row.label}
                      </p>
                      <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18, lineHeight: 1.8, color: 'rgba(237,237,234,0.65)', whiteSpace: 'pre-line' }}>
                        {row.val}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}

          </div>
        </motion.div>
      </section>

      {/* ─── APPROACH ─── */}
      <section
        id="approach"
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          position: 'relative',
          minHeight: m ? 'auto' : 700,
          overflow: 'hidden',
          background: m ? '#07070D' : 'transparent',
        }}
      >
        {/* Full-bleed photo — desktop only */}
        {!m && (
          <img
            src="/diagram.jpg"
            alt="Drahoslava - approach diagram"
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
          />
        )}

        {/* Dark overlay — desktop only */}
        {!m && (
          <div style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, rgba(7,7,13,0.15) 0%, rgba(7,7,13,0.75) 55%, rgba(7,7,13,0.92) 100%)',
          }} />
        )}

        {/* Text overlay */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: m ? '100%' : 480,
            marginLeft: m ? 0 : 'auto',
            padding: m ? '56px 20px' : '120px 80px',
          }}
        >
          <motion.span variants={fadeUp} className="section-label">Approach</motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(26px, 2.8vw, 40px)',
              letterSpacing: '-1px',
              lineHeight: 1.08,
              color: '#EDEDEA',
              margin: '20px 0 48px',
            }}
          >
            How I approach<br />product problems
          </motion.h2>

          {[
            {
              num: '01',
              title: 'Understand',
              body: 'Identify where users lose clarity and drop off.',
            },
            {
              num: '02',
              title: 'Structure',
              body: 'Design flows, hierarchy, and decision points.',
            },
            {
              num: '03',
              title: 'Validate',
              body: 'Test what works - remove what doesn\'t.',
            },
          ].map((block) => (
            <motion.div
              key={block.num}
              variants={fadeUp}
              style={{
                display: 'flex',
                gap: 24,
                marginBottom: 36,
              }}
            >
              <span style={{
                fontFamily: 'Urbanist, sans-serif',
                fontWeight: 300,
                fontSize: 11,
                letterSpacing: 2,
                color: 'rgba(237,237,234,0.2)',
                flexShrink: 0,
                paddingTop: 3,
              }}>
                {block.num}
              </span>
              <div>
                <p style={{
                  fontFamily: 'Unbounded, sans-serif',
                  fontWeight: 600,
                  fontSize: 14,
                  letterSpacing: '-0.3px',
                  color: '#EDEDEA',
                  marginBottom: 8,
                }}>
                  {block.title}
                </p>
                <p style={{
                  fontFamily: 'Urbanist, sans-serif',
                  fontWeight: 300,
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: 'rgba(237,237,234,0.45)',
                }}>
                  {block.body}
                </p>
              </div>
            </motion.div>
          ))}

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 12,
              letterSpacing: 3,
              textTransform: 'uppercase',
              color: 'rgba(237,237,234,0.2)',
              marginTop: 8,
            }}
          >
            Clarity &nbsp;→&nbsp; Decision &nbsp;→&nbsp; Action
          </motion.p>
        </motion.div>

      </section>

      {/* ─── ABOUT ─── */}
      <section
        id="about"
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          background: '#0A0A12',
          padding: sectionPad,
          display: 'grid',
          gridTemplateColumns: m ? '1fr' : '1fr 1fr',
          gap: m ? 40 : 80,
          alignItems: 'start',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="section-label">About</motion.span>

          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 600,
              fontSize: 'clamp(28px, 3vw, 40px)',
              letterSpacing: '-1px',
              lineHeight: 1.1,
              color: '#EDEDEA',
              margin: '20px 0 20px',
            }}
          >
            I design clarity into<br />complex products.
          </motion.h2>

          <motion.div variants={fadeUp}>
            <PrismaticLine width={48} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.7,
              color: 'rgba(237,237,234,0.5)',
              marginTop: 20,
              maxWidth: 500,
            }}
          >
            I use psychology, systems thinking, and design to make products easier to understand and use.
            <br /><br />
            I focus on how users perceive structure, make decisions, and act - not just how things look.
          </motion.p>
        </motion.div>

        {/* Credentials */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          style={{ display: 'flex', flexDirection: 'column', paddingTop: 4 }}
        >
          {[
            { label: 'Expertise', value: 'UX Design · Product Thinking · Interaction Design' },
            { label: 'Focus', value: 'Clarity · Structure · Conversion' },
            { label: 'Background', value: 'Psychology · Systems · Design' },
            { label: 'Location', value: 'Remote · Worldwide' },
          ].map((row) => (
            <motion.div key={row.label} variants={fadeUp}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '22px 0',
                }}
              >
                <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.3)' }}>
                  {row.label}
                </span>
                <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 13, color: '#EDEDEA' }}>
                  {row.value}
                </span>
              </div>
              <div style={{ height: 1, background: 'rgba(237,237,234,0.06)' }} />
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ─── IS THIS FOR YOU ─── */}
      <section style={{ borderTop: '1px solid rgba(237,237,234,0.07)', padding: m ? '56px 20px' : '96px 80px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 32 }}>
            Is this for you?
          </motion.p>
          <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr', gap: m ? 16 : 20, maxWidth: 800 }}>
            {[
              'Your product is built but users don\'t get it on first click.',
              'Your funnel has leaks nobody has mapped yet.',
              'You need UX that converts, not just looks good.',
              'You\'re a founder or team who can articulate the problem.',
            ].map((line, i) => (
              <motion.div key={i} variants={fadeUp} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                <span style={{ color: '#7CF0EA', fontFamily: 'Urbanist', fontSize: 16, lineHeight: 1.6, flexShrink: 0 }}>-</span>
                <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: m ? 15 : 17, lineHeight: 1.65, color: 'rgba(237,237,234,0.65)', margin: 0 }}>{line}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── CTA ─── */}
      <section
        id="contact"
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          padding: m ? '64px 20px' : '120px 80px',
          background: '#07070D',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.h2
            variants={fadeUp}
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-2px',
              lineHeight: 0.95,
              color: '#EDEDEA',
              maxWidth: 900,
              marginBottom: 20,
            }}
          >
            Looking for a<br />UX designer?
          </motion.h2>

          <motion.div variants={fadeUp}>
            <PrismaticLine width={320} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 19,
              color: 'rgba(237,237,234,0.4)',
              margin: '24px 0 48px',
              maxWidth: 600,
            }}
          >
            I design clear, usable products.<br />Let's make yours work.
          </motion.p>

          <motion.div variants={fadeUp} style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : 'repeat(3, 1fr)', gap: m ? 20 : 32, maxWidth: 680, marginBottom: 48 }}>
            {[
              { n: '01', label: 'You send a message', sub: 'Tell me about the product and the problem.' },
              { n: '02', label: 'We have a 30-min call', sub: 'No forms. Just a conversation about fit.' },
              { n: '03', label: 'You get a proposal', sub: 'Scope, timeline, and what you can expect.' },
            ].map(s => (
              <div key={s.n}>
                <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 3, color: '#7CF0EA', textTransform: 'uppercase', margin: '0 0 8px' }}>{s.n}</p>
                <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 15, color: '#EDEDEA', margin: '0 0 6px' }}>{s.label}</p>
                <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 14, color: 'rgba(237,237,234,0.4)', margin: 0, lineHeight: 1.5 }}>{s.sub}</p>
              </div>
            ))}
          </motion.div>

          <motion.div variants={fadeUp}>
            <QuickContactForm accent="#7CF0EA" />
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          padding: m ? '0 20px' : `0 ${px}`,
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'Unbounded', fontWeight: 700, fontSize: 13, letterSpacing: '-0.3px', color: 'rgba(237,237,234,0.25)' }}>DRAHOSLAVA</span>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: 'rgba(237,237,234,0.18)' }}>© 2026 · drahoslava.com</span>
      </footer>

    </div>
    </>
  );
}
