"use client";
import React, { useEffect, useRef, useState } from 'react';
import { gsap } from '@/lib/gsap';

export const CodeBuilder = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const codeBoxRef = useRef<HTMLDivElement>(null);
  const uiElementsRef = useRef<(HTMLElement | null)[]>([]);

  // We will simulate real-time typing
  const [typedCode, setTypedCode] = useState("");
  const codeString = `<div className="flex flex-col gap-4">\n  <Header title="Premium Setup" />\n  <Card blur="xl" glass={true}>\n    <Button variant="aurora" />\n  </Card>\n</div>`;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setTypedCode(codeString.substring(0, index));
      index++;
      if (index > codeString.length) clearInterval(interval);
    }, 50); // fast typing speed
    
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (!containerRef.current) return;

    let ctx = gsap.context(() => {
      
      // Ambient floating for the UI preview elements
      uiElementsRef.current.forEach((el, i) => {
        if (!el) return;
        gsap.to(el, {
          y: i % 2 === 0 ? -10 : 10,
          rotationZ: i % 2 === 0 ? 1 : -1,
          duration: 3 + i,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          pin: pinRef.current,
          start: "top top",
          end: "+=2000",
          scrub: 1,
        }
      });

      // UI Reveal Steps synchronized with scroll
      for (let i = 0; i < 4; i++) {
        tl.fromTo(uiElementsRef.current[i], 
          { opacity: 0, scale: 0.8, y: 50 },
          { opacity: 1, scale: 1, y: 0, duration: 1, ease: "back.out(1.5)" }, 
          i * 1.5
        );
      }
      
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen border-t border-black/5 bg-background" style={{ perspective: "1000px" }}>
      <div ref={pinRef} className="w-full h-full flex items-center justify-center overflow-hidden relative">
        <div className="absolute top-12 left-12">
          <h3 className="text-sm uppercase tracking-[0.2em] text-white/50 font-bold">Interactive Build</h3>
        </div>

      <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-12 px-12 h-[70vh]">
        
        {/* Left Side: Code Editor with continuous scanline */}
        <div ref={codeBoxRef} className="bg-background border border-black/10 rounded-2xl p-8 font-mono text-sm leading-loose shadow-2xl flex flex-col relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
          
          {/* Continuous Scanning Laser */}
          <div className="absolute left-0 w-full h-1 bg-blue-500/50 shadow-[0_0_20px_rgba(59,130,246,0.8)] animate-[ping_4s_linear_infinite]" style={{ top: "10%" }} />
          
          <div className="flex gap-2 mb-8 absolute top-6 left-6">
            <div className="w-3 h-3 rounded-full bg-red-500/50" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
            <div className="w-3 h-3 rounded-full bg-green-500/50" />
          </div>
          
          <div className="mt-12 text-blue-300 whitespace-pre">
            {typedCode}
            <span className="inline-block w-2 h-4 bg-background/50 ml-1 animate-pulse" />
          </div>
        </div>

        {/* Right Side: UI Preview */}
        <div className="relative bg-background/5 border border-black/5 rounded-2xl flex flex-col items-center justify-center p-12 overflow-visible bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/10 via-transparent to-transparent" style={{ transformStyle: "preserve-3d" }}>
          
          {/* Step 0: Container */}
          <div 
            ref={el => { uiElementsRef.current[0] = el; }}
            className="w-full h-full border-2 border-dashed border-black/20 rounded-xl p-8 flex flex-col gap-8 shadow-2xl bg-black/50 backdrop-blur-sm"
            style={{ transform: "translateZ(20px)" }}
          >
            {/* Step 1: Header */}
            <div 
              ref={el => { uiElementsRef.current[1] = el; }}
              className="text-2xl font-semibold bg-background/10 p-4 rounded-lg border border-black/5 text-center"
              style={{ transform: "translateZ(40px)" }}
            >
              Premium Setup
            </div>

            {/* Step 2: Glass Card */}
            <div 
              ref={el => { uiElementsRef.current[2] = el; }}
              className="flex-1 bg-background/10 backdrop-blur-3xl border border-black/20 rounded-2xl p-8 flex items-end shadow-[0_30px_60px_rgba(0,0,0,0.5)]"
              style={{ transform: "translateZ(60px)" }}
            >
              {/* Step 3: Aurora Button */}
              <button 
                ref={el => { uiElementsRef.current[3] = el; }}
                className="w-full py-4 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-red-500 font-bold tracking-widest uppercase shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_50px_rgba(168,85,247,0.8)] transition-all duration-300"
                style={{ transform: "translateZ(80px)" }}
              >
                Initialize
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
);
};
