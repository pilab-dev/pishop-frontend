import { GridTileImage } from '@/components/grid/tile'
import { Product } from '@/lib/client'
import Link from 'next/link'

type ThreeItemGridProps = {
  item: Product
  size: 'full' | 'half'
  priority?: boolean
}

function ThreeItemGridItem({ item, size, priority }: ThreeItemGridProps) {
  return (
    <div
      className={size === 'full' ? 'md:col-span-4 md:row-span-2' : 'md:col-span-2 md:row-span-1'}
    >
      <Link
        className="relative block aspect-square h-full w-full"
        href={`/product/${item.slug}`}
        prefetch={true}
      >
        <GridTileImage
          src={item.images?.[0]?.url || ''}
          fill
          sizes={
            size === 'full' ? '(min-width: 768px) 66vw, 100vw' : '(min-width: 768px) 33vw, 100vw'
          }
          priority={priority}
          alt={item.name}
          label={{
            position: size === 'full' ? 'center' : 'bottom',
            title: item.name,
            amount: item.basePrice.amount.toString(),
            currencyCode: item.basePrice.currencyCode,
          }}
        />
      </Link>
    </div>
  )
}

export async function ThreeItemGrid() {
  // Collections that start with `hidden-*` are hidden from the search page.
  // const homepageItems = await getCollectionProducts({
  //   collection: "hidden-homepage-featured-items",
  // });

  const homepageItems: Product[] = [
    {
      id: '1',
      sku: 'PROD-1',
      name: 'Product 1',
      slug: 'product-1',
      basePrice: {
          amount: 1002,
          currencyCode: 'HUF',
      },
      isActive: true,
      images: [{ id: '1', url: '/images/product1.jpg', altText: 'Product 1' }],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '2',
      sku: 'PROD-2',
      name: 'Product 2',
      slug: 'product-2',
      basePrice: {
          amount: 1000,
          currencyCode: 'HUF',
      },
      isActive: true,
      images: [{ id: '2', url: '/images/product2.jpg', altText: 'Product 2' }],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    {
      id: '3',
      sku: 'PROD-3',
      name: 'Product 3',
      slug: 'product-3',
      basePrice: {
          amount: 5000,
          currencyCode: 'HUF',
      },
      isActive: true,
      images: [{ id: '3', url: '/images/product3.jpg', altText: 'Product 3' }],
      tags: [],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
  ]

  if (!homepageItems[0] || !homepageItems[1] || !homepageItems[2]) return null

  const [firstProduct, secondProduct, thirdProduct] = homepageItems

  return (
    <section className="mx-auto grid max-w-screen-2xl gap-4 px-4 pb-4 md:grid-cols-6 md:grid-rows-2 lg:max-h-[calc(100vh-200px)]">
      <ThreeItemGridItem size="full" item={firstProduct} priority={true} />
      <ThreeItemGridItem size="half" item={secondProduct} priority={true} />
      <ThreeItemGridItem size="half" item={thirdProduct} />
    </section>
  )
}
