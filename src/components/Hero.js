'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Mail,
  Zap,
  CheckCircle2,
  AlertTriangle,
  Maximize2,
  ArrowUpRight,
} from 'lucide-react';
import LinkedinIcon from './LinkedinIcon';
import GithubIcon from './GithubIcon';
import { HyprWorkspace } from './HyprWindow';

export default function Hero() {
  const [chaosState, setChaosState] = useState('healthy'); // 'healthy' | 'evacuating' | 'recovered'
  const [metrics, setMetrics] = useState({
    rtpRate: 14.2,
    rttMs: 11.4,
    activeNode: 'sfu-pod-01',
    standbyNode: 'sfu-pod-02',
    evacTimeMs: 37,
  });

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

  const triggerChaosFailover = (e) => {
    e.stopPropagation();
    if (chaosState === 'evacuating') return;
    setChaosState('evacuating');
    setTimeout(() => {
      setChaosState('recovered');
      setMetrics((prev) => ({
        ...prev,
        activeNode: prev.activeNode === 'sfu-pod-01' ? 'sfu-pod-02' : 'sfu-pod-01',
        standbyNode: prev.activeNode === 'sfu-pod-01' ? 'sfu-pod-01' : 'sfu-pod-02',
        evacTimeMs: Math.floor(34 + Math.random() * 9),
      }));
    }, 900);
  };

  const windows = [
    {
      id: 'hero-main',
      title: '~/abdul-malik.md',
      appClass: 'nvim',
      renderTiled: ({ expand }) => (
        <div className="hero-tiled-inner">
          <div className="hero-bio-header">
            <div className="hero-status-chip">
              <span className="dot-pulse" />
              <span>SYSTEMS &amp; AI ENGINEER // ARCH LINUX</span>
            </div>

            <h1 className="hero-title">Abdul Malik</h1>
            <h2 className="subtitle">
              Aspiring Software Engineer &amp; AI Developer
            </h2>
            <p className="summary">
              Computer Science undergraduate building resilient distributed
              systems, autonomous multi-agent AI workflows, and real-time
              cloud-native infrastructure.
            </p>
          </div>

          <div className="hero-bottom-bar" onClick={(e) => e.stopPropagation()}>
            <div className="social-links">
              <a
                href="mailto:abdulmaliksadath@gmail.com"
                target="_blank"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
              <a
                href="https://www.linkedin.com/in/abdul-malik-9a448b293"
                target="_blank"
                aria-label="LinkedIn"
              >
                <LinkedinIcon size={20} />
              </a>
              <a
                href="https://github.com/Abdul-Malik-0404"
                target="_blank"
                aria-label="GitHub"
              >
                <GithubIcon size={20} />
              </a>
            </div>

            <button type="button" className="hypr-inspect-btn" onClick={expand}>
              <Maximize2 size={13} />
              <span>Expand Bio [F]</span>
            </button>
          </div>
        </div>
      ),
      renderExpanded: () => (
        <div className="hypr-expanded-view">
          <div className="hero-status-chip">
            <span className="dot-pulse" />
            <span>BUFFER: ~/abdul-malik.md (READONLY // FULLSCREEN)</span>
          </div>

          <h1
            className="hero-title"
            style={{ fontSize: '2.8rem', marginBottom: '0.35rem' }}
          >
            Abdul Malik
          </h1>
          <h2
            className="subtitle"
            style={{
              fontSize: '1.15rem',
              marginBottom: '1.25rem',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: '1rem',
            }}
          >
            Aspiring Software Engineer &amp; AI Developer
          </h2>

          <div className="expanded-two-col">
            <div>
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
                // Overview
              </h3>
              <p
                style={{
                  color: 'var(--text-color)',
                  lineHeight: 1.75,
                  marginBottom: '1.25rem',
                }}
              >
                An aspiring Computer Science student with a passion for AI,
                Distributed Systems, and Machine Learning. Dedicated to
                developing practical software solutions and currently building a
                strong foundation in cloud-native engineering and full-stack
                development.
              </p>

              <h3
                style={{
                  color: 'var(--accent-magenta)',
                  marginBottom: '0.6rem',
                }}
              >
                // Let&apos;s Connect
              </h3>
              <p
                style={{
                  color: 'var(--text-muted)',
                  lineHeight: 1.7,
                  marginBottom: '1.25rem',
                }}
              >
                I&apos;m always open to collaborating on distributed systems,
                AI/ML research, or full-stack applications. Feel free to reach
                out about Python, TypeScript, WebRTC, Android development, or
                Arch Linux!
              </p>

              <div
                className="social-links"
                onClick={(e) => e.stopPropagation()}
              >
                <a
                  href="mailto:abdulmaliksadath@gmail.com"
                  target="_blank"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/abdul-malik-9a448b293/"
                  target="_blank"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon size={20} />
                </a>
                <a
                  href="https://github.com/Abdul-Malik-0404"
                  target="_blank"
                  aria-label="GitHub"
                >
                  <GithubIcon size={20} />
                </a>
              </div>
            </div>

            <div>
              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.6rem' }}>
                // Currently Exploring
              </h3>
              <ul
                style={{
                  paddingLeft: '1.25rem',
                  color: 'var(--text-color)',
                  lineHeight: 1.8,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.65rem',
                }}
              >
                <li>
                  Working on my Final Year Project <strong>sfugue</strong> –
                  proactive stateful session evacuation and SFrame E2EE failover
                  benchmarking for distributed WebRTC SFUs on Kubernetes.
                </li>
                <li>
                  My daily driver is <strong>Arch Linux (Hyprland)</strong> – I
                  love diving deep into system internals and custom tiling
                  workflows!
                </li>
                <li>
                  Expanding my knowledge in{' '}
                  <strong>
                    Kubernetes, Chaos Mesh, Kafka, Docker, and Machine Learning
                  </strong>
                  .
                </li>
                <li>
                  Building native Android applications using{' '}
                  <strong>Kotlin</strong> and <strong>Jetpack Compose</strong>,
                  including <strong>Zawj</strong> (an E2EE messaging and WebRTC
                  app).
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hero-fastfetch',
      title: 'fastfetch --config hypr.jsonc',
      appClass: 'kitty',
      renderTiled: () => (
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
      ),
      renderExpanded: () => (
        <div className="hypr-expanded-view">
          <div className="fastfetch-grid" style={{ marginBottom: '1.75rem' }}>
            <pre
              className="fastfetch-ascii"
              style={{ fontSize: '0.9rem' }}
              aria-hidden="true"
            >{`        /\\
       /  \\
      / /\\ \\
     / /  \\ \\
    / /    \\ \\
   / / /||\\ \\ \\
  /_/  \\||/  \\_\\`}</pre>
            <div className="fastfetch-info" style={{ fontSize: '0.92rem' }}>
              <div className="ff-header" style={{ fontSize: '1.15rem' }}>
                <span className="icon-cyan">malik</span>@
                <span className="icon-magenta">archlinux-workstation</span>
              </div>
              <div className="ff-divider">------------------------------------</div>
              <div>
                <span className="ff-key">OS:</span> Arch Linux x86_64 (Rolling)
              </div>
              <div>
                <span className="ff-key">Kernel:</span> 6.12.arch1-1-zen
              </div>
              <div>
                <span className="ff-key">Compositor:</span> Hyprland (Wayland //
                dwindle layout)
              </div>
              <div>
                <span className="ff-key">Bar / Launcher:</span> Waybar + Rofi
                Wayland
              </div>
              <div>
                <span className="ff-key">Terminal / Editor:</span> Kitty +
                Neovim (Lua)
              </div>
              <div>
                <span className="ff-key">Container Runtime:</span> Docker +
                Kubernetes (KinD)
              </div>
              <div className="ff-swatches" style={{ marginTop: '0.75rem' }}>
                <span style={{ background: '#00ffee', width: 28, height: 10 }} />
                <span style={{ background: '#ff00aa', width: 28, height: 10 }} />
                <span style={{ background: '#5af78e', width: 28, height: 10 }} />
                <span style={{ background: '#ffee00', width: 28, height: 10 }} />
                <span style={{ background: '#bd93f9', width: 28, height: 10 }} />
              </div>
            </div>
          </div>

          <div className="expanded-two-col">
            <div className="pacman-pkg-card">
              <div className="pacman-pkg-top">
                <span className="pacman-pkg-name">~/.config/hypr/hyprland.conf</span>
                <span className="pacman-pkg-repo">dwindle</span>
              </div>
              <pre
                style={{
                  margin: 0,
                  fontSize: '0.78rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >{`dwindle {
  pseudotile = true
  preserve_split = true
}
input {
  follow_mouse = 1
}
bezier = myBezier, 0.05, 0.9, 0.1, 1.05`}</pre>
            </div>

            <div className="pacman-pkg-card">
              <div className="pacman-pkg-top">
                <span className="pacman-pkg-name">Portfolio Compositor</span>
                <span className="pacman-pkg-repo">interactive</span>
              </div>
              <p
                style={{
                  margin: 0,
                  fontSize: '0.85rem',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                }}
              >
                This portfolio runs a custom client-side Hyprland tiling engine.
                Float any window with <b>[V]</b>, drag it to a new quadrant, and
                click <b>Tile Here</b> to dynamically swap its position in the
                dwindle tree.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: 'hero-telemetry',
      title: 'sfugue // k8s-sfu-telemetry',
      appClass: 'btop',
      renderTiled: () => (
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

          <div className="sim-footer-row" onClick={(e) => e.stopPropagation()}>
            <span className="sim-caption">
              FYP: Proactive WebRTC SFU Evacuation
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
      ),
      renderExpanded: () => (
        <div className="hypr-expanded-view">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '1.5rem',
              borderBottom: '1px solid var(--glass-border)',
              paddingBottom: '1rem',
            }}
          >
            <div>
              <span className="project-tile-type">
                FINAL YEAR PROJECT // DISTRIBUTED WEBRTC &amp; CHAOS ENGINEERING
              </span>
              <h2
                style={{
                  color: 'var(--accent-cyan)',
                  fontSize: '2rem',
                  margin: '0.25rem 0 0',
                }}
              >
                sfugue — Live Cluster Failover Telemetry
              </h2>
            </div>

            <div
              style={{ display: 'flex', gap: '0.75rem' }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="sim-chaos-btn"
                style={{ padding: '0.55rem 1rem', fontSize: '0.82rem' }}
                onClick={triggerChaosFailover}
              >
                <Zap size={14} />
                <span>
                  {chaosState === 'evacuating'
                    ? 'Evacuating State via Redis...'
                    : 'Inject Chaos Mesh Pod Fault'}
                </span>
              </button>
              <Link
                href="/projects/sfugue"
                className="hypr-inspect-btn"
                style={{ textDecoration: 'none' }}
              >
                <span>Open Full Case Study</span>
                <ArrowUpRight size={14} />
              </Link>
            </div>
          </div>

          <div className="expanded-two-col">
            <div className="pacman-pkg-card">
              <div className="pacman-pkg-top">
                <span className="pacman-pkg-name">
                  Active Primary: {metrics.activeNode}
                </span>
                <span className={`sim-state-pill ${chaosState}`}>
                  {chaosState.toUpperCase()}
                </span>
              </div>
              <p
                style={{
                  color: 'var(--text-muted)',
                  fontSize: '0.88rem',
                  lineHeight: 1.65,
                  margin: 0,
                }}
              >
                Mediasoup C++ worker handling WebRTC DTLS/SRTP transport and
                Insertable Streams (SFrame E2EE) media routing. Standby node (
                <code>{metrics.standbyNode}</code>) subscribes to Redis state
                snapshots for sub-50ms session evacuation upon SIGTERM or Chaos
                Mesh pod failure.
              </p>
              <div className="sim-metrics-grid" style={{ marginTop: '0.5rem' }}>
                <div className="sim-metric-box">
                  <span className="sim-metric-label">RTP PACKET RATE</span>
                  <span className="sim-metric-val">{metrics.rtpRate}k pkt/s</span>
                </div>
                <div className="sim-metric-box">
                  <span className="sim-metric-label">E2EE FRAME LATENCY</span>
                  <span className="sim-metric-val">{metrics.rttMs} ms</span>
                </div>
              </div>
            </div>

            <div className="pacman-pkg-card">
              <div className="pacman-pkg-top">
                <span className="pacman-pkg-name">Failover Benchmark Log</span>
                <span className="pacman-pkg-repo">prometheus</span>
              </div>
              <pre
                style={{
                  margin: 0,
                  fontSize: '0.78rem',
                  color: 'var(--text-color)',
                  lineHeight: 1.65,
                  whiteSpace: 'pre-wrap',
                }}
              >{`[k8s-kind] Watching mediasoup-sfu pods...
[redis-pub] Transport state serialized (DTLS/ICE + SFrame ratchet)
[chaos-mesh] Signal injected -> ${metrics.standbyNode} -> ${metrics.activeNode}
[failover] Stream resumed on ${metrics.activeNode} in ${metrics.evacTimeMs}ms (0 E2EE key drops)`}</pre>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <HyprWorkspace
      id="home"
      wsNumber={1}
      wsName="about"
      title="Desktop // Overview"
      defaultSplit={56}
      windows={windows}
    />
  );
}
