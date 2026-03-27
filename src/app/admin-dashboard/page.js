'use client';

import { useEffect, useState } from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

export default function Dashboard() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [view, setView] = useState('grid');

  useEffect(() => {
    async function getUsers() {
      try {
        const res = await fetch('/api/users');
        if (!res.ok) { console.log('API error'); return; }
        const data = await res.json();
        setUsers(data);
      } catch (err) {
        console.log('Fetch error', err);
      } finally {
        setLoading(false);
      }
    }
    getUsers();
  }, []);

  const filtered = users.filter(u =>
    u.name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase()) ||
    u.companyName?.toLowerCase().includes(search.toLowerCase())
  );

  const initials = (name = '') =>
    name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase() || '?';

  const COLORS = ['#1e64ff', '#2979ff', '#1565c0', '#1976d2', '#0d47a1', '#1e88e5'];

  return (
    <div style={styles.root}>

      {/* HEADER */}
      <header style={styles.header}>
        <div style={styles.headerGlow} />
        <div style={styles.headerInner}>
          <div style={styles.firmBadge}>
            <i className="bi bi-briefcase-fill" style={{ fontSize: 11 }} />
            &nbsp; Company Secretary Firm
          </div>
          <h1 style={styles.firmName}>S K Dwivedi &amp; Associates</h1>
          <p style={styles.firmSub}>Admin Dashboard &nbsp;·&nbsp; Client Management</p>
          <div style={styles.liveBadge}>
            <span style={styles.liveDot} />
            Live System
          </div>
        </div>
      </header>

      {/* STAT CARDS */}
      <div style={styles.statsRow}>
        <StatCard icon="bi-people-fill"    label="Total Clients"   value={loading ? '—' : users.length}                                          color="#1e64ff" />
        <StatCard icon="bi-envelope-fill"  label="With Email"      value={loading ? '—' : users.filter(u => u.email).length}                      color="#1565c0" />
        <StatCard icon="bi-building-fill"  label="Companies"       value={loading ? '—' : users.filter(u => u.companyName || u.company_name).length} color="#2979ff" />
        <StatCard icon="bi-funnel-fill"    label="Search Results"  value={loading ? '—' : filtered.length}                                        color="#0d47a1" />
      </div>

      {/* TOOLBAR */}
      <div style={styles.toolbar}>
        <div style={styles.searchWrap}>
          <i className="bi bi-search" style={styles.searchIcon} />
          <input
            style={styles.searchInput}
            placeholder="Search name, email or company…"
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
          {search && (
            <button style={styles.clearBtn} onClick={() => setSearch('')}>
              <i className="bi bi-x-lg" style={{ fontSize: 12 }} />
            </button>
          )}
        </div>

        <div style={styles.viewToggle}>
          <button
            title="Grid view"
            style={{ ...styles.toggleBtn, ...(view === 'grid' ? styles.toggleActive : {}) }}
            onClick={() => setView('grid')}
          >
            <i className="bi bi-grid-fill" style={{ fontSize: 14 }} />
          </button>
          <button
            title="List view"
            style={{ ...styles.toggleBtn, ...(view === 'list' ? styles.toggleActive : {}) }}
            onClick={() => setView('list')}
          >
            <i className="bi bi-list-ul" style={{ fontSize: 14 }} />
          </button>
        </div>
      </div>

      {/* COUNT LABEL */}
      {!loading && (
        <div style={styles.countLabel}>
          <i className="bi bi-database-fill" style={{ fontSize: 11, marginRight: 6, color: '#1e3a6e' }} />
          {filtered.length} client{filtered.length !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
        </div>
      )}

      {/* MAIN CONTENT */}
      <div style={styles.content}>
        {loading ? (
          <div style={styles.skeletonGrid}>
            {[...Array(6)].map((_, i) => <div key={i} style={styles.skeleton} />)}
          </div>
        ) : filtered.length === 0 ? (
          <div style={styles.empty}>
            <i className="bi bi-inbox" style={{ fontSize: 44, color: '#0d1e3d', display: 'block', marginBottom: 12 }} />
            <p style={{ color: '#1e3a6e', fontSize: 14 }}>
              {search ? 'No clients match your search' : 'No clients found in database'}
            </p>
          </div>
        ) : view === 'grid' ? (
          <div style={styles.grid}>
            {filtered.map((u, i) => (
              <div key={u._id || i} style={styles.card} className="client-card">
                <div style={{ ...styles.avatar, background: COLORS[i % COLORS.length] }}>
                  {initials(u.name)}
                </div>
                <h3 style={styles.cardName}>{u.name || '—'}</h3>

                {(u.companyName || u.company_name) && (
                  <p style={styles.cardCompany}>
                    <i className="bi bi-building" style={{ fontSize: 11, marginRight: 5 }} />
                    {u.companyName || u.company_name}
                  </p>
                )}

                {u.email && (
                  <a href={`mailto:${u.email}`} style={styles.cardEmail}>
                    <i className="bi bi-envelope" style={{ fontSize: 11, marginRight: 5 }} />
                    {u.email}
                  </a>
                )}

                <div style={styles.cardDivider} />

                <div style={styles.cardActions}>
                  <a href={`mailto:${u.email}`} style={styles.actionBtn}>
                    <i className="bi bi-send-fill" style={{ fontSize: 11 }} />
                    Email
                  </a>
                  <button style={styles.actionBtnGhost}>
                    <i className="bi bi-three-dots" style={{ fontSize: 12 }} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* LIST VIEW */
          <div style={styles.listWrap}>
            <div style={styles.listHeader} className="list-header-row">
              <span style={{ flex: 2 }}>Client Name</span>
              <span style={{ flex: 2 }}>Company</span>
              <span style={{ flex: 3 }}>Email</span>
              <span style={{ flex: 1, textAlign: 'right' }}>Action</span>
            </div>
            {filtered.map((u, i) => (
              <div key={u._id || i} style={styles.listRow} className="list-row">
                <div style={{ flex: 2, display: 'flex', alignItems: 'center', gap: 10, minWidth: 0 }}>
                  <div style={{ ...styles.avatarSm, background: COLORS[i % COLORS.length] }}>
                    {initials(u.name)}
                  </div>
                  <span style={{ color: '#e8f0ff', fontSize: 13, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {u.name || '—'}
                  </span>
                </div>
                <div style={{ flex: 2, minWidth: 0 }}>
                  <span style={{ color: '#3d6be0', fontSize: 13, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                    {u.companyName || u.company_name || <span style={{ color: '#0d1e3d' }}>—</span>}
                  </span>
                </div>
                <div style={{ flex: 3, minWidth: 0 }}>
                  <a href={`mailto:${u.email}`} style={{ color: '#1e64ff', fontSize: 13, textDecoration: 'none', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', display: 'block' }}>
                    {u.email || <span style={{ color: '#0d1e3d' }}>—</span>}
                  </a>
                </div>
                <div style={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
                  <a href={`mailto:${u.email}`} style={{ ...styles.actionBtn, padding: '5px 10px' }}>
                    <i className="bi bi-send-fill" style={{ fontSize: 11 }} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <i className="bi bi-shield-check-fill" style={{ fontSize: 12, marginRight: 6, color: '#0d1e3d' }} />
        S K Dwivedi &amp; Associates &nbsp;·&nbsp; All rights reserved
      </footer>

      {/* GLOBAL STYLES */}
      <style>{`
        * { box-sizing: border-box; }
        body { background: #000; margin: 0; }

        .client-card:hover {
          border-color: rgba(30, 100, 255, 0.45) !important;
          box-shadow: 0 0 28px rgba(30, 100, 255, 0.1) !important;
          transform: translateY(-3px) !important;
          transition: all 0.2s ease !important;
        }
        .list-row:hover { background: rgba(30, 100, 255, 0.04) !important; }
        .action-btn:hover { background: rgba(30, 100, 255, 0.2) !important; }

        @keyframes shimmer {
          0%   { background-position: -400px 0; }
          100% { background-position:  400px 0; }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50%       { opacity: 0.5; transform: scale(1.4); }
        }

        /* Responsive: hide company + email columns on small screens in list view */
        @media (max-width: 580px) {
          .list-header-row { display: none !important; }
          .list-row > div:nth-child(2),
          .list-row > div:nth-child(3) { display: none !important; }
          .list-row > div:nth-child(1) { flex: 4 !important; }
        }
      `}</style>
    </div>
  );
}

/* STAT CARD */
function StatCard({ icon, label, value, color }) {
  return (
    <div style={{ ...styles.statCard, borderColor: `${color}25` }}>
      <div style={{ ...styles.statIconWrap, background: `${color}18`, color }}>
        <i className={`bi ${icon}`} style={{ fontSize: 18 }} />
      </div>
      <div>
        <div style={styles.statValue}>{value}</div>
        <div style={styles.statLabel}>{label}</div>
      </div>
    </div>
  );
}

/* STYLES OBJECT */
const styles = {
  root: {
    minHeight: '100vh',
    background: '#000',
    fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, sans-serif',
    WebkitFontSmoothing: 'antialiased',
  },

  /* Header */
  header: {
    position: 'relative',
    textAlign: 'center',
    padding: '48px 20px 38px',
    borderBottom: '1px solid #080f1f',
    overflow: 'hidden',
  },
  headerGlow: {
    position: 'absolute',
    top: 0, left: '50%',
    transform: 'translateX(-50%)',
    width: '80%',
    height: '100%',
    background: 'radial-gradient(ellipse at 50% -10%, rgba(30,100,255,0.14) 0%, transparent 65%)',
    pointerEvents: 'none',
  },
  headerInner: { position: 'relative', zIndex: 1 },
  firmBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '2px',
    textTransform: 'uppercase',
    color: '#4d82f5',
    background: 'rgba(30,100,255,0.1)',
    border: '1px solid rgba(30,100,255,0.18)',
    borderRadius: 20,
    padding: '4px 14px',
    marginBottom: 18,
  },
  firmName: {
    fontSize: 'clamp(18px, 3.5vw, 28px)',
    fontWeight: 800,
    color: '#ffffff',
    letterSpacing: '-0.3px',
    textShadow: '0 0 40px rgba(40,140,255,0.55), 0 0 80px rgba(30,100,255,0.25)',
    marginBottom: 8,
    lineHeight: 1.25,
  },
  firmSub: {
    fontSize: 11,
    color: '#1e3a6e',
    letterSpacing: '1.8px',
    fontWeight: 600,
    textTransform: 'uppercase',
    margin: 0,
  },
  liveBadge: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 7,
    marginTop: 18,
    fontSize: 10,
    color: '#1e64ff',
    fontWeight: 700,
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
  },
  liveDot: {
    display: 'inline-block',
    width: 7, height: 7,
    background: '#1e64ff',
    borderRadius: '50%',
    boxShadow: '0 0 8px #1e64ff',
    animation: 'pulse 2s infinite',
  },

  /* Stats */
  statsRow: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
    gap: 10,
    padding: '30px 20px 0',
    maxWidth: 900,
    margin: '0 auto',
  },
  statCard: {
    display: 'flex',
    alignItems: 'center',
    gap: 14,
    background: '#04080f',
    border: '1px solid transparent',
    borderRadius: 12,
    padding: '16px 18px',
  },
  statIconWrap: {
    width: 42, height: 42,
    borderRadius: 10,
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    flexShrink: 0,
  },
  statValue: {
    fontSize: 22, fontWeight: 800,
    color: '#e8f0ff', lineHeight: 1, marginBottom: 3,
  },
  statLabel: {
    fontSize: 10, color: '#1e3a6e', fontWeight: 700,
    letterSpacing: '0.8px', textTransform: 'uppercase',
  },

  /* Toolbar */
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    padding: '22px 20px 0',
    maxWidth: 900,
    margin: '0 auto',
    flexWrap: 'wrap',
  },
  searchWrap: {
    flex: 1,
    minWidth: 200,
    display: 'flex',
    alignItems: 'center',
    gap: 10,
    background: '#04080f',
    border: '1px solid #0d1e3d',
    borderRadius: 10,
    padding: '10px 14px',
  },
  searchIcon: { fontSize: 13, color: '#1e3a6e', flexShrink: 0 },
  searchInput: {
    flex: 1,
    background: 'transparent',
    border: 'none',
    outline: 'none',
    color: '#e8f0ff',
    fontSize: 13,
    fontFamily: 'inherit',
  },
  clearBtn: {
    background: 'none', border: 'none', cursor: 'pointer',
    color: '#1e3a6e', padding: 0,
    display: 'flex', alignItems: 'center',
  },
  viewToggle: {
    display: 'flex',
    background: '#04080f',
    border: '1px solid #0d1e3d',
    borderRadius: 10,
    overflow: 'hidden',
  },
  toggleBtn: {
    background: 'transparent',
    border: 'none',
    padding: '10px 14px',
    cursor: 'pointer',
    color: '#1e3a6e',
    display: 'flex', alignItems: 'center',
    transition: 'all 0.15s',
  },
  toggleActive: {
    background: 'rgba(30,100,255,0.15)',
    color: '#4d82f5',
  },

  /* Count label */
  countLabel: {
    maxWidth: 900,
    margin: '14px auto 0',
    padding: '0 20px',
    fontSize: 11,
    color: '#1e3a6e',
    fontWeight: 600,
    letterSpacing: '0.4px',
    display: 'flex',
    alignItems: 'center',
  },

  /* Content */
  content: {
    padding: '16px 20px',
    maxWidth: 900,
    margin: '0 auto',
  },

  /* Grid */
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
    gap: 12,
  },
  card: {
    background: '#04080f',
    border: '1px solid #0d1e3d',
    borderRadius: 14,
    padding: '24px 18px 16px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    textAlign: 'center',
    cursor: 'default',
    transition: 'all 0.2s ease',
  },
  avatar: {
    width: 50, height: 50,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 15, fontWeight: 800, color: '#fff',
    marginBottom: 14, letterSpacing: 1,
    flexShrink: 0,
  },
  cardName: {
    fontSize: 14, fontWeight: 700, color: '#e8f0ff',
    marginBottom: 6, lineHeight: 1.3, margin: '0 0 6px',
  },
  cardCompany: {
    fontSize: 12, color: '#3d6be0', margin: '0 0 4px',
    display: 'flex', alignItems: 'center',
  },
  cardEmail: {
    fontSize: 11.5, color: '#1e3a8a',
    textDecoration: 'none',
    display: 'flex', alignItems: 'center',
    wordBreak: 'break-all', textAlign: 'left',
    margin: '2px 0 0',
  },
  cardDivider: {
    width: '100%', height: 1,
    background: '#080f1e',
    margin: '14px 0 12px',
  },
  cardActions: {
    display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%', gap: 8,
  },
  actionBtn: {
    display: 'inline-flex', alignItems: 'center', gap: 5,
    fontSize: 12, fontWeight: 600,
    color: '#1e64ff',
    background: 'rgba(30,100,255,0.1)',
    border: '1px solid rgba(30,100,255,0.18)',
    borderRadius: 8,
    padding: '6px 12px',
    textDecoration: 'none',
    cursor: 'pointer',
    transition: 'background 0.15s',
  },
  actionBtnGhost: {
    display: 'inline-flex', alignItems: 'center',
    color: '#1e3a6e',
    background: 'transparent',
    border: '1px solid #0d1e3d',
    borderRadius: 8,
    padding: '6px 10px',
    cursor: 'pointer',
    fontSize: 14,
  },

  /* List */
  listWrap: {
    background: '#04080f',
    border: '1px solid #0d1e3d',
    borderRadius: 14,
    overflow: 'hidden',
  },
  listHeader: {
    display: 'flex',
    padding: '11px 20px',
    borderBottom: '1px solid #0d1e3d',
    fontSize: 10,
    fontWeight: 700,
    color: '#1e3a6e',
    textTransform: 'uppercase',
    letterSpacing: '1.2px',
  },
  listRow: {
    display: 'flex',
    alignItems: 'center',
    padding: '13px 20px',
    borderBottom: '1px solid #060c18',
    transition: 'background 0.15s',
    flexWrap: 'wrap',
    gap: 6,
  },
  avatarSm: {
    width: 28, height: 28,
    borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontSize: 10, fontWeight: 800, color: '#fff',
    flexShrink: 0,
  },

  /* Skeleton loading */
  skeletonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(210px, 1fr))',
    gap: 12,
  },
  skeleton: {
    height: 190,
    background: 'linear-gradient(90deg, #04080f 25%, #07101e 50%, #04080f 75%)',
    backgroundSize: '400px 100%',
    animation: 'shimmer 1.4s infinite',
    borderRadius: 14,
    border: '1px solid #0d1e3d',
  },

  /* Empty */
  empty: {
    textAlign: 'center',
    padding: '70px 20px',
  },

  /* Footer */
  footer: {
    textAlign: 'center',
    padding: '22px 20px',
    fontSize: 11,
    color: '#0d1e3d',
    fontWeight: 600,
    letterSpacing: '0.4px',
    borderTop: '1px solid #040810',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
};