"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { navigation, profile } from "@/data/portfolio";

type Line = { type: "input" | "output"; text: string };

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return false;
  el.scrollIntoView({ behavior: "smooth", block: "start" });
  return true;
}

function runCommand(raw: string): Line[] {
  const trimmed = raw.trim();
  const [cmd, ...args] = trimmed.split(/\s+/);
  const out: Line[] = [{ type: "input", text: trimmed }];

  switch (cmd.toLowerCase()) {
    case "help":
      out.push({
        type: "output",
        text: "commands: help, ls, cd <section>, whoami, clear",
      });
      break;
    case "ls":
      out.push({ type: "output", text: navigation.map((n) => `${n.label}/`).join("  ") });
      break;
    case "whoami":
      out.push({ type: "output", text: `${profile.name} — ${profile.roles.join(" ")}` });
      break;
    case "cd": {
      const target = args[0]?.toLowerCase();
      if (!target) {
        out.push({ type: "output", text: "usage: cd <section>" });
      } else if (!navigation.some((n) => n.label === target)) {
        out.push({ type: "output", text: `cd: no such section: ${target}` });
      } else if (scrollToId(target)) {
        out.push({ type: "output", text: `→ ${target}` });
      } else {
        out.push({ type: "output", text: `${target}/ is coming soon` });
      }
      break;
    }
    default:
      out.push({ type: "output", text: `command not found: ${cmd} (try 'help')` });
  }

  return out;
}

export default function Footer() {
  const [value, setValue] = useState("");
  const [history, setHistory] = useState<Line[]>([]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    outputRef.current?.scrollTo({ top: outputRef.current.scrollHeight });
  }, [history]);

  const submit = () => {
    const trimmed = value.trim();
    if (!trimmed) return;

    if (trimmed.toLowerCase() === "clear") {
      setHistory([]);
    } else {
      setHistory((h) => [...h, ...runCommand(trimmed)]);
    }
    setCmdHistory((h) => [...h, trimmed]);
    setHistoryIndex(null);
    setValue("");
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const next = historyIndex === null ? cmdHistory.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(next);
      setValue(cmdHistory[next]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const next = historyIndex + 1;
      if (next >= cmdHistory.length) {
        setHistoryIndex(null);
        setValue("");
      } else {
        setHistoryIndex(next);
        setValue(cmdHistory[next]);
      }
    }
  };

  return (
    <footer id="contact" className="scroll-mt-6 border-t border-border bg-bg text-sm">
      {history.length > 0 && (
        <div
          ref={outputRef}
          className="max-h-32 overflow-y-auto border-b border-border px-6 py-2 font-mono text-xs"
        >
          {history.map((line, i) =>
            line.type === "input" ? (
              <p key={i} className="text-fg">
                <span className="text-accent">{profile.handle}</span>:~$ {line.text}
              </p>
            ) : (
              <p key={i} className="pl-4 text-muted">
                {line.text}
              </p>
            )
          )}
        </div>
      )}
      <div className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 px-6 py-3">
        <label className="flex min-w-[240px] flex-1 items-center gap-2">
          <span className="shrink-0 text-accent">{profile.handle}:~$</span>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            spellCheck={false}
            autoComplete="off"
            aria-label="Terminal command input"
            placeholder="type 'help'"
            className="flex-1 bg-transparent text-fg outline-none placeholder:text-muted/50 caret-accent"
          />
        </label>
        <p className="hidden italic text-muted sm:block">&quot;{profile.tagline}&quot;</p>
      </div>
    </footer>
  );
}
