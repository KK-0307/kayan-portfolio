import type { NextConfig } from "next";

// For GitHub Pages project sites (https://<user>.github.io/<repo>/), the app
// needs to be served from a sub-path. Set NEXT_PUBLIC_BASE_PATH="/<repo>" at
// build time (the included GitHub Actions workflow does this automatically).
// Leave it unset for local dev or for a user/org root page (<user>.github.io).
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
