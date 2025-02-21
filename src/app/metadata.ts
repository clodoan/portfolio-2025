import type { Metadata } from "next";

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
