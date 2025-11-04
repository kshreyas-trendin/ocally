'use client';

import { useEffect, useRef } from 'react';

type MouseTrailEffectProps = {
  theme?: 'light' | 'dark';
};

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
  hue: number;
  rotation: number;
  rotationSpeed: number;
};

export const MouseTrailEffect = ({ theme = 'light' }: MouseTrailEffectProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dotsRef = useRef<Array<Particle>>([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Get the parent section element
    const parentSection = canvas.parentElement;
    if (!parentSection) return;

    // Set canvas size to match parent
    const updateSize = () => {
      const rect = parentSection.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    };
    updateSize();
    window.addEventListener('resize', updateSize);

    // Mouse move handler - attached to parent section
    const handleMouseMove = (e: MouseEvent) => {
      const rect = parentSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Check if mouse is within bounds
      if (x < 0 || x > rect.width || y < 0 || y > rect.height) {
        return;
      }

      mouseRef.current = { x, y };

      // Add new particles with varying properties
      const particleCount = Math.random() > 0.5 ? 2 : 3; // Vary particle count
      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.5 + Math.random() * 1.5;
        const spread = 15;
        
        dotsRef.current.push({
          x: mouseRef.current.x + (Math.random() - 0.5) * spread,
          y: mouseRef.current.y + (Math.random() - 0.5) * spread,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          size: 2 + Math.random() * 3, // Varying sizes: 2-5px
          hue: 158 + (Math.random() - 0.5) * 30, // Color variation around green
          rotation: Math.random() * Math.PI * 2,
          rotationSpeed: (Math.random() - 0.5) * 0.1
        });
      }
    };

    // Attach listener to parent section instead of canvas
    parentSection.addEventListener('mousemove', handleMouseMove);

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      dotsRef.current = dotsRef.current.filter(particle => {
        // Physics updates
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.rotation += particle.rotationSpeed;
        
        // Add subtle deceleration and drift
        particle.vx *= 0.98;
        particle.vy *= 0.98;
        particle.vy -= 0.05; // Slight upward float
        
        // Life decay with ease-out curve
        particle.life -= 0.015;

        if (particle.life > 0) {
          // Ease-out opacity curve for smoother fade
          const easedLife = 1 - Math.pow(1 - particle.life, 2);
          const opacity = easedLife * 0.8;
          
          // Dynamic saturation and lightness based on theme
          const saturation = theme === 'dark' ? 45 : 50;
          const lightness = theme === 'dark' ? 60 : 55;
          
          // Main particle with glow
          ctx.save();
          
          // Outer glow
          ctx.shadowBlur = particle.size * 3;
          ctx.shadowColor = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${opacity * 0.6})`;
          
          // Draw particle
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          ctx.fillStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness}%, ${opacity})`;
          ctx.fill();
          
          // Inner bright core for sparkle effect
          if (particle.life > 0.7) {
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(particle.x, particle.y, particle.size * 0.4, 0, Math.PI * 2);
            ctx.fillStyle = `hsla(${particle.hue}, ${saturation}%, ${lightness + 20}%, ${opacity})`;
            ctx.fill();
          }
          
          ctx.restore();
          return true;
        }
        return false;
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      parentSection.removeEventListener('mousemove', handleMouseMove);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none'
      }}
    />
  );
};

