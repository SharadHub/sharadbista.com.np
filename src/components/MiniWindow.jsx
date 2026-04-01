import { useState, useRef, useCallback, useEffect } from 'react';
import {
  X, Minus, Maximize2, RotateCcw, ExternalLink,
  Monitor, Tablet, Smartphone, GripVertical,
  AlertTriangle, Loader,
} from 'lucide-react';

const VIEWPORTS = [
  { id: 'desktop',  icon: Monitor,     label: 'Desktop', width: '100%'  },
  { id: 'tablet',   icon: Tablet,      label: 'Tablet',  width: '768px' },
  { id: 'mobile',   icon: Smartphone,  label: 'Mobile',  width: '390px' },
];

/* ─── Drag hook ─────────────────────────────────────── */
function useDrag(initialPos) {
  const [pos, setPos] = useState(initialPos);
  const dragging = useRef(false);
  const start = useRef({ mx: 0, my: 0, px: 0, py: 0 });

  const onMouseDown = useCallback((e) => {
    // Don't drag if clicking a button/input inside the handle
    if (e.target.closest('button, a, input, select')) return;
    dragging.current = true;
    start.current = { mx: e.clientX, my: e.clientY, px: pos.x, py: pos.y };
    e.preventDefault();
  }, [pos]);

  useEffect(() => {
    const onMove = (e) => {
      if (!dragging.current) return;
      const dx = e.clientX - start.current.mx;
      const dy = e.clientY - start.current.my;
      setPos({ x: start.current.px + dx, y: start.current.py + dy });
    };
    const onUp = () => { dragging.current = false; };
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  return [pos, onMouseDown];
}

/* ─── Main Component ─────────────────────────────────── */
export default function MiniWindow({ url, title, accent, onClose }) {
  const [viewport, setViewport] = useState('desktop');
  const [reloadKey, setReloadKey]   = useState(0);
  const [loading,   setLoading]     = useState(true);
  const [errored,   setErrored]     = useState(false);
  const [minimized, setMinimized]   = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const iframeRef = useRef(null);

  /* Center on mount */
  const initPos = {
    x: Math.max(0, window.innerWidth  / 2 - 480),
    y: Math.max(0, window.innerHeight / 2 - 320),
  };
  const [pos, onDragStart] = useDrag(initPos);

  const currentViewport = VIEWPORTS.find(v => v.id === viewport);
  const displayUrl = url.replace(/^https?:\/\//, '');

  const reload = useCallback(() => {
    setLoading(true);
    setErrored(false);
    setReloadKey(k => k + 1);
  }, []);

  /* Try to detect X-Frame-Options block via a timed heuristic:
     If onLoad fires quickly with a blank doc it's usually blocked.
     We use a timeout: if no load in 12s → show error.           */
  useEffect(() => {
    setLoading(true);
    setErrored(false);
    const t = setTimeout(() => setErrored(true), 12000);
    return () => clearTimeout(t);
  }, [reloadKey, url]);

  const handleLoad = useCallback(() => {
    setLoading(false);
    setErrored(false);
  }, []);

  const handleError = useCallback(() => {
    setLoading(false);
    setErrored(true);
  }, []);

  /* ── Styles ── */
  const windowStyle = isMaximized
    ? { position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }
    : {
        position: 'fixed',
        top:  pos.y,
        left: pos.x,
        width: 'min(960px, 94vw)',
        height: minimized ? 'auto' : 'min(640px, 88vh)',
        zIndex: 9999,
        borderRadius: 14,
        overflow: 'hidden',
        resize: 'both',
      };

  return (
    <>
      {/* Backdrop blur overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 9998,
          background: 'rgba(5,8,15,0.6)',
          backdropFilter: 'blur(4px)',
          WebkitBackdropFilter: 'blur(4px)',
          animation: 'fadeBackdrop 0.25s ease',
        }}
      />

      {/* Window */}
      <div style={{
        ...windowStyle,
        display: 'flex', flexDirection: 'column',
        background: '#0d1117',
        border: `1px solid ${accent}35`,
        boxShadow: `0 32px 100px rgba(0,0,0,0.8), 0 0 0 1px ${accent}15, 0 0 60px ${accent}10`,
        animation: 'popIn 0.3s cubic-bezier(0.175,0.885,0.32,1.275)',
      }}>
        {/* ── Title bar / drag handle ── */}
        <div
          onMouseDown={isMaximized ? undefined : onDragStart}
          style={{
            background: '#161b22',
            borderBottom: `1px solid ${accent}20`,
            padding: '0 12px',
            height: 44,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
            userSelect: 'none',
            cursor: isMaximized ? 'default' : 'grab',
            flexShrink: 0,
          }}
        >
          {/* Traffic lights */}
          <div style={{ display: 'flex', gap: 6, flexShrink: 0 }}>
            <button
              title="Close"
              onClick={onClose}
              style={trafficBtn('#ff5f57')}
              onMouseEnter={e => (e.currentTarget.children[0].style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.children[0].style.opacity = '0')}
            >
              <X size={7} style={{ opacity: 0, transition: '0.15s' }} />
            </button>
            <button
              title="Minimize"
              onClick={() => setMinimized(m => !m)}
              style={trafficBtn('#febc2e')}
              onMouseEnter={e => (e.currentTarget.children[0].style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.children[0].style.opacity = '0')}
            >
              <Minus size={7} style={{ opacity: 0, transition: '0.15s' }} />
            </button>
            <button
              title="Maximize"
              onClick={() => setIsMaximized(m => !m)}
              style={trafficBtn('#28c840')}
              onMouseEnter={e => (e.currentTarget.children[0].style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.children[0].style.opacity = '0')}
            >
              <Maximize2 size={7} style={{ opacity: 0, transition: '0.15s' }} />
            </button>
          </div>

          {/* Drag grip hint */}
          {!isMaximized && (
            <GripVertical size={12} style={{ color: '#4a5568', flexShrink: 0 }} />
          )}

          {/* Address bar */}
          <div style={{
            flex: 1, background: '#0d1117', borderRadius: 6,
            padding: '5px 10px', display: 'flex', alignItems: 'center', gap: 7,
            border: `1px solid ${accent}20`, minWidth: 0,
          }}>
            {loading && !errored
              ? <Loader size={8} style={{ color: accent, flexShrink: 0, animation: 'spin 1s linear infinite' }} />
              : <div style={{ width: 7, height: 7, borderRadius: '50%', background: errored ? '#ff5f57' : accent, flexShrink: 0 }} />
            }
            <span style={{
              fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#6e8098',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
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
                  borderRadius: 5, padding: '4px 6px',
                  cursor: 'pointer', display: 'flex', alignItems: 'center',
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
            onClick={reload}
            style={{
              background: 'transparent', border: '1px solid #21314a',
              color: '#4a5568', borderRadius: 5, padding: '4px 7px',
              cursor: 'pointer', display: 'flex', alignItems: 'center',
              transition: 'all 0.15s', flexShrink: 0,
            }}
            onMouseEnter={e => { e.currentTarget.style.color = accent; e.currentTarget.style.borderColor = accent + '50'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#4a5568'; e.currentTarget.style.borderColor = '#21314a'; }}
          >
            <RotateCcw size={12} />
          </button>

          {/* Open in tab */}
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            title="Open in new tab"
            style={{
              background: 'transparent', border: `1px solid ${accent}40`, color: accent,
              borderRadius: 5, padding: '4px 10px', display: 'flex', alignItems: 'center',
              gap: 5, textDecoration: 'none', fontFamily: 'Space Mono, monospace',
              fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', flexShrink: 0,
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = accent + '15')}
            onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
          >
            <ExternalLink size={11} /> Open
          </a>
        </div>

        {/* ── Content area ── */}
        {!minimized && (
          <div style={{
            flex: 1, background: '#080c12',
            display: 'flex', justifyContent: 'center',
            padding: viewport === 'desktop' ? 0 : '16px 16px 0',
            position: 'relative', overflow: 'hidden',
            transition: 'padding 0.3s ease',
          }}>
            {/* Loading overlay */}
            {loading && !errored && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 5,
                background: '#080c12',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 20,
              }}>
                <div style={{ position: 'relative', width: 48, height: 48 }}>
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: `2px solid ${accent}20`,
                  }} />
                  <div style={{
                    position: 'absolute', inset: 0, borderRadius: '50%',
                    border: `2px solid transparent`,
                    borderTopColor: accent,
                    animation: 'spin 0.9s linear infinite',
                  }} />
                  <div style={{
                    position: 'absolute', inset: 6, borderRadius: '50%',
                    border: `2px solid transparent`,
                    borderTopColor: accent + '60',
                    animation: 'spin 1.5s linear infinite reverse',
                  }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: accent, letterSpacing: '0.12em', marginBottom: 6 }}>
                    LOADING {title.toUpperCase()}
                  </div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#4a5568' }}>
                    Connecting to live server…
                  </div>
                </div>
                {/* Skeleton bars */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, width: '60%', maxWidth: 300 }}>
                  {[100, 70, 85, 55].map((w, i) => (
                    <div key={i} style={{
                      height: i === 0 ? 14 : 9, width: `${w}%`,
                      borderRadius: 4, background: `linear-gradient(90deg, #161b22 25%, #21314a 50%, #161b22 75%)`,
                      backgroundSize: '200% 100%', animation: 'shimmer 1.5s infinite',
                      animationDelay: `${i * 0.15}s`,
                    }} />
                  ))}
                </div>
              </div>
            )}

            {/* Error state */}
            {errored && !loading && (
              <div style={{
                position: 'absolute', inset: 0, zIndex: 5,
                background: '#080c12',
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 16,
              }}>
                <div style={{
                  width: 56, height: 56, borderRadius: '50%',
                  background: '#ff5f5710', border: '1px solid #ff5f5730',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <AlertTriangle size={24} style={{ color: '#ff5f57' }} />
                </div>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 13, color: '#ff5f57', marginBottom: 8, fontWeight: 700 }}>
                    Preview Blocked
                  </div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#4a5568', maxWidth: 300, lineHeight: 1.7 }}>
                    This site uses <span style={{ color: '#6e8098' }}>X-Frame-Options</span> or{' '}
                    <span style={{ color: '#6e8098' }}>CSP</span> headers that prevent embedding.
                  </div>
                  <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#4a5568', marginTop: 4, lineHeight: 1.7 }}>
                    Open it in a new tab to see the full experience.
                  </div>
                </div>
                <a href={url} target="_blank" rel="noreferrer" style={{
                  padding: '10px 24px', background: accent, color: '#080c12',
                  borderRadius: 8, textDecoration: 'none', fontFamily: 'Space Mono, monospace',
                  fontSize: 11, fontWeight: 800, letterSpacing: '0.04em',
                  display: 'flex', alignItems: 'center', gap: 8,
                  transition: 'opacity 0.2s',
                }}>
                  <ExternalLink size={13} /> Open {title}
                </a>
              </div>
            )}

            {/* Iframe */}
            <div style={{
              width: currentViewport.width,
              maxWidth: '100%',
              height: '100%',
              transition: 'width 0.35s cubic-bezier(0.4,0,0.2,1)',
              borderRadius: viewport !== 'desktop' ? '10px 10px 0 0' : 0,
              overflow: 'hidden',
              boxShadow: viewport !== 'desktop' ? '0 0 40px rgba(0,0,0,0.7)' : 'none',
            }}>
              <iframe
                key={reloadKey}
                ref={iframeRef}
                src={url}
                title={title}
                onLoad={handleLoad}
                onError={handleError}
                style={{
                  width: '100%', height: '100%',
                  border: 'none', display: 'block',
                  opacity: loading || errored ? 0 : 1,
                  transition: 'opacity 0.5s ease',
                }}
                allow="clipboard-read; clipboard-write; camera; microphone; geolocation"
                sandbox="allow-same-origin allow-scripts allow-forms allow-popups allow-popups-to-escape-sandbox allow-downloads"
              />
            </div>
          </div>
        )}

        {/* Resize hint */}
        {!isMaximized && !minimized && (
          <div style={{
            position: 'absolute', bottom: 3, right: 5,
            color: '#4a5568', fontSize: 9,
            fontFamily: 'Space Mono, monospace',
            pointerEvents: 'none', userSelect: 'none',
          }}>
            ⊞
          </div>
        )}
      </div>

      <style>{`
        @keyframes popIn {
          from { opacity: 0; transform: scale(0.92) translateY(16px); }
          to   { opacity: 1; transform: scale(1)    translateY(0);    }
        }
        @keyframes fadeBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </>
  );
}

function trafficBtn(color) {
  return {
    width: 12, height: 12, borderRadius: '50%',
    background: color, border: 'none',
    cursor: 'pointer', padding: 0,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0, transition: 'filter 0.15s',
  };
}
