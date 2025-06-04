'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { getPages } from '@/lib/nhost/queries';
import { deletePage } from '@/lib/nhost/mutations';
import { Page } from '@/lib/nhost/types';

export default function PageList() {
  const [pages, setPages] = useState<Page[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadPages();
  }, []);

  const loadPages = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getPages();
      setPages(data);
    } catch {
      setError('Sayfalar yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu sayfayı silmek istediğinizden emin misiniz?')) return;

    try {
      await deletePage(id);
      await loadPages();
    } catch {
      setError('Sayfa silinemedi.');
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Sayfalar</h3>
          <Link
            href="/admin/pages/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Yeni Sayfa
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {pages.map(page => (
          <div key={page.id} className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{page.title}</h4>
                <p className="text-sm text-gray-500">/{page.slug}</p>
                <p className="text-sm text-gray-500">
                  Durum: {page.status === 'published' ? 'Yayında' : 'Taslak'}
                </p>
                <p className="text-sm text-gray-500">
                  Son güncelleme: {new Date(page.updated_at).toLocaleDateString()}
                </p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/pages/${page.id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(page.id)}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-red-700 bg-red-100 hover:bg-red-200"
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
