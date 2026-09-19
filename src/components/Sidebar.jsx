import React from 'react';

export default function Sidebar({
  categories,
  doneInCat,
  totalTopics,
  doneCount,
  view,
  activeCatId,
  query,
  onQueryChange,
  onHome,
  onRevision,
  onCategory,
  mobileOpen,
  onCloseMobile,
  onOpenAuth,
  user,
  onSignOut,
  onReset,
}) {
  const pct = totalTopics ? Math.round((doneCount / totalTopics) * 100) : 0;

  return (
    <aside className={'sidebar' + (mobileOpen ? ' open' : '')}>
      <div className="brand-row">
        <div className="brand-mark">J</div>
        <div className="brand-text">
          <div className="name">JavaPrep</div>
          <div className="tag">Interview companion</div>
        </div>
      </div>

      <div className="search-wrap">
        <div className="search-box">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            placeholder="Search topics, points…"
            autoComplete="off"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
          />
        </div>
      </div>

      <div className="account-bar">
        {user ? (
          <div className="account-info">
            <div className="account-avatar">{(user.email || 'A').slice(0, 1).toUpperCase()}</div>
            <div className="account-email">{user.email}</div>
            <button className="account-signout" onClick={onSignOut}>
              Sign out
            </button>
          </div>
        ) : (
          <button className="account-btn" onClick={() => onOpenAuth('login')}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
              <circle cx="12" cy="7" r="4" />
            </svg>
            Sign in to sync progress
          </button>
        )}
      </div>

      <div className="side-scroll">
        <button className={'nav-item' + (view === 'overview' ? ' active' : '')} onClick={onHome}>
          <span className="nav-ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 10.5 12 3l9 7.5" />
              <path d="M5 9.5V21h14V9.5" />
            </svg>
          </span>
          Overview
        </button>
        <button className={'nav-item' + (view === 'revision' ? ' active' : '')} onClick={onRevision}>
          <span className="nav-ico">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />
            </svg>
          </span>
          Quick Revision
        </button>

        <div className="nav-section-label">Categories</div>
        <ul className="cat-list">
          {categories.map((cat) => {
            const d = doneInCat(cat);
            const t = cat.topics.length;
            const p = t ? Math.round((d / t) * 100) : 0;
            const active = view === 'category' && activeCatId === cat.id;
            return (
              <li className="cat-item" key={cat.id}>
                <button className={'cat-btn' + (active ? ' active' : '')} onClick={() => onCategory(cat.id)}>
                  <div className="cat-btn-top">
                    <div className="cat-btn-left">
                      <span className="swatch" style={{ background: cat.color }} />
                      <span className="cat-title">{cat.title}</span>
                    </div>
                    <span className="cat-count">
                      {d}/{t}
                    </span>
                  </div>
                  <div className="cat-mini-bar">
                    <div style={{ width: p + '%', background: cat.color }} />
                  </div>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="sidebar-footer">
        <div className="ring" style={{ '--pct': pct }}>
          <div className="ring-inner">{pct}%</div>
        </div>
        <div className="footer-text">
          <div className="line1">
            {doneCount} / {totalTopics} done
          </div>
          <div className="line2">Saved in this browser</div>
        </div>
        <button className="reset-link" title="Reset all progress" onClick={onReset}>
          Reset
        </button>
      </div>
    </aside>
  );
}
