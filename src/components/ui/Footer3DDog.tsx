"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

interface Footer3DDogProps {
  onJoinUs?: () => void;
}

export const Footer3DDog: React.FC<Footer3DDogProps> = ({
  onJoinUs,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [isHovered, setIsHovered] = useState(false);
  const [dogStatus, setDogStatus] = useState<"idling" | "running">("idling");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let isDisposed = false;

    // 1. Scene, Camera & WebGL Renderer with ACES Tone Mapping
    const scene = new THREE.Scene();

    const width = container.clientWidth;
    const height = container.clientHeight;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 100);
    camera.position.set(0, 1.3, 7.0);
    camera.lookAt(0, -0.10, 0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.18;

    // 2. Outdoor Natural Sun & Skylight for Light Theme Footer
    const ambientLight = new THREE.AmbientLight(0xfffaf4, 1.25);
    scene.add(ambientLight);

    // Warm Sun Key Light casting crisp contact shadows onto the floor
    const keyLight = new THREE.DirectionalLight(0xfff3e2, 2.7);
    keyLight.position.set(4.5, 7.5, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0003;
    scene.add(keyLight);

    // Warm Golden Sunlight Backlight / Rim Kicker
    const sunRimLight = new THREE.DirectionalLight(0xffe8cf, 1.8);
    sunRimLight.position.set(-6, 3.5, -4);
    scene.add(sunRimLight);

    // Warm Ambient Fill Light
    const amberFill = new THREE.PointLight(0xf5dfc8, 1.3, 15);
    amberFill.position.set(2.5, 0.6, 3);
    scene.add(amberFill);

    // Warm Floor Ground Bounce Light
    const groundBounce = new THREE.DirectionalLight(0xe8ddcc, 0.85);
    groundBounce.position.set(0, -3.5, 2);
    scene.add(groundBounce);

    // Distant atmospheric horizon fog only (set far away so dog is NEVER obscured or blurred)
    scene.fog = new THREE.Fog(0xEAE3DB, 16.0, 32.0);

    // 3. Tactile 3D Ground / Floor Plane in exact #EAE3DB tone with architectural tile grid
    const textureLoader = new THREE.TextureLoader();
    const floorTileTexture = textureLoader.load("/textures/floor_tile.jpg?v=floor-v3");
    floorTileTexture.colorSpace = THREE.SRGBColorSpace;
    floorTileTexture.wrapS = THREE.RepeatWrapping;
    floorTileTexture.wrapT = THREE.RepeatWrapping;
    floorTileTexture.repeat.set(16, 6);
    floorTileTexture.anisotropy = 8;

    const floorGeo = new THREE.PlaneGeometry(42, 16);
    const floorMat = new THREE.MeshBasicMaterial({
      map: floorTileTexture,
    });
    const floorMesh = new THREE.Mesh(floorGeo, floorMat);
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(0, -1.185, 0.4);
    scene.add(floorMesh);

    // Dedicated Full-Width "MAKE MY VID" Floor Typography Plane (All alphabets 100% visible)
    const textTexture = textureLoader.load("/textures/floor_makemyvid_text.png?v=floor-txt-v3");
    textTexture.colorSpace = THREE.SRGBColorSpace;
    textTexture.anisotropy = 8;

    const TEXT_ASPECT = 1837 / 220; // Exact aspect ratio of crisp "MAKE  MY  VID" banner
    const textGeo = new THREE.PlaneGeometry(1, 1);
    const textMat = new THREE.MeshBasicMaterial({
      map: textTexture,
      transparent: true,
      depthWrite: false,
      polygonOffset: true,
      polygonOffsetFactor: -1,
      polygonOffsetUnits: -1,
    });
    const textMesh = new THREE.Mesh(textGeo, textMat);
    textMesh.rotation.x = -Math.PI / 2;
    textMesh.position.set(0, -1.183, 0.55);
    scene.add(textMesh);

    // Dynamically calculate text size so EVERY alphabet (M-A-K-E  M-Y  V-I-D) is fully visible
    const updateTextPlaneSize = (w: number, h: number) => {
      const vHeight = 2 * (camera.position.z - 0.55) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const vWidth = vHeight * (w / h);
      // Spans ~80% of screen width, leaving breathing margin on left & right
      const targetWidth = Math.min(vWidth * 0.82, 9.6);
      const targetHeight = targetWidth / TEXT_ASPECT;
      textMesh.scale.set(targetWidth, targetHeight, 1);
    };
    updateTextPlaneSize(width, height);

    // Soft Ground Shadow Contact Plane directly beneath paws and text
    const shadowGeo = new THREE.PlaneGeometry(42, 16);
    const shadowMat = new THREE.ShadowMaterial({ opacity: 0.32 });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.set(0, -1.181, 0.4);
    shadowPlane.receiveShadow = true;
    scene.add(shadowPlane);

    // 4. Model Hierarchy & Bone Management
    const dogMasterGroup = new THREE.Group();
    scene.add(dogMasterGroup);
    dogMasterGroup.position.set(0, -1.18, 0.3);

    const bones: Record<string, THREE.Bone> = {};
    const initialQuats: Record<string, THREE.Quaternion> = {};
    const initialPositions: Record<string, THREE.Vector3> = {};

    // 5. Load Authentic Rigged Golden Retriever Model
    const loader = new GLTFLoader();

    // High-resolution photorealistic fur diffuse & normal maps matching Golden Retriever reference photo
    const furDiffuse = textureLoader.load("/textures/dog_diffuse.jpg?v=golden-v4");
    furDiffuse.colorSpace = THREE.SRGBColorSpace;
    furDiffuse.wrapS = THREE.RepeatWrapping;
    furDiffuse.wrapT = THREE.RepeatWrapping;

    const furNormal = textureLoader.load("/textures/glb_extracted/NormalMap.png");
    furNormal.wrapS = THREE.RepeatWrapping;
    furNormal.wrapT = THREE.RepeatWrapping;

    loader.load(
      "/models/dog_animated.glb",
      (gltf) => {
        if (isDisposed) return;

        const model = gltf.scene;

        // Auto-center model and place paws onto ground shadow plane
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        model.position.x = -center.x;
        model.position.y = -box.min.y;
        model.position.z = -center.z;

        // Majestic, prominent scale showcasing crisp facial features, paws, and fur detail
        const TARGET_SCALE = 7.5;
        model.scale.set(TARGET_SCALE, TARGET_SCALE, TARGET_SCALE);

        // Enhance PBR materials: rich multi-tonal fur, specular sheen, and deep normal depth
        model.traverse((child) => {
          if ((child as THREE.Mesh).isMesh) {
            const mesh = child as THREE.Mesh;
            mesh.castShadow = true;
            mesh.receiveShadow = true;

            if (mesh.material) {
              // Create photorealistic fur material preserving 100% authentic photographic coat colors
              const enhancedMat = new THREE.MeshStandardMaterial({
                map: furDiffuse, // Authentic Golden Retriever diffuse with black leather nose, dark eyes & paw pads
                normalMap: furNormal, // High-resolution authentic muscle & fur normal map
                normalScale: new THREE.Vector2(1.35, 1.35), // Crisp hair strand and anatomy definition
                roughness: 0.58, // Natural coat with healthy canine sheen
                metalness: 0.0,  // Zero metalness on biological fur
                color: new THREE.Color(0xffffff),
                fog: false, // Critical: ensures dog is 100% razor-sharp with ZERO beige fog blur
              });

              // Subtle natural sun rim light catching hair follicles matching reference photo
              enhancedMat.onBeforeCompile = (shader) => {
                shader.fragmentShader = shader.fragmentShader.replace(
                  "#include <dithering_fragment>",
                  `
                  #include <dithering_fragment>
                  // Soft natural sun rim highlight on golden coat silhouette
                  float fresnel = pow(1.0 - max(dot(vNormal, normalize(-vViewPosition)), 0.0), 3.0);
                  gl_FragColor.rgb += vec3(0.40, 0.26, 0.12) * fresnel * 0.30;
                  `
                );
              };

              mesh.material = enhancedMat;
              mesh.material.needsUpdate = true;
            }
          }

          // Cache skeletal bones and initial rest transforms
          if ((child as THREE.Bone).isBone) {
            const bone = child as THREE.Bone;
            bones[bone.name] = bone;
            initialQuats[bone.name] = bone.quaternion.clone();
            initialPositions[bone.name] = bone.position.clone();
          }
        });

        dogMasterGroup.add(model);
        setIsLoading(false);
      },
      undefined,
      (error) => {
        console.error("Error loading dog_animated.glb:", error);
      }
    );

    // 5. Cursor Tracking & Kinematics Engine with Floor Plane Raycasting
    const raycaster = new THREE.Raycaster();
    const floorPlane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 1.18);
    const floorIntersect = new THREE.Vector3();

    const targetPos = {
      x: 0,
      y: -1.18,
      z: 0.3,
    };

    const currentPos = {
      x: 0,
      y: -1.18,
      z: 0.3,
      speed: 0,
      rotationY: 0,
      rotationZ: 0,
      turnYaw: 0,
      trotPhase: 0,
      wagPhase: 0,
      breathPhase: 0,
      normX: 0,
      normY: 0,
      locomotionWeight: 0,
    };

    const handlePointerMove = (e: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX;
      const clientY = e.clientY;

      // Allow tracking even when hovering over navigation links on the right
      if (
        clientX >= rect.left - 50 &&
        clientX <= rect.right + 50 &&
        clientY >= rect.top &&
        clientY <= rect.bottom
      ) {
        setIsHovered(true);

        const normX = Math.max(-1, Math.min(1, ((clientX - rect.left) / rect.width) * 2 - 1));
        const normY = -Math.max(-1, Math.min(1, ((clientY - rect.top) / rect.height) * 2 - 1));

        currentPos.normX = normX;
        currentPos.normY = normY;

        // Mathematical perspective floor raycasting: maps cursor directly to 3D stage floor
        const mouseNDC = new THREE.Vector2(normX, normY);
        raycaster.setFromCamera(mouseNDC, camera);

        if (raycaster.ray.intersectPlane(floorPlane, floorIntersect)) {
          // Reaches full width of footer (from far-left to far-right under directory links)
          targetPos.x = THREE.MathUtils.clamp(floorIntersect.x, -7.2, 7.2);
          targetPos.z = THREE.MathUtils.clamp(floorIntersect.z, -1.6, 2.2);
        } else {
          targetPos.x = normX * 6.5;
          targetPos.z = 0.2 - normY * 1.4;
        }
        targetPos.y = -1.18;
      }
    };

    const handlePointerLeave = () => {
      setIsHovered(false);
      targetPos.x = 0;
      targetPos.y = -1.18;
      targetPos.z = 0.3;
      currentPos.normX = 0;
      currentPos.normY = 0;
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    container.addEventListener("pointerleave", handlePointerLeave);

    // Anatomical bone rotation vectors matching GLTF skeletal bind pose
    const AXIS_X = new THREE.Vector3(1, 0, 0);
    const AXIS_INV_X = new THREE.Vector3(-1, 0, 0);
    const AXIS_Z = new THREE.Vector3(0, 0, 1);
    const AXIS_Y = new THREE.Vector3(0, 1, 0);

    // Helper to rotate a bone around an exact axis in its parent space
    const rotateBoneAxis = (
      name: string,
      axis: THREE.Vector3,
      angle: number
    ) => {
      const bone = bones[name];
      const q0 = initialQuats[name];
      if (!bone || !q0) return;
      const delta = new THREE.Quaternion().setFromAxisAngle(axis, angle);
      bone.quaternion.copy(q0).premultiply(delta);
    };

    // Helper to rotate a bone around Euler angles
    const rotateBoneEuler = (
      name: string,
      pitch: number,
      yaw: number = 0,
      roll: number = 0
    ) => {
      const bone = bones[name];
      const q0 = initialQuats[name];
      if (!bone || !q0) return;
      const delta = new THREE.Quaternion().setFromEuler(
        new THREE.Euler(pitch, yaw, roll)
      );
      bone.quaternion.copy(q0).premultiply(delta);
    };

    // 6. Smooth Animation Render Loop with Continuous Locomotion Blending
    let animId: number;
    let lastTime = performance.now();

    const animate = (currentTime: number) => {
      animId = requestAnimationFrame(animate);

      const dt = Math.min((currentTime - lastTime) / 1000, 0.08);
      lastTime = currentTime;

      const dx = targetPos.x - currentPos.x;
      const dz = targetPos.z - currentPos.z;
      const dist = Math.hypot(dx, dz);

      // 1. Responsive & Silky Position Following (No lagging behind cursor)
      const prevX = currentPos.x;
      const prevZ = currentPos.z;
      const followRate = THREE.MathUtils.lerp(18.0, 24.0, Math.min(dist / 2.5, 1.0));
      const moveEase = 1.0 - Math.exp(-followRate * dt);
      currentPos.x += dx * moveEase;
      currentPos.z += dz * moveEase;
      currentPos.y = -1.18;

      // 2. Real Physical Ground Speed Calculation (Zero mismatch, zero slipping)
      const frameDist = Math.hypot(currentPos.x - prevX, currentPos.z - prevZ);
      const instantSpeed = dt > 0 ? frameDist / dt : 0;
      currentPos.speed = THREE.MathUtils.damp(currentPos.speed, instantSpeed, 12.0, dt);

      // Smooth continuous locomotion weight: transitions gracefully without abrupt on/off jerking
      const targetWeight = THREE.MathUtils.clamp(
        Math.max(currentPos.speed / 1.1, (dist - 0.08) / 0.32),
        0.0,
        1.0
      );
      currentPos.locomotionWeight = THREE.MathUtils.damp(
        currentPos.locomotionWeight,
        targetWeight,
        12.0,
        dt
      );
      const lw = currentPos.locomotionWeight;

      // 3. Smooth Non-Snapping Heading & Turning (Clamped angular rate, deadzone at rest)
      let angleDiff = 0;
      if (dist > 0.18 && currentPos.speed > 0.12) {
        const targetAngle = Math.atan2(dx, dz);
        angleDiff = targetAngle - currentPos.rotationY;
        while (angleDiff > Math.PI) angleDiff -= Math.PI * 2;
        while (angleDiff < -Math.PI) angleDiff += Math.PI * 2;

        // Smooth clamped turning to prevent instantaneous rotation snaps
        const maxTurnStep = 9.0 * dt;
        const turnStep = THREE.MathUtils.clamp(angleDiff * 10.0 * dt, -maxTurnStep, maxTurnStep);
        currentPos.rotationY += turnStep;

        // Athletic banking roll as dog leans smoothly into turns
        const targetBank = -Math.max(-0.16, Math.min(0.16, angleDiff * 0.25));
        currentPos.rotationZ = THREE.MathUtils.damp(currentPos.rotationZ, targetBank * lw, 12.0, dt);
      } else {
        currentPos.rotationZ = THREE.MathUtils.damp(currentPos.rotationZ, 0, 12.0, dt);
      }
      currentPos.turnYaw = THREE.MathUtils.damp(
        currentPos.turnYaw,
        THREE.MathUtils.clamp(angleDiff, -0.45, 0.45),
        8.0,
        dt
      );

      // --- 1. VELOCITY-MATCHED STRIDE (Zero Foot Sliding) ---
      // Physical stride length calibrated to model world scale
      const STRIDE_LENGTH = 0.95;
      const phaseDelta = (currentPos.speed / STRIDE_LENGTH) * dt;
      currentPos.trotPhase += phaseDelta;
      currentPos.wagPhase += dt * 3.5;
      currentPos.breathPhase += dt * 2.4;

      const p = currentPos.trotPhase;
      // Stride leg swing angle: natural range between 0.48 (walk) and 0.82 (athletic trot)
      const strideAngle = THREE.MathUtils.lerp(0.48, 0.82, Math.min(currentPos.speed / 7.5, 1.0));
      const kneeAngle = THREE.MathUtils.lerp(0.60, 1.00, Math.min(currentPos.speed / 7.5, 1.0));

      // --- REAL QUADRUPED DIAGONAL TROT LOCOMOTION ---
      // 1. Diagonal A: Front-Left & Rear-Right
      rotateBoneAxis("Dog_l_FrontLeg_HipSHJnt", AXIS_X, Math.sin(p) * strideAngle * lw);
      rotateBoneAxis(
        "Dog_l_FrontLeg_KneeSHJnt",
        AXIS_INV_X,
        Math.max(0, Math.cos(p)) * kneeAngle * lw
      );
      rotateBoneAxis(
        "Dog_l_FrontLeg_AnkleSHJnt",
        AXIS_INV_X,
        Math.max(0, Math.cos(p)) * 0.32 * lw
      );

      rotateBoneAxis("Dog_r_HindLeg_HipSHJnt", AXIS_Z, Math.sin(p) * strideAngle * lw);
      rotateBoneAxis(
        "Dog_r_HindLeg_Knee1SHJnt",
        AXIS_INV_X,
        Math.max(0, Math.cos(p)) * kneeAngle * lw
      );
      rotateBoneAxis(
        "Dog_r_HindLeg_AnkleSHJnt",
        AXIS_INV_X,
        Math.max(0, -Math.sin(p)) * 0.40 * lw
      );

      // 2. Diagonal B: Front-Right & Rear-Left (180° out of phase)
      rotateBoneAxis("Dog_r_FrontLeg_HipSHJnt", AXIS_X, Math.sin(p + Math.PI) * strideAngle * lw);
      rotateBoneAxis(
        "Dog_r_FrontLeg_KneeSHJnt",
        AXIS_INV_X,
        Math.max(0, Math.cos(p + Math.PI)) * kneeAngle * lw
      );
      rotateBoneAxis(
        "Dog_r_FrontLeg_AnkleSHJnt",
        AXIS_INV_X,
        Math.max(0, Math.cos(p + Math.PI)) * 0.32 * lw
      );

      rotateBoneAxis("Dog_l_HindLeg_HipSHJnt", AXIS_Z, Math.sin(p + Math.PI) * strideAngle * lw);
      rotateBoneAxis(
        "Dog_l_HindLeg_Knee1SHJnt",
        AXIS_INV_X,
        Math.max(0, Math.cos(p + Math.PI)) * kneeAngle * lw
      );
      rotateBoneAxis(
        "Wolf_l_HindLeg_AnkleSHJnt",
        AXIS_INV_X,
        Math.max(0, -Math.sin(p + Math.PI)) * 0.40 * lw
      );

      // --- 2. SMOOTH HARMONIC SUSPENSION BOUNCE (Zero Discontinuities / Zero Jerks) ---
      // Harmonic sinusoidal bounce at double gait frequency without sharp cusps
      const strideBounce = -Math.sin(p * 2) * 0.024 * lw;
      const breathBounce = Math.sin(currentPos.breathPhase) * 0.006 * (1.0 - lw);

      if (bones["DogROOTSHJnt"] && initialPositions["DogROOTSHJnt"]) {
        bones["DogROOTSHJnt"].position.y =
          initialPositions["DogROOTSHJnt"].y + strideBounce + breathBounce;
      }

      // Smooth chest pitch (rotational pitch without translational dislocation)
      const chestPitch = Math.cos(p * 2) * 0.022 * lw;
      rotateBoneAxis("Dog_Spine_TopSHJnt", AXIS_X, chestPitch);

      // --- 3. LATERAL SPINE & PELVIS S-CURVE ---
      const pelvisYaw = Math.sin(p) * 0.08 * lw;
      const spineChestYaw = -Math.sin(p) * 0.06 * lw;
      rotateBoneAxis("DogROOTSHJnt", AXIS_Y, pelvisYaw);
      rotateBoneAxis("Dog_Spine_TopSHJnt", AXIS_Y, spineChestYaw);

      // --- 4. TAIL PHYSICS WITH INERTIA & TURN COUNTERBALANCE ---
      const tailBones = [
        "Dog_Tail_01_02SHJnt",
        "Dog_Tail_01_03SHJnt",
        "Dog_Tail_01_04SHJnt",
        "Dog_Tail_01_05SHJnt",
      ];
      const idleTailWag = Math.sin(currentPos.wagPhase * 2.5) * 0.18 * (1.0 - lw);

      tailBones.forEach((tName, i) => {
        const lag = i * 0.18;
        const dynamicTailWag =
          Math.sin(p - 0.4 - lag) * 0.20 * lw +
          currentPos.turnYaw * 0.22 * (1.0 + i * 0.15) * lw;
        rotateBoneAxis(
          tName,
          AXIS_Y,
          dynamicTailWag + idleTailWag * (1.0 + i * 0.2)
        );
      });

      // Joyous Open Panting Jaw
      const jawAngle = THREE.MathUtils.lerp(
        0.18 + Math.sin(currentPos.breathPhase * 2.8) * 0.04,
        0.26 + Math.sin(p * 2) * 0.08,
        lw
      );
      rotateBoneAxis("Dog_Head_JawSHJnt", AXIS_X, jawAngle);

      // Aerodynamic Floppy Ears Bounce
      rotateBoneAxis("Dog_l_Ear_01_01SHJnt", AXIS_Z, Math.sin(p * 2 - 0.4) * 0.28 * lw);
      rotateBoneAxis("Dog_r_Ear_01_01SHJnt", AXIS_Z, -Math.sin(p * 2 - 0.4) * 0.28 * lw);

      // Attentive Head & Gaze Tracking with subtle running bob
      const lookYaw = THREE.MathUtils.clamp((targetPos.x - currentPos.x) * 0.22, -0.5, 0.5);
      const lookPitch = THREE.MathUtils.clamp(-currentPos.normY * 0.25, -0.3, 0.3);
      const headBob = Math.cos(p * 2) * 0.04 * lw;
      rotateBoneEuler("Dog_Neck_01SHJnt", lookPitch * 0.7 + headBob, lookYaw * 0.7);
      rotateBoneEuler("Dog_Neck_TopSHJnt", lookPitch * 0.5, lookYaw * 0.5);

      // Apply transformations to master group
      dogMasterGroup.position.set(currentPos.x, currentPos.y, currentPos.z);
      dogMasterGroup.rotation.y = currentPos.rotationY;
      dogMasterGroup.rotation.z = currentPos.rotationZ;

      renderer.render(scene, camera);
    };

    animId = requestAnimationFrame(animate);

    // 7. Responsive Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      updateTextPlaneSize(newW, newH);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    return () => {
      isDisposed = true;
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      window.removeEventListener("pointermove", handlePointerMove);
      container.removeEventListener("pointerleave", handlePointerLeave);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[420px] sm:h-[480px] md:h-[520px] lg:h-[560px] overflow-hidden select-none cursor-crosshair flex items-center justify-center bg-[#EAE3DB] bg-dots-pattern"
      style={{
        backgroundColor: "#EAE3DB",
      }}
    >
      {/* ✦ Subtle Sparkling Star Ornaments */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <span
          className="absolute top-10 left-[14%] text-blue-500/35 text-sm animate-pulse"
          style={{ animationDuration: "3.2s" }}
        >
          ✦
        </span>
        <span
          className="absolute top-16 right-[18%] text-[#2563EB]/40 text-base animate-pulse"
          style={{ animationDuration: "4.2s" }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-28 left-[22%] text-amber-600/30 text-xs animate-pulse"
          style={{ animationDuration: "2.6s" }}
        >
          ✦
        </span>
        <span
          className="absolute bottom-16 right-[20%] text-blue-600/35 text-xs animate-pulse"
          style={{ animationDuration: "3.6s" }}
        >
          ✦
        </span>
        <span className="absolute top-1/2 left-[5%] text-zinc-400/35 text-xs">
          ✦
        </span>
      </div>

      {/* Top-Left Block: Logo & Tagline (Positioned as marked in user's image) */}
      <div className="absolute top-8 left-6 sm:top-10 sm:left-10 lg:left-16 z-30 pointer-events-auto flex flex-col items-start max-w-[260px] sm:max-w-xs text-left">
        <a
          href="/"
          className="flex items-center transition-opacity hover:opacity-85"
          aria-label="Make My Vid Home"
        >
          <img
            src="https://storage.googleapis.com/mkv_imagesbackend/navbar_logo/677e52686d8ba_navbarlogo.png"
            alt="MAKE MY VID"
            className="h-7 sm:h-8 w-auto object-contain"
          />
        </a>

        <p
          className="text-black font-bold text-xs sm:text-sm tracking-wide mt-2.5 leading-relaxed"
          style={{ color: "#000000" }}
        >
          ELEVATING/ EMPOWERING/ EVOLVING Brands through videos.
        </p>
      </div>

      {/* Right Block: Directory Navigation Columns (Positioned as marked in user's image, Solid Black) */}
      <div className="absolute top-8 right-6 sm:top-10 sm:right-10 lg:right-16 z-30 pointer-events-auto flex items-start gap-10 sm:gap-14 lg:gap-20 text-left">
        {/* Column 1: Home, About, Join Us, Blogs */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          <a
            href="/"
            className="text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200"
            style={{ color: "#000000" }}
          >
            Home
          </a>
          <a
            href="#about"
            className="text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200"
            style={{ color: "#000000" }}
          >
            About
          </a>
          <button
            type="button"
            onClick={onJoinUs}
            className="text-left text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200 cursor-pointer"
            style={{ color: "#000000" }}
          >
            Join Us
          </button>
          <a
            href="#archive"
            className="text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200"
            style={{ color: "#000000" }}
          >
            Blogs
          </a>
        </div>

        {/* Column 2: Projects, Services, Support */}
        <div className="flex flex-col gap-3 sm:gap-3.5">
          <a
            href="#archive"
            className="text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200"
            style={{ color: "#000000" }}
          >
            Projects
          </a>
          <a
            href="#expertise"
            className="text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200"
            style={{ color: "#000000" }}
          >
            Services
          </a>
          <a
            href="#faq"
            className="text-sm sm:text-base font-bold text-black hover:text-blue-600 transition-colors duration-200"
            style={{ color: "#000000" }}
          >
            Support
          </a>
        </div>
      </div>

      {/* 100% Solid & Opaque Photorealistic 3D Golden Retriever Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full z-20 pointer-events-none"
      />

      {/* Loading state indicator */}
      {isLoading && (
        <div className="absolute inset-0 z-25 flex items-center justify-center pointer-events-none bg-[#F5EFE6]/70 backdrop-blur-xs">
          <div className="flex items-center gap-2 text-zinc-700 font-mono text-xs uppercase tracking-widest font-semibold">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-ping" />
            Loading 3D Golden Retriever...
          </div>
        </div>
      )}
    </div>
  );
};
