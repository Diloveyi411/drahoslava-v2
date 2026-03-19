import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

const portals = [
  {
    id: 'art',
    num: '01',
    title: 'ART',
    sub: 'Floral paintings, monthly sessions, meditative creation.',
    path: '/art',
    accent: '#F5A623',
    gradient: 'linear-gradient(90deg, #F5A623 0%, #E8C97E 100%)',
  },
  {
    id: 'psychology',
    num: '02',
    title: 'PSYCHOLOGY',
    sub: 'Self-discovery, inner systems, and dream work.',
    path: '/psychology',
    accent: '#9B8FD7',
    gradient: 'linear-gradient(90deg, #6B7FD7 0%, #C4B5FD 100%)',
  },
  {
    id: 'design',
    num: '03',
    title: 'DESIGN',
    sub: 'UX audit, product optimization, workflow clarity.',
    path: '/design',
    accent: '#7CF0EA',
    gradient: 'linear-gradient(90deg, #7CF0EA 0%, #B8C0FF 50%, #FF9ECD 100%)',
  },
  {
    id: 'branding',
    num: '04',
    title: 'BRANDING',
    sub: 'Visual identity and brand systems for builders.',
    path: '/branding',
    accent: '#FFE680',
    gradient: 'linear-gradient(90deg, #FFE680 0%, #FF9ECD 100%)',
  },
  {
    id: 'social',
    num: '05',
    title: 'SOCIAL',
    sub: 'Content strategy and social media management.',
    path: '/social',
    accent: '#B8C0FF',
    gradient: 'linear-gradient(90deg, #B8C0FF 0%, #7CF0EA 100%)',
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

export default function Hub() {
  const [, navigate] = useLocation();
  const [hovered, setHovered] = useState<string | null>(null);
  const m = useIsMobile();

  return (
    <div style={{
      background: '#07070D',
      height: '100svh',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
      color: '#EDEDEA',
    }}>

      {/* Nav */}
      <nav style={{
        padding: m ? '0 20px' : '0 80px',
        height: 72,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottom: '1px solid rgba(237,237,234,0.07)',
        flexShrink: 0,
      }}>
        <span style={{
          fontFamily: 'Unbounded, sans-serif',
          fontWeight: 700,
          fontSize: 15,
          letterSpacing: '-0.5px',
          color: '#EDEDEA',
        }}>
          DRAHOSLAVA
        </span>
        {!m && (
          <span style={{
            fontFamily: 'Urbanist, sans-serif',
            fontWeight: 300,
            fontSize: 11,
            letterSpacing: 3,
            color: 'rgba(237,237,234,0.2)',
            textTransform: 'uppercase',
          }}>
            drahoslava.com
          </span>
        )}
      </nav>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ padding: m ? '28px 20px 16px' : '36px 80px 20px', flexShrink: 0 }}
      >
        <h1 style={{
          fontFamily: 'Unbounded, sans-serif',
          fontWeight: 700,
          fontSize: m ? '28px' : 'clamp(28px, 3.5vw, 48px)',
          letterSpacing: '-2px',
          lineHeight: 0.95,
          color: '#EDEDEA',
          margin: 0,
        }}>
          FIVE<br />DIMENSIONS.
        </h1>
      </motion.div>

      {/* Portals */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
        {portals.map((portal, i) => (
          <motion.div
            key={portal.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.15 + i * 0.07 }}
            onClick={() => navigate(portal.path)}
            onMouseEnter={() => !m && setHovered(portal.id)}
            onMouseLeave={() => !m && setHovered(null)}
            style={{
              flex: hovered === portal.id ? '1.8' : '1',
              borderTop: '1px solid rgba(237,237,234,0.07)',
              padding: m ? '0 20px' : '0 80px',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden',
              transition: 'flex 0.45s cubic-bezier(0.25, 0.1, 0.25, 1)',
              gap: m ? 16 : 0,
            }}
          >
            {/* Left accent bar */}
            <div style={{
              position: 'absolute',
              left: 0,
              top: 0,
              bottom: 0,
              width: hovered === portal.id ? 3 : 0,
              background: portal.gradient,
              transition: 'width 0.35s ease',
            }} />

            {/* Background radial glow */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `radial-gradient(ellipse at 0% 50%, ${portal.accent}10 0%, transparent 55%)`,
              opacity: hovered === portal.id ? 1 : 0,
              transition: 'opacity 0.4s ease',
              pointerEvents: 'none',
            }} />

            {/* Number */}
            <span style={{
              fontFamily: 'Urbanist, sans-serif',
              fontWeight: 300,
              fontSize: 10,
              letterSpacing: 3,
              color: 'rgba(237,237,234,0.2)',
              width: m ? 24 : 32,
              flexShrink: 0,
            }}>
              {portal.num}
            </span>

            {/* Title */}
            <h2 style={{
              fontFamily: 'Unbounded, sans-serif',
              fontWeight: 700,
              fontSize: m ? '22px' : hovered === portal.id ? 'clamp(28px, 4vw, 58px)' : 'clamp(22px, 3.2vw, 46px)',
              letterSpacing: '-1.5px',
              lineHeight: 1,
              color: hovered === portal.id ? '#EDEDEA' : 'rgba(237,237,234,0.65)',
              flex: 1,
              paddingLeft: m ? 0 : 48,
              transition: 'color 0.3s ease, font-size 0.35s ease',
              margin: 0,
            }}>
              {portal.title}
            </h2>

            {/* Description — desktop hover only */}
            {!m && (
              <p style={{
                fontFamily: 'Urbanist, sans-serif',
                fontWeight: 300,
                fontSize: 13,
                lineHeight: 1.55,
                color: 'rgba(237,237,234,0.4)',
                maxWidth: 280,
                textAlign: 'right',
                opacity: hovered === portal.id ? 1 : 0,
                transform: hovered === portal.id ? 'translateX(0)' : 'translateX(10px)',
                transition: 'opacity 0.3s ease, transform 0.3s ease',
                margin: 0,
                flexShrink: 0,
              }}>
                {portal.sub}
              </p>
            )}

            {/* Arrow */}
            <span style={{
              fontFamily: 'Urbanist, sans-serif',
              fontSize: m ? 16 : 18,
              color: hovered === portal.id ? portal.accent : 'rgba(237,237,234,0.12)',
              marginLeft: m ? 0 : 32,
              flexShrink: 0,
              transition: 'color 0.3s ease, transform 0.3s ease',
              transform: hovered === portal.id ? 'translateX(5px)' : 'translateX(0)',
              display: 'inline-block',
            }}>
              →
            </span>
          </motion.div>
        ))}
      </div>

    </div>
  );
}
