'use client';

import React, { ReactNode } from 'react';

type GlassSectionProps = {
  children: ReactNode;
  className?: string;
};

/**
 * @deprecated This component is deprecated. Use the standardized GlassCard component from 
 * '@/app/components/GlassComponents/GlassComponents' instead for consistent glass effects.
 * 
 * This was a simple content container for section content with no glass effects.
 * For better styling and consistency, migrate to:
 * - GlassCard for card-based layouts with glass effects
 * - Native section/div elements with Tailwind classes for simple containers
 * 
 * @example
 * // Old way (deprecated):
 * <GlassSection><Content /></GlassSection>
 * 
 * // New way with GlassCard:
 * import { GlassCard } from '@/app/components/GlassComponents/GlassComponents';
 * <GlassCard variant="frosted" hover><Content /></GlassCard>
 * 
 * // Or simple container:
 * <section className="py-32"><div className="container mx-auto px-6"><Content /></div></section>
 */
const GlassSection: React.FC<GlassSectionProps> = ({ children, className = '' }) => {
  console.warn('GlassSection is deprecated. Use GlassCard from GlassComponents instead.');
  
  return (
    <div className={`section-content ${className}`}>
      <div className="section-content__inner">
        {children}
      </div>
    </div>
  );
};

export default GlassSection;

