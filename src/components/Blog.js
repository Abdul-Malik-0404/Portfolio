'use client';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { blogs } from '../data/blogs';

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

export default function Blog() {
  return (
    <section id="blog" className="section">
      <h2 className="section-title">Latest Writing</h2>
      <motion.div 
        className="projects-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {blogs.map((post) => (
          <motion.div key={post.id} variants={itemVariants} style={{ height: '100%' }}>
            <Link 
              href={`/blog/${post.id}`}
              className="glass-card hover-glow interactive"
              style={{ display: 'block', textDecoration: 'none', color: 'inherit', cursor: 'none', height: '100%' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <span className="project-year" style={{ marginBottom: 0 }}>{post.date}</span>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>{post.readTime}</span>
              </div>
              <h3 style={{ marginBottom: '1rem', color: 'var(--accent-cyan)' }}>
                {post.title}
              </h3>
              <p style={{ color: 'var(--text-color)', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                {post.summary}
              </p>
              
              <div className="tech-stack" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {post.tags.map((tag, idx) => (
                  <span key={idx} className="tech-badge" style={{ margin: 0, fontSize: '0.75rem', padding: '0.2rem 0.6rem' }}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
