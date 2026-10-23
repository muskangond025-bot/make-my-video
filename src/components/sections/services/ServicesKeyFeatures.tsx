"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Clock, Target, Layers, ArrowUpRight } from "lucide-react";
import { gsap } from "@/lib/gsap";

const METRICS = [
  {
    id: "custom-solutions",
    icon: <Target size={22} className="text-[#7567EE]" />,
    visualImage: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?q=80&w=1200&auto=format&fit=crop",
    tagline: "Tailored to Your Target Audience",
    description: "Be it designing award videos for your valued employees or communicating a new product launch to consumers; our team designs custom narrative blueprints engineered for your target market.",
  },
  {
    id: "unbeatable-deadlines",
    icon: <Clock size={22} className="text-[#7567EE]" />,
    visualImage: "https://images.unsplash.com/photo-1536240478700-b869070f9279?q=80&w=1200&auto=format&fit=crop",
    tagline: "100% On-Time Delivery Record",
    description: "We have never missed any deadline set by our clients. From overnight edits of multi-day shoots to rendering 300+ nomination videos within 48 hours, our pipeline never compromises delivery speed.",
  },
  {
    id: "value-abundance",
    icon: <Layers size={22} className="text-[#7567EE]" />,
    visualImage: "https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?q=80&w=1200&auto=format&fit=crop",
    tagline: "The Law of Abundance",
    description: "We believe in giving more value than expected. Every production includes complimentary social cuts, sound mastering, and raw archive access to maximize your long-term brand equity.",
  },
];

export const ServicesKeyFeatures: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);
  const mediaRef = useRef<HTMLDivElement>(null);

  // Auto-rotate every 3 seconds without any time-left indicator
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % METRICS.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Smooth crossfade on tab change
  useEffect(() => {
    if (mediaRef.current) {
      gsap.fromTo(
        mediaRef.current,
        { opacity: 0.5, scale: 0.99 },
        { opacity: 1, scale: 1, duration: 0.45, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const currentMetric = METRICS[activeTab];

  return (
    <section className="relative w-full py-16 sm:py-24 overflow-hidden bg-[#EAE3DB] border-t border-[#141416]/10">
      
      {/* Background Subtle Accent */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/3 pointer-events-none opacity-5">
        <div className="w-[600px] h-[600px] rounded-full border-[40px] border-[#141416]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-8 w-full relative z-10">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 border-b border-[#141416]/10 pb-8">
          <div>
            <h2 className="typo-h1 font-heading font-black tracking-tight uppercase text-[#141416]">
              WHY CLIENTS <span className="font-serif italic font-normal text-[#7567EE]">CHOOSE US</span>
            </h2>
          </div>
          <p className="typo-body font-sans text-[#141416]/75 max-w-[480px] leading-relaxed">
            Our iron-clad commitments to punctuality, bespoke creative direction, and exceptional value set the benchmark in modern video production.
          </p>
        </div>

        {/* Full-Width Interactive Cine-Metrics Stage in Clean Light Theme */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Clean Light Pillar Selector Cards (6 Cols) */}
          <div className="lg:col-span-6 flex flex-col justify-between space-y-4">
            {METRICS.map((metric, idx) => {
              const isSelected = activeTab === idx;

              return (
                <div
                  key={metric.id}
                  onClick={() => setActiveTab(idx)}
                  className={`p-6 sm:p-7 rounded-3xl cursor-pointer transition-all duration-300 border ${
                    isSelected
                      ? "bg-white text-[#141416] border-[#7567EE] shadow-xl scale-[1.01] ring-1 ring-[#7567EE]/30"
                      : "bg-white/60 hover:bg-white text-[#141416] border-[#141416]/10 hover:border-[#141416]/20 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-3.5 mb-2.5">
                    <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                      isSelected ? "bg-[#7567EE]/15" : "bg-[#141416]/5"
                    }`}>
                      {metric.icon}
                    </div>
                    <h3 className={`typo-h3 font-heading font-black tracking-tight transition-colors ${
                      isSelected ? "text-[#7567EE]" : "text-[#141416]"
                    }`}>
                      {metric.tagline}
                    </h3>
                  </div>

                  <p className="typo-body font-sans text-[#141416]/75 leading-relaxed pl-13 sm:pl-[54px]">
                    {metric.description}
                  </p>
                </div>
              );
            })}
          </div>

          {/* Right Column: Clean Light Cinematic Media Showcase (6 Cols) */}
          <div className="lg:col-span-6 relative flex flex-col">
            <div className="relative w-full rounded-3xl overflow-hidden bg-white border border-[#141416]/15 p-3 sm:p-4 shadow-xl">
              
              {/* Media Frame with Clean Cinematic Aspect */}
              <div
                ref={mediaRef}
                className="relative aspect-[16/11] w-full rounded-2xl overflow-hidden bg-zinc-100 shadow-inner border border-[#141416]/10"
              >
                <img
                  src={currentMetric.visualImage}
                  alt={currentMetric.tagline}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                {/* Bottom Floating Title Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-xl bg-white/90 backdrop-blur-md border border-white/50 shadow-md text-[#141416]">
                  <h4 className="font-heading font-black text-base sm:text-lg text-[#141416]">
                    {currentMetric.tagline}
                  </h4>
                  <p className="typo-small font-sans text-[#141416]/75 mt-1.5 leading-relaxed">
                    {currentMetric.description}
                  </p>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
