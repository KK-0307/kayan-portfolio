import {
  Home,
  FolderOpen,
  Briefcase,
  BookOpen,
  Camera,
  Mail,
  type LucideIcon,
} from "lucide-react";
import TerminalPanel from "./TerminalPanel";
import { navigation } from "@/data/portfolio";

const icons: Record<string, LucideIcon> = {
  home: Home,
  projects: FolderOpen,
  experience: Briefcase,
  teaching: BookOpen,
  photography: Camera,
  contact: Mail,
};

export default function Sidebar() {
  return (
    <TerminalPanel title="~/navigation">
      <nav className="flex flex-col gap-1">
        {navigation.map((item) => {
          const Icon = icons[item.label];
          return (
            <a
              key={item.label}
              href={item.href}
              className="group flex items-start gap-3 rounded-md px-2 py-2 -mx-2 transition-colors hover:bg-white/5"
            >
              <span className="text-muted text-xs pt-0.5 w-5 shrink-0">{item.number}</span>
              <Icon className="h-4 w-4 mt-0.5 shrink-0 text-muted group-hover:text-accent transition-colors" />
              <span>
                <span className="block font-semibold text-fg group-hover:text-accent transition-colors">
                  {item.label}
                </span>
                <span className="block text-xs text-muted">{item.subtitle}</span>
              </span>
            </a>
          );
        })}
      </nav>
    </TerminalPanel>
  );
}
