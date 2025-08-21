import React from "react";
import { getCategoryTree } from "@/lib/category-helpers";
import { getFeaturedProductsForCategories } from "@/lib/product-helpers";
import { CategoryNavClient } from "./CategoryNav.client";
import { Category } from "@/payload-types";

const CategoryNav = async () => {
  const categoryTree = (await getCategoryTree()) as (Category & {
    children: Category[];
  })[];

  const subCategoryIds = categoryTree.flatMap(
    (cat) => cat.children?.map((child) => child.id) || [],
  );

  const featuredProducts =
    await getFeaturedProductsForCategories(subCategoryIds);

  return (
    <CategoryNavClient
      categoryTree={categoryTree}
      featuredProducts={featuredProducts}
    />
  );
};

export default CategoryNav;
