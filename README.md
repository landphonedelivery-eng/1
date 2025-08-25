# نظام إدارة اللوحات الإعلانية - النسخة المعاد تنظيمها

## نظرة عامة
تم إعادة تنظيم هذا المشروع من ملف واحد ضخم (3629 سطر) إلى هيكل منظم ومقسم حسب الوظائف لتحسين قابلية القراءة والصيانة والتطوير.

## الميزات الرئيسية
- 🔐 نظام مصادقة آمن
- 👥 إدارة العملاء الشاملة
- 📊 لوحة تحكم تفاعلية
- 🎯 واجهة مستخدم حديثة ومتجاوبة
- 🏗️ هيكل كود منظم وقابل للتوسع

## التقنيات المستخدمة
- **Frontend**: React 19, TypeScript, Next.js 15
- **UI Components**: Radix UI, Tailwind CSS
- **State Management**: React Context API
- **Icons**: Lucide React
- **Styling**: Tailwind CSS with CSS Variables

## الهيكل الجديد

```
src/
├── types/              # TypeScript interfaces
├── context/            # React Context providers
├── hooks/              # Custom React hooks
├── utils/              # Utility functions
├── data/               # Mock data
├── components/         # React components
│   ├── ui/            # Basic UI components
│   ├── auth/          # Authentication components
│   ├── dashboard/     # Dashboard components
│   └── customers/     # Customer management components
├── pages/             # Application pages
├── App.tsx            # Main application component
├── main.tsx           # Entry point
└── index.css          # Global styles
```

## التثبيت والتشغيل

### المتطلبات
- Node.js 18+ 
- npm أو yarn

### خطوات التثبيت
```bash
# تثبيت المكتبات
npm install

# تشغيل التطبيق في وضع التطوير
npm run dev

# بناء التطبيق للإنتاج
npm run build

# تشغيل التطبيق في وضع الإنتاج
npm start
```

## بيانات تسجيل الدخول
- **اسم المستخدم**: `mlk`
- **كلمة المرور**: `123`

## الصفحات المتاحة

### ✅ مكتملة
- **لوحة التحكم**: إحصائيات سريعة ونظرة عامة
- **العملاء**: إدارة بيانات العملاء مع البحث والفلترة

### 🔄 قيد التطوير
- اللوحات الإعلانية
- الحجوزات
- العقود
- الفواتير
- التقارير
- الإعدادات

## المكونات الرئيسية

### Context Providers
- `AuthContext`: إدارة المصادقة والمستخدمين
- `CustomerContext`: إدارة العملاء

### Custom Hooks
- `useAuth`: للتعامل مع المصادقة
- `useCustomers`: لإدارة العملاء
- `useFilterSort`: للفلترة والترتيب

### UI Components
- `LoginForm`: نموذج تسجيل الدخول
- `StatsCard`: بطاقة الإحصائيات
- `CustomerTable`: جدول العملاء
- `Sidebar`: الشريط الجانبي

## البيانات الوهمية
يحتوي التطبيق على بيانات وهمية للاختبار:
- 2 مستخدم
- 8 عملاء
- 3 لوحات إعلانية
- 3 حجوزات
- قواعد تسعير متعددة

## إضافة ميزات جديدة

### إضافة صفحة جديدة
```typescript
// src/pages/NewPage.tsx
import React from 'react'

export const NewPage: React.FC = () => {
  return (
    <div>
      <h1>صفحة جديدة</h1>
    </div>
  )
}
```

### إضافة مكون جديد
```typescript
// src/components/category/NewComponent.tsx
import React from 'react'

interface NewComponentProps {
  title: string
}

export const NewComponent: React.FC<NewComponentProps> = ({ title }) => {
  return <div>{title}</div>
}
```

### إضافة Context جديد
```typescript
// src/context/NewContext.tsx
import React, { createContext, useContext, useState } from 'react'

interface NewContextType {
  data: any[]
  setData: (data: any[]) => void
}

const NewContext = createContext<NewContextType | undefined>(undefined)

export const useNew = () => {
  const context = useContext(NewContext)
  if (!context) {
    throw new Error('useNew must be used within NewProvider')
  }
  return context
}

export const NewProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState([])
  
  return (
    <NewContext.Provider value={{ data, setData }}>
      {children}
    </NewContext.Provider>
  )
}
```

## المساهمة
1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى البranch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الملفات المهمة
- `README.md`: دليل شامل للمشروع والهيكل الجديد
- `src/`: المجلد الرئيسي للكود المنظم
- `app/page.tsx`: نقطة الدخول المبسطة للتطبيق

## الترخيص
هذا المشروع مرخص تحت رخصة MIT.

## الدعم
للحصول على المساعدة أو الإبلاغ عن مشاكل، يرجى فتح issue في المستودع.

---

**ملاحظة**: هذا المشروع تم إعادة تنظيمه من ملف واحد ضخم إلى هيكل منظم لتحسين قابلية الصيانة والتطوير. جميع الوظائف الأساسية تعمل بشكل طبيعي.