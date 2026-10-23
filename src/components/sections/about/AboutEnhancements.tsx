"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';
import Link from 'next/link';
import { useTheme } from 'next-themes';

export const AboutEnhancements = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === 'dark' : false;

  const containerRef = useRef<HTMLDivElement>(null);

  // Benefits list under Why Companies Choose Hubsched
  const keyPoints = [
    "Intuitive & User-Friendly",
    "Robust Security Standards",
    "Modular & Customizable",
    "Fast Implementation",
    "Dedicated Support Team",
    "Scalable for All Sizes",
    "IoT-Enabled Automation"
  ];

  // GSAP animations for reveals
  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      // Reveal the key points cards staggered
      const points = containerRef.current?.querySelectorAll('.key-point-card');
      if (points) {
        gsap.fromTo(points,
          { opacity: 0, y: 20, scale: 0.97 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            stagger: 0.08,
            duration: 0.6,
            ease: "power2.out",
            scrollTrigger: {
              trigger: '.section-why-choose',
              start: 'top 85%',
            }
          }
        );
      }

      // Spotlight effect setup on Why Choose cards
      points?.forEach((card) => {
        const handleMouseMove = (e: MouseEvent) => {
          const c = card as HTMLElement;
          const rect = c.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          c.style.setProperty('--mouse-x', `${x}px`);
          c.style.setProperty('--mouse-y', `${y}px`);
        };
        card.addEventListener('mousemove', handleMouseMove as any);
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="about-enhancements-wrapper w-full bg-background" style={{ color: isDark ? '#ffffff' : '#101010' }}>
      
      {/* 1. The Team Behind Hubsched */}
      <section className="section-team py-24 border-t border-black/10 relative">
        <div className="max-w-4xl mx-auto px-6 lg:px-12 text-center">
          <div className="flex flex-col items-center gap-6">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Our People
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase leading-[0.9] text-shadow-glow">
              The Team Behind Hubsched
            </h2>
            <p 
              className="text-base md:text-lg leading-relaxed max-w-2xl font-sans mt-4"
              style={{ color: isDark ? 'rgba(255, 255, 255, 0.6)' : 'rgba(16, 16, 16, 0.7)' }}
            >
              We are a group of thinkers, designers, engineers, and problem solvers who believe technology should make life easier—not harder. Our team is passionate about shaping the workplaces of tomorrow through continuous improvement, innovation, and customer-centric support.
            </p>
          </div>
        </div>
      </section>

      {/* 2. Why Companies Choose Hubsched */}
      <section className="section-why-choose py-24 border-t border-black/10 relative bg-background/[0.01]">
        <div className="max-w-5xl mx-auto px-6 lg:px-12">
          
          {/* Title */}
          <div className="flex flex-col items-center text-center gap-6 mb-16">
            <span className="text-xs font-bold tracking-[0.2em] text-primary-red uppercase">
              Why Hubsched
            </span>
            <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight uppercase leading-[0.9] text-shadow-glow">
              Why Companies Choose Hubsched
            </h2>
          </div>

          {/* Grid check-points */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {keyPoints.map((point, index) => (
              <div
                key={index}
                className="key-point-card group relative overflow-hidden rounded-xl border hover:border-black/20 p-5 flex items-center gap-4 transition-all duration-300 hover:shadow-[0_10px_25px_rgba(0,0,0,0.3)]"
                style={{
                  backgroundColor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(16,16,16,0.02)',
                  borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,16,16,0.1)'
                }}
              >
                {/* Spotlight hover effect */}
                <div className="absolute inset-0 z-0 overflow-hidden rounded-xl pointer-events-none">
                  <div
                    className="absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(300px circle at var(--mouse-x) var(--mouse-y), rgba(232,60,37,0.06), transparent 40%)`
                    }}
                  />
                </div>

                <div 
                  className="w-8 h-8 rounded-full border flex items-center justify-center flex-shrink-0 text-primary-red relative z-10"
                  style={{
                    backgroundColor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(16,16,16,0.03)',
                    borderColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(16,16,16,0.1)'
                  }}
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <span className="text-sm font-semibold tracking-tight relative z-10" style={{ color: isDark ? '#e2e8f0' : '#1a202c' }}>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <p className="font-sans text-base md:text-lg italic font-medium" style={{ color: isDark ? '#e2e8f0' : '#4a5568' }}>
              "Hubsched isn't just software — it's a smarter way to manage work."
            </p>
          </div>

        </div>
      </section>

      {/* 3. Building the Future of Workplaces, Together (CTA) */}
      <section className="section-cta py-24 border-t border-black/10 relative bg-gradient-to-br from-[#121212] via-[#101010] to-[#151515]">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_right,rgba(232,60,37,0.02),transparent_40%)] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-6 text-center relative z-10 flex flex-col items-center gap-8">
          <h2 className="text-3xl md:text-5xl font-heading font-black tracking-tight text-white uppercase leading-[0.95] text-shadow-glow">
            Building the Future of <br />
            Workplaces, Together
          </h2>
          
          <div className="flex flex-col gap-4 max-w-2xl font-sans text-gray-300 text-sm md:text-base leading-relaxed">
            <p>
              We're on a mission to redefine how organizations operate. And we're just getting started.
            </p>
            <p>
              If you're ready to modernize your workplace, streamline processes, and create a more efficient employee experience — Hubsched is here to help you lead the way.
            </p>
          </div>

          <div className="mt-4">
            <Link href="/support">
              <button className="px-8 py-4 bg-primary-red hover:bg-primary-red/90 text-white rounded-xl text-xs font-bold tracking-widest uppercase flex items-center gap-2 shadow-lg shadow-[#0C329E]/35 hover:scale-[1.02] transition-all duration-300">
                <svg width="15" height="15" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform rotate-180">
                  <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor"/>
                </svg>
                Book Demo
              </button>
            </Link>
          </div>
        </div>
      </section>

    </div>
  );
};
