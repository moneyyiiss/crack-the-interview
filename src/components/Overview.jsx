import React from 'react';
import { initials } from '../lib/highlight.js';

function StatTile({ num, label, cls }) {
  return (
    <div className={'stat-tile ' + (cls || '')}>
      <div className="stat-num">{num}</div>
      <div className="stat-label">{label}</div>
    </div>
  );
}

export default function Overview({ categories, doneInCat, onPick, total, doneCount }) {
  const p = total ? Math.round((doneCount / total) * 100) : 0;

  return (
    <>
      <div className="stat-row">
        <StatTile num={categories.length} label="Categories" />
        <StatTile num={total} label="Total topics" cls="accent" />
        <StatTile num={doneCount} label="Completed" cls="good" />
        <StatTile num={p + '%'} label="Overall progress" />
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
