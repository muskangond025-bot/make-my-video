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

interface CardRestingConfig {
  rotation: number;
  y: number;
  xOffset: number;
  zIndex: number;
}

// Precise reference-matched organic fanned deck transforms
// Progresses smoothly from leftward tilt to upright to gentle rightward tilt
const RESTING_CONFIG: CardRestingConfig[] = [
  { rotation: -9.5, y: 16, xOffset: -4, zIndex: 10 },
  { rotation: -5.8, y: 7, xOffset: 2, zIndex: 20 },
  { rotation: -2.2, y: -5, xOffset: 0, zIndex: 30 },
  { rotation: 0.8, y: -1, xOffset: -2, zIndex: 40 },
  { rotation: 4.2, y: 13, xOffset: 3, zIndex: 50 },
];

export const AboutBtsSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const currentActiveRef = useRef<number>(-1);

  const [activeModalClip, setActiveModalClip] = useState<BtsClip | null>(null);
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number>(-1);
  const [mutedStates, setMutedStates] = useState<Record<string, boolean>>(() =>
    BTS_CLIPS.reduce((acc, clip) => ({ ...acc, [clip.id]: true }), {})
  );

  const toggleSound = (clipId: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setMutedStates((prev) => ({ ...prev, [clipId]: !prev[clipId] }));
  };

  useEffect(() => {
    const deck = deckRef.current;
    if (!deck) return;

    const cards = cardsRef.current.filter(Boolean) as HTMLDivElement[];
    const cardsLength = cards.length;
    if (cardsLength === 0) return;

    const getStep = () => {
      const width = window.innerWidth;
      if (width < 640) return 55;
      if (width < 1024) return 100;
      return 145;
    };

    let cardStep = getStep();

    const handleResize = () => {
      cardStep = getStep();
      applyRestingState(0.4);
    };

    window.addEventListener("resize", handleResize);

    const applyRestingState = (duration = 0) => {
      cards.forEach((card, idx) => {
        const conf = RESTING_CONFIG[idx] || RESTING_CONFIG[0];
        const targetX = (idx - 2) * cardStep + conf.xOffset;
        const targetY = conf.y;

        if (duration === 0) {
          gsap.set(card, {
            x: targetX,
            y: targetY,
            xPercent: -50,
            yPercent: -50,
            rotation: conf.rotation,
            scale: 1,
            zIndex: conf.zIndex,
            transformOrigin: "center center",
          });
        } else {
          gsap.to(card, {
            x: targetX,
            y: targetY,
            xPercent: -50,
            yPercent: -50,
            rotation: conf.rotation,
            scale: 1,
            zIndex: conf.zIndex,
            duration,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    // Initialize resting positions
    applyRestingState(0);

    const activateCard = (i: number) => {
      setHoveredCardIndex(i);
      const activeCard = cards[i];
      if (!activeCard) return;

      const conf = RESTING_CONFIG[i] || RESTING_CONFIG[0];
      const targetX = (i - 2) * cardStep + conf.xOffset;

      // Active priority card elevates smoothly, straightens up, scales up slightly
      gsap.to(activeCard, {
        x: targetX,
        y: -24,
        xPercent: -50,
        yPercent: -50,
        rotation: 0,
        scale: 1.08,
        zIndex: 60,
        duration: 0.45,
        ease: "power2.out",
        overwrite: "auto",
      });

      // Sibling cards gently part without z-index hopping (prevents visual disturbance)
      cards.forEach((card, index) => {
        if (index !== i) {
          const sibConf = RESTING_CONFIG[index] || RESTING_CONFIG[0];
          const dir = index < i ? -1 : 1;
          const dist = Math.abs(index - i);
          const push = dir * (55 / dist);

          gsap.to(card, {
            x: (index - 2) * cardStep + sibConf.xOffset + push,
            y: sibConf.y,
            xPercent: -50,
            yPercent: -50,
            rotation: sibConf.rotation,
            scale: 0.96,
            zIndex: sibConf.zIndex,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto",
          });
        }
      });
    };

    const resetAll = () => {
      setHoveredCardIndex(-1);
      currentActiveRef.current = -1;
      applyRestingState(0.5);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = deck.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, mouseX / rect.width));
      const activeIndex = Math.min(
        cardsLength - 1,
        Math.max(0, Math.floor(percentage * cardsLength))
      );

      if (currentActiveRef.current !== activeIndex) {
        currentActiveRef.current = activeIndex;
        activateCard(activeIndex);
      }
    };

    deck.addEventListener("mousemove", handleMouseMove);
    deck.addEventListener("mouseleave", resetAll);

    return () => {
      window.removeEventListener("resize", handleResize);
      deck.removeEventListener("mousemove", handleMouseMove);
      deck.removeEventListener("mouseleave", resetAll);
    };
  }, []);

  return (
    <section className="relative w-full py-20 md:py-28 bg-[#EAE3DB] text-[#141416] border-b border-[#141416]/10 select-none overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-16">
        {/* ========================================================================= */}
        {/* OUT OF BOX: Heading & Description on the Warm Light Background           */}
        {/* ========================================================================= */}
        <div className="max-w-4xl mb-10 sm:mb-14 text-left">
          <h2 className="text-3xl sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black tracking-tight uppercase leading-none mb-4 text-[#141416] text-left">
            MAGIC <span className="text-[#7567EE]">BEHIND CAMERA.</span>
          </h2>
          <p className="text-base sm:text-lg text-[#4A4658] font-normal leading-relaxed text-left max-w-2xl">
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
            className="relative z-10 w-full max-w-5xl mx-auto h-[380px] sm:h-[440px] lg:h-[480px] cursor-pointer flex items-center justify-center"
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
                  className="absolute top-1/2 left-1/2 w-[270px] sm:w-[330px] md:w-[370px] lg:w-[400px] aspect-[16/11] select-none transition-shadow duration-300"
                  style={{
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
