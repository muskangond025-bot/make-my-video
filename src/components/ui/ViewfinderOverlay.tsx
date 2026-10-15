"use client";

import React, { useEffect, useState } from "react";

export const ViewfinderOverlay: React.FC = () => {
  const [frame, setFrame] = useState(0);

  // Live ticking timecode at 24 FPS
  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev + 1) % (24 * 60));
    }, 1000 / 24);
    return () => clearInterval(interval);
  }, []);

  const seconds = Math.floor(frame / 24) % 60;
  const minutes = Math.floor(frame / (24 * 60));
  const frames = frame % 24;
  const timecode = `00:${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}:${String(frames).padStart(2, "0")}`;

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none text-[#211747] font-mono overflow-hidden z-20">
      {/* 1. 2.39:1 CINEMASCOPE SAFE FRAME GUIDES */}
      <div className="absolute inset-x-6 md:inset-x-12 inset-y-6 md:inset-y-10 border border-[#211747]/25 pointer-events-none">
        {/* Top-Left Corner Bracket */}
        <div className="absolute -top-1 -left-1 w-8 h-8 border-t-2 border-l-2 border-[#211747]" />
        {/* Top-Right Corner Bracket */}
        <div className="absolute -top-1 -right-1 w-8 h-8 border-t-2 border-r-2 border-[#211747]" />
        {/* Bottom-Left Corner Bracket */}
        <div className="absolute -bottom-1 -left-1 w-8 h-8 border-b-2 border-l-2 border-[#211747]" />
        {/* Bottom-Right Corner Bracket */}
        <div className="absolute -bottom-1 -right-1 w-8 h-8 border-b-2 border-r-2 border-[#211747]" />

        {/* Center Crosshair Reticle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 pointer-events-none opacity-40">
          <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-[#211747] -translate-y-1/2" />
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-[#211747] -translate-x-1/2" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-[#211747]" />
        </div>

        {/* 16:9 Inner Framing Tick Marks */}
        <div className="absolute top-0 left-1/4 w-[1px] h-3 bg-[#211747]/30" />
        <div className="absolute top-0 right-1/4 w-[1px] h-3 bg-[#211747]/30" />
        <div className="absolute bottom-0 left-1/4 w-[1px] h-3 bg-[#211747]/30" />
        <div className="absolute bottom-0 right-1/4 w-[1px] h-3 bg-[#211747]/30" />
        <div className="absolute left-0 top-1/2 h-[1px] w-3 bg-[#211747]/30 -translate-y-1/2" />
        <div className="absolute right-0 top-1/2 h-[1px] w-3 bg-[#211747]/30 -translate-y-1/2" />
      </div>

      {/* 2. TOP TECHNICAL OSD BAR */}
      <div className="absolute top-8 md:top-12 inset-x-8 md:inset-x-16 flex justify-between items-center text-[11px] md:text-xs tracking-wider">
        {/* Left: REC Indicator + Timecode */}
        <div className="flex items-center gap-3 bg-[#211747]/8 px-3.5 py-1.5 rounded-full border border-[#211747]/15 backdrop-blur-md">
          <span className="w-2.5 h-2.5 rounded-full bg-[#D5FF3F] animate-pulse shadow-[0_0_8px_rgba(213,255,63,0.8)]" />
          <span className="font-bold tracking-widest text-[#211747]">REC</span>
          <span className="text-[#6B6478]">•</span>
          <span className="font-mono text-[#211747] font-semibold">{timecode}</span>
        </div>

        {/* Center: Camera Model / Title */}
        <div className="hidden sm:flex items-center gap-2 text-[#6B6478] text-[10px] tracking-[0.25em] uppercase font-semibold">
          <span>ARRI ALEXA 35</span>
          <span>•</span>
          <span className="text-[#211747]">MAKE MY VID</span>
        </div>

        {/* Right: Technical Codecs & FPS */}
        <div className="flex items-center gap-2 bg-[#211747]/8 px-3.5 py-1.5 rounded-full border border-[#211747]/15 text-[#211747] font-medium backdrop-blur-md">
          <span className="text-[#211747] font-bold">24.000 FPS</span>
          <span className="text-[#6B6478]">•</span>
          <span className="text-[#6B6478]">4K PRORES 4444</span>
        </div>
      </div>

      {/* 3. SIDE GAUGES (Left: Exposure Index, Right: Audio VU Meters) */}
      {/* Left: Exposure / EV Ladder */}
      <div className="hidden lg:flex absolute left-8 md:left-14 top-1/2 -translate-y-1/2 flex-col items-center gap-3 text-[10px] text-[#6B6478]">
        <span>+2</span>
        <div className="w-3 h-[1px] bg-[#211747]/20" />
        <span>+1</span>
        <div className="w-4 h-[1px] bg-[#211747]/40" />
        <span className="text-[#211747] font-bold">0.0</span>
        <div className="w-4 h-[1px] bg-[#211747]/40" />
        <span>-1</span>
        <div className="w-3 h-[1px] bg-[#211747]/20" />
        <span>-2</span>
      </div>

      {/* Right: Audio Level Peak Meters */}
      <div className="hidden lg:flex absolute right-8 md:right-14 top-1/2 -translate-y-1/2 flex-col items-center gap-1.5 text-[9px] text-[#6B6478]">
        <span className="text-[8px] uppercase tracking-widest text-[#6B6478] mb-1">CH 1/2</span>
        <div className="flex gap-1 h-20 items-end bg-[#211747]/8 p-1 rounded border border-[#211747]/15">
          <div className="w-1.5 bg-[#D5FF3F] rounded-sm animate-pulse" style={{ height: "68%" }} />
          <div className="w-1.5 bg-[#D5FF3F] rounded-sm animate-pulse" style={{ height: "74%" }} />
        </div>
        <span className="text-[#6B6478] font-mono mt-1">-12dB</span>
      </div>

      {/* 4. BOTTOM CINEMATOGRAPHY METADATA BAR */}
      <div className="absolute bottom-8 md:bottom-12 inset-x-8 md:inset-x-16 flex justify-between items-center text-[10px] md:text-[11px] text-[#6B6478] tracking-wider">
        {/* Left: Lens & Shutter Data */}
        <div className="flex items-center gap-3 bg-[#211747]/8 px-3.5 py-1.5 rounded-full border border-[#211747]/15 backdrop-blur-md">
          <span>SHUTTER <strong className="text-[#211747]">180°</strong></span>
          <span className="text-[#6B6478]">•</span>
          <span>IRIS <strong className="text-[#211747]">T2.8</strong></span>
          <span className="text-[#6B6478]">•</span>
          <span>ISO <strong className="text-[#211747]">800</strong></span>
        </div>

        {/* Center: Aspect Ratio & Resolution */}
        <div className="hidden md:flex items-center gap-2 text-[#6B6478] text-[10px] tracking-[0.2em] uppercase">
          <span>2.39:1 ANAMORPHIC</span>
          <span>•</span>
          <span>WHITE BALANCE 5600K</span>
        </div>

        {/* Right: Power & Card Media Status */}
        <div className="flex items-center gap-3 bg-[#211747]/8 px-3.5 py-1.5 rounded-full border border-[#211747]/15 backdrop-blur-md">
          <span>BAT <strong className="text-[#211747]">98%</strong></span>
          <span className="text-[#6B6478]">•</span>
          <span>CARD <strong className="text-[#211747]">512GB [RAW]</strong></span>
        </div>
      </div>
    </div>
  );
};
