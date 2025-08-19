"use client"

import React, { createContext, useContext, useState, ReactNode } from 'react'
import { Customer } from '../types'
import { mockCustomers } from '../data/mockCustomers'

interface CustomerContextType {
  customers: Customer[]
  setCustomers: (customers: Customer[]) => void
  addCustomer: (customer: Omit<Customer, 'id' | 'totalBookings' | 'totalSpent' | 'lastBooking' | 'createdAt' | 'status'>) => void
  updateCustomer: (customer: Customer) => void
  deleteCustomer: (customerId: string) => void
  getFilteredCustomers: (searchFilter: string, categoryFilter: string, statusFilter: string) => Customer[]
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined)

export const useCustomers = () => {
  const context = useContext(CustomerContext)
  if (context === undefined) {
    throw new Error('useCustomers must be used within a CustomerProvider')
  }
  return context
}

interface CustomerProviderProps {
  children: ReactNode
}

export const CustomerProvider: React.FC<CustomerProviderProps> = ({ children }) => {
  const [customers, setCustomers] = useState<Customer[]>(mockCustomers)

  const addCustomer = (customerData: Omit<Customer, 'id' | 'totalBookings' | 'totalSpent' | 'lastBooking' | 'createdAt' | 'status'>) => {
    const newCustomer: Customer = {
      ...customerData,
      id: Date.now().toString(),
      totalBookings: 0,
      totalSpent: 0,
      lastBooking: "",
      createdAt: new Date().toISOString().split("T")[0],
      status: "active",
    }
    setCustomers(prev => [...prev, newCustomer])
  }

  const updateCustomer = (updatedCustomer: Customer) => {
    setCustomers(prev => prev.map(customer => 
      customer.id === updatedCustomer.id ? updatedCustomer : customer
    ))
  }

  const deleteCustomer = (customerId: string) => {
    setCustomers(prev => prev.filter(customer => customer.id !== customerId))
  }

  const getFilteredCustomers = (searchFilter: string, categoryFilter: string, statusFilter: string) => {
    return customers.filter((customer) => {
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
  }

  const value: CustomerContextType = {
    customers,
    setCustomers,
    addCustomer,
    updateCustomer,
    deleteCustomer,
    getFilteredCustomers,
  }

  return <CustomerContext.Provider value={value}>{children}</CustomerContext.Provider>
}