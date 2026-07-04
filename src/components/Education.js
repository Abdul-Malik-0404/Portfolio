'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const educationData = [
  {
    id: 'bsc',
    title: 'BSc (Hons) in Computer Science',
    institution: 'University of Westminster (UK) / IIT Sri Lanka',
    date: '2024 - Expected 2028',
    description: 'Currently pursuing a Bachelor of Science with Honours in Computer Science. Coursework focuses on advanced software engineering, data structures, algorithms, and artificial intelligence.'
  },
  {
    id: 'ml-cert',
    title: 'Certificate in Machine Learning',
    institution: 'IIT Professional Development Unit (PDU)',
    date: 'Jan 2026',
    description: 'Completed a specialized certificate program in Machine Learning. Gained hands-on experience in building, training, and deploying models using industry-standard libraries and frameworks.'
  },
  {
    id: 'foundation',
    title: 'Foundation Certificate in Higher Education',
    institution: 'Informatics Institute of Technology, Sri Lanka',
    date: '2023 - 2024',
    description: 'A comprehensive foundation program that established core competencies in computing, mathematics, and academic research.'
  },
  {
    id: 'olevel',
    title: 'GCE Ordinary Level',
    institution: 'Nasriya Central College, Chilaw, Sri Lanka',
    date: '2023',
    description: 'Completed general secondary education with strong foundations in mathematics, science, and English.'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.1 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: { opacity: 1, x: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Education() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section id="education" className="section">
      <h2 className="section-title">Education Experience</h2>
      <motion.div 
        className="timeline"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {educationData.map((item) => (
          <motion.div 
            key={item.id} 
            layoutId={`edu-card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            variants={itemVariants} 
            className="timeline-item glass-card hover-glow interactive"
            style={{ cursor: 'none' }}
          >
            <div className="timeline-dot"></div>
            <div className="timeline-content">
              <motion.h3 layoutId={`edu-title-${item.id}`}>{item.title}</motion.h3>
              <motion.h4 layoutId={`edu-inst-${item.id}`}>{item.institution}</motion.h4>
              <motion.span layoutId={`edu-date-${item.id}`} className="date">{item.date}</motion.span>
            </div>
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
            {educationData.filter(i => i.id === selectedId).map(item => (
              <motion.div 
                layoutId={`edu-card-${selectedId}`} 
                className="skills-modal-content interactive"
                key="modal"
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '4rem 3rem' }}
              >
                <button className="modal-close-btn interactive" onClick={() => setSelectedId(null)}>
                  <X size={28} />
                </button>
                <motion.h2 
                  layoutId={`edu-title-${item.id}`} 
                  style={{ color: 'var(--accent-cyan)', fontSize: '2.2rem', marginBottom: '0.5rem' }}
                >
                  {item.title}
                </motion.h2>
                <motion.h4 
                  layoutId={`edu-inst-${item.id}`}
                  style={{ fontSize: '1.4rem', color: 'var(--text-color)', marginBottom: '0.5rem' }}
                >
                  {item.institution}
                </motion.h4>
                <motion.span 
                  layoutId={`edu-date-${item.id}`} 
                  style={{ display: 'inline-block', color: 'var(--accent-magenta)', marginBottom: '1.5rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem', width: '100%' }}
                >
                  {item.date}
                </motion.span>
                
                <div style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
                  <p>{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
