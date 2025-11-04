'use client';

import { useState, useEffect, useRef } from 'react';
import { type ThemeType } from "./components/containers/background";
import RibbonNav from "./components/containers/RibbonNav";
import ThemeSwitcher from "./components/containers/ThemeSwitcher";
import ArrowIcon from "./components/containers/ArrowIcon";
import Welcome from "./components/sections/Welcome";
import Product from "./components/sections/Product";
import Meet from "./components/sections/Meet";
import Interact from "./components/sections/Interact";
import Hire from "./components/sections/Hire";
import Learn from "./components/sections/Learn";
import MobileBottomNav from "./components/containers/MobileBottomNav";

export type SectionId = 'welcome' | 'product' | 'meet' | 'interact' | 'hire' | 'learn' | 'gotoapp';

export default function Home() {
  const [activeSection, setActiveSection] = useState<SectionId>('welcome');
  const [theme, setTheme] = useState<ThemeType>('light');
  const [isMounted, setIsMounted] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const transitionTimerRef = useRef<number | null>(null);

  useEffect(() => {
    setIsMounted(true);
    // Set initial theme from root data-theme if present (set in layout),
    // otherwise fall back to system preference.
    const rootTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark' | null;
    if (rootTheme === 'light' || rootTheme === 'dark') {
      setTheme(rootTheme);
    } else {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      setTheme(mediaQuery.matches ? 'dark' : 'light');
    }
  }, []);

  // Scroll detection to update active section
  useEffect(() => {
    if (!isMounted) return;

    const container = document.getElementById('sections-container');
    if (!container) return;

    const handleScroll = () => {
      const sections = ['welcome', 'product', 'meet', 'interact', 'hire', 'learn'] as const;
      const scrollPosition = container.scrollTop + container.clientHeight / 3;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    container.addEventListener('scroll', handleScroll);
    return () => container.removeEventListener('scroll', handleScroll);
  }, [isMounted]);

  const handleNavigate = (sectionId: SectionId) => {
    if (sectionId === 'gotoapp') {
      // Handle Go to App action - you can replace this with actual app URL
      window.open('https://app.ocally.com', '_blank');
      return;
    }
    
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setActiveSection(sectionId);
  };

  const handleChangeTheme = (t: ThemeType) => {
    // start dramatic transition veil
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    setIsTransitioning(true);
    setTheme(t);
    // keep root in sync for deterministic theming
    document.documentElement.setAttribute('data-theme', t);
    transitionTimerRef.current = window.setTimeout(() => {
      setIsTransitioning(false);
      transitionTimerRef.current = null;
    }, 700);
  };

  if (!isMounted) {
    return null;
  }

  return (
    <>
      {/* Theme transition veil */}
      <div className={isTransitioning ? 'theme-transition-veil active' : 'theme-transition-veil'} />

      {/* Background is handled within sections (Hero handles its own contained background) */}

      {/* Left Column: Sidebar (full height) */}
      <aside className="minimal-sidebar">
        <div className="minimal-sidebar__nav">
          <div className="minimal-sidebar__logo">
            <img src="/logo/2.svg" alt="Ocally" className="logo-image" />
          </div>
          <RibbonNav activeSection={activeSection} onNavigate={handleNavigate} />
        </div>
        <div className="minimal-sidebar__bottom">
          <ThemeSwitcher theme={theme} onChangeTheme={handleChangeTheme} />
        </div>
      </aside>


      {/* Right Column, Bottom Row: Scrollable Content */}
      <main className="main-scroll-area" id="sections-container">
        <section id="welcome" className="section-wrapper section-wrapper--fullscreen">
          <Welcome theme={theme} />
        </section>
        <section id="product" className="section-wrapper" style={{ padding: 0, marginTop: 64 }}>
          <Product />
        </section>
        <section id="meet" className="section-wrapper">
          <Meet />
        </section>
        <section id="interact" className="section-wrapper">
          <Interact />
        </section>
        <section id="hire" className="section-wrapper">
          <Hire />
        </section>
        <section id="learn" className="section-wrapper">
          <Learn />
        </section>
      </main>

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav 
        activeSection={activeSection} 
        onNavigate={handleNavigate}
        theme={theme}
        onChangeTheme={handleChangeTheme}
      />
    </>
  );
}
