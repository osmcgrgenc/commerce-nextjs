'use client';
import { useState, useEffect } from 'react';
import { getSettings } from '@/lib/nhost/queries';
import { updateSettings } from '@/lib/nhost/mutations';
import { Settings } from '@/lib/nhost/types';

export default function SettingsForm() {
  const [settings, setSettings] = useState<Settings>({
    id: '',
    site_name: '',
    site_description: '',
    contact_email: '',
    contact_phone: '',
    theme: 'light',
    currency: 'TRY',
    tax_rate: 18,
    social_media: {
      facebook: '',
      twitter: '',
      instagram: '',
      linkedin: '',
    },
    seo: {
      meta_title: '',
      meta_description: '',
      keywords: '',
    },
    updated_at: '',
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getSettings();
      if (data) {
        setSettings(data);
      }
    } catch {
      setError('Ayarlar yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      await updateSettings(settings);
      setSuccess('Ayarlar başarıyla güncellendi.');
    } catch {
      setError('Ayarlar güncellenemedi.');
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: name === 'tax_rate' ? parseFloat(value) : value,
    }));
  };

  if (isLoading) return <div>Yükleniyor...</div>;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div>
        <label className="block text-sm font-medium text-gray-700">Site Adı</label>
        <input
          type="text"
          name="site_name"
          value={settings.site_name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Site Açıklaması</label>
        <textarea
          name="site_description"
          value={settings.site_description}
          onChange={handleChange}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">İletişim E-posta</label>
        <input
          type="email"
          name="contact_email"
          value={settings.contact_email}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">İletişim Telefon</label>
        <input
          type="tel"
          name="contact_phone"
          value={settings.contact_phone}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tema</label>
        <select
          name="theme"
          value={settings.theme}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="light">Açık</option>
          <option value="dark">Koyu</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Para Birimi</label>
        <select
          name="currency"
          value={settings.currency}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        >
          <option value="TRY">Türk Lirası (₺)</option>
          <option value="USD">Amerikan Doları ($)</option>
          <option value="EUR">Euro (€)</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">KDV Oranı (%)</label>
        <input
          type="number"
          name="tax_rate"
          value={settings.tax_rate}
          onChange={handleChange}
          min="0"
          max="100"
          step="1"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>

      <div>
        <button
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Kaydet
        </button>
      </div>
    </form>
  );
}
