import type { HotDeal } from './types'

// Sample hot deals data - in a real app, this would come from an API
export const hotDealsData: HotDeal[] = [
  {
    title: 'Beats Studio Wireless Over-Ear Black Headphones',
    description: 'Video games are a big part of our lives.',
    features: [
      '32mm speakers, 1.2mm Cable',
      '32mm speakers, 1.2mm Cable',
      '32mm speakers, 1.2mm Cable',
      '32mm speakers, 1.2mm Cable',
    ],
    currentPrice: '99.99$',
    originalPrice: '199.99$',
    image: '/images/headphone.webp',
    thumbnailImages: ['/images/headphone.webp', '/images/headphone.webp', '/images/headphone.webp'],
  },
  {
    title: 'Gaming Mechanical Keyboard RGB',
    description: 'Enhance your gaming experience with premium switches.',
    features: [
      'Cherry MX switches',
      'RGB backlighting',
      'Anti-ghosting technology',
      'USB-C connectivity',
    ],
    currentPrice: '149.99$',
    originalPrice: '299.99$',
    image: '/images/headphone.webp', // Using same image for demo
    thumbnailImages: ['/images/headphone.webp', '/images/headphone.webp', '/images/headphone.webp'],
  },
  {
    title: 'Wireless Gaming Mouse Pro',
    description: 'Precision and comfort for long gaming sessions.',
    features: [
      '1000Hz polling rate',
      '50-hour battery life',
      'RGB lighting effects',
      'Programmable buttons',
    ],
    currentPrice: '79.99$',
    originalPrice: '129.99$',
    image: '/images/headphone.webp', // Using same image for demo
    thumbnailImages: ['/images/headphone.webp', '/images/headphone.webp', '/images/headphone.webp'],
  },
]



