'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, ArrowRight, ShieldCheck, Cpu, Database, Server, Smartphone, Terminal, RefreshCw } from 'lucide-react';

const ARCHITECTURES = {
  jeb: {
    title: 'Jeb: Agentic Job Scout & ML Resume Engine',
    description: 'Click any node to inspect data flow, authorization boundaries, and processing stages.',
    nodes: [
      {
        id: 'client',
        label: 'Next.js App Router',
        icon: Smartphone,
        color: 'var(--accent-cyan)',
        details: 'Modern React dashboard with dynamic forms and live status updates. Dispatches requests with secure user session credentials.'
      },
      {
        id: 'auth',
        label: 'OAuth 2.0 Auth Flow',
        icon: ShieldCheck,
        color: '#5af78e',
        details: 'Clean, standard OAuth 2.0 PKCE authentication flow. Generates cryptographically signed JWT access tokens with subject (sub) claims for strict user data isolation.'
      },
      {
        id: 'api',
        label: 'FastAPI Backend',
        icon: Server,
        color: 'var(--accent-magenta)',
        details: 'High-performance Python asynchronous REST API. Validates incoming bearer tokens and delegates heavy I/O to task queues.'
      },
      {
        id: 'queue',
        label: 'Celery & Redis Worker Queue',
        icon: RefreshCw,
        color: 'var(--accent-yellow)',
        details: 'Distributed background job processing queue. Prevents scraping and PDF rendering from blocking the main HTTP request loop.'
      },
      {
        id: 'ml',
        label: 'Custom ML & Scraping (Playwright)',
        icon: Cpu,
        color: 'var(--accent-cyan)',
        details: 'Custom Machine Learning model trained on Hugging Face dataset for ATS keyword matching and skill rewriting. Playwright executes stealthy web job scrapes.'
      },
      {
        id: 'db',
        label: 'PostgreSQL Database',
        icon: Database,
        color: '#5af78e',
        details: 'Relational storage for user profiles, parsed CVs, saved job listings, and tailoring history with strict user UUID foreign key constraints.'
      }
    ]
  },
  zawj: {
    title: 'Zawj: E2EE Mobile Architecture & Autonomous AI Ops',
    description: 'Click any node to view cryptographic security, real-time signaling, and automated CI/CD pipeline.',
    nodes: [
      {
        id: 'app',
        label: 'Kotlin & Jetpack Compose',
        icon: Smartphone,
        color: 'var(--accent-cyan)',
        details: 'Native Android client with declarative Jetpack Compose UI. Handles local cryptographic key generation and biometric storage securely.'
      },
      {
        id: 'crypto',
        label: 'Signal Protocol / E2EE',
        icon: ShieldCheck,
        color: '#5af78e',
        details: 'Zero-knowledge end-to-end encryption. Messages and location telemetry are encrypted on-device before hitting the network.'
      },
      {
        id: 'webrtc',
        label: 'WebRTC Peer Signaling',
        icon: Network,
        color: 'var(--accent-magenta)',
        details: 'Direct peer-to-peer audio/video streaming via ICE/STUN candidates with minimal latency and end-to-end media encryption.'
      },
      {
        id: 'firebase',
        label: 'Firebase & GCP (FCM)',
        icon: Server,
        color: 'var(--accent-yellow)',
        details: 'Manages wake-up notifications via Firebase Cloud Messaging (FCM) and stores encrypted message envelopes in GCP cloud datastores.'
      },
      {
        id: 'cicd',
        label: 'GitHub Actions OTA Pipeline',
        icon: RefreshCw,
        color: 'var(--accent-cyan)',
        details: 'Automated CI/CD build matrix. Compiles signed APK artifacts upon git push and delivers in-app Over-The-Air (OTA) updates.'
      },
      {
        id: 'agent',
        label: 'Autonomous AI Dev (SSH/Tmux)',
        icon: Terminal,
        color: '#5af78e',
        details: 'Autonomous Gemini agent workflows running in headless Tmux sessions monitored via mobile Mosh/SSH for auto-detecting and fixing build errors.'
      }
    ]
  }
};

export default function ArchitectureDiagram({ projectId }) {
  const data = ARCHITECTURES[projectId];
  const [selectedNode, setSelectedNode] = useState(data?.nodes[0]?.id || null);

  if (!data) return null;

  const activeNodeData = data.nodes.find((n) => n.id === selectedNode) || data.nodes[0];

  return (
    <div className="arch-diagram-wrapper">
      <div className="arch-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <Network className="icon-cyan" size={20} />
          <h3 style={{ margin: 0, fontSize: '1.2rem', color: '#fff' }}>Interactive Architecture Explorer</h3>
        </div>
        <span className="arch-hint">Click nodes to inspect data flow</span>
      </div>

      {/* Nodes Pipeline */}
      <div className="arch-pipeline">
        {data.nodes.map((node, index) => {
          const Icon = node.icon;
          const isSelected = selectedNode === node.id;

          return (
            <div key={node.id} className="arch-node-wrapper">
              <motion.button
                type="button"
                className={`arch-node-card ${isSelected ? 'selected' : ''}`}
                style={{ borderColor: isSelected ? node.color : 'var(--border-color)' }}
                onClick={() => setSelectedNode(node.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.96 }}
              >
                <div className="arch-node-icon" style={{ color: node.color }}>
                  <Icon size={20} />
                </div>
                <span className="arch-node-label">{node.label}</span>
              </motion.button>

              {index < data.nodes.length - 1 && (
                <div className="arch-connector">
                  <ArrowRight size={16} className="connector-arrow" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Detail Inspector Card */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeNodeData.id}
          className="arch-inspector"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <div className="inspector-badge" style={{ color: activeNodeData.color, borderColor: activeNodeData.color }}>
            Step {data.nodes.findIndex((n) => n.id === activeNodeData.id) + 1} of {data.nodes.length}
          </div>
          <h4 style={{ color: activeNodeData.color, fontSize: '1.1rem', margin: '0.5rem 0' }}>
            {activeNodeData.label}
          </h4>
          <p style={{ color: 'var(--text-color)', fontSize: '0.95rem', lineHeight: '1.7', margin: 0 }}>
            {activeNodeData.details}
          </p>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
