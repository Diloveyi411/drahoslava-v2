import React, { useState } from 'react';
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
    title: 'UX\nDesign',
    body: 'Flows, structure, and interaction design that turn products into clear, usable systems.',
  },
  {
    num: '02',
    title: 'Product\nThinking',
    body: 'Turning complex products into clear decisions.',
  },
  {
    num: '03',
    title: 'Conversion\n& Clarity',
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
    title: 'Tina Tantra',
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


type GalleryItem = { src?: string; video?: string; caption: string; contain?: boolean };

function GallerySlider({ gallery }: { gallery: GalleryItem[] }) {
  const [index, setIndex] = useState(0);
  const [dir, setDir] = useState(1);

  const go = (next: number) => {
    setDir(next > index ? 1 : -1);
    setIndex(next);
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 560, background: '#0A0A12', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
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
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
    </div>
  );
}


export default function Systems() {

  return (
    <div style={{ background: '#07070D', minHeight: '100vh', color: '#EDEDEA' }}>

      {/* ─── NAV ─── */}
      <nav
        style={{
          position: 'fixed',
          top: 0, left: 0, right: 0,
          zIndex: 50,
          height: 72,
          padding: '0 80px',
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

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Work', 'Approach', 'About'].map((item) => (
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
            style={{ marginLeft: 8 }}
          >
            Get in touch
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
          src="/hero-photo.png"
          alt="Drahoslava"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
          }}
        />

        {/* Dark gradient overlay — left side for text readability */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(7,7,13,0.85) 0%, rgba(7,7,13,0.6) 50%, rgba(7,7,13,0.1) 100%)',
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
            justifyContent: 'center',
            padding: '0 80px',
            maxWidth: 720,
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
          padding: '96px 80px',
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
              marginBottom: 48,
            }}
          >
            <span className="section-label">WHAT I DO</span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 15, color: 'rgba(237,237,234,0.35)' }}>
              Every product is a system of decisions.
            </span>
          </motion.div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 2,
            }}
          >
            {SERVICES.map((s, i) => (
              <motion.div
                key={s.num}
                variants={fadeUp}
                style={{
                  background: i % 2 === 0 ? '#0C0C14' : '#07070D',
                  padding: '48px 40px',
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
          padding: '96px 80px',
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
            <span className="section-label">SELECTED SYSTEMS</span>
          </motion.div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {WORK.map((w, i) => (
              <div key={w.title}>
              <motion.div
                variants={fadeUp}
                style={{
                  display: 'grid',
                  gridTemplateColumns: i % 2 === 0 ? '45% 55%' : '55% 45%',
                  background: '#0C0C14',
                  minHeight: 560,
                  alignItems: 'stretch',
                }}
              >
                {/* Image — alternates left/right */}
                {i % 2 !== 0 && (
                  <div style={{ background: '#0A0A12', overflow: 'hidden', order: 2, alignSelf: 'stretch' }}>
                    <GallerySlider gallery={w.gallery} />
                  </div>
                )}

                {/* Content panel */}
                <div
                  style={{
                    padding: '56px 64px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    gap: 0,
                    order: i % 2 !== 0 ? 1 : 2,
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

                {/* Image — left side for even items */}
                {i % 2 === 0 && (
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
          minHeight: 700,
          overflow: 'hidden',
        }}
      >
        {/* Full-bleed photo */}
        <img
          src="/diagram.png"
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

        {/* Dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(7,7,13,0.15) 0%, rgba(7,7,13,0.75) 55%, rgba(7,7,13,0.92) 100%)',
        }} />

        {/* RIGHT — Text overlay */}
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
          style={{
            position: 'relative',
            zIndex: 2,
            maxWidth: 480,
            marginLeft: 'auto',
            padding: '120px 80px',
          }}
        >
          <motion.span variants={fadeUp} className="section-label">APPROACH</motion.span>

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
          padding: '96px 80px',
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 80,
          alignItems: 'start',
        }}
      >
        <motion.div
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: '-80px' }}
          variants={stagger}
        >
          <motion.span variants={fadeUp} className="section-label">ABOUT</motion.span>

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
          padding: '120px 80px',
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
            LOOKING FOR A<br />UX DESIGNER?
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
          padding: '0 80px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <span style={{ fontFamily: 'Unbounded', fontWeight: 700, fontSize: 13, letterSpacing: '-0.3px', color: 'rgba(237,237,234,0.3)' }}>
          DRAHOSLAVA
        </span>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: 'rgba(237,237,234,0.18)' }}>
          © 2026 · drahoslava.com
        </span>
      </footer>

    </div>
  );
}
