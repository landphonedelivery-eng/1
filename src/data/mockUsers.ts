import { User } from '../types'

export const mockUsers: User[] = [
  {
    id: "1",
    username: "mlk",
    email: "admin@billboard.com",
    fullName: "مدير النظام",
    role: "admin",
    createdAt: "2024-01-01",
    lastLogin: "2024-01-15",
    phone: "966501234567",
    department: "الإدارة",
  },
  {
    id: "2",
    username: "user1",
    email: "user1@billboard.com",
    fullName: "محمد أحمد",
    role: "user",
    createdAt: "2024-01-10",
    lastLogin: "2024-01-14",
    phone: "966507654321",
    department: "المبيعات",
  },
]