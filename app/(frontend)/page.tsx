import { BentoBox, BentoBoxItem } from '@/components/BentoBox'
import { FancyTitle } from '@/components/fancy-title'
import { HeroSection } from '@/components/hero-section'
import { BestSellersSection } from '@/components/products/best-sellers-section'
import { HotDealsSection } from '@/components/products/hot-deals-section'
import { ProductGrid } from '@/components/products/product-grid'
import { SectionDecor } from '@/components/ui/section-decor'
import { client } from '@/lib/client'
import { getBestSellerProducts, getFeaturedProduct } from '@/lib/product-helpers'

export default async function Home() {
  // return permanentRedirect("/home");

  let products: Awaited<ReturnType<typeof client.getProducts>> = []
  let bestSellerProducts: Awaited<ReturnType<typeof getBestSellerProducts>> = []
  let featuredProduct: Awaited<ReturnType<typeof getFeaturedProduct>> = null

  try {
    products = await client.getProducts({
      page: 1,
      limit: 8,
    })

    // Fetch best seller products
    bestSellerProducts = await getBestSellerProducts(undefined, 8)
    featuredProduct = await getFeaturedProduct()
  } catch (error) {
    console.error('Failed to fetch products:', error)
    // Continue with empty arrays - page will still render
  }

  return (
    <>
      <HeroSection />
      <BentoBox className="max-w-[1280px] mx-auto">
        <BentoBoxItem className="col-span-1 md:col-span-2 row-span-1 md:row-span-2">
          <h2 className="text-2xl font-bold">Featured Product</h2>
        </BentoBoxItem>
        <BentoBoxItem>
          <h2 className="text-xl font-bold">New Arrivals</h2>
        </BentoBoxItem>
        <BentoBoxItem>
          <h2 className="text-xl font-bold">On Sale</h2>
        </BentoBoxItem>
      </BentoBox>

      {/* <TopSalesSection /> */}

      <div className="bg-gray-100 pt-14 pb-5">
        <section className="max-w-[1280px] mx-auto px-5 pt-5">
          <h2 className="flex items-center uppercase text-3xl font-bold">
            <SectionDecor />
            <FancyTitle>Popular Product</FancyTitle>
          </h2>
        </section>

        <main>
          <div className="mx-auto max-w-7xl pt-5 px-2 md:px-6 flex-grow">
            <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
              <ProductGrid products={products ?? []} />
            </section>
          </div>

          <HotDealsSection products={products ?? []} />

          <BestSellersSection
            title="Best Sellers"
            categories={["Top20", "Headphones", "Laptop & PC", "Smartphone", "Watch"]}
            featuredProduct={featuredProduct || undefined}
            products={bestSellerProducts}
          />
        </main>
      </div>
    </>
  )
}
