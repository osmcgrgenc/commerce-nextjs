import StatsCards from "../../components/admin/stats-cards";
import OrderStatusChart from "../../components/admin/order-status-chart";
import RecentOrders from "../../components/admin/recent-orders";

export default function DashboardPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      
      <StatsCards />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <OrderStatusChart />
        <RecentOrders />
      </div>
    </div>
  );
} 