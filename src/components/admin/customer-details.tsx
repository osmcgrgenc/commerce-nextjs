"use client";
import { useState, useEffect } from "react";
import { updateCustomer } from "@/lib/nhost/mutations";
import { getCustomers } from "@/lib/nhost/queries";
import { Customer } from "@/lib/nhost/types";

type Order = {
  id: string;
  total: number;
  status: string;
  created_at: string;
};

type CustomerDetails = Customer & {
  metadata: Record<string, unknown>;
  orders: Order[];
};

export default function CustomerDetails({ id }: { id: string }) {
  const [customer, setCustomer] = useState<CustomerDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    display_name: "",
    phone_number: "",
  });

  useEffect(() => {
    loadCustomerDetails();
  }, [id]);

  const loadCustomerDetails = async () => {
    setIsLoading(true);
    setError("");
    try {
      const customers = await getCustomers();
      const data = customers.find(c => c.id === id);
      if (data) {
        const customerDetails: CustomerDetails = {
          ...data,
          metadata: {},
          orders: []
        };
        setCustomer(customerDetails);
        setFormData({
          display_name: data.display_name || "",
          phone_number: data.phone_number || "",
        });
      }
    } catch {
      setError("Müşteri detayları yüklenemedi.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      await updateCustomer(id, {
        display_name: formData.display_name,
        phone_number: formData.phone_number,
      });
      setSuccess("Müşteri bilgileri güncellendi.");
      setIsEditing(false);
      await loadCustomerDetails();
    } catch {
      setError("Müşteri bilgileri güncellenemedi.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (isLoading) return <div>Yükleniyor...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!customer) return <div>Müşteri bulunamadı.</div>;

  return (
    <div className="space-y-6">
      {error && <div className="text-red-500">{error}</div>}
      {success && <div className="text-green-500">{success}</div>}

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Müşteri Bilgileri</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-indigo-600 hover:text-indigo-900"
          >
            {isEditing ? "İptal" : "Düzenle"}
          </button>
        </div>

        {isEditing ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Ad Soyad</label>
              <input
                type="text"
                name="display_name"
                value={formData.display_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Telefon</label>
              <input
                type="tel"
                name="phone_number"
                value={formData.phone_number}
                onChange={handleChange}
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
        ) : (
          <div className="space-y-4">
            <div>
              <span className="text-sm font-medium text-gray-500">E-posta</span>
              <p className="mt-1">{customer.email}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Ad Soyad</span>
              <p className="mt-1">{customer.display_name || "-"}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Telefon</span>
              <p className="mt-1">{customer.phone_number || "-"}</p>
            </div>
            <div>
              <span className="text-sm font-medium text-gray-500">Kayıt Tarihi</span>
              <p className="mt-1">{new Date(customer.created_at).toLocaleDateString()}</p>
            </div>
          </div>
        )}
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-xl font-semibold mb-4">Siparişler</h2>
        {customer.orders && customer.orders.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sipariş ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tarih
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Tutar
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Durum
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {customer.orders.map((order) => (
                  <tr key={order.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {new Date(order.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      ₺{order.total}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Henüz sipariş yok.</p>
        )}
      </div>
    </div>
  );
} 