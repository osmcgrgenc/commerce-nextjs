'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import nhost from '@/lib/nhost/client';

const orderSchema = z.object({
  orderNumber: z.string().min(1, 'Sipariş numarası gereklidir'),
});

type OrderFormValues = z.infer<typeof orderSchema>;

interface OrderItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

interface OrderHistory {
  id: string;
  date: string;
  status: string;
  description: string;
}

interface Order {
  id: string;
  orderNumber: string;
  status: string;
  estimatedDelivery: string;
  trackingNumber: string;
  carrier: string;
  items: OrderItem[];
  history: OrderHistory[];
}

export default function OrderTrackingPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState<Order | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<OrderFormValues>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      orderNumber: '',
    },
  });

  const onSubmit = async (data: OrderFormValues) => {
    setIsLoading(true);
    setError(null);
    setOrder(null);

    try {
      const { data: orderData, error: orderError } = await nhost.graphql.request<{
        orders: Order[];
      }>(
        `
        query GetOrder($orderNumber: String!) {
          orders(where: {order_number: {_eq: $orderNumber}}) {
            id
            order_number
            status
            estimated_delivery
            tracking_number
            carrier
            items {
              id
              name
              quantity
              price
            }
            history {
              id
              date
              status
              description
            }
          }
        }
      `,
        { orderNumber: data.orderNumber }
      );

      if (orderError) throw orderError;
      if (!orderData.orders[0]) {
        setError('Sipariş bulunamadı. Lütfen sipariş numaranızı kontrol edin.');
        return;
      }

      const order = orderData.orders[0];
      setOrder({
        id: order.id,
        orderNumber: order.order_number,
        status: order.status,
        estimatedDelivery: order.estimated_delivery,
        trackingNumber: order.tracking_number,
        carrier: order.carrier,
        items: order.items,
        history: order.history,
      });
    } catch (err) {
      setError('Bir hata oluştu. Lütfen daha sonra tekrar deneyin.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-2xl py-16 sm:py-24">
        <div className="text-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Sipariş Takibi
          </h1>
          <p className="mt-4 text-base text-gray-500">
            Siparişinizin durumunu öğrenmek için sipariş numaranızı girin.
          </p>
        </div>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-10">
          <div className="sm:flex sm:items-center">
            <div className="w-full sm:max-w-xs">
              <label htmlFor="orderNumber" className="sr-only">
                Sipariş Numarası
              </label>
              <input
                type="text"
                id="orderNumber"
                {...form.register('orderNumber')}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Sipariş numaranızı girin"
              />
              {form.formState.errors.orderNumber && (
                <p className="mt-2 text-sm text-red-600">
                  {form.formState.errors.orderNumber.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="mt-3 inline-flex w-full items-center justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 sm:ml-3 sm:mt-0 sm:w-auto"
            >
              {isLoading ? 'Aranıyor...' : 'Siparişi Bul'}
            </button>
          </div>
        </form>

        {error && (
          <div className="mt-6 rounded-md bg-red-50 p-4">
            <div className="flex">
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">{error}</h3>
              </div>
            </div>
          </div>
        )}

        {order && (
          <div className="mt-10">
            <div className="overflow-hidden bg-white shadow sm:rounded-lg">
              <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg font-medium leading-6 text-gray-900">
                  Sipariş #{order.orderNumber}
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">Durum: {order.status}</p>
              </div>
              <div className="border-t border-gray-200">
                <dl>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Tahmini Teslimat</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {new Date(order.estimatedDelivery).toLocaleDateString('tr-TR')}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Kargo Takip No</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {order.trackingNumber}
                    </dd>
                  </div>
                  <div className="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Kargo Firması</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      {order.carrier}
                    </dd>
                  </div>
                  <div className="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                    <dt className="text-sm font-medium text-gray-500">Sipariş Özeti</dt>
                    <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                      <ul className="divide-y divide-gray-200 rounded-md border border-gray-200">
                        {order.items.map(item => (
                          <li
                            key={item.id}
                            className="flex items-center justify-between py-3 pl-3 pr-4 text-sm"
                          >
                            <div className="flex w-0 flex-1 items-center">
                              <span className="ml-2 w-0 flex-1 truncate">{item.name}</span>
                            </div>
                            <div className="ml-4 flex-shrink-0">
                              <span className="font-medium text-gray-900">
                                {item.quantity} x {item.price} TL
                              </span>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-medium leading-6 text-gray-900">Sipariş Geçmişi</h3>
              <div className="mt-4 flow-root">
                <ul className="-mb-8">
                  {order.history.map((event, eventIdx) => (
                    <li key={event.id}>
                      <div className="relative pb-8">
                        {eventIdx !== order.history.length - 1 ? (
                          <span
                            className="absolute left-4 top-4 -ml-px h-full w-0.5 bg-gray-200"
                            aria-hidden="true"
                          />
                        ) : null}
                        <div className="relative flex space-x-3">
                          <div>
                            <span className="h-8 w-8 rounded-full bg-gray-400 flex items-center justify-center ring-8 ring-white">
                              <svg
                                className="h-5 w-5 text-white"
                                viewBox="0 0 20 20"
                                fill="currentColor"
                                aria-hidden="true"
                              >
                                <path
                                  fillRule="evenodd"
                                  d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                                  clipRule="evenodd"
                                />
                              </svg>
                            </span>
                          </div>
                          <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                            <div>
                              <p className="text-sm text-gray-500">
                                {event.status}{' '}
                                <span className="font-medium text-gray-900">
                                  {event.description}
                                </span>
                              </p>
                            </div>
                            <div className="whitespace-nowrap text-right text-sm text-gray-500">
                              <time dateTime={event.date}>
                                {new Date(event.date).toLocaleDateString('tr-TR')}
                              </time>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
