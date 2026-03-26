'use client';

export default function Education() {
  return (
    <section id="education" className="section section-reveal">
      <h2 className="section-title">Education Experience</h2>
      <div className="timeline">
        <div className="timeline-item glass-card hover-glow">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>BSc (Hons) in Computer Science</h3>
            <h4>University of Westminster (UK) / IIT Sri Lanka</h4>
            <span className="date">2024 &ndash; Expected 2028</span>
          </div>
        </div>
        <div className="timeline-item glass-card hover-glow">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Certificate in Machine Learning</h3>
            <h4>IIT Professional Development Unit (PDU)</h4>
            <span className="date">Jan 2026</span>
          </div>
        </div>
        <div className="timeline-item glass-card hover-glow">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>Foundation Certificate in Higher Education</h3>
            <h4>Informatics Institute of Technology, Sri Lanka</h4>
            <span className="date">2023 &ndash; 2024</span>
          </div>
        </div>
        <div className="timeline-item glass-card hover-glow">
          <div className="timeline-dot"></div>
          <div className="timeline-content">
            <h3>GCE Ordinary Level</h3>
            <h4>Nasriya Central College, Chilaw, Sri Lanka</h4>
            <span className="date">2023</span>
          </div>
        </div>
      </div>
    </section>
  );
}
