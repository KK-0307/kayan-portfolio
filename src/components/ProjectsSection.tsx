"use client";

import { useState } from "react";
import { FaGithub } from "react-icons/fa6";
import TerminalPanel from "./TerminalPanel";
import Modal from "./Modal";
import { projects, projectNote, type ProjectStatus } from "@/data/portfolio";

function StatusBadge({ status }: { status: ProjectStatus }) {
  const isDone = status === "Completed";
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[11px] ${
        isDone ? "border-accent-dim/50 text-accent-dim" : "border-muted/50 text-muted"
      }`}
    >
      <span className={`h-1.5 w-1.5 rounded-full ${isDone ? "bg-accent-dim" : "bg-muted pulse-dot"}`} />
      {status}
    </span>
  );
}

export default function ProjectsSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const activeProject = openIndex !== null ? projects[openIndex] : null;

  return (
    <TerminalPanel title="~/projects" id="projects">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div key={project.number} className="flex flex-col">
            <div className="flex items-start justify-between gap-2 mb-1">
              <p>
                <span className="text-muted text-sm">{project.number}</span>{" "}
                <span className="text-accent font-semibold">{project.title}</span>
              </p>
            </div>
            <div className="mb-2">
              <StatusBadge status={project.status} />
            </div>
            <p className="text-sm text-muted mb-3 line-clamp-2">{project.description}</p>
            <div className="flex flex-wrap gap-2 mb-3">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="mt-auto flex items-center gap-4">
              <button
                type="button"
                onClick={() => setOpenIndex(index)}
                className="text-left text-sm text-accent hover:underline"
              >
                &gt; view project
              </button>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${project.title} on GitHub`}
                  className="flex items-center gap-1.5 text-sm text-muted transition-colors hover:text-accent"
                >
                  <FaGithub className="h-3.5 w-3.5" />
                  github
                </a>
              )}
            </div>
          </div>
        ))}
      </div>

      {activeProject && (
        <Modal
          title={activeProject.title}
          eyebrow={activeProject.number}
          onClose={() => setOpenIndex(null)}
        >
          <div className="mb-4">
            <StatusBadge status={activeProject.status} />
          </div>

          <p className="text-sm text-fg/90 mb-4">{activeProject.description}</p>

          <div className="flex flex-wrap gap-2 mb-4">
            {activeProject.tags.map((tag) => (
              <span key={tag} className="rounded border border-border px-2 py-0.5 text-xs text-muted">
                {tag}
              </span>
            ))}
          </div>

          {activeProject.githubUrl ? (
            <div className="flex flex-col gap-2 border-t border-border pt-3 text-sm">
              <a
                href={activeProject.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-accent hover:underline"
              >
                <FaGithub className="h-4 w-4 shrink-0" />
                {activeProject.githubUrl.replace("https://", "")}
              </a>
              {activeProject.liveUrl && (
                <a
                  href={activeProject.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-accent hover:underline"
                >
                  <span className="w-4 shrink-0 text-center">&gt;</span>
                  live demo: {activeProject.liveUrl.replace("https://", "")}
                </a>
              )}
            </div>
          ) : (
            <p className="text-xs text-muted border-t border-border pt-3">
              <span className="text-accent">&gt;</span> {projectNote}
            </p>
          )}
        </Modal>
      )}
    </TerminalPanel>
  );
}
