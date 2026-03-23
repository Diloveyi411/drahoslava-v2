import { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';

import heroImage from '@assets/alternative_opt.jpg';
import commissionImage from '@assets/Dadi-art-148.jpg';
import gallery1 from '@assets/13b_1761189596670.webp';
import gallery2 from '@assets/Obraz 2_1761189596670.webp';
import gallery3 from '@assets/Screenshot 2025-10-23 at 00.04.50_1761189596671.webp';
import gallery4 from '@assets/Screenshot 2025-10-08 at 20.18.59_1761189596671.webp';
import profileImage from '@assets/commission_opt.jpg';

interface Artwork {
  id: number;
  image: string;
  title: string;
  medium: string;
  size: string;
  year: string;
}

const artworks: Artwork[] = [
  { id: 1, image: gallery1, title: 'Silent garden',    medium: 'Textured mixed media', size: '100×100cm', year: '2024' },
  { id: 2, image: gallery2, title: 'Field of presence', medium: 'Textured mixed media', size: '100×100cm', year: '2024' },
  { id: 3, image: gallery3, title: 'Between worlds',   medium: 'Textured mixed media', size: '100×100cm', year: '2025' },
  { id: 4, image: gallery4, title: 'Soft return',      medium: 'Textured mixed media', size: '100×100cm', year: '2025' },
];

const ART_ACCENT = 'linear-gradient(135deg, #F5A623 0%, #E8C97E 100%)';
const ART_COLOR  = '#F5A623';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.25, 0.1, 0.25, 1] } },
};
const stagger = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.08 } },
};

function useIsMobile() {
  const [mobile, setMobile] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const handler = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);
  return mobile;
}

function ArtLine({ width = 200 }: { width?: number }) {
  return <div style={{ width, height: 2, background: ART_ACCENT, flexShrink: 0 }} />;
}

const BRACKET = 18; // px length of each bracket arm
const BRACKET_W = 1.5; // px thickness

function FrameBrackets({ hovered }: { hovered: boolean }) {
  const color = hovered ? ART_COLOR : '#07070D';
  const corners = [
    { top: 0, left: 0,  borderTop: BRACKET_W, borderLeft: BRACKET_W  },
    { top: 0, right: 0, borderTop: BRACKET_W, borderRight: BRACKET_W },
    { bottom: 0, left: 0,  borderBottom: BRACKET_W, borderLeft: BRACKET_W  },
    { bottom: 0, right: 0, borderBottom: BRACKET_W, borderRight: BRACKET_W },
  ];
  return (
    <>
      {corners.map((c, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: BRACKET, height: BRACKET,
            ...Object.fromEntries(
              Object.entries(c).map(([k, v]) =>
                typeof v === 'number' && (k === 'borderTop' || k === 'borderBottom' || k === 'borderLeft' || k === 'borderRight')
                  ? [k, `${v}px solid ${color}`]
                  : [k, v]
              )
            ),
            transition: 'border-color 0.3s ease',
            pointerEvents: 'none',
          }}
        />
      ))}
    </>
  );
}

export default function Art() {
  const [, navigate] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const m = useIsMobile();

  const activeIndex = hoveredIndex;

  const closeLightbox  = () => setSelectedIndex(null);
  const goToPrev = () => selectedIndex !== null && setSelectedIndex((selectedIndex - 1 + artworks.length) % artworks.length);
  const goToNext = () => selectedIndex !== null && setSelectedIndex((selectedIndex + 1) % artworks.length);

  const L = {
    bg:      '#EDEDEA',
    surface: '#E5E2DC',
    surface2:'#F0EDE8',
    text:    '#07070D',
    t50:     'rgba(7,7,13,0.5)',
    t35:     'rgba(7,7,13,0.35)',
    t25:     'rgba(7,7,13,0.25)',
    t20:     'rgba(7,7,13,0.20)',
    border:  'rgba(7,7,13,0.08)',
  };

  return (
    <div style={{ background: L.bg, minHeight: '100vh', color: L.text }}>

      {/* ─── NAV ─── */}
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 72, padding: m ? '0 20px' : '0 80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(237,237,234,0.92)', backdropFilter: 'blur(12px)',
        borderBottom: `1px solid rgba(7,7,13,0.08)`,
      }}>
        <button
          onClick={() => navigate('/')}
          style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.5px', color: L.text, background: 'none', border: 'none', cursor: 'pointer' }}
        >
          DRAHOSLAVA
        </button>
        <div style={{ display: 'flex', alignItems: 'center', gap: m ? 16 : 32 }}>
          {!m && <a href="#gallery" style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 14, color: L.t50, textDecoration: 'none' }}>Gallery</a>}
          {!m && <a href="#about"   style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 14, color: L.t50, textDecoration: 'none' }}>About</a>}
          <a href="#commission" style={{
            fontFamily: 'Urbanist', fontWeight: 500, fontSize: m ? 12 : 13, color: L.text,
            padding: m ? '8px 16px' : '10px 24px', border: `1px solid ${ART_COLOR}88`,
            textDecoration: 'none', letterSpacing: 0.5,
            transition: 'border-color 0.2s',
          }}>Commission</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{ paddingTop: 72 }}>
        <div style={{ position: 'relative', height: m ? '55vh' : '68vh', overflow: 'hidden' }}>
          <img
            src={heroImage}
            alt=""
            fetchPriority="high"
            style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center 100%' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,7,13,0.45)', pointerEvents: 'none' }} />

          {/* Centred text */}
          <div style={{
            position: 'absolute', inset: 0,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 16, padding: '0 24px', textAlign: 'center',
          }}>
            <h1 style={{
              fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic',
              fontSize: m ? 'clamp(40px, 10vw, 56px)' : 'clamp(56px, 7vw, 88px)',
              letterSpacing: '-1px', lineHeight: 1.0,
              color: '#EDEDEA', margin: 0,
            }}>
              Art as a mirror.
            </h1>
            <p style={{
              fontFamily: 'Urbanist', fontWeight: 300,
              fontSize: m ? 14 : 17,
              letterSpacing: 0.3, lineHeight: 1.6,
              color: 'rgba(237,237,234,0.7)',
              maxWidth: 480, margin: 0,
            }}>
              Through painting, sculpting and touch, the body remembers what the mind forgets.
            </p>
          </div>
        </div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" style={{ padding: m ? '48px 20px 64px' : '80px 80px 96px', borderBottom: `1px solid ${L.border}` }}>

        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-60px' }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: m ? 40 : 64 }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: L.t25, textTransform: 'uppercase' }}>Collection 2024/2025</span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: L.t35 }}>{artworks.length} works</span>
          </motion.div>

          {/* Grid: 2 col desktop, 1 col mobile, centred */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: m ? '1fr' : 'repeat(2, minmax(0, 520px))',
            gap: m ? 40 : 48,
            justifyContent: 'center',
          }}>
            {artworks.map((art, i) => (
              <motion.div
                key={art.id}
                variants={fadeUp}
                onClick={() => setSelectedIndex(i)}
                style={{ cursor: 'pointer' }}
              >
                {/* Image */}
                <div style={{ position: 'relative', background: L.surface2, border: '1px solid rgba(7,7,13,0.85)', padding: 10 }}>
                  <div style={{ position: 'relative', overflow: 'hidden' }}>
                    <img
                      src={art.image}
                      alt={art.title}
                      style={{
                        width: '100%',
                        aspectRatio: '1/1',
                        objectFit: 'cover',
                        display: 'block',
                        transition: 'transform 0.6s ease',
                      }}
                      loading="lazy"
                      decoding="async"
                      onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.03)')}
                      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
                    />
                    <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,7,13,0.15)', pointerEvents: 'none' }} />
                  </div>
                </div>

                {/* Caption */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start',
                  paddingTop: 16,
                }}>
                  <div>
                    <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 22, color: L.text, margin: 0 }}>
                      {art.title}
                    </p>
                    <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: L.t35, marginTop: 4, letterSpacing: 0.5 }}>
                      {art.medium} · {art.size}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: L.t25, flexShrink: 0, paddingTop: 4 }}>
                    {art.year}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* ─── ABOUT ARTIST ─── */}
      <section id="about" style={{
        background: L.surface,
        padding: m ? '48px 20px' : '96px 80px',
        display: 'grid', gridTemplateColumns: m ? '1fr' : '1fr 1fr',
        gap: m ? 40 : 80, alignItems: 'center',
        borderBottom: `1px solid ${L.border}`,
      }}>
        {/* Text — first on mobile via order */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger} style={{ order: m ? 1 : 2 }}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: L.t25, textTransform: 'uppercase', marginBottom: 20 }}>
            The artist
          </motion.p>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 3.5vw, 48px)', letterSpacing: '-0.5px', lineHeight: 1.15,
            color: L.text, marginBottom: 20,
          }}>
            Painting as a way<br />of listening.
          </motion.h2>
          <motion.div variants={fadeUp}><ArtLine width={80} /></motion.div>

          {[
            'My background is in psychology. But long before I studied the mind, I understood that the body holds its own kind of knowing - one that bypasses language entirely.',
            'Textured floral painting became my way of accessing that knowledge. Each layer of paint, each petal built by hand, is a small act of attention - a way of slowing down enough to feel what is present.',
            'Every piece in this gallery was created as a commission - born from a conversation, shaped by someone\'s personality, their space, their energy. That is what I can continue doing for you.',
            'Beyond commissions, I run art sessions where I teach the basics of working with art clay and painting techniques - not as an exercise in skill, but as a way of reconnecting with your inner world and supporting self-discovery through creation.',
            'I also organise painting meditations - a space of complete presence, designed for absolute rest of the mind in a world that rarely slows down.',
            'If any of this speaks to you, write to me.',
          ].map((p, i) => (
            <motion.p key={i} variants={fadeUp} style={{
              fontFamily: 'Urbanist', fontWeight: 300, fontSize: 16,
              lineHeight: 1.75, color: L.t50,
              marginTop: 16,
            }}>
              {p}
            </motion.p>
          ))}
          <motion.a
            variants={fadeUp}
            href="mailto:info@drahoslava.com"
            style={{
              display: 'inline-flex', alignItems: 'center', marginTop: 32,
              padding: '13px 28px',
              background: L.text, color: L.bg,
              fontFamily: 'Urbanist', fontWeight: 600, fontSize: 14, letterSpacing: 0.5,
              textDecoration: 'none', transition: 'opacity 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Get in touch
          </motion.a>
        </motion.div>

        {/* Photo — second on mobile */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} style={{ order: m ? 2 : 1 }}>
          <div style={{ border: '1px solid rgba(7,7,13,0.85)', padding: 10, background: L.surface2 }}>
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              <img
                src={profileImage}
                alt="Drahoslava"
                loading="lazy"
                decoding="async"
                style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
              />
              <div style={{ position: 'absolute', inset: 0, background: 'rgba(7,7,13,0.18)', pointerEvents: 'none' }} />
            </div>
          </div>
        </motion.div>
      </section>


      {/* ─── COMMISSION ─── */}
      <section id="commission" style={{ padding: 0, overflow: 'hidden' }}>
        <div>
          {/* Text */}
          <div style={{ background: L.surface, padding: m ? '48px 24px' : '80px 80px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-1px', lineHeight: 0.95,
            color: L.text, marginBottom: 20,
          }}>
            Commission<br />a piece.
          </motion.h2>
          <motion.div variants={fadeUp}><ArtLine width={200} /></motion.div>
          <motion.p variants={fadeUp} style={{
            fontFamily: 'Urbanist', fontWeight: 300, fontSize: 17,
            color: L.t50, margin: '24px 0 40px', maxWidth: 440, lineHeight: 1.7,
          }}>
            Each commissioned piece is created as a personal collaboration, for your space, your energy, your story.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="mailto:info@drahoslava.com"
              style={{
                display: 'inline-flex', alignItems: 'center',
                padding: '13px 28px',
                background: L.text, color: L.bg,
                fontFamily: 'Urbanist', fontWeight: 600, fontSize: 14, letterSpacing: 0.5,
                textDecoration: 'none', transition: 'opacity 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '0.88')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              Get in touch
            </a>
            <button
              onClick={() => navigate('/')}
              style={{
                padding: '13px 28px', background: 'none',
                border: `1px solid ${L.border}`,
                color: L.t50,
                fontFamily: 'Urbanist', fontWeight: 400, fontSize: 14,
                cursor: 'pointer', transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(7,7,13,0.3)'; e.currentTarget.style.color = L.text; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = L.border; e.currentTarget.style.color = L.t50; }}
            >
              ← Back to hub
            </button>
          </motion.div>
        </motion.div>
          </div>

        </div>
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${L.border}`,
        padding: m ? '0 20px' : '0 80px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Unbounded', fontWeight: 700, fontSize: 13, letterSpacing: '-0.3px', color: L.t25 }}>DRAHOSLAVA</span>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: L.t20 }}>© 2026 · drahoslava.com</span>
      </footer>

      {/* ─── LIGHTBOX ─── */}
      <Dialog open={selectedIndex !== null} onOpenChange={closeLightbox}>
        <DialogPortal>
          <DialogOverlay style={{ background: 'rgba(7,7,13,0.92)', backdropFilter: 'blur(12px)' }} />
          <DialogPrimitive.Content
            className={cn(
              "fixed left-[50%] top-[50%] z-50 w-full max-w-5xl translate-x-[-50%] translate-y-[-50%] border-none outline-none bg-transparent p-0 shadow-none duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 focus:outline-none focus-visible:outline-none [&>button[type=button]]:hidden"
            )}
          >
            {selectedIndex !== null && (
              <>
                <VisuallyHidden>
                  <DialogTitle>{artworks[selectedIndex].title}</DialogTitle>
                </VisuallyHidden>

                {/* Close */}
                <button
                  onClick={closeLightbox}
                  style={{
                    position: 'fixed', top: 24, right: 24, zIndex: 100,
                    width: 44, height: 44, background: 'rgba(237,237,234,0.1)',
                    border: '1px solid rgba(237,237,234,0.2)',
                    color: '#EDEDEA', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    backdropFilter: 'blur(8px)',
                  }}
                >
                  <X size={18} />
                </button>

                <div style={{ position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', padding: '80px 40px 40px' }}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0, scale: 0.97 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      transition={{ duration: 0.3 }}
                      style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                    >
                      {/* Frame */}
                      <div style={{
                        background: '#F5F3EF',
                        border: '1px solid rgba(7,7,13,0.85)',
                        padding: m ? 12 : 20,
                        boxShadow: '0 32px 80px rgba(7,7,13,0.5)',
                        position: 'relative',
                      }}>
                        <img
                          src={artworks[selectedIndex].image}
                          alt={artworks[selectedIndex].title}
                          style={{
                            maxHeight: m ? '60vh' : '68vh',
                            maxWidth: m ? '80vw' : '65vw',
                            width: 'auto', height: 'auto', display: 'block',
                          }}
                        />

                        {/* Prev / Next */}
                        <button onClick={goToPrev} style={{ position: 'absolute', left: -52, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#EDEDEA', cursor: 'pointer', padding: '8px', opacity: 0.6, transition: 'opacity 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                        >
                          <ChevronLeft size={28} />
                        </button>
                        <button onClick={goToNext} style={{ position: 'absolute', right: -52, top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', color: '#EDEDEA', cursor: 'pointer', padding: '8px', opacity: 0.6, transition: 'opacity 0.2s' }}
                          onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                          onMouseLeave={e => (e.currentTarget.style.opacity = '0.6')}
                        >
                          <ChevronRight size={28} />
                        </button>
                      </div>

                      {/* Caption below frame */}
                      <div style={{ marginTop: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', width: '100%', maxWidth: m ? '80vw' : '65vw' }}>
                        <div>
                          <p style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 20, color: '#EDEDEA', margin: 0 }}>
                            {artworks[selectedIndex].title}
                          </p>
                          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: 'rgba(237,237,234,0.4)', marginTop: 4, letterSpacing: 0.5 }}>
                            {artworks[selectedIndex].medium} · {artworks[selectedIndex].size} · {artworks[selectedIndex].year}
                          </p>
                        </div>
                        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, color: 'rgba(237,237,234,0.25)', letterSpacing: 2 }}>
                          {selectedIndex + 1} / {artworks.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

    </div>
  );
}
