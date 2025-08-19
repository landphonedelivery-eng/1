"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { User } from '../types'

interface AuthContextType {
  isLoggedIn: boolean
  currentUser: User | null
  loginForm: { username: string; password: string }
  loginError: string
  setIsLoggedIn: (value: boolean) => void
  setCurrentUser: (user: User | null) => void
  setLoginForm: (form: { username: string; password: string }) => void
  setLoginError: (error: string) => void
  login: (username: string, password: string) => boolean
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

interface AuthProviderProps {
  children: ReactNode
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")

  const login = (username: string, password: string): boolean => {
    // Simple authentication logic - in real app, this would be an API call
    if (username === "mlk" && password === "123") {
      const user: User = {
        id: "1",
        username: "mlk",
        email: "admin@billboard.com",
        fullName: "مدير النظام",
        role: "admin",
        createdAt: "2024-01-01",
        lastLogin: new Date().toISOString().split("T")[0],
        phone: "966501234567",
        department: "الإدارة",
      }
      setCurrentUser(user)
      setIsLoggedIn(true)
      setLoginError("")
      return true
    } else {
      setLoginError("اسم المستخدم أو كلمة المرور غير صحيحة")
      return false
    }
  }

  const logout = () => {
    setIsLoggedIn(false)
    setCurrentUser(null)
    setLoginForm({ username: "", password: "" })
    setLoginError("")
  }

  const value: AuthContextType = {
    isLoggedIn,
    currentUser,
    loginForm,
    loginError,
    setIsLoggedIn,
    setCurrentUser,
    setLoginForm,
    setLoginError,
    login,
    logout,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}