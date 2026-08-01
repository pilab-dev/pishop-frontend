import Image from 'next/image'
import Link from 'next/link'
import { MdRefresh, MdFavoriteBorder, MdShoppingCart } from 'react-icons/md'
import { FancyTitle } from './fancy-title'
import { SectionDecor } from './ui/section-decor'
import { Product } from '@/lib/client'
import { formatCurrency } from '@/lib/formatCurrrency'

export type FeaturedProductSectionProps = {
  title?: string
  product?: Product
}

export const FeaturedProductSection = ({ title = "Featured Product", product }: FeaturedProductSectionProps) => {
  if (!product) return null;

  return (
    <div className="bg-white py-14">
      <div className="max-w-[1280px] mx-auto px-5">
        <h2 className="flex items-center uppercase text-4xl font-bold mb-10">
          <SectionDecor />
          <FancyTitle label={title} />
        </h2>

        <div className="flex flex-col md:flex-row items-center gap-10 bg-white relative">
          {/* Faint background circle decor */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border-[40px] border-gray-50 rounded-full z-0 pointer-events-none"></div>

          {/* Left Side: Large Product & Thumbnails */}
          <div className="flex-1 w-full relative z-10 flex flex-col items-center">
            <div className="w-full max-w-[500px] h-[400px] relative mb-10">
              <Link href={`/product/${product.slug}`}>
                <Image
                  src={product.images[0]?.url || "/images/headphone.webp"}
                  alt={product.images[0]?.altText || product.name}
                  fill
                  className="object-contain hover:scale-105 transition-transform duration-500 drop-shadow-xl"
                />
              </Link>
            </div>

            <div className="text-center mb-6">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                <Link href={`/product/${product.slug}`} className="hover:text-primary transition-colors">{product.name}</Link>
              </h3>
              <p className="text-xs text-gray-400 max-w-xs mx-auto line-clamp-2">
                {product.shortDescription || product.description?.slice(0, 80) || 'Product description'}
              </p>
            </div>

            {/* Color Thumbnails */}
            <div className="flex gap-4">
              {product.images.slice(0, 4).map((img, idx) => (
                <div key={idx} className={`w-12 h-12 rounded-full border border-gray-200 p-1 cursor-pointer hover:border-primary transition-colors`}>
                  <div className="w-full h-full rounded-full bg-gray-100 relative overflow-hidden">
                    <Image src={img.url || '/images/headphone.webp'} alt={img.altText || 'color'} fill className="object-cover" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side: Stack of thumbnails & Popout Card */}
          <div className="w-full md:w-auto relative z-10 flex flex-row md:flex-col gap-4 justify-center">
            {/* Top Thumbnail */}
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center p-2 cursor-pointer hover:shadow-md transition-shadow">
              <Image
                src={product.images[1]?.url || product.images[0]?.url || "/images/headphone.webp"}
                alt="thumb 1"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>

            {/* Middle Thumbnail (Active with popout) */}
            <div className="relative group flex items-center">
              {/* The Thumbnail itself */}
              <div className="w-24 h-24 bg-white border-2 border-gray-800 rounded shadow-lg flex items-center justify-center p-2 cursor-pointer z-20 relative">
                <Image
                  src={product.images[0]?.url || "/images/headphone.webp"}
                  alt="thumb 2"
                  width={80}
                  height={80}
                  className="object-contain"
                />
              </div>

              {/* The Popout Card (Extends to the left) */}
              <div className="hidden md:flex absolute right-[50%] top-1/2 transform -translate-y-1/2 bg-gray-900 text-white w-[380px] p-6 shadow-2xl z-10 transition-all duration-300 pr-16 items-center">
                {/* Red badge */}
                {product.tags && product.tags.length > 0 && (
                  <div className="absolute -top-3 -left-3 bg-red-500 text-white text-xs font-bold px-2 py-1 z-20">
                    {product.tags[0]}
                  </div>
                )}

                <div className="flex-1">
                  <div className="text-primary text-xs font-bold mb-1 uppercase">{product.categories?.[0]?.title || 'Product'}</div>
                  <h4 className="font-bold text-lg mb-2 line-clamp-1">{product.name}</h4>
                  <p className="text-xs text-gray-400 mb-4 line-clamp-2">
                    {product.shortDescription || product.description?.slice(0, 80)}
                  </p>
                  <p className="text-sm font-bold uppercase mb-4">
                    PRICE: <span className="text-primary">{formatCurrency(product.basePrice.amount)}</span>
                  </p>
                  <div className="flex gap-2">
                    <button className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center text-gray-400 hover:bg-white hover:text-gray-900 transition-colors border border-gray-700">
                      <MdRefresh size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-white hover:text-blue-600 transition-colors">
                      <MdFavoriteBorder size={14} />
                    </button>
                    <button className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center hover:bg-white hover:text-primary transition-colors">
                      <MdShoppingCart size={14} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Thumbnail */}
            <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center p-2 cursor-pointer hover:shadow-md transition-shadow">
              <Image
                src={product.images[2]?.url || product.images[0]?.url || "/images/headphone.webp"}
                alt="thumb 3"
                width={80}
                height={80}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
