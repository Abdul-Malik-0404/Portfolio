'use client';

import { useEffect } from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Extra from '../components/Extra';
import Footer from '../components/Footer';

export default function Home() {
  
  useEffect(() => {
    // 1. Intersection Observer for Scroll Animations
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Reveal only once
            }
        });
    }, observerOptions);

    const revealElements = document.querySelectorAll('.section-reveal');
    revealElements.forEach(el => sectionObserver.observe(el));

    // 2. Dynamic Glow Effect on Cards (Mouse Tracking)
    const glowCards = document.querySelectorAll('.hover-glow');
    
    // Using event delegation or attaching to each card.
    const handleMouseMove = (e) => {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    };

    glowCards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
    });

    return () => {
      revealElements.forEach(el => sectionObserver.unobserve(el));
      glowCards.forEach(card => card.removeEventListener('mousemove', handleMouseMove));
    };
  }, []);

  return (
    <>
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>
      
      <Navbar />

      <main>
        <Hero />
        <Education />
        <Skills />
        <Projects />
        <Extra />
        <Footer />
      </main>
    </>
  );
}
