import { gql } from '@apollo/client'

export const CREATE_ORDER = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    createOrder(input: $input) {
      success
      order {
        id
        orderNumber
        customerEmail
        status
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
          total {
            amount
            currencyCode
          }
        }
        createdAt
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const GET_ORDER = gql`
  query GetOrder($id: ID!) {
    order(id: $id) {
      id
      orderNumber
      customerId
      customerEmail
      status
      items {
        id
        productId
        variantId
        product {
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
          images {
            id
            url
            altText
            width
            height
          }
          createdAt
          updatedAt
        }
        variant {
          id
          sku
          name
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          images {
            id
            url
            altText
            width
            height
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
        discounts {
          id
          discountId
          couponCode
          amount {
            amount
            currencyCode
          }
          description
          appliedAt
          isActive
        }
        appliedDiscounts {
          id
          discountId
          couponCode
          amount {
            amount
            currencyCode
          }
          description
          appliedAt
          isActive
        }
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
        currency
      }
      appliedCoupons {
        id
        couponCode
        discountId
        source
        appliedAt
        appliedBy
        isActive
        description
        discountAmount {
          amount
          currencyCode
        }
        shippingDiscount {
          amount
          currencyCode
        }
        includesFreeShipping
      }
      shipping {
        method {
          id
          name
          description
          cost {
            amount
            currencyCode
          }
          estimatedDays
        }
        address {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        cost {
          amount
          currencyCode
        }
        trackingNumber
        status
        estimatedDelivery
      }
      payment {
        id
        method {
          id
          type
          name
          description
          isActive
          metadata
        }
        status
        amount {
          amount
          currencyCode
        }
        currency
        transactionId
        processedAt
      }
      billing {
        address {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        taxId
        company
      }
      tracking {
        status
        history {
          status
          timestamp
          note
          updatedBy
        }
        estimatedDelivery
        trackingNumber
        trackingUrl
      }
      metadata
      createdAt
      updatedAt
    }
  }
`

export const GET_ORDERS = gql`
  query GetOrders($userId: ID, $customerEmail: String, $pagination: PaginationInput) {
    orders(userId: $userId, customerEmail: $customerEmail, pagination: $pagination) {
      id
      orderNumber
      customerId
      customerEmail
      status
      items {
        id
        productId
        variantId
        product {
          id
          name
          slug
          images {
            id
            url
            altText
          }
        }
        variant {
          id
          name
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
        currency
      }
      appliedCoupons {
        id
        couponCode
        discountId
        source
        appliedAt
        appliedBy
        isActive
        description
        discountAmount {
          amount
          currencyCode
        }
        shippingDiscount {
          amount
          currencyCode
        }
        includesFreeShipping
      }
      shipping {
        method {
          id
          name
          description
          cost {
            amount
            currencyCode
          }
          estimatedDays
        }
        address {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        cost {
          amount
          currencyCode
        }
        trackingNumber
        status
        estimatedDelivery
      }
      payment {
        id
        method {
          id
          type
          name
          description
          isActive
          metadata
        }
        status
        amount {
          amount
          currencyCode
        }
        currency
        transactionId
        processedAt
      }
      billing {
        address {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        taxId
        company
      }
      tracking {
        status
        history {
          status
          timestamp
          note
          updatedBy
        }
        estimatedDelivery
        trackingNumber
        trackingUrl
      }
      metadata
      createdAt
      updatedAt
    }
  }
`

export const GET_ORDER_BY_NUMBER = gql`
  query GetOrderByNumber($orderNumber: String!) {
    orderByNumber(orderNumber: $orderNumber) {
      id
      orderNumber
      customerId
      customerEmail
      status
      items {
        id
        productId
        variantId
        product {
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
          images {
            id
            url
            altText
            width
            height
          }
          createdAt
          updatedAt
        }
        variant {
          id
          sku
          name
          price {
            amount
            currencyCode
          }
          compareAtPrice {
            amount
            currencyCode
          }
          images {
            id
            url
            altText
            width
            height
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
        discounts {
          id
          discountId
          couponCode
          amount {
            amount
            currencyCode
          }
          description
          appliedAt
          isActive
        }
        appliedDiscounts {
          id
          discountId
          couponCode
          amount {
            amount
            currencyCode
          }
          description
          appliedAt
          isActive
        }
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
        currency
      }
      appliedCoupons {
        id
        couponCode
        discountId
        source
        appliedAt
        appliedBy
        isActive
        description
        discountAmount {
          amount
          currencyCode
        }
        shippingDiscount {
          amount
          currencyCode
        }
        includesFreeShipping
      }
      shipping {
        method {
          id
          name
          description
          cost {
            amount
            currencyCode
          }
          estimatedDays
        }
        address {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        cost {
          amount
          currencyCode
        }
        trackingNumber
        status
        estimatedDelivery
      }
      payment {
        id
        method {
          id
          type
          name
          description
          isActive
          metadata
        }
        status
        amount {
          amount
          currencyCode
        }
        currency
        transactionId
        processedAt
      }
      billing {
        address {
          id
          firstName
          lastName
          company
          address1
          address2
          city
          province
          country
          zip
          phone
        }
        taxId
        company
      }
      tracking {
        status
        history {
          status
          timestamp
          note
          updatedBy
        }
        estimatedDelivery
        trackingNumber
        trackingUrl
      }
      metadata
      createdAt
      updatedAt
    }
  }
`

