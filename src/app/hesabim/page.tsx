'use client';

import { useAuthenticationStatus, useUserData } from '@nhost/nextjs';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { User, Package, Heart, MapPin, LogOut } from 'lucide-react';

const navigation = [
  { name: 'Profil Bilgileri', href: '/hesabim/profil', icon: User },
  { name: 'Siparişlerim', href: '/hesabim/siparislerim', icon: Package },
  { name: 'Favorilerim', href: '/hesabim/favorilerim', icon: Heart },
  { name: 'Adreslerim', href: '/hesabim/adreslerim', icon: MapPin },
];

export default function AccountPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = useUserData();

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">Yükleniyor...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="overflow-hidden rounded-lg bg-white shadow">
          <div className="px-4 py-5 sm:p-6">
            <div className="sm:flex sm:items-center sm:justify-between">
              <div>
                <h3 className="text-2xl font-bold leading-6 text-gray-900">Hesabım</h3>
                <p className="mt-1 text-sm text-gray-500">{user?.email}</p>
              </div>
              <div className="mt-4 sm:mt-0">
                <button
                  type="button"
                  onClick={() => {
                    // Çıkış işlemi
                  }}
                  className="inline-flex items-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Çıkış Yap
                </button>
              </div>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
              {navigation.map(item => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="relative flex items-center space-x-3 rounded-lg border border-gray-300 bg-white px-6 py-5 shadow-sm hover:border-gray-400"
                >
                  <div className="flex-shrink-0">
                    <item.icon className="h-6 w-6 text-gray-400" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <span className="absolute inset-0" aria-hidden="true" />
                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
