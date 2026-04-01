import { useState, useRef, useCallback } from 'react';
import { ExternalLink, RotateCcw, Monitor, Smartphone, Tablet } from 'lucide-react';

const VIEWPORTS = [
  { id: 'desktop', icon: Monitor, label: 'Desktop', width: '100%' },
  { id: 'tablet',  icon: Tablet,  label: 'Tablet',  width: '768px' },
  { id: 'mobile',  icon: Smartphone, label: 'Mobile', width: '390px' },
];

export default function LivePreview({ url, accent, title }) {
  const [loading, setLoading] = useState(true);
  const [errored, setErrored] = useState(false);
  const [viewport, setViewport] = useState('desktop');
  const [reloadKey, setReloadKey] = useState(0);
  const iframeRef = useRef(null);

  const currentViewport = VIEWPORTS.find(v => v.id === viewport);
  const displayUrl = url.replace(/^https?:\/\//, '');

  const handleReload = useCallback(() => {
    setLoading(true);
    setErrored(false);
    setReloadKey(k => k + 1);
  }, []);

  const handleLoad = useCallback(() => setLoading(false), []);
  const handleError = useCallback(() => { setLoading(false); setErrored(true); }, []);

  return (
    <div style={{
      borderRadius: 14,
      overflow: 'hidden',
      border: `1px solid ${accent}25`,
      background: '#0d1117',
      boxShadow: `0 0 60px ${accent}08`,
    }}>
      {/* ── Browser chrome top bar ── */}
      <div style={{
        background: '#161b22',
        borderBottom: '1px solid #21314a',
        padding: '8px 12px',
        display: 'flex',
        alignItems: 'center',
        gap: 10,
      }}>
        {/* Traffic lights */}
        <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        </div>

        {/* Address bar */}
        <div style={{
          flex: 1,
          background: '#0d1117',
          borderRadius: 6,
          padding: '4px 10px',
          display: 'flex',
          alignItems: 'center',
          gap: 7,
          border: '1px solid #21314a',
          minWidth: 0,
        }}>
          <div style={{ width: 7, height: 7, borderRadius: '50%', background: accent, opacity: 0.75, flexShrink: 0 }} />
          <span style={{
            fontFamily: 'Space Mono, monospace',
            fontSize: 11,
            color: '#6e8098',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}>
            {displayUrl}
          </span>
        </div>

        {/* Viewport switcher */}
        <div style={{ display: 'flex', gap: 2, flexShrink: 0 }}>
          {VIEWPORTS.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              title={label}
              onClick={() => setViewport(id)}
              style={{
                background: viewport === id ? accent + '20' : 'transparent',
                border: `1px solid ${viewport === id ? accent + '50' : 'transparent'}`,
                color: viewport === id ? accent : '#4a5568',
                borderRadius: 5,
                padding: '4px 6px',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                transition: 'all 0.15s',
              }}
            >
              <Icon size={13} />
            </button>
          ))}
        </div>

        {/* Reload */}
        <button
          title="Reload"
          onClick={handleReload}
          style={{
            background: 'transparent',
            border: '1px solid #21314a',
            color: '#4a5568',
            borderRadius: 5,
            padding: '4px 7px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            transition: 'all 0.15s',
            flexShrink: 0,
          }}
          onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent + '50'; }}
          onMouseLeave={e => { e.currentTarget.style.color = '#4a5568'; e.currentTarget.style.borderColor = '#21314a'; }}
        >
          <RotateCcw size={12} />
        </button>

        {/* Open in new tab */}
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          title="Open in new tab"
          style={{
            background: 'transparent',
            border: `1px solid ${accent}40`,
            color: accent,
            borderRadius: 5,
            padding: '4px 9px',
            display: 'flex',
            alignItems: 'center',
            gap: 5,
            textDecoration: 'none',
            fontFamily: 'Space Mono, monospace',
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.04em',
            flexShrink: 0,
            transition: 'all 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = accent + '15'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
        >
          <ExternalLink size={11} /> Open
        </a>
      </div>

      {/* ── Viewport container ── */}
      <div style={{
        background: '#080c12',
        display: 'flex',
        justifyContent: 'center',
        padding: viewport === 'desktop' ? 0 : '12px 12px 0',
        minHeight: 520,
        position: 'relative',
        transition: 'padding 0.3s ease',
      }}>
        {/* Loading skeleton */}
        {loading && !errored && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 14, background: '#080c12',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '80%', maxWidth: 360 }}>
              {[100, 60, 80].map((w, i) => (
                <div key={i} style={{
                  height: i === 0 ? 18 : 12,
                  width: `${w}%`,
                  borderRadius: 4,
                  background: `linear-gradient(90deg, #161b22 25%, #21314a 50%, #161b22 75%)`,
                  backgroundSize: '200% 100%',
                  animation: 'shimmer 1.5s infinite',
                }} />
              ))}
            </div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: accent, opacity: 0.6, letterSpacing: '0.1em' }}>
              LOADING {title.toUpperCase()}…
            </div>
          </div>
        )}

        {/* Error state */}
        {errored && (
          <div style={{
            position: 'absolute', inset: 0, zIndex: 10,
            display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
            gap: 12, background: '#080c12',
          }}>
            <div style={{ fontSize: 32 }}>⚠️</div>
            <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#ff5f57', textAlign: 'center' }}>
              Could not load preview
            </div>
            <div style={{ fontSize: 11, color: '#4a5568', fontFamily: 'Space Mono, monospace', textAlign: 'center', maxWidth: 240 }}>
              The site may block embedding. Open it directly instead.
            </div>
            <a href={url} target="_blank" rel="noreferrer" style={{
              padding: '8px 16px', background: accent, color: '#080c12',
              borderRadius: 6, textDecoration: 'none', fontFamily: 'Space Mono, monospace',
              fontSize: 11, fontWeight: 700,
            }}>
              Open {title} →
            </a>
          </div>
        )}

        {/* Iframe */}
        <div style={{
          width: currentViewport.width,
          maxWidth: '100%',
          transition: 'width 0.3s ease',
          borderRadius: viewport !== 'desktop' ? '10px 10px 0 0' : 0,
          overflow: 'hidden',
          boxShadow: viewport !== 'desktop' ? `0 0 30px #00000080` : 'none',
        }}>
          <iframe
            key={reloadKey}
            ref={iframeRef}
            src={url}
            title={title}
            onLoad={handleLoad}
            onError={handleError}
            style={{
              width: '100%',
              height: 520,
              border: 'none',
              display: 'block',
              opacity: loading ? 0 : 1,
              transition: 'opacity 0.4s ease',
            }}
            allow="clipboard-read; clipboard-write"
            sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox"
          />
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}
