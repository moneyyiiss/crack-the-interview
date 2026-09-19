import React, { useMemo, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import CATEGORIES from './data.js';
import { useProgress, topicKey } from './lib/useProgress.js';
import Sidebar from './components/Sidebar.jsx';
import AuthModal from './components/AuthModal.jsx';
import Overview from './components/Overview.jsx';
import CategoryDetail from './components/CategoryDetail.jsx';
import Revision from './components/Revision.jsx';
import SearchResults from './components/SearchResults.jsx';

function totalTopics() {
  return CATEGORIES.reduce((s, c) => s + c.topics.length, 0);
}

export default function App() {
  const progress = useProgress();
  const { done, user } = progress;
  const [query, setQuery] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [authOpen, setAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login');
  const navigate = useNavigate();
  const location = useLocation();

  const doneCount = useMemo(() => Object.values(done).filter(Boolean).length, [done]);
  const total = totalTopics();

  function doneInCat(cat) {
    return cat.topics.filter((_, i) => done[topicKey(cat.id, i)]).length;
  }

  function goHome() {
    navigate('/');
    setQuery('');
    setMobileOpen(false);
  }
  function goRevision() {
    navigate('/revision');
    setQuery('');
    setMobileOpen(false);
  }
  function goCategory(catId) {
    navigate('/c/' + catId);
    setQuery('');
    setMobileOpen(false);
  }
  function openAuth(mode) {
    setAuthMode(mode || 'login');
    setAuthOpen(true);
  }

  const activeCatId = location.pathname.startsWith('/c/') ? location.pathname.slice(3) : null;
  const trimmedQuery = query.trim();

  return (
    <div className="app">
      <div className={'sidebar-backdrop' + (mobileOpen ? ' show' : '')} onClick={() => setMobileOpen(false)} />
      <Sidebar
        categories={CATEGORIES}
        doneInCat={doneInCat}
        totalTopics={total}
        doneCount={doneCount}
        view={trimmedQuery ? 'search' : location.pathname === '/' ? 'overview' : location.pathname === '/revision' ? 'revision' : 'category'}
        activeCatId={activeCatId}
        query={query}
        onQueryChange={setQuery}
        onHome={goHome}
        onRevision={goRevision}
        onCategory={goCategory}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        onOpenAuth={openAuth}
        user={user}
        onSignOut={progress.signOut}
        onReset={() => {
          if (window.confirm('Reset all progress? This clears every checked topic in this browser.')) {
            progress.reset();
          }
        }}
      />

      <main className="main">
        <div className="topbar">
          <TopbarLeft
            query={trimmedQuery}
            pathname={location.pathname}
            categories={CATEGORIES}
            activeCatId={activeCatId}
            onHome={goHome}
          />
          <div className="topbar-right">
            {location.pathname.startsWith('/c/') && !trimmedQuery && (
              <MarkAllButton catId={activeCatId} progress={progress} />
            )}
            <button className="menu-toggle" aria-label="Open menu" onClick={() => setMobileOpen(true)}>
              <MenuIcon />
            </button>
          </div>
        </div>

        <div className="content">
          {trimmedQuery ? (
            <SearchResults query={trimmedQuery} categories={CATEGORIES} onPick={goCategory} />
          ) : (
            <Routes>
              <Route
                path="/"
                element={<Overview categories={CATEGORIES} doneInCat={doneInCat} onPick={goCategory} total={total} doneCount={doneCount} />}
              />
              <Route path="/revision" element={<Revision categories={CATEGORIES} />} />
              <Route
                path="/c/:catId"
                element={<CategoryDetail categories={CATEGORIES} done={done} progress={progress} />}
              />
              <Route path="*" element={<Overview categories={CATEGORIES} doneInCat={doneInCat} onPick={goCategory} total={total} doneCount={doneCount} />} />
            </Routes>
          )}
        </div>
      </main>

      <AuthModal
        open={authOpen}
        mode={authMode}
        setMode={setAuthMode}
        onClose={() => setAuthOpen(false)}
        signIn={progress.signIn}
        signUp={progress.signUp}
      />
    </div>
  );
}

function MenuIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <line x1="3" y1="6" x2="21" y2="6" />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  );
}

function TopbarLeft({ query, pathname, categories, activeCatId, onHome }) {
  let crumb = <b>Overview</b>;
  let title = 'Java Interview Prep';

  if (query) {
    crumb = (
      <>
        <b>Search</b>
        <span className="crumb-sep">·</span>&quot;{query}&quot;
      </>
    );
    title = 'Search';
  } else if (pathname === '/revision') {
    crumb = <b>Quick Revision</b>;
    title = 'Quick Revision';
  } else if (pathname.startsWith('/c/')) {
    const cat = categories.find((c) => c.id === activeCatId);
    if (cat) {
      crumb = (
        <>
          <a href="#" onClick={(e) => { e.preventDefault(); onHome(); }}>
            <b>Overview</b>
          </a>
          <span className="crumb-sep">/</span>
          {cat.title}
        </>
      );
      title = cat.title;
    }
  }

  return (
    <div className="topbar-left">
      <div className="crumb">{crumb}</div>
      <h1 className="page-h1">{title}</h1>
    </div>
  );
}

function MarkAllButton({ catId, progress }) {
  const cat = CATEGORIES.find((c) => c.id === catId);
  if (!cat) return null;
  const keys = cat.topics.map((_, i) => topicKey(cat.id, i));
  const d = keys.filter((k) => progress.done[k]).length;
  const allDone = d === keys.length;
  return (
    <button className={'btn' + (allDone ? '' : ' primary')} onClick={() => progress.markAll(keys, !allDone)}>
      {allDone ? 'Mark all undone' : 'Mark all done'}
    </button>
  );
}
