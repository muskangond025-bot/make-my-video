"use client";
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, CustomEase } from '@/lib/gsap';
import { CinemaFilmStrip3D } from '@/components/ui/CinemaFilmStrip3D';

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified Section Refs
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // Single Unified 3-Scroll Master Timeline:
  // 1st scroll: SERVICES reveals
  // 2nd scroll: Description reveals
  // 3rd scroll: Three Cards glide up smoothly and settle centered
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const chars1 = title1Ref.current?.querySelectorAll('.char-span');
      const chars2 = title2Ref.current?.querySelectorAll('.char-span');
      const cards = cardsContainerRef.current?.querySelectorAll('.expertise-card');

      if (!pinWrapperRef.current || !chars1 || !chars2 || !cards || cards.length === 0) return;

      // 1. Initial State Setup
      gsap.set(chars1, { opacity: 0 });
      gsap.set(chars2, { opacity: 0 });
      gsap.set(title1Ref.current, { opacity: 1, visibility: 'visible' });
      gsap.set(title2Ref.current, { opacity: 1, y: 0, visibility: 'visible' });

      // Cards start physical depth below the viewport, ready for a pure smooth slide up
      gsap.set(cards, {
        yPercent: 0,
        y: () => window.innerHeight * 0.88,
        scale: 0.96,
        opacity: 0.35,
        rotation: (i: number) => (i === 0 ? -1.2 : i === 2 ? 1.2 : 0),
        transformOrigin: "center center",
        willChange: "transform, opacity"
      });

      // Silky progressive deceleration curve: smooth, continuous slide-up that gently glides to a rest
      CustomEase.create("smoothSlideUp", "M0,0 C0.25,0.7 0.35,0.98 1,1");

      const masterTl = gsap.timeline({
        scrollTrigger: {
          trigger: pinWrapperRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: 1, // Smooth damping for buttery fluid scroll response
        }
      });

      // ----------------------------------------------------
      // STEP 1 (1st Scroll): "SERVICES" reveals letter-by-letter
      // ----------------------------------------------------
      masterTl.to(chars1, {
        opacity: 1,
        stagger: { amount: 0.75, from: "start" },
        duration: 0.75,
        ease: "power2.out"
      });
      // Brief pause to admire "SERVICES"
      masterTl.to({}, { duration: 0.25 });

      // ----------------------------------------------------
      // STEP 2 (2nd Scroll): "SERVICES" fades out, Description reveals
      // ----------------------------------------------------
      masterTl.to(chars1, {
        opacity: 0,
        stagger: { amount: 0.35, from: "end" },
        duration: 0.35,
        ease: "power2.in"
      });
      masterTl.to(chars2, {
        opacity: 1,
        stagger: { amount: 0.85, from: "start" },
        duration: 0.85,
        ease: "power2.out"
      }, "-=0.15");
      // Dedicated comfortable hold for reading description
      masterTl.to({}, { duration: 0.45 });

      // ----------------------------------------------------
      // STEP 3 (3rd Scroll): Description softly floats up, 3 Cards smoothly slide up & settle
      // ----------------------------------------------------
      masterTl.to(title2Ref.current, {
        opacity: 0,
        y: -35,
        duration: 0.45,
        ease: "power2.inOut"
      });

      masterTl.to(cards, {
        y: 0,
        yPercent: 0,
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 1.4,
        stagger: 0.08,
        ease: "smoothSlideUp"
      }, "<0.05"); // Starts gliding up smoothly as description begins to exit

      // Generous center lock: cards stay firmly centered for user to inspect
      masterTl.to({}, { duration: 0.75 });

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

      {/* 1. TRUSTED BY HEADING & 3D 35MM CINEMA FILMSTRIP MARQUEE */}
      <section
        className="w-full overflow-hidden select-none pt-8 pb-4 sm:pt-12 sm:pb-6"
        style={{
          width: "100vw",
          maxWidth: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          background: "transparent",
        }}
      >
        {/* Centered Editorial "TRUSTED BY" Header (matching IVENTIONS editorial style) */}
        <div className="w-full flex flex-col items-center justify-center text-center px-4 mb-5 sm:mb-7">
          <span className="text-[11px] sm:text-xs font-mono tracking-[0.35em] uppercase text-[#6E6B7B] font-semibold mb-2">
            CLIENTS &amp; COMMERCIAL PARTNERS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl tracking-[0.22em] uppercase text-[#141416] font-medium leading-none">
            TRUSTED BY
          </h2>
          <div className="w-16 h-[2px] bg-[#7567EE] mt-3.5 rounded-full" />
        </div>

        {/* 3D 35mm Celluloid Ribbon with Client Logos */}
        <CinemaFilmStrip3D className="w-full h-[190px] sm:h-[230px] md:h-[265px]" speed={1.1} />
      </section>

      {/* 2. MAIN EXPERTISE SECTION - UNIFIED 3-SCROLL CINEMATIC STAGE */}
      <div className="section-expertise w-full bg-[#EAE3DB] text-[#141416] relative flex flex-col justify-start select-none overflow-visible">
        <div className="expertise-outer w-full">
          <div className="padding-global w-full">
            <div className="container-large w-full">
              <div className="expertise-inner w-full">
                <div className="expertise-border w-full !border-0 !border-none !rounded-none">

                  {/* UNIFIED PIN WRAPPER (240vh: exactly 3 smooth scrolls) */}
                  <div ref={pinWrapperRef} className="pin-height w-full relative" style={{ height: "240vh" }}>

                    {/* STICKY STAGE (pinned at top: 0, 100vh) */}
                    <div className="w-full h-screen sticky top-0 overflow-hidden flex items-center justify-center relative">

                      {/* Soft Ambient Spotlight Glow */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
                        <div className="w-[60vw] h-[60vw] max-w-[700px] bg-gradient-to-b from-[#7567EE]/12 via-[#8B7AF8]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
                      </div>

                      {/* LAYER 1: TEXT HEADINGS (SERVICES & DESCRIPTION) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
                        <div className="relative w-full max-w-[1100px] flex items-center justify-center text-center">

                          {/* Heading 1: SERVICES (1st Scroll) */}
                          <h2 ref={title1Ref} className="sticky-title-el is--title font-humane text-[#7567EE] text-[14vw] uppercase leading-[0.8] tracking-widest font-bold select-none drop-shadow-sm absolute">
                            {splitWordsAndChars("SERVICES")}
                          </h2>

                          {/* Heading 2: Description (2nd Scroll) */}
                          <h2 ref={title2Ref} className="sticky-title-el is--stacked font-sans text-center text-[1.85rem] sm:text-[2.25rem] md:text-[2.65rem] leading-[1.25] font-semibold text-[#141416] max-w-[960px] select-none uppercase px-4 absolute">
                            {splitWordsAndChars("MULTI-CITY VIDEO PRODUCTION, REMOTE EDITING, AND CORPORATE AV SOLUTIONS")}
                          </h2>

                        </div>
                      </div>

                      {/* LAYER 2: 3 CARDS (3rd Scroll) */}
                      <div
                        ref={cardsContainerRef}
                        className="expertise-container w-full relative z-20"
                        style={{
                          position: "relative",
                          display: "flex",
                          flexFlow: "row nowrap",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "22px",
                          margin: "0 auto",
                          padding: 0,
                          boxSizing: "border-box",
                        }}
                      >

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
                                <div className="btn-main w-inline-block pointer-events-none select-none cursor-default">
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
                                </div>
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
                                <div className="btn-main w-inline-block pointer-events-none select-none cursor-default">
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
                                </div>
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
                                <div className="btn-main w-inline-block pointer-events-none select-none cursor-default">
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
                                </div>
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
                              <div className="btn-main w-inline-block pointer-events-none select-none cursor-default">
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
                              </div>
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
                              <div className="btn-main w-inline-block pointer-events-none select-none cursor-default">
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
                              </div>
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
                              <div className="btn-main w-inline-block pointer-events-none select-none cursor-default">
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
                              </div>
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
