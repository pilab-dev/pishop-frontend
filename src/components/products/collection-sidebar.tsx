'use client'

import React from 'react'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'

const WAREHOUSE_OPTIONS = [
  { id: 'china', label: 'CHINA', count: 112 },
  { id: 'us-nyc', label: 'US-NYC', count: 130 },
  { id: 'eu', label: 'EU', count: 80 },
  { id: 'hk', label: 'HK', count: 50 },
  { id: 'us-la', label: 'US-LA', count: 72 },
]

const NARROW_RESULTS = [
  { id: 'on-sale', label: 'ON SALE', count: 112 },
  { id: 'presale', label: 'PRESALE', count: 130 },
]

const OS_OPTIONS = [
  { id: 'android', label: 'Android', count: 280 },
  { id: 'ios', label: 'IOS', count: 162 },
]

const CHIP_TYPES = [
  { id: 'mtk2502', label: 'MTK2502', count: 112 },
  { id: 'mtk2501', label: 'MTK2501', count: 130 },
  { id: 'mt6260', label: 'MT6260', count: 80 },
  { id: 'mtk6261', label: 'MTK6261', count: 50 },
  { id: 'mtk6571', label: 'MTK6571', count: 72 },
]

const COLORS = [
  { id: 'gray', class: 'bg-gray-400' },
  { id: 'blue', class: 'bg-blue-500' },
  { id: 'brown', class: 'bg-yellow-800' },
  { id: 'green', class: 'bg-green-500' },
  { id: 'yellow', class: 'bg-yellow-400' },
  { id: 'blue-light', class: 'bg-blue-300' },
  { id: 'purple', class: 'bg-purple-500' },
  { id: 'orange', class: 'bg-orange-500' },
  { id: 'red', class: 'bg-red-500' },
  { id: 'white', class: 'bg-white border border-gray-300' },
]

export const CollectionSidebar = () => {
  return (
    <div className="w-full space-y-10 pr-0 md:pr-4">
      {/* Smart Watches Title */}
      <h3 className="text-xl font-bold uppercase mb-6 pb-2 border-b border-gray-200">Smart Watches</h3>

      {/* Warehouse Options */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Warehouse Options</h4>
        <div className="space-y-3">
          {WAREHOUSE_OPTIONS.map((item) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox id={item.id} className="w-5 h-5 rounded-none border-gray-300" />
                <Label htmlFor={item.id} className="text-sm font-normal text-gray-600 cursor-pointer group-hover:text-yellow-500 transition-colors">
                  {item.label}
                </Label>
              </div>
              <span className="text-sm text-gray-400">({item.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Narrow Search Results */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Narrow Search Results</h4>
        <div className="space-y-3">
          {NARROW_RESULTS.map((item) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox id={item.id} className="w-5 h-5 rounded-none border-gray-300" />
                <Label htmlFor={item.id} className="text-sm font-normal text-gray-600 cursor-pointer group-hover:text-yellow-500 transition-colors">
                  {item.label}
                </Label>
              </div>
              <span className="text-sm text-gray-400">({item.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compatible OS */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Compatible OS</h4>
        <div className="space-y-3">
          {OS_OPTIONS.map((item) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox id={item.id} className="w-5 h-5 rounded-none border-gray-300" />
                <Label htmlFor={item.id} className="text-sm font-normal text-gray-600 cursor-pointer group-hover:text-yellow-500 transition-colors">
                  {item.label}
                </Label>
              </div>
              <span className="text-sm text-gray-400">({item.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Price Range</h4>
        <div className="px-1">
          {/* Mock slider for now */}
          <input 
            type="range" 
            min="200" 
            max="800" 
            className="w-full accent-gray-800" 
            defaultValue="500"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>$200</span>
            <span>$800</span>
          </div>
        </div>
      </div>

      {/* Chip Type */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Chip type</h4>
        <div className="space-y-3">
          {CHIP_TYPES.map((item) => (
            <div key={item.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <Checkbox id={item.id} className="w-5 h-5 rounded-none border-gray-300" />
                <Label htmlFor={item.id} className="text-sm font-normal text-gray-600 cursor-pointer group-hover:text-yellow-500 transition-colors">
                  {item.label}
                </Label>
              </div>
              <span className="text-sm text-gray-400">({item.count})</span>
            </div>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Color</h4>
        <div className="flex flex-wrap gap-3">
          {COLORS.map((color) => (
            <button
              key={color.id}
              title={color.id}
              className={`w-6 h-6 rounded-none focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-400 ${color.class}`}
            />
          ))}
        </div>
      </div>
      
      {/* Discount */}
      <div>
        <h4 className="font-semibold text-md mb-4 uppercase">Discount</h4>
        <select className="w-full border border-gray-300 rounded-none p-3 text-sm text-gray-600 focus:outline-none focus:border-gray-500">
          <option>Choose your discount</option>
          <option>Discount 1</option>
          <option>Discount 2</option>
          <option>Discount 3</option>
          <option>Discount 4</option>
        </select>
      </div>

    </div>
  )
}
