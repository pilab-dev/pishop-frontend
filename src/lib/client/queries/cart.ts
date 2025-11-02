import { gql } from '@apollo/client'

export const GET_CART = gql`
  query GetCart($id: ID!) {
    cart(id: $id) {
      id
      userId
      sessionId
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
        variant {
          id
          sku
          name
          price {
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
        weight
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
      bookedGiftCards {
        code
        bookedAmount {
          amount
          currencyCode
        }
        availableBalance {
          amount
          currencyCode
        }
        freeShipping
        bookedAt
        bookingExpiresAt
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
          isActive
        }
        destination {
          __typename
          ... on ShippingAddress {
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
            contactName
          }
          ... on PickupPoint {
            id
            name
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
            hours
            contactInfo
          }
          ... on ParcelBox {
            id
            name
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
            size
            isAvailable
          }
        }
        cost {
          amount
          currencyCode
        }
        estimatedDays
        trackingNumber
      }
      expiresAt
      createdAt
      updatedAt
    }
  }
`

export const CREATE_CART = gql`
  mutation CreateCart($input: CreateCartInput!) {
    createCart(input: $input) {
      success
      cart {
        id
        userId
        sessionId
        items {
          id
          productId
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
          total {
            amount
            currencyCode
          }
          itemCount
        }
        metadata
        expiresAt
        createdAt
        updatedAt
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const ADD_TO_CART = gql`
  mutation AddToCart($input: AddToCartInput!) {
    addToCart(input: $input) {
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
          variant {
            id
            sku
            name
            price {
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
      }
      item {
        id
        productId
        variantId
        quantity
        unitPrice {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
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
        addedAt
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const UPDATE_CART_ITEM = gql`
  mutation UpdateCartItem($input: UpdateCartItemInput!) {
    updateCartItem(input: $input) {
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
          variant {
            id
            sku
            name
            price {
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
      }
      item {
        id
        productId
        variantId
        quantity
        unitPrice {
          amount
          currencyCode
        }
        totalPrice {
          amount
          currencyCode
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
      errors {
        code
        message
        field
      }
    }
  }
`

export const REMOVE_FROM_CART = gql`
  mutation RemoveFromCart($input: RemoveFromCartInput!) {
    removeFromCart(input: $input) {
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
          variant {
            id
            sku
            name
            price {
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
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const SET_SHIPPING_METHOD = gql`
  mutation SetShippingMethod($input: SetShippingMethodInput!) {
    setShippingMethod(input: $input) {
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
          variant {
            id
            sku
            name
            price {
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
            isActive
            zones {
              id
              name
              countries
              cost {
                amount
                currencyCode
              }
            }
          }
          destination {
            __typename
            ... on ShippingAddress {
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
              contactName
            }
            ... on PickupPoint {
              id
              name
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
              hours
              contactInfo
            }
            ... on ParcelBox {
              id
              name
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
              size
              isAvailable
            }
          }
          cost {
            amount
            currencyCode
          }
          estimatedDays
          trackingNumber
        }
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
          isActive
        }
        destination {
          __typename
          ... on ShippingAddress {
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
            contactName
          }
          ... on PickupPoint {
            id
            name
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
            hours
            contactInfo
          }
          ... on ParcelBox {
            id
            name
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
            size
            isAvailable
          }
        }
        cost {
          amount
          currencyCode
        }
        estimatedDays
        trackingNumber
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const MERGE_CARTS = gql`
  mutation MergeCarts($input: MergeCartsInput!) {
    mergeCarts(input: $input) {
      success
      cart {
        id
        userId
        sessionId
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
          variant {
            id
            sku
            name
            price {
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
        bookedGiftCards {
          code
          bookedAmount {
            amount
            currencyCode
          }
          availableBalance {
            amount
            currencyCode
          }
          freeShipping
          bookedAt
          bookingExpiresAt
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
            isActive
          }
          destination {
            __typename
            ... on ShippingAddress {
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
              contactName
            }
            ... on PickupPoint {
              id
              name
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
              hours
              contactInfo
            }
            ... on ParcelBox {
              id
              name
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
              size
              isAvailable
            }
          }
          cost {
            amount
            currencyCode
          }
          estimatedDays
          trackingNumber
        }
        metadata
        expiresAt
        createdAt
        updatedAt
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const CLEAR_CART = gql`
  mutation ClearCart($cartId: ID!) {
    clearCart(cartId: $cartId) {
      success
      cart {
        id
        userId
        sessionId
        items {
          id
          quantity
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
          itemCount
        }
        appliedCoupons {
          id
          couponCode
        }
        bookedGiftCards {
          code
          bookedAmount {
            amount
            currencyCode
          }
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
            isActive
          }
          destination {
            __typename
            ... on ShippingAddress {
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
              contactName
            }
            ... on PickupPoint {
              id
              name
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
              hours
              contactInfo
            }
            ... on ParcelBox {
              id
              name
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
              size
              isAvailable
            }
          }
          cost {
            amount
            currencyCode
          }
          estimatedDays
          trackingNumber
        }
        metadata
        expiresAt
        createdAt
        updatedAt
      }
      errors {
        code
        message
        field
      }
    }
  }
`

// Cart queries for shipping providers and methods
export const GET_SHIPPING_PROVIDERS = gql`
  query GetShippingProviders {
    shippingProviders {
      id
      name
      description
      supportedDeliveryTypes
      isActive
      logoUrl
      contactInfo
    }
  }
`

export const GET_SHIPPING_METHODS = gql`
  query GetShippingMethods($providerId: ID!) {
    shippingMethods(providerId: $providerId) {
      id
      name
      description
      provider {
        id
        name
        description
        supportedDeliveryTypes
        isActive
        logoUrl
        contactInfo
      }
      deliveryType
      cost {
        amount
        currencyCode
      }
      estimatedDays
      isActive
      zones {
        id
        name
        countries
        cost {
          amount
          currencyCode
        }
      }
    }
  }
`

export const GET_PICKUP_POINTS = gql`
  query GetPickupPoints($address: AddressInput!, $limit: Int) {
    pickupPoints(address: $address, limit: $limit) {
      id
      name
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
      hours
      contactInfo
    }
  }
`

export const GET_PARCEL_BOXES = gql`
  query GetParcelBoxes($address: AddressInput!, $limit: Int) {
    parcelBoxes(address: $address, limit: $limit) {
      id
      name
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
      size
      isAvailable
    }
  }
`

