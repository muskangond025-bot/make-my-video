"use client";

import React, { useState, useRef, useEffect } from "react";
import { gsap } from "@/lib/gsap";
import { SERVICE_FAQS, ServiceFaqItem } from "@/data/servicesPageData";

export const ServicesFaq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const dropdownRefs = useRef<(HTMLDivElement | null)[]>([]);
  const iconRefs = useRef<(HTMLDivElement | null)[]>([]);

  const leftPanelRef = useRef<HTMLDivElement>(null);
  const pupilRef = useRef<HTMLImageElement>(null);

  // Accordion Expand/Collapse Animations with GSAP
  useEffect(() => {
    dropdownRefs.current.forEach((el, index) => {
      if (!el) return;
      const isOpen = openIndex === index;

      gsap.to(el, {
        height: isOpen ? "auto" : 0,
        opacity: isOpen ? 1 : 0,
        duration: 0.35,
        ease: isOpen ? "power2.out" : "power2.inOut",
      });

      const iconEl = iconRefs.current[index];
      if (iconEl) {
        gsap.to(iconEl, {
          rotate: isOpen ? 45 : 0,
          duration: 0.35,
          ease: "power2.out",
        });
      }
    });
  }, [openIndex]);

  // Pupil Cursor Tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!leftPanelRef.current || !pupilRef.current) return;

      const rect = leftPanelRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const angle = Math.atan2(dy, dx);
      const distance = Math.min(Math.hypot(dx, dy), 30);

      const tx = distance * Math.cos(angle);
      const ty = distance * Math.sin(angle);

      gsap.to(pupilRef.current, {
        x: tx,
        y: ty,
        duration: 0.25,
        ease: "power2.out",
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div className="section-faq-wrap w-full relative bg-[#EAE3DB] dark:bg-[#141416] bg-dots-pattern py-12 md:py-20 overflow-hidden border-t border-[#141416]/10">
      <div id="services-faq" className="section-faq w-full relative max-w-[1400px] mx-auto px-4 sm:px-8">
        
        {/* Consistent Brand FAQ Inner Box Layout */}
        <div className="faq-inner rounded-3xl bg-[#141416] text-[#EAE3DB] border border-[#7567EE]/30 shadow-2xl overflow-hidden flex flex-col lg:flex-row items-stretch">
          
          {/* Left Side: Interactive Eye Graphic with Cursor Tracking */}
          <div
            ref={leftPanelRef}
            className="faq-left relative overflow-hidden flex-shrink-0 lg:w-[320px] xl:w-[360px] bg-[#19191E] border-b lg:border-b-0 lg:border-r border-[#7567EE]/20 flex items-center justify-center p-4 sm:p-6 self-stretch"
          >
            {/* Eye Graphic Frames */}
            <div className="image-container is--faq relative w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 lg:w-[260px] lg:h-[260px] flex items-center justify-center">
              <img
                src="/image-frame-main.svg"
                loading="lazy"
                alt="Eye Graphic Frame"
                className="vector-image opacity-70 w-full h-full object-contain"
              />
              <div className="eye-wrapper absolute inset-0 flex items-center justify-center">
                <img
                  src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077e9c777f1eed3224f_eye-new.svg"
                  loading="lazy"
                  alt="Eye Frame Shape"
                  className="eye-vector w-36 h-36 sm:w-40 sm:h-40 md:w-48 md:h-48 object-contain"
                />
                <img
                  ref={pupilRef}
                  src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c88077c922577248f41258_pupil.svg"
                  loading="lazy"
                  alt="Pupil Follower"
                  className="pupil-vector w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 object-contain absolute"
                />
              </div>
            </div>

            {/* Grid background wrap */}
            <div className="background-grid-wrapper absolute inset-0 pointer-events-none opacity-10">
              <img
                src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67c880774b52bc873ce2eb61_outer-grid-bigger.svg"
                loading="lazy"
                alt="Background Grid"
                className="background-grid-image w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Center Spine Element */}
          <div
            className="line-block hidden lg:flex flex-col items-center justify-between self-stretch h-auto min-h-full !bg-white border-r border-zinc-200/40 w-14 py-4 flex-shrink-0 z-10"
            style={{ backgroundColor: "#FFFFFF", minHeight: "100%", alignSelf: "stretch" }}
          >
            <div className="square-block is--faq !bg-[#7567EE] !text-white rounded-xl p-2 shadow-md flex items-center justify-center w-9 h-9 flex-shrink-0">
              <div className="icon-embed-small w-embed">
                <svg width="18" height="18" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M33.7734 22.3427L41.9995 20.9997L33.7734 19.6573C27.9031 18.6985 23.3015 14.0964 22.3427 8.22612L20.9997 0L19.6567 8.22612C18.6985 14.0964 14.0964 18.6985 8.22612 19.6573L0 20.9997L8.22612 22.3427C14.0964 23.301 18.6985 27.9031 19.6567 33.7739L20.9997 42L22.3427 33.7739C23.3015 27.9031 27.9031 23.301 33.7734 22.3427Z" fill="currentColor" />
                </svg>
              </div>
            </div>
            <div className="vertical-line !bg-transparent flex-1 flex flex-col items-center justify-center my-2 relative w-full overflow-hidden">
              <div className="absolute inset-y-0 w-[1px] bg-zinc-300" />
              <div
                className="text-[9px] font-mono font-bold tracking-[0.22em] uppercase text-zinc-500 bg-white px-1 py-3 relative z-10 select-none whitespace-nowrap"
                style={{ writingMode: "vertical-rl", transform: "none" }}
              >
                SERVICES CAPABILITIES FAQ
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-[#7567EE] shadow-sm mb-1 flex-shrink-0" />
          </div>

          {/* Right Side: Accordion Questions list */}
          <div data-reveal-group="" className="faq-right flex-1 flex flex-col p-5 sm:p-6 lg:p-8 overflow-visible">
            
            {/* Top Header details */}
            <div className="faq-top mb-6">
              <h2 className="font-heading typo-h2 text-[#FFFFFF] font-bold tracking-tight">
                FREQUENT <span className="text-[#7567EE]">QUESTIONS?</span>
              </h2>
              <p className="typo-body text-[#EAE3DB]/75 mt-2 leading-relaxed font-sans max-w-[650px]">
                Everything you need to know about our production workflows, pan-India ground logistics, remote editing infrastructure, and multi-format delivery.
              </p>
            </div>

            {/* Dropdown Accordion List */}
            <div className="dropdown-accordion-wrap flex flex-col divide-y divide-[#7567EE]/20">
              {SERVICE_FAQS.map((faq: ServiceFaqItem, index: number) => {
                const isOpen = openIndex === index;

                return (
                  <div
                    key={index}
                    className="dropdown-accordion cursor-pointer transition-colors duration-200 hover:bg-white/[0.02]"
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                  >
                    {/* Accordion Header */}
                    <div className="dropdown-top flex justify-between items-center py-4 pr-1">
                      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4 flex-1 pr-4">
                        <h3 className="heading-style-h3 typo-h3 text-[#FFFFFF] font-heading uppercase tracking-wide">
                          {faq.category || "General"}
                        </h3>
                        <p className="typo-small text-[#EAE3DB]/75 font-sans leading-tight">
                          {faq.question}
                        </p>
                      </div>

                      <div className="faq-icon flex-shrink-0 ml-2">
                        <div
                          ref={(el) => {
                            iconRefs.current[index] = el;
                          }}
                          className={`button-icon rounded-full w-10 h-10 flex items-center justify-center transition-all duration-300 border ${
                            isOpen
                              ? "bg-[#D5FF3F] text-[#141416] border-[#D5FF3F] shadow-[0_0_12px_rgba(213,255,63,0.4)]"
                              : "bg-[#1F1F26] text-[#EAE3DB] border-[#7567EE]/30 hover:bg-[#7567EE] hover:text-white"
                          }`}
                        >
                          <div className="icon-embed-small is--small w-embed">
                            <svg width="22" height="22" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M16.8229 10.9879V0.516113H13.2922V9.44325L9.4605 13.2749H0.453125V16.9661H10.8447L16.8229 10.9879Z" fill="currentColor" />
                              <path d="M13.1771 19.0121L13.1771 29.4839L16.7078 29.4839L16.7078 20.5568L20.5395 16.7251L29.5469 16.7251L29.5469 13.0339L19.1553 13.0339L13.1771 19.0121Z" fill="currentColor" />
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Accordion Dropdown Body */}
                    <div
                      ref={(el) => {
                        dropdownRefs.current[index] = el;
                      }}
                      className="dropdown-bottom overflow-hidden h-0 opacity-0"
                    >
                      <div className="pb-5 pt-1 pr-8 space-y-3">
                        <p className="typo-body text-[#EAE3DB]/85 font-sans leading-relaxed">
                          {faq.answer}
                        </p>
                        {faq.bullets && faq.bullets.length > 0 && (
                          <ul className="space-y-1.5 pl-4 list-disc marker:text-[#7567EE] typo-small text-[#EAE3DB]/80 font-sans">
                            {faq.bullets.map((bullet: string, bIdx: number) => (
                              <li key={bIdx} className="pl-1">
                                {bullet}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
