'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '../data/projects';
import { X } from 'lucide-react';
import GithubIcon from './GithubIcon';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section id="projects" className="section">
      <h2 className="section-title">Featured Projects</h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} style={{ height: '100%' }}>
            <motion.div 
              layoutId={`proj-card-${project.id}`}
              onClick={() => setSelectedId(project.id)}
              className="project-card glass-card hover-glow interactive"
              style={{ display: 'block', cursor: 'none', height: '100%' }}
            >
              <motion.div layoutId={`proj-year-${project.id}`} className="project-year">{project.year}</motion.div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <motion.h3 layoutId={`proj-title-${project.id}`} style={{ marginBottom: 0 }}>
                  {project.title} <span style={{ fontSize: '0.8em', opacity: 0.7 }}>({project.type})</span>
                </motion.h3>
              </div>
              <motion.p layoutId={`proj-desc-${project.id}`}>
                {project.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>

      <AnimatePresence>
        {selectedId && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="skills-modal-overlay"
            onClick={() => setSelectedId(null)}
            style={{ zIndex: 3000 }}
          >
            {projects.filter(p => p.id === selectedId).map(project => (
              <motion.div 
                layoutId={`proj-card-${project.id}`} 
                className="skills-modal-content interactive"
                key="modal"
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '4rem 3rem' }}
              >
                <button className="modal-close-btn interactive" onClick={() => setSelectedId(null)}>
                  <X size={28} />
                </button>
                
                <motion.div layoutId={`proj-year-${project.id}`} className="project-year" style={{ marginBottom: '1rem' }}>
                  {project.year}
                </motion.div>
                
                <motion.h2 
                  layoutId={`proj-title-${project.id}`} 
                  style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', marginBottom: '1.5rem' }}
                >
                  {project.title} <span style={{ fontSize: '0.6em', color: 'var(--text-muted)' }}>({project.type})</span>
                </motion.h2>

                <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
                  {project.techStack?.map((tech, idx) => (
                    <span key={idx} className="tech-badge" style={{ margin: 0 }}>{tech}</span>
                  ))}
                </div>
                
                <div style={{ color: 'var(--text-color)', lineHeight: '1.8', marginBottom: '2.5rem' }}>
                  <motion.p layoutId={`proj-desc-${project.id}`} style={{ fontSize: '1.1rem' }}>
                    {project.description}
                  </motion.p>
                </div>

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <Link href={`/projects/${project.id}`} className="action-btn interactive" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    See More Info
                  </Link>
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="action-btn interactive" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', background: 'rgba(255, 255, 255, 0.05)', border: '1px solid var(--glass-border)' }}>
                      <GithubIcon size={20} /> View Repository
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
