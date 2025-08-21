import { getPayload } from "payload";
import type { Product } from "../payload-types";
import config from "../payload.config";

export const getFeaturedProductsForCategories = async (
  categoryIds: string[],
): Promise<Record<string, Product[]>> => {
  const payload = await getPayload({ config });
  const products = await payload.find({
    collection: "products",
    where: {
      "categories.id": {
        in: categoryIds,
      },
    },
    limit: 100, // Fetch a bunch of products and we will sort them out client side
    depth: 1,
    sort: "-updatedAt",
  });

  const productsByCategory: Record<string, Product[]> = {};

  products.docs.forEach((product) => {
    product.categories?.forEach((cat) => {
      if (typeof cat === "object" && categoryIds.includes(cat.id)) {
        if (!productsByCategory[cat.id]) {
          productsByCategory[cat.id] = [];
        }
        if (productsByCategory[cat.id].length < 4) {
          productsByCategory[cat.id].push(product);
        }
      }
    });
  });

  return productsByCategory;
};
