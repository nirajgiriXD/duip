/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverComponentsExternalPackages: [
      "node-llama-cpp",
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
    ],
  },
};

export default nextConfig;
