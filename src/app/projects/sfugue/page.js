import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import GithubIcon from '../../../components/GithubIcon';
import ArchitectureDiagram from '../../../components/ArchitectureDiagram';

export default function SfugueProject() {
  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      <Navbar />

      <main style={{ paddingTop: '120px', minHeight: '100vh' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <Link href="/#projects" className="back-btn">
            <ArrowLeft size={18} /> Back to Portfolio
          </Link>

          <div className="glass-card hypr-border" style={{ padding: '3rem 2rem' }}>
            <div className="project-detail-header">
              <span className="project-detail-type">2026 // Final Year Project — Distributed WebRTC & Chaos Engineering</span>
              <h1 className="project-detail-title">sfugue</h1>

              <div className="tech-stack">
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">Node.js</span>
                <span className="tech-badge">Mediasoup (C++)</span>
                <span className="tech-badge">WebRTC / SFrame E2EE</span>
                <span className="tech-badge">Kubernetes (KinD)</span>
                <span className="tech-badge">Apache Kafka</span>
                <span className="tech-badge">Prometheus</span>
                <span className="tech-badge">Chaos Mesh</span>
                <span className="tech-badge">Docker</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>Overview</h3>
              <p style={{ color: 'var(--text-color)', marginBottom: '1.5rem' }}>
                <strong>Proactive Stateful Session Evacuation &amp; E2EE Failover Benchmarking for Distributed WebRTC SFUs.</strong>
                <br /><br />
                <code>sfugue</code> is my Final Year Project—an empirical chaos-engineering testbed and distributed control plane designed to measure and minimize End-to-End Encryption (SFrame / W3C Insertable Streams) cryptographic blackout latency during Selective Forwarding Unit (SFU) node failures.
              </p>

              <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '1rem', fontSize: '1.3rem' }}>The Core Research Problem</h3>
              <p style={{ color: 'var(--text-color)', marginBottom: '1.5rem' }}>
                Unlike stateless HTTP pods, an active WebRTC video session maintains three tightly coupled tiers of state that cannot be trivially load-balanced:
              </p>
              • <strong>Transport State (OS &amp; Network Layer):</strong> Persistent UDP sockets, NAT hole-punch bindings, and negotiated ICE candidate pairs.<br />
              • <strong>Media Pipeline State (Application Layer):</strong> Temporal codec compression (VP8/VP9/H.264/AV1 P-frames). Switching SFU nodes without codec state causes video freezes until an Intra-coded (IDR) keyframe is negotiated via RTCP PLI/FIR.<br />
              • <strong>Cryptographic Ratchet State (Security Layer):</strong> Under zero-trust application-layer E2EE (SFrame), each client maintains an evolving cryptographic ratchet that must be resynchronized across node migrations.<br />
              <br />

              <h3 style={{ color: 'var(--accent-magenta)', marginBottom: '1rem', fontSize: '1.3rem' }}>Key Innovations &amp; Architecture</h3>
              • <strong>Algorithmic &quot;Death Signature&quot; Detection:</strong> Monitors sub-minute Prometheus telemetry (<code>/metrics</code>) from C++ Mediasoup workers to detect cascading degradation—specifically Network Jitter (&gt;40ms) &rarr; Kernel UDP Buffer Drops &rarr; Exponential PLI/FIR Keyframe Storms &rarr; CPU Saturation—before the container crashes.<br />
              • <strong>Proactive Stateful Evacuation:</strong> Uses an Apache Kafka control plane to preemptively migrate active WebRTC transports and coordinate SFrame ratchet resynchronization before node termination.<br />
              • <strong>Empirical Chaos Engineering:</strong> Automated fault-injection benchmarking on Kubernetes (KinD) using Chaos Mesh to simulate organic flash crowds vs. UDP DDoS and node failures.
            </div>

            <ArchitectureDiagram projectId="sfugue" />

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="https://github.com/Abdul-Malik-0404/sfugue" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
                <GithubIcon size={20} /> View Repository
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
