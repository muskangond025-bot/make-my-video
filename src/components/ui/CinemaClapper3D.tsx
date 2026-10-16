"use client";

import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinemaClapper3DProps {
  onClap?: () => void;
  onComplete?: () => void;
  className?: string;
  autoPlay?: boolean;
}

export const CinemaClapper3D: React.FC<CinemaClapper3DProps> = ({
  onClap,
  onComplete,
  className = "",
  autoPlay = true,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hasClappedRef = useRef(false);
  const hasCompletedRef = useRef(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // -------------------------------------------------------------
    // 1. SCENE, CAMERA, RENDERER
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || window.innerHeight;

    const camera = new THREE.PerspectiveCamera(32, width / height, 0.1, 100);
    camera.position.set(0, 0, 9.2);

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
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // -------------------------------------------------------------
    // 2. CINEMATIC STUDIO LIGHTING
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    // Key Light: warm top-right studio directional light
    const keyLight = new THREE.DirectionalLight(0xfff3e5, 2.6);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Cool Titanium Rim Light: sharp edge specular on the top sticks and hinge
    const rimLight = new THREE.DirectionalLight(0x78a8ff, 3.2);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Soft Ambient Fill from below
    const fillLight = new THREE.DirectionalLight(0x283040, 0.8);
    fillLight.position.set(-2, -4, 4);
    scene.add(fillLight);

    // Ground contact shadow below clapperboard for white background
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(0, 0, 0, 0.16)");
      grad.addColorStop(0.5, "rgba(0, 0, 0, 0.05)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(7.5, 3.5);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.65,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.position.set(0, -2.5, -0.1);
    scene.add(shadowMesh);

    // -------------------------------------------------------------
    // 3. REALISTIC TEXTURES (ZEBRA CHEVRONS & MATTE ACRYLIC SLATE)
    // -------------------------------------------------------------
    // A. High-Contrast Black & White Zebra Chevrons (Satin Lacquer)
    const createZebraTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 1024;
      texCanvas.height = 128;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      // Deep Charcoal Base
      ctx.fillStyle = "#0B0C0E";
      ctx.fillRect(0, 0, 1024, 128);

      // Pure White 45° Chevrons
      ctx.fillStyle = "#F5F6F8";
      const stripeW = 96;
      for (let x = -128; x < 1024 + 128; x += stripeW * 2) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + stripeW, 0);
        ctx.lineTo(x + stripeW - 128, 128);
        ctx.lineTo(x - 128, 128);
        ctx.closePath();
        ctx.fill();
      }

      // Edge accent borders
      ctx.strokeStyle = "rgba(0, 0, 0, 0.4)";
      ctx.lineWidth = 3;
      ctx.strokeRect(1, 1, 1022, 126);

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      return tex;
    };

    // B. Matte Obsidian Acrylic Slate Texture
    const createChalkboardTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 1024;
      texCanvas.height = 768;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      // Deep matte obsidian slate
      ctx.fillStyle = "#111215";
      ctx.fillRect(0, 0, 1024, 768);

      // Subtle surface grain
      const grad = ctx.createRadialGradient(512, 384, 100, 512, 384, 500);
      grad.addColorStop(0, "rgba(255, 255, 255, 0.03)");
      grad.addColorStop(1, "rgba(0, 0, 0, 0.35)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 768);

      // Outer Slate Frame Border
      ctx.strokeStyle = "rgba(255, 255, 255, 0.2)";
      ctx.lineWidth = 3;
      ctx.strokeRect(28, 28, 968, 712);

      // Grid Dividers
      ctx.strokeStyle = "rgba(255, 255, 255, 0.35)";
      ctx.lineWidth = 3;

      // Divider below Header
      ctx.beginPath();
      ctx.moveTo(40, 150);
      ctx.lineTo(984, 150);
      ctx.stroke();

      // Divider below SCENE / TAKE / ROLL
      ctx.beginPath();
      ctx.moveTo(40, 410);
      ctx.lineTo(984, 410);
      ctx.stroke();

      // Vertical column dividers
      ctx.beginPath();
      ctx.moveTo(354, 150);
      ctx.lineTo(354, 410);
      ctx.moveTo(670, 150);
      ctx.lineTo(670, 410);
      ctx.stroke();

      // Divider below DIRECTOR
      ctx.beginPath();
      ctx.moveTo(40, 520);
      ctx.lineTo(984, 520);
      ctx.stroke();

      // Divider below CAMERA
      ctx.beginPath();
      ctx.moveTo(40, 630);
      ctx.lineTo(984, 630);
      ctx.stroke();

      // HEADER TEXT: BRAND
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 32px -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif";
      ctx.letterSpacing = "4px";
      ctx.fillText("MAKE MY VID  ·  STUDIOS", 56, 95);

      ctx.fillStyle = "rgba(255, 255, 255, 0.5)";
      ctx.font = "bold 18px 'Courier New', monospace";
      ctx.fillText("CINEMA 4K PRODUCTION", 56, 126);

      // Timecode stamp in header right
      ctx.fillStyle = "#FFC83B";
      ctx.font = "bold 20px 'Courier New', monospace";
      ctx.textAlign = "right";
      ctx.fillText("SYNC TC  24.00 FPS", 965, 110);
      ctx.textAlign = "left";

      // SCENE / TAKE / ROLL LABELS
      ctx.fillStyle = "rgba(255, 255, 255, 0.6)";
      ctx.font = "bold 22px 'Courier New', monospace";
      ctx.fillText("SCENE", 60, 185);
      ctx.fillText("TAKE", 375, 185);
      ctx.fillText("ROLL", 690, 185);

      // Large High-Contrast Hand-Written Style Values
      ctx.fillStyle = "#FFFFFF";
      ctx.font = "900 115px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      ctx.fillText("01", 115, 335);
      ctx.fillText("01", 435, 335);
      ctx.fillText("A1", 750, 335);

      // DIRECTOR & CAMERA ROWS
      ctx.fillStyle = "rgba(255, 255, 255, 0.55)";
      ctx.font = "bold 20px 'Courier New', monospace";
      ctx.fillText("DIRECTOR:", 60, 480);
      ctx.fillText("CAMERA:", 60, 590);
      ctx.fillText("DATE:", 60, 695);

      ctx.fillStyle = "#FFFFFF";
      ctx.font = "bold 24px -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif";
      ctx.fillText("ROHAN JOSHI", 220, 480);
      ctx.fillText("SONY α7 III  ·  4K 60P RAW", 220, 590);
      ctx.fillText("2026", 160, 695);

      // Metadata Tags in Bottom-Right
      ctx.font = "bold 18px 'Courier New', monospace";
      ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
      ctx.textAlign = "right";
      ctx.fillText("[ EXT · DAY · SYNC ]", 965, 695);
      ctx.textAlign = "left";

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.anisotropy = 4;
      return tex;
    };

    // -------------------------------------------------------------
    // 4. REALISTIC PBR MATERIALS
    // -------------------------------------------------------------
    const zebraMaterial = new THREE.MeshStandardMaterial({
      map: createZebraTexture(),
      roughness: 0.28,
      metalness: 0.15,
    });

    const slateMaterial = new THREE.MeshStandardMaterial({
      map: createChalkboardTexture(),
      roughness: 0.65,
      metalness: 0.08,
    });

    // Dark hardwood back for the slate
    const slateBackMaterial = new THREE.MeshStandardMaterial({
      color: 0x141518,
      roughness: 0.55,
      metalness: 0.1,
    });

    // Brushed stainless steel hinge bracket
    const steelHingeMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8dde6,
      roughness: 0.25,
      metalness: 0.88,
    });

    // Mirror chrome rivets
    const chromeRivetMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      roughness: 0.1,
      metalness: 0.98,
    });

    // -------------------------------------------------------------
    // 5. ASSEMBLE 3D CLAPPERBOARD RIG
    // -------------------------------------------------------------
    const clapperRig = new THREE.Group();
    scene.add(clapperRig);

    const boardWidth = 5.2;
    const boardHeight = 3.8;
    const boardDepth = 0.14;
    const stickHeight = 0.58;
    const stickDepth = 0.16;

    // A. MAIN SLATE BOARD
    const slateMaterials = [
      slateBackMaterial, // right
      slateBackMaterial, // left
      slateBackMaterial, // top
      slateBackMaterial, // bottom
      slateMaterial,     // front face with engraved text
      slateBackMaterial, // back
    ];
    const slateGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    const slateMesh = new THREE.Mesh(slateGeo, slateMaterials);
    slateMesh.position.set(0, -boardHeight * 0.5, 0);
    slateMesh.castShadow = true;
    slateMesh.receiveShadow = true;
    clapperRig.add(slateMesh);

    // B. FIXED LOWER CLAPPER BAR (Mounted on top edge of slate)
    const lowerStickGeo = new THREE.BoxGeometry(boardWidth, stickHeight, stickDepth);
    const lowerStick = new THREE.Mesh(lowerStickGeo, zebraMaterial);
    lowerStick.position.set(0, stickHeight * 0.5 + 0.01, 0.01);
    lowerStick.castShadow = true;
    lowerStick.receiveShadow = true;
    clapperRig.add(lowerStick);

    // C. HINGED UPPER CLAPPER STICK
    // Pivot at top-left hinge: x = -boardWidth * 0.5, y = stickHeight + 0.01
    const hingePivotGroup = new THREE.Group();
    hingePivotGroup.position.set(-boardWidth * 0.5, stickHeight + 0.01, 0.01);
    clapperRig.add(hingePivotGroup);

    const upperStickGeo = new THREE.BoxGeometry(boardWidth, stickHeight, stickDepth);
    const upperStick = new THREE.Mesh(upperStickGeo, zebraMaterial);
    upperStick.position.set(boardWidth * 0.5, stickHeight * 0.5, 0);
    upperStick.castShadow = true;
    upperStick.receiveShadow = true;
    hingePivotGroup.add(upperStick);

    // Initial angle: open at ~30 degrees
    const OPEN_ANGLE = 0.52;
    hingePivotGroup.rotation.z = OPEN_ANGLE;

    // D. STEEL HINGE BRACKET & RIVETS
    const hingeBracketGeo = new THREE.BoxGeometry(0.85, 1.15, stickDepth + 0.05);
    const hingeBracket = new THREE.Mesh(hingeBracketGeo, steelHingeMaterial);
    hingeBracket.position.set(-boardWidth * 0.5 + 0.42, 0.58, 0.02);
    hingeBracket.castShadow = true;
    clapperRig.add(hingeBracket);

    // Chrome Rivets
    const rivetPositions = [
      [-boardWidth * 0.5 + 0.28, 0.88],
      [-boardWidth * 0.5 + 0.58, 0.88],
      [-boardWidth * 0.5 + 0.42, 0.28],
    ];
    rivetPositions.forEach(([rx, ry]) => {
      const rivetGeo = new THREE.CylinderGeometry(0.06, 0.06, stickDepth + 0.1, 16);
      rivetGeo.rotateX(Math.PI / 2);
      const rivet = new THREE.Mesh(rivetGeo, chromeRivetMaterial);
      rivet.position.set(rx, ry, 0.02);
      clapperRig.add(rivet);
    });

    // -------------------------------------------------------------
    // 6. SYNTHETIC WOODEN CLAP AUDIO FX (Zero-dependency Web Audio)
    // -------------------------------------------------------------
    const playClapperSound = () => {
      try {
        const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        if (ctx.state === "suspended") {
          ctx.resume();
        }
        const t = ctx.currentTime;

        // Sharp wooden transient
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(540, t);
        osc.frequency.exponentialRampToValueAtTime(70, t + 0.06);

        oscGain.gain.setValueAtTime(0.85, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.06);

        // Body acoustic resonance
        const bufferSize = ctx.sampleRate * 0.12;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.016));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1350, t);
        filter.Q.setValueAtTime(2.6, t);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.9, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.12);
      } catch (err) {
        // Audio policy fallback
      }
    };

    // -------------------------------------------------------------
    // 7. CINEMATIC 3D TIMELINE WITH DELIBERATE MOMENTUM (~2.1s Total)
    // -------------------------------------------------------------
    // Heroic 3D perspective angle showing slate edge bevel & steel hinge
    clapperRig.position.set(0, 0, 0);
    clapperRig.rotation.set(0.06, -0.12, 0.015);
    clapperRig.scale.set(0.95, 0.95, 0.95);

    let startTime = performance.now();
    let animId = 0;

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      const elapsed = (currentTime - startTime) / 1000;

      // PHASE 1: Float & Smooth Dolly-In with Wrist Anticipation (0.0s – 0.70s)
      if (elapsed < 0.70) {
        const p = elapsed / 0.70;
        const ease = 1 - Math.pow(1 - p, 3);
        camera.position.z = 9.2 - 0.6 * ease;
        clapperRig.scale.setScalar(0.95 + 0.05 * ease);

        // Subtle organic breathing float
        clapperRig.position.y = Math.sin(elapsed * 2.2) * 0.035;
        clapperRig.rotation.y = -0.12 + Math.sin(elapsed * 1.5) * 0.02;
        clapperRig.rotation.x = 0.06 + Math.cos(elapsed * 1.8) * 0.01;

        // Anticipation wrist lift in the last 0.08s before the strike
        if (elapsed > 0.62) {
          const liftP = (elapsed - 0.62) / 0.08;
          hingePivotGroup.rotation.z = OPEN_ANGLE + 0.04 * Math.sin(liftP * Math.PI);
        } else {
          hingePivotGroup.rotation.z = OPEN_ANGLE;
        }
      }

      // PHASE 2: SWIFT DECISIVE CLAP & PHYSICAL REBOUND (0.70s – 0.96s)
      else if (elapsed >= 0.70 && elapsed < 0.96) {
        camera.position.z = 8.6;
        const clapDuration = 0.15;
        const smashProgress = (elapsed - 0.70) / clapDuration;

        if (smashProgress <= 1.0) {
          // Sharp acceleration down (cinematic snap)
          const easeDown = Math.pow(smashProgress, 3.2);
          hingePivotGroup.rotation.z = OPEN_ANGLE * (1 - easeDown);
        } else {
          // Micro elastic rebound on contact
          const reboundTime = (elapsed - (0.70 + clapDuration)) / 0.11;
          const bounce = Math.sin(reboundTime * Math.PI * 4) * Math.exp(-reboundTime * 8) * 0.04;
          hingePivotGroup.rotation.z = Math.max(0, bounce);
        }

        // Camera recoil shockwave
        if (elapsed >= 0.85) {
          const rTime = elapsed - 0.85;
          camera.position.y = Math.sin(rTime * 45) * Math.exp(-rTime * 28) * 0.04;
        }

        // Trigger sound & clap callback at contact - ONCE ONLY
        if (!hasClappedRef.current && elapsed >= 0.85) {
          hasClappedRef.current = true;
          playClapperSound();
          if (onClap) onClap();
        }
      }

      // PHASE 3: THE "ACTION!" HOLD ("A LITTLE DELAY, NOT TOO MUCH") (0.96s – 1.65s)
      else if (elapsed >= 0.96) {
        hingePivotGroup.rotation.z = 0;
        camera.position.y = 0;
        camera.position.z = 8.6 - (elapsed - 0.96) * 0.12; // slow cinematic push continues

        // Elegant floating motion continues while closed
        clapperRig.position.y = Math.sin(elapsed * 2.2) * 0.025;
        clapperRig.rotation.y = -0.12 + Math.sin(elapsed * 1.5) * 0.015;

        // Triggers smooth fade out at 1.60s (~0.75s deliberate hold after clap)
        if (elapsed >= 1.60 && !hasCompletedRef.current) {
          hasCompletedRef.current = true;
          if (onComplete) onComplete();
        }
      }

      renderer.render(scene, camera);
    };

    if (autoPlay) {
      animId = requestAnimationFrame(animate);
    }

    // Resize listener
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
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, [autoPlay, onClap, onComplete]);

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
