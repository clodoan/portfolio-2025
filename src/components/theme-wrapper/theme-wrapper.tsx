"use client";

import { ThemeProvider } from "next-themes";
import { useEffect, useState } from "react";
import ThemeToggle from "../theme-toggle";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      <ThemeToggle className="absolute top-5 right-5" />
      {children}
    </ThemeProvider>
  );
}
