import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Next.js 16 experimental features for better performance
  reactCompiler: true,
  experimental: {
    // Optimize package imports
    optimizePackageImports: [
      // 'react-icons',
      // 'react-icons/si',
      // 'react-icons/fa',
      // 'react-icons/tfi',
      // 'lucide-react',
      // '@radix-ui/react-icons',
      '@opentelemetry/api',
      // 'framer-motion',
      // 'date-fns',
    ],
    // Optimize CSS
    optimizeCss: true,
    turbopackFileSystemCacheForDev: true,
  },
  turbopack: {
    // Example: adding an alias and custom file extension
    resolveAlias: {
      underscore: 'lodash',
    },
    resolveExtensions: ['.mdx', '.tsx', '.ts', '.jsx', '.js', '.json'],
  },
  // Memory optimizations for development
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 60 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 5,
  },
  images: {
    // loader: "default",
    formats: ['image/avif', 'image/webp'],
    // Enable image optimization for better performance
    unoptimized: true,
    remotePatterns: [
      {
        // protocol: "https",
        hostname: '*',
        // pathname: '/images/**'
        // port: '8081'
      },
    ],
  },
  serverExternalPackages: [
    'thread-stream',
    'pino',
  ],
}

export default bundleAnalyzer(withPayload(nextConfig))
