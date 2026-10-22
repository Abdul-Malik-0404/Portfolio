'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Monitor, Sparkles, Terminal } from 'lucide-react';
import { useHyprland } from './HyprlandContext';

const WORKSPACES = [
  { id: 1, name: 'About', target: 'home' },
  { id: 2, name: 'Education', target: 'education' },
  { id: 3, name: 'Skills', target: 'skills' },
  { id: 4, name: 'Projects', target: 'projects' },
  { id: 5, name: 'Blog', target: 'blog' },
  { id: 6, name: 'Activities', target: 'extra' },
];

export default function HyprlandController() {
  const [activeWs, setActiveWs] = useState(1);
  const [showHelp, setShowHelp] = useState(false);
  const { notification } = useHyprland();

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
      if (num >= 1 && num <= WORKSPACES.length) {
        const ws = WORKSPACES.find((w) => w.id === num);
        if (ws) {
          e.preventDefault();
          switchWorkspace(ws.id, ws.target);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showHelp]);

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      for (let i = WORKSPACES.length - 1; i >= 0; i--) {
        const el = document.getElementById(WORKSPACES[i].target);
        if (el && el.offsetTop <= scrollPos) {
          setActiveWs(WORKSPACES[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const switchWorkspace = (wsId, targetId) => {
    setActiveWs(wsId);
    const el = document.getElementById(targetId);
    if (el) {
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth',
      });
    }
  };

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
                  <span className="key-combo">Hover Window</span>
                  <span className="shortcut-desc">
                    Focus window automatically (<code>follow_mouse = 1</code>)
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">V (or Float btn)</span>
                  <span className="shortcut-desc">
                    Toggle Focused Window between <b>Tiled</b> &amp;{' '}
                    <b>Draggable Floating</b> mode
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">F (or Max btn)</span>
                  <span className="shortcut-desc">
                    Toggle <b>Monocle Fullscreen</b> for the focused window
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">Q (or × btn)</span>
                  <span className="shortcut-desc">
                    Kill focused window (sibling tiles dynamically expand to fill
                    gap)
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
                  <span className="key-combo">Drag Divider</span>
                  <span className="shortcut-desc">
                    Resize Master / Stack split ratio in Workspace 01
                  </span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">1 .. 6</span>
                  <span className="shortcut-desc">
                    Switch Workspace (About, Edu, Skills, Projects, Blog,
                    Activities)
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
                  Tip: Try closing or floating a window—watch the remaining tiles
                  reflow like real Hyprland!
                </span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
