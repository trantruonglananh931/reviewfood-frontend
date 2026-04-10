import { useEffect, useState } from 'react';
import PostCard from '../../components/PostCard';
import CreatePostModal from '../../components/CreatePostModal';
import { getAllPosts } from '../../api/postApi';
import { useAuth } from '../../context/AuthContext';
import type { Post } from '../../types/post';

function Home() {
  const { user } = useAuth();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchPosts = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getAllPosts();
      setPosts(data);
    } catch (err: any) {
      console.error('Failed to fetch posts:', err);
      const errorMessage = err.response?.data?.message || 
                          err.message || 
                          'Không thể tải danh sách bài viết. Vui lòng thử lại sau.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Main Content - Facebook Feed Style */}
      <div className="w-full pt-8 pb-12">
        <div className="max-w-2xl mx-auto px-4 space-y-6">
          {/* Create Post Button - For authenticated users */}
          {user && (
            <button
              onClick={() => setIsModalOpen(true)}
              className="w-full bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center gap-3 text-gray-600 hover:text-blue-600">
                <span className="text-2xl">✏️</span>
                <span className="font-semibold">Bạn đang nghĩ gì?</span>
              </div>
            </button>
          )}

          {/* Error State */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-8">
              <p className="text-red-700">{error}</p>
            </div>
          )}

          {/* Loading State */}
          {loading && (
            <div className="space-y-6">
              {/* Skeleton loaders */}
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white rounded-lg shadow-sm p-6 animate-pulse">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gray-200 rounded-full"></div>
                    <div className="flex-1">
                      <div className="h-3 bg-gray-200 rounded w-1/3 mb-2"></div>
                      <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                    </div>
                  </div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-4"></div>
                  <div className="h-48 bg-gray-200 rounded mb-4"></div>
                  <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!loading && posts.length === 0 && !error && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center">
              <p className="text-gray-600 text-lg mb-2">📝 Chưa có bài viết nào</p>
              <p className="text-gray-500">Quay lại sau để xem các bài viết mới</p>
            </div>
          )}

          {/* Posts Feed - Single Column */}
          {!loading && posts.length > 0 && (
            <div className="space-y-6">
              {posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Create Post Modal */}
      <CreatePostModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onPostCreated={fetchPosts}
      />
    </div>
  );
}

export default Home;
