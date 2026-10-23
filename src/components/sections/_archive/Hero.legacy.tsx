"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';
import { useTheme } from 'next-themes';
import { CinemaCamera3D } from '@/components/ui/CinemaCamera3D';

const rulerSegments = [
  "-11", "-10", "-09", "-08", "-07", "-06", "-05", "-04", "-03", "-02", "-01",
  "00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "10"
];

export const Hero = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = mounted ? resolvedTheme === "dark" : false;

  const containerRef = useRef<HTMLDivElement>(null);
  const [cetTime, setCetTime] = useState<string>("00:00:00");

  // 1. Live CET Clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const options: Intl.DateTimeFormatOptions = {
          timeZone: 'Europe/Paris', // CET/CEST timezone
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        };
        const formatter = new Intl.DateTimeFormat('en-GB', options);
        setCetTime(formatter.format(new Date()));
      } catch (err) {
        // Fallback if timezone not supported
        const now = new Date();
        setCetTime(now.toTimeString().split(' ')[0]);
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);




  // Video Player Refs & States
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  const togglePlay = () => {
    if (!iframeRef.current?.contentWindow) return;
    if (isPlaying) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'pauseVideo', args: '' }),
        '*'
      );
      setIsPlaying(false);
    } else {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'playVideo', args: '' }),
        '*'
      );
      setIsPlaying(true);
    }
  };

  const toggleMute = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!iframeRef.current?.contentWindow) return;
    if (isMuted) {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'unMute', args: '' }),
        '*'
      );
      setIsMuted(false);
    } else {
      iframeRef.current.contentWindow.postMessage(
        JSON.stringify({ event: 'command', func: 'mute', args: '' }),
        '*'
      );
      setIsMuted(true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // 4. GSAP Scroll Trigger for Video Expansion
  useEffect(() => {
    if (!videoContainerRef.current || !videoInnerRef.current) return;

    const anim = gsap.fromTo(videoInnerRef.current,
      {
        scale: 0.85,
        borderRadius: "96px",
      },
      {
        scale: 1.0,
        borderRadius: "24px",
        scrollTrigger: {
          trigger: videoContainerRef.current,
          start: "top bottom",
          end: "bottom center",
          scrub: true,
        }
      }
    );

    return () => {
      anim.scrollTrigger?.kill();
      anim.kill();
    };
  }, []);

  // 5. Parallax scroll trigger animation
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;

    const ctx = gsap.context(() => {
      const triggerElement = containerRef.current?.querySelector('[data-parallax-layers]');
      if (!triggerElement) return;

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: triggerElement,
          start: "0% 0%",
          end: "100% 0%",
          scrub: 0
        }
      });

      const layers = [
        { layer: "-1", yPercent: -10 },
        { layer: "-2", yPercent: -20 },
        { layer: "-3", yPercent: -30 },
        { layer: "-4", yPercent: -40 },
        { layer: "-5", yPercent: -50 },
        { layer: "-6", yPercent: -60 },
        { layer: "-7", yPercent: -70 },
        { layer: "-8", yPercent: -80 },
        { layer: "-9", yPercent: -90 },
        { layer: "1", yPercent: 10 },
        { layer: "2", yPercent: 20 },
        { layer: "3", yPercent: 30 },
        { layer: "4", yPercent: 40 },
        { layer: "5", yPercent: 50 },
        { layer: "6", yPercent: 60 },
        { layer: "7", yPercent: 70 },
        { layer: "8", yPercent: 80 },
        { layer: "9", yPercent: 90 }
      ];

      layers.forEach((layerObj, idx) => {
        const targets = triggerElement.querySelectorAll(`[data-parallax-layer="${layerObj.layer}"]`);
        if (targets.length > 0) {
          tl.to(targets, {
            yPercent: layerObj.yPercent,
            ease: "none"
          }, idx === 0 ? undefined : "<");
        }
      });

      // Fade out the hero inner content (ruler, clocks, text, camera, copyright) as we scroll down
      const heroContents = containerRef.current?.querySelectorAll('.hero-ruler, .hero-top, .heading-wrapper, .hero-camera-element, .hero-bottom, .hero-bg-dots, .hero-description-block');
      if (heroContents && heroContents.length > 0) {
        gsap.to(heroContents, {
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top top",
            end: "top+=80%", // Fades out completely within the first 80% of screen scroll
            scrub: true
          }
        });
      }

      // Smoothly fade in the video card section as it enters from the bottom
      const videoEl = containerRef.current?.querySelector('.hero-video');
      if (videoEl) {
        gsap.fromTo(videoEl,
          { opacity: 0 },
          {
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: videoEl,
              start: "top 95%",
              end: "top 45%",
              scrub: true
            }
          }
        );
      }

    }, containerRef);

    return () => ctx.revert();
  }, []);
 
  // 6. Hero Entry (Loading) Animations & Mouse Parallax
  useEffect(() => {
    if (typeof window === "undefined" || !containerRef.current) return;
 
    const ctx = gsap.context(() => {
      // 1. Initial State Setup
      gsap.set(".ruler-segment", { opacity: 0, y: -15 });
      gsap.set(".frame-corner", { scale: 0, opacity: 0 });
      gsap.set(".heading-style-h1", { opacity: 0, y: 20 });
      gsap.set(".corners-wrapper", { opacity: 0, scale: 0.95 });
      gsap.set(".hero-camera-element", { scale: 0.85, opacity: 0 });
 
      // 2. Timeline Animation
      const entryTl = gsap.timeline({ defaults: { ease: "power3.out" } });
 
      entryTl
        .to(".ruler-segment", {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: {
            each: 0.02,
            from: "center" // Animates from center of ruler outwards!
          }
        })
        .to(".corners-wrapper", {
          opacity: 1,
          scale: 1,
          duration: 1.2
        }, "-=0.8")
        .to(".frame-corner", {
          scale: 1,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "back.out(2)" // Snap elastic brackets
        }, "-=1")
        .to(".heading-style-h1", {
          opacity: 1,
          y: 0,
          duration: 1.2,
          stagger: 0.15
        }, "-=0.8")
        .to(".hero-camera-element", {
          scale: 1,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out"
        }, "-=0.6");
 
      // 3. Mouse Movement Parallax
      const hero = containerRef.current;
      const ruler = hero?.querySelector('.ruler-wrapper');
      const heading = hero?.querySelector('.heading-wrapper');
      const bgDots = hero?.querySelector('.hero-bg-dots');

      // 4. Scroll-linked timeline ruler dial animation
      if (hero) {
        gsap.to(".ruler-container", {
          xPercent: -15,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: 0.5,
          }
        });
      }
 
      const handleMouseMove = (e: MouseEvent) => {
        const { innerWidth: w, innerHeight: h } = window;
        const xPercent = (e.clientX / w) - 0.5; // [-0.5, 0.5]
        const yPercent = (e.clientY / h) - 0.5;
 
        // Shift timeline ruler horizontally
        if (ruler) {
          gsap.to(ruler, {
            x: xPercent * -120, // moves in opposite direction of mouse
            duration: 1.2,
            ease: "power2.out"
          });
        }
 
        // Shift title text slightly (3D depth)
        if (heading) {
          gsap.to(heading, {
            x: xPercent * 30,
            y: yPercent * 20,
            duration: 1,
            ease: "power2.out"
          });
        }
 
        // Shift bg soft light gradient parallax (slower, opposite direction)
        if (bgDots) {
          gsap.to(bgDots, {
            x: xPercent * -40,
            y: yPercent * -30,
            duration: 1.5,
            ease: "power2.out"
          });
        }
      };
 
      hero?.addEventListener('mousemove', handleMouseMove);
 
      return () => {
        hero?.removeEventListener('mousemove', handleMouseMove);
      };
    }, containerRef);
 
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="section-hero relative bg-[#F3EBDD] bg-dots-pattern text-[#211747] select-none">

      {/* Background radial soft light gradient image overlay */}
      <img
        src="https://cdn.prod.website-files.com/67b873ab284925c72f7f5176/67f7aa9e8d2a0c352428a22a_gradient-final.svg"
        loading="lazy"
        alt=""
        data-parallax-layer="3"
        className="hero-bg-dots is--upper pointer-events-none select-none opacity-40 mix-blend-multiply"
      />

      {/* 2. INNER HERO CONTENT WRAPPER */}
      <div className="hero-outer w-full flex-grow flex flex-col justify-center items-center px-4 md:px-8">
        <div className="padding-global align-center w-full max-w-[1440px]">
          <div className="container-large align-center w-full">
            <div data-parallax-layers="" className="hero-inner flex flex-col items-center text-center relative w-full pt-10">

              {/* 1. RULER HEADER (Timeline inside the box!) */}
              <div className="hero-ruler pointer-events-none">
                <div className="ruler-wrapper">
                  <div className="ruler-container">
                    {rulerSegments.map((num, i) => (
                      <div key={i} className="ruler-segment">
                        <div className="ruler-long-wrapper">
                          <div className="ruler-long-line"></div>
                          <div className="ruler-text">{num}</div>
                        </div>
                        {Array.from({ length: 18 }).map((_, idx) => (
                          <div key={idx} className="ruler-short-line" />
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Introduction Eyebrow */}
              <div className="hero-top mb-12">
                <p className="text-size-tiny text-style-allcaps text-align-center text-[#6B6478] tracking-[0.2em] font-sans max-w-[500px]">
                  FILMS • CREATIVE DIRECTION • SOCIAL MEDIA • SCRIPTING
                </p>
              </div>

              {/* Main Heading & draggable Globe */}
              <div className="hero-content relative flex flex-col items-center justify-center w-full">

                {/* Heading Text & Corners */}
                <div data-parallax-layer="9" className="heading-wrapper relative flex flex-col items-center">

                  {/* First Line */}
                  <h1 className="heading-style-h1 is-smaller font-heading text-[#211747] tracking-widest text-[5vw] mb-4">
                    MAKE MY VID
                  </h1>

                  {/* Second Line in Corners Frame */}
                  <div className="corners-wrapper is--hero relative px-10 py-6 border border-[#211747]/15 rounded-2xl flex items-center justify-center min-h-[14vw]">

                    {/* The Tall condensed "ELEVATING BRAND" text in deep indigo */}
                    <span className="heading-style-h1 relative font-humane text-[#211747] text-[18vw] leading-[0.8] tracking-wider uppercase font-semibold">
                      ELEVATING BRAND
                    </span>

                    {/* Corner Marks */}
                    <div className="corners absolute inset-0 w-full h-full pointer-events-none">
                      <div className="frame-corner" />
                      <div className="frame-corner is--2" />
                      <div className="frame-corner is--3" />
                      <div className="frame-corner is--4" />
                    </div>
                  </div>
                </div>

                {/* Overlaid Interactive 3D Cinema Camera in Drawing Form */}
                <div
                  data-parallax-layer="9"
                  className="hero-camera-element absolute pointer-events-auto z-20 w-[48vw] max-w-[560px] aspect-[4/3] flex items-center justify-center -translate-y-2"
                >
                  <CinemaCamera3D className="w-full h-full" />
                </div>

              </div>

              {/* 3. HERO BOTTOM FOOTER */}
              <div className="hero-bottom w-full absolute bottom-6 left-0 right-0 px-8 flex justify-between items-center font-sans z-10 pointer-events-none">
                {/* Left Side: Copyright */}
                <div className="text-size-tiny text-[#6B6478] tracking-wider font-semibold uppercase pointer-events-auto">
                  ©COPYRIGHT 2026
                </div>

                {/* Right Side: CET clock with Neon Lime pulsing dot */}
                <div className="eyebrow-wrap border border-[#211747]/20 bg-[#F3EBDD]/90 backdrop-blur-md px-3.5 py-1.5 rounded-full flex items-center gap-2.5 pointer-events-auto shadow-sm">
                  <div className="w-2 h-2 rounded-full bg-[#D5FF3F] animate-pulse shadow-[0_0_8px_#D5FF3F]" />
                  <p className="pill-text is--nav text-[#211747] text-[11px] font-mono font-bold tracking-widest uppercase">
                    {cetTime} <span className="text-[#B9A1F7] font-semibold ml-1">CET</span>
                  </p>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      {/* 4. HERO VIDEO SECTION (reveals by sliding up over sticky hero-outer) */}
      <section
        ref={videoContainerRef}
        className="hero-video w-full flex flex-col items-center relative overflow-hidden"
      >
        <header className="hero-video-border w-full max-w-[1440px] px-4 md:px-8">
          <div className="padding-global w-full">
            <div className="container-large w-full">
              <div className="hero-video-padding w-full py-4">
                <div
                  ref={videoInnerRef}
                  className="hero-video-inner relative w-full aspect-video rounded-[96px] object-cover justify-center items-center flex overflow-hidden select-none border-2 border-[#211747] shadow-[0_24px_64px_rgba(33,23,71,0.22)] bg-[#211747] cursor-pointer"
                  onPointerEnter={() => setIsHovered(true)}
                  onPointerLeave={() => setIsHovered(false)}
                  onPointerMove={handlePointerMove}
                  onClick={togglePlay}
                >
                  {/* YouTube Showreel Video Poster Placeholder */}
                  <div 
                    className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0 opacity-40"
                    style={{ backgroundImage: `url('https://img.youtube.com/vi/yo-VmdTOEUk/maxresdefault.jpg')` }}
                  />

                  {/* YouTube Embed from rohanjoshi.in (yo-VmdTOEUk) */}
                  <iframe
                    ref={iframeRef}
                    src="https://www.youtube.com/embed/yo-VmdTOEUk?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=yo-VmdTOEUk&controls=0&modestbranding=1&rel=0&playsinline=1"
                    title="Make My Vid Showreel Banner"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 scale-[1.12]"
                  />

                  <div className="absolute inset-0 bg-[#211747]/10 pointer-events-none z-10" />

                  {isHovered && (
                    <div
                      className="absolute bg-[#D5FF3F] text-[#211747] font-sans text-xs font-black tracking-widest uppercase rounded-full w-24 h-24 flex items-center justify-center pointer-events-none z-30 transition-transform duration-75 ease-out shadow-[0_0_24px_rgba(213,255,63,0.5)]"
                      style={{
                        left: cursorPos.x,
                        top: cursorPos.y,
                        transform: 'translate(-50%, -50%) scale(1)',
                      }}
                    >
                      {isPlaying ? 'PAUSE' : 'PLAY'}
                    </div>
                  )}

                  <div className="absolute bottom-6 right-6 z-20 pointer-events-auto flex items-center gap-3">
                    {/* Audio Mute/Unmute Button */}
                    <button
                      type="button"
                      aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                      onClick={toggleMute}
                      className="w-14 h-14 bg-[#211747]/85 hover:bg-[#D5FF3F] hover:text-[#211747] text-[#F3EBDD] rounded-full flex items-center justify-center transition-all duration-300 border border-[#B9A1F7]/30 backdrop-blur-md shadow-lg cursor-pointer"
                    >
                      {isMuted ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <line x1="23" y1="9" x2="17" y2="15"></line>
                          <line x1="17" y1="9" x2="23" y2="15"></line>
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
                          <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                        </svg>
                      )}
                    </button>

                    {/* Play/Pause Button */}
                    <button
                      type="button"
                      aria-label={isPlaying ? "Pause video" : "Play video"}
                      onClick={(e) => {
                        e.stopPropagation();
                        togglePlay();
                      }}
                      className="w-14 h-14 bg-[#211747]/85 hover:bg-[#D5FF3F] hover:text-[#211747] text-[#F3EBDD] rounded-full flex items-center justify-center transition-all duration-300 border border-[#B9A1F7]/30 backdrop-blur-md shadow-lg cursor-pointer"
                    >
                      {isPlaying ? (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                        </svg>
                      ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
      </section>

    </section>
  );
};
