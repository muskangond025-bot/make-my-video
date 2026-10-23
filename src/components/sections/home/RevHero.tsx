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
  const rotatingWords = ["FILMS", "CREATIVE DIRECTION", "SOCIAL MEDIA", "SCRIPTING"];
  const [wordIndex, setWordIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

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
    video.src = "/videos/hero-rohan.mp4";
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.autoplay = true;
    video.play().catch(() => {});

    const videoTexture = new THREE.VideoTexture(video);
    videoTexture.colorSpace = THREE.SRGBColorSpace;
    videoTexture.minFilter = THREE.LinearFilter;
    videoTexture.magFilter = THREE.LinearFilter;
    videoTexture.flipY = false;

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

          // Hero text fade out during scroll
          tl.to(".hero-text-overlay", {
            opacity: 0,
            y: -40,
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

    // Render loop with IntersectionObserver
    let isVisible = false;

    const render = () => {
      if (isDisposed || !isVisible) return;
      controls.update();
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(render);
    };

    const startRenderLoop = () => {
      if (!isVisible && !isDisposed) {
        isVisible = true;
        video.play().catch(() => {});
        render();
      }
    };

    const stopRenderLoop = () => {
      isVisible = false;
      cancelAnimationFrame(animationFrameId);
      video.pause();
    };

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          startRenderLoop();
        } else {
          stopRenderLoop();
        }
      },
      { rootMargin: "250px 0px" }
    );
    intersectionObserver.observe(container);

    // Resize listener
    const handleResize = () => {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = window.innerHeight;
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
      stopRenderLoop();
      intersectionObserver.disconnect();
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

          {/* Authentic rohanjoshi.in Hero Overlay */}
          <div className="hero-text-overlay absolute inset-0 z-20 pointer-events-none flex flex-col justify-between p-4 sm:p-8 lg:p-14 fluid-container w-full transition-opacity duration-300">
            <div className="flex justify-between items-start pt-16 sm:pt-20">
              <div className="flex flex-col items-start max-w-2xl">
                <span className="typo-caption font-mono uppercase tracking-[0.25em] text-zinc-400">
                  Make My Vid &bull; Creative Studio
                </span>
                <h1 className="typo-h1 font-bold tracking-tight text-white uppercase mt-2 font-heading">
                  Elevating Brand
                </h1>
                <h2 className="typo-h3 font-light text-zinc-300 tracking-wide mt-1.5 flex flex-wrap items-center gap-2">
                  Through{" "}
                  <span className="font-semibold text-[#7567EE] transition-all duration-500">
                    {rotatingWords[wordIndex]}
                  </span>
                </h2>
              </div>
            </div>

            {/* Bottom info bar */}
            <div className="pb-6 sm:pb-8 flex justify-between items-end text-zinc-500 typo-caption font-mono">
              <span>[ SONY CINEMA FX &bull; 4K WORKFLOW ]</span>
              <span className="hidden sm:inline">&bull; DRAG TO ROTATE 3D CAMERA</span>
            </div>
          </div>
        </div>

        {/* 2. ScrollTrigger Target for 200vh Scroll Height */}
        <div className="absolute top-0 left-0 w-full h-[200vh] pointer-events-none">
          <div className="w-full h-screen" />
          <div className="one-two w-full h-screen" />
        </div>
      </section>
    </>
  );
};
