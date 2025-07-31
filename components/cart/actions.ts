"use server";

import { cartApi } from "@/lib/client";
import { TAGS } from "@/lib/constants";
import { CartItem } from "@pilab/pishop-client";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const addToCart = async (cartId: string, cartItemLines: CartItem[]) => {
  return cartApi.addCartItems({
    cartId: cartId,
    cartItemLine: cartItemLines,
  });
};

export const getCart = async (cartId: string) => {
  return cartApi.getCart({ cartId });
};

const removeFromCart = async (cartId: string, items: string[]) => {
  return cartApi.removeCartItems({
    cartId: cartId,
    requestBody: items,
  });
};

const updateCart = async (cartId: string, items: CartItem[]) => {
  return cartApi.updateCartItems({
    cartId: cartId,
    cartItemLine: items,
  });
};

const createCart = async () => {
  return await cartApi.createCart();
};

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await addToCart(cartId, [
      { merchandise: { id: selectedVariantId }, quantity: 1 },
    ]);
    revalidateTag(TAGS.cart);
  } catch (e) {
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines!.find(
      (line) => line.merchandise?.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      await removeFromCart(cartId, [lineItem.id]);
      revalidateTag(TAGS.cart);
    } else {
      return "Item not found in cart";
    }
  } catch (e) {
    return "Error removing item from cart";
  }
}

export async function updateItemQuantity(
  prevState: any,
  payload: {
    merchandiseId: string;
    quantity: number;
  },
) {
  let cartId = (await cookies()).get("cartId")?.value;

  if (!cartId) {
    return "Missing cart ID";
  }

  const { merchandiseId, quantity } = payload;

  try {
    const cart = await getCart(cartId);

    if (!cart) {
      return "Error fetching cart";
    }

    const lineItem = cart.lines!.find(
      (line) => line.merchandise?.id === merchandiseId,
    );

    if (lineItem && lineItem.id) {
      if (quantity === 0) {
        await removeFromCart(cartId, [lineItem.id]);
      } else {
        await updateCart(cartId, [
          {
            id: lineItem.id,
            merchandise: { id: merchandiseId },
            quantity,
          },
        ]);
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await addToCart(cartId, [
        { merchandise: { id: merchandiseId }, quantity },
      ]);
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  let cartId = (await cookies()).get("cartId")?.value;
  let cart = await getCart(cartId!);

  redirect(cart!.checkoutUrl!);
}

export async function createCartAndSetCookie() {
  let { cartId } = await createCart();
  (await cookies()).set("cartId", cartId!);
}
