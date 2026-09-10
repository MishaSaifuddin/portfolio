/** @type {import('next').NextConfig} */
const isGitHubPages =
  process.env.GITHUB_ACTIONS === "true" ||
  process.env.NEXT_PUBLIC_BASE_PATH !== undefined;

const nextConfig = {
  output: "export",
  images: { unoptimized: true },
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
  assetPrefix: process.env.NEXT_PUBLIC_BASE_PATH || "",
};

module.exports = nextConfig;