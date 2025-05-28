import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreditCard, Lock, Shield, AlertCircle, Banknote, Wallet } from 'lucide-react'

const paymentMethods = [
  {
    title: 'Kredi Kartı',
    description: 'Tüm kredi kartlarına 12 taksit imkanı',
    icon: <CreditCard className="h-6 w-6" />,
    features: [
      'Visa, Mastercard, American Express',
      '12 taksit seçeneği',
      '256-bit SSL güvenlik',
      'Anlık onay',
    ],
  },
  {
    title: 'Havale/EFT',
    description: 'Banka hesabımıza havale yapabilirsiniz',
    icon: <Banknote className="h-6 w-6" />,
    features: [
      'Tüm bankalardan havale imkanı',
      'Anlık bildirim',
      'Hızlı onay süreci',
      'Komisyonsuz işlem',
    ],
  },
  {
    title: 'Kapıda Ödeme',
    description: 'Teslimat sırasında nakit veya kredi kartı ile ödeme',
    icon: <Wallet className="h-6 w-6" />,
    features: [
      'Nakit ödeme seçeneği',
      'Kredi kartı ile ödeme',
      '15 TL ek ücret',
      'Sadece standart teslimat',
    ],
  },
]

const securityInfo = [
  {
    title: '256-bit SSL Güvenlik',
    description: 'Tüm ödeme işlemleriniz SSL sertifikası ile şifrelenir.',
    icon: <Lock className="h-5 w-5" />,
  },
  {
    title: '3D Secure',
    description: 'Kredi kartı ödemeleriniz 3D Secure ile güvence altındadır.',
    icon: <Shield className="h-5 w-5" />,
  },
  {
    title: 'KVKK Uyumlu',
    description: 'Kişisel verileriniz KVKK kapsamında korunmaktadır.',
    icon: <AlertCircle className="h-5 w-5" />,
  },
]

export default function PaymentOptionsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Ödeme Seçenekleri</h1>

      <div className="grid gap-8 md:grid-cols-3">
        {paymentMethods.map((method) => (
          <Card key={method.title}>
            <CardHeader>
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-primary/10 p-2">
                  {method.icon}
                </div>
                <div>
                  <CardTitle>{method.title}</CardTitle>
                  <CardDescription>{method.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {method.features.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2 text-sm">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {feature}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ödeme Güvenliği</CardTitle>
          <CardDescription>
            Ödeme işlemleriniz en üst düzey güvenlik standartlarıyla korunmaktadır
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-3">
            {securityInfo.map((info) => (
              <div
                key={info.title}
                className="flex items-start gap-3 rounded-lg border p-4"
              >
                <div className="rounded-full bg-primary/10 p-2">
                  {info.icon}
                </div>
                <div>
                  <h3 className="font-semibold">{info.title}</h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {info.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Ödeme İşlemleri Hakkında</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm text-gray-600">
            <p>
              • Tüm kredi kartı bilgileriniz 256-bit SSL sertifikası ile şifrelenerek işlenir.
            </p>
            <p>
              • Kredi kartı bilgileriniz sistemimizde saklanmaz.
            </p>
            <p>
              • Havale/EFT sonrası ödemeniz 1-2 saat içinde onaylanır.
            </p>
            <p>
              • Kapıda ödeme seçeneği sadece standart teslimat için geçerlidir.
            </p>
            <p>
              • Taksit seçenekleri bankanıza göre değişiklik gösterebilir.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
} 