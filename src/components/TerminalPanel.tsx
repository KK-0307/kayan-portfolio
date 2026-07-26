import { ReactNode } from "react";

export default function TerminalPanel({
  title,
  children,
  className = "",
  id,
}: {
  title: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`scroll-mt-6 rounded-lg border border-border bg-panel shadow-lg shadow-black/40 transition-shadow hover:shadow-[0_0_28px_-8px_rgba(244,114,182,0.35)] ${className}`}
    >
      <div className="px-5 pt-4 pb-2 text-xs text-accent">{title}</div>
      <div className="px-5 pb-5">{children}</div>
    </section>
  );
}
