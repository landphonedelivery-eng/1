import React from 'react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { Edit, Trash2, Eye } from 'lucide-react'
import { Customer } from '../../types'

interface CustomerTableProps {
  customers: Customer[]
  onEdit: (customer: Customer) => void
  onDelete: (customerId: string) => void
  onView: (customer: Customer) => void
}

export const CustomerTable: React.FC<CustomerTableProps> = ({
  customers,
  onEdit,
  onDelete,
  onView
}) => {
  const getStatusBadge = (status: Customer['status']) => {
    const variants = {
      active: 'default',
      inactive: 'secondary',
      vip: 'destructive'
    } as const

    const labels = {
      active: 'نشط',
      inactive: 'غير نشط',
      vip: 'مميز'
    }

    const colors = {
      active: 'bg-green-100 text-green-800 border-green-200',
      inactive: 'bg-gray-100 text-gray-800 border-gray-200',
      vip: 'bg-yellow-100 text-yellow-800 border-yellow-200'
    }

    return (
      <Badge className={`${colors[status]} font-medium`}>
        {labels[status]}
      </Badge>
    )
  }

  const getCategoryLabel = (category: Customer['category']) => {
    const labels = {
      marketer: 'مسوق',
      company: 'شركة',
      individual: 'فرد'
    }
    return labels[category]
  }

  return (
    <div className="rounded-2xl border border-yellow-500/20 overflow-hidden shadow-lg">
      <Table>
        <TableHeader>
          <TableRow className="bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-b border-yellow-500/20">
            <TableHead className="font-bold text-gray-900 dark:text-white">الاسم</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">الهاتف</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">البريد الإلكتروني</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">الشركة</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">النوع</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">الحالة</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">إجمالي الحجوزات</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">إجمالي المبلغ</TableHead>
            <TableHead className="font-bold text-gray-900 dark:text-white">الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer, index) => (
            <TableRow 
              key={customer.id} 
              className={`hover:bg-yellow-50/50 dark:hover:bg-yellow-900/10 transition-colors duration-200 ${
                index % 2 === 0 ? 'bg-white dark:bg-gray-800' : 'bg-gray-50/50 dark:bg-gray-700/50'
              }`}
            >
              <TableCell className="font-semibold text-gray-900 dark:text-white">{customer.name}</TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">{customer.phone}</TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">{customer.email}</TableCell>
              <TableCell className="text-gray-700 dark:text-gray-300">{customer.company || '-'}</TableCell>
              <TableCell>
                <Badge className="bg-blue-100 text-blue-800 border-blue-200 font-medium">
                  {getCategoryLabel(customer.category)}
                </Badge>
              </TableCell>
              <TableCell>{getStatusBadge(customer.status)}</TableCell>
              <TableCell className="font-semibold text-gray-900 dark:text-white">{customer.totalBookings}</TableCell>
              <TableCell className="font-bold text-yellow-600 dark:text-yellow-400">
                {customer.totalSpent.toLocaleString()} د.ل
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(customer)}
                    className="hover:bg-blue-100 hover:text-blue-700 transition-colors duration-200"
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(customer)}
                    className="hover:bg-yellow-100 hover:text-yellow-700 transition-colors duration-200"
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(customer.id)}
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
  )
}