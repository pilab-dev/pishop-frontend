/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    loader: "custom",
    loaderFile: "./lib/pishop/imageLoader.ts",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*",
        // pathname: '/images/**'
        // port: '8081'
      },
    ],
  },
};

module.exports = nextConfig;
