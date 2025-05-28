'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

// Bu veri normalde bir API'den gelecek
const cartItems = [
  {
    id: 1,
    name: 'Modern Köşe Koltuk',
    price: 24999,
    quantity: 1,
  },
  {
    id: 2,
    name: 'Yatak Odası Takımı',
    price: 34999,
    quantity: 1,
  },
]

const addresses = [
  {
    id: 1,
    title: 'Ev',
    name: 'Ahmet Yılmaz',
    phone: '0555 555 55 55',
    address: 'Atatürk Mah. Cumhuriyet Cad. No:1',
    city: 'İstanbul',
    postalCode: '34000',
  },
]

export default function CheckoutPage() {
  const router = useRouter()
  const [selectedAddress, setSelectedAddress] = useState(addresses[0])
  const [paymentMethod, setPaymentMethod] = useState('credit-card')
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [expiryDate, setExpiryDate] = useState('')
  const [cvv, setCvv] = useState('')

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const shipping = subtotal > 1000 ? 0 : 150
  const total = subtotal + shipping

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Burada normalde ödeme işlemi yapılır
    toast.success('Siparişiniz alındı')
    router.push('/siparis-onay')
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Ödeme</h1>

        <form onSubmit={handleSubmit} className="mt-12 lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
          <div className="lg:col-span-7">
            {/* Teslimat Adresi */}
            <div>
              <h2 className="text-lg font-medium text-gray-900">Teslimat Adresi</h2>
              <div className="mt-4 space-y-4">
                {addresses.map((address) => (
                  <div
                    key={address.id}
                    className={`relative flex cursor-pointer rounded-lg border p-4 ${
                      selectedAddress.id === address.id ? 'border-indigo-600 ring-2 ring-indigo-600' : 'border-gray-300'
                    }`}
                    onClick={() => setSelectedAddress(address)}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex justify-between">
                        <p className="text-sm font-medium text-gray-900">{address.title}</p>
                      </div>
                      <p className="mt-1 text-sm text-gray-500">{address.name}</p>
                      <p className="mt-1 text-sm text-gray-500">{address.phone}</p>
                      <p className="mt-1 text-sm text-gray-500">{address.address}</p>
                      <p className="mt-1 text-sm text-gray-500">
                        {address.city} {address.postalCode}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ödeme Yöntemi */}
            <div className="mt-10">
              <h2 className="text-lg font-medium text-gray-900">Ödeme Yöntemi</h2>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    id="credit-card"
                    name="payment-method"
                    type="radio"
                    checked={paymentMethod === 'credit-card'}
                    onChange={() => setPaymentMethod('credit-card')}
                    className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  />
                  <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                    Kredi Kartı
                  </label>
                </div>

                {paymentMethod === 'credit-card' && (
                  <div className="mt-4 space-y-4">
                    <div>
                      <label htmlFor="card-number" className="block text-sm font-medium text-gray-700">
                        Kart Numarası
                      </label>
                      <input
                        type="text"
                        id="card-number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="1234 5678 9012 3456"
                      />
                    </div>

                    <div>
                      <label htmlFor="card-name" className="block text-sm font-medium text-gray-700">
                        Kart Üzerindeki İsim
                      </label>
                      <input
                        type="text"
                        id="card-name"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                        placeholder="AHMET YILMAZ"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="expiry-date" className="block text-sm font-medium text-gray-700">
                          Son Kullanma Tarihi
                        </label>
                        <input
                          type="text"
                          id="expiry-date"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="MM/YY"
                        />
                      </div>

                      <div>
                        <label htmlFor="cvv" className="block text-sm font-medium text-gray-700">
                          CVV
                        </label>
                        <input
                          type="text"
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value)}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                          placeholder="123"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sipariş Özeti */}
          <div className="mt-16 lg:col-span-5 lg:mt-0">
            <div className="rounded-lg bg-gray-50 px-4 py-6 sm:p-6 lg:p-8">
              <h2 className="text-lg font-medium text-gray-900">Sipariş Özeti</h2>

              <div className="mt-6 space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="ml-3">
                        <p className="text-sm font-medium text-gray-900">{item.name}</p>
                        <p className="text-sm text-gray-500">Adet: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-900">
                      {new Intl.NumberFormat('tr-TR', {
                        style: 'currency',
                        currency: 'TRY',
                      }).format(item.price * item.quantity)}
                    </p>
                  </div>
                ))}

                <div className="flex items-center justify-between border-t border-gray-200 pt-4">
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
                <button
                  type="submit"
                  className="flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-50"
                >
                  Siparişi Tamamla
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
} 