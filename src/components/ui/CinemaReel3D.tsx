"use client";
import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface CinemaReel3DProps {
  className?: string;
}

export const CinemaReel3D: React.FC<CinemaReel3DProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const width = container.clientWidth || 240;
    const height = container.clientHeight || 150;

    const camera = new THREE.PerspectiveCamera(36, width / height, 0.1, 50);
    camera.position.set(0.4, 0.15, 6.4);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.setClearColor(0x000000, 0);

    // 2. Studio Lighting Setup (Cinema metallic lighting)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    scene.add(ambientLight);

    // Key Specular Light (Top-left, crisp reflections)
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
    keyLight.position.set(-3.5, 4.0, 5.0);
    scene.add(keyLight);

    // Lavender Rim Light (Purple reflection on metal edges)
    const rimLight = new THREE.DirectionalLight(0xb9a1f7, 2.5);
    rimLight.position.set(4.0, -2.5, -2.0);
    scene.add(rimLight);

    // Warm Beige Soft Fill Light (Bottom-front)
    const fillLight = new THREE.DirectionalLight(0xf3ebdd, 0.9);
    fillLight.position.set(1.5, -3.0, 3.5);
    scene.add(fillLight);

    // 3. Procedural Textures for Maximum Realism
    // A. Film winding layers texture (Deep Indigo celluloid mass)
    const filmTexCanvas = document.createElement("canvas");
    filmTexCanvas.width = 512;
    filmTexCanvas.height = 512;
    const filmCtx = filmTexCanvas.getContext("2d");
    if (filmCtx) {
      const grad = filmCtx.createRadialGradient(256, 256, 40, 256, 256, 256);
      grad.addColorStop(0, "#0b0817");
      grad.addColorStop(0.5, "#181232");
      grad.addColorStop(0.85, "#0b0817");
      grad.addColorStop(1, "#211747");
      filmCtx.fillStyle = grad;
      filmCtx.fillRect(0, 0, 512, 512);

      // Fine concentric winding micro-grooves with subtle lavender sheen
      for (let r = 50; r < 250; r += 3) {
        filmCtx.beginPath();
        filmCtx.arc(256, 256, r, 0, Math.PI * 2);
        filmCtx.strokeStyle = r % 6 === 0 ? "rgba(185, 161, 247, 0.25)" : "rgba(33, 23, 71, 0.7)";
        filmCtx.lineWidth = 1;
        filmCtx.stroke();
      }
    }
    const filmRollTexture = new THREE.CanvasTexture(filmTexCanvas);

    // B. Film Ribbon Leader Texture (Dark celluloid with perforations)
    const ribbonCanvas = document.createElement("canvas");
    ribbonCanvas.width = 512;
    ribbonCanvas.height = 128;
    const ribCtx = ribbonCanvas.getContext("2d");
    if (ribCtx) {
      ribCtx.fillStyle = "#0c0919";
      ribCtx.fillRect(0, 0, 512, 128);

      // Glossy celluloid highlight stripe with lavender sheen
      const glossGrad = ribCtx.createLinearGradient(0, 0, 0, 128);
      glossGrad.addColorStop(0, "rgba(185, 161, 247, 0.15)");
      glossGrad.addColorStop(0.3, "rgba(255, 255, 255, 0.04)");
      glossGrad.addColorStop(0.7, "rgba(0, 0, 0, 0.5)");
      glossGrad.addColorStop(1, "rgba(185, 161, 247, 0.12)");
      ribCtx.fillStyle = glossGrad;
      ribCtx.fillRect(0, 0, 512, 128);

      // Top and bottom sprocket perforations (KS-1870 standard 35mm)
      ribCtx.fillStyle = "rgba(243, 235, 221, 0.85)";
      for (let x = 16; x < 500; x += 32) {
        // Top holes
        ribCtx.beginPath();
        ribCtx.roundRect(x, 10, 16, 12, 2);
        ribCtx.fill();

        // Bottom holes
        ribCtx.beginPath();
        ribCtx.roundRect(x, 106, 16, 12, 2);
        ribCtx.fill();
      }

      // Edge markings in Neon Lime (#D5FF3F) for authentic lab print
      ribCtx.fillStyle = "#D5FF3F";
      ribCtx.font = "bold 13px monospace";
      ribCtx.fillText("MMV-35MM ▶ KODAK 5219", 140, 70);
    }
    const ribbonTexture = new THREE.CanvasTexture(ribbonCanvas);
    ribbonTexture.wrapS = THREE.RepeatWrapping;
    ribbonTexture.wrapT = THREE.ClampToEdgeWrapping;

    // 4. Materials
    const titaniumMaterial = new THREE.MeshStandardMaterial({
      color: 0x9ba2b2,
      metalness: 0.92,
      roughness: 0.22,
    });

    const polishedChromeMaterial = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      metalness: 0.98,
      roughness: 0.08,
    });

    const brassMaterial = new THREE.MeshStandardMaterial({
      color: 0xd97706,
      metalness: 0.85,
      roughness: 0.3,
    });

    const filmRollMaterial = new THREE.MeshStandardMaterial({
      color: 0x14161d,
      map: filmRollTexture,
      roughness: 0.55,
      metalness: 0.3,
    });

    const ribbonMaterial = new THREE.MeshStandardMaterial({
      map: ribbonTexture,
      roughness: 0.4,
      metalness: 0.2,
      side: THREE.DoubleSide,
    });

    const darkCoreMaterial = new THREE.MeshStandardMaterial({
      color: 0x090a0d,
      roughness: 0.8,
      metalness: 0.2,
    });

    // 5. Construct 3D Cinema Reel Geometry
    const masterReelGroup = new THREE.Group();
    scene.add(masterReelGroup);

    // Initial 3D Isometric / Perspective tilt so depth is immediately palpable
    masterReelGroup.position.set(-0.25, 0.05, 0);
    masterReelGroup.rotation.y = -0.28; // Tilted ~16 degrees into page to reveal thickness & gap
    masterReelGroup.rotation.x = 0.08;  // Tilted ~5 degrees top-down to see into inspection holes

    // Rotor group (The spinning spool assembly)
    const rotorGroup = new THREE.Group();
    masterReelGroup.add(rotorGroup);

    // Flange 2D Shape with 6 Hole Cutouts
    const flangeShape = new THREE.Shape();
    flangeShape.absarc(0, 0, 1.95, 0, Math.PI * 2, false);

    // Center spindle cutout
    const centerHole = new THREE.Path();
    centerHole.absarc(0, 0, 0.26, 0, Math.PI * 2, true);
    flangeShape.holes.push(centerHole);

    // 6 Precision Flange Inspection Windows
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const hx = 1.12 * Math.cos(angle);
      const hy = 1.12 * Math.sin(angle);
      const hole = new THREE.Path();
      hole.absarc(hx, hy, 0.38, 0, Math.PI * 2, true);
      flangeShape.holes.push(hole);
    }

    const extrudeSettings: THREE.ExtrudeGeometryOptions = {
      depth: 0.05,
      bevelEnabled: true,
      bevelSegments: 3,
      steps: 1,
      bevelSize: 0.018,
      bevelThickness: 0.018,
    };

    const flangeGeom = new THREE.ExtrudeGeometry(flangeShape, extrudeSettings);

    // Front Flange
    const frontFlange = new THREE.Mesh(flangeGeom, titaniumMaterial);
    frontFlange.position.z = 0.30;
    rotorGroup.add(frontFlange);

    // Rear Flange (Identical plate at back)
    const rearFlange = new THREE.Mesh(flangeGeom.clone(), titaniumMaterial);
    rearFlange.position.z = -0.35;
    rotorGroup.add(rearFlange);

    // Wound Film Pack (Celluloid mass coiled between the two flanges)
    const filmCylGeom = new THREE.CylinderGeometry(1.62, 1.62, 0.62, 48);
    filmCylGeom.rotateX(Math.PI / 2);
    const filmRollMesh = new THREE.Mesh(filmCylGeom, filmRollMaterial);
    rotorGroup.add(filmRollMesh);

    // Center Core Hub (Cast Aluminum)
    const hubCylGeom = new THREE.CylinderGeometry(0.48, 0.48, 0.72, 32);
    hubCylGeom.rotateX(Math.PI / 2);
    const hubMesh = new THREE.Mesh(hubCylGeom, polishedChromeMaterial);
    rotorGroup.add(hubMesh);

    // Front Chrome Hub Cap with Arriflex Drive Lugs
    const hubCapGeom = new THREE.CylinderGeometry(0.38, 0.38, 0.08, 32);
    hubCapGeom.rotateX(Math.PI / 2);
    const hubCap = new THREE.Mesh(hubCapGeom, polishedChromeMaterial);
    hubCap.position.z = 0.37;
    rotorGroup.add(hubCap);

    // Center Spindle Brass Bushing & Dark Core Hole
    const brassBushingGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.12, 24);
    brassBushingGeom.rotateX(Math.PI / 2);
    const brassBushing = new THREE.Mesh(brassBushingGeom, brassMaterial);
    brassBushing.position.z = 0.39;
    rotorGroup.add(brassBushing);

    const axleHoleGeom = new THREE.CylinderGeometry(0.08, 0.08, 0.14, 16);
    axleHoleGeom.rotateX(Math.PI / 2);
    const axleHole = new THREE.Mesh(axleHoleGeom, darkCoreMaterial);
    axleHole.position.z = 0.40;
    rotorGroup.add(axleHole);

    // 6 Stainless Steel Hex Socket Screws around Hub Ring
    for (let i = 0; i < 6; i++) {
      const angle = (i * Math.PI) / 3;
      const bx = 0.68 * Math.cos(angle);
      const by = 0.68 * Math.sin(angle);

      const boltGeom = new THREE.CylinderGeometry(0.05, 0.05, 0.08, 12);
      boltGeom.rotateX(Math.PI / 2);
      const bolt = new THREE.Mesh(boltGeom, polishedChromeMaterial);
      bolt.position.set(bx, by, 0.36);
      rotorGroup.add(bolt);
    }

    // 6. Stationary Assembly: Tension Guide Roller & Unspooling Film Ribbon
    // (Stationary relative to rotor rotation so film feeds consistently into track)
    const guideAssembly = new THREE.Group();
    masterReelGroup.add(guideAssembly);

    // Chrome Tension Guide Roller Pin (At tangent point where film straightens)
    const rollerRadius = 0.15;
    const rollerGeom = new THREE.CylinderGeometry(rollerRadius, rollerRadius, 0.74, 24);
    rollerGeom.rotateX(Math.PI / 2);
    const tensionRoller = new THREE.Mesh(rollerGeom, polishedChromeMaterial);
    tensionRoller.position.set(1.75, -1.25, 0);
    guideAssembly.add(tensionRoller);

    // Tension Roller End Cap Screws (Top & Bottom)
    const rollerCapGeom = new THREE.CylinderGeometry(0.18, 0.18, 0.06, 20);
    rollerCapGeom.rotateX(Math.PI / 2);
    const rollerCapFront = new THREE.Mesh(rollerCapGeom, brassMaterial);
    rollerCapFront.position.set(1.75, -1.25, 0.39);
    guideAssembly.add(rollerCapFront);

    const rollerCapRear = new THREE.Mesh(rollerCapGeom.clone(), brassMaterial);
    rollerCapRear.position.set(1.75, -1.25, -0.39);
    guideAssembly.add(rollerCapRear);

    // Mechanical Guide Bracket Arm (Anchoring the roller to the reel chassis)
    const bracketGeom = new THREE.BoxGeometry(0.12, 0.85, 0.84);
    const bracketMesh = new THREE.Mesh(bracketGeom, titaniumMaterial);
    bracketMesh.position.set(1.64, -1.25, 0);
    guideAssembly.add(bracketMesh);

    // 7. 3D Unspooling Curved Film Ribbon (Emerge from reel -> wraps over roller -> levels out)
    const curve1 = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.1, -1.62, 0),
      new THREE.Vector3(0.9, -1.62, 0),
      new THREE.Vector3(1.45, -1.45, 0),
      new THREE.Vector3(1.75, -1.25, 0)
    );

    const curve2 = new THREE.LineCurve3(
      new THREE.Vector3(1.75, -1.25, 0),
      new THREE.Vector3(3.5, -1.22, 0)
    );

    const fullCurve = new THREE.CurvePath<THREE.Vector3>();
    fullCurve.add(curve1);
    fullCurve.add(curve2);

    const curvePoints = fullCurve.getPoints(28);
    const ribbonWidth = 0.62;
    const halfWidth = ribbonWidth / 2;

    const positions: number[] = [];
    const uvs: number[] = [];
    const indices: number[] = [];

    for (let i = 0; i < curvePoints.length; i++) {
      const pt = curvePoints[i];
      const u = i / (curvePoints.length - 1);

      // Top vertex (+z)
      positions.push(pt.x, pt.y, halfWidth);
      uvs.push(u, 1);

      // Bottom vertex (-z)
      positions.push(pt.x, pt.y, -halfWidth);
      uvs.push(u, 0);

      if (i < curvePoints.length - 1) {
        const a = i * 2;
        const b = i * 2 + 1;
        const c = (i + 1) * 2;
        const d = (i + 1) * 2 + 1;
        indices.push(a, b, c);
        indices.push(b, d, c);
      }
    }

    const ribbonGeom = new THREE.BufferGeometry();
    ribbonGeom.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    ribbonGeom.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
    ribbonGeom.setIndex(indices);
    ribbonGeom.computeVertexNormals();

    const filmRibbonMesh = new THREE.Mesh(ribbonGeom, ribbonMaterial);
    guideAssembly.add(filmRibbonMesh);

    // 8. Interactive Parallax & Animation Loop
    let mouseX = 0;
    let mouseY = 0;
    let targetRotY = -0.28;
    let targetRotX = 0.08;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      mouseX = x;
      mouseY = y;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        isVisible = entries[0].isIntersecting;
      },
      { threshold: 0.1 }
    );
    observer.observe(container);

    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible) return;

      // 1. Rotate the spool continuously on its Z axis (unspooling counter-clockwise)
      rotorGroup.rotation.z -= 0.012;

      // 2. Animate the texture offset on the unspooling ribbon so film appears to flow
      ribbonTexture.offset.x -= 0.008;

      // 3. Smooth mouse parallax tilt (gives physical 3D weight)
      targetRotY = -0.28 + mouseX * 0.18;
      targetRotX = 0.08 - mouseY * 0.12;

      masterReelGroup.rotation.y += (targetRotY - masterReelGroup.rotation.y) * 0.06;
      masterReelGroup.rotation.x += (targetRotX - masterReelGroup.rotation.x) * 0.06;

      renderer.render(scene, camera);
    };

    animate();

    // 9. Resize Handling
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      if (newWidth === 0 || newHeight === 0) return;

      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // 10. Clean Cleanup on Unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();

      flangeGeom.dispose();
      filmCylGeom.dispose();
      hubCylGeom.dispose();
      hubCapGeom.dispose();
      brassBushingGeom.dispose();
      axleHoleGeom.dispose();
      rollerGeom.dispose();
      rollerCapGeom.dispose();
      bracketGeom.dispose();
      ribbonGeom.dispose();

      titaniumMaterial.dispose();
      polishedChromeMaterial.dispose();
      brassMaterial.dispose();
      filmRollMaterial.dispose();
      ribbonMaterial.dispose();
      darkCoreMaterial.dispose();

      filmRollTexture.dispose();
      ribbonTexture.dispose();

      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative select-none pointer-events-none flex items-center justify-center ${className}`}
      style={{
        width: "220px",
        height: "148px",
      }}
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block overflow-visible drop-shadow-[0_16px_36px_rgba(0,0,0,0.65)]"
        style={{
          width: "100%",
          height: "100%",
        }}
      />
    </div>
  );
};
