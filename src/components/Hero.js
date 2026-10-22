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
        style={{ cursor: 'pointer' }}
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
              style={{ padding: '2.5rem 2.5rem' }}
            >
              <button className="modal-close-btn interactive" onClick={() => setIsExpanded(false)}>
                <X size={28} />
              </button>

              <motion.h1 layoutId="hero-title" className="hero-title" style={{ fontSize: '2.6rem', marginBottom: '0.4rem' }}>Abdul Malik</motion.h1>
              <motion.h2 layoutId="hero-subtitle" className="subtitle" style={{ fontSize: '1.1rem', marginBottom: '1.2rem', borderBottom: '1px solid var(--glass-border)', paddingBottom: '1rem' }}>
                Aspiring Software Engineer & AI Developer
              </motion.h2>

              <div className="hero-expanded-content" style={{ color: 'var(--text-color)', lineHeight: '1.65', fontSize: '0.95rem' }}>
                <motion.p layoutId="hero-summary" style={{ marginBottom: '1rem' }}>
                  An aspiring Computer Science student with a passion for AI, Distributed Systems, and Machine Learning.
                  Dedicated to developing practical software solutions and currently building a
                  strong foundation in cloud-native engineering and full-stack development.
                </motion.p>

                <h3 style={{ color: 'var(--accent-cyan)', marginBottom: '0.5rem', marginTop: '1.2rem', fontSize: '1.1rem' }}>Currently Exploring</h3>
                <ul style={{ paddingLeft: '1.5rem', marginBottom: '1.2rem' }}>
                  <li>Working on my Final Year Project <strong>sfugue</strong> – proactive stateful session evacuation and SFrame E2EE failover benchmarking for distributed WebRTC SFUs on Kubernetes.</li>
                  <li>My daily driver is <strong>Arch Linux (Hyprland)</strong> – I love diving deep into system internals!</li>
                  <li>Expanding my knowledge in <strong>Kubernetes, Chaos Mesh, Kafka, Docker, and Machine Learning (ML)</strong>.</li>
                  <li>Building native Android applications using <strong>Kotlin</strong> and <strong>Jetpack Compose</strong>, including <strong>Zawj</strong> (an E2EE messaging and WebRTC app).</li>
                </ul>

                <h3 style={{ color: 'var(--accent-magenta)', marginBottom: '0.4rem', marginTop: '1.2rem', fontSize: '1.1rem' }}>Let&apos;s Connect</h3>
                <p style={{ marginBottom: '1.2rem' }}>
                  I&apos;m always open to collaborating on distributed systems, AI/ML research, or full-stack applications.
                  Feel free to ask me about Python, TypeScript, WebRTC, Android development, or Arch Linux!
                </p>

                <motion.div layoutId="hero-socials" className="social-links" style={{ justifyContent: 'flex-start', gap: '1.2rem' }}>
                  <a href="mailto:abdulmaliksadath@gmail.com" target="_blank" aria-label="Email">
                    <Mail size={22} />
                  </a>
                  <a href="https://www.linkedin.com/in/abdul-malik-9a448b293/" target="_blank" aria-label="LinkedIn">
                    <LinkedinIcon size={22} />
                  </a>
                  <a href="https://github.com/Abdul-Malik-0404" target="_blank" aria-label="GitHub">
                    <GithubIcon size={22} />
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
