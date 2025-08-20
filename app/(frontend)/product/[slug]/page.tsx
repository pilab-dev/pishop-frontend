import type { Metadata } from "next";

import { getCart } from "@/components/cart/actions";
import { Cart, CartProvider } from "@/components/cart/cart-context";
import { ProductProvider } from "@/components/product/product-context";
import { cookies } from "next/headers";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Product as SchemaProduct, WithContext } from "schema-dts";
import { BaseProduct } from "./base-product";

const baseUrl = process.env.SITE_BASE_URL;

import { GridTileImage } from "@/components/grid/tile";
import { getProductBySlug } from "@/lib/client";
import { HIDDEN_PRODUCT_TAG } from "@/lib/constants";
import { Product } from "@/payload-types";
import config from "@/payload.config";
import { getPayload } from "payload";

const getProductRecommendations = async (id: string): Promise<Product[]> => {
  const payload = await getPayload({ config });
  const product = await payload.findByID({
    collection: "products",
    id,
    depth: 2,
  });

  const relatedProducts = product?.relatedProducts as Product[];

  return relatedProducts || [];
};

const getProduct = async (slug: string): Promise<Product> => {
  const product = await getProductBySlug(slug);
  if (!product) {
    throw new Error(`product with slug: [${slug}] not found`);
  }

  return product;
};

export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;

  const product = await getProduct(params.slug);

  if (!product) return notFound();

  // const { url, width, height, altText: alt } = product.featuredImage || {};
  const indexable = !product.tags?.includes(HIDDEN_PRODUCT_TAG);

  const ogImage = {
    url: `${baseUrl}/product/${product.slug}/opengraph-image`, // product.url,
    width: 1200,
    height: 630,
    alt: product.meta?.title || product.title,
  };

  return {
    title: product.meta?.title || product.title,
    description: product.meta?.description || product.description,
    alternates: {
      canonical: `${baseUrl}/product/${product.slug}`,
    },
    robots: {
      index: indexable,
      follow: indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
      },
    },
    openGraph: {
      images: [ogImage],
      description: product.meta?.description || product.description,
    },
    other: {
      "og:site_name": "PiShop",
      "og:type": "product",
      "product:brand": "Pilab",
      "product:product_link": `${baseUrl}/${product.slug}`,
      "product:price": product.priceRange?.maxVariantPrice.amount || 0,
      "product:plural_title": product.title,
    },
  };
}

export default async function ProductPage(props: {
  params: Promise<{ slug: string }>;
}) {
  const cartId = (await cookies()).get("cartId")?.value;

  const cartPromise = cartId
    ? getCart(cartId).then((cart) => {
        const result: Cart = {
          id: cart.id!,
          checkoutUrl: cart.checkoutUrl!,
          totalQuantity: cart.totalQuantity!,
          lines: cart.lines!,
          cost: {
            subtotalAmount: {
              amount: "0",
              currencyCode: "HUF",
            },
            totalAmount: {
              amount: "0",
              currencyCode: "HUF",
            },
            totalTaxAmount: {
              amount: "0",
              currencyCode: "HUF",
            },
          },
        };

        return result;
      })
    : Promise.resolve(undefined);

  const params = await props.params;

  const product = await getProductBySlug(params.slug);

  if (!product) return notFound();

  const productJsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: product.description,
    // image: product.featuredImage.url,
    url: `https://shop.pilab.hu/product/${product.slug}`,
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating || 0.0,
      ratingCount: product.ratingCount || 0,
    },
    offers: [
      {
        "@type": "AggregateOffer",
        availability:
          product.availability?.status === "InStock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        priceCurrency: product.priceRange?.minVariantPrice.currencyCode,
        highPrice: product.priceRange?.maxVariantPrice.amount,
        lowPrice: product.priceRange?.minVariantPrice.amount,
        offerCount: product.variants?.length || 1,
      },
      {
        "@type": "Offer",
        availability:
          product.availability?.status === "InStock"
            ? "https://schema.org/InStock"
            : "https://schema.org/OutOfStock",
        name: product.title,
        priceCurrency: product.priceRange?.minVariantPrice.currencyCode,
        price: product.priceRange?.minVariantPrice.amount,
        url: `https://shop.pilab.hu/product/${product.slug}`,
        priceValidUntil: "2025-12-31",
      },
    ],
    brand: {
      "@type": "Brand",
      name: "Pilab",
    },
    sku: product.id,
    review: {
      "@type": "Review",
      author: "Pilab",
      reviewRating: {
        "@type": "Rating",
        ratingValue: product.rating || 9.5,
        bestRating: 10,
        worstRating: 0,
      },
    },
  } satisfies WithContext<SchemaProduct>;

  return (
    <ProductProvider>
      <CartProvider cartPromise={cartPromise}>
        <>
          <script
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(productJsonLd),
            }}
            type="application/ld+json"
          />
          <div className="mx-auto max-w-screen-2xl px-4">
            <BaseProduct product={product} />

            <div className="py-8">
              <h2 className="mb-4 text-2xl font-bold">Specifikáció</h2>
              <div className="prose dark:prose-invert">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  {product.options &&
                    Object.keys(product.options).map((optName: string) => (
                      <div key={optName}>
                        <p className="mb-2 font-semibold">{optName}</p>
                        <ul className="list-disc pl-4">
                          <li key={`${optName}-value`}>
                            {
                              product.options?.find(
                                (opt) => opt.name === optName,
                              )?.value
                            }
                          </li>
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            <RelatedProducts id={product.id} />
          </div>
          {/* <Footer /> */}
        </>
      </CartProvider>
    </ProductProvider>
  );
}

async function RelatedProducts({ id }: { id: string }) {
  const relatedProducts = await getProductRecommendations(id);

  if (!relatedProducts.length) return null;

  return (
    <div className="py-8">
      <h2 className="mb-4 text-2xl font-bold">Related Products</h2>
      <ul className="flex w-full gap-4 overflow-x-auto pt-1">
        {relatedProducts.map((product) => (
          <li
            key={product.slug}
            className="aspect-square w-full flex-none min-[475px]:w-12 sm:w-1/3 md:w-1/4 lg:w-1/5"
          >
            <Link
              className="relative h-full w-full"
              href={`/product/${product.slug}`}
              prefetch={true}
            >
              <GridTileImage
                alt={product.title}
                label={{
                  title: product.title,
                  amount: product.priceRange?.maxVariantPrice.amount || 0,
                  currencyCode:
                    product.priceRange?.maxVariantPrice.currencyCode || "HUF",
                }}
                src={
                  typeof product.featuredImage?.url === "object"
                    ? product.featuredImage?.url.url
                    : product.featuredImage?.url
                }
                fill
                sizes="(min-width: 1024px) 20vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, (min-width: 475px) 50vw, 100vw"
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
