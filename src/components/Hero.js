'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Mail, X } from 'lucide-react';
import LinkedinIcon from './LinkedinIcon';
import GithubIcon from './GithubIcon';

export default function Hero() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="home" className="hero">
      <motion.div
        layoutId="hero-card"
        className="hero-content glass-card hover-glow interactive"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        onClick={() => setIsExpanded(true)}
        style={{ cursor: 'none' }}
      >
        <motion.h1 layoutId="hero-title" className="hero-title">Abdul Malik</motion.h1>
        <motion.h2 layoutId="hero-subtitle" className="subtitle">Aspiring Software Engineer & AI Developer</motion.h2>
        <motion.p layoutId="hero-summary" className="summary">
          An aspiring Computer Science student with a passion for AI and Machine Learning.
          Dedicated to developing practical software solutions and currently building a
          strong foundation in data science and full-stack development.
        </motion.p>
        <motion.div layoutId="hero-socials" className="social-links" onClick={(e) => e.stopPropagation()}>
          <a href="mailto:abdulmaliksadath@gmail.com" target="_blank" aria-label="Email">
            <Mail size={24} />
          </a>
          <a href="https://www.linkedin.com/in/abdul-malik-9a448b293" target="_blank" aria-label="LinkedIn">
            <LinkedinIcon size={24} />
          </a>
          <a href="https://github.com/Abdul-Malik-0404" target="_blank" aria-label="GitHub">
            <GithubIcon size={24} />
          </a>
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="skills-modal-overlay"
            onClick={() => setIsExpanded(false)}
            style={{ zIndex: 3000 }}
          >
            <motion.div
              layoutId="hero-card"
              className="skills-modal-content interactive"
              onClick={(e) => e.stopPropagation()}
              style={{ padding: '4rem 3rem' }}
            >
              <button className="modal-close-btn interactive" onClick={() => setIsExpanded(false)}>
                <X size={28} />
              </button>

              <motion.h1 layoutId="hero-title" className="hero-title" style={{ fontSize: '3.5rem', marginBottom: '0.5rem' }}>Abdul Malik</motion.h1>
              <motion.h2 layoutId="hero-subtitle" className="subtitle" style={{ fontSize: '1.2rem', marginBottom: '2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1.5rem' }}>
                Aspiring Software Engineer & AI Developer
              </motion.h2>

              <div className="hero-expanded-content" style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
                <motion.p layoutId="hero-summary" style={{ marginBottom: '1.5rem' }}>
                  An aspiring Computer Science student with a passion for AI and Machine Learning.
                  Dedicated to developing practical software solutions and currently building a
                  strong foundation in data science and full-stack development.
                </motion.p>

                <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Currently Exploring</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
                  <li>My daily driver is <strong>Arch Linux</strong> – I love diving deep into system internals!</li>
                  <li>Expanding my knowledge in <strong>Linux, Docker, Machine Learning (ML), and Git</strong>.</li>
                  <li>Looking forward to mastering <strong>React</strong> and <strong>Spring Boot</strong> next.</li>
                  <li>I'm also learning to build native android applications using <strong>Kotlin</strong> and <strong>Jetpack Compose</strong>.</li>
                  <li>Building a secure messaging app called <strong>Zawj</strong> that features end-to-end encryption, location sharing, video calling, and an autonomous AI developer workflow.</li>
                </ul>

                <h3 style={{ color: 'var(--accent-magenta)', marginBottom: '0.5rem', marginTop: '1.5rem' }}>Let&apos;s Connect</h3>
                <p style={{ marginBottom: '2rem' }}>
                  I&apos;m always open to collaborating on university-based projects or full-stack web applications.
                  Feel free to ask me about Python, Java, WebRTC, Android development or my experiences configuring Arch Linux!
                </p>

                <motion.div layoutId="hero-socials" className="social-links" style={{ justifyContent: 'flex-start', gap: '1.5rem' }}>
                  <a href="mailto:abdulmaliksadath@gmail.com" target="_blank" aria-label="Email">
                    <Mail size={24} />
                  </a>
                  <a href="https://www.linkedin.com/in/abdul-malik-9a448b293/" target="_blank" aria-label="LinkedIn">
                    <LinkedinIcon size={24} />
                  </a>
                  <a href="https://github.com/Abdul-Malik-0404" target="_blank" aria-label="GitHub">
                    <GithubIcon size={24} />
                  </a>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section >
  );
}
