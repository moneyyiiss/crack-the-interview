import { useCallback, useEffect, useRef, useState } from 'react';
import { sb } from './supabase';

const STORAGE_KEY = 'javaprep_done_v1';

function loadLocal() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
  } catch (e) {
    return {};
  }
}

function saveLocal(done) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(done));
  } catch (e) {
    /* ignore */
  }
}

export function topicKey(catId, idx) {
  return catId + '::' + idx;
}

export function useProgress() {
  const [done, setDone] = useState(loadLocal);
  const [user, setUser] = useState(null);
  const syncingRef = useRef(false);

  const pushProgress = useCallback(async (key, isDone, currentUser) => {
    if (!sb || !currentUser) return;
    try {
      if (isDone) {
        await sb.from('topic_progress').upsert({
          user_id: currentUser.id,
          topic_slug: key,
          completed: true,
          updated_at: new Date().toISOString(),
        });
      } else {
        await sb.from('topic_progress').delete().eq('user_id', currentUser.id).eq('topic_slug', key);
      }
    } catch (e) {
      /* best-effort */
    }
  }, []);

  const pushAllProgress = useCallback(async (keys, isDone, currentUser) => {
    if (!sb || !currentUser || !keys.length) return;
    try {
      if (isDone) {
        const rows = keys.map((k) => ({
          user_id: currentUser.id,
          topic_slug: k,
          completed: true,
          updated_at: new Date().toISOString(),
        }));
        await sb.from('topic_progress').upsert(rows);
      } else {
        await sb.from('topic_progress').delete().eq('user_id', currentUser.id).in('topic_slug', keys);
      }
    } catch (e) {
      /* best-effort */
    }
  }, []);

  const syncFromRemote = useCallback(
    async (currentUser) => {
      if (!sb || !currentUser || syncingRef.current) return;
      syncingRef.current = true;
      try {
        const { data, error } = await sb
          .from('topic_progress')
          .select('topic_slug,completed')
          .eq('user_id', currentUser.id);
        if (error) throw error;
        const remoteKeys = new Set((data || []).filter((r) => r.completed).map((r) => r.topic_slug));

        setDone((prevDone) => {
          const localKeys = Object.keys(prevDone).filter((k) => prevDone[k]);
          const merged = {};
          remoteKeys.forEach((k) => (merged[k] = true));
          localKeys.forEach((k) => (merged[k] = true));
          saveLocal(merged);

          const toPush = localKeys.filter((k) => !remoteKeys.has(k));
          if (toPush.length) pushAllProgress(toPush, true, currentUser);

          return merged;
        });
      } catch (e) {
        /* if sync fails, keep whatever's local */
      } finally {
        syncingRef.current = false;
      }
    },
    [pushAllProgress]
  );

  useEffect(() => {
    if (!sb) return;
    sb.auth.getSession().then(({ data }) => {
      const u = data && data.session ? data.session.user : null;
      setUser(u);
      if (u) syncFromRemote(u);
    });
    const { data: sub } = sb.auth.onAuthStateChange((_event, session) => {
      setUser((prevUser) => {
        const wasLoggedIn = !!prevUser;
        const u = session ? session.user : null;
        if (u && !wasLoggedIn) syncFromRemote(u);
        return u;
      });
    });
    return () => sub && sub.subscription && sub.subscription.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = useCallback(
    (key, checked) => {
      setDone((prev) => {
        const next = { ...prev, [key]: checked };
        saveLocal(next);
        return next;
      });
      pushProgress(key, checked, user);
    },
    [pushProgress, user]
  );

  const markAll = useCallback(
    (keys, checked) => {
      setDone((prev) => {
        const next = { ...prev };
        keys.forEach((k) => (next[k] = checked));
        saveLocal(next);
        return next;
      });
      pushAllProgress(keys, checked, user);
    },
    [pushAllProgress, user]
  );

  const reset = useCallback(async () => {
    setDone({});
    saveLocal({});
    if (sb && user) {
      try {
        await sb.from('topic_progress').delete().eq('user_id', user.id);
      } catch (e) {
        /* ignore */
      }
    }
  }, [user]);

  const signIn = useCallback(async (email, password) => {
    const { error } = await sb.auth.signInWithPassword({ email, password });
    if (error) throw error;
  }, []);

  const signUp = useCallback(async (email, password) => {
    const { data, error } = await sb.auth.signUp({ email, password });
    if (error) throw error;
    return data;
  }, []);

  const signOut = useCallback(async () => {
    try {
      await sb.auth.signOut();
    } catch (e) {
      /* ignore */
    }
    setUser(null);
  }, []);

  return { done, toggle, markAll, reset, user, signIn, signUp, signOut };
}
