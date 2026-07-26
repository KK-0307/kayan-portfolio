"use client";

import { Home, FolderOpen, Briefcase, BookOpen, Mail, type LucideIcon } from "lucide-react";
import TerminalPanel from "./TerminalPanel";
import { navigation } from "@/data/portfolio";
import { useNavModal, type NavModalKey } from "./NavModalContext";

const icons: Record<string, LucideIcon> = {
  home: Home,
  projects: FolderOpen,
  experience: Briefcase,
  teaching: BookOpen,
  contact: Mail,
};

export default function Sidebar() {
  const { open } = useNavModal();

  return (
    <TerminalPanel title="~/navigation">
      <nav className="flex flex-col gap-1">
        {navigation.map((item) => {
          const Icon = icons[item.label];
          const content = (
            <>
              <span className="text-muted text-xs pt-0.5 w-5 shrink-0">{item.number}</span>
              <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted group-hover:text-accent transition-colors" />
              <span>
                <span className="block font-semibold text-fg group-hover:text-accent transition-colors">
                  {item.label}
                </span>
                <span className="block text-xs text-muted">{item.subtitle}</span>
              </span>
            </>
          );
          const className =
            "group flex w-full items-start gap-3 rounded-md px-2 py-2 -mx-2 text-left transition-colors hover:bg-white/5";

          if (item.kind === "modal") {
            return (
              <button
                key={item.label}
                type="button"
                onClick={() => open(item.target as NavModalKey)}
                className={className}
              >
                {content}
              </button>
            );
          }

          return (
            <a key={item.label} href={`#${item.target}`} className={className}>
              {content}
            </a>
          );
        })}
      </nav>
    </TerminalPanel>
  );
}
