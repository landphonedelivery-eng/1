import { SelectedBillboard } from './billboard'

export interface Invoice {
  id: string
  invoiceNumber: string
  bookingId: string
  customerName: string
  customerPhone: string
  customerEmail: string
  customerCompany?: string
  billboards: SelectedBillboard[]
  subtotal: number
  tax: number
  discount: number
  total: number
  issueDate: string
  dueDate: string
  status: "draft" | "sent" | "paid" | "overdue"
  notes?: string
}