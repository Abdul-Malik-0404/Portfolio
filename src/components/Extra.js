'use client';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Extra() {
  return (
    <section id="extra" className="section grid-2-col">
      <motion.div 
        className="extra-card glass-card hover-glow interactive"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="section-title-small">Extracurricular</h2>
        <ul className="activity-list" style={{ listStyle: 'none' }}>
          <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-1)' }}>→</span>
            <strong style={{ color: 'var(--text-color)' }}>Volunteer:</strong> Assisted in organizing and managing the IIT Iftar event in 2026.
          </li>
          <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-1)' }}>→</span>
            <strong style={{ color: 'var(--text-color)' }}>IEEEXtreme:</strong> Participant in the 24-hour global algorithmic coding hackathon.
          </li>
          <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-1)' }}>→</span>
            <strong style={{ color: 'var(--text-color)' }}>IEEE:</strong> Active member of the Institute of Electrical and Electronics Engineers since 2024.
          </li>
        </ul>
      </motion.div>

      <motion.div 
        className="extra-card glass-card hover-glow interactive"
        variants={itemVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        transition={{ delay: 0.2 }}
      >
        <h2 className="section-title-small">Languages</h2>
        <div className="lang-bars">
          <div className="lang-item" style={{ marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Tamil (Native/Mother Tongue)</span>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-magenta))' }}></div>
            </div>
          </div>
          <div className="lang-item" style={{ marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Sinhala (Fluent)</span>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '90%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-magenta))' }}></div>
            </div>
          </div>
          <div className="lang-item" style={{ marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>English (Excellent)</span>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '95%', background: 'linear-gradient(90deg, var(--accent-cyan), var(--accent-magenta))' }}></div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
