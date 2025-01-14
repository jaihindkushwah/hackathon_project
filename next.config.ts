import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // domains: [
    //   "lh3.googleusercontent.com",
    //   "static.vecteezy.com",

    // ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cse.noticebard.com",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
      {
        protocol: "https",
        hostname: "static.vecteezy.com",
      },
    ],
  },
};

export default nextConfig;
