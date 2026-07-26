import TerminalPanel from "./TerminalPanel";
import { skills } from "@/data/portfolio";

const BAR_LENGTH = 16;

function bar(level: number) {
  const filled = Math.round((level / 100) * BAR_LENGTH);
  return "█".repeat(filled) + "░".repeat(BAR_LENGTH - filled);
}

export default function SkillsPanel() {
  return (
    <TerminalPanel title="~/skills">
      <div className="space-y-2.5 text-sm">
        {skills.map((skill) => (
          <div key={skill.name} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1">
            <span className="text-fg shrink-0">{skill.name}</span>
            <span className="flex w-full items-center gap-2 sm:w-auto sm:flex-1 sm:justify-end">
              <span className="font-mono text-accent tracking-tighter text-xs leading-none whitespace-nowrap overflow-hidden">
                [{bar(skill.level)}]
              </span>
              <span className="text-muted w-9 shrink-0 text-right tabular-nums">{skill.level}%</span>
            </span>
          </div>
        ))}
      </div>
    </TerminalPanel>
  );
}
