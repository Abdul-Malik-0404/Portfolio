'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Maximize2,
  Minimize2,
  Layers,
  X,
  RotateCcw,
  Terminal as TerminalIcon,
  ArrowLeft,
} from 'lucide-react';
import { useHyprland } from './HyprlandContext';

const HYPR_BEZIER = [0.05, 0.9, 0.1, 1.05];

export function HyprWindow({
  win,
  workspace,
  allWindowIds = [],
  isExpandedView = false,
  isFloatingView = false,
}) {
  const {
    focusedWindow,
    setFocusedWindow,
    toggleFloat,
    toggleFullscreen,
    closeWindow,
  } = useHyprland();

  const winRef = useRef(null);
  const isFocused = focusedWindow?.id === win.id;

  const handleToggleFloat = (e) => {
    e.stopPropagation();
    let dropPoint = null;
    if (isFloatingView && winRef.current) {
      const rect = winRef.current.getBoundingClientRect();
      dropPoint = {
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
      };
    }
    toggleFloat(win.id, win.title, workspace, allWindowIds, dropPoint);
  };

  const handleToggleFullscreen = (e) => {
    e.stopPropagation();
    toggleFullscreen(win.id, win.title, allWindowIds);
  };

  const handleClose = (e) => {
    e.stopPropagation();
    closeWindow(win.id, win.title);
  };

  const handleWindowClick = () => {
    if (win.onWindowClick) {
      win.onWindowClick();
      return;
    }
    // Clicking a tiled window expands the window itself into fullscreen (Monocle)
    if (!isExpandedView && !isFloatingView && win.expandable !== false) {
      toggleFullscreen(win.id, win.title, allWindowIds);
    }
  };

  return (
    <motion.div
      ref={winRef}
      layoutId={`hypr-win-${win.id}`}
      drag={isFloatingView}
      dragMomentum={false}
      transition={{
        layout: { duration: 0.36, ease: HYPR_BEZIER },
      }}
      onMouseEnter={() =>
        setFocusedWindow({
          id: win.id,
          title: win.title,
          appClass: win.appClass || 'kitty',
          workspace,
        })
      }
      onClick={handleWindowClick}
      className={`hypr-window ${isFocused ? 'focused' : 'unfocused'} ${
        isFloatingView ? 'mode-floating' : ''
      } ${isExpandedView ? 'mode-fullscreen' : ''} ${
        !isExpandedView && win.expandable !== false ? 'interactive-tile' : ''
      }`}
      style={{
        zIndex: isFloatingView ? 250 : isExpandedView ? 120 : isFocused ? 15 : 1,
      }}
    >
      {/* Hyprland Window Titlebar */}
      <div
        className="hypr-window-titlebar"
        onClick={(e) => {
          if (isFloatingView) e.stopPropagation();
        }}
      >
        <div className="hypr-win-meta">
          <span className={`hypr-win-dot ${isFocused ? 'active' : ''}`} />
          <span className="hypr-win-class">{win.appClass || 'kitty'}</span>
          <span className="hypr-win-sep">//</span>
          <span className="hypr-win-title">{win.title}</span>
          {isFloatingView && (
            <span className="hypr-win-mode-tag float">
              FLOATING · DRAG &amp; CLICK TILE TO SNAP
            </span>
          )}
          {isExpandedView && (
            <span className="hypr-win-mode-tag monocle">
              FULLSCREEN INSPECTOR
            </span>
          )}
        </div>

        <div className="hypr-win-controls" onClick={(e) => e.stopPropagation()}>
          {isExpandedView && (
            <button
              type="button"
              className="hypr-win-btn active"
              onClick={handleToggleFullscreen}
              title="Return to Tiled Workspace View (F or Esc)"
            >
              <ArrowLeft size={12} />
              <span className="btn-label">Back to Tiles</span>
            </button>
          )}

          <button
            type="button"
            className={`hypr-win-btn ${isFloatingView ? 'active' : ''}`}
            onClick={handleToggleFloat}
            title={
              isFloatingView
                ? 'Snap into Tiled Grid at current position (V)'
                : 'Detach as Draggable Floating Window (V)'
            }
          >
            <Layers size={12} />
            <span className="btn-label">{isFloatingView ? 'Tile Here' : 'Float'}</span>
          </button>

          <button
            type="button"
            className={`hypr-win-btn ${isExpandedView ? 'active' : ''}`}
            onClick={handleToggleFullscreen}
            title={
              isExpandedView
                ? 'Exit Fullscreen (F)'
                : 'Expand Window Fullscreen (F)'
            }
          >
            {isExpandedView ? <Minimize2 size={12} /> : <Maximize2 size={12} />}
          </button>

          <button
            type="button"
            className="hypr-win-btn close"
            onClick={handleClose}
            title="Close Window — Remaining tiles will expand to fill space (Q)"
          >
            <X size={13} />
          </button>
        </div>
      </div>

      {/* Window Content Body */}
      <div
        className={`hypr-window-body ${
          isExpandedView ? 'expanded-scroll-body' : 'tiled-fit-body'
        }`}
      >
        {isExpandedView && win.renderExpanded
          ? win.renderExpanded({
              collapse: () => toggleFullscreen(win.id, win.title, allWindowIds),
            })
          : win.renderTiled({
              expand: () => toggleFullscreen(win.id, win.title, allWindowIds),
            })}
      </div>
    </motion.div>
  );
}

export function HyprWorkspace({
  id,
  wsNumber,
  wsName,
  title,
  defaultSplit = 56,
  headerExtra = null,
  windows = [],
}) {
  const {
    windowStates,
    getWindowState,
    getOrderedWindowIds,
    restoreWorkspaceWindows,
  } = useHyprland();

  const [splitRatio, setSplitRatio] = useState(defaultSplit);
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const containerRef = useRef(null);

  const defaultIds = windows.map((w) => w.id);
  const orderedIds = getOrderedWindowIds(wsNumber, defaultIds);

  // Map ordered IDs back to window objects
  const orderedWindows = orderedIds
    .map((wId) => windows.find((w) => w.id === wId))
    .filter(Boolean);

  const modifiedInWs = defaultIds.filter((wId) => {
    const st = windowStates[wId];
    return st && (st.closed || st.mode !== 'tiled');
  });

  // Separate active windows by state
  const fullscreenWin = orderedWindows.find((w) => {
    const st = getWindowState(w.id);
    return !st.closed && st.mode === 'fullscreen';
  });

  const tiledWindows = orderedWindows.filter((w) => {
    const st = getWindowState(w.id);
    return !st.closed && st.mode === 'tiled';
  });

  const floatingWindows = orderedWindows.filter((w) => {
    const st = getWindowState(w.id);
    return !st.closed && st.mode === 'floating';
  });

  const allClosed =
    tiledWindows.length === 0 &&
    floatingWindows.length === 0 &&
    !fullscreenWin;

  // Handle mouse drag for resizing 2-window or 3-window dwindle master split
  useEffect(() => {
    if (!isDraggingSplit) return;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.min(72, Math.max(32, Math.round(pct))));
    };
    const handleMouseUp = () => setIsDraggingSplit(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSplit]);

  // Dynamic Hyprland Dwindle / Grid Renderer for N Tiled Windows (fills 100% width x 100% height!)
  const renderDynamicTiledTree = () => {
    const count = tiledWindows.length;
    if (count === 0) {
      return (
        <div className="hypr-empty-workspace">
          <TerminalIcon size={28} className="icon-cyan" />
          <p>
            All windows in <strong>WS:0{wsNumber} ({wsName})</strong> are currently{' '}
            {floatingWindows.length > 0 ? 'floating' : 'closed'}.
          </p>
          <button
            type="button"
            className="action-btn"
            onClick={() => restoreWorkspaceWindows(defaultIds, wsNumber)}
          >
            <RotateCcw size={16} /> Retile Workspace Windows
          </button>
        </div>
      );
    }

    // N = 1: Single window fills 100% width x 100% height of the monitor
    if (count === 1) {
      return (
        <div className="hypr-bsp-single">
          <HyprWindow
            key={`tiled-${tiledWindows[0].id}`}
            win={tiledWindows[0]}
            workspace={wsNumber}
            allWindowIds={defaultIds}
          />
        </div>
      );
    }

    // N = 2: Master Left (splitRatio%) + Master Right (100 - splitRatio%), both 100% height
    if (count === 2) {
      return (
        <div
          ref={containerRef}
          className={`hypr-bsp-split ${isDraggingSplit ? 'resizing' : ''}`}
        >
          <div className="hypr-bsp-pane" style={{ width: `${splitRatio}%` }}>
            <HyprWindow
              key={`tiled-${tiledWindows[0].id}`}
              win={tiledWindows[0]}
              workspace={wsNumber}
              allWindowIds={defaultIds}
            />
          </div>
          <div
            className={`hypr-split-divider ${isDraggingSplit ? 'active' : ''}`}
            onMouseDown={() => setIsDraggingSplit(true)}
            title="Drag to resize split"
          >
            <div className="hypr-split-grip" />
          </div>
          <div
            className="hypr-bsp-pane"
            style={{ width: `calc(${100 - splitRatio}% - 12px)` }}
          >
            <HyprWindow
              key={`tiled-${tiledWindows[1].id}`}
              win={tiledWindows[1]}
              workspace={wsNumber}
              allWindowIds={defaultIds}
            />
          </div>
        </div>
      );
    }

    // N = 3: Classic Hyprland Dwindle (Left Master 100% height + Right Stack 2 windows 50% height each)
    if (count === 3) {
      return (
        <div
          ref={containerRef}
          className={`hypr-bsp-split ${isDraggingSplit ? 'resizing' : ''}`}
        >
          <div className="hypr-bsp-pane" style={{ width: `${splitRatio}%` }}>
            <HyprWindow
              key={`tiled-${tiledWindows[0].id}`}
              win={tiledWindows[0]}
              workspace={wsNumber}
              allWindowIds={defaultIds}
            />
          </div>
          <div
            className={`hypr-split-divider ${isDraggingSplit ? 'active' : ''}`}
            onMouseDown={() => setIsDraggingSplit(true)}
            title="Drag to resize master/stack split"
          >
            <div className="hypr-split-grip" />
          </div>
          <div
            className="hypr-bsp-col"
            style={{ width: `calc(${100 - splitRatio}% - 12px)` }}
          >
            <div className="hypr-bsp-row-item">
              <HyprWindow
                key={`tiled-${tiledWindows[1].id}`}
                win={tiledWindows[1]}
                workspace={wsNumber}
                allWindowIds={defaultIds}
              />
            </div>
            <div className="hypr-bsp-row-item">
              <HyprWindow
                key={`tiled-${tiledWindows[2].id}`}
                win={tiledWindows[2]}
                workspace={wsNumber}
                allWindowIds={defaultIds}
              />
            </div>
          </div>
        </div>
      );
    }

    // N >= 4: 2-Row Dynamic Tiled Matrix filling 100% width x 100% height
    const topCount = Math.ceil(count / 2);
    const topRow = tiledWindows.slice(0, topCount);
    const bottomRow = tiledWindows.slice(topCount);

    return (
      <div className="hypr-bsp-matrix">
        <div className="hypr-bsp-matrix-row">
          {topRow.map((w) => (
            <div key={`tiled-${w.id}`} className="hypr-bsp-matrix-cell">
              <HyprWindow
                win={w}
                workspace={wsNumber}
                allWindowIds={defaultIds}
              />
            </div>
          ))}
        </div>
        <div className="hypr-bsp-matrix-row">
          {bottomRow.map((w) => (
            <div key={`tiled-${w.id}`} className="hypr-bsp-matrix-cell">
              <HyprWindow
                win={w}
                workspace={wsNumber}
                allWindowIds={defaultIds}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id={id} className="hypr-monitor-workspace">
      {/* Compact Workspace Status Bar */}
      <div className="hypr-ws-bar">
        <div className="hypr-ws-bar-left">
          <span className="hypr-ws-pill">WS:0{wsNumber}</span>
          {title && <h2 className="hypr-ws-title">{title}</h2>}
          <span className="hypr-ws-layout-badge">
            {fullscreenWin
              ? `monocle // ${fullscreenWin.title}`
              : `dwindle (${tiledWindows.length} tiled${
                  floatingWindows.length > 0
                    ? `, ${floatingWindows.length} float`
                    : ''
                })`}
          </span>
        </div>

        <div className="hypr-ws-bar-right">
          {headerExtra}
          {(modifiedInWs.length > 0 ||
            JSON.stringify(orderedIds) !== JSON.stringify(defaultIds)) && (
            <button
              type="button"
              className="hypr-ws-reset-btn"
              onClick={() => restoreWorkspaceWindows(defaultIds, wsNumber)}
              title="Reset all windows in this workspace back to default tiled layout"
            >
              <RotateCcw size={12} />
              <span>Retile Workspace</span>
            </button>
          )}
          <span className="hypr-ws-hint">
            scroll to switch WS · click window or <b>[F]</b> to expand ·{' '}
            <b>[V]</b> float/tile · <b>[Q]</b> kill
          </span>
        </div>
      </div>

      {/* Main Tiled / Monocle Monitor Area (100% remaining viewport height) */}
      <div className="hypr-monitor-canvas">
        {allClosed ? (
          <div className="hypr-empty-workspace">
            <TerminalIcon size={28} className="icon-cyan" />
            <p>
              Workspace <strong>0{wsNumber}:{wsName}</strong> has no active
              windows.
            </p>
            <button
              type="button"
              className="action-btn"
              onClick={() => restoreWorkspaceWindows(defaultIds, wsNumber)}
            >
              <RotateCcw size={16} /> Respawn Tiled Windows
            </button>
          </div>
        ) : fullscreenWin ? (
          <div className="hypr-bsp-single">
            <HyprWindow
              key={`fs-${fullscreenWin.id}`}
              win={fullscreenWin}
              workspace={wsNumber}
              allWindowIds={defaultIds}
              isExpandedView={true}
            />
          </div>
        ) : (
          renderDynamicTiledTree()
        )}

        {/* Floating Windows Overlay Layer (detached from tile flow so tiles fill 100% behind them) */}
        <AnimatePresence>
          {floatingWindows.map((win, idx) => (
            <div
              key={`float-wrap-${win.id}`}
              className="hypr-floating-layer-item"
              style={{
                top: `${110 + idx * 32}px`,
                left: `calc(50% - 240px + ${idx * 28}px)`,
              }}
            >
              <HyprWindow
                key={`float-${win.id}`}
                win={win}
                workspace={wsNumber}
                allWindowIds={defaultIds}
                isFloatingView={true}
              />
            </div>
          ))}
        </AnimatePresence>
      </div>
    </section>
  );
}
