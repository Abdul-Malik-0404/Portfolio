'use client';
import { motion } from 'framer-motion';

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
        <motion.div variants={itemVariants} className="timeline-item glass-card hover-glow interactive">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>BSc (Hons) in Computer Science</h3>
            <h4>University of Westminster (UK) / IIT Sri Lanka</h4>
            <span className="date">2024 &ndash; Expected 2028</span>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="timeline-item glass-card hover-glow interactive">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Certificate in Machine Learning</h3>
            <h4>IIT Professional Development Unit (PDU)</h4>
            <span className="date">Jan 2026</span>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="timeline-item glass-card hover-glow interactive">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Foundation Certificate in Higher Education</h3>
            <h4>Informatics Institute of Technology, Sri Lanka</h4>
            <span className="date">2023 &ndash; 2024</span>
          </div>
        </motion.div>
        <motion.div variants={itemVariants} className="timeline-item glass-card hover-glow interactive">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>GCE Ordinary Level</h3>
            <h4>Nasriya Central College, Chilaw, Sri Lanka</h4>
            <span className="date">2023</span>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
