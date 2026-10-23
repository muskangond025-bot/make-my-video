"use client";

import React, { useRef, useEffect, useState } from "react";
import { ExternalLink, Video } from "lucide-react";
import { ProjectItem } from "@/data/projectsPageData";
import { ProjectModal } from "./ProjectModal";
import { BrandButton } from "@/components/shared/BrandButton";

interface ProjectsShowcaseProps {
  projects: ProjectItem[];
}

// Exact Light Color mappings of the previous dark palette (Netgíró fanned-deck aesthetic in vibrant Light tones)
const CARD_STYLES = [
  {
    name: "Light Sky Blue",
    bg: "#BAE6FD",
    border: "#38BDF8",
    textColor: "#0C4A6E",
    descColor: "#1E293B",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(12,74,110,0.15)",
    defaultRotate: 0,
  },
  {
    name: "Light Mint Green",
    bg: "#A7F3D0",
    border: "#34D399",
    textColor: "#064E3B",
    descColor: "#065F46",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(6,78,59,0.15)",
    defaultRotate: 5,
  },
  {
    name: "Light Sunny Yellow",
    bg: "#FEF08A",
    border: "#FACC15",
    textColor: "#713F12",
    descColor: "#854D0E",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(113,63,18,0.15)",
    defaultRotate: -5,
  },
  {
    name: "Light Lavender / Purple",
    bg: "#DDD6FE",
    border: "#A78BFA",
    textColor: "#4C1D95",
    descColor: "#5B21B6",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(76,29,149,0.15)",
    defaultRotate: 8,
  },
  {
    name: "Light Lime",
    bg: "#D9F99D",
    border: "#A3E635",
    textColor: "#365314",
    descColor: "#3F6212",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(54,83,20,0.15)",
    defaultRotate: -7,
  },
  {
    name: "Light Sky Blue",
    bg: "#BAE6FD",
    border: "#38BDF8",
    textColor: "#0C4A6E",
    descColor: "#1E293B",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(12,74,110,0.15)",
    defaultRotate: 6,
  },
  {
    name: "Light Mint Green",
    bg: "#A7F3D0",
    border: "#34D399",
    textColor: "#064E3B",
    descColor: "#065F46",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(6,78,59,0.15)",
    defaultRotate: -6,
  },
  {
    name: "Light Sunny Yellow",
    bg: "#FEF08A",
    border: "#FACC15",
    textColor: "#713F12",
    descColor: "#854D0E",
    pillBg: "rgba(255,255,255,0.75)",
    pillBorder: "rgba(113,63,18,0.15)",
    defaultRotate: 4,
  },
];

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [cardProgress, setCardProgress] = useState<number>(0);
  const [activeProjectForModal, setActiveProjectForModal] = useState<ProjectItem | null>(null);

  const totalCards = projects.length;

  useEffect(() => {
    setMounted(true);
  }, []);

  // Continuous cinematic scroll progress with smooth 60fps RAF lerp (zero layout thrashing)
  useEffect(() => {
    if (!mounted || totalCards <= 1) return;

    let rafId: number;
    let targetProgress = 0;
    let currentProgress = 0;
    let cachedTop = 0;
    let cachedDistance = 1;

    const measure = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      cachedTop = rect.top + scrollTop;
      cachedDistance = Math.max(containerRef.current.offsetHeight - window.innerHeight, 1);
    };

    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrolled = scrollTop - cachedTop;
      const raw = Math.min(Math.max(scrolled / cachedDistance, 0), 1);
      targetProgress = raw * (totalCards - 1);
    };

    const updateLoop = () => {
      // Cinematic lerp damping for silky, seamless filmic motion
      const delta = targetProgress - currentProgress;
      if (Math.abs(delta) > 0.0005) {
        currentProgress += delta * 0.16;
        setCardProgress(currentProgress);
      }
      rafId = requestAnimationFrame(updateLoop);
    };

    measure();
    handleScroll();
    currentProgress = targetProgress;
    setCardProgress(currentProgress);

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measure, { passive: true });
    rafId = requestAnimationFrame(updateLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measure);
      cancelAnimationFrame(rafId);
    };
  }, [mounted, totalCards]);

  const scrollToCard = (cardIdx: number) => {
    if (!containerRef.current || totalCards <= 1) return;
    const rect = containerRef.current.getBoundingClientRect();
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const windowHeight = window.innerHeight;
    const scrollableDistance = rect.height - windowHeight;
    const targetScroll = scrollTop + rect.top + (cardIdx / (totalCards - 1)) * scrollableDistance;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  if (projects.length === 0) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 py-24 text-center">
        <div className="w-16 h-16 rounded-full bg-white/70 mx-auto flex items-center justify-center text-[#141416]/40 mb-4 border border-[#141416]/10 shadow-sm">
          <Video size={28} />
        </div>
        <h3 className="text-xl font-heading font-black text-[#141416] mb-2">No Productions Found</h3>
        <p className="text-sm text-[#141416]/60 max-w-md mx-auto font-sans">
          We couldn&apos;t find any productions matching your filter. Try clearing the search query or selecting a different category.
        </p>
      </div>
    );
  }

  // Perfectly calibrated scroll runway: 50vh per card ("just a little slower" sweet spot)
  const runwayHeightVh = Math.max(totalCards * 50, 200);

  return (
    <>
      <section
        ref={containerRef}
        className="relative w-full select-none"
        style={{ height: `${runwayHeightVh}vh` }}
      >
        {/* Sticky Pinned Viewport Stage */}
        <div className="sticky top-0 w-full h-screen flex flex-col items-center justify-center px-4 sm:px-8 z-10 overflow-hidden">
          
          {/* NETGÍRÓ BACKDROP TEXT: Massive Statement Behind Cards */}
          <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none select-none z-0 opacity-[0.05] sm:opacity-[0.07] whitespace-nowrap overflow-hidden">
            <span
              className="text-[#141416] font-black uppercase tracking-tighter"
              style={{
                fontFamily: "'Humane', sans-serif",
                fontSize: "clamp(120px, 22vw, 320px)",
                lineHeight: 0.8,
              }}
            >
              STORIES • CINEMA • IMPACT
            </span>
          </div>

          {/* Section Heading Added Above Deck */}
          <div className="relative z-20 mb-3 sm:mb-5 text-center max-w-xl px-4">
            <span className="block font-serif italic text-base sm:text-lg text-[#141416]/70 mb-0.5">
              FEATURED PRODUCTIONS
            </span>
            <h2
              className="uppercase text-[#141416] tracking-tight leading-none typo-h2"
              style={{
                fontFamily: "'Humane', sans-serif",
                fontWeight: 500,
                fontSize: "clamp(48px, 6vw, 84px)",
                lineHeight: 0.85,
              }}
            >
              CINEMATIC REPERTOIRE
            </h2>
          </div>

          {/* NETGÍRÓ CARD STACK CONTAINER (True Light Color Version Cards) */}
          <div className="relative w-full max-w-[800px] h-[460px] sm:h-[480px] md:h-[510px] z-10 flex items-center justify-center">
            {projects.map((project, idx) => {
              const styleConfig = CARD_STYLES[idx % CARD_STYLES.length];
              const diff = mounted ? idx - cardProgress : idx;

              let translateY = 0;
              let rotate = 0;
              let scale = 1;
              let opacity = 1;
              let zIndex = 50;
              let pointerEvents: "auto" | "none" = "none";

              if (diff < 0) {
                // Card is peeling away upwards into the past
                const exitProgress = Math.min(Math.abs(diff), 1.5);
                translateY = -exitProgress * 125; // %
                rotate = (styleConfig.defaultRotate * 1.5) + (diff * 7);
                scale = Math.max(1 - exitProgress * 0.08, 0.85);
                opacity = Math.max(1 - exitProgress * 1.35, 0);
                zIndex = Math.max(50 + Math.round(diff * 10), 1);
                pointerEvents = exitProgress < 0.25 ? "auto" : "none";
              } else {
                // Current active card (diff ~ 0) or stacked behind (diff > 0)
                const stackProgress = Math.min(diff, 6);
                translateY = stackProgress * 12; // px
                rotate = styleConfig.defaultRotate * Math.min(stackProgress, 1);
                scale = Math.max(1 - stackProgress * 0.045, 0.80);
                opacity = Math.max(1 - stackProgress * 0.16, 0.35);
                zIndex = Math.max(50 - Math.round(stackProgress * 5), 5);
                pointerEvents = diff < 0.35 ? "auto" : "none";
              }

              const transform = diff < 0
                ? `translate3d(0, ${translateY}%, 0) rotate(${rotate}deg) scale(${scale})`
                : `translate3d(0, ${translateY}px, 0) rotate(${rotate}deg) scale(${scale})`;

              return (
                <div
                  key={project.id}
                  suppressHydrationWarning
                  onClick={() => {
                    if (diff > 0.4 && diff <= 3) {
                      scrollToCard(idx);
                    }
                  }}
                  className="absolute inset-0 w-full h-full rounded-[32px] sm:rounded-[38px] p-5 sm:p-7 md:p-8 shadow-[0_20px_50px_rgba(0,0,0,0.10)] will-change-transform flex flex-col justify-between overflow-hidden cursor-pointer"
                  style={{
                    backgroundColor: styleConfig.bg,
                    border: `2px solid ${styleConfig.border}`,
                    color: styleConfig.textColor,
                    transform,
                    opacity,
                    zIndex,
                    pointerEvents,
                    transformStyle: "preserve-3d",
                    backfaceVisibility: "hidden",
                    transition: "border-color 0.3s ease, background-color 0.3s ease",
                  }}
                >
                  {/* Card Video: Active Card Plays YouTube in Muted Loop; Stacked Cards show Crisp Poster (Zero Lag) */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      setActiveProjectForModal(project);
                    }}
                    className="relative w-full aspect-video rounded-[20px] sm:rounded-[24px] overflow-hidden bg-black shadow-md border border-black/10 mb-3 sm:mb-4 group/video"
                  >
                    {Math.abs(diff) < 1.15 ? (
                      <iframe
                        src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${project.youtubeId}&controls=0&showinfo=0&rel=0&modestbranding=1&playsinline=1`}
                        title={project.title}
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        className="w-full h-full border-0 pointer-events-none"
                      />
                    ) : (
                      <div className="relative w-full h-full bg-black">
                        <img
                          src={`https://img.youtube.com/vi/${project.youtubeId}/hqdefault.jpg`}
                          alt={project.title}
                          className="w-full h-full object-cover opacity-85"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                          <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/40 text-white shadow-lg">
                            <Video size={20} />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Card Details: Typography & Metrics */}
                  <div className="space-y-2.5">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                      <div className="flex items-baseline gap-3">
                        <h3
                          className="typo-h3 font-heading font-black tracking-tight uppercase"
                          style={{ color: styleConfig.textColor }}
                        >
                          {project.title}
                        </h3>
                        <span
                          className="text-xs font-mono font-bold uppercase tracking-wider opacity-80"
                          style={{ color: styleConfig.textColor }}
                        >
                          {project.category}
                        </span>
                      </div>

                      <BrandButton
                        size="sm"
                        onClick={(e: React.MouseEvent) => {
                          e.stopPropagation();
                          setActiveProjectForModal(project);
                        }}
                        label="VIEW CASE"
                      />
                    </div>

                    <p
                      className="typo-small font-sans line-clamp-2 leading-relaxed"
                      style={{ color: styleConfig.descColor }}
                    >
                      {project.description}
                    </p>

                    {/* Impact Pills */}
                    {project.impactMetrics && project.impactMetrics.length > 0 && (
                      <div className="flex flex-wrap gap-2 pt-1">
                        {project.impactMetrics.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="inline-flex items-center rounded-full px-3 py-1 text-[11px] font-mono font-semibold shadow-2xs"
                            style={{
                              backgroundColor: styleConfig.pillBg,
                              border: `1px solid ${styleConfig.pillBorder}`,
                              color: styleConfig.textColor,
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                </div>
              );
            })}
          </div>

        </div>
      </section>

      {/* Interactive Modal for full audio/details */}
      <ProjectModal
        project={activeProjectForModal}
        onClose={() => setActiveProjectForModal(null)}
      />
    </>
  );
};
