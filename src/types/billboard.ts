export interface BillboardData {
  id: string
  name: string
  gps: string
  coordinates: { lat: number; lng: number }
  nearestPoint: string
  municipality: string
  city: string
  size: string
  contractNumber: string
  image: string
  gpsLink: string
  customerName?: string
  adType?: string
  price?: string
  status: "available" | "occupied"
  views?: string
  bookings?: number
}

export interface SelectedBillboard {
  id: string
  name: string
  size: string
  city: string
  price: number
  duration: number
  totalPrice: number
}

export interface Installation {
  id: string
  billboardId: string
  billboardName: string
  contractNumber: string
  customerName: string
  installationDate: string
  installationTeam: string
  status: "scheduled" | "in-progress" | "completed"
  notes?: string
  images: string[]
  cost: number
}

export interface PrintingOrder {
  id: string
  contractNumber: string
  billboardId: string
  customerName: string
  adType: string
  size: string
  printingDate: string
  deliveryDate: string
  status: "pending-approval" | "in-production" | "delivered"
  printingCost: number
  designApproved: boolean
  notes?: string
  files: string[]
}

export interface MaintenanceRecord {
  id: string
  billboardId: string
  billboardName: string
  maintenanceDate: string
  maintenanceType: string
  technician: string
  status: "scheduled" | "in-progress" | "completed"
  cost: number
  notes?: string
  nextMaintenanceDate?: string
}