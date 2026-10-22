'use client';

import { Maximize2 } from 'lucide-react';
import { HyprWorkspace } from './HyprWindow';

const extraData = [
  {
    id: 'extra-cutting-edge',
    appClass: 'kitty',
    winTitle: '~/events/cutting-edge-exhibition.log',
    title: 'Cutting Edge Exhibition',
    role: 'Project Exhibitor // IIT Sri Lanka',
    summary: 'Exhibited the "All-rounder" project at IIT Sri Lanka.',
    description:
      'Participated in the annual flagship Cutting Edge exhibition organized by the Informatics Institute of Technology (IIT) Sri Lanka. Showcased the "All-rounder" social networking application, demonstrating its features to industry professionals and academics, and received valuable feedback on its technical implementation and real-world applicability.',
  },
  {
    id: 'extra-volunteer',
    appClass: 'calcurse',
    winTitle: '~/events/iit-iftar-2026.md',
    title: 'Volunteer',
    role: 'Event Operations & Logistics // 2026',
    summary: 'Assisted in organizing and managing the IIT Iftar event in 2026.',
    description:
      'Played a key role in the logistics and event management for the 2026 IIT Iftar. Coordinated with vendors, managed attendee registrations, and ensured smooth operations during the event, fostering a strong sense of community within the university.',
  },
  {
    id: 'extra-ieeextreme',
    appClass: 'gcc',
    winTitle: '~/hackathons/ieeextreme-24h.cpp',
    title: 'IEEEXtreme',
    role: '24-Hour Global Algorithmic Coding Hackathon',
    summary: 'Participant in the 24-hour global algorithmic coding hackathon.',
    description:
      'Competed in IEEEXtreme, an annual 24-hour global hackathon where teams of students solve rigorous algorithmic programming challenges. This experience sharpened my problem-solving skills, ability to work under pressure, and collaborative coding practices.',
  },
  {
    id: 'extra-ieee',
    appClass: 'nvim',
    winTitle: '~/community/ieee-membership.md',
    title: 'IEEE',
    role: 'Student Member // Since 2024',
    summary:
      'Active member of the Institute of Electrical and Electronics Engineers since 2024.',
    description:
      'Engaged in various IEEE student branch activities, attending workshops, technical talks, and networking events. Active participation has provided insights into industry trends and helped build a strong professional network with peers and mentors.',
  },
];

export default function Extra() {
  const windows = extraData.map((item) => ({
    id: item.id,
    title: item.winTitle,
    appClass: item.appClass,
    renderTiled: () => (
      <div className="extra-tile-body">
        <div className="edu-tile-top">
          <span className="hypr-mini-tag">{item.role}</span>
          <span className="hypr-click-hint">
            <Maximize2 size={11} style={{ marginRight: 4 }} />
            expand [F]
          </span>
        </div>
        <h3
          style={{
            margin: '0.25rem 0 0',
            color: 'var(--accent-cyan)',
            fontSize: '1.25rem',
          }}
        >
          {item.title}
        </h3>
        <p
          style={{
            color: 'var(--text-muted)',
            marginTop: '0.4rem',
            lineHeight: 1.6,
            fontSize: '0.9rem',
          }}
        >
          {item.summary}
        </p>
      </div>
    ),
    renderExpanded: () => (
      <div className="hypr-expanded-view">
        <div className="edu-tile-top" style={{ marginBottom: '0.6rem' }}>
          <span className="hypr-mini-tag">{item.role}</span>
          <span className="pacman-pkg-repo">{item.appClass} // fullscreen</span>
        </div>
        <h2
          style={{
            color: 'var(--accent-cyan)',
            fontSize: '2.1rem',
            marginBottom: '1rem',
            borderBottom: '1px solid var(--glass-border)',
            paddingBottom: '1rem',
          }}
        >
          {item.title}
        </h2>
        <p
          style={{
            fontSize: '1.1rem',
            marginBottom: '1.25rem',
            color: 'var(--accent-magenta)',
          }}
        >
          {item.summary}
        </p>
        <p
          style={{
            color: 'var(--text-color)',
            lineHeight: 1.8,
            fontSize: '1rem',
          }}
        >
          {item.description}
        </p>
      </div>
    ),
  }));

  return (
    <HyprWorkspace
      id="extra"
      wsNumber={6}
      wsName="activities"
      title="Activities"
      windows={windows}
    />
  );
}
