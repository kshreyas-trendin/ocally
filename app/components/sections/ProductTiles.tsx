"use client";

import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { GlassCard } from "../GlassComponents/GlassComponents";
import Orb from "../ui/orb";
import ToolsLogos from "../GlassComponents/ToolsLogos";
import LanguageGrid from "../GlassComponents/LanguageGrid";
import UnstructuredGrid from "../GlassComponents/UnstructuredGrid";
import CustomizationGrid from "../GlassComponents/CustomizationGrid";
import KnowledgeAccumulation from "../GlassComponents/KnowledgeAccumulation";
import Background, { ThemeType } from "../containers/background";

export type Feature = {
  title: string;
  body: string;
  size?: 's' | 'm' | 'l';
  tall?: boolean;
  visual?: 'acl' | 'tools' | 'languages' | 'unstructured' | 'customize' | 'learning';
};

export const FEATURES: Feature[] = [
  {
    title: "Multilingual by default",
    body: "Speaks and responds in 48 different languages.",
    size: 's',
    visual: 'languages',
  },
  {
    title: "Not generic, built by growth experts specially for mainstreet",
    body: "Our agents are trained to do their tasks exceptionally well and are trained with growth strategies that have already generated billions and understand them really well. They are built with a sole purpose, being relentless to help you achieve your growth goals.",
    size: 'm',
  },
  {
    title: "Understands unstructured data",
    body: "Can process and extract information from PDFs, images, and more.",
    size: 'm',
    visual: 'unstructured',
  },
  {
    title: "Works with your tools",
    body: "Connects to the tools your business already uses.",
    size: 's',
    visual: 'tools',
  },
  {
    title: "Fully customizable",
    body: "100% customizable to your brand, workflows and guardrails.",
    size: 'm',
    visual: 'customize',
  },
  {
    title: "Continuously learning",
    body: "Learns continuously and gets better every week.",
    size: 's',
    visual: 'learning',
  },
];

export function LeadFeatureCard() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [orbState, setOrbState] = useState<'thinking' | 'responding'>('thinking');

  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      setTheme(currentTheme || 'light');
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  // Cycle between thinking and responding states
  useEffect(() => {
    const interval = setInterval(() => {
      setOrbState((prev) => (prev === 'thinking' ? 'responding' : 'thinking'));
    }, 3000); // Switch every 3 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative flex h-full w-full items-center justify-center overflow-hidden">
      {/* Animated Orb background with breathing effect */}
      <motion.div 
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
        style={{ zIndex: 0 }}
        animate={{
          scale: [1, 1.1, 1, 1.05, 1],
          opacity: [0.3, 0.4, 0.3, 0.35, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <Orb state={orbState} size={200} theme={theme} />
      </motion.div>
      
      {/* Text content */}
      <div className="relative z-10 flex w-full flex-col items-center justify-center py-4 text-center">
        <p 
          className="max-w-2xl text-pretty text-2xl font-semibold leading-tight tracking-tight md:text-3xl"
          style={{ fontFamily: '"Arima", var(--font-geist-sans), system-ui, -apple-system, sans-serif' }}
        >
          "Feels like working with colleagues who know their sh*t"
        </p>
      </div>
    </div>
  );
}

function AclMiniViz() {
  return (
    <div className="before:bg-(--color-border) relative mt-3 before:absolute before:inset-0 before:mx-auto before:w-px sm:before:hidden">
      <div className="relative flex flex-col justify-center space-y-3 py-2">
        <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2 self-end">
          <span className="block h-fit rounded border px-2 py-0.5 text-[10px] shadow-sm">Likeur</span>
          <div className="ring-background size-6 ring-2">
            <img className="size-full rounded-full" src="https://avatars.githubusercontent.com/u/102558960?v=4" alt="User avatar Likeur" />
          </div>
        </div>
        <div className="relative ml-[calc(50%-0.75rem)] flex items-center gap-2">
          <div className="ring-background size-7 ring-2">
            <img className="size-full rounded-full" src="https://avatars.githubusercontent.com/u/47919550?v=4" alt="User avatar M. Irung" />
          </div>
          <span className="block h-fit rounded border px-2 py-0.5 text-[10px] shadow-sm">M. Irung</span>
        </div>
        <div className="relative flex w-[calc(50%+0.875rem)] items-center justify-end gap-2 self-end">
          <span className="block h-fit rounded border px-2 py-0.5 text-[10px] shadow-sm">B. Ng</span>
          <div className="ring-background size-6 ring-2">
            <img className="size-full rounded-full" src="https://avatars.githubusercontent.com/u/31113941?v=4" alt="User avatar B. Ng" />
          </div>
        </div>
      </div>
    </div>
  );
}

export function FeatureTile({ title, body, visual, rightAlign }: Feature & { rightAlign?: boolean }) {
  return (
    <div className="group relative flex h-full flex-col justify-between">
      {visual && (
        <span className="pointer-events-none absolute right-3 top-3 h-8 w-8 rounded-full bg-gradient-to-br from-primary/25 to-transparent blur-xl" />
      )}
      <div className={`space-y-2 ${rightAlign ? 'text-right' : ''}`}>
        <h4 className="text-base font-semibold leading-snug tracking-tight md:text-lg">{title}</h4>
        <p className="text-sm leading-relaxed text-foreground/80 md:text-base">{body}</p>
      </div>
      {visual && (
        <div className={visual === 'tools' || visual === 'languages' || visual === 'unstructured' || visual === 'customize' || visual === 'learning' ? 'mt-2' : 'mt-4 border-t border-white/25 pt-4 dark:border-white/10'}>
          {visual === 'acl' && <AclMiniViz />}
          {visual === 'tools' && <ToolsLogos />}
          {visual === 'languages' && (
            <LanguageGrid
              compact
              targetCount={48}
              languages={[
                { code: 'en', label: 'English', hello: 'Hello' },
                { code: 'es', label: 'Español', hello: 'Hola' },
                { code: 'hi', label: 'हिन्दी', hello: 'नमस्ते' },
                { code: 'it', label: 'Italiano', hello: 'Ciao' },
              ]}
            />
          )}
          {visual === 'unstructured' && (
            <UnstructuredGrid />
          )}
          {visual === 'customize' && (
            <CustomizationGrid />
          )}
          {visual === 'learning' && (
            <KnowledgeAccumulation />
          )}
        </div>
      )}
    </div>
  );
}

export function FeaturesGrid({
  features = FEATURES,
  fullHeight,
}: {
  features?: Feature[];
  fullHeight?: boolean;
}) {
  const [theme, setTheme] = useState<ThemeType>('light');

  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as ThemeType;
      setTheme(currentTheme || 'light');
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section aria-labelledby="product-features-heading" style={fullHeight ? { height: '100%' } : undefined}>
      <h2 id="product-features-heading" className="sr-only">
        Product features
      </h2>

      <div className="grid h-full grid-cols-6 grid-flow-dense gap-3">
        <div
          className="col-span-full h-full sm:col-span-3 sm:col-start-2 sm:row-start-2 lg:col-span-2 lg:col-start-3 lg:row-start-2 animate-[featureFade_500ms_ease_1_both]"
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', backdropFilter: 'none', WebkitBackdropFilter: 'none', padding: 0 }}
        >
          <LeadFeatureCard />
        </div>

        {features.map((f, idx) => {
          const span = f.size === 'l' ? 'lg:col-span-4' : f.size === 'm' ? 'lg:col-span-3' : 'lg:col-span-2';
          const tall = f.tall ? 'lg:row-span-2' : '';
          const minH = f.tall ? 360 : 220;
          
          // Special treatment for the "Not generic" tile
          const isNotGenericTile = f.title === "Not generic, built by growth experts specially for mainstreet";
          
          if (isNotGenericTile) {
            return (
              <div
                key={f.title}
                className={`col-span-full h-full sm:col-span-3 ${span} ${tall} animate-[featureFade_500ms_ease_1_both] relative overflow-hidden rounded-lg`}
                style={{ animationDelay: `${80 * (idx + 1)}ms`, minHeight: minH }}
              >
                <Background theme={theme} variant="contained" className="absolute inset-0" />
                <div className="relative z-10 h-full flex flex-col justify-between p-6">
                  <GlassCard
                    variant={theme === 'dark' ? 'frosted' : 'frosted'}
                    padding={24}
                    borderRadius={12}
                    className="shimmer-border"
                    style={{
                      background: theme === 'dark' 
                        ? 'rgba(60, 60, 60, 0.4)' 
                        : 'rgba(255, 255, 255, 0.15)',
                      backdropFilter: 'blur(30px) saturate(200%) brightness(1.1)',
                      WebkitBackdropFilter: 'blur(30px) saturate(200%) brightness(1.1)',
                      border: theme === 'dark'
                        ? '1px solid rgba(255, 255, 255, 0.15)'
                        : '1px solid rgba(255, 255, 255, 0.25)',
                      boxShadow: theme === 'dark'
                        ? '0 8px 40px rgba(0, 0, 0, 0.3), inset 0 0 30px rgba(255, 255, 255, 0.08)'
                        : '0 8px 40px rgba(0, 0, 0, 0.12), inset 0 0 30px rgba(255, 255, 255, 0.15)',
                    }}
                  >
                    <FeatureTile {...f} rightAlign />
                  </GlassCard>
                </div>
              </div>
            );
          }
          
          if (!f.visual) {
            return (
              <GlassCard
                key={f.title}
                variant="minimal"
                padding={24}
                borderRadius={12}
                className={`col-span-full h-full sm:col-span-3 ${span} ${tall} animate-[featureFade_500ms_ease_1_both] shimmer-border`}
                style={{ animationDelay: `${80 * (idx + 1)}ms`, minHeight: minH }}
              >
                <FeatureTile {...f} />
              </GlassCard>
            );
          }
          
          const isLearning = f.visual === 'learning';
          
          return (
            <GlassCard
              key={f.title}
              variant="minimal"
              padding={24}
              borderRadius={12}
              className={`col-span-full h-full sm:col-span-3 ${span} ${tall} animate-[featureFade_500ms_ease_1_both] shimmer-border`}
              style={{ 
                animationDelay: `${80 * (idx + 1)}ms`, 
                minHeight: minH,
                position: 'relative',
              }}
            >
              {isLearning && (
                <>
                  {/* Top border shimmer */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '-2px',
                      left: '0',
                      width: '45%',
                      height: '2px',
                      background: 'linear-gradient(90deg, rgba(118, 186, 153, 0) 0%, rgba(118, 186, 153, 0.4) 30%, rgba(118, 186, 153, 0.9) 50%, rgba(118, 186, 153, 0.4) 70%, rgba(118, 186, 153, 0) 100%)',
                      backgroundSize: '200% 100%',
                      borderRadius: '12px 0 0 0',
                      pointerEvents: 'none',
                      zIndex: 1,
                      animation: 'shimmer-partial-top 3s ease-in-out infinite',
                    }}
                  />
                  {/* Left border shimmer */}
                  <div
                    style={{
                      position: 'absolute',
                      top: '0',
                      left: '-2px',
                      width: '2px',
                      height: '35%',
                      background: 'linear-gradient(180deg, rgba(118, 186, 153, 0) 0%, rgba(118, 186, 153, 0.4) 30%, rgba(118, 186, 153, 0.9) 50%, rgba(118, 186, 153, 0.4) 70%, rgba(118, 186, 153, 0) 100%)',
                      backgroundSize: '100% 200%',
                      borderRadius: '12px 0 0 0',
                      pointerEvents: 'none',
                      zIndex: 1,
                      animation: 'shimmer-partial-left 3s ease-in-out infinite',
                    }}
                  />
                </>
              )}
              <div style={{ position: 'relative', zIndex: 2 }}>
                <FeatureTile {...f} />
              </div>
            </GlassCard>
          );
        })}
      </div>

      <style>{`
        @keyframes featureFade {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes shimmer-partial-top {
          0% {
            background-position: -200% 0;
          }
          100% {
            background-position: 200% 0;
          }
        }
        @keyframes shimmer-partial-left {
          0% {
            background-position: 0 -200%;
          }
          100% {
            background-position: 0 200%;
          }
        }
      `}</style>
    </section>
  );
}

export default FeaturesGrid;


