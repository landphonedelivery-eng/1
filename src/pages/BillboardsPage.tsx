import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table'
import { Plus, Search, MapPin, Monitor, Edit, Trash2, Eye } from 'lucide-react'

interface Billboard {
  id: string
  code: string
  size: string
  location: string
  city: string
  district: string
  status: 'available' | 'booked' | 'maintenance'
  priceLevel: 'A' | 'B'
  coordinates?: {
    lat: number
    lng: number
  }
  description?: string
  image?: string
}

export const BillboardsPage: React.FC = () => {
  const [searchFilter, setSearchFilter] = useState("")
  const [cityFilter, setCityFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [sizeFilter, setSizeFilter] = useState("all")

  // Mock data for billboards
  const billboards: Billboard[] = [
    {
      id: "1",
      code: "TRP-001",
      size: "6x4",
      location: "شارع الجمهورية - أمام البنك التجاري",
      city: "طرابلس",
      district: "وسط المدينة",
      status: "available",
      priceLevel: "A",
      coordinates: { lat: 32.8872, lng: 13.1913 }
    },
    {
      id: "2", 
      code: "TRP-002",
      size: "8x6",
      location: "شارع عمر المختار - قرب جامع الجزائر",
      city: "طرابلس",
      district: "المدينة القديمة",
      status: "booked",
      priceLevel: "A",
      coordinates: { lat: 32.8925, lng: 13.1802 }
    },
    {
      id: "3",
      code: "BNG-001", 
      size: "4x3",
      location: "شارع جمال عبد الناصر - أمام مستشفى الجلاء",
      city: "بنغازي",
      district: "الفويهات",
      status: "available",
      priceLevel: "B",
      coordinates: { lat: 32.1181, lng: 20.0680 }
    },
    {
      id: "4",
      code: "MSR-001",
      size: "10x8", 
      location: "شارع طرابلس - مدخل المدينة",
      city: "مصراتة",
      district: "الشط",
      status: "maintenance",
      priceLevel: "B",
      coordinates: { lat: 32.3745, lng: 15.0919 }
    },
    {
      id: "5",
      code: "TRP-003",
      size: "6x4",
      location: "شارع الشط - قرب مطار معيتيقة",
      city: "طرابلس", 
      district: "تاجوراء",
      status: "available",
      priceLevel: "A",
      coordinates: { lat: 32.8941, lng: 13.2759 }
    }
  ]

  const filteredBillboards = billboards.filter((billboard) => {
    const matchesSearch = 
      searchFilter === "" ||
      billboard.code.toLowerCase().includes(searchFilter.toLowerCase()) ||
      billboard.location.toLowerCase().includes(searchFilter.toLowerCase()) ||
      billboard.city.toLowerCase().includes(searchFilter.toLowerCase()) ||
      billboard.district.toLowerCase().includes(searchFilter.toLowerCase())

    const matchesCity = cityFilter === "all" || billboard.city === cityFilter
    const matchesStatus = statusFilter === "all" || billboard.status === statusFilter  
    const matchesSize = sizeFilter === "all" || billboard.size === sizeFilter

    return matchesSearch && matchesCity && matchesStatus && matchesSize
  })

  const getStatusBadge = (status: Billboard['status']) => {
    const colors = {
      available: 'bg-green-100 text-green-800 border-green-200',
      booked: 'bg-red-100 text-red-800 border-red-200',
      maintenance: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }

    const labels = {
      available: 'متاحة',
      booked: 'محجوزة', 
      maintenance: 'صيانة'
    }

    return (
      <Badge className={`${colors[status]} font-medium`}>
        {labels[status]}
      </Badge>
    )
  }

  const getPriceLevelBadge = (level: 'A' | 'B') => {
    const colors = {
      A: 'bg-blue-100 text-blue-800 border-blue-200',
      B: 'bg-purple-100 text-purple-800 border-purple-200'
    }

    return (
      <Badge className={`${colors[level]} font-medium`}>
        مستوى {level}
      </Badge>
    )
  }

  const handleEdit = (billboard: Billboard) => {
    console.log('Edit billboard:', billboard)
  }

  const handleDelete = (billboardId: string) => {
    if (confirm("هل أنت متأكد من حذف هذه اللوحة؟")) {
      console.log('Delete billboard:', billboardId)
    }
  }

  const handleView = (billboard: Billboard) => {
    console.log('View billboard:', billboard)
  }

  const stats = {
    total: billboards.length,
    available: billboards.filter(b => b.status === 'available').length,
    booked: billboards.filter(b => b.status === 'booked').length,
    maintenance: billboards.filter(b => b.status === 'maintenance').length
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
              إدارة اللوحات الإعلانية
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة شاملة للوحات الإعلانية ومواقعها</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            إضافة لوحة جديدة
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">إجمالي اللوحات</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
              <Monitor className="h-5 w-5 text-black" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent">
              {stats.total}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-green-500/20 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">متاحة</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-green-600 rounded-xl flex items-center justify-center shadow-md">
              <Monitor className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600 dark:text-green-400">
              {stats.available}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-red-500/20 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">محجوزة</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-red-400 to-red-600 rounded-xl flex items-center justify-center shadow-md">
              <Monitor className="h-5 w-5 text-white" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-red-600 dark:text-red-400">
              {stats.booked}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
            <CardTitle className="text-sm font-semibold text-gray-700 dark:text-gray-300">قيد الصيانة</CardTitle>
            <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl flex items-center justify-center shadow-md">
              <Monitor className="h-5 w-5 text-black" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600 dark:text-yellow-400">
              {stats.maintenance}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Table */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-600" />
            <Input
              placeholder="البحث في اللوحات..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 border-yellow-500/30 focus:border-yellow-500 focus:ring-yellow-500/20"
            />
          </div>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[150px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="المدينة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المدن</SelectItem>
              <SelectItem value="طرابلس">طرابلس</SelectItem>
              <SelectItem value="بنغازي">بنغازي</SelectItem>
              <SelectItem value="مصراتة">مصراتة</SelectItem>
              <SelectItem value="الزاوية">الزاوية</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="available">متاحة</SelectItem>
              <SelectItem value="booked">محجوزة</SelectItem>
              <SelectItem value="maintenance">صيانة</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger className="w-[150px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="الحجم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأحجام</SelectItem>
              <SelectItem value="4x3">4x3 متر</SelectItem>
              <SelectItem value="6x4">6x4 متر</SelectItem>
              <SelectItem value="8x6">8x6 متر</SelectItem>
              <SelectItem value="10x8">10x8 متر</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-2xl border border-yellow-500/20 overflow-hidden shadow-lg">
          <Table>
            <TableHeader>
              <TableRow className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-b border-yellow-500/20">
                <TableHead className="font-bold text-gray-900 dark:text-white">الكود</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">الحجم</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">الموقع</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">المدينة</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">المنطقة</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">الحالة</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">مستوى السعر</TableHead>
                <TableHead className="font-bold text-gray-900 dark:text-white">الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredBillboards.map((billboard, index) => (
                <TableRow 
                  key={billboard.id}
                  className={`hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors duration-200 ${
                    index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-700/50'
                  }`}
                >
                  <TableCell className="font-semibold text-gray-900 dark:text-white">{billboard.code}</TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
                      {billboard.size} متر
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300 max-w-xs truncate">
                    {billboard.location}
                  </TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{billboard.city}</TableCell>
                  <TableCell className="text-gray-700 dark:text-gray-300">{billboard.district}</TableCell>
                  <TableCell>{getStatusBadge(billboard.status)}</TableCell>
                  <TableCell>{getPriceLevelBadge(billboard.priceLevel)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleView(billboard)}
                        className="hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                      >
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleEdit(billboard)}
                        className="hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-200"
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(billboard.id)}
                        className="hover:bg-red-100 hover:text-red-700 transition-colors duration-200"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  )
}