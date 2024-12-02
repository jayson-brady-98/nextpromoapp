import { BrandData } from './types'

export const popularSearches = ['Gymshark', 'Boody', 'Nike']

export const sampleBrands: Record<string, BrandData> = {
  gymshark: {
    name: 'Gymshark',
    logoUrl: '/logos/gymshark.svg',
    nextSale: {
      date: 'November 28',
      probability: 88,
      discount: 20
    },
    previousSales: [
      {
        discount: 40,
        event: 'Black Friday',
        date: '2023'
      },
      {
        discount: 25,
        event: 'Cyber Monday',
        date: '2023'
      },
      {
        discount: 20,
        event: 'Spring Sale',
        date: 'March 2022'
      }
    ]
  }
}

