import { Metadata } from "next";
import { notFound } from "next/navigation";

// import NotFoundPage from "@/app/not-found";
import { FancyTitle } from "@/components/fancy-title";
import { BreadcrumbBar } from "@/components/products/breadcrumb-bar";
import { ProductGrid } from "@/components/products/product-grid";
import { SectionDecor } from "@/components/ui/section-decor";
import { ErrorBoundary } from "next/dist/client/components/error-boundary";
import React, { cache } from "react";
import NotFoundPage from "../../not-found";

import config from "@/payload.config";
import { getPayload } from "payload";

import { Collection, Product } from "@/payload-types";

const getCollectionBySlug = cache(
  async (
    slug: string,
  ): Promise<{ collection: Collection; products: Product[] }> => {
    const payload = await getPayload({ config });

    const collectionResult = await payload.find({
      collection: "collections",
      where: {
        slug: {
          equals: slug,
        },
      },
      limit: 1,
      depth: 1,
    });

    if (!collectionResult.docs.length) {
      notFound();
    }

    const collection = collectionResult.docs[0];

    const productsResult = await payload.find({
      collection: "products",
      where: {
        "collection.slug": {
          equals: slug,
        },
      },
      depth: 2,
    });

    return {
      collection,
      products: productsResult.docs,
    };
  },
);

/**
 * Generate metadata for the collection page
 */
export async function generateMetadata(props: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const params = await props.params;
  const slug = params.slug as string;

  const { collection } = await getCollectionBySlug(slug);

  if (!collection) return notFound();

  return {
    title: collection.title,
    description: collection.title,
    openGraph: {
      title: collection.title,
      description: `${collection.title} products`,
    },
    twitter: {
      title: collection.title,
      description: `${collection.title} products`,
    },
    alternates: {
      canonical: `/collections/${collection.slug}`,
    },
  };
}

type CollectionPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const CollectionPageContent: React.FC<CollectionPageProps> = async ({
  params,
}) => {
  const { slug } = await params;

  const { collection, products } = await getCollectionBySlug(slug);

  return (
    <>
      <BreadcrumbBar
        segments={[
          {
            name: collection.title,
            href: `/collections/${collection.slug}`,
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

          <ProductGrid products={products} variant="primary" />
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
