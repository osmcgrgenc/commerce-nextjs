import CustomerDetails from '../../../../components/admin/customer-details';

export default function CustomerDetailsPage({ params }: { params: { id: string } }) {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Müşteri Detayları</h1>
      <CustomerDetails id={params.id} />
    </div>
  );
}
