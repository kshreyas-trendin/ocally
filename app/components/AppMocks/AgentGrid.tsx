 'use client';

import React, { useState, useEffect } from 'react';
import { GlassCard } from '../GlassComponents/GlassComponents';
import type { AgentIconKey } from '../../lib/agentIconGenerator';
import { Orb } from '../ui/orb';

// ============================================
// TYPES
// ============================================

interface AgentMetric {
  label: string;
  value: string;
}

interface Agent {
  id: string;
  title: string;
  description: string;
  why: string;           // The problem mainstreet businesses face
  soWhat: string;        // Lost opportunity / cost
  solution: string;      // What the agent does
  roiWeeks: string;      // ROI timeline
  icon: AgentIconKey;
  status: 'active' | 'beta';
  category: 'Acquire' | 'Loyalty' | 'Revenue';
  features: string[];
  metrics: AgentMetric[];
  tags: string[];
  detailedDescription?: string;
}

// ============================================
// THEME STYLES
// ============================================

const getThemeStyles = () => ({
  // Text colors that work in both themes
  text: {
    primary: 'text-foreground',
    secondary: 'text-foreground/70',
    muted: 'text-foreground/60',
    tertiary: 'text-foreground/50',
  },
  // Background colors
  bg: {
    chip: 'bg-foreground/5',
    chipActive: 'bg-[#76ba99]/20',
  },
  // Border colors
  border: {
    default: 'border-foreground/10',
    active: 'border-[#76ba99]/40',
  },
});

type FilterCategory = 'All' | 'Acquire' | 'Loyalty' | 'Revenue';

// ============================================
// AGENT ICONS (Replaced by Orb)
// ============================================

// ============================================
// AGENT DATA
// ============================================

const agents: Agent[] = [
  // Acquire New Users Agents
  {
    id: "listing-manager",
    title: "Listing Manager",
    description: "Manages local listings in 150+ local directories, keeping them seasonally relevant.",
    why: "Your business exists across 80+ directories with different data requirements and update processes",
    soWhat: "Inconsistent listings lose 66% of potential direction requests",
    solution: "Maintains perfect consistency across 150+ directories with automatic updates",
    roiWeeks: "4-6 weeks",
    detailedDescription: "The Listing Manager agent ensures your business maintains a strong presence across 150+ local directories. It automatically updates seasonal content, captures emerging trends, and performs regular accuracy checks. Never miss a local opportunity with intelligent directory management that adapts to your market.",
    icon: "listingManager",
    status: "active",
    category: "Acquire",
    features: [
      "150+ directory management",
      "Seasonal content updates",
      "Trend analysis & insights",
      "Automated accuracy checks"
    ],
    metrics: [
      { label: "Directories", value: "150+" },
      { label: "Uptime", value: "99.9%" }
    ],
    tags: ["Local SEO", "Directory Management", "Automation"]
  },
  {
    id: "local-seo-agent",
    title: "Local SEO Agent",
    description: "Tracks grid rankings for various keywords and suggests optimizations.",
    why: "SEO requires technical expertise, continuous optimization, and competitive monitoring you can't maintain",
    soWhat: "Position #1 vs #10 means $39,000 monthly revenue difference",
    solution: "Monitors rankings 24/7, adjusts strategy for 500+ algorithm changes yearly",
    roiWeeks: "8-12 weeks",
    detailedDescription: "Stay ahead of local competition with data-driven SEO strategies. This agent continuously monitors keyword rankings, analyzes competitor movements, and provides actionable optimization suggestions. Get real-time insights into your local search performance and dominate your market.",
    icon: "localSeo",
    status: "active",
    category: "Acquire",
    features: [
      "Keyword ranking tracking",
      "Competitor analysis",
      "Optimization suggestions",
      "Performance monitoring"
    ],
    metrics: [
      { label: "Keywords", value: "500+" },
      { label: "Avg. Position", value: "3.2" }
    ],
    tags: ["SEO", "Analytics", "Optimization"]
  },
  {
    id: "social-media-agent",
    title: "Social Media Agent",
    description: "Tracks performance across linked social media channels and helps plan content.",
    why: "Optimal engagement requires 9.5 posts daily per platform, 47 posts daily for 5 platforms",
    soWhat: "Sporadic posting means minimal ROI, making you conclude social doesn't work",
    solution: "Posts 47x daily across platforms with perfect timing and engagement",
    roiWeeks: "6-8 weeks",
    detailedDescription: "Maximize your social media ROI with intelligent content strategies. This agent analyzes post performance across all your channels, identifies optimal posting times, and helps you create content that resonates. Schedule posts, track engagement, and grow your social presence effortlessly.",
    icon: "socialMedia",
    status: "active",
    category: "Acquire",
    features: [
      "Multi-platform management",
      "Content scheduling",
      "Performance analytics",
      "ROI optimization"
    ],
    metrics: [
      { label: "Platforms", value: "8+" },
      { label: "Engagement", value: "↑23%" }
    ],
    tags: ["Social Media", "Content", "Analytics"]
  },
  {
    id: "reviews-agent",
    title: "Reviews Agent",
    description: "Manages review campaigns and auto-responds across 50+ publishers.",
    why: "Managing reviews across 80+ platforms requires dedicated personnel most businesses can't afford",
    soWhat: "73% of businesses respond to less than 25% of reviews, losing reputation and revenue",
    solution: "Monitors 80+ platforms 24/7, responds instantly with contextual intelligence",
    roiWeeks: "1-2 weeks",
    detailedDescription: "Turn customer feedback into growth opportunities. The Reviews Agent manages review campaigns across 50+ publishers, automatically responds to reviews with contextual replies, and extracts actionable business insights from customer sentiment. Build trust and improve your online reputation.",
    icon: "reviews",
    status: "active",
    category: "Acquire",
    features: [
      "50+ publisher integration",
      "Auto-response system",
      "Sentiment analysis",
      "Review campaign automation"
    ],
    metrics: [
      { label: "Publishers", value: "50+" },
      { label: "Response Rate", value: "95%" }
    ],
    tags: ["Reviews", "Reputation", "Automation"]
  },
  {
    id: "web-research-agent",
    title: "Web Research Agent",
    description: "Researches local events, news, and regulatory changes to keep you informed.",
    why: "Market intelligence requires hours of daily research across dozens of sources",
    soWhat: "You operate blind, making strategic decisions based on intuition not intelligence",
    solution: "Monitors competitors, trends, demographics across hundreds of sources 24/7",
    roiWeeks: "6-8 weeks",
    detailedDescription: "Stay informed about everything that affects your business. This agent continuously monitors local events, news trends, regulatory changes, and macro factors. Get timely alerts and insights that help you adapt your strategy and seize opportunities before your competitors.",
    icon: "webResearch",
    status: "beta",
    category: "Acquire",
    features: [
      "Real-time news monitoring",
      "Regulatory change alerts",
      "Event tracking",
      "Market analysis"
    ],
    metrics: [
      { label: "Sources", value: "200+" },
      { label: "Updates/Day", value: "50+" }
    ],
    tags: ["Research", "Intelligence", "Monitoring"]
  },
  {
    id: "data-analyst-agent",
    title: "Data Analyst Agent",
    description: "Plugs into different data sources to provide clean, actionable insights.",
    why: "Businesses generate millions of data points but extract almost no insight",
    soWhat: "You capture only 20-30% of opportunities hidden in your data patterns",
    solution: "Analyzes every transaction and interaction to find money hiding in patterns",
    roiWeeks: "4-6 weeks",
    detailedDescription: "Transform raw data into strategic decisions that drive growth. The Data Analyst Agent integrates with 25+ data sources, processes information in real-time, and delivers predictive analytics through custom dashboards. Make data-driven decisions with confidence.",
    icon: "dataAnalyst",
    status: "active",
    category: "Acquire",
    features: [
      "Multi-source data integration",
      "Real-time processing",
      "Predictive analytics",
      "Custom dashboards"
    ],
    metrics: [
      { label: "Data Sources", value: "25+" },
      { label: "Processing Time", value: "<1min" }
    ],
    tags: ["Analytics", "Data", "Insights"]
  },
  // Build Customer Loyalty Agents
  {
    id: "retention-agent",
    title: "Customer Retention Agent",
    description: "Tracks customer behavior patterns and identifies at-risk customers.",
    why: "Tracking and intervening for hundreds of customers individually is manually impossible",
    soWhat: "You lose 60-80% of customers after first purchase without understanding why",
    solution: "Tracks every customer pattern, triggers personalized recovery at perfect moment",
    roiWeeks: "3-4 weeks",
    detailedDescription: "Prevent customer churn before it happens. This agent analyzes behavior patterns, predicts churn risk, and automatically triggers personalized re-engagement campaigns. Maintain high retention rates with proactive, intelligent customer care.",
    icon: "retention",
    status: "active",
    category: "Loyalty",
    features: [
      "Behavior pattern analysis",
      "Churn prediction models",
      "Personalized campaigns",
      "Automated re-engagement"
    ],
    metrics: [
      { label: "Retention Rate", value: "87%" },
      { label: "Churn Reduction", value: "↓34%" }
    ],
    tags: ["Retention", "Behavior Analysis", "Personalization"]
  },
  {
    id: "loyalty-agent",
    title: "Loyalty Program Agent",
    description: "Manages loyalty programs and creates personalized offers for repeat visits.",
    why: "Traditional programs require manual tracking, generic rewards, and complex redemption",
    soWhat: "54% of loyalty memberships are inactive, providing zero value",
    solution: "Manages unlimited complexity with personalized rewards and automated perfection",
    roiWeeks: "6-8 weeks",
    detailedDescription: "Build lasting customer relationships with intelligent loyalty management. Track customer lifetime value, create dynamic rewards, and deliver personalized offers that drive repeat purchases. Gamification elements keep customers engaged and coming back.",
    icon: "loyalty",
    status: "active",
    category: "Loyalty",
    features: [
      "Dynamic reward management",
      "CLV tracking & analysis",
      "Personalized offers",
      "Gamification elements"
    ],
    metrics: [
      { label: "Member Growth", value: "↑45%" },
      { label: "Avg. CLV", value: "$2,340" }
    ],
    tags: ["Loyalty", "Rewards", "CLV"]
  },
  {
    id: "email-marketing-agent",
    title: "Email Marketing Agent",
    description: "Creates targeted email campaigns and automates follow-up sequences.",
    why: "Professional email marketing requires sophisticated segmentation, testing, and optimization",
    soWhat: "Most businesses achieve under $10 ROI instead of potential $36-70 per dollar",
    solution: "Sends millions of variations, learning what works for each customer segment",
    roiWeeks: "3-4 weeks",
    detailedDescription: "Keep customers engaged with AI-powered email marketing. This agent creates compelling content, segments audiences intelligently, runs A/B tests automatically, and triggers behavioral emails at the perfect moment. Achieve industry-leading open and click rates.",
    icon: "emailMarketing",
    status: "active",
    category: "Loyalty",
    features: [
      "AI-powered content creation",
      "Advanced segmentation",
      "A/B testing automation",
      "Behavioral triggers"
    ],
    metrics: [
      { label: "Open Rate", value: "28.5%" },
      { label: "Click Rate", value: "4.2%" }
    ],
    tags: ["Email", "Automation", "Segmentation"]
  },
  {
    id: "content-agent",
    title: "Content Marketing Agent",
    description: "Creates valuable content and ensures consistent brand communication.",
    why: "Content marketing requires consistent creation, optimization, and distribution that overwhelms small businesses",
    soWhat: "Sporadic blog posts generate no traffic, confirming the false belief it doesn't work",
    solution: "Generates ideas from search demand, optimizes for SEO, distributes across all channels",
    roiWeeks: "8-12 weeks",
    detailedDescription: "Keep your brand top-of-mind with consistent, high-quality content. This agent creates multi-format content, maintains brand voice consistency, optimizes for SEO, and automates distribution across all your channels. Build authority and engagement simultaneously.",
    icon: "content",
    status: "active",
    category: "Loyalty",
    features: [
      "Multi-format content creation",
      "Brand voice consistency",
      "SEO optimization",
      "Distribution automation"
    ],
    metrics: [
      { label: "Content Pieces", value: "150+" },
      { label: "Engagement", value: "↑67%" }
    ],
    tags: ["Content", "SEO", "Brand Voice"]
  },
  // Increase Ticket Size Agents
  {
    id: "upsell-agent",
    title: "Upsell Agent",
    description: "Analyzes purchase history to suggest relevant upgrades and premium services.",
    why: "Businesses spend 80% of resources on new acquisition while ignoring high-probability expansion",
    soWhat: "You ignore 60-70% purchase probability customers to chase 5-20% prospects",
    solution: "Monitors every interaction, identifies upsell signals, triggers within minutes",
    roiWeeks: "4-6 weeks",
    detailedDescription: "Increase average order value with intelligent upselling. This agent analyzes customer purchase history and behavior patterns to recommend the most relevant upgrades and add-ons at the perfect moment. Boost revenue while enhancing customer satisfaction.",
    icon: "upsell",
    status: "active",
    category: "Revenue",
    features: [
      "Purchase history analysis",
      "Behavioral pattern recognition",
      "Smart recommendation engine",
      "AOV optimization"
    ],
    metrics: [
      { label: "AOV Increase", value: "↑31%" },
      { label: "Success Rate", value: "68%" }
    ],
    tags: ["Upselling", "AOV", "Recommendations"]
  },
  {
    id: "cross-sell-agent",
    title: "Cross-sell Agent",
    description: "Identifies complementary products based on customer preferences.",
    why: "Identifying product relationships across hundreds of SKUs requires computational power humans lack",
    soWhat: "You generate under 5% from cross-selling while Amazon does 35% of revenue",
    solution: "Analyzes every transaction combination, presents relevant cross-sells at optimal moments",
    roiWeeks: "4-6 weeks",
    detailedDescription: "Boost revenue with strategic cross-selling. This agent maps customer preferences, analyzes product affinities, and creates dynamic recommendations that feel natural and valuable. Increase basket size while improving customer experience.",
    icon: "crossSell",
    status: "active",
    category: "Revenue",
    features: [
      "Product affinity analysis",
      "Customer preference mapping",
      "Dynamic recommendations",
      "Revenue optimization"
    ],
    metrics: [
      { label: "Cross-sell Rate", value: "23%" },
      { label: "Revenue Lift", value: "↑18%" }
    ],
    tags: ["Cross-selling", "Recommendations", "Affinity"]
  },
  {
    id: "pricing-agent",
    title: "Dynamic Pricing Agent",
    description: "Monitors market conditions to optimize pricing strategies.",
    why: "Manual price management across hundreds of SKUs reflecting demand and competition is impossible",
    soWhat: "You leave 5-10% margin on the table because prices don't reflect actual market dynamics",
    solution: "Adjusts prices continuously based on demand, inventory, competition, and dozens of variables",
    roiWeeks: "6-8 weeks",
    detailedDescription: "Maximize revenue with intelligent pricing. This agent monitors real-time market conditions, tracks competitor pricing, analyzes demand patterns, and automatically adjusts prices to optimize revenue while remaining competitive. Data-driven pricing that works.",
    icon: "pricing",
    status: "beta",
    category: "Revenue",
    features: [
      "Real-time market monitoring",
      "Competitor price tracking",
      "Demand-based pricing",
      "Revenue maximization"
    ],
    metrics: [
      { label: "Price Accuracy", value: "94%" },
      { label: "Revenue Impact", value: "↑12%" }
    ],
    tags: ["Pricing", "Market Analysis", "Optimization"]
  },
  {
    id: "bundle-agent",
    title: "Bundle Optimization Agent",
    description: "Creates attractive product bundles that encourage larger purchases.",
    why: "Optimizing bundles requires analyzing millions of product combinations considering inventory and margins",
    soWhat: "You offer generic bundles based on intuition, missing 30-400% AOV potential",
    solution: "Continuously analyzes transactions, creates dynamic bundles, adjusts for inventory",
    roiWeeks: "4-6 weeks",
    detailedDescription: "Increase transaction size with smart bundling. This agent creates attractive package deals based on customer preferences and purchase patterns. Optimize value perception while driving higher revenue per transaction. Win-win for you and your customers.",
    icon: "bundle",
    status: "active",
    category: "Revenue",
    features: [
      "Smart bundle creation",
      "Value optimization",
      "Customer preference analysis",
      "Conversion optimization"
    ],
    metrics: [
      { label: "Bundle Adoption", value: "42%" },
      { label: "Value Increase", value: "↑28%" }
    ],
    tags: ["Bundling", "Packaging", "Value"]
  },
];

// ============================================
// FILTER CHIP COMPONENT
// ============================================

interface FilterChipProps {
  label: string;
  active: boolean;
  onClick: () => void;
}

const FilterChip: React.FC<FilterChipProps> = ({ label, active, onClick }) => {
  const themeStyles = getThemeStyles();
  
  return (
    <button
      onClick={onClick}
      className={`
        relative px-6 py-2.5 rounded-full transition-all duration-300
        backdrop-blur-lg
        ${active 
          ? 'bg-gradient-to-br from-[#76ba99]/30 to-[#76ba99]/15 border-[#76ba99]/40 shadow-lg shadow-[#76ba99]/20 -translate-y-0.5' 
          : 'bg-foreground/5 border-foreground/10 hover:bg-foreground/10'
        }
        ${active ? 'font-semibold' : 'font-normal'}
        ${active ? themeStyles.text.primary : themeStyles.text.secondary}
        border
      `}
    >
      {label}
    </button>
  );
};

// ============================================
// AGENT CARD COMPONENT
// ============================================

interface AgentCardProps {
  agent: Agent;
  isExpanded: boolean;
  isGreyedOut: boolean;
  onClick: () => void;
  theme: 'light' | 'dark';
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isExpanded, isGreyedOut, onClick, theme }) => {
  const themeStyles = getThemeStyles();
  
  const getVariant = () => {
    if (isExpanded) return 'gradient';
    return theme === 'dark' ? 'dark' : 'light';
  };

  // Custom styles for better theme support
  const cardCustomStyles: React.CSSProperties = {
    height: '100%',
    minHeight: isExpanded ? '400px' : '360px',
    // Subtle shadow override
    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.08), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    ...(isExpanded && {
      background: 'linear-gradient(135deg, rgba(118, 186, 153, 0.25), rgba(118, 186, 153, 0.1))',
      boxShadow: '0 8px 24px rgba(0, 0, 0, 0.12), inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
    }),
  };

  return (
    <div
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 ${
        isExpanded ? 'col-span-2 row-span-2' : ''
      }`}
      style={{
        opacity: isGreyedOut ? 0.4 : 1,
        filter: isGreyedOut ? 'grayscale(100%)' : 'none',
      }}
    >
      <GlassCard
        variant={getVariant()}
        hover={!isExpanded && !isGreyedOut}
        padding={isExpanded ? '32px' : '24px'}
        borderRadius="20px"
        style={cardCustomStyles}
      >
        <div className="flex flex-col h-full">
          {/* Header with Icon */}
          <div className="flex items-start gap-4 mb-6">
            <div className="flex-shrink-0 w-12 h-12 flex items-center justify-center">
              {(() => {
                let orbState: 'idle' | 'background-task' | 'thinking' | 'listening' | 'responding' = 'idle';
                if (isExpanded) orbState = 'thinking';
                else if (isGreyedOut) orbState = 'background-task';
                return <Orb state={orbState} size={56} theme={theme} seed={agent.id} />;
              })()}
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`text-xl font-semibold ${themeStyles.text.primary}`}>
                  {agent.title}
                </h3>
              </div>
            </div>
          </div>

          {/* Collapsed View - Clean Layout */}
          {!isExpanded && (
            <>
              {/* Why - The Problem */}
              <div className="mb-4">
                <div className={`text-xs uppercase tracking-wider ${themeStyles.text.muted} mb-1.5`}>
                  Why?
                </div>
                <p className={`text-sm leading-relaxed ${themeStyles.text.secondary}`}>
                  {agent.why}
                </p>
              </div>

              {/* So What - Lost Opportunity */}
              <div className="mb-4">
                <div className={`text-xs uppercase tracking-wider ${themeStyles.text.muted} mb-1.5`}>
                  So what?
                </div>
                <p className={`text-sm leading-relaxed font-medium ${themeStyles.text.primary}`}>
                  {agent.soWhat}
                </p>
              </div>

              {/* Solution */}
              <div className="mb-4">
                <div className={`text-xs uppercase tracking-wider ${themeStyles.text.muted} mb-1.5`}>
                  Solution
                </div>
                <p className={`text-sm leading-relaxed ${themeStyles.text.secondary}`}>
                  {agent.solution}
                </p>
              </div>

              {/* ROI - Bottom */}
              <div className="mt-auto pt-4 border-t" style={{ borderColor: 'var(--glass-border)' }}>
                <div className={`text-xs uppercase tracking-wider ${themeStyles.text.muted} mb-1`}>
                  ROI
                </div>
                <div className={`text-base font-semibold ${themeStyles.text.primary}`}>
                  {agent.roiWeeks}
                </div>
              </div>
            </>
          )}

          {/* Expanded Content */}
          {isExpanded && (
            <div className="flex-1">
              {/* Detailed Description */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${themeStyles.text.primary} mb-2 uppercase tracking-wider`}>
                  About
                </h4>
                <p className={`text-sm ${themeStyles.text.secondary} leading-relaxed`}>
                  {agent.detailedDescription}
                </p>
              </div>

              {/* Features */}
              <div className="mb-6">
                <h4 className={`text-sm font-semibold ${themeStyles.text.primary} mb-3 uppercase tracking-wider`}>
                  Key Features
                </h4>
                <div className="grid grid-cols-2 gap-2">
                  {agent.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className={`flex items-center gap-2 text-sm ${themeStyles.text.secondary}`}
                    >
                      <span className="text-[#76ba99]">✓</span>
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-2">
                {agent.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className={`px-3 py-1 text-xs rounded-full bg-foreground/10 ${themeStyles.text.secondary} border ${themeStyles.border.default}`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </GlassCard>
    </div>
  );
};

// ============================================
// MAIN BENTO GRID COMPONENT
// ============================================

export default function AgentGrid() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>('All');
  const [expandedAgentId, setExpandedAgentId] = useState<string | null>(null);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const checkTheme = () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') as 'light' | 'dark';
      setTheme(currentTheme || 'light');
    };

    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme']
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  const filterCategories: { label: string; value: FilterCategory }[] = [
    { label: 'All', value: 'All' },
    { label: 'Acquire New Users', value: 'Acquire' },
    { label: 'Build Customer Loyalty', value: 'Loyalty' },
    { label: 'Increase Ticket Value', value: 'Revenue' },
  ];

  // Filter and sort agents
  const getFilteredAgents = () => {
    if (activeFilter === 'All') {
      return agents;
    }
    
    // Selected category first, then others
    const selectedAgents = agents.filter(a => a.category === activeFilter);
    const otherAgents = agents.filter(a => a.category !== activeFilter);
    
    return [...selectedAgents, ...otherAgents];
  };

  const filteredAgents = getFilteredAgents();

  const handleCardClick = (agentId: string) => {
    setExpandedAgentId(expandedAgentId === agentId ? null : agentId);
  };

  const isGreyedOut = (agent: Agent) => {
    return activeFilter !== 'All' && agent.category !== activeFilter;
  };

  return (
    <div className="w-full">
      {/* Filter Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {filterCategories.map((category) => (
          <FilterChip
            key={category.value}
            label={category.label}
            active={activeFilter === category.value}
            onClick={() => {
              setActiveFilter(category.value);
              setExpandedAgentId(null); // Close expanded card when filtering
            }}
          />
        ))}
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 auto-rows-fr">
        {filteredAgents.map((agent) => (
          <AgentCard
            key={agent.id}
            agent={agent}
            isExpanded={expandedAgentId === agent.id}
            isGreyedOut={isGreyedOut(agent)}
            onClick={() => handleCardClick(agent.id)}
            theme={theme}
          />
        ))}
      </div>
    </div>
  );
}

