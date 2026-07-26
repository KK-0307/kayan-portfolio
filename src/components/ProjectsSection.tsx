"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import TerminalPanel from "./TerminalPanel";
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

  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpenIndex(null);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [openIndex]);

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
            <button
              type="button"
              onClick={() => setOpenIndex(index)}
              className="mt-auto text-left text-sm text-accent hover:underline"
            >
              &gt; view project
            </button>
          </div>
        ))}
      </div>

      {activeProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
          onClick={() => setOpenIndex(null)}
        >
          <div
            role="dialog"
            aria-modal="true"
            onClick={(e) => e.stopPropagation()}
            className="glow-accent w-full max-w-lg rounded-lg border border-accent/40 bg-panel p-6"
          >
            <div className="flex items-start justify-between gap-4 mb-3">
              <p>
                <span className="text-muted text-sm">{activeProject.number}</span>{" "}
                <span className="text-accent text-lg font-semibold">{activeProject.title}</span>
              </p>
              <button
                type="button"
                aria-label="Close"
                onClick={() => setOpenIndex(null)}
                className="text-muted hover:text-accent transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mb-4">
              <StatusBadge status={activeProject.status} />
            </div>

            <p className="text-sm text-fg/90 mb-4">{activeProject.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {activeProject.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded border border-border px-2 py-0.5 text-xs text-muted"
                >
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-xs text-muted border-t border-border pt-3">
              <span className="text-accent">&gt;</span> {projectNote}
            </p>
          </div>
        </div>
      )}
    </TerminalPanel>
  );
}
