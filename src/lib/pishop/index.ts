import { revalidateTag } from "next/cache";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

import { Cart, Collection, Menu, Page, Product } from "./types";

import { TAGS } from "@/lib/constants";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function getMenu(handle: string): Promise<Menu[]> {
  if (handle === "next-js-frontend-footer-menu") {
    return [
      { title: "Home", path: "/" },
      { title: "Collections", path: "/search" },
      { title: "Shop", path: "/shop" },
      { title: "About", path: "/about" },
      { title: "Contact", path: "/contact" },
    ];
  }

  if (handle === "next-js-frontend-header-menu") {
    return [
      { title: "Collections", path: "/search" },
      { title: "Shop", path: "/shop" },
      { title: "About", path: "/about" },
    ];
  }

  const response = await fetch(`${API_BASE}/api/menu`);
  const data = (await response.json()) as Menu[];

  return data;
}

export async function getCart(cartId?: string): Promise<Cart | undefined> {
  const response = await fetch(`${API_BASE}/api/carts/${cartId}`);

  if (response.status > 400) {
    return undefined;
  }

  return (await response.json()) as Cart;
}

export async function addToCart(
  cartId: string,
  lines: { id?: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const response = await fetch(`${API_BASE}/api/carts/${cartId}`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lines),
  });

  return (await response.json()) as Cart;
}

export async function removeFromCart(
  cartId: string,
  lines: string[],
): Promise<Cart> {
  const response = await fetch(`${API_BASE}/api/carts/${cartId}`, {
    method: "DELETE",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lines),
  });

  return (await response.json()) as Cart;
}

export async function createCart(): Promise<string> {
  const response = await fetch(`${API_BASE}/api/carts`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
  });

  type CartResponse = {
    cartId: string;
  };

  return ((await response.json()) as CartResponse).cartId;
}

export async function updateCart(
  cartId: string,
  lines: { id: string; merchandiseId: string; quantity: number }[],
): Promise<Cart> {
  const response = await fetch(`${API_BASE}/api/carts/${cartId}`, {
    method: "PATCH",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(lines),
  });

  return (await response.json()) as Cart;
}

export async function updateCartContact(
  cartId: string,
  contact: any,
): Promise<Cart> {
  const response = await fetch(`${API_BASE}/api/carts/${cartId}/contact`, {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(contact),
  });

  return (await response.json()) as Cart;
}

export async function getCollections(): Promise<Collection[]> {
  const response = await fetch(`${API_BASE}/api/collections`);

  return (await response.json()) as Collection[];
}

export async function getCollection(handle: string): Promise<Collection> {
  const response = await fetch(`${API_BASE}/api/collections/${handle}`);

  return (await response.json()) as Collection;
}

export async function getProducts({
  query,
  reverse,
  sortKey,
}: {
  query?: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
   
  console.log("ListProducts", query, reverse, sortKey);
  const response = await fetch(`${API_BASE}/api/products`);

  return (await response.json()) as Product[];
}

export async function getCollectionProducts({
  collection,
  reverse,
  sortKey,
}: {
  collection: string;
  reverse?: boolean;
  sortKey?: string;
}): Promise<Product[]> {
  const response = await fetch(
    `${API_BASE}/api/collections/${collection}?r=${reverse || false}&sortKey=${sortKey || "CREATED"}`,
  );

  return (await response.json()) as Product[];
}

export async function getProduct(handle: string): Promise<Product | undefined> {
  const response = await fetch(`${API_BASE}/api/product/${handle}`);

  return (await response.json()) as Product;
}

export async function getProductRecommendations(
  handle: string,
): Promise<Product[]> {
   
  console.log("getProductRecommendations", handle);
  const response = await fetch(
    `${API_BASE}/api/products/${handle}/recommendations`,
  );

  return (await response.json()) as Product[];
}

export async function getPage(handle: string): Promise<Page> {
  const response = await fetch(`${API_BASE}/api/pages/${handle}`);

  return (await response.json()) as Page;
}

export async function getPages(): Promise<Page[]> {
  const response = await fetch(`${API_BASE}/api/pages`);

  return (await response.json()) as Page[];
}

export async function getSiteInfo(): Promise<any> {
  return {
    title: "PiLAB Store",
    description: "Progressive Innovation LAB demo shop",
    url: "https://shop.pilab.hu",
  };
}

export async function revalidate(req: NextRequest): Promise<NextResponse> {
  // We always need to respond with a 200 status code to Shopify,
  // otherwise it will continue to retry the request.
  const collectionWebhooks = [
    "collections/create",
    "collections/delete",
    "collections/update",
  ];
  const productWebhooks = [
    "products/create",
    "products/delete",
    "products/update",
  ];
  const topic = (await headers()).get("x-shopify-topic") || "unknown";
  const secret = req.nextUrl.searchParams.get("secret");
  const isCollectionUpdate = collectionWebhooks.includes(topic);
  const isProductUpdate = productWebhooks.includes(topic);

  if (!secret || secret !== process.env.REVALIDATION_SECRET) {
     
    console.error("Invalid revalidation secret.");

    return NextResponse.json({ status: 401 });
  }

  if (!isCollectionUpdate && !isProductUpdate) {
    // We don't need to revalidate anything for any other topics.
    return NextResponse.json({ status: 200 });
  }

  if (isCollectionUpdate) {
    revalidateTag(TAGS.collections, 'default');
  }

  if (isProductUpdate) {
    revalidateTag(TAGS.products, 'default');
  }

  return NextResponse.json({ status: 200, revalidated: true, now: Date.now() });
}
