import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // turbopack: {}, // Disabled due to Turbopack bug in Next.js 16
  images: {
    // loader: "custom",
    // loaderFile: "./src/lib/pishop/imageLoader.ts",
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        // protocol: "https",
        hostname: '*',
        // pathname: '/images/**'
        // port: '8081'
      },
    ],
  },
  experimental: {
    turbopackMinify: false  
  },
}

export default withPayload(nextConfig)
