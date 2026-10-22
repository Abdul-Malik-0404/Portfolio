'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, Terminal, Monitor, Compass, Sparkles } from 'lucide-react';

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

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Don't capture when typing in an input or textarea
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return;

      // '?' opens cheat sheet modal
      if (e.key === '?') {
        e.preventDefault();
        setShowHelp((prev) => !prev);
        return;
      }

      if (e.key === 'Escape' && showHelp) {
        setShowHelp(false);
        return;
      }

      // Numbers 1-6 switch workspaces
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
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <>
      {/* Floating Keybindings button on bottom left */}
      <button
        type="button"
        className="hypr-hotkeys-btn"
        onClick={() => setShowHelp(true)}
        title="Hyprland Keybindings (?)"
      >
        <Keyboard size={16} />
        <span>[ ? ] Keys</span>
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
              style={{ maxWidth: '620px', padding: '2.5rem 2rem' }}
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

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                <Monitor className="icon-cyan" size={26} />
                <h2 style={{ fontSize: '1.6rem', color: '#fff', margin: 0 }}>
                  Hyprland Keybindings & Controls
                </h2>
              </div>

              <div className="hypr-shortcuts-grid">
                <div className="shortcut-row">
                  <span className="key-combo">1 .. 6</span>
                  <span className="shortcut-desc">Switch Workspace (About, Edu, Skills, Projects, Blog, Activities)</span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">` (Tilde)</span>
                  <span className="shortcut-desc">Toggle Quake Terminal CLI scratchpad</span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">?</span>
                  <span className="shortcut-desc">Toggle this Keybindings Cheat Sheet</span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">Esc</span>
                  <span className="shortcut-desc">Close any active modal / terminal window</span>
                </div>
                <div className="shortcut-row">
                  <span className="key-combo">Click Card</span>
                  <span className="shortcut-desc">Expand project / skill into focused floating window</span>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
                <Sparkles size={16} className="icon-magenta" />
                <span>Tip: Type <strong style={{ color: 'var(--accent-cyan)' }}>neofetch</strong> in the CLI for your specs!</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
