import Image from 'next/image'
import { Building2, Users, Award, Heart } from 'lucide-react'

const stats = [
  { id: 1, name: 'Yıllık Deneyim', value: '25+' },
  { id: 2, name: 'Mutlu Müşteri', value: '10.000+' },
  { id: 3, name: 'Tamamlanan Proje', value: '5.000+' },
  { id: 4, name: 'Çalışan Sayısı', value: '100+' },
]

const values = [
  {
    name: 'Kalite',
    description: 'En kaliteli malzemeler ve işçilik ile üretim yapıyoruz.',
    icon: Award,
  },
  {
    name: 'Müşteri Memnuniyeti',
    description: 'Müşterilerimizin memnuniyeti bizim için her şeyden önemli.',
    icon: Heart,
  },
  {
    name: 'Yenilikçilik',
    description: 'Sürekli kendimizi geliştiriyor ve yenilikleri takip ediyoruz.',
    icon: Building2,
  },
  {
    name: 'Güven',
    description: '25 yıllık tecrübemiz ile müşterilerimize güven veriyoruz.',
    icon: Users,
  },
]

export default function AboutPage() {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative isolate overflow-hidden bg-gradient-to-b from-indigo-100/20">
        <div className="mx-auto max-w-7xl pb-24 pt-10 sm:pb-32 lg:grid lg:grid-cols-2 lg:gap-x-8 lg:px-8 lg:py-40">
          <div className="px-6 lg:px-0 lg:pt-4">
            <div className="mx-auto max-w-2xl">
              <div className="max-w-lg">
                <h1 className="mt-10 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                  Hakkımızda
                </h1>
                <p className="mt-6 text-lg leading-8 text-gray-600">
                  25 yılı aşkın süredir mobilya sektöründe faaliyet gösteren firmamız, müşterilerimize en kaliteli ürünleri sunmaktadır.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-20 sm:mt-24 md:mx-auto md:max-w-2xl lg:mx-0 lg:mt-0 lg:w-screen">
            <div className="relative">
              <Image
                src="/images/about/hero.jpg"
                alt="Liman Design Showroom"
                width={1000}
                height={1000}
                className="rounded-md shadow-2xl ring-1 ring-gray-400/10"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:max-w-none">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Rakamlarla Biz
            </h2>
          </div>
          <dl className="mt-16 grid grid-cols-1 gap-0.5 overflow-hidden rounded-2xl text-center sm:grid-cols-2 lg:grid-cols-4">
            {stats.map((stat) => (
              <div key={stat.id} className="flex flex-col bg-gray-400/5 p-8">
                <dt className="text-sm font-semibold leading-6 text-gray-600">{stat.name}</dt>
                <dd className="order-first text-3xl font-semibold tracking-tight text-gray-900">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* Values Section */}
      <div className="mx-auto max-w-7xl px-6 lg:px-8 py-24 sm:py-32">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Değerlerimiz</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Firmamızın temel değerleri, müşterilerimize en iyi hizmeti sunmak için çalışmamızı sağlar.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.name} className="flex flex-col">
                <dt className="flex items-center gap-x-3 text-base font-semibold leading-7 text-gray-900">
                  <value.icon className="h-5 w-5 flex-none text-indigo-600" aria-hidden="true" />
                  {value.name}
                </dt>
                <dd className="mt-4 flex flex-auto flex-col text-base leading-7 text-gray-600">
                  <p className="flex-auto">{value.description}</p>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  )
} 