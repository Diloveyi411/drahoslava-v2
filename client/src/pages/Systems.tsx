import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

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
    title: 'Brand\nSystems',
    body: 'Identity, positioning, visual language and guidelines that scale with your company.',
  },
  {
    num: '02',
    title: 'Product\nThinking',
    body: 'UX, structure and conversion design that turns products into experiences.',
  },
  {
    num: '03',
    title: 'System\nClarity',
    body: 'Content and communication systems that keep a company consistent as it scales.',
  },
];

const WORK = [
  {
    title: 'Polystate',
    tags: 'Brand System · Visual Identity · Social',
    client: 'Polystate',
    problem: 'Brand looked inconsistent across product and website.',
    solution: 'Created a unified brand system and product interface language.',
    impact: 'Clear positioning and coherent user experience.',
    img: '/optimized/work-polystate.webp',
  },
  {
    title: 'Tina Tantra',
    tags: 'Website · Brand Identity · Content',
    client: 'Tina Tantra',
    problem: 'Spa website failed to attract high-end clientele.',
    solution: 'Developed a complete brand and content system aligning with the spa journey.',
    impact: 'Premium perception and more bookings.',
    img: '/optimized/work-tina.webp',
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

export default function Systems() {
  const [, navigate] = useLocation();

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
        <button
          onClick={() => navigate('/')}
          style={{
            fontFamily: 'Unbounded, sans-serif',
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: '-0.5px',
            color: '#EDEDEA',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          DRAHOSLAVA
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
          {['Work', 'Services', 'About'].map((item) => (
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
            Book a call
          </a>
        </div>
      </nav>

      {/* ─── HERO ─── */}
      <section
        id="hero"
        style={{
          height: '100vh',
          minHeight: 700,
          display: 'grid',
          gridTemplateColumns: '58% 42%',
          marginTop: 72,
        }}
      >
        {/* LEFT — Photo */}
        <div style={{
          position: 'relative',
          overflow: 'hidden',
        }}>
          <img
            src="/hero-photo.png"
            alt="Drahoslava"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'left center',
              display: 'block',
            }}
          />
        </div>

        {/* RIGHT — Text panel */}
        <div style={{
          background: '#07070D',
          borderLeft: '1px solid rgba(237,237,234,0.07)',
          display: 'flex',
          alignItems: 'center',
        }}>
        <motion.div
          initial="hidden"
          animate="show"
          variants={stagger}
          style={{
            padding: '0 64px',
            width: '100%',
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
              color: 'rgba(237,237,234,0.3)',
              marginBottom: 28,
            }}
          >
            Systems & Brand Designer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(36px, 3.2vw, 56px)',
              letterSpacing: '-1.5px',
              lineHeight: 1.05,
              color: '#EDEDEA',
              marginBottom: 24,
            }}
          >
            I design how your<br />work is understood.
          </motion.h1>

          <motion.div variants={fadeUp}>
            <PrismaticLine width={200} />
          </motion.div>

          <motion.p
            variants={fadeUp}
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 17,
              lineHeight: 1.65,
              color: 'rgba(237,237,234,0.6)',
              marginTop: 20,
              maxWidth: 480,
            }}
          >
            Brand & systems designer helping founders make complex work clear.
          </motion.p>

          <motion.div
            variants={fadeUp}
            style={{ display: 'flex', gap: 16, marginTop: 36, flexWrap: 'wrap' }}
          >
            <a href="#contact" className="btn-primary">Book a strategy call</a>
            <a href="#work" className="btn-outline">See systems I designed</a>
          </motion.div>
        </motion.div>
        </div>
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
            <span className="section-label">— WHAT I DO —</span>
            <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 15, color: 'rgba(237,237,234,0.35)' }}>
              Every engagement is a system, not a deliverable.
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
            <span className="section-label">— SELECTED SYSTEMS —</span>
            <a
              href="#"
              style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: 13, color: 'rgba(237,237,234,0.3)', textDecoration: 'none' }}
            >
              View all →
            </a>
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
            {WORK.map((w) => (
              <motion.div key={w.title} variants={fadeUp}>
                {/* Image */}
                <div
                  style={{
                    height: 400,
                    background: '#0C0C14',
                    overflow: 'hidden',
                    position: 'relative',
                  }}
                >
                  {w.img && (
                    <img
                      src={w.img}
                      alt={w.title}
                      style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.7 }}
                      onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
                    />
                  )}
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(7,7,13,0.9) 0%, transparent 50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: 40,
                    }}
                  >
                    <h3 style={{ fontFamily: 'Unbounded', fontWeight: 600, fontSize: 22, letterSpacing: '-0.5px', color: '#EDEDEA' }}>
                      {w.title}
                    </h3>
                    <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: 'rgba(237,237,234,0.35)', marginTop: 4 }}>
                      {w.tags}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div
                  style={{
                    background: '#07070D',
                    padding: '32px 40px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 10,
                    borderTop: '1px solid rgba(237,237,234,0.07)',
                  }}
                >
                  {[
                    { label: 'Client', val: w.client },
                    { label: 'Problem', val: w.problem },
                    { label: 'Solution', val: w.solution },
                    { label: 'Impact', val: w.impact },
                  ].map((row) => (
                    <div key={row.label} style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                      <span style={{ fontFamily: 'Urbanist', fontWeight: 600, fontSize: 13, color: 'rgba(237,237,234,0.7)', minWidth: 68, flexShrink: 0 }}>
                        {row.label}:
                      </span>
                      <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 13, color: 'rgba(237,237,234,0.45)', lineHeight: 1.5 }}>
                        {row.val}
                      </span>
                    </div>
                  ))}
                  <a
                    href="#"
                    style={{ fontFamily: 'Urbanist', fontWeight: 400, fontSize: 13, color: 'rgba(237,237,234,0.3)', textDecoration: 'none', marginTop: 8 }}
                  >
                    View case study →
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
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
            How builders lose signal<br />as they scale.
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
            Psychology trained my eye to read people. Art trained it to translate what I see.
            Systems thinking taught me to make it repeatable.
            <br /><br />
            Most founders spend years designing internal systems while the external perception
            of their work evolves randomly. I fix that.
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
            { label: 'Background', value: 'Psychology · Art · Systems' },
            { label: 'Focus', value: 'Builders + Founders' },
            { label: 'Services', value: 'Brand · Identity · Content' },
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
            READY TO BUILD<br />SOMETHING CLEAR?
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
            Let's design the system that makes your work impossible to ignore.
          </motion.p>

          <motion.div variants={fadeUp}>
            <a href="mailto:hello@drahoslava.com" className="btn-primary" style={{ fontSize: 15 }}>
              Book a call
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
