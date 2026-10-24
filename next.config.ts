import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    dangerouslyAllowLocalIP: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dymahf3hvno6sbkb.public.blob.vercel-storage.com",
      },
    ],
  },
};

export default nextConfig;
