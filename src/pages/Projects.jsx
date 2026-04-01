import { useState, useEffect } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Zap, Play } from 'lucide-react';
import { projects } from '../data/projects';
import ProjectPreview from '../components/ProjectPreview';
import MiniWindow from '../components/MiniWindow';

const GithubIcon = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
  </svg>
);

const statusColor = { Live: '#00ff88', Production: '#00d4ff', Completed: '#a78bfa' };

/* ── Global mini-window state — only one project open at a time ── */
function useGlobalPreview() {
  const [active, setActive] = useState(null); // { url, title, accent }
  const open  = (project) => setActive({ url: project.liveUrl, title: project.title, accent: project.color });
  const close = () => setActive(null);
  return { active, open, close };
}

function ProjectCard({ project, idx, onOpenLive }) {
  const [expanded, setExpanded] = useState(false);
  const [visible,  setVisible]  = useState(false);

  useEffect(() => { setTimeout(() => setVisible(true), 150 + idx * 100); }, [idx]);

  const hasLive = Boolean(project.liveUrl);

  return (
    <div style={{
      background: 'var(--bg3)', border: '1px solid var(--border)', borderRadius: 16,
      overflow: 'hidden', transition: 'all 0.4s ease',
      opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(30px)',
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = project.color + '40'; e.currentTarget.style.boxShadow = `0 0 40px ${project.color}10`; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.boxShadow = 'none'; }}
    >
      {/* Accent top bar */}
      <div style={{ height: 2, background: `linear-gradient(90deg, ${project.color}, transparent)` }} />

      <div style={{ padding: '2rem' }}>
        {/* Header row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: project.color, padding: '3px 8px', background: project.color + '15', borderRadius: 4, border: `1px solid ${project.color}30` }}>
                {project.type}
              </span>
              <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: statusColor[project.status], display: 'flex', alignItems: 'center', gap: 4 }}>
                <span style={{ width: 5, height: 5, borderRadius: '50%', background: statusColor[project.status], display: 'inline-block', boxShadow: `0 0 5px ${statusColor[project.status]}` }} />
                {project.status}
              </span>
            </div>
            <h3 style={{ fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', fontWeight: 800, color: 'var(--text)', marginBottom: 4 }}>{project.title}</h3>
            <p style={{ fontSize: 13, color: 'var(--text2)', fontStyle: 'italic' }}>{project.tagline}</p>
          </div>
          <div style={{ display: 'flex', gap: 8 }}>
            <a href={project.github} target="_blank" rel="noreferrer"
              style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 8, color: 'var(--text2)', textDecoration: 'none', fontSize: 12, fontFamily: 'Space Mono, monospace', transition: 'all 0.2s' }}
              onMouseEnter={e => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = '#8b949e'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--text2)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              <GithubIcon size={14} /> Code
            </a>
          </div>
        </div>

        {/* Description */}
        <p style={{ fontSize: 14, color: 'var(--text2)', lineHeight: 1.7, marginBottom: '1.5rem' }}>{project.description}</p>

        {/* Tech stack */}
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
          {project.tech.map(t => (
            <span key={t} style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, padding: '4px 10px', background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 4, color: 'var(--text2)' }}>{t}</span>
          ))}
        </div>

        {/* Action buttons row */}
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
          {/* Live preview button — only for projects with a live URL */}
          {hasLive && (
            <button
              onClick={() => onOpenLive(project)}
              style={{
                flex: 1, minWidth: 160,
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7,
                background: project.color + '15',
                border: `1px solid ${project.color}50`,
                color: project.color, padding: '10px 18px', borderRadius: 8,
                cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12,
                fontWeight: 700, letterSpacing: '0.03em', transition: 'all 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = project.color + '28'; e.currentTarget.style.boxShadow = `0 0 20px ${project.color}25`; }}
              onMouseLeave={e => { e.currentTarget.style.background = project.color + '15'; e.currentTarget.style.boxShadow = 'none'; }}
            >
              <Play size={12} style={{ fill: 'currentColor' }} />
              Run Live Preview
            </button>
          )}

          {/* Mockup toggle */}
          
        </div>

        {/* Expanded mockup preview */}
        {expanded && (
          <div style={{ marginTop: '1.5rem', animation: 'fadeIn 0.3s ease' }}>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: 'var(--text2)', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ color: project.color }}>▸</span> Interactive UI Mockup
            </div>
            <ProjectPreview preview={project.preview} accent={project.color} title={project.title} />

            {/* Long description */}
            <div style={{ marginTop: '1.5rem', padding: '1.25rem', background: 'var(--surface)', borderRadius: 8, border: '1px solid var(--border)' }}>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: project.color, marginBottom: '0.75rem', letterSpacing: '0.08em' }}>TECHNICAL DETAILS</div>
              <p style={{ fontSize: 13, color: 'var(--text2)', lineHeight: 1.8, marginBottom: '1rem' }}>{project.longDescription}</p>
              <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: project.color, marginBottom: '0.5rem', letterSpacing: '0.08em' }}>KEY FEATURES</div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.4rem' }}>
                {project.features.map(f => (
                  <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 6, fontSize: 12, color: 'var(--text2)' }}>
                    <span style={{ color: project.color, flexShrink: 0, marginTop: 2 }}>✓</span> {f}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(-8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

export default function Projects() {
  const [visible, setVisible] = useState(false);
  const { active, open, close } = useGlobalPreview();

  useEffect(() => { setTimeout(() => setVisible(true), 50); }, []);

  return (
    <div style={{ minHeight: '100vh', padding: '120px clamp(1rem, 5vw, 6rem) 4rem', maxWidth: 1200, margin: '0 auto' }}>

      <div style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(20px)', transition: 'all 0.6s ease', marginBottom: '3rem' }}>
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: 'var(--green)', letterSpacing: '0.15em', display: 'flex', alignItems: 'center', gap: 8, marginBottom: '1.5rem' }}>
          <span style={{ display: 'inline-block', width: 32, height: 1, background: 'var(--green)' }} />
          PROJECTS
        </span>
        <h2 style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 800, lineHeight: 1.1, marginBottom: '1rem' }}>
          Things I have<br />
          <span style={{ color: 'var(--green)' }}>made so far.</span>
        </h2>
        <p style={{ fontSize: 14, color: 'var(--text2)', maxWidth: 560, lineHeight: 1.7 }}>
          Click <span style={{ color: 'var(--green)', fontFamily: 'Space Mono, monospace', fontSize: 12 }}>Run Live Preview</span> to launch an interactive mini-browser window — interact with the real deployed site without leaving this page.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 560px), 1fr))', gap: '1.5rem' }}>
        {projects.map((project, idx) => (
          <ProjectCard key={project.id} project={project} idx={idx} onOpenLive={open} />
        ))}
      </div>

      {/* Floating mini-browser window */}
      {active && (
        <MiniWindow
          url={active.url}
          title={active.title}
          accent={active.accent}
          onClose={close}
        />
      )}
    </div>
  );
}
