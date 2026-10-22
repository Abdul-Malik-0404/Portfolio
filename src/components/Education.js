'use client';

import { Maximize2 } from 'lucide-react';
import { HyprWorkspace } from './HyprWindow';

const educationData = [
  {
    id: 'edu-bsc',
    appClass: 'zathura',
    winTitle: '~/degrees/bsc-cs-hons.pdf',
    title: 'BSc (Hons) in Computer Science',
    institution: 'University of Westminster (UK) / IIT Sri Lanka',
    date: '2024 - Expected 2028',
    highlights: [
      'Specializing in Distributed Systems, Cloud-Native Engineering, and Artificial Intelligence.',
      'Final Year Project (sfugue): Proactive Stateful Session Evacuation & E2EE Failover Benchmarking for Distributed WebRTC SFUs on Kubernetes.',
      'Core modules: Algorithms & Data Structures, Object-Oriented Programming, Software Development Group Project, Machine Learning, Concurrent Systems.',
    ],
    description:
      'Currently pursuing a Bachelor of Science with Honours in Computer Science. Coursework focuses on advanced software engineering, distributed systems, data structures, algorithms, and artificial intelligence.',
  },
  {
    id: 'edu-ml-cert',
    appClass: 'jupyter',
    winTitle: '~/certs/machine-learning-pdu.ipynb',
    title: 'Certificate in Machine Learning',
    institution: 'IIT Professional Development Unit (PDU)',
    date: 'Jan 2026',
    highlights: [
      'Supervised & Unsupervised Learning pipelines with Scikit-Learn, Pandas, and NumPy.',
      'Feature engineering, model evaluation, hyperparameter tuning, and visualization with Matplotlib.',
      'Applied ML model integration into Python backend microservices.',
    ],
    description:
      'Completed a specialized certificate program in Machine Learning. Gained hands-on experience in building, training, and deploying models using industry-standard libraries and frameworks.',
  },
  {
    id: 'edu-foundation',
    appClass: 'nvim',
    winTitle: '~/certs/foundation-he.md',
    title: 'Foundation Certificate in Higher Education',
    institution: 'Informatics Institute of Technology, Sri Lanka',
    date: '2023 - 2024',
    highlights: [
      'Established core competencies in programming fundamentals, discrete mathematics, and academic research.',
      'Transitioned directly into the BSc (Hons) Computer Science degree track.',
    ],
    description:
      'A comprehensive foundation program that established core competencies in computing, mathematics, and academic research.',
  },
  {
    id: 'edu-olevel',
    appClass: 'kitty',
    winTitle: '~/records/gce-olevel.log',
    title: 'GCE Ordinary Level',
    institution: 'Nasriya Central College, Chilaw, Sri Lanka',
    date: '2023',
    highlights: [
      'Strong academic foundation in Mathematics, Science, Information & Communication Technology, and English.',
    ],
    description:
      'Completed general secondary education with strong foundations in mathematics, science, and English.',
  },
];

export default function Education() {
  const windows = educationData.map((item) => ({
    id: item.id,
    title: item.winTitle,
    appClass: item.appClass,
    renderTiled: () => (
      <div className="edu-tile-body">
        <div className="edu-tile-top">
          <span className="date">{item.date}</span>
          <span className="hypr-click-hint">
            <Maximize2 size={11} style={{ marginRight: 4 }} />
            expand [F]
          </span>
        </div>
        <h3>{item.title}</h3>
        <h4>{item.institution}</h4>
        <p className="edu-tile-preview">{item.description}</p>
      </div>
    ),
    renderExpanded: () => (
      <div className="hypr-expanded-view">
        <div className="edu-tile-top" style={{ marginBottom: '0.75rem' }}>
          <span className="date">{item.date}</span>
          <span className="pacman-pkg-repo">{item.appClass} // fullscreen</span>
        </div>
        <h2
          style={{
            color: 'var(--accent-cyan)',
            fontSize: '2.1rem',
            marginBottom: '0.4rem',
          }}
        >
          {item.title}
        </h2>
        <h4
          style={{
            fontSize: '1.15rem',
            color: '#fff',
            marginBottom: '1.25rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '1rem',
          }}
        >
          {item.institution}
        </h4>
        <p
          style={{
            color: 'var(--text-color)',
            lineHeight: 1.8,
            fontSize: '1rem',
            marginBottom: '1.5rem',
          }}
        >
          {item.description}
        </p>

        <h3
          style={{
            color: 'var(--accent-magenta)',
            fontSize: '1rem',
            marginBottom: '0.75rem',
          }}
        >
          // Key Highlights &amp; Focus Areas
        </h3>
        <ul
          style={{
            paddingLeft: '1.25rem',
            color: 'var(--text-muted)',
            lineHeight: 1.8,
            display: 'flex',
            flexDirection: 'column',
            gap: '0.5rem',
          }}
        >
          {item.highlights.map((h, i) => (
            <li key={i}>{h}</li>
          ))}
        </ul>
      </div>
    ),
  }));

  return (
    <HyprWorkspace
      id="education"
      wsNumber={2}
      wsName="education"
      title="Education Experience"
      windows={windows}
    />
  );
}
