import { useState } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const portals = [
  {
    id: 'art',
    num: '01',
    title: 'ART',
    sub: 'Textured paintings, visual meditations and the creative process.',
    path: '/art',
    accent: 'linear-gradient(135deg, #F5A623 0%, #E8C97E 100%)',
    accentColor: '#F5A623',
    description: 'Floral paintings. Creative rituals. The art of seeing.',
  },
  {
    id: 'psychology',
    num: '02',
    title: 'PSYCHOLOGY',
    sub: 'Inner systems, nervous system work and self-discovery.',
    path: '/psychology',
    accent: 'linear-gradient(135deg, #6B7FD7 0%, #C4B5FD 100%)',
    accentColor: '#9B8FD7',
    description: 'Depth. Integration. The internal architecture of who you are.',
  },
  {
    id: 'systems',
    num: '03',
    title: 'SYSTEMS',
    sub: 'Brand systems and visual identity for founders who build.',
    path: '/systems',
    accent: 'linear-gradient(90deg, #7CF0EA 0%, #B8C0FF 50%, #FF9ECD 100%)',
    accentColor: '#B8C0FF',
    description: 'Brand strategy. Visual identity. Systems that make builders visible.',
  },
];

export default function Hub() {
  const [, navigate] = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div
      style={{ background: '#07070D', minHeight: '100vh' }}
      className="flex flex-col"
    >
      {/* Nav */}
      <nav
        style={{
          padding: '0 80px',
          height: 72,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid rgba(237,237,234,0.07)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          background: 'rgba(7,7,13,0.9)',
          backdropFilter: 'blur(12px)',
        }}
      >
        <span className="wordmark">DRAHOSLAVA</span>
        <span
          style={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: 3,
            color: 'rgba(237,237,234,0.25)',
            textTransform: 'uppercase',
          }}
        >
          drahoslava.com
        </span>
      </nav>

      {/* Hero */}
      <div
        style={{
          paddingTop: 72,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Top section */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          style={{
            padding: '80px 80px 48px',
            maxWidth: 640,
          }}
        >
          <p
            style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: 4,
              color: 'rgba(237,237,234,0.25)',
              textTransform: 'uppercase',
              marginBottom: 24,
            }}
          >
            Choose your world
          </p>
          <h1
            style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 700,
              fontSize: 'clamp(40px, 5vw, 72px)',
              letterSpacing: '-2px',
              lineHeight: 0.95,
              color: '#EDEDEA',
              marginBottom: 0,
            }}
          >
            THREE<br />DIMENSIONS.
          </h1>
        </motion.div>

        {/* Portals */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            flex: 1,
            borderTop: '1px solid rgba(237,237,234,0.07)',
          }}
        >
          {portals.map((portal, i) => (
            <motion.div
              key={portal.id}
              initial={{ opacity: 0, y: 32 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => navigate(portal.path)}
              onMouseEnter={() => setHovered(portal.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                position: 'relative',
                padding: '64px 56px',
                borderRight: i < portals.length - 1 ? '1px solid rgba(237,237,234,0.07)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                minHeight: 480,
                overflow: 'hidden',
                transition: 'background 0.4s ease',
                background: hovered === portal.id ? 'rgba(255,255,255,0.02)' : 'transparent',
              }}
            >
              {/* Accent glow on hover */}
              <motion.div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: portal.accent,
                  opacity: hovered === portal.id ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              />
              <motion.div
                style={{
                  position: 'absolute',
                  inset: 0,
                  background: `radial-gradient(circle at 50% 100%, ${portal.accentColor}18 0%, transparent 60%)`,
                  opacity: hovered === portal.id ? 1 : 0,
                  transition: 'opacity 0.4s ease',
                  pointerEvents: 'none',
                }}
              />

              {/* Top: number */}
              <div>
                <p
                  style={{
                    fontFamily: 'Urbanist, sans-serif',
                    fontWeight: 300,
                    fontSize: 11,
                    letterSpacing: 3,
                    color: 'rgba(237,237,234,0.2)',
                    marginBottom: 32,
                  }}
                >
                  {portal.num}
                </p>

                <h2
                  style={{
                    fontFamily: 'Unbounded, sans-serif',
                    fontWeight: 700,
                    fontSize: 'clamp(28px, 3vw, 44px)',
                    letterSpacing: '-1.5px',
                    lineHeight: 1,
                    color: '#EDEDEA',
                    marginBottom: 24,
                    transition: 'opacity 0.2s',
                  }}
                >
                  {portal.title}
                </h2>

                {/* Accent line */}
                <div
                  style={{
                    width: hovered === portal.id ? 80 : 32,
                    height: 1,
                    background: portal.accent,
                    transition: 'width 0.4s ease',
                    marginBottom: 24,
                  }}
                />

                <p
                  style={{
                    fontFamily: 'Urbanist, sans-serif',
                    fontWeight: 300,
                    fontSize: 16,
                    lineHeight: 1.65,
                    color: hovered === portal.id ? 'rgba(237,237,234,0.6)' : 'rgba(237,237,234,0.35)',
                    maxWidth: 280,
                    transition: 'color 0.3s ease',
                  }}
                >
                  {portal.description}
                </p>
              </div>

              {/* Bottom: arrow */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontFamily: 'Urbanist, sans-serif',
                  fontWeight: 500,
                  fontSize: 13,
                  letterSpacing: 1,
                  color: hovered === portal.id ? '#EDEDEA' : 'rgba(237,237,234,0.2)',
                  textTransform: 'uppercase',
                  transition: 'color 0.3s ease',
                }}
              >
                Enter
                <motion.span
                  animate={{ x: hovered === portal.id ? 6 : 0 }}
                  transition={{ duration: 0.2 }}
                >
                  →
                </motion.span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
