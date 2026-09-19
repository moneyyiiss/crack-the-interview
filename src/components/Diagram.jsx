import React, { useEffect, useRef, useState } from 'react';

// A small set of data-driven diagram "primitives". Every topic can attach a
// `flow` spec (see data shapes below) instead of hand-written HTML, so adding
// a diagram to a topic is just a few lines of data — and every diagram gets
// the same staggered entrance animation. Pipeline/lifecycle diagrams go
// further: they're interactive, step-through visualizations (play / step /
// reset) inspired by VisualGo, so a learner can actually watch the sequence
// execute one stage at a time instead of seeing a static, already-finished
// picture.
//
// Shapes:
//  { type:'pipeline', steps:['A','B','C'] }
//  { type:'lifecycle', states:['New','Runnable','Running','Terminated'], loopBackTo:'Runnable' }
//  { type:'tree', root:'Collection', children:[{label:'List', sub:'ArrayList, LinkedList'}, ...] }
//  { type:'compare', columns:[{title:'ArrayList', points:['...']}, {title:'LinkedList', points:['...']}] }
//  { type:'grid', items:[{label:'Heap', sub:'Shared objects'}, ...] }

export default function Diagram({ flow }) {
  if (!flow) return null;
  switch (flow.type) {
    case 'pipeline':
      return <Pipeline steps={flow.steps} />;
    case 'lifecycle':
      return <Pipeline steps={flow.states} loop loopBackTo={flow.loopBackTo} />;
    case 'tree':
      return <Tree root={flow.root} children_={flow.children} />;
    case 'compare':
      return <Compare columns={flow.columns} />;
    case 'grid':
      return <Grid items={flow.items} />;
    default:
      return null;
  }
}

// ---- Pipeline / Lifecycle: interactive step-through visualization ----
function Pipeline({ steps, loop, loopBackTo }) {
  const [active, setActive] = useState(0); // -1 = not started
  const [playing, setPlaying] = useState(false);
  const timerRef = useRef(null);
  const n = steps.length;
  const loopIdx = loop ? Math.max(0, steps.findIndex((s) => s === loopBackTo)) : -1;

  useEffect(() => {
    if (!playing) return undefined;
    timerRef.current = setInterval(() => {
      setActive((cur) => {
        const next = cur + 1;
        if (next >= n) {
          if (loop) return loopIdx === -1 ? 0 : loopIdx;
          setPlaying(false);
          return cur;
        }
        return next;
      });
    }, 1100);
    return () => clearInterval(timerRef.current);
  }, [playing, n, loop, loopIdx]);

  function handlePlayPause() {
    setPlaying((p) => {
      const next = !p;
      if (next && active >= n - 1 && !loop) setActive(0);
      return next;
    });
  }
  function handleStep() {
    setPlaying(false);
    setActive((cur) => {
      const next = cur + 1;
      if (next >= n) return loop ? (loopIdx === -1 ? 0 : loopIdx) : cur;
      return next;
    });
  }
  function handleReset() {
    setPlaying(false);
    setActive(0);
  }

  return (
    <div className="diagram-interactive">
      <div className="diagram-pipeline">
        {steps.map((s, i) => {
          const state = i < active ? 'visited' : i === active ? 'active' : 'pending';
          return (
            <React.Fragment key={i}>
              <div className={'diagram-step diagram-anim diagram-step-' + state} style={{ '--i': i }}>
                {state === 'visited' ? <span className="diagram-step-check">&#10003;</span> : null}
                {s}
              </div>
              {i < n - 1 ? <FlowArrow live={i < active} inTransit={i === active && playing} /> : null}
            </React.Fragment>
          );
        })}
        {loop ? (
          <div className={'diagram-loop-note diagram-anim' + (active === n - 1 ? ' diagram-loop-note-live' : '')} style={{ '--i': n }}>
            <LoopIcon spinning={active === n - 1 && playing} /> loops back to {loopBackTo || steps[0]}
          </div>
        ) : null}
      </div>
      <div className="diagram-controls">
        <button type="button" className="diagram-ctrl-btn" onClick={handlePlayPause} aria-label={playing ? 'Pause' : 'Play'}>
          {playing ? <PauseIcon /> : <PlayIcon />}
          {playing ? 'Pause' : 'Play'}
        </button>
        <button type="button" className="diagram-ctrl-btn" onClick={handleStep} aria-label="Step forward">
          <StepIcon /> Step
        </button>
        <button type="button" className="diagram-ctrl-btn diagram-ctrl-ghost" onClick={handleReset} aria-label="Reset">
          <ResetIcon /> Reset
        </button>
        <span className="diagram-progress">
          Step {Math.min(active + 1, n)} of {n}
        </span>
      </div>
    </div>
  );
}

function FlowArrow({ live, inTransit }) {
  return (
    <div className={'diagram-flow-arrow' + (live ? ' diagram-flow-arrow-live' : '')} aria-hidden="true">
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M0 6H18M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      {inTransit ? <span className="diagram-flow-dot" /> : null}
    </div>
  );
}

function LoopIcon({ spinning }) {
  return (
    <svg
      width="13"
      height="13"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className={'diagram-loop-icon' + (spinning ? ' diagram-loop-icon-spin' : '')}
    >
      <path d="M17.65 6.35A8 8 0 1 0 19.5 12" strokeLinecap="round" />
      <path d="M20 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PlayIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <path d="M8 5v14l11-7-11-7Z" />
    </svg>
  );
}
function PauseIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
      <rect x="6" y="5" width="4" height="14" rx="1" />
      <rect x="14" y="5" width="4" height="14" rx="1" />
    </svg>
  );
}
function StepIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 5v14l9-7-9-7Z" />
      <path d="M19 5v14" />
    </svg>
  );
}
function ResetIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 12a9 9 0 1 0 3-6.7" />
      <path d="M3 4v5h5" />
    </svg>
  );
}

function Tree({ root, children_ }) {
  return (
    <div className="diagram-tree">
      <div className="diagram-tree-root diagram-anim" style={{ '--i': 0 }}>
        {root}
      </div>
      <div className="diagram-tree-children">
        {children_.map((c, i) => (
          <div className="diagram-tree-node diagram-anim" style={{ '--i': i + 1 }} key={i}>
            {c.label}
            {c.sub ? <div className="diagram-sub">{c.sub}</div> : null}
          </div>
        ))}
      </div>
    </div>
  );
}

function Compare({ columns }) {
  return (
    <div className="diagram-compare">
      {columns.map((col, i) => (
        <div className="diagram-compare-col diagram-anim" style={{ '--i': i }} key={i}>
          <div className="diagram-compare-head">{col.title}</div>
          <ul>
            {col.points.map((p, j) => (
              <li key={j}>{p}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function Grid({ items }) {
  return (
    <div className={'diagram-row' + (items.length >= 4 ? ' diagram-row-4' : items.length === 3 ? ' diagram-row-3' : '')}>
      {items.map((it, i) => (
        <React.Fragment key={i}>
          <div className="diagram-col diagram-anim" style={{ '--i': i }}>
            {it.dashed ? (
              <div className="diagram-chip diagram-chip-dashed">
                {it.label}
                {it.sub ? <div className="diagram-sub">{it.sub}</div> : null}
              </div>
            ) : (
              <div className="diagram-block">
                {it.label}
                {it.sub ? <div className="diagram-sub">{it.sub}</div> : null}
              </div>
            )}
          </div>
          {it.arrowAfter && i < items.length - 1 ? <div className="diagram-arrow">&#8594;</div> : null}
        </React.Fragment>
      ))}
    </div>
  );
}
