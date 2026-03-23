import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';

const WORK = [
  {
    title: 'Tina Koestler',
    tags: 'Brand Identity · Visual Direction · Brand Kit',
    context: 'Somatic practitioner launching an independent practice. Needed a brand identity that felt as intentional as her work.',
    problem: 'No visual identity, no brand direction.\nExisting communication reflected the practitioner, not the client\'s world.\nNeeded a brand that could hold the weight of a sensitive, embodied practice without looking generic or spiritual-cliché.',
    intervention: 'Built the full brand identity from scratch: visual direction, color system, typography, and brand kit.\nAnchored the brand in the client\'s felt experience, not practitioner credentials.\nDelivered a system ready to apply across website, social, and print.',
    outcome: 'Brand identity locked with clear visual language.\nClient had a system, not just a logo, to work from.\nAll touchpoints now speak with the same voice.',
    testimonial: 'Working with Drahoslava was one of the best investments I have made for my business this year. She really listened, asked the right questions, and then came back with ideas and a detailed audit that exceeded my expectations. The result is a brand kit that 100% looks and feels like me and I no longer dread the creation process for social media because everything is already done beautifully. I just use the templates and go which saves me hours. Lastly, and most importantly, through her work I gained confidence and I am ready to show up fully and authentically on social media now. Thank you!',
    gallery: [
      { src: '/portfolio/tina/brand-kit.png', title: 'Brand Kit', caption: 'Visual identity and direction' },
      { src: '/portfolio/tina/overview.png', title: 'Brand System', caption: 'Applied across touchpoints' },
      { src: '/portfolio/tina/carousel-1.png', title: 'Visual Direction', caption: 'Content direction in use' },
      { src: '/portfolio/tina/templates.png', title: 'Templates', caption: 'Brand applied consistently' },
    ],
  },
  {
    title: 'DearDreams',
    tags: 'Brand Strategy · Visual Identity · Logo Design',
    context: 'Productivity and stationery brand for women: planners, journals, tools for getting your life together.',
    problem: 'Existing brand was cute, pastel, and daisy-coded.\nIt attracted girls, not women.\nThe energy was right ("sis, dump him") but the visual language was too soft to hold it.\nClient wanted: bold, cheeky, witty, unapologetic. Unforgettable on website open.',
    intervention: 'Full brand audit against client moodboard.\nIdentified 4 strategic pillars: typography as hero, humor + confidence, sophisticated feminine, product-first identity.\nDelivered two complete brand concepts:\nThe Soft Evolution: girl → woman, warmth maintained, confidence gained.\nThe Bold Transformation: "NOT PRETTY. POWERFULL." No apologies.\nBoth concepts included: color system, typography, logo variants, brand voice, social direction, and product mockups.',
    outcome: 'Two fully resolved brand identities. Not sketches.\nBrand voice locked: "sis, dump him." / "get your shit together." / "you deserve this."\nIdentity built to scale across planners, journals, bags, and digital.',
    gallery: [
      { src: '/portfolio/deardreams/concept-bold.png', title: 'The Bold Transformation', caption: '"NOT PRETTY. POWERFULL."' },
      { src: '/portfolio/deardreams/concept-bold-full.png', title: 'Bold Direction', caption: 'Full brand concept', objectPosition: 'top' },
      { src: '/portfolio/deardreams/concept-soft-full.png', title: 'The Soft Evolution', caption: 'Girl to woman', objectPosition: 'top' },
      { src: '/portfolio/deardreams/before-brand.png', title: 'Before', caption: 'Cute, pastel, daisy-coded' },
      { src: '/portfolio/deardreams/audit-strategy.png', title: 'Brand Audit', caption: 'Strategic direction: 4 pillars identified' },
      { src: '/portfolio/deardreams/brand-system.png', title: 'Brand System', caption: 'Color, typography, spacing, voice' },
    ],
  },
];

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

function GalleryCard({ item, workTitle, accent, height, compact, onClick }: {
  item: { src?: string; video?: string; caption: string; title?: string; contain?: boolean; objectPosition?: string };
  workTitle: string;
  accent: string;
  height: number;
  compact?: boolean;
  onClick?: () => void;
}) {
  if (item.video) {
    return (
      <div style={{ position: 'relative', width: '100%', height, borderRadius: compact ? 6 : 10, overflow: 'hidden', border: '1px solid rgba(237,237,234,0.06)' }}>
        <iframe src={item.video} style={{ width: '100%', height: '100%', border: 'none' }} allow="autoplay; fullscreen" title={item.caption} />
      </div>
    );
  }
  return (
    <div onClick={onClick} style={{
      position: 'relative', width: '100%', height,
      background: '#0f0f17', borderRadius: compact ? 6 : 10,
      overflow: 'hidden', cursor: onClick ? 'pointer' : 'default',
      border: compact ? '1px solid rgba(237,237,234,0.06)' : 'none',
    }}>
      <img src={item.src} alt={item.caption}
        loading="lazy"
        style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
      />
      {/* Gradient overlay */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(7,7,13,0.88) 0%, rgba(7,7,13,0.28) 38%, rgba(7,7,13,0.04) 62%, rgba(7,7,13,0.82) 100%)',
      }} />
      {/* Top: label + accent line + title */}
      {!compact && (
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '28px 36px', pointerEvents: 'none' }}>
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 10, letterSpacing: 4, color: `${accent}90`, textTransform: 'uppercase', margin: '0 0 8px' }}>
            {workTitle}
          </p>
          <div style={{ width: 120, height: 2, background: `linear-gradient(90deg, ${accent} 0%, rgba(237,237,234,0.15) 100%)`, marginBottom: 14 }} />
          {item.title && (
            <p style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 22, letterSpacing: '-0.5px', color: '#EDEDEA', margin: 0, lineHeight: 1.1 }}>
              {item.title}
            </p>
          )}
        </div>
      )}
      {/* Bottom bar */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0,
        height: compact ? 36 : 52,
        background: 'rgba(7,7,13,0.9)',
        borderTop: '1px solid rgba(237,237,234,0.06)',
        display: 'flex', alignItems: 'center',
        padding: compact ? '0 14px' : '0 36px',
      }}>
        <p style={{ fontFamily: 'Urbanist', fontWeight: compact ? 500 : 300, fontSize: compact ? 11 : 12, color: compact ? 'rgba(237,237,234,0.55)' : 'rgba(237,237,234,0.4)', margin: 0, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {compact && item.title ? item.title : item.caption}
        </p>
      </div>
    </div>
  );
}

function Lightbox({ src, caption, onClose, onPrev, onNext, hasPrev, hasNext }: {
  src: string; caption: string; onClose: () => void;
  onPrev: () => void; onNext: () => void; hasPrev: boolean; hasNext: boolean;
}) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft' && hasPrev) onPrev();
      if (e.key === 'ArrowRight' && hasNext) onNext();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      style={{ position: 'fixed', inset: 0, background: 'rgba(7,7,13,0.95)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 20 }}
      onClick={onClose}
    >
      <img src={src} alt={caption} onClick={e => e.stopPropagation()}
        style={{ maxWidth: '88vw', maxHeight: '78vh', objectFit: 'contain', borderRadius: 8 }} />
      <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.45)', textAlign: 'center', maxWidth: 560 }}>{caption}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        {hasPrev && <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{ background: 'rgba(237,237,234,0.08)', border: '1px solid rgba(237,237,234,0.12)', color: '#EDEDEA', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontFamily: 'Urbanist', fontSize: 13 }}>←</button>}
        {hasNext && <button onClick={e => { e.stopPropagation(); onNext(); }} style={{ background: 'rgba(237,237,234,0.08)', border: '1px solid rgba(237,237,234,0.12)', color: '#EDEDEA', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontFamily: 'Urbanist', fontSize: 13 }}>→</button>}
      </div>
    </motion.div>
  );
}

function GalleryCarousel({ items, onOpenLightbox, m, workTitle, accent, height }: {
  items: { src?: string; video?: string; caption: string; title?: string }[];
  onOpenLightbox: (imgIdx: number) => void;
  m: boolean;
  workTitle: string;
  accent: string;
  height?: number;
}) {
  const [idx, setIdx] = useState(0);
  if (items.length === 0) return null;
  const item = items[idx];
  const imgItems = items.filter(g => g.src);

  const handleClick = () => {
    if (!item.src) return;
    const lbIdx = imgItems.findIndex(g => g.src === item.src);
    if (lbIdx !== -1) onOpenLightbox(lbIdx);
  };

  const btnStyle: React.CSSProperties = {
    position: 'absolute', top: '50%', transform: 'translateY(-50%)',
    background: 'rgba(7,7,13,0.75)', border: '1px solid rgba(237,237,234,0.14)',
    color: '#EDEDEA', borderRadius: 6, width: 36, height: 36,
    cursor: 'pointer', fontSize: 14, display: 'flex', alignItems: 'center', justifyContent: 'center',
    zIndex: 10,
  };

  return (
    <div>
      <div style={{ position: 'relative' }}>
        <GalleryCard
          item={item}
          workTitle={workTitle}
          accent={accent}
          height={height ?? (m ? 260 : 520)}
          onClick={item.src ? handleClick : undefined}
        />
        {idx > 0 && (
          <button style={{ ...btnStyle, left: 12 }} onClick={e => { e.stopPropagation(); setIdx(i => i - 1); }}>←</button>
        )}
        {idx < items.length - 1 && (
          <button style={{ ...btnStyle, right: 12 }} onClick={e => { e.stopPropagation(); setIdx(i => i + 1); }}>→</button>
        )}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, color: 'rgba(237,237,234,0.2)', letterSpacing: 1 }}>
          {idx + 1} / {items.length}
        </span>
      </div>
    </div>
  );
}

function WorkCard({ work, index, m, accent }: { work: (typeof WORK)[0]; index: number; m: boolean; accent: string }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const imgItems = work.gallery.filter(g => g.src);
  const openLightbox = useCallback((idx: number) => setLightbox(idx), []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      style={{ borderTop: '1px solid rgba(237,237,234,0.07)', paddingTop: m ? 40 : 56, paddingBottom: m ? 56 : 80 }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12, marginBottom: 40 }}>
        <div>
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 10, letterSpacing: 3, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 10 }}>
            0{index + 1}
          </p>
          <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: m ? 28 : 42, letterSpacing: '-1.5px', lineHeight: 1, margin: 0, color: '#EDEDEA' }}>
            {work.title}
          </h2>
        </div>
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 2, color: accent, textTransform: 'uppercase', marginTop: m ? 0 : 10 }}>
          {work.tags}
        </p>
      </div>

      {/* Gallery carousel — all items, hero position */}
      {work.gallery.length > 0 && (
        <div style={{ marginBottom: 40 }}>
          <GalleryCarousel
            items={work.gallery}
            onOpenLightbox={openLightbox}
            m={m}
            workTitle={work.title}
            accent={accent}
          />
        </div>
      )}

      {/* 3-col text */}
      <div style={{ display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr 1fr', gap: m ? 28 : 48, marginBottom: 0 }}>
        {[
          { label: 'Problem', text: work.problem },
          { label: 'Approach', text: work.intervention },
          { label: 'Outcome', text: work.outcome },
        ].map(({ label, text }) => (
          <div key={label}>
            <p style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: 10, letterSpacing: 3, textTransform: 'uppercase', color: accent, marginBottom: 12 }}>
              {label}
            </p>
            <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18, lineHeight: 1.8, color: 'rgba(237,237,234,0.65)', whiteSpace: 'pre-line' }}>
              {text}
            </p>
          </div>
        ))}
      </div>

      {work.testimonial && (
        <div style={{ marginTop: m ? 40 : 56, borderLeft: `2px solid ${accent}`, paddingLeft: m ? 20 : 32 }}>
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: m ? 17 : 20, lineHeight: 1.75, color: 'rgba(237,237,234,0.6)', fontStyle: 'italic', margin: '0 0 16px' }}>
            "{work.testimonial}"
          </p>
          <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 11, letterSpacing: 3, textTransform: 'uppercase', color: accent, margin: 0 }}>
            {work.title}
          </p>
        </div>
      )}

      <AnimatePresence>
        {lightbox !== null && imgItems[lightbox]?.src && (
          <Lightbox
            src={imgItems[lightbox].src!}
            caption={imgItems[lightbox].caption}
            onClose={() => setLightbox(null)}
            onPrev={() => setLightbox(i => (i! > 0 ? i! - 1 : i))}
            onNext={() => setLightbox(i => (i! < imgItems.length - 1 ? i! + 1 : i))}
            hasPrev={lightbox > 0}
            hasNext={lightbox < imgItems.length - 1}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function Branding() {
  const [, navigate] = useLocation();
  const m = useIsMobile();

  return (
    <div style={{ background: '#07070D', minHeight: '100vh', color: '#EDEDEA' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 72, padding: m ? '0 20px' : '0 80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(7,7,13,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(237,237,234,0.07)',
      }}>
        <button onClick={() => navigate('/')} style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '-0.5px', color: '#EDEDEA', background: 'none', border: 'none', cursor: 'pointer' }}>
          DRAHOSLAVA
        </button>
        {!m && (
          <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 3, color: 'rgba(237,237,234,0.2)', textTransform: 'uppercase' }}>
            Branding
          </span>
        )}
      </nav>

      <div style={{ paddingTop: 72 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ padding: m ? '60px 20px 40px' : '80px 80px 56px' }}
        >
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>
            02 Branding
          </p>
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: m ? 'clamp(36px, 10vw, 52px)' : 'clamp(48px, 6vw, 80px)', letterSpacing: '-2.5px', lineHeight: 0.95, marginBottom: 28, maxWidth: 800 }}>
            Make your work<br />understood.
          </h1>
          <div style={{ width: 120, height: 2, background: 'linear-gradient(90deg, #FFE680 0%, #FF9ECD 100%)', marginBottom: 28 }} />
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: m ? 16 : 20, lineHeight: 1.65, color: 'rgba(237,237,234,0.5)', maxWidth: 560 }}>
            Brand identity and visual systems for founders who know what they stand for and need the world to see it.
          </p>
        </motion.div>
      </div>

      <div style={{ padding: m ? '0 20px 80px' : '0 80px 120px' }}>
        {WORK.map((w, i) => (
          <WorkCard key={w.title} work={w} index={i} m={m} accent="#FFE680" />
        ))}
      </div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: '-60px' }}
        transition={{ duration: 0.6 }}
        style={{
          borderTop: '1px solid rgba(237,237,234,0.07)',
          padding: m ? '60px 20px 72px' : '80px 80px 100px',
        }}
      >
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>
          Work together
        </p>
        <h2 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: m ? 'clamp(28px, 8vw, 40px)' : 'clamp(36px, 4vw, 56px)', letterSpacing: '-2px', lineHeight: 1, marginBottom: 24, maxWidth: 640 }}>
          Your brand deserves<br />to be understood.
        </h2>
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: m ? 16 : 18, lineHeight: 1.7, color: 'rgba(237,237,234,0.45)', maxWidth: 480, marginBottom: 40 }}>
          Whether you are starting from scratch or rebuilding something that stopped working, get in touch and we will figure it out.
        </p>
        <a
          href="mailto:info@drahoslava.com"
          style={{
            display: 'inline-block',
            fontFamily: 'Urbanist', fontWeight: 500, fontSize: 14, letterSpacing: 1,
            color: '#07070D', background: '#FFE680',
            padding: '14px 32px', borderRadius: 4,
            textDecoration: 'none', textTransform: 'uppercase',
          }}
        >
          Get in touch
        </a>
      </motion.div>

      <footer style={{
        borderTop: '1px solid rgba(237,237,234,0.07)',
        padding: m ? '0 20px' : '0 80px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '-0.3px', color: 'rgba(237,237,234,0.25)' }}>DRAHOSLAVA</span>
        <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: 'rgba(237,237,234,0.18)' }}>© 2026 · drahoslava.com</span>
      </footer>
    </div>
  );
}
