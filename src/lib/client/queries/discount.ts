import { gql } from '@apollo/client'

export const APPLY_COUPON = gql`
  mutation ApplyDiscount($input: ApplyDiscountInput!) {
    applyDiscount(input: $input) {
      success
      cart {
        id
        items {
          id
          productId
          variantId
          product {
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
          quantity
          unitPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          addedAt
          updatedAt
        }
        totals {
          subtotal {
            amount
            currencyCode
          }
          tax {
            amount
            currencyCode
          }
          shipping {
            amount
            currencyCode
          }
          discount {
            amount
            currencyCode
          }
          total {
            amount
            currencyCode
          }
          itemCount
        }
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const REMOVE_COUPON = gql`
  mutation RemoveDiscount($input: RemoveDiscountInput!) {
    removeDiscount(input: $input) {
      success
      cart {
        id
        items {
          id
          productId
          variantId
          product {
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
          quantity
          unitPrice {
            amount
            currencyCode
          }
          totalPrice {
            amount
            currencyCode
          }
          addedAt
          updatedAt
        }
        totals {
          subtotal {
            amount
            currencyCode
          }
          tax {
            amount
            currencyCode
          }
          shipping {
            amount
            currencyCode
          }
          discount {
            amount
            currencyCode
          }
          total {
            amount
            currencyCode
          }
          itemCount
        }
      }
      errors {
        code
        message
        field
      }
    }
  }
`

