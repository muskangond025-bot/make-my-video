"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { Volume2, VolumeX, RotateCcw, Compass, ArrowUpRight, Play, Film, Sparkles, CheckCircle2 } from "lucide-react";

interface ReelItem {
  id: string;
  title: string;
  category: string;
  src: string;
  duration: string;
  iso: string;
  shutter: string;
  aperture: string;
}

const REELS: ReelItem[] = [
  {
    id: "reel-1",
    title: "Luxury Architectural Estate",
    category: "Architecture",
    src: "/videos/hero-reel.mp4",
    duration: "00:14:28:12",
    iso: "ISO 400",
    shutter: "1/50s",
    aperture: "f/1.8",
  },
  {
    id: "reel-2",
    title: "High-End Automotive & Brand",
    category: "Commercial",
    src: "/videos/hero-reel-2.mp4",
    duration: "00:08:44:03",
    iso: "ISO 800",
    shutter: "1/100s",
    aperture: "f/2.8",
  },
  {
    id: "reel-3",
    title: "Cinematic FPV & Aerial Motion",
    category: "Aerial FPV",
    src: "/videos/hero-reel-3.mp4",
    duration: "00:19:35:18",
    iso: "ISO 320",
    shutter: "1/60s",
    aperture: "f/2.0",
  },
];

export const CameraHero3D: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const hudCanvasRef = useRef<HTMLCanvasElement | null>(null);

  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const [isOrbitMode, setIsOrbitMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadProgress, setLoadProgress] = useState(0);

  // Mouse & interaction state refs for 60FPS lerp without triggering re-renders
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0 });
  const orbitAngleRef = useRef({ yaw: Math.PI, pitch: 0 });

  const activeReel = REELS[activeReelIndex];

  // --------------------------------------------------------------------------
  // Video Source Management
  // --------------------------------------------------------------------------
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.src = activeReel.src;
    video.muted = isMuted;
    video.load();
    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy fallback: ensure muted and retry
        video.muted = true;
        setIsMuted(true);
        video.play().catch(() => {});
      });
    }
  }, [activeReelIndex]);

  const toggleMute = () => {
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !video.muted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  // --------------------------------------------------------------------------
  // Main WebGL Scene Setup
  // --------------------------------------------------------------------------
  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    const video = videoRef.current;
    if (!container || !canvas || !video) return;

    let animationFrameId: number;
    let isDisposed = false;

    // 1. Offscreen 2D HUD Canvas
    const hudCanvas = document.createElement("canvas");
    hudCanvas.width = 1280;
    hudCanvas.height = 720;
    const hudCtx = hudCanvas.getContext("2d");
    hudCanvasRef.current = hudCanvas;

    const screenTexture = new THREE.CanvasTexture(hudCanvas);
    screenTexture.colorSpace = THREE.SRGBColorSpace;
    screenTexture.minFilter = THREE.LinearFilter;
    screenTexture.magFilter = THREE.LinearFilter;

    // 2. Three.js Scene & Camera
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5.2);

    // 3. Renderer with ACES Filmic Tone Mapping & High Quality
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.25;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // 4. Lighting Rig (Cinema Studio with Dual Rim Kicker & Amber Fill)
    const ambientLight = new THREE.AmbientLight(0x131620, 1.4);
    scene.add(ambientLight);

    // Key Light: warm directional key highlighting magnesium chassis bevels
    const keyLight = new THREE.DirectionalLight(0xfff1e0, 3.2);
    keyLight.position.set(5, 6, 4);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Titanium Rim Light (Edge kicker for high-end cinematic contour)
    const rimLight = new THREE.DirectionalLight(0x78abff, 4.2);
    rimLight.position.set(-6, 2.5, -4);
    scene.add(rimLight);

    // Subtle Champagne Front Accent Light (Glints on dials and lens glass)
    const champagneFill = new THREE.PointLight(0xe8b87d, 2.0, 12);
    champagneFill.position.set(2.5, -0.5, 3);
    scene.add(champagneFill);

    // Soft Undercarriage Fill
    const bottomBounce = new THREE.DirectionalLight(0x283042, 0.9);
    bottomBounce.position.set(0, -4, 2);
    scene.add(bottomBounce);

    // Ground Contact Shadow Plane
    const shadowGeo = new THREE.PlaneGeometry(12, 12);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.35 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = -2.1;
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 5. Camera Model Group
    const modelGroup = new THREE.Group();
    // Default hero position & orientation (rear facing user)
    modelGroup.position.set(0.65, -1.3, 0);
    modelGroup.rotation.set(0, Math.PI, 0);
    scene.add(modelGroup);

    // 6. Load Sony Alpha GLB Model
    const loader = new GLTFLoader();
    loader.load(
      "/models/sony9.glb",
      (gltf) => {
        if (isDisposed) return;

        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.name === "Plane") {
              // The LCD screen: map our dynamic HUD + Video texture
              mesh.material = new THREE.MeshBasicMaterial({
                map: screenTexture,
                toneMapped: false,
              });
            } else {
              // The camera body: enhance PBR material
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.roughness = 0.38;
                mat.metalness = 0.65;
                mat.envMapIntensity = 1.3;
              }
            }
          }
        });

        modelGroup.add(gltf.scene);
        setIsLoading(false);
      },
      (xhr) => {
        if (xhr.total > 0) {
          setLoadProgress(Math.round((xhr.loaded / xhr.total) * 100));
        }
      },
      (err) => {
        console.error("Error loading camera model:", err);
        setIsLoading(false);
      }
    );

    // 7. Render Loop with Viewfinder HUD Drawing & Spring Damping
    let frameCount = 0;
    const startTime = performance.now();

    const render = () => {
      if (isDisposed) return;

      frameCount++;
      const elapsed = (performance.now() - startTime) / 1000;

      // Draw offscreen HUD canvas
      if (hudCtx && video && video.readyState >= 2) {
        // 1. Draw live video frame
        hudCtx.drawImage(video, 0, 0, 1280, 720);

        // 2. Cinematic Viewfinder Overlays
        // Subtle film letterbox / safe area border
        hudCtx.strokeStyle = "rgba(255, 255, 255, 0.18)";
        hudCtx.lineWidth = 2;
        hudCtx.strokeRect(60, 45, 1160, 630);

        // Thin Rule-of-Thirds Grid
        hudCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
        hudCtx.lineWidth = 1;
        // Verticals
        hudCtx.beginPath();
        hudCtx.moveTo(446, 45);
        hudCtx.lineTo(446, 675);
        hudCtx.moveTo(833, 45);
        hudCtx.lineTo(833, 675);
        // Horizontals
        hudCtx.moveTo(60, 255);
        hudCtx.lineTo(1220, 255);
        hudCtx.moveTo(60, 465);
        hudCtx.lineTo(1220, 465);
        hudCtx.stroke();

        // Center Crosshair
        hudCtx.strokeStyle = "rgba(255, 255, 255, 0.4)";
        hudCtx.lineWidth = 1.5;
        const cx = 640;
        const cy = 360;
        hudCtx.beginPath();
        hudCtx.moveTo(cx - 20, cy);
        hudCtx.lineTo(cx + 20, cy);
        hudCtx.moveTo(cx, cy - 20);
        hudCtx.lineTo(cx, cy + 20);
        hudCtx.stroke();

        // Autofocus Brackets (Smooth pulse in emerald green)
        const pulse = 0.7 + 0.3 * Math.sin(elapsed * 4);
        hudCtx.strokeStyle = `rgba(50, 255, 130, ${pulse})`;
        hudCtx.lineWidth = 2;
        const bSize = 35;
        // Top-left bracket
        hudCtx.beginPath();
        hudCtx.moveTo(cx - bSize, cy - bSize + 10);
        hudCtx.lineTo(cx - bSize, cy - bSize);
        hudCtx.lineTo(cx - bSize + 10, cy - bSize);
        // Top-right
        hudCtx.moveTo(cx + bSize - 10, cy - bSize);
        hudCtx.lineTo(cx + bSize, cy - bSize);
        hudCtx.lineTo(cx + bSize, cy - bSize + 10);
        // Bottom-left
        hudCtx.moveTo(cx - bSize, cy + bSize - 10);
        hudCtx.lineTo(cx - bSize, cy + bSize);
        hudCtx.lineTo(cx - bSize + 10, cy + bSize);
        // Bottom-right
        hudCtx.moveTo(cx + bSize - 10, cy + bSize);
        hudCtx.lineTo(cx + bSize, cy + bSize);
        hudCtx.lineTo(cx + bSize, cy + bSize - 10);
        hudCtx.stroke();

        // TOP BAR: Rec Dot & Timecode
        hudCtx.font = "bold 20px 'Courier New', monospace";
        // Blinking red recording indicator
        const recBlink = Math.sin(elapsed * 5) > 0;
        if (recBlink) {
          hudCtx.fillStyle = "#FF283C";
          hudCtx.beginPath();
          hudCtx.arc(90, 75, 7, 0, Math.PI * 2);
          hudCtx.fill();
        }

        hudCtx.fillStyle = "#FFFFFF";
        hudCtx.fillText("REC", 108, 82);

        // Advancing Timecode (Formatted from video.currentTime)
        const cur = video.currentTime || 0;
        const hrs = String(Math.floor(cur / 3600)).padStart(2, "0");
        const mins = String(Math.floor((cur % 3600) / 60)).padStart(2, "0");
        const secs = String(Math.floor(cur % 60)).padStart(2, "0");
        const frames = String(Math.floor((cur % 1) * 60)).padStart(2, "0");
        const tcString = `TC ${hrs}:${mins}:${secs}:${frames}`;
        hudCtx.fillText(tcString, 175, 82);

        // TOP RIGHT: Format & Battery
        hudCtx.textAlign = "right";
        hudCtx.fillStyle = "#FFC83B";
        hudCtx.fillText("4K DCI · 60FPS · RAW 10-BIT", 1190, 82);
        hudCtx.textAlign = "left";

        // BOTTOM BAR: Exposure Specs
        hudCtx.fillStyle = "#FFFFFF";
        hudCtx.font = "bold 18px 'Courier New', monospace";
        hudCtx.fillText(`${activeReel.shutter}   ${activeReel.aperture}   ${activeReel.iso}   5600K   +0.0EV`, 90, 650);

        // BOTTOM RIGHT: Stereo Audio VU Meter Bars
        const vuBarX = 1100;
        const vuBarY = 635;
        // Left channel
        const vL = Math.min(1, 0.4 + 0.5 * Math.sin(elapsed * 9) * Math.cos(elapsed * 4));
        // Right channel
        const vR = Math.min(1, 0.35 + 0.45 * Math.sin(elapsed * 8) * Math.sin(elapsed * 5));

        hudCtx.fillStyle = "rgba(255, 255, 255, 0.5)";
        hudCtx.fillText("CH1", 1055, 638);
        hudCtx.fillText("CH2", 1055, 655);

        // Draw VU bars
        for (let i = 0; i < 20; i++) {
          const barColor = i < 14 ? "#26FF68" : i < 17 ? "#FFDA33" : "#FF3B30";
          // CH1
          if (i / 20 < vL) {
            hudCtx.fillStyle = barColor;
            hudCtx.fillRect(vuBarX + i * 4.5, vuBarY - 10, 3, 10);
          } else {
            hudCtx.fillStyle = "rgba(255, 255, 255, 0.1)";
            hudCtx.fillRect(vuBarX + i * 4.5, vuBarY - 10, 3, 10);
          }
          // CH2
          if (i / 20 < vR) {
            hudCtx.fillStyle = barColor;
            hudCtx.fillRect(vuBarX + i * 4.5, vuBarY + 5, 3, 10);
          } else {
            hudCtx.fillStyle = "rgba(255, 255, 255, 0.1)";
            hudCtx.fillRect(vuBarX + i * 4.5, vuBarY + 5, 3, 10);
          }
        }

        // Signal texture update
        screenTexture.needsUpdate = true;
      }

      // 8. Physics Damping for Mouse Parallax / Orbit
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.055;
      m.y += (m.targetY - m.y) * 0.055;

      const isMobile = window.innerWidth < 800;

      if (!isOrbitMode) {
        // Art-directed Hero Composition (Slight tilt & roll following mouse)
        const targetRotY = Math.PI + m.x * 0.42;
        const targetRotX = m.y * 0.28;
        const targetPosX = isMobile ? 0 : 0.65 + m.x * 0.25;
        const targetPosY = isMobile ? -0.4 : -1.3 - m.y * 0.18;
        const targetScale = isMobile ? 0.8 : 1.0;

        modelGroup.rotation.y += (targetRotY - modelGroup.rotation.y) * 0.06;
        modelGroup.rotation.x += (targetRotX - modelGroup.rotation.x) * 0.06;
        modelGroup.rotation.z += (-m.x * 0.08 - modelGroup.rotation.z) * 0.06;

        modelGroup.position.x += (targetPosX - modelGroup.position.x) * 0.06;
        modelGroup.position.y += (targetPosY - modelGroup.position.y) * 0.06;
        modelGroup.scale.setScalar(targetScale);
      } else {
        // Free Orbit Mode
        modelGroup.rotation.y += (orbitAngleRef.current.yaw - modelGroup.rotation.y) * 0.1;
        modelGroup.rotation.x += (orbitAngleRef.current.pitch - modelGroup.rotation.x) * 0.1;
      }

      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      screenTexture.dispose();
      renderer.dispose();
    };
  }, [isOrbitMode, activeReelIndex]);

  // --------------------------------------------------------------------------
  // Mouse & Touch Parallax / Orbit Handlers
  // --------------------------------------------------------------------------
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;

    if (!isOrbitMode) {
      mouseRef.current.targetX = nx * 2;
      mouseRef.current.targetY = ny * 2;
    } else if (isDraggingRef.current) {
      const deltaX = e.clientX - dragStartRef.current.x;
      const deltaY = e.clientY - dragStartRef.current.y;
      dragStartRef.current = { x: e.clientX, y: e.clientY };

      orbitAngleRef.current.yaw += deltaX * 0.01;
      orbitAngleRef.current.pitch = Math.max(-0.6, Math.min(0.6, orbitAngleRef.current.pitch + deltaY * 0.01));
    }
  };

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isOrbitMode) {
      isDraggingRef.current = true;
      dragStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = () => {
    isDraggingRef.current = false;
  };

  const toggleOrbitMode = () => {
    setIsOrbitMode((prev) => !prev);
    if (isOrbitMode) {
      // Reset angles
      orbitAngleRef.current = { yaw: Math.PI, pitch: 0 };
    }
  };

  return (
    <section
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative w-full min-h-[92vh] lg:min-h-screen bg-[#07080B] text-[#EDEDED] flex flex-col justify-between overflow-hidden select-none"
    >
      {/* Hidden offscreen HTML5 Video for WebGL Texture Streaming */}
      <video
        ref={videoRef}
        loop
        playsInline
        muted
        crossOrigin="anonymous"
        className="hidden"
      />

      {/* Background Atmosphere: Subtle Studio Radial Falloff + Grain */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[700px] bg-gradient-to-tr from-[#382613]/20 via-[#10192d]/25 to-transparent rounded-full blur-[140px] opacity-70" />
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#6688FF]/5 rounded-full blur-[120px]" />
        {/* Subtle grid lines in dark slate */}
        <div 
          className="absolute inset-0 opacity-[0.03] mix-blend-screen"
          style={{
            backgroundImage: `linear-gradient(#ffffff 1px, transparent 1px), linear-gradient(90deg, #ffffff 1px, transparent 1px)`,
            backgroundSize: "64px 64px"
          }}
        />
      </div>

      {/* 3D WebGL Canvas Layer */}
      <canvas
        ref={canvasRef}
        className={`absolute inset-0 w-full h-full z-10 transition-opacity duration-700 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${isOrbitMode ? "cursor-grab active:cursor-grabbing" : "cursor-default"}`}
      />

      {/* Loading Screen Overlay */}
      {isLoading && (
        <div className="absolute inset-0 z-30 flex flex-col items-center justify-center bg-[#07080B] gap-4">
          <div className="relative w-16 h-16 flex items-center justify-center">
            <div className="absolute inset-0 border-2 border-white/10 rounded-full" />
            <div className="absolute inset-0 border-2 border-t-[#D4AF37] border-r-[#D4AF37] rounded-full animate-spin" />
            <Film className="w-6 h-6 text-[#D4AF37]" />
          </div>
          <div className="flex flex-col items-center gap-1">
            <p className="text-xs uppercase tracking-[0.25em] text-[#D4AF37] font-semibold">
              Initializing 3D Cinema Rig
            </p>
            <p className="text-[11px] font-mono text-white/40">
              {loadProgress > 0 ? `${loadProgress}%` : "Streaming PBR Texture & Geometry..."}
            </p>
          </div>
        </div>
      )}

      {/* TOP BAR / EYEBROW OVERLAY */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pt-28 md:pt-32 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pointer-events-none">
        {/* Left Status Badge */}
        <div className="pointer-events-auto flex items-center gap-3 bg-white/[0.04] backdrop-blur-xl border border-white/10 px-4 py-2 rounded-full shadow-2xl">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF3B30] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#FF3B30]"></span>
          </span>
          <span className="text-[11px] font-mono font-semibold tracking-wider text-white/90 uppercase">
            Live 4K Production Master
          </span>
          <span className="text-white/20">|</span>
          <span className="text-[11px] font-mono text-[#E2D9C8] tracking-widest">
            SONY α7 III
          </span>
        </div>

        {/* Right Studio Controls */}
        <div className="pointer-events-auto flex items-center gap-2.5">
          {/* Mute/Sound Toggle */}
          <button
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute showreel audio" : "Mute showreel audio"}
            className="flex items-center gap-2 bg-white/[0.04] hover:bg-white/[0.08] active:scale-95 transition-all backdrop-blur-xl border border-white/10 px-3.5 py-2 rounded-full text-xs font-mono tracking-wider text-white/80 hover:text-white"
          >
            {isMuted ? (
              <>
                <VolumeX className="w-3.5 h-3.5 text-white/50" />
                <span>Audio Muted</span>
              </>
            ) : (
              <>
                <Volume2 className="w-3.5 h-3.5 text-[#26FF68]" />
                <span className="text-[#26FF68]">Audio Live</span>
              </>
            )}
          </button>

          {/* 360° Free Orbit Toggle */}
          <button
            onClick={toggleOrbitMode}
            className={`flex items-center gap-2 active:scale-95 transition-all backdrop-blur-xl border px-3.5 py-2 rounded-full text-xs font-mono tracking-wider ${
              isOrbitMode
                ? "bg-[#D4AF37] text-black border-[#D4AF37] font-semibold shadow-[0_0_20px_rgba(212,175,55,0.4)]"
                : "bg-white/[0.04] hover:bg-white/[0.08] text-white/80 hover:text-white border-white/10"
            }`}
          >
            {isOrbitMode ? (
              <>
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset View</span>
              </>
            ) : (
              <>
                <Compass className="w-3.5 h-3.5" />
                <span>360° Inspect</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* CENTER EDITORIAL HERO COPY (Layered behind/around camera) */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-6 md:py-10 flex flex-col justify-center pointer-events-none">
        <div className="max-w-2xl flex flex-col gap-5">
          {/* Studio Category Tag */}
          <div className="flex items-center gap-2.5">
            <span className="w-6 h-[1px] bg-[#D4AF37]" />
            <p className="text-[12px] font-mono tracking-[0.25em] text-[#D4AF37] uppercase font-semibold">
              Commercial & Luxury Media Studio
            </p>
          </div>

          {/* Monumental Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-7xl font-sans font-bold tracking-tight text-white leading-[1.08]">
            Luxury Media That{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFF5EA] via-[#E4D1B9] to-[#D4AF37]">
              Moves Your Listings
            </span>{" "}
            &amp; Builds Your Brand.
          </h1>

          {/* Subtext */}
          <p className="text-base sm:text-lg text-white/65 font-sans leading-relaxed max-w-xl">
            Full-service cinematic media production engineered for high-value real estate, commercial brands, and visionary architects. Delivered in pristine 4K HDR.
          </p>

          {/* Action CTAs */}
          <div className="pointer-events-auto pt-3 flex flex-wrap items-center gap-4">
            <a
              href="#featured"
              className="group relative inline-flex items-center gap-3 bg-gradient-to-r from-[#E5C384] to-[#C99C4B] hover:from-[#EDCF95] hover:to-[#D4AF37] text-black font-semibold text-sm px-7 py-3.5 rounded-full transition-all duration-300 shadow-[0_12px_32px_rgba(212,175,55,0.25)] hover:shadow-[0_16px_40px_rgba(212,175,55,0.4)] active:scale-95"
            >
              <span>Explore Pricing &amp; Packages</span>
              <div className="w-6 h-6 rounded-full bg-black/10 flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5 text-black" />
              </div>
            </a>

            <a
              href="#projects"
              className="inline-flex items-center gap-2.5 bg-white/[0.05] hover:bg-white/[0.1] text-white/90 hover:text-white border border-white/10 backdrop-blur-xl font-medium text-sm px-6 py-3.5 rounded-full transition-all duration-200 active:scale-95"
            >
              <Play className="w-3.5 h-3.5 text-[#E5C384] fill-[#E5C384]" />
              <span>Watch Reel 2026</span>
            </a>
          </div>
        </div>
      </div>

      {/* BOTTOM CONTROL DECK: REEL SWITCHER & METADATA */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 pb-8 md:pb-10 flex flex-col md:flex-row items-center justify-between gap-6">
        {/* Interactive Reel Channel Selector */}
        <div className="w-full md:w-auto flex flex-wrap items-center gap-2 bg-black/40 backdrop-blur-2xl border border-white/10 p-1.5 rounded-2xl md:rounded-full shadow-2xl">
          <span className="hidden sm:inline-block px-3 text-[11px] font-mono uppercase tracking-widest text-white/40">
            Reel Channel:
          </span>
          {REELS.map((reel, idx) => {
            const isActive = idx === activeReelIndex;
            return (
              <button
                key={reel.id}
                onClick={() => setActiveReelIndex(idx)}
                className={`relative px-4 py-2 rounded-xl md:rounded-full text-xs font-mono tracking-wider transition-all duration-200 flex items-center gap-2 ${
                  isActive
                    ? "bg-white/15 text-white border border-white/20 shadow-md font-semibold"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse" />
                )}
                <span>0{idx + 1} // {reel.category}</span>
              </button>
            );
          })}
        </div>

        {/* Live Production Badges */}
        <div className="hidden lg:flex items-center gap-6 text-[12px] font-mono text-white/50">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>4K 60FPS Color-Graded Delivery</span>
          </div>
          <div className="w-1 h-1 rounded-full bg-white/20" />
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>FAA Part 107 Licensed Aerials</span>
          </div>
        </div>
      </div>
    </section>
  );
};
