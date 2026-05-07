import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import GithubIcon from '../../../components/GithubIcon';
import { projects } from '../../../data/projects';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';

export function generateStaticParams() {
  return projects.map((project) => ({
    id: project.id,
  }));
}

export default function Project({ params }) {
  const project = projects.find((p) => p.id === params.id);

  if (!project) {
    notFound();
  }

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
              <span className="project-detail-type">{project.year} // {project.type}</span>
              <h1 className="project-detail-title">{project.title}</h1>
              
              <div className="tech-stack">
                {project.techStack.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              <p style={{ color: 'var(--text-color)' }}>{project.about}</p>
            </div>

            <div className="project-media-grid">
              {project.media && project.media.length > 0 ? (
                project.media.map((img, i) => (
                  <img key={i} src={img} alt={`Screenshot ${i + 1}`} style={{ width: '100%', borderRadius: '4px', border: '1px solid var(--border-color)' }} />
                ))
              ) : (
                <>
                  <div className="media-placeholder">[ UI Concept / Demo Unavailable ]</div>
                  <div className="media-placeholder">[ Architecture / Code Snippet ]</div>
                </>
              )}
            </div>

            {project.githubLink && (
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <a 
                  href={project.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="action-btn"
                  style={{ textDecoration: 'none' }}
                >
                  <GithubIcon size={20} /> View Repository
                </a>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
