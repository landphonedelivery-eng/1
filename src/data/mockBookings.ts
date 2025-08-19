import { Booking } from '../types'

export const mockBookings: Booking[] = [
  {
    id: "1",
    contractNumber: "C-202401-0001",
    billboards: [
      {
        id: "1",
        name: "لوحة طرابلس الرئيسية",
        size: "13×5",
        city: "طرابلس",
        price: 4500,
        duration: 30,
        totalPrice: 135000
      }
    ],
    customerName: "محمد علي الحولة",
    customerPhone: "+218 91-1234567",
    customerEmail: "mohamed.alhawla@example.com",
    customerCompany: "شركة جوتن للطلاء",
    startDate: "2024-02-01",
    endDate: "2024-03-02",
    totalPrice: 135000,
    status: "confirmed",
    createdAt: "2024-01-15",
    notes: "حملة إعلانية لمنتجات الطلاء الجديدة",
    duration: 30
  },
  {
    id: "2",
    contractNumber: "C-202401-0002",
    billboards: [
      {
        id: "3",
        name: "لوحة مصراته الساحلية",
        size: "10×4",
        city: "مصراته",
        price: 2700,
        duration: 15,
        totalPrice: 40500
      }
    ],
    customerName: "محمد البحباح",
    customerPhone: "+218 94-5555555",
    customerEmail: "mohamed.albahbah@example.com",
    customerCompany: "شركة هاير للكهرومنزلية",
    startDate: "2024-01-20",
    endDate: "2024-02-04",
    totalPrice: 40500,
    status: "confirmed",
    createdAt: "2024-01-10",
    notes: "إعلان للأجهزة الكهربائية الجديدة",
    duration: 15
  },
  {
    id: "3",
    contractNumber: "C-202401-0003",
    billboards: [
      {
        id: "2",
        name: "لوحة بنغازي التجارية",
        size: "12×4",
        city: "بنغازي",
        price: 3300,
        duration: 20,
        totalPrice: 66000
      }
    ],
    customerName: "علي عمار",
    customerPhone: "+218 92-7654321",
    customerEmail: "ali.ammar@example.com",
    customerCompany: "شركة بيلا",
    startDate: "2024-02-10",
    endDate: "2024-03-02",
    totalPrice: 66000,
    status: "pending",
    createdAt: "2024-01-25",
    notes: "في انتظار الموافقة على التصميم",
    duration: 20
  }
]