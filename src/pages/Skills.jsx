import { useEffect, useRef, useState } from 'react';
import { skills } from '../data/projects';

function SkillBar({ name, level, color, delay }) {
  const [animated, setAnimated] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setTimeout(() => setAnimated(true), delay); } },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} style={{ marginBottom: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text)' }}>{name}</span>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color }}>
          {animated ? level : 0}%
        </span>
      </div>
      <div style={{ height: 4, background: 'var(--surface)', borderRadius: 2, overflow: 'hidden' }}>
        <div style={{
          height: '100%', borderRadius: 2,
          background: `linear-gradient(90deg, ${color}, ${color}aa)`,
          width: animated ? `${level}%` : '0%',
          transition: `width 1s cubic-bezier(0.4, 0, 0.2, 1) ${delay}ms`,
          boxShadow: `0 0 8px ${color}60`,
        }} />
      </div>
    </div>
  );
}

const categories = [
  { key: 'frontend', label: 'Frontend', color: '#00ff88', icon: '⬡' },
  { key: 'backend', label: 'Backend', color: '#00d4ff', icon: '⬡' },
  { key: 'database', label: 'Database', color: '#ff6b35', icon: '⬡' },
  { key: 'tools', label: 'Dev Tools', color: '#a78bfa', icon: '⬡' },
];

const techIcons = {
  'JavaScript (ES6+)': 'JS', 'React.js': 'Re', 'Node.js': 'No', 'Express.js': 'Ex',
  'MongoDB': 'Mo', 'PostgreSQL': 'PG', 'Supabase': 'Sb', 'Git & GitHub': 'Git',
  'Tailwind CSS': 'Tw', 'Python': 'Py', 'HTML5 / CSS3': 'HT', 'MySQL': 'My',
  'Postman': 'Po', 'VS Code': 'VS', 'npm': 'npm', 'REST APIs': 'API', 'Responsive Design': 'RD',
};

export default function Skills() {
  const [visible, setVisible] = useState(false);
  useEffect(() => { setTimeout(() => setVisible(true), 100); }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '120px clamp(1rem, 5vw, 6rem) 4rem', maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--green)', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--green)' }} />
          SKILLS
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          My tech<br />
          <span style={{ color: 'var(--green)' }}>stack.</span>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 460, lineHeight: 1.7 }}>
          The tools I reach for when building full-stack MERN applications.
        </p>
      </div>

      {/* Skill bars grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 460px), 1fr))', gap: '2rem', marginBottom: '4rem' }}>
        {categories.map(cat => (
          <div key={cat.key} style={{ background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16, padding: '1.75rem', position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 2, background: `linear-gradient(90deg, ${cat.color}, transparent)` }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: cat.color, letterSpacing: '0.1em' }}>{cat.label.toUpperCase()}</span>
            </div>
            {skills[cat.key].map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} level={skill.level} color={cat.color} delay={i * 80} />
            ))}
          </div>
        ))}
      </div>

      {/* Tech bubbles */}
      <div style={{ opacity: visible ? 1 : 0, transition: 'opacity 0.6s ease 0.3s' }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text2)', letterSpacing: '0.1em', marginBottom: '1.5rem' }}>ALL TECHNOLOGIES</div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
          {Object.keys(techIcons).map(tech => (
            <div key={tech} style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '8px 16px', background: 'var(--bg3)', border: '1px solid var(--border)',
              borderRadius: 8, transition: 'all 0.2s', cursor: 'default',
            }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'var(--green)'; e.currentTarget.style.color = 'var(--green)'; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--text2)'; }}
            >
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: 'var(--green)', background: 'var(--surface)', padding: '2px 5px', borderRadius: 3, minWidth: 28, textAlign: 'center' }}>{techIcons[tech]}</span>
              <span style={{ fontSize: 13, color: 'var(--text)' }}>{tech}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Learning */}
      <div style={{ marginTop: '3rem', padding: '1.5rem 2rem', background: 'linear-gradient(135deg, rgba(0,255,136,0.05), rgba(0,212,255,0.05))', border: '1px solid rgba(0,255,136,0.15)', borderRadius: 12 }}>
        <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--green)', marginBottom: '0.75rem', letterSpacing: '0.1em' }}>CURRENTLY LEARNING</div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          {['TypeScript', 'Next.js', 'Docker', 'Redis'].map(item => (
            <span key={item} style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--text2)', padding: '4px 12px', background: 'var(--surface)', borderRadius: 4, border: '1px dashed var(--border)' }}>
              {item} →
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
