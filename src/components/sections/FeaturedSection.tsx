"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import { useTheme } from 'next-themes';

export const FeaturedSection = ({ title = "Projects" }: { title?: string }) => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;
  const containerRef = useRef<HTMLDivElement>(null);
  const stripeRef = useRef<HTMLDivElement>(null);
  const bladeRef = useRef<HTMLImageElement>(null);
  const circleRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLImageElement>(null);
  const marqueeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const ctx = gsap.context(() => {
      // 1. Horizontal scroll parallax on hazard striped ribbon
      if (stripeRef.current) {
        gsap.to(stripeRef.current, {
          x: -160,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      // 2. Rotate Blade Clockwise + Vertical Parallax translation (Layer 9)
      if (bladeRef.current) {
        gsap.to(bladeRef.current, {
          rotation: 360,
          y: 90,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      // 3. Rotate Circle Ornament Counter-Clockwise + Reverse Vertical translation (Layer -4)
      if (circleRef.current) {
        gsap.to(circleRef.current, {
          rotation: -360,
          y: -50,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      // 4. Parallax shift on Dot Grid background (Layer 3)
      if (dotsRef.current) {
        gsap.to(dotsRef.current, {
          y: 40,
          ease: "none",
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5
          }
        });
      }

      // 5. Infinite horizontal marquee scroll
      let marqueeScroll;
      if (marqueeScrollRef.current) {
        marqueeScroll = gsap.to(marqueeScrollRef.current, {
          xPercent: -50,
          ease: "none",
          duration: 18,
          repeat: -1
        });

        // 6. Dynamic marquee speed-up during page scroll (Scrub timeScale value)
        gsap.to(marqueeScroll, {
          timeScale: 3.5, // speed up factor
          scrollTrigger: {
            trigger: container,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.2 // smooth deceleration back to normal speed (timeScale: 1.0)
          }
        });
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="section-featured w-full bg-[#F3EBDD] bg-dots-pattern relative select-none"
    >
      <div className="padding-global align-center w-full">
        <div className="container-large align-center w-full">
          <div className="featured-padding w-full">
            
            {/* Outer Border Frame wrapper */}
            <div className="featured-border-outer w-full relative" style={{ height: 'auto' }}>
              
              {/* 1. Hazard warning striped ribbon/line */}
              <div ref={stripeRef} className="featured-line">
                <div className="colors-wrapper">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="rectangle-black" />
                      <div className="rectangle-yellow" />
                    </React.Fragment>
                  ))}
                </div>
                <div className="colors-wrapper">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <React.Fragment key={i}>
                      <div className="rectangle-black" />
                      <div className="rectangle-yellow" />
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* 2. Rotating circular blade (bottom right) */}
              <img 
                ref={bladeRef}
                src="/blade-blue.svg" 
                loading="lazy" 
                alt="Rotating circular blade target" 
                className="featured-blade pointer-events-none select-none"
              />

              {/* 3. Rotating concentric circle ornament (Layer -4) */}
              <div ref={circleRef} className="featured-circle pointer-events-none select-none">
                <img 
                  src="/circle-ornament-blue.svg" 
                  loading="lazy" 
                  alt="Rotating circle ornament" 
                  className="featured-circle-inner"
                />
              </div>

              {/* 4. Rounded inner box container */}
              <div className="featured-border w-full relative overflow-hidden">
                
                {/* Infinite horizontal marquee */}
                <div className="marquee-advanced w-full overflow-hidden flex items-center">
                  <div ref={marqueeScrollRef} className="marquee-advanced-scroll flex whitespace-nowrap">
                    
                    {/* First Scroll Set */}
                    <div className="marquee-advanced-collection flex items-center gap-12 pr-12">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div 
                          key={idx} 
                          className="marquee-advanced-item flex items-center gap-12"
                          style={{ color: isDark ? 'rgba(185, 161, 247, 0.25)' : 'rgba(33, 23, 71, 0.12)' }}
                        >
                          <span className="marquee-large">
                            {title}
                          </span>
                          <div className="plus-icon-large w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 202 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M113.605 72.4964V0.197266H78.1483V58.092L54.0485 79.4216H0.585938V113.771H72.3311L113.605 72.4964Z" fill="currentColor"/>
                              <path d="M88.3908 127.898L88.3908 200.197L123.848 200.197L123.848 142.303L147.948 120.973L201.41 120.973L201.41 86.6239L129.665 86.6238L88.3908 127.898Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Second Scroll Set (for seamless scroll loop) */}
                    <div className="marquee-advanced-collection flex items-center gap-12 pr-12">
                      {Array.from({ length: 5 }).map((_, idx) => (
                        <div 
                          key={idx} 
                          className="marquee-advanced-item flex items-center gap-12"
                          style={{ color: isDark ? 'rgba(185, 161, 247, 0.25)' : 'rgba(33, 23, 71, 0.12)' }}
                        >
                          <span className="marquee-large">
                            {title}
                          </span>
                          <div className="plus-icon-large w-embed">
                            <svg width="100%" height="100%" viewBox="0 0 202 201" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M113.605 72.4964V0.197266H78.1483V58.092L54.0485 79.4216H0.585938V113.771H72.3311L113.605 72.4964Z" fill="currentColor"/>
                              <path d="M88.3908 127.898L88.3908 200.197L123.848 200.197L123.848 142.303L147.948 120.973L201.41 120.973L201.41 86.6239L129.665 86.6238L88.3908 127.898Z" fill="currentColor"/>
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

                {/* 5. Parallax dot grid background inside box (Layer 3) */}
                <img 
                  ref={dotsRef}
                  src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67f7aa9e8d2a0c352428a22a_gradient-final.svg" 
                  loading="lazy" 
                  alt="Background Dots Ornament" 
                  className="hero-bg-dots pointer-events-none select-none"
                />

                {/* 6. Concentric circles ornament overlay inside box */}
                <div className="hero-bg is--hero pointer-events-none select-none">
                  <div className="circle-1" />
                  <div className="circle-2" />
                  <div className="circle-3" />
                  <div className="circle-4" />
                  <div className="circle-5" />
                </div>

              </div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
