import React from 'react'
import { StatsCard } from '../components/dashboard/StatsCard'
import { Users, Calendar, DollarSign, BarChart3 } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
          مرحباً بك في لوحة التحكم
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg">نظرة عامة شاملة على نشاط النظام والإحصائيات</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="إجمالي العملاء"
          value="156"
          icon={Users}
          description="عدد العملاء المسجلين"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="الحجوزات النشطة"
          value="23"
          icon={Calendar}
          description="حجوزات قيد التنفيذ"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="الإيرادات الشهرية"
          value="245,000 د.ل"
          icon={DollarSign}
          description="إيرادات هذا الشهر"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="اللوحات المتاحة"
          value="89"
          icon={BarChart3}
          description="لوحات جاهزة للحجز"
          trend={{ value: -3, isPositive: false }}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent">
              الأنشطة الأخيرة
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-500/20">
              <span className="text-gray-800 dark:text-gray-200 font-medium">حجز جديد من محمد علي</span>
              <span className="text-sm text-yellow-600 dark:text-yellow-400 font-medium">منذ ساعتين</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-800 dark:text-gray-200">تم تأكيد عقد شركة جوتن</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">منذ 4 ساعات</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-800 dark:text-gray-200">دفع فاتورة رقم INV-2024-001</span>
              <span className="text-sm text-gray-500 dark:text-gray-400">أمس</span>
            </div>
          </div>
        </div>

        <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-lg hover:shadow-xl transition-all duration-200">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-lg flex items-center justify-center">
              <div className="w-3 h-3 bg-black rounded-full"></div>
            </div>
            <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent">
              أفضل العملاء
            </h3>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-500/20">
              <span className="text-gray-800 dark:text-gray-200 font-medium">محمد عبد الله ناصر</span>
              <span className="font-bold text-yellow-600 dark:text-yellow-400">178,000 د.ل</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-800 dark:text-gray-200">شركة هاير للكهرومنزلية</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">156,000 د.ل</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
              <span className="text-gray-800 dark:text-gray-200">شركة جوتن للطلاء</span>
              <span className="font-semibold text-gray-700 dark:text-gray-300">125,000 د.ل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardPage