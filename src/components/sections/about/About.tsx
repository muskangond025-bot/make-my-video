"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import * as THREE from "three";

// Clean High-End Editorial Collection matching user's exact reference screenshot
const PORTFOLIO_ITEMS = [
  {
    id: "01",
    tag: "Fashion",
    title: "HAUTE COUTURE",
    client: "VOGUE EDITORIAL",
    year: "2026",
    // Clean high-res golden-hour fashion model (no duplicate text on the image!)
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1400&q=85",
    fallback: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
    desc: "Golden-hour luxury fashion shoot featuring warm sunlight, jewelry specular highlights, and sculptural silhouette.",
  },
  {
    id: "02",
    tag: "Commercial",
    title: "KINETIC DRIFT",
    client: "PORSCHE MOTORSPORT",
    year: "2025",
    image: "https://images.unsplash.com/photo-1508974239320-0a029497e820?auto=format&fit=crop&w=1400&q=85",
    desc: "High-velocity tracking shots synchronized with robotic camera rigs and custom anamorphic optics.",
  },
  {
    id: "03",
    tag: "Editorial",
    title: "MONOCHROME ESSENCE",
    client: "BALENCIAGA",
    year: "2026",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1400&q=85",
    desc: "Sculptural portraiture experimenting with high-contrast chiaroscuro studio lighting and physical film grain.",
  },
  {
    id: "04",
    tag: "Cinema",
    title: "NEON SHINJUKU",
    client: "SONY ENTERTAINMENT",
    year: "2026",
    image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1400&q=85",
    desc: "35mm anamorphic night cinematography captured across Shinjuku & Shibuya backstreets.",
  },
  {
    id: "05",
    tag: "Direction",
    title: "HORIZON APERTURE",
    client: "MAKE MY VID ORIGINALS",
    year: "2025",
    image: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1400&q=85",
    desc: "Cinematic commercial film shot at golden twilight on location in volcanic landscapes.",
  },
  {
    id: "06",
    tag: "Prismatic",
    title: "SPECTRAL DISPERSION",
    client: "ISSEY MIYAKE",
    year: "2026",
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=1400&q=85",
    desc: "Optical prism dispersion through multi-coated glass elements, creating real chromatic diffraction.",
  },
];

// GLSL Vertex Shader - Exact Cylindrical Bend + Convex Upward Arch
const EXACT_CYLINDER_VERTEX_SHADER = /* glsl */ `
  precision highp float;
  #define PI 3.141592653589793

  varying vec2 vUv;
  varying vec3 vNormalVec;

  uniform vec2 uSize;
  uniform float uCurveRadius;
  uniform float uArchHeight;
  uniform float uVelocity;
  uniform float uIsReflection;

  // Exact bendCylinder formula
  vec3 bendCylinder(vec3 p, float radius) {
    if (radius <= 0.001) return p;
    float theta = p.x / radius;
    float radial = radius + p.z;
    float bentX = sin(theta) * radial;
    float bentZ = cos(theta) * radial - radius;
    return vec3(bentX, p.y, bentZ);
  }

  void main() {
    vUv = uv;
    vec3 nPos = position;

    // 1. Physical 3D Cylindrical Curvature
    vec3 bentPos = bendCylinder(nPos, uCurveRadius);

    // 2. Exact Upward Convex Arch matching user's screenshot
    float halfW = max(uSize.x * 0.5, 1.0);
    float normX = clamp(position.x / halfW, -1.0, 1.0);
    float arch = (1.0 - normX * normX) * uArchHeight;

    if (uIsReflection > 0.5) {
      bentPos.y -= arch * 0.8;
    } else {
      bentPos.y += arch;
    }

    // 3. Subtle wave flutter when rotating
    if (abs(uVelocity) > 0.0001) {
      float wave = sin((position.x / halfW) * PI * 1.5);
      bentPos.z += wave * uVelocity * 4.0;
    }

    vec4 mvPosition = modelViewMatrix * vec4(bentPos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    vNormalVec = normalize(normalMatrix * normal);
  }
`;

// GLSL Fragment Shader
const EXACT_CYLINDER_FRAGMENT_SHADER = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  varying vec3 vNormalVec;

  uniform sampler2D tDiffuse;
  uniform float uAlpha;
  uniform float uVelocity;
  uniform float uIsReflection;

  void main() {
    if (uAlpha <= 0.001) discard;

    vec2 uvCover = vUv;
    if (uIsReflection > 0.5) {
      uvCover.y = 1.0 - uvCover.y;
    }

    float velocityBlur = clamp(abs(uVelocity) * 0.003, 0.0, 0.04);

    // Subtle chromatic aberration on rotation
    vec2 aberration = vec2(0.004 * velocityBlur + 0.0008, 0.0);
    vec4 tex = texture2D(tDiffuse, uvCover);
    vec3 color = vec3(
      texture2D(tDiffuse, uvCover + aberration).r,
      tex.g,
      texture2D(tDiffuse, uvCover - aberration).b
    );

    // Smooth edge border
    float edge = smoothstep(0.0, 0.015, vUv.x) * smoothstep(1.0, 0.985, vUv.x)
               * smoothstep(0.0, 0.015, vUv.y) * smoothstep(1.0, 0.985, vUv.y);
    float finalAlpha = uAlpha * max(edge, 0.9);

    if (uIsReflection > 0.5) {
      // Mirror reflection floor fade (fades out downwards into white background)
      float floorFade = pow(vUv.y, 2.0) * 0.42;
      gl_FragColor = vec4(color, finalAlpha * floorFade);
    } else {
      gl_FragColor = vec4(color, finalAlpha);
    }
  }
`;

// Helper: Instant warm placeholder texture
function createPlaceholderTexture(): THREE.Texture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 320;
  const ctx = canvas.getContext("2d")!;
  const grad = ctx.createLinearGradient(0, 0, 512, 320);
  grad.addColorStop(0, "#FCE0AD");
  grad.addColorStop(0.5, "#DFAC6C");
  grad.addColorStop(1, "#8A5A2B");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 320);

  const tex = new THREE.CanvasTexture(canvas);
  tex.needsUpdate = true;
  return tex;
}

export const About = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // States
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [selectedItem, setSelectedItem] = useState<typeof PORTFOLIO_ITEMS[0] | null>(null);

  // WebGL & Physics State
  const stateRef = useRef<{
    renderer: THREE.WebGLRenderer | null;
    scene: THREE.Scene | null;
    camera: THREE.PerspectiveCamera | null;
    meshes: THREE.Mesh[];
    reflectionMeshes: THREE.Mesh[];
    planeGeo: THREE.PlaneGeometry | null;
    reflectGeo: THREE.PlaneGeometry | null;
    angle: number;
    targetAngle: number;
    velocity: number;
    isDragging: boolean;
    dragStartX: number;
    dragStartAngle: number;
    radius: number;
    cardWidth: number;
    cardHeight: number;
    archHeight: number;
    angleStep: number;
    mouse: { x: number; y: number; targetX: number; targetY: number };
    rafId: number;
  }>({
    renderer: null,
    scene: null,
    camera: null,
    meshes: [],
    reflectionMeshes: [],
    planeGeo: null,
    reflectGeo: null,
    angle: 0,
    targetAngle: 0,
    velocity: 0,
    isDragging: false,
    dragStartX: 0,
    dragStartAngle: 0,
    radius: 520,
    cardWidth: 490,
    cardHeight: 285,
    archHeight: 34,
    angleStep: (Math.PI * 2) / PORTFOLIO_ITEMS.length,
    mouse: { x: 0, y: 0, targetX: 0, targetY: 0 },
    rafId: 0,
  });

  // Step Rotate with Magnetic Snap (Next / Prev)
  const handleStep = useCallback((direction: 1 | -1) => {
    const step = stateRef.current.angleStep;
    const currentSnapped = Math.round(stateRef.current.targetAngle / step) * step;
    stateRef.current.targetAngle = currentSnapped + direction * step;
  }, []);

  // Main Three.js Setup & Interactive Cylinder Loop
  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const container = containerRef.current;
    const canvas = canvasRef.current;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 750;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 1, 3000);
    // Camera positioned at Z: 580 looking at center
    camera.position.set(0, 0, 580);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const state = stateRef.current;
    state.renderer = renderer;
    state.scene = scene;
    state.camera = camera;

    // Proportions matching user's target reference screenshot:
    // Card width covers ~45% of viewport, leaving PO on left and IO on right clearly visible!
    const N = PORTFOLIO_ITEMS.length;
    const angleStep = (Math.PI * 2) / N;
    state.angleStep = angleStep;

    const cardWidth = Math.min(Math.max(width * 0.445, 360), 485);
    const cardHeight = Math.round(cardWidth / 1.64);
    // Subtle gap (~34px) between cards along the perimeter
    const cardGap = 34;
    const cylinderRadius = (cardWidth + cardGap) / angleStep;
    const archHeight = Math.round(cardHeight * 0.12); // Exact upward convex curve matching aikawakenichi

    state.cardWidth = cardWidth;
    state.cardHeight = cardHeight;
    state.radius = cylinderRadius;
    state.archHeight = archHeight;

    // 2. Real-dimension PlaneGeometry
    const planeGeo = new THREE.PlaneGeometry(cardWidth, cardHeight, 64, 40);
    const reflectGeo = new THREE.PlaneGeometry(cardWidth, cardHeight * 0.70, 64, 30);
    state.planeGeo = planeGeo;
    state.reflectGeo = reflectGeo;

    state.meshes = [];
    state.reflectionMeshes = [];

    // 3. Texture Loader with cross-origin
    const textureLoader = new THREE.TextureLoader();
    textureLoader.setCrossOrigin("anonymous");

    // 4. Create Meshes for each Card and its Floor Reflection
    PORTFOLIO_ITEMS.forEach((item) => {
      const defaultTex = createPlaceholderTexture();

      // Primary Card Material
      const mat = new THREE.ShaderMaterial({
        vertexShader: EXACT_CYLINDER_VERTEX_SHADER,
        fragmentShader: EXACT_CYLINDER_FRAGMENT_SHADER,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          tDiffuse: { value: defaultTex },
          uSize: { value: new THREE.Vector2(cardWidth, cardHeight) },
          uCurveRadius: { value: cylinderRadius },
          uArchHeight: { value: archHeight },
          uVelocity: { value: 0 },
          uAlpha: { value: 1.0 },
          uIsReflection: { value: 0.0 },
        },
      });

      const mesh = new THREE.Mesh(planeGeo, mat);
      scene.add(mesh);
      state.meshes.push(mesh);

      // Floor Reflection Material (mirrored underneath)
      const matReflect = new THREE.ShaderMaterial({
        vertexShader: EXACT_CYLINDER_VERTEX_SHADER,
        fragmentShader: EXACT_CYLINDER_FRAGMENT_SHADER,
        transparent: true,
        side: THREE.DoubleSide,
        uniforms: {
          tDiffuse: { value: defaultTex },
          uSize: { value: new THREE.Vector2(cardWidth, cardHeight * 0.72) },
          uCurveRadius: { value: cylinderRadius },
          uArchHeight: { value: archHeight },
          uVelocity: { value: 0 },
          uAlpha: { value: 0.75 },
          uIsReflection: { value: 1.0 },
        },
      });

      const refMesh = new THREE.Mesh(reflectGeo, matReflect);
      scene.add(refMesh);
      state.reflectionMeshes.push(refMesh);

      // Load real image asynchronously
      textureLoader.load(
        item.image,
        (loadedTex) => {
          loadedTex.minFilter = THREE.LinearFilter;
          loadedTex.magFilter = THREE.LinearFilter;
          loadedTex.generateMipmaps = false;
          mat.uniforms.tDiffuse.value = loadedTex;
          matReflect.uniforms.tDiffuse.value = loadedTex;
        },
        undefined,
        () => {
          const fb = item.fallback || item.image;
          textureLoader.load(fb, (fbTex) => {
            fbTex.minFilter = THREE.LinearFilter;
            mat.uniforms.tDiffuse.value = fbTex;
            matReflect.uniforms.tDiffuse.value = fbTex;
          });
        }
      );
    });

    // 5. Update 3D Positions around Cylinder Circumference
    // CARD POSITIONED AT Y = -76 (exact vertical alignment matching aikawakenichi)
    const CARD_Y = -76;

    const updateCylinderTransforms = (currentAngle: number) => {
      const tiltX = -state.mouse.y * 0.035;
      const tiltY = state.mouse.x * 0.035;

      state.meshes.forEach((mesh, idx) => {
        const itemAngle = idx * angleStep + currentAngle;

        // Position on 3D Cylinder Perimeter
        const cylX = Math.sin(itemAngle) * state.radius;
        const cylZ = (Math.cos(itemAngle) - 1.0) * state.radius;
        const cylRotY = itemAngle + tiltY;

        // Primary Card transform
        mesh.position.set(cylX, CARD_Y, cylZ);
        mesh.rotation.set(tiltX, cylRotY, 0);

        // Reflection Mesh transform (mirrored directly below card)
        const refMesh = state.reflectionMeshes[idx];
        refMesh.position.set(cylX, CARD_Y - (cardHeight * 0.84), cylZ);
        refMesh.rotation.set(tiltX, cylRotY, 0);

        // Card opacity: smooth fade for cards on the backside of the drum
        const cosAngle = Math.cos(itemAngle);
        const frontVisibility = THREE.MathUtils.smoothstep(cosAngle, -0.35, 0.4);

        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uAlpha.value = frontVisibility;

        const refMat = refMesh.material as THREE.ShaderMaterial;
        refMat.uniforms.uAlpha.value = frontVisibility * 0.75;
      });
    };

    // 6. Physics Animation Loop with Inertial Damping & Magnetic Snap
    let lastAngle = 0;
    const animate = () => {
      state.angle += (state.targetAngle - state.angle) * 0.085;
      state.velocity = state.angle - lastAngle;
      lastAngle = state.angle;

      state.mouse.x += (state.mouse.targetX - state.mouse.x) * 0.06;
      state.mouse.y += (state.mouse.targetY - state.mouse.y) * 0.06;

      state.meshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uVelocity.value = state.velocity * 25.0;
      });
      state.reflectionMeshes.forEach((mesh) => {
        const mat = mesh.material as THREE.ShaderMaterial;
        mat.uniforms.uVelocity.value = state.velocity * 25.0;
      });

      updateCylinderTransforms(state.angle);
      renderer.render(scene, camera);

      // Track active center card
      const normalizedAngle = (-state.angle % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2);
      const activeIdx = Math.round(normalizedAngle / angleStep) % N;
      setActiveIndex(activeIdx);

      state.rafId = requestAnimationFrame(animate);
    };
    state.rafId = requestAnimationFrame(animate);

    // 7. Interactive Event Handlers with Auto-Snap
    let wheelTimeout: ReturnType<typeof setTimeout>;

    const onWheel = (e: WheelEvent) => {
      const delta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      state.targetAngle -= delta * 0.0022;

      clearTimeout(wheelTimeout);
      wheelTimeout = setTimeout(() => {
        state.targetAngle = Math.round(state.targetAngle / angleStep) * angleStep;
      }, 140);
    };

    const onPointerDown = (e: PointerEvent) => {
      state.isDragging = true;
      state.dragStartX = e.clientX;
      state.dragStartAngle = state.targetAngle;
      canvas.style.cursor = "grabbing";
    };

    const onPointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      state.mouse.targetX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      state.mouse.targetY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      if (!state.isDragging) return;
      const deltaX = e.clientX - state.dragStartX;
      state.targetAngle = state.dragStartAngle + (deltaX * 0.0035);
    };

    const onPointerUp = () => {
      if (!state.isDragging) return;
      state.isDragging = false;
      canvas.style.cursor = "grab";
      state.targetAngle = Math.round(state.targetAngle / angleStep) * angleStep;
    };

    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || window.innerWidth;
      const newH = container.clientHeight || 750;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener("resize", handleResize);
    container.addEventListener("wheel", onWheel, { passive: true });
    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);

    return () => {
      clearTimeout(wheelTimeout);
      cancelAnimationFrame(state.rafId);
      window.removeEventListener("resize", handleResize);
      container.removeEventListener("wheel", onWheel);
      canvas.removeEventListener("pointerdown", onPointerDown);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);

      state.meshes.forEach((mesh) => {
        (mesh.material as THREE.Material).dispose();
      });
      state.reflectionMeshes.forEach((mesh) => {
        (mesh.material as THREE.Material).dispose();
      });
      if (state.planeGeo) state.planeGeo.dispose();
      if (state.reflectGeo) state.reflectGeo.dispose();
      renderer.dispose();
    };
  }, []);

  const activeItem = PORTFOLIO_ITEMS[activeIndex] || PORTFOLIO_ITEMS[0];

  return (
    <section
      id="about"
      ref={containerRef}
      className="section-intro is--hero w-full min-h-[96vh] h-[96vh] bg-[#FFFFFF] text-black flex flex-col justify-between relative overflow-hidden select-none"
    >
      {/* 1. Exact top tagline matching aikawakenichi.com */}
      <div className="w-full pt-5 md:pt-6 z-20 flex flex-col items-center justify-center pointer-events-none">
        <p className="text-xs md:text-sm font-sans tracking-wide text-neutral-800">
          <span className="underline decoration-1 underline-offset-4 font-medium text-black">Make My Vid</span> is a high-end commercial video production studio.
        </p>
      </div>

      {/* 2. EXACT AIKAWAKENICHI PORTFOLIO TITLE (Editorial Old font, 18.1184vw length and height) */}
      <div className="absolute top-14 md:top-16 lg:top-20 inset-x-0 flex items-center justify-center pointer-events-none z-0">
        <h1
          className="w-full text-center uppercase select-none text-[#000000] whitespace-nowrap"
          style={{
            fontFamily: "'Editorial Old', 'Bodoni Moda', 'Playfair Display', serif",
            fontSize: "clamp(42px, 18.1184vw, 360px)",
            lineHeight: 1,
            letterSpacing: "0",
            fontWeight: 400,
          }}
        >
          PORTFOLIO
        </h1>
      </div>


      {/* 4. OVERLAID TITLE IN EDITORIAL OLD SERIF (Centered in the card, matching aikawakenichi Journey text) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-20 translate-y-20 md:translate-y-24">
        <div className="flex flex-col items-center justify-center transition-all duration-300">
          <span
            key={activeItem.tag}
            className="text-5xl md:text-6xl lg:text-[5.5rem] font-serif tracking-normal animate-fadeIn select-none font-normal"
            style={{
              fontFamily: "'Editorial Old', 'Bodoni Moda', serif",
              background: "linear-gradient(180deg, #FFFFFF 0%, #EAD5B0 40%, #C49755 80%, #7A4B1A 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "drop-shadow(0 2px 12px rgba(0, 0, 0, 0.45)) drop-shadow(0 1px 3px rgba(0, 0, 0, 0.75))",
            }}
          >
            {activeItem.tag}
          </span>
        </div>
      </div>

      {/* 5. Minimalist Glass Dock matching aikawakenichi.com */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-full transition-all duration-300 bg-neutral-900/80 text-white shadow-xl border border-white/20 backdrop-blur-md">
          <div className="w-5 h-5 rounded-full overflow-hidden border border-white/30 flex-shrink-0">
            <img src={activeItem.image} alt={activeItem.tag} className="w-full h-full object-cover" />
          </div>

          <span className="text-xs font-mono font-bold tracking-widest uppercase px-1 text-white/90">
            {activeItem.tag}
          </span>

          <button
            onClick={() => handleStep(-1)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/75 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Previous Card"
          >
            ←
          </button>

          <button
            onClick={() => handleStep(1)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/75 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Next Card"
          >
            →
          </button>

          <button
            onClick={() => handleStep(1)}
            className="w-6 h-6 rounded-full flex items-center justify-center text-white/75 hover:text-white hover:bg-white/10 transition-all text-xs"
            title="Rotate"
          >
            ↻
          </button>

          <div className="h-3 w-[1px] bg-white/20" />

          <button
            onClick={() => setSelectedItem(activeItem)}
            className="px-3 py-1 rounded-full text-[10px] font-mono font-bold bg-white text-black hover:bg-white/90 transition-all"
          >
            VIEW
          </button>
        </div>
      </div>

      {/* 6. Fullscreen Modal on View */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-6 md:p-16 animate-fadeIn"
          style={{
            backgroundColor: "rgba(0, 0, 0, 0.88)",
            backdropFilter: "blur(24px) saturate(180%)",
            WebkitBackdropFilter: "blur(24px) saturate(180%)",
          }}
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-neutral-950/90 border border-white/15 rounded-2xl overflow-hidden shadow-2xl flex flex-col md:flex-row items-center gap-8 p-6 md:p-10"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-all"
            >
              ✕
            </button>

            <div className="w-full md:w-1/2 aspect-[4/3] rounded-xl overflow-hidden relative shadow-lg border border-white/10">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
              />
            </div>

            <div className="w-full md:w-1/2 flex flex-col text-left text-white">
              <span className="text-xs font-mono tracking-widest text-white/50 uppercase mb-2">
                {selectedItem.tag} · {selectedItem.year}
              </span>
              <h3 className="text-2xl md:text-3xl font-heading uppercase font-bold mb-4 tracking-wide">
                {selectedItem.title}
              </h3>
              <p className="text-sm font-sans text-white/70 leading-relaxed mb-6">
                {selectedItem.desc}
              </p>

              <div className="flex flex-col gap-2 pt-4 border-t border-white/10 text-xs font-mono">
                <div className="flex justify-between text-white/50">
                  <span>CLIENT:</span>
                  <span className="text-white font-medium">{selectedItem.client}</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>FORMAT:</span>
                  <span className="text-white font-medium">35MM ANAMORPHIC / 4K PRORES</span>
                </div>
                <div className="flex justify-between text-white/50">
                  <span>CURVATURE:</span>
                  <span className="text-amber-400 font-medium">3D CYLINDRICAL ARC</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
