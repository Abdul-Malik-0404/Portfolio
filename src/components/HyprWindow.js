'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Maximize2, Minimize2, Layers, X, RotateCcw, Terminal as TerminalIcon } from 'lucide-react';
import { useHyprland } from './HyprlandContext';

// Authentic Hyprland default bezier: bezier = myBezier, 0.05, 0.9, 0.1, 1.05
const HYPR_BEZIER = [0.05, 0.9, 0.1, 1.05];

export function HyprWorkspace({
  id,
  wsNumber,
  wsName,
  title,
  layoutType = 'dwindle',
  windowIds = [],
  headerExtra = null,
  children,
}) {
  const { windowStates, restoreWorkspaceWindows } = useHyprland();

  const modifiedInWs = windowIds.filter((wId) => {
    const st = windowStates[wId];
    return st && (st.closed || st.mode !== 'tiled');
  });

  const allClosed =
    windowIds.length > 0 &&
    windowIds.every((wId) => windowStates[wId]?.closed);

  const hasFullscreen = windowIds.some(
    (wId) => windowStates[wId]?.mode === 'fullscreen' && !windowStates[wId]?.closed
  );

  return (
    <section id={id} className="section hypr-workspace-section">
      <div className="hypr-ws-bar">
        <div className="hypr-ws-bar-left">
          <span className="hypr-ws-pill">WS:0{wsNumber}</span>
          {title && <h2 className="hypr-ws-title">{title}</h2>}
          <span className="hypr-ws-layout-badge">
            layout: {hasFullscreen ? 'monocle (fullscreen)' : layoutType}
          </span>
        </div>

        <div className="hypr-ws-bar-right">
          {headerExtra}
          {modifiedInWs.length > 0 && (
            <button
              type="button"
              className="hypr-ws-reset-btn"
              onClick={() => restoreWorkspaceWindows(windowIds)}
              title="Reset all windows in this workspace back to tiled layout"
            >
              <RotateCcw size={13} />
              <span>Retile ({modifiedInWs.length})</span>
            </button>
          )}
          <span className="hypr-ws-hint">
            hover to focus · <b>[V]</b> float · <b>[F]</b> monocle · <b>[Q]</b> kill
          </span>
        </div>
      </div>

      {allClosed ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="hypr-empty-workspace"
        >
          <TerminalIcon size={28} className="icon-cyan" />
          <p>
            Workspace <strong>0{wsNumber}:{wsName}</strong> has no active tiled windows.
          </p>
          <button
            type="button"
            className="action-btn"
            onClick={() => restoreWorkspaceWindows(windowIds)}
          >
            <RotateCcw size={16} /> Respawn Tiled Windows
          </button>
        </motion.div>
      ) : (
        children
      )}
    </section>
  );
}

export function HyprWindow({
  id,
  title,
  appClass = 'kitty',
  workspace = 1,
  dwindleIndex = 0,
  className = '',
  style = {},
  onClick,
  children,
}) {
  const {
    focusedWindow,
    setFocusedWindow,
    getWindowState,
    toggleFloat,
    toggleFullscreen,
    closeWindow,
  } = useHyprland();

  const { mode, closed } = getWindowState(id);
  const isFocused = focusedWindow?.id === id;
  const isFloating = mode === 'floating';
  const isFullscreen = mode === 'fullscreen';

  // Dwindle split entrance offset based on tile index
  const entranceInitial =
    dwindleIndex % 3 === 0
      ? { opacity: 0, scale: 0.88, x: -28, y: 12 }
      : dwindleIndex % 3 === 1
      ? { opacity: 0, scale: 0.88, x: 28, y: -12 }
      : { opacity: 0, scale: 0.88, x: 14, y: 28 };

  return (
    <AnimatePresence mode="popLayout">
      {!closed && (
        <motion.div
          key={id}
          layout
          drag={isFloating}
          dragMomentum={false}
          initial={entranceInitial}
          whileInView={{ opacity: 1, scale: 1, x: 0, y: 0 }}
          viewport={{ once: true, amount: 0.12 }}
          exit={{
            opacity: 0,
            scale: 0.78,
            filter: 'blur(6px)',
            transition: { duration: 0.24, ease: HYPR_BEZIER },
          }}
          transition={{
            layout: { duration: 0.38, ease: HYPR_BEZIER },
            opacity: { duration: 0.35, delay: Math.min(dwindleIndex * 0.07, 0.28) },
            scale: { duration: 0.42, ease: HYPR_BEZIER, delay: Math.min(dwindleIndex * 0.07, 0.28) },
            x: { duration: 0.42, ease: HYPR_BEZIER, delay: Math.min(dwindleIndex * 0.07, 0.28) },
            y: { duration: 0.42, ease: HYPR_BEZIER, delay: Math.min(dwindleIndex * 0.07, 0.28) },
          }}
          onMouseEnter={() =>
            setFocusedWindow({ id, title, appClass, workspace })
          }
          onClick={onClick}
          className={`hypr-window ${isFocused ? 'focused' : 'unfocused'} ${
            isFloating ? 'mode-floating' : ''
          } ${isFullscreen ? 'mode-fullscreen' : ''} ${className}`}
          style={{
            ...style,
            zIndex: isFloating ? 120 : isFullscreen ? 90 : isFocused ? 15 : 1,
          }}
        >
          {/* Hyprland Window Titlebar */}
          <div
            className="hypr-window-titlebar"
            onClick={(e) => {
              // Allow dragging floating windows by titlebar without triggering card click
              if (isFloating) e.stopPropagation();
            }}
          >
            <div className="hypr-win-meta">
              <span className={`hypr-win-dot ${isFocused ? 'active' : ''}`} />
              <span className="hypr-win-class">{appClass}</span>
              <span className="hypr-win-sep">//</span>
              <span className="hypr-win-title">{title}</span>
              {isFloating && (
                <span className="hypr-win-mode-tag float">FLOAT · DRAG</span>
              )}
              {isFullscreen && (
                <span className="hypr-win-mode-tag monocle">MONOCLE</span>
              )}
            </div>

            <div
              className="hypr-win-controls"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className={`hypr-win-btn ${isFloating ? 'active' : ''}`}
                onClick={() => toggleFloat(id, title)}
                title={
                  isFloating
                    ? 'Snap back to Tiled Grid (V)'
                    : 'Pop out as Draggable Floating Window (V)'
                }
              >
                <Layers size={12} />
                <span className="btn-label">{isFloating ? 'Tile' : 'Float'}</span>
              </button>

              <button
                type="button"
                className={`hypr-win-btn ${isFullscreen ? 'active' : ''}`}
                onClick={() => toggleFullscreen(id, title)}
                title={
                  isFullscreen
                    ? 'Exit Monocle Fullscreen (F)'
                    : 'Expand to Monocle Fullscreen (F)'
                }
              >
                {isFullscreen ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
              </button>

              <button
                type="button"
                className="hypr-win-btn close"
                onClick={() => closeWindow(id, title)}
                title="Close Window — Sibling tiles will expand to fill space (Q)"
              >
                <X size={13} />
              </button>
            </div>
          </div>

          {/* Window Client Body */}
          <div className="hypr-window-body">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
