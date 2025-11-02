import { gql } from '@apollo/client'

export const GET_PRODUCTS = gql`
  query GetProducts($pagination: PaginationInput, $filter: ProductFilterInput) {
    products(pagination: $pagination, filter: $filter) {
      id
      sku
      name
      slug
      description
      shortDescription
      basePrice {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      isActive
      images {
        id
        url
        altText
        width
        height
      }
      inventory {
        trackQuantity
        quantity
        allowBackorder
      }
      tags
      createdAt
      updatedAt
    }
  }
`

export const GET_PRODUCT = gql`
  query GetProduct($slug: String, $id: ID, $variantSlug: String) {
    product(slug: $slug, id: $id, variantSlug: $variantSlug) {
      id
      sku
      name
      slug
      description
      shortDescription
      basePrice {
        amount
        currencyCode
      }
      minPrice {
        amount
        currencyCode
      }
      maxPrice {
        amount
        currencyCode
      }
      compareAtPrice {
        amount
        currencyCode
      }
      costPrice {
        amount
        currencyCode
      }
      purchasePrice {
        amount
        currencyCode
      }
      isActive
      isDigital
      weight
      dimensions {
        length
        width
        height
        unit
      }
      images {
        id
        url
        altText
        width
        height
      }
      variants {
        id
        sku
        slug
        name
        price {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        costPrice {
          amount
          currencyCode
        }
        isActive
        weight
        dimensions {
          length
          width
          height
          unit
        }
        images {
          id
          url
          altText
          width
          height
        }
        options {
          id
          name
          value
        }
        inventory {
          trackQuantity
          quantity
          allowBackorder
          sku
          barcode
        }
      }
      options {
        name
        values
      }
      category {
        id
        name
        slug
        description
        image {
          id
          url
          altText
          width
          height
        }
        seo {
          title
          description
          keywords
        }
        isActive
        sortOrder
        createdAt
        updatedAt
      }
      collections {
        id
        name
        slug
        description
        image {
          id
          url
          altText
          width
          height
        }
        seo {
          title
          description
          keywords
        }
        isActive
        sortOrder
        createdAt
        updatedAt
      }
      tags
      seo {
        title
        description
        keywords
      }
      inventory {
        trackQuantity
        quantity
        allowBackorder
        sku
        barcode
      }
      createdAt
      updatedAt
    }
  }
`

export const GET_CATEGORIES = gql`
  query GetCategories($pagination: PaginationInput) {
    categories(pagination: $pagination) {
      id
      name
      slug
      description
      image {
        id
        url
        altText
        width
        height
      }
      parent {
        id
        name
        slug
      }
      children {
        id
        name
        slug
        isActive
      }
      products {
        id
        name
        slug
        basePrice {
          amount
          currencyCode
        }
        images {
          id
          url
          altText
        }
      }
      seo {
        title
        description
        keywords
      }
      isActive
      sortOrder
      createdAt
      updatedAt
    }
  }
`

export const GET_CATEGORY = gql`
  query GetCategory($slug: String, $id: ID) {
    category(slug: $slug, id: $id) {
      id
      name
      slug
      description
      image {
        id
        url
        altText
        width
        height
      }
      parent {
        id
        name
        slug
      }
      children {
        id
        name
        slug
        description
        image {
          id
          url
          altText
          width
          height
        }
        seo {
          title
          description
          keywords
        }
        isActive
        sortOrder
        createdAt
        updatedAt
      }
      products {
        id
        sku
        name
        slug
        description
        shortDescription
        basePrice {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        isActive
        images {
          id
          url
          altText
          width
          height
        }
        inventory {
          trackQuantity
          quantity
          allowBackorder
        }
        tags
        createdAt
        updatedAt
      }
      seo {
        title
        description
        keywords
      }
      isActive
      sortOrder
      createdAt
      updatedAt
    }
  }
`

export const GET_COLLECTIONS = gql`
  query GetCollections($pagination: PaginationInput) {
    collections(pagination: $pagination) {
      id
      name
      slug
      description
      image {
        id
        url
        altText
        width
        height
      }
      products {
        id
        name
        slug
        basePrice {
          amount
          currencyCode
        }
        images {
          id
          url
          altText
        }
      }
      seo {
        title
        description
        keywords
      }
      isActive
      sortOrder
      createdAt
      updatedAt
    }
  }
`

export const GET_COLLECTION = gql`
  query GetCollection($slug: String, $id: ID) {
    collection(slug: $slug, id: $id) {
      id
      name
      slug
      description
      image {
        id
        url
        altText
        width
        height
      }
      products {
        id
        sku
        name
        slug
        description
        shortDescription
        basePrice {
          amount
          currencyCode
        }
        compareAtPrice {
          amount
          currencyCode
        }
        isActive
        images {
          id
          url
          altText
          width
          height
        }
        inventory {
          trackQuantity
          quantity
          allowBackorder
        }
        tags
        createdAt
        updatedAt
      }
      seo {
        title
        description
        keywords
      }
      isActive
      sortOrder
      createdAt
      updatedAt
    }
  }
`

export const GET_CATEGORY_TREE = gql`
  query GetCategoryTree($includeInactive: Boolean, $maxDepth: Int, $rootSlug: String, $includeCounts: Boolean, $sortBy: String, $sortDirection: String) {
    categoryTree(includeInactive: $includeInactive, maxDepth: $maxDepth, rootSlug: $rootSlug, includeCounts: $includeCounts, sortBy: $sortBy, sortDirection: $sortDirection) {
      category {
        id
        name
        slug
        description
        image {
          id
          url
          altText
          width
          height
        }
        parent {
          id
          name
          slug
        }
        children {
          id
          name
          slug
          isActive
        }
        products {
          id
          name
          slug
          basePrice {
            amount
            currencyCode
          }
          images {
            id
            url
            altText
          }
        }
        seo {
          title
          description
          keywords
        }
        isActive
        sortOrder
        createdAt
        updatedAt
      }
      children {
        category {
          id
          name
          slug
          description
          image {
            id
            url
            altText
            width
            height
          }
          parent {
            id
            name
            slug
          }
          children {
            id
            name
            slug
            isActive
          }
          products {
            id
            name
            slug
            basePrice {
              amount
              currencyCode
            }
            images {
              id
              url
              altText
            }
          }
          seo {
            title
            description
            keywords
          }
          isActive
          sortOrder
          createdAt
          updatedAt
        }
        children {
          category {
            id
            name
            slug
            isActive
          }
          productCount
          level
        }
        productCount
        level
      }
      productCount
      level
    }
  }
`

