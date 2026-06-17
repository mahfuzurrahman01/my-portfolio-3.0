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
      className="fixed top-4 right-4 inline-flex h-10 w-10 items-center justify-center rounded-full border border-black/10 bg-white/70 text-foreground backdrop-blur transition hover:bg-white dark:border-white/10 dark:bg-black/40 dark:hover:bg-black/60"
    >
      {isDarkMode ? <Sun /> : <Moon />}
    </button>
  );
}
