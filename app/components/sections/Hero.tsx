'use client';

import React, { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import DashboardMock from '../AppMocks/DashboardMock';
import Background from '../containers/background';

type ThemeType = 'light' | 'dark';

type HeroProps = {
  theme: ThemeType;
};

// Natural scroll, sticky hero that shrinks and docks under heading text.
export default function Hero({ theme }: HeroProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const stickyRef = useRef<HTMLDivElement | null>(null);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const videoSrc = theme === 'dark' ? '/dark/darkbd-video.mp4' : '/light/lightbg-video.mp4';
  const posterSrc = theme === 'dark' ? '/dark/darkbg.png' : '/light/lightbg.png';

  // Manual scroll progress (0..1) based on the main scroll area '#sections-container'
  const progress = useMotionValue(0);
  useEffect(() => {
    const section = containerRef.current;
    if (!section) return;

    const getScrollParent = (node: HTMLElement | null): HTMLElement | Window => {
      let current: HTMLElement | null = node?.parentElement || null;
      while (current && current !== document.body) {
        const style = window.getComputedStyle(current);
        const oy = style.overflowY;
        if (oy === 'auto' || oy === 'scroll') return current;
        current = current.parentElement;
      }
      const byId = document.getElementById('sections-container');
      if (byId) return byId;
      return window;
    };

    // Prefer the known app scroll container if present
    const explicitContainer = document.getElementById('sections-container');
    const scrollTarget: HTMLElement | Window = explicitContainer || getScrollParent(section);

    const compute = () => {
      const isWin = scrollTarget === window;
      const viewport = isWin ? window.innerHeight : (scrollTarget as HTMLElement).clientHeight;
      const scrollTop = isWin ? window.scrollY : (scrollTarget as HTMLElement).scrollTop;
      const parentRect = isWin ? { top: 0 } : (scrollTarget as HTMLElement).getBoundingClientRect();
      const sectionRect = section.getBoundingClientRect();
      const sectionTop = sectionRect.top - parentRect.top + scrollTop;
      const sectionHeight = section.offsetHeight;
      const start = sectionTop;
      const end = start + sectionHeight - viewport;
      const range = Math.max(1, end - start);
      const raw = (scrollTop - start) / range;
      const clamped = Math.min(1, Math.max(0, raw));
      progress.set(clamped);
    };

    compute();
    const targetEl = scrollTarget as HTMLElement;
    const add = () => (scrollTarget === window ? window : targetEl).addEventListener('scroll', compute as EventListener, { passive: true } as AddEventListenerOptions);
    const remove = () => (scrollTarget === window ? window : targetEl).removeEventListener('scroll', compute as EventListener);
    add();
    window.addEventListener('resize', compute);
    return () => {
      remove();
      window.removeEventListener('resize', compute);
    };
  }, [progress]);

  // Overlay (glass box) fades out over first 10%
  const overlayOpacity = useTransform(progress, [0, 0.1], [1, 0]);

  // Heading fades in starting shortly after overlay begins to fade
  const headingOpacity = useTransform(progress, [0.05, 0.25], [0, 1]);
  const headingY = useTransform(progress, [0.05, 0.25], [16, 0]);

  // Video card transforms: start full-screen-ish, dock responsively
  // Scale from 1 to ~0.68 on desktop; a bit larger on mobile
  const scale = useTransform(progress, [0, 1], [1, 0.68]);
  // Border radius increases as it docks
  const radius = useTransform(progress, [0, 1], [0, 16]);
  // A subtle downward translation as it docks to make room for heading
  const translateY = useTransform(progress, [0, 1], [0, 24]);

  // Dashboard overlay appears slightly before fully docked
  const dashboardOpacity = useTransform(progress, [0.8, 0.95], [0, 1]);
  const dashboardScale = useTransform(progress, [0.8, 0.95], [0.96, 1]);

  const bgImageSrc = useMemo(() => posterSrc, [posterSrc]);

  if (!isMounted) return null;

  return (
    <section ref={containerRef} style={{ position: 'relative' }}>
      {/* Reserve scroll space: sticky zone + additional space to allow docking transition */}
      <div style={{ height: '220dvh', position: 'relative' }}>
        {/* Sticky viewport layer containing video that shrinks/docks */}
        <div ref={stickyRef} style={{ position: 'sticky', top: 0, height: '100dvh', overflow: 'hidden' }}>
          {/* Animated container that scales/docks the background itself */}
          <motion.div
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              boxShadow: '0px 0px 50px rgba(0,0,0,0.3)',
              overflow: 'hidden',
              borderRadius: radius,
              y: translateY,
              scale,
              transformOrigin: 'top center',
            }}
          >
            <Background theme={theme} variant="contained" />

            {/* Initial glass overlay content (fades by 10%) */}
            <motion.div
              style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '24px',
                opacity: overlayOpacity,
                pointerEvents: 'none',
              }}
            >
              <div style={{
                maxWidth: 720,
                width: '100%',
                background: 'rgba(0,0,0,0.10)',
                backdropFilter: 'blur(12px)',
                borderRadius: 24,
                border: '1px solid rgba(255,255,255,0.12)',
                boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
                color: 'white',
                padding: '28px 30px',
              }}>
                <div className='space-y-6'>
                  {/* Heading */}
                  <div
                    className='text-white/95 text-left'
                    style={{
                      fontFamily: '"Arima", cursive',
                      fontWeight: 600,
                      letterSpacing: '-0.01em',
                      lineHeight: 1.15,
                      fontSize: 'clamp(22px, 3.2vw, 34px)'
                    }}
                  >
                    Dear Mainstreet Business Owner,
                  </div>

                  {/* Thin divider */}
                  <div
                    style={{
                      height: 1,
                      width: '100%',
                      background:
                        'linear-gradient(to right, rgba(255,255,255,0.0), rgba(255,255,255,0.22), rgba(255,255,255,0.0))'
                    }}
                  />

                  {/* Body */}
                  <div className='space-y-4 text-white/95' style={{ fontFamily: '"Mulish", sans-serif' }}>
                    <div
                      className='leading-relaxed'
                      style={{ fontSize: 'clamp(15px, 2.1vw, 19px)' }}
                    >
                      You're working <span className='font-semibold text-white'>80 hours a week</span> while your competitors work <span className='font-semibold text-white'>40</span>.
                    </div>
                    <div
                      className='leading-relaxed'
                      style={{ fontSize: 'clamp(15px, 2.1vw, 19px)' }}
                    >
                      While you're <span className='font-semibold text-white'>stuck in the weeds</span>, they're <span className='font-semibold text-white'>scaling to new locations</span>.
                    </div>

                    {/* Emphasis paragraph with top rule */}
                    <div
                      className='leading-relaxed pt-4 text-white/95'
                      style={{
                        fontSize: 'clamp(15px, 2.1vw, 19px)',
                        borderTop: '1px solid rgba(255,255,255,0.16)'
                      }}
                    >
                      It was never a level playing field—bigger players have more capital, intelligence, and resources.
                    </div>

                    {/* Closing line */}
                    <div
                      className='text-left pt-4 text-white'
                      style={{
                        fontFamily: '"Arima", cursive',
                        fontWeight: 700,
                        letterSpacing: '-0.01em',
                        fontSize: 'clamp(22px, 3vw, 30px)'
                      }}
                    >
                      Ocally changes that.
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Dashboard overlay — appears slightly before fully docked */}
            <motion.div
              style={{
                position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
                padding: '0 24px',
                opacity: dashboardOpacity,
                scale: dashboardScale,
                pointerEvents: 'none',
              }}
            >
              <div style={{ width: '100%', maxWidth: 1100 }}>
                <DashboardMock />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Final inline layout (the target docking area) */}
      <motion.div
        style={{
          opacity: headingOpacity,
          y: headingY,
        }}
      >
        <div style={{
          width: '100%',
          maxWidth: 'min(1100px, calc(100% - 64px))',
          margin: '0 auto',
          padding: '32px 0 0',
        }}>
          <div style={{ color: 'var(--foreground)', textAlign: 'left', maxWidth: 820, filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.12))' }}>
            <h1 style={{
              margin: 0,
              fontFamily: '"Arima", ui-serif, Georgia, Times, serif',
              fontWeight: 600,
              letterSpacing: '-0.02em',
              lineHeight: 1.08,
              fontSize: 'clamp(36px, 7vw, 64px)',
            }}>
              Meet Ocally - AI growth team for mainstreet businesses.
            </h1>
            <div style={{ marginTop: 14 }}>
              <p style={{
                margin: 0,
                fontSize: 'clamp(14px, 2.2vw, 18px)',
                opacity: 0.9,
                lineHeight: 1.55,
                fontFamily: 'var(--font-geist-sans), system-ui, -apple-system, sans-serif',
              }}>
                Big chains are compounding growth with always-on tactics. Competing is no longer optional, but hiring a team to mirror this is not scalable or financially viable. Ocally connects to the tools you already use and deploys specialized agents that work 24/7 to understand your business, surface insights and alerts, and help you execute like a teammate.
              </p>
            </div>
          </div>
        </div>

        {/* Inline docked background container */}
        <div style={{
          width: '100%',
          margin: '18px auto 0',
          maxWidth: 'min(1100px, calc(100% - 32px))',
          borderRadius: 16,
          overflow: 'hidden',
          boxShadow: '0px 0px 40px rgba(0,0,0,0.25)',
        }}>
          <div style={{ position: 'relative', width: '100%', paddingTop: '56.25%' }}>
            <Background theme={theme} variant="contained" />
            {/* When docked, keep DashboardMock rendered above video as the final state */}
            <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
              <div style={{ width: '100%', maxWidth: 1100 }}>
                <DashboardMock />
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}


