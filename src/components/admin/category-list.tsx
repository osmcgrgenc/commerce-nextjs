'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { deleteCategory } from '@/lib/nhost/mutations';
import { getCategories } from '@/lib/nhost/queries';

type Category = {
  id: string;
  name: string;
  slug: string;
};

export default function CategoryList() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadCategories();
  }, []);

  const loadCategories = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getCategories();
      setCategories(data);
    } catch {
      setError('Kategoriler yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz?')) return;

    try {
      await deleteCategory(id);
      await loadCategories();
    } catch {
      setError('Kategori silinemedi.');
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Kategoriler</h3>
          <Link
            href="/admin/categories/new"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
          >
            Yeni Kategori
          </Link>
        </div>
      </div>
      <div className="divide-y divide-gray-200">
        {categories.map(category => (
          <div key={category.id} className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <h4 className="text-lg font-medium text-gray-900">{category.name}</h4>
                <p className="text-sm text-gray-500">/{category.slug}</p>
              </div>
              <div className="flex space-x-2">
                <Link
                  href={`/admin/categories/${category.id}/edit`}
                  className="inline-flex items-center px-3 py-1.5 border border-transparent text-sm font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200"
                >
                  Düzenle
                </Link>
                <button
                  onClick={() => handleDelete(category.id)}
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
