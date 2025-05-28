import PostForm from "../../../../../components/admin/post-form";

type Props = {
  params: {
    id: string;
  };
};

export default function EditPostPage({ params }: Props) {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Blog Yazısı Düzenle</h1>
      <PostForm postId={params.id} />
    </div>
  );
} 