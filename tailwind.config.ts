import type { Config } from "tailwindcss";
import type { PluginAPI } from "tailwindcss/types/config";

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
				sans: ["var(--font-sans-serif)"],
				serif: ["var(--font-serif)"],
			},
		},
	},
	plugins: [
		({ addUtilities }: PluginAPI) => {
			addUtilities({
				".body-1": {
					fontSize: "1rem",
					lineHeight: "1.7",
					fontWeight: "450",
				},
				".body-2": {
					fontSize: "0.875rem",
					lineHeight: "1.7",
					fontWeight: "450",
				},
				".label-1": {
					fontSize: "1rem",
					lineHeight: "1.7",
					fontWeight: "500",
				},
				".label-2": {
					fontSize: "0.875rem",
					lineHeight: "1.7",
					fontWeight: "500",
				},
			});
		},
	],
} satisfies Config;
