'use client'

import { useState } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ChevronDown, ChevronUp } from 'lucide-react'

const faqCategories = {
  'siparis': {
    title: 'Sipariş ve Teslimat',
    icon: '📦',
    questions: [
      {
        question: 'Siparişim ne zaman teslim edilecek?',
        answer: 'Siparişleriniz genellikle 1-3 iş günü içinde hazırlanıp kargoya verilir. Teslimat süresi seçtiğiniz kargo firmasına ve bölgenize göre değişiklik gösterir. Detaylı bilgi için "Kargo ve Teslimat" sayfamızı inceleyebilirsiniz.',
      },
      {
        question: 'Siparişimi nasıl takip edebilirim?',
        answer: 'Siparişinizi "Sipariş Takibi" sayfasından takip edebilirsiniz. Sipariş numaranızı girerek güncel durumu görüntüleyebilirsiniz.',
      },
      {
        question: 'Siparişimi iptal edebilir miyim?',
        answer: 'Siparişiniz kargoya verilmeden önce iptal edebilirsiniz. İptal işlemi için müşteri hizmetlerimizle iletişime geçebilirsiniz.',
      },
    ],
  },
  'odeme': {
    title: 'Ödeme ve Fiyatlandırma',
    icon: '💳',
    questions: [
      {
        question: 'Hangi ödeme yöntemlerini kullanabilirim?',
        answer: 'Kredi kartı, havale/EFT ve kapıda ödeme seçeneklerini kullanabilirsiniz. Detaylı bilgi için "Ödeme Seçenekleri" sayfamızı inceleyebilirsiniz.',
      },
      {
        question: 'Taksit seçenekleri nelerdir?',
        answer: 'Kredi kartı ile yapılan ödemelerde 12 taksit seçeneği sunulmaktadır. Taksit seçenekleri bankanıza göre değişiklik gösterebilir.',
      },
      {
        question: 'Fiyatlara KDV dahil mi?',
        answer: 'Evet, tüm fiyatlarımıza KDV dahildir. Sepetinizde görünen toplam tutar, ödemeniz gereken son tutardır.',
      },
    ],
  },
  'iade': {
    title: 'İade ve Değişim',
    icon: '🔄',
    questions: [
      {
        question: 'İade/değişim süresi nedir?',
        answer: 'Ürünlerin iade/değişim süresi 14 gündür. Bu süre içinde ürünü iade edebilir veya değiştirebilirsiniz.',
      },
      {
        question: 'İade/değişim koşulları nelerdir?',
        answer: 'Ürünler orijinal ambalajında ve kullanılmamış olmalıdır. Kargo ücreti iade/değişim durumunda müşteriye aittir.',
      },
      {
        question: 'İade/değişim sürecini nasıl başlatabilirim?',
        answer: '"İade ve Değişim" sayfamızdan talep oluşturabilirsiniz. Talebiniz onaylandıktan sonra size kargo bilgileri iletilecektir.',
      },
    ],
  },
  'urun': {
    title: 'Ürün Bilgileri',
    icon: '🛋️',
    questions: [
      {
        question: 'Ürünleriniz garantili mi?',
        answer: 'Evet, tüm ürünlerimiz 2 yıl garantilidir. Garanti kapsamı ürün kategorisine göre değişiklik gösterebilir.',
      },
      {
        question: 'Ürün montajı yapılıyor mu?',
        answer: 'Evet, ürünlerin montajı profesyonel ekibimiz tarafından yapılmaktadır. Montaj ücreti ürün fiyatına dahildir.',
      },
      {
        question: 'Ürün ölçülerini nereden öğrenebilirim?',
        answer: 'Ürün detay sayfalarında tüm ölçü bilgileri yer almaktadır. Ayrıca ürün fotoğraflarında ölçü şemaları da bulunmaktadır.',
      },
    ],
  },
}

export default function FAQPage() {
  const [openQuestions, setOpenQuestions] = useState<Record<string, boolean>>({})

  const toggleQuestion = (category: string, index: number) => {
    const key = `${category}-${index}`
    setOpenQuestions((prev) => ({
      ...prev,
      [key]: !prev[key],
    }))
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Sıkça Sorulan Sorular</h1>

      <Tabs defaultValue="siparis" className="w-full">
        <TabsList className="mb-8 grid w-full grid-cols-2 md:grid-cols-4">
          {Object.entries(faqCategories).map(([key, category]) => (
            <TabsTrigger key={key} value={key} className="flex items-center gap-2">
              <span>{category.icon}</span>
              {category.title}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(faqCategories).map(([key, category]) => (
          <TabsContent key={key} value={key}>
            <Card>
              <CardHeader>
                <CardTitle>{category.title}</CardTitle>
                <CardDescription>
                  {category.title} ile ilgili sıkça sorulan sorular
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {category.questions.map((item, index) => {
                    const isOpen = openQuestions[`${key}-${index}`]
                    return (
                      <div
                        key={index}
                        className="rounded-lg border p-4"
                      >
                        <button
                          onClick={() => toggleQuestion(key, index)}
                          className="flex w-full items-center justify-between text-left"
                        >
                          <span className="font-medium">{item.question}</span>
                          {isOpen ? (
                            <ChevronUp className="h-5 w-5" />
                          ) : (
                            <ChevronDown className="h-5 w-5" />
                          )}
                        </button>
                        {isOpen && (
                          <p className="mt-4 text-sm text-gray-600">
                            {item.answer}
                          </p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Başka Sorunuz mu Var?</CardTitle>
          <CardDescription>
            Aradığınız cevabı bulamadıysanız bizimle iletişime geçebilirsiniz
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600">
            <p>• Müşteri Hizmetleri: 0850 123 45 67</p>
            <p>• E-posta: info@limandesign.com</p>
            <p>• Çalışma Saatleri: Hafta içi 09:00 - 18:00</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 