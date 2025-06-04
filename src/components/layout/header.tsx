'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Menu, X, ShoppingCart, User, Heart, Search } from 'lucide-react';
import { useAuthenticationStatus } from '@nhost/react';

const navigation = [
  { name: 'Ana Sayfa', href: '/' },
  { name: 'Ürünler', href: '/urunler' },
  { name: 'Kategoriler', href: '/kategoriler' },
  { name: 'Blog', href: '/blog' },
  { name: 'Hakkımızda', href: '/hakkimizda' },
  { name: 'İletişim', href: '/iletisim' },
];

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <header className="bg-white">
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Liman Design</span>
            <div className="relative h-8 w-32">
              <Image
                src="/images/logo.png"
                alt="Liman Design"
                fill
                sizes="128px"
                className="object-contain"
                priority
                quality={100}
              />
            </div>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Menüyü aç</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map(item => (
            <Link
              key={item.name}
              href={item.href}
              className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            <Search className="h-6 w-6" />
          </button>
          <Link
            href="/favoriler"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            <Heart className="h-6 w-6" />
          </Link>
          <Link
            href="/sepet"
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            <ShoppingCart className="h-6 w-6" />
          </Link>
          <Link
            href={isAuthenticated ? '/hesabim' : '/auth/login'}
            className="text-sm font-semibold leading-6 text-gray-900 hover:text-gray-600"
          >
            <User className="h-6 w-6" />
          </Link>
        </div>
      </nav>
      <div className={`lg:hidden ${mobileMenuOpen ? 'fixed inset-0 z-50' : 'hidden'}`}>
        <div className="fixed inset-0 bg-gray-900/80" />
        <div className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          <div className="flex items-center justify-between">
            <Link href="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Liman Design</span>
              <div className="relative h-8 w-32">
                <Image
                  src="/images/logo.png"
                  alt="Liman Design"
                  fill
                  sizes="128px"
                  className="object-contain"
                  priority
                  quality={100}
                />
              </div>
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-700"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Menüyü kapat</span>
              <X className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/10">
              <div className="space-y-2 py-6">
                {navigation.map(item => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                <div className="flex items-center justify-between">
                  <Link
                    href="/favoriler"
                    className="text-base font-semibold leading-7 text-gray-900 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Heart className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/sepet"
                    className="text-base font-semibold leading-7 text-gray-900 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <ShoppingCart className="h-6 w-6" />
                  </Link>
                  <Link
                    href="/hesabim"
                    className="text-base font-semibold leading-7 text-gray-900 hover:text-gray-600"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <User className="h-6 w-6" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
