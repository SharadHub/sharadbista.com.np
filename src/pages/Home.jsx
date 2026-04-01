import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Mail, ArrowRight, Code, Server, Database } from 'lucide-react';

// Inline SVGs for brand icons not in this lucide version
const GithubIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const roles = ['Frontend & React Developer', 'MERN Stack Developer', 'Full Stack Developer'];

export default function Home() {
  const [roleIdx, setRoleIdx] = useState(0);
  const [typed, setTyped] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setTimeout(() => setMounted(true), 100); }, []);

  useEffect(() => {
    const target = roles[roleIdx];
    let timeout;
    if (!deleting && typed.length < target.length) {
      timeout = setTimeout(() => setTyped(target.slice(0, typed.length + 1)), 60);
    } else if (!deleting && typed.length === target.length) {
      timeout = setTimeout(() => setDeleting(true), 2200);
    } else if (deleting && typed.length > 0) {
      timeout = setTimeout(() => setTyped(typed.slice(0, -1)), 30);
    } else if (deleting && typed.length === 0) {
      setDeleting(false);
      setRoleIdx((roleIdx + 1) % roles.length);
    }
    return () => clearTimeout(timeout);
  }, [typed, deleting, roleIdx]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '80px clamp(1rem, 5vw, 6rem) 4rem', maxWidth: 1200, margin: '0 auto' }}>

      {/* Top label */}
      <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease 0.1s' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--green)', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--green)' }} />
          AVAILABLE FOR HIRE
        </span>
      </div>

      {/* Hero text */}
      <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.2s' }}>
        <h1 style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', fontWeight: 800, lineHeight: 1.05, marginBottom: '0.5rem' }}>
          <span style={{ display: 'block', color: 'var(--text2)', fontSize: '0.45em', fontFamily: 'Space Mono, monospace', letterSpacing: '0.05em', marginBottom: '0.5rem', fontWeight: 400 }}>Hi, I'm</span>
          Sharad<br />
          <span style={{ background: 'linear-gradient(135deg, var(--green) 0%, var(--cyan) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>Bista.</span>
        </h1>
      </div>

      {/* Typed role */}
      <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.35s', marginBottom: '1.5rem' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 'clamp(1rem, 2.5vw, 1.4rem)', color: 'var(--text2)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <span style={{ color: 'var(--green)' }}>$ </span>
          <span>{typed}</span>
          <span style={{ display: 'inline-block', width: 2, height: '1.2em', background: 'var(--green)', animation: 'blink 1s step-end infinite' }} />
        </div>
      </div>

      {/* Summary */}
      <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.45s', marginBottom: '2.5rem' }}>
        <p style={{ fontSize: 'clamp(0.9rem, 1.5vw, 1.05rem)', color: 'var(--text2)', maxWidth: 520, lineHeight: 1.75 }}>
          BCA student develoing production React apps with MERN stack. I write clean, maintainable code and love solving real problems.
        </p>
      </div>

      {/* CTA buttons */}
      <div style={{ opacity: mounted ? 1 : 0, transform: mounted ? 'translateY(0)' : 'translateY(30px)', transition: 'all 0.7s ease 0.55s', display: 'flex', gap: '1rem', flexWrap: 'wrap', marginBottom: '3.5rem' }}>
        <Link to="/projects" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'var(--green)', color: '#080c12',
          padding: '12px 28px', borderRadius: 6, fontWeight: 700,
          fontFamily: 'Space Mono, monospace', fontSize: 13,
          textDecoration: 'none', transition: 'all 0.2s',
          letterSpacing: '0.03em',
        }}
          onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 30px rgba(0,255,136,0.25)'; }}
          onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
        >
          View Projects <ArrowRight size={14} />
        </Link>
        <Link to="/contact" style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          background: 'transparent', color: 'var(--text)',
          padding: '12px 28px', borderRadius: 6, fontWeight: 600,
          fontFamily: 'Space Mono, monospace', fontSize: 13,
          textDecoration: 'none', border: '1px solid var(--border)',
          transition: 'all 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }}
          onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text)'; }}
        >
          Get In Touch
        </Link>
      </div>

      {/* Social + quick stats */}
      <div style={{ opacity: mounted ? 1 : 0, transition: 'opacity 0.7s ease 0.65s', display: 'flex', alignItems: 'center', gap: '2rem', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '1rem' }}>
          {[
            { href: 'https://github.com/SharadHub', icon: <GithubIcon size={18} />, label: 'GitHub' },
            { href: 'https://linkedin.com/in/sharad-bista-849172325', icon: <LinkedinIcon size={18} />, label: 'LinkedIn' },
            { href: 'mailto:bishalbista737@gmail.com', icon: <Mail size={18} />, label: 'Email' },
          ].map(({ href, icon, label }) => (
            <a key={label} href={href} target="_blank" rel="noreferrer"
              aria-label={label}
              style={{ color: 'var(--text2)', transition: 'color 0.2s', display: 'flex', alignItems: 'center' }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
              onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
            >
              {icon}
            </a>
          ))}
        </div>
        <div style={{ width: 1, height: 20, background: 'var(--border)' }} />
        <div style={{ display: 'flex', gap: '1.5rem' }}>
          {[
            { icon: <Code size={14} />, label: '2 production apps' },
            { icon: <Server size={14} />, label: 'MERN stack' },
            { icon: <Database size={14} />, label: 'Supabase + MongoDB' },
          ].map(({ icon, label }) => (
            <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text2)' }}>
              <span style={{ color: 'var(--green)' }}>{icon}</span> {label}
            </div>
          ))}
        </div>
      </div>

      {/* Profile photo - decorative positioned */}
      <div style={{
        position: 'fixed', right: 'clamp(2rem, 8vw, 10rem)', top: '50%', transform: 'translateY(-50%)',
        opacity: mounted ? 1 : 0, transition: 'opacity 1s ease 0.8s',
        pointerEvents: 'none',
      }} className="hero-photo">
        <div style={{ position: 'relative' }}>
          <div style={{ width: 280, height: 340, borderRadius: 16, overflow: 'hidden', border: '1px solid var(--border)', position: 'relative' }}>
            <img src="/sharad.jpg" alt="Sharad Bista" style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', filter: 'brightness(0.9) contrast(1.05)' }} />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(8,12,18,0.6) 0%, transparent 50%)' }} />
          </div>
          {/* Decorative corner bracket */}
          <div style={{ position: 'absolute', top: -8, right: -8, width: 40, height: 40, borderTop: '2px solid var(--green)', borderRight: '2px solid var(--green)', borderRadius: '0 4px 0 0' }} />
          <div style={{ position: 'absolute', bottom: -8, left: -8, width: 40, height: 40, borderBottom: '2px solid var(--green)', borderLeft: '2px solid var(--green)', borderRadius: '0 0 0 4px' }} />
          {/* Status badge */}
          <div style={{ position: 'absolute', bottom: 16, left: '50%', transform: 'translateX(-50%)', background: 'rgba(8,12,18,0.9)', backdropFilter: 'blur(10px)', border: '1px solid var(--border)', borderRadius: 20, padding: '6px 14px', display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--green)', boxShadow: '0 0 6px var(--green)', animation: 'pulse 2s infinite' }} />
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text2)' }}>Open to work</span>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink { 50% { opacity: 0; } }
        @keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.4; } }
        @media (max-width: 900px) { .hero-photo { display: none !important; } }
      `}</style>
    </div>
  );
}
