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
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent">
              الأسعار
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">إدارة شاملة للوحات الإعلانية</p>
          </div>
          <div className="flex gap-3">
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              <Plus className="w-4 h-4 ml-2" />
              إضافة مقياس
            </Button>
            <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
              شهر واحد
            </Button>
            <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
              6 أشهر
            </Button>
            <Button variant="outline" className="border-yellow-600 text-yellow-600 hover:bg-yellow-50">
              3 أشهر
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              شهر واحد
            </Button>
          </div>
        </div>
      </div>

      {/* Price Level Tabs */}
      <div className="flex gap-2 mb-6">
        <Button className="bg-green-600 hover:bg-green-700 text-white">
          <Plus className="w-4 h-4 ml-2" />
          إضافة مقياس
        </Button>
        {priceLevels.map((level) => (
          <Button
            key={level.id}
            variant={selectedLevel === level.level ? "default" : "outline"}
            onClick={() => setSelectedLevel(level.level)}
            className={selectedLevel === level.level 
              ? "bg-orange-500 hover:bg-orange-600 text-white" 
              : "border-orange-500 text-orange-600 hover:bg-orange-50"
            }
          >
            مستوى {level.level}
          </Button>
        ))}
      </div>

      {currentLevel && (
        <div className="space-y-6">
          {/* Price Level Header */}
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 dark:from-orange-900/20 dark:to-yellow-900/20 rounded-2xl p-6 border border-orange-500/20">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-600 rounded-xl flex items-center justify-center shadow-lg">
                  <DollarSign className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-800 dark:text-orange-300">
                    {currentLevel.name}
                  </h3>
                  <p className="text-orange-600 dark:text-orange-400">
                    الأسعار حسب الفئة المختارة - شهرياً
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Table */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300 flex items-center gap-2">
                <DollarSign className="h-5 w-5" />
                أسعار الأحجام حسب فئة العميل - شهرياً
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="bg-gradient-to-r from-orange-50 to-yellow-50 dark:from-orange-900/20 dark:to-yellow-900/20">
                      <TableHead className="font-bold text-orange-800 dark:text-orange-300 text-center">الحجم</TableHead>
                      <TableHead className="font-bold text-blue-800 dark:text-blue-300 text-center">مسوقين</TableHead>
                      <TableHead className="font-bold text-green-800 dark:text-green-300 text-center">شركات</TableHead>
                      <TableHead className="font-bold text-purple-800 dark:text-purple-300 text-center">أفراد</TableHead>
                      <TableHead className="font-bold text-red-800 dark:text-red-300 text-center">إجراءات</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {Object.entries(currentLevel.sizes).map(([size, prices]) => (
                      <TableRow key={size} className="hover:bg-orange-50/50 dark:hover:bg-orange-900/10">
                        <TableCell className="font-bold text-center bg-yellow-50 dark:bg-yellow-900/20">
                          {size}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingPrice?.levelId === currentLevel.id && 
                           editingPrice?.size === size && 
                           editingPrice?.category === 'marketers' ? (
                            <div className="flex items-center justify-center gap-2">
                              <Input
                                type="number"
                                value={editingPrice.value}
                                onChange={(e) => setEditingPrice({
                                  ...editingPrice,
                                  value: Number(e.target.value)
                                })}
                                className="w-24 text-center"
                              />
                              <Button
                                size="sm"
                                onClick={() => {
                                  updatePrice(currentLevel.id, size, 'marketers', editingPrice.value)
                                  setEditingPrice(null)
                                }}
                                className="bg-green-600 hover:bg-green-700"
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
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-bold text-blue-600 dark:text-blue-400">
                                د.ل {prices.marketers.toLocaleString()}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingPrice({
                                  levelId: currentLevel.id,
                                  size,
                                  category: 'marketers',
                                  value: prices.marketers
                                })}
                                className="hover:bg-blue-100"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingPrice?.levelId === currentLevel.id && 
                           editingPrice?.size === size && 
                           editingPrice?.category === 'companies' ? (
                            <div className="flex items-center justify-center gap-2">
                              <Input
                                type="number"
                                value={editingPrice.value}
                                onChange={(e) => setEditingPrice({
                                  ...editingPrice,
                                  value: Number(e.target.value)
                                })}
                                className="w-24 text-center"
                              />
                              <Button
                                size="sm"
                                onClick={() => {
                                  updatePrice(currentLevel.id, size, 'companies', editingPrice.value)
                                  setEditingPrice(null)
                                }}
                                className="bg-green-600 hover:bg-green-700"
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
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-bold text-green-600 dark:text-green-400">
                                د.ل {prices.companies.toLocaleString()}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingPrice({
                                  levelId: currentLevel.id,
                                  size,
                                  category: 'companies',
                                  value: prices.companies
                                })}
                                className="hover:bg-green-100"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          {editingPrice?.levelId === currentLevel.id && 
                           editingPrice?.size === size && 
                           editingPrice?.category === 'individuals' ? (
                            <div className="flex items-center justify-center gap-2">
                              <Input
                                type="number"
                                value={editingPrice.value}
                                onChange={(e) => setEditingPrice({
                                  ...editingPrice,
                                  value: Number(e.target.value)
                                })}
                                className="w-24 text-center"
                              />
                              <Button
                                size="sm"
                                onClick={() => {
                                  updatePrice(currentLevel.id, size, 'individuals', editingPrice.value)
                                  setEditingPrice(null)
                                }}
                                className="bg-green-600 hover:bg-green-700"
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
                            <div className="flex items-center justify-center gap-2">
                              <span className="font-bold text-purple-600 dark:text-purple-400">
                                د.ل {prices.individuals.toLocaleString()}
                              </span>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => setEditingPrice({
                                  levelId: currentLevel.id,
                                  size,
                                  category: 'individuals',
                                  value: prices.individuals
                                })}
                                className="hover:bg-purple-100"
                              >
                                <Edit className="w-3 h-3" />
                              </Button>
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-center">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="hover:bg-red-100 hover:text-red-700"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* City Multipliers */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-green-50 to-blue-50 dark:from-green-900/20 dark:to-blue-900/20">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300">
                معاملات المدن
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Object.entries(currentLevel.cities).map(([city, data]) => (
                  <Card key={city} className="p-4 bg-white/80 dark:bg-gray-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900 dark:text-white">{city}</h4>
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
                          className="w-20 text-center"
                        />
                        <Button
                          size="sm"
                          onClick={() => {
                            updateCityMultiplier(currentLevel.id, city, editingMultiplier.value)
                            setEditingMultiplier(null)
                          }}
                          className="bg-green-600 hover:bg-green-700"
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
                        <span className="text-sm text-gray-600 dark:text-gray-400">
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
                          className="hover:bg-green-100"
                        >
                          <Edit className="w-3 h-3" />
                        </Button>
                      </div>
                    )}
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  )
}