'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import ScrollExpandMedia from '../blocks/scroll-expansion-hero';
import DashboardMock from '../AppMocks/DashboardMock';
import MobileDashboardMock from '../AppMocks/MobileDashboardMock';

type ThemeType = 'light' | 'dark';

type WelcomeProps = {
  theme: ThemeType;
};

export default function Welcome({ theme }: WelcomeProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const updateIsMobile = () => setIsMobile(window.innerWidth < 768);
    updateIsMobile();
    window.addEventListener('resize', updateIsMobile);
    return () => window.removeEventListener('resize', updateIsMobile);
  }, []);

  if (!isMounted) {
    return null;
  }

  const videoSrc = theme === 'dark' ? '/dark/darkbd-video.mp4' : '/light/lightbg-video.mp4';
  const posterSrc = theme === 'dark' ? '/dark/darkbg.png' : '/light/lightbg.png';
  const bgImageSrc = posterSrc;

  // Mobile: render simple, non-animated layout for performance
  if (isMobile) {
    return (
      <div style={{ position: 'relative', width: '100%' }}>
        <div
          style={{
            color: 'var(--foreground)',
            textAlign: 'left',
            maxWidth: '1100px',
            padding: '16px 20px',
            paddingTop: '32px',
            margin: '0 auto'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <Image
              src={'/logo/2.svg'}
              alt="Ocally logo"
              width={140}
              height={140}
              style={{ width: 'min(50vw, 140px)', height: 'auto' }}
              priority
            />
          </div>
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontSize: 'clamp(28px, 5vw, 48px)',
              textDecorationLine: 'underline',
              textDecorationColor: 'currentColor',
              textDecorationThickness: '2px',
              textUnderlineOffset: '6px',
            }}
          >
            Meet Ocally - AI growth team for mainstreet businesses
          </h2>
          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: '16px',
              opacity: 0.92,
              lineHeight: 1.6,
            }}
          >
            Successful retail chains and brands grow with always-on tactics that keep them top of mind and help them thrive. This requires large teams and large budgets which is not always financially viable or scalable for mainstreet businesses. Ocally connects to your existing tools (like POS, online platforms, and CRMs) and deploys an AI growth team that works 24/7 to spot opportunities, surface alerts, and guide execution so running your business feels simple.
          </p>
        </div>

        {/* Background video container with overlayed mobile dashboard mock */}
        <div style={{ position: 'relative', width: '100%', padding: '0 20px', margin: '12px 0 0 0' }}>
          <div style={{ position: 'relative', width: '100%', height: '60vh', minHeight: 380, borderRadius: 12, overflow: 'hidden' }}>
            <video
              src={videoSrc}
              poster={posterSrc}
              autoPlay
              muted
              loop
              playsInline
              preload='auto'
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.35) 100%)' }} />

            <div
              style={{
                position: 'relative',
                zIndex: 1,
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px',
              }}
            >
              <div style={{ width: '100%', maxWidth: 520, height: '100%', maxHeight: '100%' }}>
                <MobileDashboardMock embedded />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <ScrollExpandMedia
        mediaType="video"
        mediaSrc={videoSrc}
        posterSrc={posterSrc}
        bgImageSrc={bgImageSrc}
        title=""
        scrollToExpand="Discover your super power"
        textBlend={false}
        topTextContent={(
          <div
            style={{
              color: 'var(--foreground)',
              textAlign: 'left',
              maxWidth: '1100px',
              padding: 0,
              paddingTop: 'clamp(16px, 4vh, 56px)',
            }}
          >
            <h2
              style={{
                margin: 0,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                fontSize: 'clamp(28px, 5vw, 48px)',
                textDecorationLine: 'underline',
                textDecorationColor: 'currentColor',
                textDecorationThickness: '2px',
                textUnderlineOffset: '6px',
              }}
            >
              Meet Ocally - AI growth team for mainstreet businesses
            </h2>
            <p
              style={{
                margin: '8px 0 0 0',
                fontSize: 'clamp(14px, 1.8vw, 18px)',
                opacity: 0.92,
                lineHeight: 1.55,
              }}
            >
            Successful retail chains and brands grow with always-on tactics that keep them top of mind and help them thrive. This requires large teams and large budgets which is not always financially viable or scalable for mainstreet businesses. Ocally connects to your existing tools (like POS, online platforms, and CRMs) and deploys an AI growth team that works 24/7 to spot opportunities, surface alerts, and guide execution so running your business feels simple.
            </p>
          </div>
        )}
        overlayContent={
          <div className="welcome-glass-container" style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            overflow: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
              <div style={{
                position: 'relative',
                width: '100%',
                height: '100%',
                maxWidth: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <div style={{
                  width: '100%',
                  maxWidth: '1100px',
                  padding: '0 24px',
                }}>
                  <DashboardMock />
                </div>
              </div>
          </div>
        }
      >
        {/* No additional content below the video */}
      </ScrollExpandMedia>
    </div>
  );
}

