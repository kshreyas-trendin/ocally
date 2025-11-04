'use client';

import React from 'react';
import { GlassCard, GlassButton } from '../GlassComponents/GlassComponents';
import ArrowIcon from '../containers/ArrowIcon';

export default function Learn() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Learn More</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Resources to help you succeed
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-16">
          {/* Documentation */}
          <GlassCard variant="frosted" hover padding="28px" borderRadius="20px">
            <div className="text-4xl mb-4">📚</div>
            <h3 className="text-2xl font-bold mb-3">Documentation</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Comprehensive guides and API references
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#76ba99' }}
            >
              Explore Docs
              <ArrowIcon size={14} />
            </a>
          </GlassCard>

          {/* Academy */}
          <GlassCard variant="frosted" hover padding="28px" borderRadius="20px">
            <div className="text-4xl mb-4">🎓</div>
            <h3 className="text-2xl font-bold mb-3">Academy</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Free courses on AI agent best practices
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#76ba99' }}
            >
              Start Learning
              <ArrowIcon size={14} />
            </a>
          </GlassCard>

          {/* Case Studies */}
          <GlassCard variant="frosted" hover padding="28px" borderRadius="20px">
            <div className="text-4xl mb-4">💡</div>
            <h3 className="text-2xl font-bold mb-3">Case Studies</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              See how other businesses are succeeding
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#76ba99' }}
            >
              Read Stories
              <ArrowIcon size={14} />
            </a>
          </GlassCard>

          {/* Community */}
          <GlassCard variant="frosted" hover padding="28px" borderRadius="20px">
            <div className="text-4xl mb-4">👥</div>
            <h3 className="text-2xl font-bold mb-3">Community</h3>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Join thousands of Ocally users
            </p>
            <a 
              href="#" 
              className="inline-flex items-center gap-2 font-medium transition-colors"
              style={{ color: '#76ba99' }}
            >
              Join Community
              <ArrowIcon size={14} />
            </a>
          </GlassCard>
        </div>

        {/* Contact Section */}
        <GlassCard 
          variant="gradient" 
          padding="40px" 
          borderRadius="24px"
          style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}
        >
          <h3 className="text-3xl font-bold mb-3">Still have questions?</h3>
          <p className="text-lg text-gray-200 mb-6">
            Our team is here to help you get started
          </p>
          <GlassButton 
            variant="gradient" 
            size="large"
            onClick={() => console.log('Schedule call')}
          >
            <span className="flex items-center justify-center gap-2">
              Schedule a Call
              <ArrowIcon size={16} />
            </span>
          </GlassButton>
        </GlassCard>
      </div>
    </section>
  );
}

