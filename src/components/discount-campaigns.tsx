'use client'

import { useState } from 'react'
import { Copy, Check, Clock, Users, Tag, Star } from 'lucide-react'
import { toast } from 'sonner'

interface Campaign {
  id: number
  title: string
  description: string
  type: 'coupon' | 'seasonal' | 'member' | 'bulk'
  code?: string
  discount: number
  minPurchase?: number
  endDate: string
  icon: React.ReactNode
}

const campaigns: Campaign[] = [
  {
    id: 1,
    title: 'Bahar İndirimi',
    description: 'Tüm bahar koleksiyonunda %20 indirim',
    type: 'seasonal',
    discount: 20,
    endDate: '2024-04-30',
    icon: <Clock className="h-6 w-6" />,
  },
  {
    id: 2,
    title: 'Üyelere Özel',
    description: 'Üyelerimize özel %15 indirim',
    type: 'member',
    code: 'UYE15',
    discount: 15,
    endDate: '2024-12-31',
    icon: <Star className="h-6 w-6" />,
  },
  {
    id: 3,
    title: 'Toplu Alım İndirimi',
    description: '3 ve üzeri üründe %25 indirim',
    type: 'bulk',
    discount: 25,
    minPurchase: 3,
    endDate: '2024-12-31',
    icon: <Users className="h-6 w-6" />,
  },
  {
    id: 4,
    title: 'Hoş Geldin Kuponu',
    description: 'İlk alışverişinizde %10 indirim',
    type: 'coupon',
    code: 'HOSGELDIN10',
    discount: 10,
    endDate: '2024-12-31',
    icon: <Tag className="h-6 w-6" />,
  },
]

export function DiscountCampaigns() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(code)
    toast.success('Kupon kodu kopyalandı')
    setTimeout(() => setCopiedCode(null), 2000)
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="flex items-center space-x-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100 text-indigo-600">
                  {campaign.icon}
                </div>
                <h3 className="text-lg font-medium text-gray-900">{campaign.title}</h3>
              </div>
              <p className="mt-2 text-sm text-gray-500">{campaign.description}</p>
              {campaign.code && (
                <div className="mt-4">
                  <div className="flex items-center justify-between rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
                    <span className="text-sm font-medium text-gray-900">{campaign.code}</span>
                    <button
                      onClick={() => handleCopyCode(campaign.code!)}
                      className="ml-2 text-gray-500 hover:text-gray-700"
                    >
                      {copiedCode === campaign.code ? (
                        <Check className="h-5 w-5 text-green-500" />
                      ) : (
                        <Copy className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              )}
              {campaign.minPurchase && (
                <p className="mt-2 text-sm text-gray-500">
                  Minimum {campaign.minPurchase} ürün
                </p>
              )}
              <div className="mt-4 flex items-center justify-between">
                <span className="text-lg font-bold text-indigo-600">%{campaign.discount}</span>
                <span className="text-sm text-gray-500">
                  Son: {new Date(campaign.endDate).toLocaleDateString('tr-TR')}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 