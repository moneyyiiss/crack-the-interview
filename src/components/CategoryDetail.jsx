import React, { useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { highlightCode, initials } from '../lib/highlight.js';
import { topicKey } from '../lib/useProgress.js';
import Diagram from './Diagram.jsx';

function CodeBlock({ code, filename }) {
  return (
    <div className="code-block">
      <div className="code-block-head">
        <span className="dot" style={{ background: '#ff5f57' }} />
        <span className="dot" style={{ background: '#febc2e' }} />
        <span className="dot" style={{ background: '#28c840' }} />
        <span className="fname">{filename}</span>
      </div>
      <pre dangerouslySetInnerHTML={{ __html: highlightCode(code) }} />
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
      <path d="M1 3.5L3.2 5.7L8 1" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default function CategoryDetail({ categories, done, progress }) {
  const { catId } = useParams();
  const navigate = useNavigate();
  const cat = categories.find((c) => c.id === catId);

  useEffect(() => {
    if (!cat) navigate('/', { replace: true });
  }, [cat, navigate]);

  if (!cat) return null;

  const t = cat.topics.length;
  const d = cat.topics.filter((_, i) => done[topicKey(cat.id, i)]).length;
  const cp = t ? Math.round((d / t) * 100) : 0;

  function jump(key) {
    const el = document.getElementById(key);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  return (
    <div className="cat-detail-wrap">
      <div className="cat-detail-main">
        <div className="cat-detail-head">
          <div className="icon-badge" style={{ background: cat.color }}>
            {initials(cat.title)}
          </div>
          <div>
            <h2>{cat.title}</h2>
            <div className="meta">
              {t} topic{t === 1 ? '' : 's'} · {d} of {t} completed
            </div>
          </div>
        </div>

        {cat.topics.map((topic, idx) => {
          const key = topicKey(cat.id, idx);
          const isDone = !!done[key];
          return (
            <div
              className={'topic-card' + (isDone ? ' done' : '')}
              style={{ animationDelay: Math.min(idx * 0.05, 0.4) + 's' }}
              id={key}
              key={key}
            >
              <div className="topic-card-inner">
                <div className="topic-head">
                  <div className="topic-title-row">
                    <span className="topic-num">{String(idx + 1).padStart(2, '0')}</span>
                    <span className="dot" />
                    <h3 className="topic-title">{topic.title}</h3>
                  </div>
                  <label className="done-check">
                    <input
                      type="checkbox"
                      checked={isDone}
                      onChange={(e) => progress.toggle(key, e.target.checked)}
                    />
                    <span className="box">{isDone ? <CheckIcon /> : null}</span> Done
                  </label>
                </div>
                <div className="topic-body">
                  <ul className="points">
                    {topic.points.map((p, i) => (
                      <li key={i}>{p}</li>
                    ))}
                  </ul>
                  {topic.code ? <CodeBlock code={topic.code} filename={cat.id + '_' + (idx + 1) + '.java'} /> : null}
                  {topic.flow ? <Diagram flow={topic.flow} /> : topic.diagram ? <div dangerouslySetInnerHTML={{ __html: topic.diagram }} /> : null}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="cat-checklist">
        <div className="cat-checklist-head">
          <span className="cat-checklist-title">Checklist</span>
          <span className="cat-checklist-count">
            {d} / {t}
          </span>
        </div>
        <div className="cat-checklist-bar">
          <div style={{ width: cp + '%', background: cat.color }} />
        </div>
        {cat.topics.map((topic, idx) => {
          const key = topicKey(cat.id, idx);
          const isDone = !!done[key];
          return (
            <div
              className={'checklist-row' + (isDone ? ' done' : '')}
              key={key}
              onClick={() => jump(key)}
            >
              <span className="checklist-box">{isDone ? <CheckIcon /> : null}</span>
              <span className="checklist-label">{topic.title}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
