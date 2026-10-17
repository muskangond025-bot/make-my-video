"use client";

import React, { useState, useMemo } from "react";
import "./CubeShowcase.css";

const ARCHIVE_ITEMS = [
  "Shaped by Earth", "Echoes in Light", "Moving Portraits", "Issey Miyake SS25", "Archive Study", "Digital Noir", "Kinetic Type", "Silk Motion", "Void Space",
  "Urban Texture", "Chrome Flow", "Neon Pulse", "Organic Form", "Liquid Metal", "Shadow Play", "Brutalist Arch", "Glass Reflex", "Static Noise",
  "Optic Nerve", "Mono Structure", "Velvet Dark", "Grid System", "Analog Dream", "Future Grain", "Bold Minimal", "Raw Canvas", "Deep Contrast",
  "Prism Break", "Ghost Image", "Core Design", "Vintage Tech", "Soft Focus", "Hard Edge", "Motion Blur", "Noir Concept", "Final Frame"
];

interface FaceConfig {
  key: "front" | "back" | "right" | "left" | "top" | "bottom";
  name: string;
  startIndex: number;
  targetRotationY: number;
}

const ALL_FACES: FaceConfig[] = [
  { key: "front", name: "Front Face", startIndex: 0, targetRotationY: 0 },
  { key: "back", name: "Back Face", startIndex: 9, targetRotationY: 180 },
  { key: "right", name: "Right Face", startIndex: 18, targetRotationY: -90 },
  { key: "left", name: "Left Face", startIndex: 27, targetRotationY: 90 },
  { key: "top", name: "Top Face", startIndex: 0, targetRotationY: 0 },
  { key: "bottom", name: "Bottom Face", startIndex: 9, targetRotationY: 0 },
];

export const CubeShowcase: React.FC = () => {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Compute rotation angle based on active item
  const cubeTransform = useMemo(() => {
    if (hoveredId === null) return undefined;
    let rotationY = 0;
    if (hoveredId <= 9) {
      rotationY = 0; // Front
    } else if (hoveredId <= 18) {
      rotationY = 180; // Back
    } else if (hoveredId <= 27) {
      rotationY = -90; // Right face moves to front
    } else {
      rotationY = 90; // Left face moves to front
    }
    return `rotateX(0deg) rotateY(${rotationY}deg)`;
  }, [hoveredId]);

  return (
    <section id="archive" className="cube-section-wrapper select-none">
      {/* Giant Background Watermark */}
      <div className="cube-fw-logo" aria-hidden="true">
        MAKE MY VID
      </div>

      {/* 3D Scene Container */}
      <div className="cube-scene">
        <div
          id="mainCube"
          className={`cube-main ${hoveredId !== null ? "active-focus" : ""}`}
          style={cubeTransform ? { transform: cubeTransform } : undefined}
        >
          {/* All 6 Interactive Faces (Front, Back, Right, Left, Top, Bottom) - NO empty sides */}
          {ALL_FACES.map((face) => (
            <div
              key={face.key}
              id={`f-${face.key}`}
              className={`cube-face ${face.key}`}
            >
              <div className="cube-grid">
                {Array.from({ length: 9 }).map((_, i) => {
                  const id = ((face.startIndex + i) % ARCHIVE_ITEMS.length) + 1;
                  const isHighlighted = hoveredId === id;
                  return (
                    <div
                      key={i}
                      id={`img-${face.key}-${i}`}
                      className={`cube-item ${isHighlighted ? "highlight" : ""}`}
                      onMouseEnter={() => setHoveredId(id)}
                      onMouseLeave={() => setHoveredId(null)}
                      onClick={() => setHoveredId(hoveredId === id ? null : id)}
                    >
                      <img
                        src={`https://picsum.photos/600/600?random=${face.startIndex + i + 1}`}
                        alt={ARCHIVE_ITEMS[id - 1] || `Frame ${id}`}
                        loading="lazy"
                      />
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Archive List on Right Side */}
      <div className="cube-archive-list" id="js-list">
        {ARCHIVE_ITEMS.map((name, index) => {
          const id = index + 1;
          const isActive = hoveredId === id;
          const formattedId = id < 10 ? `0${id}` : `${id}`;

          return (
            <div
              key={id}
              className={`cube-list-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => setHoveredId(id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => setHoveredId(isActive ? null : id)}
            >
              {formattedId}. {name}
            </div>
          );
        })}
      </div>
    </section>
  );
};
