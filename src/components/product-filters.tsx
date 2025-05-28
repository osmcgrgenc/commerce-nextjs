'use client'

import { useState } from 'react'
import { ChevronDown, X } from 'lucide-react'

interface Filter {
  id: string
  name: string
  options: {
    value: string
    label: string
    count?: number
  }[]
}

interface SortOption {
  value: string
  label: string
}

interface ProductFiltersProps {
  filters: Filter[]
  sortOptions: SortOption[]
  onFilterChange: (filters: Record<string, string[]>) => void
  onSortChange: (sort: string) => void
}

export function ProductFilters({ filters, sortOptions, onFilterChange, onSortChange }: ProductFiltersProps) {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const [selectedSort, setSelectedSort] = useState(sortOptions[0].value)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const handleFilterChange = (filterId: string, value: string) => {
    const currentValues = selectedFilters[filterId] || []
    const newValues = currentValues.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...currentValues, value]

    const newFilters = {
      ...selectedFilters,
      [filterId]: newValues,
    }

    setSelectedFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (value: string) => {
    setSelectedSort(value)
    onSortChange(value)
  }

  const clearFilters = () => {
    setSelectedFilters({})
    onFilterChange({})
  }

  return (
    <div className="bg-white">
      {/* Mobil Filtre Butonu */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24 lg:hidden">
        <h2 className="text-lg font-medium text-gray-900">Filtreler</h2>
        <button
          type="button"
          className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
          onClick={() => setMobileFiltersOpen(true)}
        >
          <span className="sr-only">Filtreleri göster</span>
          <ChevronDown className="h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {/* Sıralama */}
      <div className="flex items-center justify-between border-b border-gray-200 pb-6 pt-24">
        <h2 className="text-lg font-medium text-gray-900">Sıralama</h2>
        <select
          value={selectedSort}
          onChange={(e) => handleSortChange(e.target.value)}
          className="ml-4 rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      {/* Aktif Filtreler */}
      {Object.keys(selectedFilters).length > 0 && (
        <div className="flex items-center space-x-2 py-4">
          <span className="text-sm text-gray-500">Aktif Filtreler:</span>
          {Object.entries(selectedFilters).map(([filterId, values]) =>
            values.map((value) => (
              <span
                key={`${filterId}-${value}`}
                className="inline-flex items-center rounded-full border border-gray-200 bg-white px-3 py-0.5 text-sm font-medium text-gray-900"
              >
                {value}
                <button
                  type="button"
                  className="ml-1 inline-flex h-4 w-4 flex-shrink-0 items-center justify-center rounded-full text-gray-400 hover:bg-gray-200 hover:text-gray-500"
                  onClick={() => handleFilterChange(filterId, value)}
                >
                  <span className="sr-only">Filtreyi kaldır</span>
                  <X className="h-3 w-3" aria-hidden="true" />
                </button>
              </span>
            ))
          )}
          <button
            type="button"
            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
            onClick={clearFilters}
          >
            Tümünü Temizle
          </button>
        </div>
      )}

      {/* Filtreler */}
      <div className="pt-6">
        <div className="space-y-10">
          {filters.map((filter) => (
            <div key={filter.id}>
              <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
              <div className="mt-4 space-y-4">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${filter.id}-${option.value}`}
                      name={`${filter.id}[]`}
                      value={option.value}
                      type="checkbox"
                      checked={selectedFilters[filter.id]?.includes(option.value) || false}
                      onChange={() => handleFilterChange(filter.id, option.value)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label
                      htmlFor={`filter-${filter.id}-${option.value}`}
                      className="ml-3 text-sm text-gray-600"
                    >
                      {option.label}
                      {option.count !== undefined && (
                        <span className="ml-1 text-gray-400">({option.count})</span>
                      )}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mobil Filtre Menüsü */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-25" onClick={() => setMobileFiltersOpen(false)} />
          <div className="fixed inset-y-0 right-0 z-40 w-full overflow-y-auto bg-white px-4 py-6 sm:max-w-sm sm:px-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium text-gray-900">Filtreler</h2>
              <button
                type="button"
                className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md bg-white p-2 text-gray-400"
                onClick={() => setMobileFiltersOpen(false)}
              >
                <span className="sr-only">Menüyü kapat</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            {/* Mobil Filtreler */}
            <div className="mt-4 space-y-10">
              {filters.map((filter) => (
                <div key={filter.id}>
                  <h3 className="text-sm font-medium text-gray-900">{filter.name}</h3>
                  <div className="mt-4 space-y-4">
                    {filter.options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <input
                          id={`mobile-filter-${filter.id}-${option.value}`}
                          name={`${filter.id}[]`}
                          value={option.value}
                          type="checkbox"
                          checked={selectedFilters[filter.id]?.includes(option.value) || false}
                          onChange={() => handleFilterChange(filter.id, option.value)}
                          className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                        />
                        <label
                          htmlFor={`mobile-filter-${filter.id}-${option.value}`}
                          className="ml-3 text-sm text-gray-600"
                        >
                          {option.label}
                          {option.count !== undefined && (
                            <span className="ml-1 text-gray-400">({option.count})</span>
                          )}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 