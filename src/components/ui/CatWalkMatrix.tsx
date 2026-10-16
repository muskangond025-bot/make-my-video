"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";

interface CatWalkMatrixProps {
  className?: string;
  brandText?: string;
  showControls?: boolean;
}

const TOTAL_FRAMES = 16;

export const CatWalkMatrix: React.FC<CatWalkMatrixProps> = ({
  className = "",
  brandText = "mowl",
  showControls = false,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const [mode, setMode] = useState<"matrix" | "halftone" | "glow">("matrix");
  const [framesLoaded, setFramesLoaded] = useState(false);
  const [mousePos, setMousePos] = useState<{ x: number; y: number; active: boolean }>({
    x: -999,
    y: -999,
    active: false,
  });

  // Pre-load all 16 authentic video frames
  const frameImagesRef = useRef<HTMLImageElement[]>([]);
  const frameDataRef = useRef<ImageData[]>([]);

  useEffect(() => {
    let isCancelled = false;
    const images: HTMLImageElement[] = [];
    const sampleCanvas = document.createElement("canvas");
    sampleCanvas.width = 360;
    sampleCanvas.height = 206;
    const sampleCtx = sampleCanvas.getContext("2d", { willReadFrequently: true });

    let loadedCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      img.crossOrigin = "anonymous";
      img.src = `/images/cat_walk/frame_${i}.png`;

      img.onload = () => {
        if (isCancelled) return;
        loadedCount++;

        if (sampleCtx) {
          sampleCtx.clearRect(0, 0, 360, 206);
          sampleCtx.drawImage(img, 0, 0, 360, 206);
          try {
            frameDataRef.current[i] = sampleCtx.getImageData(0, 0, 360, 206);
          } catch {
            // fallback
          }
        }

        if (loadedCount === TOTAL_FRAMES) {
          frameImagesRef.current = images;
          setFramesLoaded(true);
        }
      };

      images.push(img);
    }

    return () => {
      isCancelled = true;
    };
  }, []);

  // Main Canvas Render Loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const startTime = performance.now();

    // Offscreen canvas for typography rasterization
    const textCanvas = document.createElement("canvas");
    const textCtx = textCanvas.getContext("2d");

    const resize = () => {
      if (!canvas || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      const displayWidth = Math.max(rect.width, 320);
      // Keep exact aspect ratio matching the reference
      const displayHeight = Math.min(Math.max(displayWidth * 0.38, 200), 380);

      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;

      ctx.scale(dpr, dpr);

      // Render brand typography ("mowl") on offscreen canvas
      textCanvas.width = displayWidth;
      textCanvas.height = displayHeight;
      if (textCtx) {
        textCtx.fillStyle = "#000000";
        textCtx.fillRect(0, 0, displayWidth, displayHeight);

        const baselineY = displayHeight * 0.76;
        const fontSize = Math.floor(displayHeight * 0.52);

        textCtx.font = `900 ${fontSize}px "Inter", "Outfit", "Arial Black", system-ui, -apple-system, sans-serif`;
        textCtx.textAlign = "left";
        textCtx.textBaseline = "alphabetic";
        textCtx.fillStyle = "#FFFFFF";

        // Position: "mowl" spans across the screen starting at ~14%
        const textX = displayWidth * 0.14;
        textCtx.fillText(brandText, textX, baselineY - 2);
      }
    };

    resize();
    window.addEventListener("resize", resize);

    // Render loop
    const render = (now: number) => {
      const elapsed = (now - startTime) * 0.001; // seconds

      const rect = containerRef.current?.getBoundingClientRect();
      const width = rect?.width || 800;
      const height = Math.min(Math.max(width * 0.38, 200), 380);

      ctx.clearRect(0, 0, width, height);

      // Deep dark background
      ctx.fillStyle = "#08080C";
      ctx.fillRect(0, 0, width, height);

      // Grid settings: tightly spaced dots for authentic retro-halftone resolution
      const spacing = width > 768 ? 7.5 : 6;
      const baseRadius = width > 768 ? 2.1 : 1.6;
      const cols = Math.floor(width / spacing);
      const rows = Math.floor(height / spacing);

      const baselineY = height * 0.76;
      const baselineRow = Math.floor(baselineY / spacing);

      // Halftone Moon (upper-right behind 'w' and 'l')
      const moonCenterX = width * 0.77;
      const moonCenterY = baselineY - height * 0.38;
      const moonRadius = height * 0.44;

      // Cat position: Left side over the 'm'
      // Cat width and height proportional to actual 360x206 aspect ratio (1.75 : 1)
      const catWidth = height * 0.58;
      const catHeight = catWidth * (206 / 360);
      const catCenterX = width * 0.28;
      const catLeft = catCenterX - catWidth * 0.5;
      const catRight = catCenterX + catWidth * 0.5;
      const catBottom = baselineY;
      const catTop = catBottom - catHeight;

      // Sample typography data from offscreen text canvas
      let textData: ImageData | null = null;
      if (textCtx && textCanvas.width > 0 && textCanvas.height > 0) {
        try {
          textData = textCtx.getImageData(0, 0, textCanvas.width, textCanvas.height);
        } catch {
          textData = null;
        }
      }

      // Current walk cycle frame from authentic 16-frame loop
      // 13.3 frames per second = ~1.2s per complete smooth walk stride
      const frameIndex = Math.floor((elapsed * 13.3) % TOTAL_FRAMES);
      const activeFrameData = frameDataRef.current[frameIndex];

      // Mouse distance tracking
      let mouseDist = 999;

      // Render Matrix Grid
      for (let r = 0; r < rows; r++) {
        const y = r * spacing + spacing * 0.5;

        for (let c = 0; c < cols; c++) {
          const x = c * spacing + spacing * 0.5;

          let isCatForeground = false;
          let isCatBackgroundLeg = false;
          let isText = false;
          let isMoon = false;
          const isBaseline = r === baselineRow;

          let dotColor = "";
          let dotRadius = baseRadius;
          let dotAlpha = 1;

          // 1. Check Cat Silhouette using exact frame data
          if (activeFrameData && x >= catLeft && x <= catRight && y >= catTop && y <= catBottom) {
            const sampleX = Math.floor(((x - catLeft) / catWidth) * 360);
            const sampleY = Math.floor(((y - catTop) / catHeight) * 206);

            if (sampleX >= 0 && sampleX < 360 && sampleY >= 0 && sampleY < 206) {
              const pIdx = (sampleY * 360 + sampleX) * 4;
              const rVal = activeFrameData.data[pIdx];
              const gVal = activeFrameData.data[pIdx + 1];
              const bVal = activeFrameData.data[pIdx + 2];
              const brightness = (rVal + gVal + bVal) / 3;

              if (brightness > 140) {
                // Foreground pure white cat body & legs
                isCatForeground = true;
              } else if (brightness > 45) {
                // Translucent background leg / edge shading
                isCatBackgroundLeg = true;
              }
            }
          }

          // 2. Check Typography (Letters "mowl") if not inside foreground cat
          if (!isCatForeground && textData) {
            const px = Math.floor(x);
            const py = Math.floor(y);
            if (px >= 0 && px < textCanvas.width && py >= 0 && py < textCanvas.height) {
              const idx = (py * textCanvas.width + px) * 4;
              if (textData.data[idx] > 120) {
                isText = true;
              }
            }
          }

          // 3. Check Halftone Moon (Behind right letters)
          if (!isCatForeground && y <= baselineY + 2) {
            const distToMoon = Math.hypot(x - moonCenterX, y - moonCenterY);
            if (distToMoon <= moonRadius) {
              const normDist = distToMoon / moonRadius;
              // Authentic halftone circular screening
              const threshold = 0.88 - normDist * 0.45;
              if (Math.random() < threshold || (c + r) % 2 === 0) {
                isMoon = true;
                dotRadius = baseRadius * (1.1 - normDist * 0.45);
              }
            }
          }

          // 4. Mouse Interactive Distance
          if (mousePos.active) {
            mouseDist = Math.hypot(x - mousePos.x, y - mousePos.y);
          }

          // Determine dot style
          if (isCatForeground) {
            // Authentic Pure White Dot Matrix Cat
            dotColor = mode === "glow" ? "#C7D2FE" : "#FFFFFF";
            dotRadius = baseRadius * 1.15;
            dotAlpha = 1.0;
          } else if (isCatBackgroundLeg) {
            // Background Legs: soft lavender / periwinkle
            dotColor = "#818CF8";
            dotRadius = baseRadius * 0.95;
            dotAlpha = 0.75;
          } else if (isText) {
            // "mowl" Brand Typography: Crosshatch Periwinkle
            const isTextChecker = (c + r) % 2 === 0;
            if (isTextChecker || mode !== "matrix") {
              dotColor = "#7888DB"; // Lavender periwinkle
              dotRadius = baseRadius * 1.05;
              dotAlpha = 0.95;
            } else {
              dotColor = "#4E5C9E";
              dotRadius = baseRadius * 0.7;
              dotAlpha = 0.65;
            }
          } else if (isMoon) {
            // Halftone Moon Glow
            dotColor = "#5666A6";
            dotAlpha = 0.55;
          } else if (isBaseline) {
            // Dotted Ground Line
            if (c % 2 === 0) {
              dotColor = "#3E497A";
              dotRadius = baseRadius * 0.85;
              dotAlpha = 0.65;
            } else {
              continue;
            }
          } else {
            // Ambient interactive aura on hover
            if (mouseDist < 100) {
              const aura = 1 - mouseDist / 100;
              dotColor = "#6366F1";
              dotRadius = baseRadius * (0.6 + aura * 0.6);
              dotAlpha = aura * 0.35;
            } else {
              continue;
            }
          }

          // Interactive ripple expansion
          if (mouseDist < 70) {
            const push = (1 - mouseDist / 70) * 1.5;
            dotRadius = Math.max(0.5, dotRadius + push);
          }

          // Draw circular matrix dot
          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.6, dotRadius), 0, Math.PI * 2);
          ctx.globalAlpha = Math.max(0, Math.min(1, dotAlpha));
          ctx.fillStyle = dotColor;
          ctx.fill();
        }
      }

      ctx.globalAlpha = 1;
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", resize);
    };
  }, [brandText, mode, mousePos, framesLoaded]);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      active: true,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos((prev) => ({ ...prev, active: false }));
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative w-full flex flex-col items-center justify-center select-none overflow-hidden ${className}`}
    >
      {/* Main Halftone Matrix Canvas */}
      <div className="relative w-full max-w-[960px] mx-auto flex items-center justify-center">
        <canvas
          ref={canvasRef}
          className="block w-full h-auto cursor-crosshair transition-opacity duration-300"
          style={{ imageRendering: "pixelated" }}
        />

        {/* Ambient subtle vignette */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[#08080C] via-transparent to-[#08080C]/40" />
      </div>

      {/* Optional Mode Controls */}
      {showControls && (
        <div className="mt-3 flex items-center gap-1.5 bg-zinc-900/80 border border-zinc-800/80 rounded-full px-3 py-1 text-xs text-zinc-400">
          <button
            onClick={() => setMode("matrix")}
            className={`px-2 py-0.5 rounded-full transition-all ${
              mode === "matrix" ? "bg-zinc-700 text-white font-medium" : "hover:text-zinc-200"
            }`}
          >
            Matrix
          </button>
          <button
            onClick={() => setMode("halftone")}
            className={`px-2 py-0.5 rounded-full transition-all ${
              mode === "halftone" ? "bg-zinc-700 text-white font-medium" : "hover:text-zinc-200"
            }`}
          >
            Halftone
          </button>
          <button
            onClick={() => setMode("glow")}
            className={`px-2 py-0.5 rounded-full transition-all ${
              mode === "glow" ? "bg-zinc-700 text-white font-medium" : "hover:text-zinc-200"
            }`}
          >
            Glow
          </button>
        </div>
      )}
    </div>
  );
};
