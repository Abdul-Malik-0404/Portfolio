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

const PACMAN_PACKAGES = [
  {
    name: 'hyprland',
    aliases: ['hypr', 'wm'],
    version: '0.45.2-1',
    repo: 'extra',
    groups: 'wayland-compositors',
    description: 'A dynamic tiling Wayland compositor based on wlroots that does not sacrifice on its looks',
    url: 'https://hyprland.org',
    licenses: 'BSD-3-Clause',
    depends: 'libdisplay-info  wlroots  wayland-protocols  cairo  pango  pixman  xorg-xwayland',
    requiredBy: 'malik-portfolio  waybar  xdg-desktop-portal-hyprland',
    size: '54.82 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'sfugue-git',
    aliases: ['sfugue', 'fyp'],
    version: '0.9.4.r82.g4c1f9a-1',
    repo: 'local/aur',
    groups: 'distributed-systems  webrtc',
    description: 'Proactive Stateful Session Evacuation & SFrame E2EE Failover Benchmarking for Distributed WebRTC SFUs',
    url: 'https://github.com/Abdul-Malik-0404/sfugue',
    licenses: 'MIT',
    depends: 'nodejs  typescript  mediasoup  apache-kafka  kubernetes  prometheus  chaos-mesh',
    requiredBy: 'None',
    size: '142.40 MiB',
    reason: 'Explicitly installed',
    foreign: true,
  },
  {
    name: 'python',
    aliases: ['python3', 'py'],
    version: '3.12.7-1',
    repo: 'core',
    groups: 'languages',
    description: 'The Python programming language — core runtime for AI, ML, and backend microservices',
    url: 'https://www.python.org/',
    licenses: 'PSF-2.0',
    depends: 'bzip2  expat  gdbm  libffi  libnsl  libxcrypt  openssl  zlib',
    requiredBy: 'fastapi  python-pandas  python-numpy  python-scikit-learn  python-matplotlib',
    size: '78.40 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'typescript',
    aliases: ['ts', 'tsc'],
    version: '5.6.3-1',
    repo: 'extra',
    groups: 'languages',
    description: 'JavaScript with syntax for types — used across sfugue, Zawj, and All-rounder',
    url: 'https://www.typescriptlang.org/',
    licenses: 'Apache-2.0',
    depends: 'nodejs',
    requiredBy: 'sfugue-git  nextjs',
    size: '36.15 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'kotlin',
    aliases: ['kt'],
    version: '2.0.21-1',
    repo: 'extra',
    groups: 'languages',
    description: 'Modern statically typed programming language targeting JVM and Android (Zawj)',
    url: 'https://kotlinlang.org/',
    licenses: 'Apache-2.0',
    depends: 'java-runtime',
    requiredBy: 'android-studio',
    size: '84.10 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'nodejs',
    aliases: ['node', 'javascript', 'js'],
    version: '22.11.0-1',
    repo: 'extra',
    groups: 'languages  cloud-backend-rt',
    description: 'Evented I/O for V8 JavaScript runtime',
    url: 'https://nodejs.org/',
    licenses: 'MIT',
    depends: 'openssl  zlib  icu  libuv  c-ares  libnghttp2',
    requiredBy: 'typescript  nextjs  expressjs  mediasoup  sfugue-git',
    size: '59.30 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'gcc',
    aliases: ['cpp', 'c++', 'g++'],
    version: '14.2.1+r134-1',
    repo: 'core',
    groups: 'languages  base-devel',
    description: 'The GNU Compiler Collection — C and C++ frontends for native Mediasoup workers',
    url: 'https://gcc.gnu.org',
    licenses: 'GPL-3.0-with-GCC-exception',
    depends: 'gcc-libs  binutils  libmpc  zstd',
    requiredBy: 'mediasoup',
    size: '198.50 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'jdk-openjdk',
    aliases: ['java', 'openjdk'],
    version: '21.0.5.u11-1',
    repo: 'extra',
    groups: 'languages',
    description: 'OpenJDK Java 21 development kit',
    url: 'https://openjdk.java.net/',
    licenses: 'GPL-2.0-only',
    depends: 'java-runtime-common  ca-certificates-utils  nss',
    requiredBy: 'kotlin  intellij-idea',
    size: '312.00 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'dotnet-sdk',
    aliases: ['csharp', 'c#', 'dotnet'],
    version: '8.0.403-1',
    repo: 'extra',
    groups: 'languages',
    description: 'The .NET Core SDK and C# compiler toolchain',
    url: 'https://dotnet.microsoft.com',
    licenses: 'MIT',
    depends: 'dotnet-runtime  glibc  icu  krb5  libunwind  openssl  zlib',
    requiredBy: 'None',
    size: '245.10 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'mediasoup',
    aliases: ['webrtc', 'sframe'],
    version: '3.14.12-1',
    repo: 'local/aur',
    groups: 'cloud-backend-rt',
    description: 'Cutting-edge WebRTC Selective Forwarding Unit (SFU) with C++ media workers and SFrame E2EE',
    url: 'https://mediasoup.org',
    licenses: 'ISC',
    depends: 'nodejs  gcc  openssl  libsrtp',
    requiredBy: 'sfugue-git',
    size: '64.20 MiB',
    reason: 'Installed as a dependency for another package',
    foreign: true,
  },
  {
    name: 'fastapi',
    aliases: ['python-fastapi'],
    version: '0.115.4-1',
    repo: 'extra',
    groups: 'cloud-backend-rt',
    description: 'High-performance async Python web framework for building ML & REST APIs (Jeb, All-rounder)',
    url: 'https://fastapi.tiangolo.com/',
    licenses: 'MIT',
    depends: 'python  python-pydantic  python-starlette  uvicorn',
    requiredBy: 'None',
    size: '12.80 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'nextjs',
    aliases: ['next', 'next.js'],
    version: '16.2.1-1',
    repo: 'extra',
    groups: 'cloud-backend-rt',
    description: 'The React Framework for the Web — powering this Hyprland portfolio and All-rounder',
    url: 'https://nextjs.org',
    licenses: 'MIT',
    depends: 'nodejs  typescript',
    requiredBy: 'malik-portfolio',
    size: '92.40 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'apache-kafka',
    aliases: ['kafka'],
    version: '3.8.1-1',
    repo: 'extra',
    groups: 'cloud-backend-rt',
    description: 'Distributed event streaming platform used for sfugue proactive SFU session evacuation',
    url: 'https://kafka.apache.org/',
    licenses: 'Apache-2.0',
    depends: 'jdk-openjdk  zookeeper',
    requiredBy: 'sfugue-git',
    size: '118.60 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'postgresql',
    aliases: ['postgres', 'psql'],
    version: '16.4-2',
    repo: 'extra',
    groups: 'cloud-backend-rt',
    description: 'Sophisticated object-relational DBMS (Zawj, All-rounder)',
    url: 'https://www.postgresql.org/',
    licenses: 'PostgreSQL',
    depends: 'krb5  libxml2  openssl  pam  icu  readline  zlib  zstd',
    requiredBy: 'None',
    size: '68.90 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'kubernetes',
    aliases: ['kubectl', 'kind', 'k8s'],
    version: '1.31.2-1',
    repo: 'extra',
    groups: 'devops',
    description: 'Production-Grade Container Scheduling and Management (KinD cluster orchestration for sfugue)',
    url: 'https://kubernetes.io/',
    licenses: 'Apache-2.0',
    depends: 'containerd  cni-plugins  ethtool  iptables  socat  conntrack-tools',
    requiredBy: 'chaos-mesh  sfugue-git',
    size: '164.00 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'docker',
    aliases: ['containerd', 'dockerfile'],
    version: '1:27.3.1-1',
    repo: 'extra',
    groups: 'devops',
    description: 'Pack, ship and run any application as a lightweight container',
    url: 'https://www.docker.com/',
    licenses: 'Apache-2.0',
    depends: 'containerd  runc  libseccomp  iptables  bridge-utils',
    requiredBy: 'kubernetes  sfugue-git',
    size: '132.75 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'chaos-mesh',
    aliases: ['chaos'],
    version: '2.7.0-1',
    repo: 'local/aur',
    groups: 'devops',
    description: 'Cloud-native Chaos Engineering platform for Kubernetes fault injection in sfugue',
    url: 'https://chaos-mesh.org/',
    licenses: 'Apache-2.0',
    depends: 'kubernetes  docker  iproute2  iptables',
    requiredBy: 'sfugue-git',
    size: '74.30 MiB',
    reason: 'Explicitly installed',
    foreign: true,
  },
  {
    name: 'prometheus',
    aliases: ['prom'],
    version: '2.55.0-1',
    repo: 'extra',
    groups: 'devops',
    description: 'Systems and service monitoring toolkit scraping sub-minute SFU worker telemetry',
    url: 'https://prometheus.io',
    licenses: 'Apache-2.0',
    depends: 'glibc',
    requiredBy: 'sfugue-git',
    size: '114.20 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'neovim',
    aliases: ['nvim', 'vim'],
    version: '0.10.2-2',
    repo: 'extra',
    groups: 'devops  editors',
    description: 'Vim-fork focused on extensibility and usability — primary modal code editor',
    url: 'https://neovim.io',
    licenses: 'Apache-2.0  Vim',
    depends: 'libluv  libtermkey  libvterm  luajit  msgpack-c  tree-sitter  unibilium',
    requiredBy: 'malik-dotfiles',
    size: '28.90 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'linux-zen',
    aliases: ['linux', 'arch', 'kernel'],
    version: '6.12.1.zen1-1',
    repo: 'core',
    groups: 'base',
    description: 'The Linux ZEN kernel and modules — tuned for interactive desktop & low-latency networking',
    url: 'https://github.com/zen-kernel/zen-kernel',
    licenses: 'GPL-2.0-only',
    depends: 'coreutils  initramfs  kmod',
    requiredBy: 'base',
    size: '140.65 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'python-scikit-learn',
    aliases: ['scikit-learn', 'sklearn', 'ml'],
    version: '1.5.2-1',
    repo: 'extra',
    groups: 'data-science',
    description: 'A set of python modules for machine learning and data mining',
    url: 'https://scikit-learn.org/',
    licenses: 'BSD-3-Clause',
    depends: 'python  python-numpy  python-scipy  python-joblib  python-threadpoolctl',
    requiredBy: 'None',
    size: '46.20 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
  {
    name: 'python-pandas',
    aliases: ['pandas'],
    version: '2.2.3-1',
    repo: 'extra',
    groups: 'data-science',
    description: 'High-performance, easy-to-use data structures and data analysis tools for Python',
    url: 'https://pandas.pydata.org/',
    licenses: 'BSD-3-Clause',
    depends: 'python  python-numpy  python-dateutil  python-pytz',
    requiredBy: 'None',
    size: '88.15 MiB',
    reason: 'Explicitly installed',
    foreign: false,
  },
];

function findPackage(queryName) {
  const lower = queryName.toLowerCase();
  return PACMAN_PACKAGES.find(
    (p) => p.name.toLowerCase() === lower || p.aliases.includes(lower)
  );
}

function formatPacmanQi(pkg) {
  return [
    `Name            : ${pkg.name}`,
    `Version         : ${pkg.version}`,
    `Description     : ${pkg.description}`,
    `Architecture    : x86_64`,
    `URL             : ${pkg.url}`,
    `Licenses        : ${pkg.licenses}`,
    `Groups          : ${pkg.groups}`,
    `Provides        : ${pkg.name}=${pkg.version.split('-')[0]}`,
    `Depends On      : ${pkg.depends}`,
    `Optional Deps   : None`,
    `Required By     : ${pkg.requiredBy}`,
    `Optional For    : None`,
    `Conflicts With  : None`,
    `Replaces        : None`,
    `Installed Size  : ${pkg.size}`,
    `Packager        : Abdul Malik <abdulmaliksadath@gmail.com>`,
    `Build Date      : Wed 22 Oct 2026 09:42:10 PM +0530`,
    `Install Date    : Thu 23 Oct 2026 12:15:04 AM +0530`,
    `Install Reason  : ${pkg.reason}`,
    `Install Script  : No`,
    `Validated By    : SHA-256 Sum  PGP Signature`,
  ].join('\n');
}

function handlePacmanCommand(rawArgs) {
  const args = rawArgs.filter(Boolean);
  if (args.length === 0) {
    return {
      type: 'error',
      text: 'error: no operation specified (use -h for help)',
    };
  }

  const flags = args.filter((a) => a.startsWith('-'));
  const targets = args.filter((a) => !a.startsWith('-'));
  const flagStr = flags.join(' ');

  // Check for install / sync / upgrade operations (-S, -Sy, -Syu, -U, --sync, --upgrade, install)
  const isInstallOp =
    flags.some(
      (f) =>
        /^-[a-zA-Z]*[SU]/.test(f) ||
        f === '--sync' ||
        f === '--upgrade'
    ) || args[0]?.toLowerCase() === 'install';

  if (isInstallOp) {
    return {
      type: 'error',
      text: 'error: installing packages has been disabled for security purposes.',
    };
  }

  // Check for remove / database / files / deptest operations (-R, -D, -F, -T)
  const isOtherMutatingOrNonQueryOp = flags.some(
    (f) =>
      /^-[a-zA-Z]*[RDFT]/.test(f) ||
      ['--remove', '--database', '--files', '--deptest'].includes(f)
  );

  if (isOtherMutatingOrNonQueryOp) {
    return {
      type: 'error',
      text: 'error: package modification commands are disabled for security purposes. Only query (-Q) commands are permitted.',
    };
  }

  // Version flag (-V or --version)
  if (flags.includes('-V') || flags.includes('--version')) {
    return {
      type: 'ascii',
      text: ` .--.                  Pacman v6.1.0 - libalpm v14.0.0
/ _.-' .-.  .-.  .-.   Copyright (C) 2006-2024 Pacman Development Team
\\  '-. '-'  '-'  '-'   Copyright (C) 2002-2006 Judd Vinet
 '--'                  This program may be freely redistributed under
                       the terms of the GNU General Public License.`,
    };
  }

  // Help flag (-h or --help)
  if (flags.includes('-h') || flags.includes('--help')) {
    return {
      type: 'output',
      text: `usage:  pacman <operation> [...]
operations:
    pacman {-h --help}
    pacman {-V --version}
    pacman {-Q --query}   [options] [package(s)]

query options:
  -Q               list all installed packages
  -Qi [pkg]        view detailed package information
  -Qs <regex>      search locally-installed packages
  -Ql [pkg]        list files owned by the queried package
  -Qe              list explicitly installed packages
  -Qm              list foreign (AUR/local) packages
  -Qn              list native (core/extra) packages`,
    };
  }

  // Must be a Query operation (-Q / --query)
  const isQueryOp = flags.some(
    (f) => /^-[a-zA-Z]*Q/.test(f) || f === '--query'
  );

  if (!isQueryOp) {
    return {
      type: 'error',
      text: `error: invalid option '${flagStr || args[0]}'. Only query (-Q) commands are permitted.`,
    };
  }

  // Parse query sub-options from short flags (e.g. -Qi, -Qs, -Ql, -Qe, -Qm, -Qn, -Qq, -Qu, -Qk)
  const shortLetters = flags
    .filter((f) => f.startsWith('-') && !f.startsWith('--'))
    .map((f) => f.slice(1))
    .join('');

  const hasInfo = shortLetters.includes('i') || flags.includes('--info');
  const hasSearch = shortLetters.includes('s') || flags.includes('--search');
  const hasList = shortLetters.includes('l') || flags.includes('--list');
  const hasExplicit = shortLetters.includes('e') || flags.includes('--explicit');
  const hasForeign = shortLetters.includes('m') || flags.includes('--foreign');
  const hasNative = shortLetters.includes('n') || flags.includes('--native');
  const hasQuiet = shortLetters.includes('q') || flags.includes('--quiet');
  const hasUpgrades = shortLetters.includes('u') || flags.includes('--upgrades');
  const hasCheck = shortLetters.includes('k') || flags.includes('--check');

  if (hasUpgrades) {
    return {
      type: 'output',
      text: ':: 0 packages can be upgraded. System is up to date.',
    };
  }

  // Filter base list by -e / -m / -n
  let pool = [...PACMAN_PACKAGES];
  if (hasExplicit) {
    pool = pool.filter((p) => p.reason === 'Explicitly installed');
  }
  if (hasForeign) {
    pool = pool.filter((p) => p.foreign);
  }
  if (hasNative) {
    pool = pool.filter((p) => !p.foreign);
  }

  // Search (-Qs)
  if (hasSearch) {
    const query = targets.join(' ').toLowerCase();
    const matched = query
      ? pool.filter(
          (p) =>
            p.name.toLowerCase().includes(query) ||
            p.description.toLowerCase().includes(query) ||
            p.groups.toLowerCase().includes(query) ||
            p.aliases.some((a) => a.includes(query))
        )
      : pool;

    if (matched.length === 0) {
      return { type: 'output', text: '' };
    }
    return {
      type: 'output',
      text: matched
        .map((p) =>
          hasQuiet
            ? p.name
            : `local/${p.name} ${p.version} (${p.groups})\n    ${p.description}`
        )
        .join('\n'),
    };
  }

  // If specific package targets were passed (e.g., pacman -Qi hyprland sfugue)
  if (targets.length > 0) {
    const outBlocks = [];
    let hadError = false;

    for (const target of targets) {
      const pkg = findPackage(target);
      if (!pkg) {
        outBlocks.push(`error: package '${target}' was not found`);
        hadError = true;
      } else if (hasInfo) {
        outBlocks.push(formatPacmanQi(pkg));
      } else if (hasList) {
        outBlocks.push(
          [
            `${pkg.name} /usr/`,
            `${pkg.name} /usr/bin/${pkg.name}`,
            `${pkg.name} /usr/lib/${pkg.name}/lib${pkg.name}.so`,
            `${pkg.name} /usr/share/doc/${pkg.name}/README.md`,
            `${pkg.name} /usr/share/licenses/${pkg.name}/LICENSE`,
          ].join('\n')
        );
      } else if (hasCheck) {
        outBlocks.push(`${pkg.name}: 38 total files, 0 missing files`);
      } else {
        outBlocks.push(hasQuiet ? pkg.name : `${pkg.name} ${pkg.version}`);
      }
    }

    return {
      type: hadError && outBlocks.length === 1 ? 'error' : 'output',
      text: outBlocks.join('\n\n'),
    };
  }

  // No targets specified (e.g., `pacman -Qi`, `pacman -Q`, `pacman -Ql`, `pacman -Qk`)
  if (hasInfo) {
    return {
      type: 'output',
      text: pool.map((p) => formatPacmanQi(p)).join('\n\n'),
    };
  }

  if (hasList) {
    return {
      type: 'output',
      text: pool
        .map((p) => `${p.name} /usr/bin/${p.name}\n${p.name} /usr/lib/${p.name}/`)
        .join('\n'),
    };
  }

  if (hasCheck) {
    return {
      type: 'output',
      text: pool
        .map((p) => `${p.name}: 38 total files, 0 missing files`)
        .join('\n'),
    };
  }

  // Standard `pacman -Q` / `pacman -Qe` / `pacman -Qm` / `pacman -Qq`
  return {
    type: 'output',
    text: pool
      .map((p) => (hasQuiet ? p.name : `${p.name} ${p.version}`))
      .join('\n'),
  };
}

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
      const tokens = cmd.split(/\s+/);
      const isPacman =
        tokens[0]?.toLowerCase() === 'pacman' ||
        (tokens[0]?.toLowerCase() === 'sudo' &&
          tokens[1]?.toLowerCase() === 'pacman');

      if (isPacman) {
        const pacmanArgs =
          tokens[0].toLowerCase() === 'sudo' ? tokens.slice(2) : tokens.slice(1);
        const res = handlePacmanCommand(pacmanArgs);
        if (res.text) {
          newHistory.push(res);
        }
        setHistory(newHistory);
        setInputVal('');
        return;
      }

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
