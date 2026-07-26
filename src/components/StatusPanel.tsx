import TerminalPanel from "./TerminalPanel";
import { status } from "@/data/portfolio";

const rows: { label: string; value: string; accent?: boolean }[] = [
  { label: "Location", value: status.location },
  { label: "Timezone", value: status.timezone },
  { label: "Availability", value: status.availability, accent: true },
  { label: "Focus", value: status.focus },
  { label: "Currently", value: status.currently },
];

export default function StatusPanel() {
  return (
    <TerminalPanel title="~/status" id="experience">
      <dl className="space-y-3 text-sm">
        {rows.map((row) => (
          <div key={row.label} className="flex gap-4">
            <dt className="text-muted w-28 shrink-0">{row.label}</dt>
            <dd className={row.accent ? "text-accent" : "text-fg"}>{row.value}</dd>
          </div>
        ))}
      </dl>
    </TerminalPanel>
  );
}
