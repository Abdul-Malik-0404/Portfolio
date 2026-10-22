'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Home } from 'lucide-react';
import WaybarHUD from './WaybarHUD';
import { useHyprland, WORKSPACE_LIST } from './HyprlandContext';

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { activeWorkspace, switchWorkspace } = useHyprland();

  // Clean up any #hash (e.g. /#projects from Back to Portfolio) and switch to that workspace
  useEffect(() => {
    const cleanHash = () => {
      if (typeof window !== 'undefined' && window.location.hash) {
        const targetId = window.location.hash.replace('#', '');
        const matchedWs = WORKSPACE_LIST.find((w) => w.target === targetId);
        if (matchedWs) {
          switchWorkspace(matchedWs.id);
        }
        window.history.replaceState(null, '', window.location.pathname);
      }
    };

    cleanHash();
    const timer = setTimeout(cleanHash, 80);
    window.addEventListener('hashchange', cleanHash);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('hashchange', cleanHash);
    };
  }, [pathname, switchWorkspace]);

  const handleWorkspaceClick = (e, ws) => {
    e.preventDefault();
    if (pathname === '/') {
      switchWorkspace(ws.id);
      if (window.location.hash) {
        window.history.replaceState(null, '', window.location.pathname);
      }
    } else {
      switchWorkspace(ws.id);
      router.push('/');
    }
  };

  return (
    <nav className="navbar hypr-top-waybar">
      <div className="nav-content">
        <div className="waybar-shell">
          <div className="waybar-group waybar-left">
            <a
              href="/"
              onClick={(e) => handleWorkspaceClick(e, WORKSPACE_LIST[0])}
              className="waybar-module mod-launcher"
              title="Workspace 1: Overview"
            >
              <Home size={14} className="icon-cyan" />
              <span>~</span>
            </a>

            <div className="waybar-workspaces">
              {WORKSPACE_LIST.map((ws) => (
                <a
                  key={ws.id}
                  href={`/#${ws.target}`}
                  onClick={(e) => handleWorkspaceClick(e, ws)}
                  className={`waybar-module waybar-ws ${
                    pathname === '/' && activeWorkspace === ws.id ? 'active' : ''
                  }`}
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
