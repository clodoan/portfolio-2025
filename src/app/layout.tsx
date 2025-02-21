"use client";

import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import ThemeToggle from "@/components/theme-toggle";
import { ThemeProvider } from "next-themes";
import Head from "next/head";

const sansSerif = Inter({
  variable: "--font-sans-serif",
  subsets: ["latin"],
});

const robotoSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
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
