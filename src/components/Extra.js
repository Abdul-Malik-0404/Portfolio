'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const extraData = [
  {
    id: 'cutting-edge',
    title: 'Cutting Edge Exhibition',
    summary: 'Exhibited the "All-rounder" project at IIT Sri Lanka.',
    description: 'Participated in the annual flagship Cutting Edge exhibition organized by the Informatics Institute of Technology (IIT) Sri Lanka. Showcased the "All-rounder" social networking application, demonstrating its features to industry professionals and academics, and received valuable feedback on its technical implementation and real-world applicability.'
  },
  {
    id: 'volunteer',
    title: 'Volunteer',
    summary: 'Assisted in organizing and managing the IIT Iftar event in 2026.',
    description: 'Played a key role in the logistics and event management for the 2026 IIT Iftar. Coordinated with vendors, managed attendee registrations, and ensured smooth operations during the event, fostering a strong sense of community within the university.'
  },
  {
    id: 'ieeextreme',
    title: 'IEEEXtreme',
    summary: 'Participant in the 24-hour global algorithmic coding hackathon.',
    description: 'Competed in IEEEXtreme, an annual 24-hour global hackathon where teams of students solve rigorous algorithmic programming challenges. This experience sharpened my problem-solving skills, ability to work under pressure, and collaborative coding practices.'
  },
  {
    id: 'ieee',
    title: 'IEEE',
    summary: 'Active member of the Institute of Electrical and Electronics Engineers since 2024.',
    description: 'Engaged in various IEEE student branch activities, attending workshops, technical talks, and networking events. Active participation has provided insights into industry trends and helped build a strong professional network with peers and mentors.'
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

export default function Extra() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <section id="extra" className="section">
      <h2 className="section-title">Extracurricular</h2>
      
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {extraData.map((item) => (
          <motion.div 
            layoutId={`extra-card-${item.id}`}
            onClick={() => setSelectedId(item.id)}
            key={item.id} 
            variants={itemVariants} 
            className="glass-card hover-glow interactive"
            style={{ cursor: 'none' }}
          >
            <motion.h3 layoutId={`extra-title-${item.id}`} style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>
              {item.title}
            </motion.h3>
            <motion.p layoutId={`extra-summary-${item.id}`} style={{ color: 'var(--text-muted)' }}>
              {item.summary}
            </motion.p>
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
            {extraData.filter(i => i.id === selectedId).map(item => (
              <motion.div 
                layoutId={`extra-card-${selectedId}`} 
                className="skills-modal-content interactive"
                key="modal"
                onClick={(e) => e.stopPropagation()}
                style={{ padding: '4rem 3rem' }}
              >
                <button className="modal-close-btn interactive" onClick={() => setSelectedId(null)}>
                  <X size={28} />
                </button>
                <motion.h2 
                  layoutId={`extra-title-${item.id}`} 
                  style={{ color: 'var(--accent-cyan)', fontSize: '2.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}
                >
                  {item.title}
                </motion.h2>
                
                <div style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
                  <motion.p layoutId={`extra-summary-${item.id}`} style={{ fontSize: '1.2rem', marginBottom: '1.5rem', color: 'var(--accent-magenta)' }}>
                    {item.summary}
                  </motion.p>
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
