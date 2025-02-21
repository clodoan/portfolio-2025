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
  icons: {
    icon: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>✨</text></svg>",
        type: "image/svg+xml",
      },
    ],
  },
  openGraph: {
    title: "Claudio Angrigiani",
    description: "Design Engineer",
    images: [
      {
        url: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630' width='1200' height='630'><rect width='1200' height='630' fill='#f4f1ea'/><text x='50%' y='50%' text-anchor='middle' font-family='system-ui' font-size='48' fill='#2c2c2c'>Claudio Angrigiani's site</text></svg>",
        width: 1200,
        height: 630,
        alt: "Claudio Angrigiani's site",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Claudio Angrigiani",
    description: "Design Engineer",
    images: [
      "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1200 630' width='1200' height='630'><rect width='1200' height='630' fill='#f4f1ea'/><text x='50%' y='50%' text-anchor='middle' font-family='system-ui' font-size='48' fill='#2c2c2c'>Claudio Angrigiani's site</text></svg>",
    ],
  },
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
