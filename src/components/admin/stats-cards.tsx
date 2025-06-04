'use client';
import { useState, useEffect } from 'react';
import { getSalesStats, getCustomerStats } from '@/lib/nhost/queries';

type SalesStats = {
  totalOrders: number;
  totalRevenue: number;
  last30DaysOrders: number;
  last30DaysRevenue: number;
};

type CustomerStats = {
  totalCustomers: number;
  newCustomers: number;
};

export default function StatsCards() {
  const [salesStats, setSalesStats] = useState<SalesStats | null>(null);
  const [customerStats, setCustomerStats] = useState<CustomerStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    setError('');
    try {
      const [sales, customers] = await Promise.all([getSalesStats(), getCustomerStats()]);
      setSalesStats(sales);
      setCustomerStats(customers);
    } catch {
      setError('İstatistikler yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!salesStats || !customerStats) return null;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Toplam Satış</h3>
        <p className="mt-2 text-3xl font-bold text-indigo-600">
          ₺{salesStats.totalRevenue.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-gray-500">{salesStats.totalOrders} sipariş</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Son 30 Gün</h3>
        <p className="mt-2 text-3xl font-bold text-indigo-600">
          ₺{salesStats.last30DaysRevenue.toLocaleString()}
        </p>
        <p className="mt-1 text-sm text-gray-500">{salesStats.last30DaysOrders} sipariş</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Toplam Müşteri</h3>
        <p className="mt-2 text-3xl font-bold text-indigo-600">{customerStats.totalCustomers}</p>
        <p className="mt-1 text-sm text-gray-500">
          Son 30 günde {customerStats.newCustomers} yeni müşteri
        </p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-medium text-gray-900">Ortalama Sipariş</h3>
        <p className="mt-2 text-3xl font-bold text-indigo-600">
          ₺
          {salesStats.totalOrders > 0
            ? (salesStats.totalRevenue / salesStats.totalOrders).toFixed(2)
            : '0.00'}
        </p>
        <p className="mt-1 text-sm text-gray-500">Sipariş başına</p>
      </div>
    </div>
  );
}
