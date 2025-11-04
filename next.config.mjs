import { withPayload } from '@payloadcms/next/withPayload'

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  turbopack: {
  },
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
}

export default withPayload(nextConfig)
