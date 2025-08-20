import { RenderBlocks } from "@/blocks/RenderBlocks";
import { LivePreviewListener } from "@/components/LivePreviewListener";
import type { Page } from "@/payload-types";
import config from "@payload-config";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPayload } from "payload";
import { cache } from "react";

const payload = await getPayload({ config });

// This is the type of the params object that is passed to the page component.
type PagePropsPromise = Promise<{ slug: string }>;

/**
 * Get a page by its slug.
 * @param slug - The slug of the page to get.
 * @returns The page or null if not found.
 */
const getPageBySlug = cache(async (slug: string): Promise<Page> => {
  const page = await payload.find({
    collection: "pages",
    where: { slug: { equals: slug } },
    limit: 1,
  });

  if (!page.docs) {
    throw new Error("page not found");
  }

  return page.docs[0] || null;
});

export const generateMetadata = async ({
  params,
}: {
  params: PagePropsPromise;
}): Promise<Metadata> => {
  const { slug } = await params;

  const doc = await getPageBySlug(slug);

  return {
    title: doc.meta?.title,
    description: doc.meta?.description,
    // icons: doc.meta?.image,
  };
};

// This is the default page handler. When no page found by slug, this should display 404
export default async function Page({ params }: { params: PagePropsPromise }) {
  const { slug } = await params;

  const page = await getPageBySlug(slug);

  if (!page) {
    return notFound();
  }

  return (
    <>
      <LivePreviewListener />
      <RenderBlocks blocks={page.elements} />
    </>
  );
}
