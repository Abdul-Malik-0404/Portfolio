'use client';

export default function Extra() {
  return (
    <section id="extra" className="section section-reveal grid-2-col">
      <div className="extra-card glass-card hover-glow">
        <h2 className="section-title-small">Extracurricular</h2>
        <ul className="activity-list" style={{ listStyle: 'none' }}>
          <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-1)' }}>→</span>
            <strong style={{ color: 'var(--text-color)' }}>Volunteer:</strong> Assisted in organizing and managing the IIT Iftar event in 2026.
          </li>
          <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-1)' }}>→</span>
            <strong style={{ color: 'var(--text-color)' }}>IEEEXtreme:</strong> Participant in the 24-hour global algorithmic coding hackathon.
          </li>
          <li style={{ marginBottom: '1rem', position: 'relative', paddingLeft: '1.5rem', color: 'var(--text-muted)' }}>
            <span style={{ position: 'absolute', left: 0, color: 'var(--accent-1)' }}>→</span>
            <strong style={{ color: 'var(--text-color)' }}>IEEE:</strong> Active member of the Institute of Electrical and Electronics Engineers since 2024.
          </li>
        </ul>
      </div>

      <div className="extra-card glass-card hover-glow">
        <h2 className="section-title-small">Languages</h2>
        <div className="lang-bars">
          <div className="lang-item" style={{ marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Tamil (Native/Mother Tongue)</span>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg, var(--accent-1), var(--accent-2))' }}></div>
            </div>
          </div>
          <div className="lang-item" style={{ marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>Sinhala (Fluent)</span>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '90%', background: 'linear-gradient(90deg, var(--accent-1), var(--accent-2))' }}></div>
            </div>
          </div>
          <div className="lang-item" style={{ marginBottom: '1.2rem' }}>
            <span style={{ display: 'block', marginBottom: '0.4rem', fontSize: '0.95rem' }}>English (Excellent)</span>
            <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: '95%', background: 'linear-gradient(90deg, var(--accent-1), var(--accent-2))' }}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
