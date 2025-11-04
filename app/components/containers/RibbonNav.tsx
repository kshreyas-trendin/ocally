'use client';

import React, { useState, useEffect, useRef } from 'react';
import type { SectionId } from '../../page';
import ArrowIcon from './ArrowIcon';

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
    label: 'Meet your Agents', 
    icon: '👥',
    description: 'Meet your new co-workers',
    color: '#FF6B6B'
  },
  { 
    id: 'interact', 
    label: 'See how Agents Interact ', 
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
};

export default function RibbonNav({ activeSection, onNavigate }: Props) {
  const [hoveredItem, setHoveredItem] = useState<SectionId | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const ribbonRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const activeIndex = NAV_ITEMS.findIndex(item => item.id === activeSection);
  const progressPercent = Math.round(((activeIndex + 1) / NAV_ITEMS.length) * 100);

  const handleClick = (id: SectionId) => (e: React.MouseEvent) => {
    e.preventDefault();
    onNavigate(id);
    
    // Add haptic feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(10);
    }
  };

  const handleMouseEnter = (id: SectionId) => {
    setHoveredItem(id);
    setIsExpanded(true);
    
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const handleMouseLeave = () => {
    // Delay hiding to allow smooth transitions
    timeoutRef.current = setTimeout(() => {
      setHoveredItem(null);
      setIsExpanded(false);
    }, 150);
  };

  // Touch handling for mobile gestures
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && activeIndex < NAV_ITEMS.length - 1) {
      onNavigate(NAV_ITEMS[activeIndex + 1].id);
    }
    if (isRightSwipe && activeIndex > 0) {
      onNavigate(NAV_ITEMS[activeIndex - 1].id);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' && activeIndex > 0) {
        e.preventDefault();
        onNavigate(NAV_ITEMS[activeIndex - 1].id);
      } else if (e.key === 'ArrowDown' && activeIndex < NAV_ITEMS.length - 1) {
        e.preventDefault();
        onNavigate(NAV_ITEMS[activeIndex + 1].id);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeIndex, onNavigate]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <nav 
      className="ribbon-nav" 
      aria-label="Section navigation"
      ref={ribbonRef}
    >
      {/* Desktop vertical ribbon */}
      <div className="ribbon">
        {/* Animated spine with morphing progress */}
        <div className="ribbon__spine" aria-hidden="true">
          <div 
            className="ribbon__progress" 
            style={{ 
              height: `${progressPercent}%`,
              background: `linear-gradient(180deg, ${NAV_ITEMS[activeIndex]?.color || 'var(--c-action)'}, transparent)`
            }} 
            aria-hidden="true" 
          />
          <div className="ribbon__glow" aria-hidden="true" />
        </div>

        {/* Navigation items with morphing states */}
        <ul className="ribbon__list">
          {NAV_ITEMS.map((item, index) => {
            const isActive = item.id === activeSection;
            const isHovered = hoveredItem === item.id;
            const isNearActive = Math.abs(index - activeIndex) <= 1;
            
            return (
              <li key={item.id} className="ribbon__li">
                <button
                  type="button"
                  className={`
                    ribbon__item 
                    ${isActive ? 'active' : ''} 
                    ${isHovered ? 'hovered' : ''}
                    ${isNearActive ? 'near-active' : ''}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${item.label}: ${item.description}`}
                  onClick={handleClick(item.id)}
                  onMouseEnter={() => handleMouseEnter(item.id)}
                  onMouseLeave={handleMouseLeave}
                  data-item-id={item.id}
                  style={{
                    '--item-color': item.color,
                    '--item-index': index,
                    '--total-items': NAV_ITEMS.length
                  } as React.CSSProperties}
                >
                  {/* Label with smooth transitions */}
                  <span className="ribbon__label">
                    {item.label}
                    <ArrowIcon size={12} className="ml-1" />
                  </span>
                  
                  {/* Description tooltip */}
                  <div className="ribbon__tooltip" aria-hidden="true">
                    {item.description}
                  </div>
                  
                  {/* Active indicator */}
                  {isActive && (
                    <div className="ribbon__active-indicator" aria-hidden="true" />
                  )}
                  
                  {/* Hover glow effect */}
                  <div className="ribbon__hover-glow" aria-hidden="true" />
                </button>
              </li>
            );
          })}
        </ul>

        {/* Progress indicator with smooth morphing */}
        <div className="ribbon__progress-indicator" aria-hidden="true">
          <div className="ribbon__progress-text">
            {activeIndex + 1} / {NAV_ITEMS.length}
          </div>
        </div>
      </div>

      {/* Mobile horizontal navigation with gesture support */}
      <div 
        className="ribbon-mobile" 
        aria-label="Section navigation"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="ribbon-mobile__container">
          <div className="ribbon-mobile__scroll">
            {NAV_ITEMS.map((item, index) => {
              const isActive = item.id === activeSection;
              const isNearActive = Math.abs(index - activeIndex) <= 1;
              
              return (
                <button
                  key={item.id}
                  type="button"
                  className={`
                    ribbon-mobile__chip 
                    ${isActive ? 'active' : ''}
                    ${isNearActive ? 'near-active' : ''}
                  `}
                  aria-current={isActive ? 'page' : undefined}
                  aria-label={`${item.label}: ${item.description}`}
                  onClick={handleClick(item.id)}
                  data-item-id={item.id}
                  style={{
                    '--item-color': item.color,
                    '--item-index': index
                  } as React.CSSProperties}
                >
                  <span className="ribbon-mobile__label">
                    {item.label}
                    <ArrowIcon size={12} className="ml-1" />
                  </span>
                  {isActive && (
                    <div className="ribbon-mobile__active-indicator" aria-hidden="true" />
                  )}
                </button>
              );
            })}
          </div>
          
          {/* Mobile progress bar with morphing colors */}
          <div className="ribbon-mobile__bar">
            <div 
              className="ribbon-mobile__progress" 
              style={{ 
                width: `${progressPercent}%`,
                background: `linear-gradient(90deg, ${NAV_ITEMS[activeIndex]?.color || 'var(--c-action)'}, transparent)`
              }} 
            />
            <div className="ribbon-mobile__glow" aria-hidden="true" />
          </div>
        </div>
      </div>
    </nav>
  );
}
