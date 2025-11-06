import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client'
import { v4 as uuidv4 } from 'uuid'
import type {
  Product,
  Cart,
  CartItem,
  CreateCartResponse,
  AddToCartResponse,
  RemoveFromCartResponse,
  UpdateCartItemResponse,
  ApplyDiscountResponse,
  RemoveDiscountResponse,
  SetShippingMethodResponse,
  MergeCartsResponse,
  ClearCartResponse,
  ValidateCheckoutResponse,
  CheckoutSession,
  CreateCheckoutResponse,
  UpdateCheckoutCustomerResponse,
  UpdateCheckoutShippingResponse,
  ProcessPaymentResponse,
  CreateOrderResponse,
  Address,
  Order,
  Collection,
  Category,
  CategoryTreeNode,
  PaginationInput,
  ProductFilterInput,
  ShippingProvider,
  ShippingMethod,
  PickupPoint,
  ParcelBox,
  CategoriesResponse,
  CollectionsResponse,
} from './types'
import type { PiShopClientConfig } from './config'
import { GET_PRODUCTS, GET_PRODUCT, GET_CATEGORIES, GET_CATEGORY, GET_COLLECTIONS, GET_COLLECTION, GET_CATEGORY_TREE } from './queries/products'
import {
  GET_CART,
  CREATE_CART,
  ADD_TO_CART,
  UPDATE_CART_ITEM,
  REMOVE_FROM_CART,
  SET_SHIPPING_METHOD,
  MERGE_CARTS,
  CLEAR_CART,
  GET_SHIPPING_PROVIDERS,
  GET_SHIPPING_METHODS,
  GET_PICKUP_POINTS,
  GET_PARCEL_BOXES,
} from './queries/cart'
import { APPLY_COUPON, REMOVE_COUPON } from './queries/discount'
import {
  CREATE_CHECKOUT,
  UPDATE_CHECKOUT_CUSTOMER,
  UPDATE_CHECKOUT_SHIPPING,
  PROCESS_PAYMENT,
  GET_CHECKOUT_SESSION,
  VALIDATE_CHECKOUT,
} from './queries/checkout'
import { CREATE_ORDER, GET_ORDER, GET_ORDERS, GET_ORDER_BY_NUMBER } from './queries/orders'
import { GET_COLLECTIONS_QUERY } from './queries/collection'

/**
 * Headless GraphQL client for PiShop e-commerce platform
 * 
 * @example
 * ```typescript
 * const client = new PiShopClient({
 *   apiUrl: 'https://api.pishop.com/graphql'
 * });
 * 
 * // Fetch products
 * const products = await client.getProducts();
 * 
 * // Add to cart
 * const cart = await client.addToCart(productId, 2);
 * ```
 */
export class PiShopClient {
  private client: ApolloClient;
  private _sessionId: string;
  private _cartId: string | null;
  private storage: Storage | null;

  private readonly CART_ID_KEY = 'pishop_cart_id';
  private readonly SESSION_ID_KEY = 'pishop_session_id';

  constructor(config: PiShopClientConfig) {
    // Setup storage
    this.storage = config.storage || (typeof localStorage !== 'undefined' ? localStorage : null);

    // Setup session ID
    if (config.sessionId) {
      this._sessionId = config.sessionId;
    } else if (this.storage) {
      const stored = this.storage.getItem(this.SESSION_ID_KEY);
      this._sessionId = stored || uuidv4();
      this.storage.setItem(this.SESSION_ID_KEY, this._sessionId);
    } else {
      this._sessionId = uuidv4();
    }

    // Setup cart ID
    if (config.cartId) {
      this._cartId = config.cartId;
    } else if (this.storage) {
      this._cartId = this.storage.getItem(this.CART_ID_KEY);
    } else {
      this._cartId = null;
    }

    // Create Apollo Client
    this.client = new ApolloClient({
      link: new HttpLink({ 
        uri: config.apiUrl,
        fetchOptions: {
          credentials: 'same-origin',
        },
      }),
      cache: new InMemoryCache({
        typePolicies: {
          Product: {
            fields: {
              images: {
                merge(_existing, incoming) {
                  return incoming;
                },
              },
              inventory: {
                merge(existing, incoming) {
                  return { ...existing, ...incoming };
                },
              },
            },
          },
          Cart: {
            fields: {
              totals: {
                merge(existing, incoming) {
                  return { ...existing, ...incoming };
                },
              },
            },
          },
          CartItem: {
            fields: {
              product: {
                merge(existing, incoming) {
                  return { ...existing, ...incoming };
                },
              },
            },
          },
        },
      }),
      defaultOptions: {
        query: {
          fetchPolicy: 'network-only',
          errorPolicy: 'all',
        },
        mutate: {
          errorPolicy: 'all',
        },
      },
    });
  }

  /**
   * Get current session ID
   */
  get sessionId(): string {
    return this._sessionId;
  }

  /**
   * Get current cart ID
   */
  get cartId(): string | null {
    return this._cartId;
  }

  /**
   * Set cart ID and optionally persist it
   */
  private setCartId(cartId: string): void {
    this._cartId = cartId;
    if (this.storage) {
      this.storage.setItem(this.CART_ID_KEY, cartId);
    }
  }

  // ==================== Product Operations ====================

  /**
   * Fetch all products with optional pagination and filtering
   *
   * @param pagination - Pagination options
   * @param filter - Filter options
   * @returns Promise resolving to array of products
   */
  async getProducts(
    pagination?: PaginationInput,
    filter?: ProductFilterInput
  ): Promise<Product[]> {
    try {
      const result = await this.client.query<{ products: Product[] }>({
        query: GET_PRODUCTS,
        variables: { pagination, filter },
      });

      if (result.error) {
        console.error('GraphQL error in getProducts:', result.error);
        return [];
      }

      return result.data?.products || [];
    } catch (error) {
      console.error('Error fetching products:', error);
      return [];
    }
  }

  /**
   * Fetch a single product by slug or ID
   *
   * @param slugOrId - Product slug or ID
   * @param variantSlug - Optional variant slug
   * @returns Promise resolving to product or null
   */
  async getProduct(slugOrId: string, variantSlug?: string): Promise<Product | null> {
    try {
      const isId = slugOrId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      const result = await this.client.query<{ product: Product }>({
        query: GET_PRODUCT,
        variables: isId ? { id: slugOrId, variantSlug } : { slug: slugOrId, variantSlug },
      });

      if (result.error) {
        console.error('GraphQL error in getProduct:', result.error);
        return null;
      }

      return result.data?.product || null;
    } catch (error) {
      console.error('Error fetching product:', error);
      return null;
    }
  }

  /**
   * Fetch all categories with optional pagination
   *
   * @param pagination - Pagination options
   * @returns Promise resolving to array of categories
   */
  async getCategories(pagination?: PaginationInput): Promise<Category[]> {
    try {
      const result = await this.client.query<CategoriesResponse>({
        query: GET_CATEGORIES,
        variables: { pagination },
      });

      if (result.error) {
        console.error('GraphQL error in getCategories:', result.error);
        return [];
      }

      return result.data?.categories || [];
    } catch (error) {
      console.error('Error fetching categories:', error);
      return [];
    }
  }

  /**
   * Fetch a single category by slug or ID
   *
   * @param slugOrId - Category slug or ID
   * @returns Promise resolving to category or null
   */
  async getCategory(slugOrId: string): Promise<Category | null> {
    try {
      const isId = slugOrId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      const result = await this.client.query<{ category: Category }>({
        query: GET_CATEGORY,
        variables: isId ? { id: slugOrId } : { slug: slugOrId },
      });

      if (result.error) {
        console.error('GraphQL error in getCategory:', result.error);
        return null;
      }

      return result.data?.category || null;
    } catch (error) {
      console.error('Error fetching category:', error);
      return null;
    }
  }

  /**
   * Fetch the complete category tree hierarchy
   *
   * @param options - Options for category tree retrieval
   * @returns Promise resolving to array of category tree nodes
   */
  async getCategoryTree(options?: {
    includeInactive?: boolean;
    maxDepth?: number;
    rootSlug?: string;
    includeCounts?: boolean;
    sortBy?: string;
    sortDirection?: string;
  }): Promise<CategoryTreeNode[]> {
    try {
      const result = await this.client.query<{ categoryTree: CategoryTreeNode[] }>({
        query: GET_CATEGORY_TREE,
        variables: options || {},
      });

      if (result.error) {
        console.error('GraphQL error in getCategoryTree:', result.error);
        return [];
      }

      return result.data?.categoryTree || [];
    } catch (error) {
      console.error('Error fetching category tree:', error);
      return [];
    }
  }

  /**
   * Fetch all collections with optional pagination
   *
   * @param pagination - Pagination options
   * @returns Promise resolving to array of collections
   */
  async getCollections(pagination?: PaginationInput): Promise<Collection[]> {
    try {
      const result = await this.client.query<CollectionsResponse>({
        query: GET_COLLECTIONS,
        variables: { pagination },
      });

      if (result.error) {
        console.error('GraphQL error in getCollections:', result.error);
        return [];
      }

      return result.data?.collections || [];
    } catch (error) {
      console.error('Error fetching collections:', error);
      return [];
    }
  }

  /**
   * Fetch a single collection by slug or ID
   *
   * @param slugOrId - Collection slug or ID
   * @returns Promise resolving to collection or null
   */
  async getCollection(slugOrId: string): Promise<Collection | null> {
    try {
      const isId = slugOrId.match(/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i);

      const result = await this.client.query<{ collection: Collection }>({
        query: GET_COLLECTION,
        variables: isId ? { id: slugOrId } : { slug: slugOrId },
      });

      if (result.error) {
        console.error('GraphQL error in getCollection:', result.error);
        return null;
      }

      return result.data?.collection || null;
    } catch (error) {
      console.error('Error fetching collection:', error);
      return null;
    }
  }

  // ==================== Cart Operations ====================

  /**
   * Fetch cart by ID
   * 
   * @param cartId - Cart ID (defaults to current cart)
   * @returns Promise resolving to cart or null
   */
  async getCart(cartId?: string): Promise<Cart | null> {
    const id = cartId || this._cartId;
    if (!id) return null;

    try {
      const { data } = await this.client.query<{ cart: Cart }>({
        query: GET_CART,
        variables: { id },
      });

      return data?.cart || null;
    } catch (error) {
      console.error('Failed to fetch cart:', error);
      return null;
    }
  }

  /**
   * Create a new cart
   * 
   * @returns Promise resolving to the created cart
   */
  async createCart(): Promise<Cart> {
    const { data } = await this.client.mutate<CreateCartResponse>({
      mutation: CREATE_CART,
      variables: {
        input: { sessionId: this._sessionId },
      },
    });

    if (!data?.createCart.success || !data.createCart.cart) {
      const error = data?.createCart.errors?.[0];
      throw new Error(error?.message || 'Failed to create cart');
    }

    this.setCartId(data.createCart.cart.id);
    return data.createCart.cart as Cart;
  }

  /**
   * Add a product to the cart
   * 
   * @param productId - Product ID
   * @param quantity - Quantity to add (default: 1)
   * @param variantId - Optional variant ID
   * @returns Promise resolving to updated cart and added item
   */
  async addToCart(
    productId: string,
    quantity: number = 1,
    variantId?: string
  ): Promise<{ cart: Cart; item: CartItem }> {
    // Ensure cart exists
    if (!this._cartId) {
      await this.createCart();
    }

    if (!this._cartId) {
      throw new Error('Failed to initialize cart');
    }

    const { data } = await this.client.mutate<AddToCartResponse>({
      mutation: ADD_TO_CART,
      variables: {
        input: {
          cartId: this._cartId,
          productId,
          quantity,
          variantId,
        },
      },
    });

    if (!data?.addToCart.success || !data.addToCart.cart) {
      const error = data?.addToCart.errors?.[0];
      throw new Error(error?.message || 'Failed to add to cart');
    }

    return {
      cart: data.addToCart.cart as Cart,
      item: data.addToCart.item as CartItem,
    };
  }

  /**
   * Update quantity of a cart item
   * 
   * @param itemId - Cart item ID
   * @param quantity - New quantity
   * @returns Promise resolving to updated cart and item
   */
  async updateCartItem(
    itemId: string,
    quantity: number
  ): Promise<{ cart: Cart; item: CartItem }> {
    if (!this._cartId) {
      throw new Error('No active cart');
    }

    const { data } = await this.client.mutate<UpdateCartItemResponse>({
      mutation: UPDATE_CART_ITEM,
      variables: {
        input: {
          cartId: this._cartId,
          itemId,
          quantity,
        },
      },
    });

    if (!data?.updateCartItem.success || !data.updateCartItem.cart) {
      const error = data?.updateCartItem.errors?.[0];
      throw new Error(error?.message || 'Failed to update cart item');
    }

    return {
      cart: data.updateCartItem.cart as Cart,
      item: data.updateCartItem.item as CartItem,
    };
  }

  /**
   * Remove an item from the cart
   * 
   * @param itemId - Cart item ID
   * @returns Promise resolving to updated cart
   */
  async removeFromCart(itemId: string): Promise<Cart> {
    if (!this._cartId) {
      throw new Error('No active cart');
    }

    const { data } = await this.client.mutate<RemoveFromCartResponse>({
      mutation: REMOVE_FROM_CART,
      variables: {
        input: {
          cartId: this._cartId,
          itemId,
        },
      },
    });

    if (!data?.removeFromCart.success || !data.removeFromCart.cart) {
      const error = data?.removeFromCart.errors?.[0];
      throw new Error(error?.message || 'Failed to remove from cart');
    }

    return data.removeFromCart.cart as Cart;
  }


  /**
   * Set shipping method for the cart
   *
   * @param methodId - Shipping method ID
   * @param destination - Shipping destination (address, pickup point, or parcel box)
   * @returns Promise resolving to updated cart with shipping method
   */
  async setShippingMethod(
    methodId: string,
    destination: {
      address?: {
        address: Address;
        contactName?: string;
      };
      pickupPoint?: { id: string };
      parcelBox?: { id: string };
    }
  ): Promise<Cart> {
    if (!this._cartId) {
      throw new Error('No active cart');
    }

    const { data } = await this.client.mutate<SetShippingMethodResponse>({
      mutation: SET_SHIPPING_METHOD,
      variables: {
        input: {
          cartId: this._cartId,
          methodId,
          destination,
        },
      },
    });

    if (!data?.setShippingMethod.success || !data.setShippingMethod.cart) {
      const error = data?.setShippingMethod.errors?.[0];
      throw new Error(error?.message || 'Failed to set shipping method');
    }

    return data.setShippingMethod.cart as Cart;
  }

  /**
   * Merge two carts (typically used when guest user logs in)
   *
   * @param sourceCartId - Cart to merge from
   * @param targetCartId - Cart to merge into
   * @param mergeStrategy - How to handle duplicate items
   * @returns Promise resolving to merged cart
   */
  async mergeCarts(
    sourceCartId: string,
    targetCartId: string,
    mergeStrategy: 'KEEP_TARGET' | 'KEEP_SOURCE' | 'MERGE_QUANTITIES' | 'ASK_USER' = 'MERGE_QUANTITIES'
  ): Promise<Cart> {
    const { data } = await this.client.mutate<MergeCartsResponse>({
      mutation: MERGE_CARTS,
      variables: {
        input: {
          sourceCartId,
          targetCartId,
          mergeStrategy,
        },
      },
    });

    if (!data?.mergeCarts.success || !data.mergeCarts.cart) {
      const error = data?.mergeCarts.errors?.[0];
      throw new Error(error?.message || 'Failed to merge carts');
    }

    // Update cart ID if target cart is current cart
    if (targetCartId === this._cartId) {
      this.setCartId(targetCartId);
    }

    return data.mergeCarts.cart as Cart;
  }

  /**
   * Clear all items from a cart
   *
   * @param cartId - Cart ID to clear (defaults to current cart)
   * @returns Promise resolving to empty cart
   */
  async clearCartItems(cartId?: string): Promise<Cart> {
    const id = cartId || this._cartId;
    if (!id) {
      throw new Error('No cart ID provided');
    }

    const { data } = await this.client.mutate<ClearCartResponse>({
      mutation: CLEAR_CART,
      variables: { cartId: id },
    });

    if (!data?.clearCart.success || !data.clearCart.cart) {
      const error = data?.clearCart.errors?.[0];
      throw new Error(error?.message || 'Failed to clear cart');
    }

    return data.clearCart.cart as Cart;
  }

  /**
   * Get all available shipping providers
   *
   * @returns Promise resolving to array of shipping providers
   */
  async getShippingProviders(): Promise<ShippingProvider[]> {
    const { data } = await this.client.query<{ shippingProviders: ShippingProvider[] }>({
      query: GET_SHIPPING_PROVIDERS,
    });

    return data?.shippingProviders || [];
  }

  /**
   * Get shipping methods for a specific provider
   *
   * @param providerId - Provider ID
   * @returns Promise resolving to array of shipping methods
   */
  async getShippingMethods(providerId: string): Promise<ShippingMethod[]> {
    const { data } = await this.client.query<{ shippingMethods: ShippingMethod[] }>({
      query: GET_SHIPPING_METHODS,
      variables: { providerId },
    });

    return data?.shippingMethods || [];
  }

  /**
   * Get available pickup points for an address
   *
   * @param address - Address to search around
   * @param limit - Maximum number of results
   * @returns Promise resolving to array of pickup points
   */
  async getPickupPoints(address: Address, limit?: number): Promise<PickupPoint[]> {
    const { data } = await this.client.query<{ pickupPoints: PickupPoint[] }>({
      query: GET_PICKUP_POINTS,
      variables: { address, limit },
    });

    return data?.pickupPoints || [];
  }

  /**
   * Get available parcel boxes for an address
   *
   * @param address - Address to search around
   * @param limit - Maximum number of results
   * @returns Promise resolving to array of parcel boxes
   */
  async getParcelBoxes(address: Address, limit?: number): Promise<ParcelBox[]> {
    const { data } = await this.client.query<{ parcelBoxes: ParcelBox[] }>({
      query: GET_PARCEL_BOXES,
      variables: { address, limit },
    });

    return data?.parcelBoxes || [];
  }

  // ==================== Coupon/Discount Operations ====================

  /**
   * Apply a coupon code to the cart
   * 
   * @param code - Coupon code to apply
   * @param sessionId - Optional session ID for checkout context
   * @returns Promise resolving to updated cart with discount applied
   */
  async applyCoupon(code: string, sessionId?: string): Promise<Cart> {
    if (!this._cartId) {
      throw new Error('No active cart');
    }

    const { data } = await this.client.mutate<ApplyDiscountResponse>({
      mutation: APPLY_COUPON,
      variables: {
        input: {
          cartId: this._cartId,
          code,
          sessionId,
        },
      },
    });

    if (!data?.applyDiscount.success || !data.applyDiscount.cart) {
      const error = data?.applyDiscount.errors?.[0];

      // Provide user-friendly error messages based on error codes
      if (error?.code === 'DISCOUNT_APPLY_FAILED') {
        // Check if this is a server-side issue (like NATS not available)
        if (error.message?.includes('nats:') || error.message?.includes('no responders available')) {
          throw new Error('Unable to apply coupon right now. Please try again later.');
        }
        // For other discount application failures, assume invalid coupon
        throw new Error('Invalid coupon code. Please check and try again.');
      }

      // Fallback for other error types
      throw new Error(error?.message || 'Failed to apply discount');
    }

    return data.applyDiscount.cart as Cart;
  }

  /**
   * Remove a coupon from the cart
   *
   * @param couponId - Coupon ID to remove
   * @param sessionId - Optional session ID for checkout context
   * @returns Promise resolving to updated cart with discount removed
   */
  async removeCoupon(couponId: string, sessionId?: string): Promise<Cart> {
    if (!this._cartId) {
      throw new Error('No active cart');
    }

    // First get the current cart to find the discountId
    const currentCart = await this.getCart();
    if (!currentCart) {
      throw new Error('No active cart');
    }

    // Find the discountId from the applied coupon
    const appliedCoupon = currentCart.appliedCoupons?.find(coupon => coupon.id === couponId);
    if (!appliedCoupon) {
      throw new Error('Coupon not found in cart');
    }

    const { data } = await this.client.mutate<RemoveDiscountResponse>({
      mutation: REMOVE_COUPON,
      variables: {
        input: {
          cartId: this._cartId,
          discountId: appliedCoupon.discountId,
          sessionId,
        },
      },
    });

    if (!data?.removeDiscount.success || !data.removeDiscount.cart) {
      const error = data?.removeDiscount.errors?.[0];
      throw new Error(error?.message || 'Failed to remove discount');
    }

    return data.removeDiscount.cart as Cart;
  }

  // ==================== Checkout Operations ====================

  /**
   * Create a checkout session from the current cart
   *
   * @param cartId - Optional cart ID. Uses current cart if not provided.
   * @param customer - Optional customer information
   * @param shipping - Optional shipping information
   * @returns Promise resolving to checkout session
   */
  async createCheckout(
    cartId?: string,
    customer?: {
      email: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      isGuest?: boolean;
      billingAddress?: Address;
      shippingAddress?: Address;
    },
    shipping?: {
      methodId: string;
      address: Address;
    }
  ): Promise<CheckoutSession> {
    const checkoutCartId = cartId || this._cartId;
    if (!checkoutCartId) {
      throw new Error('No active cart');
    }

    const { data } = await this.client.mutate<CreateCheckoutResponse>({
      mutation: CREATE_CHECKOUT,
      variables: {
        input: {
          cartId: checkoutCartId,
          customer,
          shipping,
        },
      },
    });

    if (!data?.createCheckout.success || !data.createCheckout.session) {
      const error = data?.createCheckout.errors?.[0];
      throw new Error(error?.message || 'Failed to create checkout');
    }

    return data.createCheckout.session as CheckoutSession;
  }

  /**
   * Update customer information in checkout session
   * 
   * @param sessionId - Checkout session ID
   * @param customer - Customer information
   * @returns Promise resolving to updated checkout session
   */
  async updateCheckoutCustomer(
    sessionId: string,
    customer: {
      email: string;
      firstName?: string;
      lastName?: string;
      phone?: string;
      isGuest?: boolean;
      billingAddress?: Address;
      shippingAddress?: Address;
    }
  ): Promise<CheckoutSession> {
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const { data } = await this.client.mutate<UpdateCheckoutCustomerResponse>({
      mutation: UPDATE_CHECKOUT_CUSTOMER,
      variables: {
        input: {
          sessionId,
          customer,
        },
      },
    });

    if (!data?.updateCheckoutCustomer.success || !data.updateCheckoutCustomer.session) {
      const error = data?.updateCheckoutCustomer.errors?.[0];
      throw new Error(error?.message || 'Failed to update customer');
    }

    return data.updateCheckoutCustomer.session as CheckoutSession;
  }

  /**
   * Update shipping information in checkout session
   * 
   * @param sessionId - Checkout session ID
   * @param shipping - Shipping information
   * @returns Promise resolving to updated checkout session
   */
  async updateCheckoutShipping(
    sessionId: string,
    shipping: {
      methodId: string;
      address: Address;
    }
  ): Promise<CheckoutSession> {
    if (!sessionId) {
      throw new Error('Session ID is required');
    }

    const { data } = await this.client.mutate<UpdateCheckoutShippingResponse>({
      mutation: UPDATE_CHECKOUT_SHIPPING,
      variables: {
        input: {
          sessionId,
          shipping,
        },
      },
    });

    if (!data?.updateCheckoutShipping.success || !data.updateCheckoutShipping.session) {
      const error = data?.updateCheckoutShipping.errors?.[0];
      throw new Error(error?.message || 'Failed to update shipping');
    }

    return data.updateCheckoutShipping.session as CheckoutSession;
  }

  /**
   * Process payment for checkout session
   * 
   * @param sessionId - Checkout session ID
   * @param paymentMethodId - Payment method ID
   * @returns Promise resolving to updated checkout session
   */
  async processPayment(sessionId: string, paymentMethodId: string): Promise<CheckoutSession> {
    const { data } = await this.client.mutate<ProcessPaymentResponse>({
      mutation: PROCESS_PAYMENT,
      variables: {
        input: {
          sessionId,
          paymentMethodId,
        },
      },
    });

    if (!data?.processPayment.success || !data.processPayment.session) {
      const error = data?.processPayment.errors?.[0];
      throw new Error(error?.message || 'Failed to process payment');
    }

    return data.processPayment.session as CheckoutSession;
  }

  /**
   * Get checkout session by ID
   *
   * @param sessionId - Checkout session ID
   * @returns Promise resolving to checkout session
   */
  async getCheckoutSession(sessionId: string): Promise<CheckoutSession> {
    const { data } = await this.client.query<{ checkoutSession: CheckoutSession }>({
      query: GET_CHECKOUT_SESSION,
      variables: { id: sessionId },
    });

    if (!data?.checkoutSession) {
      throw new Error('Checkout session not found');
    }

    return data.checkoutSession;
  }

  /**
   * Validate checkout session before payment
   *
   * @param sessionId - Checkout session ID
   * @returns Promise resolving to validation result
   */
  async validateCheckout(sessionId: string): Promise<{
    session: CheckoutSession;
    isValid: boolean;
    errors: any[];
    warnings: any[];
  }> {
    const { data } = await this.client.mutate<ValidateCheckoutResponse>({
      mutation: VALIDATE_CHECKOUT,
      variables: {
        input: { sessionId },
      },
    });

    if (!data?.validateCheckout.session) {
      const error = data?.validateCheckout.errors?.[0];
      throw new Error(error?.message || 'Failed to validate checkout');
    }

    return {
      session: data.validateCheckout.session as CheckoutSession,
      isValid: data.validateCheckout.isValid,
      errors: data.validateCheckout.errors || [],
      warnings: data.validateCheckout.warnings || [],
    };
  }

  /**
   * Create an order from checkout session
   *
   * @param sessionId - Checkout session ID
   * @returns Promise resolving to created order
   */
  async createOrder(sessionId: string): Promise<Order> {
    const { data } = await this.client.mutate<CreateOrderResponse>({
      mutation: CREATE_ORDER,
      variables: {
        input: {
          sessionId,
        },
      },
    });

    if (!data?.createOrder.success || !data.createOrder.order) {
      const error = data?.createOrder.errors?.[0];
      throw new Error(error?.message || 'Failed to create order');
    }

    // Clear cart after successful order
    this._cartId = null;
    if (this.storage) {
      this.storage.removeItem(this.CART_ID_KEY);
    }

    return data.createOrder.order as Order;
  }

  /**
   * Get order by ID
   *
   * @param orderId - Order ID
   * @returns Promise resolving to order
   */
  async getOrder(orderId: string): Promise<Order> {
    const { data } = await this.client.query<{ order: Order }>({
      query: GET_ORDER,
      variables: { id: orderId },
    });

    if (!data?.order) {
      throw new Error('Order not found');
    }

    return data.order;
  }

  /**
   * Get orders for a user or by email
   *
   * @param userId - User ID to filter orders
   * @param customerEmail - Customer email to filter orders
   * @param pagination - Pagination options
   * @returns Promise resolving to array of orders
   */
  async getOrders(
    userId?: string,
    customerEmail?: string,
    pagination?: PaginationInput
  ): Promise<Order[]> {
    const { data } = await this.client.query<{ orders: Order[] }>({
      query: GET_ORDERS,
      variables: { userId, customerEmail, pagination },
    });

    return data?.orders || [];
  }

  /**
   * Get order by order number
   *
   * @param orderNumber - Order number
   * @returns Promise resolving to order
   */
  async getOrderByNumber(orderNumber: string): Promise<Order> {
    const { data } = await this.client.query<{ orderByNumber: Order }>({
      query: GET_ORDER_BY_NUMBER,
      variables: { orderNumber },
    });

    if (!data?.orderByNumber) {
      throw new Error('Order not found');
    }

    return data.orderByNumber;
  }


  /**
   * Get direct access to the Apollo Client instance
   * For advanced use cases
   */
  getApolloClient(): ApolloClient {
    return this.client;
  }
}

const client = new PiShopClient({
  apiUrl: process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8080/storefront.graphql',
})

export default client