'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingCart, Heart, User, Search } from 'lucide-react';
import { useAuthenticationStatus } from '@nhost/react';

const navigation = [
  { name: 'Anasayfa', href: '/' },
  { name: 'Kategoriler', href: '/categories' },
  { name: 'Yeni Gelenler', href: '/new-arrivals' },
  { name: 'İndirimler', href: '/discounts' },
  { name: 'Hakkımızda', href: '/about' },
  { name: 'İletişim', href: '/contact' },
];

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated } = useAuthenticationStatus();

  return (
    <header className="bg-white shadow-sm">
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8" aria-label="Top">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-indigo-600">
              Liman Design
            </Link>
            <div className="ml-10 hidden space-x-8 lg:block">
              {navigation.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-base font-medium ${
                    pathname === link.href
                      ? 'text-indigo-600'
                      : 'text-gray-500 hover:text-gray-900'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button
              type="button"
              className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Ara</span>
              <Search className="h-6 w-6" aria-hidden="true" />
            </button>
            <Link
              href="/favorites"
              className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Favoriler</span>
              <Heart className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href="/cart"
              className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Sepet</span>
              <ShoppingCart className="h-6 w-6" aria-hidden="true" />
            </Link>
            <Link
              href={isAuthenticated ? '/account' : '/auth/login'}
              className="rounded-full bg-white p-2 text-gray-400 hover:text-gray-500"
            >
              <span className="sr-only">Hesabım</span>
              <User className="h-6 w-6" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
} 