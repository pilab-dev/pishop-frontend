import {
  CollectionsApi,
  Configuration,
  ProductsApi,
} from "@/lib/pishop-client";

const BASE_PATH = "http://localhost:8081/api";

const headers = {
  "Content-Type": "application/json",
  "X-Shop-Id": "pishop-aggregated",
};

/**
 * @see https://github.com/pilab/pishop-client
 */
const productsApi = new ProductsApi(
  new Configuration({
    basePath: BASE_PATH,
    headers,
  }),
);

const collectionsApi = new CollectionsApi(
  new Configuration({
    basePath: BASE_PATH,
    headers,
  }),
);

interface MenuItem {
  title: string;
  path: string;
}

const categories: MenuItem[] = [
  { title: "Headphone", path: "headphone" },
  { title: "Smart watch", path: "smartwatch" },
  { title: "Smartphone", path: "smartphone" },
  { title: "Game console", path: "console" },
  { title: "Laptop", path: "laptop" },
  { title: "Television", path: "television" },
];

/**
 * @see https://github.com/pilab-dev/pishop-client
 */
const getCategories = async () => {
  return categories;
};

export { collectionsApi, getCategories, productsApi };
