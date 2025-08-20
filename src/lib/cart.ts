import { cookies } from "next/headers";
import { v4 as uuidv4 } from "uuid";
import { getPayload } from "payload";
import config from "../payload.config";
import type { Product } from "../payload-types";

// These are simplified types based on what the cart components expect.
// They are not the same as the ones from `@pilab/pishop-client`.
export interface CartItem {
  id: string;
  quantity: number;
  merchandise: {
    id: string;
    product: Product;
  };
  cost: {
    totalAmount: {
      amount: number;
      currencyCode: string;
    };
  };
}

export interface Cart {
  id: string;
  checkoutUrl: string;
  lines: CartItem[];
  totalQuantity: number;
  cost: {
    subtotalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalAmount: {
      amount: string;
      currencyCode: string;
    };
    totalTaxAmount: {
      amount: string;
      currencyCode: string;
    };
  };
}

const getCartFromCookie = (): Cart | undefined => {
  const cartCookie = cookies().get("mock_cart")?.value;
  if (cartCookie) {
    try {
      return JSON.parse(cartCookie);
    } catch (_e) {
      return undefined;
    }
  }
  return undefined;
};

const setCartCookie = (cart: Cart) => {
  cookies().set("mock_cart", JSON.stringify(cart));
};

const createCart = async (): Promise<Cart> => {
  const newCart: Cart = {
    id: uuidv4(),
    checkoutUrl: "/checkout", // Mock checkout URL
    lines: [],
    totalQuantity: 0,
    cost: {
      subtotalAmount: { amount: "0", currencyCode: "USD" },
      totalAmount: { amount: "0", currencyCode: "USD" },
      totalTaxAmount: { amount: "0", currencyCode: "USD" },
    },
  };
  setCartCookie(newCart);
  return newCart;
};

const getCart = async ({ cartId }: { cartId: string }): Promise<Cart> => {
  let cart = getCartFromCookie();
  if (!cart || cart.id !== cartId) {
    // If the cart in cookie doesn't match the id, or doesn't exist, create a new one
    // In a real scenario, we might fetch it from a DB.
    cart = await createCart();
  }
  return cart;
};

const addCartItems = async ({
  cartId,
  cartItemLines,
}: {
  cartId: string;
  cartItemLines: { merchandiseId: string; quantity: number }[];
}): Promise<Cart> => {
  const payload = await getPayload({ config });
  const cart = await getCart({ cartId });

  for (const line of cartItemLines) {
    const existingLine = cart.lines.find(
      (l) => l.merchandise.id === line.merchandiseId,
    );

    if (existingLine) {
      existingLine.quantity += line.quantity;
    } else {
      const product = await payload.findByID({
        collection: "products",
        id: line.merchandiseId,
      });

      if (product) {
        cart.lines.push({
          id: uuidv4(),
          quantity: line.quantity,
          merchandise: {
            id: line.merchandiseId,
            product,
          },
          cost: {
            totalAmount: {
              amount: product.priceRange?.minVariantPrice?.amount || 0,
              currencyCode:
                product.priceRange?.minVariantPrice?.currencyCode || "USD",
            },
          },
        });
      }
    }
  }

  recalculateCartTotals(cart);
  setCartCookie(cart);
  return cart;
};

const removeCartItems = async ({
  cartId,
  requestBody,
}: {
  cartId: string;
  requestBody: string[];
}): Promise<Cart> => {
  const cart = await getCart({ cartId });
  cart.lines = cart.lines.filter((line) => !requestBody.includes(line.id));
  recalculateCartTotals(cart);
  setCartCookie(cart);
  return cart;
};

const updateCartItems = async ({
  cartId,
  cartItemLine,
}: {
  cartId: string;
  cartItemLine: { id: string, merchandiseId: string; quantity: number }[];
}): Promise<Cart> => {
  const cart = await getCart({ cartId });

  for (const line of cartItemLine) {
    const existingLine = cart.lines.find((l) => l.id === line.id);
    if (existingLine) {
      if (line.quantity === 0) {
        cart.lines = cart.lines.filter((l) => l.id !== line.id);
      } else {
        existingLine.quantity = line.quantity;
      }
    }
  }

  recalculateCartTotals(cart);
  setCartCookie(cart);
  return cart;
};

const recalculateCartTotals = (cart: Cart) => {
  cart.totalQuantity = cart.lines.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = cart.lines.reduce(
    (sum, item) =>
      sum + item.cost.totalAmount.amount * item.quantity,
    0,
  );
  const currencyCode = cart.lines[0]?.cost.totalAmount.currencyCode || "USD";

  cart.cost = {
    subtotalAmount: { amount: totalAmount.toString(), currencyCode },
    totalAmount: { amount: totalAmount.toString(), currencyCode },
    totalTaxAmount: { amount: "0", currencyCode }, // Mocked tax
  };
};

export const mockedCartApi = {
  createCart,
  getCart,
  addCartItems,
  removeCartItems,
  updateCartItems,
};
