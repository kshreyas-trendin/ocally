"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useEffect, useState } from "react";

import { Button } from "../ui/button";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "../ui/carousel";
import { GlassButton } from "../GlassComponents/GlassComponents";

export interface Gallery4Item {
  id: string;
  title: string;
  description: string;
  href: string;
  image: string;
  icon?: string;
  features?: string[];
  metrics?: {
    label: string;
    value: string;
  }[];
  status?: 'active' | 'beta' | 'coming-soon';
  category?: string;
  tags?: string[];
}

export interface Gallery4Props {
  title?: string;
  description?: string;
  items: Gallery4Item[];
}

const data = [
  {
    id: "shadcn-ui",
    title: "shadcn/ui: Building a Modern Component Library",
    description:
      "Explore how shadcn/ui revolutionized React component libraries by providing a unique approach to component distribution and customization, making it easier for developers to build beautiful, accessible applications.",
    href: "https://ui.shadcn.com",
    image:
      "https://images.unsplash.com/photo-1551250928-243dc937c49d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjN8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "tailwind",
    title: "Tailwind CSS: The Utility-First Revolution",
    description:
      "Discover how Tailwind CSS transformed the way developers style their applications, offering a utility-first approach that speeds up development while maintaining complete design flexibility.",
    href: "https://tailwindcss.com",
    image:
      "https://images.unsplash.com/photo-1551250928-e4a05afaed1e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjR8fHx8fHwyfHwxNzIzODA2OTM5fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "astro",
    title: "Astro: The All-in-One Web Framework",
    description:
      "Learn how Astro's innovative 'Islands Architecture' and zero-JS-by-default approach is helping developers build faster websites while maintaining rich interactivity where needed.",
    href: "https://astro.build",
    image:
      "https://images.unsplash.com/photo-1536735561749-fc87494598cb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxNzd8fHx8fHwyfHwxNzIzNjM0NDc0fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "react",
    title: "React: Pioneering Component-Based UI",
    description:
      "See how React continues to shape modern web development with its component-based architecture, enabling developers to build complex user interfaces with reusable, maintainable code.",
    href: "https://react.dev",
    image:
      "https://images.unsplash.com/photo-1548324215-9133768e4094?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMzF8fHx8fHwyfHwxNzIzNDM1MzA1fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
  {
    id: "nextjs",
    title: "Next.js: The React Framework for Production",
    description:
      "Explore how Next.js has become the go-to framework for building full-stack React applications, offering features like server components, file-based routing, and automatic optimization.",
    href: "https://nextjs.org",
    image:
      "https://images.unsplash.com/photo-1550070881-a5d71eda5800?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w2NDI3NzN8MHwxfGFsbHwxMjV8fHx8fHwyfHwxNzIzNDM1Mjk4fA&ixlib=rb-4.0.3&q=80&w=1080",
  },
];

const Gallery4 = ({
  title = "Case Studies",
  description = "Discover how leading companies and developers are leveraging modern web technologies to build exceptional digital experiences. These case studies showcase real-world applications and success stories.",
  items = data,
}: Gallery4Props) => {
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

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

    return () => {
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (!carouselApi) {
      return;
    }
    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    updateSelection();
    carouselApi.on("select", updateSelection);
    return () => {
      carouselApi.off("select", updateSelection);
    };
  }, [carouselApi]);

  return (
    <section className="py-32">
      <div className="container mx-auto">
        <div className="mb-8 flex items-end justify-between md:mb-14 lg:mb-16">
          <div className="flex flex-col gap-4">
            <h2 className="text-3xl font-medium md:text-4xl lg:text-5xl">
              {title}
            </h2>
            <p className="max-w-lg text-muted-foreground">{description}</p>
          </div>
          <div className="hidden shrink-0 gap-2 md:flex">
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollPrev();
              }}
              disabled={!canScrollPrev}
              className="disabled:pointer-events-auto liquid-glass-refraction"
            >
              <ArrowLeft className="size-5" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              onClick={() => {
                carouselApi?.scrollNext();
              }}
              disabled={!canScrollNext}
              className="disabled:pointer-events-auto liquid-glass-refraction"
            >
              <ArrowRight className="size-5" />
            </Button>
          </div>
        </div>
      </div>
      <div className="w-full">
        <Carousel
          setApi={setCarouselApi}
          opts={{
            breakpoints: {
              "(max-width: 768px)": {
                dragFree: true,
              },
            },
          }}
        >
          <CarouselContent className="ml-0 2xl:ml-[max(8rem,calc(50vw-700px))] 2xl:mr-[max(0rem,calc(50vw-700px))]">
            {items.map((item, index) => (
              <CarouselItem
                key={item.id}
                className="max-w-[320px] pl-[20px] lg:max-w-[360px]"
              >
                <a href={item.href} className="group rounded-xl block">
                  <div className="group relative h-full min-h-[27rem] max-w-full overflow-hidden rounded-xl md:aspect-[5/4] lg:aspect-[16/9] liquid-glass-combined">
                    {/* Floating Elements */}
                    <div className="absolute inset-0 overflow-hidden">
                      <div className="absolute top-8 left-8 w-2 h-2 bg-[var(--c-action)]/40 rounded-full animate-pulse"></div>
                      <div className="absolute top-16 right-12 w-1 h-1 bg-[var(--c-action)]/60 rounded-full animate-pulse delay-1000"></div>
                      <div className="absolute bottom-20 left-12 w-1.5 h-1.5 bg-[var(--c-action)]/50 rounded-full animate-pulse delay-500"></div>
                      <div className="absolute bottom-12 right-8 w-1 h-1 bg-[var(--c-action)]/70 rounded-full animate-pulse delay-700"></div>
                    </div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
                      {/* Top Section - Status, Icon, Title, and Category */}
                      <div className="flex flex-col gap-3">
                        <div className="flex items-center justify-between">
                          {item.status && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              item.status === 'active' ? 'bg-green-500/20 text-green-400' :
                              item.status === 'beta' ? 'bg-yellow-500/20 text-yellow-400' :
                              'bg-gray-500/20 text-gray-400'
                            }`}>
                              {item.status === 'active' ? 'Live' : item.status === 'beta' ? 'Beta' : 'Coming Soon'}
                            </span>
                          )}
                          {item.category && (
                            <span className="text-xs text-[var(--c-content)]/60 bg-[var(--c-content)]/10 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          )}
                        </div>
                        
                        <div className="w-12 h-12 rounded-xl bg-[var(--c-action)]/20 backdrop-blur-sm border border-[var(--c-action)]/30 flex items-center justify-center">
                          {item.icon ? (
                            <span className="text-xl">{item.icon}</span>
                          ) : (
                            <div className="w-6 h-6 rounded-lg bg-[var(--c-action)]/40"></div>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-[var(--c-content)] group-hover:text-[var(--c-action)] transition-colors duration-300">
                          {item.title}
                        </h3>
                      </div>
                      
                      {/* Middle Section - Features */}
                      {item.features && item.features.length > 0 && (
                        <div className="flex flex-col gap-2">
                          <h4 className="text-sm font-medium text-[var(--c-content)]/90">Key Features:</h4>
                          <ul className="space-y-1">
                            {item.features.slice(0, 3).map((feature, idx) => (
                              <li key={idx} className="text-xs text-[var(--c-content)]/70 flex items-center gap-2">
                                <div className="w-1 h-1 rounded-full bg-[var(--c-action)]/60"></div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {/* Bottom Section - Metrics, Description and CTA */}
                      <div className="flex flex-col gap-4">
                        {item.metrics && item.metrics.length > 0 && (
                          <div className="grid grid-cols-2 gap-3">
                            {item.metrics.slice(0, 2).map((metric, idx) => (
                              <div key={idx} className="text-center">
                                <div className="text-lg font-bold text-[var(--c-action)]">{metric.value}</div>
                                <div className="text-xs text-[var(--c-content)]/60">{metric.label}</div>
                              </div>
                            ))}
                          </div>
                        )}
                        
                        <p className="text-[var(--c-content)]/80 text-sm leading-relaxed line-clamp-2">
                          {item.description}
                        </p>
                        
                        {item.tags && item.tags.length > 0 && (
                          <div className="flex flex-wrap gap-1">
                            {item.tags.slice(0, 3).map((tag, idx) => (
                              <span key={idx} className="text-xs bg-[var(--c-content)]/10 text-[var(--c-content)]/70 px-2 py-1 rounded">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                        
                        <GlassButton 
                          variant="gradient"
                          size="small"
                          onClick={() => window.open(item.href, '_blank')}
                          theme={theme}
                          style={{ borderRadius: '99em', alignSelf: 'flex-start' }}
                        >
                          <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                            Learn More
                            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                          </span>
                        </GlassButton>
                      </div>
                    </div>
                    
                    {/* Hover Effect Overlay */}
                    <div className="absolute inset-0 bg-[var(--c-action)]/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
                  </div>
                </a>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
        <div className="mt-8 flex justify-center gap-2">
          {items.map((_, index) => (
            <button
              key={index}
              className={`h-2 w-2 rounded-full transition-colors ${
                currentSlide === index ? "bg-[var(--c-action)]" : "bg-[var(--c-action)]/20"
              }`}
              onClick={() => carouselApi?.scrollTo(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export { Gallery4 };
