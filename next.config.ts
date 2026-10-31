import type { NextConfig } from "next";
import withBundleAnalyzer from "@next/bundle-analyzer";

// Configurable basePath and assetPrefix via NEXT_PUBLIC_BASE_PATH
// Populated in CI (.github/workflows/deploy.yml) as '/portfolio' for GitHub Pages
const basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const nextConfig: NextConfig = {
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

const analyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

export default analyzer(nextConfig);
