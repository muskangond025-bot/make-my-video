"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const services = [
  {
    "id": 1,
    "title": "Multi City Video Production",
    "description": "We offer comprehensive video production and editing services across India, catering to diverse needs. From corporate shoots to creative storytelling, we deliver exceptional quality with a variety of styles. Equipped with advanced gear, we ensure every project stands out, meeting all your visual needs seamlessly.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy of MMV Website service page (1330 x 1780 px) (2) (1).png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/multi-city-videos-production"
  },
  {
    "id": 2,
    "title": "Remote Editing Work",
    "description": "Outsource your video editing needs to our expert team with seamless remote editing services. No matter your location, we deliver high-quality editing tailored to your project requirements. From corporate videos to creative projects, our skilled editors ensure polished results that exceed expectations.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy of MMV Website service page (1330 x 1780 px) (5).png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/remote-editing-work"
  },
  {
    "id": 3,
    "title": "Corporate AV",
    "description": "Elevate your brand with our corporate AV services, designed to showcase your story, values, and offerings through stunning visuals and professional production. From concept to execution, we create impactful videos that connect with your audience, leaving a lasting impression.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy of MMV Website service page (1330 x 1780 px) (1) (1).png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/corporate-av"
  },
  {
    "id": 4,
    "title": "Trade Shows & Exhibition Videos",
    "description": "Bring your trade shows and exhibitions to life with impactful videos that showcase your brand, products, and audience engagement. We capture the energy, interactions, and highlights, creating compelling visuals that effectively communicate your event's success and leave a lasting impression.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy of MMV Website service page (1330 x 1780 px) (3) (1).png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/trade-shows-exhibition-videos"
  },
  {
    "id": 5,
    "title": "Corporate Events",
    "description": "Capture the essence of your corporate events with our expert video production services. We focus on preserving key moments, highlights, and emotions, crafting videos that enhance your brand’s presence. From dynamic coverage to polished editing, we ensure your event stands out and engages your audience.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy of MMV Website service page (1330 x 1780 px) (4) (1).png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/corporate-events"
  },
  {
    "id": 6,
    "title": "Live Telecast of Events",
    "description": "Take your events global with Make My Vid's professional live-streaming services. We deliver high-quality broadcasts that ensure a seamless and engaging experience for your audience, no matter where they are. From corporate events to special occasions, we make every moment count in real time.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959841_11.png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/live-telecast-of-events"
  },
  {
    "id": 7,
    "title": "Conference & Panel Discussion",
    "description": "Capture the essence of your conferences and panel discussions with our expert video production services. We professionally document every moment, from keynote speeches to audience interactions, creating impactful videos that showcase your event's insights, highlights, and key messages with precision.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959858_12.png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/conference-or-panel-discussion-"
  },
  {
    "id": 8,
    "title": "Social Initiatives & Documentation",
    "description": "Bring your social initiatives to life with powerful video and photo coverage that highlights their real-world impact. We craft compelling visuals to tell your story, inspiring action and engagement. Showcase the change you're making and motivate others to join your mission for a better future.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959876_13.png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/social-initiatives-documentation"
  },
  {
    "id": 9,
    "title": "Brand Campaign",
    "description": "Elevate your brand campaigns with our comprehensive event coverage. From dynamic video and stunning photography to professional editing, we capture every detail to showcase your brand’s identity. Delivering compelling visuals, we help you create a lasting impact and connect with your audience.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1735391835_CH 35 (1).jpg",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/brand-campaign-"
  },
  {
    "id": 10,
    "title": "Scripting & Voiceover Services",
    "description": "Our expert scripting and voice-over services craft compelling narratives that captivate your audience. Whether for promotional videos, presentations, or commercials, we combine engaging voice talent with creative scripts to bring your message to life, ensuring your brand's story resonates powerfully and effectively.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959997_Copy of MMV Website service page (1330 x 1780 px) (2) (2).png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/scripting-and-voice-services"
  },
  {
    "id": 11,
    "title": "Creative Direction",
    "description": "Transform your vision into powerful visuals with expert creative direction. We bring innovative ideas to life, ensuring cohesive storytelling that aligns with your brand’s identity. From concept to execution, we craft impactful visuals that elevate your message and leave a lasting impression on your audience.",
    "imageUrl": "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959939_15.png",
    "ctaText": "Get in Touch",
    "ctaLink": "#contact",
    "knowMoreLink": "https://rohanjoshi.in/services/creative-direction-"
  }
];

export const ServicesAccordion = () => {
  const [activeId, setActiveId] = useState<number>(1);

  return (
    <section id="services" className="w-full py-28 bg-[#07070a] text-white relative overflow-hidden select-none">
      {/* Ambient Radial Lights */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-red-600/10 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/3 -right-40 w-96 h-96 bg-amber-500/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="mb-16 md:mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/10 text-xs font-mono text-zinc-400 uppercase tracking-widest mb-4">
            CORE CAPABILITIES & SOLUTIONS
          </div>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-extrabold uppercase tracking-tight text-white leading-none">
                EMPOWERING <br />
                <span className="text-zinc-400 font-light font-sans text-3xl sm:text-5xl lg:text-6xl">YOU WITH</span>
              </h2>
            </div>
            <p className="max-w-md text-sm sm:text-base text-zinc-400 font-sans leading-relaxed">
              Explore our full suite of professional film, event broadcast, and remote editing solutions crafted for creators, MSMEs, and global institutions.
            </p>
          </div>
        </div>

        {/* Interactive Accordion List */}
        <div className="space-y-4">
          {services.map((service, index) => {
            const isOpen = activeId === service.id;
            return (
              <div
                key={service.id}
                className="border-b border-white/10 transition-colors duration-300"
              >
                {/* Header Row */}
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? 0 : service.id)}
                  className="w-full py-6 sm:py-8 flex items-center justify-between gap-4 text-left group focus:outline-none cursor-pointer"
                >
                  <div className="flex items-center gap-4 sm:gap-8">
                    <span className="font-mono text-xs sm:text-sm text-zinc-400 tracking-wider">
                      {(index + 1).toString().padStart(2, '0')}
                    </span>
                    <h3 className={`font-sans text-xl sm:text-2xl md:text-3xl font-bold tracking-tight transition-colors duration-300 ${
                      isOpen ? 'text-red-500' : 'text-zinc-200 group-hover:text-white'
                    }`}>
                      {service.title}
                    </h3>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full border flex items-center justify-center transition-all duration-300 ${
                      isOpen
                        ? 'bg-red-600 border-red-600 text-white rotate-45'
                        : 'border-white/20 text-zinc-400 group-hover:border-white/50 group-hover:text-white'
                    }`}>
                      <svg
                        className="w-4 h-4 transition-transform duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </span>
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pb-10 pt-2 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        
                        {/* Text and Actions */}
                        <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
                          <p className="text-zinc-300 text-base sm:text-lg leading-relaxed font-sans">
                            {service.description}
                          </p>

                          <div className="flex flex-wrap items-center gap-4 pt-4">
                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300 shadow-[0_0_25px_rgba(220,38,38,0.4)]"
                            >
                              <span>Get in Touch</span>
                              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                                <path d="M8 5v14l11-7z" />
                              </svg>
                            </a>

                            <a
                              href="#contact"
                              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/[0.04] hover:bg-white/10 border border-white/15 text-zinc-300 hover:text-white text-xs sm:text-sm font-semibold uppercase tracking-wider transition-all duration-300"
                            >
                              <span>Know More</span>
                              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          </div>
                        </div>

                        {/* Visual Image Preview */}
                        <div className="lg:col-span-5 flex justify-center">
                          <div className="relative w-full max-w-sm aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 shadow-2xl bg-zinc-900 group">
                            {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img
                              src={service.imageUrl}
                              alt={service.title}
                              loading="lazy"
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-400 uppercase tracking-widest">
                              {service.title}
                            </div>
                          </div>
                        </div>

                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
