import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export default function ZawjProject() {
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
              <span className="project-detail-type">2026 // E2EE App & Autonomous AI Dev Workflow</span>
              <h1 className="project-detail-title">Zawj</h1>

              <div className="tech-stack">
                <span className="tech-badge">Kotlin</span>
                <span className="tech-badge">Jetpack Compose</span>
                <span className="tech-badge">Gradle</span>
                <span className="tech-badge">Firebase</span>
                <span className="tech-badge">FCM</span>
                <span className="tech-badge">GCP</span>
                <span className="tech-badge">React Native</span>
                <span className="tech-badge">WebRTC</span>
                <span className="tech-badge">Gemini CLI</span>
                <span className="tech-badge">GitHub Actions</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              <p style={{ color: 'var(--text-color)' }}>
                A texting app designed for me and my significant other to stay connected. Features include end-to-end encrypted messaging, real-time location sharing, video calling based on WebRTC and a shared scheduling system.<br /><br />
                The app is built using Kotlin, Jetpack Compose for modern UI rendering, and Gradle for builds, with a robust backend powered by Firebase and Google Cloud Platform (GCP). Firebase Cloud Messaging (FCM) is utilized to handle real-time push notifications.<br /><br />
                Engineered a complex Agentic AI Workflow using Gemini CLI with specialized autonomous sub-agents to manage CI/CD pipelines, auto-detect/fix build errors, and handle package management.<br /><br />
                Streamlined the update process by integrating a custom update button within the Android app that automatically retrieves and installs the latest release from the artifacts produced by the GitHub Actions CI/CD pipeline.<br /><br />
                Established a remote, headless monitoring environment using SSH (Mosh) and Tmux to oversee the autonomous AI developer agents in real-time from a mobile device.
              </p>
            </div>

            {/* <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>Media & Demonstrations</h3>
            <div className="project-media-grid"> */}
            {/* Add screenshots, videos, demonstrations here */}
            {/* <div className="media-placeholder">[ UI Concept / Demo Unavailable ]</div>
              <div className="media-placeholder">[ Architecture / Code Snippet ]</div>
            </div> */}

            {/* Remove or add the Github link here if needed */}
            {/*
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="#" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
                View Repository
              </a>
            </div>
            */}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
