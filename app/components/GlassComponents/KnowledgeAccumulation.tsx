"use client";

import React, { useEffect, useState } from "react";
import { motion } from "motion/react";
import { Brain, MessageSquare, TrendingUp, Users, Sparkles } from "lucide-react";
import { cn } from "../../lib/utils";

interface ContinuousLearningMemoryProps {
  className?: string;
  circleText?: string;
  memoryItems?: {
    first: string;
    second: string;
    third: string;
    fourth: string;
    fifth: string;
  };
  userQueries?: {
    first: string;
    second: string;
  };
  title?: string;
  lightColor?: string;
}

const ContinuousLearningMemory = ({
  className,
  circleText,
  memoryItems,
  userQueries,
  title,
  lightColor = "#76ba99",
}: ContinuousLearningMemoryProps) => {
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
  const defaultMemoryItems = {
    first: "Business Goals",
    second: "Patterns",
    third: "Preferences",
    fourth: "Schedule",
    fifth: "more..."
  };

  const defaultUserQueries = {
    first: "Analyze my sales",
    second: "Ways to increase revenue"
  };

  const memories = memoryItems || defaultMemoryItems;
  const queries = userQueries || defaultUserQueries;

  return (
    <div
      className={cn(
        "relative flex h-[350px] w-full max-w-[500px] flex-col items-center",
        className
      )}
    >
      {/* SVG Paths - Flow from memory to users through agents */}
      <svg
        className="h-full sm:w-full"
        width="100%"
        height="100%"
        viewBox="0 0 200 100"
      >
        <g
          stroke={lightColor}
          fill="none"
          strokeWidth="0.4"
          strokeDasharray="100 100"
          pathLength="100"
          opacity="0.3"
        >
          {/* Paths from memory down to agents then to users */}
          <path d="M 50 10 v 15 q 0 5 5 5 h 40 q 5 0 5 5 v 10" />
          <path d="M 80 10 v 10 q 0 5 5 5 h 10 q 5 0 5 5 v 15" />
          <path d="M 120 10 v 10 q 0 5 -5 5 h -10 q -5 0 -5 5 v 15" />
          <path d="M 150 10 v 15 q 0 5 -5 5 h -40 q -5 0 -5 5 v 10" />
          
          {/* Animation For Path Starting */}
          <animate
            attributeName="stroke-dashoffset"
            from="100"
            to="0"
            dur="1s"
            fill="freeze"
            calcMode="spline"
            keySplines="0.25,0.1,0.5,1"
            keyTimes="0; 1"
          />
        </g>
        
        {/* Primary color lights for learning flow */}
        <g mask="url(#cl-mask-1)">
          <circle
            className="learning cl-light-1"
            cx="0"
            cy="0"
            r="12"
            fill="url(#cl-primary-grad)"
          />
        </g>
        <g mask="url(#cl-mask-2)">
          <circle
            className="learning cl-light-2"
            cx="0"
            cy="0"
            r="12"
            fill="url(#cl-primary-grad)"
          />
        </g>
        <g mask="url(#cl-mask-3)">
          <circle
            className="learning cl-light-3"
            cx="0"
            cy="0"
            r="12"
            fill="url(#cl-primary-grad)"
          />
        </g>
        <g mask="url(#cl-mask-4)">
          <circle
            className="learning cl-light-4"
            cx="0"
            cy="0"
            r="12"
            fill="url(#cl-primary-grad)"
          />
        </g>
        
        <defs>
          {/* Masks for light paths */}
          <mask id="cl-mask-1">
            <path
              d="M 50 10 v 15 q 0 5 5 5 h 40 q 5 0 5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="cl-mask-2">
            <path
              d="M 80 10 v 10 q 0 5 5 5 h 10 q 5 0 5 5 v 15"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="cl-mask-3">
            <path
              d="M 120 10 v 10 q 0 5 -5 5 h -10 q -5 0 -5 5 v 15"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          <mask id="cl-mask-4">
            <path
              d="M 150 10 v 15 q 0 5 -5 5 h -40 q -5 0 -5 5 v 10"
              strokeWidth="0.5"
              stroke="white"
            />
          </mask>
          
          {/* Primary Gradient */}
          <radialGradient id="cl-primary-grad" fx="1">
            <stop offset="0%" stopColor={lightColor} />
            <stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        </svg>

      {/* Memory Box at Top */}
      <div 
        className="absolute top-0 z-20 w-[90%] rounded-lg border p-3 backdrop-blur-sm"
        style={{
          borderColor: isDark ? `${lightColor}30` : `${lightColor}40`,
          background: isDark 
            ? `linear-gradient(to bottom right, rgba(0, 0, 0, 0.4), ${lightColor}15, transparent)`
            : `linear-gradient(to bottom right, ${lightColor}15, ${lightColor}05, transparent)`,
        }}
      >
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-foreground flex items-center gap-1">
            <Brain className="size-3" style={{ color: lightColor }} />
            Memory
          </h3>
          <Sparkles className="size-3" style={{ color: lightColor }} />
        </div>
        <div className="flex flex-wrap gap-1.5">
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] text-foreground/80"
            style={{
              background: isDark ? `${lightColor}20` : `${lightColor}15`,
              border: `1px solid ${lightColor}30`,
            }}
          >
            {memories.first}
          </span>
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] text-foreground/80"
            style={{
              background: isDark ? `${lightColor}20` : `${lightColor}15`,
              border: `1px solid ${lightColor}30`,
            }}
          >
            {memories.second}
          </span>
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] text-foreground/80"
            style={{
              background: isDark ? `${lightColor}20` : `${lightColor}15`,
              border: `1px solid ${lightColor}30`,
            }}
          >
            {memories.third}
          </span>
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] text-foreground/80"
            style={{
              background: isDark ? `${lightColor}20` : `${lightColor}15`,
              border: `1px solid ${lightColor}30`,
            }}
          >
            {memories.fourth}
          </span>
          <span 
            className="px-2 py-0.5 rounded-full text-[9px] text-foreground/80 italic"
            style={{
              background: isDark ? `${lightColor}20` : `${lightColor}15`,
              border: `1px solid ${lightColor}30`,
            }}
          >
            {memories.fifth}
          </span>
        </div>
      </div>
      
      {/* Main Box */}
      <div className="absolute bottom-10 flex w-full flex-col items-center">
        {/* bottom shadow with primary color tint */}
        <div 
          className="absolute -bottom-4 h-[100px] w-[62%] rounded-lg"
          style={{
            background: isDark 
              ? `linear-gradient(to top, rgba(0, 0, 0, 0.3), ${lightColor}10, transparent)`
              : `linear-gradient(to top, ${lightColor}15, ${lightColor}05, transparent)`,
          }}
        />
        
        {/* Ocally Agents title */}
        <div 
          className="absolute -top-3 z-20 flex items-center justify-center rounded-lg border backdrop-blur-sm px-2 py-1 sm:-top-4 sm:py-1.5"
          style={{
            borderColor: isDark ? `${lightColor}35` : `${lightColor}40`,
            background: isDark 
              ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.5), ${lightColor}25)`
              : `linear-gradient(to bottom, ${lightColor}20, rgba(255, 255, 255, 0.9))`,
          }}
        >
          <Brain className="size-3" style={{ color: lightColor }} />
          <span className="ml-2 text-[10px] text-foreground">
            {title || "Ocally Agents"}
          </span>
        </div>

        {/* Users circle */}
        <div 
          className="absolute -bottom-8 z-30 grid h-[60px] w-[60px] place-items-center rounded-full font-semibold text-xs"
          style={{
            borderTop: `2px solid ${lightColor}50`,
            borderRight: `1px solid ${lightColor}30`,
            borderLeft: `1px solid ${lightColor}30`,
            borderBottom: `1px solid ${lightColor}20`,
            background: `linear-gradient(to bottom right, ${lightColor}25, ${lightColor}10, transparent)`,
          }}
        >
          <Users className="size-4" style={{ color: lightColor }} />
          <span className="text-[10px] text-foreground/80">{circleText || "Users"}</span>
        </div>

        {/* User Interactions Box */}
        <div 
          className="relative z-10 flex h-[150px] w-full items-center justify-center overflow-hidden rounded-lg border shadow-md"
          style={{
            borderColor: isDark ? `${lightColor}25` : `${lightColor}30`,
            background: isDark 
              ? `linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.4))`
              : `linear-gradient(to bottom, ${lightColor}08, rgba(255, 255, 255, 0.95))`,
          }}
        >
          {/* User Interaction Chips positioned next to pulsating circles */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            {/* First query chip on left side of pulsating circles */}
            <div className="absolute left-8 bottom-16">
              <motion.div
                className="h-5 rounded-full backdrop-blur-sm px-2 text-[8px] flex items-center gap-1.5"
                style={{
                  background: isDark ? `linear-gradient(135deg, rgba(0, 0, 0, 0.6), ${lightColor}30)` : `${lightColor}20`,
                  border: `1px solid ${lightColor}40`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
              >
                <MessageSquare className="size-2.5" style={{ color: lightColor }} />
                <span className="text-foreground/80 whitespace-nowrap">{queries.first}</span>
              </motion.div>
            </div>
            
            {/* Second query chip on right side of pulsating circles */}
            <div className="absolute right-8 bottom-16">
              <motion.div
                className="h-5 rounded-full backdrop-blur-sm px-2 text-[8px] flex items-center gap-1.5"
                style={{
                  background: isDark ? `linear-gradient(135deg, rgba(0, 0, 0, 0.6), ${lightColor}30)` : `${lightColor}20`,
                  border: `1px solid ${lightColor}40`,
                }}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8 }}
              >
                <TrendingUp className="size-2.5" style={{ color: lightColor }} />
                <span className="text-foreground/80 whitespace-nowrap text-[7px] sm:text-[8px]">
                  <span className="hidden sm:inline">{queries.second}</span>
                  <span className="sm:hidden">Revenue tips</span>
                </span>
              </motion.div>
            </div>
          </div>
          
          {/* Pulsating Circles with primary color accents */}
          <motion.div
            className="absolute -bottom-14 h-[100px] w-[100px] rounded-full"
            style={{
              borderTop: `2px solid ${lightColor}40`,
              borderRight: `1px solid ${lightColor}25`,
              borderLeft: `1px solid ${lightColor}25`,
              borderBottom: `1px solid ${lightColor}15`,
              background: `radial-gradient(circle, ${lightColor}15, ${lightColor}05, transparent)`,
            }}
            animate={{
              scale: [0.98, 1.02, 0.98, 1, 1, 1, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-20 h-[145px] w-[145px] rounded-full"
            style={{
              borderTop: `1px solid ${lightColor}30`,
              borderRight: `1px solid ${lightColor}20`,
              borderLeft: `1px solid ${lightColor}20`,
              borderBottom: `1px solid ${lightColor}10`,
              background: `radial-gradient(circle, ${lightColor}10, ${lightColor}03, transparent)`,
            }}
            animate={{
              scale: [1, 1, 1, 0.98, 1.02, 0.98, 1, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[100px] h-[190px] w-[190px] rounded-full"
            style={{
              borderTop: `1px solid ${lightColor}25`,
              borderRight: `1px solid ${lightColor}15`,
              borderLeft: `1px solid ${lightColor}15`,
              borderBottom: `1px solid ${lightColor}08`,
              background: `radial-gradient(circle, ${lightColor}08, ${lightColor}02, transparent)`,
            }}
            animate={{
              scale: [1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <motion.div
            className="absolute -bottom-[120px] h-[235px] w-[235px] rounded-full"
            style={{
              borderTop: `1px solid ${lightColor}20`,
              borderRight: `1px solid ${lightColor}12`,
              borderLeft: `1px solid ${lightColor}12`,
              borderBottom: `1px solid ${lightColor}06`,
              background: `radial-gradient(circle, ${lightColor}06, ${lightColor}02, transparent)`,
            }}
            animate={{
              scale: [1, 1, 1, 1, 1, 1, 0.98, 1.02, 0.98, 1],
            }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </div>
      </div>

      {/* CSS for animated lights */}
      <style jsx>{`
        .cl-light-1 {
          animation: cl-move-1 3s infinite linear;
        }
        .cl-light-2 {
          animation: cl-move-2 3s infinite linear;
          animation-delay: 0.75s;
        }
        .cl-light-3 {
          animation: cl-move-3 3s infinite linear;
          animation-delay: 1.5s;
        }
        .cl-light-4 {
          animation: cl-move-4 3s infinite linear;
          animation-delay: 2.25s;
        }
        
        @keyframes cl-move-1 {
          0% { cx: 50; cy: 10; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 100; cy: 45; opacity: 0; }
        }
        
        @keyframes cl-move-2 {
          0% { cx: 80; cy: 10; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 100; cy: 45; opacity: 0; }
        }
        
        @keyframes cl-move-3 {
          0% { cx: 120; cy: 10; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 100; cy: 45; opacity: 0; }
        }
        
        @keyframes cl-move-4 {
          0% { cx: 150; cy: 10; opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { cx: 100; cy: 45; opacity: 0; }
        }
      `}</style>
    </div>
  );
};

export default ContinuousLearningMemory;

export const KnowledgeAccumulation = ContinuousLearningMemory;