import React from 'react';

export default function Revision({ categories }) {
  return (
    <>
      <p style={{ color: 'var(--text-faint)', fontSize: '13.5px', marginTop: '-8px' }}>
        Every point, every category, one scroll — ideal for the 10 minutes before an interview.
      </p>
      {categories.map((cat) => (
        <React.Fragment key={cat.id}>
          <div className="rev-cat-header">
            <span className="dot" style={{ background: cat.color }} />
            <h2>{cat.title}</h2>
          </div>
          {cat.topics.map((topic, idx) => (
            <div className="rev-card" key={idx}>
              <h3>{topic.title}</h3>
              <ul className="points">
                {topic.points.map((p, i) => (
                  <li key={i}>{p}</li>
                ))}
              </ul>
            </div>
          ))}
        </React.Fragment>
      ))}
    </>
  );
}
