/**
 * Seeds the Payload CMS with the homepage, header, footer, and promotions
 * using real product IDs from pi-shop-api's GraphQL gateway.
 *
 * Run with: NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8091/storefront.graphql bun run scripts/seed-home.ts
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
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`)
  }
  return json.data.products
}

// Payload's afterChange/afterDelete hooks call Next.js's revalidatePath/revalidateTag,
// which throw when there's no live Next.js request context (always true for this
// standalone script). Passing disableRevalidate through context skips the call.
const skipRevalidate = { disableRevalidate: true }

async function main() {
  const payload = await getPayload({ config })

  // Clean only seed-created media
  const existingMedia = await payload.find({
    collection: 'media',
    where: { alt: { like: SEED_MARKER } },
    limit: 1000,
  })
  for (const doc of existingMedia.docs) {
    await payload.delete({ collection: 'media', id: doc.id, context: skipRevalidate })
  }
  if (existingMedia.docs.length > 0) {
    console.log(`Removed ${existingMedia.docs.length} previously seeded media docs.`)
  }

  const products = await fetchProducts(50)
  if (products.length < 12) {
    throw new Error(`Expected at least 12 products, found ${products.length}.`)
  }
  console.log(`Fetched ${products.length} products from GraphQL API`)

  // Index products by slug for easy lookup
  const bySlug = (slug: string) => {
    const p = products.find((p) => p.slug === slug)
    if (!p) console.warn(`  WARNING: product "${slug}" not found in GraphQL API`)
    return p
  }

  const uploadMedia = async (fileName: string, altSuffix: string) => {
    const alt = `${SEED_MARKER} ${altSuffix}`
    const filePath = path.resolve(process.cwd(), 'public/assets/images/products', fileName)
    if (!fs.existsSync(filePath)) {
      console.warn(`  WARNING: ${filePath} not found, skipping`)
      return null
    }
    const data = fs.readFileSync(filePath)
    const doc = await payload.create({
      collection: 'media',
      context: skipRevalidate,
      data: { alt },
      file: { data, mimetype: 'image/jpeg', name: fileName, size: data.length },
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
  // Upload a logo for header/footer (reuse hero image 1 as placeholder)
  const logoForGlobals = await uploadMedia('1.jpg', 'Site logo placeholder')

  // ─── HEADER GLOBAL ───
  console.log('Seeding Header global...')
  try {
    await payload.updateGlobal({
      slug: 'header',
      context: skipRevalidate,
      data: {
        logo: logoForGlobals,
        navItems: [
          {
            link: { type: 'custom', url: '/', label: 'Home' },
          },
          {
            link: { type: 'custom', url: '/collections/all', label: 'Shop' },
          },
          {
            link: { type: 'custom', url: '/blog', label: 'Blog' },
          },
          {
            link: { type: 'custom', url: '/about', label: 'About' },
          },
          {
            link: { type: 'custom', url: '/contact', label: 'Contact' },
          },
        ],
        collectionItems: [
          { label: 'Headphones', collection: 'headphones' },
          { label: 'Smartphones', collection: 'smartphones' },
          { label: 'Laptops', collection: 'laptops' },
          { label: 'Watches', collection: 'watches' },
        ],
      },
    })
    console.log('  Header global updated.')
  } catch (err) {
    console.error('  Failed to update Header global:', err)
  }

  // ─── FOOTER GLOBAL ───
  console.log('Seeding Footer global...')
  try {
    await payload.updateGlobal({
      slug: 'footer',
      context: skipRevalidate,
      data: {
        logo: logoForGlobals,
        contactInformation: {
          contactEmail: 'shop@pilab.hu',
          contactPhone: '+36 70 171 2997',
          contactAddress: 'HU 1067 Budapest, Bajza u. 1',
        },
        navItems: [
          { link: { type: 'custom', url: '/', label: 'Home' } },
          { link: { type: 'custom', url: '/about', label: 'About Us' } },
          { link: { type: 'custom', url: '/blog', label: 'Blog' } },
          { link: { type: 'custom', url: '/contact', label: 'Contact Us' } },
          { link: { type: 'custom', url: '/docs', label: 'FAQs' } },
          { link: { type: 'custom', url: '/order-tracking', label: 'Order Tracking' } },
        ],
        copy: `© 2024-${new Date().getFullYear()}, PiShop by Progressive Innovation LAB`,
      },
    })
    console.log('  Footer global updated.')
  } catch (err) {
    console.error('  Failed to update Footer global:', err)
  }

  // ─── HOME PAGE ───
  console.log('Seeding Home page...')
  const existing = await payload.find({
    collection: 'pages',
    where: { slug: { equals: 'home' } },
    limit: 1,
  })
  if (existing.docs.length > 0) {
    console.log('  Deleting existing Home page...')
    await payload.delete({ collection: 'pages', id: existing.docs[0].id, context: skipRevalidate })
  }

  // Product categories from the real catalog
  const laptops = ['macbook-air-m2', 'lenovo-thinkpad-x1', 'dell-xps-13', 'hp-spectre-x360', 'custom-field-test-laptop']
  const phones = ['iphone-15', 'galaxy-s7-edge', 'pixel-8-pro', 'oneplus-12']
  const watches = ['apple-watch-sport-green', 'sony-smartwatch-2-sw2', 'mota-smartwatch-g2-pro', 'zeaplus-watch-dm360']
  const headphones = ['sony-wh-1000xm5', 'beats-studio-wireless', 'jbl-tune-wireless', 'skullcandy-shakedown']
  const cameras = ['canon-eos-1200d']

  await payload.create({
    collection: 'pages',
    context: skipRevalidate,
    data: {
      title: 'Home',
      _status: 'published',
      slug: 'home',
      elements: [
        // 1. Hero Slider
        {
          blockType: 'heroSlider',
          title: 'Hero Slider',
          slides: [
            { product: bySlug('macbook-air-m2')?.id, badgeText: 'Best price:', overrideTitle: 'MacBook Air M2', backgroundImage: heroImages[0] },
            { product: bySlug('iphone-15')?.id, badgeText: 'Best price:', overrideTitle: 'iPhone 15', backgroundImage: heroImages[1] },
            { product: bySlug('sony-wh-1000xm5')?.id, badgeText: 'Best price:', overrideTitle: 'Sony WH-1000XM5', backgroundImage: heroImages[2] },
          ].filter((s) => s.product),
        },

        // 2. Promo Banners
        {
          blockType: 'promoBanners',
          title: 'Promo Banners',
          banners: [
            { image: bannerImages[0], heading: 'Fly Camera', subheading: 'Hot Product', link: '/collections/cameras' },
            { image: bannerImages[1], heading: 'MacBook Air M2', subheading: 'Full-HD Laptop', priceText: 'From 155 000 Ft', ctaText: 'Buy now', link: '/collections/laptops' },
            { image: bannerImages[2], heading: 'Big Summer Sale', subheading: 'Headphones', priceText: 'Up to 45% off', link: '/collections/headphones' },
          ].filter((b) => b.image),
        },

        // 3. Best Proposes
        {
          blockType: 'bestProposes',
          title: 'Best Proposes',
          layout: 'grid',
          tabs: [
            { label: 'Featured' },
            { label: 'On sale' },
            { label: 'Top rate' },
          ],
          primary: {
            productId: bySlug('macbook-air-m2')?.id,
            badgeIcon: 'laptop',
            badgeColor: 'red',
          },
          secondary: [
            { productId: bySlug('iphone-15')?.id, badgeIcon: 'smartphone', badgeColor: 'blue' },
            { productId: bySlug('sony-wh-1000xm5')?.id, badgeIcon: 'headphones', badgeColor: 'green' },
          ].filter((s) => s.productId),
        },

        // 4. Popular Products
        {
          blockType: 'popularProduct',
          title: 'Popular Product',
          categories: [
            { label: 'Laptops', icon: 'laptop', products: laptops.map((slug) => ({ productId: bySlug(slug)?.id })).filter((p) => p.productId) },
            { label: 'Smartphones', icon: 'smartphone', products: phones.map((slug) => ({ productId: bySlug(slug)?.id })).filter((p) => p.productId) },
            { label: 'Watches', icon: 'watch', products: watches.map((slug) => ({ productId: bySlug(slug)?.id })).filter((p) => p.productId) },
            { label: 'Headphones', icon: 'headphones', products: headphones.map((slug) => ({ productId: bySlug(slug)?.id })).filter((p) => p.productId) },
          ],
        },

        // 5. Product Slider
        {
          blockType: 'productSlider',
          title: 'Best Sellers',
          subtitle: 'Our most popular products',
          columns: '4',
          showPrice: true,
          products: [...headphones, ...laptops.slice(0, 3), ...watches.slice(0, 2)]
            .map((slug) => ({ productId: bySlug(slug)?.id }))
            .filter((p) => p.productId),
        },

        // 6. Brand Logos
        {
          blockType: 'brandLogos',
          title: 'Brand Logos',
          logos: logoImages.filter(Boolean).map((imageId) => ({ image: imageId, link: '/' })),
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
