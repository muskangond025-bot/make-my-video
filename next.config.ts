import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  transpilePackages: ["@swc/helpers"],
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
