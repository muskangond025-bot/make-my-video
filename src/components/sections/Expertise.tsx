"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, CustomEase } from '@/lib/gsap';

const FILM_TAPE_FRAMES = [
  {
    id: "01",
    tag: "FASHION",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
    code: "EASTMAN 5219",
    tc: "00:01:24",
  },
  {
    id: "02",
    tag: "AUTOMOTIVE",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=600&q=80",
    code: "35MM 24FPS",
    tc: "00:02:18",
  },
  {
    id: "03",
    tag: "EDITORIAL",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
    code: "PANAVISION",
    tc: "00:03:42",
  },
  {
    id: "04",
    tag: "CINEMA",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    code: "ANAMORPHIC",
    tc: "00:04:15",
  },
  {
    id: "05",
    tag: "DIRECTION",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    code: "HORIZON RAW",
    tc: "00:05:08",
  },
  {
    id: "06",
    tag: "STUDIO",
    image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=600&q=80",
    code: "PRORES 4444",
    tc: "00:06:55",
  },
  {
    id: "07",
    tag: "COLOR",
    image: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=600&q=80",
    code: "DAVINCI ACES",
    tc: "00:07:31",
  },
  {
    id: "08",
    tag: "CREATIVE",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=600&q=80",
    code: "KODAK VISION3",
    tc: "00:08:49",
  },
];

// Pre-computed static coordinates with rounded precision to guarantee 100% identical SSR & client hydration
const REEL_CALIBRATION_TICKS = [
  {"x1":191,"y1":100,"x2":186,"y2":100,"m":true},{"x1":189.62,"y1":115.8,"x2":186.66,"y2":115.28,"m":false},
  {"x1":185.51,"y1":131.12,"x2":182.69,"y2":130.1,"m":false},{"x1":178.81,"y1":145.5,"x2":174.48,"y2":143,"m":true},
  {"x1":169.71,"y1":158.49,"x2":167.41,"y2":156.57,"m":false},{"x1":158.49,"y1":169.71,"x2":156.57,"y2":167.41,"m":false},
  {"x1":145.5,"y1":178.81,"x2":143,"y2":174.48,"m":true},{"x1":131.12,"y1":185.51,"x2":130.1,"y2":182.69,"m":false},
  {"x1":115.8,"y1":189.62,"x2":115.28,"y2":186.66,"m":false},{"x1":100,"y1":191,"x2":100,"y2":186,"m":true},
  {"x1":84.2,"y1":189.62,"x2":84.72,"y2":186.66,"m":false},{"x1":68.88,"y1":185.51,"x2":69.9,"y2":182.69,"m":false},
  {"x1":54.5,"y1":178.81,"x2":57,"y2":174.48,"m":true},{"x1":41.51,"y1":169.71,"x2":43.43,"y2":167.41,"m":false},
  {"x1":30.29,"y1":158.49,"x2":32.59,"y2":156.57,"m":false},{"x1":21.19,"y1":145.5,"x2":25.52,"y2":143,"m":true},
  {"x1":14.49,"y1":131.12,"x2":17.31,"y2":130.1,"m":false},{"x1":10.38,"y1":115.8,"x2":13.34,"y2":115.28,"m":false},
  {"x1":9,"y1":100,"x2":14,"y2":100,"m":true},{"x1":10.38,"y1":84.2,"x2":13.34,"y2":84.72,"m":false},
  {"x1":14.49,"y1":68.88,"x2":17.31,"y2":69.9,"m":false},{"x1":21.19,"y1":54.5,"x2":25.52,"y2":57,"m":true},
  {"x1":30.29,"y1":41.51,"x2":32.59,"y2":43.43,"m":false},{"x1":41.51,"y1":30.29,"x2":43.43,"y2":32.59,"m":false},
  {"x1":54.5,"y1":21.19,"x2":57,"y2":25.52,"m":true},{"x1":68.88,"y1":14.49,"x2":69.9,"y2":17.31,"m":false},
  {"x1":84.2,"y1":10.38,"x2":84.72,"y2":13.34,"m":false},{"x1":100,"y1":9,"x2":100,"y2":14,"m":true},
  {"x1":115.8,"y1":10.38,"x2":115.28,"y2":13.34,"m":false},{"x1":131.12,"y1":14.49,"x2":130.1,"y2":17.31,"m":false},
  {"x1":145.5,"y1":21.19,"x2":143,"y2":25.52,"m":true},{"x1":158.49,"y1":30.29,"x2":156.57,"y2":32.59,"m":false},
  {"x1":169.71,"y1":41.51,"x2":167.41,"y2":43.43,"m":false},{"x1":178.81,"y1":54.5,"x2":174.48,"y2":57,"m":true},
  {"x1":185.51,"y1":68.88,"x2":182.69,"y2":69.9,"m":false},{"x1":189.62,"y1":84.2,"x2":186.66,"y2":84.72,"m":false}
];

const REEL_INSPECTION_WINDOWS = [
  { cx: 100, cy: 46, trackR: 54 },
  { cx: 147, cy: 73, trackR: 54.2 },
  { cx: 147, cy: 127, trackR: 54.2 },
  { cx: 100, cy: 154, trackR: 54 },
  { cx: 53, cy: 127, trackR: 54.2 },
  { cx: 53, cy: 73, trackR: 54.2 },
];

const REEL_HEX_BOLTS = [
  { bx: 128, by: 100 },
  { bx: 114, by: 124.25 },
  { bx: 86, by: 124.25 },
  { bx: 72, by: 100 },
  { bx: 86, by: 75.75 },
  { bx: 114, by: 75.75 },
];

const REEL_DRIVE_LUGS = [
  { kx: 111, ky: 100 },
  { kx: 94.5, ky: 109.53 },
  { kx: 94.5, ky: 90.47 },
];

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Sticky Title refs
  const stickyTitleRef = useRef<HTMLElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);

  // 1. Sticky Title Scroll Animation (GSAP Context)
  useEffect(() => {
    const ctx = gsap.context(() => {

      const chars1 = title1Ref.current?.querySelectorAll('.char-span');
      const chars2 = title2Ref.current?.querySelectorAll('.char-span');

      if (chars1 && chars2 && stickyTitleRef.current) {
        // Reset visibility for stacked headings
        gsap.set(title2Ref.current, { visibility: 'visible' });

        const masterTl = gsap.timeline({
          scrollTrigger: {
            trigger: stickyTitleRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: true,
          }
        });

        const revealDuration = 0.7;
        const fadeOutDuration = 0.7;
        const overlapOffset = 0.15;

        // Heading 1 reveal & fade-out timeline
        const h1Tl = gsap.timeline();
        h1Tl.to(chars1, {
          opacity: 1,
          stagger: { amount: revealDuration, from: "start" },
          duration: revealDuration
        });
        h1Tl.to(chars1, {
          opacity: 0,
          stagger: { amount: fadeOutDuration, from: "end" },
          duration: fadeOutDuration
        });

        // Heading 2 reveal timeline
        const h2Tl = gsap.timeline();
        h2Tl.to(chars2, {
          opacity: 1,
          stagger: { amount: revealDuration, from: "start" },
          duration: revealDuration
        });

        masterTl.add(h1Tl);
        masterTl.add(h2Tl, `-=${overlapOffset}`);
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // 2. Expertise Cards Scroll Reveal Animation
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const root = containerRef.current?.querySelector('.expertise-cards');
      if (!root) return;

      const pinHeight = root.querySelector('.pin-height');
      const container = root.querySelector('.expertise-container');
      const cards = root.querySelectorAll('.expertise-card');

      if (!pinHeight || !container || cards.length === 0) return;

      // Pin container during scroll
      const pinTrigger = ScrollTrigger.create({
        trigger: pinHeight,
        start: 'top top',
        end: 'bottom bottom',
        pin: container,
        pinSpacing: false,
        scrub: 0.4
      });

      // Set initial card position (offset down off screen)
      gsap.set(cards, {
        yPercent: 50,
        y: 0.5 * window.innerHeight
      });

      // Re-create the Webflow exact custom ease curve for the cards reveal
      CustomEase.create("expertiseCurve", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1");

      // Animate cards staggered reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.4
        }
      });

      // Translate up
      tl.to(cards, {
        yPercent: -50,
        y: -0.5 * window.innerHeight,
        duration: 1,
        stagger: 0.12,
        ease: "expertiseCurve"
      }, 'step');

      // Add random rotation swings
      tl.to(cards, {
        rotation: () => (Math.random() - 0.5) * 20,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.out'
      }, 'step');

      // Straighten out rotation at the end
      tl.to(cards, {
        rotation: 0,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power3.in'
      }, 'step+=0.5');

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Helper to split text strings into character spans for fade staggering
  const splitWordsAndChars = (text: string) => {
    return text.split(" ").map((word, wordIdx) => (
      <span key={wordIdx} className="inline-block whitespace-nowrap">
        {word.split("").map((char, charIdx) => (
          <span key={charIdx} className="char-span inline-block opacity-0">
            {char}
          </span>
        ))}
        {/* Trailing space span */}
        <span className="inline-block">&nbsp;</span>
      </span>
    ));
  };

  return (
    <div ref={containerRef} id="expertise" className="w-full">

      {/* 1. CINEMA TAPE REEL WITH LOOPING MOVING FILMSTRIP */}

      <section
        className="w-full overflow-hidden select-none py-2 sm:py-3"
        style={{
          width: "100vw",
          maxWidth: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          background: "transparent",
          backgroundColor: "transparent",
          border: "none",
        }}
      >
        <div className="w-full flex items-center relative overflow-hidden" style={{ minHeight: "155px" }}>
          
          {/* 1. CINEMA REEL SPOOL HOUSING & VERTICAL CHROME TENSION GUIDE ROLLER */}
          <div className="relative z-30 flex-shrink-0 flex items-center pl-2 sm:pl-4 md:pl-6 pointer-events-none select-none">
            
            {/* The Spool Disc & Tension Roller Container */}
            <div className="relative w-36 h-36 sm:w-40 sm:h-40 md:w-44 md:h-44 flex items-center justify-center flex-shrink-0">
              
              {/* Rotating Machined 35mm Titanium Cinema Reel (Hyper-Realistic SVG) */}
              <svg
                viewBox="0 0 200 200"
                className="w-full h-full animate-spool-spin drop-shadow-[0_12px_28px_rgba(0,0,0,0.65)]"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <radialGradient id="titaniumFlange3D" cx="42%" cy="36%" r="65%">
                    <stop offset="0%" stopColor="#c5cbd8" />
                    <stop offset="20%" stopColor="#454955" />
                    <stop offset="42%" stopColor="#8c94a6" />
                    <stop offset="68%" stopColor="#211747" />
                    <stop offset="88%" stopColor="#646b7a" />
                    <stop offset="100%" stopColor="#2a2d36" />
                  </radialGradient>
                  <linearGradient id="specularRim3D" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="0.9" />
                    <stop offset="25%" stopColor="#3d424e" />
                    <stop offset="50%" stopColor="#B9A1F7" stopOpacity="0.6" />
                    <stop offset="75%" stopColor="#211747" />
                    <stop offset="100%" stopColor="#9da5b5" />
                  </linearGradient>
                  <radialGradient id="woundStock3D" cx="50%" cy="50%" r="50%">
                    <stop offset="30%" stopColor="#0b0817" />
                    <stop offset="60%" stopColor="#181232" />
                    <stop offset="85%" stopColor="#0b0817" />
                    <stop offset="98%" stopColor="#211747" />
                    <stop offset="100%" stopColor="#090614" />
                  </radialGradient>
                  <radialGradient id="centerHub3D" cx="36%" cy="32%" r="68%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="28%" stopColor="#a8b0c0" />
                    <stop offset="65%" stopColor="#211747" />
                    <stop offset="85%" stopColor="#555a68" />
                    <stop offset="100%" stopColor="#16181f" />
                  </radialGradient>
                  <linearGradient id="bevelLight3D" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0b0817" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#211747" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#B9A1F7" stopOpacity="0.6" />
                  </linearGradient>
                  <radialGradient id="boltHead3D" cx="30%" cy="30%" r="70%">
                    <stop offset="0%" stopColor="#ffffff" />
                    <stop offset="45%" stopColor="#828896" />
                    <stop offset="85%" stopColor="#211747" />
                    <stop offset="100%" stopColor="#121316" />
                  </radialGradient>
                </defs>

                {/* 1. Underlying Coiled 35mm Raw Stock wound on core */}
                <circle cx="100" cy="100" r="92" fill="url(#woundStock3D)" stroke="#090614" strokeWidth="2.5" />
                <circle cx="100" cy="100" r="84" fill="none" stroke="#B9A1F7" strokeWidth="0.8" strokeDasharray="16 4" opacity="0.35" />
                <circle cx="100" cy="100" r="74" fill="none" stroke="#211747" strokeWidth="0.8" strokeDasharray="20 5" opacity="0.6" />
                <circle cx="100" cy="100" r="64" fill="none" stroke="#B9A1F7" strokeWidth="0.8" strokeDasharray="14 4" opacity="0.35" />
                <circle cx="100" cy="100" r="54" fill="none" stroke="#211747" strokeWidth="0.8" strokeDasharray="18 5" opacity="0.6" />

                {/* 2. Main Machined Aluminum Flange Plate */}
                <circle cx="100" cy="100" r="97" fill="url(#titaniumFlange3D)" stroke="url(#specularRim3D)" strokeWidth="3" />
                <circle cx="100" cy="100" r="94" fill="none" stroke="#121317" strokeWidth="1.2" opacity="0.8" />
                <circle cx="100" cy="100" r="90" fill="none" stroke="#B9A1F7" strokeWidth="0.6" strokeDasharray="2 3" opacity="0.35" />

                {/* 3. Engraved Metric Calibration Markings */}
                {REEL_CALIBRATION_TICKS.map((tick, i) => (
                  <line
                    key={`cal-${i}`}
                    x1={tick.x1}
                    y1={tick.y1}
                    x2={tick.x2}
                    y2={tick.y2}
                    stroke={tick.m ? "#D5FF3F" : "#B9A1F7"}
                    strokeWidth={tick.m ? "0.9" : "0.5"}
                    opacity={tick.m ? "0.8" : "0.4"}
                  />
                ))}

                {/* 4. 6 Precision Flange Inspection Windows with 3D Bevels */}
                {REEL_INSPECTION_WINDOWS.map((win, idx) => (
                  <g key={`win-${idx}`}>
                    <circle cx={win.cx} cy={win.cy} r="18" fill="url(#woundStock3D)" />
                    <circle cx={100} cy={100} r={win.trackR} fill="none" stroke="#211747" strokeWidth="0.8" opacity="0.5" />
                    <circle cx={win.cx} cy={win.cy} r="18" fill="none" stroke="url(#bevelLight3D)" strokeWidth="2.4" />
                    <circle cx={win.cx} cy={win.cy} r="18.5" fill="none" stroke="#0e0f12" strokeWidth="0.8" opacity="0.8" />
                    <circle cx={win.cx} cy={win.cy} r="15.8" fill="none" stroke="#B9A1F7" strokeWidth="0.5" opacity="0.3" />
                  </g>
                ))}

                {/* 5. Center Mounting Ring with Stainless Hex Bolts */}
                <circle cx="100" cy="100" r="32" fill="none" stroke="#16171c" strokeWidth="2.2" />
                <circle cx="100" cy="100" r="31" fill="none" stroke="#B9A1F7" strokeWidth="0.8" opacity="0.4" />
                
                {REEL_HEX_BOLTS.map((bolt, idx) => (
                  <g key={`bolt-${idx}`}>
                    <circle cx={bolt.bx} cy={bolt.by} r="2.8" fill="url(#boltHead3D)" stroke="#111215" strokeWidth="0.8" />
                    <circle cx={bolt.bx} cy={bolt.by} r="1.1" fill="#090a0c" />
                  </g>
                ))}

                {/* 6. Heavy-Duty Cinema Center Hub Core with Arriflex Drive Lugs */}
                <circle cx="100" cy="100" r="20" fill="url(#centerHub3D)" stroke="#14151a" strokeWidth="2.2" />
                <circle cx="100" cy="100" r="19" fill="none" stroke="#B9A1F7" strokeWidth="0.75" opacity="0.5" />
                
                {REEL_DRIVE_LUGS.map((lug, idx) => (
                  <circle key={`lug-${idx}`} cx={lug.kx} cy={lug.ky} r="2.4" fill="#0a0b0e" stroke="#2e313b" strokeWidth="0.7" />
                ))}

                {/* Center Spindle Axle Hole with Brass Bushing */}
                <circle cx="100" cy="100" r="8" fill="#c49a45" stroke="#141518" strokeWidth="1.2" />
                <circle cx="100" cy="100" r="6.8" fill="#060708" stroke="#1e2026" strokeWidth="1" />
                <circle cx="100" cy="100" r="2.5" fill="#000000" />
              </svg>

              {/* 2. CHROME TENSION GUIDE ROLLER PIN */}
              <div
                className="absolute -right-2 sm:-right-3 top-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-between pointer-events-none drop-shadow-[5px_0_10px_rgba(0,0,0,0.75)]"
                style={{ height: "126px" }}
              >
                {/* Top Roller Mounting Bracket Cap with Neon Lime Tally Indicator */}
                <div className="w-4 h-3.5 rounded-t-sm bg-gradient-to-b from-[#949cb0] to-[#211747] border border-black/80 flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5FF3F] shadow-[0_0_6px_#D5FF3F]" />
                </div>

                {/* Chrome Roller Pin (Specular cylinder along full 126px film height) */}
                <div
                  className="w-2.5 flex-1 shadow-inner relative"
                  style={{
                    background: "linear-gradient(90deg, #4b505c 0%, #ffffff 35%, #211747 65%, #B9A1F7 85%, #181a20 100%)",
                    borderRadius: "1px",
                  }}
                >
                  <div className="absolute top-0 bottom-0 left-[30%] w-[1.5px] bg-white/70" />
                </div>

                {/* Bottom Roller Mounting Bracket Cap */}
                <div className="w-4 h-3.5 rounded-b-sm bg-gradient-to-b from-[#211747] to-[#949cb0] border border-black/80 flex items-center justify-center shadow-md">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#D5FF3F] shadow-[0_0_6px_#D5FF3F]" />
                </div>
              </div>

            </div>
          </div>

          {/* 3. THE MOVING CONTINUOUS FILMSTRIP: Tucked directly behind the Reel & Roller */}
          <div className="flex-1 overflow-hidden relative flex items-center -ml-16 sm:-ml-20 md:-ml-24 z-10">
            <div className="animate-filmtape-scroll flex items-center">
              {[...FILM_TAPE_FRAMES, ...FILM_TAPE_FRAMES].map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="film-frame-cell flex-shrink-0 bg-[#0e0a1f] border-y-[3px] border-[#211747] rounded-[3px] px-1.5 py-1.5 mx-1 flex flex-col justify-between shadow-xl relative group cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  style={{
                    width: "196px",
                    height: "126px",
                  }}
                >
                  {/* Top Sprocket Holes (Perforations) */}
                  <div className="flex items-center justify-between px-1 h-3.5 opacity-80">
                    {Array.from({ length: 6 }).map((_, sIdx) => (
                      <span
                        key={sIdx}
                        className="w-2.5 h-1.5 rounded-[1px] bg-[#F3EBDD]/60 block shadow-inner border border-black/50"
                      />
                    ))}
                  </div>

                  {/* Frame Image Area */}
                  <div className="relative w-full h-[76px] rounded-[2px] overflow-hidden bg-black border border-[#B9A1F7]/20 shadow-inner">
                    <img
                      src={item.image}
                      alt={item.tag}
                      className="w-full h-full object-cover grayscale-[10%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                      loading="lazy"
                    />
                    <div className="absolute top-1 left-1.5 text-[9px] font-mono font-bold tracking-wider text-[#211747] bg-[#B9A1F7] px-1.5 py-0.5 rounded-[2px] shadow-sm">
                      {item.tag}
                    </div>
                  </div>

                  {/* Bottom Sprocket Holes with Authentic Film Code */}
                  <div className="flex items-center justify-between px-1 h-3.5 opacity-80 mt-0.5">
                    <span className="text-[7.5px] font-mono tracking-tighter text-[#D5FF3F] font-semibold select-none">
                      {item.code}
                    </span>
                    <div className="flex items-center gap-1.5">
                      {Array.from({ length: 4 }).map((_, sIdx) => (
                        <span
                          key={sIdx}
                          className="w-2 h-1.5 rounded-[1px] bg-[#F3EBDD]/60 block shadow-inner border border-black/50"
                        />
                      ))}
                    </div>
                    <span className="text-[7.5px] font-mono tracking-tighter text-[#B9A1F7]/80 select-none">
                      ▶ {item.tc}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* 2. MAIN EXPERTISE SECTION */}
      <div className="section-expertise w-full bg-[#211747] text-[#F3EBDD] relative flex flex-col justify-start select-none overflow-visible">
        <div className="expertise-outer w-full">
          <div className="padding-global w-full">
            <div className="container-large w-full">
              <div className="expertise-inner w-full">
                <div className="expertise-border w-full">

                  {/* STICKY STAGGER LETTER TITLE WRAPPER */}
                  <section ref={stickyTitleRef} className="sticky-title-wrapper w-full relative">
                    <div className="sticky-title-container w-full h-screen sticky top-0 flex items-center justify-center">
                      <div className="sticky-title-inner text-center flex flex-col items-center justify-center relative w-full">

                        {/* Heading 1: EXPERTISE */}
                        <h2 ref={title1Ref} className="sticky-title-el is--title font-humane text-[#F3EBDD] text-[14vw] uppercase leading-[0.8] tracking-widest font-bold select-none">
                          {splitWordsAndChars("SERVICES")}
                        </h2>

                        {/* Heading 2: Description */}
                        <h2 ref={title2Ref} className="sticky-title-el is--stacked font-sans text-center text-[2.5rem] leading-[1.2] font-semibold text-[#B9A1F7] max-w-[900px] select-none uppercase">
                          {splitWordsAndChars("Multi-City Video Production, Remote Editing, and Corporate AV Solutions")}
                        </h2>

                      </div>
                    </div>
                  </section>

                  {/* DESKTOP STICKY STAGGER REVEAL CARDS */}
                  <div className="expertise-cards">
                    <div className="pin-height">
                      <div className="expertise-container">

                        {/* CARD 1: MULTI CITY PRODUCTION */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--1">
                              <div className="card-inner-top">
                                <div className="eyebrow-main">
                                  <div className="eyebrow-text">PAN-INDIA SHOOTS</div>
                                </div>
                                <div className="text-size-large text-weight-medium is--title">MULTI CITY PRODUCTION</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  Comprehensive video shoots across 8+ major Indian cities including Mumbai, Delhi & Bangalore with cinema-grade 4K equipment and full crews.
                                </p>
                              </div>
                              <div className="button-group is--card">
                                <a href="https://rohanjoshi.in/service" className="btn-main w-inline-block">
                                  <div className="btn-frame">
                                    <div className="btn-text">VIEW</div>
                                  </div>
                                  <div className="btn-icon-wrap">
                                    <div className="btn-icon">
                                      <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png" loading="eager" alt="Multi City Video Production" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 2: REMOTE EDITING */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--2">
                              <div className="card-inner-top">
                                <div className="eyebrow-main">
                                  <div className="eyebrow-text">GLOBAL POST-PRODUCTION</div>
                                </div>
                                <div className="text-size-large text-weight-medium is--title">REMOTE EDITING WORK</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  Outsource your video editing to our expert team. High-quality editing, motion graphics, audio cleanup, and rapid turnaround for global clients.
                                </p>
                              </div>
                              <div className="button-group is--card">
                                <a href="https://rohanjoshi.in/service" className="btn-main w-inline-block">
                                  <div className="btn-frame">
                                    <div className="btn-text">VIEW</div>
                                  </div>
                                  <div className="btn-icon-wrap">
                                    <div className="btn-icon">
                                      <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png" loading="eager" alt="Remote Editing Work" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 3: CORPORATE AV */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--3">
                              <div className="card-inner-top">
                                <div className="eyebrow-main">
                                  <div className="eyebrow-text">BRAND STORYTELLING</div>
                                </div>
                                <div className="text-size-large text-weight-medium is--title">CORPORATE AV & ADS</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  Showcase your brand's vision, leadership, and products through stunning visuals, documentary storytelling, and Shark Tank pitch films.
                                </p>
                              </div>
                              <div className="button-group is--card">
                                <a href="https://rohanjoshi.in/service" className="btn-main w-inline-block">
                                  <div className="btn-frame">
                                    <div className="btn-text">VIEW</div>
                                  </div>
                                  <div className="btn-icon-wrap">
                                    <div className="btn-icon">
                                      <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                      </svg>
                                    </div>
                                  </div>
                                </a>
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png" loading="eager" alt="Corporate AV" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>
                  </div>

                  {/* MOBILE RESPONSIVE SIMPLE LIST */}
                  <div className="expertise-cards-mobile">
                    <div className="expertise-container-mobile">

                      {/* CARD 1: MULTI CITY PRODUCTION */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--1">
                            <div className="card-inner-top">
                              <div className="eyebrow-main">
                                <div className="eyebrow-text">PAN-INDIA SHOOTS</div>
                              </div>
                              <div className="text-size-large text-weight-medium is--title">MULTI CITY PRODUCTION</div>
                              <p className="text-size-tiny text-color-secondary text-align-center">
                                Comprehensive video shoots across 8+ major Indian cities including Mumbai, Delhi & Bangalore with cinema-grade 4K equipment and full crews.
                              </p>
                            </div>
                            <div className="button-group is--card">
                              <a href="https://rohanjoshi.in/service" className="btn-main w-inline-block">
                                <div className="btn-frame">
                                  <div className="btn-text">VIEW</div>
                                </div>
                                <div className="btn-icon-wrap">
                                  <div className="btn-icon">
                                    <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                    </svg>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png" loading="eager" alt="Multi City Video Production" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CARD 2: REMOTE EDITING */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--2">
                            <div className="card-inner-top">
                              <div className="eyebrow-main">
                                <div className="eyebrow-text">GLOBAL POST-PRODUCTION</div>
                              </div>
                              <div className="text-size-large text-weight-medium is--title">REMOTE EDITING WORK</div>
                              <p className="text-size-tiny text-color-secondary text-align-center">
                                Outsource your video editing to our expert team. High-quality editing, motion graphics, audio cleanup, and rapid turnaround for global clients.
                              </p>
                            </div>
                            <div className="button-group is--card">
                              <a href="https://rohanjoshi.in/service" className="btn-main w-inline-block">
                                <div className="btn-frame">
                                  <div className="btn-text">VIEW</div>
                                </div>
                                <div className="btn-icon-wrap">
                                  <div className="btn-icon">
                                    <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                    </svg>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png" loading="eager" alt="Remote Editing Work" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* CARD 3: CORPORATE AV */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--3">
                            <div className="card-inner-top">
                              <div className="eyebrow-main">
                                <div className="eyebrow-text">BRAND STORYTELLING</div>
                              </div>
                              <div className="text-size-large text-weight-medium is--title">CORPORATE AV & ADS</div>
                              <p className="text-size-tiny text-color-secondary text-align-center">
                                Showcase your brand's vision, leadership, and products through stunning visuals, documentary storytelling, and Shark Tank pitch films.
                              </p>
                            </div>
                            <div className="button-group is--card">
                              <a href="https://rohanjoshi.in/service" className="btn-main w-inline-block">
                                <div className="btn-frame">
                                  <div className="btn-text">VIEW</div>
                                </div>
                                <div className="btn-icon-wrap">
                                  <div className="btn-icon">
                                    <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                      <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                    </svg>
                                  </div>
                                </div>
                              </a>
                            </div>
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png" loading="eager" alt="Corporate AV" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
