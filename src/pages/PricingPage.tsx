import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Badge } from '../components/ui/badge'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Plus, Edit, Trash2, DollarSign, Save, X } from 'lucide-react'

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

interface CustomerCategory {
  id: string
  name: string
  type: "marketer" | "company" | "individual"
  discountPercentage: number
}

export const PricingPage: React.FC = () => {
  const [selectedLevel, setSelectedLevel] = useState<"A" | "B">("A")
  const [editingPrice, setEditingPrice] = useState<{
    levelId: string
    size: string
    category: string
    value: number
  } | null>(null)
  const [editingMultiplier, setEditingMultiplier] = useState<{
    levelId: string
    city: string
    value: number
  } | null>(null)
  
  // Data matching the original code structure
  const [priceLevels, setPriceLevels] = useState<PriceLevel[]>([
    {
      id: "level-a",
      name: "المستوى أ - مواقع مميزة",
      level: "A",
      sizes: {
        "13×5": { marketers: 4500, companies: 4000, individuals: 3500 },
        "12×4": { marketers: 3800, companies: 3300, individuals: 2800 },
        "10×4": { marketers: 3200, companies: 2700, individuals: 2200 },
        "8×3": { marketers: 2500, companies: 2000, individuals: 1500 },
        "6×3": { marketers: 2000, companies: 1500, individuals: 1000 },
        "4×3": { marketers: 1500, companies: 1000, individuals: 800 },
      },
      cities: {
        طرابلس: { multiplier: 1.2 },
        بنغازي: { multiplier: 1.0 },
        مصراته: { multiplier: 0.9 },
        زليتن: { multiplier: 0.8 },
        الخمس: { multiplier: 0.7 },
        الزاوية: { multiplier: 0.8 },
        صبراته: { multiplier: 0.7 },
      },
    },
    {
      id: "level-b",
      name: "المستوى ب - مواقع عادية",
      level: "B",
      sizes: {
        "13×5": { marketers: 3500, companies: 3000, individuals: 2500 },
        "12×4": { marketers: 2800, companies: 2300, individuals: 1800 },
        "10×4": { marketers: 2200, companies: 1700, individuals: 1200 },
        "8×3": { marketers: 1800, companies: 1300, individuals: 1000 },
        "6×3": { marketers: 1500, companies: 1000, individuals: 700 },
        "4×3": { marketers: 1200, companies: 800, individuals: 500 },
      },
      cities: {
        طرابلس: { multiplier: 1.2 },
        بنغازي: { multiplier: 1.0 },
        مصراته: { multiplier: 0.9 },
        زليتن: { multiplier: 0.8 },
        الخمس: { multiplier: 0.7 },
        الزاوية: { multiplier: 0.8 },
        صبراته: { multiplier: 0.7 },
      },
    },
  ])

  const [customerCategories] = useState<CustomerCategory[]>([
    { id: "1", name: "مسوقين", type: "marketer", discountPercentage: 15 },
    { id: "2", name: "شركات", type: "company", discountPercentage: 10 },
    { id: "3", name: "أفراد", type: "individual", discountPercentage: 0 },
  ])

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

  const updatePrice = (levelId: string, size: string, category: string, newPrice: number) => {
    setPriceLevels((prev) =>
      prev.map((level) => {
        if (level.id === levelId) {
          return {
            ...level,
            sizes: {
              ...level.sizes,
              [size]: {
                ...level.sizes[size],
                [category]: newPrice,
              },
            },
          }
        }
        return level
      }),
    )
  }

  const updateCityMultiplier = (levelId: string, city: string, newMultiplier: number) => {
    setPriceLevels((prev) =>
      prev.map((level) => {
        if (level.id === levelId) {
          return {
            ...level,
            cities: {
              ...level.cities,
              [city]: { multiplier: newMultiplier },
            },
          }
        }
        return level
      }),
    )
  }

  const getPrice = (
    size: string,
    city: string,
    customerType: "marketers" | "companies" | "individuals",
    level: "A" | "B" = "A",
  ) => {
    const priceLevel = priceLevels.find((p) => p.level === level)
    if (!priceLevel) return 2000

    const sizePrice = priceLevel.sizes[size]?.[customerType] || 2000
    const cityMultiplier = priceLevel.cities[city]?.multiplier || 1.0

    return Math.round(sizePrice * cityMultiplier)
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
            إدارة الأسعار
          </h2>
          <p className="text-gray-600 dark:text-gray-400 mt-2">تحديد أسعار اللوحات حسب الحجم والموقع وفئة العميل</p>
        </div>
        <div className="flex gap-3">
          <Button className="bg-yellow-600 hover:bg-yellow-700 text-white">
            <Plus className="w-4 h-4 ml-2" />
            إضافة مستوى سعر
          </Button>
        </div>
      </div>

      {/* Price Level Tabs */}
      <div className="flex gap-2 mb-6">
        {priceLevels.map((level) => (
          <Button
            key={level.id}
            variant={selectedLevel === level.level ? "default" : "outline"}
            onClick={() => setSelectedLevel(level.level)}
            className={selectedLevel === level.level 
              ? "bg-yellow-600 hover:bg-yellow-700 text-white" 
              : "border-yellow-600 text-yellow-600 hover:bg-yellow-50"
            }
          >
            {level.name}
          </Button>
        ))}
      </div>

      {currentLevel && (
        <div className="space-y-6">
          {/* Price Level Editor */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-yellow-800 dark:text-yellow-300">
                {currentLevel.name}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Size-based Pricing Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    الأسعار حسب الحجم وفئة العميل
                  </h3>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>الحجم</TableHead>
                          <TableHead>المسوقين</TableHead>
                          <TableHead>الشركات</TableHead>
                          <TableHead>الأفراد</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {Object.entries(currentLevel.sizes).map(([size, prices]) => (
                          <TableRow key={size}>
                            <TableCell className="font-medium">{size}</TableCell>
                            {Object.entries(prices).map(([category, price]) => (
                              <TableCell key={category}>
                                {editingPrice?.levelId === currentLevel.id && 
                                 editingPrice?.size === size && 
                                 editingPrice?.category === category ? (
                                  <div className="flex items-center gap-2">
                                    <Input
                                      type="number"
                                      value={editingPrice.value}
                                      onChange={(e) => setEditingPrice({
                                        ...editingPrice,
                                        value: Number(e.target.value)
                                      })}
                                      className="w-24"
                                    />
                                    <Button
                                      size="sm"
                                      onClick={() => {
                                        updatePrice(currentLevel.id, size, category, editingPrice.value)
                                        setEditingPrice(null)
                                      }}
                                    >
                                      <Save className="w-3 h-3" />
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => setEditingPrice(null)}
                                    >
                                      <X className="w-3 h-3" />
                                    </Button>
                                  </div>
                                ) : (
                                  <div className="flex items-center gap-2">
                                    <span className="font-semibold text-yellow-600">
                                      {price.toLocaleString()} د.ل
                                    </span>
                                    <Button
                                      size="sm"
                                      variant="ghost"
                                      onClick={() => setEditingPrice({
                                        levelId: currentLevel.id,
                                        size,
                                        category,
                                        value: price
                                      })}
                                    >
                                      <Edit className="w-3 h-3" />
                                    </Button>
                                  </div>
                                )}
                              </TableCell>
                            ))}
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </div>

                {/* City Multipliers Table */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                    معاملات المدن
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {Object.entries(currentLevel.cities).map(([city, data]) => (
                      <Card key={city} className="p-4">
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-medium">{city}</h4>
                          <Badge variant={data.multiplier >= 1.0 ? "default" : "secondary"}>
                            {(data.multiplier * 100).toFixed(0)}%
                          </Badge>
                        </div>
                        {editingMultiplier?.levelId === currentLevel.id && 
                         editingMultiplier?.city === city ? (
                          <div className="flex items-center gap-2">
                            <Input
                              type="number"
                              step="0.1"
                              value={editingMultiplier.value}
                              onChange={(e) => setEditingMultiplier({
                                ...editingMultiplier,
                                value: Number(e.target.value)
                              })}
                              className="w-20"
                            />
                            <Button
                              size="sm"
                              onClick={() => {
                                updateCityMultiplier(currentLevel.id, city, editingMultiplier.value)
                                setEditingMultiplier(null)
                              }}
                            >
                              <Save className="w-3 h-3" />
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => setEditingMultiplier(null)}
                            >
                              <X className="w-3 h-3" />
                            </Button>
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">
                              معامل: {data.multiplier}
                            </span>
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={() => setEditingMultiplier({
                                levelId: currentLevel.id,
                                city,
                                value: data.multiplier
                              })}
                            >
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        )}
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Customer Categories */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-200">
                فئات العملاء والخصومات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {customerCategories.map((category) => (
                  <Card key={category.id} className="p-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-800 dark:text-gray-200">
                          {category.name}
                        </h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {category.type}
                        </p>
                      </div>
                      <Badge variant={category.discountPercentage > 0 ? "default" : "secondary"}>
                        {category.discountPercentage > 0 ? `خصم ${category.discountPercentage}%` : 'بدون خصم'}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Price Calculator */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-300">
                حاسبة الأسعار
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label>الحجم</Label>
                  <Select defaultValue="13×5">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(currentLevel.sizes).map((size) => (
                        <SelectItem key={size} value={size}>{size}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>المدينة</Label>
                  <Select defaultValue="طرابلس">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {Object.keys(currentLevel.cities).map((city) => (
                        <SelectItem key={city} value={city}>{city}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>فئة العميل</Label>
                  <Select defaultValue="companies">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="marketers">مسوقين</SelectItem>
                      <SelectItem value="companies">شركات</SelectItem>
                      <SelectItem value="individuals">أفراد</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-lg border">
                <div className="text-center">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">السعر المحسوب</p>
                  <p className="text-3xl font-bold text-blue-600 dark:text-blue-400">
                    {getPrice("13×5", "طرابلس", "companies", selectedLevel).toLocaleString()} د.ل
                  </p>
                  <p className="text-xs text-gray-500 mt-1">شهرياً</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}