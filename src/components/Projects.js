'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { projects } from '../data/projects';
import { X, ArrowUpRight } from 'lucide-react';
import GithubIcon from './GithubIcon';
import { HyprWorkspace, HyprWindow } from './HyprWindow';

const PROJECT_APP_CLASSES = {
  sfugue: 'kubectl',
  jeb: 'langgraph',
  zawj: 'kotlin',
  dotfiles: 'hyprctl',
  'all-rounder': 'nextjs',
  hotkeys: 'bash',
};

export default function Projects() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <HyprWorkspace
      id="projects"
      wsNumber={4}
      wsName="projects"
      title="Featured Projects"
      layoutType="dwindle (grid)"
      windowIds={projects.map((p) => `proj-${p.id}`)}
    >
      <div className="hypr-tile-grid cols-3">
        {projects.map((project, idx) => (
          <HyprWindow
            key={project.id}
            id={`proj-${project.id}`}
            title={`~/projects/${project.id}`}
            appClass={PROJECT_APP_CLASSES[project.id] || 'kitty'}
            workspace={4}
            dwindleIndex={idx}
            className={`project-tile-window interactive ${
              project.id === 'sfugue' ? 'featured-span' : ''
            }`}
            onClick={() => setSelectedId(project.id)}
          >
            <div className="project-tile-body">
              <div className="project-tile-meta">
                <span className="project-tile-year">{project.year}</span>
                <span className="project-tile-type">{project.type}</span>
              </div>

              <h3 className="project-tile-title">
                {project.title}
                <ArrowUpRight size={16} className="tile-arrow" />
              </h3>

              <p className="project-tile-desc">{project.description}</p>

              <div className="project-tile-stack">
                {project.techStack?.slice(0, 5).map((tech) => (
                  <span key={tech} className="hypr-mini-tag">
                    {tech}
                  </span>
                ))}
                {project.techStack?.length > 5 && (
                  <span className="hypr-mini-tag more">
                    +{project.techStack.length - 5}
                  </span>
                )}
              </div>
            </div>
          </HyprWindow>
        ))}
      </div>

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
            {projects
              .filter((p) => p.id === selectedId)
              .map((project) => (
                <motion.div
                  key="modal"
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  className="skills-modal-content interactive"
                  onClick={(e) => e.stopPropagation()}
                  style={{ padding: '3rem 2.5rem' }}
                >
                  <button
                    className="modal-close-btn interactive"
                    onClick={() => setSelectedId(null)}
                  >
                    <X size={28} />
                  </button>

                  <div
                    className="project-year"
                    style={{
                      position: 'static',
                      display: 'inline-block',
                      marginBottom: '1rem',
                      borderRadius: '4px',
                    }}
                  >
                    {project.year}
                  </div>

                  <h2
                    style={{
                      color: 'var(--accent-cyan)',
                      fontSize: '2.2rem',
                      marginBottom: '1.2rem',
                    }}
                  >
                    {project.title}{' '}
                    <span
                      style={{
                        fontSize: '0.55em',
                        color: 'var(--text-muted)',
                      }}
                    >
                      ({project.type})
                    </span>
                  </h2>

                  <div
                    className="tech-stack"
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginBottom: '1.75rem',
                      borderBottom: '1px solid var(--glass-border)',
                      paddingBottom: '1.25rem',
                    }}
                  >
                    {project.techStack?.map((tech, idx) => (
                      <span key={idx} className="tech-badge" style={{ margin: 0 }}>
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div
                    style={{
                      color: 'var(--text-color)',
                      lineHeight: '1.75',
                      marginBottom: '2rem',
                    }}
                  >
                    <p style={{ fontSize: '1.02rem' }}>{project.description}</p>
                  </div>

                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <Link
                      href={`/projects/${project.id}`}
                      className="action-btn interactive"
                      style={{
                        textDecoration: 'none',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      See More Info &amp; Architecture
                    </Link>
                    {project.githubLink && (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-btn-secondary interactive"
                      >
                        <GithubIcon size={18} /> View Repository
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </HyprWorkspace>
  );
}
