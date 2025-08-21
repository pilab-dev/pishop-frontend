'use client'

import React, { useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import Link from 'next/link';
import { Category, Product } from '@/payload-types';
import { ChevronDown } from 'lucide-react';
import { Media } from '@/components/Media';

interface CategoryNavClientProps {
  categoryTree: (Category & { children: Category[] })[];
  featuredProducts: Record<string, Product[]>;
}

export const CategoryNavClient: React.FC<CategoryNavClientProps> = ({ categoryTree, featuredProducts }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div onMouseLeave={() => setIsOpen(false)}>
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger
          onMouseEnter={() => setIsOpen(true)}

          className="flex items-center gap-1"
        >
          Categories <ChevronDown className="w-4 h-4" />
        </PopoverTrigger>
        <PopoverContent
          onMouseEnter={() => setIsOpen(true)}

          className="w-screen max-w-5xl"
        >
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
            {categoryTree.map(category => (
              <div key={category.id} className="flex flex-col gap-2">
                <h3 className="font-bold text-lg mb-2 border-b pb-2">
                  <Link href={`/collections/${category.slug}`} onClick={() => setIsOpen(false)}>{category.title}</Link>
                </h3>
                <ul className='space-y-2'>
                  {category.children?.map(child => (
                    <li key={child.id}>
                      <Link href={`/collections/${child.slug}`} onClick={() => setIsOpen(false)} className='hover:underline'>{child.title}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <div className="col-span-1 md:col-span-2 grid grid-cols-2 gap-4">
                {Object.values(featuredProducts).flat().slice(0, 4).map(product => (
                    <Link href={`/product/${product.slug}`} key={product.id} onClick={() => setIsOpen(false)}>
                        <div className="border rounded-lg p-2 hover:shadow-lg transition-shadow duration-200 flex flex-col items-center">
                            {typeof product.featuredImage?.url === 'object' &&
                                <Media resource={product.featuredImage.url} className='w-full h-32 object-cover rounded-md mb-2' />
                            }
                            <span className='text-center text-sm font-semibold'>{product.title}</span>
                        </div>
                    </Link>
                ))}
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};
