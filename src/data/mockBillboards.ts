import { BillboardData } from '../types'

export const mockBillboards: BillboardData[] = [
  {
    id: "1",
    name: "لوحة طرابلس الرئيسية",
    gps: "32.8872° N, 13.1913° E",
    coordinates: { lat: 32.8872, lng: 13.1913 },
    nearestPoint: "ميدان الشهداء",
    municipality: "طرابلس المركز",
    city: "طرابلس",
    size: "13×5",
    contractNumber: "C-202401-0001",
    image: "/placeholder-billboard.jpg",
    gpsLink: "https://maps.google.com/?q=32.8872,13.1913",
    customerName: "شركة جوتن للطلاء",
    adType: "إعلان تجاري",
    price: "4500",
    status: "occupied",
    views: "50000",
    bookings: 12
  },
  {
    id: "2",
    name: "لوحة بنغازي التجارية",
    gps: "32.1181° N, 20.0687° E",
    coordinates: { lat: 32.1181, lng: 20.0687 },
    nearestPoint: "شارع جمال عبد الناصر",
    municipality: "بنغازي",
    city: "بنغازي",
    size: "12×4",
    contractNumber: "",
    image: "/placeholder-billboard.jpg",
    gpsLink: "https://maps.google.com/?q=32.1181,20.0687",
    status: "available",
    views: "35000",
    bookings: 0
  },
  {
    id: "3",
    name: "لوحة مصراته الساحلية",
    gps: "32.3743° N, 15.0919° E",
    coordinates: { lat: 32.3743, lng: 15.0919 },
    nearestPoint: "الطريق الساحلي",
    municipality: "مصراته",
    city: "مصراته",
    size: "10×4",
    contractNumber: "C-202401-0002",
    image: "/placeholder-billboard.jpg",
    gpsLink: "https://maps.google.com/?q=32.3743,15.0919",
    customerName: "شركة هاير للكهرومنزلية",
    adType: "إعلان منتجات",
    price: "2700",
    status: "occupied",
    views: "28000",
    bookings: 8
  }
]