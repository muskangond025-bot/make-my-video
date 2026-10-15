"use client";
import React, { useRef, useEffect, useState } from 'react';
import { gsap, ScrollTrigger } from '@/lib/gsap';

const projects = [
  {
    id: "01",
    name: "BPCL INDIA ENERGY",
    tag1: "Energy & Infrastructure",
    tag2: "Event Doc & Interviews",
    tag3: "Multi-City Expo",
    color: "#211747",
    textColor: "#F3EBDD",
    descColor: "rgba(243, 235, 221, 0.75)",
    borderColor: "rgba(185, 161, 247, 0.35)",
    tagBg: "rgba(185, 161, 247, 0.12)",
    tagText: "#B9A1F7",
    tagBorder: "rgba(185, 161, 247, 0.3)",
    btnBg: "#D5FF3F",
    btnText: "#211747",
    description: "Comprehensive event coverage, cinematic timelapses, and delegate interviews for Bharat Petroleum Corporation Limited at India Energy Week, highlighting global industry participation and technological innovations.",
    video: "",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737959797_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(3)%20(1).png"
  },
  {
    id: "02",
    name: "WOL3D SHARK TANK",
    tag1: "3D Printing & Tech",
    tag2: "Shark Tank Pitch Video",
    tag3: "National Broadcast",
    color: "#F3EBDD",
    textColor: "#211747",
    descColor: "#6B6478",
    borderColor: "rgba(33, 23, 71, 0.18)",
    tagBg: "rgba(185, 161, 247, 0.15)",
    tagText: "#211747",
    tagBorder: "rgba(33, 23, 71, 0.2)",
    btnBg: "#211747",
    btnText: "#D5FF3F",
    description: "Created the viral pitch video and product showcase for Wol3D on Shark Tank India, driving national acclaim, investor funding, and widespread brand recognition.",
    video: "",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958403_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(1)%20(1).png"
  },
  {
    id: "03",
    name: "ADITYA BIRLA",
    tag1: "Corporate & Finance",
    tag2: "Leadership & Internal AV",
    tag3: "Executive Communications",
    color: "#211747",
    textColor: "#F3EBDD",
    descColor: "rgba(243, 235, 221, 0.75)",
    borderColor: "rgba(185, 161, 247, 0.35)",
    tagBg: "rgba(185, 161, 247, 0.12)",
    tagText: "#B9A1F7",
    tagBorder: "rgba(185, 161, 247, 0.3)",
    btnBg: "#D5FF3F",
    btnText: "#211747",
    description: "Crafted corporate culture films, employee engagement initiatives, and high-stakes leadership interview series enhancing corporate communication and internal alignment.",
    video: "",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737960123_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(4)%20(1).png"
  },
  {
    id: "04",
    name: "CIPLA HEALTHCARE",
    tag1: "Healthcare & CSR",
    tag2: "Culture & Onboarding",
    tag3: "Pan-India Documentation",
    color: "#F3EBDD",
    textColor: "#211747",
    descColor: "#6B6478",
    borderColor: "rgba(33, 23, 71, 0.18)",
    tagBg: "rgba(185, 161, 247, 0.15)",
    tagText: "#211747",
    tagBorder: "rgba(33, 23, 71, 0.2)",
    btnBg: "#211747",
    btnText: "#D5FF3F",
    description: "Produced educational healthcare content, onboarding films, and corporate culture videos for Cipla, highlighting their social impact, manufacturing excellence, and healthcare contributions.",
    video: "",
    image: "https://storage.googleapis.com/mkv_imagesbackend/service_images/1737958320_Copy%20of%20MMV%20Website%20service%20page%20(1330%20x%201780%20px)%20(2)%20(1).png"
  }
];

export const Projects = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 991);
    };
    handleResize();
    window.addEventListener('resize', handleResize);

    if (window.innerWidth >= 991 && containerRef.current) {
      let trigger = ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "+=600%",
        pin: ".projects-sticky",
        scrub: 1,
        onUpdate: (self) => {
          const active = Math.min(
            Math.round(self.progress * (projects.length - 1)),
            projects.length - 1
          );
          setActiveIndex(active);
        }
      });

      return () => {
        window.removeEventListener('resize', handleResize);
        trigger.kill();
      };
    }

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isMobile]);

  // Mobile layout
  if (isMobile) {
    return (
      <div id="projects" className="section-projects-mobile w-full bg-[#F3EBDD] bg-dots-pattern py-16">
        <div className="padding-global">
          <div className="container-large">
            <div className="projects-mobile-wrap">
              <div className="flex flex-col gap-12">
                {projects.map((project, i) => (
                  <div key={i} className="projects-mobile-item flex flex-col gap-6 p-6 rounded-2xl bg-[#211747] text-[#F3EBDD] border border-[#B9A1F7]/25 shadow-xl">
                    <div className="projects-video-card w-full aspect-[3/2] rounded-xl overflow-hidden relative bg-[#191138] border border-[#B9A1F7]/20">
                      {project.video ? (
                        <div className="projects-video w-full h-full z-10 absolute inset-0">
                          <video autoPlay muted loop playsInline poster={project.image} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                            <source src={project.video} type="video/mp4" />
                          </video>
                        </div>
                      ) : null}
                      <div className="projects-video-img-wrap w-full h-full absolute inset-0 z-0">
                        <img src={project.image} loading="lazy" alt={project.name} className="projects-video-img w-full h-full object-contain" style={{ objectFit: 'contain' }} />
                      </div>
                    </div>

                    <div className="projects-content-wrap flex flex-col gap-4">
                      <div className="text-xs font-mono font-bold tracking-widest text-[#D5FF3F]">PROJECT 0{i + 1}</div>
                      <h2 className="heading-style-h2 font-heading uppercase text-3xl md:text-4xl text-[#F3EBDD]">
                        {project.name}
                      </h2>
                      <p className="text-[#F3EBDD]/75 text-sm leading-relaxed max-w-xl">
                        {project.description}
                      </p>
                      <div className="flex gap-2.5 items-center mt-2 flex-wrap">
                        <div className="eyebrow-main rounded-full px-3.5 py-1 text-[11px] font-medium text-[#B9A1F7] bg-[#B9A1F7]/12 border border-[#B9A1F7]/30">
                          <div>{project.tag1}</div>
                        </div>
                        <div className="eyebrow-main rounded-full px-3.5 py-1 text-[11px] font-medium text-[#B9A1F7] bg-[#B9A1F7]/12 border border-[#B9A1F7]/30">
                          <div>{project.tag2}</div>
                        </div>
                        <div className="eyebrow-main rounded-full px-3.5 py-1 text-[11px] font-medium text-[#B9A1F7] bg-[#B9A1F7]/12 border border-[#B9A1F7]/30">
                          <div>{project.tag3}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Desktop sticky split scroll
  return (
    <div ref={containerRef} id="projects" className="section-projects-wrap w-full relative">
      <section id="pricing" className="anchor-projects" />
      <section className="section-projects w-full h-full relative">
        <div className="projects-sticky">

          {/* Background transitions */}
          <div className="project-background-color">
            <div className="project-bg-color-list">
              {projects.map((project, i) => (
                <div
                  key={i}
                  className={`project-bg-color-item ${activeIndex === i ? 'is-active' : ''}`}
                >
                  <div className="background-color transition-colors duration-700" style={{ backgroundColor: project.color }} />
                </div>
              ))}
            </div>
          </div>

          <div className="padding-global full-height">
            <div className="container-large full-height">
              <div className="projects-padding">

                {/* Structural Wrapper matching Webflow layout */}
                <div className="header-wrapper is--project">

                  {/* Active slide borders */}
                  <div className="projects-border">
                    <div className="project-border-list">
                      {projects.map((project, i) => (
                        <div key={i} className={`project-border-item ${activeIndex === i ? 'is-active' : ''}`}>
                          <div className="project-border" style={{ borderColor: project.borderColor }} />
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Top View Button with high-contrast accent */}
                  <div className="projects-top">
                    <div className="projects-btn w-dyn-list">
                      <div className="projects-btn-list">
                        {projects.map((project, i) => (
                          <div key={i} className={`projects-btn-item ${activeIndex === i ? 'is-active' : ''}`}>
                            <a
                              href="https://rohanjoshi.in/all-projects"
                              className="btn-main w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a w-inline-block transition-all duration-300 shadow-md hover:scale-105"
                              style={{
                                backgroundColor: project.btnBg,
                                color: project.btnText,
                                borderColor: project.borderColor
                              }}
                            >
                              <div className="btn-frame w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a">
                                <div className="btn-text w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a font-bold">VIEW CASE STUDY</div>
                              </div>
                              <div className="btn-icon-wrap w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a">
                                <div className="btn-icon w-variant-3f868a72-10ee-c7cf-16c8-83bb44488a8a w-embed">
                                  <svg width="41" height="37" viewBox="0 0 41 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M0.500008 21.7256L0.5 15.5L34.7563 17.229L16.5207 6.72555L16.5207 0.5L40.5 18.5269L16.5207 36.5L16.5207 30.5451L35.0306 19.9213L0.500008 21.7256Z" fill="currentColor" />
                                  </svg>
                                </div>
                              </div>
                            </a>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Main Content Layout */}
                  <div className="projects-content">

                    {/* Left Column (Text & details) */}
                    <div className="projects-content-left">
                      <div className="projects-heading">

                        {/* Projects text titles */}
                        <div className="projects-title w-dyn-list">
                          <div className="projects-title-list" style={{ transform: `translateY(-${activeIndex * 13.1}em)` }}>
                            {projects.map((project, i) => (
                              <div key={i} className="projects-title-item" style={{ height: '13.1em', display: 'flex', alignItems: 'center' }}>
                                <div className="projects-title-wrap">
                                  <h2 className="heading-style-h2 project-color" style={{
                                    color: project.textColor,
                                    whiteSpace: 'nowrap',
                                    fontSize: 'clamp(2rem, 5.5vw, var(--_general---general-sizes--14rem))'
                                  }}>
                                    {project.name}
                                  </h2>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Project Index number */}
                        <div className="projects-number-wrap w-dyn-list">
                          <div className="projects-number-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-number-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div className="projects-number-inner" style={{ color: project.textColor }}>
                                  <div className="projects-number font-mono">(0</div>
                                  <div className="projects-number font-mono">{i + 1}</div>
                                  <div className="projects-number font-mono">)</div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                      {/* Project text descriptions */}
                      <div className="max-width-huge w-full relative">
                        <div className="projects-text w-dyn-list">
                          <div className="projects-text-list" style={{ height: 'auto', minHeight: '11em', overflow: 'visible' }}>
                            {projects.map((project, i) => (
                              <div
                                key={i}
                                className={`projects-text-item ${activeIndex === i ? 'is-active' : ''}`}
                              >
                                <p className="text-size-medium project-color leading-relaxed" style={{ color: project.descColor }}>
                                  {project.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>

                      {/* Category Eyebrow Pill elements */}
                      <div className="eyebrow-group" style={{ flexWrap: 'wrap', gap: '8px' }}>

                        {/* Tag 1 Category */}
                        <div className="projects-eyebrow-wrap w-dyn-list" style={{ flexShrink: 0 }}>
                          <div className="projects-eyebrow-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-eyebrow-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div
                                  className="eyebrow-main"
                                  style={{
                                    backgroundColor: project.tagBg,
                                    color: project.tagText,
                                    borderColor: project.tagBorder,
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <div className="eyebrow-text font-medium">
                                    {project.tag1}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tag 2 Category */}
                        <div className="projects-eyebrow-wrap w-dyn-list" style={{ flexShrink: 0 }}>
                          <div className="projects-eyebrow-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-eyebrow-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div
                                  className="eyebrow-main"
                                  style={{
                                    backgroundColor: project.tagBg,
                                    color: project.tagText,
                                    borderColor: project.tagBorder,
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <div className="eyebrow-text font-medium">
                                    {project.tag2}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Tag 3 Category */}
                        <div className="projects-eyebrow-wrap w-dyn-list" style={{ flexShrink: 0 }}>
                          <div className="projects-eyebrow-list">
                            {projects.map((project, i) => (
                              <div key={i} className={`projects-eyebrow-item ${activeIndex === i ? 'is-active' : ''}`}>
                                <div
                                  className="eyebrow-main"
                                  style={{
                                    backgroundColor: project.tagBg,
                                    color: project.tagText,
                                    borderColor: project.tagBorder,
                                    whiteSpace: 'nowrap'
                                  }}
                                >
                                  <div className="eyebrow-text font-medium">
                                    {project.tag3}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                      </div>

                    </div>

                    {/* Right Column (Videos and visual slide content) */}
                    <div className="project-content-right">
                      <div className="projects-video-wrap w-dyn-list" style={{ height: 'auto' }}>
                        <div className="projects-video-list" style={{ transform: `translateY(-${activeIndex * 100}%)` }}>
                          {projects.map((project, i) => (
                            <div key={i} className="projects-video-item">
                              {project.video ? (
                                <div className="projects-video w-embed z-10 absolute inset-0 w-full h-full">
                                  <video autoPlay muted loop playsInline poster={project.image} style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}>
                                    <source src={project.video} type="video/mp4" />
                                  </video>
                                </div>
                              ) : null}
                              <div className="projects-video-img-wrap z-0 absolute inset-0 w-full h-full flex items-center justify-center p-4">
                                <img src={project.image} loading="lazy" alt={project.name} className="projects-video-img w-full h-full object-contain rounded-2xl drop-shadow-2xl" style={{ objectFit: 'contain' }} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                  </div>

                </div>

              </div>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
};
