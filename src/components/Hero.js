'use client';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Github } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="hero">
      <motion.div 
        className="hero-content glass-card hypr-border hover-glow interactive"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="glitch-title" data-text="Abdul Malik">Abdul Malik</h1>
        <h2 className="subtitle">Aspiring Software Engineer & AI Developer</h2>
        <p className="summary">
          An aspiring Computer Science student with a passion for AI and Machine Learning. 
          Dedicated to developing practical software solutions and currently building a 
          strong foundation in data science and full-stack development.
        </p>
        <div className="social-links">
          <a href="mailto:abdulmaliksadath@gmail.com" target="_blank" aria-label="Email">
            <Mail size={24} />
          </a>
          <a href="https://linkedin.com/in/abdul-malik" target="_blank" aria-label="LinkedIn">
            <Linkedin size={24} />
          </a>
          <a href="https://github.com/Abdul-Malik-0404" target="_blank" aria-label="GitHub">
            <Github size={24} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
