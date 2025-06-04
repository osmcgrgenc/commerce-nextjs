import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Truck, Clock, MapPin, Package, AlertCircle } from 'lucide-react';

const deliveryInfo = {
  standard: {
    title: 'Standart Teslimat',
    description: '3-5 iş günü içinde teslimat',
    price: 'Ücretsiz',
    minOrder: '500 TL ve üzeri siparişlerde',
    icon: <Truck className="h-6 w-6" />,
  },
  express: {
    title: 'Hızlı Teslimat',
    description: '1-2 iş günü içinde teslimat',
    price: '49.90 TL',
    minOrder: 'Tüm siparişlerde',
    icon: <Clock className="h-6 w-6" />,
  },
};

const carriers = [
  {
    name: 'Yurtiçi Kargo',
    description: "Türkiye'nin her yerine teslimat",
    trackingUrl: 'https://www.yurticikargo.com',
  },
  {
    name: 'Aras Kargo',
    description: 'Hızlı ve güvenilir teslimat',
    trackingUrl: 'https://www.araskargo.com.tr',
  },
  {
    name: 'MNG Kargo',
    description: 'Geniş şube ağı ile teslimat',
    trackingUrl: 'https://www.mngkargo.com.tr',
  },
];

const deliveryAreas = [
  {
    region: 'İstanbul',
    deliveryTime: '1-2 iş günü',
    description: 'Tüm ilçelere teslimat',
  },
  {
    region: 'Ankara, İzmir',
    deliveryTime: '2-3 iş günü',
    description: 'Merkez ilçelere teslimat',
  },
  {
    region: 'Diğer İller',
    deliveryTime: '3-5 iş günü',
    description: 'İl merkezlerine teslimat',
  },
];

export default function ShippingDeliveryPage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Kargo ve Teslimat</h1>

      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Teslimat Seçenekleri</CardTitle>
            <CardDescription>Size en uygun teslimat seçeneğini seçin</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {Object.entries(deliveryInfo).map(([key, info]) => (
                <div key={key} className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="rounded-full bg-primary/10 p-2">{info.icon}</div>
                  <div>
                    <h3 className="font-semibold">{info.title}</h3>
                    <p className="text-sm text-gray-600">{info.description}</p>
                    <div className="mt-2 flex items-center gap-2 text-sm">
                      <span className="font-medium">{info.price}</span>
                      <span className="text-gray-500">•</span>
                      <span className="text-gray-600">{info.minOrder}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kargo Firmaları</CardTitle>
            <CardDescription>Anlaşmalı kargo firmalarımız</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {carriers.map(carrier => (
                <div
                  key={carrier.name}
                  className="flex items-center justify-between rounded-lg border p-4"
                >
                  <div>
                    <h3 className="font-semibold">{carrier.name}</h3>
                    <p className="text-sm text-gray-600">{carrier.description}</p>
                  </div>
                  <a
                    href={carrier.trackingUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    Takip Et
                  </a>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Teslimat Bölgeleri</CardTitle>
          <CardDescription>Bölgelere göre teslimat süreleri</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {deliveryAreas.map(area => (
              <div key={area.region} className="rounded-lg border p-4">
                <div className="mb-2 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="font-semibold">{area.region}</h3>
                </div>
                <p className="text-sm text-gray-600">{area.description}</p>
                <p className="mt-2 text-sm font-medium text-primary">{area.deliveryTime}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Önemli Bilgiler</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Package className="mt-1 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Paketleme</h3>
                <p className="text-sm text-gray-600">
                  Tüm ürünlerimiz özel ambalajlarla paketlenir ve kargo firmasına teslim edilir.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <AlertCircle className="mt-1 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Teslimat Kontrolü</h3>
                <p className="text-sm text-gray-600">
                  Ürünlerinizi teslim alırken kargo firması yetkilisi yanınızdayken kontrol etmenizi
                  öneririz.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Truck className="mt-1 h-5 w-5 text-primary" />
              <div>
                <h3 className="font-semibold">Kargo Takibi</h3>
                <p className="text-sm text-gray-600">
                  Siparişinizin durumunu &quot;Sipariş Takibi&quot; sayfasından takip edebilirsiniz.
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
