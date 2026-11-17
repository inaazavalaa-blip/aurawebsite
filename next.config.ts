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
          source: "/:path((?!en(?:/|$)|es(?:/|$)|admin(?:/|$)|area(?:/|$)|pago(?:/|$)|_next/|api/|.*\\..*).+)",
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
      // Secciones de la estructura anterior: llevan a su reemplazo para que ningún enlace se rompa.
      { source: "/:cat(mujer|hombre)/:viejo(transformacion|vitrina)", destination: "/:cat/metodo", permanent: true },
      { source: "/:cat(mujer|hombre)/maison", destination: "/:cat/esencia", permanent: true },
      { source: "/:cat(mujer|hombre)/reserva", destination: "/:cat/contratar", permanent: true },
      { source: "/en/:cat(women|men)/:viejo(transformation|showcase)", destination: "/en/:cat/method", permanent: true },
      { source: "/en/:cat(women|men)/maison", destination: "/en/:cat/essence", permanent: true },
      { source: "/en/:cat(women|men)/booking", destination: "/en/:cat/book", permanent: true },
    ];
  },
};

export default nextConfig;
