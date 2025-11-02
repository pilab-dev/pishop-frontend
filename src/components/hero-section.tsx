import { client } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import { FaCartPlus, FaEye } from 'react-icons/fa'
import { HeroButton } from './ui/hero-button'
import { HeroImage } from './ui/hero-image'

export const HeroSection = async () => {
  let product: Awaited<ReturnType<typeof client.getProduct>> = null
  try {
    product = await client.getProduct('gaming-headset')
  } catch (error) {
    console.error('Failed to fetch product:', error)
    // Continue with null - section will still render
  }

  if (!product) {
    return null
  }

  return (
    <div className="hero-bg w-full page-gray-900">
      <div className="mx-auto px-5 sm:px-12 py-5 max-w-[1280px]">
        <div className="flex flex-col-reverse md:flex-row">
          <div className="w-full md:w-1/2">
            <div className="flex flex-col gap-5 justify-start content-center min-h-[448px]">
              <div className="mt-5 text-center md:text-left">
                <span className="text-2xl font-bold">
                  <span className="align-super">Best Price:</span>
                  <span className="text-primary text-5xl font-mono italic">
                    {' '}
                    {formatCurrency(product.basePrice.amount)}
                  </span>
                  <span className="pl-1 text-sm font-normal italic align-top">HUF</span>
                </span>
              </div>
              <div>
                <span className="text-6xl font-black uppercase">{product.name}</span>
              </div>
              <div>
                {product.description && (
                  <span
                    className="text-lg font-normal"
                    dangerouslySetInnerHTML={{
                      // That was descriptionHtml, but it's not working
                      __html: product.description.substring(0, 300),
                    }}
                  />
                )}
              </div>

              {/* This is a button area */}
              <div className="flex flex-row justify-around gap-5 align-center">
                <HeroButton
                  icon={<FaEye fontSize={20} />}
                  text="View details"
                  buttonClasses="bg-gray-400"
                  href={`/product/${product.slug}`}
                />

                <HeroButton icon={<FaCartPlus fontSize={20} />} text="Add to wishlist" ping />
              </div>
            </div>
          </div>
          <div className="w-full md:w-1/2 md:p-5">
            <HeroImage>
              <Image
                src={product.images[0]?.url || '/images/fit-bear-yellow.webp'}
                alt={product.images[0]?.altText || product.name}
                width={1000}
                height={1000}
              />
            </HeroImage>
          </div>
        </div>
      </div>
    </div>
  )
}
