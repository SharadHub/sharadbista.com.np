// Renders realistic UI mockups of each project inline — no external links needed
import { useState } from 'react';

function HeroLayout({ page, accent }) {
  return (
    <div style={{ padding: '2rem', textAlign: 'center', minHeight: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
      <div style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: accent, marginBottom: 4, letterSpacing: '0.1em' }}>DISCOVER</div>
      <div style={{ fontSize: 20, fontWeight: 800, fontFamily: 'Space Grotesk, sans-serif', color: '#e6edf3', maxWidth: 260, lineHeight: 1.3 }}>{page.headline}</div>
      <div style={{ fontSize: 12, color: '#8b949e', fontFamily: 'Space Mono, monospace' }}>{page.subline}</div>
      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button style={{ background: accent, color: '#080c12', border: 'none', padding: '7px 18px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Space Mono, monospace' }}>{page.cta}</button>
        <button style={{ background: 'transparent', color: accent, border: `1px solid ${accent}`, padding: '7px 14px', borderRadius: 4, fontSize: 11, cursor: 'pointer', fontFamily: 'Space Mono, monospace' }}>Learn More</button>
      </div>
    </div>
  );
}

function SearchLayout({ page }) {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ background: '#1a2233', borderRadius: 6, padding: '8px 12px', marginBottom: 10, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: '#4a5568', fontSize: 12 }}>🔍</span>
        <span style={{ color: '#8b949e', fontSize: 11, fontFamily: 'Space Mono, monospace' }}>Search businesses...</span>
      </div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 12, flexWrap: 'wrap' }}>
        {page.filters.map((f, i) => (
          <span key={f} style={{ padding: '3px 10px', borderRadius: 20, fontSize: 10, fontFamily: 'Space Mono, monospace', background: i === 0 ? '#00ff88' : '#1a2233', color: i === 0 ? '#080c12' : '#8b949e', border: '1px solid #21314a', cursor: 'pointer' }}>{f}</span>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {page.cards.map(card => (
          <div key={card.name} style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 8, padding: '10px' }}>
            <div style={{ width: '100%', height: 50, background: 'linear-gradient(135deg, #21314a, #161b22)', borderRadius: 4, marginBottom: 6 }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3', marginBottom: 2 }}>{card.name}</div>
            <div style={{ fontSize: 10, color: '#8b949e', fontFamily: 'Space Mono, monospace' }}>{card.city} · {card.type}</div>
            <div style={{ fontSize: 10, color: '#00ff88', marginTop: 3 }}>★ {card.rating}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function DetailLayout({ page }) {
  const { business } = page;
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ width: '100%', height: 80, background: 'linear-gradient(135deg, #21314a, #0d1117)', borderRadius: 8, marginBottom: 10 }} />
      <div style={{ fontSize: 16, fontWeight: 800, color: '#e6edf3', marginBottom: 4 }}>{business.name}</div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 8 }}>
        <span style={{ color: '#00ff88', fontSize: 12 }}>★ {business.rating}</span>
        <span style={{ color: '#8b949e', fontSize: 11, fontFamily: 'Space Mono, monospace' }}>({business.reviews} reviews)</span>
      </div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 8 }}>
        {business.tags.map(t => <span key={t} style={{ padding: '2px 8px', background: '#1a2233', color: '#00d4ff', fontSize: 10, borderRadius: 20, fontFamily: 'Space Mono, monospace', border: '1px solid #21314a' }}>{t}</span>)}
      </div>
      <div style={{ fontSize: 11, color: '#8b949e', lineHeight: 1.5 }}>{business.desc}</div>
      <button style={{ marginTop: 10, background: '#00ff88', color: '#080c12', border: 'none', padding: '7px 16px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Space Mono, monospace' }}>Get Directions →</button>
    </div>
  );
}

function DashboardLayout({ page }) {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: '#e6edf3', marginBottom: 10, fontFamily: 'Space Mono, monospace' }}>Radiology Dashboard</div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, marginBottom: 10 }}>
        {page.stats.map(s => (
          <div key={s.label} style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 8, padding: '10px' }}>
            <div style={{ fontSize: 10, color: '#8b949e', fontFamily: 'Space Mono, monospace', marginBottom: 4 }}>{s.label}</div>
            <div style={{ fontSize: 22, fontWeight: 800, color: page.accent }}>{s.value}</div>
            <div style={{ fontSize: 10, color: '#00ff88', fontFamily: 'Space Mono, monospace' }}>{s.trend}</div>
          </div>
        ))}
      </div>
      <div style={{ height: 50, background: '#1a2233', borderRadius: 8, border: '1px solid #21314a', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'flex-end', height: 30 }}>
          {[60, 80, 50, 90, 70, 85, 65, 75, 95, 55, 88, 72].map((h, i) => (
            <div key={i} style={{ width: 8, height: `${h}%`, background: page.accent, borderRadius: 2, opacity: 0.7 + (i % 3) * 0.1 }} />
          ))}
        </div>
      </div>
    </div>
  );
}

function QueueLayout({ page }) {
  const statusColor = { 'In Progress': '#00d4ff', 'Waiting': '#8b949e', 'Completed': '#00ff88' };
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>Patient Queue</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {page.patients.map(p => (
          <div key={p.id} style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 6, padding: '8px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3' }}>{p.name}</div>
              <div style={{ fontSize: 10, color: '#8b949e', fontFamily: 'Space Mono, monospace' }}>{p.scan}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 10, color: statusColor[p.status], fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{p.status}</div>
              <div style={{ fontSize: 10, color: '#4a5568', fontFamily: 'Space Mono, monospace' }}>{p.time}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function MenuLayout({ page }) {
  const [activeCat, setActiveCat] = useState(page.categories[0]);
  const filtered = page.items.filter(i => i.cat === activeCat);
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 10, flexWrap: 'wrap' }}>
        {page.categories.map(c => (
          <button key={c} onClick={() => setActiveCat(c)} style={{ padding: '4px 10px', borderRadius: 20, fontSize: 10, fontFamily: 'Space Mono, monospace', background: activeCat === c ? page.accent : '#1a2233', color: activeCat === c ? '#080c12' : '#8b949e', border: '1px solid #21314a', cursor: 'pointer', fontWeight: activeCat === c ? 700 : 400 }}>{c}</button>
        ))}
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {filtered.map(item => (
          <div key={item.name} style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 8, padding: '10px', cursor: 'pointer' }}>
            <div style={{ width: '100%', height: 40, background: '#161b22', borderRadius: 4, marginBottom: 6, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>
              {item.cat === 'Coffee' ? '☕' : item.cat === 'Food' ? '🍱' : item.cat === 'Snacks' ? '🍟' : '🥤'}
            </div>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3' }}>{item.name}</div>
            <div style={{ fontSize: 11, color: page.accent, fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Rs. {item.price}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function OrderLayout({ page }) {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>Current Order</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 10 }}>
        {page.cart.map(item => (
          <div key={item.name} style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 6, padding: '8px 10px', display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: 11, color: '#e6edf3' }}>{item.name}</div>
              <div style={{ fontSize: 10, color: '#8b949e', fontFamily: 'Space Mono, monospace' }}>x{item.qty}</div>
            </div>
            <div style={{ fontSize: 11, color: '#ff6b35', fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>Rs. {item.price * item.qty}</div>
          </div>
        ))}
      </div>
      <div style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 8, padding: '10px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8b949e', fontFamily: 'Space Mono, monospace', marginBottom: 4 }}>
          <span>Subtotal</span><span>Rs. {page.total}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 10, color: '#8b949e', fontFamily: 'Space Mono, monospace', marginBottom: 8 }}>
          <span>Tax (13%)</span><span>Rs. {page.tax}</span>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, color: '#ff6b35', fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>
          <span>TOTAL</span><span>Rs. {(page.total + page.tax).toFixed(1)}</span>
        </div>
        <button style={{ width: '100%', marginTop: 8, background: '#ff6b35', color: '#fff', border: 'none', padding: '8px', borderRadius: 4, fontSize: 11, fontWeight: 700, cursor: 'pointer', fontFamily: 'Space Mono, monospace' }}>PRINT BILL →</button>
      </div>
    </div>
  );
}

function MarketplaceLayout({ page }) {
  return (
    <div style={{ padding: '1rem' }}>
      <div style={{ fontSize: 11, fontWeight: 700, color: '#e6edf3', marginBottom: 8, fontFamily: 'Space Mono, monospace' }}>SEO Projects</div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {page.listings.map(l => (
          <div key={l.title} style={{ background: '#1a2233', border: '1px solid #21314a', borderRadius: 8, padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#e6edf3' }}>{l.title}</div>
              <div style={{ fontSize: 12, color: page.accent, fontFamily: 'Space Mono, monospace', fontWeight: 700 }}>{l.budget}</div>
            </div>
            <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 6 }}>
              {l.tags.map(t => <span key={t} style={{ padding: '2px 6px', background: '#0d1117', color: '#8b949e', fontSize: 9, borderRadius: 3, fontFamily: 'Space Mono, monospace', border: '1px solid #21314a' }}>{t}</span>)}
            </div>
            <div style={{ fontSize: 10, color: '#4a5568', fontFamily: 'Space Mono, monospace' }}>{l.bids} bids · Open</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function renderPage(page, accent) {
  switch (page.layout) {
    case 'hero': return <HeroLayout page={page} accent={accent} />;
    case 'search': return <SearchLayout page={page} />;
    case 'detail': return <DetailLayout page={page} />;
    case 'dashboard': return <DashboardLayout page={page} />;
    case 'queue': return <QueueLayout page={page} />;
    case 'menu': return <MenuLayout page={page} />;
    case 'order': return <OrderLayout page={page} />;
    case 'marketplace': return <MarketplaceLayout page={page} />;
    default: return null;
  }
}

export default function ProjectPreview({ preview, accent, title }) {
  const [activeTab, setActiveTab] = useState(0);
  const pages = preview.pages;

  return (
    <div style={{ borderRadius: 12, overflow: 'hidden', border: '1px solid #21314a', background: '#0d1117' }}>
      {/* Browser chrome */}
      <div style={{ background: '#161b22', padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, borderBottom: '1px solid #21314a' }}>
        <div style={{ display: 'flex', gap: 5 }}>
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
          <div style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
        </div>
        <div style={{ flex: 1, background: '#0d1117', borderRadius: 4, padding: '3px 10px', display: 'flex', alignItems: 'center', gap: 6 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: accent, opacity: 0.6 }} />
          <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#4a5568' }}>
            {title.toLowerCase().replace(' ', '-')}.vercel.app
          </span>
        </div>
      </div>

      {/* Page tabs */}
      {pages.length > 1 && (
        <div style={{ display: 'flex', background: '#161b22', borderBottom: '1px solid #21314a', overflowX: 'auto' }}>
          {pages.map((p, i) => (
            <button
              key={p.name}
              onClick={() => setActiveTab(i)}
              style={{
                padding: '6px 16px', fontSize: 10, fontFamily: 'Space Mono, monospace',
                background: activeTab === i ? '#0d1117' : 'transparent',
                color: activeTab === i ? accent : '#8b949e',
                border: 'none', borderBottom: activeTab === i ? `2px solid ${accent}` : '2px solid transparent',
                cursor: 'pointer', whiteSpace: 'nowrap',
              }}
            >
              {p.name}
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      <div style={{ background: '#080c12', minHeight: 220 }}>
        {renderPage(pages[activeTab], accent)}
      </div>
    </div>
  );
}
