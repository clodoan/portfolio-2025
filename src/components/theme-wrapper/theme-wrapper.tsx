"use client";

import { ThemeProvider } from "next-themes";
import ThemeToggle from "../theme-toggle";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ThemeToggle className="absolute top-5 right-5" />
      {children}
    </ThemeProvider>
  );
}
