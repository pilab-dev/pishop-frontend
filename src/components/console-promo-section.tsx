import Image from 'next/image'
import Link from 'next/link'
import { FaHeart, FaSync, FaShoppingCart } from 'react-icons/fa'

export const ConsolePromoSection = () => {
  return (
    <div className="relative w-full bg-gray-50 py-16 overflow-hidden">
      {/* Decorative large triangle background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-0 h-0 border-l-[400px] border-l-transparent border-b-[600px] border-b-gray-200 border-r-[400px] border-r-transparent opacity-30 z-0"></div>

      <div className="max-w-[1280px] mx-auto px-5 relative z-10 flex flex-col md:flex-row items-center">
        
        {/* Left text content */}
        <div className="flex-1 flex flex-col items-start text-left mb-10 md:mb-0">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">
            Video game & consoles
          </h3>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 max-w-lg products-font leading-snug">
            Dell 2016 lg core ROCG 800 - 500 BR - Black
          </h2>
          
          <ul className="text-gray-500 text-sm space-y-3 mb-8 list-disc pl-5">
            <li>Enjoy the largest library of games, with blockbuster titles</li>
            <li>Flat Folding Headphone Adjustable Headband</li>
            <li>32mm Speakers 1.2m Cable</li>
            <li>Windows 10 included</li>
          </ul>

          <p className="text-sm font-bold uppercase mb-8 text-gray-500">
            PRICE: <span className="text-yellow-500 text-lg ml-1">$250.00</span> <span className="line-through font-normal text-gray-400 ml-2">$380.00</span>
          </p>

          <div className="flex gap-3">
            <button className="w-10 h-10 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-md">
              <FaSync size={12} />
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors shadow-md">
              <FaHeart size={12} />
            </button>
            <button className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:bg-gray-800 transition-colors shadow-md">
              <FaShoppingCart size={12} />
            </button>
          </div>
        </div>

        {/* Right image content */}
        <div className="flex-1 relative w-full h-[300px] md:h-[500px] flex justify-center md:justify-end">
          <Image 
            src="/images/headphone.webp" 
            alt="Gaming Console" 
            fill
            className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
          />
        </div>

      </div>
    </div>
  )
}
