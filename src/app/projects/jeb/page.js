import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import GithubIcon from '../../../components/GithubIcon';

export default function JebProject() {
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
              <span className="project-detail-type">2026 // AI Job Scout & Resume Tailor</span>
              <h1 className="project-detail-title">Jeb</h1>

              <div className="tech-stack">
                <span className="tech-badge">FastAPI</span>
                <span className="tech-badge">Next.js</span>
                <span className="tech-badge">Gemini API</span>
                <span className="tech-badge">PostgreSQL</span>
                <span className="tech-badge">Playwright</span>
                <span className="tech-badge">Celery</span>
              </div>
            </div>

            <div className="project-content">
              <h3 style={{ color: '#fff', marginBottom: '1rem', fontSize: '1.4rem' }}>About the Project</h3>
              Jeb is a minimalist, agentic web dashboard designed to automate the job search and application process. It specializes in finding roles in specific regions (defaulting to Colombo, Sri Lanka), analyzing job descriptions against a Master CV, and generating tailored, ATS-friendly resumes.
              <br />
              <br />
              <strong style={{ color: '#fff' }}>Key Features:</strong><br />
              • <strong>Automated Scraping:</strong> Stealthy job board scraping using Playwright (Targeting TopJobs.lk and others).<br />
              • <strong>AI Analysis:</strong> Skill extraction and match scoring using Google Gemini 3.1 Pro.<br />
              • <strong>Tailored Resumes:</strong> AI-driven CV rewriting to emphasize matching skills while maintaining 100% factual accuracy.<br />
              • <strong>ATS-Friendly PDF:</strong> High-fidelity PDF generation via WeasyPrint and text extraction via PyMuPDF.<br />
              <br />
              The backend is powered by FastAPI, PostgreSQL, and Celery for distributed task processing, while the frontend is built using Next.js and Shadcn/UI. The entire infrastructure is containerized with Docker for easy deployment and management.
            </div>

            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <a href="https://github.com/Abdul-Malik-0404/Jeb" target="_blank" rel="noopener noreferrer" className="action-btn" style={{ textDecoration: 'none' }}>
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
