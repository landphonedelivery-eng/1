import { useCustomers as useCustomersContext } from '../context/CustomerContext'

export const useCustomers = () => {
  return useCustomersContext()
}