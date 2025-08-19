import { PriceLevel, PricingRule, CustomerCategory } from '../types'

export const mockPricingRules: PricingRule[] = [
  { id: "1", size: "13×5", basePrice: 3000, city: "طرابلس", multiplier: 1.2 },
  { id: "2", size: "12×4", basePrice: 2500, city: "طرابلس", multiplier: 1.0 },
  { id: "3", size: "10×4", basePrice: 2000, city: "طرابلس", multiplier: 0.9 },
  { id: "4", size: "8×3", basePrice: 1500, city: "طرابلس", multiplier: 0.8 },
  { id: "5", size: "13×5", basePrice: 2500, city: "بنغازي", multiplier: 1.0 },
  { id: "6", size: "12×4", basePrice: 2000, city: "بنغازي", multiplier: 0.9 },
  { id: "7", size: "13×5", basePrice: 1800, city: "مصراته", multiplier: 0.8 },
  { id: "8", size: "12×4", basePrice: 1500, city: "مصراته", multiplier: 0.7 },
]

export const mockPriceLevels: PriceLevel[] = [
  {
    id: "level-a",
    name: "المستوى أ - مواقع مميزة",
    level: "A",
    sizes: {
      "13×5": { marketers: 4500, companies: 4000, individuals: 3500 },
      "12×4": { marketers: 3800, companies: 3300, individuals: 2800 },
      "10×4": { marketers: 3200, companies: 2700, individuals: 2200 },
      "8×3": { marketers: 2500, companies: 2000, individuals: 1500 },
      "6×3": { marketers: 2000, companies: 1500, individuals: 1000 },
      "4×3": { marketers: 1500, companies: 1000, individuals: 800 },
    },
    cities: {
      طرابلس: { multiplier: 1.2 },
      بنغازي: { multiplier: 1.0 },
      مصراته: { multiplier: 0.9 },
      زليتن: { multiplier: 0.8 },
      الخمس: { multiplier: 0.7 },
      الزاوية: { multiplier: 0.8 },
      صبراته: { multiplier: 0.7 },
    },
  },
  {
    id: "level-b",
    name: "المستوى ب - مواقع عادية",
    level: "B",
    sizes: {
      "13×5": { marketers: 3500, companies: 3000, individuals: 2500 },
      "12×4": { marketers: 2800, companies: 2300, individuals: 1800 },
      "10×4": { marketers: 2200, companies: 1700, individuals: 1200 },
      "8×3": { marketers: 1800, companies: 1300, individuals: 1000 },
      "6×3": { marketers: 1500, companies: 1000, individuals: 700 },
      "4×3": { marketers: 1200, companies: 800, individuals: 500 },
    },
    cities: {
      طرابلس: { multiplier: 1.2 },
      بنغازي: { multiplier: 1.0 },
      مصراته: { multiplier: 0.9 },
      زليتن: { multiplier: 0.8 },
      الخمس: { multiplier: 0.7 },
      الزاوية: { multiplier: 0.8 },
      صبراته: { multiplier: 0.7 },
    },
  },
]

export const mockCustomerCategories: CustomerCategory[] = [
  { id: "1", name: "مسوقين", type: "marketer", discountPercentage: 15 },
  { id: "2", name: "شركات", type: "company", discountPercentage: 10 },
  { id: "3", name: "أفراد", type: "individual", discountPercentage: 0 },
]