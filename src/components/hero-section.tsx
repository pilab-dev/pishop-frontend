import { client } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import { FaCartPlus, FaEye } from 'react-icons/fa'
import { HeroButton } from './ui/hero-button'
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
    <div className="w-full page-gray-950 relative overflow-hidden" style={{ minHeight: '600px', backgroundImage: `url(${backgroundImageUrl || '/images/bg-slide-show.png'})`, backgroundSize: 'cover', backgroundPosition: 'left top', backgroundRepeat: 'no-repeat' }}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/85 to-[#141414]/40 pointer-events-none" />
      <HeroCategoryMenu items={heroMenuItems} />
      <div className="mx-auto px-5 sm:px-12 py-5 max-w-[1280px] h-full relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center pt-10 pb-20 md:py-0" style={{ minHeight: '600px' }}>

          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-20 z-10">
            <div className="flex flex-col gap-6 justify-center content-center">

              <div className="text-center md:text-left">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  {badgeText || 'Best Price:'} <span className="text-white">{!badgeText && formatCurrency(product.basePrice.amount)}</span>
                </span>
              </div>

              <div className="text-white text-5xl md:text-6xl uppercase leading-tight drop-shadow-sm">
                <span className="font-light block">{overrideTitle ? 'Featured' : 'Featured'}</span>
                <span className="font-extrabold block tracking-tight">{overrideTitle || product.name}</span>
              </div>

              <div>
                {(overrideDescription || product.description) && (
                  <span
                    className="text-lg text-gray-300 font-normal leading-relaxed block max-w-md"
                    dangerouslySetInnerHTML={{
                      __html: (overrideDescription || product.description || '').substring(0, 300),
                    }}
                  />
                )}
              </div>

              {/* This is a button area */}
              <div className="flex flex-row justify-start gap-4 align-center mt-6">
                <HeroButton
                  icon={<FaEye fontSize={16} />}
                  text="View detail"
                  buttonClasses="bg-[#333] border-[#333] text-white hover:bg-primary hover:border-primary hover:text-[#212121] transition-colors"
                  href={`/product/${product.slug}`}
                />

                <HeroButton
                  icon={<FaCartPlus fontSize={16} className="text-[#212121]" />}
                  text="Buy now"
                  buttonClasses="bg-transparent border-white/60 text-white hover:border-primary hover:text-primary transition-colors"
                  knobClasses="bg-primary text-[#212121]"
                  ping
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:p-5 flex justify-center mt-12 md:mt-0 relative z-10">
            {product.images[0]?.url ? (
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
            ) : null}
          </div>
        </div>

        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary ring-offset-2 ring-offset-[#141414] cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-white/30 hover:bg-primary transition-colors cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-white/30 hover:bg-primary transition-colors cursor-pointer"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
