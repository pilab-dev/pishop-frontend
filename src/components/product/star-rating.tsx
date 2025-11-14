'use client'

import { cn } from '@/lib/utils'
import { FC } from 'react'
import { FaRegStar, FaStar, FaStarHalfAlt } from 'react-icons/fa'

type StarRatingProps = {
  rating?: number
  color?: string
  className?: string
}

export const StarRating: FC<StarRatingProps> = ({ rating = 4, color = 'black', className }) => {
  const fullStars = Math.floor(rating)
  const hasHalfStar = rating % 1 >= 0.5

  return (
    <div className={cn('flex items-center gap-1', className)}>
      {[...Array(5)].map((_, i) => {
        if (i < fullStars) {
          return <FaStar key={i} className={cn('h-4 w-4')} />
        } else if (i === fullStars && hasHalfStar) {
          return <FaStarHalfAlt key={i} className={cn('h-4 w-4')} />
        } else {
          return <FaRegStar key={i} className={cn('h-4 w-4')} />
        }
      })}
    </div>
  )
}
