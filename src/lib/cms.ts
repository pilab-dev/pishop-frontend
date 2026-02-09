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
