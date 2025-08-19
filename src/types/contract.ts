import { SelectedBillboard } from './billboard'

export interface Contract {
  id: string
  contractNumber: string
  bookingId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerCompany?: string
  billboards: SelectedBillboard[]
  startDate: string
  endDate: string
  totalPrice: number
  status: "active" | "expired" | "cancelled"
  createdAt: string
  signedDate?: string
  notes?: string
  terms?: string
}