"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap, ScrollTrigger, CustomEase } from '@/lib/gsap';
import { CinemaFilmStrip3D } from '@/components/ui/CinemaFilmStrip3D';

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
        // Hold the description fully visible and readable as user continues scrolling
        h2Tl.to({}, { duration: 0.8 });

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

      // Set initial card position (offset down below view)
      gsap.set(cards, {
        yPercent: 120,
        y: 0,
        rotation: 0
      });

      // Re-create the Webflow exact custom ease curve for the cards reveal
      CustomEase.create("expertiseCurve", "M0,0 C0,0 0.098,0.613 0.5,0.5 0.899,0.386 1,1 1,1");

      // Animate cards staggered reveal timeline
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: pinHeight,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.3
        }
      });

      // As user scrolls, card 1, 2, and 3 ascend into the center frame.
      // Once card 3 arrives at center (yPercent: 0), the pin ends and next section appears immediately on scroll.
      tl.to(cards, {
        yPercent: 0,
        y: 0,
        rotation: 0,
        duration: 1,
        stagger: 0.22,
        ease: "power2.out"
      }, 'step');

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

      {/* 2. MAIN EXPERTISE SECTION - IVENTIONS Warm Cream & Electric Violet Theme */}
      <div className="section-expertise w-full bg-[#EAE3DB] text-[#141416] relative flex flex-col justify-start select-none overflow-visible">
        <div className="expertise-outer w-full">
          <div className="padding-global w-full">
            <div className="container-large w-full">
              <div className="expertise-inner w-full">
                <div className="expertise-border w-full !border-0 !border-none !rounded-none">

                  {/* STICKY STAGGER LETTER TITLE WRAPPER */}
                  <section ref={stickyTitleRef} className="sticky-title-wrapper w-full relative">
                    
                    {/* IVENTIONS Dynamic Angular Spotlight Beam Graphic */}
                    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                      <div 
                        className="absolute -top-[15%] left-[20%] w-[58vw] h-[130%] bg-gradient-to-b from-[#A59CEC]/40 via-[#8B7AF8]/30 to-[#EAE3DB]/10 blur-[1px] transform -rotate-[16deg] origin-top"
                        style={{
                          clipPath: "polygon(32% 0%, 68% 0%, 100% 100%, 0% 100%)",
                        }}
                      />
                    </div>

                    <div className="sticky-title-container w-full h-screen sticky top-0 flex items-center justify-center">
                      <div className="sticky-title-inner text-center flex flex-col items-center justify-center relative w-full">

                        {/* Heading 1: SERVICES - Electric Violet matching IVENTIONS Hero Typography */}
                        <h2 ref={title1Ref} className="sticky-title-el is--title font-humane text-[#7567EE] text-[14vw] uppercase leading-[0.8] tracking-widest font-bold select-none drop-shadow-sm">
                          {splitWordsAndChars("SERVICES")}
                        </h2>

                        {/* Heading 2: Description in Deep Charcoal High-Contrast Text */}
                        <h2 ref={title2Ref} className="sticky-title-el is--stacked font-sans text-center text-[2.5rem] leading-[1.2] font-semibold text-[#141416] max-w-[900px] select-none uppercase">
                          {splitWordsAndChars("MULTI-CITY VIDEO PRODUCTION, REMOTE EDITING, AND CORPORATE AV SOLUTIONS")}
                        </h2>

                      </div>
                    </div>
                  </section>

                  {/* DESKTOP STICKY STAGGER REVEAL CARDS */}
                  <div className="expertise-cards w-full relative" style={{ margin: "0 auto", overflow: "visible" }}>
                    <div className="pin-height w-full relative" style={{ height: "220vh", margin: "0 auto" }}>
                      <div
                        className="expertise-container w-full"
                        style={{
                          position: "sticky",
                          top: 0,
                          height: "100vh",
                          display: "flex",
                          flexFlow: "row nowrap",
                          justifyContent: "center",
                          alignItems: "center",
                          gap: "22px",
                          margin: "0 auto",
                          padding: 0,
                          boxSizing: "border-box",
                          zIndex: 5,
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
