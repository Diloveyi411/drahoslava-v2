import { useLocation } from 'wouter';
import { motion } from 'framer-motion';

export default function Branding() {
  const [, navigate] = useLocation();
  return (
    <div style={{ background: '#07070D', minHeight: '100vh', color: '#EDEDEA' }}>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
        height: 72, padding: '0 80px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        background: 'rgba(7,7,13,0.9)', backdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(237,237,234,0.07)',
      }}>
        <button onClick={() => navigate('/')} style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 15, letterSpacing: '-0.5px', color: '#EDEDEA', background: 'none', border: 'none', cursor: 'pointer' }}>
          DRAHOSLAVA
        </button>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 3, color: 'rgba(237,237,234,0.2)', textTransform: 'uppercase' }}>
          Branding
        </span>
      </nav>
      <div style={{ paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 24, padding: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ maxWidth: 640 }}
        >
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 11, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>
            04 — Branding
          </p>
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 'clamp(36px, 5vw, 64px)', letterSpacing: '-2px', lineHeight: 0.95, marginBottom: 20 }}>
            COMING<br />SOON.
          </h1>
          <div style={{ width: 160, height: 2, background: 'linear-gradient(90deg, #FFE680 0%, #FF9ECD 100%)', marginBottom: 24 }} />
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18, lineHeight: 1.65, color: 'rgba(237,237,234,0.5)' }}>
            Visual identity and brand systems for builders who need the world to understand what they're building.
          </p>
          <button onClick={() => navigate('/')} style={{ marginTop: 40, fontFamily: 'Urbanist', fontWeight: 300, fontSize: 14, color: 'rgba(237,237,234,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Back
          </button>
        </motion.div>
      </div>
    </div>
  );
}
