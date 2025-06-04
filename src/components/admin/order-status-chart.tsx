'use client';
import { useState, useEffect } from 'react';
import { getOrderStatusStats } from '@/lib/nhost/queries';

type OrderStatusStats = Record<string, number>;

export default function OrderStatusChart() {
  const [stats, setStats] = useState<OrderStatusStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getOrderStatusStats();
      setStats(data);
    } catch {
      setError('Sipariş durumu istatistikleri yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return null;

  const total = Object.values(stats).reduce((sum, count) => sum + count, 0);

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Sipariş Durumları</h3>
      <div className="space-y-4">
        {Object.entries(stats).map(([status, count]) => {
          const percentage = ((count / total) * 100).toFixed(1);
          return (
            <div key={status}>
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium text-gray-700">{status}</span>
                <span className="text-gray-500">
                  {count} sipariş ({percentage}%)
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-indigo-600 h-2 rounded-full"
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
