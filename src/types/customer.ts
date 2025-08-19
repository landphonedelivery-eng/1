export interface Customer {
  id: string
  name: string
  phone: string
  email: string
  company?: string
  address?: string
  totalBookings: number
  totalSpent: number
  lastBooking: string
  notes?: string
  category: "marketer" | "company" | "individual"
  createdAt: string
  status: "active" | "inactive" | "vip"
}

export interface CustomerCategory {
  id: string
  name: string
  type: "marketer" | "company" | "individual"
  discountPercentage: number
}