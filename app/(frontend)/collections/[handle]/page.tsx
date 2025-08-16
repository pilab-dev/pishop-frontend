import { Metadata } from "next";
import { notFound } from "next/navigation";

// import NotFoundPage from "@/app/not-found";
import { FancyTitle } from "@/components/fancy-title";
import { BreadcrumbBar } from "@/components/products/breadcrumb-bar";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionDecor } from "@/components/ui/section-decor";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React from "react";
import NotFoundPage from "../../not-found";

import config from "@/payload.config";
import { getPayload } from "payload";

const getCollectionByHandle = async (handle: string) => {
  const payload = await getPayload({ config });

  const result = await payload.find({
    collection: "collections",
    where: {
      handle: handle,
    },
  });

  return result;
};

/**
 * Generate metadata for the collection page
 */
export async function generateMetadata(props: {
  params: Promise<{ handle: string }>;
}): Promise<Metadata> {
  const { handle } = await props.params;

  // const collection = await productsApi.getCollectionByHandle({ handle });

  const collection = await getCollectionByHandle(handle);

  if (!collection) return notFound();

  return {
    title: collection.seo?.title || collection.title,
    openGraph: {
      title: collection.seo?.title || collection.title,
      description:
        collection.seo?.description ||
        collection.description ||
        `${collection.title} products`,
    },
    twitter: {
      title: collection.seo?.title || collection.title,
      description:
        collection.seo?.description ||
        collection.description ||
        `${collection.title} products`,
    },
    // alternates: {
    //   canonical: `/collections/${collection.handle}`,
    // },
    description:
      collection.seo?.description ||
      collection.description ||
      `${collection.title} products`,
  };
}

type CollectionPageProps = {
  params: Promise<{
    handle: string;
  }>;
};

const isRejected = (
  input: PromiseSettledResult<unknown>,
): input is PromiseRejectedResult => input.status === "rejected";

function isFulfilled<E>(
  input: PromiseSettledResult<E>,
): input is PromiseFulfilledResult<E> {
  return input.status === "fulfilled";
}

const CollectionPageContent: React.FC<CollectionPageProps> = async ({
  params,
}) => {
  const { handle } = await params;

  // * Fetch the collection and products
  const collectionPromise = productsApi.getCollectionByHandle({
    handle,
  });

  // * Fetch the collection and products
  const productsPromise = productsApi.listCollectionProducts({
    handle,
  });

  // * Fetch the collection and products and wait for both to be resolved
  const res = await Promise.allSettled([collectionPromise, productsPromise]);

  try {
    if (res.some((r) => r.status === "rejected")) {
      const reason = res.find((r) => isRejected(r))?.reason;

      // eslint-disable-next-line no-console
      console.error(`Failed to fetch collection or products for: ${handle}`, {
        reason,
      });

      throw new Error(`Failed to fetch collection or products for: ` + handle, {
        cause: reason,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error(error);

    return notFound();
  }

  // Get the collection and products
  const [collection, products] = [
    isFulfilled(res[0]) ? res[0].value : null,
    isFulfilled(res[1]) ? res[1].value : null,
  ];

  // ! If there is no collection or products, return not found
  if (!collection || !products) {
    // eslint-disable-next-line no-console
    console.error("No collection or products found", {
      collection,
      products,
    });

    return notFound();
  }

  const gridProducts = products.map((product) => {
    return {
      id: product.id,
      name: product.title,
      description: product.description,
      price: product.priceRange?.minVariantPrice?.amount,
      imageUrl: product.featuredImage?.url,
      handle: product.handle,
      title: product.title,
      vendor: product.vendor,
      productType: product.productType,
      tags: product.tags,
      variants: product.variants,
    };
  });

  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: collection.title,
            href: `/collections/${collection.handle}`,
          },
        ]}
      />

      <div className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="max-w-[1280px]">
          <section className="max-w-[1280px] mx-auto px-5 py-5">
            <h2 className="flex items-center uppercase text-3xl font-bold">
              <SectionDecor />
              <FancyTitle>{collection.title}</FancyTitle>
            </h2>
          </section>

          <ProductGrid
            products={gridProducts as unknown as Product[]}
            variant="primary"
          />
        </div>
      </div>
    </>
  );
};

export default function CollectionPage(props: CollectionPageProps) {
  return (
    <ErrorBoundary errorComponent={NotFoundPage}>
      <CollectionPageContent {...props} />
    </ErrorBoundary>
  );
}
