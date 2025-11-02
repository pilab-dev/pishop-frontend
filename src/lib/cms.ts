'use server'
// import { CartApi, Configuration, ProductApi } from "@pilab/pishop-client";

const headers = {
  'Content-Type': 'application/json',
  'X-Shop-Id': 'pishop-aggregated',
}

interface MenuItem {
  title: string
  path: string
}

const collections: MenuItem[] = [
  { title: 'Headphone', path: 'headphone' },
  { title: 'Smart watch', path: 'smartwatch' },
  { title: 'Smartphone', path: 'smartphone' },
  { title: 'Game console', path: 'console' },
  { title: 'Laptop', path: 'laptop' },
  { title: 'Television', path: 'television' },
]

/**
 * @see https://github.com/pilab-dev/pishop-client
 */
const getCollections = async () => {
  return collections
}

export { getCollections }
