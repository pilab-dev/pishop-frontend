import { BeforeSync, DocToSync } from '@payloadcms/plugin-search/types'

export const beforeSyncWithSearch: BeforeSync = async ({ req, originalDoc, searchDoc }) => {
  const {
    doc: { relationTo: collection },
  } = searchDoc

  const { slug, id, categories, title, meta } = originalDoc

  const modifiedDoc: DocToSync = {
    ...searchDoc,
    slug,
    meta: {
      ...meta,
      title: meta?.title || title,
      image: meta?.image?.id || meta?.image,
      description: meta?.description,
    },
    categories: [],
  }

  // Handle categories as comma-separated string from storefront API
  if (categories && typeof categories === 'string') {
    const categorySlugs = categories.split(',').map(s => s.trim()).filter(Boolean)
    modifiedDoc.categories = categorySlugs.map((slug) => ({
      relationTo: 'categories',
      categoryID: slug,
      title: slug,
    }))
  }

  return modifiedDoc
}
