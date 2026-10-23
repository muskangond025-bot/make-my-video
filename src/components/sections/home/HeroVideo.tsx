"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap } from '@/lib/gsap';

export const HeroVideo = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoInnerRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });

  // 1. GSAP Scroll Trigger for Video Expansion
  useEffect(() => {
    if (!containerRef.current || !videoInnerRef.current) return;

    const anim = gsap.fromTo(videoInnerRef.current,
      {
        scale: 0.85,
        borderRadius: "96px",
      },
      {
        scale: 1.0,
        borderRadius: "24px",
        scrollTrigger: {
          trigger: containerRef.current,
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

  // 2. Play/Pause toggle
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

  // 3. Mute/Unmute audio toggle
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

  // 4. Pointer move to track custom cursor position
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <section
      ref={containerRef}
      className="hero-video w-full bg-[#F3EBDD] bg-dots-pattern py-24 flex flex-col items-center relative overflow-hidden"
    >
      <header className="hero-video-border w-full max-w-[1440px] px-4 md:px-8">
        <div className="padding-global w-full">
          <div className="container-large w-full">
            <div className="hero-video-padding w-full py-4">

              {/* VIDEO WRAPPER WITH EXPANSION AND HOVER INTERACTION */}
              <div
                ref={videoInnerRef}
                className="hero-video-inner relative w-full aspect-video rounded-[96px] object-cover justify-center items-center flex overflow-hidden select-none border-2 border-[#211747]/20 shadow-2xl bg-black cursor-pointer"
                onPointerEnter={() => setIsHovered(true)}
                onPointerLeave={() => setIsHovered(false)}
                onPointerMove={handlePointerMove}
                onClick={togglePlay}
              >

                {/* YOUTUBE SHOWREEL POSTER PLACEHOLDER */}
                <div 
                  className="absolute inset-0 w-full h-full bg-cover bg-center pointer-events-none z-0 opacity-40"
                  style={{ backgroundImage: `url('https://img.youtube.com/vi/yo-VmdTOEUk/maxresdefault.jpg')` }}
                />

                {/* YOUTUBE EMBED FROM ROHANJOSHI.IN (yo-VmdTOEUk) */}
                <iframe
                  ref={iframeRef}
                  src="https://www.youtube.com/embed/yo-VmdTOEUk?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=yo-VmdTOEUk&controls=0&modestbranding=1&rel=0&playsinline=1"
                  title="Make My Vid Showreel Banner"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  className="absolute inset-0 w-full h-full object-cover pointer-events-none z-0 scale-[1.12]"
                />

                {/* BLACK OVERLAY (adds cinematic depth) */}
                <div className="absolute inset-0 bg-black/10 pointer-events-none z-10" />

                {/* CUSTOM PLAY/PAUSE FLOATING CURSOR BADGE */}
                {isHovered && (
                  <div
                    className="absolute bg-[#D5FF3F] text-[#211747] font-sans text-xs font-bold tracking-widest uppercase rounded-full w-24 h-24 flex items-center justify-center pointer-events-none z-30 transition-transform duration-75 ease-out shadow-xl"
                    style={{
                      left: cursorPos.x,
                      top: cursorPos.y,
                      transform: 'translate(-50%, -50%) scale(1)',
                    }}
                  >
                    {isPlaying ? 'PAUSE' : 'PLAY'}
                  </div>
                )}

                {/* BOTTOM RIGHT CONTROLS */}
                <div className="absolute bottom-6 right-6 z-20 pointer-events-auto flex items-center gap-3">
                  {/* Mute/Unmute audio button */}
                  <button
                    type="button"
                    aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                    onClick={toggleMute}
                    className="w-14 h-14 bg-[#211747]/85 hover:bg-[#D5FF3F] hover:text-[#211747] text-[#F3EBDD] rounded-full flex items-center justify-center transition-colors duration-300 border border-[#B9A1F7]/30 backdrop-blur-md shadow-lg"
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
                    className="w-14 h-14 bg-[#211747]/85 hover:bg-[#D5FF3F] hover:text-[#211747] text-[#F3EBDD] rounded-full flex items-center justify-center transition-colors duration-300 border border-[#B9A1F7]/30 backdrop-blur-md shadow-lg"
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
  );
};
