import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPostById } from '../../api/postApi';
import type { Post } from '../../types/post';

function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError('ID bài viết không hợp lệ');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const postId = parseInt(id, 10);
        const data = await getPostById(postId);

        if (!data) {
          setError('Không tìm thấy bài viết');
        } else {
          setPost(data);
        }
      } catch (err) {
        console.error('Failed to fetch post:', err);
        setError('Không thể tải bài viết. Vui lòng thử lại sau.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải bài viết...</p>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 py-12">
          <button
            onClick={() => navigate('/')}
            className="mb-6 text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Quay lại
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <p className="text-red-700">{error || 'Không tìm thấy bài viết'}</p>
          </div>
        </div>
      </div>
    );
  }

  const formattedDate = new Date(post.createdAt).toLocaleDateString('vi-VN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="mb-6 text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-2"
        >
          ← Quay lại
        </button>

        {/* Post Card */}
        <article className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Featured Image */}
          {post.imageUrl && (
            <div className="relative h-96 overflow-hidden bg-gray-200">
              <img
                src={post.imageUrl}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}

          {/* Post Content */}
          <div className="p-8">
            {/* Title */}
            <h1 className="text-4xl font-bold text-gray-800 mb-4">{post.title}</h1>

            {/* Meta Information */}
            <div className="flex items-center gap-4 pb-6 border-b border-gray-200 mb-8">
              <div>
                <p className="font-semibold text-gray-800">{post.author?.username || 'Anonymous'}</p>
                <p className="text-sm text-gray-500">{post.author?.email}</p>
              </div>
              <div className="ml-auto text-right">
                <time className="text-gray-600 text-sm">{formattedDate}</time>
              </div>
            </div>

            {/* Main Content */}
            <div className="prose prose-lg max-w-none mb-8">
              <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
                {post.content}
              </div>
            </div>

            {/* Comments Section */}
            {post.comments && post.comments.length > 0 && (
              <div className="border-t border-gray-200 pt-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">
                  💬 Bình luận ({post.comments.length})
                </h2>
                <div className="space-y-6">
                  {post.comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-start gap-4">
                        <div className="flex-1">
                          <p className="font-semibold text-gray-800">
                            {comment.author?.username || 'Anonymous'}
                          </p>
                          <p className="text-sm text-gray-500 mb-2">
                            {new Date(comment.createdAt).toLocaleDateString('vi-VN', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                              hour: '2-digit',
                              minute: '2-digit',
                            })}
                          </p>
                          <p className="text-gray-700">{comment.content}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* No Comments */}
            {(!post.comments || post.comments.length === 0) && (
              <div className="border-t border-gray-200 pt-8 text-center text-gray-500">
                <p>Chưa có bình luận nào. Hãy là người đầu tiên bình luận!</p>
              </div>
            )}
          </div>
        </article>
      </div>
    </div>
  );
}

export default PostDetail;
