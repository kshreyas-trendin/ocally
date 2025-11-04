'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard, GlassButton } from '../GlassComponents/GlassComponents';
import { Orb } from '../ui/orb';

// Bar Chart Component for KPIs
const BarChart = ({ filled, theme }: { filled: number; theme: 'light' | 'dark' }) => {
  const totalBars = 10;
  const isDark = theme === 'dark';
  
  return (
    <div style={{ 
      display: 'flex', 
      gap: '3px', 
      marginTop: '10px',
      height: '6px'
    }}>
      {Array.from({ length: totalBars }).map((_, index) => (
        <div
          key={index}
          style={{
            flex: 1,
            height: '100%',
            borderRadius: '2px',
            background: index < filled
              ? (isDark ? 'rgba(255, 255, 255, 0.4)' : 'rgba(118, 186, 153, 0.6)')
              : (isDark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'),
            transition: 'background 0.3s ease'
          }}
        />
      ))}
    </div>
  );
};


// KPI Card Component
const KPICard = ({ 
  title, 
  value, 
  filledBars, 
  theme,
  embedded = false
}: { 
  title: string; 
  value: string; 
  filledBars: number; 
  theme: 'light' | 'dark';
  embedded?: boolean;
}) => {
  const isDark = theme === 'dark';
  const cardPadding = embedded ? '12px' : '16px';
  const cardRadius = embedded ? '10px' : '12px';
  
  return (
    <GlassCard 
      variant={isDark ? 'dark' : 'light'} 
      hover 
      padding={cardPadding} 
      borderRadius={cardRadius}
      style={{ flex: 1 }}
    >
      <div style={{ 
        fontSize: embedded ? '12px' : '13px', 
        fontWeight: 500,
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        marginBottom: '6px'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: embedded ? '18px' : '20px', 
        fontWeight: 600,
        color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
        marginBottom: '4px'
      }}>
        {value}
      </div>
      <BarChart filled={filledBars} theme={theme} />
    </GlassCard>
  );
};

// Agent Card Component
const AgentCard = ({ 
  name, 
  status,
  playbook,
  theme,
  embedded = false
}: { 
  name: string; 
  status: 'active' | 'idle';
  playbook: string;
  theme: 'light' | 'dark';
  embedded?: boolean;
}) => {
  const isDark = theme === 'dark';
  const isActive = status === 'active';
  const cardPadding = embedded ? '12px' : '14px';
  const cardRadius = embedded ? '10px' : '12px';
  
  return (
    <GlassCard variant={isDark ? 'dark' : 'light'} hover padding={cardPadding} borderRadius={cardRadius}>
      <div className="agent-header" style={{ display: 'flex', alignItems: 'center', gap: embedded ? '10px' : '12px', marginBottom: embedded ? '8px' : '10px' }}>
        <div className="agent-icon" style={{ 
          width: embedded ? '32px' : '36px', 
          height: embedded ? '32px' : '36px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          position: 'relative'
        }}>
          <Orb 
            size={embedded ? 32 : 36} 
            theme={theme} 
            state={isActive ? 'background-task' : 'idle'}
            seed={name}
          />
          {isActive && (
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: embedded ? '7px' : '8px',
              height: embedded ? '7px' : '8px',
              borderRadius: '50%',
              background: '#76ba99',
              boxShadow: '0 0 6px rgba(118, 186, 153, 0.6)',
              border: '1.5px solid',
              borderColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'
            }} />
          )}
        </div>
        <h4 className="agent-name" style={{ 
          fontSize: embedded ? '13px' : '14px', 
          fontWeight: 600, 
          margin: 0,
          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)',
          flex: 1,
          minWidth: 0
        }}>{name}</h4>
      </div>
      <div style={{ 
        fontSize: embedded ? '10px' : '11px', 
        lineHeight: '1.4',
        color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        marginBottom: embedded ? '10px' : '12px',
        minHeight: embedded ? '32px' : '36px'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '5px',
          marginBottom: '3px'
        }}>
          <span style={{
            width: embedded ? '5px' : '6px',
            height: embedded ? '5px' : '6px',
            borderRadius: '50%',
            background: isActive ? '#76ba99' : 'rgba(125, 211, 252, 0.6)',
            boxShadow: isActive ? '0 0 5px rgba(118, 186, 153, 0.5)' : 'none'
          }} />
          <span style={{ fontWeight: 500 }}>
            {isActive ? 'Running' : 'Standby'}
          </span>
        </div>
        <div style={{ marginTop: '3px' }}>{playbook}</div>
      </div>
      <div style={{ display: 'flex', gap: embedded ? '6px' : '8px', width: '100%' }}>
        <GlassButton 
          variant="secondary" 
          size="small" 
          onClick={() => console.log(`Configure ${name}`)}
          theme={theme}
          style={{ flex: 1, fontSize: embedded ? '10px' : '11px', padding: embedded ? '6px 8px' : '8px 12px' }}
        >
          Configure
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          size="small" 
          onClick={() => console.log(`View Task Log ${name}`)}
          theme={theme}
          style={{ flex: 1, fontSize: embedded ? '10px' : '11px', padding: embedded ? '6px 8px' : '8px 12px' }}
        >
          Task Log
        </GlassButton>
      </div>
    </GlassCard>
  );
};

type MobileDashboardMockProps = {
  embedded?: boolean;
};

export default function MobileDashboardMock({ embedded = false }: MobileDashboardMockProps) {
  const [isMounted, setIsMounted] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    setIsMounted(true);
    
    // Check current theme
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      setTheme(currentTheme || 'light');
    };

    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const agents = [
    {
      name: 'Reputation Agent',
      status: 'active' as const,
      playbook: 'Monitoring review platforms for new feedback, responding to 3-star and below reviews within 2 hours, and analyzing sentiment trends across Google, Yelp, and Facebook.'
    },
    {
      name: 'Retention Agent',
      status: 'active' as const,
      playbook: 'Tracking customer return patterns, identifying at-risk customers from the last 30 days, and sending personalized re-engagement campaigns with special offers.'
    },
    {
      name: 'Social Media Agent',
      status: 'idle' as const,
      playbook: 'Standby mode. Will activate when new posts need scheduling, engagement rates drop below baseline, or trending topics relevant to your business are detected.'
    },
    {
      name: 'Listings Agent',
      status: 'active' as const,
      playbook: 'Maintaining consistency across 15+ business directories, updating hours and services weekly, and monitoring for duplicate listings that could hurt SEO rankings.'
    },
    {
      name: 'Offers Agent',
      status: 'active' as const,
      playbook: 'Managing seasonal promotions, A/B testing discount campaigns, and optimizing offer timing based on historical conversion data and customer behavior patterns.'
    },
    {
      name: 'Local SEO Agent',
      status: 'idle' as const,
      playbook: 'Standby mode. Activates automatically when local search rankings drop, new competitors are detected, or when keyword opportunities are identified in your area.'
    }
  ];

  const sectionGap = embedded ? '10px' : '16px';

  if (!isMounted) {
    return null;
  }

  return (
    <div 
      className="mobile-dashboard-mock"
      style={{
        width: '100%',
        height: '100%',
        maxHeight: '100%',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      {/* Dashboard Content */}
      <div 
        className="mobile-dashboard-content"
        style={{
          width: '100%',
          height: '100%',
          overflowY: 'auto',
          padding: embedded ? '8px 4px' : '12px',
          display: 'flex',
          flexDirection: 'column',
          gap: sectionGap
        }}
      >
        {/* KPI Cards Row */}
        <div style={{ 
          display: 'flex', 
          gap: embedded ? '8px' : '12px',
          width: '100%'
        }}>
          <KPICard 
            title="Foot traffic uplift"
            value="+12%"
            filledBars={6}
            theme={theme}
            embedded={embedded}
          />
          <KPICard 
            title="Review velocity"
            value="+38%"
            filledBars={8}
            theme={theme}
            embedded={embedded}
          />
          <KPICard 
            title="Repeat visits"
            value="+21%"
            filledBars={7}
            theme={theme}
            embedded={embedded}
          />
        </div>

        {/* Agents Section Heading */}
        <div style={{ marginTop: '4px' }}>
          <h2 style={{ 
            fontSize: embedded ? '16px' : '18px', 
            fontWeight: 600,
            margin: 0,
            marginBottom: embedded ? '10px' : '12px',
            color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)'
          }}>
            Growth Agents
          </h2>
        </div>

        {/* Agents Grid - 2 columns */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(2, 1fr)', 
          gap: embedded ? '8px' : '12px',
          width: '100%'
        }}>
          {agents.map((agent) => (
            <AgentCard
              key={agent.name}
              name={agent.name}
              status={agent.status}
              playbook={agent.playbook}
              theme={theme}
              embedded={embedded}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
