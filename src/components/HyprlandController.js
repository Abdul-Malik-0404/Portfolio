'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Monitor, Sparkles, Terminal } from 'lucide-react';
import { useHyprland, WORKSPACE_LIST } from './HyprlandContext';

export default function HyprlandController() {
  const [showHelp, setShowHelp] = useState(false);
  const { activeWorkspace, switchWorkspace, notification } = useHyprland();

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      if (e.key === '?') {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
        return;
      }

      const num = parseInt(e.key, 10);
      if (num >= 1 && num <= WORKSPACE_LIST.length) {
        e.preventDefault();
        switchWorkspace(num);
        return;
      }

      if (e.key === 'ArrowRight' && activeWorkspace < WORKSPACE_LIST.length) {
        e.preventDefault();
        switchWorkspace(activeWorkspace + 1);
      } else if (e.key === 'ArrowLeft' && activeWorkspace > 1) {
        e.preventDefault();
        switchWorkspace(activeWorkspace - 1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp, activeWorkspace, switchWorkspace]);

  return (
    <>
      {/* Hyprland IPC Notification Toast (hyprctl notify) */}
      <AnimatePresence>
        {notification && (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: 40, scale: 0.92 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 30, scale: 0.92 }}
            className="hypr-notify-toast"
          >
            <Terminal size={14} className="icon-cyan" />
            <span>{notification.text}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Keybindings button on bottom left */}
      <button
        type="button"
        className="hypr-hotkeys-btn"
        onClick={() => setShowHelp(true)}
        title="Hyprland Keybindings (?)"
      >
        <Keyboard size={16} />
        <span>[ ? ] HyprBinds</span>
      </button>

      {/* Cheatsheet Modal */}
      <AnimatePresence>
        {showHelp && (
          <motion.div
            className="terminal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowHelp(false)}
          >
            <motion.div
              className="skills-modal-content interactive"
              style={{ maxWidth: '660px', padding: '2.5rem 2rem' }}
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close-btn"
                onClick={() => setShowHelp(false)}
                title="Close"
              >
                <X size={24} />
              </button>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.8rem',
                  marginBottom: '1.5rem',
                  borderBottom: '1px solid var(--glass-border)',
                  paddingBottom: '1rem',
                }}
              >
                <Monitor className="icon-cyan" size={26} />
                <h2 style={{ fontSize: '1.5rem', color: '#fff', margin: 0 }}>
                  Hyprland Compositor &amp; Tiling Controls
                </h2>
              </div>

              <div className="hypr-shortcuts-grid">
                <div className="shortcut-row">
                  <span className="key-combo">Scroll / 1..6 / ← →</span>
                  <span className="shortcut-desc">
                    Slide Horizontally Between Workspaces (<code>WS:01</code> ..{' '}
                    <code>WS:06</code>)
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">Click Window / F</span>
                  <span className="shortcut-desc">
                    Expand Window In-Place to <b>Full-Screen Monocle</b> View
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">V (or Float / Tile Here)</span>
                  <span className="shortcut-desc">
                    Detach Window to <b>Float &amp; Drag</b>, or Snap into Tile
                    Slot where dropped
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">Q (or × btn)</span>
                  <span className="shortcut-desc">
                    Kill focused window (remaining tiles dynamically expand to
                    fill 100% of screen)
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">R (or Retile)</span>
                  <span className="shortcut-desc">
                    Restore all closed/floating windows back to default dwindle
                    tiling
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">Drag Split Bar</span>
                  <span className="shortcut-desc">
                    Resize Master / Stack split ratio dynamically
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">` (Tilde)</span>
                  <span className="shortcut-desc">
                    Toggle Quake Terminal CLI scratchpad
                  </span>
                </div>
              </div>

              <div
                style={{
                  marginTop: '1.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  color: 'var(--text-muted)',
                  fontSize: '0.85rem',
                }}
              >
                <Sparkles size={16} className="icon-magenta" />
                <span>
                  Tip: Float a window, drag it to another side of the screen, and
                  click <b>Tile Here</b> to swap its tiled slot!
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
