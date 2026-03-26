'use client';
import { motion } from 'framer-motion';

const itemVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

export default function Footer() {
  return (
    <>
      <section id="contact" className="section">
        <h2 className="section-title">References</h2>
        <motion.div 
          className="grid-2-col" 
          style={{ marginBottom: '3rem' }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
        >
          <motion.div variants={itemVariants} className="ref-card glass-card hover-glow interactive">
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Ms. Azmiya Cassim</h4>
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '0.1rem' }}>Assistant Lecturer</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Informatics Institute of Technology</p>
            <a href="mailto:azmiya.c@iit.ac.lk" style={{ display: 'block', marginBottom: '0.2rem' }}>azmiya.c@iit.ac.lk</a>
            <p style={{ display: 'block', marginBottom: '0.2rem' }}>+94 76 55 44 237</p>
          </motion.div>
          <motion.div variants={itemVariants} className="ref-card glass-card hover-glow interactive">
            <h4 style={{ fontSize: '1.2rem', marginBottom: '0.2rem' }}>Mr. Jiehfeng Hsu</h4>
            <p style={{ color: 'var(--accent-cyan)', fontSize: '0.9rem', marginBottom: '0.1rem' }}>Assistant Lecturer</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', marginBottom: '1rem' }}>Faculty of Computing, IIT</p>
            <a href="mailto:jiehfeng.h@iit.ac.lk" style={{ display: 'block', marginBottom: '0.2rem' }}>jiehfeng.h@iit.ac.lk</a>
            <p style={{ display: 'block', marginBottom: '0.2rem' }}>0703452684</p>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="contact-footer glass-card hover-glow interactive" 
          style={{ textAlign: 'center', background: 'linear-gradient(135deg, rgba(30, 41, 59, 0.6), rgba(15, 23, 42, 0.8))' }}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6 }}
        >
          <h3 style={{ fontSize: '1.8rem', marginBottom: '1rem' }}>Let&apos;s Connect</h3>
          <p style={{ color: 'var(--text-muted)', marginBottom: '1.5rem' }}>Feel free to reach out via Email or LinkedIn for opportunities, collaborations, or just a chat!</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>📱 +94 766 927 222</span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 500 }}>📱 +94 721 054 073</span>
          </div>
        </motion.div>
      </section>

      <footer style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)', fontSize: '0.9rem', borderTop: '1px solid var(--glass-border)', marginTop: '2rem' }}>
        <p>&copy; 2026 Abdul Malik. Designed and Built with Passion.</p>
      </footer>
    </>
  );
}
