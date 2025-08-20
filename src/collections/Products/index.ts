import type { CollectionConfig, Field } from "payload";

import { authenticated } from "../../access/authenticated";
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished";
import { generatePreviewPath } from "../../utilities/generatePreviewPath";
// import { populateAuthors } from "./hooks/populateAuthors";
// import { revalidateDelete, revalidatePost } from "./hooks/revalidatePost";

import { slugField } from "@/fields/slug";
import {
  MetaDescriptionField,
  MetaImageField,
  MetaTitleField,
  OverviewField,
  PreviewField,
} from "@payloadcms/plugin-seo/fields";

const priceFields = (): Field[] => [
  {
    name: "amount",
    type: "number",
    required: true,
  },
  {
    name: "currencyCode",
    type: "text",
    required: true,
  },
];

export const Products: CollectionConfig<"products"> = {
  slug: "products",
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticatedOrPublished,
    update: authenticated,
  },
  // This config controls what's populated by default when a post is referenced
  // https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
  // Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'posts'>
  defaultPopulate: {
    title: true,
    slug: true,
    priceRange: {
      minVariantPrice: {
        amount: true,
      },
    },
    description: true,
    featuredImage: true,
    categories: true,
    meta: {
      image: true,
      description: true,
    },
  },
  admin: {
    defaultColumns: ["title", "slug", "updatedAt"],
    livePreview: {
      url: ({ data, req }) => {
        const path = generatePreviewPath({
          slug: typeof data?.slug === "string" ? data.slug : "",
          collection: "products",
          req,
        });

        return path;
      },
    },
    preview: (data, { req }) =>
      generatePreviewPath({
        slug: typeof data?.slug === "string" ? data.slug : "",
        collection: "products",
        req,
      }),
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "collection",
      type: "relationship",
      relationTo: "collections",
      hasMany: true,
      required: true,
    },
    {
      name: "availableForSale",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "featuredImage",
      label: "Featured Image",
      type: "group",
      fields: [
        {
          name: "url",
          type: "upload",
          relationTo: "media",
          required: true,
        },
        {
          name: "alt",
          type: "text",
          required: true,
        },
      ],
    },
    {
      name: "bodyHtml",
      type: "richText",
      required: true,
    },
    {
      name: "priceRange",
      type: "group",
      fields: [
        {
          name: "minVariantPrice",
          type: "group",
          required: true,
          fields: [...priceFields()],
        },
        {
          name: "maxVariantPrice",
          type: "group",
          required: true,
          fields: [...priceFields()],
        },
      ],
    },
    {
      type: "tabs",
      tabs: [
        {
          fields: [
            {
              name: "relatedProducts",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              filterOptions: ({ id }) => {
                return {
                  id: {
                    not_in: [id],
                  },
                };
              },
              hasMany: true,
              relationTo: "products",
            },
            {
              name: "categories",
              type: "relationship",
              admin: {
                position: "sidebar",
              },
              hasMany: true,
              relationTo: "categories",
            },
          ],
          label: "Meta",
        },
        {
          name: "meta",
          label: "SEO",
          fields: [
            OverviewField({
              titlePath: "meta.title",
              descriptionPath: "meta.description",
              imagePath: "meta.image",
            }),
            MetaTitleField({
              hasGenerateFn: true,
            }),
            MetaImageField({
              relationTo: "media",
            }),
            MetaDescriptionField({}),
            PreviewField({
              // if the `generateUrl` function is configured
              hasGenerateFn: true,

              // field paths to match the target field for data
              titlePath: "meta.title",
              descriptionPath: "meta.description",
            }),
          ],
        },
        {
          label: "Ratings",
          fields: [
            {
              name: "rating",
              type: "number",
              defaultValue: "10",
            },
            {
              name: "ratingCount",
              type: "number",
              defaultValue: 114,
            },
            {
              type: "group",
              name: "availability",
              fields: [
                {
                  name: "status",
                  type: "select",
                  options: [
                    {
                      label: "In Stock",
                      value: "InStock",
                    },
                    {
                      label: "Out of Stock",
                      value: "OutOfStock",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "publishedAt",
      type: "date",
      admin: {
        date: {
          pickerAppearance: "dayAndTime",
        },
        position: "sidebar",
      },
      hooks: {
        beforeChange: [
          ({ siblingData, value }) => {
            if (siblingData._status === "published" && !value) {
              return new Date();
            }
            return value;
          },
        ],
      },
    },
    ...slugField(),
  ],
  hooks: {
    // afterChange: [revalidatePost],
    // afterRead: [populateAuthors],
    // afterDelete: [revalidateDelete],
  },
  versions: {
    drafts: {
      autosave: {
        interval: 1000, // We set this interval for optimal live preview
      },
      schedulePublish: true,
    },
    maxPerDoc: 50,
  },
};
