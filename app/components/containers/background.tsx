'use client';

import React from 'react';

// Background component now only provides a simple background
// Individual sections handle their own backgrounds

export type ThemeType = 'light' | 'dark';

type BackgroundProps = {
  theme: ThemeType;
  variant?: 'fixed' | 'contained';
  className?: string;
  style?: React.CSSProperties;
  videoSrc?: string;
  posterSrc?: string;
};

const Background = ({ theme, variant = 'fixed', className, style, videoSrc, posterSrc }: BackgroundProps) => {
  const resolvedVideoSrc = videoSrc ?? (theme === 'dark' ? '/dark/darkbd-video.mp4' : '/light/lightbg-video.mp4');
  const resolvedPosterSrc = posterSrc ?? (theme === 'dark' ? '/dark/darkbg.png' : '/light/lightbg.png');
  return (
    <div
      className={variant === 'fixed' ? 'background-container' : 'background-contained'}
      style={style}
    >
      <video
        src={resolvedVideoSrc}
        poster={resolvedPosterSrc}
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        className={className}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default Background;