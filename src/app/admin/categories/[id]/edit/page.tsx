import CategoryForm from "../../../../../components/admin/category-form";

type Props = {
  params: {
    id: string;
  };
};

export default function EditCategoryPage({ params }: Props) {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Kategori Düzenle</h1>
      <CategoryForm categoryId={params.id} />
    </div>
  );
} 