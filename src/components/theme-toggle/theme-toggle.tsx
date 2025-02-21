"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

export default function ThemeToggle({ className = "" }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === "undefined" || !mounted) return null;

  return (
    <button
      type="button"
      className={`transition-opacity hover:opacity-75 ${className}`}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      aria-label="Toggle theme"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
        viewBox="0 0 24 24"
        fill="currentColor"
        strokeWidth="0"
        aria-label={
          theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        }
        role="img"
        className="w-full h-full"
      >
        <circle cx="12" cy="12" r="12" fill="currentColor" />
        <circle
          cx="12"
          cy="12"
          r="8"
          fill="var(--background)"
          transform-origin="12 12"
          style={{
            transform:
              theme === "dark"
                ? "translate(6px, -2px) scale(1.2)"
                : "translate(0, 0)",
            transition: "transform 0.3s ease-in-out",
          }}
        />
      </svg>
    </button>
  );
}
