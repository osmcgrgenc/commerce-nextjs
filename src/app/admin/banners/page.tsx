'use client';

import { useState } from 'react';
import { Plus, Pencil, Trash2, ArrowUp, ArrowDown } from 'lucide-react';
import { toast } from 'sonner';

interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
}

const initialBanners: Banner[] = [
  {
    id: 1,
    title: 'Modern ve Şık Mobilyalar',
    description: 'Evinizi güzelleştirmek için en kaliteli ve şık mobilyalar',
    image: '/images/hero.jpg',
    buttonText: 'Koleksiyonu Keşfet',
    buttonLink: '/kategoriler',
    isActive: true,
    order: 1,
  },
];

export default function BannersPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [editingBanner, setEditingBanner] = useState<Banner | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleAddBanner = () => {
    setEditingBanner(null);
    setIsModalOpen(true);
  };

  const handleEditBanner = (banner: Banner) => {
    setEditingBanner(banner);
    setIsModalOpen(true);
  };

  const handleDeleteBanner = (id: number) => {
    setBanners(banners.filter(banner => banner.id !== id));
    toast.success('Banner başarıyla silindi');
  };

  const handleMoveBanner = (id: number, direction: 'up' | 'down') => {
    const currentIndex = banners.findIndex(banner => banner.id === id);
    if (
      (direction === 'up' && currentIndex === 0) ||
      (direction === 'down' && currentIndex === banners.length - 1)
    ) {
      return;
    }

    const newIndex = direction === 'up' ? currentIndex - 1 : currentIndex + 1;
    const newBanners = [...banners];
    const temp = newBanners[currentIndex];
    newBanners[currentIndex] = newBanners[newIndex];
    newBanners[newIndex] = temp;

    setBanners(newBanners);
    toast.success('Banner sırası güncellendi');
  };

  const handleSaveBanner = (banner: Banner) => {
    if (editingBanner) {
      setBanners(banners.map(b => (b.id === banner.id ? { ...banner, order: b.order } : b)));
      toast.success('Banner başarıyla güncellendi');
    } else {
      setBanners([...banners, { ...banner, id: Date.now(), order: banners.length + 1 }]);
      toast.success('Banner başarıyla eklendi');
    }
    setIsModalOpen(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Banner Yönetimi</h1>
        <button
          onClick={handleAddBanner}
          className="flex items-center space-x-2 rounded-md bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          <Plus className="h-5 w-5" />
          <span>Yeni Banner Ekle</span>
        </button>
      </div>

      <div className="overflow-hidden rounded-lg border border-gray-200">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Sıra
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Görsel
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Başlık
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
                Durum
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-gray-500">
                İşlemler
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {banners.map(banner => (
              <tr key={banner.id}>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleMoveBanner(banner.id, 'up')}
                      className="text-gray-400 hover:text-gray-600"
                      disabled={banner.order === 1}
                    >
                      <ArrowUp className="h-4 w-4" />
                    </button>
                    <span className="text-sm text-gray-900">{banner.order}</span>
                    <button
                      onClick={() => handleMoveBanner(banner.id, 'down')}
                      className="text-gray-400 hover:text-gray-600"
                      disabled={banner.order === banners.length}
                    >
                      <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <img
                    src={banner.image}
                    alt={banner.title}
                    className="h-16 w-24 rounded object-cover"
                  />
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <div className="text-sm font-medium text-gray-900">{banner.title}</div>
                  <div className="text-sm text-gray-500">{banner.description}</div>
                </td>
                <td className="whitespace-nowrap px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2 text-xs font-semibold leading-5 ${
                      banner.isActive ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {banner.isActive ? 'Aktif' : 'Pasif'}
                  </span>
                </td>
                <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                  <div className="flex items-center justify-end space-x-2">
                    <button
                      onClick={() => handleEditBanner(banner)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Pencil className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <BannerModal
          banner={editingBanner}
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveBanner}
        />
      )}
    </div>
  );
}

interface BannerModalProps {
  banner: Banner | null;
  onClose: () => void;
  onSave: (banner: Banner) => void;
}

function BannerModal({ banner, onClose, onSave }: BannerModalProps) {
  const [formData, setFormData] = useState<Partial<Banner>>(
    banner || {
      title: '',
      description: '',
      image: '',
      buttonText: '',
      buttonLink: '',
      isActive: true,
    }
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData as Banner);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-2xl rounded-lg bg-white p-6">
        <h2 className="mb-4 text-xl font-bold">{banner ? 'Banner Düzenle' : 'Yeni Banner Ekle'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Başlık</label>
            <input
              type="text"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Açıklama</label>
            <textarea
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Görsel URL</label>
            <input
              type="text"
              value={formData.image}
              onChange={e => setFormData({ ...formData, image: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Buton Metni</label>
            <input
              type="text"
              value={formData.buttonText}
              onChange={e => setFormData({ ...formData, buttonText: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Buton Linki</label>
            <input
              type="text"
              value={formData.buttonLink}
              onChange={e => setFormData({ ...formData, buttonLink: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              required
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={e => setFormData({ ...formData, isActive: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <label className="ml-2 block text-sm text-gray-900">Aktif</label>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              İptal
            </button>
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Kaydet
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
