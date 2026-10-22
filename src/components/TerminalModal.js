'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal as TerminalIcon, X, Maximize2, Minimize2 } from 'lucide-react';

const ASCII_LOGO = `
       /\\         malik@archlinux
      /  \\        ----------------
     /\\   \\       OS: Arch Linux x86_64
    /      \\      Host: ThinkPad / Hyprland
   /   ,,   \\     Kernel: 6.12-arch-zen
  /   |  |  -\\    Uptime: 24/7 building
 /_-''    ''-_\\   Shell: zsh + fish
                  WM: Hyprland (wayland)
                  Terminal: kitty
                  Editor: neovim
                  CPU/Focus: AI, Fullstack & ML
`;

const HELP_TEXT = `
Available commands:
  neofetch      - Display system info & specs
  about         - Who is Abdul Malik?
  skills        - List core technical stack
  projects      - List featured projects
  contact       - Get in touch
  clear         - Clear terminal buffer
  exit          - Close this terminal session
  sudo hire-me  - Elevate permissions
`;

export default function TerminalModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState([
    { type: 'system', text: 'Arch Linux terminal session initialized. Press `~` or ESC to toggle.' },
    { type: 'system', text: "Type 'help' or 'neofetch' to explore." }
  ]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [commandHistory, setCommandHistory] = useState([]);

  const inputRef = useRef(null);
  const terminalEndRef = useRef(null);

  // Global toggle listener with `~` / `Escape`
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Toggle terminal on backtick `~` (if not typing in another input)
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      } else if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Scroll to bottom on new output
  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (e) => {
    if (e.key === 'Enter') {
      const cmd = inputVal.trim();
      const newHistory = [...history, { type: 'user', text: `malik@arch:~$ ${inputVal}` }];

      if (cmd) {
        setCommandHistory((prev) => [...prev, cmd]);
        setHistoryIndex(-1);
      }

      const lowerCmd = cmd.toLowerCase();

      switch (lowerCmd) {
        case 'help':
          newHistory.push({ type: 'output', text: HELP_TEXT });
          break;
        case 'neofetch':
          newHistory.push({ type: 'ascii', text: ASCII_LOGO });
          break;
        case 'about':
          newHistory.push({
            type: 'output',
            text: 'Abdul Malik — Aspiring Software Engineer & AI Developer.\nPassionate about machine learning, Linux systems internals, and building real-world practical tools.'
          });
          break;
        case 'skills':
          newHistory.push({
            type: 'output',
            text: 'Languages: Python, Java, C#, JavaScript, TypeScript, C++, Shell, Kotlin\nStack & Tools: Linux (Arch), Kubernetes (KinD), Docker, Kafka, Prometheus, Chaos Mesh, WebRTC/Mediasoup, FastAPI, Next.js, GCP'
          });
          break;
        case 'projects':
          newHistory.push({
            type: 'output',
            text: '• sfugue (FYP): Distributed WebRTC SFU Chaos & SFrame E2EE Failover Testbed\n• Jeb: AI Job Scout & Resume Tailor (FastAPI + Next.js + Custom ML)\n• Zawj: Secure E2EE Messaging App with WebRTC\n• All-rounder: Youth Platform showcased at Cutting Edge\n• Dotfiles: Keyboard-driven Arch Linux setup'
          });
          break;
        case 'contact':
          newHistory.push({
            type: 'output',
            text: 'Email: abdulmaliksadath@gmail.com\nLinkedIn: linkedin.com/in/abdul-malik-9a448b293\nGitHub: github.com/Abdul-Malik-0404'
          });
          break;
        case 'clear':
          setHistory([]);
          setInputVal('');
          return;
        case 'exit':
          setIsOpen(false);
          setInputVal('');
          return;
        case 'sudo hire-me':
        case 'sudo hire':
          newHistory.push({
            type: 'success',
            text: '[sudo] password for malik: **********\nSUCCESS: Permission granted! Direct link sent: mailto:abdulmaliksadath@gmail.com'
          });
          setTimeout(() => {
            window.location.href = 'mailto:abdulmaliksadath@gmail.com?subject=Opportunity%20Discussion';
          }, 1200);
          break;
        case '':
          break;
        default:
          newHistory.push({
            type: 'error',
            text: `zsh: command not found: ${cmd}. Type 'help' for available commands.`
          });
      }

      setHistory(newHistory);
      setInputVal('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIndex + 1;
        if (nextIdx < commandHistory.length) {
          setHistoryIndex(nextIdx);
          setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
        }
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setInputVal(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputVal('');
      }
    }
  };

  return (
    <>
      {/* Floating CLI Pill trigger in bottom corner */}
      <button
        onClick={() => setIsOpen(true)}
        className="terminal-floating-btn"
        title="Open Terminal (Hotkey: `)"
      >
        <TerminalIcon size={18} />
        <span>CLI [ ~ ]</span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="terminal-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              className={`terminal-window ${isMaximized ? 'maximized' : ''}`}
              initial={{ y: -50, scale: 0.95, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: -30, scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Hyprland / Terminal Window Header */}
              <div className="terminal-header">
                <div className="terminal-title">
                  <TerminalIcon size={16} />
                  <span>malik@arch: ~ (fish)</span>
                </div>
                <div className="terminal-actions">
                  <button onClick={() => setIsMaximized(!isMaximized)} title="Toggle Maximize">
                    {isMaximized ? <Minimize2 size={15} /> : <Maximize2 size={15} />}
                  </button>
                  <button onClick={() => setIsOpen(false)} title="Close (Esc)">
                    <X size={16} />
                  </button>
                </div>
              </div>

              {/* Terminal Body */}
              <div className="terminal-body" onClick={() => inputRef.current?.focus()}>
                {history.map((line, idx) => (
                  <div key={idx} className={`terminal-line line-${line.type}`}>
                    {line.type === 'ascii' ? (
                      <pre className="ascii-art">{line.text}</pre>
                    ) : (
                      <pre className="terminal-text">{line.text}</pre>
                    )}
                  </div>
                ))}

                {/* Prompt Line */}
                <div className="terminal-prompt-line">
                  <span className="prompt-label">malik@arch:~$</span>
                  <input
                    ref={inputRef}
                    type="text"
                    value={inputVal}
                    onChange={(e) => setInputVal(e.target.value)}
                    onKeyDown={handleCommand}
                    className="terminal-input"
                    autoFocus
                    spellCheck="false"
                  />
                </div>
                <div ref={terminalEndRef} />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
