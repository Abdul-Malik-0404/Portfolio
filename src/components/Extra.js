'use client';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Extra() {
  return (
    <section id="extra" className="section">
      <h2 className="section-title">Extracurricular</h2>
      
      <div className="projects-grid">
        <motion.div 
          className="glass-card hover-glow interactive"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          style={{ cursor: 'default' }}
        >
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>Volunteer</h3>
          <p style={{ color: 'var(--text-muted)' }}>Assisted in organizing and managing the IIT Iftar event in 2026.</p>
        </motion.div>

        <motion.div 
          className="glass-card hover-glow interactive"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.1 }}
          style={{ cursor: 'default' }}
        >
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>IEEEXtreme</h3>
          <p style={{ color: 'var(--text-muted)' }}>Participant in the 24-hour global algorithmic coding hackathon.</p>
        </motion.div>

        <motion.div 
          className="glass-card hover-glow interactive"
          variants={itemVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          style={{ cursor: 'default' }}
        >
          <h3 style={{ marginBottom: '0.5rem', color: 'var(--accent-cyan)' }}>IEEE</h3>
          <p style={{ color: 'var(--text-muted)' }}>Active member of the Institute of Electrical and Electronics Engineers since 2024.</p>
        </motion.div>
      </div>
    </section>
  );
}
