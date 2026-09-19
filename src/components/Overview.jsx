import React from 'react';
import { initials } from '../lib/highlight.js';

function StatTile({ num, label, icon, cls }) {
  return (
    <div className={'stat-tile ' + (cls || '')}>
      <div className="stat-tile-icon">{icon}</div>
      <div>
        <div className="stat-num">{num}</div>
        <div className="stat-label">{label}</div>
      </div>
    </div>
  );
}

export default function Overview({ categories, doneInCat, onPick, total, doneCount }) {
  const p = total ? Math.round((doneCount / total) * 100) : 0;

  // Find the best "continue where you left off" target: first category that
  // has progress but isn't finished, else the first category with 0 progress,
  // else just the first category.
  const inProgress = categories.find((c) => {
    const d = doneInCat(c);
    return d > 0 && d < c.topics.length;
  });
  const notStarted = categories.find((c) => doneInCat(c) === 0);
  const continueCat = inProgress || notStarted || categories[0];
  const heroLabel = doneCount === 0 ? 'Start learning' : p === 100 ? 'Review again' : 'Continue learning';

  return (
    <>
      {/* ---- hero ---- */}
      <div className="hero">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-kicker">
          <span className="hero-kicker-dot" /> {total} topics · animated visual guides
        </div>
        <h1 className="hero-title">
          Master Java for interviews,
          <br />
          <span className="hero-title-accent">one visual at a time.</span>
        </h1>
        <p className="hero-sub">
          Every concept comes with point-to-point notes, real Q&amp;A, runnable code, and an
          interactive step-through diagram — so you can actually watch how it works, not just read about it.
        </p>
        <div className="hero-actions">
          <button className="btn primary hero-cta" onClick={() => continueCat && onPick(continueCat.id)}>
            {heroLabel}
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
          <div className="hero-progress">
            <div className="hero-progress-ring" style={{ '--pct': p }}>
              <span>{p}%</span>
            </div>
            <span className="hero-progress-label">
              {doneCount} / {total} topics done
            </span>
          </div>
        </div>
      </div>

      <div className="stat-row">
        <StatTile
          num={categories.length}
          label="Categories"
          icon={<GridIcon />}
        />
        <StatTile num={total} label="Total topics" cls="accent" icon={<LayersIcon />} />
        <StatTile num={doneCount} label="Completed" cls="good" icon={<CheckIcon />} />
        <StatTile num={p + '%'} label="Overall progress" icon={<TrendIcon />} />
      </div>

      <div className="section-heading">Browse by category</div>
      <div className="cat-grid">
        {categories.map((cat) => {
          const cd = doneInCat(cat);
          const t = cat.topics.length;
          const cp = t ? Math.round((cd / t) * 100) : 0;
          const label = cp === 0 ? 'Start' : cp === 100 ? 'Review again' : 'Continue';
          return (
            <button className="cat-card" key={cat.id} onClick={() => onPick(cat.id)}>
              <div className="cat-card-glow" style={{ background: cat.color }} aria-hidden="true" />
              <div className="card-top">
                <div className="icon-badge" style={{ background: cat.color }}>
                  {initials(cat.title)}
                </div>
                <div className={'pct-badge' + (cp === 100 ? ' done' : '')}>{cp}%</div>
              </div>
              <div>
                <p className="card-title">{cat.title}</p>
                <p className="card-sub">
                  {t} topic{t === 1 ? '' : 's'} · {cd} done
                </p>
              </div>
              <div className="bar">
                <div style={{ width: cp + '%', background: cat.color }} />
              </div>
              <div className="card-cta">
                {label}{' '}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M9 6l6 6-6 6" />
                </svg>
              </div>
            </button>
          );
        })}
      </div>
    </>
  );
}

function GridIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </svg>
  );
}
function LayersIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M12 2 2 7l10 5 10-5-10-5Z" />
      <path d="m2 17 10 5 10-5" />
      <path d="m2 12 10 5 10-5" />
    </svg>
  );
}
function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}
function TrendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 17l6-6 4 4 8-8" />
      <path d="M17 7h4v4" />
    </svg>
  );
}
