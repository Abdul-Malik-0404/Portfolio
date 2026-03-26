'use client';

export default function Projects() {
  return (
    <section id="projects" className="section section-reveal">
      <h2 className="section-title">Featured Projects</h2>
      <div className="projects-grid">
        <div className="project-card glass-card hover-glow">
          <div className="project-year">2025</div>
          <h3>Dotfiles <span>(Arch Linux Configuration)</span></h3>
          <p>
            Created and maintained personal Arch Linux configurations and scripts. 
            Utilized Shell scripting to optimize the development environment and automate setup tasks.
          </p>
        </div>
        <div className="project-card glass-card hover-glow">
          <div className="project-year">2025</div>
          <h3>All-rounder <span>(Social Networking App)</span></h3>
          <p>
            Developed a TypeScript web application tailored for school students in Sri Lanka. 
            Created a platform for sharing extracurricular activities, achievements, and 
            facilitating resource sharing between schools.
          </p>
        </div>
        <div className="project-card glass-card hover-glow">
          <div className="project-year">2024</div>
          <h3>Hotkeys</h3>
          <p>
            Developed a set of keyboard shortcuts using C++ to emulate function keys on compact keyboards.
          </p>
        </div>
      </div>
    </section>
  );
}
