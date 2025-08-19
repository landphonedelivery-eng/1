import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Plus, Edit, Trash2, DollarSign } from 'lucide-react'

interface PriceLevel {
  id: string
  name: string
  level: "A" | "B"
  sizes: {
    [key: string]: {
      marketers: number
      companies: number
      individuals: number
    }
  }
  cities: {
    [key: string]: {
      multiplier: number
    }
  }
}

export const PricingPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<"A" | "B">("A")
  
  // Mock data for price levels
  const priceLevels: PriceLevel[] = [
    {
      id: "1",
      name: "المستوى الأول",
      level: "A",
      sizes: {
        "4x3": { marketers: 800, companies: 1000, individuals: 1200 },
        "6x4": { marketers: 1200, companies: 1500, individuals: 1800 },
        "8x6": { marketers: 1800, companies: 2200, individuals: 2600 },
        "10x8": { marketers: 2500, companies: 3000, individuals: 3500 }
      },
      cities: {
        "طرابلس": { multiplier: 1.0 },
        "بنغازي": { multiplier: 0.8 },
        "مصراتة": { multiplier: 0.7 },
        "الزاوية": { multiplier: 0.6 }
      }
    },
    {
      id: "2", 
      name: "المستوى الثاني",
      level: "B",
      sizes: {
        "4x3": { marketers: 600, companies: 750, individuals: 900 },
        "6x4": { marketers: 900, companies: 1125, individuals: 1350 },
        "8x6": { marketers: 1350, companies: 1650, individuals: 1950 },
        "10x8": { marketers: 1875, companies: 2250, individuals: 2625 }
      },
      cities: {
        "طرابلس": { multiplier: 1.0 },
        "بنغازي": { multiplier: 0.8 },
        "مصراتة": { multiplier: 0.7 },
        "الزاوية": { multiplier: 0.6 }
      }
    }
  ]

  const currentLevel = priceLevels.find(level => level.level === selectedLevel)

  const getCategoryLabel = (category: string) => {
    const labels = {
      marketers: 'المسوقين',
      companies: 'الشركات', 
      individuals: 'الأفراد'
    }
    return labels[category as keyof typeof labels] || category
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      marketers: 'bg-blue-100 text-blue-800 border-blue-200',
      companies: 'bg-green-100 text-green-800 border-green-200',
      individuals: 'bg-purple-100 text-purple-800 border-purple-200'
    }
    return colors[category as keyof typeof colors] || 'bg-gray-100 text-gray-800 border-gray-200'
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
              إدارة الأسعار
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">تحديد أسعار اللوحات حسب الحجم والموقع وفئة العميل</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            إضافة مستوى سعر جديد
          </Button>
        </div>
      </div>

      {/* Price Level Selector */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <Label className="text-lg font-semibold text-gray-900 dark:text-white">اختر مستوى السعر:</Label>
          <Select value={selectedLevel} onValueChange={(value: "A" | "B") => setSelectedLevel(value)}>
            <SelectTrigger className="w-[200px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="A">المستوى الأول (A)</SelectItem>
              <SelectItem value="B">المستوى الثاني (B)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {currentLevel && (
          <div className="space-y-6">
            {/* Size-based Pricing */}
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-4">
                الأسعار حسب الحجم وفئة العميل
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(currentLevel.sizes).map(([size, prices]) => (
                  <Card key={size} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-200">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-center text-lg font-bold text-gray-900 dark:text-white">
                        {size} متر
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {Object.entries(prices).map(([category, price]) => (
                        <div key={category} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-xl">
                          <Badge className={`${getCategoryColor(category)} font-medium`}>
                            {getCategoryLabel(category)}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <DollarSign className="h-4 w-4 text-yellow-600" />
                            <span className="font-bold text-yellow-600 dark:text-yellow-400">
                              {price.toLocaleString()} د.ل
                            </span>
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* City Multipliers */}
            <div>
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-4">
                معاملات المدن
              </h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {Object.entries(currentLevel.cities).map(([city, data]) => (
                  <Card key={city} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-200">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between">
                        <h4 className="font-semibold text-gray-900 dark:text-white">{city}</h4>
                        <Badge className={`font-bold ${
                          data.multiplier >= 1.0 
                            ? 'bg-green-100 text-green-800 border-green-200'
                            : data.multiplier >= 0.8
                            ? 'bg-yellow-100 text-yellow-800 border-yellow-200'
                            : 'bg-red-100 text-red-800 border-red-200'
                        }`}>
                          {(data.multiplier * 100).toFixed(0)}%
                        </Badge>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
                        معامل الضرب: {data.multiplier}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Price Calculator Example */}
            <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
              <h3 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-4">
                مثال على حساب السعر
              </h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">لوحة 6x4 متر</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">للشركات في طرابلس</p>
                  <div className="mt-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {currentLevel.sizes["6x4"]?.companies.toLocaleString()} د.ل
                    </span>
                  </div>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">نفس اللوحة</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">للشركات في بنغازي</p>
                  <div className="mt-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-yellow-600" />
                    <span className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                      {Math.round((currentLevel.sizes["6x4"]?.companies || 0) * (currentLevel.cities["بنغازي"]?.multiplier || 1)).toLocaleString()} د.ل
                    </span>
                  </div>
                </div>
                <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-xl p-4 border border-yellow-500/20">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">الفرق في السعر</p>
                  <p className="text-lg font-bold text-gray-900 dark:text-white">توفير</p>
                  <div className="mt-3 flex items-center gap-2">
                    <DollarSign className="h-5 w-5 text-green-600" />
                    <span className="text-2xl font-bold text-green-600">
                      {Math.round((currentLevel.sizes["6x4"]?.companies || 0) * (1 - (currentLevel.cities["بنغازي"]?.multiplier || 1))).toLocaleString()} د.ل
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}