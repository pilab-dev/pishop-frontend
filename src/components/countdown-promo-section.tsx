import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaSync, FaShoppingCart } from 'react-icons/fa'
import ProductButtons from './products/product-buttons'
import { formatCurrency } from '@/lib/formatCurrrency'

export const CountdownPromoSection = () => {
  return (
    <div className="bg-white py-14">
      <div className="max-w-[1280px] mx-auto px-5">
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side: Countdown Promo */}
          <div className="flex-1 relative bg-gray-50 flex flex-col justify-between overflow-hidden group">
            {/* Background decorative triangle */}
            <div className="absolute top-0 right-0 w-0 h-0 border-l-[300px] border-l-transparent border-t-[400px] border-t-yellow-400 z-0"></div>
            
            <div className="relative z-10 w-full h-[400px] flex items-center justify-center p-8 mt-4">
              <Image 
                src="/images/headphone.webp" 
                alt="IPHONE 6S SILVER-64GB"
                width={300}
                height={400}
                className="object-contain transform -rotate-[15deg] hover:rotate-0 transition-transform duration-500 drop-shadow-2xl"
              />
            </div>
            
            <div className="relative z-10 bg-white border-t border-gray-100 p-6 flex flex-col items-center">
              <h3 className="text-sm font-bold uppercase tracking-wider mb-2">
                IPHONE 6S SILVER-64GB
              </h3>
              <p className="text-xs font-bold text-gray-500 mb-6 uppercase">
                SALE OFF: <span className="text-yellow-500">$250.00</span> <span className="line-through text-gray-300 font-normal ml-1">$370.00</span>
              </p>
              
              <div className="flex w-full max-w-sm justify-between text-xs text-gray-400 font-medium mb-2 px-4 uppercase">
                <span>Already sold <span className="text-gray-800 font-bold">16</span></span>
                <span>Available <span className="text-gray-800 font-bold">5</span></span>
              </div>
              
              {/* Progress bar */}
              <div className="w-full max-w-sm h-1 bg-gray-200 rounded-full mb-6">
                <div className="h-full bg-yellow-400 rounded-full" style={{ width: '75%' }}></div>
              </div>
              
              {/* Countdown Timer */}
              <div className="flex gap-4 mb-6">
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-800 rounded mb-1">02</div>
                  <span className="text-[10px] text-gray-500 uppercase">Day</span>
                </div>
                <div className="text-2xl font-bold text-gray-300 mt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-800 rounded mb-1">24</div>
                  <span className="text-[10px] text-gray-500 uppercase">Hours</span>
                </div>
                <div className="text-2xl font-bold text-gray-300 mt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-800 rounded mb-1">35</div>
                  <span className="text-[10px] text-gray-500 uppercase">Mins</span>
                </div>
                <div className="text-2xl font-bold text-gray-300 mt-2">:</div>
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 bg-white border border-gray-200 flex items-center justify-center text-lg font-bold text-gray-800 rounded mb-1">02</div>
                  <span className="text-[10px] text-gray-500 uppercase">Secs</span>
                </div>
              </div>

              <div className="flex justify-center gap-3">
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-gray-800 hover:text-white transition-colors">
                  <FaSync size={10} />
                </button>
                <button className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center text-gray-500 hover:bg-blue-600 hover:text-white transition-colors">
                  <FaHeart size={10} />
                </button>
                <button className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <FaShoppingCart size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: 3 Products Grid */}
          <div className="flex-1 flex flex-col gap-6">
            
            {/* Top row: 1 large product spanning full width */}
            <div className="bg-white border border-gray-100 p-8 flex flex-row items-center justify-between hover:shadow-lg transition-shadow group h-[300px]">
              <div className="flex flex-col z-10 w-1/2">
                <span className="text-xs text-blue-600 mb-1">Watch</span>
                <h3 className="text-lg font-bold text-gray-800 mb-1 products-font">Mota SmartWatch G2 Pro</h3>
                <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                  PRICE: <span className="text-yellow-500 text-sm">$ 250.00</span>
                </p>
                <ul className="text-xs text-gray-500 list-disc pl-4 space-y-1 mb-6">
                  <li>Windows 10</li>
                  <li>Intel® Quad Core Processors</li>
                  <li>NVIDIA GeForce GTX 950M Graphics Card</li>
                </ul>
                <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-gray-800 hover:text-white transition-colors">
                    <FaSync size={10} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 hover:bg-blue-600 hover:text-white transition-colors">
                    <FaHeart size={10} />
                  </button>
                  <button className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                    <FaShoppingCart size={10} />
                  </button>
                </div>
              </div>
              <div className="w-1/2 h-full relative flex items-center justify-center p-4">
                <Image 
                  src="/images/headphone.webp" 
                  alt="Mota SmartWatch G2 Pro"
                  fill
                  className="object-contain group-hover:scale-105 transition-transform duration-300"
                />
              </div>
            </div>

            {/* Bottom row: 2 small products */}
            <div className="flex flex-row gap-6 flex-1">
              {/* Product 1 */}
              <div className="flex-1 bg-white border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow">
                <span className="text-xs text-blue-600 mb-1">Watch</span>
                <h3 className="text-sm font-bold text-gray-800 mb-1 products-font">Apple watch sport green</h3>
                <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                  PRICE: <span className="text-yellow-500">$ 250.00</span>
                </p>
                <div className="w-full h-[120px] relative mb-4 flex-1">
                  <Image 
                    src="/images/headphone.webp" 
                    alt="Apple watch"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                </p>
              </div>

              {/* Product 2 */}
              <div className="flex-1 bg-white border border-gray-100 p-6 flex flex-col hover:shadow-lg transition-shadow">
                <span className="text-xs text-blue-600 mb-1">Laptop</span>
                <h3 className="text-sm font-bold text-gray-800 mb-1 products-font">HP Spectre x360 - 15t</h3>
                <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                  PRICE: <span className="text-yellow-500">$ 250.00</span>
                </p>
                <div className="w-full h-[120px] relative mb-4 flex-1">
                  <Image 
                    src="/images/headphone.webp" 
                    alt="HP Spectre"
                    fill
                    className="object-contain"
                  />
                </div>
                <p className="text-xs text-gray-400 line-clamp-2">
                  Lorem Ipsum is simply dummy text of the printing and typesetting
                </p>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
