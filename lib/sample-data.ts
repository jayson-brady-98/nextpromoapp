import { BrandData } from './types'

export const popularSearches = ['Gymshark', 'White Fox', 'Nike']

export const sampleBrands: Record<string, BrandData> = {
  gymshark: {
    name: 'Gymshark',
    nextSale: {
      date: 'April, 2025',
      probability: 88,
      discount: 20
    },
    previousSales: [
      {
        discount: 70,
        event: 'Black Friday',
        date: 'November 2024'
    },
    {
        discount: 50,
        event: 'Selected Lines Sale',
        date: 'September 2024'
    },
    {
        discount: 60,
        event: 'Summer Sale',
        date: 'July 2024'
    },
    {
        discount: 60,
        event: 'Summer Sale',
        date: 'June 2024'
    },
    {
        discount: 24,
        event: 'Athlete Day',
        date: 'May 2024'
    },
    {
        discount: 20,
        event: 'Flash Sale',
        date: 'April 2024'
      }
    ]
  }
}

