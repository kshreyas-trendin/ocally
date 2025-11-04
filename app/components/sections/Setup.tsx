'use client';

import React from 'react';
import { GlassCard, GlassInput, GlassButton } from '../GlassComponents/GlassComponents';

export default function Setup() {
  return (
    <section className="py-32">
      <div className="container mx-auto px-6">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span 
              className="text-white text-sm font-semibold px-4 py-2 rounded-full"
              style={{ background: 'linear-gradient(135deg, #76ba99 0%, #5a9d7d 100%)' }}
            >
              How it Works
            </span>
          </div>
          <h1 className="text-6xl font-bold mb-6">Getting Started with Ocally</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
            See how easy it is to streamline your business growth and boost your productivity with just a few simple steps.
          </p>
        </div>

        {/* Two-Step Process Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto mb-16">
          {/* Step 1: Setup Business Account */}
          <GlassCard variant="frosted" padding="0" borderRadius="24px">
            <div className="p-8">
              {/* Card Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Setup Business Account</h3>
              </div>
              
              {/* Business Info Form */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🏢</span>
                  <GlassInput 
                    placeholder="Business Name" 
                    style={{ marginBottom: 0, flex: 1 }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📍</span>
                  <GlassInput 
                    placeholder="Business Address" 
                    style={{ marginBottom: 0, flex: 1 }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">📞</span>
                  <GlassInput 
                    placeholder="Phone Number" 
                    style={{ marginBottom: 0, flex: 1 }}
                  />
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🌐</span>
                  <GlassInput 
                    placeholder="Website URL" 
                    style={{ marginBottom: 0, flex: 1 }}
                  />
                </div>
                <GlassButton 
                  variant="secondary" 
                  size="medium" 
                  fullWidth
                  onClick={() => console.log('Add location')}
                >
                  <span className="flex items-center justify-center gap-2">
                    <span className="text-xl">+</span>
                    Add Another Location
                  </span>
                </GlassButton>
              </div>
            </div>

            {/* Step Label */}
            <div className="border-t border-white border-opacity-20 p-8">
              <div className="text-sm font-semibold text-gray-400 mb-2 tracking-wider">STEP 1</div>
              <h4 className="text-xl font-bold mb-2">Setup Your Business</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Start by providing your business information and adding your locations to get started with Ocally.
              </p>
            </div>
          </GlassCard>

          {/* Step 2: Select Agents & Connect */}
          <GlassCard variant="frosted" padding="0" borderRadius="24px">
            <div className="p-8">
              {/* Card Header */}
              <div className="mb-6">
                <h3 className="text-2xl font-bold">Select Agents & Connect</h3>
              </div>
              
              {/* Agent Selection */}
              <div className="space-y-3 mb-6">
                {/* Agent Option 1 */}
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📍</span>
                      <div>
                        <div className="font-semibold">Listing Manager</div>
                        <div className="text-xs text-gray-500">Discovery</div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-500 bg-green-500 bg-opacity-20 px-2 py-1 rounded">
                    Active
                  </span>
                </div>

                {/* Agent Option 2 */}
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <div>
                        <div className="font-semibold">Reviews Agent</div>
                        <div className="text-xs text-gray-500">Reputation</div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-500 bg-green-500 bg-opacity-20 px-2 py-1 rounded">
                    Active
                  </span>
                </div>

                {/* Agent Option 3 */}
                <div className="flex items-center justify-between p-3 bg-white bg-opacity-10 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-blue-500 rounded flex items-center justify-center text-white text-sm">
                      ✓
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">📊</span>
                      <div>
                        <div className="font-semibold">Data Analyst</div>
                        <div className="text-xs text-gray-500">Analytics</div>
                      </div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-green-500 bg-green-500 bg-opacity-20 px-2 py-1 rounded">
                    Active
                  </span>
                </div>
              </div>

              {/* Schedule Settings */}
              <div className="bg-white bg-opacity-5 rounded-lg p-4">
                <h4 className="font-bold mb-1">Set Your Schedule</h4>
                <p className="text-sm text-gray-500 mb-3">Configure when your agents should be active</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium min-w-[80px]">Monday</span>
                    <div className="flex items-center gap-2">
                      <input type="time" defaultValue="09:00" className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded px-2 py-1 text-xs" />
                      <span className="text-xs">to</span>
                      <input type="time" defaultValue="17:00" className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded px-2 py-1 text-xs" />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium min-w-[80px]">Tuesday</span>
                    <div className="flex items-center gap-2">
                      <input type="time" defaultValue="09:00" className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded px-2 py-1 text-xs" />
                      <span className="text-xs">to</span>
                      <input type="time" defaultValue="17:00" className="bg-white bg-opacity-10 border border-white border-opacity-20 rounded px-2 py-1 text-xs" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Step Label */}
            <div className="border-t border-white border-opacity-20 p-8">
              <div className="text-sm font-semibold text-gray-400 mb-2 tracking-wider">STEP 2</div>
              <h4 className="text-xl font-bold mb-2">Select Agents & Connect</h4>
              <p className="text-gray-600 dark:text-gray-300">
                Choose your growth agents, connect your accounts, and set your schedule to start growing your business.
              </p>
            </div>
          </GlassCard>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <a 
            href="#interact" 
            className="inline-flex items-center gap-2 font-medium text-lg transition-colors"
            style={{ color: '#76ba99' }}
          >
            <span>See how your agents interact with you.</span>
            <svg 
              width="16" 
              height="16" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M7 17L17 7"/>
              <path d="M7 7h10v10"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
