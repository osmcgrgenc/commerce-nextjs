'use client'

import Link from 'next/link'
import { memo, useMemo } from 'react'
import { formatPrice } from '@/lib/utils'

interface ProductInfoProps {
  name: string
  price: number
  href: string
  category: string
  arrivalDate: string
  stock: number
}

export const ProductInfo = memo(function ProductInfo({ 
  name, 
  price, 
  href, 
  category, 
  arrivalDate, 
  stock 
}: ProductInfoProps) {
  const formattedDate = useMemo(() => {
    return new Date(arrivalDate).toLocaleDateString('tr-TR')
  }, [arrivalDate])

  const formattedPrice = useMemo(() => {
    return formatPrice(price)
  }, [price])

  const stockStatus = useMemo(() => {
    if (stock === 0) return 'text-red-500'
    if (stock <= 3) return 'text-orange-500'
    return 'text-green-500'
  }, [stock])

  const stockText = useMemo(() => {
    return stock === 0 ? 'Stokta Yok' : `${stock} Adet`
  }, [stock])

  return (
    <div className="mt-4 space-y-2">
      <Link href={href} className="block">
        <h3 className="text-sm font-medium text-gray-900 hover:text-blue-600">
          {name}
        </h3>
      </Link>
      
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">{category}</p>
        <p className="text-sm text-gray-500">
          {formattedDate}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <p className="text-lg font-semibold text-gray-900">
          {formattedPrice}
        </p>
        <p className={`text-sm font-medium ${stockStatus}`}>
          {stockText}
        </p>
      </div>
    </div>
  )
}) 