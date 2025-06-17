import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getCategories } from '@/lib/nhost/queries';
import CategoryForm from '@/components/admin/category-form';
import { Category } from '@/types';

type PageProps = {
  params: {
    id: string;
  };
  searchParams: Record<string, string | string[] | undefined>;
};

export const metadata: Metadata = {
  title: 'Kategori Düzenle',
  description: 'Kategori bilgilerini düzenleyin',
};

export default async function EditCategoryPage({ params }: PageProps) {
  const categories = await getCategories();
  const category = categories?.find((c: Category) => c.id === params.id);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-2xl font-bold mb-6">Kategori Düzenle</h1>
      <CategoryForm categoryId={params.id} />
    </div>
  );
}
