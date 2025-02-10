import type { Config } from "tailwindcss";

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
				"text-muted": "var(--text-muted)",
				"text-accent": "var(--text-accent)",
				"text-accent-muted": "var(--text-accent-muted)",
			},
			fontFamily: {
				sans: ["var(--font-sans-serif)"],
				serif: ["var(--font-serif)"],
			},
			fontSize: {
				"body-1": [
					"1rem",
					{
						lineHeight: "1.7",
						fontWeight: "450",
					},
				],
				"body-2": [
					"0.875rem",
					{
						lineHeight: "1.7",
						fontWeight: "450",
					},
				],
				"label-1": [
					"1rem",
					{
						lineHeight: "1.7",
						fontWeight: "500",
					},
				],
				"label-2": [
					"0.875rem",
					{
						lineHeight: "1.7",
						fontWeight: "500",
					},
				],
			},
		},
	},
	plugins: [],
} satisfies Config;
