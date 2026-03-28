import { useState } from 'react';

interface Props {
  accent: string;
}

export default function QuickContactForm({ accent }: Props) {
  const [fields, setFields] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const handle = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setFields(f => ({ ...f, [e.target.name]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fields.name || !fields.email || !fields.message) return;
    setStatus('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...fields, subject: 'Website inquiry' }),
      });
      setStatus(res.ok ? 'sent' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(237,237,234,0.05)',
    border: '1px solid rgba(237,237,234,0.12)',
    borderRadius: 4,
    padding: '12px 16px',
    fontFamily: 'Urbanist, sans-serif',
    fontWeight: 300,
    fontSize: 15,
    color: '#EDEDEA',
    outline: 'none',
    boxSizing: 'border-box' as const,
  };

  if (status === 'sent') {
    return (
      <div style={{ padding: '32px', background: 'rgba(237,237,234,0.04)', borderRadius: 8, border: `1px solid ${accent}33`, maxWidth: 560 }}>
        <p style={{ fontFamily: 'Unbounded, sans-serif', fontWeight: 700, fontSize: 15, color: accent, margin: '0 0 8px' }}>Message sent.</p>
        <p style={{ fontFamily: 'Urbanist, sans-serif', fontWeight: 300, fontSize: 15, color: 'rgba(237,237,234,0.5)', margin: 0 }}>I will get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} style={{ maxWidth: 560, display: 'flex', flexDirection: 'column', gap: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <input
          name="name"
          placeholder="Your name"
          value={fields.name}
          onChange={handle}
          required
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Your email"
          value={fields.email}
          onChange={handle}
          required
          style={inputStyle}
        />
      </div>
      <textarea
        name="message"
        placeholder="Tell me about the project and the problem."
        value={fields.message}
        onChange={handle}
        required
        rows={4}
        style={{ ...inputStyle, resize: 'vertical' }}
      />
      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
        <button
          type="submit"
          disabled={status === 'sending'}
          style={{
            fontFamily: 'Urbanist, sans-serif', fontWeight: 500, fontSize: 14, letterSpacing: 1,
            color: '#07070D', background: accent,
            padding: '14px 32px', borderRadius: 4,
            border: 'none', cursor: status === 'sending' ? 'wait' : 'pointer',
            textTransform: 'uppercase' as const,
            opacity: status === 'sending' ? 0.7 : 1,
          }}
        >
          {status === 'sending' ? 'Sending...' : 'Send message'}
        </button>
        {status === 'error' && (
          <p style={{ fontFamily: 'Urbanist', fontWeight: 300, fontSize: 14, color: '#FF9ECD', margin: 0 }}>
            Something went wrong. Try again or email info@drahoslava.com
          </p>
        )}
      </div>
    </form>
  );
}
