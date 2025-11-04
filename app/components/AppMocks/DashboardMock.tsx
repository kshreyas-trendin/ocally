'use client';

import React, { useState, useEffect } from 'react';
import MobileDashboardMock from './MobileDashboardMock';
import { GlassCard, GlassButton } from '../GlassComponents/GlassComponents';
import { Orb } from '../ui/orb';

// Bar Chart Component for KPIs
const BarChart = ({ filled, theme }: { filled: number; theme: 'light' | 'dark' }) => {
  const totalBars = 10;
  const isDark = theme === 'dark';
  
  return (
    <div style={{ 
      display: 'flex', 
      gap: '4px', 
      marginTop: '12px',
      height: '8px'
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
  theme 
}: { 
  title: string; 
  value: string; 
  filledBars: number; 
  theme: 'light' | 'dark';
}) => {
  const isDark = theme === 'dark';
  
  return (
    <GlassCard 
      variant={isDark ? 'dark' : 'light'} 
      hover 
      padding="20px" 
      borderRadius="16px"
      style={{ flex: 1 }}
    >
      <div style={{ 
        fontSize: '14px', 
        fontWeight: 500,
        color: isDark ? 'rgba(255, 255, 255, 0.7)' : 'rgba(0, 0, 0, 0.7)',
        marginBottom: '8px'
      }}>
        {title}
      </div>
      <div style={{ 
        fontSize: '24px', 
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
  theme 
}: { 
  name: string; 
  status: 'active' | 'idle';
  playbook: string;
  theme: 'light' | 'dark';
}) => {
  const isDark = theme === 'dark';
  const isActive = status === 'active';
  
  return (
    <GlassCard variant={isDark ? 'dark' : 'light'} hover padding="20px" borderRadius="16px">
      <div className="agent-header" style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '12px' }}>
        <div className="agent-icon" style={{ 
          width: '40px', 
          height: '40px', 
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative'
        }}>
          <Orb 
            size={40} 
            theme={theme} 
            state={isActive ? 'background-task' : 'idle'}
            seed={name}
          />
          {isActive && (
            <div style={{
              position: 'absolute',
              top: '-2px',
              right: '-2px',
              width: '10px',
              height: '10px',
              borderRadius: '50%',
              background: '#76ba99',
              boxShadow: '0 0 8px rgba(118, 186, 153, 0.6)',
              border: '2px solid',
              borderColor: isDark ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.9)'
            }} />
          )}
        </div>
        <h4 className="agent-name" style={{ 
          fontSize: '16px', 
          fontWeight: 600, 
          margin: 0,
          color: isDark ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)'
        }}>{name}</h4>
      </div>
      <div style={{ 
        fontSize: '12px', 
        lineHeight: '1.5',
        color: isDark ? 'rgba(255, 255, 255, 0.65)' : 'rgba(0, 0, 0, 0.65)',
        marginBottom: '16px',
        minHeight: '36px'
      }}>
        <div style={{ 
          display: 'inline-flex', 
          alignItems: 'center', 
          gap: '6px',
          marginBottom: '4px'
        }}>
          <span style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            background: isActive ? '#76ba99' : 'rgba(125, 211, 252, 0.6)',
            boxShadow: isActive ? '0 0 6px rgba(118, 186, 153, 0.5)' : 'none'
          }} />
          <span style={{ fontWeight: 500 }}>
            {isActive ? 'Running' : 'Standby'}
          </span>
        </div>
        <div style={{ marginTop: '4px' }}>{playbook}</div>
      </div>
      <div style={{ display: 'flex', gap: '8px', width: '100%' }}>
        <GlassButton 
          variant="secondary" 
          size="small" 
          onClick={() => console.log(`Configure ${name}`)}
          theme={theme}
          style={{ flex: 1 }}
        >
          Configure
        </GlassButton>
        <GlassButton 
          variant="secondary" 
          size="small" 
          onClick={() => console.log(`View Task Log ${name}`)}
          theme={theme}
          style={{ flex: 1 }}
        >
          View Task Log
        </GlassButton>
      </div>
    </GlassCard>
  );
};

export default function DashboardMock() {
  const [isMobile, setIsMobile] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('Downtown Store');
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      setTheme(currentTheme || 'light');
    };

    checkMobile();
    checkTheme();
    
    window.addEventListener('resize', checkMobile);
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      window.removeEventListener('resize', checkMobile);
      observer.disconnect();
    };
  }, []);

  if (isMobile) {
    return <MobileDashboardMock />;
  }

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

  return (
    <div className="dashboard-mock" style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
      width: '100%'
    }}>
      {/* Top Row - KPI Cards */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        width: '100%'
      }}>
        <KPICard 
          title="Foot traffic uplift"
          value="+12%"
          filledBars={6}
          theme={theme}
        />
        <KPICard 
          title="Review velocity"
          value="+38%"
          filledBars={8}
          theme={theme}
        />
        <KPICard 
          title="Repeat visits"
          value="+21%"
          filledBars={7}
          theme={theme}
        />
      </div>

      {/* Agents Section Heading */}
      <div style={{ marginTop: '8px' }}>
        <h2 style={{ 
          fontSize: '20px', 
          fontWeight: 600,
          margin: 0,
          marginBottom: '16px',
          color: theme === 'dark' ? 'rgba(255, 255, 255, 0.95)' : 'rgba(0, 0, 0, 0.9)'
        }}>
          Growth Agents
        </h2>
      </div>

      {/* Agent Cards Grid - 3 columns, 2 rows */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(3, 1fr)', 
        gap: '20px',
        width: '100%'
      }}>
        {agents.map((agent) => (
          <AgentCard
            key={agent.name}
            name={agent.name}
            status={agent.status}
            playbook={agent.playbook}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}
