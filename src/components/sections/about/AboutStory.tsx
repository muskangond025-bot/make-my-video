"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap, ScrollTrigger, CustomEase } from "@/lib/gsap";

const STORY_PARAGRAPHS = [
  "Make My Vid is the brainchild of Rohan Joshi, a dreamer turned editor turned entrepreneur. Rohan has always been naturally inclined to crafting creative storytelling. Though he used to make videos for his term projects during his MBA days, he started his professional journey as a freelance video editor. The passion soon gave birth to the vision of creating a global platform that serves as a one-stop solution for high-impact video content creation. And that’s how Make My Vid was born.",
  "The clients who came for editing soon started approaching us for their full-scale shoot and production requirements as well. With every new brand onboarded and every project successfully delivered, Make My Vid is evolving every day—sprinting towards becoming a world-renowned creative powerhouse for video content services.",
];

export const AboutStory: React.FC = () => {
  const containerRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  // Typewriter state
  const [typedChars, setTypedChars] = useState<number>(0);
  const [hasStartedTyping, setHasStartedTyping] = useState<boolean>(false);
  const [isTypingComplete, setIsTypingComplete] = useState<boolean>(false);

  const fullText = STORY_PARAGRAPHS.join("\n\n");
  const totalChars = fullText.length;

  // 3D Perspective Tilt from <Expertise> section
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    const rotateX = -(y / rect.height) * 6;
    const rotateY = (x / rect.width) * 6;
    gsap.to(stageRef.current, {
      rotateX,
      rotateY,
      scale: 1.01,
      duration: 0.25,
      ease: "power1.out",
      overwrite: "auto",
      transformPerspective: 1000,
    });
  };

  const handleCardMouseLeave = () => {
    if (!stageRef.current) return;
    gsap.to(stageRef.current, {
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      duration: 0.35,
      ease: "power2.out",
      overwrite: "auto",
    });
  };

  // Expertise-Grade Scroll Reveal Animation via CustomEase & ScrollTrigger
  useEffect(() => {
    if (typeof window === "undefined" || !stageRef.current) return;

    try {
      CustomEase.create("smoothSlideUp", "M0,0 C0.25,0.7 0.35,0.98 1,1");
    } catch {
      // already registered
    }

    const ctx = gsap.context(() => {
      // 1. Stage Card Scroll-Reveal with Expertise-grade smoothSlideUp curve
      gsap.fromTo(
        stageRef.current,
        {
          y: 80,
          scale: 0.94,
          opacity: 0,
        },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          duration: 1.3,
          ease: "smoothSlideUp",
          scrollTrigger: {
            trigger: stageRef.current,
            start: "top 85%",
            end: "top 45%",
            scrub: 0.8,
          },
        }
      );

      // 2. Background Image Subtle Depth Parallax
      if (imageRef.current) {
        gsap.fromTo(
          imageRef.current,
          { yPercent: -6, scale: 1.08 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: stageRef.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          }
        );
      }
    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Trigger typewriter when card is in view
  useEffect(() => {
    if (!textContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasStartedTyping) {
          setHasStartedTyping(true);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(textContainerRef.current);
    return () => observer.disconnect();
  }, [hasStartedTyping]);

  // Typewriter ticker
  useEffect(() => {
    if (!hasStartedTyping || isTypingComplete) return;

    const interval = setInterval(() => {
      setTypedChars((prev) => {
        const next = prev + 3;
        if (next >= totalChars) {
          clearInterval(interval);
          setIsTypingComplete(true);
          return totalChars;
        }
        return next;
      });
    }, 16);

    return () => clearInterval(interval);
  }, [hasStartedTyping, isTypingComplete, totalChars]);

  const handleSkipOrComplete = () => {
    setTypedChars(totalChars);
    setIsTypingComplete(true);
  };

  const currentText = fullText.slice(0, typedChars);
  const currentParagraphs = currentText.split("\n\n");

  return (
    <section
      id="founder-story"
      ref={containerRef}
      className="relative w-full py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#EAE3DB] text-[#141416] select-none overflow-hidden border-b border-[#141416]/10"
    >
      <div className="max-w-7xl mx-auto relative z-10">
        {/* ========================================================================= */}
        {/* SECTION HEADING: Outside and Above the Box in a Single Line               */}
        {/* ========================================================================= */}
        <div className="w-full mb-8 sm:mb-12 text-left">
          <h2 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[4.75rem] font-heading font-black tracking-tight uppercase leading-none text-[#141416] text-left">
            STORY OF <span className="text-[#7567EE]">MAKE MY VID.</span>
          </h2>
        </div>

        {/* ========================================================================= */}
        {/* FULL HORIZONTAL STAGE CARD (WITH EXPERTISE SCROLL REVEAL & 3D TILT)       */}
        {/* ========================================================================= */}
        <div
          ref={stageRef}
          onMouseMove={handleCardMouseMove}
          onMouseLeave={handleCardMouseLeave}
          className="w-full relative rounded-[32px] sm:rounded-[44px] overflow-hidden shadow-[0_25px_60px_rgba(20,20,22,0.18)] border border-[#141416]/10 p-6 sm:p-10 lg:p-14 min-h-[540px] sm:min-h-[620px] lg:min-h-[700px] flex flex-col justify-end text-left will-change-transform transition-shadow duration-300 hover:shadow-[0_30px_70px_rgba(20,20,22,0.25)]"
        >
          {/* Background Image Layer with Parallax & Exactly 20% Dark Overlay */}
          <div ref={imageRef} className="absolute inset-0 z-0 pointer-events-none">
            <Image
              src="https://storage.googleapis.com/mkv_imagesbackend/about_banner_images/676faf33bdf2e_Journey%202%20(1).webp"
              alt="Rohan Joshi - Story Of Make My Vid Background"
              fill
              className="object-cover object-[center_35%]"
              priority
            />

            {/* Exactly 20% Dark Overlay */}
            <div className="absolute inset-0 bg-black/20 pointer-events-none" />

            {/* Subtle Bottom Vignette in Marked Zone for High Text Readability */}
            <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/60 via-black/25 to-transparent pointer-events-none" />
          </div>

          {/* Decorative Corner Viewfinder Reticles inside Box */}
          <div className="absolute top-6 left-6 sm:left-10 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-l-2 border-[#7567EE]/70 pointer-events-none z-10" />
          <div className="absolute top-6 right-6 sm:right-10 w-6 sm:w-8 h-6 sm:h-8 border-t-2 border-r-2 border-[#7567EE]/70 pointer-events-none z-10" />
          <div className="absolute bottom-6 left-6 sm:left-10 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-l-2 border-[#7567EE]/70 pointer-events-none z-10" />
          <div className="absolute bottom-6 right-6 sm:right-10 w-6 sm:w-8 h-6 sm:h-8 border-b-2 border-r-2 border-[#7567EE]/70 pointer-events-none z-10" />

          {/* ======================================================================= */}
          {/* WRITTEN NARRATIVE DATA: INCREASED TEXT SIZE AS REQUESTED                */}
          {/* ======================================================================= */}
          <div className="relative z-10 w-full max-w-4xl flex flex-col justify-end text-left pt-20 sm:pt-28">
            <div
              ref={textContainerRef}
              onClick={!isTypingComplete ? handleSkipOrComplete : undefined}
              title={!isTypingComplete ? "Click to reveal text instantly" : undefined}
              className={`space-y-4 sm:space-y-6 w-full text-left ${!isTypingComplete ? "cursor-pointer" : ""}`}
            >
              {currentParagraphs.map((para, idx) => (
                <p
                  key={idx}
                  className="text-base sm:text-lg md:text-xl lg:text-[1.45rem] text-white/95 font-normal leading-relaxed sm:leading-[1.7] text-left tracking-normal drop-shadow-[0_2px_14px_rgba(0,0,0,0.98)]"
                >
                  {para}
                  {/* Blinking Lavender Cursor */}
                  {!isTypingComplete && idx === currentParagraphs.length - 1 && (
                    <span className="inline-block w-2.5 sm:w-3 h-5 sm:h-6 bg-[#7567EE] ml-2 align-middle animate-pulse shadow-[0_0_12px_rgba(117,103,238,0.8)]" />
                  )}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
