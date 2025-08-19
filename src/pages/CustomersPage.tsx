import React, { useState } from 'react'
import { CustomerTable } from '../components/customers/CustomerTable'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select'
import { Plus, Search } from 'lucide-react'
import { useCustomers } from '../hooks/useCustomers'
import { Customer } from '../types'

export const CustomersPage: React.FC = () => {
  const { customers, deleteCustomer } = useCustomers()
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
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">العملاء</h1>
          <p className="text-muted-foreground">إدارة بيانات العملاء</p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          إضافة عميل جديد
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="البحث في العملاء..."
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            className="pl-10"
          />
        </div>
        <Select value={categoryFilter} onValueChange={setCategoryFilter}>
          <SelectTrigger className="w-[180px]">
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
          <SelectTrigger className="w-[180px]">
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
  )
}