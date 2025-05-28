'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Trash2, Plus, Minus } from 'lucide-react'
import { toast } from 'sonner'

// Bu veri normalde bir API'den gelecek
const cartItems = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    image: '/images/products/kose-koltuk-1.jpg',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 34999,
    image: '/images/products/yatak-odasi.jpg',
    quantity: 1,
  },
]

export default function CartPage() {
  const [items, setItems] = useState(cartItems)

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return
    setItems(items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: number) => {
    setItems(items.filter((item) => item.id !== id))
    toast.success('Ürün sepetten kaldırıldı')
  }

  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 150
  const total = subtotal + shipping

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Alışveriş Sepeti</h1>

        <div className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            {items.length === 0 ? (
              <div className="text-center">
                <h2 className="text-lg font-medium text-gray-900">Sepetiniz boş</h2>
                <p className="mt-2 text-sm text-gray-500">
                  Alışverişe başlamak için{' '}
                  <Link href="/urunler" className="font-medium text-indigo-600 hover:text-indigo-500">
                    ürünlerimize göz atın
                  </Link>
                </p>
              </div>
            ) : (
              <ul className="divide-y divide-gray-200 border-b border-t border-gray-200">
                {items.map((item) => (
                  <li key={item.id} className="flex py-6 sm:py-10">
                    <div className="flex-shrink-0">
                      <Image
                        src={item.image}
                        alt={item.name}
                        width={200}
                        height={200}
                        className="h-24 w-24 rounded-md object-cover object-center sm:h-48 sm:w-48"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col sm:ml-6">
                      <div>
                        <div className="flex justify-between">
                          <h4 className="text-sm">
                            <Link href={`/urunler/${item.id}`} className="font-medium text-gray-700 hover:text-gray-800">
                              {item.name}
                            </Link>
                          </h4>
                          <p className="ml-4 text-sm font-medium text-gray-900">
                            {new Intl.NumberFormat('tr-TR', {
                              style: 'currency',
                              currency: 'TRY',
                            }).format(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-1 items-end justify-between">
                        <div className="flex items-center space-x-3">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="rounded-md border p-1 hover:bg-gray-50"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-gray-500">Adet: {item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="rounded-md border p-1 hover:bg-gray-50"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="ml-4">
                          <button
                            type="button"
                            onClick={() => removeItem(item.id)}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
                          >
                            <Trash2 className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Sipariş Özeti */}
          <div className="mt-16 rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:col-span-5 lg:mt-0 lg:p-8">
            <h2 className="text-lg font-medium text-gray-900">Sipariş Özeti</h2>

            <div className="mt-6 space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm text-gray-600">Ara Toplam</p>
                <p className="text-sm font-medium text-gray-900">
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  }).format(subtotal)}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-sm text-gray-600">Kargo</p>
                <p className="text-sm font-medium text-gray-900">
                  {shipping === 0 ? (
                    'Ücretsiz'
                  ) : (
                    new Intl.NumberFormat('tr-TR', {
                      style: 'currency',
                      currency: 'TRY',
                    }).format(shipping)
                  )}
                </p>
              </div>
              <div className="flex items-center justify-between border-t border-gray-200 pt-4">
                <p className="text-base font-medium text-gray-900">Toplam</p>
                <p className="text-base font-medium text-gray-900">
                  {new Intl.NumberFormat('tr-TR', {
                    style: 'currency',
                    currency: 'TRY',
                  }).format(total)}
                </p>
              </div>
            </div>

            <div className="mt-6">
              <Link
                href="/odeme"
                className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
              >
                Ödemeye Geç
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 