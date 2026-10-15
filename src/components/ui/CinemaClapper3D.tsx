"use client";

import React, { useEffect, useRef, useState } from "react";
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
  const [clapped, setClapped] = useState(false);

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

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 0.2, 9.5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    // -------------------------------------------------------------
    // 2. CINEMATIC STUDIO LIGHTING
    // -------------------------------------------------------------
    const ambientLight = new THREE.AmbientLight(0xfbf8f2, 1.25);
    scene.add(ambientLight);

    // Key Light (Top-Right Studio Spotlight)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
    keyLight.position.set(6, 8, 7);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0005;
    scene.add(keyLight);

    // Rim / Backlight (Lavender Purple Rim Accent along edges)
    const rimLight = new THREE.DirectionalLight(0xb9a1f7, 2.5);
    rimLight.position.set(-6, 4, -4);
    scene.add(rimLight);

    // Soft Warm Beige Fill (Bottom-Left)
    const fillLight = new THREE.DirectionalLight(0xf3ebdd, 0.75);
    fillLight.position.set(-4, -5, 5);
    scene.add(fillLight);

    // -------------------------------------------------------------
    // 3. PROCEDURAL TEXTURES (CHALKBOARD SLATE & ZEBRA STRIPES)
    // -------------------------------------------------------------
    // A. 45° Deep Indigo & Warm Beige Zebra Chevrons for Clapper Sticks
    const createZebraTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 1024;
      texCanvas.height = 128;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      // Warm Beige base
      ctx.fillStyle = "#F3EBDD";
      ctx.fillRect(0, 0, 1024, 128);

      // Angled Deep Indigo Chevrons (45°)
      ctx.fillStyle = "#211747";
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

      // Subtle edge line
      ctx.strokeStyle = "rgba(33, 23, 71, 0.25)";
      ctx.lineWidth = 2;
      ctx.strokeRect(2, 2, 1020, 124);

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.anisotropy = 4;
      return tex;
    };

    // B. Film Chalkboard Slate Face Texture
    const createChalkboardTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 1024;
      texCanvas.height = 768;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      // Deep Indigo slate base
      ctx.fillStyle = "#211747";
      ctx.fillRect(0, 0, 1024, 768);

      // Lavender chalk dust smudge gradients
      const grad = ctx.createRadialGradient(512, 384, 50, 512, 384, 450);
      grad.addColorStop(0, "rgba(185, 161, 247, 0.12)");
      grad.addColorStop(0.5, "rgba(185, 161, 247, 0.04)");
      grad.addColorStop(1, "rgba(10, 6, 26, 0.45)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, 1024, 768);

      // Horizontal chalk dust wiping streaks
      ctx.fillStyle = "rgba(185, 161, 247, 0.04)";
      for (let y = 60; y < 700; y += 35) {
        ctx.fillRect(40, y, 944, 18);
      }

      // Outer Slate Frame Border in Lavender
      ctx.strokeStyle = "rgba(185, 161, 247, 0.35)";
      ctx.lineWidth = 4;
      ctx.strokeRect(32, 32, 960, 704);

      // Grid Layout Lines
      ctx.strokeStyle = "rgba(185, 161, 247, 0.5)";
      ctx.lineWidth = 4;

      // Divider below PRODUCTION
      ctx.beginPath();
      ctx.moveTo(50, 150);
      ctx.lineTo(974, 150);
      ctx.stroke();

      // Divider below SCENE / TAKE / ROLL
      ctx.beginPath();
      ctx.moveTo(50, 410);
      ctx.lineTo(974, 410);
      ctx.stroke();

      // Vertical column divider 1 (between Scene and Take)
      ctx.beginPath();
      ctx.moveTo(358, 150);
      ctx.lineTo(358, 410);
      ctx.stroke();

      // Vertical column divider 2 (between Take and Roll)
      ctx.beginPath();
      ctx.moveTo(666, 150);
      ctx.lineTo(666, 410);
      ctx.stroke();

      // Divider below DIRECTOR
      ctx.beginPath();
      ctx.moveTo(50, 520);
      ctx.lineTo(974, 520);
      ctx.stroke();

      // Divider below CAMERA
      ctx.beginPath();
      ctx.moveTo(50, 630);
      ctx.lineTo(974, 630);
      ctx.stroke();

      // ----------------------------------------
      // Typography & Slate Headings
      // ----------------------------------------
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 32px 'Montserrat', sans-serif";

      // 1. PRODUCTION
      ctx.fillText("PRODUCTION", 60, 95);
      ctx.font = "bold 44px 'Montserrat', sans-serif";
      ctx.fillStyle = "#D5FF3F"; // Neon Lime brand accent
      ctx.fillText("MAKE MY VID", 340, 102);

      // 2. SCENE
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 28px 'Montserrat', sans-serif";
      ctx.fillText("SCENE", 160, 195);
      ctx.font = "bold 96px 'Montserrat', sans-serif";
      ctx.fillStyle = "#F3EBDD";
      ctx.fillText("01", 150, 340);

      // 3. TAKE
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 28px 'Montserrat', sans-serif";
      ctx.fillText("TAKE", 475, 195);
      ctx.font = "bold 96px 'Montserrat', sans-serif";
      ctx.fillStyle = "#F3EBDD";
      ctx.fillText("01", 465, 340);

      // 4. ROLL
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 28px 'Montserrat', sans-serif";
      ctx.fillText("ROLL", 780, 195);
      ctx.font = "bold 96px 'Montserrat', sans-serif";
      ctx.fillStyle = "#F3EBDD";
      ctx.fillText("A", 780, 340);

      // 5. DIRECTOR
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 28px 'Montserrat', sans-serif";
      ctx.fillText("DIRECTOR", 60, 480);
      ctx.font = "bold 34px 'Montserrat', sans-serif";
      ctx.fillStyle = "#F3EBDD";
      ctx.fillText("ROHAN JOSHI", 340, 482);

      // 6. CAMERA
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 28px 'Montserrat', sans-serif";
      ctx.fillText("CAMERA", 60, 590);
      ctx.font = "bold 34px 'Montserrat', sans-serif";
      ctx.fillStyle = "#F3EBDD";
      ctx.fillText("35MM ANAMORPHIC", 340, 592);

      // 7. DATE & FPS
      ctx.fillStyle = "#B9A1F7";
      ctx.font = "bold 28px 'Montserrat', sans-serif";
      ctx.fillText("DATE", 60, 695);
      ctx.font = "bold 32px 'Montserrat', sans-serif";
      ctx.fillStyle = "#F3EBDD";
      ctx.fillText("2026 • 24 FPS", 340, 698);

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.anisotropy = 4;
      return tex;
    };

    const zebraTex = createZebraTexture();
    const chalkboardTex = createChalkboardTexture();

    // -------------------------------------------------------------
    // 4. MATERIALS
    // -------------------------------------------------------------
    // Chalkboard Face Material
    const slateFaceMaterial = new THREE.MeshStandardMaterial({
      map: chalkboardTex,
      roughness: 0.72,
      metalness: 0.08,
    });

    // Dark Matte Slate Body Material in Deep Indigo
    const slateBodyMaterial = new THREE.MeshStandardMaterial({
      color: 0x211747,
      roughness: 0.65,
      metalness: 0.15,
    });

    // Zebra Clapper Sticks Material
    const zebraMaterial = new THREE.MeshStandardMaterial({
      map: zebraTex,
      roughness: 0.42,
      metalness: 0.05,
    });

    // Gunmetal Steel Hinge Plate Material
    const steelHingeMaterial = new THREE.MeshStandardMaterial({
      color: 0x191138,
      roughness: 0.35,
      metalness: 0.85,
    });

    // Chrome Rivets & Screws Material
    const chromeRivetMaterial = new THREE.MeshStandardMaterial({
      color: 0xe4e4e7,
      roughness: 0.15,
      metalness: 0.95,
    });

    // Ink Edge Line Material (for CAD / blueprint edge emphasis)
    const edgeLineMaterial = new THREE.LineBasicMaterial({
      color: 0x09090b,
      linewidth: 1.5,
    });

    // Helper: Wrap geometry in a mesh with black bevel wire edges
    const createOutlinedMesh = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material,
      threshold = 28
    ) => {
      const group = new THREE.Group();
      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      const edges = new THREE.EdgesGeometry(geo, threshold);
      const lines = new THREE.LineSegments(edges, edgeLineMaterial);
      group.add(lines);

      return { group, mesh, edges, lines };
    };

    // -------------------------------------------------------------
    // 5. 3D CLAPPERBOARD GEOMETRIC ASSEMBLY
    // -------------------------------------------------------------
    const clapperRig = new THREE.Group();
    scene.add(clapperRig);

    // Initial scale and heroic perspective
    clapperRig.scale.set(1.15, 1.15, 1.15);

    const boardWidth = 4.4;
    const boardHeight = 3.2;
    const boardDepth = 0.16;
    const stickHeight = 0.52;
    const stickDepth = 0.18;

    // A. MAIN CHALKBOARD SLATE
    const slateGeo = new THREE.BoxGeometry(boardWidth, boardHeight, boardDepth);
    // Face mapping: front face (+z) gets chalkboard texture, others get slate dark body
    const slateMesh = new THREE.Mesh(slateGeo, [
      slateBodyMaterial, // right
      slateBodyMaterial, // left
      slateBodyMaterial, // top
      slateBodyMaterial, // bottom
      slateFaceMaterial, // front (+z)
      slateBodyMaterial, // back (-z)
    ]);
    slateMesh.castShadow = true;
    slateMesh.receiveShadow = true;

    const slateGroup = new THREE.Group();
    slateGroup.position.set(0, -boardHeight * 0.5 + 0.1, 0);
    slateGroup.add(slateMesh);

    const slateEdges = new THREE.EdgesGeometry(slateGeo, 28);
    slateGroup.add(new THREE.LineSegments(slateEdges, edgeLineMaterial));
    clapperRig.add(slateGroup);

    // B. FIXED LOWER CLAPPER BAR (Mounted on top edge of slate)
    const lowerStickGeo = new THREE.BoxGeometry(boardWidth, stickHeight, stickDepth);
    const lowerStick = createOutlinedMesh(lowerStickGeo, zebraMaterial, 25);
    lowerStick.group.position.set(0, stickHeight * 0.5 + 0.08, 0.01);
    clapperRig.add(lowerStick.group);

    // C. HINGED UPPER CLAPPER STICK
    // Pivot is located at the top-left hinge: x = -boardWidth * 0.5, y = stickHeight + 0.08
    const hingePivotGroup = new THREE.Group();
    hingePivotGroup.position.set(-boardWidth * 0.5, stickHeight + 0.08, 0.01);
    clapperRig.add(hingePivotGroup);

    // The stick itself is offset so its left edge is aligned with the pivot
    const upperStickGeo = new THREE.BoxGeometry(boardWidth, stickHeight, stickDepth);
    const upperStick = createOutlinedMesh(upperStickGeo, zebraMaterial, 25);
    upperStick.group.position.set(boardWidth * 0.5, stickHeight * 0.5, 0);
    hingePivotGroup.add(upperStick.group);

    // Initial state: wide open angle (ready to smash!)
    const OPEN_ANGLE = 0.58; // ~33 degrees
    hingePivotGroup.rotation.z = OPEN_ANGLE;

    // D. METAL HINGE BRACKET & RIVETS (Left corner)
    const hingeBracketGeo = new THREE.BoxGeometry(0.85, 1.15, stickDepth + 0.06);
    const hingeBracket = createOutlinedMesh(hingeBracketGeo, steelHingeMaterial, 28);
    hingeBracket.group.position.set(-boardWidth * 0.5 + 0.42, 0.65, 0.02);
    clapperRig.add(hingeBracket.group);

    // 3 Chrome Screws / Rivets on Hinge Plate
    const rivetPositions = [
      [-boardWidth * 0.5 + 0.28, 0.95],
      [-boardWidth * 0.5 + 0.58, 0.95],
      [-boardWidth * 0.5 + 0.42, 0.35],
    ];
    rivetPositions.forEach(([rx, ry]) => {
      const rivetGeo = new THREE.CylinderGeometry(0.065, 0.065, stickDepth + 0.12, 16);
      rivetGeo.rotateX(Math.PI / 2);
      const rivet = new THREE.Mesh(rivetGeo, chromeRivetMaterial);
      rivet.position.set(rx, ry, 0.02);
      clapperRig.add(rivet);
    });

    // -------------------------------------------------------------
    // 6. SYNTHETIC WOODEN CLAP AUDIO FX (Zero-dependency Web Audio API)
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

        // 1. Sharp High-Impact Wooden Snap (Click Transient)
        const osc = ctx.createOscillator();
        const oscGain = ctx.createGain();
        osc.type = "triangle";
        osc.frequency.setValueAtTime(520, t);
        osc.frequency.exponentialRampToValueAtTime(75, t + 0.07);

        oscGain.gain.setValueAtTime(0.85, t);
        oscGain.gain.exponentialRampToValueAtTime(0.001, t + 0.07);

        osc.connect(oscGain);
        oscGain.connect(ctx.destination);
        osc.start(t);
        osc.stop(t + 0.07);

        // 2. Heavy Wood Body Resonance / Acoustic Slap
        const bufferSize = ctx.sampleRate * 0.14;
        const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
        const data = buffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          data[i] = (Math.random() * 2 - 1) * Math.exp(-i / (ctx.sampleRate * 0.018));
        }

        const noise = ctx.createBufferSource();
        noise.buffer = buffer;

        const filter = ctx.createBiquadFilter();
        filter.type = "bandpass";
        filter.frequency.setValueAtTime(1400, t);
        filter.Q.setValueAtTime(2.8, t);

        const noiseGain = ctx.createGain();
        noiseGain.gain.setValueAtTime(0.95, t);
        noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);

        noise.connect(filter);
        filter.connect(noiseGain);
        noiseGain.connect(ctx.destination);
        noise.start(t);
        noise.stop(t + 0.14);
      } catch (err) {
        // Audio policy fallback
      }
    };

    // -------------------------------------------------------------
    // 7. PRELOADER DROP-DOWN & STATIC CLAP TIMELINE
    // -------------------------------------------------------------
    // Static straight-on front perspective (matching reference photo)
    const DEFAULT_ROT_X = 0;
    const DEFAULT_ROT_Y = 0;
    const DEFAULT_ROT_Z = 0;

    clapperRig.rotation.set(DEFAULT_ROT_X, DEFAULT_ROT_Y, DEFAULT_ROT_Z);
    // Starts above the viewport so it drops down smoothly like a real preloader
    clapperRig.position.set(0, 9.5, 0);

    let startTime = performance.now();
    let hasClapped = false;
    let hasCompleted = false;

    let animId = 0;

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      const elapsed = (currentTime - startTime) / 1000;

      // ---------------------------------------------------------
      // STAGE 1: DROP DOWN FROM TOP (0.0s - 0.7s)
      // ---------------------------------------------------------
      if (elapsed < 0.7) {
        const dropProgress = Math.min(1, elapsed / 0.7);
        const easeDrop = 1 - Math.pow(1 - dropProgress, 3);
        clapperRig.position.y = 9.5 * (1 - easeDrop);
        clapperRig.position.z = 0;
        hingePivotGroup.rotation.z = OPEN_ANGLE;
      }

      // ---------------------------------------------------------
      // STAGE 2: HOLD OPEN IN STATIC FORM (0.7s - 3.7s, 3s PAUSE)
      // ---------------------------------------------------------
      else if (elapsed >= 0.7 && elapsed < 3.7) {
        // Clapper rests centered, perfectly visible, breathing subtly
        const holdTime = elapsed - 0.7;
        clapperRig.position.y = Math.sin(holdTime * 2.2) * 0.03;
        clapperRig.position.z = 0;
        hingePivotGroup.rotation.z = OPEN_ANGLE;
      }

      // ---------------------------------------------------------
      // STAGE 3: THE SMASH IMPACT (3.7s - 4.0s)
      // ---------------------------------------------------------
      else if (elapsed >= 3.7 && elapsed < 4.05) {
        clapperRig.position.y = 0;
        clapperRig.position.z = 0;

        const smashProgress = (elapsed - 3.7) / 0.14;

        if (smashProgress <= 1.0) {
          const easeDown = Math.pow(smashProgress, 3);
          hingePivotGroup.rotation.z = OPEN_ANGLE * (1 - easeDown);
        } else {
          // Subtle micro elastic rebound on impact
          const reboundTime = (elapsed - 3.84) / 0.16;
          const bounce = Math.sin(reboundTime * Math.PI * 3) * Math.exp(-reboundTime * 6) * 0.05;
          hingePivotGroup.rotation.z = Math.max(0, bounce);
        }

        // Trigger Clap sound and callback at contact
        if (!hasClapped && elapsed >= 3.84) {
          hasClapped = true;
          setClapped(true);
          playClapperSound();
          if (onClap) onClap();
        }
      }

      // ---------------------------------------------------------
      // STAGE 4: CLOSED HOLD & REVEAL (4.05s - 4.5s)
      // ---------------------------------------------------------
      else if (elapsed >= 4.05) {
        clapperRig.position.set(0, 0, 0);
        hingePivotGroup.rotation.z = 0;

        // Static hold on closed slate, then fade reveal triggers
        if (elapsed >= 4.45 && !hasCompleted) {
          hasCompleted = true;
          if (onComplete) onComplete();
        }
      }

      renderer.render(scene, camera);
    };

    if (autoPlay) {
      animId = requestAnimationFrame(animate);
    }

    // -------------------------------------------------------------
    // 8. RESIZE & CLEANUP
    // -------------------------------------------------------------
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const handleContainerClick = () => {
      const now = performance.now();
      if (!hasClapped && (now - startTime) < 3700) {
        // Clicking fast-forwards immediately to the smash
        startTime = now - 3700;
      }
    };
    container.addEventListener("click", handleContainerClick);

    window.addEventListener("resize", handleResize);

    return () => {
      cancelAnimationFrame(animId);
      container.removeEventListener("click", handleContainerClick);
      window.removeEventListener("resize", handleResize);

      // Clean Three.js geometries and textures
      scene.traverse((obj) => {
        if ((obj as THREE.Mesh).isMesh) {
          const mesh = obj as THREE.Mesh;
          mesh.geometry?.dispose();
          if (Array.isArray(mesh.material)) {
            mesh.material.forEach((m) => m.dispose());
          } else if (mesh.material) {
            mesh.material.dispose();
          }
        }
      });

      zebraTex.dispose();
      chalkboardTex.dispose();
      renderer.dispose();
    };
  }, [autoPlay, onClap, onComplete]);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none overflow-hidden ${className}`}
    >
      <canvas ref={canvasRef} className="w-full h-full block pointer-events-none" />

    </div>
  );
};
