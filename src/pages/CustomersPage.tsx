import React, { useState } from 'react'
import { CustomerTable } from '../components/customers/CustomerTable'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Plus, Search } from 'lucide-react'
import { Customer } from '../types'

export const CustomersPage: React.FC = () => {
  // Mock data for customers
  const [customers] = useState<Customer[]>([
    {
      id: "1",
      name: "محمد علي الحولة",
      phone: "+218 91-1234567",
      email: "mohamed.alhawla@example.com",
      company: "شركة جوتن للطلاء",
      category: "company",
      status: "active",
      totalSpent: 86400,
      contractsCount: 2,
      createdAt: "2024-01-15",
      address: "طرابلس، ليبيا"
    },
    {
      id: "2", 
      name: "علي عمار",
      phone: "+218 92-7654321",
      email: "ali.ammar@example.com",
      company: "مؤسسة النور التجارية",
      category: "company",
      status: "active",
      totalSpent: 132000,
      contractsCount: 3,
      createdAt: "2024-01-10",
      address: "بنغازي، ليبيا"
    },
    {
      id: "3",
      name: "فاطمة الزهراء",
      phone: "+218 93-9876543",
      email: "fatima.zahra@example.com",
      company: "شركة الأمل للتسويق",
      category: "marketer",
      status: "active",
      totalSpent: 45600,
      contractsCount: 1,
      createdAt: "2024-01-20",
      address: "مصراتة، ليبيا"
    }
  ])

  const deleteCustomer = (id: string) => {
    console.log('Delete customer:', id)
  }
  const [searchFilter, setSearchFilter] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      searchFilter === "" ||
      customer.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
      customer.phone.includes(searchFilter) ||
      customer.email.toLowerCase().includes(searchFilter.toLowerCase()) ||
      (customer.company && customer.company.toLowerCase().includes(searchFilter.toLowerCase()))

    const matchesCategory = categoryFilter === "all" || customer.category === categoryFilter
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter

    return matchesSearch && matchesCategory && matchesStatus
  })

  const handleEdit = (customer: Customer) => {
    // TODO: Implement edit functionality
    console.log('Edit customer:', customer)
  }

  const handleDelete = (customerId: string) => {
    if (confirm("هل أنت متأكد من حذف هذا العميل؟")) {
      deleteCustomer(customerId)
    }
  }

  const handleView = (customer: Customer) => {
    // TODO: Implement view functionality
    console.log('View customer:', customer)
  }

  return (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 rounded-2xl p-6 border border-yellow-500/20">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-yellow-600 dark:from-white dark:to-yellow-400 bg-clip-text text-transparent mb-2">
              إدارة العملاء
            </h1>
            <p className="text-gray-600 dark:text-gray-300 text-lg">إدارة شاملة لبيانات العملاء والمسوقين</p>
          </div>
          <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-200">
            <Plus className="h-4 w-4 mr-2" />
            إضافة عميل جديد
          </Button>
        </div>
      </div>

      <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm rounded-2xl border border-yellow-500/20 p-6 shadow-lg">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-yellow-600" />
            <Input
              placeholder="البحث في العملاء..."
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
              className="pl-10 border-yellow-500/30 focus:border-yellow-500 focus:ring-yellow-500/20"
            />
          </div>
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[180px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="نوع العميل" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الأنواع</SelectItem>
              <SelectItem value="marketer">مسوق</SelectItem>
              <SelectItem value="company">شركة</SelectItem>
              <SelectItem value="individual">فرد</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px] border-yellow-500/30 focus:border-yellow-500">
              <SelectValue placeholder="الحالة" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">جميع الحالات</SelectItem>
              <SelectItem value="active">نشط</SelectItem>
              <SelectItem value="inactive">غير نشط</SelectItem>
              <SelectItem value="vip">مميز</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <CustomerTable
          customers={filteredCustomers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
        />
      </div>
    </div>
  )
}

export default CustomersPage