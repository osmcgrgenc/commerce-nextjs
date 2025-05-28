'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, Package, Truck, CheckCircle2 } from 'lucide-react'

const orderSchema = z.object({
  orderNumber: z.string().min(1, 'Sipariş numarası gereklidir'),
})

type OrderFormValues = z.infer<typeof orderSchema>

// Örnek sipariş durumu
const orderStatus = {
  orderNumber: '123456',
  status: 'Kargoda',
  estimatedDelivery: '2024-03-25',
  trackingNumber: 'TR123456789',
  carrier: 'Yurtiçi Kargo',
  items: [
    {
      name: 'Modern Koltuk Takımı',
      quantity: 1,
      price: 24999,
    },
  ],
  history: [
    {
      date: '2024-03-20',
      status: 'Sipariş Alındı',
      description: 'Siparişiniz başarıyla oluşturuldu.',
    },
    {
      date: '2024-03-21',
      status: 'Hazırlanıyor',
      description: 'Siparişiniz hazırlanmaya başlandı.',
    },
    {
      date: '2024-03-22',
      status: 'Kargoya Verildi',
      description: 'Siparişiniz kargoya verildi.',
    },
  ],
}

export default function OrderTrackingPage() {
  const [isLoading, setIsLoading] = useState(false)
  const [order, setOrder] = useState<typeof orderStatus | null>(null)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderNumber: '',
    },
  })

  const onSubmit = async (data: OrderFormValues) => {
    setIsLoading(true)
    setError(null)
    setOrder(null)

    try {
      // Burada gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000))
      
      if (data.orderNumber === orderStatus.orderNumber) {
        setOrder(orderStatus)
      } else {
        setError('Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.')
      }
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sipariş Alındı':
        return <Package className="h-5 w-5" />
      case 'Hazırlanıyor':
        return <Package className="h-5 w-5" />
      case 'Kargoya Verildi':
        return <Truck className="h-5 w-5" />
      case 'Teslim Edildi':
        return <CheckCircle2 className="h-5 w-5" />
      default:
        return <Package className="h-5 w-5" />
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">Sipariş Takibi</h1>

        <Card>
          <CardHeader>
            <CardTitle>Sipariş Durumu Sorgula</CardTitle>
            <CardDescription>
              Sipariş numaranızı girerek siparişinizin durumunu öğrenebilirsiniz.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="orderNumber"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sipariş Numarası</FormLabel>
                      <FormControl>
                        <Input placeholder="Sipariş numaranızı girin" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Sorgula
                </Button>
              </form>
            </Form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {order && (
              <div className="mt-8 space-y-6">
                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Sipariş Bilgileri</h3>
                  <div className="grid gap-2 text-sm">
                    <p>Sipariş No: {order.orderNumber}</p>
                    <p>Durum: {order.status}</p>
                    <p>Tahmini Teslimat: {order.estimatedDelivery}</p>
                    <p>Kargo Takip No: {order.trackingNumber}</p>
                    <p>Kargo Firması: {order.carrier}</p>
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Sipariş Edilen Ürünler</h3>
                  <div className="space-y-2">
                    {order.items.map((item, index) => (
                      <div key={index} className="flex justify-between text-sm">
                        <span>{item.name} x {item.quantity}</span>
                        <span>{new Intl.NumberFormat('tr-TR', {
                          style: 'currency',
                          currency: 'TRY',
                        }).format(item.price)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-lg border p-4">
                  <h3 className="mb-2 font-semibold">Sipariş Geçmişi</h3>
                  <div className="space-y-4">
                    {order.history.map((item, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="mt-1">{getStatusIcon(item.status)}</div>
                        <div>
                          <p className="font-medium">{item.status}</p>
                          <p className="text-sm text-gray-500">{item.date}</p>
                          <p className="text-sm text-gray-600">{item.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 