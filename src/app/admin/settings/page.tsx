import SettingsForm from '../../../components/admin/settings-form';

export default function SettingsPage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Site Ayarları</h1>
      <div className="bg-white p-6 rounded-lg shadow">
        <SettingsForm />
      </div>
    </div>
  );
}
