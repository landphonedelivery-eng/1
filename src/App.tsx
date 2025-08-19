"use client"

import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CustomerProvider } from './context/CustomerContext'
import { LoginForm } from './components/auth/LoginForm'
import { DashboardPage } from './pages/DashboardPage'
import { CustomersPage } from './pages/CustomersPage'
import { Button } from './components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs'
import { 
  Home, 
  Users, 
  MapPin, 
  Calendar, 
  FileText, 
  CreditCard, 
  BarChart3, 
  Settings, 
  LogOut,
  Menu
} from 'lucide-react'

const AppContent: React.FC = () => {
  const { isLoggedIn, currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!isLoggedIn) {
    return <LoginForm />
  }

  const menuItems = [
    { id: "dashboard", label: "لوحة التحكم", icon: Home },
    { id: "billboards", label: "اللوحات الإعلانية", icon: MapPin },
    { id: "customers", label: "العملاء", icon: Users },
    { id: "bookings", label: "الحجوزات", icon: Calendar },
    { id: "contracts", label: "العقود", icon: FileText },
    { id: "invoices", label: "الفواتير", icon: CreditCard },
    { id: "reports", label: "التقارير", icon: BarChart3 },
    { id: "settings", label: "الإعدادات", icon: Settings },
  ]

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className={`bg-white shadow-lg transition-all duration-300 ${sidebarCollapsed ? 'w-16' : 'w-64'}`}>
        <div className="p-4 border-b">
          <div className="flex items-center justify-between">
            {!sidebarCollapsed && (
              <h2 className="text-xl font-bold">نظام اللوحات الإعلانية</h2>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            >
              <Menu className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <nav className="p-4">
          <div className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={activeTab === item.id ? "default" : "ghost"}
                  className={`w-full justify-start ${sidebarCollapsed ? 'px-2' : ''}`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <Icon className="h-4 w-4" />
                  {!sidebarCollapsed && <span className="mr-2">{item.label}</span>}
                </Button>
              )
            })}
          </div>
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <div className={`flex items-center gap-2 p-2 bg-gray-50 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`}>
            {!sidebarCollapsed && (
              <div className="flex-1">
                <p className="text-sm font-medium">{currentUser?.fullName}</p>
                <p className="text-xs text-gray-500">{currentUser?.role === 'admin' ? 'مدير' : 'مستخدم'}</p>
              </div>
            )}
            <Button variant="ghost" size="sm" onClick={logout}>
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        <div className="p-6">
          {activeTab === "dashboard" && <DashboardPage />}
          {activeTab === "customers" && <CustomersPage />}
          {activeTab === "billboards" && (
            <div>
              <h1 className="text-3xl font-bold">اللوحات الإعلانية</h1>
              <p className="text-muted-foreground">قريباً...</p>
            </div>
          )}
          {activeTab === "bookings" && (
            <div>
              <h1 className="text-3xl font-bold">الحجوزات</h1>
              <p className="text-muted-foreground">قريباً...</p>
            </div>
          )}
          {activeTab === "contracts" && (
            <div>
              <h1 className="text-3xl font-bold">العقود</h1>
              <p className="text-muted-foreground">قريباً...</p>
            </div>
          )}
          {activeTab === "invoices" && (
            <div>
              <h1 className="text-3xl font-bold">الفواتير</h1>
              <p className="text-muted-foreground">قريباً...</p>
            </div>
          )}
          {activeTab === "reports" && (
            <div>
              <h1 className="text-3xl font-bold">التقارير</h1>
              <p className="text-muted-foreground">قريباً...</p>
            </div>
          )}
          {activeTab === "settings" && (
            <div>
              <h1 className="text-3xl font-bold">الإعدادات</h1>
              <p className="text-muted-foreground">قريباً...</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <CustomerProvider>
        <AppContent />
      </CustomerProvider>
    </AuthProvider>
  )
}