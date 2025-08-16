import Image from "next/image";
import { ImageResponse } from "next/og";

import LogoIcon from "@/components/icons/logo";
import { productsApi } from "@/lib/client";

const getProduct = async (handle: string) => {
  const product = await productsApi.getProductByHandle({
    handle,
  });

  return product;
};

export const runtime = "edge";

const ProductImage = async (props: { params: Promise<{ handle: string }> }) => {
  const params = await props.params;
  const product = await getProduct(params.handle);

  if (!product) {
    // Handle cases where the product is not found.  Return a default image or error.
    return new ImageResponse(
      (
        <div tw="flex h-full w-full items-center justify-center bg-gray-200">
          <p tw="text-4xl text-gray-500">Product Not Found</p>
        </div>
      ),
      { width: 1200, height: 630 },
    );
  }

  const price = product?.priceRange?.maxVariantPrice?.amount || 0; // || 'Price Unavailable'; // Handle missing price

  function formatCurrencyWithSymbol(
    amount: number,
    currencyCode = "USD",
    locale = "en-US",
  ) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currencyCode,
    }).format(amount);
  }

  const formattedPrice = formatCurrencyWithSymbol(
    +price,
    product.priceRange?.maxVariantPrice.currencyCode || "HUF",
  );

  return new ImageResponse(
    (
      <div tw="flex h-full w-full bg-white relative">
        {" "}
        {/* Removed black bg, positioned elements absolutely */}
        {/* Product Image */}
        <div tw="absolute flex inset-0 w-full h-full">
          {" "}
          {/* Cover the entire background */}
          <Image
            alt={product?.title}
            height={630}
            src={product?.featuredImage?.url || ""}
            tw="object-cover w-full h-full" // Ensure image covers the div
            width={1200}
          />
          <div tw="absolute inset-0 bg-black/20" />{" "}
          {/* Subtle overlay for readability */}
        </div>
        {/* Content Container (Logo, Text, Price) */}
        <div tw="absolute bg-black/50 bottom-0 left-0 right-0 p-8 flex flex-col justify-end">
          <p tw="text-5xl font-bold text-white mb-2 text-shadow:_0_4px_8px_rgba(255,0,0,0.6)">
            {product?.title}
          </p>
          <p tw="text-4xl font-semibold text-white">{formattedPrice}</p>

          <div tw="absolute right-10 bottom-20 flex items-center mb-4">
            <LogoIcon fill="white" height="58" width="64" />
          </div>
        </div>
        {/* Watermark (Example - replace with your actual watermark) */}
        <div tw="absolute bottom-4 right-4 text-white/50 text-xl font-medium">
          PiShop
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        {
          name: "Inter",
          data: await fetch(
            new URL("../../../../fonts/Inter-Bold.ttf", import.meta.url),
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 700,
        },
        {
          // Add another font for price if needed
          name: "Inter",
          data: await fetch(
            new URL("../../../../fonts/Inter-Regular.ttf", import.meta.url),
          ).then((res) => res.arrayBuffer()),
          style: "normal",
          weight: 400,
        },
      ],
    },
  );
};

export default ProductImage;
