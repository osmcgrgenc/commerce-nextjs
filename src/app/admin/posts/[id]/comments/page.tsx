import CommentList from "@/components/admin/comment-list";

type Props = {
  params: {
    id: string;
  };
};

export default function PostCommentsPage({ params }: Props) {
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Blog Yazısı Yorumları</h1>
      <CommentList postId={params.id} />
    </div>
  );
} 