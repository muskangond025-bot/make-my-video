"use client";

import React from "react";
import { StickyScroll } from "@/components/ui/sticky-scroll-reveal";

const content = [
  {
    title: "Concept Curation",
    description:
      "Drafting the initial aesthetic moodboards, spatial layouts, and color charts to set the foundation of the event's visual landscape.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-card">
        <img
          src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900&auto=format&fit=crop"
          className="h-full w-full object-cover select-none"
          alt="Concept Curation"
          draggable={false}
        />
      </div>
    ),
  },
  {
    title: "Structural Geometry",
    description:
      "Mapping structural coordinates, stage structures, overhead truss grids, and custom guest flow pathways inside the physical venue space.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-card">
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?q=80&w=900&auto=format&fit=crop"
          className="h-full w-full object-cover select-none"
          alt="Structural Geometry"
          draggable={false}
        />
      </div>
    ),
  },
  {
    title: "Floral Botanical Design",
    description:
      "Integrating custom botanical installations, floral arches, accent hedges, and luxurious curated seating sets tailored to the creative theme.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-card">
        <img
          src="https://images.unsplash.com/photo-1523438885200-e635ba2c371e?q=80&w=900&auto=format&fit=crop"
          className="h-full w-full object-cover select-none"
          alt="Floral Botanical Design"
          draggable={false}
        />
      </div>
    ),
  },
  {
    title: "Luminous Atmosphere",
    description:
      "Tuning volumetric spotlight cones, dynamic beam patterns, laser grids, and ambient warm candle lighting for an immersive spatial feel.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-card">
        <img
          src="https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?q=80&w=900&auto=format&fit=crop"
          className="h-full w-full object-cover select-none"
          alt="Luminous Atmosphere"
          draggable={false}
        />
      </div>
    ),
  },
  {
    title: "The Celebration Bloom",
    description:
      "Watch the translucent technical layout grids dissolve to reveal the fully bloomed, breathtaking luxury celebration in all its live glory.",
    content: (
      <div className="h-full w-full flex items-center justify-center bg-card">
        <img
          src="https://images.unsplash.com/photo-1519225495810-7512c696505a?q=80&w=900&auto=format&fit=crop"
          className="h-full w-full object-cover select-none"
          alt="The Celebration Bloom"
          draggable={false}
        />
      </div>
    ),
  },
];

export default function TactileProcess() {
  return (
    <section 
      id="genesis-engine" 
      className="w-full py-28 px-6 sm:px-12 relative z-10 bg-background text-foreground border-t border-border overflow-hidden select-none transition-colors duration-500"
    >
      {/* Visual background lighting */}
      <div className="absolute top-[20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-purple-600/5 dark:bg-purple-900/5 blur-[120px] pointer-events-none z-0" />
      
      {/* Decorative architectural grid background */}
      <div className="absolute inset-0 z-0 opacity-[0.02] dark:opacity-[0.04] bg-[radial-gradient(var(--foreground)_1.5px,transparent_1.5px)] [background-size:32px_32px] pointer-events-none" />

      {/* Header Block */}
      <div className="max-w-6xl mx-auto flex flex-col justify-start gap-4 text-left mb-16 relative z-10">
        <div>
          <span className="text-[10px] tracking-[0.3em] font-mono font-bold text-muted-foreground uppercase block mb-1.5 animate-pulse-slow">
            CREATIVE WORKFLOW
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-normal text-foreground uppercase tracking-tight leading-none text-white">
            The Event <span className="italic font-light text-muted-foreground/75">Genesis Engine</span>
          </h2>
        </div>
        <p className="text-xs sm:text-sm text-muted-foreground max-w-lg leading-relaxed font-sans font-light text-gray-600">
          Stand over our curator table and watch a luxury event bloom layer by layer from moodboard sketches to physical celebration.
        </p>
      </div>

      {/* Sticky Scroll Component */}
      <div className="max-w-6xl mx-auto relative z-10">
        <StickyScroll content={content} />
      </div>

      <style>{`
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        @keyframes pulseSlow {
          0%, 100% { opacity: 0.8; }
          50% { opacity: 1; }
        }
      `}</style>
    </section>
  );
}
