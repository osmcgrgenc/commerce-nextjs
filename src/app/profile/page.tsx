'use client';

import { useState } from 'react';
import { useAuthenticationStatus, useUserData, useUpdateUserData } from '@nhost/nextjs';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function ProfilePage() {
  const { isAuthenticated, isLoading } = useAuthenticationStatus();
  const user = useUserData();
  const { updateUserData, isLoading: isUpdating } = useUpdateUserData();
  const router = useRouter();

  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [avatarUrl, setAvatarUrl] = useState(user?.avatarUrl || '');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    router.push('/auth/login');
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { error } = await updateUserData({
        displayName: user?.displayName,
        avatarUrl: user?.avatarUrl
      });

      if (error) {
        toast.error('Profil güncellenirken bir hata oluştu');
        return;
      }

      toast.success('Profil başarıyla güncellendi');
      router.push('/profile');
    } catch {
      toast.error('Bir hata oluştu');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white shadow sm:rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">Profil Bilgileri</h3>
            <div className="mt-2 max-w-xl text-sm text-gray-500">
              <p>Hesap bilgilerinizi buradan güncelleyebilirsiniz.</p>
            </div>
            <form onSubmit={handleSubmit} className="mt-5 space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  E-posta
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    name="email"
                    id="email"
                    disabled
                    value={user?.email || ''}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md bg-gray-50"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="displayName" className="block text-sm font-medium text-gray-700">
                  Görünen Ad
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    name="displayName"
                    id="displayName"
                    value={displayName}
                    onChange={e => setDisplayName(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="avatarUrl" className="block text-sm font-medium text-gray-700">
                  Profil Fotoğrafı URL
                </label>
                <div className="mt-1">
                  <input
                    type="url"
                    name="avatarUrl"
                    id="avatarUrl"
                    value={avatarUrl}
                    onChange={e => setAvatarUrl(e.target.value)}
                    className="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isUpdating}
                  className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  {isUpdating ? 'Güncelleniyor...' : 'Güncelle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
