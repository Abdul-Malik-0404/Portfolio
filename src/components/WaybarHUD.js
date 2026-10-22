'use client';

import { useState, useEffect } from 'react';
import { GitBranch, Clock, Cpu, Activity } from 'lucide-react';

export default function WaybarHUD() {
  const [time, setTime] = useState('');
  const [githubStats, setGithubStats] = useState({
    publicRepos: 10,
    latestRepo: 'Portfolio',
    loading: true
  });

  // Real-time clock in Colombo timezone (Asia/Colombo)
  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: 'Asia/Colombo',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
      });
      setTime(timeString);
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  // Fetch public GitHub activity
  useEffect(() => {
    const fetchGitHub = async () => {
      try {
        const userRes = await fetch('https://api.github.com/users/Abdul-Malik-0404');
        if (userRes.ok) {
          const userData = await userRes.json();
          const reposRes = await fetch('https://api.github.com/users/Abdul-Malik-0404/repos?sort=pushed&per_page=1');
          let latest = 'Portfolio';
          if (reposRes.ok) {
            const repos = await reposRes.json();
            if (repos.length > 0) {
              latest = repos[0].name;
            }
          }
          setGithubStats({
            publicRepos: userData.public_repos || 10,
            latestRepo: latest,
            loading: false
          });
        }
      } catch {
        // Fallback gracefully without breaking UI
        setGithubStats({
          publicRepos: 12,
          latestRepo: 'Portfolio',
          loading: false
        });
      }
    };

    fetchGitHub();
  }, []);

  return (
    <div className="waybar-container">
      <div className="waybar-module mod-os">
        <span className="dot-pulse"></span>
        <Cpu size={14} className="icon-cyan" />
        <span className="mod-text">arch-linux // zen</span>
      </div>

      <div className="waybar-module mod-git">
        <GitBranch size={14} className="icon-magenta" />
        <a 
          href={`https://github.com/Abdul-Malik-0404/${githubStats.latestRepo}`} 
          target="_blank" 
          rel="noopener noreferrer"
          className="mod-link"
        >
          git: {githubStats.latestRepo}
        </a>
      </div>

      <div className="waybar-module mod-status">
        <Activity size={14} className="icon-yellow" />
        <span className="mod-text">status: active</span>
      </div>

      <div className="waybar-module mod-time">
        <Clock size={14} className="icon-cyan" />
        <span className="mod-text">{time || '00:00:00'} LKT</span>
      </div>
    </div>
  );
}
