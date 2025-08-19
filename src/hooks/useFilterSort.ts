import { useState, useMemo } from 'react'

interface UseFilterSortProps<T> {
  data: T[]
  searchFields: (keyof T)[]
  sortField?: keyof T
}

export const useFilterSort = <T>({ data, searchFields, sortField }: UseFilterSortProps<T>) => {
  const [searchTerm, setSearchTerm] = useState("")
  const [sortBy, setSortBy] = useState<keyof T | "">(sortField || "")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc")

  const filteredAndSortedData = useMemo(() => {
    let filtered = data

    // Apply search filter
    if (searchTerm) {
      filtered = data.filter(item =>
        searchFields.some(field => {
          const value = item[field]
          return value && String(value).toLowerCase().includes(searchTerm.toLowerCase())
        })
      )
    }

    // Apply sorting
    if (sortBy) {
      filtered = [...filtered].sort((a, b) => {
        const aValue = a[sortBy]
        const bValue = b[sortBy]
        
        if (aValue < bValue) return sortOrder === "asc" ? -1 : 1
        if (aValue > bValue) return sortOrder === "asc" ? 1 : -1
        return 0
      })
    }

    return filtered
  }, [data, searchTerm, sortBy, sortOrder, searchFields])

  return {
    searchTerm,
    setSearchTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    filteredAndSortedData,
  }
}