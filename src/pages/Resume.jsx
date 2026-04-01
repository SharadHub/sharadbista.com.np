import { useEffect, useState, useRef } from 'react';
import { Download, Printer, ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const LinkedinIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

// The actual resume content rendered in HTML — this is what gets printed/viewed
function ResumeDocument({ forPrint = false }) {
  const s = {
    page: {
      background: '#fff',
      color: '#111',
      fontFamily: 'Inter, sans-serif',
      fontSize: forPrint ? 11 : 13,
      lineHeight: 1.6,
      padding: forPrint ? '0' : '2.5rem 3rem',
      maxWidth: 760,
      margin: '0 auto',
    },
    name: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: forPrint ? 22 : 28,
      fontWeight: 800,
      color: '#0a0a0a',
      letterSpacing: '-0.02em',
      marginBottom: 2,
    },
    role: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: forPrint ? 12 : 14,
      fontWeight: 600,
      color: '#16a34a',
      marginBottom: 10,
    },
    contactRow: {
      display: 'flex',
      flexWrap: 'wrap',
      gap: '0.6rem 1.2rem',
      fontSize: forPrint ? 10 : 12,
      color: '#444',
      marginBottom: 20,
      paddingBottom: 16,
      borderBottom: '2px solid #0a0a0a',
    },
    contactItem: {
      display: 'flex',
      alignItems: 'center',
      gap: 5,
      textDecoration: 'none',
      color: '#444',
    },
    sectionTitle: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: forPrint ? 11 : 13,
      fontWeight: 700,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: '#0a0a0a',
      marginBottom: 10,
      marginTop: 20,
      paddingBottom: 4,
      borderBottom: '1px solid #e5e7eb',
    },
    expTitle: {
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: forPrint ? 12 : 14,
      fontWeight: 700,
      color: '#0a0a0a',
    },
    expMeta: {
      fontSize: forPrint ? 10 : 12,
      color: '#6b7280',
      marginBottom: 6,
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 4,
    },
    bullet: {
      display: 'flex',
      gap: 8,
      marginBottom: 4,
      fontSize: forPrint ? 10.5 : 13,
      color: '#374151',
      alignItems: 'flex-start',
    },
    dot: { color: '#16a34a', flexShrink: 0, marginTop: 2 },
    tag: {
      display: 'inline-block',
      padding: '2px 8px',
      background: '#f3f4f6',
      borderRadius: 4,
      fontSize: forPrint ? 9.5 : 11,
      color: '#374151',
      fontFamily: 'Space Mono, monospace',
      marginRight: 4,
      marginBottom: 4,
      border: '1px solid #e5e7eb',
    },
    summary: {
      fontSize: forPrint ? 10.5 : 13,
      color: '#374151',
      lineHeight: 1.7,
      marginBottom: 4,
    },
  };

  return (
    <div style={s.page}>
      {/* Header */}
      <div style={s.name}>Sharad Bista</div>
      <div style={s.role}>Full Stack MERN Developer</div>
      <div style={s.contactRow}>
        <a href="mailto:bishalbista737@gmail.com" style={s.contactItem}>
          <Mail size={12} /> bishalbista737@gmail.com
        </a>
        <a href="tel:+9779866123946" style={s.contactItem}>
          <Phone size={12} /> +977 9866123946
        </a>
        <span style={s.contactItem}>
          <MapPin size={12} /> Bhaktapur, Bagmati, Nepal
        </span>
        <a href="https://linkedin.com/in/sharad-bista-849172325" style={s.contactItem}>
          <LinkedinIcon size={12} /> linkedin.com/in/sharad-bista-849172325
        </a>
        <a href="https://github.com/SharadHub" style={s.contactItem}>
          <GithubIcon size={12} /> github.com/SharadHub
        </a>
      </div>

      {/* Summary */}
      <div style={s.sectionTitle}>Professional Summary</div>
      <p style={s.summary}>
        Motivated Computer Application (BCA) student with hands-on internship experience building production-ready web applications using React, Tailwind CSS, Node.js, and Supabase. Delivered 2 live applications a Radiology Dashboard and a Café Billing POS at Aariyana Tech Solutions. Passionate about clean, maintainable code and solving real problems through modern MERN stack technologies.
      </p>

      {/* Skills */}
      <div style={s.sectionTitle}>Technical Skills</div>
      <div style={{ marginBottom: 4 }}>
        {[
          { label: 'Languages', items: ['JavaScript (ES6+)', 'Python', 'HTML5', 'CSS3'] },
          { label: 'Frontend', items: ['React.js', 'Tailwind CSS', 'Responsive Design'] },
          { label: 'Backend', items: ['Node.js', 'Express.js', 'REST APIs'] },
          { label: 'Database', items: ['PostgreSQL', 'MongoDB', 'Supabase', 'MySQL'] },
          { label: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'npm', 'Postman'] },
        ].map(({ label, items }) => (
          <div key={label} style={{ display: 'flex', gap: 8, marginBottom: 6, alignItems: 'flex-start' }}>
            <span style={{ fontSize: forPrint ? 10 : 12, fontWeight: 600, color: '#0a0a0a', minWidth: 80, paddingTop: 2 }}>{label}:</span>
            <div>{items.map(i => <span key={i} style={s.tag}>{i}</span>)}</div>
          </div>
        ))}
      </div>

      {/* Experience */}
      <div style={s.sectionTitle}>Experience</div>
      <div style={{ marginBottom: 12 }}>
        <div style={s.expTitle}>Frontend Intern</div>
        <div style={s.expMeta}>
          <span>Aariyana Tech Solutions — Srijananagar, Bhaktapur</span>
          <span>Sep 2025 – Dec 2025</span>
        </div>
        {[
          'Delivered 2 production-ready web apps — a Radiology Dashboard and a Café Billing POS — using React and the MERN stack, from UI development through to REST API integration.',
          'Optimized React state management and component architecture to improve performance and maintainability.',
          'Collaborated via Git and GitHub throughout the full development cycle, including PR reviews and version control.',
        ].map((b, i) => (
          <div key={i} style={s.bullet}><span style={s.dot}>▸</span><span>{b}</span></div>
        ))}
      </div>

      {/* Projects */}
      <div style={s.sectionTitle}>Projects</div>

      {[
        {
          title: 'Root Finder',
          tech: 'React · Tailwind CSS · Supabase · PostgreSQL',
          link: 'github.com/SharadHub/root-finder',
          bullets: [
            'Built a full-stack travel discovery platform for finding Asian-owned businesses (hotels, cafes, restaurants) worldwide.',
            'Implemented fully responsive React + Tailwind CSS frontend with dynamic search, filters, and Supabase for auth, database, and cloud storage.',
            'Designed a PostgreSQL schema via Supabase to manage business listings, user accounts, and reviews with SEO optimization for production deployment.',
          ],
        },
        {
          title: 'SEO Marketplace Platform',
          tech: 'PHP · MySQL · JavaScript · Bootstrap',
          link: 'github.com/SharadHub/SEOMARKETPLACE',
          bullets: [
            'Comprehensive platform connecting businesses with SEO professionals, featuring dual-role auth, project bidding, and milestone management.',
          ],
        },
      ].map(({ title, tech, link, bullets }) => (
        <div key={title} style={{ marginBottom: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 4 }}>
            <span style={{ ...s.expTitle }}>{title}</span>
            <span style={{ fontSize: forPrint ? 9 : 11, color: '#9ca3af', fontFamily: 'Space Mono, monospace' }}>{link}</span>
          </div>
          <div style={{ fontSize: forPrint ? 10 : 11, color: '#6b7280', fontFamily: 'Space Mono, monospace', marginBottom: 5 }}>{tech}</div>
          {bullets.map((b, i) => (
            <div key={i} style={s.bullet}><span style={s.dot}>▸</span><span>{b}</span></div>
          ))}
        </div>
      ))}

      {/* Education */}
      <div style={s.sectionTitle}>Education</div>
      <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 4 }}>
        <div>
          <div style={s.expTitle}>Bachelor in Computer Application (BCA)</div>
          <div style={{ fontSize: forPrint ? 10 : 12, color: '#6b7280' }}>New Summit College — Bhaktapur, Bagmati</div>
          <div style={{ fontSize: forPrint ? 10 : 12, color: '#6b7280', marginTop: 2 }}>
            Relevant: Data Structures & Algorithms · Web Technologies · Database Management · OOP
          </div>
        </div>
        <div style={{ fontSize: forPrint ? 10 : 12, color: '#6b7280', textAlign: 'right' }}>Expected: December 2026</div>
      </div>
    </div>
  );
}

export default function Resume() {
  const [visible, setVisible] = useState(false);
  const printRef = useRef();

  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  const handlePrint = () => {
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Sharad Bista — Resume</title>
          <link rel="preconnect" href="https://fonts.googleapis.com">
          <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;600;700;800&family=Inter:wght@400;500;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
          <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Inter', sans-serif; color: #111; background: #fff; }
            @page { margin: 1.5cm 1.8cm; size: A4; }
            @media print { body { -webkit-print-color-adjust: exact; print-color-adjust: exact; } }
          </style>
        </head>
        <body>${printRef.current.innerHTML}</body>
      </html>
    `);
    printWindow.document.close();
    printWindow.focus();
    setTimeout(() => { printWindow.print(); printWindow.close(); }, 600);
  };

  const handleDownload = () => {
    // Since we don't have a real PDF, open print dialog targeting the resume
    handlePrint();
  };

  return (
    <div style={{ minHeight: '100vh', padding: '120px clamp(1rem, 5vw, 6rem) 4rem', maxWidth: 1100, margin: '0 auto' }}>

      {/* Page header */}
      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: '2rem' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--green)', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--green)' }} />
          RESUME
        </span>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '0.5rem' }}>
              Sharad Bista<br />
              <span style={{ color: 'var(--green)', fontSize: '0.6em' }}>Full Stack MERN Developer</span>
            </h2>
            <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.6, maxWidth: 480 }}>
              View, download, or print a clean single-page version of my resume below.
            </p>
          </div>

          {/* Action buttons */}
          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              onClick={handlePrint}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'transparent', border: '1px solid var(--border)',
                color: 'var(--text)', padding: '10px 20px', borderRadius: 8,
                cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12,
                transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--text2)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <Printer size={14} /> Print
            </button>

            <button
              onClick={handleDownload}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'var(--green)', color: '#080c12',
                border: 'none', padding: '10px 20px', borderRadius: 8,
                cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12,
                fontWeight: 700, transition: 'all 0.2s', letterSpacing: '0.03em',
              }}
              onMouseEnter={e => e.currentTarget.style.opacity = 0.9}
              onMouseLeave={e => e.currentTarget.style.opacity = 1}
            >
              <Download size={14} /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Resume viewer */}
      <div style={{
        opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.2s',
        background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16,
        overflow: 'hidden',
      }}>
        {/* Viewer toolbar */}
        <div style={{
          background: 'var(--bg2)', padding: '10px 16px',
          borderBottom: '1px solid var(--border)',
          display: 'flex', alignItems: 'center', gap: 8,
        }}>
          <div style={{ display: 'flex', gap: 5 }}>
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
            <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
          </div>
          <div style={{ flex: 1, background: 'var(--surface)', borderRadius: 4, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--text2)' }}>
              sharad-bista-resume.pdf
            </span>
          </div>
          <button onClick={handlePrint}
            style={{ background: 'none', border: 'none', color: 'var(--text2)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontFamily: 'Space Mono, monospace', fontSize: 11, padding: '2px 6px' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--green)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text2)'}
          >
            <Printer size={12} /> Print
          </button>
        </div>

        {/* Paper shadow effect */}
        <div style={{ padding: '2rem', background: '#2a2a2a' }}>
          <div style={{
            maxWidth: 760, margin: '0 auto',
            background: '#fff', borderRadius: 4,
            boxShadow: '0 4px 40px rgba(0,0,0,0.5)',
            overflow: 'hidden',
          }}>
            {/* Hidden print target */}
            <div ref={printRef} style={{ display: 'none' }}>
              <ResumeDocument forPrint={true} />
            </div>
            {/* Visible resume */}
            <ResumeDocument forPrint={false} />
          </div>
        </div>
      </div>

      {/* Bottom actions repeated for convenience */}
      <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '2rem', opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.4s', flexWrap: 'wrap' }}>
        <button onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'transparent', border: '1px solid var(--border)', color: 'var(--text)', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12, transition: 'all 0.2s' }}>
          <Printer size={14} /> Print Resume
        </button>
        <button onClick={handleDownload} style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'var(--green)', color: '#080c12', border: 'none', padding: '10px 24px', borderRadius: 8, cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12, fontWeight: 700 }}>
          <Download size={14} /> Download PDF
        </button>
      </div>
    </div>
  );
}
