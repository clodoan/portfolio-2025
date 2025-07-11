import type { Config } from "tailwindcss";
import tailwindcssMotion from "tailwindcss-motion";
import type { PluginAPI } from "tailwindcss/types/config";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        primary: "var(--text-primary)",
        secondary: "var(--text-secondary)",
        tertiary: "var(--text-tertiary)",
        accent: "var(--accent)",
        "accent-muted": "var(--accent-muted)",
      },
      backgroundColor: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
        tertiary: "var(--background-tertiary)",
        quaternary: "var(--background-quaternary)",
        overlay: "var(--background-overlay)",
        accent: "var(--background-accent)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
        tertiary: "var(--border-tertiary)",
      },
      outlineColor: {
        primary: "var(--outline-primary)",
        tertiary: "var(--outline-tertiary)",
      },
      maxWidth: {
        "container-mobile": "var(--mobile-container-max-width)",
        "container-desktop": "var(--desktop-container-max-width)",
        "container-desktop-wide": "var(--desktop-container-max-width-wide)",
      },
      fontFamily: {
        sans: ["var(--font-sans-serif)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)"],
      },
      keyframes: {
        shimmer: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s infinite",
      },
    },
  },
  plugins: [
    tailwindcssMotion,
    ({ addUtilities }: PluginAPI) => {
      addUtilities({
        ".text-body-1": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.75",
          fontWeight: "450",
        },
        ".text-body-2": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.75",
          fontWeight: "450",
        },
        ".text-body-3": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.625rem",
          lineHeight: "1.75",
          fontWeight: "450",
        },
        ".text-label-1": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.75",
          fontWeight: "500",
        },
        ".text-label-2": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.75",
          fontWeight: "500",
        },
        ".text-label-3": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.625rem",
          lineHeight: "1.75",
          fontWeight: "500",
        },
        ".text-heading-1": {
          fontFamily: "var(--font-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.6",
          fontWeight: "400",
        },
        ".text-heading-2": {
          fontFamily: "var(--font-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.6",
          fontWeight: "400",
        },
        ".text-heading-3": {
          fontFamily: "var(--font-serif)",
          fontSize: "0.625rem",
          lineHeight: "1.6",
          fontWeight: "400",
        },
      });
    },
  ],
} satisfies Config;
