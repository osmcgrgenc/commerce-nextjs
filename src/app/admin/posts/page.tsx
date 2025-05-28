import PostList from "@/components/admin/post-list";
import { getPosts } from "@/lib/nhost/queries";

export default async function PostsPage() {
  const posts = await getPosts();
  return (
    <div className="p-4 space-y-6">
      <h1 className="text-2xl font-bold">Blog Yönetimi</h1>
      <PostList posts={posts} />
    </div>
  );
} 