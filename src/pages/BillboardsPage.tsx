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
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20 rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-2">
              إدارة اللوحات
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة شاملة للوحات الإعلانية مع إمكانية التعديل والمتابعة</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            عرض قائمة
          </Button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-lg">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-600" />
            <Input
              placeholder="البحث عن اللوحات..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 border-yellow-500/30 focus:border-yellow-500 focus:ring-yellow-500/20"
            />
          </div>
          <Select value={cityFilter} onValueChange={setCityFilter}>
            <SelectTrigger className="w-[150px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="جميع المدن" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع المدن</SelectItem>
              <SelectItem value="طرابلس">طرابلس</SelectItem>
              <SelectItem value="بنغازي">بنغازي</SelectItem>
              <SelectItem value="مصراتة">مصراتة</SelectItem>
              <SelectItem value="الزاوية">الزاوية</SelectItem>
            </SelectContent>
          </Select>
          <Select value={sizeFilter} onValueChange={setSizeFilter}>
            <SelectTrigger className="w-[150px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="جميع الأحجام" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأحجام</SelectItem>
              <SelectItem value="4x3">4x3 متر</SelectItem>
              <SelectItem value="6x4">6x4 متر</SelectItem>
              <SelectItem value="8x6">8x6 متر</SelectItem>
              <SelectItem value="10x8">10x8 متر</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="ترتيب بالاسم" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">ترتيب بالاسم</SelectItem>
              <SelectItem value="available">متاحة</SelectItem>
              <SelectItem value="booked">محجوزة</SelectItem>
              <SelectItem value="maintenance">صيانة</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Billboard Cards Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {filteredBillboards.map((billboard) => (
          <Card key={billboard.id} className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm border border-yellow-500/20 shadow-lg hover:shadow-xl transition-all duration-200 overflow-hidden">
            {/* Billboard Image */}
            <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20">
              <img 
                src="/api/placeholder/400/200" 
                alt="Billboard"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjIwMCIgdmlld0JveD0iMCAwIDQwMCAyMDAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSI0MDAiIGhlaWdodD0iMjAwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xNzUgNzVIMjI1VjEyNUgxNzVWNzVaIiBmaWxsPSIjOUI5QkEwIi8+CjxwYXRoIGQ9Ik0yMDAgODVWMTE1IiBzdHJva2U9IiM2QjdCODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+CjxwYXRoIGQ9Ik0xODUgMTAwSDIxNSIgc3Ryb2tlPSIjNkI3QjgwIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgo8L3N2Zz4K'
                }}
              />
              <div className="absolute top-3 left-3 flex gap-2">
                <Badge className={`${billboard.size === '4x10' ? 'bg-orange-500' : 'bg-blue-500'} text-white font-bold`}>
                  {billboard.size}
                </Badge>
                {billboard.status === 'available' ? (
                  <Badge className="bg-green-500 text-white font-bold">
                    Available
                  </Badge>
                ) : (
                  <Badge className="bg-red-500 text-white font-bold">
                    Rented
                  </Badge>
                )}
              </div>
            </div>

            {/* Billboard Info */}
            <CardContent className="p-4">
              <div className="space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-gray-900 dark:text-white">
                    {billboard.location.split(' - ')[0]}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {billboard.location.split(' - ')[1] || billboard.district}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">رقم اللوحة:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{billboard.code}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">المدينة:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{billboard.city}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">الحجم:</span>
                    <span className="font-medium text-gray-900 dark:text-white">{billboard.size}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">المشاهدات:</span>
                    <span className="font-medium text-gray-900 dark:text-white">6800</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">السعر الشهري:</span>
                    <span className="font-bold text-green-600 dark:text-green-400">د.ل 3500</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">الموقع:</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs border-blue-500 text-blue-600 hover:bg-blue-50"
                    >
                      عرض على الخريطة
                    </Button>
                  </div>
                  <p className="text-xs text-gray-600 dark:text-gray-400">
                    {billboard.coordinates ? `${billboard.coordinates.lat}, ${billboard.coordinates.lng}` : 'مدخل مطار طرابلس الدولي'}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">نوع الإعلان:</span>
                    <span className="text-sm text-gray-900 dark:text-white">إعلان تجاري</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">اسم العميل:</span>
                    <span className="text-sm text-gray-900 dark:text-white">شركة الاتصالات الليبية</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600 dark:text-gray-400">رقم العقد:</span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400">C-2024-001</span>
                  </div>
                </div>

                <div className="flex gap-2 pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleEdit(billboard)}
                    className="flex-1 border-yellow-500 text-yellow-600 hover:bg-yellow-50"
                  >
                    <Edit className="h-3 w-3 mr-1" />
                    تعديل
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => handleView(billboard)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Details
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default BillboardsPage