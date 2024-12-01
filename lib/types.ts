export interface Sale {
  discount: number
  event: string
  date: string
}

export interface BrandData {
  name: string
  logoUrl: string
  nextSale: {
    date: string
    probability: number
    discount: number
  }
  previousSales: Sale[]
}

export interface SearchResult {
  found: boolean
  data?: BrandData
}

