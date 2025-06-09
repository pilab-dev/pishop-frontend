type ImageLoaderProps = {
  src: string;
  width: number;
  height: number;
  quality?: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export default function PiImageLoader({
  src,
  width,
  quality,
}: ImageLoaderProps) {
  return `${API_BASE}/api/image?url=${src}&w=${width}&q=${quality || 75}`;
}
