'use client';

import React from 'react';
import FeaturesGrid from './ProductTiles';

export default function Product() {
  return (
    <section aria-labelledby="product-section-heading" style={{ padding: '48px 0', minHeight: '100svh', display: 'grid', gridTemplateRows: 'auto 1fr' }}>
        <div
          style={{
            width: '100%',
          maxWidth: 'calc(100% - 64px)',
            margin: '0 auto',
          }}
        >
          <div style={{ color: 'var(--foreground)', textAlign: 'left', marginBottom: 16 }}>
            <h2
            id="product-section-heading"
              style={{
              margin: 0,
                fontWeight: 700,
                letterSpacing: '-0.01em',
                lineHeight: 1.2,
                fontSize: 'clamp(28px, 5vw, 48px)',
                textDecorationLine: 'underline',
                textDecorationColor: 'currentColor',
                textDecorationThickness: '2px',
                textUnderlineOffset: '6px',
              }}
          >
            Not yet another agent platform that
            <br />
            <em>barely works.</em>
          </h2>
          <p
            style={{
              margin: '8px 0 0 0',
              fontSize: 'clamp(14px, 1.8vw, 18px)',
              opacity: 0.9,
              lineHeight: 1.55,
              maxWidth: '56rem',
            }}
          >
            Ocally is different. It connects to your existing stack, ships with proven playbooks, runs proactive automations, and learns your context to improve week over week. You stay in control with granular roles and approvals while the system quietly drives outcomes.
          </p>
          </div>
        </div>

      <div
        className="relative"
        style={{
          width: '100%',
          maxWidth: 'calc(100% - 64px)',
          margin: '16px auto 0',
          height: '100%',
        }}
      >
        <FeaturesGrid fullHeight />
      </div>
    </section>
  );
}


