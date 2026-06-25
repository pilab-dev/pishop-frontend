import { client } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'
import Image from 'next/image'
import { FaCartPlus, FaEye } from 'react-icons/fa'
import { HeroButton } from './ui/hero-button'
import { HeroImage } from './ui/hero-image'

export type HeroSectionProps = {
  productId?: string
  badgeText?: string
  overrideTitle?: string
  overrideDescription?: string
  backgroundImageUrl?: string
}

export const HeroSection = async ({ productId, badgeText, overrideTitle, overrideDescription, backgroundImageUrl }: HeroSectionProps = {}) => {
  let product: Awaited<ReturnType<typeof client.getProduct>> = null
  try {
    product = await client.getProduct(productId || 'akkumulatorcsipesz-200a-150-mm-piros')
  } catch (error) {
    console.error('Failed to fetch product:', error)
    // Continue with null - section will still render
  }

  if (!product) {
    return null
  }

  return (
    <div className="w-full bg-[#f8f8f8] relative overflow-hidden" style={{ minHeight: '600px', backgroundImage: `url(${backgroundImageUrl || '/images/bg-slide-show.png'})`, backgroundSize: 'cover', backgroundPosition: 'left top', backgroundRepeat: 'no-repeat' }}>
      <div className="mx-auto px-5 sm:px-12 py-5 max-w-[1280px] h-full relative z-10">
        <div className="flex flex-col-reverse md:flex-row items-center pt-10 pb-20 md:py-0" style={{ minHeight: '600px' }}>
          
          <div className="w-full md:w-1/2 flex flex-col justify-center pl-0 md:pl-20 z-10">
            <div className="flex flex-col gap-6 justify-center content-center">
              
              <div className="text-center md:text-left">
                <span className="text-sm font-bold uppercase tracking-widest text-primary">
                  {badgeText || 'Best Price:'} <span className="text-gray-800">{!badgeText && formatCurrency(product.basePrice.amount)}</span>
                </span>
              </div>
              
              <div className="text-[#333] text-5xl md:text-6xl uppercase leading-tight drop-shadow-sm">
                <span className="font-light block">{overrideTitle ? 'Featured' : 'Featured'}</span>
                <span className="font-extrabold block tracking-tight">{overrideTitle || product.name}</span>
              </div>
              
              <div>
                {(overrideDescription || product.description) && (
                  <span
                    className="text-lg text-gray-500 font-normal leading-relaxed block max-w-md"
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
                  buttonClasses="bg-[#333] text-white hover:bg-primary transition-colors"
                  href={`/product/${product.slug}`}
                />

                <HeroButton
                  icon={<FaCartPlus fontSize={16} className="text-[#333]" />}
                  text="Buy now"
                  buttonClasses="bg-transparent border-2 border-[#333] text-[#333] hover:border-primary hover:text-primary transition-colors"
                  ping
                />
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/2 md:p-5 flex justify-center mt-12 md:mt-0 relative z-10">
            <HeroImage>
              <Image
                src={product.images[0]?.url || '/images/fit-bear-yellow.webp'}
                alt={product.images[0]?.altText || product.name}
                width={500}
                height={500}
                className="object-contain"
                priority
              />
            </HeroImage>
          </div>
        </div>
        
        <div className="absolute bottom-10 left-0 w-full flex justify-center gap-3">
          <div className="flex gap-2">
            <span className="w-3 h-3 rounded-full bg-primary ring-2 ring-primary ring-offset-2 cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary transition-colors cursor-pointer"></span>
            <span className="w-3 h-3 rounded-full bg-gray-300 hover:bg-primary transition-colors cursor-pointer"></span>
          </div>
        </div>
      </div>
    </div>
  )
}
