import { Inter, Source_Serif_4 } from "next/font/google";
import "./globals.css";
import ThemeWrapper from "@/components/theme-wrapper";
import { metadata } from "./metadata";

const sansSerif = Inter({
  variable: "--font-sans-serif",
  subsets: ["latin"],
});

const robotoSerif = Source_Serif_4({
  variable: "--font-serif",
  subsets: ["latin"],
});

export { metadata };

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={`${sansSerif.variable} ${robotoSerif.variable} antialiased min-h-screen isolate`}
      >
        <ThemeWrapper>{children}</ThemeWrapper>
      </body>
    </html>
  );
};

export default RootLayout;
