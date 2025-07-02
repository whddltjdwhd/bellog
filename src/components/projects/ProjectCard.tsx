import React from "react";
import Image from "next/image";
import { ProjectData } from "@/types";
import { ExternalLink, Github } from "lucide-react";

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="group relative bg-[var(--background)] border border-[var(--border)] rounded-lg overflow-hidden transition-all duration-300 hover:border-[var(--accent)] hover:shadow-md">
      <div className="aspect-[4/1] relative overflow-hidden">
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4">
        <div className="mb-2">
          <h3 className="font-medium text-[var(--text)] truncate">
            {project.title}
          </h3>
        </div>

        <div className="flex flex-wrap gap-1">
          {project.techStack.map((tech) => (
            <span key={tech} className="text-xs text-[var(--accent)] font-mono">
              {tech}
              {project.techStack.indexOf(tech) !==
                project.techStack.length - 1 && " ·"}
            </span>
          ))}
        </div>

        <div className="flex gap-2 mt-3 md:hidden">
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 bg-gray-800 text-white rounded text-xs transition-colors hover:bg-gray-900"
          >
            <ExternalLink size={12} />
            웹사이트
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 px-2 py-1 border border-[var(--border)] text-[var(--text)] rounded text-xs transition-colors hover:bg-[var(--border)]"
          >
            <Github size={12} />
            GitHub
          </a>
        </div>
      </div>

      <div className="hidden md:flex absolute inset-0 bg-[var(--background)]/95 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex-col items-center justify-center p-6">
        <p className="text-sm text-[var(--text-muted)] leading-relaxed text-center mb-4">
          {project.description}
        </p>
        <div className="flex gap-3">
          <a
            href={project.websiteUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 bg-gray-800 text-white rounded-md text-sm transition-colors hover:bg-gray-900"
          >
            <ExternalLink size={16} />
            웹사이트
          </a>
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-3 py-2 border border-[var(--border)] text-[var(--text)] rounded-md text-sm transition-colors hover:bg-[var(--border)]"
          >
            <Github size={16} />
            GitHub
          </a>
        </div>
      </div>
    </div>
  );
}
