"use client";

import React, { useState, useRef, useEffect } from "react";
import { Volume2, VolumeX, X } from "lucide-react";
import { gsap } from "@/lib/gsap";

interface BtsClip {
  id: string;
  title: string;
  videoUrl: string;
}

const BTS_CLIPS: BtsClip[] = [
  {
    id: "bts-01",
    title: "Gimbal Motion Tracking",
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/behind_the_scenes/videos/WhatsApp%20Video%202024-05-10%20at%2011.23.49%20AM.mp4",
  },
  {
    id: "bts-02",
    title: "Commercial Lighting Setup",
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/behind_the_scenes/videos/WhatsApp%20Video%202024-05-10%20at%2011.23.55%20AM.mp4",
  },
  {
    id: "bts-03",
    title: "On-Ground Directing",
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/behind_the_scenes/videos/WhatsApp%20Video%202024-05-10%20at%2011.24.01%20AM.mp4",
  },
  {
    id: "bts-04",
    title: "Commercial Product Reel",
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/behind_the_scenes/videos/WhatsApp%20Video%202024-05-10%20at%2011.24.16%20AM.mp4",
  },
  {
    id: "bts-05",
    title: "Aerial Perspective Flight",
    videoUrl:
      "https://storage.googleapis.com/mkv_imagesbackend/behind_the_scenes/videos/WhatsApp%20Video%202024-05-10%20at%2011.58.06%20AM.mp4",
  },
];

interface CardInitialConfig {
  rotation: number;
  xPercent: number;
  yPercent: number;
  zIndex: number;
}

// Dumemearts reference cascade and organic fanned deck transforms
// Natural left-to-right ascending z-index (2, 3, 4, 5, 6)
const CARD_CONFIGS: CardInitialConfig[] = [
  { rotation: -9.5, xPercent: -2, yPercent: 4, zIndex: 2 },
  { rotation: -5.5, xPercent: 1, yPercent: 0, zIndex: 3 },
  { rotation: -1.5, xPercent: -1, yPercent: -3, zIndex: 4 },
  { rotation: 2.5, xPercent: 1, yPercent: 0, zIndex: 5 },
  { rotation: 7.0, xPercent: 2, yPercent: 4, zIndex: 6 },
];

export const AboutBtsSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentPortionRef = useRef<number>(0);

  const [activeModalClip, setActiveModalClip] = useState<BtsClip | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number>(-1);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>(() =>
    BTS_CLIPS.reduce((acc, clip) => ({ ...acc, [clip.id]: true }), {})
  );

  const toggleSound = (clipId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedStates((prev) => ({ ...prev, [clipId]: !prev[clipId] }));
  };

  const newPortion = (i: number) => {
    setHoveredCardIndex(i);
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const activeCard = cards[i];
    if (!activeCard) return;

    // Active card: straightens up to rotation 0, scales up, floats up slightly
    gsap.to(activeCard, {
      xPercent: 0,
      yPercent: -12,
      rotation: 0,
      scale: 1.08,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)",
      overwrite: "auto",
    });

    // Sibling cards: parted using Dumemearts' exact 80 / (index - i) reciprocal formula
    cards.forEach((card, index) => {
      if (index !== i) {
        const baseConf = CARD_CONFIGS[index] || CARD_CONFIGS[0];
        const pushX = 80 / (index - i);
        gsap.to(card, {
          xPercent: baseConf.xPercent + pushX,
          yPercent: baseConf.yPercent,
          rotation: baseConf.rotation,
          scale: 0.98,
          duration: 0.8,
          ease: "elastic.out(1, 0.75)",
          overwrite: "auto",
        });
      }
    });
  };

  const resetPortion = (index: number) => {
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const card = cards[index];
    if (!card) return;
    const baseConf = CARD_CONFIGS[index] || CARD_CONFIGS[0];
    gsap.to(card, {
      xPercent: baseConf.xPercent,
      yPercent: baseConf.yPercent,
      rotation: baseConf.rotation,
      scale: 1,
      duration: 0.8,
      ease: "elastic.out(1, 0.75)",
      overwrite: "auto",
    });
  };

  const resetAll = () => {
    setHoveredCardIndex(-1);
    currentPortionRef.current = 0;
    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    cards.forEach((card, index) => {
      const baseConf = CARD_CONFIGS[index] || CARD_CONFIGS[0];
      gsap.to(card, {
        xPercent: baseConf.xPercent,
        yPercent: baseConf.yPercent,
        rotation: baseConf.rotation,
        scale: 1,
        duration: 0.8,
        ease: "elastic.out(1, 0.75)",
        overwrite: "auto",
      });
    });
  };

  const activateCardByIndex = (i: number) => {
    const activePortion = i + 1;
    if (currentPortionRef.current !== activePortion) {
      if (currentPortionRef.current !== 0) {
        resetPortion(currentPortionRef.current - 1);
      }
      currentPortionRef.current = activePortion;
      newPortion(i);
    }
  };

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const cardsLength = cards.length;
    if (cardsLength === 0) return;

    // Set initial resting fanned transforms
    cards.forEach((card, idx) => {
      const conf = CARD_CONFIGS[idx] || CARD_CONFIGS[0];
      gsap.set(card, {
        xPercent: conf.xPercent,
        yPercent: conf.yPercent,
        rotation: conf.rotation,
        scale: 1,
        transformOrigin: "center center",
      });
    });

    const handleMouseMove = (e: MouseEvent) => {
      const rect = deck.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, mouseX / rect.width));
      const activePortion = Math.ceil(percentage * cardsLength);

      if (
        currentPortionRef.current !== activePortion &&
        activePortion > 0 &&
        activePortion <= cardsLength
      ) {
        if (currentPortionRef.current !== 0) {
          resetPortion(currentPortionRef.current - 1);
        }
        currentPortionRef.current = activePortion;
        newPortion(activePortion - 1);
      }
    };

    const handleMouseLeave = () => {
      resetAll();
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length === 0) return;
      const touch = e.touches[0];
      const rect = deck.getBoundingClientRect();
      const touchX = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, touchX / rect.width));
      const activePortion = Math.ceil(percentage * cardsLength);

      if (
        currentPortionRef.current !== activePortion &&
        activePortion > 0 &&
        activePortion <= cardsLength
      ) {
        if (currentPortionRef.current !== 0) {
          resetPortion(currentPortionRef.current - 1);
        }
        currentPortionRef.current = activePortion;
        newPortion(activePortion - 1);
      }
    };

    const handleTouchEnd = () => {
      resetAll();
    };

    deck.addEventListener("mousemove", handleMouseMove);
    deck.addEventListener("mouseleave", handleMouseLeave);
    deck.addEventListener("touchmove", handleTouchMove, { passive: true });
    deck.addEventListener("touchend", handleTouchEnd);

    return () => {
      deck.removeEventListener("mousemove", handleMouseMove);
      deck.removeEventListener("mouseleave", handleMouseLeave);
      deck.removeEventListener("touchmove", handleTouchMove);
      deck.removeEventListener("touchend", handleTouchEnd);
    };
  }, []);

  return (
    <section className="relative w-full py-20 md:py-28 px-4 sm:px-6 md:px-10 lg:px-14 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden">
      <div className="max-w-[1520px] mx-auto">
        {/* ========================================================================= */}
        {/* OUT OF BOX: Heading & Description on the Warm Light Background           */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mb-10 sm:mb-14 text-left">
          <h2 className="typo-h1 font-heading font-black tracking-tight uppercase leading-none mb-4 text-[#141416] text-left">
            MAGIC <span className="text-[#7567EE]">BEHIND CAMERA.</span>
          </h2>
          <p className="typo-body text-[#4A4658] font-normal leading-relaxed text-left max-w-2xl">
            A cinematic glimpse into our on-ground commercial film sets, creative directing, camera rigs, and production artistry.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* PLAIN BLACK STAGE: Perfectly Centered Stage Housing the Fanned Cards      */}
        {/* ========================================================================= */}
        <div
          ref={containerRef}
          className="relative w-full rounded-[32px] sm:rounded-[40px] bg-[#0A0A0C] border border-[#141416]/30 p-6 sm:p-10 lg:p-14 shadow-2xl overflow-hidden"
        >
          {/* Lower Half Dotted Texture - Fills entire lower half seamlessly right to edges */}
          <div
            className="absolute bottom-0 left-0 right-0 h-[50%] sm:h-[52%] lg:h-[54%] rounded-b-[32px] sm:rounded-b-[40px] border-t border-white/10 bg-[#0C0C10] overflow-hidden pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255, 255, 255, 0.18) 1.6px, transparent 1.6px)",
              backgroundSize: "22px 22px",
            }}
          >
            {/* Subtle Gradient Inset */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
          </div>

          {/* Dumearts Style Corner Reticle Crosses */}
          <span className="absolute top-5 left-6 text-white/30 font-mono text-lg select-none pointer-events-none">
            +
          </span>
          <span className="absolute top-5 right-6 text-white/30 font-mono text-lg select-none pointer-events-none">
            +
          </span>
          <span className="absolute bottom-5 left-6 text-white/30 font-mono text-lg select-none pointer-events-none z-10">
            +
          </span>
          <span className="absolute bottom-5 right-6 text-white/30 font-mono text-lg select-none pointer-events-none z-10">
            +
          </span>

          {/* Stage Container: Cards Deck Area */}
          <div
            ref={deckRef}
            className="relative z-10 w-full max-w-7xl mx-auto h-[380px] sm:h-[440px] lg:h-[480px] cursor-pointer flex items-center justify-center overflow-visible"
          >
            {BTS_CLIPS.map((clip, i) => {
              const isMuted = mutedStates[clip.id] ?? true;
              const isHovered = hoveredCardIndex === i;

              return (
                <div
                  key={clip.id}
                  ref={(el) => {
                    cardsRef.current[i] = el;
                  }}
                  onClick={() => setActiveModalClip(clip)}
                  onMouseEnter={() => activateCardByIndex(i)}
                  className={`relative flex-shrink-0 w-[240px] sm:w-[310px] md:w-[360px] lg:w-[400px] aspect-[16/11] select-none transition-shadow duration-300 ${
                    i > 0
                      ? "-ml-[110px] sm:-ml-[155px] md:-ml-[190px] lg:-ml-[220px]"
                      : ""
                  }`}
                  style={{
                    zIndex: CARD_CONFIGS[i]?.zIndex ?? i + 2,
                    willChange: "transform",
                  }}
                >
                  {/* Tablet Bezel Outer Frame */}
                  <div
                    className={`relative w-full h-full rounded-[22px] sm:rounded-[28px] p-2 sm:p-2.5 bg-[#0F0F13] border-2 transition-all duration-300 flex flex-col justify-between overflow-hidden ${
                      isHovered
                        ? "border-[#7567EE] shadow-[0_20px_50px_rgba(0,0,0,0.95),0_0_35px_rgba(117,103,238,0.5)]"
                        : "border-white/15 hover:border-white/40 shadow-2xl"
                    }`}
                  >
                    {/* Clean Video Viewport */}
                    <div className="relative w-full h-full rounded-[16px] sm:rounded-[22px] overflow-hidden bg-black shadow-inner">
                      <video
                        src={clip.videoUrl}
                        autoPlay
                        loop
                        muted={isMuted}
                        playsInline
                        className="w-full h-full object-cover"
                      />

                      {/* Subtle Bottom Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent pointer-events-none" />

                      {/* Sound Toggle Button */}
                      <div className="absolute top-3 right-3 z-20">
                        <button
                          onClick={(e) => toggleSound(clip.id, e)}
                          className="p-1.5 sm:p-2 rounded-full bg-black/60 backdrop-blur-md text-white/90 hover:text-white hover:bg-[#7567EE] transition-colors shadow-sm cursor-pointer"
                          title={isMuted ? "Unmute" : "Mute"}
                        >
                          {isMuted ? (
                            <VolumeX className="w-3.5 h-3.5" />
                          ) : (
                            <Volume2 className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>

                      {/* Title at Bottom Only */}
                      <div className="absolute bottom-3.5 left-4 right-4 z-20 pointer-events-none">
                        <h3 className="text-xs sm:text-sm font-semibold text-white tracking-tight drop-shadow-md">
                          {clip.title}
                        </h3>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Full-Screen Lightbox Modal for High-Res Playback */}
      {activeModalClip && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveModalClip(null)}
        >
          <div
            className="relative w-full max-w-4xl bg-[#17171A] border border-white/20 rounded-3xl overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
              <span className="text-sm font-semibold text-white">
                {activeModalClip.title}
              </span>
              <button
                onClick={() => setActiveModalClip(null)}
                className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="relative aspect-video bg-black flex items-center justify-center">
              <video
                src={activeModalClip.videoUrl}
                autoPlay
                controls
                playsInline
                className="w-full h-full object-contain"
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
