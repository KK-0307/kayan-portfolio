"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import NavModals from "./NavModals";

export type NavModalKey = "experience" | "teaching" | "contact";

const NavModalContext = createContext<{ open: (key: NavModalKey) => void } | null>(null);

export function NavModalProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<NavModalKey | null>(null);

  return (
    <NavModalContext.Provider value={{ open: setActive }}>
      {children}
      <NavModals active={active} onClose={() => setActive(null)} />
    </NavModalContext.Provider>
  );
}

export function useNavModal() {
  const ctx = useContext(NavModalContext);
  if (!ctx) throw new Error("useNavModal must be used within NavModalProvider");
  return ctx;
}
