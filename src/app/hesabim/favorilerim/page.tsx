'use client'

import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { Heart, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

// Bu veri normalde bir API'den gelecek
const favorites = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    image: '/images/products/kose-koltuk.jpg',
    href: '/urunler/modern-kose-koltuk',
  },
  {
    id: 2,
    name: '3+2 Koltuk Takımı',
    price: 34999,
    image: '/images/products/3-2-koltuk.jpg',
    href: '/urunler/3-2-koltuk-takimi',
  },
  {
    id: 3,
    name: 'Yatak Odası Takımı',
    price: 34999,
    image: '/images/products/yatak-odasi.jpg',
    href: '/urunler/yatak-odasi-takimi',
  },
]

export default function FavoritesPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">Yükleniyor...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    router.push('/auth/login')
    return null
  }

  const handleRemoveFavorite = (id: number) => {
    // Burada normalde bir API çağrısı yapılır
    toast.success('Ürün favorilerden kaldırıldı')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-2xl font-bold leading-6 text-gray-900">
              Favorilerim
            </h3>

            {favorites.length === 0 ? (
              <div className="mt-8 text-center">
                <Heart className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Favori ürününüz yok</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Beğendiğiniz ürünleri favorilere ekleyerek daha sonra kolayca bulabilirsiniz.
                </p>
                <div className="mt-6">
                  <Link
                    href="/kategoriler"
                    className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    Alışverişe Başla
                  </Link>
                </div>
              </div>
            ) : (
              <div className="mt-8 flow-root">
                <ul className="-my-6 divide-y divide-gray-200">
                  {favorites.map((product) => (
                    <li key={product.id} className="flex py-6">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                        <Image
                          src={product.image}
                          alt={product.name}
                          width={96}
                          height={96}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>

                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium text-gray-900">
                            <h3>
                              <Link href={product.href}>{product.name}</Link>
                            </h3>
                            <p className="ml-4">
                              {new Intl.NumberFormat('tr-TR', {
                                style: 'currency',
                                currency: 'TRY',
                              }).format(product.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-1 items-end justify-between text-sm">
                          <div className="flex">
                            <button
                              type="button"
                              onClick={() => handleRemoveFavorite(product.id)}
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 