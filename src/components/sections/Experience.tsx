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

const renderIcon = (name: string) => {
  switch (name) {
    case 'moon-half':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18v-8H4c0-4.41 3.59-8 8-8s8 3.59 8 8-3.59 8-8 8z" />
        </svg>
      );
    case 'moon-crescent':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12.1 22h-.1c-5.5 0-10-4.5-10-10 0-4.8 3.4-8.9 8-9.8.5-.1 1 .2 1.2.7.2.5 0 1.1-.4 1.4-3 2.1-4.7 5.5-4.7 9.2 0 4.6 3.4 8.4 8 9.2.5.1.9.6.8 1.1-.1.7-.5 1.2-1.8 1.2z" />
        </svg>
      );
    case 'clock':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
      );
    case 'layers':
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <polygon points="12 2 2 7 12 12 22 7 12 2" />
          <polyline points="2 17 12 22 22 17" />
          <polyline points="2 12 12 17 22 12" />
        </svg>
      );
    default:
      return null;
  }
};

export const Experience = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section id="about" className="section-experience relative w-full overflow-hidden bg-[#F3EBDD] bg-dots-pattern py-24 flex flex-col justify-between" style={{ minHeight: '85vh' }}>
      
      {/* Decorative top strip */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-[#211747]/10" />

      {/* Centered Heading */}
      <div className="relative w-full max-w-[1440px] mx-auto px-6 md:px-16 flex flex-col z-10 text-left mb-12">
        <h3 className="font-heading text-4xl md:text-6xl text-[#211747] uppercase leading-none font-bold tracking-tight">
          PROVEN <span className="text-[#B9A1F7]">TRACK RECORD</span>
        </h3>
        <p className="font-sans text-xs md:text-sm text-[#6B6478] mt-3 uppercase tracking-widest">
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
                <div className="w-full h-full flex flex-col justify-between text-[#F3EBDD] select-none">
                  
                  {/* Top Content Block */}
                  <div>
                    {/* Image Frame */}
                    <div className="grow-card-image-wrap">
                      <img
                        src={card.image}
                        alt={card.title}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Number & Icon Meta Row */}
                    <div className="flex flex-row justify-between items-center text-[10px] uppercase font-bold tracking-widest text-[#B9A1F7] mb-1">
                      <span>NO. 0{card.id}</span>
                      <span className="text-[#B9A1F7] flex items-center justify-center">
                        {renderIcon(card.icon)}
                      </span>
                    </div>

                    {/* Editorial Title (Serif Italic) */}
                    <h4 className="font-serif italic text-2xl text-[#F3EBDD] mt-2 mb-1.5 leading-none font-medium text-left">
                      {card.title}
                    </h4>

                    {/* Description */}
                    <p className="font-sans text-[11px] text-[#F3EBDD]/70 leading-relaxed text-left">
                      {card.description}
                    </p>
                  </div>

                  {/* Bottom Content Block */}
                  <div>
                    {/* Subtle Line Divider */}
                    <div className="w-full h-[1px] bg-[#B9A1F7]/15 my-3.5" />

                    {/* Price & View Actions */}
                    <div className="flex flex-row justify-between items-center font-sans text-xs">
                      <span className="font-bold text-[#D5FF3F] text-[13px] tracking-wide">{card.price}</span>
                      <span className="font-semibold text-[#B9A1F7] group-hover:text-[#D5FF3F] flex items-center gap-1 text-[10px] uppercase tracking-widest transition-colors">
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
          <p className="font-sans text-[11px] md:text-xs text-[#6B6478] leading-relaxed font-semibold uppercase tracking-wider">
            Pan-India multi-camera shoots, frame-accurate cloud editing, and cinematic storytelling combined into one dedicated agency.
          </p>
        </div>
        <div>
          <a
            href="https://rohanjoshi.in/all-projects"
            className="group inline-flex items-center gap-2 border border-[#211747]/20 hover:border-[#211747] text-[#211747] hover:bg-[#211747] hover:text-[#D5FF3F] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 bg-[#F3EBDD] shadow-sm cursor-pointer"
          >
            Explore All Projects
            <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </a>
        </div>
      </div>
    </section>
  );
};
