import OrderList from "../../../components/admin/order-list";

export default function OrdersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Sipariş Yönetimi</h1>
      <OrderList />
    </div>
  );
} 