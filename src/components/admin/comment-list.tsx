'use client';
import { useState } from 'react';
import { getComments } from '@/lib/nhost/queries';
import { updateCommentStatus, deleteComment } from '@/lib/nhost/mutations';
import { Comment } from '@/lib/nhost/types';

type CommentListProps = {
  postId: string;
};

export default function CommentList({ postId }: CommentListProps) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);

  const loadComments = async () => {
    try {
      const data = await getComments(postId);
      setComments(data);
    } catch (error) {
      console.error('Yorumlar yüklenirken hata oluştu:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, status: 'pending' | 'approved' | 'rejected') => {
    setIsUpdating(id);
    try {
      await updateCommentStatus(id, status);
      await loadComments();
    } catch (error) {
      console.error('Yorum durumu güncellenirken hata oluştu:', error);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu yorumu silmek istediğinizden emin misiniz?')) return;

    setIsDeleting(id);
    try {
      await deleteComment(id);
      await loadComments();
    } catch (error) {
      console.error('Yorum silinirken hata oluştu:', error);
    } finally {
      setIsDeleting(null);
    }
  };

  if (isLoading) {
    return <div>Yükleniyor...</div>;
  }

  return (
    <div className="space-y-4">
      {comments.map(comment => (
        <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-500">
                {comment.user?.display_name || 'Anonim'} -{' '}
                {new Date(comment.created_at).toLocaleDateString('tr-TR')}
              </p>
              <p className="mt-2">{comment.content}</p>
            </div>
            <div className="flex space-x-2">
              <select
                value={comment.status}
                onChange={e =>
                  handleStatusChange(
                    comment.id,
                    e.target.value as 'pending' | 'approved' | 'rejected'
                  )
                }
                disabled={isUpdating === comment.id}
                className="text-sm rounded-md border-gray-300"
              >
                <option value="pending">Beklemede</option>
                <option value="approved">Onaylandı</option>
                <option value="rejected">Reddedildi</option>
              </select>
              <button
                onClick={() => handleDelete(comment.id)}
                disabled={isDeleting === comment.id}
                className="text-red-600 hover:text-red-900"
              >
                {isDeleting === comment.id ? 'Siliniyor...' : 'Sil'}
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
