import PageForm from "../../../../../components/admin/page-form";

type Props = {
  params: {
    id: string;
  };
};

export default function EditPagePage({ params }: Props) {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Sayfa Düzenle</h1>
      <PageForm pageId={params.id} />
    </div>
  );
} 