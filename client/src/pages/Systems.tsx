import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

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
    title: 'WebTrigo',
    tags: 'UX Audit · Conversion Design · Interaction Design',
    context: 'Redesign of a conversion-critical flow in a cold-email-driven product.',
    problem: '35% email CTR collapsed to 1.5% purchase conversion.\nKey decision elements (pricing, trust, social proof) were hidden in a bottom-right widget - a known UI blind spot.\nMost users never saw a single conversion element.',
    intervention: 'Re-architected the layout to surface trust signals and decision elements on initial load.\nRemoved dependency on widget interaction.\nDesigned a flow aligned with user attention and decision points.\nWorked within an existing layout and could not remove the widget entirely - redefined its role instead.',
    outcome: 'Made all key actions visible without interaction.\nAligned the flow with user attention instead of UI constraints.\nCreated a structure ready for testing and measurable improvement.',
    gallery: [
      { src: '/N4hu5.jpeg', caption: 'Before - all conversion elements hidden in a bottom-right widget' },
      { src: '/hCd1D.jpeg', caption: 'After - trust signals and CTA visible on page load' },
      { src: '/5FTm5.jpeg', caption: 'Mobile - bottom sheet pattern, same psychological sequence' },
    ],
  },
  {
    title: 'Polystate',
    tags: 'UX Design · Information Architecture · Content Systems',
    context: 'Content-heavy SaaS platform for global mobility - tax residency, company formation, and international banking.',
    problem: 'Users could not identify value or what to do next.\nContent had no hierarchy - every screen competed for attention.',
    intervention: 'Introduced a consistent information hierarchy across all touchpoints.\nStructured content flows: problem → evidence → action.\nCreated a repeatable structure that scales across screens and formats.',
    outcome: 'Reduced cognitive load and made key decisions immediately visible.\nUsers no longer needed to read everything to understand what matters.\nApplied across product, website, and social - ensuring consistent user understanding.',
    gallery: [
      { src: '/p8opA.jpeg', caption: 'Social media system - full overview' },
      { src: '/GTDVl.jpeg', caption: 'Carousel series - information hierarchy in action' },
      { src: '/IVrx3.jpeg', caption: 'Full slide archive - 40+ slides across 5 series' },
      { video: 'https://player.vimeo.com/video/1174984453', caption: 'Launch Party Film' },
    ],
  },
  {
    title: 'Lights of Tantra',
    tags: 'UX Strategy · User Perception · Content Design',
    context: 'Communication redesign for a somatic practitioner whose product experience was not connecting with the right users.',
    problem: 'Users did not recognize themselves in the experience.\nMessaging reflected the practitioner, not the user\'s problem.',
    intervention: 'Analyzed the full user-facing experience - website and social. Restructured communication around specific user pain states instead of practitioner identity. Defined a clear content flow: recognition → understanding → action.',
    outcome: 'Users immediately recognize relevance and what to do next.',
    gallery: [
      { src: '/1DRrR.jpeg', caption: 'Brand kit - content system overview' },
      { src: '/KoTER.jpeg', caption: 'Carousel series detail' },
      { src: '/kKX0r.jpeg', caption: 'Content templates and structure' },
      { src: '/RY1IF.jpeg', caption: 'Content system - carousels, guide, and promo across formats' },
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

type GalleryItem = { src?: string; video?: string; caption: string; contain?: boolean };

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

function GallerySlider({ gallery }: { gallery: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
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
                style={{ width: '100%', height: '100%', objectFit: 'cover', cursor: 'zoom-in' }}
                onClick={() => setLightbox(index)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.opacity = '0'; }}
              />
            )}
          </motion.div>
        </AnimatePresence>
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

  return (
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
          href="#hero"
          style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}
        >
          <img
            src="/logo-mark.jpg"
            alt="Drahoslava"
            style={{
              width: 32,
              height: 32,
              borderRadius: '50%',
              objectFit: 'cover',
            }}
          />
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

        <div style={{ display: 'flex', alignItems: 'center', gap: m ? 16 : 32 }}>
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
          <a
            href="#contact"
            className="btn-prismatic"
            style={{ marginLeft: m ? 0 : 8 }}
          >
            {m ? 'Contact' : 'Get in touch'}
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        style={{
          height: '100vh',
          minHeight: 700,
          position: 'relative',
          marginTop: 72,
          overflow: 'hidden',
        }}
      >
        {/* Full-bleed photo */}
        <img
          src="/hero-photo.jpg"
          alt="Drahoslava"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: m ? '65% 20%' : 'center center',
          }}
        />

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

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {WORK.map((w, i) => (
              <div key={w.title}>
              <motion.div
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: m ? '1fr' : (i % 2 === 0 ? '45% 55%' : '55% 45%'),
                  background: '#0C0C14',
                  minHeight: m ? 'auto' : 560,
                  alignItems: 'stretch',
                }}
              >
                {/* Image — on mobile always on top */}
                {(m || i % 2 !== 0) && (
                  <div style={{ background: '#0A0A12', overflow: 'hidden', order: m ? 1 : 2, alignSelf: 'stretch', minHeight: m ? 260 : 'auto' }}>
                    <GallerySlider gallery={w.gallery} />
                  </div>
                )}

                {/* Content panel */}
                <div
                  style={{
                    padding: m ? '32px 24px' : '56px 64px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 0,
                    order: m ? 2 : (i % 2 !== 0 ? 1 : 2),
                  }}
                >
                  <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: 'rgba(237,237,234,0.25)', marginBottom: 20 }}>
                    {w.tags}
                  </p>
                  <h3
                    style={{
                      fontFamily: 'Unbounded, sans-serif',
                      fontWeight: 700,
                      fontSize: 'clamp(24px, 2.2vw, 36px)',
                      letterSpacing: '-1px',
                      lineHeight: 1.05,
                      color: '#EDEDEA',
                      marginBottom: 16,
                    }}
                  >
                    {w.title}
                  </h3>
                  <PrismaticLine width={32} />
                  <p
                    style={{
                      fontFamily: 'Urbanist, sans-serif',
                      fontWeight: 300,
                      fontSize: 14,
                      lineHeight: 1.6,
                      color: 'rgba(237,237,234,0.45)',
                      margin: '20px 0 32px',
                    }}
                  >
                    {w.context}
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                    {[
                      { label: 'Problem', val: w.problem },
                      { label: 'Intervention', val: w.intervention },
                      { label: 'Outcome', val: w.outcome },
                    ].map((row) => (
                      <div key={row.label} style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                        <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: 'rgba(237,237,234,0.35)' }}>
                          {row.label}
                        </span>
                        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 14, color: 'rgba(237,237,234,0.55)', lineHeight: 1.6, whiteSpace: 'pre-line' }}>
                          {row.val}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Image — left side for even items (desktop only) */}
                {!m && i % 2 === 0 && (
                  <div style={{ background: '#0A0A12', overflow: 'hidden', order: 1, alignSelf: 'stretch' }}>
                    <GallerySlider gallery={w.gallery} />
                  </div>
                )}
              </motion.div>

              </div>
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
              margin: '24px 0 40px',
              maxWidth: 600,
            }}
          >
            I design clear, usable products.<br />Let's make yours work.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a href="mailto:info@drahoslava.com" className="btn-primary" style={{ fontSize: 15, letterSpacing: 1 }}>
              Contact me
            </a>
          </motion.div>
        </motion.div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          padding: m ? '20px' : `0 ${px}`,
          minHeight: 72,
          display: 'flex',
          flexDirection: m ? 'column' : 'row',
          alignItems: m ? 'flex-start' : 'center',
          justifyContent: 'space-between',
          gap: m ? 12 : 0,
        }}
      >
        <span style={{ fontFamily: 'Unbounded', fontWeight: 700, fontSize: 13, letterSpacing: '-0.3px', color: 'rgba(237,237,234,0.3)' }}>
          DRAHOSLAVA
        </span>
        <a
          href="mailto:info@drahoslava.com"
          style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.4)', textDecoration: 'none', letterSpacing: 0.3 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#EDEDEA')}
          onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,237,234,0.4)')}
        >
          info@drahoslava.com
        </a>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: 'rgba(237,237,234,0.18)' }}>
          © 2026 · drahoslava.com
        </span>
      </footer>

    </div>
  );
}
