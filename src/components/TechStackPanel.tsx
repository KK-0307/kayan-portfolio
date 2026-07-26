import type { IconType } from "react-icons";
import {
  SiPython,
  SiPytorch,
  SiDocker,
  SiPostgresql,
  SiFastapi,
  SiApachekafka,
  SiRedis,
  SiLinux,
  SiGit,
} from "react-icons/si";
import { FaAws } from "react-icons/fa6";
import TerminalPanel from "./TerminalPanel";
import { techStack } from "@/data/portfolio";

const icons: Record<string, IconType> = {
  Python: SiPython,
  PyTorch: SiPytorch,
  Docker: SiDocker,
  AWS: FaAws,
  PostgreSQL: SiPostgresql,
  FastAPI: SiFastapi,
  Kafka: SiApachekafka,
  Redis: SiRedis,
  Linux: SiLinux,
  Git: SiGit,
};

export default function TechStackPanel() {
  return (
    <TerminalPanel title="~/tech_stack">
      <div className="flex flex-wrap gap-2">
        {techStack.map((tech) => {
          const Icon = icons[tech];
          return (
            <span
              key={tech}
              className="flex items-center gap-1.5 rounded border border-border px-2.5 py-1 text-xs text-fg"
            >
              {Icon && <Icon className="h-3.5 w-3.5 text-accent" />}
              {tech}
            </span>
          );
        })}
      </div>
    </TerminalPanel>
  );
}
