type ImageLoaderProps = {
  src: string;
  width: number;
  height: number;
  quality?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
const domain = process.env.NEXT_PUBLIC_DOMAIN_NAME;

export default function PishopImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  if (!src.startsWith("http")) {
    return `${API_BASE}/image?url=https://${domain}${src}&w=${width}&q=${quality || 75}`;
  }

  return `${API_BASE}/image?url=${src}&w=${width}&q=${quality || 75}`;
}
