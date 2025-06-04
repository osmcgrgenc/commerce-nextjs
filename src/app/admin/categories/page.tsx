import CategoryList from '../../../components/admin/category-list';

export default function CategoriesPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Kategori Yönetimi</h1>
      <CategoryList />
    </div>
  );
}
