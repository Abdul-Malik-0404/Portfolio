'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const HyprlandContext = createContext(null);

export function HyprlandProvider({ children }) {
  const [focusedWindow, setFocusedWindow] = useState({
    id: 'hero-main',
    title: '~/abdul-malik.md',
    appClass: 'nvim',
    workspace: 1,
  });

  // Map of windowId -> { mode: 'tiled' | 'floating' | 'fullscreen', closed: boolean }
  const [windowStates, setWindowStates] = useState({});
  const [notification, setNotification] = useState(null);

  const notify = useCallback((msg) => {
    setNotification({ id: Date.now(), text: msg });
  }, []);

  useEffect(() => {
    if (!notification) return;
    const timer = setTimeout(() => setNotification(null), 2600);
    return () => clearTimeout(timer);
  }, [notification]);

  const getWindowState = useCallback(
    (id) => windowStates[id] || { mode: 'tiled', closed: false },
    [windowStates]
  );

  const toggleFloat = useCallback(
    (id, title = id) => {
      setWindowStates((prev) => {
        const cur = prev[id] || { mode: 'tiled', closed: false };
        const nextMode = cur.mode === 'floating' ? 'tiled' : 'floating';
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
    (id, title = id) => {
      setWindowStates((prev) => {
        const cur = prev[id] || { mode: 'tiled', closed: false };
        const nextMode = cur.mode === 'fullscreen' ? 'tiled' : 'fullscreen';
        notify(
          `hyprctl dispatch fullscreen 1 → ${title} [${
            nextMode === 'fullscreen' ? 'MONOCLE' : 'TILED'
          }]`
        );
        return {
          ...prev,
          [id]: { ...cur, mode: nextMode, closed: false },
        };
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
    notify('hyprctl reload → restored all windows to dwindle tiling');
  }, [notify]);

  const restoreWorkspaceWindows = useCallback(
    (windowIds) => {
      setWindowStates((prev) => {
        const next = { ...prev };
        windowIds.forEach((id) => {
          delete next[id];
        });
        return next;
      });
      notify('hyprctl dispatch workspace → reset workspace tiles');
    },
    [notify]
  );

  // Count how many windows are currently closed or floating
  const modifiedCount = Object.values(windowStates).filter(
    (s) => s.closed || s.mode !== 'tiled'
  ).length;

  const closedCount = Object.values(windowStates).filter((s) => s.closed).length;

  // Global Hyprland Window Management Keybindings (V = float, F = fullscreen, Q = close, R = restore)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      // Don't hijack keys if a modal overlay is open
      if (document.querySelector('.skills-modal-overlay, .terminal-overlay')) return;

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
    modifiedCount,
    toggleFloat,
    toggleFullscreen,
    closeWindow,
    restoreAllWindows,
  ]);

  return (
    <HyprlandContext.Provider
      value={{
        focusedWindow,
        setFocusedWindow,
        windowStates,
        getWindowState,
        toggleFloat,
        toggleFullscreen,
        closeWindow,
        restoreAllWindows,
        restoreWorkspaceWindows,
        modifiedCount,
        closedCount,
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
      focusedWindow: { id: 'hero-main', title: '~/abdul-malik.md', appClass: 'nvim', workspace: 1 },
      setFocusedWindow: () => {},
      windowStates: {},
      getWindowState: () => ({ mode: 'tiled', closed: false }),
      toggleFloat: () => {},
      toggleFullscreen: () => {},
      closeWindow: () => {},
      restoreAllWindows: () => {},
      restoreWorkspaceWindows: () => {},
      modifiedCount: 0,
      closedCount: 0,
      notification: null,
      notify: () => {},
    };
  }
  return ctx;
}
