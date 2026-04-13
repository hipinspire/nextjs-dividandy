import type { NextConfig } from "next";

const strapiUrl = process.env.STRAPI_URL ?? process.env.NEXT_PUBLIC_STRAPI_URL ?? "";
const isLocalStrapi =
  strapiUrl.includes("localhost:1337") || strapiUrl.includes("127.0.0.1:1337");

const nextConfig: NextConfig = {
  images: {
    // Next's image optimizer blocks private IP upstreams (SSRF protection).
    // For local Strapi development, serve images unoptimized.
    unoptimized: isLocalStrapi,
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "1337",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.strapiapp.com",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "**.media.strapiapp.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
