import { withPayload } from "@payloadcms/next/withPayload";
import createMDX from "@next/mdx";

/** @type {import('next').NextConfig} */
let nextConfig = {
  output: "standalone",
  turbopack: {},
  images: {
    // loader: "custom",
    // loaderFile: "./lib/pishop/imageLoader.ts",
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        // protocol: "https",
        hostname: "*",
        // pathname: '/images/**'
        // port: '8081'
      },
    ],
  },
  experimental: {
    reactCompiler: false,
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
});

nextConfig = withMDX(nextConfig);
export default withPayload(nextConfig);
