'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HyprWorkspace, HyprWindow } from './HyprWindow';

const educationData = [
  {
    id: 'edu-bsc',
    appClass: 'zathura',
    winTitle: '~/degrees/bsc-cs-hons.pdf',
    title: 'BSc (Hons) in Computer Science',
    institution: 'University of Westminster (UK) / IIT Sri Lanka',
    date: '2024 - Expected 2028',
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
    description:
      'Completed general secondary education with strong foundations in mathematics, science, and English.',
  },
];

export default function Education() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <HyprWorkspace
      id="education"
      wsNumber={2}
      wsName="education"
      title="Education Experience"
      layoutType="dwindle (2x2)"
      windowIds={educationData.map((d) => d.id)}
    >
      <div className="hypr-tile-grid cols-2">
        {educationData.map((item, idx) => (
          <HyprWindow
            key={item.id}
            id={item.id}
            title={item.winTitle}
            appClass={item.appClass}
            workspace={2}
            dwindleIndex={idx}
            className="interactive"
            onClick={() => setSelectedId(item.id)}
          >
            <div className="edu-tile-body">
              <div className="edu-tile-top">
                <span className="date">{item.date}</span>
                <span className="hypr-click-hint">click to inspect ↗</span>
              </div>
              <h3>{item.title}</h3>
              <h4>{item.institution}</h4>
              <p className="edu-tile-preview">{item.description}</p>
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
            {educationData
              .filter((i) => i.id === selectedId)
              .map((item) => (
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
                  <h2
                    style={{
                      color: 'var(--accent-cyan)',
                      fontSize: '2rem',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.title}
                  </h2>
                  <h4
                    style={{
                      fontSize: '1.2rem',
                      color: 'var(--text-color)',
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.institution}
                  </h4>
                  <span
                    style={{
                      display: 'inline-block',
                      color: 'var(--accent-magenta)',
                      marginBottom: '1.5rem',
                      borderBottom: '1px solid var(--glass-border)',
                      paddingBottom: '1rem',
                      width: '100%',
                    }}
                  >
                    {item.date}
                  </span>

                  <div style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </HyprWorkspace>
  );
}
