import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Menu, X } from 'lucide-react';
// Github/Linkedin SVG inline since lucide version doesn't have them

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/skills', label: 'Skills' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [location]);

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? 'rgba(8,12,18,0.95)' : 'transparent',
      backdropFilter: scrolled ? 'blur(20px)' : 'none',
      borderBottom: scrolled ? '1px solid rgba(0,255,136,0.1)' : '1px solid transparent',
      transition: 'all 0.4s ease',
      padding: '0 clamp(1rem, 4vw, 3rem)',
    }}>
      <div style={{
        maxWidth: 1200, margin: '0 auto',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        height: 64,
      }}>
        {/* Logo */}
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 32, height: 32, background: 'var(--green)',
            borderRadius: 6, display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Terminal size={16} color="#080c12" strokeWidth={2.5} />
          </div>
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 14, color: 'var(--text)',
            letterSpacing: '0.05em',
          }}>
            <span style={{ color: 'var(--green)' }}>sharad</span>.dev
          </span>
        </Link>

        {/* Desktop links */}
        <ul style={{
          display: 'flex', gap: '2rem', listStyle: 'none', alignItems: 'center',
          '@media(max-width:768px)': { display: 'none' },
        }} className="desktop-nav">
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <li key={to}>
                <Link to={to} style={{
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 13, letterSpacing: '0.05em',
                  textDecoration: 'none',
                  color: active ? 'var(--green)' : 'var(--text2)',
                  transition: 'color 0.2s',
                  position: 'relative',
                  paddingBottom: 4,
                }}
                  onMouseEnter={e => { if (!active) e.target.style.color = 'var(--text)'; }}
                  onMouseLeave={e => { if (!active) e.target.style.color = 'var(--text2)'; }}
                >
                  {active && <span style={{ color: 'var(--green)', marginRight: 4 }}>//</span>}
                  {label}
                </Link>
              </li>
            );
          })}
          <li>
            <Link
              to="/resume"
              style={{
                fontFamily: 'Space Mono, monospace', fontSize: 12,
                color: 'var(--bg)', background: 'var(--green)',
                padding: '7px 18px', borderRadius: 4,
                textDecoration: 'none', fontWeight: 700,
                letterSpacing: '0.05em', transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => e.target.style.opacity = 0.85}
              onMouseLeave={e => e.target.style.opacity = 1}
            >
              Resume ↗
            </Link>
          </li>
        </ul>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(!open)}
          className="mobile-menu-btn"
          style={{
            background: 'none', border: 'none', color: 'var(--text)',
            cursor: 'pointer', padding: 8,
          }}
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile dropdown */}
      {open && (
        <div style={{
          background: 'var(--bg2)', borderTop: '1px solid var(--border)',
          padding: '1rem clamp(1rem, 4vw, 3rem)',
        }}>
          {links.map(({ to, label }) => {
            const active = location.pathname === to;
            return (
              <Link key={to} to={to} style={{
                display: 'block', padding: '0.75rem 0',
                fontFamily: 'Space Mono, monospace', fontSize: 13,
                color: active ? 'var(--green)' : 'var(--text2)',
                textDecoration: 'none',
                borderBottom: '1px solid var(--border)',
              }}>
                {active && '// '}{label}
              </Link>
            );
          })}
          <div style={{ marginTop: '1rem' }}>
            <Link to="/resume" style={{
              fontFamily: 'Space Mono, monospace', fontSize: 12,
              color: 'var(--bg)', background: 'var(--green)',
              padding: '8px 20px', borderRadius: 4,
              textDecoration: 'none', fontWeight: 700,
              display: 'inline-block',
            }}>
              Resume ↗
            </Link>
          </div>
        </div>
      )}

      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-menu-btn { display: none !important; }
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
    </nav>
  );
}
