"use client";

import React, { useEffect, useRef, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { PremiumFooter } from "@/components/sections/PremiumFooter";

import {
  PROJECTS_SHOWCASE_HTML,
  PROJECTS_CROSSES_HTML,
  PROJECTS_FAQ_HTML,
  PROJECTS_MARQUEE_HTML,
} from "./projectsHtml";

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let cleanupFns: (() => void)[] = [];

    const initProjects = async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/dist/ScrollTrigger");

      gsap.registerPlugin(ScrollTrigger);

      // 1. DESKTOP STICKY PINNED SCROLL (7 PROJECTS) - ZERO JITTER / PERFECT LENIS HARMONY
      const component = document.querySelector("[tr-scroll-toggle='component']") as HTMLElement | null;
      const stickyEl = document.querySelector(".projects-sticky") as HTMLElement | null;

      if (component && stickyEl && window.innerWidth >= 992) {
        const totalItems = 7;
        const lists = component.querySelectorAll("[tr-scroll-toggle='list']");

        // Remove CSS sticky to prevent conflict with GSAP's pin handler
        stickyEl.style.position = "relative";
        stickyEl.style.top = "0";
        stickyEl.style.height = "100vh";
        stickyEl.style.width = "100%";

        const updateActiveSlide = (index: number) => {
          // 1. Smoothly translate Y tracks (titles, videos, descriptions)
          component.querySelectorAll("[tr-scroll-toggle='transform-y']").forEach((el) => {
            gsap.to(el, {
              yPercent: -index * 100,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          // 2. Smoothly translate X tracks if any
          component.querySelectorAll("[tr-scroll-toggle='transform-x']").forEach((el) => {
            gsap.to(el, {
              xPercent: -index * 100,
              duration: 0.5,
              ease: "power2.out",
              overwrite: "auto",
            });
          });

          // 3. Update active number indicator (01 to 07)
          component.querySelectorAll("[tr-scroll-toggle='number-current']").forEach((el) => {
            el.textContent = String(index + 1);
          });

          // 4. Update is-active states on all sub-lists
          lists.forEach((list) => {
            Array.from(list.children).forEach((child, idx) => {
              const htmlChild = child as HTMLElement;
              if (idx === index) {
                htmlChild.classList.add("is-active");
                htmlChild.style.opacity = "1";
                htmlChild.style.pointerEvents = "auto";
                htmlChild.style.zIndex = "2";

                const bgScale = htmlChild.querySelector("[tr-item-animation='scale-to-1']");
                if (bgScale) {
                  gsap.to(bgScale, { scale: 1, duration: 0.45, ease: "power2.out", overwrite: "auto" });
                }

                const vid = htmlChild.querySelector("video");
                if (vid) {
                  vid.play().catch(() => {});
                }
              } else {
                htmlChild.classList.remove("is-active");
                htmlChild.style.opacity = "0";
                htmlChild.style.pointerEvents = "none";
                htmlChild.style.zIndex = "-2";

                const bgScale = htmlChild.querySelector("[tr-item-animation='scale-to-1']");
                if (bgScale) {
                  gsap.to(bgScale, { scale: 0.95, duration: 0.4, ease: "power2.out", overwrite: "auto" });
                }

                const vid = htmlChild.querySelector("video");
                if (vid && !vid.paused) {
                  vid.pause();
                }
              }
            });
          });
        };

        // Initialize at slide 0
        updateActiveSlide(0);

        // Pin the sticky element smoothly with GSAP ScrollTrigger
        const st = ScrollTrigger.create({
          trigger: component,
          start: "top top",
          end: "+=400%",
          pin: stickyEl,
          scrub: 0.6,
          anticipatePin: 1,
          onUpdate: (self) => {
            const activeIdx = Math.min(totalItems - 1, Math.floor(self.progress * totalItems));
            updateActiveSlide(activeIdx);
          },
        });

        cleanupFns.push(() => st.kill());
      }

      // 2. INTERACTIVE LIVING FAQ EYEBALL (PUPIL FOLLOWS CURSOR)
      const eyeWrapper = document.querySelector(".eye-wrapper") as HTMLElement | null;
      const pupil = document.querySelector(".pupil-vector") as HTMLElement | null;

      if (eyeWrapper && pupil) {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = eyeWrapper.getBoundingClientRect();
          const eyeCenterX = rect.left + rect.width / 2;
          const eyeCenterY = rect.top + rect.height / 2;

          const dx = e.clientX - eyeCenterX;
          const dy = e.clientY - eyeCenterY;
          const distance = Math.hypot(dx, dy);
          const maxRadius = 14;

          const ratio = distance > 0 ? Math.min(distance, maxRadius) / distance : 0;
          const targetX = dx * ratio;
          const targetY = dy * ratio;

          gsap.to(pupil, {
            x: targetX,
            y: targetY,
            duration: 0.25,
            ease: "power2.out",
            overwrite: "auto",
          });
        };

        window.addEventListener("mousemove", handleMouseMove);
        cleanupFns.push(() => {
          window.removeEventListener("mousemove", handleMouseMove);
        });
      }

      // 3. INTERACTIVE FAQ ACCORDIONS (EXPAND/COLLAPSE)
      const accordions = document.querySelectorAll(".dropdown-accordion");
      accordions.forEach((acc, i) => {
        const topBtn = acc.querySelector(".dropdown-top") as HTMLElement | null;
        const bottomContent = acc.querySelector(".dropdown-bottom") as HTMLElement | null;
        const icon = acc.querySelector(".button-icon") as HTMLElement | null;

        if (topBtn && bottomContent) {
          bottomContent.style.overflow = "hidden";
          // Default first item open, others closed
          if (i === 0) {
            acc.classList.add("is-open");
            bottomContent.style.maxHeight = "300px";
            bottomContent.style.opacity = "1";
            if (icon) gsap.set(icon, { rotate: 180 });
          } else {
            acc.classList.remove("is-open");
            bottomContent.style.maxHeight = "0px";
            bottomContent.style.opacity = "0";
            if (icon) gsap.set(icon, { rotate: 0 });
          }

          bottomContent.style.transition = "max-height 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.3s ease";
          topBtn.style.cursor = "pointer";

          const toggleAccordion = () => {
            const isOpen = acc.classList.contains("is-open");

            accordions.forEach((other) => {
              if (other !== acc && other.classList.contains("is-open")) {
                other.classList.remove("is-open");
                const otherBottom = other.querySelector(".dropdown-bottom") as HTMLElement | null;
                const otherIcon = other.querySelector(".button-icon") as HTMLElement | null;
                if (otherBottom) {
                  otherBottom.style.maxHeight = "0px";
                  otherBottom.style.opacity = "0";
                }
                if (otherIcon) {
                  gsap.to(otherIcon, { rotate: 0, duration: 0.3, ease: "power2.out" });
                }
              }
            });

            if (isOpen) {
              acc.classList.remove("is-open");
              bottomContent.style.maxHeight = "0px";
              bottomContent.style.opacity = "0";
              if (icon) {
                gsap.to(icon, { rotate: 0, duration: 0.3, ease: "power2.out" });
              }
            } else {
              acc.classList.add("is-open");
              bottomContent.style.maxHeight = `${bottomContent.scrollHeight + 30}px`;
              bottomContent.style.opacity = "1";
              if (icon) {
                gsap.to(icon, { rotate: 180, duration: 0.3, ease: "power2.out" });
              }
            }
          };

          topBtn.addEventListener("click", toggleAccordion);
          cleanupFns.push(() => {
            topBtn.removeEventListener("click", toggleAccordion);
          });
        }
      });

      // 4. CONTINUOUS CHECKERED TICKER MARQUEE
      const tickerMarquees = document.querySelectorAll(".ticker-marquee");
      if (tickerMarquees.length > 0) {
        tickerMarquees.forEach((marquee, i) => {
          gsap.to(marquee, {
            xPercent: i % 2 === 0 ? -50 : 50,
            repeat: -1,
            duration: 35,
            ease: "none",
          });
        });
      }

      setTimeout(() => {
        ScrollTrigger.refresh();
      }, 400);
    };

    initProjects();

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, [mounted]);

  return (
    <main
      ref={containerRef}
      className="projects-page-scope bg-[#EAE3DB] text-[#141416] min-h-screen font-sans selection:bg-[#1D4ED8] selection:text-white relative"
    >
      {/* Make My Vid Warm Cream Theme Harmonization & Fluid Sizing */}
      <style jsx global>{`
        .projects-page-scope {
          --_swatches---neutral--grey-5: #EAE3DB;
          background-color: #EAE3DB;
          color: #141416;
          font-size: 1vw;
        }
        @media screen and (min-width: 1440px) {
          .projects-page-scope {
            font-size: 16px;
          }
        }
        @media screen and (max-width: 991px) {
          .projects-page-scope {
            font-size: 16px;
          }
        }

        /* Seamless Warm Cream Surfaces */
        .projects-page-scope .section-projects-wrap,
        .projects-page-scope .section-projects,
        .projects-page-scope .section-projects-mobile,
        .projects-page-scope .section-faq-wrap,
        .projects-page-scope .section-crosses,
        .projects-page-scope .section-check-marquee {
          background-color: #EAE3DB !important;
          color: #141416 !important;
        }

        /* Project Card Frame */
        .projects-page-scope .header-wrapper.is--project {
          border-radius: 3rem !important;
          border: 1.5px solid rgba(20, 20, 22, 0.15) !important;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08) !important;
        }

        /* Typography */
        .projects-page-scope .heading-style-h2.project-color {
          font-family: 'CHANEY Wide', sans-serif;
          font-weight: 900;
          letter-spacing: -0.04em;
          line-height: 0.95;
        }

        /* FAQ Styling on Cream */
        .projects-page-scope .heading-style-h2.is--larger {
          color: #141416 !important;
        }
        .projects-page-scope .text-color-secondary {
          color: #4A4658 !important;
        }
        .projects-page-scope .dropdown-accordion {
          border: 1px solid rgba(20, 20, 22, 0.15) !important;
          border-radius: 1.5rem !important;
          background-color: rgba(255, 255, 255, 0.6) !important;
          margin-bottom: 0.85rem !important;
          transition: background-color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease !important;
        }
        .projects-page-scope .dropdown-accordion.is-open {
          background-color: #ffffff !important;
          border-color: #1D4ED8 !important;
          box-shadow: 0 8px 24px rgba(29, 78, 216, 0.12) !important;
        }
        .projects-page-scope .heading-style-h3 {
          color: #141416 !important;
        }
        .projects-page-scope .button-icon {
          background-color: #141416 !important;
          color: #ffffff !important;
        }

        /* Crosses Divider */
        .projects-page-scope .section-crosses {
          border-top: 1px solid rgba(20, 20, 22, 0.1) !important;
          border-bottom: 1px solid rgba(20, 20, 22, 0.1) !important;
        }
        .projects-page-scope .cross-icon svg path {
          fill: #141416 !important;
        }

        /* Checkered Marquee Squares - Signature Black & Neon Lime */
        .projects-page-scope .section-check-marquee {
          border-top: 1px solid rgba(20, 20, 22, 0.1) !important;
          border-bottom: 1px solid rgba(20, 20, 22, 0.1) !important;
        }
        .projects-page-scope .square {
          background-color: #141416 !important;
        }
        .projects-page-scope .square.is--black {
          background-color: #D5FF3F !important;
        }

        /* Mobile Project Cards */
        .projects-page-scope .projects-video-card {
          border-color: rgba(20, 20, 22, 0.15) !important;
          box-shadow: 0 12px 32px rgba(0, 0, 0, 0.08) !important;
        }
      `}</style>

      <Sidebar />
      <Header />

      <div className="flex flex-col relative w-full z-10 pt-16 sm:pt-20">
        {/* Exact Dumemearts Projects Desktop Sticky Showcase & Mobile Cards */}
        <div
          id="projects-showcase-container"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: PROJECTS_SHOWCASE_HTML }}
        />

        {/* Section Crosses Divider */}
        <div
          id="projects-crosses-container"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: PROJECTS_CROSSES_HTML }}
        />

        {/* Exact Dumemearts Interactive FAQ with Cursor-Tracking Eyeball & Accordion */}
        <div
          id="projects-faq-container"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: PROJECTS_FAQ_HTML }}
        />

        {/* Exact Dumemearts Continuous Checkered Ticker Marquee */}
        <div
          id="projects-marquee-container"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{ __html: PROJECTS_MARQUEE_HTML }}
        />

        {/* Make My Vid Signature Premium 3D Dog Footer */}
        <PremiumFooter />
      </div>
    </main>
  );
}
