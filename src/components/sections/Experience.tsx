"use client";
import React, { useState, useEffect } from 'react';

interface CardItem {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  price: string;
  icon: string;
}

const CARDS_DATA: CardItem[] = [
  {
    id: 1,
    title: "Shark Tank Pitch Films",
    description: "Crafted high-converting pitch and product showcase videos for innovative startups like Wol3D, helping them win deals on Shark Tank India.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png",
    link: "https://rohanjoshi.in/all-projects",
    price: "1000+ Videos",
    icon: "layers"
  },
  {
    id: 2,
    title: "India Energy Week & BPCL",
    description: "Full on-ground event documentation, time-lapses, and global delegate interviews for Fortune 500 energy leaders at premier international expos.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png",
    link: "https://rohanjoshi.in/all-projects",
    price: "8+ Cities",
    icon: "clock"
  },
  {
    id: 3,
    title: "CIPLA & Aditya Birla",
    description: "Internal culture films, CSR initiatives, leadership interviews, and brand awareness campaigns for corporate powerhouses.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png",
    link: "https://rohanjoshi.in/all-projects",
    price: "49+ Brands",
    icon: "moon-crescent"
  },
  {
    id: 4,
    title: "Global Remote Production",
    description: "Serving international creators & enterprises across the USA, UK, Singapore, and Canada with frame-accurate cloud editing and color science.",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png",
    link: "https://rohanjoshi.in/all-projects",
    price: "Global Reach",
    icon: "moon-half"
  }
];

export const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="about" className="section-experience relative w-full overflow-hidden bg-[#EAE3DB] dark:bg-[#141416] bg-dots-pattern pt-8 pb-14 flex flex-col justify-start">
      
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#141416]/10 dark:bg-white/10" />

      {/* Centered Heading */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col z-10 text-left mb-6">
        <h3 className="font-heading text-4xl md:text-6xl text-[#141416] dark:text-[#EAE3DB] uppercase leading-none font-bold tracking-tight">
          PROVEN <span className="text-[#7567EE]">TRACK RECORD</span>
        </h3>
        <p className="font-sans text-xs md:text-sm text-[#4A4658] dark:text-[#EAE3DB]/70 mt-2 uppercase tracking-widest font-semibold">
          Over 1,000+ films crafted for global enterprises, MSMEs, and top innovators
        </p>
      </div>

      {/* Accordion Grow-Cards List */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 z-10 flex-grow flex items-center justify-center">
        <div className="grow-card-list">
          {CARDS_DATA.map((card, idx) => {
            const isHovered = hoveredIndex === idx;
            return (
              <div
                key={card.id}
                className={`grow-card group ${isHovered ? 'is-hovered' : ''}`}
                onMouseEnter={() => setHoveredIndex(idx)}
                onMouseLeave={() => setHoveredIndex(null)}
                onClick={() => window.location.href = card.link}
              >
                {/* Luxury Card Inner Structure */}
                <div className="w-full h-full flex flex-col justify-between text-[#EAE3DB] select-none">
                  
                  {/* Top Content Block */}
                  <div>
                    {/* Image Frame - Big & High Visibility */}
                    <div className="grow-card-image-wrap">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Editorial Title (Serif Italic) - High Contrast & Crisp */}
                    <h4 className="font-serif italic text-xl md:text-2xl text-[#FFFFFF] mt-3 mb-1.5 leading-snug font-semibold text-left drop-shadow-sm">
                      {card.title}
                    </h4>

                    {/* Description - Crisp Visible Text */}
                    <p className="font-sans text-[12px] md:text-[12.5px] text-[#EAE3DB]/85 leading-relaxed text-left font-normal drop-shadow-sm">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Content Block */}
                  <div className="mt-auto pt-2">
                    {/* Subtle Line Divider */}
                    <div className="w-full h-[1px] bg-[#7567EE]/25 my-3" />

                    {/* Price & View Actions */}
                    <div className="flex flex-row justify-between items-center font-sans text-xs">
                      <span className="font-bold text-[#141416] bg-[#D5FF3F] text-[12px] tracking-wide px-3 py-1 rounded-full shadow-[0_2px_8px_rgba(213,255,63,0.3)]">
                        {card.price}
                      </span>
                      <span className="font-bold text-[#7567EE] group-hover:text-[#D5FF3F] flex items-center gap-1 text-[11px] uppercase tracking-wider transition-colors drop-shadow-sm">
                        View &rarr;
                      </span>
                    </div>
                  </div>

                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Info Details */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 mt-12 flex flex-col sm:flex-row justify-between items-center gap-6 z-10">
        <div className="text-left max-w-sm sm:max-w-md">
          <p className="font-sans text-[11px] md:text-xs text-[#4A4658] dark:text-[#EAE3DB]/70 leading-relaxed font-semibold uppercase tracking-wider">
            Pan-India multi-camera shoots, frame-accurate cloud editing, and cinematic storytelling combined into one dedicated agency.
          </p>
        </div>
        <div>
          <a
            href="https://rohanjoshi.in/all-projects"
            className="group inline-flex items-center gap-2 border border-[#141416]/20 dark:border-white/20 hover:border-[#141416] text-[#141416] dark:text-[#EAE3DB] hover:bg-[#141416] dark:hover:bg-white hover:text-[#D5FF3F] dark:hover:text-[#141416] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 bg-[#EAE3DB] dark:bg-[#141416] backdrop-blur-md shadow-sm cursor-pointer"
          >
            Explore All Projects
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
