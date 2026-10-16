"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export const RevHero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isDisposed = false;
    let animationFrameId: number;

    // -------------------------------------------------------------
    // 1. THREE.JS SCENE, CAMERA, RENDERER
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    let width = container.clientWidth || window.innerWidth;
    let height = window.innerHeight;

    const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 100);
    camera.position.set(0, 0, 5);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0); // Transparent canvas so background text is visible
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    // Studio Environment map for authentic PBR reflections
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment()).texture;
    scene.environment = envTexture;

    // Studio Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 7, 5);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0x88bbff, 2.0);
    rimLight.position.set(-6, 3, -4);
    scene.add(rimLight);

    // Soft Contact Shadow Plane at y = -2
    const shadowCanvas = document.createElement("canvas");
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext("2d");
    if (sCtx) {
      const grad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
      grad.addColorStop(0, "rgba(0,0,0,0.6)");
      grad.addColorStop(0.5, "rgba(0,0,0,0.25)");
      grad.addColorStop(1, "rgba(0,0,0,0)");
      sCtx.fillStyle = grad;
      sCtx.fillRect(0, 0, 256, 256);
    }
    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowGeo = new THREE.PlaneGeometry(16, 16);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -2, 0);
    scene.add(shadowMesh);

    // OrbitControls matching REV
    const controls = new OrbitControls(camera, canvas);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.enableRotate = true;
    controls.maxPolarAngle = Math.PI / 2;
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // -------------------------------------------------------------
    // 2. VIDEO TEXTURE STREAMING ONTO LCD SCREEN
    // -------------------------------------------------------------
    // In-memory video element: never added to DOM, so no styles or layout can bleed
    const video = document.createElement("video");
    video.src = "/videos/hero-reel.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play().catch(() => {});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;

    // -------------------------------------------------------------
    // 3. MODEL GROUP & GSAP SCROLLTRIGGER (Exact REV Coordinates)
    // -------------------------------------------------------------
    const modelGroup = new THREE.Group();
    // Start position & rotation: rear facing viewer, screen dead center
    modelGroup.position.set(0.65, -1.3, 0);
    modelGroup.rotation.set(0, Math.PI, 0);
    scene.add(modelGroup);

    const loader = new GLTFLoader();
    loader.load(
      "/models/sony9.glb",
      (gltf) => {
        if (isDisposed) return;

        gltf.scene.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            if (mesh.name === "Plane") {
              mesh.material = new THREE.MeshBasicMaterial({
                map: videoTexture,
                toneMapped: false,
              });
            } else {
              // Camera body: Keep original PBR material with balanced reflections
              if (mesh.material) {
                const mat = mesh.material as THREE.MeshStandardMaterial;
                mat.roughness = 0.4;
                mat.metalness = 0.5;
                mat.envMapIntensity = 1.0;
              }
            }
          }
        });

        modelGroup.add(gltf.scene);

        // 4. GSAP ScrollTrigger Animation (Matches REV chunk 757 exactly)
        const stCtx = gsap.context(() => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: ".one-two",
              start: "top bottom",
              end: "top top",
              scrub: true,
              immediateRender: false,
            },
          });

          // Camera zooms back & tilts up
          tl.to(camera.position, {
            z: 12,
            y: 1,
            ease: "none",
          }, 0);

          // Model rotates to 3/4 perspective
          tl.to(modelGroup.rotation, {
            y: 1.25 * Math.PI,
            ease: "none",
          }, 0);

          // Model shifts to bottom left
          tl.to(modelGroup.position, {
            x: -0.3,
            y: -1.75,
            ease: "none",
          }, 0);

          // Text content fades out smoothly
          tl.to(".one-content-item-content", {
            opacity: 0,
            filter: "blur(12px)",
            yPercent: -20,
            ease: "none",
          }, 0);
        }, container);

        return () => stCtx.revert();
      },
      undefined,
      (err) => {
        console.error("Error loading sony9.glb:", err);
      }
    );

    // Render loop
    const render = () => {
      if (isDisposed) return;
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };
    render();

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = window.innerHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("resize", handleResize);
      video.pause();
      video.src = "";
      video.load();
      videoTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <>
      {/* ------------------------------------------------------------- */}
      {/* SECTION ONE (200vh Scroll Height matching REV)                */}
      {/* ------------------------------------------------------------- */}
      <section
        ref={containerRef}
        id="home"
        className="relative w-full h-[200vh] bg-[#010101] text-white select-none overflow-visible"
      >
        {/* 1. STICKY 3D CAMERA EXPERIENCE (100vh Sticky Viewport) */}
        <div className="sticky top-0 left-0 w-full h-screen z-10 pointer-events-auto">
          <canvas
            ref={canvasRef}
            className="w-full h-full cursor-grab active:cursor-grabbing block"
          />
        </div>

        {/* 2. 200vh SCROLL CONTENT OVERLAY */}
        <div className="absolute top-0 left-0 w-full h-[200vh] flex flex-col z-[5] pointer-events-none">
          {/* Section One-One (0 to 100vh: Title, Subtitle, Buttons) */}
          <div className="w-full h-screen px-[7.5vw] flex flex-col items-center justify-center text-center">
            <div className="one-content-item-content flex flex-col items-center justify-center text-center gap-[1.5vh] max-w-[1400px]">
              
              {/* Giant Headline: "REV PRODUCTIONS" behind camera */}
              <div className="titlebox overflow-hidden">
                <h1 className="text-[9.5vw] md:text-[8.5vw] font-bold tracking-tight text-white leading-[0.8] select-none opacity-40">
                  REV PRODUCTIONS
                </h1>
              </div>

              {/* Description */}
              <p className="w-[85%] md:w-[80%] max-w-[700px] text-[16px] md:text-[1.25vw] text-white/70 font-light leading-relaxed select-none">
                Luxury Media that moves your listings and builds your Brand.
              </p>

              {/* Action Buttons */}
              <div className="flex items-center justify-center gap-[1.2vw] pt-[2vh] pointer-events-auto">
                {/* Pricing & Packages Pill */}
                <button
                  onClick={() => {
                    const el = document.getElementById("projects");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="h-[5.5vh] pl-[1.6vw] pr-[0.8vh] gap-[1vw] bg-white hover:bg-neutral-100 text-[#010100] text-[13px] md:text-[0.95vw] font-medium rounded-full flex items-center justify-between shadow-[0_0_20px_rgba(0,0,0,0.1)] transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Pricing &amp; Packages</span>
                  <div className="w-[4vh] h-[4vh] rounded-full bg-[#010101] flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-white"
                    >
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </div>
                </button>

                {/* Learn More Pill */}
                <button
                  onClick={() => {
                    const el = document.getElementById("featured");
                    el?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className="h-[5.5vh] pl-[1.6vw] pr-[0.8vh] gap-[1vw] bg-[#010101]/40 hover:bg-[#010101]/60 text-white text-[13px] md:text-[0.95vw] font-medium rounded-full flex items-center justify-between border border-white/15 backdrop-blur-md transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>Learn More</span>
                  <div className="w-[4vh] h-[4vh] rounded-full bg-white flex items-center justify-center flex-shrink-0">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-[#010101]"
                    >
                      <path d="M7 7h10v10"></path>
                      <path d="M7 17 17 7"></path>
                    </svg>
                  </div>
                </button>
              </div>

            </div>
          </div>

          {/* Section One-Two (100vh to 200vh: ScrollTrigger Target) */}
          <div className="one-two w-full h-screen" />
        </div>
      </section>
    </>
  );
};
