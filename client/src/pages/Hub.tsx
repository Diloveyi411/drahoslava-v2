import { useState, useEffect, useCallback } from 'react';
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
  const [mouse, setMouse] = useState({ x: -500, y: -500 });
  const m = useIsMobile();

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMouse({ x: -500, y: -500 });
  }, []);

  return (
    <div
      style={{
        background: '#07070D',
        height: '100svh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        color: '#EDEDEA',
        position: 'relative',
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >

      {/* Background photo */}
      <img
        src="/hub-bg.jpg"
        alt=""
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: m ? '70% center' : '65% center',
          zIndex: 0,
        }}
      />

      {/* Dark overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(90deg, rgba(7,7,13,0.82) 0%, rgba(7,7,13,0.55) 50%, rgba(7,7,13,0.4) 100%)',
        zIndex: 1,
      }} />

      {/* Prismatic mouse glow — beam 1 */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 320,
          height: '120vh',
          background: `linear-gradient(to right,
            transparent 0%,
            rgba(255,80,80,0.18) 8%,
            rgba(255,160,0,0.16) 20%,
            rgba(255,240,80,0.14) 32%,
            rgba(80,230,120,0.14) 46%,
            rgba(80,180,255,0.16) 60%,
            rgba(180,80,255,0.16) 75%,
            rgba(255,80,180,0.14) 88%,
            transparent 100%
          )`,
          transform: `translate(${mouse.x - 160}px, ${mouse.y - 400}px) rotate(-25deg)`,
          mixBlendMode: 'screen',
          filter: 'blur(18px)',
          opacity: mouse.x > 0 ? 0.9 : 0,
          transition: 'transform 0.06s ease-out, opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Prismatic mouse glow — beam 2 (offset) */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 200,
          height: '100vh',
          background: `linear-gradient(to right,
            transparent 0%,
            rgba(124,240,234,0.2) 15%,
            rgba(184,192,255,0.18) 35%,
            rgba(255,158,205,0.18) 55%,
            rgba(255,230,128,0.16) 75%,
            transparent 100%
          )`,
          transform: `translate(${mouse.x - 40}px, ${mouse.y - 350}px) rotate(-35deg)`,
          mixBlendMode: 'screen',
          filter: 'blur(24px)',
          opacity: mouse.x > 0 ? 0.7 : 0,
          transition: 'transform 0.09s ease-out, opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Soft radial glow at cursor */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 500,
          height: 500,
          borderRadius: '50%',
          background: `radial-gradient(ellipse at center,
            rgba(184,192,255,0.15) 0%,
            rgba(255,158,205,0.1) 30%,
            rgba(124,240,234,0.08) 55%,
            transparent 75%
          )`,
          transform: `translate(${mouse.x - 250}px, ${mouse.y - 250}px)`,
          mixBlendMode: 'screen',
          filter: 'blur(6px)',
          opacity: mouse.x > 0 ? 1 : 0,
          transition: 'transform 0.04s ease-out, opacity 0.4s ease',
          pointerEvents: 'none',
          zIndex: 2,
        }}
      />

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 3, display: 'flex', flexDirection: 'column', height: '100%' }}>

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
                background: hovered === portal.id ? 'rgba(7,7,13,0.15)' : 'transparent',
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

              {/* Hover glow */}
              <div style={{
                position: 'absolute',
                inset: 0,
                background: `radial-gradient(ellipse at 0% 50%, ${portal.accent}0D 0%, transparent 60%)`,
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
                color: 'rgba(237,237,234,0.25)',
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
                color: hovered === portal.id ? '#EDEDEA' : 'rgba(237,237,234,0.7)',
                flex: 1,
                paddingLeft: m ? 0 : 48,
                transition: 'color 0.3s ease, font-size 0.35s ease',
                margin: 0,
              }}>
                {portal.title}
              </h2>

              {/* Description */}
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
                color: hovered === portal.id ? portal.accent : 'rgba(237,237,234,0.15)',
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
    </div>
  );
}
