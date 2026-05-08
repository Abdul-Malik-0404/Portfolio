import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import GithubIcon from '../../../components/GithubIcon';

export default function DotfilesProject() {
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
              <span className="project-detail-type">2025 // Arch Linux Configuration <span style={{ color: 'red' }}>(Not Maintained)</span></span>
              <h1 className="project-detail-title">Dotfiles</h1>

              <div className="tech-stack">
                {/* <span className="tech-badge" style={{ borderColor: 'var(--accent-magenta)', color: 'var(--accent-magenta)', background: 'rgba(255, 0, 255, 0.1)' }}>Not Maintained</span> */}
                <span className="tech-badge">Arch Linux</span>
                <span className="tech-badge">Bash</span>
                <span className="tech-badge">Shell</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              <p style={{ color: 'var(--text-color)' }}>
                Created and maintained personal Arch Linux configurations and scripts. Utilized Shell scripting to optimize the development environment and automate setup tasks.
              </p>
              <p style={{ color: 'var(--text-color)' }}>
                I personally loved this one but sadly I switched to a different setup made by someone else.
                <br />
                <br />
                <b>Check it out:</b> <a href="https://github.com/end-4/dots-hyprland" target="_blank" rel="noopener noreferrer" className="back-btn">@end-4/dots-hyprland</a>
              </p>
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="https://github.com/Abdul-Malik-0404/dotfiles" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
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
