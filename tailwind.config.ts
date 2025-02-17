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
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
				accent: "var(--accent)",
				"accent-muted": "var(--accent-muted)",
				muted: "var(--text-muted)",
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
					fontSize: "0.9375rem",
					lineHeight: "1.8",
					fontWeight: "450",
					marginBottom: "0.5rem",
				},
				".text-body-2": {
					fontFamily: "var(--font-sans-serif)",
					fontSize: "0.875rem",
					lineHeight: "1.7",
					fontWeight: "450",
					marginBottom: "0.5rem",
				},
				".text-label-1": {
					fontFamily: "var(--font-sans-serif)",
					fontSize: "0.875rem",
					lineHeight: "1.7",
					fontWeight: "500",
					marginBottom: "0.5rem",
				},
				".text-label-2": {
					fontFamily: "var(--font-sans-serif)",
					fontSize: "0.75rem",
					lineHeight: "1.7",
					fontWeight: "500",
					marginBottom: "0.5rem",
				},
				".text-heading-1": {
					fontFamily: "var(--font-serif)",
					fontSize: "1.25rem",
					lineHeight: "1.5",
					fontWeight: "500",
					marginBottom: "0.5rem",
				},
				".text-heading-2": {
					fontFamily: "var(--font-serif)",
					fontSize: "0.875rem",
					lineHeight: "1.3",
					fontWeight: "500",
					marginBottom: "0.5rem",
				},
			});
		},
	],
} satisfies Config;
