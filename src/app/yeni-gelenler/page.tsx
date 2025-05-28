'use client'

import { useState } from 'react'
import { ProductCard } from '@/components/product-card'

interface StockHistory {
  date: string
  quantity: number
  type: 'in' | 'out'
}

interface StockPrediction {
  date: string
  predictedQuantity: number
  confidence: number
}

interface StockAlert {
  id: number
  type: 'low' | 'out' | 'high'
  threshold: number
  message: string
  isActive: boolean
}

interface StockReport {
  id: number
  type: 'daily' | 'weekly' | 'monthly'
  date: string
  data: {
    totalStock: number
    lowStock: number
    outOfStock: number
    sales: number
    revenue: number
  }
}

interface StockOptimization {
  id: number
  suggestion: string
  impact: 'high' | 'medium' | 'low'
  savings: number
}

interface ProductVariant {
  id: number
  name: string
  stock: number
  color?: string
  size?: string
  material?: string
  image?: string
  priceDifference?: number
  history?: StockHistory[]
  predictions?: StockPrediction[]
  alerts?: StockAlert[]
  reports?: StockReport[]
  optimizations?: StockOptimization[]
  lastSynced?: string
}

interface Product {
  id: number
  name: string
  price: number
  image: string
  href: string
  category: string
  arrivalDate: string
  isNew?: boolean
  stock: number
  variants?: ProductVariant[]
}

const newArrivals: Product[] = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 15000,
    image: '/images/products/sofa-1.jpg',
    href: '/urunler/modern-kose-koltuk',
    category: 'Oturma Grubu',
    arrivalDate: '2024-03-15',
    isNew: true,
    stock: 10,
    variants: [
      {
        id: 1,
        name: 'Bej',
        stock: 5,
        color: 'Bej',
        material: 'Kumaş',
        image: '/images/products/sofa-1-bej.jpg',
        priceDifference: 0,
        history: [
          { date: '2024-03-15', quantity: 5, type: 'in' },
          { date: '2024-03-16', quantity: 2, type: 'out' },
          { date: '2024-03-17', quantity: 3, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 4, confidence: 90 },
          { date: '2024-03-25', predictedQuantity: 2, confidence: 85 },
          { date: '2024-03-30', predictedQuantity: 0, confidence: 80 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 3, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-17',
            data: {
              totalStock: 5,
              lowStock: 1,
              outOfStock: 0,
              sales: 2,
              revenue: 30000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 8 adete yükselt',
            impact: 'high',
            savings: 5000,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %10 artır',
            impact: 'medium',
            savings: 3000,
          },
        ],
        lastSynced: '2024-03-17T15:30:00',
      },
      {
        id: 2,
        name: 'Gri',
        stock: 5,
        color: 'Gri',
        material: 'Kumaş',
        image: '/images/products/sofa-1-gri.jpg',
        priceDifference: 1000,
        history: [
          { date: '2024-03-15', quantity: 5, type: 'in' },
          { date: '2024-03-16', quantity: 1, type: 'out' },
          { date: '2024-03-17', quantity: 2, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 5, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 3, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 1, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 3, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-17',
            data: {
              totalStock: 5,
              lowStock: 0,
              outOfStock: 0,
              sales: 1,
              revenue: 16000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 6 adete yükselt',
            impact: 'medium',
            savings: 3000,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %5 artır',
            impact: 'low',
            savings: 1000,
          },
        ],
        lastSynced: '2024-03-17T15:30:00',
      },
    ],
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 25000,
    image: '/images/products/bedroom-1.jpg',
    href: '/urunler/yatak-odasi-takimi',
    category: 'Yatak Odası',
    arrivalDate: '2024-03-14',
    isNew: true,
    stock: 8,
    variants: [
      {
        id: 1,
        name: 'Antrasit',
        stock: 4,
        color: 'Antrasit',
        material: 'MDF',
        image: '/images/products/bedroom-1-antrasit.jpg',
        priceDifference: 0,
        history: [
          { date: '2024-03-14', quantity: 4, type: 'in' },
          { date: '2024-03-15', quantity: 1, type: 'out' },
          { date: '2024-03-16', quantity: 2, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 4, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 2, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 1, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 3, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-16',
            data: {
              totalStock: 4,
              lowStock: 1,
              outOfStock: 0,
              sales: 1,
              revenue: 25000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 6 adete yükselt',
            impact: 'high',
            savings: 7500,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %8 artır',
            impact: 'medium',
            savings: 4000,
          },
        ],
        lastSynced: '2024-03-16T14:45:00',
      },
      {
        id: 2,
        name: 'Beyaz',
        stock: 4,
        color: 'Beyaz',
        material: 'MDF',
        image: '/images/products/bedroom-1-beyaz.jpg',
        priceDifference: 2000,
        history: [
          { date: '2024-03-14', quantity: 4, type: 'in' },
          { date: '2024-03-15', quantity: 2, type: 'out' },
          { date: '2024-03-16', quantity: 3, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 4, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 2, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 0, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 3, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-16',
            data: {
              totalStock: 4,
              lowStock: 1,
              outOfStock: 0,
              sales: 2,
              revenue: 54000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 5 adete yükselt',
            impact: 'medium',
            savings: 5000,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %5 artır',
            impact: 'low',
            savings: 2000,
          },
        ],
        lastSynced: '2024-03-16T14:45:00',
      },
    ],
  },
  {
    id: 3,
    name: '3+2 Koltuk Takımı',
    price: 20000,
    image: '/images/products/sofa-2.jpg',
    href: '/urunler/3-2-koltuk-takimi',
    category: 'Oturma Grubu',
    arrivalDate: '2024-03-13',
    isNew: true,
    stock: 6,
    variants: [
      {
        id: 1,
        name: 'Lacivert',
        stock: 3,
        color: 'Lacivert',
        material: 'Deri',
        image: '/images/products/sofa-2-lacivert.jpg',
        priceDifference: 0,
        history: [
          { date: '2024-03-13', quantity: 3, type: 'in' },
          { date: '2024-03-14', quantity: 1, type: 'out' },
          { date: '2024-03-15', quantity: 2, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 3, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 1, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 0, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 3, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-15',
            data: {
              totalStock: 3,
              lowStock: 1,
              outOfStock: 0,
              sales: 1,
              revenue: 20000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 4 adete yükselt',
            impact: 'high',
            savings: 6000,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %7 artır',
            impact: 'medium',
            savings: 3500,
          },
        ],
        lastSynced: '2024-03-15T16:20:00',
      },
      {
        id: 2,
        name: 'Siyah',
        stock: 3,
        color: 'Siyah',
        material: 'Deri',
        image: '/images/products/sofa-2-siyah.jpg',
        priceDifference: 3000,
        history: [
          { date: '2024-03-13', quantity: 3, type: 'in' },
          { date: '2024-03-14', quantity: 2, type: 'out' },
          { date: '2024-03-15', quantity: 3, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 3, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 1, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 0, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 3, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-15',
            data: {
              totalStock: 3,
              lowStock: 1,
              outOfStock: 0,
              sales: 2,
              revenue: 46000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 4 adete yükselt',
            impact: 'medium',
            savings: 4000,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %5 artır',
            impact: 'low',
            savings: 2000,
          },
        ],
        lastSynced: '2024-03-15T16:20:00',
      },
    ],
  },
  {
    id: 4,
    name: 'Yemek Odası Takımı',
    price: 18000,
    image: '/images/products/dining-1.jpg',
    href: '/urunler/yemek-odasi-takimi',
    category: 'Yemek Odası',
    arrivalDate: '2024-03-12',
    isNew: true,
    stock: 4,
    variants: [
      {
        id: 1,
        name: '6 Kişilik',
        stock: 2,
        size: '6 Kişilik',
        material: 'MDF',
        image: '/images/products/dining-1-6.jpg',
        priceDifference: 0,
        history: [
          { date: '2024-03-12', quantity: 2, type: 'in' },
          { date: '2024-03-13', quantity: 1, type: 'out' },
          { date: '2024-03-14', quantity: 1, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 2, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 1, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 0, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 2, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-14',
            data: {
              totalStock: 2,
              lowStock: 1,
              outOfStock: 0,
              sales: 1,
              revenue: 18000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 3 adete yükselt',
            impact: 'high',
            savings: 4500,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %6 artır',
            impact: 'medium',
            savings: 3000,
          },
        ],
        lastSynced: '2024-03-14T13:15:00',
      },
      {
        id: 2,
        name: '8 Kişilik',
        stock: 2,
        size: '8 Kişilik',
        material: 'MDF',
        image: '/images/products/dining-1-8.jpg',
        priceDifference: 5000,
        history: [
          { date: '2024-03-12', quantity: 2, type: 'in' },
          { date: '2024-03-13', quantity: 1, type: 'out' },
          { date: '2024-03-14', quantity: 1, type: 'in' },
        ],
        predictions: [
          { date: '2024-03-20', predictedQuantity: 2, confidence: 95 },
          { date: '2024-03-25', predictedQuantity: 1, confidence: 90 },
          { date: '2024-03-30', predictedQuantity: 0, confidence: 85 },
        ],
        alerts: [
          { id: 1, type: 'low', threshold: 2, message: 'Stok azalıyor', isActive: true },
          { id: 2, type: 'out', threshold: 0, message: 'Stok tükeniyor', isActive: false },
        ],
        reports: [
          {
            id: 1,
            type: 'daily',
            date: '2024-03-14',
            data: {
              totalStock: 2,
              lowStock: 1,
              outOfStock: 0,
              sales: 1,
              revenue: 23000,
            },
          },
        ],
        optimizations: [
          {
            id: 1,
            suggestion: 'Stok seviyesini 3 adete yükselt',
            impact: 'medium',
            savings: 3500,
          },
          {
            id: 2,
            suggestion: 'Satış fiyatını %4 artır',
            impact: 'low',
            savings: 1500,
          },
        ],
        lastSynced: '2024-03-14T13:15:00',
      },
    ],
  },
]

const categories = [
  { id: 'all', name: 'Tümü' },
  { id: 'oturma-grubu', name: 'Oturma Grubu' },
  { id: 'yatak-odasi', name: 'Yatak Odası' },
  { id: 'yemek-odasi', name: 'Yemek Odası' },
]

export default function NewArrivalsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState<'date' | 'price'>('date')

  const filteredProducts = newArrivals
    .filter((product) => selectedCategory === 'all' || product.category === selectedCategory)
    .sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.arrivalDate).getTime() - new Date(a.arrivalDate).getTime()
      }
      return a.price - b.price
    })

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900">Yeni Gelenler</h1>
            <p className="mt-2 text-sm text-gray-500">
              En yeni ürünlerimizi keşfedin
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <label htmlFor="category" className="text-sm font-medium text-gray-700">
                Kategori:
              </label>
              <select
                id="category"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center space-x-2">
              <label htmlFor="sort" className="text-sm font-medium text-gray-700">
                Sırala:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'date' | 'price')}
                className="rounded-md border-gray-300 py-1.5 pl-3 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
              >
                <option value="date">Eklenme Tarihi</option>
                <option value="price">Fiyat</option>
              </select>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-lg font-medium text-gray-900">Ürün bulunamadı</h3>
            <p className="mt-2 text-sm text-gray-500">
              Seçili kategoride yeni ürün bulunmamaktadır.
            </p>
          </div>
        )}
      </div>
    </div>
  )
} 