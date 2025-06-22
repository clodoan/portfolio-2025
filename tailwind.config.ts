import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";
import tailwindcssMotion from "tailwindcss-motion";

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
      },
      backgroundColor: {
        primary: "var(--background-primary)",
        secondary: "var(--background-secondary)",
        tertiary: "var(--background-tertiary)",
      },
      borderColor: {
        primary: "var(--border-primary)",
        secondary: "var(--border-secondary)",
        tertiary: "var(--border-tertiary)",
      },
      fontFamily: {
        sans: ["var(--font-sans-serif)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)"],
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
          lineHeight: "1.8",
          fontWeight: "450",
          marginBottom: "0.5rem",
        },
        ".text-body-2": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.8",
          fontWeight: "450",
          marginBottom: "0.5rem",
        },
        ".text-body-3": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.625rem",
          lineHeight: "1.8",
          fontWeight: "450",
          marginBottom: "0.5rem",
        },
        ".text-label-1": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.8",
          fontWeight: "500",
          marginBottom: "0.5rem",
        },
        ".text-label-2": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.8",
          fontWeight: "500",
          marginBottom: "0.5rem",
        },
        ".text-label-3": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.625rem",
          lineHeight: "1.8",
          fontWeight: "500",
          marginBottom: "0.5rem",
        },
        ".text-heading-1": {
          fontFamily: "var(--font-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.8",
          fontWeight: "400",
          marginBottom: "0.5rem",
        },
        ".text-heading-2": {
          fontFamily: "var(--font-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.8",
          fontWeight: "400",
          marginBottom: "0.5rem",
        },
        ".text-heading-3": {
          fontFamily: "var(--font-serif)",
          fontSize: "0.625rem",
          lineHeight: "1.8",
          fontWeight: "400",
          marginBottom: "0.5rem",
        },

        ".text-rivet-label-1": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "1rem",
          lineHeight: "1.5",
          fontWeight: "550",
        },
        ".text-rivet-label-2": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          fontWeight: "550",
        },
        ".text-rivet-label-3": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.5",
          fontWeight: "550",
        },
        ".text-rivet-body-1": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "1rem",
          lineHeight: "1.5",
          fontWeight: "400",
        },
        ".text-rivet-body-2": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.875rem",
          lineHeight: "1.5",
          fontWeight: "400",
        },
        ".text-rivet-body-3": {
          fontFamily: "var(--font-sans-serif)",
          fontSize: "0.75rem",
          lineHeight: "1.5",
          fontWeight: "400",
        },
      });
    },
  ],
} satisfies Config;
