"use client";

import { useEffect, useState } from "react";
import { profile } from "@/data/portfolio";

function formatDateTime(date: Date) {
  const parts = date
    .toLocaleString("en-US", {
      weekday: "short",
      month: "short",
      day: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    })
    .replace(",", "");
  return `[ ${parts} ]`;
}

export default function Header() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const interval = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="flex flex-wrap items-center justify-between gap-x-3 gap-y-1 border-b border-border px-6 py-3 text-sm">
      <div className="flex items-center gap-3">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </span>
        <span className="text-muted">
          {profile.handle}
          <span className="text-fg">:~</span>
        </span>
      </div>
      <div className="text-muted tabular-nums whitespace-nowrap text-xs sm:text-sm" suppressHydrationWarning>
        {formatDateTime(now)}
      </div>
    </header>
  );
}
