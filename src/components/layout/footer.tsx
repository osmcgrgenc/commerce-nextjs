import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react'

const navigation = {
  main: [
    { name: 'Anasayfa', href: '/' },
    { name: 'Kategoriler', href: '/kategoriler' },
    { name: 'Yeni Gelenler', href: '/yeni-gelenler' },
    { name: 'İndirimler', href: '/indirimler' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'İletişim', href: '/iletisim' },
  ],
  categories: [
    { name: 'Oturma Grupları', href: '/kategoriler/oturma-gruplari' },
    { name: 'Yatak Odası', href: '/kategoriler/yatak-odasi' },
    { name: 'Yemek Odası', href: '/kategoriler/yemek-odasi' },
    { name: 'Çalışma Odası', href: '/kategoriler/calisma-odasi' },
    { name: 'Bahçe Mobilyaları', href: '/kategoriler/bahce-mobilyalari' },
    { name: 'Ofis Mobilyaları', href: '/kategoriler/ofis-mobilyalari' },
  ],
  customer: [
    { name: 'Sipariş Takibi', href: '/siparis-takibi' },
    { name: 'İade ve Değişim', href: '/iade-degisim' },
    { name: 'Kargo ve Teslimat', href: '/kargo-teslimat' },
    { name: 'Ödeme Seçenekleri', href: '/odeme-secenekleri' },
    { name: 'Sıkça Sorulan Sorular', href: '/sss' },
    { name: 'Gizlilik Politikası', href: '/gizlilik-politikasi' },
  ],
  social: [
    {
      name: 'Facebook',
      href: 'https://facebook.com/limandesign',
      icon: Facebook,
    },
    {
      name: 'Instagram',
      href: 'https://instagram.com/limandesign',
      icon: Instagram,
    },
    {
      name: 'Twitter',
      href: 'https://twitter.com/limandesign',
      icon: Twitter,
    },
  ],
}

const contact = {
  address: 'Atatürk Mah. Liman Cad. No:123 İstanbul',
  phone: '+90 (212) 123 45 67',
  email: 'info@limandesign.com',
}

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
          {/* Logo ve İletişim */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center space-x-2">
              <Image
                src="/images/logo-white.png"
                alt="Liman Design"
                width={150}
                height={40}
                className="h-10 w-auto"
              />
            </Link>
            <p className="text-sm text-gray-300">
              Modern ve şık mobilyalar ile evinize değer katın.
            </p>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <MapPin className="h-5 w-5" />
                <span>{contact.address}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Phone className="h-5 w-5" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-300">
                <Mail className="h-5 w-5" />
                <span>{contact.email}</span>
              </div>
            </div>
          </div>

          {/* Kategoriler */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Kategoriler
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Müşteri Hizmetleri */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              Müşteri Hizmetleri
            </h3>
            <ul className="mt-4 space-y-2">
              {navigation.customer.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-sm text-gray-300 hover:text-white"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Bülten */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
              E-Bülten
            </h3>
            <p className="mt-4 text-sm text-gray-300">
              Yeni ürünler ve kampanyalardan haberdar olmak için bültenimize kayıt olun.
            </p>
            <form className="mt-4">
              <div className="flex">
                <input
                  type="email"
                  placeholder="E-posta adresiniz"
                  className="w-full rounded-l-md border-0 bg-gray-800 px-4 py-2 text-sm text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="submit"
                  className="rounded-r-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Kayıt Ol
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Alt Footer */}
        <div className="mt-12 border-t border-gray-800 pt-8">
          <div className="flex flex-col items-center justify-between space-y-4 sm:flex-row sm:space-y-0">
            <nav className="flex space-x-6">
              {navigation.main.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-sm text-gray-300 hover:text-white"
                >
                  {item.name}
                </Link>
              ))}
            </nav>
            <div className="flex space-x-6">
              {navigation.social.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-400 hover:text-white"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="h-6 w-6" aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
          <div className="mt-8 text-center text-sm text-gray-400">
            <p>
              &copy; {new Date().getFullYear()} Liman Design. Tüm hakları saklıdır.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
} 