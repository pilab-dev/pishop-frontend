import { CartApi, Configuration, ProductApi } from "@pilab/pishop-client";

import { Product } from "@/payload-types";
import payloadConfig from "@payload-config";
import { getPayload } from "payload";

const payload = await getPayload({ config: payloadConfig });

const headers = {
  "Content-Type": "application/json",
  "X-Shop-Id": "pishop-aggregated",
};

interface MenuItem {
  title: string;
  path: string;
}

const collections: MenuItem[] = [
  { title: "Headphone", path: "headphone" },
  { title: "Smart watch", path: "smartwatch" },
  { title: "Smartphone", path: "smartphone" },
  { title: "Game console", path: "console" },
  { title: "Laptop", path: "laptop" },
  { title: "Television", path: "television" },
];

/**
 * @see https://github.com/pilab-dev/pishop-client
 */
const getCollections = async () => {
  return collections;
};

type ListProductsByCategoryProps = {
  collectionId: string;
  limit: number;
};

const listProductsByCollection = async ({
  collectionId,
  limit,
}: ListProductsByCategoryProps) => {
  console.warn("collectionId is not used here (listByProducts)", collectionId);

  const products = await payload.find({
    collection: "products",
    // where: {
    //   collection: {
    //     slug: {
    //       equals: collectionId,
    //     },
    //   },
    // },
    limit,
  });

  return products.docs;
};

const getProductBySlug = async (slug: string): Promise<Product | null> => {
  const products = await payload.find({
    collection: "products",
    where: {
      slug: { equals: slug },
    },
    limit: 1,
  });

  return products.docs[0] ?? null;
};

const cartApi = new CartApi(
  new Configuration({
    headers,
  }),
);

export { getCollections, getProductBySlug, listProductsByCollection, cartApi };
