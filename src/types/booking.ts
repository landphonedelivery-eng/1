import { SelectedBillboard } from './billboard'

export interface Booking {
  id: string
  contractNumber: string
  billboards: SelectedBillboard[]
  customerName: string
  customerPhone: string
  customerEmail: string
  customerCompany?: string
  startDate: string
  endDate: string
  totalPrice: number
  status: "pending" | "confirmed" | "cancelled"
  createdAt: string
  notes?: string
  duration: number
}