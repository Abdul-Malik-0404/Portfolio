import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import GithubIcon from '../../../components/GithubIcon';

export default function HotkeysProject() {
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
              <span className="project-detail-type">2024 // System Utility</span>
              <h1 className="project-detail-title">Hotkeys</h1>

              <div className="tech-stack">
                <span className="tech-badge">C++</span>
                <span className="tech-badge">Windows API</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              Developed a set of keyboard shortcuts using C++ to emulate function keys on compact keyboards. This was just a fun project I did for my own convenience. I had a keyboard that didn't have function keys with media controls or anything and I was tired of using the on-screen keyboard.
              <br />
              <br />
              This project demonstrates my ability to work with low-level Windows APIs and create efficient, lightweight applications. It also shows my problem-solving skills and my ability to create practical solutions to everyday problems.
              <br />
              <br />
              It works by holding the Menu key and pressing the function keys F1 - F12 to emulate the media control keys. I mapped specific keys to play/pause media, skip songs, control volume, etc.
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="https://github.com/Abdul-Malik-0404/hotkeys" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
                <GithubIcon size={20} /> View Repository
              </a>
            </div>
          </div>
        </div>
      </main >

      <Footer />
    </>
  );
}
