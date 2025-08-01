import { GridTileImage } from "@/components/grid/tile";
import type { Product } from "@pilab/pishop-client";
import Link from "next/link";

type ThreeItemGridProps = {
  item: Product;
  size: "full" | "half";
  priority?: boolean;
};

function ThreeItemGridItem({ item, size, priority }: ThreeItemGridProps) {
  return (
    <div
      className={
        size === "full"
          ? "md:col-span-4 md:row-span-2"
          : "md:col-span-2 md:row-span-1"
      }
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.handle}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.featuredImage.url}
          fill
          sizes={
            size === "full"
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          priority={priority}
          alt={item.title}
          label={{
            position: size === "full" ? "center" : "bottom",
            title: item.title as string,
            amount: item.priceRange?.maxVariantPrice?.amount.toString() || "0",
            currencyCode:
              item.priceRange?.maxVariantPrice?.currencyCode || "HUF",
          }}
        />
      </Link>
    </div>
  );
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: "hidden-homepage-featured-items",
  // });

  const homepageItems = [
    {
      id: "1",
      title: "Product 1",
      price: 100,
    },
    {
      id: "2",
      title: "Product 2",
      price: 200,
    },
    {
      id: "3",
      title: "Product 3",
      price: 300,
    },
  ] as Product[];

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null;

  const [firstProduct, secondProduct, thirdProduct] = homepageItems;

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  );
}
