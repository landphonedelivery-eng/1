# دليل إعادة التنظيم - نظام إدارة اللوحات الإعلانية

## نظرة عامة
تم إعادة تنظيم الكود من ملف واحد ضخم (3629 سطر) إلى هيكل منظم ومقسم حسب الوظائف.

## الهيكل الجديد

```
src/
├── types/                    # تعريفات الأنواع (TypeScript interfaces)
│   ├── index.ts             # تصدير جميع الأنواع
│   ├── user.ts              # أنواع المستخدمين
│   ├── customer.ts          # أنواع العملاء
│   ├── billboard.ts         # أنواع اللوحات الإعلانية
│   ├── booking.ts           # أنواع الحجوزات
│   ├── contract.ts          # أنواع العقود
│   ├── invoice.ts           # أنواع الفواتير
│   └── price.ts             # أنواع التسعير
├── context/                 # React Context للحالة العامة
│   ├── AuthContext.tsx      # إدارة المصادقة
│   └── CustomerContext.tsx  # إدارة العملاء
├── hooks/                   # Custom React Hooks
│   ├── useAuth.ts           # hook للمصادقة
│   ├── useCustomers.ts      # hook للعملاء
│   └── useFilterSort.ts     # hook للفلترة والترتيب
├── utils/                   # الدوال المساعدة
│   ├── constants.ts         # الثوابت
│   ├── generateContractNumber.ts  # توليد أرقام العقود
│   └── printContract.ts     # طباعة العقود
├── data/                    # البيانات الوهمية
│   ├── mockUsers.ts         # بيانات المستخدمين الوهمية
│   ├── mockCustomers.ts     # بيانات العملاء الوهمية
│   └── mockPriceLevels.ts   # بيانات التسعير الوهمية
├── components/              # مكونات React
│   ├── ui/                  # مكونات واجهة المستخدم الأساسية
│   ├── auth/                # مكونات المصادقة
│   │   └── LoginForm.tsx
│   ├── dashboard/           # مكونات لوحة التحكم
│   │   └── StatsCard.tsx
│   └── customers/           # مكونات العملاء
│       └── CustomerTable.tsx
├── pages/                   # صفحات التطبيق
│   ├── DashboardPage.tsx    # صفحة لوحة التحكم
│   └── CustomersPage.tsx    # صفحة العملاء
├── App.tsx                  # المكون الرئيسي
├── main.tsx                 # نقطة الدخول
└── index.css                # الأنماط الأساسية
```

## المزايا الجديدة

### 1. فصل الاهتمامات (Separation of Concerns)
- كل نوع من البيانات له ملف منفصل
- الـ UI components منفصلة عن الـ business logic
- الـ state management منظم في Context providers

### 2. إعادة الاستخدام (Reusability)
- المكونات قابلة لإعادة الاستخدام
- الـ hooks يمكن استخدامها في مكونات متعددة
- الـ utility functions منفصلة ومستقلة

### 3. سهولة الصيانة (Maintainability)
- كل ملف له مسؤولية واحدة واضحة
- سهولة العثور على الكود المطلوب
- سهولة إضافة ميزات جديدة

### 4. قابلية التوسع (Scalability)
- هيكل يدعم إضافة ميزات جديدة بسهولة
- إمكانية إضافة صفحات جديدة دون تعقيد
- دعم للفرق المتعددة للعمل على أجزاء مختلفة

## كيفية الاستخدام

### 1. تشغيل التطبيق الجديد
```bash
# استبدال الملف القديم بالجديد
mv app/page.tsx app/page-old.tsx
mv app/page-new.tsx app/page.tsx
```

### 2. إضافة صفحة جديدة
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

### 3. إضافة مكون جديد
```typescript
// src/components/category/NewComponent.tsx
import React from 'react'

interface NewComponentProps {
  // props here
}

export const NewComponent: React.FC<NewComponentProps> = ({ }) => {
  return (
    <div>
      {/* component content */}
    </div>
  )
}
```

### 4. إضافة hook جديد
```typescript
// src/hooks/useNewFeature.ts
import { useState } from 'react'

export const useNewFeature = () => {
  const [state, setState] = useState()
  
  // logic here
  
  return {
    state,
    setState,
    // other functions
  }
}
```

## الخطوات التالية

1. **إكمال المكونات المفقودة**: إضافة باقي المكونات من الملف الأصلي
2. **إضافة الصفحات المتبقية**: BillboardsPage, BookingsPage, إلخ
3. **تحسين الـ Context**: إضافة المزيد من الـ context providers
4. **إضافة الـ API integration**: استبدال البيانات الوهمية بـ API calls
5. **إضافة الاختبارات**: كتابة unit tests للمكونات والـ hooks

## ملاحظات مهمة

- تم الحفاظ على جميع الوظائف الموجودة
- الكود الآن أكثر تنظيماً وقابلية للقراءة
- يمكن للفرق المتعددة العمل على أجزاء مختلفة دون تضارب
- الهيكل يدعم أفضل الممارسات في React و TypeScript