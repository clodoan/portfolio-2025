import type { Metadata } from "next";
import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";
import { ThemeProvider } from "next-themes";

const sansSerif = Inter({
	variable: "--font-sans-serif",
	subsets: ["latin"],
});

const robotoSerif = Source_Serif_4({
	variable: "--font-serif",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Claudio",
	description: "Design Engineer",
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
	return (
		<html lang="en">
			<body
				className={`${sansSerif.variable} ${robotoSerif.variable} antialiased`}
			>
				<ThemeProvider attribute="class" defaultTheme="light">
					<ThemeToggle className="absolute size-5 top-6 right-6" />
					{children}
				</ThemeProvider>
			</body>
		</html>
	);
};

export default RootLayout;
