'use client';

import React from 'react';
import { GlassCard, GlassButton } from '../GlassComponents/GlassComponents';
import ArrowIcon from '../containers/ArrowIcon';

export default function Hire() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold mb-4">Hire Them!</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Get started in minutes, not months
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {/* Starter Plan */}
          <GlassCard variant="light" hover padding="32px" borderRadius="24px">
            <h3 className="text-2xl font-bold mb-4">Starter</h3>
            <div className="text-5xl font-light mb-6">
              $99<span className="text-xl text-gray-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>1 AI Agent</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>1,000 conversations/month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Basic analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Email support</span>
              </li>
            </ul>
            <GlassButton 
              variant="gradient" 
              size="large" 
              fullWidth 
              onClick={() => console.log('Start trial')}
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowIcon size={16} />
              </span>
            </GlassButton>
          </GlassCard>

          {/* Growth Plan - Featured */}
          <GlassCard variant="gradient" hover padding="32px" borderRadius="24px">
            <div 
              className="absolute top-4 right-4 text-white text-xs font-bold px-3 py-1 rounded-full"
              style={{ background: 'linear-gradient(135deg, #76ba99 0%, #5a9d7d 100%)' }}
            >
              Popular
            </div>
            <h3 className="text-2xl font-bold mb-4">Growth</h3>
            <div className="text-5xl font-light mb-6">
              $299<span className="text-xl text-gray-500">/mo</span>
            </div>
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>3 AI Agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>10,000 conversations/month</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Advanced analytics</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Priority support</span>
              </li>
            </ul>
            <GlassButton 
              variant="gradient" 
              size="large" 
              fullWidth 
              onClick={() => console.log('Start trial')}
            >
              <span className="flex items-center justify-center gap-2">
                Start Free Trial
                <ArrowIcon size={16} />
              </span>
            </GlassButton>
          </GlassCard>

          {/* Enterprise Plan */}
          <GlassCard variant="light" hover padding="32px" borderRadius="24px">
            <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
            <div className="text-5xl font-light mb-6">Custom</div>
            <ul className="space-y-3 mb-8 text-left">
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlimited agents</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Unlimited conversations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Custom integrations</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-green-500">✓</span>
                <span>Dedicated support</span>
              </li>
            </ul>
            <GlassButton 
              variant="secondary" 
              size="large" 
              fullWidth 
              onClick={() => console.log('Contact sales')}
            >
              <span className="flex items-center justify-center gap-2">
                Contact Sales
                <ArrowIcon size={16} />
              </span>
            </GlassButton>
          </GlassCard>
        </div>
      </div>
    </section>
  );
}

