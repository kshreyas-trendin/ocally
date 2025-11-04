"use client";

import React, { useMemo } from "react";

type OrbState = "idle" | "background-task" | "thinking" | "listening" | "responding";

interface OrbProps {
  state?: OrbState;
  size?: number;
  theme?: "light" | "dark";
  className?: string;
  seed?: number | string;
}

// Generates a soft glassy container style similar to GlassComponents
function getGlassStyles(theme: "light" | "dark"): React.CSSProperties {
  if (theme === "dark") {
    return {
      background: "rgba(0, 0, 0, 0.3)",
    };
  }
  return {
    background: "rgba(255, 255, 255, 0.1)",
  };
}

const STATE_CONFIG: Record<OrbState, { hue: number; anim: string; glow: number }> = {
  idle: { hue: 150, anim: "orbIdle", glow: 0.35 },
  "background-task": { hue: 170, anim: "orbBackground", glow: 0.45 },
  thinking: { hue: 160, anim: "orbThinking", glow: 0.6 },
  listening: { hue: 155, anim: "orbListening", glow: 0.55 },
  responding: { hue: 165, anim: "orbResponding", glow: 0.65 },
};

// Simple seeded RNG (mulberry32)
function seedToRng(seed: number) {
  let t = seed >>> 0;
  return function () {
    t += 0x6D2B79F5;
    let r = Math.imul(t ^ (t >>> 15), 1 | t);
    r ^= r + Math.imul(r ^ (r >>> 7), 61 | r);
    return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
  };
}

function hashSeed(s: number | string | undefined) {
  if (s === undefined) return Math.floor(Math.random() * 2 ** 32);
  if (typeof s === "number") return s;
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h += (h << 1) + (h << 4) + (h << 7) + (h << 8) + (h << 24);
  }
  return h >>> 0;
}

export const Orb: React.FC<OrbProps> = ({
  state = "idle",
  size = 56,
  theme = "light",
  className = "",
  seed,
}) => {
  const { hue, anim, glow } = STATE_CONFIG[state];

  // Per-instance RNG
  const rng = useMemo(() => seedToRng(hashSeed(seed)), [seed]);

  // Instance variance
  const variance = useMemo(() => {
    const hueOffset = (rng() * 120 - 60); // -60..+60 (much wider)
    const rotationDeg = Math.floor(rng() * 360);
    const animDuration = 3.2 + rng() * 4.8; // 3.2s .. 8s
    const gradX = 10 + rng() * 80; // 10%..90%
    const gradY = 10 + rng() * 80; // 10%..90%
    const glowScale = 0.8 + rng() * 0.8; // 0.8..1.6
    const vertexCount = 6 + Math.floor(rng() * 9); // 6..14
    const baseRadius = 38 + rng() * 17; // 38..55
    const harmonicK = 2 + Math.floor(rng() * 4); // 2..5 lobes
    const amp1 = 6 + rng() * 18; // 6..24
    const amp2 = 4 + rng() * 14; // 4..18
    const phase1 = rng() * Math.PI * 2;
    const phase2 = rng() * Math.PI * 2;
    const gradientType: 'radial' | 'conic' = rng() > 0.5 ? 'radial' : 'conic';
    const skewX = (rng() * 20 - 10); // -10..+10 deg
    const skewY = (rng() * 16 - 8); // -8..+8 deg
    return { hueOffset, rotationDeg, animDuration, gradX, gradY, glowScale, vertexCount, baseRadius, harmonicK, amp1, amp2, phase1, phase2, gradientType, skewX, skewY };
  }, [rng]);

  // Harmonic blobby shape + inner variant; memoized per instance
  const { polygon, polygonInner } = useMemo(() => {
    const pts: Array<[number, number]> = [];
    const ptsInner: Array<[number, number]> = [];
    for (let i = 0; i < variance.vertexCount; i++) {
      const t = (i / variance.vertexCount) * Math.PI * 2;
      const r = variance.baseRadius
        + variance.amp1 * Math.sin(variance.harmonicK * t + variance.phase1)
        + variance.amp2 * Math.sin((variance.harmonicK + 1) * t + variance.phase2);
      const x = 50 + Math.cos(t) * r;
      const y = 50 + Math.sin(t) * r;
      pts.push([x, y]);

      const r2 = (variance.baseRadius - 6)
        + (variance.amp1 * 0.6) * Math.sin(variance.harmonicK * t + variance.phase1 + Math.PI / 3)
        + (variance.amp2 * 0.5) * Math.sin((variance.harmonicK + 1) * t + variance.phase2 + Math.PI / 5);
      const x2 = 50 + Math.cos(t) * r2;
      const y2 = 50 + Math.sin(t) * r2;
      ptsInner.push([x2, y2]);
    }
    return {
      polygon: pts.map(([x, y]) => `${x}% ${y}%`).join(', '),
      polygonInner: ptsInner.map(([x, y]) => `${x}% ${y}%`).join(', '),
    };
  }, [variance.vertexCount, variance.baseRadius, variance.amp1, variance.amp2, variance.harmonicK, variance.phase1, variance.phase2]);

  const containerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: 16,
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    boxShadow:
      theme === "dark"
        ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.1)"
        : "0 8px 32px rgba(31,38,35,0.37), inset 0 0 0 1px rgba(255,255,255,0.1)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
    overflow: "hidden",
    ...getGlassStyles(theme),
  };

  const coreStyle: React.CSSProperties = {
    width: Math.floor(size * 0.8),
    height: Math.floor(size * 0.8),
    filter: `drop-shadow(0 6px 18px hsla(${hue + variance.hueOffset}, 45%, 55%, ${glow * variance.glowScale}))`,
    position: "relative",
    transition: "transform 0.3s ease",
    animation: `${anim} ${variance.animDuration}s ease-in-out infinite`,
    clipPath: `polygon(${polygon})`,
    background: variance.gradientType === 'radial'
      ? `radial-gradient(ellipse at ${variance.gradX}% ${variance.gradY}%, hsla(${hue + variance.hueOffset}, 60%, 65%, 0.85), hsla(${hue + variance.hueOffset}, 55%, 55%, 0.45) 45%, hsla(${hue + variance.hueOffset}, 55%, 50%, 0.2) 70%, transparent 100%)`
      : `conic-gradient(from ${variance.rotationDeg}deg at ${variance.gradX}% ${variance.gradY}%, hsla(${hue + variance.hueOffset}, 70%, 65%, 0.9), hsla(${hue + variance.hueOffset + 20}, 70%, 55%, 0.6), hsla(${hue + variance.hueOffset - 20}, 70%, 60%, 0.5), hsla(${hue + variance.hueOffset}, 70%, 65%, 0.9))`,
    transform: `rotate(${variance.rotationDeg}deg) skew(${variance.skewX}deg, ${variance.skewY}deg)`,
  };

  const innerStyle: React.CSSProperties = {
    position: 'absolute',
    inset: Math.floor(size * 0.08),
    clipPath: `polygon(${polygonInner})`,
    background: `radial-gradient(circle at ${variance.gradX}% ${variance.gradY}%, hsla(${hue + variance.hueOffset + 10}, 70%, 70%, 0.35), transparent 70%)`,
    filter: `blur(0.5px)`,
    opacity: 0.7,
    mixBlendMode: 'screen',
    borderRadius: 16,
    pointerEvents: 'none',
  };

  const glossStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      "linear-gradient(135deg, rgba(255,255,255,0.35) 0%, rgba(255,255,255,0.08) 35%, transparent 60%)",
    mixBlendMode: "screen",
    pointerEvents: "none",
    borderRadius: 16,
  };

  const rimStyle: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: 16,
    boxShadow: `inset 0 0 0 1px hsla(${hue}, 60%, 60%, 0.25)`,
    pointerEvents: "none",
  };

  return (
    <div className={`orb ${className}`.trim()} style={containerStyle}>
      <div style={coreStyle} />
      <div style={innerStyle} />
      <div style={glossStyle} />
      <div style={rimStyle} />
      <style>{`
        @keyframes orbIdle {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-2px) scale(1.02); }
        }
        @keyframes orbBackground {
          0%, 100% { transform: translateY(0) translateX(0) scale(1); }
          25% { transform: translateY(-3px) translateX(1px) scale(1.02); }
          75% { transform: translateY(2px) translateX(-1px) scale(0.99); }
        }
        @keyframes orbThinking {
          0% { transform: scale(0.98); }
          25% { transform: scale(1.03); }
          50% { transform: scale(0.99); }
          75% { transform: scale(1.05); }
          100% { transform: scale(0.98); }
        }
        @keyframes orbListening {
          0%, 100% { transform: translateY(0) }
          20% { transform: translateY(-3px) }
          40% { transform: translateY(0) }
          60% { transform: translateY(-2px) }
          80% { transform: translateY(0) }
        }
        @keyframes orbResponding {
          0% { transform: scale(1); }
          10% { transform: scale(1.05); }
          20% { transform: scale(1); }
          30% { transform: scale(1.05); }
          40% { transform: scale(1); }
          100% { transform: scale(1); }
        }
      `}</style>
    </div>
  );
};

export default Orb;

