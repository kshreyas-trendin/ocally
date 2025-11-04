'use client';

import React from 'react';
import { GlassCard } from '../GlassComponents/GlassComponents';

export default function Interact() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">How You Interact With Them</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Simple, intuitive, powerful
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {/* Natural Conversation */}
          <GlassCard variant="light" hover padding="32px" borderRadius="20px">
            <div className="text-5xl mb-6 text-center">💬</div>
            <h3 className="text-2xl font-bold mb-4 text-center">Natural Conversation</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Chat with your agents as you would with a team member
            </p>
          </GlassCard>

          {/* Custom Training */}
          <GlassCard variant="light" hover padding="32px" borderRadius="20px">
            <div className="text-5xl mb-6 text-center">⚙️</div>
            <h3 className="text-2xl font-bold mb-4 text-center">Custom Training</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Train agents on your specific business processes and knowledge
            </p>
          </GlassCard>

          {/* Real-time Insights */}
          <GlassCard variant="light" hover padding="32px" borderRadius="20px">
            <div className="text-5xl mb-6 text-center">📊</div>
            <h3 className="text-2xl font-bold mb-4 text-center">Real-time Insights</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Monitor performance and get actionable analytics
            </p>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

