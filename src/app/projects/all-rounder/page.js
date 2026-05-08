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
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">Node.js</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              <p style={{ color: 'var(--text-color)' }}>
                Welcome to the official repository for All-Rounder. This project is a web-based platform dedicated to empowering Sri Lankan students by providing a central, verified, and accessible space to showcase their extracurricular achievements. Our mission is to bridge the urban-rural opportunity gap and ensure every student&apos;s talent is visible.
                <br /><br />
                In the current Sri Lankan education system, a student&apos;s potential is often judged solely on academic performance. This creates a &quot;hidden talent problem&quot; where valuable student skills are invisible to employers, and the rural-urban divide hides talent due to a lack of digital access. All-Rounder provides a secure ecosystem that connects students, teachers, schools, and organizations.
                <br /><br />
                <strong style={{ color: '#fff' }}>Key Features:</strong><br />
                • <strong>Verified Profiles:</strong> Secure, multi-role profiles for Students, Teachers, Schools, and Third-Party Clubs.<br />
                • <strong>Digital Portfolios & Leaderboards:</strong> A space for students to showcase verified achievements with gamification.<br />
                • <strong>Event Hub:</strong> A central hub to host, manage, and promote events to a national audience.<br />
                • <strong>Donation Requests:</strong> A transparent way for under-resourced schools to request specific items.<br />
                • <strong>AI-Powered Tools:</strong> An integrated AI model to help users generate event descriptions in Sinhala, lowering the barrier for non-technical users.
              </p>
            </div>

            <h3 style={{ color: '#fff', marginBottom: '1rem', marginTop: '2rem', fontSize: '1.4rem' }}>Awards & Highlights</h3>
            <div className="project-media-grid">
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <img src="/projects/all-rounder/MoE%20Discussion%20(1).jpg" alt="MoE Discussion" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>Proposing the app to the Ministry of Education</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <video src="/projects/all-rounder/Dev{thon}%20video.mov" controls style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', background: 'rgba(0,0,0,0.5)' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>Competition Finals Presentation</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <img src="/projects/all-rounder/devthon%20semi%20finals.jpeg" alt="Devthon Semi Finals" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textAlign: 'center' }}>Competition Results & Awards</span>
              </div>
            </div>

            <h3 style={{ color: '#fff', marginBottom: '1rem', marginTop: '2.5rem', fontSize: '1.4rem' }}>UI Showcase</h3>
            <div className="project-media-grid">
              <img src="/projects/all-rounder/Test%20Screenshots/Frontend_Components/Home%20Page.png" alt="Home Page" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--glass-border)' }} />
              <img src="/projects/all-rounder/Test%20Screenshots/Frontend_Components/Dashboard%20for%20School.png" alt="School Dashboard" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--glass-border)' }} />
              <img src="/projects/all-rounder/Test%20Screenshots/Frontend_Components/Events.png" alt="Events" style={{ width: '100%', borderRadius: '8px', objectFit: 'cover', border: '1px solid var(--glass-border)' }} />
            </div>

            <h3 style={{ color: '#fff', marginBottom: '1rem', marginTop: '2.5rem', fontSize: '1.4rem' }}>Testing & Quality Assurance</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Comprehensive unit testing guarantees the stability of our core backend controllers and integrations.</p>
            <div className="project-media-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <img src="/projects/all-rounder/Test%20Screenshots/Unit%20Testing/UserController.png" alt="User Controller Test" style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--glass-border)' }} />
              <img src="/projects/all-rounder/Test%20Screenshots/Unit%20Testing/SchoolController.png" alt="School Controller Test" style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--glass-border)' }} />
              <img src="/projects/all-rounder/Test%20Screenshots/Unit%20Testing/EventMappingController.png" alt="Event Mapping Test" style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--glass-border)' }} />
              <img src="/projects/all-rounder/Test%20Screenshots/Unit%20Testing/OrganizationController.png" alt="Organization Controller Test" style={{ width: '100%', borderRadius: '8px', objectFit: 'contain', border: '1px solid var(--glass-border)' }} />
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="https://github.com/Dulaksha-Keshan/all-rounder" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
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
