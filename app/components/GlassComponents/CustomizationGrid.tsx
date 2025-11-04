"use client";

import React, { useEffect, useState } from "react";
import { cn } from "../../lib/utils";

const PRIMARY_COLOR = "#76ba99";

type BenefitItem = {
  key: string;
  benefit: string;
  description: string;
  Icon: React.FC<React.SVGProps<SVGSVGElement>>;
};

const IconClock: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="12" cy="12" r="9"/>
    <path d="M12 7v6l4 2"/>
  </svg>
);

const IconSpark: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M12 2l2 6 6 2-6 2-2 6-2-6-6-2 6-2 2-6z"/>
  </svg>
);

const IconKey: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <circle cx="7" cy="12" r="3"/>
    <path d="M10 12h10l-2 2 2 2"/>
  </svg>
);

const IconBell: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M18 16v-5a6 6 0 1 0-12 0v5l-2 2h16l-2-2z"/>
    <path d="M9 18a3 3 0 0 0 6 0"/>
  </svg>
);

const DEFAULT_BENEFITS: BenefitItem[] = [
  {
    key: "schedule",
    benefit: "Works when you work",
    description: "Set availability and let agents handle tasks around your schedule",
    Icon: IconClock,
  },
  {
    key: "personality",
    benefit: "Matches your voice",
    description: "Agents adapt to your communication style and brand tone",
    Icon: IconSpark,
  },
  {
    key: "access",
    benefit: "Uses your tools",
    description: "Integrates seamlessly with the tools you already trust",
    Icon: IconKey,
  },
  {
    key: "reminders",
    benefit: "Keeps you in the loop",
    description: "Smart notifications only when you need to know something",
    Icon: IconBell,
  },
];

function DisplayCard({
  className,
  icon,
  title,
  description,
  iconClassName = "text-[#76ba99]",
  titleClassName = "text-[#76ba99]",
  isDark = false,
}: {
  className?: string;
  icon?: React.ReactNode;
  title?: string;
  description?: string;
  iconClassName?: string;
  titleClassName?: string;
  isDark?: boolean;
}) {
  return (
    <div
      className={cn(
        "relative flex h-24 w-[28rem] select-none flex-col gap-2 rounded-xl border-2 backdrop-blur-sm px-5 py-3 transition-all duration-700 hover:border-white/20 md:h-28 md:w-[32rem]",
        isDark
          ? "bg-black/60 border-[#76ba99]/50 hover:border-[#76ba99]/70"
          : "bg-white/90 border-[#76ba99]/50 hover:border-[#76ba99]/70",
        className
      )}
    >
      <div className="flex items-center gap-2">
        <span
          className="relative inline-block rounded-full p-1"
          style={{
            background: isDark
              ? `linear-gradient(135deg, rgba(0, 0, 0, 0.6), ${PRIMARY_COLOR}50)`
              : `linear-gradient(135deg, ${PRIMARY_COLOR}40, ${PRIMARY_COLOR}20)`,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        >
          {icon}
        </span>
        <p 
          className={cn("text-sm font-medium md:text-base", titleClassName)}
          style={isDark ? { color: 'rgba(255, 255, 255, 0.95)' } : { color: '#1a1a1a' }}
        >
          {title}
        </p>
      </div>
      <p 
        className="text-[11px] leading-relaxed md:text-xs"
        style={isDark ? { color: 'rgba(255, 255, 255, 0.85)' } : { color: 'rgba(0, 0, 0, 0.7)' }}
      >
        {description}
      </p>
    </div>
  );
}

export const CustomizationGrid: React.FC<{
  items?: BenefitItem[];
  className?: string;
  compact?: boolean;
}> = ({ items = DEFAULT_BENEFITS, className = "", compact = true }) => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const checkTheme = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      setIsDark(theme === "dark");
    };

    checkTheme();

    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

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

  return (
    <div 
      className={cn("w-full relative", className)} 
      style={{ 
        padding: compact ? '12px 20px' : '16px 24px',
      }}
    >
      <div className="relative grid [grid-template-areas:'stack'] place-items-start md:place-items-start">
        {items.map((item, index) => {
          // Create a diagonal cascade effect: top-left to bottom-right
          // Adjusted for wider cards, lifted up
          const offsetX = index * 64; // Slightly more horizontal spacing
          const offsetY = index * 36 - 20;  // Lift all cards up by 20px
          
          return (
            <div
              key={item.key}
              className="[grid-area:stack] transition-transform duration-700"
              style={{
                transform: `translateX(${offsetX}px) translateY(${offsetY}px)`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = `translateX(${offsetX}px) translateY(${offsetY - 40}px)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = `translateX(${offsetX}px) translateY(${offsetY}px)`;
              }}
            >
              <DisplayCard
                icon={<item.Icon className="size-4" style={{ color: PRIMARY_COLOR }} />}
                title={item.benefit}
                description={item.description}
                isDark={isDark}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CustomizationGrid;


