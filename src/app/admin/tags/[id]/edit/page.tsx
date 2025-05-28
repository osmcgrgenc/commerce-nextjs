import TagForm from "@/components/admin/tag-form";

type Props = {
  params: {
    id: string;
  };
};

export default function EditTagPage({ params }: Props) {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Etiket Düzenle</h1>
      <TagForm tagId={params.id} />
    </div>
  );
} 