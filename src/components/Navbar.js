'use client';

import { useEffect, useState } from 'react';
import { Home } from 'lucide-react';
import WaybarHUD from './WaybarHUD';

const NAV_WORKSPACES = [
  { id: 1, label: 'about', target: 'home' },
  { id: 2, label: 'education', target: 'education' },
  { id: 3, label: 'skills', target: 'skills' },
  { id: 4, label: 'projects', target: 'projects' },
  { id: 5, label: 'blog', target: 'blog' },
  { id: 6, label: 'activities', target: 'extra' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeWs, setActiveWs] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const scrollPos = window.scrollY + 220;
      for (let i = NAV_WORKSPACES.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_WORKSPACES[i].target);
        if (el && el.offsetTop <= scrollPos) {
          setActiveWs(NAV_WORKSPACES[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (e, id, wsId) => {
    const el = document.getElementById(id);
    if (el) {
      e.preventDefault();
      if (wsId) setActiveWs(wsId);
      window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
    }
  };

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-content">
        <div className="waybar-shell">
          <div className="waybar-group waybar-left">
            <a
              href="/#"
              onClick={(e) => scrollToSection(e, 'home', 1)}
              className="waybar-module mod-launcher"
              title="Home"
            >
              <Home size={14} className="icon-cyan" />
              <span>~</span>
            </a>

            <div className="waybar-workspaces">
              {NAV_WORKSPACES.map((ws) => (
                <a
                  key={ws.id}
                  href={`/#${ws.target}`}
                  onClick={(e) => scrollToSection(e, ws.target, ws.id)}
                  className={`waybar-module waybar-ws ${activeWs === ws.id ? 'active' : ''}`}
                >
                  <span className="ws-num">{ws.id}:</span>
                  <span className="ws-label">{ws.label}</span>
                </a>
              ))}
            </div>
          </div>

          <WaybarHUD />
        </div>
      </div>
    </nav>
  );
}
