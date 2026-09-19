import React, { useState } from 'react';

export default function AuthModal({ open, mode, setMode, onClose, signIn, signUp }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [msg, setMsg] = useState({ text: '', type: '' });
  const [busy, setBusy] = useState(false);

  if (!open) return null;

  async function handleSubmit(e) {
    e.preventDefault();
    setBusy(true);
    setMsg({ text: '', type: '' });
    try {
      if (mode === 'signup') {
        const data = await signUp(email, password);
        if (data && data.session) {
          setMsg({ text: "Account created — you're signed in.", type: 'success' });
          setTimeout(onClose, 700);
        } else {
          setMsg({ text: 'Check your email to confirm your account, then log in.', type: 'success' });
        }
      } else {
        await signIn(email, password);
        setMsg({ text: 'Signed in.', type: 'success' });
        setTimeout(onClose, 400);
      }
    } catch (err) {
      setMsg({ text: (err && err.message) || 'Something went wrong. Please try again.', type: 'error' });
    } finally {
      setBusy(false);
    }
  }

  return (
    <div
      className="modal-overlay show"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <div className="modal-head">
          <div className="modal-tabs">
            <button
              type="button"
              className={'modal-tab' + (mode === 'login' ? ' active' : '')}
              onClick={() => setMode('login')}
            >
              Log in
            </button>
            <button
              type="button"
              className={'modal-tab' + (mode === 'signup' ? ' active' : '')}
              onClick={() => setMode('signup')}
            >
              Sign up
            </button>
          </div>
          <button type="button" className="modal-close" aria-label="Close" onClick={onClose}>
            &times;
          </button>
        </div>
        <p className="modal-sub">
          {mode === 'login'
            ? 'Log in to sync your progress across every device.'
            : "Create an account to save your progress and pick up where you left off, anywhere."}
        </p>
        <form onSubmit={handleSubmit}>
          <label className="field-label" htmlFor="authEmail">
            Email
          </label>
          <input
            type="email"
            id="authEmail"
            required
            autoComplete="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="field-label" htmlFor="authPassword">
            Password
          </label>
          <input
            type="password"
            id="authPassword"
            required
            autoComplete="current-password"
            minLength={6}
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <div className={'auth-msg' + (msg.type ? ' ' + msg.type : '')}>{msg.text}</div>
          <button type="submit" className="btn primary auth-submit" disabled={busy}>
            {mode === 'login' ? 'Log in' : 'Sign up'}
          </button>
        </form>
      </div>
    </div>
  );
}
