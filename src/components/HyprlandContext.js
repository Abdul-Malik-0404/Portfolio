'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const HyprlandContext = createContext(null);

export const WORKSPACE_LIST = [
  { id: 1, label: 'about', target: 'home', title: 'Desktop // Overview' },
  { id: 2, label: 'education', target: 'education', title: 'Education Experience' },
  { id: 3, label: 'skills', target: 'skills', title: 'Technical Expertise' },
  { id: 4, label: 'projects', target: 'projects', title: 'Featured Projects' },
  { id: 5, label: 'blog', target: 'blog', title: 'Latest Writing' },
  { id: 6, label: 'activities', target: 'extra', title: 'Activities' },
];

export function HyprlandProvider({ children }) {
  const [activeWorkspace, setActiveWorkspace] = useState(1);
  const [slideDirection, setSlideDirection] = useState(1);

  const [focusedWindow, setFocusedWindow] = useState({
    id: 'hero-main',
    title: '~/abdul-malik.md',
    appClass: 'nvim',
    workspace: 1,
  });

  // Map of windowId -> { mode: 'tiled' | 'floating' | 'fullscreen', closed: boolean }
  const [windowStates, setWindowStates] = useState({});
  // Map of wsNumber -> ordered array of windowIds (allows drag-and-retile slot swapping!)
  const [workspaceOrders, setWorkspaceOrders] = useState({});
  const [notification, setNotification] = useState(null);

  const notify = useCallback((msg) => {
    setNotification({ id: Date.now(), text: msg });
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 2400);
    return () => clearTimeout(timer);
  }, [notification]);

  const switchWorkspace = useCallback((nextWs) => {
    const clamped = Math.max(1, Math.min(WORKSPACE_LIST.length, nextWs));
    setActiveWorkspace((prev) => {
      if (prev === clamped) return prev;
      setSlideDirection(clamped > prev ? 1 : -1);
      return clamped;
    });
  }, []);

  const getWindowState = useCallback(
    (id) => windowStates[id] || { mode: 'tiled', closed: false },
    [windowStates]
  );

  // Register default window order for a workspace if not yet registered
  const getOrderedWindowIds = useCallback(
    (wsNumber, defaultIds) => {
      const current = workspaceOrders[wsNumber];
      if (!current || current.length !== defaultIds.length) {
        return defaultIds;
      }
      return current;
    },
    [workspaceOrders]
  );

  const toggleFloat = useCallback(
    (id, title = id, wsNumber = null, defaultIds = [], dropPoint = null) => {
      setWindowStates((prev) => {
        const cur = prev[id] || { mode: 'tiled', closed: false };
        const nextMode = cur.mode === 'floating' ? 'tiled' : 'floating';

        // If transitioning from floating -> tiled and we have a dropPoint, reorder window slot!
        if (
          cur.mode === 'floating' &&
          nextMode === 'tiled' &&
          wsNumber &&
          defaultIds.length > 1 &&
          dropPoint &&
          typeof window !== 'undefined'
        ) {
          setWorkspaceOrders((prevOrders) => {
            const list = [...(prevOrders[wsNumber] || defaultIds)];
            const fromIdx = list.indexOf(id);
            if (fromIdx === -1) return prevOrders;

            const vw = window.innerWidth;
            const vh = window.innerHeight;
            const relX = dropPoint.x / vw;
            const relY = Math.max(0, (dropPoint.y - 60) / (vh - 60));

            let targetIdx = 0;
            if (list.length === 2) {
              targetIdx = relX < 0.5 ? 0 : 1;
            } else if (list.length === 3) {
              if (relX < 0.48) {
                targetIdx = 0; // Left master slot
              } else {
                targetIdx = relY < 0.5 ? 1 : 2; // Top-right or bottom-right slot
              }
            } else {
              const cols = list.length >= 5 ? 3 : 2;
              const col = Math.min(cols - 1, Math.floor(relX * cols));
              const row = relY < 0.5 ? 0 : 1;
              targetIdx = Math.min(list.length - 1, row * cols + col);
            }

            if (targetIdx !== fromIdx) {
              list.splice(fromIdx, 1);
              list.splice(targetIdx, 0, id);
            }
            return { ...prevOrders, [wsNumber]: list };
          });
        }

        notify(
          `hyprctl dispatch togglefloating → ${title} [${nextMode.toUpperCase()}]`
        );
        return {
          ...prev,
          [id]: { ...cur, mode: nextMode, closed: false },
        };
      });
    },
    [notify]
  );

  const toggleFullscreen = useCallback(
    (id, title = id, wsWindowIds = []) => {
      setWindowStates((prev) => {
        const cur = prev[id] || { mode: 'tiled', closed: false };
        const nextMode = cur.mode === 'fullscreen' ? 'tiled' : 'fullscreen';
        const next = { ...prev };

        // Ensure no other window in the same workspace stays fullscreen simultaneously
        if (nextMode === 'fullscreen' && wsWindowIds.length > 0) {
          wsWindowIds.forEach((otherId) => {
            if (otherId !== id && next[otherId]?.mode === 'fullscreen') {
              next[otherId] = { ...next[otherId], mode: 'tiled' };
            }
          });
        }

        notify(
          `hyprctl dispatch fullscreen 1 → ${title} [${
            nextMode === 'fullscreen' ? 'EXPANDED' : 'TILED'
          }]`
        );
        next[id] = { ...cur, mode: nextMode, closed: false };
        return next;
      });
    },
    [notify]
  );

  const closeWindow = useCallback(
    (id, title = id) => {
      setWindowStates((prev) => {
        const cur = prev[id] || { mode: 'tiled', closed: false };
        notify(`hyprctl dispatch killactive → closed ${title}`);
        return {
          ...prev,
          [id]: { ...cur, mode: 'tiled', closed: true },
        };
      });
    },
    [notify]
  );

  const restoreAllWindows = useCallback(() => {
    setWindowStates({});
    setWorkspaceOrders({});
    notify('hyprctl reload → restored all windows to dwindle tiling');
  }, [notify]);

  const restoreWorkspaceWindows = useCallback(
    (windowIds, wsNumber = null) => {
      setWindowStates((prev) => {
        const next = { ...prev };
        windowIds.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      if (wsNumber) {
        setWorkspaceOrders((prev) => {
          const next = { ...prev };
          delete next[wsNumber];
          return next;
        });
      }
      notify('hyprctl dispatch workspace → reset workspace tiles');
    },
    [notify]
  );

  const modifiedCount = Object.values(windowStates).filter(
    (s) => s.closed || s.mode !== 'tiled'
  ).length;

  // Global Keyboard Shortcuts (V = float, F = fullscreen, Q = close, R = restore, Esc = exit fullscreen)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      if (document.querySelector('.terminal-overlay')) return;

      if (e.key === 'Escape') {
        // Exit any fullscreen window
        const hasFs = Object.entries(windowStates).find(
          ([, st]) => st.mode === 'fullscreen' && !st.closed
        );
        if (hasFs) {
          e.preventDefault();
          toggleFullscreen(hasFs[0], hasFs[0]);
          return;
        }
      }

      const key = e.key.toLowerCase();
      if (key === 'v' && focusedWindow?.id) {
        e.preventDefault();
        toggleFloat(focusedWindow.id, focusedWindow.title);
      } else if (key === 'f' && focusedWindow?.id) {
        e.preventDefault();
        toggleFullscreen(focusedWindow.id, focusedWindow.title);
      } else if (key === 'q' && focusedWindow?.id) {
        e.preventDefault();
        closeWindow(focusedWindow.id, focusedWindow.title);
      } else if (key === 'r' && modifiedCount > 0) {
        e.preventDefault();
        restoreAllWindows();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [
    focusedWindow,
    windowStates,
    modifiedCount,
    toggleFloat,
    toggleFullscreen,
    closeWindow,
    restoreAllWindows,
  ]);

  return (
    <HyprlandContext.Provider
      value={{
        activeWorkspace,
        slideDirection,
        switchWorkspace,
        focusedWindow,
        setFocusedWindow,
        windowStates,
        getWindowState,
        getOrderedWindowIds,
        toggleFloat,
        toggleFullscreen,
        closeWindow,
        restoreAllWindows,
        restoreWorkspaceWindows,
        modifiedCount,
        notification,
        notify,
      }}
    >
      {children}
    </HyprlandContext.Provider>
  );
}

export function useHyprland() {
  const ctx = useContext(HyprlandContext);
  if (!ctx) {
    return {
      activeWorkspace: 1,
      slideDirection: 1,
      switchWorkspace: () => {},
      focusedWindow: {
        id: 'hero-main',
        title: '~/abdul-malik.md',
        appClass: 'nvim',
        workspace: 1,
      },
      setFocusedWindow: () => {},
      windowStates: {},
      getWindowState: () => ({ mode: 'tiled', closed: false }),
      getOrderedWindowIds: (_, ids) => ids,
      toggleFloat: () => {},
      toggleFullscreen: () => {},
      closeWindow: () => {},
      restoreAllWindows: () => {},
      restoreWorkspaceWindows: () => {},
      modifiedCount: 0,
      notification: null,
      notify: () => {},
    };
  }
  return ctx;
}
