"use client";

import React, { useState, useEffect, useRef } from "react";
import "./CubeShowcase.css";

interface ProjectItem {
  id: string;
  number: string;
  name: string;
  category: string;
  videoSrc: string;
  thumbnail: string;
}

const FEATURED_PROJECTS: ProjectItem[] = [
  {
    id: "nisau-uk",
    number: "01",
    name: "NISAU UK",
    category: "Video Production",
    videoSrc: "/videos/nisau-uk.mp4",
    thumbnail: "/images/projects/nisau-uk.jpg",
  },
  {
    id: "hgh-india",
    number: "02",
    name: "HGH India",
    category: "Corporate Video Production",
    videoSrc: "/videos/hgh-india.mp4",
    thumbnail: "/images/projects/hgh-india.jpg",
  },
  {
    id: "pipal-tree",
    number: "03",
    name: "Pipal Tree",
    category: "Social Documentary",
    videoSrc: "/videos/pipal-tree.mp4",
    thumbnail: "/images/projects/pipal-tree.jpg",
  },
  {
    id: "sneha",
    number: "04",
    name: "SNEHA",
    category: "CSR Documentary",
    videoSrc: "/videos/sneha.mp4",
    thumbnail: "/images/projects/sneha.jpg",
  },
];

// Curated 3x3 (9 Visual Tiles per Face) on White Chassis Rubik's Cube
const RUBIK_FACES_DATA: Record<string, string[]> = {
  front: [
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop", // Vibrant portrait
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80&auto=format&fit=crop", // Sunset coast
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80&auto=format&fit=crop", // Green mountain
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&q=80&auto=format&fit=crop", // Colorful cosmos
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&q=80&auto=format&fit=crop", // Abstract art
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80&auto=format&fit=crop", // Golden sunset
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&q=80&auto=format&fit=crop", // Cinema portrait
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80&auto=format&fit=crop", // Alpine lake
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=80&auto=format&fit=crop", // Sunset ocean
  ],
  right: [
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80&auto=format&fit=crop", // Warm glow
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80&auto=format&fit=crop", // Starry peak
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&q=80&auto=format&fit=crop", // Neon acrylic
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80&auto=format&fit=crop", // Tech circuits
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80&auto=format&fit=crop", // Mist & dawn
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&auto=format&fit=crop", // Color portrait
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&q=80&auto=format&fit=crop", // Confetti burst
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80&auto=format&fit=crop", // Emerald hills
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=300&q=80&auto=format&fit=crop", // Modern studio
  ],
  top: [
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80&auto=format&fit=crop", // Coast
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&q=80&auto=format&fit=crop", // Aurora
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&q=80&auto=format&fit=crop", // Abstract
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80&auto=format&fit=crop", // Mountain
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80&auto=format&fit=crop", // Sunset
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop", // Portrait
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80&auto=format&fit=crop", // Lake
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=80&auto=format&fit=crop", // Horizon
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&q=80&auto=format&fit=crop", // Cinema
  ],
  back: [
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80&auto=format&fit=crop",
  ],
  left: [
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1500485035595-cbe6f645feb1?w=300&q=80&auto=format&fit=crop",
  ],
  bottom: [
    "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1513151233558-d860c5398176?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=300&q=80&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=300&q=80&auto=format&fit=crop",
  ],
};

const ALL_FACES: { key: "front" | "back" | "right" | "left" | "top" | "bottom" }[] = [
  { key: "front" },
  { key: "back" },
  { key: "right" },
  { key: "left" },
  { key: "top" },
  { key: "bottom" },
];

export const CubeShowcase: React.FC = () => {
  const [hoveredProject, setHoveredProject] = useState<ProjectItem | null>(null);
  const [isMarqueeStopped, setIsMarqueeStopped] = useState(false);
  const marqueeTimerRef = useRef<NodeJS.Timeout | null>(null);
  const videoRefs = useRef<Record<string, HTMLVideoElement | null>>({});

  // Instant smooth video playback and pausing
  useEffect(() => {
    FEATURED_PROJECTS.forEach((project) => {
      const vid = videoRefs.current[project.id];
      if (!vid) return;

      if (hoveredProject?.id === project.id) {
        vid.currentTime = 0;
        vid.play().catch(() => {});
      } else {
        vid.pause();
      }
    });

    if (hoveredProject) {
      if (marqueeTimerRef.current) clearTimeout(marqueeTimerRef.current);
      marqueeTimerRef.current = setTimeout(() => {
        setIsMarqueeStopped(true);
      }, 1000);
    } else {
      if (marqueeTimerRef.current) clearTimeout(marqueeTimerRef.current);
      setIsMarqueeStopped(false);
    }

    return () => {
      if (marqueeTimerRef.current) clearTimeout(marqueeTimerRef.current);
    };
  }, [hoveredProject]);

  return (
    <section
      id="archive"
      className="cube-section-wrapper select-none"
    >
      
      {/* 1. Dynamic Full-Bleed Video Background (Instant Preloaded Local Playback, 0ms Lag) */}
      <div className={`cube-video-bg-container ${hoveredProject ? "active" : ""}`}>
        {FEATURED_PROJECTS.map((project) => {
          const isCurrent = hoveredProject?.id === project.id;
          return (
            <div
              key={project.id}
              className={`cube-video-bg-item ${isCurrent ? "visible" : ""}`}
            >
              {/* Local Crisp Poster Image (Zero network latency) */}
              <img
                src={project.thumbnail}
                alt={project.name}
                className="cube-bg-poster"
              />

              {/* Native HTML5 Video Element (Hardware Accelerated, Smooth 60fps) */}
              <video
                ref={(el) => {
                  videoRefs.current[project.id] = el;
                }}
                src={project.videoSrc}
                poster={project.thumbnail}
                className="cube-bg-video"
                muted
                loop
                playsInline
                preload="none"
              />

              {/* Minimal Dark Scrim on Bottom to Keep Subtle UI Clear */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30 pointer-events-none" />
            </div>
          );
        })}
      </div>

      {/* 2. Editorial Section Header (No Eyebrow Tag) */}
      <div className={`cube-header-wrapper ${hoveredProject ? "video-active" : ""}`}>
        <h2 className="cube-header-title">
          A little Magic. <span className="cube-header-accent">in every frame.</span>
        </h2>
      </div>

      {/* 3. Infinite Running Marquee: MADE TO SEEN (Pauses & Dims completely when video is active) */}
      <div
        className="cube-marquee-wrap"
        aria-hidden="true"
        style={{
          opacity: isMarqueeStopped ? 0 : 1,
          transition: "opacity 0.6s ease",
        }}
      >
        <div
          className="cube-marquee-track"
          style={{
            animationPlayState: isMarqueeStopped ? "paused" : "running",
          }}
        >
          <div className="cube-marquee-item">MADE TO SEEN · MADE TO SEEN · MADE TO SEEN · MADE TO SEEN ·&nbsp;</div>
          <div className="cube-marquee-item">MADE TO SEEN · MADE TO SEEN · MADE TO SEEN · MADE TO SEEN ·&nbsp;</div>
        </div>
      </div>

      {/* 4. Realistic 3x3 White Chassis Rubik's Cube Scene */}
      <div className={`cube-scene ${hoveredProject ? "cube-hidden" : ""}`}>
        <div id="mainCube" className="cube-main rubik-cube">
          {ALL_FACES.map((face) => (
            <div
              key={face.key}
              id={`f-${face.key}`}
              className={`cube-face ${face.key}`}
            >
              {/* 3x3 RUBIK'S CUBE GRID (WHITE SEAMS & EDGES) */}
              <div className="cube-rubik-grid">
                {RUBIK_FACES_DATA[face.key]?.map((imageUrl, idx) => (
                  <div key={idx} className="cube-rubik-tile">
                    <img
                      src={imageUrl}
                      alt={`Rubik Tile ${idx + 1}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Minimal List View (Direct On/Off on Item Hover/Unhover) */}
      <div
        className={`cube-archive-list ${hoveredProject ? "video-active" : ""}`}
        id="js-list"
      >
        {FEATURED_PROJECTS.map((project) => {
          const isActive = hoveredProject?.id === project.id;
          return (
            <div
              key={project.id}
              className={`cube-list-item ${isActive ? "active" : ""}`}
              onMouseEnter={() => setHoveredProject(project)}
              onMouseLeave={() => setHoveredProject(null)}
            >
              {project.number}. {project.name}
            </div>
          );
        })}
      </div>

    </section>
  );
};
