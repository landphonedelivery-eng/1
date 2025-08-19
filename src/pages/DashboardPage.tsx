import React from 'react'
import { StatsCard } from '../components/dashboard/StatsCard'
import { Users, Calendar, DollarSign, BarChart3 } from 'lucide-react'

export const DashboardPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-muted-foreground">نظرة عامة على نشاط النظام</p>
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

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">الأنشطة الأخيرة</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>حجز جديد من محمد علي</span>
              <span className="text-sm text-muted-foreground">منذ ساعتين</span>
            </div>
            <div className="flex items-center justify-between">
              <span>تم تأكيد عقد شركة جوتن</span>
              <span className="text-sm text-muted-foreground">منذ 4 ساعات</span>
            </div>
            <div className="flex items-center justify-between">
              <span>دفع فاتورة رقم INV-2024-001</span>
              <span className="text-sm text-muted-foreground">أمس</span>
            </div>
          </div>
        </div>

        <div className="rounded-lg border p-6">
          <h3 className="text-lg font-semibold mb-4">أفضل العملاء</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span>محمد عبد الله ناصر</span>
              <span className="font-semibold">178,000 د.ل</span>
            </div>
            <div className="flex items-center justify-between">
              <span>شركة هاير للكهرومنزلية</span>
              <span className="font-semibold">156,000 د.ل</span>
            </div>
            <div className="flex items-center justify-between">
              <span>شركة جوتن للطلاء</span>
              <span className="font-semibold">125,000 د.ل</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}