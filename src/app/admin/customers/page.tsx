import CustomerList from '../../../components/admin/customer-list';

export default function CustomersPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Müşteri Yönetimi</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <CustomerList />
      </div>
    </div>
  );
}
