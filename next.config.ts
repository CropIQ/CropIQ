import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  crossOrigin: 'anonymous',
  allowedDevOrigins: ['10.254.7.226', 'localhost:3000'],
};

export default nextConfig;
