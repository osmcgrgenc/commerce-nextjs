"use client";
import { useState, useEffect } from "react";
import { getRecentOrders } from "@/lib/nhost/queries";
import { Order } from "@/lib/nhost/types";
import Link from "next/link";

export default function RecentOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    setIsLoading(true);
    setError("");
    try {
      const data = await getRecentOrders();
      setOrders(data);
    } catch {
      setError("Son siparişler yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!orders || orders.length === 0) return <div>Henüz sipariş yok.</div>;

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="px-6 py-4 border-b border-gray-200">
        <h3 className="text-lg font-medium text-gray-900">Son Siparişler</h3>
      </div>
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="px-6 py-4">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium text-gray-900">
                  {order.shipping_address.full_name}
                </p>
                <p className="text-sm text-gray-500">
                  {new Date(order.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">₺{order.total}</p>
                <p className="text-sm text-gray-500">{order.status}</p>
              </div>
            </div>
            <div className="mt-2">
              <Link
                href={`/admin/orders/${order.id}`}
                className="text-sm text-indigo-600 hover:text-indigo-900"
              >
                Detayları Görüntüle
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 