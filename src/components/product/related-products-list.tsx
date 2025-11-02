import { Product } from "@/payload-types";
import Link from "next/link";
import Image from "next/image";

interface RelatedProductsListProps {
  products: Product[];
}

export const RelatedProductsList = ({ products }: RelatedProductsListProps) => {
  if (!products || products.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
      <h2 className="mb-4 text-2xl font-bold">Related Items</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <Link
            key={product.id}
            href={`/product/${product.slug}`}
            className="block rounded-lg border border-neutral-200 bg-white p-4 dark:border-neutral-800 dark:bg-black"
          >
            {product.featuredImage && typeof product.featuredImage.url === 'string' && (
              <div className="relative h-40 w-full mb-2">
                <Image
                  src={product.featuredImage.url}
                  alt={product.featuredImage.alt || product.title}
                  fill
                  style={{ objectFit: "contain" }}
                />
              </div>
            )}
            <h3 className="text-lg font-medium">{product.title}</h3>
            <p className="text-sm text-neutral-500 dark:text-neutral-400">
              {product.description.substring(0, 100)}...
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
