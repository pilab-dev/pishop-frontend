import { withPayload } from '@payloadcms/next/withPayload'
import withBundleAnalyzer from '@next/bundle-analyzer'

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  // Next.js 16 experimental features for better performance
  experimental: {
    // Optimize package imports
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    // Optimize CSS
    optimizeCss: true,
  },
  // Webpack optimizations for better bundle splitting
  webpack: (config, { dev, isServer }) => {
    // Optimize bundle splitting
    if (!dev && !isServer) {
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
            priority: 10,
          },
          radix: {
            test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
            name: 'radix-ui',
            chunks: 'all',
            priority: 20,
          },
          payload: {
            test: /[\\/]node_modules[\\/]@payloadcms[\\/]/,
            name: 'payload',
            chunks: 'all',
            priority: 20,
          },
        },
      }
    }

    return config
  },
  // Memory optimizations for development
  onDemandEntries: {
    // Period (in ms) where the server will keep pages in the buffer
    maxInactiveAge: 25 * 1000,
    // Number of pages that should be kept simultaneously without being disposed
    pagesBufferLength: 2,
  },
  turbopack: {

  },
  images: {
    loader: "custom",
    loaderFile: "./src/lib/pishop/imageLoader.ts",
    formats: ['image/avif', 'image/webp'],
    // Enable image optimization for better performance
    unoptimized: false,
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

export default bundleAnalyzer(withPayload(nextConfig))
