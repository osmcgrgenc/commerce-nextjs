import TagForm from '../../../../components/admin/tag-form';

export default function NewTagPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Yeni Etiket</h1>
      <TagForm tagId={''} />
    </div>
  );
}
