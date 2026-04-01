import { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send } from 'lucide-react';

const GithubIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

export default function Contact() {
  const [visible, setVisible] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    setSending(true);
    setError('');
    try {
      const res = await fetch('https://formspree.io/f/xjkokalz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) { setSent(true); setForm({ name: '', email: '', subject: '', message: '' }); }
      else setError('Something went wrong. Try emailing directly.');
    } catch {
      setError('Network error. Please email directly.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px clamp(1rem, 5vw, 6rem) 4rem', maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--green)', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--green)' }} />
          CONTACT
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          Let's work<br />
          <span style={{ color: 'var(--green)' }}>together.</span>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 460, lineHeight: 1.7 }}>
          I'm actively looking for a full-stack MERN developer role. Got a project, a team, or just want to talk code? Reach out.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '3rem', alignItems: 'start' }} className="contact-grid">

        {/* Left - info */}
        <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
            {[
              { icon: <Mail size={16} />, label: 'Email', value: 'bishalbista737@gmail.com', href: 'mailto:bishalbista737@gmail.com' },
              { icon: <Phone size={16} />, label: 'Phone', value: '+977 9866123946', href: 'tel:+9779866123946' },
              { icon: <MapPin size={16} />, label: 'Location', value: 'Bhaktapur, Nepal', href: null },
            ].map(({ icon, label, value, href }) => (
              <div key={label} style={{ display: 'flex', gap: '1rem', padding: '1rem', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 10, alignItems: 'center', transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = 'rgba(0,255,136,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'var(--border)'}
              >
                <div style={{ width: 38, height: 38, borderRadius: 8, background: 'var(--surface)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--green)', flexShrink: 0 }}>{icon}</div>
                <div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text2)', marginBottom: 2 }}>{label}</div>
                  {href ? (
                    <a href={href} style={{ fontSize: 13, color: 'var(--text)', textDecoration: 'none', fontWeight: 600 }}>{value}</a>
                  ) : (
                    <span style={{ fontSize: 13, color: 'var(--text)', fontWeight: 600 }}>{value}</span>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Social links */}
          <div style={{ padding: '1.5rem', background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 12 }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text2)', marginBottom: '1rem', letterSpacing: '0.1em' }}>FIND ME ON</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { icon: <GithubIcon size={16} />, label: 'GitHub', sub: 'SharadHub', href: 'https://github.com/SharadHub' },
                { icon: <LinkedinIcon size={16} />, label: 'LinkedIn', sub: 'sharad-bista-849172325', href: 'https://linkedin.com/in/sharad-bista-849172325' },
              ].map(({ icon, label, sub, href }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  color: 'var(--text2)', textDecoration: 'none',
                  padding: '8px', borderRadius: 8, transition: 'all 0.2s',
                }}
                  onMouseEnter={e => { e.currentTarget.style.background = 'var(--surface)'; e.currentTarget.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--text2)'; }}
                >
                  <span style={{ color: 'var(--green)' }}>{icon}</span>
                  <div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{label}</div>
                    <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10 }}>@{sub.split('-')[0]}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right - form */}
        <div style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: '2rem', position: 'relative', overflow: 'hidden', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--green), var(--cyan))' }} />

          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
              <div style={{ fontSize: 40, marginBottom: '1rem' }}>✓</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--green)', marginBottom: '0.5rem' }}>Message sent!</div>
              <div style={{ fontSize: 14, color: 'var(--text2)' }}>I'll get back to you soon.</div>
              <button onClick={() => setSent(false)} style={{ marginTop: '1.5rem', background: 'transparent', border: '1px solid var(--border)', color: 'var(--text2)', padding: '8px 20px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12 }}>
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--green)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>SEND A MESSAGE</div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }} className="form-row">
                {[
                  { name: 'name', label: 'Your Name', type: 'text', placeholder: 'John Doe' },
                  { name: 'email', label: 'Email Address', type: 'email', placeholder: 'john@email.com' },
                ].map(field => (
                  <div key={field.name}>
                    <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text2)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>{field.label.toUpperCase()}</label>
                    <input
                      type={field.type} name={field.name} value={form[field.name]}
                      onChange={handleChange} placeholder={field.placeholder} required
                      style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
                      onFocus={e => e.target.style.borderColor = 'rgba(0,255,136,0.5)'}
                      onBlur={e => e.target.style.borderColor = 'var(--border)'}
                    />
                  </div>
                ))}
              </div>

              <div style={{ marginBottom: '1rem' }}>
                <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text2)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>SUBJECT</label>
                <input
                  type="text" name="subject" value={form.subject} onChange={handleChange}
                  placeholder="Job opportunity / Freelance project / Just saying hi"
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', outline: 'none', transition: 'border-color 0.2s' }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,255,136,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              <div style={{ marginBottom: '1.5rem' }}>
                <label style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text2)', display: 'block', marginBottom: 6, letterSpacing: '0.08em' }}>MESSAGE</label>
                <textarea
                  name="message" value={form.message} onChange={handleChange}
                  placeholder="Tell me about the role / project..." required rows={5}
                  style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, padding: '10px 14px', color: 'var(--text)', fontSize: 13, fontFamily: 'inherit', outline: 'none', resize: 'vertical', transition: 'border-color 0.2s', minHeight: 120 }}
                  onFocus={e => e.target.style.borderColor = 'rgba(0,255,136,0.5)'}
                  onBlur={e => e.target.style.borderColor = 'var(--border)'}
                />
              </div>

              {error && <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--red)', marginBottom: '1rem' }}>{error}</div>}

              <button type="submit" disabled={sending} style={{
                width: '100%', background: 'var(--green)', color: '#080c12',
                border: 'none', padding: '12px', borderRadius: 8,
                fontWeight: 700, fontFamily: 'Space Mono, monospace', fontSize: 13,
                cursor: sending ? 'not-allowed' : 'pointer', opacity: sending ? 0.7 : 1,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
                transition: 'all 0.2s', letterSpacing: '0.05em',
              }}
                onMouseEnter={e => { if (!sending) e.currentTarget.style.opacity = 0.9; }}
                onMouseLeave={e => { if (!sending) e.currentTarget.style.opacity = 1; }}
              >
                <Send size={14} /> {sending ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
