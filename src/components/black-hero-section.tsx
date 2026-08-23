import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaHeadphones, FaMobileAlt, FaLaptop, FaGamepad, FaTv, FaCamera, FaSearch } from 'react-icons/fa'

export const BlackHeroSection = () => {
  return (
    <div className="relative w-full page-gray-950 overflow-hidden min-h-[600px] flex items-center">
      {/* Decorative large circle in background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#1a1a1a] rounded-full -z-0"></div>

      <div className="max-w-[1280px] mx-auto px-5 w-full relative z-10 flex flex-row">
        
        {/* Left vertical icon menu */}
        <div className="hidden md:flex flex-col gap-6 text-gray-400 py-10 w-16">
          <Link href="#" className="hover:text-white transition-colors"><FaHeadphones size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><FaMobileAlt size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><FaLaptop size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><FaGamepad size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><FaTv size={20} /></Link>
          <Link href="#" className="hover:text-white transition-colors"><FaCamera size={20} /></Link>
          <Link href="#" className="hover:text-white mt-10 transition-colors"><FaSearch size={20} /></Link>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col items-center justify-center text-center">
          <h1 className="text-white text-6xl md:text-8xl font-black uppercase tracking-wider mb-2">
            HEADPHONE
          </h1>
          <p className="text-gray-400 text-sm md:text-base mb-2">
            of the printing and typesetting industry
          </p>
          <p className="text-white text-lg font-bold mb-8">
            189 usd
          </p>
          
          <div className="relative w-full max-w-[600px] h-[300px] md:h-[400px] mb-8">
            <Image 
              src="/images/headphone.webp" 
              alt="Headphone" 
              fill
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

          <Link
            href="#"
            className="group flex items-center gap-3 bg-transparent text-white border border-gray-600 rounded-full py-2 px-6 hover:border-white transition-all"
          >
            <span className="text-sm font-bold uppercase tracking-wider">Buy now</span>
            <div className="bg-yellow-500 p-2 rounded-full text-white group-hover:scale-110 transition-transform">
              <FaShoppingCart size={14} />
            </div>
          </Link>
        </div>

        {/* Right pagination */}
        <div className="hidden md:flex flex-col justify-center items-center gap-6 w-16">
          <div className="text-white font-bold text-2xl flex items-end">
            02<span className="text-xs text-gray-500 mb-1">/03</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
        </div>

      </div>
    </div>
  )
}
