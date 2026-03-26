'use client';

export default function Hero() {
  return (
    <section id="home" className="hero section-reveal">
      <div className="hero-content glass-card">
        <h1 className="glitch-title">Abdul Malik</h1>
        <h2 className="subtitle">Aspiring Software Engineer & AI Developer</h2>
        <p className="summary">
          An aspiring Computer Science student with a passion for AI and Machine Learning. 
          Dedicated to developing practical software solutions and currently building a 
          strong foundation in data science and full-stack development.
        </p>
        <div className="social-links">
          <a href="mailto:abdulmaliksadath@gmail.com" target="_blank" aria-label="Email">
            <span style={{ fontSize: '1.2rem' }}>✉</span>
          </a>
          <a href="https://linkedin.com/in/abdul-malik" target="_blank" aria-label="LinkedIn">
            <span style={{ fontSize: '1.2rem' }}>in</span>
          </a>
          <a href="https://github.com/Abdul-Malik-0404" target="_blank" aria-label="GitHub">
            <span style={{ fontSize: '1.2rem' }}>git</span>
          </a>
        </div>
      </div>
    </section>
  );
}
