"use client"

import React, { useState } from 'react'
import { AuthProvider, useAuth } from './context/AuthContext'
import { CustomerProvider } from './context/CustomerContext'
import { LoginForm } from './components/auth/LoginForm'
import { DashboardPage } from './pages/DashboardPage'
import { CustomersPage } from './pages/CustomersPage'
import { PricingPage } from './pages/PricingPage'
import { BillboardsPage } from './pages/BillboardsPage'
import { Button } from './components/ui/button'
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
  Menu,
  X,
  Monitor,
  DollarSign,
  Wrench,
  Printer,
  CheckSquare,
  FileImage,
  Plus,
  BarChart
} from 'lucide-react'

// Main App Component with Navigation
function AppContent() {
  const { isLoggedIn, currentUser, logout } = useAuth()
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  if (!isLoggedIn) {
    return <LoginForm />
  }

  const sidebarItems = [
    // Dashboard Section
    { id: "dashboard", label: "الرئيسية", icon: Home, section: "dashboard" },

    // Billboards Management Section
    { id: "billboards", label: "إدارة اللوحات", icon: Monitor, section: "billboards" },
    { id: "map", label: "الخريطة", icon: MapPin, section: "billboards" },

    // Clients Section
    { id: "customers", label: "العملاء", icon: Users, section: "clients" },
    { id: "client-accounts", label: "حسابات العملاء", icon: CreditCard, section: "clients" },

    // Prices Section
    { id: "pricing", label: "الأسعار", icon: BarChart3, section: "pricing" },

    // Contracts & Invoices Section
    { id: "contracts", label: "العقود", icon: FileText, section: "contracts" },
    { id: "invoices", label: "الفواتير", icon: DollarSign, section: "contracts" },

    // Installation & Printing Section
    { id: "installation-teams", label: "فرق التركيب", icon: Wrench, section: "installation" },
    { id: "printing-houses", label: "المطابع", icon: Printer, section: "installation" },

    // Tasks Section
    { id: "installation-tasks", label: "مهام التركيب", icon: CheckSquare, section: "tasks" },
    { id: "printing-tasks", label: "مهام الطباعة", icon: FileImage, section: "tasks" },

    // Bookings Section
    { id: "advanced-booking", label: "حجز جديد", icon: Plus, section: "bookings" },
    { id: "bookings", label: "الحجوزات", icon: Calendar, section: "bookings" },

    // Reports Section
    { id: "reports", label: "التقارير", icon: BarChart, section: "reports" },

    // Settings Section
    { id: "users", label: "المستخدمين", icon: Settings, section: "settings" },
  ]

  const sectionHeaders = {
    dashboard: "لوحة التحكم",
    billboards: "إدارة اللوحات",
    clients: "العملاء",
    pricing: "التسعير",
    contracts: "العقود والفواتير",
    installation: "التركيب والطباعة",
    tasks: "المهام",
    bookings: "الحجوزات",
    reports: "التقارير",
    settings: "الإعدادات",
  }

  const handleLogout = () => {
    logout()
  }

  return (
    <div
      className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800"
      dir="rtl"
    >
      {/* Sidebar */}
      <aside
        className={`bg-black backdrop-blur-sm w-64 flex-shrink-0 p-6 border-l border-yellow-500/20 ${sidebarCollapsed ? "hidden" : ""}`}
      >
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
              <BarChart3 className="h-5 w-5 text-black" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
              لوحة التحكم
            </h1>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
            className="hover:bg-yellow-500/10 text-yellow-400 hover:text-yellow-300"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <nav className="space-y-1">
          {sidebarItems.map((item, index) => {
            const isFirstInSection = index === 0 || sidebarItems[index - 1].section !== item.section

            return (
              <div key={item.id}>
                {isFirstInSection && (
                  <h3 className="text-xs font-semibold text-yellow-400/70 mb-3 mt-6 first:mt-0 uppercase tracking-wider border-b border-yellow-500/20 pb-2">
                    {sectionHeaders[item.section]}
                  </h3>
                )}
                <Button
                  variant="ghost"
                  className={`w-full justify-start h-11 rounded-xl transition-all duration-200 ${
                    activeTab === item.id
                      ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black shadow-lg shadow-yellow-500/25 hover:shadow-xl hover:shadow-yellow-500/30 font-semibold"
                      : "text-yellow-100 hover:bg-yellow-500/10 hover:text-yellow-300 border border-transparent hover:border-yellow-500/20"
                  }`}
                  onClick={() => setActiveTab(item.id)}
                >
                  <item.icon className="h-4 w-4 ml-3" />
                  <span className="font-medium">{item.label}</span>
                </Button>
              </div>
            )
          })}
        </nav>

        <div className="mt-8 pt-6 border-t border-yellow-500/20">
          <Button
            variant="outline"
            className="w-full bg-transparent border-yellow-500/30 text-yellow-400 hover:bg-red-500/10 hover:border-red-400 hover:text-red-400 transition-colors duration-200"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 ml-2" />
            تسجيل الخروج
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-b border-yellow-500/20 p-6 flex justify-between items-center">
          <div className="flex items-center gap-4">
            {sidebarCollapsed && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setSidebarCollapsed(false)}
                className="hover:bg-yellow-500/10 text-yellow-600 hover:text-yellow-700"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <div>
              <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent">
                {sidebarItems.find((item) => item.id === activeTab)?.label || "الرئيسية"}
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">إدارة شاملة للوحات الإعلانية</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                مرحباً, {currentUser?.fullName || currentUser?.username}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{currentUser?.role}</p>
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-auto p-6">
          {activeTab === 'dashboard' && <DashboardPage />}
          {activeTab === 'customers' && <CustomersPage />}
          
          {/* Billboards Management */}
          {activeTab === 'billboards' && <BillboardsPage />}
          
          {activeTab === 'map' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  خريطة اللوحات
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">عرض مواقع اللوحات الإعلانية على الخريطة</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة الخريطة قيد التطوير</div>
            </div>
          )}

          {activeTab === 'client-accounts' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  حسابات العملاء
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة الحسابات المالية للعملاء</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة حسابات العملاء قيد التطوير</div>
            </div>
          )}

          {activeTab === 'pricing' && <PricingPage />}

          {activeTab === 'contracts' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  إدارة العقود
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إنشاء ومتابعة عقود الإعلان</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة العقود قيد التطوير</div>
            </div>
          )}

          {activeTab === 'invoices' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  إدارة الفواتير
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إنشاء ومتابعة الفواتير والمدفوعات</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة الفواتير قيد التطوير</div>
            </div>
          )}

          {activeTab === 'installation-teams' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  فرق التركيب
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة فرق تركيب اللوحات الإعلانية</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة فرق التركيب قيد التطوير</div>
            </div>
          )}

          {activeTab === 'printing-houses' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  المطابع
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة المطابع وأوامر الطباعة</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة المطابع قيد التطوير</div>
            </div>
          )}

          {activeTab === 'installation-tasks' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  مهام التركيب
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">متابعة مهام تركيب اللوحات</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة مهام التركيب قيد التطوير</div>
            </div>
          )}

          {activeTab === 'printing-tasks' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  مهام الطباعة
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">متابعة مهام طباعة الإعلانات</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة مهام الطباعة قيد التطوير</div>
            </div>
          )}

          {activeTab === 'advanced-booking' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  حجز جديد
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إنشاء حجز جديد للوحات الإعلانية</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة الحجز الجديد قيد التطوير</div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  إدارة الحجوزات
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">عرض ومتابعة جميع الحجوزات</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة الحجوزات قيد التطوير</div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  التقارير والإحصائيات
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">تقارير شاملة عن الأداء والإيرادات</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة التقارير قيد التطوير</div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-8">
              <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
                <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
                  إدارة المستخدمين
                </h1>
                <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة مستخدمي النظام والصلاحيات</p>
              </div>
              <div className="text-center py-12 text-gray-500">صفحة المستخدمين قيد التطوير</div>
            </div>
          )}
        </main>
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