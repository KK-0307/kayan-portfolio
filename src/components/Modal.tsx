"use client";

import { useEffect, type ReactNode } from "react";
import { X } from "lucide-react";

export default function Modal({
  title,
  eyebrow,
  onClose,
  children,
}: {
  title: string;
  eyebrow?: string;
  onClose: () => void;
  children: ReactNode;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        onClick={(e) => e.stopPropagation()}
        className="glow-accent max-h-[80vh] w-full max-w-lg overflow-y-auto rounded-lg border border-accent/40 bg-panel p-6"
      >
        <div className="mb-4 flex items-start justify-between gap-4">
          <p>
            {eyebrow && <span className="text-muted text-sm">{eyebrow} </span>}
            <span className="text-lg font-semibold text-accent">{title}</span>
          </p>
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="shrink-0 text-muted transition-colors hover:text-accent"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
