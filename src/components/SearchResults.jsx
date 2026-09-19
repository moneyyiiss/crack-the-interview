import React, { useMemo } from 'react';

export default function SearchResults({ query, categories, onPick }) {
  const q = query.trim().toLowerCase();

  const results = useMemo(() => {
    const out = [];
    categories.forEach((cat) => {
      cat.topics.forEach((topic) => {
        const hay = (
          topic.title +
          ' ' +
          topic.points.join(' ') +
          ' ' +
          (topic.qa || []).map((p) => p.q + ' ' + p.a).join(' ')
        ).toLowerCase();
        if (hay.includes(q)) out.push({ cat, topic });
      });
    });
    return out;
  }, [q, categories]);

  if (!results.length) {
    return (
      <div className="empty-state">
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="11" cy="11" r="7" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <p>No topics match &quot;{query}&quot;</p>
      </div>
    );
  }

  return (
    <>
      <p style={{ color: 'var(--text-faint)', fontSize: '13px', marginTop: '-8px' }}>
        {results.length} result{results.length === 1 ? '' : 's'}
      </p>
      {results.map((r, i) => (
        <div className="search-result" key={i} onClick={() => onPick(r.cat.id)}>
          <div className="sr-top">
            <span className="sr-tag" style={{ background: r.cat.color }}>
              {r.cat.title}
            </span>
          </div>
          <h3>{r.topic.title}</h3>
          <p>{r.topic.points[0] || ''}</p>
        </div>
      ))}
    </>
  );
}
