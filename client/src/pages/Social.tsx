import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '@/components/SEO';

const WORK = [
  {
    title: 'Polystate',
    tags: 'Content Strategy · Social Media · Video Editing',
    context: 'Content-heavy SaaS platform for global mobility: tax residency, company formation, and international banking.',
    problem: 'Complex product with no clear content hierarchy.\nUsers could not identify value or what to do next.\nEvery screen competed for attention equally.',
    intervention: 'Built a full content system from scratch.\nStructured all communication flows: problem → evidence → action.\nCreated 40+ slides across 5 carousel series for launch.\nDesigned LinkedIn covers, X posts, and IG carousels as a coherent system. Not one-off posts.\nEdited and produced launch video content.',
    outcome: 'Consistent visual and messaging language across all platforms.\nUsers no longer needed to read everything to understand what matters.\nLaunch content batch delivered and live across Buffer.',
    gallery: [
      { src: '/portfolio/polystate/slides.png', title: 'Posts Series', caption: '40+ slides across 5 series' },
      { src: '/portfolio/polystate/overview.png', title: 'Social Media System', caption: 'Full system overview' },
      { src: '/portfolio/polystate/carousel.png', title: 'Carousel Series', caption: 'Information hierarchy in action' },
      { src: '/portfolio/polystate/detail.png', title: 'Content Detail', caption: 'Structure and hierarchy' },
      { video: 'https://player.vimeo.com/video/1174984453', title: 'Launch Video', caption: 'Content in motion' },
    ],
  },
  {
    title: 'Tina Koestler',
    tags: 'Branding · Content Strategy · Library Organisation',
    context: 'Somatic practitioner launching an independent practice. Needed a brand identity, content system, and organised creative archive.',
    problem: 'No brand direction, no content structure, no organised archive.\nMessaging reflected the practitioner, not the user\'s problem.\n840 photos and 331 videos unorganised. Impossible to work with.',
    intervention: 'Built the full brand identity: visual direction, brand kit, content system.\nRenamed and organised 840 photos + 331 videos into a structured archive with guides and index.\nRestructured all communication around specific user pain states.\nDelivered 2 static posts, PDF guide, and a Figma video script for launch.',
    outcome: 'Brand identity locked and ready to scale.\nFull creative library accessible and searchable.\nUsers immediately recognise relevance and what to do next.',
    gallery: [
      { src: '/portfolio/tina/overview.png', title: 'Content System', caption: 'Full system overview' },
      { src: '/portfolio/tina/content-system.png', title: 'Full System', caption: 'Carousels, guide, and promo' },
      { src: '/portfolio/tina/brand-kit.png', title: 'Brand Kit', caption: 'Visual identity and direction' },
      { src: '/portfolio/tina/carousel-1.png', title: 'Carousels', caption: 'User-focused messaging' },
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

type GalleryItem = { src?: string; video?: string; caption: string; title?: string; contain?: boolean };

function GalleryCard({ item, workTitle, accent, height, compact, onClick }: {
  item: GalleryItem;
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
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'linear-gradient(180deg, rgba(7,7,13,0.88) 0%, rgba(7,7,13,0.28) 38%, rgba(7,7,13,0.04) 62%, rgba(7,7,13,0.82) 100%)',
      }} />
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

function GalleryCarousel({ items, allGallery, onOpenLightbox, m, workTitle, accent, height }: {
  items: GalleryItem[];
  allGallery: GalleryItem[];
  onOpenLightbox: (imgIdx: number) => void;
  m: boolean;
  workTitle: string;
  accent: string;
  height?: number;
}) {
  const [idx, setIdx] = useState(0);
  if (items.length === 0) return null;
  const item = items[idx];

  const handleClick = () => {
    if (!item.src) return;
    const imgItems = allGallery.filter(g => g.src);
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
    <div style={{ marginTop: 32 }}>
      <div style={{ position: 'relative' }}>
        <GalleryCard
          item={item}
          workTitle={workTitle}
          accent={accent}
          height={height ?? (m ? 200 : 380)}
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
      <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.45)', textAlign: 'center', maxWidth: 480 }}>{caption}</p>
      <div style={{ display: 'flex', gap: 16 }}>
        {hasPrev && <button onClick={e => { e.stopPropagation(); onPrev(); }} style={{ background: 'rgba(237,237,234,0.08)', border: '1px solid rgba(237,237,234,0.12)', color: '#EDEDEA', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontFamily: 'Urbanist', fontSize: 13 }}>←</button>}
        {hasNext && <button onClick={e => { e.stopPropagation(); onNext(); }} style={{ background: 'rgba(237,237,234,0.08)', border: '1px solid rgba(237,237,234,0.12)', color: '#EDEDEA', borderRadius: 6, padding: '8px 20px', cursor: 'pointer', fontFamily: 'Urbanist', fontSize: 13 }}>→</button>}
      </div>
    </motion.div>
  );
}

function WorkCard({ work, index, m }: { work: typeof WORK[0]; index: number; m: boolean }) {
  const [lightbox, setLightbox] = useState<number | null>(null);
  const imgItems = work.gallery.filter(g => g.src);
  const openLightbox = useCallback((idx: number) => setLightbox(idx), []);
  const accent = '#B8C0FF';

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
            allGallery={work.gallery}
            onOpenLightbox={setLightbox}
            m={m}
            workTitle={work.title}
            accent={accent}
            height={m ? 260 : 520}
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

export default function Social() {
  const [, navigate] = useLocation();
  const m = useIsMobile();

  return (
    <>
      <SEO
        title="Social Media — Drahoslava"
        description="Content strategy, social media design, and video editing. Systems that make posting consistent and on-brand."
        url="/social"
      />
    <div style={{ background: '#07070D', minHeight: '100vh', color: '#EDEDEA' }}>

      {/* Nav */}
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
            Social
          </span>
        )}
      </nav>

      {/* Hero */}
      <div style={{ paddingTop: 72 }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          style={{ padding: m ? '60px 20px 40px' : '80px 80px 56px' }}
        >
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>
            03 Social
          </p>
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: m ? 'clamp(36px, 10vw, 52px)' : 'clamp(48px, 6vw, 80px)', letterSpacing: '-2.5px', lineHeight: 0.95, marginBottom: 28, maxWidth: 800 }}>
            Turn ideas<br />into content.
          </h1>
          <div style={{ width: 120, height: 2, background: 'linear-gradient(90deg, #B8C0FF 0%, #7CF0EA 100%)', marginBottom: 28 }} />
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: m ? 16 : 20, lineHeight: 1.65, color: 'rgba(237,237,234,0.5)', maxWidth: 560 }}>
            Content systems, brand identity, and social strategy for brands that need to be understood. Consistently.
          </p>
        </motion.div>
      </div>

      {/* Work */}
      <div style={{ padding: m ? '0 20px 80px' : '0 80px 120px' }}>
        {WORK.map((w, i) => (
          <WorkCard key={w.title} work={w} index={i} m={m} />
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
          Content that works<br />every time.
        </h2>
        <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: m ? 16 : 18, lineHeight: 1.7, color: 'rgba(237,237,234,0.45)', maxWidth: 480, marginBottom: 40 }}>
          If your content is inconsistent, unclear, or not converting, there is a system missing. Let's build it.
        </p>
        <a
          href="mailto:info@drahoslava.com"
          style={{
            display: 'inline-block',
            fontFamily: 'Urbanist', fontWeight: 500, fontSize: 14, letterSpacing: 1,
            color: '#07070D', background: '#B8C0FF',
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
    </>
  );
}
