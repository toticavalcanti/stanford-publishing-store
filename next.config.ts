import type { NextConfig } from "next";

/**
 * Book covers are loaded straight from the publisher's public website so the
 * prototype always shows the real catalogue. Every cover has a typographic
 * fallback (see components/BookCover.tsx) in case the remote image is blocked.
 */
const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "stanfordpublishing.com.mx" },
      { protocol: "https", hostname: "pruebas.stanfordpublishing.com.mx" },
    ],
  },
};

export default nextConfig;
