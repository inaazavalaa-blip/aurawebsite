import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "upload.wikimedia.org" },
    ],
  },
  // Las rutas viven en app/[lang]. El español se sirve sin prefijo y el inglés bajo /en.
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", destination: "/es" },
        {
          source: "/:path((?!en(?:/|$)|es(?:/|$)|_next/|api/|.*\\..*).+)",
          destination: "/es/:path",
        },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  // Evita URLs duplicadas: /es/... siempre redirige a la versión sin prefijo.
  async redirects() {
    return [
      { source: "/es", destination: "/", permanent: true },
      { source: "/es/:path*", destination: "/:path*", permanent: true },
    ];
  },
};

export default nextConfig;
