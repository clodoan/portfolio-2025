"use client";

import * as RadixToggle from "@radix-ui/react-toggle";
import { cx } from "class-variance-authority";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ThemeToggleProps {
  className?: string;
}

const ThemeToggle = ({ className = "" }: ThemeToggleProps) => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (typeof window === "undefined" || !mounted) return null;

  const handlePressedChange = (pressed: boolean) => {
    setTheme(pressed ? "light" : "dark");
  };

  return (
    <RadixToggle.Root
      type="button"
      className={cx(
        "transition-opacity hover:opacity-75 z-50 touch-manipulation size-5 rounded-full overflow-hidden",
        className
      )}
      onPressedChange={handlePressedChange}
      pressed={theme === "light"}
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
        <defs>
          <mask id="moon-mask">
            <circle cx="12" cy="12" r="12" fill="white" />
            <circle
              cx="12"
              cy="12"
              r="8"
              fill="black"
              className="transform-origin-[12px_12px]"
              style={{
                transform:
                  theme === "dark"
                    ? "translate(4px, -4px) scale(1.2)"
                    : "translate(0, 0)",
                transition: "transform 0.2s ease-in-out",
              }}
            />
          </mask>
        </defs>
        <circle
          cx="12"
          cy="12"
          r="12"
          fill="var(--text-primary)"
          mask="url(#moon-mask)"
        />
      </svg>
    </RadixToggle.Root>
  );
};

export default ThemeToggle;
