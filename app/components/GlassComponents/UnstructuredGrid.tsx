"use client";

import React, { useEffect, useState } from "react";

type Item = { key: string; label: string; hint?: string; Icon: React.FC<React.SVGProps<SVGSVGElement>> };

const PRIMARY_COLOR = "#76ba99";

// Minimal, Apple‑style outline icons (currentColor)
const IconDoc: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z"/>
    <path d="M14 3v5h5"/>
  </svg>
);

const IconMail: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <path d="M3 7l9 6 9-6"/>
  </svg>
);

const IconChat: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M21 12a7 7 0 0 1-7 7H8l-5 3 1.2-4.3A7 7 0 1 1 21 12z"/>
  </svg>
);

const IconImage: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="3" y="5" width="18" height="14" rx="2"/>
    <circle cx="9" cy="10" r="2"/>
    <path d="M21 17l-5-5-4 4-2-2-5 5"/>
  </svg>
);

const IconPen: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <path d="M12 19l-7 2 2-7 9.5-9.5a2.1 2.1 0 0 1 3 3L12 19z"/>
  </svg>
);

const IconAudio: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" {...props}>
    <rect x="5" y="3" width="14" height="10" rx="2"/>
    <path d="M8 13v2a4 4 0 0 0 8 0v-2"/>
  </svg>
);

const DEFAULT_ITEMS: Item[] = [
  { key: "pdf", label: "PDF", hint: "Contracts, reports", Icon: IconDoc },
  { key: "email", label: "Email", hint: "Threads, receipts", Icon: IconMail },
  { key: "whatsapp", label: "WhatsApp", hint: "Chats, media", Icon: IconChat },
  { key: "images", label: "Images", hint: "Screenshots, photos", Icon: IconImage },
  { key: "handwritten", label: "Handwritten", hint: "Notes, forms", Icon: IconPen },
  { key: "audio", label: "Audio", hint: "Calls, memos", Icon: IconAudio },
];

export const UnstructuredGrid: React.FC<{ items?: Item[]; className?: string; compact?: boolean }> = ({
  items = DEFAULT_ITEMS,
  className = "",
  compact = true,
}) => {
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

  // Base glass styles (without border/background - applied per item)
  const baseGlassStyles = {
    backdropFilter: "blur(10px)",
    WebkitBackdropFilter: "blur(10px)",
  };

  return (
    <div className={`w-full ${className}`.trim()} style={{ padding: compact ? 16 : 20 }}>
      <div className={compact ? "grid grid-cols-3 gap-4 md:grid-cols-6" : "grid grid-cols-3 gap-6 md:grid-cols-6"}>
        {items.map((it) => (
          <div
            key={it.key}
            className="group/item flex flex-col items-center text-center transition-all duration-300"
          >
            {/* Glass icon container with primary color accent */}
            <div
              className="mb-3 flex h-16 w-16 items-center justify-center rounded-xl transition-all duration-300 group-hover/item:scale-110 md:h-20 md:w-20"
              style={{
                ...baseGlassStyles,
                border: `1px solid ${
                  isDark ? `${PRIMARY_COLOR}30` : `${PRIMARY_COLOR}40`
                }`,
                background: isDark
                  ? `linear-gradient(135deg, rgba(0, 0, 0, 0.4), ${PRIMARY_COLOR}15)`
                  : `linear-gradient(135deg, ${PRIMARY_COLOR}15, rgba(255, 255, 255, 0.15))`,
              }}
            >
              <it.Icon
                className="h-7 w-7 transition-colors duration-300 group-hover/item:text-[#76ba99] md:h-8 md:w-8"
                style={{ color: isDark ? "rgba(255, 255, 255, 0.9)" : "rgba(0, 0, 0, 0.8)" }}
                aria-hidden
                strokeWidth={1.8}
              />
            </div>
            <div
              className="text-sm font-semibold leading-tight transition-colors duration-300 group-hover/item:text-[#76ba99] md:text-base"
              style={{ color: isDark ? "rgba(255, 255, 255, 0.95)" : "rgba(0, 0, 0, 0.9)" }}
            >
              {it.label}
            </div>
            {it.hint && (
              <div
                className="mt-1.5 text-xs font-normal leading-tight transition-opacity duration-300 group-hover/item:opacity-100 md:text-sm"
                style={{
                  color: isDark ? "rgba(255, 255, 255, 0.7)" : "rgba(0, 0, 0, 0.65)",
                  opacity: 0.85,
                }}
              >
                {it.hint}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UnstructuredGrid;


