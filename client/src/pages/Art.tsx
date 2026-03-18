import { useState } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLocation } from 'wouter';
import { motion, AnimatePresence } from 'framer-motion';
import { Dialog, DialogPortal, DialogOverlay, DialogTitle } from '@/components/ui/dialog';
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { cn } from '@/lib/utils';

const heroImage = '/optimized/hero-desktop.webp';
import gallery1 from '@assets/13b_1761189596670.webp';
import gallery2 from '@assets/Obraz 2_1761189596670.webp';
import gallery3 from '@assets/Screenshot 2025-10-23 at 00.04.50_1761189596671.webp';
import gallery4 from '@assets/Screenshot 2025-10-08 at 20.18.59_1761189596671.webp';
import profileImage from '@assets/Dadi-art-11_1761189784462.webp';

interface Artwork {
  id: number;
  image: string;
  title: string;
  medium: string;
  size: string;
  year: string;
}

const artworks: Artwork[] = [
  { id: 1, image: gallery1, title: 'Silent Garden',    medium: 'Textured Mixed Media', size: '100×100cm', year: '2024' },
  { id: 2, image: gallery2, title: 'Field of Presence', medium: 'Textured Mixed Media', size: '100×100cm', year: '2024' },
  { id: 3, image: gallery3, title: 'Between Worlds',   medium: 'Textured Mixed Media', size: '100×100cm', year: '2025' },
  { id: 4, image: gallery4, title: 'Soft Return',      medium: 'Textured Mixed Media', size: '100×100cm', year: '2025' },
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

function ArtLine({ width = 200 }: { width?: number }) {
  return <div style={{ width, height: 2, background: ART_ACCENT, flexShrink: 0 }} />;
}

export default function Art() {
  const [, navigate] = useLocation();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [hoveredId, setHoveredId] = useState<number | null>(null);

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
        height: 72, padding: '0 80px',
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
        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          <a href="#gallery" style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 14, color: L.t50, textDecoration: 'none' }}>Gallery</a>
          <a href="#about"   style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 14, color: L.t50, textDecoration: 'none' }}>About</a>
          <a href="#commission" style={{
            fontFamily: 'Urbanist', fontWeight: 500, fontSize: 13, color: L.text,
            padding: '10px 24px', border: `1px solid ${ART_COLOR}88`,
            textDecoration: 'none', letterSpacing: 0.5,
            transition: 'border-color 0.2s',
          }}>Commission</a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section style={{
        position: 'relative',
        paddingTop: 72,
        minHeight: '75vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}>
        {/* Background photo */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url(${heroImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.5,
        }} />
        {/* Milky overlay — uniform 10% */}
        <div style={{
          position: 'absolute', inset: 0,
          background: 'rgba(255,255,255,0.10)',
        }} />
        {/* Text */}
        <motion.div
          initial="hidden" animate="show" variants={stagger}
          style={{ position: 'relative', zIndex: 10, padding: '0 80px 72px', maxWidth: 720 }}
        >
          <motion.p variants={fadeUp} style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: L.t35, textTransform: 'uppercase', marginBottom: 20 }}>
            01 — Art
          </motion.p>
          <motion.h1 variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(56px, 7vw, 104px)', letterSpacing: '-1px', lineHeight: 0.92,
            color: L.text, marginBottom: 24,
          }}>
            Floral<br />Meditations.
          </motion.h1>
          <motion.div variants={fadeUp}><ArtLine width={200} /></motion.div>
          <motion.p variants={fadeUp} style={{
            fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18,
            lineHeight: 1.7, color: L.t50,
            marginTop: 24, maxWidth: 520,
          }}>
            Each piece was created as a personal reflection for kindred spirits around the world.
            Where beauty becomes awareness, and every bloom carries a quiet truth.
          </motion.p>
        </motion.div>
      </section>

      {/* ─── GALLERY ─── */}
      <section id="gallery" style={{ padding: '96px 80px', borderBottom: `1px solid ${L.border}` }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48 }}>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: L.t25, textTransform: 'uppercase' }}>
              — Collection 2024–2025 —
            </span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 14, color: L.t35 }}>
              {artworks.length} works
            </span>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {artworks.map((art, i) => (
              <motion.div
                key={art.id}
                variants={fadeUp}
                onClick={() => setSelectedIndex(i)}
                onMouseEnter={() => setHoveredId(art.id)}
                onMouseLeave={() => setHoveredId(null)}
                style={{
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                  background: L.surface2,
                }}
              >
                {/* Image */}
                <div style={{ aspectRatio: '1/1', overflow: 'hidden', position: 'relative' }}>
                  <img
                    src={art.image}
                    alt={art.title}
                    style={{
                      width: '100%', height: '100%', objectFit: 'cover',
                      transition: 'transform 0.5s ease',
                      transform: hoveredId === art.id ? 'scale(1.04)' : 'scale(1)',
                    }}
                  />
                  {/* Milky base + hover overlay */}
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: hoveredId === art.id ? 'rgba(255,255,255,0.22)' : 'rgba(255,255,255,0.10)',
                    transition: 'background 0.3s ease',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {hoveredId === art.id && (
                      <span style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: 13, letterSpacing: 3, color: '#EDEDEA', textTransform: 'uppercase', opacity: 0.9 }}>
                        View →
                      </span>
                    )}
                  </div>
                </div>

                {/* Caption */}
                <div style={{
                  padding: '20px 24px',
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  borderTop: `1px solid ${L.border}`,
                  background: L.surface2,
                }}>
                  <div>
                    <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 15, color: L.text, marginBottom: 4 }}>
                      {art.title}
                    </p>
                    <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: L.t35, letterSpacing: 0.5 }}>
                      {art.medium}
                    </p>
                  </div>
                  <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: L.t25 }}>
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
        padding: '96px 80px',
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: 80, alignItems: 'center',
        borderBottom: `1px solid ${L.border}`,
      }}>
        {/* Photo */}
        <motion.div initial={{ opacity: 0, x: -24 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <img
              src={profileImage}
              alt="Drahoslava"
              style={{ width: '100%', aspectRatio: '3/4', objectFit: 'cover', display: 'block' }}
            />
            {/* Milky overlay */}
            <div style={{ position: 'absolute', inset: 0, background: 'rgba(255,255,255,0.10)', pointerEvents: 'none' }} />
            {/* Warm amber accent at bottom */}
            <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 3, background: ART_ACCENT }} />
          </div>
        </motion.div>

        {/* Text */}
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <motion.p variants={fadeUp} style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: L.t25, textTransform: 'uppercase', marginBottom: 20 }}>
            The artist
          </motion.p>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(32px, 3.5vw, 48px)', letterSpacing: '-0.5px', lineHeight: 1.15,
            color: L.text, marginBottom: 20,
          }}>
            Psychology graduate,<br />artist and creator<br />of experiences.
          </motion.h2>
          <motion.div variants={fadeUp}><ArtLine width={80} /></motion.div>

          {[
            'My work explores how psychology, art, and technology can serve as mirrors for self-awareness.',
            'I\'m interested in what happens when understanding becomes not only intellectual but sensory — when reflection takes form, color, and motion.',
            'Every piece is an experiment in how consciousness expresses itself through creation.',
          ].map((p, i) => (
            <motion.p key={i} variants={fadeUp} style={{
              fontFamily: 'Urbanist', fontWeight: 300, fontSize: 16,
              lineHeight: 1.75, color: L.t50,
              marginTop: 16,
            }}>
              {p}
            </motion.p>
          ))}
        </motion.div>
      </section>

      {/* ─── CREATIVE PRACTICE ─── */}
      <section style={{
        padding: '96px 80px',
        borderBottom: `1px solid ${L.border}`,
      }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <motion.div variants={fadeUp} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 56 }}>
            <div>
              <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: L.t25, textTransform: 'uppercase', marginBottom: 16 }}>
                Body — Creative practice
              </p>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
                fontStyle: 'italic',
                fontSize: 'clamp(40px, 4.5vw, 64px)', letterSpacing: '-0.5px', lineHeight: 1.0,
                color: L.text,
              }}>
                Art as<br />Mirror.
              </h2>
            </div>
            <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 16, color: L.t50, maxWidth: 420, textAlign: 'right', lineHeight: 1.65 }}>
              Through painting, sculpting, and touch, the body remembers what the mind forgets.
            </p>
          </motion.div>

          <motion.div variants={fadeUp} style={{ marginBottom: 48 }}>
            <ArtLine width={80} />
          </motion.div>

          {/* 3-column offering */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, marginBottom: 64 }}>
            {[
              { num: '01', title: 'Meditative\nPainting', body: 'Using brush and color as a form of moving reflection. No experience needed — only presence and curiosity.' },
              { num: '02', title: 'Textured\nFloral Art', body: 'Shaping layered flower paintings that express emotion through touch. Each layer is a quiet act of listening.' },
              { num: '03', title: 'Clay &\nMixed Media', body: 'Air-dry clay forms and collage that translate inner landscapes into three-dimensional, tactile space.' },
            ].map((item) => (
              <div key={item.num} style={{ background: L.surface2, padding: '40px 36px', display: 'flex', flexDirection: 'column', gap: 16 }}>
                <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 3, color: L.t25 }}>{item.num}</span>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 300, fontStyle: 'italic', fontSize: 28, letterSpacing: '0px', lineHeight: 1.15, color: L.text, whiteSpace: 'pre-line' }}>
                  {item.title}
                </h3>
                <ArtLine width={32} />
                <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 15, lineHeight: 1.65, color: L.t50 }}>
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Full description */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 80, alignItems: 'start' }}>
            <motion.p variants={fadeUp} style={{
              fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18,
              lineHeight: 1.75, color: L.t50,
            }}>
              This practice is not about making art, but about being in the act of creation — allowing color, form, and texture to reveal what words cannot hold.
            </motion.p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 13, color: L.t35, letterSpacing: 0.5 }}>This is for you if you:</p>
              {[
                'Feel called to express emotion through creation',
                'Seek a grounding, embodied way to reconnect with yourself',
                'Wish to explore art as meditation, not performance',
                'Want to rediscover play and intuitive making',
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
                  <div style={{ width: 16, height: 1, background: ART_ACCENT, marginTop: 11, flexShrink: 0 }} />
                  <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 15, lineHeight: 1.6, color: L.t50 }}>{item}</p>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* ─── COMMISSION ─── */}
      <section id="commission" style={{ padding: '96px 80px' }}>
        <motion.div initial="hidden" whileInView="show" viewport={{ once: true, margin: '-80px' }} variants={stagger}>
          <motion.h2 variants={fadeUp} style={{
            fontFamily: 'Cormorant Garamond, serif', fontWeight: 300,
            fontStyle: 'italic',
            fontSize: 'clamp(48px, 6vw, 88px)', letterSpacing: '-1px', lineHeight: 0.95,
            color: L.text, maxWidth: 800, marginBottom: 20,
          }}>
            Commission<br />a Piece.
          </motion.h2>
          <motion.div variants={fadeUp}><ArtLine width={200} /></motion.div>
          <motion.p variants={fadeUp} style={{
            fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18,
            color: L.t50, margin: '24px 0 40px', maxWidth: 520,
          }}>
            Each commissioned piece is created as a personal collaboration — for your space, your energy, your story.
          </motion.p>
          <motion.div variants={fadeUp} style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <a
              href="mailto:hello@drahoslava.com"
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
      </section>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: `1px solid ${L.border}`,
        padding: '0 80px', height: 72,
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

                <div style={{ padding: '40px 60px', display: 'flex', alignItems: 'center', gap: 32 }}>
                  {/* Prev */}
                  <button onClick={goToPrev} style={{ flexShrink: 0, background: 'none', border: 'none', color: 'rgba(237,237,234,0.4)', cursor: 'pointer', padding: 8, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EDEDEA')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,237,234,0.4)')}
                  >
                    <ChevronLeft size={32} />
                  </button>

                  {/* Artwork */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={selectedIndex}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{ flex: 1, background: '#0C0C14' }}
                    >
                      <img
                        src={artworks[selectedIndex].image}
                        alt={artworks[selectedIndex].title}
                        style={{ width: '100%', maxHeight: '65vh', objectFit: 'contain', display: 'block' }}
                      />
                      <div style={{ padding: '20px 28px', borderTop: '1px solid rgba(237,237,234,0.07)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                          <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 16, color: '#EDEDEA', marginBottom: 4 }}>
                            {artworks[selectedIndex].title}
                          </p>
                          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.4)' }}>
                            {artworks[selectedIndex].medium} · {artworks[selectedIndex].size} · {artworks[selectedIndex].year}
                          </p>
                        </div>
                        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, color: 'rgba(237,237,234,0.25)', letterSpacing: 1 }}>
                          {selectedIndex + 1} / {artworks.length}
                        </span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Next */}
                  <button onClick={goToNext} style={{ flexShrink: 0, background: 'none', border: 'none', color: 'rgba(237,237,234,0.4)', cursor: 'pointer', padding: 8, transition: 'color 0.2s' }}
                    onMouseEnter={(e) => (e.currentTarget.style.color = '#EDEDEA')}
                    onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(237,237,234,0.4)')}
                  >
                    <ChevronRight size={32} />
                  </button>
                </div>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPortal>
      </Dialog>

    </div>
  );
}
