# PiShop Headless Client

A framework-agnostic GraphQL client for the PiShop e-commerce platform. Works in Node.js, browsers, React, Vue, or any JavaScript environment.

## Installation

```bash
npm install @pishop/client
# or from this project:
# import from 'src/client'
```

## Quick Start

```typescript
import { PiShopClient } from './client';

// Initialize the client
const client = new PiShopClient({
  apiUrl: 'https://api.pishop.com/graphql'
});

// Fetch products
const products = await client.getProducts({
  pagination: { page: 1, limit: 20 },
  filter: { isActive: true }
});

// Get a single product
const product = await client.getProduct('product-slug');

// Add to cart
const result = await client.addToCart(product.id, 2);
console.log('Cart:', result.cart);
console.log('Added item:', result.item);

// Get current cart
const cart = await client.getCart();

// Update cart item quantity
await client.updateCartItem(itemId, 5);

// Remove from cart
await client.removeFromCart(itemId);
```

## Configuration

```typescript
interface PiShopClientConfig {
  // Required: GraphQL API endpoint
  apiUrl: string;

  // Optional: Custom session ID
  sessionId?: string;

  // Optional: Custom cart ID
  cartId?: string;

  // Optional: Storage adapter (defaults to localStorage)
  storage?: Storage;
}
```

## Usage Examples

### Browser Environment

```typescript
const client = new PiShopClient({
  apiUrl: 'https://api.pishop.com/graphql'
});

// Session and cart IDs are automatically persisted in localStorage
```

### Node.js Environment

```typescript
import { PiShopClient } from './client';

// Custom storage implementation for Node.js
class NodeStorage implements Storage {
  private data: Map<string, string> = new Map();
  
  get length() { return this.data.size; }
  
  getItem(key: string) { return this.data.get(key) || null; }
  setItem(key: string, value: string) { this.data.set(key, value); }
  removeItem(key: string) { this.data.delete(key); }
  clear() { this.data.clear(); }
  key(index: number) { return Array.from(this.data.keys())[index] || null; }
}

const client = new PiShopClient({
  apiUrl: 'https://api.pishop.com/graphql',
  storage: new NodeStorage()
});
```

### React Hook Example

```typescript
import { PiShopClient } from './client';
import { useState, useEffect } from 'react';

const client = new PiShopClient({
  apiUrl: import.meta.env.VITE_GRAPHQL_URL
});

function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    client.getProducts({ filter: { isActive: true } })
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  return { products, loading };
}

function useCart() {
  const [cart, setCart] = useState(null);

  const addToCart = async (productId: string, quantity: number = 1) => {
    const result = await client.addToCart(productId, quantity);
    setCart(result.cart);
    return result;
  };

  const refreshCart = async () => {
    const cart = await client.getCart();
    setCart(cart);
  };

  useEffect(() => {
    refreshCart();
  }, []);

  return { cart, addToCart, refreshCart };
}
```

### CLI Tool Example

```typescript
#!/usr/bin/env node
import { PiShopClient } from './client';

const client = new PiShopClient({
  apiUrl: process.env.PISHOP_API_URL || 'http://localhost:8000/graphql',
  sessionId: process.env.SESSION_ID
});

// List products
async function listProducts() {
  const products = await client.getProducts();
  console.table(products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.basePrice.amount / 100,
    currency: p.basePrice.currencyCode
  })));
}

// Add to cart via CLI
async function addProductToCart(productId: string, quantity: number) {
  const result = await client.addToCart(productId, quantity);
  console.log('Added to cart:', result.item);
  console.log('Cart total:', result.cart.totals.total);
}

// View cart
async function viewCart() {
  const cart = await client.getCart();
  if (!cart) {
    console.log('Cart is empty');
    return;
  }
  
  console.log('Cart ID:', cart.id);
  console.log('Items:', cart.items.length);
  console.table(cart.items.map(item => ({
    product: item.product.name,
    quantity: item.quantity,
    price: item.totalPrice.amount / 100
  })));
  console.log('Total:', cart.totals.total.amount / 100, cart.totals.total.currencyCode);
}

// Run CLI commands
const [,, command, ...args] = process.argv;

switch (command) {
  case 'products':
    await listProducts();
    break;
  case 'add':
    await addProductToCart(args[0], parseInt(args[1] || '1'));
    break;
  case 'cart':
    await viewCart();
    break;
  default:
    console.log('Usage: pishop-cli [products|add|cart]');
}
```

## API Reference

### Product Operations

#### `getProducts(pagination?, filter?)`

Fetch all products with optional pagination and filtering.

**Parameters:**
- `pagination` - `{ page?: number, limit?: number }`
- `filter` - `{ isActive?: boolean, tags?: string[], search?: string }`

**Returns:** `Promise<Product[]>`

#### `getProduct(slugOrId)`

Fetch a single product by slug or ID.

**Parameters:**
- `slugOrId` - Product slug (string) or UUID

**Returns:** `Promise<Product | null>`

### Cart Operations

#### `getCart(cartId?)`

Fetch cart by ID. Uses current cart if no ID provided.

**Returns:** `Promise<Cart | null>`

#### `createCart()`

Create a new cart with the current session.

**Returns:** `Promise<Cart>`

#### `addToCart(productId, quantity?, variantId?)`

Add a product to the cart.

**Parameters:**
- `productId` - Product UUID
- `quantity` - Quantity to add (default: 1)
- `variantId` - Optional variant UUID

**Returns:** `Promise<{ cart: Cart, item: CartItem }>`

#### `updateCartItem(itemId, quantity)`

Update quantity of a cart item.

**Parameters:**
- `itemId` - Cart item UUID
- `quantity` - New quantity

**Returns:** `Promise<{ cart: Cart, item: CartItem }>`

#### `removeFromCart(itemId)`

Remove an item from the cart.

**Parameters:**
- `itemId` - Cart item UUID

**Returns:** `Promise<Cart>`

#### `clearCart()`

Clear the current cart ID from storage.

### Coupon/Discount Operations

#### `applyCoupon(code)`

Apply a coupon code to the cart.

**Parameters:**
- `code` - Coupon code string

**Returns:** `Promise<Cart>`

**Example:**
```typescript
try {
  const cart = await client.applyCoupon('SUMMER2024');
  console.log('Discount applied:', cart.totals.discount);
} catch (error) {
  console.error('Invalid coupon code');
}
```

#### `removeCoupon(code)`

Remove a coupon from the cart.

**Parameters:**
- `code` - Coupon code string to remove

**Returns:** `Promise<Cart>`

**Example:**
```typescript
const cart = await client.removeCoupon('SUMMER2024');
```

### Utility Methods

#### `sessionId`

Get the current session ID (readonly).

#### `cartId`

Get the current cart ID (readonly).

#### `getApolloClient()`

Get direct access to the underlying Apollo Client for advanced use cases.

## TypeScript Support

The client is written in TypeScript and provides full type definitions for all operations.

```typescript
import type { Product, Cart, CartItem, Money } from './client';
```

## Error Handling

All operations throw errors that should be caught:

```typescript
try {
  await client.addToCart(productId, 1);
} catch (error) {
  console.error('Failed to add to cart:', error.message);
}
```

## License

MIT

