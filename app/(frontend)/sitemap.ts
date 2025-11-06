import { MetadataRoute } from "next";
import { client } from "@/lib/client";
import config from "@payload-config";
import { getPayload } from "payload";

type Route = {
  url: string;
  lastModified: string;
};

const baseUrl = process.env.NEXT_PUBLIC_DOMAIN_NAME
  ? `https://${process.env.NEXT_PUBLIC_DOMAIN_NAME}`
  : "http://localhost:3001";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Add static routes
  const routesMap = [
    "/contact",
    "/about",
    "/",
    "/collections",
    "/products",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
  }));

  const collectionsPromise = client.getCollections().then((collections) =>
    collections.map((collection) => ({
      url: `${baseUrl}/collection/${collection.slug}`,
      lastModified: collection.updatedAt,
    })),
  );

  const productsPromise = client.getProducts().then((products) =>
    products.map((product) => ({
      url: `${baseUrl}/product/${product.slug}`,
      lastModified: product.updatedAt,
    })),
  );

  const pagesPromise = (async () => {
    const payload = await getPayload({ config });
    const pages = await payload.find({
      collection: 'pages',
      limit: 1000, // Get all pages for sitemap
    });

    return pages.docs.map((doc) => ({
      url: `${baseUrl}/${doc.slug || ''}`,
      lastModified: doc.updatedAt || new Date().toISOString(),
    }));
  })();

  let fetchedRoutes: Route[] = [];

  try {
    fetchedRoutes = (
      await Promise.all([collectionsPromise, productsPromise, pagesPromise])
    ).flat();
  } catch (error) {
    throw JSON.stringify(error, null, 2);
  }

  return [...routesMap, ...fetchedRoutes];
}
