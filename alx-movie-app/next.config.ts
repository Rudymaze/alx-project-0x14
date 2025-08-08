import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["m.media-amazon.com", "images.unsplash.com", "image.tmdb.org"],
  },
};
export default nextConfig;
