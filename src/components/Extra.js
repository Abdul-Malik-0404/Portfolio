'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import { HyprWorkspace, HyprWindow } from './HyprWindow';

const extraData = [
  {
    id: 'extra-cutting-edge',
    appClass: 'kitty',
    winTitle: '~/events/cutting-edge-exhibition.log',
    title: 'Cutting Edge Exhibition',
    summary: 'Exhibited the "All-rounder" project at IIT Sri Lanka.',
    description:
      'Participated in the annual flagship Cutting Edge exhibition organized by the Informatics Institute of Technology (IIT) Sri Lanka. Showcased the "All-rounder" social networking application, demonstrating its features to industry professionals and academics, and received valuable feedback on its technical implementation and real-world applicability.',
  },
  {
    id: 'extra-volunteer',
    appClass: 'calcurse',
    winTitle: '~/events/iit-iftar-2026.md',
    title: 'Volunteer',
    summary: 'Assisted in organizing and managing the IIT Iftar event in 2026.',
    description:
      'Played a key role in the logistics and event management for the 2026 IIT Iftar. Coordinated with vendors, managed attendee registrations, and ensured smooth operations during the event, fostering a strong sense of community within the university.',
  },
  {
    id: 'extra-ieeextreme',
    appClass: 'gcc',
    winTitle: '~/hackathons/ieeextreme-24h.cpp',
    title: 'IEEEXtreme',
    summary: 'Participant in the 24-hour global algorithmic coding hackathon.',
    description:
      'Competed in IEEEXtreme, an annual 24-hour global hackathon where teams of students solve rigorous algorithmic programming challenges. This experience sharpened my problem-solving skills, ability to work under pressure, and collaborative coding practices.',
  },
  {
    id: 'extra-ieee',
    appClass: 'nvim',
    winTitle: '~/community/ieee-membership.md',
    title: 'IEEE',
    summary:
      'Active member of the Institute of Electrical and Electronics Engineers since 2024.',
    description:
      'Engaged in various IEEE student branch activities, attending workshops, technical talks, and networking events. Active participation has provided insights into industry trends and helped build a strong professional network with peers and mentors.',
  },
];

export default function Extra() {
  const [selectedId, setSelectedId] = useState(null);

  return (
    <HyprWorkspace
      id="extra"
      wsNumber={6}
      wsName="activities"
      title="Activities"
      layoutType="dwindle (2x2)"
      windowIds={extraData.map((d) => d.id)}
    >
      <div className="hypr-tile-grid cols-2">
        {extraData.map((item, idx) => (
          <HyprWindow
            key={item.id}
            id={item.id}
            title={item.winTitle}
            appClass={item.appClass}
            workspace={6}
            dwindleIndex={idx}
            className="interactive"
            onClick={() => setSelectedId(item.id)}
          >
            <div className="extra-tile-body">
              <div className="edu-tile-top">
                <h3 style={{ margin: 0, color: 'var(--accent-cyan)', fontSize: '1.2rem' }}>
                  {item.title}
                </h3>
                <span className="hypr-click-hint">inspect ↗</span>
              </div>
              <p style={{ color: 'var(--text-muted)', marginTop: '0.6rem', lineHeight: 1.6 }}>
                {item.summary}
              </p>
            </div>
          </HyprWindow>
        ))}
      </div>

      <AnimatePresence>
        {selectedId && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="skills-modal-overlay"
            onClick={() => setSelectedId(null)}
            style={{ zIndex: 3000 }}
          >
            {extraData
              .filter((i) => i.id === selectedId)
              .map((item) => (
                <motion.div
                  key="modal"
                  initial={{ scale: 0.92, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.92, opacity: 0 }}
                  className="skills-modal-content interactive"
                  onClick={(e) => e.stopPropagation()}
                  style={{ padding: '3rem 2.5rem' }}
                >
                  <button
                    className="modal-close-btn interactive"
                    onClick={() => setSelectedId(null)}
                  >
                    <X size={28} />
                  </button>
                  <h2
                    style={{
                      color: 'var(--accent-cyan)',
                      fontSize: '2.2rem',
                      marginBottom: '1rem',
                      borderBottom: '1px solid var(--glass-border)',
                      paddingBottom: '1rem',
                    }}
                  >
                    {item.title}
                  </h2>

                  <div style={{ color: 'var(--text-color)', lineHeight: '1.8' }}>
                    <p
                      style={{
                        fontSize: '1.1rem',
                        marginBottom: '1.25rem',
                        color: 'var(--accent-magenta)',
                      }}
                    >
                      {item.summary}
                    </p>
                    <p>{item.description}</p>
                  </div>
                </motion.div>
              ))}
          </motion.div>
        )}
      </AnimatePresence>
    </HyprWorkspace>
  );
}
