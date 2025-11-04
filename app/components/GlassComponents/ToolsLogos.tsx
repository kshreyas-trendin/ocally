"use client";

import React, { useEffect, useState } from "react";

type ToolsLogosProps = {
  domains?: string[];
  token?: string;
  className?: string;
};

const DEFAULT_DOMAINS: string[] = [
  // Payments / POS
  "stripe.com",
  "squareup.com",
  // Commerce / Operations
  "shopify.com",
  // Marketing / CRM
  "mailchimp.com",
  "hubspot.com",
  "zapier.com",
  // Productivity / Comms
  "slack.com",
  "notion.so",
  // Finance
  "quickbooks.intuit.com",
  "xero.com",
  // Local discovery / digital channels
  "maps.google.com",
  "tripadvisor.com",
  "facebook.com",
  "instagram.com",
  "tiktok.com",
];

export const ToolsLogos: React.FC<ToolsLogosProps> = ({
  domains = DEFAULT_DOMAINS,
  token = "pk_eDgZwavtQEKmKQc5DjPMqw",
  className = "",
}) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    // Check initial theme
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    checkTheme();

    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    // Also listen to media query changes for system preference
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleMediaChange = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark" || (!theme && mediaQuery.matches));
    };
    mediaQuery.addEventListener("change", handleMediaChange);

    return () => {
      observer.disconnect();
      mediaQuery.removeEventListener("change", handleMediaChange);
    };
  }, []);

  // Helper function to format domain name nicely
  const formatProductName = (domain: string): string => {
    // Remove .com, .so, etc. and get the main part
    const mainPart = domain.split(".")[0];
    // Handle special cases
    if (domain.includes("quickbooks")) return "QuickBooks";
    if (domain.includes("maps.google")) return "Google Maps";
    // Capitalize first letter
    return mainPart.charAt(0).toUpperCase() + mainPart.slice(1);
  };

  // Use all domains with 3 fixed spoke lengths alternating
  const displayDomains = domains;
  
  // Glass effect styles based on theme
  const glassStyles = isDark
    ? {
        background: "rgba(0, 0, 0, 0.3)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.1)",
      }
    : {
        background: "rgba(255, 255, 255, 0.1)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
      };
  
  // Tooltip glass styles
  const tooltipGlassStyles = isDark
    ? {
        background: "rgba(0, 0, 0, 0.5)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        color: "rgba(255, 255, 255, 0.95)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.4)",
      }
    : {
        background: "rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        border: "1px solid rgba(255, 255, 255, 0.25)",
        color: "rgba(0, 0, 0, 0.9)",
        boxShadow: "0 4px 16px rgba(0, 0, 0, 0.15)",
      };
  
  // 3 fixed radii: short, medium, long
  const radii = [90, 130, 170];
  
  // Calculate positions - alternate spoke lengths uniformly
  const logoPositions = displayDomains.map((domain, index) => {
    // Alternate: index 0 = short, 1 = medium, 2 = long, 3 = short, etc.
    const radiusIndex = index % 3;
    const radius = radii[radiusIndex];
    
    // Distribute evenly around the circle
    const angle = (index * 2 * Math.PI) / displayDomains.length - Math.PI / 2;
    
    const x = Math.cos(angle) * radius;
    const y = Math.sin(angle) * radius;
    
    return { x, y, domain, radius };
  });

  // Find max radius for SVG sizing
  const maxRadius = Math.max(...radii);

  const svgSize = maxRadius * 2.6;
  const centerX = svgSize / 2;
  const centerY = svgSize / 2;

  return (
    <div className={`relative flex items-center justify-center ${className}`.trim()} style={{ padding: 20, minHeight: 360 }}>
      {/* Connecting lines */}
      <svg
        className="pointer-events-none absolute left-1/2 top-1/2 -z-0 -translate-x-1/2 -translate-y-1/2"
        width={svgSize}
        height={svgSize}
        style={{ overflow: "visible" }}
      >
        {logoPositions.map((pos, index) => (
          <line
            key={index}
            x1={centerX}
            y1={centerY}
            x2={centerX + pos.x}
            y2={centerY + pos.y}
            stroke="currentColor"
            strokeWidth="1"
            className="text-foreground/15"
          />
        ))}
      </svg>

      {/* Central text with smudge background */}
      <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 text-center">
        {/* Smudge background */}
        <div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
          style={{
            width: "120px",
            height: "60px",
            background: isDark
              ? "radial-gradient(circle, rgba(118, 186, 153, 0.3) 0%, rgba(118, 186, 153, 0.1) 50%, transparent 100%)"
              : "radial-gradient(circle, rgba(118, 186, 153, 0.4) 0%, rgba(118, 186, 153, 0.2) 50%, transparent 100%)",
            filter: "blur(20px)",
            WebkitFilter: "blur(20px)",
            opacity: 0.6,
          }}
          aria-hidden="true"
        />
        <span
          className="relative text-sm font-semibold text-foreground md:text-base"
          aria-label="1000 more integrations"
          style={{ zIndex: 1 }}
        >
          +1000 more
        </span>
      </div>

      {/* Logos arranged with alternating spoke lengths */}
      {logoPositions.map((pos) => {
        const productName = formatProductName(pos.domain);
        // Calculate tooltip position - place it slightly outward from logo center
        const tooltipOffset = 28;
        const angle = Math.atan2(pos.y, pos.x);
        const tooltipX = Math.cos(angle) * tooltipOffset;
        const tooltipY = Math.sin(angle) * tooltipOffset;
        
        return (
          <div
            key={pos.domain}
            className="group/logo absolute left-1/2 top-1/2 z-20"
            style={{
              transform: `translate(calc(-50% + ${pos.x}px), calc(-50% + ${pos.y}px))`,
            }}
          >
            {/* Logo container */}
            <div
              className="flex h-8 w-8 items-center justify-center rounded-lg transition-all duration-200 group-hover/logo:scale-105 md:h-10 md:w-10"
              style={glassStyles}
              aria-label={`${pos.domain} logo container`}
            >
              <img
                src={`https://img.logo.dev/${pos.domain}?token=${token}`}
                alt={`${pos.domain} logo`}
                loading="lazy"
                className="h-full w-full rounded-md object-contain opacity-85 transition-all duration-200 group-hover/logo:opacity-100"
              />
            </div>
            
            {/* Elegant tooltip on hover */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 whitespace-nowrap rounded-md px-2.5 py-1.5 text-xs font-medium opacity-0 transition-all duration-300 group-hover/logo:opacity-100"
              style={{
                transform: `translate(calc(-50% + ${tooltipX}px), calc(-50% + ${tooltipY}px))`,
                ...tooltipGlassStyles,
              }}
            >
              {productName}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default ToolsLogos;


