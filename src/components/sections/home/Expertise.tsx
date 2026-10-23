"use client";
import React, { useEffect, useRef } from 'react';
import { gsap, ScrollTrigger, CustomEase } from '@/lib/gsap';
import { CinemaFilmStrip3D } from '@/components/ui/CinemaFilmStrip3D';
import { BrandButton } from '@/components/shared/BrandButton';

export const Expertise = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Unified Section Refs
  const pinWrapperRef = useRef<HTMLDivElement>(null);
  const title1Ref = useRef<HTMLHeadingElement>(null);
  const title2Ref = useRef<HTMLHeadingElement>(null);
  const cardsContainerRef = useRef<HTMLDivElement>(null);

  // 3D Card Hover Perspective Effect via GSAP (avoids CSS transition conflict)
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 8;
    const rotateY = (x / rect.width) * 8;
    gsap.to(e.currentTarget, {
      rotateX,
      rotateY,
      scale: 1.02,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
    });
  };

  const handleCardMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    gsap.to(e.currentTarget, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Re-engineered Effortless Master Timeline:
  // Reduced from 240vh down to 145vh (40% less scroll effort)
  // Step 1: "SERVICES" character-by-character reveal
  // Step 2: "SERVICES" dissolves, Description reveals in crisp typography
  // Step 3: Description floats up, 3 Cards smoothly glide up from depth with CustomEase
  // Step 4: Generous holding zone so cards stay centered for comfortable viewing
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

      // All cards start 100% OFFSCREEN below the viewport with ZERO opacity (no peaking beforehand!)
      gsap.set(cards, {
        yPercent: 0,
        y: () => window.innerHeight * 1.15,
        scale: 0.92,
        opacity: 0,
        rotation: (i: number) => (i === 0 ? -2 : i === 2 ? 2 : 0),
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
          scrub: 0.7, // Silky, responsive damping
        }
      });

      // ----------------------------------------------------
      // STEP 1 (0 -> 28% Scroll): "SERVICES" reveals letter-by-letter
      // ----------------------------------------------------
      masterTl.to(chars1, {
        opacity: 1,
        stagger: { amount: 0.65, from: "start" },
        duration: 0.65,
        ease: "power2.out"
      });
      masterTl.to({}, { duration: 0.2 });

      // ----------------------------------------------------
      // STEP 2 (28% -> 55% Scroll): "SERVICES" dissolves, Description reveals
      // ----------------------------------------------------
      masterTl.to(chars1, {
        opacity: 0,
        stagger: { amount: 0.3, from: "end" },
        duration: 0.35,
        ease: "power2.in"
      });
      masterTl.to(chars2, {
        opacity: 1,
        stagger: { amount: 0.75, from: "start" },
        duration: 0.75,
        ease: "power2.out"
      }, "-=0.15");
      masterTl.to({}, { duration: 0.3 });

      // ----------------------------------------------------
      // STEP 3 (55% -> 88% Scroll): Description floats up, 3 Cards glide up ONE BY ONE
      // ----------------------------------------------------
      masterTl.to(title2Ref.current, {
        opacity: 0,
        y: -35,
        duration: 0.45,
        ease: "power2.inOut"
      });

      // Card 1 glides up first
      masterTl.to(cards[0], {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.15,
        ease: "smoothSlideUp"
      }, "<0.05");

      // Card 2 glides up second
      masterTl.to(cards[1], {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.15,
        ease: "smoothSlideUp"
      }, "<0.25");

      // Card 3 glides up third
      masterTl.to(cards[2], {
        y: 0,
        opacity: 1,
        scale: 1,
        rotation: 0,
        duration: 1.15,
        ease: "smoothSlideUp"
      }, "<0.25");

      // ----------------------------------------------------
      // STEP 4 (88% -> 100% Scroll): Solid center lock
      // Cards stay firmly centered so user can comfortably inspect & click
      // ----------------------------------------------------
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
        {/* Centered Editorial "TRUSTED BY" Header */}
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

      {/* 2. MAIN EXPERTISE SECTION - EFFORTLESS 3-STAGE CINEMATIC STAGE */}
      <div className="section-expertise w-full bg-[#EAE3DB] text-[#141416] relative flex flex-col justify-start select-none overflow-visible">
        <div className="expertise-outer w-full">
          <div className="padding-global w-full">
            <div className="container-large w-full">
              <div className="expertise-inner w-full">
                <div className="expertise-border w-full !border-0 !border-none !rounded-none">

                  {/* BALANCED PIN WRAPPER (200vh: effortless 1-screen scroll distance with complete cinematic fidelity) */}
                  <div ref={pinWrapperRef} className="pin-height w-full relative" style={{ height: "200vh" }}>

                    {/* STICKY STAGE (pinned at top: 0, 100vh) */}
                    <div className="w-full h-screen sticky top-0 overflow-hidden flex items-center justify-center relative">

                      {/* Soft Ambient Spotlight Glow */}
                      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 flex items-center justify-center">
                        <div className="w-[60vw] h-[60vw] max-w-[700px] bg-gradient-to-b from-[#7567EE]/12 via-[#8B7AF8]/8 to-transparent rounded-full blur-3xl pointer-events-none" />
                      </div>

                      {/* LAYER 1: TEXT HEADINGS (SERVICES & DESCRIPTION) */}
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-10 px-4">
                        <div className="relative w-full max-w-[1100px] flex items-center justify-center text-center">

                          {/* Heading 1: HOW MAGIC HAPPENS.. (1st Scroll Stage) */}
                          <h2 ref={title1Ref} className="sticky-title-el is--title font-humane text-[#7567EE] text-[7.5vw] sm:text-[8.8vw] md:text-[9.8vw] uppercase leading-[0.85] tracking-wide font-bold select-none drop-shadow-sm absolute whitespace-nowrap text-center">
                            {splitWordsAndChars("HOW MAGIC HAPPENS..")}
                          </h2>

                          {/* Heading 2: Process Subheading (2nd Scroll Stage) */}
                          <h2 ref={title2Ref} className="sticky-title-el is--stacked font-sans text-center text-[1.85rem] sm:text-[2.25rem] md:text-[2.65rem] leading-[1.28] font-semibold text-[#141416] max-w-[960px] select-none uppercase px-4 absolute">
                            {splitWordsAndChars("FROM STRATEGIC VISION TO HIGH-IMPACT CINEMA")}
                          </h2>

                        </div>
                      </div>

                      {/* LAYER 2: 3 CARDS (3rd Scroll Stage) */}
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

                        {/* CARD 1: DISCOVER & STRATEGIZE */}
                        <div
                          className="expertise-card cursor-pointer"
                          onMouseMove={handleCardMouseMove}
                          onMouseLeave={handleCardMouseLeave}
                        >
                          <div className="media">
                            <div className="expertise-front is--1">
                              <div className="card-inner-top pt-2">
                                <div className="text-size-large text-weight-medium is--title">DISCOVER &amp; STRATEGIZE</div>
                                <p className="text-size-tiny text-color-secondary text-align-center">
                                  We analyze your brand ethos, audience psychology, and campaign goals to engineer a winning creative roadmap, treatments, and cinema-grade scripts.
                                </p>
                              </div>
                              <div className="button-group is--card my-2 flex justify-center">
                                <BrandButton label="DISCOVER" size="sm" />
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png" loading="eager" alt="Discover &amp; Strategize" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 2: CREATE & PRODUCE */}
                        <div
                          className="expertise-card cursor-pointer"
                          onMouseMove={handleCardMouseMove}
                          onMouseLeave={handleCardMouseLeave}
                        >
                          <div className="media">
                            <div className="expertise-front is--2">
                              <div className="card-inner-top pt-2">
                                <div className="text-size-large text-weight-medium is--title typo-h3">CREATE &amp; PRODUCE</div>
                                <p className="text-size-tiny text-color-secondary text-align-center typo-small">
                                  Multi-city on-location filming equipped with RED/ARRI 4K cinema cameras, master lighting setups, elite directors, and seasoned crews across India.
                                </p>
                              </div>
                              <div className="button-group is--card my-2 flex justify-center">
                                <BrandButton label="PRODUCE" size="sm" />
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png" loading="eager" alt="Create &amp; Produce" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 3: DELIVER & GROW */}
                        <div
                          className="expertise-card cursor-pointer"
                          onMouseMove={handleCardMouseMove}
                          onMouseLeave={handleCardMouseLeave}
                        >
                          <div className="media">
                            <div className="expertise-front is--3">
                              <div className="card-inner-top pt-2">
                                <div className="text-size-large text-weight-medium is--title typo-h3">DELIVER &amp; GROW</div>
                                <p className="text-size-tiny text-color-secondary text-align-center typo-small">
                                  Hollywood-grade color grading, immersive spatial audio, high-impact motion VFX, and format-optimized deliverables to maximize your ROI.
                                </p>
                              </div>
                              <div className="button-group is--card my-2 flex justify-center">
                                <BrandButton label="DELIVER" size="sm" />
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png" loading="eager" alt="Deliver &amp; Grow" className="h-full object-contain rounded-t-2xl" />
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

                      {/* CARD 1: DISCOVER & STRATEGIZE */}
                      <div className="expertise-card">
                        <div className="media">
                          <div className="expertise-front is--1">
                            <div className="card-inner-top pt-2">
                              <div className="text-size-large text-weight-medium is--title typo-h3">DISCOVER &amp; STRATEGIZE</div>
                              <p className="text-size-tiny text-color-secondary text-align-center typo-small">
                                We analyze your brand ethos, audience psychology, and campaign goals to engineer a winning creative roadmap, treatments, and cinema-grade scripts.
                              </p>
                            </div>
                            <div className="button-group is--card my-2 flex justify-center">
                              <BrandButton label="DISCOVER" size="sm" />
                            </div>
                            <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                              <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png" loading="eager" alt="Discover &amp; Strategize" className="h-full object-contain rounded-t-2xl" />
                            </div>
                          </div>
                        </div>
                      </div>

                        {/* CARD 2: CREATE & PRODUCE */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--2">
                              <div className="card-inner-top pt-2">
                                <div className="text-size-large text-weight-medium is--title typo-h3">CREATE &amp; PRODUCE</div>
                                <p className="text-size-tiny text-color-secondary text-align-center typo-small">
                                  Multi-city on-location filming equipped with RED/ARRI 4K cinema cameras, master lighting setups, elite directors, and seasoned crews across India.
                                </p>
                              </div>
                              <div className="button-group is--card my-2 flex justify-center">
                                <BrandButton label="PRODUCE" size="sm" />
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960176_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(5).png" loading="eager" alt="Create &amp; Produce" className="h-full object-contain rounded-t-2xl" />
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* CARD 3: DELIVER & GROW */}
                        <div className="expertise-card">
                          <div className="media">
                            <div className="expertise-front is--3">
                              <div className="card-inner-top pt-2">
                                <div className="text-size-large text-weight-medium is--title typo-h3">DELIVER &amp; GROW</div>
                                <p className="text-size-tiny text-color-secondary text-align-center typo-small">
                                  Hollywood-grade color grading, immersive spatial audio, high-impact motion VFX, and format-optimized deliverables to maximize your ROI.
                                </p>
                              </div>
                              <div className="button-group is--card my-2 flex justify-center">
                                <BrandButton label="DELIVER" size="sm" />
                              </div>
                              <div className="expertise-image-wrapper !flex !justify-center !items-end w-full h-[55%] relative overflow-hidden mt-auto">
                                <img src="https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png" loading="eager" alt="Deliver &amp; Grow" className="h-full object-contain rounded-t-2xl" />
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
