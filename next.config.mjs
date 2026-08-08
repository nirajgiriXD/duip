/** @type {import('next').NextConfig} */
const nextConfig = {
  // Native/heavy modules that must stay outside the bundler and be required at
  // runtime from node_modules on the server.
  serverExternalPackages: [
    "node-llama-cpp",
    "puppeteer",
    "puppeteer-extra",
    "puppeteer-extra-plugin-stealth",
  ],
};

export default nextConfig;
