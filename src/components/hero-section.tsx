import { client } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import Link from 'next/link'
import { FaCartPlus, FaEye } from 'react-icons/fa'
import { HeroImage } from './ui/hero-image'
import { HeroCategoryMenu, type HeroCategoryMenuItem } from './hero-category-menu'

const HERO_MENU_MAX_CATEGORIES = 6

async function getHeroCategoryMenuItems(): Promise<HeroCategoryMenuItem[]> {
  try {
    const categoryTree = await client.getCategoryTree({ maxDepth: 2 })
    const topLevel = categoryTree.slice(0, HERO_MENU_MAX_CATEGORIES)

    return await Promise.all(
      topLevel.map(async (node) => {
        let featuredProduct = null
        try {
          const products = await client.getProducts(
            { limit: 1 },
            { category: node.category.slug, isActive: true },
          )
          featuredProduct = products[0] || null
        } catch (error) {
          console.error(`Failed to fetch featured product for category ${node.category.slug}:`, error)
        }
        return { node, featuredProduct }
      }),
    )
  } catch (error) {
    console.error('Failed to fetch category tree for hero menu:', error)
    return []
  }
}

export type HeroSectionProps = {
  productId?: string
  badgeText?: string
  overrideTitle?: string
  overrideDescription?: string
  backgroundImageUrl?: string
}

export const HeroSection = async ({ productId, badgeText, overrideTitle, overrideDescription, backgroundImageUrl }: HeroSectionProps = {}) => {
  const [product, heroMenuItems] = await Promise.all([
    client.getProduct(productId || 'akkumulatorcsipesz-200a-150-mm-piros').catch((error) => {
      console.error('Failed to fetch product:', error)
      return null
    }),
    getHeroCategoryMenuItems(),
  ])

  if (!product) {
    return null
  }

  return (
    <section className="relative w-full overflow-hidden bg-[#141414]" style={{ minHeight: '600px' }}>
      {/* Background image with dark gradient overlay */}
      <div
        className="absolute inset-0 bg-cover bg-left-top bg-no-repeat"
        style={{ backgroundImage: `url(${backgroundImageUrl || '/images/bg-slide-show.png'})` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/80 to-transparent" />

      <HeroCategoryMenu items={heroMenuItems} />

      <div className="relative z-10 mx-auto flex h-full min-h-[600px] max-w-[1280px] items-center px-5 sm:px-12 py-5">
        <div className="flex w-full flex-col-reverse items-center gap-8 md:flex-row md:py-0">

          {/* Left: Text content */}
          <div className="w-full md:w-1/2 flex flex-col justify-center md:pl-20 z-10">
            <div className="flex flex-col gap-5 text-center md:text-left">

              {/* Badge / price */}
              <div>
                <span className="font-heading text-sm font-bold uppercase tracking-widest text-white">
                  {badgeText || 'Best price:'}{' '}
                  <span className="text-primary">
                    {!badgeText && formatCurrency(product.basePrice.amount)}
                  </span>
                </span>
              </div>

              {/* Title — two lines like Dana: "Smart phone" / "galaxy S7 edge" */}
              <div className="font-heading text-white leading-tight">
                <span className="block text-4xl md:text-5xl font-light uppercase">
                  {overrideTitle ? overrideTitle.split(' ')[0] : 'Featured'}
                </span>
                <span className="block text-5xl md:text-6xl font-extrabold uppercase tracking-tight">
                  {overrideTitle || product.name}
                </span>
              </div>

              {/* Description */}
              {(overrideDescription || product.description) && (
                <p className="text-sm text-gray-300 leading-relaxed max-w-md mx-auto md:mx-0">
                  {(overrideDescription || product.description || '').substring(0, 200)}
                </p>
              )}

              {/* CTA buttons — Dana pill style */}
              <div className="flex flex-row justify-center md:justify-start gap-4 mt-4">
                <Link
                  href={`/product/${product.slug}`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full bg-[#333] px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-primary hover:text-[#212121]"
                >
                  <span>View Details</span>
                </Link>

                <Link
                  href={`/product/${product.slug}`}
                  className="group inline-flex h-12 items-center gap-2 rounded-full border-2 border-white/60 px-8 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:border-primary hover:text-primary"
                >
                  <FaCartPlus className="text-lg" />
                  <span>Buy Now</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right: Product image */}
          <div className="w-full md:w-1/2 flex justify-center md:p-5 relative z-10 mt-8 md:mt-0">
            {product.images[0]?.url && (
              <HeroImage>
                <Image
                  src={product.images[0].url}
                  alt={product.images[0].altText || product.name}
                  width={500}
                  height={500}
                  className="object-contain"
                  priority
                />
              </HeroImage>
            )}
          </div>
        </div>

        {/* Slide indicators */}
        <div className="absolute bottom-8 left-0 flex w-full justify-center gap-3">
          <div className="flex gap-2">
            <span className="h-3 w-3 rounded-full bg-primary ring-2 ring-primary ring-offset-2 ring-offset-[#141414]" />
            <span className="h-3 w-3 rounded-full bg-white/30 transition-colors hover:bg-primary" />
            <span className="h-3 w-3 rounded-full bg-white/30 transition-colors hover:bg-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
