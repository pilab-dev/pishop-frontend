import { client } from "@/lib/client";
import type { Category, CategoryTreeNode } from "@/lib/client/types";

export const getCategoryAncestors = async (
  category: Category,
): Promise<Category[]> => {
  const categoryTree = await client.getCategoryTree({
    includeInactive: false,
    maxDepth: 10,
    includeCounts: false,
  });

  const ancestors: Category[] = [category];
  let parentId: string | undefined;

  if (typeof category.parent === "string") {
    parentId = category.parent;
  } else if (typeof category.parent === "object" && category.parent !== null) {
    parentId = category.parent.id;
  }

  while (parentId) {
    const parentCategory = findCategoryById(categoryTree, parentId);
    if (parentCategory) {
      ancestors.unshift(parentCategory.category);
      if (typeof parentCategory.category.parent === "string") {
        parentId = parentCategory.category.parent;
      } else if (
        typeof parentCategory.category.parent === "object" &&
        parentCategory.category.parent !== null
      ) {
        parentId = parentCategory.category.parent.id;
      } else {
        parentId = undefined;
      }
    } else {
      parentId = undefined;
    }
  }

  return ancestors;
};

export const getCategoryTree = async (): Promise<(Category & { children: Category[] })[]> => {
  const categoryTreeNodes = await client.getCategoryTree({
    includeInactive: false,
    maxDepth: 2, // Only get top level and immediate children for mega menu
    includeCounts: true,
    sortBy: 'sortOrder',
    sortDirection: 'ASC',
  });

  // Convert CategoryTreeNode[] to the expected format
  const convertToCategoryWithChildren = (node: CategoryTreeNode): Category & { children: Category[] } => {
    return {
      ...node.category,
      children: node.children.map(child => ({
        ...child.category,
        children: [], // We only go one level deep for the mega menu
      })),
    };
  };

  return categoryTreeNodes.map(convertToCategoryWithChildren);
};

const findCategoryById = (tree: CategoryTreeNode[], id: string): CategoryTreeNode | null => {
  for (const node of tree) {
    if (node.category.id === id) {
      return node;
    }
    const found = findCategoryById(node.children, id);
    if (found) return found;
  }
  return null;
};
