'use client'

import { useState } from 'react'
import { useAuthenticationStatus } from '@nhost/nextjs'
import { useRouter } from 'next/navigation'
import { MapPin, Plus, Pencil, Trash2 } from 'lucide-react'
import { toast } from 'sonner'

// Bu veri normalde bir API'den gelecek
const addresses = [
  {
    id: 1,
    title: 'Ev',
    name: 'Ahmet Yılmaz',
    phone: '0555 555 55 55',
    address: 'Atatürk Mahallesi, Cumhuriyet Caddesi No: 1',
    city: 'İstanbul',
    postalCode: '34000',
  },
  {
    id: 2,
    title: 'İş',
    name: 'Ahmet Yılmaz',
    phone: '0555 555 55 55',
    address: 'Levent, Büyükdere Caddesi No: 100',
    city: 'İstanbul',
    postalCode: '34330',
  },
]

export default function AddressesPage() {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuthenticationStatus()
  const [isAddingAddress, setIsAddingAddress] = useState(false)

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

  const handleAddAddress = () => {
    setIsAddingAddress(true)
    // Burada normalde bir modal açılır
  }

  const handleEditAddress = (id: number) => {
    // Burada normalde bir modal açılır
    toast.success('Adres düzenleme özelliği yakında eklenecek')
  }

  const handleDeleteAddress = (id: number) => {
    // Burada normalde bir API çağrısı yapılır
    toast.success('Adres silindi')
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <h3 className="text-2xl font-bold leading-6 text-gray-900">
                Adreslerim
              </h3>
              <div className="mt-4 sm:mt-0">
                <button
                  type="button"
                  onClick={handleAddAddress}
                  className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Yeni Adres Ekle
                </button>
              </div>
            </div>

            {addresses.length === 0 ? (
              <div className="mt-8 text-center">
                <MapPin className="mx-auto h-12 w-12 text-gray-400" />
                <h3 className="mt-2 text-sm font-medium text-gray-900">Henüz adres eklenmemiş</h3>
                <p className="mt-1 text-sm text-gray-500">
                  Teslimat adreslerinizi ekleyerek alışverişlerinizde kolayca kullanabilirsiniz.
                </p>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className="relative rounded-lg border border-gray-300 bg-white p-6 shadow-sm"
                  >
                    <div className="flex items-center justify-between">
                      <h4 className="text-lg font-medium text-gray-900">{address.title}</h4>
                      <div className="flex space-x-2">
                        <button
                          type="button"
                          onClick={() => handleEditAddress(address.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Pencil className="h-5 w-5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDeleteAddress(address.id)}
                          className="text-gray-400 hover:text-gray-500"
                        >
                          <Trash2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2 text-sm text-gray-500">
                      <p>{address.name}</p>
                      <p>{address.phone}</p>
                      <p>{address.address}</p>
                      <p>
                        {address.city} {address.postalCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 