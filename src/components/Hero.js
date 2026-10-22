'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X, Zap, CheckCircle2, AlertTriangle, Maximize2 } from 'lucide-react';
import LinkedinIcon from './LinkedinIcon';
import GithubIcon from './GithubIcon';
import { HyprWorkspace, HyprWindow } from './HyprWindow';
import { useHyprland } from './HyprlandContext';

const HERO_WINDOW_IDS = ['hero-main', 'hero-fastfetch', 'hero-telemetry'];

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [splitRatio, setSplitRatio] = useState(56); // Master tile width %
  const [isDraggingSplit, setIsDraggingSplit] = useState(false);
  const containerRef = useRef(null);

  // Live simulated sfugue telemetry state for Window 3
  const [chaosState, setChaosState] = useState('healthy'); // 'healthy' | 'evacuating' | 'recovered'
  const [metrics, setMetrics] = useState({
    rtpRate: 14.2,
    rttMs: 11.4,
    activeNode: 'sfu-pod-01',
    evacTimeMs: null,
  });

  const { getWindowState } = useHyprland();

  // Check which windows are actively tiled in the grid (neither closed nor floating)
  const mainState = getWindowState('hero-main');
  const fetchState = getWindowState('hero-fastfetch');
  const teleState = getWindowState('hero-telemetry');

  const leftActive = !mainState.closed && mainState.mode === 'tiled';
  const rightActive =
    (!fetchState.closed && fetchState.mode === 'tiled') ||
    (!teleState.closed && teleState.mode === 'tiled');

  // Subtle jitter in live RTP telemetry
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) => ({
        ...prev,
        rtpRate: +(13.8 + Math.random() * 1.4).toFixed(1),
        rttMs:
          chaosState === 'evacuating'
            ? +(34.0 + Math.random() * 6.0).toFixed(1)
            : +(10.8 + Math.random() * 1.6).toFixed(1),
      }));
    }, 1200);
    return () => clearInterval(interval);
  }, [chaosState]);

  // Trigger simulated Chaos Mesh Pod Kill -> Redis Evacuation -> Failover
  const triggerChaosFailover = (e) => {
    e.stopPropagation();
    if (chaosState === 'evacuating') return;
    setChaosState('evacuating');
    setTimeout(() => {
      setChaosState('recovered');
      setMetrics((prev) => ({
        ...prev,
        activeNode: prev.activeNode === 'sfu-pod-01' ? 'sfu-pod-02' : 'sfu-pod-01',
        evacTimeMs: Math.floor(34 + Math.random() * 9),
      }));
    }, 950);
  };

  // Mouse drag handler for Master/Stack split divider
  useEffect(() => {
    if (!isDraggingSplit) return;
    const handleMouseMove = (e) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((e.clientX - rect.left) / rect.width) * 100;
      setSplitRatio(Math.min(72, Math.max(36, Math.round(pct))));
    };
    const handleMouseUp = () => setIsDraggingSplit(false);

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDraggingSplit]);

  const effectiveLeftWidth = leftActive && rightActive ? `${splitRatio}%` : '100%';
  const effectiveRightWidth =
    leftActive && rightActive ? `calc(${100 - splitRatio}% - 14px)` : '100%';

  return (
    <HyprWorkspace
      id="home"
      wsNumber={1}
      wsName="about"
      title="Desktop // Overview"
      layoutType={`dwindle (${splitRatio}:${100 - splitRatio})`}
      windowIds={HERO_WINDOW_IDS}
    >
      <div
        ref={containerRef}
        className={`hypr-dwindle-desktop ${isDraggingSplit ? 'resizing' : ''}`}
      >
        {/* MASTER LEFT PANE: Hero Intro Window */}
        <div
          className="hypr-dwindle-master"
          style={{
            width: effectiveLeftWidth,
            display: !mainState.closed ? 'flex' : 'none',
          }}
        >
          <HyprWindow
            id="hero-main"
            title="~/abdul-malik.md"
            appClass="nvim"
            workspace={1}
            dwindleIndex={0}
            className="hero-master-window interactive"
            onClick={() => setIsExpanded(true)}
          >
            <div className="hero-status-chip">
              <span className="dot-pulse" />
              <span>SYSTEMS &amp; AI ENGINEER // ARCH LINUX</span>
            </div>

            <motion.h1 layoutId="hero-title" className="hero-title">
              Abdul Malik
            </motion.h1>
            <motion.h2 layoutId="hero-subtitle" className="subtitle">
              Aspiring Software Engineer &amp; AI Developer
            </motion.h2>
            <motion.p layoutId="hero-summary" className="summary">
              Computer Science undergraduate building resilient distributed systems,
              autonomous multi-agent AI workflows, and real-time cloud-native
              infrastructure.
            </motion.p>

            <div className="hero-bottom-bar" onClick={(e) => e.stopPropagation()}>
              <motion.div layoutId="hero-socials" className="social-links">
                <a
                  href="mailto:abdulmaliksadath@gmail.com"
                  target="_blank"
                  aria-label="Email"
                >
                  <Mail size={22} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdul-malik-9a448b293"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={22} />
                </a>
                <a
                  href="https://github.com/Abdul-Malik-0404"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GithubIcon size={22} />
                </a>
              </motion.div>

              <button
                type="button"
                className="hypr-inspect-btn"
                onClick={() => setIsExpanded(true)}
              >
                <Maximize2 size={14} />
                <span>Inspect Full Bio</span>
              </button>
            </div>
          </HyprWindow>
        </div>

        {/* DRAGGABLE DWINDLE SPLIT HANDLE */}
        {leftActive && rightActive && (
          <div
            className={`hypr-split-divider ${isDraggingSplit ? 'active' : ''}`}
            onMouseDown={() => setIsDraggingSplit(true)}
            title="Drag to resize Hyprland master/stack split ratio"
          >
            <div className="hypr-split-grip" />
          </div>
        )}

        {/* STACK RIGHT PANE: Top = fastfetch, Bottom = Live sfugue Telemetry */}
        <div
          className="hypr-dwindle-stack"
          style={{
            width: effectiveRightWidth,
            display:
              !fetchState.closed || !teleState.closed ? 'flex' : 'none',
          }}
        >
          {/* TOP-RIGHT TILE: fastfetch system specs */}
          <HyprWindow
            id="hero-fastfetch"
            title="fastfetch --config hypr.jsonc"
            appClass="kitty"
            workspace={1}
            dwindleIndex={1}
            className="hero-stack-window"
          >
            <div className="fastfetch-grid">
              <pre className="fastfetch-ascii" aria-hidden="true">{`      /\\
     /  \\
    / /\\ \\
   / /  \\ \\
  / /    \\ \\
 / / /||\\ \\ \\
/_/  \\||/  \\_\\`}</pre>
              <div className="fastfetch-info">
                <div className="ff-header">
                  <span className="icon-cyan">malik</span>@
                  <span className="icon-magenta">archlinux</span>
                </div>
                <div className="ff-divider">-------------------</div>
                <div>
                  <span className="ff-key">OS:</span> Arch Linux x86_64
                </div>
                <div>
                  <span className="ff-key">Kernel:</span> 6.12.arch1-1-zen
                </div>
                <div>
                  <span className="ff-key">WM:</span> Hyprland (Wayland)
                </div>
                <div>
                  <span className="ff-key">Font:</span> JetBrains Mono
                </div>
                <div>
                  <span className="ff-key">Focus:</span> Distributed SFUs &amp; AI
                </div>
                <div className="ff-swatches">
                  <span style={{ background: '#00ffee' }} />
                  <span style={{ background: '#ff00aa' }} />
                  <span style={{ background: '#5af78e' }} />
                  <span style={{ background: '#ffee00' }} />
                  <span style={{ background: '#bd93f9' }} />
                </div>
              </div>
            </div>
          </HyprWindow>

          {/* BOTTOM-RIGHT TILE: Live sfugue SFU Failover Simulation */}
          <HyprWindow
            id="hero-telemetry"
            title="sfugue // k8s-sfu-telemetry"
            appClass="btop"
            workspace={1}
            dwindleIndex={2}
            className="hero-stack-window"
          >
            <div className="sfugue-mini-sim">
              <div className="sim-top-row">
                <div className="sim-node-status">
                  {chaosState === 'evacuating' ? (
                    <AlertTriangle size={14} style={{ color: '#ffee00' }} />
                  ) : (
                    <CheckCircle2 size={14} style={{ color: '#5af78e' }} />
                  )}
                  <span className="sim-node-label">
                    ACTIVE SFU: <strong>{metrics.activeNode}</strong>
                  </span>
                </div>
                <span className={`sim-state-pill ${chaosState}`}>
                  {chaosState === 'healthy' && 'E2EE STREAMING'}
                  {chaosState === 'evacuating' && 'REDIS EVACUATING...'}
                  {chaosState === 'recovered' &&
                    `FAILOVER OK (${metrics.evacTimeMs}ms)`}
                </span>
              </div>

              <div className="sim-metrics-grid">
                <div className="sim-metric-box">
                  <span className="sim-metric-label">RTP THROUGHPUT</span>
                  <span className="sim-metric-val">{metrics.rtpRate}k pkt/s</span>
                </div>
                <div className="sim-metric-box">
                  <span className="sim-metric-label">SFRAME E2EE RTT</span>
                  <span className="sim-metric-val">{metrics.rttMs} ms</span>
                </div>
              </div>

              <div className="sim-footer-row">
                <span className="sim-caption">
                  FYP: Proactive WebRTC SFU State Evacuation
                </span>
                <button
                  type="button"
                  className="sim-chaos-btn"
                  onClick={triggerChaosFailover}
                >
                  <Zap size={12} />
                  <span>
                    {chaosState === 'evacuating'
                      ? 'Evacuating...'
                      : 'Inject Pod Fault'}
                  </span>
                </button>
              </div>
            </div>
          </HyprWindow>
        </div>
      </div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="skills-modal-overlay"
            onClick={() => setIsExpanded(false)}
            style={{ zIndex: 3000 }}
          >
            <motion.div
              layoutId="hero-card"
              className="skills-modal-content interactive"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '2.5rem 2.5rem' }}
            >
              <button
                className="modal-close-btn interactive"
                onClick={() => setIsExpanded(false)}
              >
                <X size={28} />
              </button>

              <motion.h1
                layoutId="hero-title"
                className="hero-title"
                style={{ fontSize: '2.6rem', marginBottom: '0.4rem' }}
              >
                Abdul Malik
              </motion.h1>
              <motion.h2
                layoutId="hero-subtitle"
                className="subtitle"
                style={{
                  fontSize: '1.1rem',
                  marginBottom: '1.2rem',
                  borderBottom: '1px solid var(--glass-border)',
                  paddingBottom: '1rem',
                }}
              >
                Aspiring Software Engineer &amp; AI Developer
              </motion.h2>

              <div
                className="hero-expanded-content"
                style={{
                  color: 'var(--text-color)',
                  lineHeight: '1.65',
                  fontSize: '0.95rem',
                }}
              >
                <motion.p layoutId="hero-summary" style={{ marginBottom: '1rem' }}>
                  An aspiring Computer Science student with a passion for AI,
                  Distributed Systems, and Machine Learning. Dedicated to
                  developing practical software solutions and currently building
                  a strong foundation in cloud-native engineering and full-stack
                  development.
                </motion.p>

                <h3
                  style={{
                    color: 'var(--accent-cyan)',
                    marginBottom: '0.5rem',
                    marginTop: '1.2rem',
                    fontSize: '1.1rem',
                  }}
                >
                  Currently Exploring
                </h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem' }}>
                  <li>
                    Working on my Final Year Project <strong>sfugue</strong> –
                    proactive stateful session evacuation and SFrame E2EE
                    failover benchmarking for distributed WebRTC SFUs on
                    Kubernetes.
                  </li>
                  <li>
                    My daily driver is <strong>Arch Linux (Hyprland)</strong> –
                    I love diving deep into system internals!
                  </li>
                  <li>
                    Expanding my knowledge in{' '}
                    <strong>
                      Kubernetes, Chaos Mesh, Kafka, Docker, and Machine
                      Learning (ML)
                    </strong>
                    .
                  </li>
                  <li>
                    Building native Android applications using{' '}
                    <strong>Kotlin</strong> and{' '}
                    <strong>Jetpack Compose</strong>, including{' '}
                    <strong>Zawj</strong> (an E2EE messaging and WebRTC app).
                  </li>
                </ul>

                <h3
                  style={{
                    color: 'var(--accent-magenta)',
                    marginBottom: '0.4rem',
                    marginTop: '1.2rem',
                    fontSize: '1.1rem',
                  }}
                >
                  Let&apos;s Connect
                </h3>
                <p style={{ marginBottom: '1.2rem' }}>
                  I&apos;m always open to collaborating on distributed systems,
                  AI/ML research, or full-stack applications. Feel free to ask
                  me about Python, TypeScript, WebRTC, Android development, or
                  Arch Linux!
                </p>

                <motion.div
                  layoutId="hero-socials"
                  className="social-links"
                  style={{ justifyContent: 'flex-start', gap: '1.2rem' }}
                >
                  <a
                    href="mailto:abdulmaliksadath@gmail.com"
                    target="_blank"
                    aria-label="Email"
                  >
                    <Mail size={22} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/abdul-malik-9a448b293/"
                    target="_blank"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon size={22} />
                  </a>
                  <a
                    href="https://github.com/Abdul-Malik-0404"
                    target="_blank"
                    aria-label="GitHub"
                  >
                    <GithubIcon size={22} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </HyprWorkspace>
  );
}
