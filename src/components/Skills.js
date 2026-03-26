'use client';
import { motion } from 'framer-motion';

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
        <motion.div variants={itemVariants} className="skill-category glass-card hover-glow interactive">
          <h3>Languages</h3>
          <p>Python &middot; Java &middot; JavaScript &middot; TypeScript &middot; C++ &middot; HTML &middot; CSS &middot; Shell &middot; Kotlin</p>
        </motion.div>
        <motion.div variants={itemVariants} className="skill-category glass-card hover-glow interactive">
          <h3>Data Science</h3>
          <p>Pandas &middot; NumPy &middot; Scikit-Learn &middot; Matplotlib</p>
        </motion.div>
        <motion.div variants={itemVariants} className="skill-category glass-card hover-glow interactive">
          <h3>Tools</h3>
          <p>Linux (Arch) &middot; Git &middot; Docker &middot; Android Studio &middot; VS Code &middot; Neovim &middot; IntelliJ IDEA &middot; Netbeans</p>
        </motion.div>
        <motion.div variants={itemVariants} className="skill-category glass-card hover-glow interactive">
          <h3>Soft Skills</h3>
          <p>Communication &middot; Teamwork &middot; Leadership &middot; Problem Solving &middot; Adaptability &middot; Critical Thinking</p>
        </motion.div>
      </motion.div>
    </section>
  );
}
