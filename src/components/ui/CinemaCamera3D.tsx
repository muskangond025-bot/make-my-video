"use client";

import React, { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CinemaCamera3DProps {
  className?: string;
}

export const CinemaCamera3D: React.FC<CinemaCamera3DProps> = ({ className = "" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isInteracting, setIsInteracting] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    // -------------------------------------------------------------
    // 1. SCENE, CAMERA, RENDERER
    // -------------------------------------------------------------
    const scene = new THREE.Scene();

    let width = container.clientWidth || 500;
    let height = container.clientHeight || 400;

    const camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 100);
    // Positioned to view the camera in a magnificent 3/4 heroic perspective
    camera.position.set(0, 0.4, 9.2);

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
    // 2. LIGHTING (Crisp architectural studio illumination with Lavender rim)
    // -------------------------------------------------------------
    // Clean ambient light: warm studio ambient
    const ambientLight = new THREE.AmbientLight(0xfbf8f2, 1.25);
    scene.add(ambientLight);

    // Key directional light: crisp cast shadows and subtle relief
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.8);
    keyLight.position.set(5, 7, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.bias = -0.0008;
    scene.add(keyLight);

    // Lavender purple rim light for subtle brand reflections
    const lavenderRimLight = new THREE.DirectionalLight(0xb9a1f7, 2.5);
    lavenderRimLight.position.set(-6, 3, -3);
    scene.add(lavenderRimLight);

    // Front soft fill: maintains warm beige / luminous metallic body
    const fillLight = new THREE.DirectionalLight(0xf5eedf, 0.85);
    fillLight.position.set(-4, 2, 5);
    scene.add(fillLight);

    // Subtle bottom bounce: softens under-mount shadows with warm beige tone
    const bounceLight = new THREE.DirectionalLight(0xf3ebdd, 0.55);
    bounceLight.position.set(0, -6, 2);
    scene.add(bounceLight);

    // -------------------------------------------------------------
    // 3. PROCEDURAL INK-DRAWING TEXTURES
    // -------------------------------------------------------------
    // A. Film Magazine Face Texture (Concentric rings + mechanical ink hatching)
    const createReelTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 512;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      // Warm beige paper base
      ctx.fillStyle = "#F3EBDD";
      ctx.fillRect(0, 0, 512, 512);

      const cx = 256;
      const cy = 256;

      // Outer ink border rings in Deep Indigo
      ctx.strokeStyle = "#211747";
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.arc(cx, cy, 240, 0, Math.PI * 2);
      ctx.stroke();

      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.arc(cx, cy, 226, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#6B6478";
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.arc(cx, cy, 210, 0, Math.PI * 2);
      ctx.stroke();

      // Hand-drawn mechanical tick marks (sprocket indexing with lavender accents)
      ctx.lineWidth = 2.5;
      for (let i = 0; i < 48; i++) {
        const angle = (i / 48) * Math.PI * 2;
        const r1 = i % 4 === 0 ? 210 : 218;
        const r2 = 226;
        ctx.strokeStyle = i % 4 === 0 ? "#B9A1F7" : "#211747";
        ctx.beginPath();
        ctx.moveTo(cx + Math.cos(angle) * r1, cy + Math.sin(angle) * r1);
        ctx.lineTo(cx + Math.cos(angle) * r2, cy + Math.sin(angle) * r2);
        ctx.stroke();
      }

      // Ink crosshatching on lower quadrant
      ctx.strokeStyle = "rgba(33, 23, 71, 0.45)";
      ctx.lineWidth = 1.8;
      for (let x = 60; x <= 220; x += 9) {
        ctx.beginPath();
        ctx.moveTo(x, 260 + (x - 60) * 0.7);
        ctx.lineTo(x + 40, 390 + (x - 60) * 0.4);
        ctx.stroke();
      }

      // Center Spindle Hub
      ctx.strokeStyle = "#211747";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(cx, cy, 80, 0, Math.PI * 2);
      ctx.fillStyle = "#ECE3D3";
      ctx.fill();
      ctx.stroke();

      ctx.lineWidth = 2;
      ctx.strokeStyle = "#B9A1F7";
      ctx.beginPath();
      ctx.arc(cx, cy, 48, 0, Math.PI * 2);
      ctx.stroke();

      // 4 Spindle Screws with neon-lime center dot
      const screwR = 64;
      for (let i = 0; i < 4; i++) {
        const angle = (i / 4) * Math.PI * 2 + Math.PI / 4;
        const sx = cx + Math.cos(angle) * screwR;
        const sy = cy + Math.sin(angle) * screwR;
        ctx.lineWidth = 2;
        ctx.strokeStyle = "#211747";
        ctx.beginPath();
        ctx.arc(sx, sy, 7, 0, Math.PI * 2);
        ctx.fillStyle = "#D5FF3F";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(sx - 4, sy);
        ctx.lineTo(sx + 4, sy);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.anisotropy = 4;
      return tex;
    };

    // B. Matte Box Sunshade Interior Hatching Texture
    const createMatteBoxHatchingTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 512;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      ctx.fillStyle = "#F3EBDD";
      ctx.fillRect(0, 0, 512, 512);

      // Distinct hand-drawn diagonal ink hatching in Deep Indigo
      ctx.strokeStyle = "#211747";
      ctx.lineWidth = 3.2;

      // Primary diagonal hatching
      for (let i = -512; i < 1024; i += 14) {
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i + 512, 512);
        ctx.stroke();
      }

      // Dense secondary cross-hatch near edges with lavender tint
      ctx.strokeStyle = "rgba(185, 161, 247, 0.4)";
      ctx.lineWidth = 2.2;
      for (let i = -512; i < 1024; i += 18) {
        ctx.beginPath();
        ctx.moveTo(i + 512, 0);
        ctx.lineTo(i, 512);
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2, 2);
      return tex;
    };

    // C. Camera Body Side Plate Texture (Technical markings, dials, screws)
    const createBodySideTexture = () => {
      const texCanvas = document.createElement("canvas");
      texCanvas.width = 512;
      texCanvas.height = 512;
      const ctx = texCanvas.getContext("2d");
      if (!ctx) return new THREE.CanvasTexture(texCanvas);

      ctx.fillStyle = "#F3EBDD";
      ctx.fillRect(0, 0, 512, 512);

      // Inset perimeter border in Deep Indigo
      ctx.strokeStyle = "#211747";
      ctx.lineWidth = 6;
      ctx.strokeRect(24, 24, 464, 464);

      ctx.strokeStyle = "#B9A1F7";
      ctx.lineWidth = 2;
      ctx.strokeRect(36, 36, 440, 440);

      // Corner screws
      const corners = [
        [48, 48],
        [464, 48],
        [48, 464],
        [464, 464],
      ];
      corners.forEach(([x, y]) => {
        ctx.beginPath();
        ctx.arc(x, y, 9, 0, Math.PI * 2);
        ctx.fillStyle = "#ECE3D3";
        ctx.fill();
        ctx.strokeStyle = "#211747";
        ctx.stroke();
        ctx.beginPath();
        ctx.moveTo(x - 6, y - 6);
        ctx.lineTo(x + 6, y + 6);
        ctx.stroke();
      });

      // Technical Typography
      ctx.fillStyle = "#211747";
      ctx.font = "bold 24px monospace";
      ctx.fillText("MAKE MY VID", 54, 88);

      ctx.fillStyle = "#6B6478";
      ctx.font = "14px monospace";
      ctx.fillText("MODEL: MMV-35MM PRO", 54, 114);
      ctx.fillText("SHUTTER: 180° / 24 FPS", 54, 134);

      // Main Circular Footage Dial
      ctx.strokeStyle = "#211747";
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(256, 260, 90, 0, Math.PI * 2);
      ctx.stroke();

      ctx.strokeStyle = "#B9A1F7";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.arc(256, 260, 78, 0, Math.PI * 2);
      ctx.stroke();

      for (let i = 0; i < 24; i++) {
        const a = (i / 24) * Math.PI * 2;
        const r1 = i % 6 === 0 ? 66 : 72;
        const r2 = 78;
        ctx.strokeStyle = i % 6 === 0 ? "#211747" : "#6B6478";
        ctx.beginPath();
        ctx.moveTo(256 + Math.cos(a) * r1, 260 + Math.sin(a) * r1);
        ctx.lineTo(256 + Math.cos(a) * r2, 260 + Math.sin(a) * r2);
        ctx.stroke();
      }

      // Neon-lime Indicator dial needle
      ctx.strokeStyle = "#D5FF3F";
      ctx.lineWidth = 3.5;
      ctx.beginPath();
      ctx.moveTo(256, 260);
      ctx.lineTo(256 + Math.cos(-0.6) * 54, 260 + Math.sin(-0.6) * 54);
      ctx.stroke();

      // Row of 4 indicator ports at bottom: 3 lavender + 1 neon lime active tally
      for (let i = 0; i < 4; i++) {
        const x = 110 + i * 96;
        const y = 415;
        const isTally = i === 3;
        ctx.lineWidth = 3;
        ctx.strokeStyle = "#211747";
        ctx.beginPath();
        ctx.arc(x, y, 16, 0, Math.PI * 2);
        ctx.fillStyle = isTally ? "#D5FF3F" : "#B9A1F7";
        ctx.fill();
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(x, y, 8, 0, Math.PI * 2);
        ctx.fillStyle = isTally ? "#211747" : "#ECE3D3";
        ctx.fill();
        ctx.stroke();
      }

      const tex = new THREE.CanvasTexture(texCanvas);
      tex.anisotropy = 4;
      return tex;
    };

    const reelTex = createReelTexture();
    const matteBoxTex = createMatteBoxHatchingTexture();
    const bodySideTex = createBodySideTexture();

    // -------------------------------------------------------------
    // 4. MATERIALS (Warm Beige & Deep Indigo Body + Lavender Reflections)
    // -------------------------------------------------------------
    // Luminous Warm Beige Base Material
    const whiteMatteMaterial = new THREE.MeshStandardMaterial({
      color: 0xf5eee2,
      roughness: 0.82,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Deep Indigo Material for Selected Architectural Panels
    const deepIndigoMaterial = new THREE.MeshStandardMaterial({
      color: 0x211747,
      roughness: 0.65,
      metalness: 0.25,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Textured Reel Face Material
    const reelFaceMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: reelTex,
      roughness: 0.82,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Matte Box Hatching Material
    const matteBoxInnerMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: matteBoxTex,
      roughness: 0.88,
      metalness: 0.0,
      side: THREE.DoubleSide,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Body Inset Texture Material
    const bodySideMaterial = new THREE.MeshStandardMaterial({
      color: 0xffffff,
      map: bodySideTex,
      roughness: 0.82,
      metalness: 0.08,
      polygonOffset: true,
      polygonOffsetFactor: 1,
      polygonOffsetUnits: 1,
    });

    // Deep Indigo Line Materials (CAD / blueprint ink contours)
    const inkLineMaterial = new THREE.LineBasicMaterial({
      color: 0x211747,
      linewidth: 1.8,
    });

    const boldInkLineMaterial = new THREE.LineBasicMaterial({
      color: 0x191138,
      linewidth: 2.8,
    });

    // Optical glass lens element (deep dark anti-reflective pupil with subtle purple tint)
    const lensGlassMaterial = new THREE.MeshStandardMaterial({
      color: 0x181030,
      roughness: 0.08,
      metalness: 0.95,
    });

    // Inverted-hull outline material
    const silhouetteMaterial = new THREE.MeshBasicMaterial({
      color: 0x211747,
      side: THREE.BackSide,
    });

    // Helper: Wrap geometry in a mesh with warm beige fill + crisp deep indigo contours
    const createInkedObject = (
      geo: THREE.BufferGeometry,
      mat: THREE.Material = whiteMatteMaterial,
      threshold = 26,
      outlineScale = 1.025
    ) => {
      const group = new THREE.Group();

      const mesh = new THREE.Mesh(geo, mat);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      group.add(mesh);

      // Crisp CAD / blueprint wire edges
      const edges = new THREE.EdgesGeometry(geo, threshold);
      const lines = new THREE.LineSegments(edges, inkLineMaterial);
      group.add(lines);

      // Inverted hull for organic silhouette contours
      if (outlineScale > 1.0) {
        const outlineMesh = new THREE.Mesh(geo, silhouetteMaterial);
        outlineMesh.scale.setScalar(outlineScale);
        group.add(outlineMesh);
      }

      return { group, mesh, edges, lines };
    };

    // -------------------------------------------------------------
    // 5. CAMERA ASSEMBLY HIERARCHY
    // -------------------------------------------------------------
    const cameraRig = new THREE.Group();
    scene.add(cameraRig);

    // Initial scale and vertical adjustment
    cameraRig.scale.set(0.95, 0.95, 0.95);
    cameraRig.position.set(0, -0.15, 0);

    // A. MAIN CAMERA BODY HOUSING
    const bodyWidth = 1.35;
    const bodyHeight = 1.55;
    const bodyDepth = 1.85;

    const mainBodyGeo = new THREE.BoxGeometry(bodyWidth, bodyHeight, bodyDepth);
    const mainBody = createInkedObject(mainBodyGeo, whiteMatteMaterial, 30, 1.018);
    mainBody.group.position.set(0, 0, 0);
    cameraRig.add(mainBody.group);

    // Right Side Plate with technical markings and footage dial
    const sidePlateGeo = new THREE.BoxGeometry(0.04, 1.38, 1.68);
    const sidePlate = createInkedObject(sidePlateGeo, bodySideMaterial, 30, 1.0);
    sidePlate.group.position.set(bodyWidth * 0.5 + 0.02, 0, 0);
    cameraRig.add(sidePlate.group);

    // Left Side Inset Plate (Selected Deep Indigo feature panel!)
    const leftSidePlateGeo = new THREE.BoxGeometry(0.04, 1.38, 1.68);
    const leftSidePlate = createInkedObject(leftSidePlateGeo, deepIndigoMaterial, 30, 1.0);
    leftSidePlate.group.position.set(-bodyWidth * 0.5 - 0.02, 0, 0);
    cameraRig.add(leftSidePlate.group);

    // Front Faceplate Bevel
    const frontPlateGeo = new THREE.BoxGeometry(1.4, 1.6, 0.12);
    const frontPlate = createInkedObject(frontPlateGeo, whiteMatteMaterial, 30, 1.015);
    frontPlate.group.position.set(0, 0, bodyDepth * 0.5 + 0.06);
    cameraRig.add(frontPlate.group);

    // Front Lens Mount Collar
    const lensMountGeo = new THREE.CylinderGeometry(0.52, 0.58, 0.28, 36);
    lensMountGeo.rotateX(Math.PI / 2);
    const lensMount = createInkedObject(lensMountGeo, whiteMatteMaterial, 28, 1.025);
    lensMount.group.position.set(0, 0.08, bodyDepth * 0.5 + 0.2);
    cameraRig.add(lensMount.group);

    // B. DUAL FILM REELS (TOP "MICKEY MOUSE" MAGAZINE)
    const magazineGroup = new THREE.Group();
    magazineGroup.position.set(0, bodyHeight * 0.5 + 0.04, -0.15);
    cameraRig.add(magazineGroup);

    // Magazine base saddle bracket (Deep Indigo architectural panel)
    const magBaseGeo = new THREE.BoxGeometry(1.0, 0.22, 1.4);
    const magBase = createInkedObject(magBaseGeo, deepIndigoMaterial, 30, 1.02);
    magBase.group.position.set(0, 0.1, 0);
    magazineGroup.add(magBase.group);

    // Tiny Neon-Lime Tally Indicator LED on front magazine edge
    const tallyLedGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.06, 16);
    const tallyLedMat = new THREE.MeshBasicMaterial({ color: 0xd5ff3f });
    const tallyLed = new THREE.Mesh(tallyLedGeo, tallyLedMat);
    tallyLed.position.set(0.38, 0.22, 0.65);
    magazineGroup.add(tallyLed);

    // Rear Reel Canister
    const reelRearRadius = 0.82;
    const reelRearWidth = 0.32;
    const reelRearGeo = new THREE.CylinderGeometry(reelRearRadius, reelRearRadius, reelRearWidth, 48);
    reelRearGeo.rotateZ(Math.PI / 2);

    const reelRearGroup = new THREE.Group();
    reelRearGroup.position.set(0.05, 0.95, -0.5);

    // Front/Back Face Plates with Reel Texture
    const reelRearMesh = new THREE.Mesh(reelRearGeo, [
      whiteMatteMaterial, // rim side
      reelFaceMaterial,   // right face (textured)
      reelFaceMaterial,   // left face (textured)
    ]);
    reelRearMesh.castShadow = true;
    reelRearGroup.add(reelRearMesh);

    const reelRearEdges = new THREE.EdgesGeometry(reelRearGeo, 24);
    reelRearGroup.add(new THREE.LineSegments(reelRearEdges, inkLineMaterial));

    const reelRearOutline = new THREE.Mesh(reelRearGeo, silhouetteMaterial);
    reelRearOutline.scale.set(1.03, 1.01, 1.03);
    reelRearGroup.add(reelRearOutline);

    // Center Spindle Bolt
    const rearSpindleGeo = new THREE.CylinderGeometry(0.24, 0.24, reelRearWidth + 0.08, 24);
    rearSpindleGeo.rotateZ(Math.PI / 2);
    const rearSpindle = createInkedObject(rearSpindleGeo, whiteMatteMaterial, 28, 1.04);
    reelRearGroup.add(rearSpindle.group);

    magazineGroup.add(reelRearGroup);

    // Front Reel Canister (Slightly larger, overlapping forward)
    const reelFrontRadius = 0.98;
    const reelFrontWidth = 0.34;
    const reelFrontGeo = new THREE.CylinderGeometry(reelFrontRadius, reelFrontRadius, reelFrontWidth, 48);
    reelFrontGeo.rotateZ(Math.PI / 2);

    const reelFrontGroup = new THREE.Group();
    reelFrontGroup.position.set(-0.05, 1.15, 0.38);

    const reelFrontMesh = new THREE.Mesh(reelFrontGeo, [
      whiteMatteMaterial,
      reelFaceMaterial,
      reelFaceMaterial,
    ]);
    reelFrontMesh.castShadow = true;
    reelFrontGroup.add(reelFrontMesh);

    const reelFrontEdges = new THREE.EdgesGeometry(reelFrontGeo, 24);
    reelFrontGroup.add(new THREE.LineSegments(reelFrontEdges, inkLineMaterial));

    const reelFrontOutline = new THREE.Mesh(reelFrontGeo, silhouetteMaterial);
    reelFrontOutline.scale.set(1.03, 1.01, 1.03);
    reelFrontGroup.add(reelFrontOutline);

    // Front Spindle Bolt
    const frontSpindleGeo = new THREE.CylinderGeometry(0.28, 0.28, reelFrontWidth + 0.08, 24);
    frontSpindleGeo.rotateZ(Math.PI / 2);
    const frontSpindle = createInkedObject(frontSpindleGeo, whiteMatteMaterial, 28, 1.04);
    reelFrontGroup.add(frontSpindle.group);

    magazineGroup.add(reelFrontGroup);

    // External Drive Tension Belt on Magazine (Connecting front & rear spindles)
    const beltLinkGeo = new THREE.BoxGeometry(0.08, 0.32, 0.92);
    const beltLink = createInkedObject(beltLinkGeo, whiteMatteMaterial, 28, 1.03);
    beltLink.group.position.set(reelFrontWidth * 0.5 + 0.06, 1.05, -0.05);
    beltLink.group.rotation.x = -0.15;
    magazineGroup.add(beltLink.group);

    // Small Belt Pulley Wheels
    const pulley1Geo = new THREE.CylinderGeometry(0.12, 0.12, 0.14, 20);
    pulley1Geo.rotateZ(Math.PI / 2);
    const pulley1 = createInkedObject(pulley1Geo, whiteMatteMaterial, 24, 1.04);
    pulley1.group.position.set(reelFrontWidth * 0.5 + 0.12, 1.15, 0.28);
    magazineGroup.add(pulley1.group);

    const pulley2Geo = new THREE.CylinderGeometry(0.1, 0.1, 0.14, 20);
    pulley2Geo.rotateZ(Math.PI / 2);
    const pulley2 = createInkedObject(pulley2Geo, whiteMatteMaterial, 24, 1.04);
    pulley2.group.position.set(reelFrontWidth * 0.5 + 0.12, 0.96, -0.4);
    magazineGroup.add(pulley2.group);

    // C. FRONT 15MM IRIS RAILS / SUPPORT RODS
    const rodsGroup = new THREE.Group();
    cameraRig.add(rodsGroup);

    const rodRadius = 0.045;
    const rodLength = 3.2;
    const rodSpacing = 0.56;

    const rodGeo = new THREE.CylinderGeometry(rodRadius, rodRadius, rodLength, 20);
    rodGeo.rotateX(Math.PI / 2);

    // Left Rod
    const leftRod = createInkedObject(rodGeo, whiteMatteMaterial, 24, 1.08);
    leftRod.group.position.set(-rodSpacing * 0.5, -bodyHeight * 0.5 + 0.1, 1.35);
    rodsGroup.add(leftRod.group);

    // Right Rod
    const rightRod = createInkedObject(rodGeo, whiteMatteMaterial, 24, 1.08);
    rightRod.group.position.set(rodSpacing * 0.5, -bodyHeight * 0.5 + 0.1, 1.35);
    rodsGroup.add(rightRod.group);

    // Support rod under-bracket block
    const rodBracketGeo = new THREE.BoxGeometry(0.8, 0.24, 0.45);
    const rodBracket = createInkedObject(rodBracketGeo, whiteMatteMaterial, 30, 1.03);
    rodBracket.group.position.set(0, -bodyHeight * 0.5 + 0.1, 0.7);
    rodsGroup.add(rodBracket.group);

    // D. ANAMORPHIC PRIME LENS BARREL
    const lensGroup = new THREE.Group();
    lensGroup.position.set(0, 0.08, bodyDepth * 0.5 + 0.32);
    cameraRig.add(lensGroup);

    // Stepped lens barrel cylinders
    const barrel1Geo = new THREE.CylinderGeometry(0.48, 0.48, 0.55, 36);
    barrel1Geo.rotateX(Math.PI / 2);
    const barrel1 = createInkedObject(barrel1Geo, whiteMatteMaterial, 24, 1.03);
    barrel1.group.position.set(0, 0, 0.28);
    lensGroup.add(barrel1.group);

    // Focus Knurled Ring
    const focusRingGeo = new THREE.CylinderGeometry(0.51, 0.51, 0.22, 36);
    focusRingGeo.rotateX(Math.PI / 2);
    const focusRing = createInkedObject(focusRingGeo, whiteMatteMaterial, 24, 1.03);
    focusRing.group.position.set(0, 0, 0.24);
    lensGroup.add(focusRing.group);

    // Aperture Ring
    const apertureRingGeo = new THREE.CylinderGeometry(0.49, 0.49, 0.14, 36);
    apertureRingGeo.rotateX(Math.PI / 2);
    const apertureRing = createInkedObject(apertureRingGeo, whiteMatteMaterial, 24, 1.03);
    apertureRing.group.position.set(0, 0, 0.45);
    lensGroup.add(apertureRing.group);

    // Front Lens Glass Element
    const frontGlassGeo = new THREE.CylinderGeometry(0.42, 0.42, 0.08, 36);
    frontGlassGeo.rotateX(Math.PI / 2);
    const frontGlass = new THREE.Mesh(frontGlassGeo, lensGlassMaterial);
    frontGlass.position.set(0, 0, 0.56);
    lensGroup.add(frontGlass);

    // Lens Glass Rim Outline
    const glassRimEdges = new THREE.EdgesGeometry(frontGlassGeo, 24);
    lensGroup.add(new THREE.LineSegments(glassRimEdges, boldInkLineMaterial));

    // E. FLARED 4-SIDED MATTE BOX (SUNSHADE HOOD)
    // Custom tapered pyramid frustum with flared accordion bellows
    const matteBoxGroup = new THREE.Group();
    // Positioned forward on the 15mm rails
    matteBoxGroup.position.set(0, 0.08, bodyDepth * 0.5 + 1.25);
    cameraRig.add(matteBoxGroup);

    // Rear clamp ring onto rods
    const mbClampGeo = new THREE.BoxGeometry(0.9, 0.45, 0.25);
    const mbClamp = createInkedObject(mbClampGeo, whiteMatteMaterial, 30, 1.03);
    mbClamp.group.position.set(0, -0.65, 0);
    matteBoxGroup.add(mbClamp.group);

    // Clamp adjustment knob on side
    const clampKnobGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.35, 20);
    clampKnobGeo.rotateZ(Math.PI / 2);
    const clampKnob = createInkedObject(clampKnobGeo, whiteMatteMaterial, 24, 1.05);
    clampKnob.group.position.set(-0.55, -0.65, 0);
    matteBoxGroup.add(clampKnob.group);

    // Construct the 4 Flared Sunshade Walls
    const hoodDepth = 1.35;
    const rW = 0.88; // rear width
    const rH = 0.72; // rear height
    const fW = 1.85; // front flared width
    const fH = 1.55; // front flared height

    // We build the 4 walls as an extruded tapered shell
    const hoodGeo = new THREE.BufferGeometry();
    // 8 vertices of the flared frustum: 0-3 rear, 4-7 front
    const vertices = new Float32Array([
      // Rear quad (z = 0)
      -rW * 0.5,  rH * 0.5, 0, // 0: Top-left
       rW * 0.5,  rH * 0.5, 0, // 1: Top-right
       rW * 0.5, -rH * 0.5, 0, // 2: Bottom-right
      -rW * 0.5, -rH * 0.5, 0, // 3: Bottom-left
      // Front quad (z = hoodDepth)
      -fW * 0.5,  fH * 0.5, hoodDepth, // 4: Front Top-left
       fW * 0.5,  fH * 0.5, hoodDepth, // 5: Front Top-right
       fW * 0.5, -fH * 0.5, hoodDepth, // 6: Front Bottom-right
      -fW * 0.5, -fH * 0.5, hoodDepth, // 7: Front Bottom-left
    ]);

    // 4 outer trapezoid walls (indices)
    const indices = [
      // Top wall
      0, 4, 5,  0, 5, 1,
      // Right wall
      1, 5, 6,  1, 6, 2,
      // Bottom wall
      2, 6, 7,  2, 7, 3,
      // Left wall
      3, 7, 4,  3, 4, 0,
    ];

    hoodGeo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    hoodGeo.setIndex(indices);
    hoodGeo.computeVertexNormals();

    const hoodMesh = new THREE.Mesh(hoodGeo, matteBoxInnerMaterial);
    hoodMesh.castShadow = true;
    hoodMesh.receiveShadow = true;
    matteBoxGroup.add(hoodMesh);

    // Add crisp contour lines on the flared edges
    const hoodEdges = new THREE.EdgesGeometry(hoodGeo, 15);
    const hoodLines = new THREE.LineSegments(hoodEdges, boldInkLineMaterial);
    matteBoxGroup.add(hoodLines);

    // Stepped bellows / accordion ridges along the hood (matching reference drawing)
    for (let step = 1; step <= 3; step++) {
      const t = step / 4;
      const sw = rW + (fW - rW) * t;
      const sh = rH + (fH - rH) * t;
      const sz = hoodDepth * t;

      const ringGeo = new THREE.BufferGeometry();
      const ringVerts = new Float32Array([
        -sw * 0.5,  sh * 0.5, sz,
         sw * 0.5,  sh * 0.5, sz,
         sw * 0.5, -sh * 0.5, sz,
        -sw * 0.5, -sh * 0.5, sz,
        -sw * 0.5,  sh * 0.5, sz,
      ]);
      ringGeo.setAttribute("position", new THREE.BufferAttribute(ringVerts, 3));
      const ringLine = new THREE.Line(ringGeo, inkLineMaterial);
      matteBoxGroup.add(ringLine);
    }

    // Top Flag / Eyebrow Barn Door on Matte Box
    const topFlagGeo = new THREE.BoxGeometry(fW + 0.1, 0.05, 0.45);
    const topFlag = createInkedObject(topFlagGeo, whiteMatteMaterial, 26, 1.02);
    topFlag.group.position.set(0, fH * 0.5 + 0.04, hoodDepth - 0.18);
    topFlag.group.rotation.x = -0.35; // angled up like a real French flag
    matteBoxGroup.add(topFlag.group);

    // F. OPTICAL VIEWFINDER (LEFT SIDE)
    const finderGroup = new THREE.Group();
    finderGroup.position.set(-bodyWidth * 0.5 - 0.22, 0.2, 0.3);
    cameraRig.add(finderGroup);

    // Viewfinder horizontal support bracket
    const finderArmGeo = new THREE.BoxGeometry(0.35, 0.14, 0.14);
    const finderArm = createInkedObject(finderArmGeo, whiteMatteMaterial, 28, 1.04);
    finderArm.group.position.set(0.12, 0, 0);
    finderGroup.add(finderArm.group);

    // Viewfinder optical tube extending backward
    const finderTubeGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.75, 24);
    finderTubeGeo.rotateX(Math.PI / 2);
    const finderTube = createInkedObject(finderTubeGeo, whiteMatteMaterial, 24, 1.03);
    finderTube.group.position.set(0, 0, -0.45);
    finderGroup.add(finderTube.group);

    // Rubber Eyecup (flared bevel at rear)
    const eyecupGeo = new THREE.CylinderGeometry(0.24, 0.15, 0.35, 24);
    eyecupGeo.rotateX(Math.PI / 2);
    const eyecup = createInkedObject(eyecupGeo, whiteMatteMaterial, 24, 1.04);
    eyecup.group.position.set(0, 0, -1.35);
    finderGroup.add(eyecup.group);

    // Eyepiece lens glass pupil
    const eyecupGlassGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.06, 24);
    eyecupGlassGeo.rotateX(Math.PI / 2);
    const eyecupGlass = new THREE.Mesh(eyecupGlassGeo, lensGlassMaterial);
    eyecupGlass.position.set(0, 0, -1.38);
    finderGroup.add(eyecupGlass);

    // G. MECHANICAL WINDING CRANK & DIALS (RIGHT SIDE)
    const crankGroup = new THREE.Group();
    crankGroup.position.set(bodyWidth * 0.5 + 0.12, -0.15, -0.45);
    cameraRig.add(crankGroup);

    // Crank pivot hub
    const crankHubGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 24);
    crankHubGeo.rotateZ(Math.PI / 2);
    const crankHub = createInkedObject(crankHubGeo, whiteMatteMaterial, 24, 1.04);
    crankGroup.add(crankHub.group);

    // Crank rotating arm
    const crankArmGroup = new THREE.Group();
    crankGroup.add(crankArmGroup);

    const crankArmGeo = new THREE.BoxGeometry(0.08, 0.65, 0.12);
    const crankArm = createInkedObject(crankArmGeo, whiteMatteMaterial, 26, 1.04);
    crankArm.group.position.set(0.12, -0.28, 0);
    crankArmGroup.add(crankArm.group);

    // Crank handle knob
    const crankKnobGeo = new THREE.SphereGeometry(0.14, 16, 16);
    const crankKnob = createInkedObject(crankKnobGeo, whiteMatteMaterial, 20, 1.05);
    crankKnob.group.position.set(0.24, -0.58, 0);
    crankArmGroup.add(crankKnob.group);

    // Additional side focus knobs
    const knob1Geo = new THREE.CylinderGeometry(0.16, 0.16, 0.22, 24);
    knob1Geo.rotateZ(Math.PI / 2);
    const knob1 = createInkedObject(knob1Geo, whiteMatteMaterial, 24, 1.04);
    knob1.group.position.set(bodyWidth * 0.5 + 0.1, 0.35, 0.35);
    cameraRig.add(knob1.group);

    const knob2Geo = new THREE.CylinderGeometry(0.14, 0.14, 0.18, 24);
    knob2Geo.rotateZ(Math.PI / 2);
    const knob2 = createInkedObject(knob2Geo, whiteMatteMaterial, 24, 1.04);
    knob2.group.position.set(bodyWidth * 0.5 + 0.1, -0.38, 0.35);
    cameraRig.add(knob2.group);

    // H. TRIPOD FLUID HEAD & MOUNTING BASE (BOTTOM)
    const tripodGroup = new THREE.Group();
    tripodGroup.position.set(0, -bodyHeight * 0.5 - 0.2, 0);
    cameraRig.add(tripodGroup);

    // Quick release plate
    const qrPlateGeo = new THREE.BoxGeometry(1.0, 0.14, 1.2);
    const qrPlate = createInkedObject(qrPlateGeo, whiteMatteMaterial, 30, 1.02);
    qrPlate.group.position.set(0, 0.05, 0);
    tripodGroup.add(qrPlate.group);

    // Fluid head sphere / swivel bowl
    const bowlGeo = new THREE.SphereGeometry(0.52, 24, 16, 0, Math.PI * 2, 0, Math.PI * 0.55);
    bowlGeo.rotateX(Math.PI);
    const bowl = createInkedObject(bowlGeo, whiteMatteMaterial, 24, 1.03);
    bowl.group.position.set(0, -0.02, 0);
    tripodGroup.add(bowl.group);

    // Pan-tilt geared swivel collar (Deep Indigo mechanical accent)
    const collarGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.42, 32);
    const collar = createInkedObject(collarGeo, deepIndigoMaterial, 24, 1.03);
    collar.group.position.set(0, -0.42, 0);
    tripodGroup.add(collar.group);

    // Pan handle extending backward and down
    const handleArmGeo = new THREE.CylinderGeometry(0.045, 0.045, 1.85, 16);
    handleArmGeo.rotateX(Math.PI / 2);
    const handleArm = createInkedObject(handleArmGeo, whiteMatteMaterial, 20, 1.08);
    handleArm.group.position.set(-0.48, -0.38, -0.92);
    handleArm.group.rotation.set(-0.45, -0.3, 0);
    tripodGroup.add(handleArm.group);

    // Pan handle rubber grip
    const gripGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.65, 20);
    gripGeo.rotateX(Math.PI / 2);
    const grip = createInkedObject(gripGeo, whiteMatteMaterial, 20, 1.06);
    grip.group.position.set(-0.72, -0.68, -1.55);
    grip.group.rotation.set(-0.45, -0.3, 0);
    tripodGroup.add(grip.group);

    // Tripod spider crown / leg brackets
    const spiderGeo = new THREE.CylinderGeometry(0.68, 0.8, 0.28, 6);
    const spider = createInkedObject(spiderGeo, whiteMatteMaterial, 28, 1.03);
    spider.group.position.set(0, -0.72, 0);
    tripodGroup.add(spider.group);

    // 3 Tripod upper leg stubs extending down
    for (let i = 0; i < 3; i++) {
      const angle = (i / 3) * Math.PI * 2 + Math.PI / 6;
      const legStubGeo = new THREE.BoxGeometry(0.24, 0.75, 0.16);
      const legStub = createInkedObject(legStubGeo, whiteMatteMaterial, 28, 1.03);
      legStub.group.position.set(Math.cos(angle) * 0.62, -1.15, Math.sin(angle) * 0.62);
      legStub.group.rotation.y = -angle;
      legStub.group.rotation.z = 0.22;
      tripodGroup.add(legStub.group);
    }

    // -------------------------------------------------------------
    // 6. DEFAULT 3/4 HERO PERSPECTIVE ANGLE
    // -------------------------------------------------------------
    // Iconic 3/4 hero camera perspective matching Hanna Shvets' drawing
    const DEFAULT_ROT_X = 0.12;  // Slight downward pitch to see top reels
    const DEFAULT_ROT_Y = -0.65; // ~37° angle to show both front matte box & side details
    const DEFAULT_ROT_Z = 0.02;

    cameraRig.rotation.set(DEFAULT_ROT_X, DEFAULT_ROT_Y, DEFAULT_ROT_Z);

    // -------------------------------------------------------------
    // 7. INTERACTIVE ORBIT, DRAG, & PARALLAX PHYSICS
    // -------------------------------------------------------------
    let isDragging = false;
    let prevPointerX = 0;
    let prevPointerY = 0;

    let targetRotX = DEFAULT_ROT_X;
    let targetRotY = DEFAULT_ROT_Y;
    let currentRotX = DEFAULT_ROT_X;
    let currentRotY = DEFAULT_ROT_Y;

    let velX = 0;
    let velY = 0;

    // Mouse movement parallax offsets
    let mouseNormX = 0;
    let mouseNormY = 0;

    const handlePointerDown = (e: PointerEvent) => {
      isDragging = true;
      setIsInteracting(true);
      prevPointerX = e.clientX;
      prevPointerY = e.clientY;
      velX = 0;
      velY = 0;
      canvas.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (isDragging) {
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;

        const DRAG_SENSITIVITY = 0.0055;
        targetRotY += deltaX * DRAG_SENSITIVITY;
        targetRotX += deltaY * DRAG_SENSITIVITY;

        // Pitch clamp (prevent camera from flipping upside-down)
        targetRotX = Math.max(-0.6, Math.min(0.6, targetRotX));

        velY = deltaX * DRAG_SENSITIVITY;
        velX = deltaY * DRAG_SENSITIVITY;
      } else {
        // Normal cursor hover parallax
        const rect = container.getBoundingClientRect();
        const nx = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        const ny = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
        mouseNormX = nx;
        mouseNormY = ny;
      }
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (!isDragging) return;
      isDragging = false;
      setIsInteracting(false);
      try {
        canvas.releasePointerCapture(e.pointerId);
      } catch (err) {
        // Ignore if already released
      }
    };

    // Double click to smoothly snap back to hero angle
    const handleDoubleClick = () => {
      targetRotX = DEFAULT_ROT_X;
      targetRotY = DEFAULT_ROT_Y;
      velX = 0;
      velY = 0;
    };

    canvas.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointermove", handlePointerMove);
    window.addEventListener("pointerup", handlePointerUp);
    canvas.addEventListener("dblclick", handleDoubleClick);

    // -------------------------------------------------------------
    // 8. ANIMATION LOOP (Reels Spin, Floating Float, Friction Inertia)
    // -------------------------------------------------------------
    let animId = 0;
    let clock = new THREE.Clock();

    const animate = () => {
      animId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // A. Cinematic Film Reel Rotation (Continuous 24 FPS motion cadence)
      const reelSpinSpeed = isDragging ? 0.04 : 0.015;
      reelFrontGroup.rotation.x += reelSpinSpeed;
      reelRearGroup.rotation.x += reelSpinSpeed * 1.04;
      pulley1.group.rotation.x += reelSpinSpeed * 1.8;
      pulley2.group.rotation.x += reelSpinSpeed * 1.8;

      // Crank arm reactive oscillation
      crankArmGroup.rotation.x = Math.sin(elapsedTime * 2.5) * 0.15;

      // B. Inertia and Drag Physics
      if (isDragging) {
        // Direct tracking while dragging
        currentRotX += (targetRotX - currentRotX) * 0.16;
        currentRotY += (targetRotY - currentRotY) * 0.16;
      } else {
        // Friction damping when released
        velX *= 0.92;
        velY *= 0.92;
        targetRotX += velX;
        targetRotY += velY;

        // Subtle idle floating breathing motion
        const floatYaw = Math.sin(elapsedTime * 0.7) * 0.04;
        const floatPitch = Math.cos(elapsedTime * 0.5) * 0.025;
        const floatY = Math.sin(elapsedTime * 1.1) * 0.08;

        // Parallax influence from cursor position
        const parallaxX = mouseNormY * 0.08;
        const parallaxY = mouseNormX * 0.14;

        currentRotX += (targetRotX + floatPitch + parallaxX - currentRotX) * 0.06;
        currentRotY += (targetRotY + floatYaw + parallaxY - currentRotY) * 0.06;

        cameraRig.position.y = -0.15 + floatY;
      }

      cameraRig.rotation.x = currentRotX;
      cameraRig.rotation.y = currentRotY;

      renderer.render(scene, camera);
    };

    animate();

    // -------------------------------------------------------------
    // 9. RESIZE HANDLER
    // -------------------------------------------------------------
    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w === 0 || h === 0) return;

      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // -------------------------------------------------------------
    // 10. CLEANUP
    // -------------------------------------------------------------
    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      canvas.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      canvas.removeEventListener("dblclick", handleDoubleClick);

      // Dispose Geometries and Materials
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

      reelTex.dispose();
      matteBoxTex.dispose();
      bodySideTex.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full flex items-center justify-center select-none cursor-grab active:cursor-grabbing ${className}`}
      title="35mm Cinema Camera • Drag to orbit in 3D • Double-click to reset"
    >
      <canvas
        ref={canvasRef}
        className="w-full h-full block touch-none"
        style={{ pointerEvents: "auto" }}
      />

      {/* Subtle interaction pill badge */}
      <div
        className={`absolute bottom-1 px-3 py-1 rounded-full bg-[#211747]/90 border border-[#B9A1F7]/30 text-[10px] font-mono tracking-wider text-[#F3EBDD] backdrop-blur-md transition-opacity duration-300 pointer-events-none uppercase flex items-center gap-2 ${
          isInteracting ? "opacity-100" : "opacity-0 hover:opacity-100"
        }`}
      >
        <span className="w-1.5 h-1.5 rounded-full bg-[#D5FF3F] animate-pulse" />
        <span>3D CINEMA RIG • DRAG TO ORBIT</span>
      </div>
    </div>
  );
};
