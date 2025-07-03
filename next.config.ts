import type NextConfig from "next";

const nextConfig: NextConfig = {
  // Video optimization
  experimental: {
    optimizePackageImports: ["@heroicons/react"],
  },

  // Headers for better video caching and compression
  async headers() {
    return [
      {
        source: "/footprint/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
          {
            key: "Accept-Encoding",
            value: "gzip, deflate, br",
          },
        ],
      },
    ];
  },

  // Image optimization
  images: {
    formats: ["image/webp", "image/avif"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
};

export default nextConfig;
