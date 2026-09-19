import React from 'react';

// A small set of data-driven diagram "primitives". Every topic can attach a
// `flow` spec (see data shapes below) instead of hand-written HTML, so adding
// a diagram to a topic is just a few lines of data — and every diagram gets
// the same staggered entrance animation + (for pipeline/lifecycle) an
// animated flow-pulse between steps, for free.
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

function Pipeline({ steps, loop, loopBackTo }) {
  return (
    <div className="diagram-pipeline">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="diagram-step diagram-anim" style={{ '--i': i }}>
            {s}
          </div>
          {i < steps.length - 1 ? <FlowArrow /> : null}
        </React.Fragment>
      ))}
      {loop ? (
        <div className="diagram-loop-note diagram-anim" style={{ '--i': steps.length }}>
          <LoopIcon /> loops back to {loopBackTo || steps[0]}
        </div>
      ) : null}
    </div>
  );
}

function FlowArrow() {
  return (
    <div className="diagram-flow-arrow" aria-hidden="true">
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M0 6H18M18 6L13 1M18 6L13 11" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="diagram-flow-dot" />
    </div>
  );
}

function LoopIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="diagram-loop-icon">
      <path d="M17.65 6.35A8 8 0 1 0 19.5 12" strokeLinecap="round" />
      <path d="M20 3v6h-6" strokeLinecap="round" strokeLinejoin="round" />
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
