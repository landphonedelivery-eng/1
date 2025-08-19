export interface PricingRule {
  id: string
  size: string
  basePrice: number
  city: string
  multiplier: number
}

export interface PriceLevel {
  id: string
  name: string
  level: "A" | "B"
  sizes: {
    [key: string]: {
      marketers: number
      companies: number
      individuals: number
    }
  }
  cities: {
    [key: string]: {
      multiplier: number
    }
  }
}