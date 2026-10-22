'use client';

import Link from 'next/link';
import { projects } from '../data/projects';
import { ArrowUpRight, Maximize2 } from 'lucide-react';
import GithubIcon from './GithubIcon';
import ArchitectureDiagram from './ArchitectureDiagram';
import { HyprWorkspace } from './HyprWindow';

const PROJECT_APP_CLASSES = {
  sfugue: 'kubectl',
  jeb: 'langgraph',
  zawj: 'kotlin',
  dotfiles: 'hyprctl',
  'all-rounder': 'nextjs',
  hotkeys: 'bash',
};

const HAS_DIAGRAM = ['sfugue', 'jeb', 'zawj'];

export default function Projects() {
  const windows = projects.map((project) => ({
    id: `proj-${project.id}`,
    title: `~/projects/${project.id}`,
    appClass: PROJECT_APP_CLASSES[project.id] || 'kitty',
    renderTiled: () => (
      <div className="project-tile-body">
        <div className="project-tile-meta">
          <span className="project-tile-year">{project.year}</span>
          <span className="project-tile-type">{project.type}</span>
        </div>

        <h3 className="project-tile-title">
          <span>{project.title}</span>
          <span className="hypr-click-hint">
            <Maximize2 size={11} style={{ marginRight: 4 }} />
            expand
          </span>
        </h3>

        <p className="project-tile-desc">{project.description}</p>

        <div className="project-tile-stack">
          {project.techStack?.slice(0, 4).map((tech) => (
            <span key={tech} className="hypr-mini-tag">
              {tech}
            </span>
          ))}
          {project.techStack?.length > 4 && (
            <span className="hypr-mini-tag more">
              +{project.techStack.length - 4}
            </span>
          )}
        </div>
      </div>
    ),
    renderExpanded: () => (
      <div
        className="hypr-expanded-view"
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            flexWrap: 'wrap',
            gap: '1rem',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '1rem',
          }}
        >
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.6rem',
                marginBottom: '0.4rem',
              }}
            >
              <span className="project-tile-year">{project.year}</span>
              <span className="project-tile-type">{project.type}</span>
            </div>
            <h2
              style={{
                color: 'var(--accent-cyan)',
                fontSize: '2.1rem',
                margin: 0,
              }}
            >
              {project.title}
            </h2>
          </div>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <Link
              href={`/projects/${project.id}`}
              className="action-btn interactive"
              style={{
                textDecoration: 'none',
                padding: '0.6rem 1.15rem',
                fontSize: '0.88rem',
              }}
            >
              <span>Open Dedicated Case Study</span>
              <ArrowUpRight size={16} />
            </Link>
            {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="action-btn-secondary interactive"
                style={{ padding: '0.6rem 1.15rem', fontSize: '0.88rem' }}
              >
                <GithubIcon size={16} /> View Repository
              </a>
            )}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '0.45rem',
            marginBottom: '1.25rem',
          }}
        >
          {project.techStack?.map((tech, idx) => (
            <span key={idx} className="tech-badge" style={{ margin: 0 }}>
              {tech}
            </span>
          ))}
        </div>

        <p
          style={{
            color: 'var(--text-color)',
            lineHeight: 1.75,
            fontSize: '0.98rem',
            marginBottom: '1.5rem',
          }}
        >
          {project.description}
        </p>

        {HAS_DIAGRAM.includes(project.id) && (
          <div style={{ marginTop: '0.5rem' }}>
            <ArchitectureDiagram projectId={project.id} />
          </div>
        )}
      </div>
    ),
  }));

  return (
    <HyprWorkspace
      id="projects"
      wsNumber={4}
      wsName="projects"
      title="Featured Projects"
      windows={windows}
    />
  );
}
