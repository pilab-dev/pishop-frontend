import { Payload } from "payload";
import { Product } from "@/payload-types";

export const seedMdxProduct = async (payload: Payload): Promise<Product> => {
  const newProduct = await payload.create({
    collection: "products",
    data: {
      title: "MDX Product",
      description: "This is a product with a custom MDX layout.",
      availableForSale: true,
      layout: "customMdx",
      customMdx: {
        root: {
          type: "root",
          children: [
            {
              type: "heading",
              tag: "h1",
              children: [
                {
                  type: "text",
                  text: "This is an MDX Product Page",
                },
              ],
            },
            {
              type: "paragraph",
              children: [
                {
                  type: "text",
                  text: "This is a paragraph of text rendered from a custom MDX layout.",
                },
              ],
            },
          ],
        },
      },
      priceRange: {
        minVariantPrice: {
          amount: 100,
          currencyCode: "USD",
        },
        maxVariantPrice: {
          amount: 100,
          currencyCode: "USD",
        },
      },
      featuredImage: {
        url: "",
        alt: "MDX Product Image",
      },
      collection: [],
      bodyHtml: {
        root: {
          type: "root",
          children: [],
        },
      },
      slug: "mdx-product",
    },
  });

  return newProduct;
};
