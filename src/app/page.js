'use client';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Extra from '../components/Extra';
import Footer from '../components/Footer';

export default function Home() {
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
