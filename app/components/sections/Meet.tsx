'use client';

import React, { useState, useEffect } from 'react';
import AgentGrid from '../AppMocks/AgentGrid';
import { GlassCard, GlassButton } from '../GlassComponents/GlassComponents';
import ArrowIcon from '../containers/ArrowIcon';
import { MouseTrailEffect } from '../containers/MouseTrailEffect';

export default function Meet() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      setTheme(currentTheme || 'light');
    };

    checkTheme();
    
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section className="pt-12 pb-32" style={{ position: 'relative', overflow: 'hidden' }}>
      {/* Mouse Trail Effect */}
      <MouseTrailEffect theme={theme} />

      {/* Content */}
      <div className="container mx-auto px-4" style={{ position: 'relative', zIndex: 1 }}>
        <div className="mb-16">
          <h2
            style={{
              margin: 0,
              fontWeight: 700,
              letterSpacing: '-0.01em',
              lineHeight: 1.2,
              fontSize: 'clamp(22px, 3.2vw, 34px)',
              textDecorationLine: 'underline',
              textDecorationColor: 'currentColor',
              textDecorationThickness: '2px',
              textUnderlineOffset: '6px',
            }}
          >
            Meet Your Growth Agents
          </h2>
          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              opacity: 0.92,
              lineHeight: 1.55,
              maxWidth: '48rem'
            }}
          >
            AI agents specialized for three key growth objectives. Each agent is designed to handle specific growth tasks with precision, efficiency, and the ability to learn and adapt to your unique business needs.
          </p>
        </div>
        
        <AgentGrid />

        <div className="mt-16">
          <GlassCard variant="gradient" className="text-center">
            <h3 className="text-2xl font-bold mb-4">
              Hire one or hire a team
            </h3>
            <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
              Get in touch for a free consultation on how our Agents can transform your business.
            </p>
            <GlassButton 
              variant="gradient" 
              size="large"
              onClick={() => console.log('Get started')}
              theme={theme}
            >
              <span className="flex items-center justify-center gap-2">
                Get Started
                <ArrowIcon size={16} />
              </span>
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

