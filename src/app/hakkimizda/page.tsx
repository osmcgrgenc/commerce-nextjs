'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl lg:mx-0">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Hakkımızda
        </h1>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Modern tasarım ve kaliteli üretimin buluşma noktası
        </p>
      </div>

      <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-2">
        <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-gray-100">
          <Image
            src="/images/showroom.jpg"
            alt="Showroom"
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover object-center"
            priority
            quality={90}
          />
        </div>

        <div className="lg:pl-8">
          <h2 className="text-2xl font-bold tracking-tight text-gray-900">
            Vizyonumuz
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Liman Design olarak, modern yaşam alanları için özgün ve kaliteli
            mobilyalar tasarlıyor, üretiyor ve sunuyoruz. Müşterilerimizin
            yaşam alanlarını güzelleştirmek ve onlara en iyi deneyimi yaşatmak
            için çalışıyoruz.
          </p>

          <h2 className="mt-10 text-2xl font-bold tracking-tight text-gray-900">
            Misyonumuz
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Sürdürülebilir üretim anlayışıyla, çevreye duyarlı malzemeler
            kullanarak, modern tasarım anlayışını kaliteli işçilikle
            birleştiriyoruz. Müşterilerimizin beklentilerini aşmak ve onlara
            en iyi hizmeti sunmak için sürekli kendimizi geliştiriyoruz.
          </p>

          <div className="mt-10">
            <Button asChild>
              <a href="/iletisim">
                Bizimle İletişime Geçin
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Değerlerimiz
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Kaliteli Malzeme
            </h3>
            <p className="mt-2 text-base text-gray-600">
              En kaliteli malzemeleri kullanarak, uzun ömürlü ve dayanıklı
              ürünler üretiyoruz.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Güvenli Üretim
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Üretim süreçlerimizde en yüksek güvenlik standartlarını
              uyguluyoruz.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">
              Hızlı Teslimat
            </h3>
            <p className="mt-2 text-base text-gray-600">
              Siparişlerinizi en kısa sürede hazırlayıp, güvenli bir şekilde
              teslim ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
