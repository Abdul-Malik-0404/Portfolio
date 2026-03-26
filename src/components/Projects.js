'use client';
import { motion } from 'framer-motion';
import { Github } from 'lucide-react';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 30 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

export default function Projects() {
  return (
    <section id="projects" className="section">
      <h2 className="section-title">Featured Projects</h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.a 
          href="https://github.com/Abdul-Malik-0404/dotfiles" 
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants} 
          className="project-card glass-card hover-glow interactive"
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'none' }}
        >
          <div className="project-year">2025</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: 0 }}>Dotfiles <span>(Arch Linux Configuration)</span></h3>
            <Github size={22} style={{ color: 'var(--text-color)' }} />
          </div>
          <p>
            Created and maintained personal Arch Linux configurations and scripts. 
            Utilized Shell scripting to optimize the development environment and automate setup tasks.
          </p>
        </motion.a>
        
        <motion.a 
          href="https://github.com/Abdul-Malik-0404/All-rounder" 
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants} 
          className="project-card glass-card hover-glow interactive"
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'none' }}
        >
          <div className="project-year">2025</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: 0 }}>All-rounder <span>(Social Networking App)</span></h3>
            <Github size={22} style={{ color: 'var(--text-color)' }} />
          </div>
          <p>
            Developed a TypeScript web application tailored for school students in Sri Lanka. 
            Created a platform for sharing extracurricular activities, achievements, and 
            facilitating resource sharing between schools.
          </p>
        </motion.a>
        
        <motion.a 
          href="https://github.com/Abdul-Malik-0404/hotkeys" 
          target="_blank"
          rel="noopener noreferrer"
          variants={itemVariants} 
          className="project-card glass-card hover-glow interactive"
          style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'none' }}
        >
          <div className="project-year">2024</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
            <h3 style={{ marginBottom: 0 }}>Hotkeys</h3>
            <Github size={22} style={{ color: 'var(--text-color)' }} />
          </div>
          <p>
            Developed a set of keyboard shortcuts using C++ to emulate function keys on compact keyboards.
          </p>
        </motion.a>
      </motion.div>
    </section>
  );
}
