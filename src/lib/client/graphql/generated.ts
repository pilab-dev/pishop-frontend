export type Maybe<T> = T | null
export type InputMaybe<T> = Maybe<T>
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] }
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> }
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> }
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = {
  [_ in K]?: never
}
export type Incremental<T> =
  | T
  | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never }
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string }
  String: { input: string; output: string }
  Boolean: { input: boolean; output: boolean }
  Int: { input: number; output: number }
  Float: { input: number; output: number }
  /**
   * Custom scalar for arbitrary JSON data. Allows flexible metadata storage.
   * Example: {"key": "value", "nested": {"data": 123}}
   */
  JSON: { input: Record<string, unknown>; output: Record<string, unknown> }
  /**
   * Custom scalar representing date and time values in ISO 8601 format.
   * Example: "2025-10-29T10:30:00Z"
   */
  Time: { input: string; output: string }
  /** Custom scalar for file upload operations. Used in mutation inputs for image uploads. */
  Upload: { input: File; output: File }
}

/**
 * AddToCartInput adds a product or variant to a shopping cart.
 * Creates a new cart item or updates quantity if item already exists.
 */
export type AddToCartInput = {
  /** ID of the cart to add the item to */
  cartId: Scalars['ID']['input']
  /** Optional metadata for the cart item. Example: {"gift_wrap": true} */
  metadata?: InputMaybe<Scalars['JSON']['input']>
  /** ID of the product to add */
  productId: Scalars['ID']['input']
  /** Quantity to add. Must be positive integer. Example: 2 */
  quantity: Scalars['Int']['input']
  /** Optional variant ID for products with variants (size, color, etc.) */
  variantId?: InputMaybe<Scalars['ID']['input']>
}

/**
 * AddToCartResponse returns the result of adding an item to cart.
 * Includes the updated cart and the specific item that was added.
 */
export type AddToCartResponse = {
  __typename?: 'AddToCartResponse'
  /** The updated shopping cart with the new item. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The specific cart item that was added or updated. Null if operation failed. */
  item: Maybe<CartItem>
  /** True if the item was added successfully */
  success: Scalars['Boolean']['output']
}

/**
 * Address represents a physical location for shipping or billing purposes.
 * Supports both domestic and international addresses with optional company information.
 */
export type Address = {
  __typename?: 'Address'
  /** Primary street address. Example: "123 Main Street"  */
  address1: Scalars['String']['output']
  /** Secondary address line for apartment, suite, etc. Example: "Apt 4B"  */
  address2: Maybe<Scalars['String']['output']>
  /** City name. Example: "New York"  */
  city: Scalars['String']['output']
  /** Optional company name. Example: "Acme Corp"  */
  company: Maybe<Scalars['String']['output']>
  /** ISO 3166-1 alpha-2 country code. Example: "US", "CA", "GB"  */
  country: Scalars['String']['output']
  /** Recipient's first name. Example: "John"  */
  firstName: Scalars['String']['output']
  /** Unique identifier for the address. Null for new addresses. */
  id: Maybe<Scalars['ID']['output']>
  /** Recipient's last name. Example: "Doe"  */
  lastName: Scalars['String']['output']
  /** Contact phone number with optional country code. Example: "+1-555-0100"  */
  phone: Maybe<Scalars['String']['output']>
  /** State or province name. Example: "New York" or "NY"  */
  province: Scalars['String']['output']
  /** Postal or ZIP code. Example: "10001" or "SW1A 1AA"  */
  zip: Scalars['String']['output']
}

/**
 * AddressInput creates or updates an address for shipping or billing.
 * All fields follow standard postal address formats.
 */
export type AddressInput = {
  /** Primary street address line */
  address1: Scalars['String']['input']
  /** Secondary address line (apartment, suite, unit) */
  address2?: InputMaybe<Scalars['String']['input']>
  /** City name */
  city: Scalars['String']['input']
  /** Optional company name for business deliveries */
  company?: InputMaybe<Scalars['String']['input']>
  /** ISO 3166-1 alpha-2 country code */
  country: Scalars['String']['input']
  /** Recipient's first name */
  firstName: Scalars['String']['input']
  /** Recipient's last name */
  lastName: Scalars['String']['input']
  /** Contact phone number */
  phone?: InputMaybe<Scalars['String']['input']>
  /** State or province */
  province: Scalars['String']['input']
  /** Postal or ZIP code */
  zip: Scalars['String']['input']
}

/**
 * AppliedCoupon represents a coupon or promotion applied to the cart.
 * Supports both manually entered coupons and auto-applied promotions.
 * This is the unified discount model that replaces legacy CartDiscount.
 */
export type AppliedCoupon = {
  __typename?: 'AppliedCoupon'
  /** When the coupon was applied */
  appliedAt: Scalars['Time']['output']
  /** User who applied the coupon (null for auto-applied) */
  appliedBy: Maybe<Scalars['ID']['output']>
  /** Coupon code */
  couponCode: Scalars['String']['output']
  /** Human-readable description */
  description: Maybe<Scalars['String']['output']>
  /** Total discount amount on cart items */
  discountAmount: Money
  /** Reference to the discount definition */
  discountId: Scalars['ID']['output']
  /** Unique applied coupon identifier */
  id: Scalars['ID']['output']
  /** Whether this coupon provides free shipping */
  includesFreeShipping: Scalars['Boolean']['output']
  /** Whether the coupon is currently active */
  isActive: Scalars['Boolean']['output']
  /** Discount amount applied to shipping */
  shippingDiscount: Maybe<Money>
  /** Source of the coupon (manual or auto-applied) */
  source: CouponSource
}

/**
 * AppliedItemDiscount represents a discount applied to a specific cart item.
 * Tracks per-item discounts from coupons or promotions.
 */
export type AppliedItemDiscount = {
  __typename?: 'AppliedItemDiscount'
  /** Discount amount for this item */
  amount: Money
  /** When the discount was applied */
  appliedAt: Scalars['Time']['output']
  /** Coupon code that triggered this discount */
  couponCode: Maybe<Scalars['String']['output']>
  /** Human-readable description */
  description: Scalars['String']['output']
  /** Reference to the discount definition */
  discountId: Scalars['ID']['output']
  /** Unique applied discount identifier */
  id: Scalars['ID']['output']
  /** Whether the discount is currently active */
  isActive: Scalars['Boolean']['output']
}

/**
 * ApplyDiscountInput applies a discount code to a shopping cart.
 * Validates the code and calculates the discount amount.
 */
export type ApplyDiscountInput = {
  /** ID of the cart to apply the discount to */
  cartId: Scalars['ID']['input']
  /** Discount code to apply. Example: "SUMMER2025", "SAVE10"  */
  code: Scalars['String']['input']
}

/**
 * ApplyDiscountResponse returns the result of applying a discount code.
 * Includes the updated cart with discount and the applied coupon details.
 */
export type ApplyDiscountResponse = {
  __typename?: 'ApplyDiscountResponse'
  /** The updated cart with discount applied. Null if operation failed. */
  cart: Maybe<Cart>
  /** The applied coupon with discount details. Null if operation failed. */
  discount: Maybe<AppliedCoupon>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** True if the discount was applied successfully */
  success: Scalars['Boolean']['output']
}

export type AvailablePaymentMethods = {
  __typename?: 'AvailablePaymentMethods'
  defaultMethod: Maybe<PaymentMethod>
  methods: Array<PaymentMethod>
}

export type AvailableShippingMethods = {
  __typename?: 'AvailableShippingMethods'
  defaultMethod: Maybe<ShippingMethod>
  methods: Array<ShippingMethod>
}

/**
 * BaseResponse is the foundation for all mutation responses.
 * Indicates operation success and provides error details.
 */
export type BaseResponse = {
  __typename?: 'BaseResponse'
  /** List of errors that occurred during the operation. Empty if successful. */
  errors: Maybe<Array<Error>>
  /** True if the operation completed successfully */
  success: Scalars['Boolean']['output']
}

/**
 * BookedGiftCard represents a gift card that has been reserved for this cart.
 * The amount is temporarily held until checkout is completed or the booking expires.
 */
export type BookedGiftCard = {
  __typename?: 'BookedGiftCard'
  /** Remaining balance available on the gift card */
  availableBalance: Money
  /** Amount currently booked from this gift card */
  bookedAmount: Money
  /** When the gift card was booked */
  bookedAt: Scalars['Time']['output']
  /** When the booking expires and funds are released */
  bookingExpiresAt: Scalars['Time']['output']
  /** Gift card code */
  code: Scalars['String']['output']
  /** Whether this gift card provides free shipping */
  freeShipping: Scalars['Boolean']['output']
}

/**
 * Cart represents a shopping cart for both guest and authenticated users.
 * Supports cart items, discounts, coupons, gift cards, and shipping calculations.
 */
export type Cart = {
  __typename?: 'Cart'
  /** Applied coupons and promotions (both manual and auto-applied) */
  appliedCoupons: Array<AppliedCoupon>
  /** Gift cards booked for this cart with their amounts and expiration */
  bookedGiftCards: Array<BookedGiftCard>
  /** When the cart was created */
  createdAt: Scalars['Time']['output']
  /** When the cart expires (for guest carts) */
  expiresAt: Maybe<Scalars['Time']['output']>
  /** Unique cart identifier */
  id: Scalars['ID']['output']
  /** List of items in the cart */
  items: Array<CartItem>
  /** Additional metadata stored as JSON */
  metadata: Maybe<Scalars['JSON']['output']>
  /** Session ID for guest carts or temporary cart tracking */
  sessionId: Scalars['ID']['output']
  /** Shipping method and address information */
  shipping: Maybe<CartShipping>
  /** Calculated cart totals including tax, shipping, and discounts */
  totals: CartTotals
  /** When the cart was last updated */
  updatedAt: Scalars['Time']['output']
  /** User ID if cart belongs to authenticated user */
  userId: Maybe<Scalars['ID']['output']>
}

/**
 * CartItem represents a single item in the shopping cart.
 * Includes product information, pricing, quantity, and applied discounts.
 */
export type CartItem = {
  __typename?: 'CartItem'
  /** When the item was added to cart */
  addedAt: Scalars['Time']['output']
  /** Per-item applied discounts from coupons or promotions */
  appliedDiscounts: Array<AppliedItemDiscount>
  /** Unique cart item identifier */
  id: Scalars['ID']['output']
  /** Additional metadata stored as JSON */
  metadata: Maybe<Scalars['JSON']['output']>
  /** Full product details */
  product: Product
  /** Product ID reference */
  productId: Scalars['ID']['output']
  /** Quantity of this item in the cart */
  quantity: Scalars['Int']['output']
  /** Total price (unitPrice × quantity) */
  totalPrice: Money
  /** Price per unit */
  unitPrice: Money
  /** When the item was last updated */
  updatedAt: Scalars['Time']['output']
  /** Product variant details if selected */
  variant: Maybe<ProductVariant>
  /** Product variant ID if applicable */
  variantId: Maybe<Scalars['ID']['output']>
}

/** CartMergeStrategy defines how to handle duplicate items when merging carts. */
export const enum CartMergeStrategy {
  /** Prompt user to resolve conflicts manually */
  ASK_USER = 'ASK_USER',
  /** Keep source cart items and discard target cart items on conflict */
  KEEP_SOURCE = 'KEEP_SOURCE',
  /** Keep target cart items and discard source cart items on conflict */
  KEEP_TARGET = 'KEEP_TARGET',
  /** Add quantities together for duplicate items */
  MERGE_QUANTITIES = 'MERGE_QUANTITIES',
}

/**
 * CartShipping contains shipping information for the cart.
 * Includes selected method, delivery destination, and estimated delivery time.
 */
export type CartShipping = {
  __typename?: 'CartShipping'
  /** Calculated shipping cost */
  cost: Money
  /** Shipping destination (address, pickup point, or parcel box) */
  destination: Maybe<ShippingDestination>
  /** Estimated delivery time in days */
  estimatedDays: Maybe<Scalars['Int']['output']>
  /** Selected shipping method */
  method: Maybe<ShippingMethod>
  /** Tracking number (if available) */
  trackingNumber: Maybe<Scalars['String']['output']>
}

/**
 * CartTotals contains all calculated totals for the cart.
 * Includes subtotal, tax, shipping, discounts, and final total.
 */
export type CartTotals = {
  __typename?: 'CartTotals'
  /** Total discount amount applied */
  discount: Money
  /** Total number of items in cart */
  itemCount: Scalars['Int']['output']
  /** Shipping cost */
  shipping: Money
  /** Sum of all item prices before tax and shipping */
  subtotal: Money
  /** Calculated tax amount */
  tax: Money
  /** Final total amount to be paid */
  total: Money
  /** Total weight of all items (if applicable) */
  weight: Maybe<Scalars['Float']['output']>
}

/**
 * A category represents a hierarchical classification of products
 * in the store's catalog
 */
export type Category = {
  __typename?: 'Category'
  /** List of subcategories under this category */
  children: Array<Category>
  /** Timestamp when the category was created */
  createdAt: Scalars['Time']['output']
  /** Detailed description of the category */
  description: Maybe<Scalars['String']['output']>
  /** Unique identifier for the category */
  id: Scalars['ID']['output']
  /** Featured image for the category */
  image: Maybe<Image>
  /** Whether this category is currently visible in the storefront */
  isActive: Scalars['Boolean']['output']
  /** Display name of the category */
  name: Scalars['String']['output']
  /** Parent category if this is a subcategory */
  parent: Maybe<Category>
  /** Products assigned to this category */
  products: Array<Product>
  /** Search engine optimization metadata */
  seo: Maybe<Seo>
  /** URL-friendly version of the category name */
  slug: Scalars['String']['output']
  /** Position for sorting in category lists */
  sortOrder: Maybe<Scalars['Int']['output']>
  /** Timestamp when the category was last modified */
  updatedAt: Scalars['Time']['output']
}

/** Category-based filter option with product counts */
export type CategoryFilter = {
  __typename?: 'CategoryFilter'
  /** Number of products in this category */
  count: Scalars['Int']['output']
  /** Category identifier */
  id: Scalars['ID']['output']
  /** Category name */
  name: Scalars['String']['output']
}

/**
 * A node in the category hierarchy tree, representing a category
 * with its children and metadata
 */
export type CategoryTreeNode = {
  __typename?: 'CategoryTreeNode'
  /** The category data for this node */
  category: Category
  /** Child categories in the hierarchy */
  children: Array<CategoryTreeNode>
  /** Depth level in the hierarchy (root = 0) */
  level: Scalars['Int']['output']
  /** Number of products in this category and all subcategories */
  productCount: Scalars['Int']['output']
}

export type CheckoutCustomer = {
  __typename?: 'CheckoutCustomer'
  billingAddress: Maybe<Address>
  email: Scalars['String']['output']
  firstName: Maybe<Scalars['String']['output']>
  id: Maybe<Scalars['ID']['output']>
  isGuest: Scalars['Boolean']['output']
  lastName: Maybe<Scalars['String']['output']>
  phone: Maybe<Scalars['String']['output']>
  shippingAddress: Maybe<Address>
}

/**
 * CheckoutCustomerInput provides customer details for checkout.
 * Can be used for both guest and authenticated checkout flows.
 */
export type CheckoutCustomerInput = {
  /** Billing address for payment. Can be different from shipping address. */
  billingAddress?: InputMaybe<AddressInput>
  /** Customer's email address. Required for order confirmation and tracking. */
  email: Scalars['String']['input']
  /** Customer's first name. Optional but recommended. */
  firstName?: InputMaybe<Scalars['String']['input']>
  /** True for guest checkout, false for authenticated users. Default: true */
  isGuest?: InputMaybe<Scalars['Boolean']['input']>
  /** Customer's last name. Optional but recommended. */
  lastName?: InputMaybe<Scalars['String']['input']>
  /** Contact phone number. Optional but useful for delivery coordination. */
  phone?: InputMaybe<Scalars['String']['input']>
  /** Shipping address for delivery. Required for physical products. */
  shippingAddress?: InputMaybe<AddressInput>
}

export type CheckoutPayment = {
  __typename?: 'CheckoutPayment'
  clientSecret: Scalars['String']['output']
  intentId: Scalars['String']['output']
  methods: Array<PaymentMethod>
  selectedMethod: Maybe<PaymentMethod>
  status: PaymentStatus
}

export type CheckoutSession = {
  __typename?: 'CheckoutSession'
  cart: Cart
  cartId: Scalars['ID']['output']
  createdAt: Scalars['Time']['output']
  customer: Maybe<CheckoutCustomer>
  expiresAt: Scalars['Time']['output']
  id: Scalars['ID']['output']
  payment: Maybe<CheckoutPayment>
  shipping: Maybe<CheckoutShipping>
  status: CheckoutStatus
  totals: CheckoutTotals
  updatedAt: Scalars['Time']['output']
}

export type CheckoutShipping = {
  __typename?: 'CheckoutShipping'
  address: Address
  cost: Money
  estimatedDays: Maybe<Scalars['Int']['output']>
  method: ShippingMethod
  trackingNumber: Maybe<Scalars['String']['output']>
}

/** CheckoutShippingInput specifies shipping method and delivery address. */
export type CheckoutShippingInput = {
  /** Delivery address. Must be complete and valid for shipping calculation. */
  address: AddressInput
  /** ID of the selected shipping method. Example: "standard", "express", "next-day"  */
  methodId: Scalars['ID']['input']
}

export const enum CheckoutStatus {
  CANCELLED = 'CANCELLED',
  COMPLETED = 'COMPLETED',
  DRAFT = 'DRAFT',
  EXPIRED = 'EXPIRED',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCEEDED = 'PAYMENT_SUCCEEDED',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
}

export type CheckoutTotals = {
  __typename?: 'CheckoutTotals'
  currency: Scalars['String']['output']
  discount: Money
  shipping: Money
  subtotal: Money
  tax: Money
  total: Money
}

export type CheckoutValidationError = {
  __typename?: 'CheckoutValidationError'
  code: Scalars['String']['output']
  field: Scalars['String']['output']
  message: Scalars['String']['output']
}

/**
 * ClearCartResponse returns the result of clearing all cart items.
 * Includes the empty cart.
 */
export type ClearCartResponse = {
  __typename?: 'ClearCartResponse'
  /** The empty cart. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** True if the cart was cleared successfully */
  success: Scalars['Boolean']['output']
}

/**
 * A collection is a curated group of products that can be used
 * for seasonal promotions, themes, or special offers
 */
export type Collection = {
  __typename?: 'Collection'
  /** Timestamp when the collection was created */
  createdAt: Scalars['Time']['output']
  /** Detailed description of the collection */
  description: Maybe<Scalars['String']['output']>
  /** Unique identifier for the collection */
  id: Scalars['ID']['output']
  /** Featured image for the collection */
  image: Maybe<Image>
  /** Whether this collection is currently visible in the storefront */
  isActive: Scalars['Boolean']['output']
  /** Display name of the collection */
  name: Scalars['String']['output']
  /** Products included in this collection */
  products: Array<Product>
  /** Search engine optimization metadata */
  seo: Maybe<Seo>
  /** URL-friendly version of the collection name */
  slug: Scalars['String']['output']
  /** Position for sorting in collection lists */
  sortOrder: Maybe<Scalars['Int']['output']>
  /** Timestamp when the collection was last modified */
  updatedAt: Scalars['Time']['output']
}

/** Collection-based filter option with product counts */
export type CollectionFilter = {
  __typename?: 'CollectionFilter'
  /** Number of products in this collection */
  count: Scalars['Int']['output']
  /** Collection identifier */
  id: Scalars['ID']['output']
  /** Collection name */
  name: Scalars['String']['output']
}

/** CouponSource indicates how a coupon was applied to the cart. */
export const enum CouponSource {
  /** System automatically applied the promotion */
  AUTO = 'AUTO',
  /** User manually entered and applied the coupon */
  MANUAL = 'MANUAL',
}

/**
 * CreateCartInput creates a new shopping cart for a user session.
 * Either for authenticated users or guest sessions.
 */
export type CreateCartInput = {
  /** Optional metadata for custom cart properties. Example: {"source": "mobile_app"} */
  metadata?: InputMaybe<Scalars['JSON']['input']>
  /** Session ID to associate the cart with. Required for session tracking. */
  sessionId: Scalars['ID']['input']
  /** User ID for authenticated users. Null for guest carts. */
  userId?: InputMaybe<Scalars['ID']['input']>
}

/**
 * CreateCartResponse returns the result of cart creation operation.
 * Contains the newly created cart or error information.
 */
export type CreateCartResponse = {
  __typename?: 'CreateCartResponse'
  /** The newly created shopping cart. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** True if the cart was created successfully */
  success: Scalars['Boolean']['output']
}

/**
 * CreateCheckoutInput initiates a new checkout session from a cart.
 * Validates cart contents and creates a checkout workflow.
 */
export type CreateCheckoutInput = {
  /** ID of the cart to checkout. Cart must have items and be valid. */
  cartId: Scalars['ID']['input']
  /** Customer information for the checkout. Required for guest checkout. */
  customer?: InputMaybe<CheckoutCustomerInput>
  /** Optional metadata for the checkout session. Example: {"affiliate_id": "123"} */
  metadata?: InputMaybe<Scalars['JSON']['input']>
  /** Shipping information including method and address */
  shipping?: InputMaybe<CheckoutShippingInput>
}

/**
 * CreateCheckoutResponse returns the result of checkout creation.
 * Includes the checkout session with initial state.
 */
export type CreateCheckoutResponse = {
  __typename?: 'CreateCheckoutResponse'
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The checkout session with cart, customer, and shipping details. Null if operation failed. */
  session: Maybe<CheckoutSession>
  /** True if the checkout was created successfully */
  success: Scalars['Boolean']['output']
}

/**
 * CreateOrderInput finalizes a checkout and creates an order.
 * Called after successful payment to complete the purchase.
 */
export type CreateOrderInput = {
  /** Optional order metadata. Example: {"gift_message": "Happy Birthday!"} */
  metadata?: InputMaybe<Scalars['JSON']['input']>
  /** Checkout session ID to create order from. Must have successful payment. */
  sessionId: Scalars['ID']['input']
}

/**
 * CreateOrderResponse returns the result of order creation.
 * Finalizes the checkout and creates a confirmed order.
 */
export type CreateOrderResponse = {
  __typename?: 'CreateOrderResponse'
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The created order with order number and details. Null if operation failed. */
  order: Maybe<Order>
  /** True if the order was created successfully */
  success: Scalars['Boolean']['output']
}

/** DeliveryType represents the type of delivery method. */
export const enum DeliveryType {
  /** Home delivery to customer's address */
  HOME_DELIVERY = 'HOME_DELIVERY',
  /** Delivery to a parcel box/locker */
  PARCEL_BOX = 'PARCEL_BOX',
  /** Pickup from a designated pickup point */
  PICKUP_POINT = 'PICKUP_POINT',
}

/** DiscountType defines the different types of discounts available. */
export const enum DiscountType {
  /** Buy X get Y discount (e.g., buy 2 get 1 free) */
  BUY_X_GET_Y = 'BUY_X_GET_Y',
  /** Fixed amount discount (e.g., $5 off) */
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  /** Free shipping discount */
  FREE_SHIPPING = 'FREE_SHIPPING',
  /** Percentage-based discount (e.g., 10% off) */
  PERCENTAGE = 'PERCENTAGE',
}

/** DiscountValue contains the value details for a discount. */
export type DiscountValue = {
  __typename?: 'DiscountValue'
  /** Currency code (for fixed amount discounts) */
  currency: Maybe<Scalars['String']['output']>
  /** Type of discount */
  type: DiscountType
  /** Numeric value (percentage or amount) */
  value: Scalars['Float']['output']
}

/**
 * Error represents a structured error with code and message.
 * Includes optional field information for validation errors.
 */
export type Error = {
  __typename?: 'Error'
  /** Machine-readable error code. Example: "PRODUCT_NOT_FOUND", "VALIDATION_ERROR"  */
  code: Scalars['String']['output']
  /** Optional field name for validation errors. Example: "email", "quantity"  */
  field: Maybe<Scalars['String']['output']>
  /** Human-readable error message describing the issue */
  message: Scalars['String']['output']
}

/**
 * Image represents a product or content image with metadata.
 * Includes URL, dimensions, and accessibility information.
 */
export type Image = {
  __typename?: 'Image'
  /** Alternative text for accessibility and SEO. Describes the image content. */
  altText: Maybe<Scalars['String']['output']>
  /** Image height in pixels. Used for responsive image rendering. */
  height: Maybe<Scalars['Int']['output']>
  /** Unique identifier for the image */
  id: Scalars['ID']['output']
  /** Absolute URL to the image resource. Example: "https://cdn.example.com/images/product.jpg"  */
  url: Scalars['String']['output']
  /** Image width in pixels. Used for responsive image rendering. */
  width: Maybe<Scalars['Int']['output']>
}

/**
 * MergeCartsInput combines two shopping carts.
 * Typically used when a guest user logs in and has an existing cart.
 */
export type MergeCartsInput = {
  /** Strategy for handling duplicate items during merge */
  mergeStrategy: CartMergeStrategy
  /** ID of the cart to merge from (will be emptied or deleted) */
  sourceCartId: Scalars['ID']['input']
  /** ID of the cart to merge into (will contain the result) */
  targetCartId: Scalars['ID']['input']
}

/**
 * MergeCartsResponse returns the result of merging two carts.
 * Includes the merged cart with combined items.
 */
export type MergeCartsResponse = {
  __typename?: 'MergeCartsResponse'
  /** The merged cart containing items from both carts. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** True if the carts were merged successfully */
  success: Scalars['Boolean']['output']
}

/**
 * Money represents a monetary value with currency information.
 * The amount is stored in the smallest currency unit (e.g., cents for USD).
 * Example: $99.99 USD is represented as {amount: 9999, currencyCode: "USD"}
 */
export type Money = {
  __typename?: 'Money'
  /** Amount in the smallest currency unit (e.g., cents). Example: 9999 for $99.99 */
  amount: Scalars['Int']['output']
  /** ISO 4217 currency code. Example: "USD", "EUR", "GBP"  */
  currencyCode: Scalars['String']['output']
}

export type Mutation = {
  __typename?: 'Mutation'
  /** Add an item to the cart */
  addToCart: AddToCartResponse
  /** Apply a discount code or coupon to the cart */
  applyDiscount: ApplyDiscountResponse
  /** Clear all items from a cart */
  clearCart: ClearCartResponse
  /** Create a new shopping cart */
  createCart: CreateCartResponse
  createCheckout: CreateCheckoutResponse
  createOrder: CreateOrderResponse
  /** Merge a guest cart with an authenticated user's cart */
  mergeCarts: MergeCartsResponse
  processPayment: ProcessPaymentResponse
  /** Remove a previously applied discount */
  removeDiscount: RemoveDiscountResponse
  /** Remove an item from the cart */
  removeFromCart: RemoveFromCartResponse
  /** Set or change the shipping method for the cart */
  setShippingMethod: SetShippingMethodResponse
  /** Update quantity or details of an existing cart item */
  updateCartItem: UpdateCartItemResponse
  updateCheckoutCustomer: UpdateCheckoutCustomerResponse
  updateCheckoutShipping: UpdateCheckoutShippingResponse
  validateCheckout: ValidateCheckoutResponse
}

export type MutationAddToCartArgs = {
  input: AddToCartInput
}

export type MutationApplyDiscountArgs = {
  input: ApplyDiscountInput
}

export type MutationClearCartArgs = {
  cartId: Scalars['ID']['input']
}

export type MutationCreateCartArgs = {
  input: CreateCartInput
}

export type MutationCreateCheckoutArgs = {
  input: CreateCheckoutInput
}

export type MutationCreateOrderArgs = {
  input: CreateOrderInput
}

export type MutationMergeCartsArgs = {
  input: MergeCartsInput
}

export type MutationProcessPaymentArgs = {
  input: ProcessPaymentInput
}

export type MutationRemoveDiscountArgs = {
  input: RemoveDiscountInput
}

export type MutationRemoveFromCartArgs = {
  input: RemoveFromCartInput
}

export type MutationSetShippingMethodArgs = {
  input: SetShippingMethodInput
}

export type MutationUpdateCartItemArgs = {
  input: UpdateCartItemInput
}

export type MutationUpdateCheckoutCustomerArgs = {
  input: UpdateCheckoutCustomerInput
}

export type MutationUpdateCheckoutShippingArgs = {
  input: UpdateCheckoutShippingInput
}

export type MutationValidateCheckoutArgs = {
  input: ValidateCheckoutInput
}

export type Order = {
  __typename?: 'Order'
  appliedCoupons: Array<AppliedCoupon>
  billing: Maybe<OrderBilling>
  createdAt: Scalars['Time']['output']
  customerEmail: Scalars['String']['output']
  customerId: Maybe<Scalars['ID']['output']>
  id: Scalars['ID']['output']
  items: Array<OrderItem>
  metadata: Maybe<Scalars['JSON']['output']>
  orderNumber: Scalars['String']['output']
  payment: Maybe<OrderPayment>
  shipping: Maybe<OrderShipping>
  status: OrderStatus
  totals: OrderTotals
  tracking: Maybe<OrderTracking>
  updatedAt: Scalars['Time']['output']
}

export type OrderBilling = {
  __typename?: 'OrderBilling'
  address: Address
  company: Maybe<Scalars['String']['output']>
  taxId: Maybe<Scalars['String']['output']>
}

export type OrderItem = {
  __typename?: 'OrderItem'
  appliedDiscounts: Array<AppliedItemDiscount>
  discounts: Array<OrderItemDiscount>
  id: Scalars['ID']['output']
  product: Product
  productId: Scalars['ID']['output']
  quantity: Scalars['Int']['output']
  totalPrice: Money
  unitPrice: Money
  variant: Maybe<ProductVariant>
  variantId: Maybe<Scalars['ID']['output']>
}

export type OrderItemDiscount = {
  __typename?: 'OrderItemDiscount'
  amount: Money
  appliedAt: Scalars['Time']['output']
  couponCode: Maybe<Scalars['String']['output']>
  description: Scalars['String']['output']
  discountId: Scalars['ID']['output']
  id: Scalars['ID']['output']
  isActive: Scalars['Boolean']['output']
}

export type OrderPayment = {
  __typename?: 'OrderPayment'
  amount: Money
  currency: Scalars['String']['output']
  id: Scalars['ID']['output']
  method: PaymentMethod
  processedAt: Maybe<Scalars['Time']['output']>
  status: PaymentStatus
  transactionId: Maybe<Scalars['String']['output']>
}

export type OrderShipping = {
  __typename?: 'OrderShipping'
  address: Address
  cost: Money
  estimatedDelivery: Maybe<Scalars['Time']['output']>
  method: ShippingMethod
  status: ShippingStatus
  trackingNumber: Maybe<Scalars['String']['output']>
}

export const enum OrderStatus {
  CANCELLED = 'CANCELLED',
  CONFIRMED = 'CONFIRMED',
  DELIVERED = 'DELIVERED',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  REFUNDED = 'REFUNDED',
  RETURNED = 'RETURNED',
  SHIPPED = 'SHIPPED',
}

export type OrderStatusHistory = {
  __typename?: 'OrderStatusHistory'
  note: Maybe<Scalars['String']['output']>
  status: OrderStatus
  timestamp: Scalars['Time']['output']
  updatedBy: Maybe<Scalars['String']['output']>
}

export type OrderTotals = {
  __typename?: 'OrderTotals'
  currency: Scalars['String']['output']
  discount: Money
  shipping: Money
  subtotal: Money
  tax: Money
  total: Money
}

export type OrderTracking = {
  __typename?: 'OrderTracking'
  estimatedDelivery: Maybe<Scalars['Time']['output']>
  history: Array<OrderStatusHistory>
  status: OrderStatus
  trackingNumber: Maybe<Scalars['String']['output']>
  trackingUrl: Maybe<Scalars['String']['output']>
}

/**
 * PaginationInfo provides metadata about paginated results.
 * Includes current page information and navigation flags.
 */
export type PaginationInfo = {
  __typename?: 'PaginationInfo'
  /** True if there is a next page available */
  hasNext: Scalars['Boolean']['output']
  /** True if there is a previous page available */
  hasPrev: Scalars['Boolean']['output']
  /** Number of items per page */
  limit: Scalars['Int']['output']
  /** Current page number (1-based) */
  page: Scalars['Int']['output']
  /** Total number of items across all pages */
  total: Scalars['Int']['output']
  /** Total number of pages available */
  totalPages: Scalars['Int']['output']
}

/**
 * PaginationInput controls pagination and sorting for list queries.
 * Supports offset-based pagination with configurable page size and sorting.
 */
export type PaginationInput = {
  /** Number of items per page. Maximum: 100. Default: 20 */
  limit?: InputMaybe<Scalars['Int']['input']>
  /** Page number, starting from 1. Default: 1 */
  page?: InputMaybe<Scalars['Int']['input']>
  /** Field name to sort by. Example: "name", "createdAt", "price"  */
  sortBy?: InputMaybe<Scalars['String']['input']>
  /** Sort direction. Default: ASC */
  sortOrder?: InputMaybe<SortOrder>
}

/** ParcelBox represents a parcel locker or automated pickup box. */
export type ParcelBox = {
  __typename?: 'ParcelBox'
  /** Address of the parcel box */
  address: Address
  /** Unique parcel box identifier */
  id: Scalars['ID']['output']
  /** Availability status */
  isAvailable: Scalars['Boolean']['output']
  /** Name of the parcel box location */
  name: Scalars['String']['output']
  /** Box size (small, medium, large) */
  size: Scalars['String']['output']
}

/** ParcelBoxInput for parcel box delivery. */
export type ParcelBoxInput = {
  /** ID of the parcel box */
  id: Scalars['ID']['input']
}

export type PaymentMethod = {
  __typename?: 'PaymentMethod'
  description: Maybe<Scalars['String']['output']>
  id: Scalars['ID']['output']
  isActive: Scalars['Boolean']['output']
  metadata: Maybe<Scalars['JSON']['output']>
  name: Scalars['String']['output']
  type: PaymentMethodType
}

export const enum PaymentMethodType {
  APPLE_PAY = 'APPLE_PAY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CREDIT_CARD = 'CREDIT_CARD',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
  DEBIT_CARD = 'DEBIT_CARD',
  GOOGLE_PAY = 'GOOGLE_PAY',
  PAYPAL = 'PAYPAL',
}

export const enum PaymentStatus {
  CANCELLED = 'CANCELLED',
  FAILED = 'FAILED',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  REQUIRES_ACTION = 'REQUIRES_ACTION',
  SUCCEEDED = 'SUCCEEDED',
}

/** PickupPoint represents a pickup location (store, post office, etc.). */
export type PickupPoint = {
  __typename?: 'PickupPoint'
  /** Address of the pickup point */
  address: Address
  /** Contact information */
  contactInfo: Maybe<Scalars['String']['output']>
  /** Operating hours */
  hours: Maybe<Scalars['String']['output']>
  /** Unique pickup point identifier */
  id: Scalars['ID']['output']
  /** Name of the pickup point */
  name: Scalars['String']['output']
}

/** PickupPointInput for pickup point delivery. */
export type PickupPointInput = {
  /** ID of the pickup point */
  id: Scalars['ID']['input']
}

/** Price range filter showing the available price spectrum */
export type PriceRangeFilter = {
  __typename?: 'PriceRangeFilter'
  /** Maximum price in the current results */
  max: Scalars['Int']['output']
  /** Minimum price in the current results */
  min: Scalars['Int']['output']
}

export type PriceRangeInput = {
  max?: InputMaybe<Scalars['Int']['input']>
  min?: InputMaybe<Scalars['Int']['input']>
}

/**
 * ProcessPaymentInput initiates payment processing for a checkout.
 * Integrates with payment gateway to authorize or capture payment.
 */
export type ProcessPaymentInput = {
  /** Optional payment metadata. Example: {"payment_token": "tok_xyz"} */
  metadata?: InputMaybe<Scalars['JSON']['input']>
  /** ID of the payment method to use. Example: "stripe", "paypal", "credit_card"  */
  paymentMethodId: Scalars['ID']['input']
  /** Checkout session ID to process payment for */
  sessionId: Scalars['ID']['input']
}

/**
 * ProcessPaymentResponse returns the result of payment processing.
 * Includes the checkout session and payment details after authorization.
 */
export type ProcessPaymentResponse = {
  __typename?: 'ProcessPaymentResponse'
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The payment details including status and transaction ID. Null if operation failed. */
  payment: Maybe<CheckoutPayment>
  /** The checkout session after payment processing. Null if operation failed. */
  session: Maybe<CheckoutSession>
  /** True if the payment was processed successfully */
  success: Scalars['Boolean']['output']
}

/**
 * A product represents a unique item in the store's catalog. It can be either a physical
 * or digital good that can be purchased by customers.
 */
export type Product = {
  __typename?: 'Product'
  /** The standard selling price of the product */
  basePrice: Money
  /** The primary category this product belongs to */
  category: Maybe<Category>
  /** Collections this product is part of */
  collections: Array<Collection>
  /** Original or MSRP price for comparison */
  compareAtPrice: Maybe<Money>
  /** The cost to acquire or produce the product */
  costPrice: Maybe<Money>
  /** Timestamp when the product was first created */
  createdAt: Scalars['Time']['output']
  /** Full description of the product in HTML format */
  description: Maybe<Scalars['String']['output']>
  /** Physical dimensions of the product */
  dimensions: Maybe<ProductDimensions>
  /** Unique identifier for the product */
  id: Scalars['ID']['output']
  /** List of product images in display order */
  images: Array<Image>
  /** Stock and inventory tracking information */
  inventory: Maybe<ProductInventory>
  /** Whether the product is currently available for purchase */
  isActive: Scalars['Boolean']['output']
  /** Indicates if the product is a digital download rather than physical item */
  isDigital: Scalars['Boolean']['output']
  /** Maximum price across all variants (if product has variants) */
  maxPrice: Maybe<Money>
  /** Minimum price across all variants (if product has variants) */
  minPrice: Maybe<Money>
  /** The display name of the product */
  name: Scalars['String']['output']
  /** Configurable options for this product */
  options: Array<ProductOptionGroup>
  /** The purchase price (cost to acquire) for margin calculation */
  purchasePrice: Maybe<Money>
  /** Search engine optimization metadata */
  seo: Maybe<Seo>
  /** Brief summary of the product */
  shortDescription: Maybe<Scalars['String']['output']>
  /** Stock keeping unit - unique product identifier code */
  sku: Scalars['String']['output']
  /** URL-friendly version of the product name */
  slug: Scalars['String']['output']
  /** Keywords or labels associated with the product */
  tags: Array<Scalars['String']['output']>
  /** Timestamp when the product was last modified */
  updatedAt: Scalars['Time']['output']
  /** Available variations of the product */
  variants: Array<ProductVariant>
  /** Weight of the product in the default unit (typically grams) */
  weight: Maybe<Scalars['Float']['output']>
}

/** Physical dimensions of a product, used for shipping calculations and display */
export type ProductDimensions = {
  __typename?: 'ProductDimensions'
  /** Height of the product in the specified unit */
  height: Maybe<Scalars['Float']['output']>
  /** Length of the product in the specified unit */
  length: Maybe<Scalars['Float']['output']>
  /** Unit of measurement (e.g., cm, inches) */
  unit: Maybe<Scalars['String']['output']>
  /** Width of the product in the specified unit */
  width: Maybe<Scalars['Float']['output']>
}

/**
 * ProductFilterInput filters product listings by various criteria.
 * Supports category, collection, price range, and availability filtering.
 */
export type ProductFilterInput = {
  /** Filter by category slug. Example: "electronics", "clothing"  */
  category?: InputMaybe<Scalars['String']['input']>
  /** Filter by collection slug. Example: "summer-sale", "new-arrivals"  */
  collection?: InputMaybe<Scalars['String']['input']>
  /** Filter to only show in-stock products when true */
  inStock?: InputMaybe<Scalars['Boolean']['input']>
  /** Filter to only show active products when true */
  isActive?: InputMaybe<Scalars['Boolean']['input']>
  /** Maximum price in smallest currency unit. Example: 50000 for $500.00 */
  priceMax?: InputMaybe<Scalars['Int']['input']>
  /** Minimum price in smallest currency unit. Example: 1000 for $10.00 */
  priceMin?: InputMaybe<Scalars['Int']['input']>
  /** Filter by product tags. Products must match all specified tags. */
  tags?: InputMaybe<Array<Scalars['String']['input']>>
}

/** Aggregated filter options available for the current search results */
export type ProductFilters = {
  __typename?: 'ProductFilters'
  /** Available category filters */
  categories: Array<CategoryFilter>
  /** Available collection filters */
  collections: Array<CollectionFilter>
  /** Available price range filter */
  priceRange: PriceRangeFilter
  /** Available tag filters */
  tags: Array<TagFilter>
}

/** Inventory tracking information for a product or variant */
export type ProductInventory = {
  __typename?: 'ProductInventory'
  /** Whether orders can be placed when out of stock */
  allowBackorder: Scalars['Boolean']['output']
  /** Barcode or UPC for the item */
  barcode: Maybe<Scalars['String']['output']>
  /** Current stock level (null if not tracking quantity) */
  quantity: Maybe<Scalars['Int']['output']>
  /** Stock keeping unit for inventory tracking */
  sku: Maybe<Scalars['String']['output']>
  /** Whether stock levels should be tracked for this item */
  trackQuantity: Scalars['Boolean']['output']
}

/**
 * An individual option selection for a product variant
 * (e.g., "Color: Blue" or "Size: Large")
 */
export type ProductOption = {
  __typename?: 'ProductOption'
  /** Unique identifier for this option */
  id: Scalars['ID']['output']
  /** Name of the option (e.g., 'Color', 'Size') */
  name: Scalars['String']['output']
  /** Selected value for this option (e.g., 'Blue', 'Large') */
  value: Scalars['String']['output']
}

/**
 * A group of available options for a product
 * (e.g., all available colors or sizes)
 */
export type ProductOptionGroup = {
  __typename?: 'ProductOptionGroup'
  /** Name of the option group (e.g., 'Color', 'Size') */
  name: Scalars['String']['output']
  /** List of all possible values for this option */
  values: Array<Scalars['String']['output']>
}

/**
 * Input parameters for searching and filtering products
 * in the catalog
 */
export type ProductSearchInput = {
  /** Filter by category slug */
  category?: InputMaybe<Scalars['String']['input']>
  /** Filter by collection slug */
  collection?: InputMaybe<Scalars['String']['input']>
  /** Filter for products in stock */
  inStock?: InputMaybe<Scalars['Boolean']['input']>
  /** Pagination parameters */
  pagination?: InputMaybe<PaginationInput>
  /** Maximum price filter */
  priceMax?: InputMaybe<Scalars['Int']['input']>
  /** Minimum price filter */
  priceMin?: InputMaybe<Scalars['Int']['input']>
  /** Text to search for in product names and descriptions */
  query?: InputMaybe<Scalars['String']['input']>
  /** How to sort the results */
  sortBy?: InputMaybe<ProductSortBy>
  /** Direction of the sort */
  sortOrder?: InputMaybe<SortOrder>
  /** Filter by product tags */
  tags?: InputMaybe<Array<Scalars['String']['input']>>
}

/**
 * Response type for product search operations, including results
 * and available filters
 */
export type ProductSearchResponse = {
  __typename?: 'ProductSearchResponse'
  /** Available filters based on the current results */
  filters: ProductFilters
  /** Pagination information for the results */
  pagination: PaginationInfo
  /** List of products matching the search criteria */
  products: Array<Product>
  /** Total number of products matching the criteria */
  total: Scalars['Int']['output']
}

/** Available sorting options for product search results */
export const enum ProductSortBy {
  /** Sort alphabetically by name */
  ALPHABETICAL = 'ALPHABETICAL',
  /** Sort by number of sales */
  BEST_SELLING = 'BEST_SELLING',
  /** Sort by creation date, newest first */
  NEWEST = 'NEWEST',
  /** Sort by creation date, oldest first */
  OLDEST = 'OLDEST',
  /** Sort by price, highest first */
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  /** Sort by price, lowest first */
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  /** Sort by search relevance score */
  RELEVANCE = 'RELEVANCE',
}

/**
 * A specific variation of a product, with its own unique combination of options,
 * price, and inventory tracking
 */
export type ProductVariant = {
  __typename?: 'ProductVariant'
  /** Original or MSRP price for comparison */
  compareAtPrice: Maybe<Money>
  /** Cost to acquire or produce this variant */
  costPrice: Maybe<Money>
  /** Timestamp when the variant was created */
  createdAt: Scalars['Time']['output']
  /** Physical dimensions specific to this variant */
  dimensions: Maybe<ProductDimensions>
  /** Unique identifier for the variant */
  id: Scalars['ID']['output']
  /** Images specific to this variant */
  images: Array<Image>
  /** Stock and inventory tracking for this variant */
  inventory: Maybe<ProductInventory>
  /** Whether this variant is available for purchase */
  isActive: Scalars['Boolean']['output']
  /** Display name of this variant */
  name: Scalars['String']['output']
  /** Selected options that define this variant */
  options: Array<ProductOption>
  /** Selling price specific to this variant */
  price: Money
  /** Stock keeping unit - unique identifier code for this variant */
  sku: Scalars['String']['output']
  /** URL-friendly version of the variant name */
  slug: Scalars['String']['output']
  /** Timestamp when the variant was last modified */
  updatedAt: Scalars['Time']['output']
  /** Weight of this variant in the default unit */
  weight: Maybe<Scalars['Float']['output']>
}

export type Query = {
  __typename?: 'Query'
  /** Get a cart by its unique identifier */
  cart: Maybe<Cart>
  /** List carts for a user or session */
  carts: Array<Cart>
  /** List categories with optional pagination */
  categories: Array<Category>
  /** Get a single category by ID or slug */
  category: Maybe<Category>
  /** Get the complete category tree hierarchy with optional filtering */
  categoryTree: Array<CategoryTreeNode>
  checkoutSession: Maybe<CheckoutSession>
  /** Get a single collection by ID or slug */
  collection: Maybe<Collection>
  /** List collections with optional pagination */
  collections: Array<Collection>
  order: Maybe<Order>
  orderByNumber: Maybe<Order>
  orders: Array<Order>
  /** Get available parcel boxes for an address */
  parcelBoxes: Array<ParcelBox>
  /** Get available pickup points for an address */
  pickupPoints: Array<PickupPoint>
  /** Get a single product by ID or slug, optionally with a specific variant */
  product: Maybe<Product>
  /** List products with optional pagination and filtering */
  products: Array<Product>
  /** Search products by fulltext, category, collection, or other criteria */
  searchProducts: ProductSearchResponse
  /** Get shipping methods for a specific provider */
  shippingMethods: Array<ShippingMethod>
  /** Get all available shipping providers */
  shippingProviders: Array<ShippingProvider>
}

export type QueryCartArgs = {
  id: Scalars['ID']['input']
}

export type QueryCartsArgs = {
  sessionId?: InputMaybe<Scalars['ID']['input']>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type QueryCategoriesArgs = {
  pagination?: InputMaybe<PaginationInput>
}

export type QueryCategoryArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type QueryCategoryTreeArgs = {
  includeCounts?: InputMaybe<Scalars['Boolean']['input']>
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>
  maxDepth?: InputMaybe<Scalars['Int']['input']>
  rootSlug?: InputMaybe<Scalars['String']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}

export type QueryCheckoutSessionArgs = {
  id: Scalars['ID']['input']
}

export type QueryCollectionArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
}

export type QueryCollectionsArgs = {
  pagination?: InputMaybe<PaginationInput>
}

export type QueryOrderArgs = {
  id: Scalars['ID']['input']
}

export type QueryOrderByNumberArgs = {
  orderNumber: Scalars['String']['input']
}

export type QueryOrdersArgs = {
  customerEmail?: InputMaybe<Scalars['String']['input']>
  pagination?: InputMaybe<PaginationInput>
  userId?: InputMaybe<Scalars['ID']['input']>
}

export type QueryParcelBoxesArgs = {
  address: AddressInput
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type QueryPickupPointsArgs = {
  address: AddressInput
  limit?: InputMaybe<Scalars['Int']['input']>
}

export type QueryProductArgs = {
  id?: InputMaybe<Scalars['ID']['input']>
  slug?: InputMaybe<Scalars['String']['input']>
  variantSlug?: InputMaybe<Scalars['String']['input']>
}

export type QueryProductsArgs = {
  filter?: InputMaybe<ProductFilterInput>
  pagination?: InputMaybe<PaginationInput>
}

export type QuerySearchProductsArgs = {
  input: ProductSearchInput
}

export type QueryShippingMethodsArgs = {
  providerId: Scalars['ID']['input']
}

/** RemoveDiscountInput removes a previously applied discount from the cart. */
export type RemoveDiscountInput = {
  /** ID of the cart to remove the discount from */
  cartId: Scalars['ID']['input']
  /** ID of the applied discount to remove */
  discountId: Scalars['ID']['input']
}

/**
 * RemoveDiscountResponse returns the result of removing a discount.
 * Includes the updated cart without the discount.
 */
export type RemoveDiscountResponse = {
  __typename?: 'RemoveDiscountResponse'
  /** The updated cart without the discount. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** True if the discount was removed successfully */
  success: Scalars['Boolean']['output']
}

/** RemoveFromCartInput removes a specific item from the shopping cart. */
export type RemoveFromCartInput = {
  /** ID of the cart containing the item */
  cartId: Scalars['ID']['input']
  /** ID of the cart item to remove */
  itemId: Scalars['ID']['input']
}

/**
 * RemoveFromCartResponse returns the result of removing an item from cart.
 * Includes the updated cart after item removal.
 */
export type RemoveFromCartResponse = {
  __typename?: 'RemoveFromCartResponse'
  /** The updated shopping cart without the removed item. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** True if the item was removed successfully */
  success: Scalars['Boolean']['output']
}

/**
 * Search Engine Optimization metadata for products, categories,
 * and collections
 */
export type Seo = {
  __typename?: 'SEO'
  /** Meta description for search engines */
  description: Maybe<Scalars['String']['output']>
  /** Meta keywords for search engines */
  keywords: Array<Scalars['String']['output']>
  /** Meta title for search engines */
  title: Maybe<Scalars['String']['output']>
}

/**
 * Session represents a user's shopping session.
 * Tracks cart and user association with expiration handling.
 */
export type Session = {
  __typename?: 'Session'
  /** Associated shopping cart ID. Null if no cart created. */
  cartId: Maybe<Scalars['ID']['output']>
  /** Timestamp when the session was created */
  createdAt: Scalars['Time']['output']
  /** Timestamp when the session expires. Sessions are cleaned up after expiration. */
  expiresAt: Scalars['Time']['output']
  /** Unique session identifier. Used to track user activity. */
  id: Scalars['ID']['output']
  /** True if this is a guest session without user authentication */
  isGuest: Scalars['Boolean']['output']
  /** Associated user ID. Null for guest sessions. */
  userId: Maybe<Scalars['ID']['output']>
}

/**
 * SetShippingMethodInput selects a shipping method for the cart.
 * Calculates shipping costs based on the selected method and destination.
 */
export type SetShippingMethodInput = {
  /** ID of the cart to set shipping for */
  cartId: Scalars['ID']['input']
  /** Shipping destination (address, pickup point, or parcel box) */
  destination: ShippingDestinationInput
  /** ID of the shipping method to use. Example: "standard", "express"  */
  methodId: Scalars['ID']['input']
}

/**
 * SetShippingMethodResponse returns the result of setting a shipping method.
 * Includes the updated cart and shipping details with calculated costs.
 */
export type SetShippingMethodResponse = {
  __typename?: 'SetShippingMethodResponse'
  /** The updated cart with shipping method. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The shipping details with calculated costs. Null if operation failed. */
  shipping: Maybe<CartShipping>
  /** True if the shipping method was set successfully */
  success: Scalars['Boolean']['output']
}

/** ShippingAddress represents a home delivery address. */
export type ShippingAddress = {
  __typename?: 'ShippingAddress'
  /** Full delivery address */
  address: Address
  /** Contact person for delivery */
  contactName: Maybe<Scalars['String']['output']>
}

/** ShippingAddressInput for home delivery. */
export type ShippingAddressInput = {
  /** Delivery address */
  address: AddressInput
  /** Contact person for delivery */
  contactName?: InputMaybe<Scalars['String']['input']>
}

/**
 * ShippingDestination represents different types of shipping destinations.
 * Can be a home delivery address, pickup point, or parcel box.
 */
export type ShippingDestination = ParcelBox | PickupPoint | ShippingAddress

/** ShippingDestinationInput represents input for different shipping destination types. */
export type ShippingDestinationInput = {
  /** Home delivery address */
  address?: InputMaybe<ShippingAddressInput>
  /** Parcel box delivery */
  parcelBox?: InputMaybe<ParcelBoxInput>
  /** Pickup point delivery */
  pickupPoint?: InputMaybe<PickupPointInput>
}

/**
 * ShippingMethod represents a shipping option available for the cart.
 * Includes pricing, delivery estimates, provider info, and applicable zones.
 */
export type ShippingMethod = {
  __typename?: 'ShippingMethod'
  /** Base cost for this shipping method */
  cost: Money
  /** Delivery type for this method */
  deliveryType: DeliveryType
  /** Detailed description */
  description: Maybe<Scalars['String']['output']>
  /** Estimated delivery time in days */
  estimatedDays: Maybe<Scalars['Int']['output']>
  /** Unique shipping method identifier */
  id: Scalars['ID']['output']
  /** Whether this method is currently available */
  isActive: Scalars['Boolean']['output']
  /** Display name of the shipping method */
  name: Scalars['String']['output']
  /** Shipping provider offering this method */
  provider: ShippingProvider
  /** Shipping zones where this method is available */
  zones: Array<ShippingZone>
}

/** ShippingProvider represents a shipping carrier or service provider. */
export type ShippingProvider = {
  __typename?: 'ShippingProvider'
  /** Contact information */
  contactInfo: Maybe<Scalars['String']['output']>
  /** Provider description */
  description: Maybe<Scalars['String']['output']>
  /** Unique provider identifier */
  id: Scalars['ID']['output']
  /** Whether the provider is currently active */
  isActive: Scalars['Boolean']['output']
  /** Provider logo URL */
  logoUrl: Maybe<Scalars['String']['output']>
  /** Display name of the provider */
  name: Scalars['String']['output']
  /** Supported delivery types */
  supportedDeliveryTypes: Array<DeliveryType>
}

export const enum ShippingStatus {
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  IN_TRANSIT = 'IN_TRANSIT',
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  RETURNED = 'RETURNED',
  SHIPPED = 'SHIPPED',
}

/** ShippingZone defines a geographic area with specific shipping rates. */
export type ShippingZone = {
  __typename?: 'ShippingZone'
  /** Shipping cost for this zone */
  cost: Money
  /** List of country codes in this zone */
  countries: Array<Scalars['String']['output']>
  /** Unique zone identifier */
  id: Scalars['ID']['output']
  /** Display name of the zone */
  name: Scalars['String']['output']
}

/** SortOrder defines the direction for sorting results. */
export const enum SortOrder {
  /** Ascending order (A-Z, 0-9, oldest-newest) */
  ASC = 'ASC',
  /** Descending order (Z-A, 9-0, newest-oldest) */
  DESC = 'DESC',
}

/** Tag-based filter option with product counts */
export type TagFilter = {
  __typename?: 'TagFilter'
  /** Number of products with this tag */
  count: Scalars['Int']['output']
  /** Tag name */
  name: Scalars['String']['output']
}

/**
 * UpdateCartItemInput modifies the quantity of an existing cart item.
 * Can increase, decrease, or set quantity to a specific value.
 */
export type UpdateCartItemInput = {
  /** ID of the cart containing the item */
  cartId: Scalars['ID']['input']
  /** ID of the cart item to update */
  itemId: Scalars['ID']['input']
  /** Optional metadata to update on the cart item */
  metadata?: InputMaybe<Scalars['JSON']['input']>
  /** New quantity for the item. Must be positive. Set to 0 to remove. */
  quantity: Scalars['Int']['input']
}

/**
 * UpdateCartItemResponse returns the result of updating a cart item quantity.
 * Includes the updated cart and the modified item.
 */
export type UpdateCartItemResponse = {
  __typename?: 'UpdateCartItemResponse'
  /** The updated shopping cart. Null if operation failed. */
  cart: Maybe<Cart>
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The updated cart item with new quantity. Null if operation failed. */
  item: Maybe<CartItem>
  /** True if the item was updated successfully */
  success: Scalars['Boolean']['output']
}

/**
 * UpdateCheckoutCustomerInput updates customer information in an active checkout.
 * Used when customer modifies their details during checkout process.
 */
export type UpdateCheckoutCustomerInput = {
  /** Updated customer information */
  customer: CheckoutCustomerInput
  /** Checkout session ID to update */
  sessionId: Scalars['ID']['input']
}

/**
 * UpdateCheckoutCustomerResponse returns the result of updating customer information.
 * Includes the updated checkout session.
 */
export type UpdateCheckoutCustomerResponse = {
  __typename?: 'UpdateCheckoutCustomerResponse'
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The updated checkout session. Null if operation failed. */
  session: Maybe<CheckoutSession>
  /** True if the customer information was updated successfully */
  success: Scalars['Boolean']['output']
}

/**
 * UpdateCheckoutShippingInput modifies shipping details in an active checkout.
 * Recalculates shipping costs based on new method or address.
 */
export type UpdateCheckoutShippingInput = {
  /** Checkout session ID to update */
  sessionId: Scalars['ID']['input']
  /** Updated shipping information */
  shipping: CheckoutShippingInput
}

/**
 * UpdateCheckoutShippingResponse returns the result of updating shipping details.
 * Includes the updated checkout session and recalculated shipping costs.
 */
export type UpdateCheckoutShippingResponse = {
  __typename?: 'UpdateCheckoutShippingResponse'
  /** List of errors if the operation failed. Empty on success. */
  errors: Maybe<Array<Error>>
  /** The updated checkout session. Null if operation failed. */
  session: Maybe<CheckoutSession>
  /** The updated shipping details with recalculated costs. Null if operation failed. */
  shipping: Maybe<CheckoutShipping>
  /** True if the shipping details were updated successfully */
  success: Scalars['Boolean']['output']
}

/**
 * User represents a registered customer account.
 * Contains profile information and authentication details.
 */
export type User = {
  __typename?: 'User'
  /** Timestamp when the user account was created */
  createdAt: Scalars['Time']['output']
  /** User's email address. Used for authentication and notifications. */
  email: Scalars['String']['output']
  /** User's first name. Optional for guest users. */
  firstName: Maybe<Scalars['String']['output']>
  /** Unique user identifier */
  id: Scalars['ID']['output']
  /** True if this is a guest checkout user without full registration */
  isGuest: Scalars['Boolean']['output']
  /** User's last name. Optional for guest users. */
  lastName: Maybe<Scalars['String']['output']>
  /** Timestamp when the user account was last modified */
  updatedAt: Scalars['Time']['output']
}

/**
 * ValidateCheckoutInput validates a checkout session before payment.
 * Checks inventory, pricing, shipping, and all business rules.
 */
export type ValidateCheckoutInput = {
  /** Checkout session ID to validate */
  sessionId: Scalars['ID']['input']
}

/**
 * ValidateCheckoutResponse returns the result of checkout validation.
 * Checks inventory, pricing, shipping availability, and business rules.
 */
export type ValidateCheckoutResponse = {
  __typename?: 'ValidateCheckoutResponse'
  /** List of critical errors that prevent checkout. Empty if valid. */
  errors: Maybe<Array<Error>>
  /** True if the checkout is valid and ready for payment */
  isValid: Scalars['Boolean']['output']
  /** The checkout session that was validated. Null if operation failed. */
  session: Maybe<CheckoutSession>
  /** True if the validation completed successfully */
  success: Scalars['Boolean']['output']
  /** List of non-critical warnings that don't prevent checkout */
  warnings: Maybe<Array<Error>>
}

export type GetCartQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetCartQuery = {
  __typename?: 'Query'
  cart: {
    __typename?: 'Cart'
    id: string
    userId: string | null
    sessionId: string
    expiresAt: string | null
    createdAt: string
    updatedAt: string
    items: Array<{
      __typename?: 'CartItem'
      id: string
      productId: string
      variantId: string | null
      quantity: number
      addedAt: string
      updatedAt: string
      product: {
        __typename?: 'Product'
        id: string
        name: string
        slug: string
        basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
      }
      variant: {
        __typename?: 'ProductVariant'
        id: string
        sku: string
        name: string
        price: { __typename?: 'Money'; amount: number; currencyCode: string }
        images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
      } | null
      unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      appliedDiscounts: Array<{
        __typename?: 'AppliedItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
    }>
    totals: {
      __typename?: 'CartTotals'
      itemCount: number
      weight: number | null
      subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
      tax: { __typename?: 'Money'; amount: number; currencyCode: string }
      shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
      discount: { __typename?: 'Money'; amount: number; currencyCode: string }
      total: { __typename?: 'Money'; amount: number; currencyCode: string }
    }
    appliedCoupons: Array<{
      __typename?: 'AppliedCoupon'
      id: string
      couponCode: string
      discountId: string
      source: CouponSource
      appliedAt: string
      appliedBy: string | null
      isActive: boolean
      description: string | null
      includesFreeShipping: boolean
      discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
      shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    }>
    bookedGiftCards: Array<{
      __typename?: 'BookedGiftCard'
      code: string
      freeShipping: boolean
      bookedAt: string
      bookingExpiresAt: string
      bookedAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
      availableBalance: { __typename?: 'Money'; amount: number; currencyCode: string }
    }>
    shipping: {
      __typename?: 'CartShipping'
      estimatedDays: number | null
      trackingNumber: string | null
      method: {
        __typename?: 'ShippingMethod'
        id: string
        name: string
        description: string | null
        estimatedDays: number | null
        isActive: boolean
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
      destination:
        | {
            __typename: 'ParcelBox'
            id: string
            name: string
            size: string
            isAvailable: boolean
            address: {
              __typename?: 'Address'
              id: string | null
              firstName: string
              lastName: string
              company: string | null
              address1: string
              address2: string | null
              city: string
              province: string
              country: string
              zip: string
              phone: string | null
            }
          }
        | {
            __typename: 'PickupPoint'
            id: string
            name: string
            hours: string | null
            contactInfo: string | null
            address: {
              __typename?: 'Address'
              id: string | null
              firstName: string
              lastName: string
              company: string | null
              address1: string
              address2: string | null
              city: string
              province: string
              country: string
              zip: string
              phone: string | null
            }
          }
        | {
            __typename: 'ShippingAddress'
            contactName: string | null
            address: {
              __typename?: 'Address'
              id: string | null
              firstName: string
              lastName: string
              company: string | null
              address1: string
              address2: string | null
              city: string
              province: string
              country: string
              zip: string
              phone: string | null
            }
          }
        | null
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
  } | null
}

export type CreateCartMutationVariables = Exact<{
  input: CreateCartInput
}>

export type CreateCartMutation = {
  __typename?: 'Mutation'
  createCart: {
    __typename?: 'CreateCartResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      userId: string | null
      sessionId: string
      metadata: Record<string, unknown> | null
      expiresAt: string | null
      createdAt: string
      updatedAt: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        quantity: number
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type AddToCartMutationVariables = Exact<{
  input: AddToCartInput
}>

export type AddToCartMutation = {
  __typename?: 'Mutation'
  addToCart: {
    __typename?: 'AddToCartResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        variant: {
          __typename?: 'ProductVariant'
          id: string
          sku: string
          name: string
          price: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        } | null
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{
        __typename?: 'AppliedCoupon'
        id: string
        couponCode: string
        discountId: string
        source: CouponSource
        appliedAt: string
        appliedBy: string | null
        isActive: boolean
        description: string | null
        includesFreeShipping: boolean
        discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      }>
    } | null
    item: {
      __typename?: 'CartItem'
      id: string
      productId: string
      variantId: string | null
      quantity: number
      addedAt: string
      unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      appliedDiscounts: Array<{
        __typename?: 'AppliedItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type UpdateCartItemMutationVariables = Exact<{
  input: UpdateCartItemInput
}>

export type UpdateCartItemMutation = {
  __typename?: 'Mutation'
  updateCartItem: {
    __typename?: 'UpdateCartItemResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        variant: {
          __typename?: 'ProductVariant'
          id: string
          sku: string
          name: string
          price: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        } | null
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{
        __typename?: 'AppliedCoupon'
        id: string
        couponCode: string
        discountId: string
        source: CouponSource
        appliedAt: string
        appliedBy: string | null
        isActive: boolean
        description: string | null
        includesFreeShipping: boolean
        discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      }>
    } | null
    item: {
      __typename?: 'CartItem'
      id: string
      productId: string
      variantId: string | null
      quantity: number
      unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      appliedDiscounts: Array<{
        __typename?: 'AppliedItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type RemoveFromCartMutationVariables = Exact<{
  input: RemoveFromCartInput
}>

export type RemoveFromCartMutation = {
  __typename?: 'Mutation'
  removeFromCart: {
    __typename?: 'RemoveFromCartResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        variant: {
          __typename?: 'ProductVariant'
          id: string
          sku: string
          name: string
          price: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        } | null
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{
        __typename?: 'AppliedCoupon'
        id: string
        couponCode: string
        discountId: string
        source: CouponSource
        appliedAt: string
        appliedBy: string | null
        isActive: boolean
        description: string | null
        includesFreeShipping: boolean
        discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      }>
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type SetShippingMethodMutationVariables = Exact<{
  input: SetShippingMethodInput
}>

export type SetShippingMethodMutation = {
  __typename?: 'Mutation'
  setShippingMethod: {
    __typename?: 'SetShippingMethodResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        variant: {
          __typename?: 'ProductVariant'
          id: string
          sku: string
          name: string
          price: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        } | null
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{
        __typename?: 'AppliedCoupon'
        id: string
        couponCode: string
        discountId: string
        source: CouponSource
        appliedAt: string
        appliedBy: string | null
        isActive: boolean
        description: string | null
        includesFreeShipping: boolean
        discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      }>
      shipping: {
        __typename?: 'CartShipping'
        estimatedDays: number | null
        trackingNumber: string | null
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          description: string | null
          estimatedDays: number | null
          isActive: boolean
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
          zones: Array<{
            __typename?: 'ShippingZone'
            id: string
            name: string
            countries: Array<string>
            cost: { __typename?: 'Money'; amount: number; currencyCode: string }
          }>
        } | null
        destination:
          | {
              __typename: 'ParcelBox'
              id: string
              name: string
              size: string
              isAvailable: boolean
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'PickupPoint'
              id: string
              name: string
              hours: string | null
              contactInfo: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'ShippingAddress'
              contactName: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
    } | null
    shipping: {
      __typename?: 'CartShipping'
      estimatedDays: number | null
      trackingNumber: string | null
      method: {
        __typename?: 'ShippingMethod'
        id: string
        name: string
        description: string | null
        estimatedDays: number | null
        isActive: boolean
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
      destination:
        | {
            __typename: 'ParcelBox'
            id: string
            name: string
            size: string
            isAvailable: boolean
            address: {
              __typename?: 'Address'
              id: string | null
              firstName: string
              lastName: string
              company: string | null
              address1: string
              address2: string | null
              city: string
              province: string
              country: string
              zip: string
              phone: string | null
            }
          }
        | {
            __typename: 'PickupPoint'
            id: string
            name: string
            hours: string | null
            contactInfo: string | null
            address: {
              __typename?: 'Address'
              id: string | null
              firstName: string
              lastName: string
              company: string | null
              address1: string
              address2: string | null
              city: string
              province: string
              country: string
              zip: string
              phone: string | null
            }
          }
        | {
            __typename: 'ShippingAddress'
            contactName: string | null
            address: {
              __typename?: 'Address'
              id: string | null
              firstName: string
              lastName: string
              company: string | null
              address1: string
              address2: string | null
              city: string
              province: string
              country: string
              zip: string
              phone: string | null
            }
          }
        | null
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type MergeCartsMutationVariables = Exact<{
  input: MergeCartsInput
}>

export type MergeCartsMutation = {
  __typename?: 'Mutation'
  mergeCarts: {
    __typename?: 'MergeCartsResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      userId: string | null
      sessionId: string
      metadata: Record<string, unknown> | null
      expiresAt: string | null
      createdAt: string
      updatedAt: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        variant: {
          __typename?: 'ProductVariant'
          id: string
          sku: string
          name: string
          price: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        } | null
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{
        __typename?: 'AppliedCoupon'
        id: string
        couponCode: string
        discountId: string
        source: CouponSource
        appliedAt: string
        appliedBy: string | null
        isActive: boolean
        description: string | null
        includesFreeShipping: boolean
        discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      }>
      bookedGiftCards: Array<{
        __typename?: 'BookedGiftCard'
        code: string
        freeShipping: boolean
        bookedAt: string
        bookingExpiresAt: string
        bookedAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        availableBalance: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      shipping: {
        __typename?: 'CartShipping'
        estimatedDays: number | null
        trackingNumber: string | null
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          description: string | null
          estimatedDays: number | null
          isActive: boolean
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        } | null
        destination:
          | {
              __typename: 'ParcelBox'
              id: string
              name: string
              size: string
              isAvailable: boolean
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'PickupPoint'
              id: string
              name: string
              hours: string | null
              contactInfo: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'ShippingAddress'
              contactName: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type ClearCartMutationVariables = Exact<{
  cartId: Scalars['ID']['input']
}>

export type ClearCartMutation = {
  __typename?: 'Mutation'
  clearCart: {
    __typename?: 'ClearCartResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      userId: string | null
      sessionId: string
      metadata: Record<string, unknown> | null
      expiresAt: string | null
      createdAt: string
      updatedAt: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        quantity: number
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{ __typename?: 'AppliedCoupon'; id: string; couponCode: string }>
      bookedGiftCards: Array<{
        __typename?: 'BookedGiftCard'
        code: string
        bookedAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      shipping: {
        __typename?: 'CartShipping'
        estimatedDays: number | null
        trackingNumber: string | null
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          description: string | null
          estimatedDays: number | null
          isActive: boolean
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        } | null
        destination:
          | {
              __typename: 'ParcelBox'
              id: string
              name: string
              size: string
              isAvailable: boolean
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'PickupPoint'
              id: string
              name: string
              hours: string | null
              contactInfo: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'ShippingAddress'
              contactName: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type GetShippingProvidersQueryVariables = Exact<{ [key: string]: never }>

export type GetShippingProvidersQuery = {
  __typename?: 'Query'
  shippingProviders: Array<{
    __typename?: 'ShippingProvider'
    id: string
    name: string
    description: string | null
    supportedDeliveryTypes: Array<DeliveryType>
    isActive: boolean
    logoUrl: string | null
    contactInfo: string | null
  }>
}

export type GetShippingMethodsQueryVariables = Exact<{
  providerId: Scalars['ID']['input']
}>

export type GetShippingMethodsQuery = {
  __typename?: 'Query'
  shippingMethods: Array<{
    __typename?: 'ShippingMethod'
    id: string
    name: string
    description: string | null
    deliveryType: DeliveryType
    estimatedDays: number | null
    isActive: boolean
    provider: {
      __typename?: 'ShippingProvider'
      id: string
      name: string
      description: string | null
      supportedDeliveryTypes: Array<DeliveryType>
      isActive: boolean
      logoUrl: string | null
      contactInfo: string | null
    }
    cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    zones: Array<{
      __typename?: 'ShippingZone'
      id: string
      name: string
      countries: Array<string>
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    }>
  }>
}

export type GetPickupPointsQueryVariables = Exact<{
  address: AddressInput
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type GetPickupPointsQuery = {
  __typename?: 'Query'
  pickupPoints: Array<{
    __typename?: 'PickupPoint'
    id: string
    name: string
    hours: string | null
    contactInfo: string | null
    address: {
      __typename?: 'Address'
      id: string | null
      firstName: string
      lastName: string
      company: string | null
      address1: string
      address2: string | null
      city: string
      province: string
      country: string
      zip: string
      phone: string | null
    }
  }>
}

export type GetParcelBoxesQueryVariables = Exact<{
  address: AddressInput
  limit?: InputMaybe<Scalars['Int']['input']>
}>

export type GetParcelBoxesQuery = {
  __typename?: 'Query'
  parcelBoxes: Array<{
    __typename?: 'ParcelBox'
    id: string
    name: string
    size: string
    isAvailable: boolean
    address: {
      __typename?: 'Address'
      id: string | null
      firstName: string
      lastName: string
      company: string | null
      address1: string
      address2: string | null
      city: string
      province: string
      country: string
      zip: string
      phone: string | null
    }
  }>
}

export type CreateCheckoutMutationVariables = Exact<{
  input: CreateCheckoutInput
}>

export type CreateCheckoutMutation = {
  __typename?: 'Mutation'
  createCheckout: {
    __typename?: 'CreateCheckoutResponse'
    success: boolean
    session: {
      __typename?: 'CheckoutSession'
      id: string
      cartId: string
      status: CheckoutStatus
      expiresAt: string
      createdAt: string
      updatedAt: string
      cart: {
        __typename?: 'Cart'
        id: string
        items: Array<{
          __typename?: 'CartItem'
          id: string
          productId: string
          variantId: string | null
          quantity: number
          product: {
            __typename?: 'Product'
            id: string
            name: string
            slug: string
            basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
            images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
          }
          variant: {
            __typename?: 'ProductVariant'
            id: string
            sku: string
            name: string
            price: { __typename?: 'Money'; amount: number; currencyCode: string }
            images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
          } | null
          unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          appliedDiscounts: Array<{
            __typename?: 'AppliedItemDiscount'
            id: string
            discountId: string
            couponCode: string | null
            description: string
            appliedAt: string
            isActive: boolean
            amount: { __typename?: 'Money'; amount: number; currencyCode: string }
          }>
        }>
        totals: {
          __typename?: 'CartTotals'
          itemCount: number
          subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
          tax: { __typename?: 'Money'; amount: number; currencyCode: string }
          shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
          discount: { __typename?: 'Money'; amount: number; currencyCode: string }
          total: { __typename?: 'Money'; amount: number; currencyCode: string }
        }
      }
      customer: {
        __typename?: 'CheckoutCustomer'
        email: string
        firstName: string | null
        lastName: string | null
        phone: string | null
        isGuest: boolean
        billingAddress: {
          __typename?: 'Address'
          firstName: string
          lastName: string
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        } | null
        shippingAddress: {
          __typename?: 'Address'
          firstName: string
          lastName: string
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        } | null
      } | null
      shipping: {
        __typename?: 'CheckoutShipping'
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          description: string | null
          estimatedDays: number | null
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        }
        address: {
          __typename?: 'Address'
          firstName: string
          lastName: string
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        }
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
      payment: {
        __typename?: 'CheckoutPayment'
        intentId: string
        clientSecret: string
        status: PaymentStatus
        methods: Array<{
          __typename?: 'PaymentMethod'
          id: string
          type: PaymentMethodType
          name: string
          description: string | null
          isActive: boolean
        }>
        selectedMethod: {
          __typename?: 'PaymentMethod'
          id: string
          type: PaymentMethodType
          name: string
        } | null
      } | null
      totals: {
        __typename?: 'CheckoutTotals'
        currency: string
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type UpdateCheckoutCustomerMutationVariables = Exact<{
  input: UpdateCheckoutCustomerInput
}>

export type UpdateCheckoutCustomerMutation = {
  __typename?: 'Mutation'
  updateCheckoutCustomer: {
    __typename?: 'UpdateCheckoutCustomerResponse'
    success: boolean
    session: {
      __typename?: 'CheckoutSession'
      id: string
      customer: {
        __typename?: 'CheckoutCustomer'
        email: string
        firstName: string | null
        lastName: string | null
        phone: string | null
        isGuest: boolean
        billingAddress: {
          __typename?: 'Address'
          firstName: string
          lastName: string
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        } | null
        shippingAddress: {
          __typename?: 'Address'
          firstName: string
          lastName: string
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        } | null
      } | null
      totals: {
        __typename?: 'CheckoutTotals'
        currency: string
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type UpdateCheckoutShippingMutationVariables = Exact<{
  input: UpdateCheckoutShippingInput
}>

export type UpdateCheckoutShippingMutation = {
  __typename?: 'Mutation'
  updateCheckoutShipping: {
    __typename?: 'UpdateCheckoutShippingResponse'
    success: boolean
    session: {
      __typename?: 'CheckoutSession'
      id: string
      shipping: {
        __typename?: 'CheckoutShipping'
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          estimatedDays: number | null
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        }
        address: {
          __typename?: 'Address'
          firstName: string
          lastName: string
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        }
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
      totals: {
        __typename?: 'CheckoutTotals'
        currency: string
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type ProcessPaymentMutationVariables = Exact<{
  input: ProcessPaymentInput
}>

export type ProcessPaymentMutation = {
  __typename?: 'Mutation'
  processPayment: {
    __typename?: 'ProcessPaymentResponse'
    success: boolean
    session: {
      __typename?: 'CheckoutSession'
      id: string
      status: CheckoutStatus
      payment: {
        __typename?: 'CheckoutPayment'
        status: PaymentStatus
        intentId: string
        selectedMethod: {
          __typename?: 'PaymentMethod'
          id: string
          type: PaymentMethodType
          name: string
        } | null
      } | null
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type GetCheckoutSessionQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetCheckoutSessionQuery = {
  __typename?: 'Query'
  checkoutSession: {
    __typename?: 'CheckoutSession'
    id: string
    cartId: string
    status: CheckoutStatus
    expiresAt: string
    createdAt: string
    updatedAt: string
    cart: {
      __typename?: 'Cart'
      id: string
      expiresAt: string | null
      createdAt: string
      updatedAt: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        variant: {
          __typename?: 'ProductVariant'
          id: string
          sku: string
          name: string
          price: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        } | null
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        appliedDiscounts: Array<{
          __typename?: 'AppliedItemDiscount'
          id: string
          discountId: string
          couponCode: string | null
          description: string
          appliedAt: string
          isActive: boolean
          amount: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      appliedCoupons: Array<{
        __typename?: 'AppliedCoupon'
        id: string
        couponCode: string
        discountId: string
        source: CouponSource
        appliedAt: string
        appliedBy: string | null
        isActive: boolean
        description: string | null
        includesFreeShipping: boolean
        discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      }>
      bookedGiftCards: Array<{
        __typename?: 'BookedGiftCard'
        code: string
        freeShipping: boolean
        bookedAt: string
        bookingExpiresAt: string
        bookedAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
        availableBalance: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      shipping: {
        __typename?: 'CartShipping'
        estimatedDays: number | null
        trackingNumber: string | null
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          description: string | null
          estimatedDays: number | null
          isActive: boolean
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        } | null
        destination:
          | {
              __typename: 'ParcelBox'
              id: string
              name: string
              size: string
              isAvailable: boolean
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'PickupPoint'
              id: string
              name: string
              hours: string | null
              contactInfo: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | {
              __typename: 'ShippingAddress'
              contactName: string | null
              address: {
                __typename?: 'Address'
                id: string | null
                firstName: string
                lastName: string
                company: string | null
                address1: string
                address2: string | null
                city: string
                province: string
                country: string
                zip: string
                phone: string | null
              }
            }
          | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
    }
    customer: {
      __typename?: 'CheckoutCustomer'
      id: string | null
      email: string
      firstName: string | null
      lastName: string | null
      phone: string | null
      isGuest: boolean
      billingAddress: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      } | null
      shippingAddress: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      } | null
    } | null
    shipping: {
      __typename?: 'CheckoutShipping'
      estimatedDays: number | null
      trackingNumber: string | null
      method: {
        __typename?: 'ShippingMethod'
        id: string
        name: string
        description: string | null
        estimatedDays: number | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    payment: {
      __typename?: 'CheckoutPayment'
      intentId: string
      clientSecret: string
      status: PaymentStatus
      methods: Array<{
        __typename?: 'PaymentMethod'
        id: string
        type: PaymentMethodType
        name: string
        description: string | null
        isActive: boolean
        metadata: Record<string, unknown> | null
      }>
      selectedMethod: {
        __typename?: 'PaymentMethod'
        id: string
        type: PaymentMethodType
        name: string
        description: string | null
        isActive: boolean
        metadata: Record<string, unknown> | null
      } | null
    } | null
    totals: {
      __typename?: 'CheckoutTotals'
      currency: string
      subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
      tax: { __typename?: 'Money'; amount: number; currencyCode: string }
      shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
      discount: { __typename?: 'Money'; amount: number; currencyCode: string }
      total: { __typename?: 'Money'; amount: number; currencyCode: string }
    }
  } | null
}

export type ValidateCheckoutMutationVariables = Exact<{
  input: ValidateCheckoutInput
}>

export type ValidateCheckoutMutation = {
  __typename?: 'Mutation'
  validateCheckout: {
    __typename?: 'ValidateCheckoutResponse'
    success: boolean
    isValid: boolean
    session: {
      __typename?: 'CheckoutSession'
      id: string
      cartId: string
      status: CheckoutStatus
      expiresAt: string
      createdAt: string
      updatedAt: string
      cart: {
        __typename?: 'Cart'
        id: string
        expiresAt: string | null
        createdAt: string
        updatedAt: string
        items: Array<{
          __typename?: 'CartItem'
          id: string
          productId: string
          variantId: string | null
          quantity: number
          addedAt: string
          updatedAt: string
          product: {
            __typename?: 'Product'
            id: string
            name: string
            slug: string
            basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
            images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
          }
          variant: {
            __typename?: 'ProductVariant'
            id: string
            sku: string
            name: string
            price: { __typename?: 'Money'; amount: number; currencyCode: string }
            images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
          } | null
          unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          appliedDiscounts: Array<{
            __typename?: 'AppliedItemDiscount'
            id: string
            discountId: string
            couponCode: string | null
            description: string
            appliedAt: string
            isActive: boolean
            amount: { __typename?: 'Money'; amount: number; currencyCode: string }
          }>
        }>
        totals: {
          __typename?: 'CartTotals'
          itemCount: number
          subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
          tax: { __typename?: 'Money'; amount: number; currencyCode: string }
          shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
          discount: { __typename?: 'Money'; amount: number; currencyCode: string }
          total: { __typename?: 'Money'; amount: number; currencyCode: string }
        }
        appliedCoupons: Array<{
          __typename?: 'AppliedCoupon'
          id: string
          couponCode: string
          discountId: string
          source: CouponSource
          appliedAt: string
          appliedBy: string | null
          isActive: boolean
          description: string | null
          includesFreeShipping: boolean
          discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
          shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
        }>
        bookedGiftCards: Array<{
          __typename?: 'BookedGiftCard'
          code: string
          freeShipping: boolean
          bookedAt: string
          bookingExpiresAt: string
          bookedAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
          availableBalance: { __typename?: 'Money'; amount: number; currencyCode: string }
        }>
        shipping: {
          __typename?: 'CartShipping'
          estimatedDays: number | null
          trackingNumber: string | null
          method: {
            __typename?: 'ShippingMethod'
            id: string
            name: string
            description: string | null
            estimatedDays: number | null
            isActive: boolean
            cost: { __typename?: 'Money'; amount: number; currencyCode: string }
          } | null
          destination:
            | {
                __typename: 'ParcelBox'
                id: string
                name: string
                size: string
                isAvailable: boolean
                address: {
                  __typename?: 'Address'
                  id: string | null
                  firstName: string
                  lastName: string
                  company: string | null
                  address1: string
                  address2: string | null
                  city: string
                  province: string
                  country: string
                  zip: string
                  phone: string | null
                }
              }
            | {
                __typename: 'PickupPoint'
                id: string
                name: string
                hours: string | null
                contactInfo: string | null
                address: {
                  __typename?: 'Address'
                  id: string | null
                  firstName: string
                  lastName: string
                  company: string | null
                  address1: string
                  address2: string | null
                  city: string
                  province: string
                  country: string
                  zip: string
                  phone: string | null
                }
              }
            | {
                __typename: 'ShippingAddress'
                contactName: string | null
                address: {
                  __typename?: 'Address'
                  id: string | null
                  firstName: string
                  lastName: string
                  company: string | null
                  address1: string
                  address2: string | null
                  city: string
                  province: string
                  country: string
                  zip: string
                  phone: string | null
                }
              }
            | null
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        } | null
      }
      customer: {
        __typename?: 'CheckoutCustomer'
        id: string | null
        email: string
        firstName: string | null
        lastName: string | null
        phone: string | null
        isGuest: boolean
        billingAddress: {
          __typename?: 'Address'
          id: string | null
          firstName: string
          lastName: string
          company: string | null
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        } | null
        shippingAddress: {
          __typename?: 'Address'
          id: string | null
          firstName: string
          lastName: string
          company: string | null
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        } | null
      } | null
      shipping: {
        __typename?: 'CheckoutShipping'
        estimatedDays: number | null
        trackingNumber: string | null
        method: {
          __typename?: 'ShippingMethod'
          id: string
          name: string
          description: string | null
          estimatedDays: number | null
          cost: { __typename?: 'Money'; amount: number; currencyCode: string }
        }
        address: {
          __typename?: 'Address'
          id: string | null
          firstName: string
          lastName: string
          company: string | null
          address1: string
          address2: string | null
          city: string
          province: string
          country: string
          zip: string
          phone: string | null
        }
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      } | null
      payment: {
        __typename?: 'CheckoutPayment'
        intentId: string
        clientSecret: string
        status: PaymentStatus
        methods: Array<{
          __typename?: 'PaymentMethod'
          id: string
          type: PaymentMethodType
          name: string
          description: string | null
          isActive: boolean
          metadata: Record<string, unknown> | null
        }>
        selectedMethod: {
          __typename?: 'PaymentMethod'
          id: string
          type: PaymentMethodType
          name: string
          description: string | null
          isActive: boolean
          metadata: Record<string, unknown> | null
        } | null
      } | null
      totals: {
        __typename?: 'CheckoutTotals'
        currency: string
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
    warnings: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type CollectionsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>
}>

export type CollectionsQuery = {
  __typename?: 'Query'
  collections: Array<{
    __typename?: 'Collection'
    id: string
    name: string
    slug: string
    description: string | null
  }>
}

export type ApplyDiscountMutationVariables = Exact<{
  input: ApplyDiscountInput
}>

export type ApplyDiscountMutation = {
  __typename?: 'Mutation'
  applyDiscount: {
    __typename?: 'ApplyDiscountResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type RemoveDiscountMutationVariables = Exact<{
  input: RemoveDiscountInput
}>

export type RemoveDiscountMutation = {
  __typename?: 'Mutation'
  removeDiscount: {
    __typename?: 'RemoveDiscountResponse'
    success: boolean
    cart: {
      __typename?: 'Cart'
      id: string
      items: Array<{
        __typename?: 'CartItem'
        id: string
        productId: string
        variantId: string | null
        quantity: number
        addedAt: string
        updatedAt: string
        product: {
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }
        unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      totals: {
        __typename?: 'CartTotals'
        itemCount: number
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        discount: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type CreateOrderMutationVariables = Exact<{
  input: CreateOrderInput
}>

export type CreateOrderMutation = {
  __typename?: 'Mutation'
  createOrder: {
    __typename?: 'CreateOrderResponse'
    success: boolean
    order: {
      __typename?: 'Order'
      id: string
      orderNumber: string
      customerEmail: string
      status: OrderStatus
      createdAt: string
      totals: {
        __typename?: 'OrderTotals'
        subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
        tax: { __typename?: 'Money'; amount: number; currencyCode: string }
        shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
        total: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
    } | null
    errors: Array<{
      __typename?: 'Error'
      code: string
      message: string
      field: string | null
    }> | null
  }
}

export type GetOrderQueryVariables = Exact<{
  id: Scalars['ID']['input']
}>

export type GetOrderQuery = {
  __typename?: 'Query'
  order: {
    __typename?: 'Order'
    id: string
    orderNumber: string
    customerId: string | null
    customerEmail: string
    status: OrderStatus
    metadata: Record<string, unknown> | null
    createdAt: string
    updatedAt: string
    items: Array<{
      __typename?: 'OrderItem'
      id: string
      productId: string
      variantId: string | null
      quantity: number
      product: {
        __typename?: 'Product'
        id: string
        sku: string
        name: string
        slug: string
        description: string | null
        shortDescription: string | null
        createdAt: string
        updatedAt: string
        basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
        images: Array<{
          __typename?: 'Image'
          id: string
          url: string
          altText: string | null
          width: number | null
          height: number | null
        }>
      }
      variant: {
        __typename?: 'ProductVariant'
        id: string
        sku: string
        name: string
        price: { __typename?: 'Money'; amount: number; currencyCode: string }
        compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
        images: Array<{
          __typename?: 'Image'
          id: string
          url: string
          altText: string | null
          width: number | null
          height: number | null
        }>
      } | null
      unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      discounts: Array<{
        __typename?: 'OrderItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      appliedDiscounts: Array<{
        __typename?: 'AppliedItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
    }>
    totals: {
      __typename?: 'OrderTotals'
      currency: string
      subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
      tax: { __typename?: 'Money'; amount: number; currencyCode: string }
      shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
      discount: { __typename?: 'Money'; amount: number; currencyCode: string }
      total: { __typename?: 'Money'; amount: number; currencyCode: string }
    }
    appliedCoupons: Array<{
      __typename?: 'AppliedCoupon'
      id: string
      couponCode: string
      discountId: string
      source: CouponSource
      appliedAt: string
      appliedBy: string | null
      isActive: boolean
      description: string | null
      includesFreeShipping: boolean
      discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
      shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    }>
    shipping: {
      __typename?: 'OrderShipping'
      trackingNumber: string | null
      status: ShippingStatus
      estimatedDelivery: string | null
      method: {
        __typename?: 'ShippingMethod'
        id: string
        name: string
        description: string | null
        estimatedDays: number | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    payment: {
      __typename?: 'OrderPayment'
      id: string
      status: PaymentStatus
      currency: string
      transactionId: string | null
      processedAt: string | null
      method: {
        __typename?: 'PaymentMethod'
        id: string
        type: PaymentMethodType
        name: string
        description: string | null
        isActive: boolean
        metadata: Record<string, unknown> | null
      }
      amount: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    billing: {
      __typename?: 'OrderBilling'
      taxId: string | null
      company: string | null
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
    } | null
    tracking: {
      __typename?: 'OrderTracking'
      status: OrderStatus
      estimatedDelivery: string | null
      trackingNumber: string | null
      trackingUrl: string | null
      history: Array<{
        __typename?: 'OrderStatusHistory'
        status: OrderStatus
        timestamp: string
        note: string | null
        updatedBy: string | null
      }>
    } | null
  } | null
}

export type GetOrdersQueryVariables = Exact<{
  userId?: InputMaybe<Scalars['ID']['input']>
  customerEmail?: InputMaybe<Scalars['String']['input']>
  pagination?: InputMaybe<PaginationInput>
}>

export type GetOrdersQuery = {
  __typename?: 'Query'
  orders: Array<{
    __typename?: 'Order'
    id: string
    orderNumber: string
    customerId: string | null
    customerEmail: string
    status: OrderStatus
    metadata: Record<string, unknown> | null
    createdAt: string
    updatedAt: string
    items: Array<{
      __typename?: 'OrderItem'
      id: string
      productId: string
      variantId: string | null
      quantity: number
      product: {
        __typename?: 'Product'
        id: string
        name: string
        slug: string
        images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
      }
      variant: {
        __typename?: 'ProductVariant'
        id: string
        name: string
        images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
      } | null
      unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
    }>
    totals: {
      __typename?: 'OrderTotals'
      currency: string
      subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
      tax: { __typename?: 'Money'; amount: number; currencyCode: string }
      shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
      discount: { __typename?: 'Money'; amount: number; currencyCode: string }
      total: { __typename?: 'Money'; amount: number; currencyCode: string }
    }
    appliedCoupons: Array<{
      __typename?: 'AppliedCoupon'
      id: string
      couponCode: string
      discountId: string
      source: CouponSource
      appliedAt: string
      appliedBy: string | null
      isActive: boolean
      description: string | null
      includesFreeShipping: boolean
      discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
      shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    }>
    shipping: {
      __typename?: 'OrderShipping'
      trackingNumber: string | null
      status: ShippingStatus
      estimatedDelivery: string | null
      method: {
        __typename?: 'ShippingMethod'
        id: string
        name: string
        description: string | null
        estimatedDays: number | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    payment: {
      __typename?: 'OrderPayment'
      id: string
      status: PaymentStatus
      currency: string
      transactionId: string | null
      processedAt: string | null
      method: {
        __typename?: 'PaymentMethod'
        id: string
        type: PaymentMethodType
        name: string
        description: string | null
        isActive: boolean
        metadata: Record<string, unknown> | null
      }
      amount: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    billing: {
      __typename?: 'OrderBilling'
      taxId: string | null
      company: string | null
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
    } | null
    tracking: {
      __typename?: 'OrderTracking'
      status: OrderStatus
      estimatedDelivery: string | null
      trackingNumber: string | null
      trackingUrl: string | null
      history: Array<{
        __typename?: 'OrderStatusHistory'
        status: OrderStatus
        timestamp: string
        note: string | null
        updatedBy: string | null
      }>
    } | null
  }>
}

export type GetOrderByNumberQueryVariables = Exact<{
  orderNumber: Scalars['String']['input']
}>

export type GetOrderByNumberQuery = {
  __typename?: 'Query'
  orderByNumber: {
    __typename?: 'Order'
    id: string
    orderNumber: string
    customerId: string | null
    customerEmail: string
    status: OrderStatus
    metadata: Record<string, unknown> | null
    createdAt: string
    updatedAt: string
    items: Array<{
      __typename?: 'OrderItem'
      id: string
      productId: string
      variantId: string | null
      quantity: number
      product: {
        __typename?: 'Product'
        id: string
        sku: string
        name: string
        slug: string
        description: string | null
        shortDescription: string | null
        createdAt: string
        updatedAt: string
        basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
        images: Array<{
          __typename?: 'Image'
          id: string
          url: string
          altText: string | null
          width: number | null
          height: number | null
        }>
      }
      variant: {
        __typename?: 'ProductVariant'
        id: string
        sku: string
        name: string
        price: { __typename?: 'Money'; amount: number; currencyCode: string }
        compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
        images: Array<{
          __typename?: 'Image'
          id: string
          url: string
          altText: string | null
          width: number | null
          height: number | null
        }>
      } | null
      unitPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      totalPrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      discounts: Array<{
        __typename?: 'OrderItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
      appliedDiscounts: Array<{
        __typename?: 'AppliedItemDiscount'
        id: string
        discountId: string
        couponCode: string | null
        description: string
        appliedAt: string
        isActive: boolean
        amount: { __typename?: 'Money'; amount: number; currencyCode: string }
      }>
    }>
    totals: {
      __typename?: 'OrderTotals'
      currency: string
      subtotal: { __typename?: 'Money'; amount: number; currencyCode: string }
      tax: { __typename?: 'Money'; amount: number; currencyCode: string }
      shipping: { __typename?: 'Money'; amount: number; currencyCode: string }
      discount: { __typename?: 'Money'; amount: number; currencyCode: string }
      total: { __typename?: 'Money'; amount: number; currencyCode: string }
    }
    appliedCoupons: Array<{
      __typename?: 'AppliedCoupon'
      id: string
      couponCode: string
      discountId: string
      source: CouponSource
      appliedAt: string
      appliedBy: string | null
      isActive: boolean
      description: string | null
      includesFreeShipping: boolean
      discountAmount: { __typename?: 'Money'; amount: number; currencyCode: string }
      shippingDiscount: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    }>
    shipping: {
      __typename?: 'OrderShipping'
      trackingNumber: string | null
      status: ShippingStatus
      estimatedDelivery: string | null
      method: {
        __typename?: 'ShippingMethod'
        id: string
        name: string
        description: string | null
        estimatedDays: number | null
        cost: { __typename?: 'Money'; amount: number; currencyCode: string }
      }
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
      cost: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    payment: {
      __typename?: 'OrderPayment'
      id: string
      status: PaymentStatus
      currency: string
      transactionId: string | null
      processedAt: string | null
      method: {
        __typename?: 'PaymentMethod'
        id: string
        type: PaymentMethodType
        name: string
        description: string | null
        isActive: boolean
        metadata: Record<string, unknown> | null
      }
      amount: { __typename?: 'Money'; amount: number; currencyCode: string }
    } | null
    billing: {
      __typename?: 'OrderBilling'
      taxId: string | null
      company: string | null
      address: {
        __typename?: 'Address'
        id: string | null
        firstName: string
        lastName: string
        company: string | null
        address1: string
        address2: string | null
        city: string
        province: string
        country: string
        zip: string
        phone: string | null
      }
    } | null
    tracking: {
      __typename?: 'OrderTracking'
      status: OrderStatus
      estimatedDelivery: string | null
      trackingNumber: string | null
      trackingUrl: string | null
      history: Array<{
        __typename?: 'OrderStatusHistory'
        status: OrderStatus
        timestamp: string
        note: string | null
        updatedBy: string | null
      }>
    } | null
  } | null
}

export type GetProductsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>
  filter?: InputMaybe<ProductFilterInput>
}>

export type GetProductsQuery = {
  __typename?: 'Query'
  products: Array<{
    __typename?: 'Product'
    id: string
    sku: string
    name: string
    slug: string
    description: string | null
    shortDescription: string | null
    isActive: boolean
    tags: Array<string>
    createdAt: string
    updatedAt: string
    basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
    compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    images: Array<{
      __typename?: 'Image'
      id: string
      url: string
      altText: string | null
      width: number | null
      height: number | null
    }>
    inventory: {
      __typename?: 'ProductInventory'
      trackQuantity: boolean
      quantity: number | null
      allowBackorder: boolean
    } | null
  }>
}

export type GetProductQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
  variantSlug?: InputMaybe<Scalars['String']['input']>
}>

export type GetProductQuery = {
  __typename?: 'Query'
  product: {
    __typename?: 'Product'
    id: string
    sku: string
    name: string
    slug: string
    description: string | null
    shortDescription: string | null
    isActive: boolean
    isDigital: boolean
    weight: number | null
    tags: Array<string>
    createdAt: string
    updatedAt: string
    basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
    minPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    maxPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    costPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    purchasePrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
    dimensions: {
      __typename?: 'ProductDimensions'
      length: number | null
      width: number | null
      height: number | null
      unit: string | null
    } | null
    images: Array<{
      __typename?: 'Image'
      id: string
      url: string
      altText: string | null
      width: number | null
      height: number | null
    }>
    variants: Array<{
      __typename?: 'ProductVariant'
      id: string
      sku: string
      slug: string
      name: string
      isActive: boolean
      weight: number | null
      price: { __typename?: 'Money'; amount: number; currencyCode: string }
      compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      costPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      dimensions: {
        __typename?: 'ProductDimensions'
        length: number | null
        width: number | null
        height: number | null
        unit: string | null
      } | null
      images: Array<{
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      }>
      options: Array<{ __typename?: 'ProductOption'; id: string; name: string; value: string }>
      inventory: {
        __typename?: 'ProductInventory'
        trackQuantity: boolean
        quantity: number | null
        allowBackorder: boolean
        sku: string | null
        barcode: string | null
      } | null
    }>
    options: Array<{ __typename?: 'ProductOptionGroup'; name: string; values: Array<string> }>
    category: {
      __typename?: 'Category'
      id: string
      name: string
      slug: string
      description: string | null
      isActive: boolean
      sortOrder: number | null
      createdAt: string
      updatedAt: string
      image: {
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      } | null
      seo: {
        __typename?: 'SEO'
        title: string | null
        description: string | null
        keywords: Array<string>
      } | null
    } | null
    collections: Array<{
      __typename?: 'Collection'
      id: string
      name: string
      slug: string
      description: string | null
      isActive: boolean
      sortOrder: number | null
      createdAt: string
      updatedAt: string
      image: {
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      } | null
      seo: {
        __typename?: 'SEO'
        title: string | null
        description: string | null
        keywords: Array<string>
      } | null
    }>
    seo: {
      __typename?: 'SEO'
      title: string | null
      description: string | null
      keywords: Array<string>
    } | null
    inventory: {
      __typename?: 'ProductInventory'
      trackQuantity: boolean
      quantity: number | null
      allowBackorder: boolean
      sku: string | null
      barcode: string | null
    } | null
  } | null
}

export type GetCategoriesQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>
}>

export type GetCategoriesQuery = {
  __typename?: 'Query'
  categories: Array<{
    __typename?: 'Category'
    id: string
    name: string
    slug: string
    description: string | null
    isActive: boolean
    sortOrder: number | null
    createdAt: string
    updatedAt: string
    image: {
      __typename?: 'Image'
      id: string
      url: string
      altText: string | null
      width: number | null
      height: number | null
    } | null
    parent: { __typename?: 'Category'; id: string; name: string; slug: string } | null
    children: Array<{
      __typename?: 'Category'
      id: string
      name: string
      slug: string
      isActive: boolean
    }>
    products: Array<{
      __typename?: 'Product'
      id: string
      name: string
      slug: string
      basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
    }>
    seo: {
      __typename?: 'SEO'
      title: string | null
      description: string | null
      keywords: Array<string>
    } | null
  }>
}

export type GetCategoryQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}>

export type GetCategoryQuery = {
  __typename?: 'Query'
  category: {
    __typename?: 'Category'
    id: string
    name: string
    slug: string
    description: string | null
    isActive: boolean
    sortOrder: number | null
    createdAt: string
    updatedAt: string
    image: {
      __typename?: 'Image'
      id: string
      url: string
      altText: string | null
      width: number | null
      height: number | null
    } | null
    parent: { __typename?: 'Category'; id: string; name: string; slug: string } | null
    children: Array<{
      __typename?: 'Category'
      id: string
      name: string
      slug: string
      description: string | null
      isActive: boolean
      sortOrder: number | null
      createdAt: string
      updatedAt: string
      image: {
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      } | null
      seo: {
        __typename?: 'SEO'
        title: string | null
        description: string | null
        keywords: Array<string>
      } | null
    }>
    products: Array<{
      __typename?: 'Product'
      id: string
      sku: string
      name: string
      slug: string
      description: string | null
      shortDescription: string | null
      isActive: boolean
      tags: Array<string>
      createdAt: string
      updatedAt: string
      basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      images: Array<{
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      }>
      inventory: {
        __typename?: 'ProductInventory'
        trackQuantity: boolean
        quantity: number | null
        allowBackorder: boolean
      } | null
    }>
    seo: {
      __typename?: 'SEO'
      title: string | null
      description: string | null
      keywords: Array<string>
    } | null
  } | null
}

export type GetCollectionsQueryVariables = Exact<{
  pagination?: InputMaybe<PaginationInput>
}>

export type GetCollectionsQuery = {
  __typename?: 'Query'
  collections: Array<{
    __typename?: 'Collection'
    id: string
    name: string
    slug: string
    description: string | null
    isActive: boolean
    sortOrder: number | null
    createdAt: string
    updatedAt: string
    image: {
      __typename?: 'Image'
      id: string
      url: string
      altText: string | null
      width: number | null
      height: number | null
    } | null
    products: Array<{
      __typename?: 'Product'
      id: string
      name: string
      slug: string
      basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
    }>
    seo: {
      __typename?: 'SEO'
      title: string | null
      description: string | null
      keywords: Array<string>
    } | null
  }>
}

export type GetCollectionQueryVariables = Exact<{
  slug?: InputMaybe<Scalars['String']['input']>
  id?: InputMaybe<Scalars['ID']['input']>
}>

export type GetCollectionQuery = {
  __typename?: 'Query'
  collection: {
    __typename?: 'Collection'
    id: string
    name: string
    slug: string
    description: string | null
    isActive: boolean
    sortOrder: number | null
    createdAt: string
    updatedAt: string
    image: {
      __typename?: 'Image'
      id: string
      url: string
      altText: string | null
      width: number | null
      height: number | null
    } | null
    products: Array<{
      __typename?: 'Product'
      id: string
      sku: string
      name: string
      slug: string
      description: string | null
      shortDescription: string | null
      isActive: boolean
      tags: Array<string>
      createdAt: string
      updatedAt: string
      basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
      compareAtPrice: { __typename?: 'Money'; amount: number; currencyCode: string } | null
      images: Array<{
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      }>
      inventory: {
        __typename?: 'ProductInventory'
        trackQuantity: boolean
        quantity: number | null
        allowBackorder: boolean
      } | null
    }>
    seo: {
      __typename?: 'SEO'
      title: string | null
      description: string | null
      keywords: Array<string>
    } | null
  } | null
}

export type GetCategoryTreeQueryVariables = Exact<{
  includeInactive?: InputMaybe<Scalars['Boolean']['input']>
  maxDepth?: InputMaybe<Scalars['Int']['input']>
  rootSlug?: InputMaybe<Scalars['String']['input']>
  includeCounts?: InputMaybe<Scalars['Boolean']['input']>
  sortBy?: InputMaybe<Scalars['String']['input']>
  sortDirection?: InputMaybe<Scalars['String']['input']>
}>

export type GetCategoryTreeQuery = {
  __typename?: 'Query'
  categoryTree: Array<{
    __typename?: 'CategoryTreeNode'
    productCount: number
    level: number
    category: {
      __typename?: 'Category'
      id: string
      name: string
      slug: string
      description: string | null
      isActive: boolean
      sortOrder: number | null
      createdAt: string
      updatedAt: string
      image: {
        __typename?: 'Image'
        id: string
        url: string
        altText: string | null
        width: number | null
        height: number | null
      } | null
      parent: { __typename?: 'Category'; id: string; name: string; slug: string } | null
      children: Array<{
        __typename?: 'Category'
        id: string
        name: string
        slug: string
        isActive: boolean
      }>
      products: Array<{
        __typename?: 'Product'
        id: string
        name: string
        slug: string
        basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
        images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
      }>
      seo: {
        __typename?: 'SEO'
        title: string | null
        description: string | null
        keywords: Array<string>
      } | null
    }
    children: Array<{
      __typename?: 'CategoryTreeNode'
      productCount: number
      level: number
      category: {
        __typename?: 'Category'
        id: string
        name: string
        slug: string
        description: string | null
        isActive: boolean
        sortOrder: number | null
        createdAt: string
        updatedAt: string
        image: {
          __typename?: 'Image'
          id: string
          url: string
          altText: string | null
          width: number | null
          height: number | null
        } | null
        parent: { __typename?: 'Category'; id: string; name: string; slug: string } | null
        children: Array<{
          __typename?: 'Category'
          id: string
          name: string
          slug: string
          isActive: boolean
        }>
        products: Array<{
          __typename?: 'Product'
          id: string
          name: string
          slug: string
          basePrice: { __typename?: 'Money'; amount: number; currencyCode: string }
          images: Array<{ __typename?: 'Image'; id: string; url: string; altText: string | null }>
        }>
        seo: {
          __typename?: 'SEO'
          title: string | null
          description: string | null
          keywords: Array<string>
        } | null
      }
      children: Array<{
        __typename?: 'CategoryTreeNode'
        productCount: number
        level: number
        category: {
          __typename?: 'Category'
          id: string
          name: string
          slug: string
          isActive: boolean
        }
      }>
    }>
  }>
}
