import { getPayload } from "payload";
import type { Category } from "../payload-types";
import config from "../payload.config";

export const getCategoryAncestors = async (
  category: Category,
): Promise<Category[]> => {
  const payload = await getPayload({ config });
  const ancestors: Category[] = [category];
  let parentId: string | undefined;

  if (typeof category.parent === "string") {
    parentId = category.parent;
  } else if (typeof category.parent === "object" && category.parent !== null) {
    parentId = category.parent.id;
  }

  while (parentId) {
    const parentCategory: Category | undefined = await payload.findByID({
      collection: "categories",
      id: parentId,
      depth: 1,
    });

    if (parentCategory) {
      ancestors.unshift(parentCategory);
      if (typeof parentCategory.parent === "string") {
        parentId = parentCategory.parent;
      } else if (
        typeof parentCategory.parent === "object" &&
        parentCategory.parent !== null
      ) {
        parentId = parentCategory.parent.id;
      } else {
        parentId = undefined;
      }
    } else {
      parentId = undefined;
    }
  }

  return ancestors;
};

export const getCategoryTree = async (): Promise<Category[]> => {
  const payload = await getPayload({ config });
  const allCategories = await payload.find({
    collection: "categories",
    limit: 100, // Assuming there are not more than 100 categories
    depth: 1,
  });

  const categoryMap = new Map<string, Category & { children: Category[] }>();

  allCategories.docs.forEach((cat) => {
    categoryMap.set(cat.id, { ...cat, children: [] });
  });

  const tree: (Category & { children: Category[] })[] = [];

  allCategories.docs.forEach((cat) => {
    const catWithChildren = categoryMap.get(cat.id)!;
    const parentId =
      typeof cat.parent === "string"
        ? cat.parent
        : typeof cat.parent === "object" && cat.parent !== null
        ? cat.parent.id
        : null;

    if (parentId && categoryMap.has(parentId)) {
      const parent = categoryMap.get(parentId)!;
      parent.children.push(catWithChildren);
    } else {
      tree.push(catWithChildren);
    }
  });

  return tree;
};
