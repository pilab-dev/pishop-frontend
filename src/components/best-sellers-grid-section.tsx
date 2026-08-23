'use client'

import { TabsContent as Tab, Tabs } from '@ui/tabs'
import { FC, useState } from 'react'
import Image from 'next/image'
import { FaHeart, FaSync, FaShoppingCart } from 'react-icons/fa'
import { FancyTitle } from './fancy-title'
import { SectionDecor } from './ui/section-decor'

export const BestSellersGridSection: FC = () => {
  const [selectedKey, setSelectedKey] = useState('top20')
  const categories = ['Top 20', 'Headphone', 'Laptop & PC', 'Smart phone', 'Watch']

  return (
    <div className="bg-gray-100 pt-14 pb-5">
      <div className="max-w-[1280px] mx-auto px-5 py-5">
        
        {/* Header and Tabs */}
        <div className="flex flex-col md:flex-row justify-between gap-4 py-8 md:py-10 border-b border-gray-200 mb-8">
          <h2 className="flex items-center uppercase text-4xl font-bold">
            <SectionDecor />
            <FancyTitle label="Best Sellers" />
          </h2>

          <Tabs
            aria-label="Categories"
            color="primary"
            defaultValue="top20"
          >
            {categories.map((tab) => (
              <Tab
                key={tab}
                className="products-tab"
                title={tab}
                value={tab.toLowerCase().replace(/\s+/g, '')}
              />
            ))}
          </Tabs>
        </div>

        {/* Content Layout */}
        <div className="flex flex-col lg:flex-row gap-6">
          
          {/* Left Side: Large Featured Product */}
          <div className="flex-1 bg-white p-8 relative flex flex-col items-center justify-between hover:shadow-xl transition-shadow group overflow-hidden">
            {/* Pale Watermark Text */}
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[150px] font-black text-gray-50 opacity-50 z-0 pointer-events-none select-none">
              HEADPHONE
            </div>

            <div className="text-center z-10 w-full mb-8">
              <span className="text-xs text-blue-600 font-medium mb-1 block">Headphone</span>
              <h3 className="text-xl font-bold text-gray-800 mb-1 products-font uppercase">Beat Studio wireless (Yellow)</h3>
              <p className="text-sm font-bold text-gray-500 uppercase">
                PRICE: <span className="text-yellow-500 text-lg ml-1">$250.00</span>
              </p>
            </div>

            <div className="w-full max-w-[350px] h-[350px] relative z-10 mb-8">
              <Image 
                src="/images/headphone.webp" 
                alt="Featured Yellow Headphone" 
                fill
                className="object-contain group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="flex w-full justify-between items-center z-10 px-4">
              {/* Thumbnails */}
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded border border-gray-200 cursor-pointer overflow-hidden relative">
                   <Image src="/images/headphone.webp" alt="thumb" fill className="object-cover" />
                </div>
                <div className="w-8 h-8 rounded border-2 border-yellow-400 p-0.5 cursor-pointer overflow-hidden relative">
                   <div className="w-full h-full relative"><Image src="/images/headphone.webp" alt="thumb" fill className="object-cover" /></div>
                </div>
                <div className="w-8 h-8 rounded border border-gray-200 cursor-pointer overflow-hidden relative">
                   <Image src="/images/headphone.webp" alt="thumb" fill className="object-cover" />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                  <FaSync size={10} />
                </button>
                <button className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white hover:bg-gray-800 transition-colors">
                  <FaHeart size={10} />
                </button>
                <button className="w-8 h-8 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:bg-gray-800 transition-colors">
                  <FaShoppingCart size={10} />
                </button>
              </div>
            </div>
          </div>

          {/* Right Side: 2x2 Grid of Smaller Products */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-[2px]">
            
            {/* Grid Item 1 */}
            <div className="bg-white p-6 flex flex-col items-start hover:shadow-lg transition-shadow relative group">
              <span className="text-xs text-blue-600 mb-1">Watch</span>
              <h3 className="text-sm font-bold text-gray-800 mb-1 products-font">Mota SmartWatch G2 Pro</h3>
              <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                PRICE: <span className="text-yellow-500">$250.00</span>
              </p>
              <div className="w-full h-[150px] relative mb-4">
                <Image src="/images/headphone.webp" alt="Watch" fill className="object-contain" />
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaSync size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaHeart size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaShoppingCart size={12} /></button>
              </div>
            </div>

            {/* Grid Item 2 */}
            <div className="bg-white p-6 flex flex-col items-start hover:shadow-lg transition-shadow relative group">
              <span className="text-xs text-blue-600 mb-1">Smart phone</span>
              <h3 className="text-sm font-bold text-gray-800 mb-1 products-font">Galaxy S6 edge</h3>
              <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                PRICE: <span className="text-yellow-500">$250.00</span>
              </p>
              <div className="w-full h-[150px] relative mb-4">
                <Image src="/images/headphone.webp" alt="Phone" fill className="object-contain" />
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaSync size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaHeart size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaShoppingCart size={12} /></button>
              </div>
            </div>

            {/* Grid Item 3 */}
            <div className="bg-white p-6 flex flex-col items-start hover:shadow-lg transition-shadow relative group">
              <span className="text-xs text-blue-600 mb-1">Watch</span>
              <h3 className="text-sm font-bold text-gray-800 mb-1 products-font">Apple watch sport green</h3>
              <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                PRICE: <span className="text-yellow-500">$250.00</span>
              </p>
              <div className="w-full h-[150px] relative mb-4">
                <Image src="/images/headphone.webp" alt="Watch" fill className="object-contain" />
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaSync size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaHeart size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaShoppingCart size={12} /></button>
              </div>
            </div>

            {/* Grid Item 4 */}
            <div className="bg-white p-6 flex flex-col items-start hover:shadow-lg transition-shadow relative group">
              <span className="text-xs text-blue-600 mb-1">Laptop</span>
              <h3 className="text-sm font-bold text-gray-800 mb-1 products-font">HP Spectre x360 - 15t</h3>
              <p className="text-xs font-bold text-gray-500 uppercase mb-4">
                PRICE: <span className="text-yellow-500">$250.00</span>
              </p>
              <div className="w-full h-[150px] relative mb-4">
                <Image src="/images/headphone.webp" alt="Laptop" fill className="object-contain" />
              </div>
              <p className="text-xs text-gray-400 line-clamp-2 mb-4">
                Lorem Ipsum is simply dummy text of the printing and typesetting
              </p>
              <div className="absolute inset-0 bg-white bg-opacity-90 flex items-center justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity z-20">
                <button className="w-10 h-10 rounded-full bg-blue-800 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaSync size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaHeart size={12} /></button>
                <button className="w-10 h-10 rounded-full bg-yellow-400 text-white flex items-center justify-center hover:scale-110 transition-transform shadow-lg"><FaShoppingCart size={12} /></button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  )
}
