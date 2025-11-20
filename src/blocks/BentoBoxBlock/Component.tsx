import React from 'react'

import { BentoBox, BentoBoxItem } from '@/components/BentoBox'
import RichText from '@/components/RichText'
import { cn } from '@/lib/utils'
import type { BentoBoxProps } from '@/payload-types'

type Props = BentoBoxProps & {}

export const BentoBoxBlock: React.FC<Props> = (props) => {
  const { title, items, layout, blockType } = props

  const columns = layout?.columns || '3'
  const gap = layout?.gap || '4'
  const maxWidth = layout?.maxWidth || '1280'

  const getColSpan = (colSpan: string) => {
    switch (colSpan) {
      case '1':
        return 'col-span-1'
      case '2':
        return 'col-span-1 md:col-span-2'
      case '3':
        return 'col-span-1 md:col-span-3'
      default:
        return 'col-span-1'
    }
  }

  const getRowSpan = (rowSpan: string) => {
    switch (rowSpan) {
      case '1':
        return 'row-span-1'
      case '2':
        return 'row-span-1 md:row-span-2'
      case '3':
        return 'row-span-1 md:row-span-3'
      default:
        return 'row-span-1'
    }
  }

  const getBackgroundColor = (backgroundColor: string) => {
    switch (backgroundColor) {
      case 'primary':
        return 'bg-primary text-primary-foreground'
      case 'secondary':
        return 'bg-secondary text-secondary-foreground'
      case 'accent':
        return 'bg-accent text-accent-foreground'
      case 'white':
        return 'bg-white text-gray-900'
      default:
        return 'bg-gray-100 dark:bg-zinc-900'
    }
  }

  const getTextAlign = (textAlign: string) => {
    switch (textAlign) {
      case 'left':
        return 'text-left'
      case 'right':
        return 'text-right'
      default:
        return 'text-center'
    }
  }

  const getContainerMaxWidth = (maxWidth: string) => {
    switch (maxWidth) {
      case '768':
        return 'max-w-2xl'
      case '1024':
        return 'max-w-4xl'
      case '1280':
        return 'max-w-6xl'
      case 'full':
        return 'max-w-full'
      default:
        return 'max-w-6xl'
    }
  }

  const getGridCols = (columns: string) => {
    switch (columns) {
      case '2':
        return 'grid-cols-1 md:grid-cols-2'
      case '3':
        return 'grid-cols-1 md:grid-cols-3'
      case '4':
        return 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4'
      default:
        return 'grid-cols-1 md:grid-cols-3'
    }
  }

  const getGap = (gap: string) => {
    switch (gap) {
      case '2':
        return 'gap-2'
      case '6':
        return 'gap-6'
      default:
        return 'gap-4'
    }
  }

  return (
    <section className="py-8">
      <div className={cn('mx-auto px-5', getContainerMaxWidth(maxWidth))}>
        {title && <h2 className="text-2xl font-bold text-center mb-8">{title}</h2>}

        <BentoBox className={cn('auto-rows-[200px]', getGridCols(columns), getGap(gap))}>
          {items?.map((item, index) => (
            <BentoBoxItem
              key={index}
              className={cn(
                getColSpan(item.colSpan || '1'),
                getRowSpan(item.rowSpan || '1'),
                getBackgroundColor(item.backgroundColor || 'default'),
                getTextAlign(item.textAlign || 'center'),
              )}
            >
              <div className="w-full">
                <RichText content={item.content} />
              </div>
            </BentoBoxItem>
          ))}
        </BentoBox>
      </div>
    </section>
  )
}
