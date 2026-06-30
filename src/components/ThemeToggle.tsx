"use client";

import { useModeAnimation } from "react-theme-switch-animation";
import { Moon, Sun } from "./icons";

export default function ThemeToggle() {
  const { ref, toggleSwitchTheme, isDarkMode } = useModeAnimation();

  return (
    <button
      ref={ref}
      onClick={toggleSwitchTheme}
      aria-label="Toggle theme"
      className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-foreground/10 bg-background/80 text-foreground shadow-sm backdrop-blur-md transition hover:bg-foreground/[0.06]"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
