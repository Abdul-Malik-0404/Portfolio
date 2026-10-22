'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Package } from 'lucide-react';
import { HyprWorkspace, HyprWindow } from './HyprWindow';

// Map skills to the projects where they are used (Proof of Work)
const SKILL_PROJECTS = {
  Python: ['sfugue', 'Jeb', 'All-rounder'],
  TypeScript: ['sfugue', 'Zawj', 'All-rounder'],
  JavaScript: ['Portfolio', 'All-rounder'],
  Kotlin: ['Zawj'],
  'C++': ['sfugue'],
  Java: ['Academic'],
  'C#': ['Academic'],
  Shell: ['Dotfiles', 'Hotkeys', 'sfugue'],
  HTML: ['Portfolio', 'Jeb'],
  CSS: ['Portfolio', 'Dotfiles'],
  'Linux (Arch)': ['Dotfiles', 'Hotkeys', 'sfugue'],
  Git: ['sfugue', 'Jeb', 'Zawj', 'All-rounder'],
  Docker: ['sfugue', 'Jeb'],
  'Kubernetes (KinD)': ['sfugue'],
  Prometheus: ['sfugue'],
  'Chaos Mesh': ['sfugue'],
  'Android Studio': ['Zawj'],
  Neovim: ['Dotfiles'],
  'VS Code': ['Portfolio', 'All-rounder'],
  'IntelliJ IDEA': ['Zawj'],
  FastAPI: ['Jeb', 'All-rounder'],
  'Next.js': ['Portfolio', 'All-rounder'],
  'Node.js': ['sfugue', 'All-rounder'],
  'Express.js': ['All-rounder'],
  'Apache Kafka': ['Distributed Systems'],
  'WebRTC / Mediasoup': ['sfugue', 'Zawj'],
  PostgreSQL: ['Zawj', 'All-rounder'],
  Firebase: ['All-rounder'],
  'Google Cloud Platform (GCP)': ['Cloud Labs'],
  Pandas: ['sfugue', 'ML Cert'],
  NumPy: ['sfugue', 'ML Cert'],
  'Scikit-Learn': ['ML Cert'],
  Matplotlib: ['sfugue', 'ML Cert'],
};

const PROJECT_FILTERS = ['All', 'sfugue', 'Jeb', 'Zawj', 'All-rounder', 'Dotfiles'];

const skillsData = [
  {
    id: 'skill-languages',
    appClass: 'pacman',
    winTitle: 'pacman -Qs languages',
    title: 'Languages',
    spanWide: false,
    items: [
      'Python',
      'TypeScript',
      'Kotlin',
      'JavaScript',
      'C++',
      'Java',
      'C#',
      'Shell',
      'HTML',
      'CSS',
    ],
  },
  {
    id: 'skill-cloud-backend',
    appClass: 'btop',
    winTitle: 'btop // cloud-backend-rt',
    title: 'Cloud, Backend & Real-Time',
    spanWide: true,
    items: [
      'WebRTC / Mediasoup',
      'FastAPI',
      'Next.js',
      'Node.js',
      'Express.js',
      'Apache Kafka',
      'PostgreSQL',
      'Firebase',
      'Google Cloud Platform (GCP)',
    ],
  },
  {
    id: 'skill-tools',
    appClass: 'kubectl',
    winTitle: 'kubectl get nodes --devops',
    title: 'Tools & DevOps',
    spanWide: true,
    items: [
      'Linux (Arch)',
      'Kubernetes (KinD)',
      'Docker',
      'Chaos Mesh',
      'Prometheus',
      'Git',
      'Neovim',
      'Android Studio',
      'VS Code',
      'IntelliJ IDEA',
    ],
  },
  {
    id: 'skill-data-science',
    appClass: 'jupyter',
    winTitle: 'python3 -m data_science',
    title: 'Data Science & ML',
    spanWide: false,
    items: ['Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'],
  },
  {
    id: 'skill-soft-skills',
    appClass: 'hyprctl',
    winTitle: 'hyprctl clients // core-traits',
    title: 'Engineering & Soft Skills',
    spanWide: false,
    items: [
      'Problem Solving',
      'Critical Thinking',
      'System Architecture',
      'Teamwork',
      'Leadership',
      'Communication',
      'Adaptability',
    ],
  },
];

export default function Skills() {
  const [selectedId, setSelectedId] = useState(null);
  const [activeProjectFilter, setActiveProjectFilter] = useState('All');

  const isSkillHighlighted = (item) => {
    if (activeProjectFilter === 'All') return true;
    const usedIn = SKILL_PROJECTS[item] || [];
    return usedIn.includes(activeProjectFilter);
  };

  const filterBar = (
    <div className="hypr-skill-filter-bar" onClick={(e) => e.stopPropagation()}>
      <span className="filter-label">dep-tree:</span>
      {PROJECT_FILTERS.map((proj) => (
        <button
          key={proj}
          type="button"
          className={`hypr-filter-chip ${
            activeProjectFilter === proj ? 'active' : ''
          }`}
          onClick={() => setActiveProjectFilter(proj)}
        >
          {proj}
        </button>
      ))}
    </div>
  );

  return (
    <HyprWorkspace
      id="skills"
      wsNumber={3}
      wsName="skills"
      title="Technical Expertise"
      layoutType="dwindle (matrix)"
      windowIds={skillsData.map((s) => s.id)}
      headerExtra={filterBar}
    >
      <div className="hypr-skills-bento">
        {skillsData.map((skill, idx) => (
          <HyprWindow
            key={skill.id}
            id={skill.id}
            title={skill.winTitle}
            appClass={skill.appClass}
            workspace={3}
            dwindleIndex={idx}
            className={`skill-tile-window interactive ${
              skill.spanWide ? 'span-wide' : ''
            }`}
            onClick={() => setSelectedId(skill.id)}
          >
            <div className="skill-tile-inner">
              <div className="skill-tile-header">
                <h3>{skill.title}</h3>
                <span className="hypr-click-hint">
                  pacman -Qi ({skill.items.length}) ↗
                </span>
              </div>

              <div className="skill-pill-cloud">
                {skill.items.map((item) => {
                  const highlighted = isSkillHighlighted(item);
                  const deps = SKILL_PROJECTS[item];
                  return (
                    <span
                      key={item}
                      className={`hypr-skill-pill ${
                        highlighted ? 'highlighted' : 'dimmed'
                      } ${
                        activeProjectFilter !== 'All' && highlighted
                          ? 'filter-match'
                          : ''
                      }`}
                    >
                      <span className="pill-dot" />
                      <span>{item}</span>
                      {deps && deps.length > 0 && (
                        <span className="pill-dep-tag">{deps[0]}</span>
                      )}
                    </span>
                  );
                })}
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
          >
            {skillsData
              .filter((s) => s.id === selectedId)
              .map((skill) => (
                <motion.div
                  key="modal"
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  className="skills-modal-content interactive"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    className="modal-close-btn interactive"
                    onClick={() => setSelectedId(null)}
                  >
                    <X size={28} />
                  </button>

                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    <Package size={24} className="icon-cyan" />
                    <h2
                      style={{
                        color: 'var(--accent-cyan)',
                        fontSize: '2rem',
                        margin: 0,
                      }}
                    >
                      {skill.title}
                    </h2>
                  </div>
                  <p
                    style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.85rem',
                      borderBottom: '1px solid var(--glass-border)',
                      paddingBottom: '1rem',
                      marginBottom: '1.5rem',
                    }}
                  >
                    $ {skill.winTitle} — showing installed capabilities &amp;
                    project dependencies
                  </p>

                  <div className="pacman-inspector-grid">
                    {skill.items.map((item) => {
                      const usedIn = SKILL_PROJECTS[item] || ['Core Workflow'];
                      return (
                        <div key={item} className="pacman-pkg-card">
                          <div className="pacman-pkg-top">
                            <span className="pacman-pkg-name">{item}</span>
                            <span className="pacman-pkg-repo">extra/installed</span>
                          </div>
                          <div className="pacman-pkg-deps">
                            <span className="deps-label">Required By:</span>
                            <div className="deps-chips">
                              {usedIn.map((dep) => (
                                <span key={dep} className="deps-chip">
                                  {dep}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </HyprWorkspace>
  );
}
