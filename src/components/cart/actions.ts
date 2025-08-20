"use server";

import { mockedCartApi } from "@/lib/cart";
import { TAGS } from "@/lib/constants";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const getCart = async (cartId: string) => {
  return mockedCartApi.getCart({ cartId });
};

export async function addItem(
  prevState: any,
  selectedVariantId: string | undefined,
) {
  const cartId = (await cookies()).get("cartId")?.value;

  if (!cartId || !selectedVariantId) {
    return "Error adding item to cart";
  }

  try {
    await mockedCartApi.addCartItems({
      cartId,
      cartItemLines: [{ merchandiseId: selectedVariantId, quantity: 1 }],
    });
    revalidateTag(TAGS.cart);
  } catch (e: unknown) {
    console.error(e);
    return "Error adding item to cart";
  }
}

export async function removeItem(prevState: any, merchandiseId: string) {
  const cartId = (await cookies()).get("cartId")?.value;

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
      await mockedCartApi.removeCartItems({
        cartId,
        requestBody: [lineItem.id],
      });
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
  const cartId = (await cookies()).get("cartId")?.value;

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
        await mockedCartApi.removeCartItems({
          cartId,
          requestBody: [lineItem.id],
        });
      } else {
        await mockedCartApi.updateCartItems({
          cartId,
          cartItemLine: [
            {
              id: lineItem.id,
              merchandiseId: merchandiseId,
              quantity,
            },
          ],
        });
      }
    } else if (quantity > 0) {
      // If the item doesn't exist in the cart and quantity > 0, add it
      await mockedCartApi.addCartItems({
        cartId,
        cartItemLines: [{ merchandiseId: merchandiseId, quantity }],
      });
    }

    revalidateTag(TAGS.cart);
  } catch (e) {
    console.error(e);
    return "Error updating item quantity";
  }
}

export async function redirectToCheckout() {
  const cartId = (await cookies()).get("cartId")?.value;
  const cart = await getCart(cartId!);

  redirect(cart!.checkoutUrl!);
}

export async function createCartAndSetCookie() {
  const { id: cartId } = await mockedCartApi.createCart();
  if (cartId) {
    (await cookies()).set("cartId", cartId);
  }
}
