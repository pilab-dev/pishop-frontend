/**
 * Seeds a minimal "home" Page in the local Payload CMS so the storefront
 * homepage (which is fully CMS-driven) has something to render locally.
 *
 * Run with: bun run scripts/seed-home.ts
 * Requires: pi-shop-api's GraphQL gateway reachable at NEXT_PUBLIC_GRAPHQL_URL
 * (or http://localhost:8091/storefront.graphql) with seeded products, and the
 * frontend's own Payload MongoDB reachable via DATABASE_URI.
 */
import fs from 'fs'
import path from 'path'
import { getPayload } from 'payload'
import config from '../src/payload.config'

const GRAPHQL_URL = process.env.NEXT_PUBLIC_GRAPHQL_URL || 'http://localhost:8091/storefront.graphql'
const SEED_MARKER = '[seed-home]'

type Product = { id: string; name: string; slug: string }

async function fetchProducts(limit: number): Promise<Product[]> {
  const res = await fetch(GRAPHQL_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: `{ products(pagination: {page: 1, limit: ${limit}}) { id name slug } }`,
    }),
  })
  const json = await res.json()
  if (json.errors) {
    throw new Error(`GraphQL error fetching products: ${JSON.stringify(json.errors)}`)
  }
  return json.data.products
}

// The Pages afterChange/afterDelete hooks call Next.js's revalidatePath, which
// throws when there's no live Next.js request context (always true for this
// standalone script). That throw happens inside the hook, which runs as part
// of the same transaction as the write itself - Payload aborts the write
// rather than committing it, so catching the error afterwards is too late,
// the page never actually gets created. Passing disableRevalidate through
// context (which revalidatePage.ts explicitly checks for) skips the call
// instead of throwing-and-catching around it.
const skipRevalidate = { disableRevalidate: true }

async function main() {
  const payload = await getPayload({ config })

  // Only ever touch media this script created itself (tagged via the alt-text
  // prefix below) - never delete media belonging to the rest of the site
  // (e.g. the Header/Footer logo), which a blanket "delete all media" would
  // wipe out.
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { like: SEED_MARKER } },
    limit: 1000,
  })
  for (const doc of existingMedia.docs) {
    await payload.delete({ collection: 'media', id: doc.id })
  }
  if (existingMedia.docs.length > 0) {
    console.log(`Removed ${existingMedia.docs.length} previously seeded media docs.`)
  }

  const products = await fetchProducts(20)
  if (products.length < 12) {
    throw new Error(`Expected at least 12 seeded products, found ${products.length}. Seed pi-shop-api first.`)
  }
  console.log(`Fetched ${products.length} products from ${GRAPHQL_URL}`)

  const byIndex = (i: number) => products[i % products.length]

  const uploadMedia = async (fileName: string, altSuffix: string) => {
    const alt = `${SEED_MARKER} ${altSuffix}`
    const filePath = path.resolve(process.cwd(), 'public/assets/images/products', fileName)
    const data = fs.readFileSync(filePath)
    const doc = await payload.create({
      collection: 'media',
      data: { alt },
      file: {
        data,
        mimetype: 'image/jpeg',
        name: fileName,
        size: data.length,
      },
    })
    return doc.id
  }

  console.log('Uploading media...')
  const heroImages = await Promise.all([
    uploadMedia('1.jpg', 'Hero background 1'),
    uploadMedia('2.jpg', 'Hero background 2'),
    uploadMedia('3.jpg', 'Hero background 3'),
  ])
  const bannerImages = await Promise.all([
    uploadMedia('4.jpg', 'Promo banner 1'),
    uploadMedia('5.jpg', 'Promo banner 2'),
    uploadMedia('6.jpg', 'Promo banner 3'),
  ])
  const logoImages = await Promise.all([
    uploadMedia('7.jpg', 'Brand logo 1'),
    uploadMedia('8.jpg', 'Brand logo 2'),
    uploadMedia('9.jpg', 'Brand logo 3'),
    uploadMedia('10.jpg', 'Brand logo 4'),
  ])

  console.log('Creating home page...')
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log('Home page already exists, deleting before re-seeding...')
    await payload.delete({ collection: 'pages', id: existing.docs[0].id, context: skipRevalidate })
  }

  await payload.create({
    collection: 'pages',
    context: skipRevalidate,
    data: {
      title: 'Home',
      _status: 'published',
      slug: 'home',
      elements: [
        {
          blockType: 'heroSlider',
          title: 'Hero Slider',
          slides: [0, 1, 2].map((i) => ({
            product: byIndex(i).id,
            badgeText: 'Featured',
            backgroundImage: heroImages[i],
          })),
        },
        {
          blockType: 'promoBanners',
          title: 'Promo Banners',
          banners: [
            { image: bannerImages[0], heading: 'Fly Camera', subheading: 'Hot Product', link: '/collections/electronics' },
            { image: bannerImages[1], heading: 'HP Envy Laptop', priceText: 'From $1200', ctaText: 'Buy now', link: '/collections/electronics' },
            { image: bannerImages[2], heading: 'Big Summer Sale', subheading: 'Headphones', priceText: 'Up to 45% off', link: '/collections/electronics' },
          ],
        },
        {
          blockType: 'featuredProduct',
          title: 'Featured Product',
          product: byIndex(3).id,
        },
        {
          blockType: 'bestSellers',
          title: 'Best Sellers',
          source: 'manual',
          products: [4, 5, 6, 7, 8, 9].map((i, idx) => ({
            productId: byIndex(i).id,
            salesRank: idx + 1,
            sortOrder: idx,
          })),
        },
        {
          blockType: 'miniProductList',
          title: 'Mini Product List',
          newArrivals: [10, 11, 12].map((i) => ({ product: byIndex(i).id })),
          topRated: [13, 14, 15].map((i) => ({ product: byIndex(i).id })),
          bestSellers: [16, 17, 18].map((i) => ({ product: byIndex(i).id })),
        },
        {
          blockType: 'brandLogos',
          title: 'Brand Logos',
          logos: logoImages.map((imageId) => ({ image: imageId, link: '/' })),
        },
      ],
    } as never,
  })

  console.log('Home page created successfully.')
  process.exit(0)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
