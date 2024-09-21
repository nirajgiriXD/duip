/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "_next",
  experimental: {
    serverComponentsExternalPackages: [
      "puppeteer-extra",
      "puppeteer-extra-plugin-stealth",
    ],
  },
};

export default nextConfig;
