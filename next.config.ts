import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root: this repo sits inside another project that has its
  // own lockfile, and Turbopack would otherwise infer the wrong root.
  turbopack: { root: __dirname },
};

export default nextConfig;
