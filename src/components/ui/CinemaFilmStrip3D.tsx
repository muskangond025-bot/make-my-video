"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinemaFilmStrip3DProps {
  className?: string;
  speed?: number;
}

const TRUSTED_COMPANIES = [
  { name: "CROMPTON GREAVES", tag: "CONSUMER ELECTRICALS", src: "/logos/crompton.jpg" },
  { name: "MOTILAL OSWAL", tag: "INVESTMENT & WEALTH", src: "/logos/motilal.jpg" },
  { name: "PIPAL TREE", tag: "SUSTAINABLE VENTURES", src: "/logos/pipaltree.jpg" },
  { name: "DECCAN DEV SOCIETY", tag: "AGRICULTURE & NGO", src: "/logos/deccan.jpg" },
  { name: "BAYBOT", tag: "SMART ROBOTICS & IOT", src: "/logos/baybot.jpg" },
  { name: "DIPTTII KHANNA", tag: "LUXURY INTERIORS", src: "/logos/dipttii.jpg" },
  { name: "ADITYA BIRLA", tag: "ENTERPRISE CAPITAL", src: "/logos/adityabirla.jpg" },
  { name: "CIPLA", tag: "HEALTHCARE GLOBAL", src: "/logos/cipla.jpg" },
];

export const CinemaFilmStrip3D: React.FC<CinemaFilmStrip3DProps> = ({
  className = "",
  speed = 1.0,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // -------------------------------------------------------------
    // 1. SCENE, CAMERA, RENDERER
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 240;

    const camera = new THREE.PerspectiveCamera(30, width / height, 0.1, 100);
    camera.position.set(0, 0, 7.8);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;

    // -------------------------------------------------------------
    // 2. STUDIO LIGHTING SETUP
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.25);
    scene.add(ambientLight);

    // Warm Key Light (Glossy celluloid specular sheen)
    const keyLight = new THREE.DirectionalLight(0xfff8f0, 2.2);
    keyLight.position.set(4, 6, 6);
    scene.add(keyLight);

    // Cool Specular Rim Light (Highlights on sprocket holes & edges)
    const rimLight = new THREE.DirectionalLight(0x7ea8ff, 1.8);
    rimLight.position.set(-6, 3, -3);
    scene.add(rimLight);

    // Soft fill from below
    const fillLight = new THREE.DirectionalLight(0xf0f2f8, 0.8);
    fillLight.position.set(0, -4, 4);
    scene.add(fillLight);

    // -------------------------------------------------------------
    // 3. PROCEDURAL 35MM FILMSTRIP WITH TRUSTED COMPANY LOGOS
    // -------------------------------------------------------------
    const texW = 4096;
    const texH = 512;
    const texCanvas = document.createElement("canvas");
    texCanvas.width = texW;
    texCanvas.height = texH;
    const ctx = texCanvas.getContext("2d");

    const texture = new THREE.CanvasTexture(texCanvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.ClampToEdgeWrapping;
    texture.repeat.set(1, 1);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = 4;

    const frameCount = TRUSTED_COMPANIES.length;
    const frameW = texW / frameCount; // 512px per frame

    // Preload all 8 client company logo images
    const loadedImages: (HTMLImageElement | null)[] = new Array(frameCount).fill(null);

    const drawAllFrames = () => {
      if (!ctx) return;

      // Deep obsidian black celluloid base
      ctx.fillStyle = "#0B0C0E";
      ctx.fillRect(0, 0, texW, texH);

      // Perforation parameters (KS-1870 35mm cinema standard: 4 sprockets per frame)
      const sprocketsPerFrame = 4;
      const totalSprockets = frameCount * sprocketsPerFrame;
      const spw = 26; // sprocket hole width
      const sph = 38; // sprocket hole height
      const spStep = texW / totalSprockets;

      // Draw Top & Bottom Sprocket Perforations (Rounded White Cutouts with crisp border)
      for (let i = 0; i < totalSprockets; i++) {
        const cx = i * spStep + spStep * 0.5;

        // Top sprocket hole
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(cx - spw * 0.5, 14, spw, sph, 6);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();

        // Bottom sprocket hole
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(cx - spw * 0.5, texH - 14 - sph, spw, sph, 6);
        ctx.fill();

        ctx.strokeStyle = "rgba(0, 0, 0, 0.6)";
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      // Digital Optical Audio & Timecode Sync Bar between sprockets and frames
      // Top optical sound track
      ctx.fillStyle = "#181A20";
      ctx.fillRect(0, 58, texW, 22);

      // Bottom optical sound track
      ctx.fillStyle = "#181A20";
      ctx.fillRect(0, 432, texW, 22);

      // Optical audio waveform dots and binary timecode dashes
      ctx.fillStyle = "rgba(255, 255, 255, 0.7)";
      for (let x = 0; x < texW; x += 12) {
        // Top barcode dashes
        const dashH = ((x * 17) % 13) + 4;
        ctx.fillRect(x, 60 + (20 - dashH) * 0.5, 3.5, dashH);

        // Bottom timecode dots
        ctx.fillRect(x, 438, 4, 3);
        if (x % 36 === 0) {
          ctx.fillRect(x + 5, 444, 12, 3);
        }
      }

      // Latent Film Edge Monospace Markings
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.font = "bold 13px 'Courier New', monospace";
      for (let f = 0; f < frameCount; f++) {
        const fx = f * frameW;
        ctx.fillText(`KODAK 5219 · 35MM · FRAME 0${f + 1}`, fx + 32, 74);
        ctx.fillText(`SYNC TC  24.00 FPS · [COMMERCIAL]`, fx + 32, 448);
      }

      // Draw the 8 Company Frames
      TRUSTED_COMPANIES.forEach((company, fIdx) => {
        const fx = fIdx * frameW;
        const padX = 14;
        const frameX = fx + padX;
        const frameY = 86;
        const frameBoxW = frameW - padX * 2;
        const frameBoxH = 340;

        // Solid White Sketch Frame (matching user reference image)
        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.roundRect(frameX, frameY, frameBoxW, frameBoxH, 14);
        ctx.fill();

        // Architectural ink frame border
        ctx.strokeStyle = "#111215";
        ctx.lineWidth = 3.5;
        ctx.stroke();

        // Inner safe-area guidelines
        ctx.strokeStyle = "rgba(17, 18, 21, 0.12)";
        ctx.lineWidth = 1;
        ctx.strokeRect(frameX + 16, frameY + 16, frameBoxW - 32, frameBoxH - 32);

        // Top Frame Metadata Bar
        ctx.fillStyle = "#111215";
        ctx.font = "bold 15px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
        ctx.fillText(company.name, frameX + 22, frameY + 38);

        ctx.fillStyle = "rgba(17, 18, 21, 0.6)";
        ctx.font = "bold 11px 'Courier New', monospace";
        ctx.textAlign = "right";
        ctx.fillText(company.tag, frameX + frameBoxW - 22, frameY + 38);
        ctx.textAlign = "left";

        // Center Area for Company Logo
        const cx = frameX + frameBoxW * 0.5;
        const cy = frameY + frameBoxH * 0.5 + 4;
        const maxW = frameBoxW - 64;
        const maxH = 195;

        const img = loadedImages[fIdx];
        if (img && img.complete && img.naturalWidth > 0) {
          // Calculate contained aspect ratio
          const scale = Math.min(maxW / img.naturalWidth, maxH / img.naturalHeight);
          const drawW = img.naturalWidth * scale;
          const drawH = img.naturalHeight * scale;

          ctx.drawImage(img, cx - drawW * 0.5, cy - drawH * 0.5, drawW, drawH);
        } else {
          // Elegant placeholder while loading
          ctx.strokeStyle = "#111215";
          ctx.lineWidth = 2;
          ctx.strokeRect(cx - 90, cy - 40, 180, 80);

          ctx.fillStyle = "#111215";
          ctx.font = "bold 18px 'Courier New', monospace";
          ctx.textAlign = "center";
          ctx.fillText(company.name, cx, cy + 6);
          ctx.textAlign = "left";
        }

        // Bottom Technical Stamp
        ctx.fillStyle = "rgba(17, 18, 21, 0.5)";
        ctx.font = "9px 'Courier New', monospace";
        ctx.fillText(`CLIENT // TAKE 0${fIdx + 1}`, frameX + 22, frameY + frameBoxH - 18);
        ctx.textAlign = "right";
        ctx.fillText(`[ VERIFIED 4K ]`, frameX + frameBoxW - 22, frameY + frameBoxH - 18);
        ctx.textAlign = "left";
      });
    };

    // Initial draw
    drawAllFrames();
    texture.needsUpdate = true;

    // Load each logo image and update canvas when ready
    TRUSTED_COMPANIES.forEach((company, idx) => {
      const img = new Image();
      img.src = company.src;
      img.onload = () => {
        loadedImages[idx] = img;
        drawAllFrames();
        texture.needsUpdate = true;
      };
    });

    // -------------------------------------------------------------
    // 4. STRAIGHT HORIZONTAL 35MM FILM RIBBON (No tilt, zero rotation)
    // -------------------------------------------------------------
    const ribbonW = 28;
    const ribbonH = 3.5;
    const ribbonGeo = new THREE.PlaneGeometry(ribbonW, ribbonH, 1, 1);

    const filmMaterial = new THREE.MeshStandardMaterial({
      map: texture,
      roughness: 0.28,
      metalness: 0.08,
      side: THREE.DoubleSide,
    });

    const filmMesh = new THREE.Mesh(ribbonGeo, filmMaterial);
    // Completely straight in plane, zero rotation
    filmMesh.position.set(0, 0, 0);
    filmMesh.rotation.set(0, 0, 0);
    scene.add(filmMesh);

    // Soft Ambient Drop Shadow Directly Below Straight Film Ribbon
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 32;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 16, 0, 128, 16, 128);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.22)");
      grad.addColorStop(0.5, "rgba(0, 0, 0, 0.06)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 32);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(28, 1.0);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -1.82, -0.05);
    shadowMesh.rotation.x = -Math.PI * 0.5;
    scene.add(shadowMesh);

    // -------------------------------------------------------------
    // 5. STRAIGHT MARQUEE ANIMATION LOOP (Paused when off-screen)
    // -------------------------------------------------------------
    let animId = 0;
    let isVisible = false;
    let isDisposed = false;

    const animate = () => {
      if (!isVisible || isDisposed) return;
      animId = requestAnimationFrame(animate);

      // Continuous Straight Marquee Scrolling Movement
      texture.offset.x += 0.00075 * speed;

      renderer.render(scene, camera);
    };

    const startMarquee = () => {
      if (!isVisible && !isDisposed) {
        isVisible = true;
        animId = requestAnimationFrame(animate);
      }
    };

    const stopMarquee = () => {
      isVisible = false;
      cancelAnimationFrame(animId);
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startMarquee();
        } else {
          stopMarquee();
        }
      },
      { rootMargin: "250px 0px" }
    );
    intersectionObserver.observe(container);

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
      if (isVisible) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      stopMarquee();
      intersectionObserver.disconnect();
      window.removeEventListener("resize", handleResize);
      texture.dispose();
      filmMaterial.dispose();
      renderer.dispose();
    };
  }, [speed]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-[180px] sm:h-[220px] md:h-[250px] overflow-hidden select-none ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
