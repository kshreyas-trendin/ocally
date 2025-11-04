'use client';

import {
  useEffect,
  useRef,
  useState,
  ReactNode,
  TouchEvent,
  WheelEvent,
} from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { GlassCard } from '../GlassComponents/GlassComponents';

interface ScrollExpandMediaProps {
  mediaType?: 'video' | 'image';
  mediaSrc: string;
  posterSrc?: string;
  bgImageSrc: string;
  title?: string;
  date?: string;
  scrollToExpand?: string;
  textBlend?: boolean;
  children?: ReactNode;
  overlayContent?: ReactNode;
  topTextContent?: ReactNode;
}

const ScrollExpandMedia = ({
  mediaType = 'video',
  mediaSrc,
  posterSrc,
  bgImageSrc,
  title,
  date,
  scrollToExpand,
  textBlend,
  children,
  overlayContent,
  topTextContent,
}: ScrollExpandMediaProps) => {
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const [mediaFullyExpanded, setMediaFullyExpanded] = useState<boolean>(false);
  const [expandedLatchActive, setExpandedLatchActive] = useState<boolean>(false);
  const [armedForNextScroll, setArmedForNextScroll] = useState<boolean>(false);
  const [hasEverBeenExpanded, setHasEverBeenExpanded] = useState<boolean>(false);
  const gestureIdleTimerRef = useRef<number | null>(null);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isMobileState, setIsMobileState] = useState<boolean>(false);
  const [isDarkTheme, setIsDarkTheme] = useState<boolean>(false);

  const sectionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setScrollProgress(0);
    setShowContent(false);
    setMediaFullyExpanded(false);
    setExpandedLatchActive(false);
    setArmedForNextScroll(false);
    setHasEverBeenExpanded(false);
    if (gestureIdleTimerRef.current !== null) {
      window.clearTimeout(gestureIdleTimerRef.current);
      gestureIdleTimerRef.current = null;
    }
  }, [mediaType]);

  useEffect(() => {
    if (isMobileState) {
      return;
    }

    const handleWheel = (e: WheelEvent) => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      
      // Check if the section is in viewport
      const isInViewport = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInViewport) {
        return;
      }

      // If fully expanded and scrolling up, prevent collapse (stay expanded)
      if (mediaFullyExpanded && e.deltaY < 0) {
        // Once expanded, prevent collapsing - just allow normal page scroll
        return; // Let the page handle the scroll naturally
      }

      // When at the top state (collapsed) and scrolling further up, allow normal page scroll
      if (!mediaFullyExpanded && scrollProgress <= 0 && e.deltaY < 0) {
        return; // do not prevent default; let container/page handle it
      }

      // If fully expanded and scrolling down, enforce a hard stop until a new gesture
      if (mediaFullyExpanded && e.deltaY > 0) {
        if (expandedLatchActive) {
          if (armedForNextScroll) {
            // release latch on the first new deliberate scroll
            setExpandedLatchActive(false);
            return; // allow normal page scroll
          }
          // absorb current continuous gesture
          e.preventDefault();
          e.stopPropagation();
          setArmedForNextScroll(false);
          if (gestureIdleTimerRef.current !== null) {
            window.clearTimeout(gestureIdleTimerRef.current);
          }
          // arm after a brief inactivity (gesture end)
          gestureIdleTimerRef.current = window.setTimeout(() => {
            setArmedForNextScroll(true);
            gestureIdleTimerRef.current = null;
          }, 180);
          return;
        }
        return; // latch not active, allow normal scroll
      }

      // Intercept scroll for the expansion/collapse effect
      // If already fully expanded once, don't allow collapse
      if (hasEverBeenExpanded && e.deltaY < 0) {
        // Once expanded, stay expanded - allow normal page scroll
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      
      const scrollDelta = e.deltaY * 0.0009;
      const newProgress = Math.min(
        Math.max(scrollProgress + scrollDelta, 0),
        1
      );
      
      // If already fully expanded, keep it at 1
      if (hasEverBeenExpanded) {
        setScrollProgress(1);
        setMediaFullyExpanded(true);
        setShowContent(true);
        return;
      }

      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        setHasEverBeenExpanded(true); // Latch it - never allow collapse again
        // remove latch: allow normal page scroll immediately after full expansion
        setExpandedLatchActive(false);
        setArmedForNextScroll(false);
        if (gestureIdleTimerRef.current !== null) {
          window.clearTimeout(gestureIdleTimerRef.current);
          gestureIdleTimerRef.current = null;
        }
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      if (!sectionRef.current) return;
      
      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (isInViewport) {
        setTouchStartY(e.touches[0].clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!sectionRef.current || !touchStartY) return;

      const section = sectionRef.current;
      const rect = section.getBoundingClientRect();
      const isInViewport = rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2;
      
      if (!isInViewport) return;

      const touchY = e.touches[0].clientY;
      const deltaY = touchStartY - touchY;

      // If fully expanded and swiping down, prevent collapse (stay expanded)
      if (mediaFullyExpanded && deltaY < 0) {
        // Once expanded, prevent collapsing - just allow normal page scroll
        return; // Let the page handle the scroll naturally
      }

      // When at the top state (collapsed) and swiping further down, allow normal scroll
      if (!mediaFullyExpanded && scrollProgress <= 0 && deltaY < 0) {
        return; // let container/page handle it
      }

      // If fully expanded and swiping up, enforce a hard stop until a new gesture
      if (mediaFullyExpanded && deltaY > 0) {
        if (expandedLatchActive) {
          if (armedForNextScroll) {
            setExpandedLatchActive(false);
            return; // allow normal scroll
          }
          e.preventDefault();
          e.stopPropagation();
          setArmedForNextScroll(false);
          if (gestureIdleTimerRef.current !== null) {
            window.clearTimeout(gestureIdleTimerRef.current);
          }
          gestureIdleTimerRef.current = window.setTimeout(() => {
            setArmedForNextScroll(true);
            gestureIdleTimerRef.current = null;
          }, 180);
          return;
        }
        return;
      }

      // If already fully expanded once, don't allow collapse
      if (hasEverBeenExpanded && deltaY < 0) {
        // Once expanded, stay expanded - allow normal page scroll
        return;
      }

      e.preventDefault();
      e.stopPropagation();
      
      const scrollFactor = deltaY < 0 ? 0.008 : 0.005;
      const scrollDelta = deltaY * scrollFactor;
      const newProgress = Math.min(
        Math.max(scrollProgress + scrollDelta, 0),
        1
      );
      
      // If already fully expanded, keep it at 1
      if (hasEverBeenExpanded) {
        setScrollProgress(1);
        setMediaFullyExpanded(true);
        setShowContent(true);
        setTouchStartY(touchY);
        return;
      }

      setScrollProgress(newProgress);

      if (newProgress >= 1) {
        setMediaFullyExpanded(true);
        setShowContent(true);
        setHasEverBeenExpanded(true); // Latch it - never allow collapse again
        // remove latch: allow normal page scroll immediately after full expansion
        setExpandedLatchActive(false);
        setArmedForNextScroll(false);
        if (gestureIdleTimerRef.current !== null) {
          window.clearTimeout(gestureIdleTimerRef.current);
          gestureIdleTimerRef.current = null;
        }
      } else if (newProgress < 0.75) {
        setShowContent(false);
      }

      setTouchStartY(touchY);
    };

    const handleTouchEnd = (): void => {
      setTouchStartY(0);
    };

    // Listen on window for better event capture
    window.addEventListener('wheel', handleWheel as unknown as EventListener, {
      passive: false,
    });
    window.addEventListener(
      'touchstart',
      handleTouchStart as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener(
      'touchmove',
      handleTouchMove as unknown as EventListener,
      { passive: false }
    );
    window.addEventListener('touchend', handleTouchEnd as EventListener);

    return () => {
      window.removeEventListener(
        'wheel',
        handleWheel as unknown as EventListener
      );
      window.removeEventListener(
        'touchstart',
        handleTouchStart as unknown as EventListener
      );
      window.removeEventListener(
        'touchmove',
        handleTouchMove as unknown as EventListener
      );
      window.removeEventListener('touchend', handleTouchEnd as EventListener);
    };
  }, [scrollProgress, mediaFullyExpanded, touchStartY, expandedLatchActive, armedForNextScroll, isMobileState, hasEverBeenExpanded]);

  // Ensure scrollProgress stays at 1 once fully expanded
  useEffect(() => {
    if (hasEverBeenExpanded && scrollProgress < 1) {
      setScrollProgress(1);
      setMediaFullyExpanded(true);
      setShowContent(true);
    }
  }, [hasEverBeenExpanded, scrollProgress]);

  useEffect(() => {
    return () => {
      if (gestureIdleTimerRef.current !== null) {
        window.clearTimeout(gestureIdleTimerRef.current);
        gestureIdleTimerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    const checkIfMobile = (): void => {
      setIsMobileState(window.innerWidth < 768);
    };

    checkIfMobile();
    window.addEventListener('resize', checkIfMobile);

    return () => window.removeEventListener('resize', checkIfMobile);
  }, []);

  useEffect(() => {
    const updateTheme = () => {
      const t = document.documentElement.getAttribute('data-theme');
      setIsDarkTheme(t === 'dark');
    };
    updateTheme();
    const obs = new MutationObserver(updateTheme);
    obs.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });
    return () => obs.disconnect();
  }, []);

  // Calculate expansion based on viewport, but constrained to 95% max to stay within bounds
  const maxWidthVw = isMobileState ? 90 : 92; // Max 92vw on desktop, 90vw on mobile
  const maxHeightVh = isMobileState ? 75 : 85; // Max 85vh on desktop, 75vh on mobile
  
  const startWidth = 300;
  const startHeight = 400;
  
  // Use viewport units for expansion to stay within container bounds
  // Start smaller and more hidden for smoother transition
  const mediaWidth = Math.max(0, startWidth - 100 + scrollProgress * (isMobileState ? 750 : 1200));
  const mediaHeight = Math.max(0, startHeight - 100 + scrollProgress * (isMobileState ? 300 : 450));
  const textTranslateX = scrollProgress * (isMobileState ? 180 : 150);

  const firstWord = title ? title.split(' ')[0] : '';
  const restOfTitle = title ? title.split(' ').slice(1).join(' ') : '';

  // Mobile: render static, responsive layout without animations or gesture handling
  if (isMobileState) {
    return (
      <div
        ref={sectionRef}
        className='transition-colors duration-700 ease-in-out overflow-hidden'
        style={{ position: 'relative', width: '100%' }}
      >
        <section className='relative flex flex-col items-center justify-start overflow-hidden'>
          {topTextContent && (
            <div className='w-full z-30' style={{ position: 'sticky', top: 18 }}>
              <div style={{ width: '100%', maxWidth: 'calc(100% - 40px)', margin: '0 auto' }}>{topTextContent}</div>
            </div>
          )}

          <div className='relative w-full' style={{ padding: '0 20px', marginTop: topTextContent ? 12 : 0 }}>
            <div
              className='relative rounded-2xl shadow-lg'
              style={{
                width: '100%',
                overflow: 'hidden',
                maxHeight: `calc(100vh - 96px)`,
              }}
            >
              {mediaType === 'video' ? (
                mediaSrc.includes('youtube.com') ? (
                  <div className='relative w-full h-full'>
                    <iframe
                      width='100%'
                      height='100%'
                      src={
                        mediaSrc.includes('embed')
                          ? mediaSrc +
                            (mediaSrc.includes('?') ? '&' : '?') +
                            'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                          : mediaSrc.replace('watch?v=', 'embed/') +
                            '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                            mediaSrc.split('v=')[1]
                      }
                      className='w-full h-full rounded-xl'
                      frameBorder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <div className='relative w-full h-full'>
                    <video
                      src={mediaSrc}
                      poster={posterSrc}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload='auto'
                      className='w-full h-full object-cover rounded-xl'
                    />
                  </div>
                )
              ) : (
                <div className='relative w-full h-full'>
                  <Image
                    src={mediaSrc}
                    alt={title || 'Media content'}
                    width={1280}
                    height={720}
                    className='w-full h-full object-cover rounded-xl'
                  />
                </div>
              )}

              {overlayContent && (
                <div
                  className='absolute inset-0 flex items-center justify-center z-20'
                  style={{ padding: '24px' }}
                >
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      paddingBottom: '72px',
                    }}
                  >
                    {overlayContent}
                  </div>
                </div>
              )}
            </div>
          </div>

          {children && (
            <section className='flex flex-col w-full px-6 py-8'>
              {children}
            </section>
          )}
        </section>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className='transition-colors duration-700 ease-in-out overflow-hidden'
      style={{ position: 'relative', width: '100%' }}
    >
      <section className='relative flex flex-col items-center justify-start overflow-hidden'>
        <div className='relative w-full flex flex-col items-center overflow-hidden' style={{ maxWidth: '100%' }}>
          {topTextContent && (
            <motion.div
              className='w-full'
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: scrollProgress >= 0.85 ? 1 : 0, y: scrollProgress >= 0.85 ? 0 : -10 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              style={{
                position: 'relative',
                pointerEvents: scrollProgress >= 0.85 ? 'auto' : 'none',
                marginBottom: isMobileState ? 8 : 12,
                paddingTop: isMobileState ? 24 : 72,
                background: 'transparent',
              }}
            >
              <div style={{
                width: '100%',
                maxWidth: 'calc(100% - 64px)',
                margin: '0 auto',
              }}>
                {topTextContent}
                <div
                  style={{
                    width: '100%',
                    height: 1,
                    background: 'currentColor',
                    opacity: isDarkTheme ? 0.18 : 0.14,
                    marginTop: isMobileState ? 16 : 24,
                    marginBottom: isMobileState ? 18 : 28,
                  }}
                />
              </div>
            </motion.div>
          )}
          <motion.div
            className='absolute inset-0 z-0 h-full'
            initial={{ opacity: 0.6 }}
            animate={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
            transition={{ duration: 0.15 }}
          >
            <Image
              src={bgImageSrc}
              alt='Background'
              width={1920}
              height={1080}
              className='w-screen h-screen'
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
          {/* Glass underlay directly over the image (fades out with the image) */}
          <motion.div
            className='absolute inset-0'
            initial={{ opacity: 0.6 }}
            animate={{ opacity: Math.max(0, 1 - scrollProgress * 2) }}
            transition={{ duration: 0.15 }}
            style={{
              pointerEvents: 'none',
              backdropFilter: 'blur(12px) saturate(140%)',
              WebkitBackdropFilter: 'blur(12px) saturate(140%)',
              background: isDarkTheme ? 'rgba(0,0,0,0.15)' : 'rgba(255,255,255,0.12)',
            }}
          />
          </motion.div>

        {/* Intro Card in normal flow; unmount when hidden to avoid taking space */}
        {scrollProgress < 0.1 && (
          <motion.div
            className='relative z-10 w-full flex justify-center'
            initial={{ opacity: 1 }}
            animate={{ opacity: Math.max(0, 1 - scrollProgress * 6) }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            style={{ marginTop: isMobileState ? 8 : 16, marginBottom: isMobileState ? 8 : 16 }}
          >
            <div style={{ maxWidth: 720, width: '100%', padding: isMobileState ? '16px' : '24px' }}>
              <GlassCard
                variant={isDarkTheme ? 'dark' : 'frosted'}
                style={{ color: isDarkTheme ? 'rgba(255,255,255,0.95)' : 'rgba(0,0,0,0.95)', padding: isMobileState ? '16px 18px' : '24px 28px' }}
              >
              <div className='space-y-4'>
                {/* Title row with alert icon */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <div style={{
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    display: 'grid',
                    placeItems: 'center',
                    background: isDarkTheme ? 'rgba(255,255,255,0.12)' : 'rgba(0,0,0,0.07)'
                  }}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
                      <line x1="12" y1="9" x2="12" y2="13"/>
                      <line x1="12" y1="17" x2="12.01" y2="17"/>
                    </svg>
                  </div>
                  <div className='text-xl font-semibold' style={{ fontFamily: '"Arima", cursive' }}>
                    Dear Main Street Owners: Stop leaving money on the table.
                  </div>
                </div>

                {/* Original intro copy (no product mention here) */}
                <div className='space-y-3' style={{ fontFamily: '"Mulish", sans-serif' }}>
                  <div className='leading-relaxed'>
                    You work <span className='font-semibold'>80 hours</span>. They have a team of  <span className='font-semibold'>80</span> and their business is booming!.
                  </div>
                  <div className='leading-relaxed'>
                    You're <span className='font-semibold'>stuck in the weeds</span>, fighting fires. They're analysing dashboards and <span className='font-semibold'>opening their next location</span>.
                  </div>
                  <div className='leading-relaxed pt-4' style={{ borderTop: isDarkTheme ? '1px solid rgba(255,255,255,0.2)' : '1px solid rgba(0,0,0,0.15)' }}>
                    The game was never fair. Capital, data, and leverage flowed to the big guys.
                    <div
                      className='mt-2 text-[15px] sm:text-base font-semibold tracking-wide'
                      style={{
                        fontFamily: '"Arima", var(--font-geist-sans), system-ui, -apple-system, sans-serif'
                      }}
                    >
                      Ocally changes that!
                    </div>
                  </div>
                </div>
                {scrollToExpand && (
                  <motion.div
                    className='flex flex-col items-center justify-center'
                    initial={{ y: 0 }}
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}
                    aria-hidden='true'
                    style={{ paddingTop: 8, color: 'var(--foreground)' }}
                  >
                    <div
                      style={{
                        fontSize: isMobileState ? 12 : 13,
                        marginBottom: 6,
                        letterSpacing: 0.2,
                        textTransform: 'uppercase',
                        textAlign: 'center',
                        textShadow: '0 2px 10px rgba(0,0,0,0.35)'
                      }}
                    >
                      {scrollToExpand}
                    </div>
                    <svg
                      width={isMobileState ? 26 : 30}
                      height={isMobileState ? 26 : 30}
                      viewBox='0 0 24 24'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                      style={{ filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.35))' }}
                    >
                      <path d='M6 9l6 6 6-6' stroke='currentColor' strokeWidth='2' strokeLinecap='round' strokeLinejoin='round' />
                    </svg>
                  </motion.div>
                )}
              </div>
              </GlassCard>
            </div>
          </motion.div>
        )}

        

          <div className='container mx-auto flex flex-col items-center justify-start relative z-10' style={{ background: 'transparent' }}>
            <div className='flex flex-col items-center justify-start w-full relative' style={{ background: 'transparent' }}>
              <motion.div
                className='relative z-0 rounded-2xl mx-auto'
                style={{
                  width: `${mediaWidth}px`,
                  height: `${mediaHeight}px`,
                  maxWidth: 'calc(100% - 64px)', // Stay within container with padding
                  // Reserve vertical space for CTAs below the media so both are visible
                  maxHeight: `calc(100vh - ${isMobileState ? 120 : 140}px)`,
                  boxShadow: '0px 0px 50px rgba(0, 0, 0, 0.3)',
                }}
                animate={{
                  opacity: scrollProgress > 0.05 ? Math.min(1, scrollProgress * 2) : 0,
                }}
                transition={{ duration: 0.2, ease: 'easeOut' }}
              >
                {mediaType === 'video' ? (
                  mediaSrc.includes('youtube.com') ? (
                    <div className='relative w-full h-full pointer-events-none'>
                      <iframe
                        width='100%'
                        height='100%'
                        src={
                          mediaSrc.includes('embed')
                            ? mediaSrc +
                              (mediaSrc.includes('?') ? '&' : '?') +
                              'autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1'
                            : mediaSrc.replace('watch?v=', 'embed/') +
                              '?autoplay=1&mute=1&loop=1&controls=0&showinfo=0&rel=0&disablekb=1&modestbranding=1&playlist=' +
                              mediaSrc.split('v=')[1]
                        }
                        className='w-full h-full rounded-xl'
                        frameBorder='0'
                        allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
                        allowFullScreen
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: scrollProgress >= 0.85 ? 0.05 : Math.max(0.1, 0.5 - scrollProgress * 0.6) }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  ) : (
                    <div className='relative w-full h-full pointer-events-none'>
                      <video
                        src={mediaSrc}
                        poster={posterSrc}
                        autoPlay
                        muted
                        loop
                        playsInline
                        preload='auto'
                        className='w-full h-full object-cover rounded-xl'
                        controls={false}
                        disablePictureInPicture
                        disableRemotePlayback
                      />
                      <div
                        className='absolute inset-0 z-10'
                        style={{ pointerEvents: 'none' }}
                      ></div>

                      <motion.div
                        className='absolute inset-0 bg-black/30 rounded-xl'
                        initial={{ opacity: 0.5 }}
                        animate={{ opacity: scrollProgress >= 0.85 ? 0.05 : Math.max(0.1, 0.5 - scrollProgress * 0.6) }}
                        transition={{ duration: 0.3 }}
                      />
                    </div>
                  )
                ) : (
                  <div className='relative w-full h-full'>
                    <Image
                      src={mediaSrc}
                      alt={title || 'Media content'}
                      width={1280}
                      height={720}
                      className='w-full h-full object-cover rounded-xl'
                    />

                    <motion.div
                      className='absolute inset-0 bg-black/50 rounded-xl'
                      initial={{ opacity: 0.5 }}
                      animate={{ opacity: scrollProgress >= 0.85 ? 0.05 : Math.max(0.1, 0.5 - scrollProgress * 0.6) }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                )}

                {/* Removed in-media CTAs; will render section-bottom CTAs below */}

                {date && (
                  <motion.div 
                    className='flex flex-col items-center text-center relative z-10 mt-4 transition-none'
                    animate={{ 
                      opacity: scrollProgress < 0.7 ? Math.max(0, 1 - (scrollProgress - 0.5) * 4) : 0,
                    }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                  >
                    <p
                      className='text-2xl'
                      style={{ 
                        transform: `translateX(-${textTranslateX}vw)`,
                        color: 'var(--foreground)',
                        opacity: 0.8,
                        textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)',
                      }}
                    >
                      {date}
                    </p>
                  </motion.div>
                )}
                
                {/* Overlay Content - Shows on top of expanded video */}
                {overlayContent && scrollProgress >= 0.85 && (
                  <motion.div
                    className='absolute inset-0 flex items-center justify-center z-20'
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ 
                      opacity: scrollProgress >= 0.85 ? 1 : 0,
                      scale: scrollProgress >= 0.85 ? 1 : 0.95
                    }}
                    transition={{ duration: 0.6, ease: 'easeOut' }}
                    style={{
                      pointerEvents: scrollProgress >= 0.85 ? 'auto' : 'none',
                      padding: isMobileState ? '24px' : '48px 64px',
                    }}
                  >
                    <div style={{
                      width: '100%',
                      height: '100%',
                      overflow: 'auto',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderRadius: '12px',
                      // Reserve space inside media so CTAs at bottom don't overlap content
                      paddingBottom: isMobileState ? '72px' : '88px',
                    }}>
                      {overlayContent}
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {title && (
                <motion.div
                  className={`flex items-center justify-center text-center gap-4 w-full relative z-10 transition-none flex-col px-4 ${
                    textBlend ? 'mix-blend-difference' : 'mix-blend-normal'
                  }`}
                  animate={{ 
                    opacity: scrollProgress < 0.7 ? Math.max(0, 1 - (scrollProgress - 0.5) * 4) : 0,
                  }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                >
                  <motion.h2
                    className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold transition-none'
                    style={{ 
                      transform: `translateX(-${textTranslateX}vw)`,
                      color: 'var(--foreground)',
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {firstWord}
                  </motion.h2>
                  <motion.h2
                    className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-center transition-none'
                    style={{ 
                      transform: `translateX(${textTranslateX}vw)`,
                      color: 'var(--foreground)',
                      textShadow: '0 2px 20px rgba(0, 0, 0, 0.3)',
                    }}
                  >
                    {restOfTitle}
                  </motion.h2>
                </motion.div>
              )}
            </div>

            {/* CTAs moved inside media container bottom; removed external block */}

            {children && (
              <motion.section
                className='flex flex-col w-full px-8 py-10 md:px-16 lg:py-20'
                initial={{ opacity: 0 }}
                animate={{ opacity: showContent ? 1 : 0 }}
                transition={{ duration: 0.7 }}
              >
                {children}
              </motion.section>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTAs removed */}
    </div>
  );
};

export default ScrollExpandMedia;
