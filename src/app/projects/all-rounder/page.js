import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import GithubIcon from '../../../components/GithubIcon';

export default function AllRounderProject() {
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
              <span className="project-detail-type">2025 // Social Networking App</span>
              <h1 className="project-detail-title">All-rounder</h1>
              
              <div className="tech-stack">
                <span className="tech-badge">TypeScript</span>
                <span className="tech-badge">React</span>
                <span className="tech-badge">Node.js</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              <p style={{ color: 'var(--text-color)' }}>
                Developed a TypeScript web application tailored for school students in Sri Lanka. Created a platform for sharing extracurricular activities, achievements, and facilitating resource sharing between schools.
              </p>
            </div>

            <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>Media & Demonstrations</h3>
            <div className="project-media-grid">
              {/* Add screenshots, videos, demonstrations here */}
              <div className="media-placeholder">[ UI Concept / Demo Unavailable ]</div>
              <div className="media-placeholder">[ Architecture / Code Snippet ]</div>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="https://github.com/Abdul-Malik-0404/All-rounder" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
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
