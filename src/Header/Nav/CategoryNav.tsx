import React from "react";
import { getCategoryTree } from "@/lib/category-helpers";
import { CategoryNavClient } from "./CategoryNav.client";
import { Category } from "@/lib/client/types";
import config from "@/payload.config";
import { getPayload } from "payload";

const CategoryNav = async () => {
  const categoryTree = (await getCategoryTree()) as unknown as (Category & {
    children: Category[];
  })[];

  // Featured products functionality removed due to deleted collections
  const featuredProducts: Record<string, any[]> = {};

  // Try to get promotional content for navigation
  let promotionalContent = undefined;
  try {
    const payload = await getPayload({ config });
    const promoResult = await payload.find({
      collection: 'promotionalContent',
      where: {
        type: {
          in: ['featuredProducts', 'bestSellers'],
        },
        isActive: {
          equals: true,
        },
      },
      sort: '-priority',
      limit: 1,
      depth: 1,
    });

    if (promoResult.docs.length > 0) {
      const promo = promoResult.docs[0];
      promotionalContent = {
        id: promo.id,
        title: promo.title,
        products: promo.products?.slice(0, 4) || [], // Limit to 4 products
      };
    }
  } catch (error) {
    console.warn('Failed to fetch promotional content for navigation:', error);
  }

  return (
    <CategoryNavClient
      categoryTree={categoryTree}
      featuredProducts={featuredProducts}
      promotionalContent={promotionalContent}
    />
  );
};

export default CategoryNav;
