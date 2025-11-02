export interface Money {
  amount: number;
  currencyCode: string;
}

export interface Image {
  id: string;
  url: string;
  altText?: string;
  width?: number;
  height?: number;
}

export interface ProductInventory {
  trackQuantity: boolean;
  quantity?: number;
  allowBackorder: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  basePrice: Money;
  compareAtPrice?: Money;
  isActive: boolean;
  images: Image[];
  inventory?: ProductInventory;
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export interface AppliedItemDiscount {
  id: string;
  discountId: string;
  couponCode?: string;
  amount: Money;
  description: string;
  appliedAt: string;
  isActive: boolean;
}

export interface CartItem {
  id: string;
  productId: string;
  variantId?: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  appliedDiscounts: AppliedItemDiscount[];
  metadata?: Record<string, unknown>;
  addedAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: string;
  sku: string;
  slug: string;
  name: string;
  price: Money;
  compareAtPrice?: Money;
  costPrice?: Money;
  isActive: boolean;
  weight?: number;
  dimensions?: ProductDimensions;
  images: Image[];
  options: ProductOption[];
  inventory?: ProductInventory;
  createdAt: string;
  updatedAt: string;
}

export interface ProductDimensions {
  length?: number;
  width?: number;
  height?: number;
  unit?: string;
}

export interface ProductOption {
  id: string;
  name: string;
  value: string;
}

export interface CartTotals {
  subtotal: Money;
  tax: Money;
  shipping: Money;
  discount: Money;
  total: Money;
  itemCount: number;
  weight?: number;
}

export interface AppliedCoupon {
  id: string;
  couponCode: string;
  discountId: string;
  source: 'MANUAL' | 'AUTO';
  appliedAt: string;
  appliedBy?: string;
  isActive: boolean;
  description?: string;
  discountAmount: Money;
  shippingDiscount?: Money;
  includesFreeShipping: boolean;
}

export interface BookedGiftCard {
  code: string;
  bookedAmount: Money;
  availableBalance: Money;
  freeShipping: boolean;
  bookedAt: string;
  bookingExpiresAt: string;
}

export interface CartShipping {
  method?: ShippingMethod;
  address?: Address;
  cost: Money;
  estimatedDays?: number;
  trackingNumber?: string;
}

export interface ShippingZone {
  id: string;
  name: string;
  countries: string[];
  cost: Money;
}

export interface Cart {
  id: string;
  userId?: string;
  sessionId: string;
  items: CartItem[];
  totals: CartTotals;
  appliedCoupons: AppliedCoupon[];
  bookedGiftCards: BookedGiftCard[];
  shipping?: CartShipping;
  metadata?: Record<string, unknown>;
  expiresAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface GraphQLError {
  code: string;
  message: string;
  field?: string;
}

export interface CreateCartResponse {
  createCart: {
    success: boolean;
    cart?: Cart;
    errors?: GraphQLError[];
  };
}

export interface AddToCartResponse {
  addToCart: {
    success: boolean;
    cart?: Cart;
    item?: CartItem;
    errors?: GraphQLError[];
  };
}

export interface RemoveFromCartResponse {
  removeFromCart: {
    success: boolean;
    cart?: Cart;
    errors?: GraphQLError[];
  };
}

export interface UpdateCartItemResponse {
  updateCartItem: {
    success: boolean;
    cart?: Cart;
    item?: CartItem;
    errors?: GraphQLError[];
  };
}

export interface ApplyDiscountResponse {
  applyDiscount: {
    success: boolean;
    cart?: Cart;
    errors?: GraphQLError[];
  };
}

export interface RemoveDiscountResponse {
  removeDiscount: {
    success: boolean;
    cart?: Cart;
    errors?: GraphQLError[];
  };
}

export interface Address {
  id?: string;
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

export interface ShippingMethod {
  id: string;
  name: string;
  description?: string;
  cost: Money;
  estimatedDays?: number;
  isActive: boolean;
  zones?: ShippingZone[];
}

export interface PaymentMethod {
  id: string;
  type: string;
  name: string;
  description?: string;
  isActive: boolean;
  metadata?: Record<string, unknown>;
}

export interface CheckoutCustomer {
  id?: string;
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isGuest: boolean;
  billingAddress?: Address;
  shippingAddress?: Address;
}

export interface CheckoutShipping {
  method: ShippingMethod;
  address: Address;
  cost: Money;
  estimatedDays?: number;
  trackingNumber?: string;
}

export interface CheckoutPayment {
  intentId: string;
  clientSecret: string;
  methods: PaymentMethod[];
  selectedMethod?: PaymentMethod;
  status: string;
}

export interface CheckoutTotals {
  subtotal: Money;
  tax: Money;
  shipping: Money;
  discount: Money;
  total: Money;
  currency: string;
}

export interface CheckoutSession {
  id: string;
  cartId: string;
  cart: Cart;
  customer?: CheckoutCustomer;
  shipping?: CheckoutShipping;
  payment?: CheckoutPayment;
  totals: CheckoutTotals;
  status: string;
  expiresAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCheckoutResponse {
  createCheckout: {
    success: boolean;
    session?: CheckoutSession;
    errors?: GraphQLError[];
  };
}

export interface UpdateCheckoutCustomerResponse {
  updateCheckoutCustomer: {
    success: boolean;
    session?: CheckoutSession;
    errors?: GraphQLError[];
  };
}

export interface UpdateCheckoutShippingResponse {
  updateCheckoutShipping: {
    success: boolean;
    session?: CheckoutSession;
    shipping?: CheckoutShipping;
    errors?: GraphQLError[];
  };
}

export interface ProcessPaymentResponse {
  processPayment: {
    success: boolean;
    session?: CheckoutSession;
    payment?: CheckoutPayment;
    errors?: GraphQLError[];
  };
}

export interface CreateOrderResponse {
  createOrder: {
    success: boolean;
    order?: Order;
    errors?: GraphQLError[];
  };
}

export interface OrderItem {
  id: string;
  productId: string;
  variantId?: string;
  product: Product;
  variant?: ProductVariant;
  quantity: number;
  unitPrice: Money;
  totalPrice: Money;
  discounts: OrderItemDiscount[];
  appliedDiscounts: AppliedItemDiscount[];
}

export interface OrderItemDiscount {
  id: string;
  discountId: string;
  couponCode?: string;
  amount: Money;
  description: string;
  appliedAt: string;
  isActive: boolean;
}

export interface OrderTotals {
  subtotal: Money;
  tax: Money;
  shipping: Money;
  discount: Money;
  total: Money;
  currency: string;
}

export interface OrderShipping {
  method: ShippingMethod;
  address: Address;
  cost: Money;
  trackingNumber?: string;
  status: 'PENDING' | 'PROCESSING' | 'SHIPPED' | 'IN_TRANSIT' | 'DELIVERED' | 'FAILED' | 'RETURNED';
  estimatedDelivery?: string;
}

export interface OrderPayment {
  id: string;
  method: PaymentMethod;
  status: 'PENDING' | 'PROCESSING' | 'SUCCEEDED' | 'FAILED' | 'CANCELLED' | 'REQUIRES_ACTION';
  amount: Money;
  currency: string;
  transactionId?: string;
  processedAt?: string;
}

export interface OrderBilling {
  address: Address;
  taxId?: string;
  company?: string;
}

export interface OrderTracking {
  status: string;
  history: OrderStatusHistory[];
  estimatedDelivery?: string;
  trackingNumber?: string;
  trackingUrl?: string;
}

export interface OrderStatusHistory {
  status: string;
  timestamp: string;
  note?: string;
  updatedBy?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId?: string;
  customerEmail: string;
  status: string;
  items: OrderItem[];
  totals: OrderTotals;
  appliedCoupons: AppliedCoupon[];
  shipping?: OrderShipping;
  payment?: OrderPayment;
  billing?: OrderBilling;
  tracking?: OrderTracking;
  metadata?: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

// Pagination types
export interface PaginationInput {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'ASC' | 'DESC';
}

export interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

// Sort and filter enums
export enum SortOrder {
  ASC = 'ASC',
  DESC = 'DESC',
}

export enum ProductSortBy {
  RELEVANCE = 'RELEVANCE',
  PRICE_LOW_TO_HIGH = 'PRICE_LOW_TO_HIGH',
  PRICE_HIGH_TO_LOW = 'PRICE_HIGH_TO_LOW',
  NEWEST = 'NEWEST',
  OLDEST = 'OLDEST',
  BEST_SELLING = 'BEST_SELLING',
  ALPHABETICAL = 'ALPHABETICAL',
}

export enum DiscountType {
  PERCENTAGE = 'PERCENTAGE',
  FIXED_AMOUNT = 'FIXED_AMOUNT',
  FREE_SHIPPING = 'FREE_SHIPPING',
  BUY_X_GET_Y = 'BUY_X_GET_Y',
}

export enum CouponSource {
  MANUAL = 'MANUAL',
  AUTO = 'AUTO',
}

export enum DeliveryType {
  HOME_DELIVERY = 'HOME_DELIVERY',
  PICKUP_POINT = 'PICKUP_POINT',
  PARCEL_BOX = 'PARCEL_BOX',
}

export enum PaymentMethodType {
  CREDIT_CARD = 'CREDIT_CARD',
  DEBIT_CARD = 'DEBIT_CARD',
  PAYPAL = 'PAYPAL',
  APPLE_PAY = 'APPLE_PAY',
  GOOGLE_PAY = 'GOOGLE_PAY',
  BANK_TRANSFER = 'BANK_TRANSFER',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
  CRYPTOCURRENCY = 'CRYPTOCURRENCY',
}

export enum CheckoutStatus {
  DRAFT = 'DRAFT',
  PENDING_PAYMENT = 'PENDING_PAYMENT',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  PAYMENT_SUCCEEDED = 'PAYMENT_SUCCEEDED',
  COMPLETED = 'COMPLETED',
  EXPIRED = 'EXPIRED',
  CANCELLED = 'CANCELLED',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SUCCEEDED = 'SUCCEEDED',
  FAILED = 'FAILED',
  CANCELLED = 'CANCELLED',
  REQUIRES_ACTION = 'REQUIRES_ACTION',
}

export enum OrderStatus {
  PENDING = 'PENDING',
  CONFIRMED = 'CONFIRMED',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED',
  RETURNED = 'RETURNED',
}

export enum ShippingStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  IN_TRANSIT = 'IN_TRANSIT',
  DELIVERED = 'DELIVERED',
  FAILED = 'FAILED',
  RETURNED = 'RETURNED',
}

// Product-related types
export interface ProductOptionGroup {
  name: string;
  values: string[];
}

export interface SEO {
  title?: string;
  description?: string;
  keywords: string[];
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: Image;
  parent?: Category;
  children: Category[];
  products: Product[];
  seo?: SEO;
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CategoryTreeNode {
  category: Category;
  children: CategoryTreeNode[];
  productCount: number;
  level: number;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: Image;
  products: Product[];
  seo?: SEO;
  isActive: boolean;
  sortOrder?: number;
  createdAt: string;
  updatedAt: string;
}

// Product filter types
export interface ProductFilterInput {
  category?: string;
  collection?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  tags?: string[];
  isActive?: boolean;
}

export interface ProductSearchInput {
  query?: string;
  category?: string;
  collection?: string;
  priceMin?: number;
  priceMax?: number;
  inStock?: boolean;
  tags?: string[];
  sortBy?: ProductSortBy;
  sortOrder?: SortOrder;
  pagination?: PaginationInput;
}

export interface ProductSearchResponse {
  products: Product[];
  pagination: PaginationInfo;
  filters: ProductFilters;
  total: number;
}

export interface ProductFilters {
  categories: CategoryFilter[];
  collections: CollectionFilter[];
  priceRange: PriceRangeFilter;
  tags: TagFilter[];
}

export interface CategoryFilter {
  id: string;
  name: string;
  count: number;
}

export interface CollectionFilter {
  id: string;
  name: string;
  count: number;
}

export interface PriceRangeFilter {
  min: number;
  max: number;
}

export interface TagFilter {
  name: string;
  count: number;
}

// Shipping types
export interface ShippingProvider {
  id: string;
  name: string;
  description?: string;
  supportedDeliveryTypes: DeliveryType[];
  isActive: boolean;
  logoUrl?: string;
  contactInfo?: string;
}

export interface ShippingDestination {
  __typename?: string;
}

export interface ShippingAddress extends ShippingDestination {
  __typename: 'ShippingAddress';
  address: Address;
  contactName?: string;
}

export interface PickupPoint extends ShippingDestination {
  __typename: 'PickupPoint';
  id: string;
  name: string;
  address: Address;
  hours?: string;
  contactInfo?: string;
}

export interface ParcelBox extends ShippingDestination {
  __typename: 'ParcelBox';
  id: string;
  name: string;
  address: Address;
  size: string;
  isAvailable: boolean;
}

export interface ShippingDestinationInput {
  address?: ShippingAddressInput;
  pickupPoint?: PickupPointInput;
  parcelBox?: ParcelBoxInput;
}

export interface ShippingAddressInput {
  address: AddressInput;
  contactName?: string;
}

export interface PickupPointInput {
  id: string;
}

export interface ParcelBoxInput {
  id: string;
}

// Discount types
export interface DiscountValue {
  type: DiscountType;
  value: number;
  currency?: string;
}

// Cart operation inputs
export interface CreateCartInput {
  userId?: string;
  sessionId: string;
  metadata?: Record<string, unknown>;
}

export interface AddToCartInput {
  cartId: string;
  productId: string;
  variantId?: string;
  quantity: number;
  metadata?: Record<string, unknown>;
}

export interface UpdateCartItemInput {
  cartId: string;
  itemId: string;
  quantity: number;
  metadata?: Record<string, unknown>;
}

export interface RemoveFromCartInput {
  cartId: string;
  itemId: string;
}

export interface ApplyDiscountInput {
  cartId: string;
  code: string;
}

export interface RemoveDiscountInput {
  cartId: string;
  discountId: string;
}

export interface SetShippingMethodInput {
  cartId: string;
  methodId: string;
  destination: ShippingDestinationInput;
}

export interface MergeCartsInput {
  sourceCartId: string;
  targetCartId: string;
  mergeStrategy: CartMergeStrategy;
}

export enum CartMergeStrategy {
  KEEP_TARGET = 'KEEP_TARGET',
  KEEP_SOURCE = 'KEEP_SOURCE',
  MERGE_QUANTITIES = 'MERGE_QUANTITIES',
  ASK_USER = 'ASK_USER',
}

export interface AddressInput {
  firstName: string;
  lastName: string;
  company?: string;
  address1: string;
  address2?: string;
  city: string;
  province: string;
  country: string;
  zip: string;
  phone?: string;
}

// Checkout inputs
export interface CreateCheckoutInput {
  cartId: string;
  customer?: CheckoutCustomerInput;
  shipping?: CheckoutShippingInput;
  metadata?: Record<string, unknown>;
}

export interface CheckoutCustomerInput {
  email: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  isGuest?: boolean;
  billingAddress?: AddressInput;
  shippingAddress?: AddressInput;
}

export interface CheckoutShippingInput {
  methodId: string;
  address: AddressInput;
}

export interface UpdateCheckoutCustomerInput {
  sessionId: string;
  customer: CheckoutCustomerInput;
}

export interface UpdateCheckoutShippingInput {
  sessionId: string;
  shipping: CheckoutShippingInput;
}

export interface ValidateCheckoutInput {
  sessionId: string;
}

export interface ProcessPaymentInput {
  sessionId: string;
  paymentMethodId: string;
  metadata?: Record<string, unknown>;
}

export interface CreateOrderInput {
  sessionId: string;
  metadata?: Record<string, unknown>;
}

// Response types
export interface SetShippingMethodResponse {
  setShippingMethod: {
    success: boolean;
    cart?: Cart;
    shipping?: CartShipping;
    errors?: GraphQLError[];
  };
}

export interface MergeCartsResponse {
  mergeCarts: {
    success: boolean;
    cart?: Cart;
    errors?: GraphQLError[];
  };
}

export interface ClearCartResponse {
  clearCart: {
    success: boolean;
    cart?: Cart;
    errors?: GraphQLError[];
  };
}

export interface ValidateCheckoutResponse {
  validateCheckout: {
    success: boolean;
    session?: CheckoutSession;
    isValid: boolean;
    errors?: GraphQLError[];
    warnings?: GraphQLError[];
  };
}

// Additional types for collections and categories
export interface CollectionsResponse {
  collections: Collection[];
  pagination?: PaginationInfo;
}

export interface CategoriesResponse {
  categories: Category[];
  pagination?: PaginationInfo;
}
