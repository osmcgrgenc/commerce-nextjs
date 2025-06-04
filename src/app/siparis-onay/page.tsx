'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

export default function OrderConfirmationPage() {
  const router = useRouter();

  useEffect(() => {
    // Sayfa yenilendiğinde ana sayfaya yönlendir
    const handleBeforeUnload = () => {
      router.push('/');
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [router]);

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl text-center">
        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Siparişiniz Alındı!
        </h1>
        <p className="mt-4 text-base text-gray-500">
          Siparişiniz başarıyla oluşturuldu. Sipariş detaylarınız e-posta adresinize
          gönderilecektir.
        </p>
        <div className="mt-8 space-y-4">
          <div className="rounded-lg bg-gray-50 p-6">
            <h2 className="text-lg font-medium text-gray-900">Sipariş Bilgileri</h2>
            <dl className="mt-4 space-y-4">
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Sipariş Numarası</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {Math.random().toString(36).substring(2, 10).toUpperCase()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Tarih</dt>
                <dd className="text-sm font-medium text-gray-900">
                  {new Date().toLocaleDateString('tr-TR')}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-sm text-gray-600">Ödeme Yöntemi</dt>
                <dd className="text-sm font-medium text-gray-900">Kredi Kartı</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
            <Link
              href="/"
              className="flex-1 rounded-md bg-indigo-600 px-4 py-3 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Alışverişe Devam Et
            </Link>
            <Link
              href="/hesabim/siparislerim"
              className="flex-1 rounded-md bg-white px-4 py-3 text-center text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
            >
              Siparişlerimi Görüntüle
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
