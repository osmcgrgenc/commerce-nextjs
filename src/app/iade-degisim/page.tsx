'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Loader2 } from 'lucide-react'

const returnSchema = z.object({
  orderNumber: z.string().min(1, 'Sipariş numarası gereklidir'),
  requestType: z.enum(['return', 'exchange'], {
    required_error: 'Lütfen bir işlem türü seçin',
  }),
  reason: z.string().min(10, 'En az 10 karakter giriniz'),
  details: z.string().min(20, 'En az 20 karakter giriniz'),
  contactPhone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
})

type ReturnFormValues = z.infer<typeof returnSchema>

export default function ReturnExchangePage() {
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const form = useForm<ReturnFormValues>({
    resolver: zodResolver(returnSchema),
    defaultValues: {
      orderNumber: '',
      requestType: 'return',
      reason: '',
      details: '',
      contactPhone: '',
    },
  })

  const onSubmit = async (data: ReturnFormValues) => {
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      // Burada gerçek API çağrısı yapılacak
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSuccess(true)
      form.reset()
    } catch {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mx-auto max-w-2xl">
        <h1 className="mb-8 text-3xl font-bold">İade ve Değişim</h1>

        <Card>
          <CardHeader>
            <CardTitle>İade/Değişim Talebi Oluştur</CardTitle>
            <CardDescription>
              Ürününüzü iade etmek veya değiştirmek için aşağıdaki formu doldurun.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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

                <FormField
                  control={form.control}
                  name="requestType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İşlem Türü</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="return" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              İade
                            </FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="exchange" />
                            </FormControl>
                            <FormLabel className="font-normal">
                              Değişim
                            </FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="reason"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İade/Değişim Nedeni</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="İade veya değişim nedeninizi kısaca açıklayın"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="details"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Detaylı Açıklama</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Ürünün durumu ve detaylı açıklamanız"
                          className="resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="contactPhone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>İletişim Telefonu</FormLabel>
                      <FormControl>
                        <Input placeholder="05XX XXX XX XX" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Talep Oluştur
                </Button>
              </form>
            </Form>

            {error && (
              <Alert variant="destructive" className="mt-4">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {success && (
              <Alert className="mt-4">
                <AlertDescription>
                  Talebiniz başarıyla oluşturuldu. En kısa sürede sizinle iletişime geçeceğiz.
                </AlertDescription>
              </Alert>
            )}

            <div className="mt-8 space-y-4 rounded-lg border p-4">
              <h3 className="font-semibold">İade ve Değişim Koşulları</h3>
              <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                <li>Ürünlerin iade/değişim süresi 14 gündür.</li>
                <li>Ürünler orijinal ambalajında ve kullanılmamış olmalıdır.</li>
                <li>Kargo ücreti iade/değişim durumunda müşteriye aittir.</li>
                <li>Değişim taleplerinde stok durumu kontrol edilir.</li>
                <li>İade/değişim onayı sonrası kargo bilgileri SMS ile iletilecektir.</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
} 