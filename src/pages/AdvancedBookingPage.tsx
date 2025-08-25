import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { Badge } from '../components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Textarea } from '../components/ui/textarea'
import { Plus, X, Search, Calendar, MapPin, Printer, Users } from 'lucide-react'

interface SelectedBillboard {
  id: string
  name: string
  location: string
  city: string
  size: string
  price: number
  duration: number
  totalPrice: number
}

interface Customer {
  name: string
  phone: string
  company: string
}

interface Billboard {
  id: string
  name: string
  location: string
  city: string
  size: string
  status: 'available' | 'rented'
  basePrice: number
  image?: string
}

export const AdvancedBookingPage: React.FC = () => {
  const [customer, setCustomer] = useState<Customer>({
    name: 'محمد علي الحولة',
    phone: '+218 91-1234567',
    company: 'شركة جوتن للطلاء'
  })

  const [bookingDuration, setBookingDuration] = useState(334)
  const [notes, setNotes] = useState('')
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)

  const [selectedBillboards, setSelectedBillboards] = useState<SelectedBillboard[]>([
    {
      id: 'TR-001',
      name: 'لوحة شارع الجمهورية الرئيسي',
      location: 'شارع الجمهورية الرئيسي',
      city: 'طرابلس',
      size: '5×13',
      price: 120,
      duration: 334,
      totalPrice: 40080
    }
  ])

  // Mock available billboards
  const [availableBillboards] = useState<Billboard[]>([
    {
      id: 'TR-002',
      name: 'لوحة ميدان الشهداء',
      location: 'ميدان الشهداء - وسط المدينة',
      city: 'طرابلس',
      size: '5×13',
      status: 'available',
      basePrice: 120
    },
    {
      id: 'TR-003',
      name: 'لوحة طريق المطار',
      location: 'طريق المطار الدولي',
      city: 'طرابلس',
      size: '4×10',
      status: 'available',
      basePrice: 100
    },
    {
      id: 'BG-001',
      name: 'لوحة شارع عمر المختار',
      location: 'شارع عمر المختار الرئيسي',
      city: 'بنغازي',
      size: '5×13',
      status: 'available',
      basePrice: 110
    },
    {
      id: 'BG-002',
      name: 'لوحة الكورنيش',
      location: 'كورنيش بنغازي',
      city: 'بنغازي',
      size: '6×14',
      status: 'rented',
      basePrice: 130
    }
  ])

  const filteredBillboards = availableBillboards.filter(billboard =>
    billboard.status === 'available' &&
    (billboard.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     billboard.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
     billboard.city.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPrice = selectedBillboards.reduce((sum, billboard) => sum + billboard.totalPrice, 0)

  const handleRemoveBillboard = (id: string) => {
    setSelectedBillboards(prev => prev.filter(b => b.id !== id))
  }

  const handleAddBillboard = (billboard: Billboard) => {
    if (selectedBillboards.length >= 50) {
      alert('لا يمكن تحديد أكثر من 50 لوحة في الحجز الواحد')
      return
    }

    if (selectedBillboards.find(b => b.id === billboard.id)) {
      return // Already selected
    }

    const totalPrice = Math.round(billboard.basePrice * bookingDuration)
    const newSelection: SelectedBillboard = {
      id: billboard.id,
      name: billboard.name,
      location: billboard.location,
      city: billboard.city,
      size: billboard.size,
      price: billboard.basePrice,
      duration: bookingDuration,
      totalPrice: totalPrice
    }

    setSelectedBillboards(prev => [...prev, newSelection])
  }

  const handleCompleteBooking = () => {
    console.log('Complete booking:', {
      customer,
      selectedBillboards,
      duration: bookingDuration,
      totalPrice,
      notes
    })
    alert('تم إتمام الحجز بنجاح!')
  }

  const handleBulkSelect = () => {
    const availableForSelection = filteredBillboards.filter(billboard => 
      !selectedBillboards.find(selected => selected.id === billboard.id)
    ).slice(0, 50 - selectedBillboards.length)

    const newSelections = availableForSelection.map(billboard => ({
      id: billboard.id,
      name: billboard.name,
      location: billboard.location,
      city: billboard.city,
      size: billboard.size,
      price: billboard.basePrice,
      duration: bookingDuration,
      totalPrice: Math.round(billboard.basePrice * bookingDuration)
    }))

    setSelectedBillboards(prev => [...prev, ...newSelections])
  }

  const handlePrint = () => {
    window.print()
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-2xl p-6 border border-blue-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              حجز جديد
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">إنشاء حجز جديد للوحات الإعلانية</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer Info & Booking Details */}
        <div className="lg:col-span-1 space-y-6">
          {/* Customer Information */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-blue-800 dark:text-blue-300 flex items-center gap-2">
                <Users className="h-5 w-5" />
                معلومات العميل
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">اسم العميل *</Label>
                <Input
                  value={customer.name}
                  onChange={(e) => setCustomer(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 border-blue-500/30 focus:border-blue-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">رقم الهاتف *</Label>
                <Input
                  value={customer.phone}
                  onChange={(e) => setCustomer(prev => ({ ...prev, phone: e.target.value }))}
                  className="mt-1 border-blue-500/30 focus:border-blue-500"
                />
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">اسم الشركة</Label>
                <Input
                  value={customer.company}
                  onChange={(e) => setCustomer(prev => ({ ...prev, company: e.target.value }))}
                  className="mt-1 border-blue-500/30 focus:border-blue-500"
                />
              </div>
            </CardContent>
          </Card>

          {/* Booking Duration */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-green-800 dark:text-green-300 flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                مدة الحجز: {bookingDuration} يوم
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Input
                type="number"
                value={bookingDuration}
                onChange={(e) => setBookingDuration(Number(e.target.value))}
                className="border-green-500/30 focus:border-green-500"
                min="1"
                max="365"
              />
            </CardContent>
          </Card>

          {/* Additional Notes */}
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-gray-800 dark:text-gray-300">ملاحظات إضافية</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                placeholder="أي ملاحظات أو متطلبات خاصة..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="border-gray-500/30 focus:border-gray-500 min-h-[100px]"
              />
            </CardContent>
          </Card>

          {/* Selected Billboards Summary */}
          <Card className="border-0 shadow-lg bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardHeader>
              <CardTitle className="text-orange-800 dark:text-orange-300">
                اللوحات المحددة ({selectedBillboards.length}/50)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {selectedBillboards.map((billboard) => (
                <div key={billboard.id} className="bg-white/80 dark:bg-gray-800/80 rounded-lg p-3 border border-orange-200/50">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                        {billboard.name}
                      </h4>
                      <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                        {billboard.city} - {billboard.size}
                      </p>
                      <p className="text-sm font-bold text-orange-600 dark:text-orange-400 mt-1">
                        {billboard.totalPrice.toLocaleString()} د.ل
                      </p>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleRemoveBillboard(billboard.id)}
                      className="hover:bg-red-100 hover:text-red-700 p-1"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              {selectedBillboards.length === 0 && (
                <p className="text-center text-gray-500 dark:text-gray-400 py-4">
                  لم يتم تحديد أي لوحات بعد
                </p>
              )}

              <div className="border-t border-orange-200 pt-3 mt-4">
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-gray-900 dark:text-white">الإجمالي</span>
                  <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                    {totalPrice.toLocaleString()} د.ل
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button
              onClick={handleCompleteBooking}
              disabled={selectedBillboards.length === 0}
              className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-bold py-3 text-lg"
            >
              <Plus className="h-5 w-5 mr-2" />
              إتمام الحجز (أو لوحة)
            </Button>
            
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                onClick={handleBulkSelect}
                className="border-blue-500 text-blue-600 hover:bg-blue-50"
              >
                <Users className="h-4 w-4 mr-2" />
                تحديد جماعي
              </Button>
              <Button
                variant="outline"
                onClick={handlePrint}
                className="border-gray-500 text-gray-600 hover:bg-gray-50"
              >
                <Printer className="h-4 w-4 mr-2" />
                طباعة
              </Button>
            </div>
          </div>
        </div>

        {/* Available Billboards */}
        <div className="lg:col-span-2">
          <Card className="border-0 shadow-lg bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-blue-800 dark:text-blue-300">
                  اللوحات الإعلانية المتاحة
                </CardTitle>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  أكثر اللوحات الإعلانية التي تريد حجزها (50 لوحة)
                </p>
              </div>
            </CardHeader>
            <CardContent>
              {/* Search */}
              <div className="mb-6">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-blue-600" />
                  <Input
                    placeholder="البحث عن اللوحات بالاسم، الرقم، المدينة أو الموقع..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 border-blue-500/30 focus:border-blue-500 focus:ring-blue-500/20"
                  />
                </div>
              </div>

              {/* Pagination Info */}
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  عرض 1-1 من أصل 1 لوحة
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-600 dark:text-gray-400">الصفحة</span>
                  <span className="text-sm font-medium">1/1</span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">التالي</span>
                </div>
              </div>

              {/* Billboard Grid */}
              <div className="grid gap-4 md:grid-cols-2">
                {filteredBillboards.map((billboard) => (
                  <Card key={billboard.id} className="border border-blue-200/50 hover:border-blue-400/50 transition-colors duration-200 overflow-hidden">
                    {/* Billboard Image */}
                    <div className="relative h-32 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20">
                      <img 
                        src="/api/placeholder/300/150" 
                        alt="Billboard"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjE1MCIgdmlld0JveD0iMCAwIDMwMCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIzMDAiIGhlaWdodD0iMTUwIiBmaWxsPSIjRjNGNEY2Ii8+CjxwYXRoIGQ9Ik0xMjUgNjBIMTc1VjkwSDEyNVY2MFoiIGZpbGw9IiM5QjlCQTAiLz4KPHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTIwIDEwVjMwTTEwIDIwSDMwIiBzdHJva2U9IiM2QjdCODAiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIi8+Cjwvc3ZnPgo8L3N2Zz4K'
                        }}
                      />
                      <div className="absolute top-2 left-2">
                        <Badge className="bg-green-500 text-white font-bold">
                          {billboard.size}
                        </Badge>
                      </div>
                      <div className="absolute top-2 right-2">
                        <Badge className="bg-blue-500 text-white font-bold">
                          متاح
                        </Badge>
                      </div>
                    </div>

                    {/* Billboard Info */}
                    <CardContent className="p-4">
                      <div className="space-y-2">
                        <h3 className="font-bold text-gray-900 dark:text-white">
                          {billboard.name}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {billboard.location}
                        </p>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">السعر اليومي:</span>
                          <span className="font-bold text-green-600 dark:text-green-400">
                            {billboard.basePrice} د.ل
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600 dark:text-gray-400">الإجمالي ({bookingDuration} يوم):</span>
                          <span className="font-bold text-blue-600 dark:text-blue-400">
                            {(billboard.basePrice * bookingDuration).toLocaleString()} د.ل
                          </span>
                        </div>
                      </div>

                      <Button
                        onClick={() => handleAddBillboard(billboard)}
                        disabled={selectedBillboards.find(b => b.id === billboard.id) !== undefined}
                        className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                      >
                        {selectedBillboards.find(b => b.id === billboard.id) ? 'تم التحديد' : 'إضافة للحجز'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {filteredBillboards.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-gray-500 dark:text-gray-400">لا توجد لوحات متاحة تطابق البحث</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default AdvancedBookingPage