'use client';
import { useState, useEffect } from 'react';
import { getOrders } from '@/lib/nhost/queries';
import { updateOrderStatus } from '@/lib/nhost/mutations';
import { Order } from '@/lib/nhost/types';

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  const loadOrders = async () => {
    setIsLoading(true);
    setError('');
    try {
      const data = await getOrders();
      setOrders(data);
    } catch {
      setError('Siparişler yüklenemedi.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      await updateOrderStatus(id, newStatus);
      await loadOrders();
    } catch {
      alert('Sipariş durumu güncellenemedi.');
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!orders || orders.length === 0) return <div>Hiç sipariş yok.</div>;

  return (
    <ul className="divide-y divide-gray-200">
      {orders.map(order => (
        <li key={order.id} className="py-2 flex justify-between items-center">
          <div>
            <span className="font-semibold">Sipariş ID: {order.id}</span>
            <span className="ml-4">Müşteri ID: {order.customer_id}</span>
            <span className="ml-4">Toplam: ₺{order.total}</span>
            <span className="ml-4">Durum: {order.status}</span>
            <span className="ml-4">Tarih: {new Date(order.created_at).toLocaleDateString()}</span>
          </div>
          <select
            value={order.status}
            onChange={e => handleStatusChange(order.id, e.target.value)}
            className="border p-1 rounded"
          >
            <option value="Hazırlanıyor">Hazırlanıyor</option>
            <option value="Kargoda">Kargoda</option>
            <option value="Teslim Edildi">Teslim Edildi</option>
            <option value="İptal">İptal</option>
          </select>
        </li>
      ))}
    </ul>
  );
}
