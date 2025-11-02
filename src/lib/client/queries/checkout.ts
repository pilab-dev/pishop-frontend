import { gql } from '@apollo/client'

export const CREATE_CHECKOUT = gql`
  mutation CreateCheckout($input: CreateCheckoutInput!) {
    createCheckout(input: $input) {
      success
      session {
        id
        cartId
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
        customer {
          email
          firstName
          lastName
          phone
          isGuest
          billingAddress {
            firstName
            lastName
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          shippingAddress {
            firstName
            lastName
            address1
            address2
            city
            province
            country
            zip
            phone
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
          }
          address {
            firstName
            lastName
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
        }
        payment {
          intentId
          clientSecret
          methods {
            id
            type
            name
            description
            isActive
          }
          selectedMethod {
            id
            type
            name
          }
          status
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
        status
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

export const UPDATE_CHECKOUT_CUSTOMER = gql`
  mutation UpdateCheckoutCustomer($input: UpdateCheckoutCustomerInput!) {
    updateCheckoutCustomer(input: $input) {
      success
      session {
        id
        customer {
          email
          firstName
          lastName
          phone
          isGuest
          billingAddress {
            firstName
            lastName
            address1
            address2
            city
            province
            country
            zip
            phone
          }
          shippingAddress {
            firstName
            lastName
            address1
            address2
            city
            province
            country
            zip
            phone
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
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const UPDATE_CHECKOUT_SHIPPING = gql`
  mutation UpdateCheckoutShipping($input: UpdateCheckoutShippingInput!) {
    updateCheckoutShipping(input: $input) {
      success
      session {
        id
        shipping {
          method {
            id
            name
            cost {
              amount
              currencyCode
            }
            estimatedDays
          }
          address {
            firstName
            lastName
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
      }
      errors {
        code
        message
        field
      }
    }
  }
`

export const PROCESS_PAYMENT = gql`
  mutation ProcessPayment($input: ProcessPaymentInput!) {
    processPayment(input: $input) {
      success
      session {
        id
        status
        payment {
          status
          intentId
          selectedMethod {
            id
            type
            name
          }
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

export const GET_CHECKOUT_SESSION = gql`
  query GetCheckoutSession($id: ID!) {
    checkoutSession(id: $id) {
      id
      cartId
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
      customer {
        id
        email
        firstName
        lastName
        phone
        isGuest
        billingAddress {
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
        shippingAddress {
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
        estimatedDays
        trackingNumber
      }
      payment {
        intentId
        clientSecret
        methods {
          id
          type
          name
          description
          isActive
          metadata
        }
        selectedMethod {
          id
          type
          name
          description
          isActive
          metadata
        }
        status
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
      status
      expiresAt
      createdAt
      updatedAt
    }
  }
`

export const VALIDATE_CHECKOUT = gql`
  mutation ValidateCheckout($input: ValidateCheckoutInput!) {
    validateCheckout(input: $input) {
      success
      session {
        id
        cartId
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
        customer {
          id
          email
          firstName
          lastName
          phone
          isGuest
          billingAddress {
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
          shippingAddress {
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
          estimatedDays
          trackingNumber
        }
        payment {
          intentId
          clientSecret
          methods {
            id
            type
            name
            description
            isActive
            metadata
          }
          selectedMethod {
            id
            type
            name
            description
            isActive
            metadata
          }
          status
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
        status
        expiresAt
        createdAt
        updatedAt
      }
      isValid
      errors {
        code
        message
        field
      }
      warnings {
        code
        message
        field
      }
    }
  }
`

