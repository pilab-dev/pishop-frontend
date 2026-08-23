import Image from 'next/image'
import Link from 'next/link'
import { FaShoppingCart, FaHeadphones, FaMobileAlt, FaLaptop, FaGamepad, FaTv, FaCamera, FaSearch, FaTh } from 'react-icons/fa'

export const AppleWatchHeroSection = () => {
  return (
    <div className="relative w-full page-gray-950 overflow-hidden min-h-[600px] flex items-center">
      {/* Decorative large triangle outline in background */}
      <div className="absolute top-1/2 right-[10%] transform -translate-y-1/2 w-0 h-0 border-l-[300px] border-l-transparent border-b-[500px] border-b-transparent border-r-[300px] border-r-transparent border-t-[500px] border-t-white opacity-10 -z-0"></div>

      <div className="max-w-[1280px] mx-auto px-5 w-full relative z-10 flex flex-row">
        
        {/* Left vertical icon menu */}
        <div className="hidden md:flex flex-col text-gray-400 py-10 w-16 items-center">
          <Link href="#" className="w-12 h-12 flex items-center justify-center bg-yellow-400 text-gray-900 mb-6 transition-colors">
            <FaTh size={20} />
          </Link>
          <div className="flex flex-col gap-6">
            <Link href="#" className="hover:text-white transition-colors"><FaHeadphones size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaMobileAlt size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaLaptop size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaGamepad size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaTv size={20} /></Link>
            <Link href="#" className="hover:text-white transition-colors"><FaCamera size={20} /></Link>
            <Link href="#" className="hover:text-white mt-10 transition-colors"><FaSearch size={20} /></Link>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col md:flex-row items-center justify-between ml-0 md:ml-12">
          
          {/* Text Content (Left) */}
          <div className="flex flex-col items-start text-left w-full md:w-1/2 z-10">
            <h1 className="text-white text-5xl md:text-6xl font-normal tracking-wide mb-6">
              Apple Watch
            </h1>
            <p className="text-gray-400 text-sm md:text-sm mb-10 max-w-md leading-relaxed">
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
            </p>
            
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

          {/* Image (Right) */}
          <div className="relative w-full md:w-1/2 h-[400px] md:h-[500px] mt-10 md:mt-0 z-10 flex justify-end">
            <Image 
              src="/images/headphone.webp" 
              alt="Apple Watch" 
              fill
              className="object-contain drop-shadow-2xl hover:scale-105 transition-transform duration-500"
            />
          </div>

        </div>

        {/* Right pagination */}
        <div className="hidden md:flex flex-col justify-center items-center gap-6 w-16">
          <div className="flex flex-col gap-2">
            <div className="w-1.5 h-1.5 rounded-full bg-white"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-gray-600"></div>
          </div>
          <div className="text-white font-bold text-lg mt-4 transform -rotate-90 text-gray-500 whitespace-nowrap">
            NEXT <span className="text-white ml-2">&rarr;</span>
          </div>
        </div>

      </div>
    </div>
  )
}
