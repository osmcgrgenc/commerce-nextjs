import PostForm from "../../../../components/admin/post-form";

export default function NewPostPage() {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Yeni Blog Yazısı</h1>
      <PostForm />
    </div>
  );
} 