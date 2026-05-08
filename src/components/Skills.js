'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const skillsData = [
  { 
    id: 'languages', 
    title: 'Languages', 
    items: ['Python', 'Java', 'JavaScript', 'TypeScript', 'C++', 'HTML', 'CSS', 'Shell', 'Kotlin'] 
  },
  { 
    id: 'data-science', 
    title: 'Data Science', 
    items: ['Pandas', 'NumPy', 'Scikit-Learn', 'Matplotlib'] 
  },
  { 
    id: 'tools', 
    title: 'Tools', 
    items: ['Linux (Arch)', 'Git', 'Docker', 'Android Studio', 'VS Code', 'Neovim', 'IntelliJ IDEA', 'Netbeans'] 
  },
  { 
    id: 'soft-skills', 
    title: 'Soft Skills', 
    items: ['Communication', 'Teamwork', 'Leadership', 'Problem Solving', 'Adaptability', 'Critical Thinking'] 
  },
  { 
    id: 'cloud-backend', 
    title: 'Cloud & Backend', 
    items: ['Node.js', 'Express.js', 'Kafka', 'PostgreSQL', 'Firebase', 'Google Cloud Platform (GCP)'] 
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Skills() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section id="skills" className="section">
      <h2 className="section-title">Technical Expertise</h2>
      
      <motion.div 
        className="skills-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skillsData.map((skill) => (
          <motion.div 
            layoutId={`card-${skill.id}`}
            onClick={() => setSelectedId(skill.id)}
            key={skill.id} 
            variants={itemVariants} 
            className="skill-category glass-card hover-glow interactive"
            style={{ cursor: 'none' }}
          >
            <motion.h3 layoutId={`title-${skill.id}`}>{skill.title}</motion.h3>
            <p>{skill.items.join(' · ')}</p>
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
          >
            {skillsData.filter(s => s.id === selectedId).map(skill => (
              <motion.div 
                layoutId={`card-${selectedId}`} 
                className="skills-modal-content interactive"
                key="modal"
                onClick={(e) => e.stopPropagation()}
              >
                <button className="modal-close-btn interactive" onClick={() => setSelectedId(null)}>
                  <X size={28} />
                </button>
                <motion.h2 
                  layoutId={`title-${skill.id}`} 
                  style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}
                >
                  {skill.title}
                </motion.h2>
                
                <motion.div 
                  className="skills-items-grid"
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  variants={{
                    hidden: { opacity: 0 },
                    visible: {
                      opacity: 1,
                      transition: { staggerChildren: 0.05, delayChildren: 0.1 }
                    }
                  }}
                >
                  {skill.items.map((item, i) => (
                    <motion.div 
                      key={i}
                      className="skill-badge-card"
                      variants={{
                        hidden: { opacity: 0, scale: 0.8 },
                        visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 200, damping: 10 } }
                      }}
                    >
                      {item}
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
