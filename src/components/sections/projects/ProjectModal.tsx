"use client";

import React, { useEffect } from "react";
import { X, Play, ExternalLink } from "lucide-react";
import { ProjectItem } from "@/data/projectsPageData";
import { BrandButton } from "@/components/shared/BrandButton";

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (project) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [project]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10 bg-black/80 backdrop-blur-md animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl bg-[#141416] text-[#EAE3DB] rounded-3xl border border-white/10 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-[#1A1A1E]">
          <div>
            <span className="text-xs tracking-wider uppercase text-[#7567EE] font-medium">
              {project.category}
            </span>
            <h3 className="text-xl sm:text-2xl font-heading font-black tracking-tight text-white mt-0.5">
              {project.title}
            </h3>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Video Player */}
        <div className="relative w-full aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${project.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
            title={project.title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
            className="w-full h-full border-0"
          />
        </div>

        {/* Details Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-4">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-1">
              Project Overview
            </h4>
            <p className="text-base sm:text-lg text-[#EAE3DB]/90 leading-relaxed font-sans">
              {project.fullDetails || project.description}
            </p>
          </div>

          {project.impactMetrics && project.impactMetrics.length > 0 && (
            <div className="pt-2">
              <h4 className="text-sm font-semibold uppercase tracking-wider text-white/50 mb-2">
                Production Highlights
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {project.impactMetrics.map((metric, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/90 text-center"
                  >
                    {metric}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-wrap items-center justify-end pt-4 border-t border-white/10 gap-3">
            <button
              onClick={onClose}
              className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer"
            >
              Close
            </button>
            <BrandButton
              href={`https://www.youtube.com/watch?v=${project.youtubeId}`}
              target="_blank"
              size="sm"
              label="WATCH ON YOUTUBE"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
