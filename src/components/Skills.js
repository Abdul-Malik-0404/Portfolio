'use client';

export default function Skills() {
  return (
    <section id="skills" className="section section-reveal">
      <h2 className="section-title">Technical Expertise</h2>
      <div className="skills-grid">
        <div className="skill-category glass-card hover-glow">
          <h3>Languages</h3>
          <p>Python &middot; Java &middot; JavaScript &middot; TypeScript &middot; C++ &middot; HTML &middot; CSS &middot; Shell &middot; Kotlin</p>
        </div>
        <div className="skill-category glass-card hover-glow">
          <h3>Data Science</h3>
          <p>Pandas &middot; NumPy &middot; Scikit-Learn &middot; Matplotlib</p>
        </div>
        <div className="skill-category glass-card hover-glow">
          <h3>Tools</h3>
          <p>Linux (Arch) &middot; Git &middot; Docker &middot; Android Studio &middot; VS Code &middot; Neovim &middot; IntelliJ IDEA &middot; Netbeans</p>
        </div>
        <div className="skill-category glass-card hover-glow">
          <h3>Soft Skills</h3>
          <p>Communication &middot; Teamwork &middot; Leadership &middot; Problem Solving &middot; Adaptability &middot; Critical Thinking</p>
        </div>
      </div>
    </section>
  );
}
