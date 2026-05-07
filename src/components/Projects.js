'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { projects } from '../data/projects';

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
        {projects.map((project) => (
          <motion.div key={project.id} variants={itemVariants} style={{ height: '100%' }}>
            <Link 
              href={`/projects/${project.id}`}
              className="project-card glass-card hover-glow interactive"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'none', height: '100%' }}
            >
              <div className="project-year">{project.year}</div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                <h3 style={{ marginBottom: 0 }}>{project.title} <span>({project.type})</span></h3>
              </div>
              <p>
                {project.description}
              </p>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
