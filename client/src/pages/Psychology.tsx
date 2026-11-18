import { useLocation } from 'wouter';
import { motion } from 'framer-motion';
import SEO from '@/components/SEO';

export default function Psychology() {
  const [, navigate] = useLocation();

  return (
    <>
      <SEO
        title="Psychology - Drahoslava"
        description="Self-discovery, inner work, and the psychology behind design decisions. Coming soon."
        url="/psychology"
      />
    <div style={{ background: '#07070D', minHeight: '100vh', color: '#EDEDEA' }}>
      <nav
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50,
          height: 72, padding: '0 80px',
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          background: 'rgba(7,7,13,0.9)', backdropFilter: 'blur(12px)',
          borderBottom: '1px solid rgba(237,237,234,0.07)',
        }}
      >
        <button onClick={() => navigate('/')} style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 16, letterSpacing: '-0.5px', color: '#EDEDEA', background: 'none', border: 'none', cursor: 'pointer' }}>
          DRAHOSLAVA
        </button>
        <span style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase' }}>
          Psychology
        </span>
      </nav>

      <div style={{ paddingTop: 72, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', flexDirection: 'column', gap: 24, padding: '80px' }}>
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{ textAlign: 'left', maxWidth: 640 }}
        >
          <p style={{ fontFamily: 'Urbanist', fontWeight: 500, fontSize: 10, letterSpacing: 4, color: 'rgba(237,237,234,0.25)', textTransform: 'uppercase', marginBottom: 20 }}>
            02 Psychology
          </p>
          <h1 style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 'clamp(40px, 5vw, 72px)', letterSpacing: '-2px', lineHeight: 0.95, marginBottom: 20 }}>
            DEPTH<br />COMING SOON.
          </h1>
          <div style={{ width: 200, height: 2, background: 'linear-gradient(135deg, #6B7FD7 0%, #C4B5FD 100%)', marginBottom: 24 }} />
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 18, lineHeight: 1.65, color: 'rgba(237,237,234,0.5)' }}>
            Inner systems, nervous system work and self-discovery. Coming soon.
          </p>
          <button onClick={() => navigate('/')} style={{ marginTop: 40, fontFamily: 'Urbanist', fontWeight: 400, fontSize: 14, color: 'rgba(237,237,234,0.3)', background: 'none', border: 'none', cursor: 'pointer' }}>
            ← Back to hub
          </button>
        </motion.div>
      </div>

      <footer style={{
        borderTop: '1px solid rgba(237,237,234,0.07)',
        padding: '0 80px', height: 72,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <span style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 13, letterSpacing: '-0.3px', color: 'rgba(237,237,234,0.25)' }}>DRAHOSLAVA</span>
        <span style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 300, fontSize: 12, letterSpacing: 1, color: 'rgba(237,237,234,0.18)' }}>© 2026 · drahoslava.com</span>
      </footer>
    </div>
    </>
  );
}
