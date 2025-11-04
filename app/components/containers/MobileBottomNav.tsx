'use client';

import React, { useState, useEffect } from 'react';
import type { SectionId } from '../../page';
import ArrowIcon from './ArrowIcon';
import { GlassButton } from '../GlassComponents/GlassComponents';
import ThemeSwitcher from './ThemeSwitcher';

type NavItem = { 
  id: SectionId; 
  label: string; 
  icon: string;
  description: string;
  color: string;
};

const NAV_ITEMS: NavItem[] = [
  { 
    id: 'welcome', 
    label: 'Welcome', 
    icon: '✨',
    description: 'Discover the future',
    color: 'var(--c-action)'
  },
  { 
    id: 'product', 
    label: 'Product', 
    icon: '🛍️',
    description: 'What you get',
    color: '#A78BFA'
  },
  { 
    id: 'meet', 
    label: 'Meet your team', 
    icon: '👥',
    description: 'Meet your new co-workers',
    color: '#FF6B6B'
  },
  { 
    id: 'interact', 
    label: 'Interact', 
    icon: '🤝',
    description: 'How you interact with them',
    color: '#4ECDC4'
  },
  { 
    id: 'hire', 
    label: 'Hire them!', 
    icon: '🚀',
    description: 'Bring them on board',
    color: '#45B7D1'
  },
  { 
    id: 'learn', 
    label: 'Learn More', 
    icon: '📚',
    description: 'Dive deeper',
    color: '#96CEB4'
  },
  { 
    id: 'gotoapp', 
    label: 'Go to App', 
    icon: '→',
    description: 'Access your dashboard',
    color: 'var(--c-action)'
  },
];

type Props = {
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  theme: 'light' | 'dark';
  onChangeTheme: (theme: 'light' | 'dark') => void;
};

export default function MobileBottomNav({ activeSection, onNavigate, theme, onChangeTheme }: Props) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const activeItem = NAV_ITEMS.find(item => item.id === activeSection);

  const handleJumpToSection = () => {
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
  };

  const handleNavigate = (id: SectionId) => {
    onNavigate(id);
    setIsDrawerOpen(false);
  };

  return (
    <>
      {/* Mobile Bottom Navigation Bar */}
      <div className="mobile-bottom-nav">
        <div className="mobile-bottom-nav__content">
          <div className="mobile-bottom-nav__current">
            <div className="mobile-bottom-nav__current-info">
              <div className="mobile-bottom-nav__current-label">
                {activeItem?.label}
              </div>
              <div className="mobile-bottom-nav__current-description">
                {activeItem?.description}
              </div>
            </div>
          </div>
          
          <div className="mobile-bottom-nav__actions">
            <ThemeSwitcher theme={theme} onChangeTheme={onChangeTheme} />
            <GlassButton 
              variant="gradient"
              size="medium"
              onClick={handleJumpToSection}
              theme={theme}
              style={{ borderRadius: '99em' }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                Jump to section
                <ArrowIcon size={14} />
              </span>
            </GlassButton>
          </div>
        </div>
      </div>

      {/* Bottom Drawer */}
      {isDrawerOpen && (
        <div className="mobile-drawer-overlay" onClick={handleCloseDrawer}>
          <div className="mobile-drawer" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-drawer__header">
              <h3 className="mobile-drawer__title">Navigate Sections</h3>
              <button 
                className="mobile-drawer__close"
                onClick={handleCloseDrawer}
                aria-label="Close drawer"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            </div>
            
            <div className="mobile-drawer__content">
              {NAV_ITEMS.map((item) => {
                const isActive = item.id === activeSection;
                return (
                  <button
                    key={item.id}
                    className={`mobile-drawer__item ${isActive ? 'active' : ''}`}
                    onClick={() => handleNavigate(item.id)}
                    data-item-id={item.id}
                    style={{
                      '--item-color': item.color,
                    } as React.CSSProperties}
                  >
                    <div className="mobile-drawer__item-content">
                      <div className="mobile-drawer__item-label">
                        {item.label}
                      </div>
                      <div className="mobile-drawer__item-description">
                        {item.description}
                      </div>
                    </div>
                    {isActive && (
                      <div className="mobile-drawer__item-indicator">
                        <ArrowIcon size={16} />
                      </div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
