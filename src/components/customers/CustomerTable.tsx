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

    return (
      <Badge variant={variants[status]}>
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
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>الاسم</TableHead>
            <TableHead>الهاتف</TableHead>
            <TableHead>البريد الإلكتروني</TableHead>
            <TableHead>الشركة</TableHead>
            <TableHead>النوع</TableHead>
            <TableHead>الحالة</TableHead>
            <TableHead>إجمالي الحجوزات</TableHead>
            <TableHead>إجمالي المبلغ</TableHead>
            <TableHead>الإجراءات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {customers.map((customer) => (
            <TableRow key={customer.id}>
              <TableCell className="font-medium">{customer.name}</TableCell>
              <TableCell>{customer.phone}</TableCell>
              <TableCell>{customer.email}</TableCell>
              <TableCell>{customer.company || '-'}</TableCell>
              <TableCell>{getCategoryLabel(customer.category)}</TableCell>
              <TableCell>{getStatusBadge(customer.status)}</TableCell>
              <TableCell>{customer.totalBookings}</TableCell>
              <TableCell>{customer.totalSpent.toLocaleString()} د.ل</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onView(customer)}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onEdit(customer)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onDelete(customer.id)}
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