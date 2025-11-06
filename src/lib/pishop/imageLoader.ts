type ImageLoaderProps = {
  src: string;
  width: number;
  height?: number;
  quality?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || '';
const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN_NAME || '';

/**
 * Custom image loader for PiShop that proxies images through our Go image service
 * for optimization, resizing, and format conversion.
 */
export default function PishopImageLoader({
  src,
  width,
  height,
  quality = 75,
}: ImageLoaderProps): string {
  // Ensure we have required environment variables
  if (!API_BASE) {
    throw new Error('NEXT_PUBLIC_API_BASE environment variable is required');
  }

  // Handle relative URLs by prepending the domain
  const imageUrl = src.startsWith('http') ? src : `https://${DOMAIN}${src}`;

  // Build query parameters
  const params = new URLSearchParams({
    url: imageUrl,
    w: width.toString(),
    q: quality.toString(),
  });

  // Add height if specified (for aspect ratio control)
  if (height) {
    params.set('h', height.toString());
  }

  return `${API_BASE}/image?${params.toString()}`;
}
