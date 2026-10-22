'use client';

import { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Education from '../components/Education';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Blog from '../components/Blog';
import Extra from '../components/Extra';
import { useHyprland, WORKSPACE_LIST } from '../components/HyprlandContext';

const HYPR_SLIDE_BEZIER = [0.05, 0.9, 0.1, 1.05];

const slideVariants = {
  enter: (direction) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0.35,
    scale: 0.96,
  }),
  center: {
    x: 0,
    opacity: 1,
    scale: 1,
  },
  exit: (direction) => ({
    x: direction > 0 ? '-100%' : '100%',
    opacity: 0.35,
    scale: 0.96,
  }),
};

export default function Home() {
  const { activeWorkspace, slideDirection, switchWorkspace } = useHyprland();
  const lastWheelTime = useRef(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  // Scroll wheel switches workspaces horizontally like Hyprland workspace_swipe
  useEffect(() => {
    const handleWheel = (e) => {
      // Don't hijack scroll if terminal overlay or help modal is open
      if (document.querySelector('.terminal-overlay')) return;

      // If scrolling inside an expanded window body that actually has vertical overflow, let it scroll
      const scrollable = e.target.closest('.expanded-scroll-body, .tiled-fit-body');
      if (scrollable && scrollable.scrollHeight > scrollable.clientHeight + 4) {
        const atTop = scrollable.scrollTop <= 0;
        const atBottom =
          scrollable.scrollTop + scrollable.clientHeight >=
          scrollable.scrollHeight - 2;
        if ((e.deltaY < 0 && !atTop) || (e.deltaY > 0 && !atBottom)) {
          return;
        }
      }

      const delta =
        Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(delta) < 18) return;

      const now = Date.now();
      if (now - lastWheelTime.current < 520) return;

      if (delta > 0 && activeWorkspace < WORKSPACE_LIST.length) {
        lastWheelTime.current = now;
        switchWorkspace(activeWorkspace + 1);
      } else if (delta < 0 && activeWorkspace > 1) {
        lastWheelTime.current = now;
        switchWorkspace(activeWorkspace - 1);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: true });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [activeWorkspace, switchWorkspace]);

  // Touch swipe support for mobile/tablet horizontal workspace switching
  useEffect(() => {
    const onTouchStart = (e) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };
    const onTouchEnd = (e) => {
      if (touchStartX.current === null || touchStartY.current === null) return;
      const dx = touchStartX.current - e.changedTouches[0].clientX;
      const dy = touchStartY.current - e.changedTouches[0].clientY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        if (dx > 0 && activeWorkspace < WORKSPACE_LIST.length) {
          switchWorkspace(activeWorkspace + 1);
        } else if (dx < 0 && activeWorkspace > 1) {
          switchWorkspace(activeWorkspace - 1);
        }
      }
      touchStartX.current = null;
      touchStartY.current = null;
    };

    window.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchend', onTouchEnd, { passive: true });
    return () => {
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchend', onTouchEnd);
    };
  }, [activeWorkspace, switchWorkspace]);

  const renderActiveWorkspace = () => {
    switch (activeWorkspace) {
      case 1:
        return <Hero />;
      case 2:
        return <Education />;
      case 3:
        return <Skills />;
      case 4:
        return <Projects />;
      case 5:
        return <Blog />;
      case 6:
        return <Extra />;
      default:
        return <Hero />;
    }
  };

  return (
    <div className="hypr-compositor-viewport">
      <div className="blob blob-1"></div>
      <div className="blob blob-2"></div>

      <Navbar />

      <main className="hypr-compositor-stage">
        <AnimatePresence mode="wait" initial={false} custom={slideDirection}>
          <motion.div
            key={activeWorkspace}
            custom={slideDirection}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{
              x: { duration: 0.42, ease: HYPR_SLIDE_BEZIER },
              opacity: { duration: 0.25 },
              scale: { duration: 0.42, ease: HYPR_SLIDE_BEZIER },
            }}
            className="hypr-workspace-slide-frame"
          >
            {renderActiveWorkspace()}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
