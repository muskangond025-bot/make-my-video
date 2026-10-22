"use client";

import React, { useState } from "react";
import { Play, ArrowRight, Video, Sparkles } from "lucide-react";
import { ProjectItem } from "@/data/projectsPageData";
import { ProjectModal } from "./ProjectModal";

interface ProjectsShowcaseProps {
  projects: ProjectItem[];
}

export const ProjectsShowcase: React.FC<ProjectsShowcaseProps> = ({ projects }) => {
  const [activeProjectForModal, setActiveProjectForModal] = useState<ProjectItem | null>(null);

  if (projects.length === 0) {
    return (
      <div className="max-w-[1360px] mx-auto px-4 py-20 text-center">
        <div className="w-16 h-16 rounded-full bg-white/60 mx-auto flex items-center justify-center text-[#141416]/40 mb-4 border border-[#141416]/10">
          <Video size={28} />
        </div>
        <h3 className="text-xl font-heading font-bold text-[#141416] mb-2">No Projects Found</h3>
        <p className="text-sm text-[#141416]/60 max-w-md mx-auto font-sans">
          We couldn't find any projects matching your criteria. Try adjusting your search query or selecting a different category.
        </p>
      </div>
    );
  }

  return (
    <section className="relative px-4 sm:px-8 max-w-[1360px] mx-auto w-full pb-20">
      <div className="space-y-16 sm:space-y-24">
        {projects.map((project, index) => {
          const isEven = index % 2 === 1;

          return (
            <div
              key={project.id}
              className={`flex flex-col ${
                isEven ? "lg:flex-row-reverse" : "lg:flex-row"
              } items-center gap-8 lg:gap-14 bg-white/40 hover:bg-white/70 backdrop-blur-sm border border-[#141416]/10 rounded-3xl p-6 sm:p-10 transition-all duration-300 shadow-sm hover:shadow-md`}
            >
              {/* Text Side */}
              <div className="w-full lg:w-5/12 flex flex-col justify-center space-y-5">
                <div className="space-y-2">
                  <span className="inline-block text-xs uppercase tracking-widest text-[#7567EE] font-semibold">
                    {project.category}
                  </span>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-heading font-black tracking-tight text-[#141416]">
                    {project.title}
                  </h3>
                </div>

                <p className="text-base sm:text-lg text-[#141416]/80 font-sans leading-relaxed">
                  {project.description}
                </p>

                {project.impactMetrics && project.impactMetrics.length > 0 && (
                  <div className="flex flex-wrap gap-2 pt-1">
                    {project.impactMetrics.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-sans text-[#141416]/60 bg-white/80 border border-[#141416]/10 px-3 py-1 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    onClick={() => setActiveProjectForModal(project)}
                    className="group inline-flex items-center gap-3 px-6 py-3 rounded-full bg-[#141416] text-white hover:bg-[#7567EE] transition-all duration-300 font-sans text-sm font-semibold shadow-md"
                  >
                    <span>Know More</span>
                    <Play
                      size={15}
                      className="fill-current text-white transition-transform group-hover:scale-110"
                    />
                  </button>
                </div>
              </div>

              {/* Video Side */}
              <div className="w-full lg:w-7/12">
                <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black shadow-lg border border-black/10 group">
                  <iframe
                    src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=0&enablejsapi=1&rel=0&modestbranding=1`}
                    title={project.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                    className="w-full h-full border-0"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Interactive Modal */}
      <ProjectModal
        project={activeProjectForModal}
        onClose={() => setActiveProjectForModal(null)}
      />
    </section>
  );
};
