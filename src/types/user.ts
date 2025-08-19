export interface User {
  id: string
  username: string
  email: string
  fullName: string
  role: "admin" | "user"
  createdAt: string
  lastLogin?: string
  phone?: string
  department?: string
}